// Measure one mux of a large input through the real ffmpeg.wasm in Chromium: wall time and peak memory (resident set of all browser processes).
// Usage: [NO_AUDIO=1] node test/measure-large.mjs [seconds=100] [video_kbps=3600] [fps=60] [size=1920x1080] [rung]
//   defaults: 1080p60, 100 s, about 45 MB of H.264, plus a 100 s 48 kHz stereo WAV (19 MB) and captions
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { chromium } from 'playwright';
import { ff, probe, videoMd5, decodeWarnings, startTool, startOpener, openSession, tmpdir } from './lib.mjs';

const [seconds = '100', kbps = '3600', fps = '60', size = '1920x1080', rung] = process.argv.slice(2);
const dir = tmpdir('ffwasm-big-');
const fx = path.join(dir, 'fx');
fs.mkdirSync(fx, { recursive: true });
const f = (n) => path.join(fx, n);
const mb = (n) => (n / 1048576).toFixed(1);

console.log(`making ${size} @ ${fps} fps, ${seconds} s, ~${kbps} kbps ...`);
// noise keeps the bitrate honest: a plain test pattern would compress to almost nothing
ff(['-f', 'lavfi', '-i', `testsrc2=size=${size}:rate=${fps}:duration=${seconds}`, '-vf', 'noise=alls=18:allf=t', '-c:v', 'libx264', '-preset', 'veryfast',
  '-b:v', `${kbps}k`, '-maxrate', `${kbps}k`, '-bufsize', `${kbps * 2}k`, '-g', String(Number(fps) * 2), '-pix_fmt', 'yuv420p', '-an', f('master.mp4')]);
if (rung) {
  ff(['-i', f('master.mp4'), '-c', 'copy', '-f', 'hls', '-hls_time', '4', '-hls_segment_type', 'fmp4', '-hls_fmp4_init_filename', 'init.mp4', '-hls_segment_filename', path.join(fx, 'seg%d.m4s'), '-hls_playlist_type', 'vod', f('r.m3u8')]);
  const segs = fs.readdirSync(fx).filter((n) => /^seg\d+\.m4s$/.test(n)).sort((a, b) => parseInt(a.slice(3)) - parseInt(b.slice(3)));
  fs.writeFileSync(f('video.mp4'), Buffer.concat(['init.mp4', ...segs].map((n) => fs.readFileSync(f(n)))));
} else fs.copyFileSync(f('master.mp4'), f('video.mp4'));
ff(['-f', 'lavfi', '-i', `sine=frequency=220:duration=${Number(seconds) - 1.6}:sample_rate=48000`, '-ac', '2', f('audio.wav')]);
fs.writeFileSync(f('captions.vtt'), 'WEBVTT\n\n00:00:01.000 --> 00:00:03.000\nHello\n');
const files = { 'video.mp4': f('video.mp4'), 'audio.wav': f('audio.wav'), 'captions.vtt': f('captions.vtt') };
if (process.env.NO_AUDIO) delete files['audio.wav'];   // the largest video the 100 MB ceiling allows
console.log(Object.entries(files).map(([n, p]) => `${n} ${mb(fs.statSync(p).size)} MB`).join(', '));

const tool = await startTool();
const outDir = path.join(dir, 'out');
const opener = await startOpener(files, outDir);
const browser = await chromium.launch();
const context = await browser.newContext();

const rss = () => {
  let total = 0;
  for (const l of execFileSync('ps', ['-axo', 'rss=,command=']).toString().split('\n')) {
    if (l.includes('chrome-headless-shell') && l.includes(path.join('ms-playwright'))) total += parseInt(l.trim(), 10) * 1024;
  }
  return total;
};
let peak = 0;
const sampler = setInterval(() => { peak = Math.max(peak, rss()); }, 100);

try {
  const s = await openSession(context, opener, tool.url, outDir);
  await s.ready();
  const baseline = rss();
  console.log(`browser resident set before the job (ffmpeg.wasm not loaded yet): ${mb(baseline)} MB`);
  const r = await s.run({ op: 'mux', files: Object.fromEntries(Object.keys(files).map((n) => [n, n])), timeoutMs: 900000 });
  clearInterval(sampler);
  if (r.type !== 'result') { console.log('RESULT:', JSON.stringify(r)); process.exitCode = 1; } else {
    const out = s.out(r);
    const info = probe(out);
    console.log(`result: ${mb(r.meta.bytes)} MB in ${(r.ms / 1000).toFixed(1)} s (includes loading ffmpeg.wasm and transferring the files)`);
    console.log(`peak resident set: ${mb(peak)} MB (${(peak / 1048576 / 1024).toFixed(2)} GB), ${mb(peak - baseline)} MB above the idle tool`);
    console.log('streams:', info.streams.map((x) => `${x.codec_name} ${x.duration}s`).join(', '), '| format', info.format.duration, 's');
    console.log('video copied byte for byte:', videoMd5(out) === videoMd5(files['video.mp4']));
    console.log('decode warnings:', JSON.stringify(decodeWarnings(out)));
    console.log('left in the virtual filesystem:', JSON.stringify(await s.files()));
  }
  await s.close();
} finally {
  clearInterval(sampler);
  await browser.close();
  tool.stop();
  opener.stop();
  fs.rmSync(dir, { recursive: true, force: true });
}
