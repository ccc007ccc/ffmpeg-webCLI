// Shared by the end-to-end tests and the large-input measurement: a static server for docs/ (the tool), a tiny opener page on ANOTHER
// origin that plays Strata's part of the protocol, fixtures made with the native ffmpeg, and ffprobe-based checks.
import http from 'node:http';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawn, spawnSync, execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

export const haveNative = ['ffmpeg', 'ffprobe'].every((b) => spawnSync(b, ['-version']).status === 0);

export function ff(args) { execFileSync('ffmpeg', ['-v', 'error', '-y', ...args], { stdio: ['ignore', 'inherit', 'inherit'] }); }
export function probe(file) { return JSON.parse(execFileSync('ffprobe', ['-v', 'error', '-print_format', 'json', '-show_streams', '-show_format', file]).toString()); }
export function packets(file, stream = 'v:0') {
  const j = JSON.parse(execFileSync('ffprobe', ['-v', 'error', '-select_streams', stream, '-show_entries', 'packet=pts_time,dts_time,size,flags', '-of', 'json', file], { maxBuffer: 1 << 28 }).toString());
  return j.packets;
}
// md5 of the bytes of the video stream's packets, whatever the container: equal md5 = the video was copied, not re-encoded
export function videoMd5(file) {
  return execFileSync('ffmpeg', ['-v', 'error', '-i', file, '-map', '0:v:0', '-c', 'copy', '-f', 'md5', '-']).toString().trim();
}
// everything ffmpeg has to say while decoding all streams of the file; empty means it decodes cleanly
export function decodeWarnings(file) {
  return spawnSync('ffmpeg', ['-v', 'warning', '-i', file, '-f', 'null', '-'], { encoding: 'utf8' }).stderr.trim();
}
export function boxOrder(file, names) {
  const b = fs.readFileSync(file);
  return Object.fromEntries(names.map((n) => [n, b.indexOf(n)]));
}

export function makeFixtures(dir) {
  fs.mkdirSync(dir, { recursive: true });
  const p = (n) => path.join(dir, n);
  // 3 s film (with B-frames, and a sound track that must NOT survive the mux), a 2.5 s narration at 44.1 kHz mono, two caption cues
  ff(['-f', 'lavfi', '-i', 'testsrc2=size=320x180:rate=24:duration=3', '-f', 'lavfi', '-i', 'sine=frequency=330:duration=3',
    '-c:v', 'libx264', '-g', '24', '-bf', '2', '-pix_fmt', 'yuv420p', '-c:a', 'aac', p('master.mp4')]);
  // a ladder rung: fMP4 init segment + media segments joined into one file
  ff(['-i', p('master.mp4'), '-an', '-c:v', 'copy', '-f', 'hls', '-hls_time', '1', '-hls_segment_type', 'fmp4', '-hls_fmp4_init_filename', 'init.mp4',
    '-hls_segment_filename', path.join(dir, 'seg%d.m4s'), '-hls_playlist_type', 'vod', p('rung.m3u8')]);
  const parts = [p('init.mp4'), ...fs.readdirSync(dir).filter((n) => /^seg\d+\.m4s$/.test(n)).sort((a, b) => parseInt(a.slice(3)) - parseInt(b.slice(3))).map(p)];
  fs.writeFileSync(p('rung.mp4'), Buffer.concat(parts.map((f) => fs.readFileSync(f))));
  ff(['-f', 'lavfi', '-i', 'sine=frequency=440:duration=2.5:sample_rate=44100', '-ac', '1', p('audio.wav')]);
  fs.writeFileSync(p('captions.vtt'), 'WEBVTT\n\n00:00:00.500 --> 00:00:01.500\nHello there\n\n00:00:01.600 --> 00:00:02.800\nSecond line\n');
  fs.writeFileSync(p('garbage.mp4'), Buffer.from(Array.from({ length: 6000 }, (_, i) => (i * 7919 + 13) & 255)));
  // ten minutes of narration at a low rate: about 26 MB, long enough to still be encoding when a cancel arrives
  ff(['-f', 'lavfi', '-i', 'anoisesrc=d=600:sample_rate=22050:amplitude=0.3', '-ac', '1', p('long.wav')]);
  return Object.fromEntries(['master.mp4', 'rung.mp4', 'audio.wav', 'captions.vtt', 'garbage.mp4', 'long.wav'].map((n) => [n, p(n)]));
}

function listen(server) { return new Promise((r) => server.listen(0, () => r(server.address().port))); }

// The tool: docs/ served by the repo's own server.js (the way a developer runs it), with no isolation headers.
export async function startTool(port = 0, env = {}) {
  if (!port) { const s = http.createServer(); port = await listen(s); await new Promise((r) => s.close(r)); }
  const child = spawn(process.execPath, ['server.js', String(port)], { cwd: ROOT, env: { ...process.env, ...env }, stdio: 'pipe' });
  for (let i = 0; i < 50; i++) {
    try { await fetch(`http://127.0.0.1:${port}/handoff.js`); break; } catch { await new Promise((r) => setTimeout(r, 100)); }
  }
  return { url: `http://127.0.0.1:${port}/`, port, stop: () => child.kill() };
}

const OPENER_HTML = `<!doctype html><meta charset=utf-8><title>opener</title><script>
let w = null, readyMsg = null, toolOrigin = null; const seen = [];
addEventListener('message', (e) => { if (e.source !== w) return; seen.push({ origin: e.origin, type: e.data && e.data.type }); if (e.data && e.data.type === 'ready') readyMsg = { ...e.data, origin: e.origin }; });
window.openTool = (url) => { toolOrigin = new URL(url).origin; w = window.open(url, '_blank'); return !!w; };
window.seen = () => seen;
window.waitReady = async (ms = 30000) => {
  const t0 = Date.now();
  while (!readyMsg) { if (Date.now() - t0 > ms) return null; try { w.postMessage({ webcli: 1, type: 'hello' }, toolOrigin); } catch (e) {} await new Promise((r) => setTimeout(r, 300)); }
  return readyMsg;
};
let n = 0;
// spec: { op, args, files: { name: key | { zeros: bytes } }, cancelOnProgress, cancelAfterMs, timeoutMs }
window.runJob = async (spec) => {
  if (!(await window.waitReady())) return { type: 'no-ready' };
  const id = 'j' + (++n); const files = {}; const transfer = [];
  for (const [name, v] of Object.entries(spec.files || {})) {
    const buf = typeof v === 'object' ? new ArrayBuffer(v.zeros) : await (await fetch('/files/' + v)).arrayBuffer();
    files[name] = buf; transfer.push(buf);
  }
  return new Promise((resolve) => {
    let progress = 0, cancelled = false; const t0 = Date.now();
    const done = (r) => { clearTimeout(timer); removeEventListener('message', on); resolve({ ...r, progress, ms: Date.now() - t0 }); };
    const timer = setTimeout(() => done({ type: 'timeout' }), spec.timeoutMs || 180000);
    if (spec.cancelAfterMs) setTimeout(() => { cancelled = true; w.postMessage({ webcli: 1, type: 'cancel', id }, toolOrigin); }, spec.cancelAfterMs);
    const on = async (e) => {
      const m = e.data;
      if (e.source !== w || !m || m.id !== id) return;
      if (m.type === 'progress') { progress++; if (spec.cancelOnProgress && !cancelled) { cancelled = true; w.postMessage({ webcli: 1, type: 'cancel', id }, toolOrigin); } }
      else if (m.type === 'error') done({ type: 'error', message: m.message, origin: e.origin });
      else if (m.type === 'result') {
        const sizes = {};
        // in 4 MB pieces: the devtools protocol Playwright listens on would choke on one big request body
        for (const [name, buf] of Object.entries(m.files)) {
          sizes[name] = buf.byteLength;
          for (let at = 0; at < buf.byteLength || at === 0; at += 4194304) await fetch('/save/' + id + '-' + name + '?append=' + (at ? 1 : 0), { method: 'POST', body: buf.slice(at, at + 4194304) });
        }
        done({ type: 'result', id, files: sizes, meta: m.meta, origin: e.origin });
      }
    };
    addEventListener('message', on);
    w.postMessage({ webcli: 1, type: 'job', id, op: spec.op, args: spec.args || {}, files }, toolOrigin, transfer);
  });
};
</script>`;

// The opener: another origin than the tool (localhost vs 127.0.0.1), serves fixtures to the page and receives the results.
export async function startOpener(fixtures, outDir) {
  fs.mkdirSync(outDir, { recursive: true });
  const server = http.createServer((req, res) => {
    const u = new URL(req.url, 'http://x');
    if (u.pathname === '/opener.html') { res.setHeader('Content-Type', 'text/html'); return res.end(OPENER_HTML); }
    if (u.pathname.startsWith('/files/')) {
      const f = fixtures[decodeURIComponent(u.pathname.slice(7))];
      if (!f) { res.statusCode = 404; return res.end(); }
      return fs.createReadStream(f).pipe(res);
    }
    if (u.pathname.startsWith('/save/') && req.method === 'POST') {
      const out = fs.createWriteStream(path.join(outDir, path.basename(decodeURIComponent(u.pathname.slice(6)))), { flags: u.searchParams.get('append') === '1' ? 'a' : 'w' });
      req.pipe(out); out.on('finish', () => res.end('ok'));
      return;
    }
    res.statusCode = 404; res.end();
  });
  const port = await listen(server);
  return { url: `http://localhost:${port}/opener.html`, stop: () => server.close() };
}

// Open the opener page, have it open the tool in a popup, and return helpers to run jobs against it.
export async function openSession(context, opener, toolUrl, outDir) {
  const page = await context.newPage();
  await page.goto(opener.url);
  const [popup] = await Promise.all([page.waitForEvent('popup'), page.evaluate((u) => window.openTool(u), toolUrl)]);
  const errors = [];
  popup.on('pageerror', (e) => errors.push(String(e)));
  return {
    page, popup, errors,
    ready: () => page.evaluate(() => window.waitReady()),
    run: (spec) => page.evaluate((s) => window.runJob(s), spec),
    out: (r, name = 'out.mp4') => path.join(outDir, `${r.id}-${name}`),
    seen: () => page.evaluate(() => window.seen()),
    files: () => popup.evaluate(() => window.__handoffFiles()),
    banner: () => popup.locator('#hashCmdBanner').innerText(),
    close: async () => { await popup.close().catch(() => {}); await page.close().catch(() => {}); },
  };
}

export const tmpdir = (name) => fs.mkdtempSync(path.join(os.tmpdir(), name));

export const EXPECTED_FULL = 'ffmpeg -i video.mp4 -i audio.wav -i captions.vtt -map 0:v:0 -map 1:a:0 -map 2:s:0 -c:v copy -c:a aac -b:a 128k -ar 48000 -ac 2 -metadata:s:a:0 language=eng -c:s mov_text -metadata:s:s:0 language=eng -movflags +faststart out.mp4';
