// Run: npm run test:e2e     (needs the native ffmpeg + ffprobe for fixtures and checks, and network for the ffmpeg.wasm core on jsDelivr)
// The hand-off, end to end, against the real ffmpeg.wasm in real Chromium: the tool is docs/ served by server.js, the opener is a page
// on another origin that speaks the protocol the way Strata does.
import { test, before, after, describe } from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import fs from 'node:fs';
import { chromium } from 'playwright';
import {
  haveNative, makeFixtures, startTool, startOpener, openSession, tmpdir, probe, packets, videoMd5, decodeWarnings, boxOrder, EXPECTED_FULL,
} from './lib.mjs';

const skip = haveNative ? false : 'native ffmpeg/ffprobe not installed';
let browser, context, tool, opener, fixtures, outDir, dir;

before(async () => {
  if (skip) return;
  dir = tmpdir('ffwasm-e2e-');
  outDir = path.join(dir, 'out');
  fixtures = makeFixtures(path.join(dir, 'fx'));
  tool = await startTool();
  opener = await startOpener(fixtures, outDir);
  browser = await chromium.launch();
  context = await browser.newContext();
});

after(async () => {
  await browser?.close();
  tool?.stop();
  opener?.stop();
  if (dir) fs.rmSync(dir, { recursive: true, force: true });
});

const kinds = (info, type) => info.streams.filter((s) => s.codec_type === type);
const shape = (info) => info.streams.map((x) => x.codec_type + ':' + x.codec_name);
const fullFiles = { 'video.mp4': 'master.mp4', 'audio.wav': 'audio.wav', 'captions.vtt': 'captions.vtt' };

describe('mux shapes (one popup, jobs one after another)', { skip }, () => {
  let s;
  before(async () => { s = await openSession(context, opener, tool.url, outDir); });
  after(async () => { assert.deepEqual(s.errors, [], 'no uncaught errors in the tool'); await s?.close(); });

  test('handshake: ready arrives from the tool origin and names the op', async () => {
    const r = await s.ready();
    assert.equal(r.type, 'ready');
    assert.equal(r.tool, 'ffmpeg.webcli.app');
    assert.deepEqual(r.ops, ['mux']);
    assert.equal(r.origin, new URL(tool.url).origin);
  });

  test('video + audio + captions: the exact command, three streams, video copied, full video length, no decode warnings', async () => {
    const r = await s.run({ op: 'mux', files: fullFiles });
    assert.equal(r.type, 'result', r.message);
    assert.equal(r.origin, new URL(tool.url).origin);
    assert.equal(r.meta.command, EXPECTED_FULL);
    const out = s.out(r);
    assert.equal(r.meta.bytes, fs.statSync(out).size);
    const info = probe(out);
    assert.deepEqual(shape(info), ['video:h264', 'audio:aac', 'subtitle:mov_text']);
    const [a] = kinds(info, 'audio');
    assert.equal(a.sample_rate, '48000');
    assert.equal(a.channels, 2);
    assert.equal(a.tags.language, 'eng');
    assert.equal(kinds(info, 'subtitle')[0].tags.language, 'eng');
    // the narration (2.5 s) is shorter than the video (3 s): the file keeps the video's length, and the sound starts with the picture
    const v = kinds(info, 'video')[0];
    assert.ok(Number(v.duration) > 2.95, `video ${v.duration}`);
    assert.ok(Number(info.format.duration) > 2.95, `format ${info.format.duration}`);
    assert.ok(Number(a.duration) > 2.4 && Number(a.duration) < 2.7, `audio ${a.duration}`);
    assert.ok(Math.abs(Number(a.start_time)) < 0.1 && Math.abs(Number(v.start_time)) < 0.1);
    assert.equal(decodeWarnings(out), '');
    // +faststart: the index is ahead of the media data
    const at = boxOrder(out, ['moov', 'mdat']);
    assert.ok(at.moov > 0 && at.moov < at.mdat, JSON.stringify(at));
    // copied, not re-encoded: the same video packets, byte for byte, with the same timing and keyframes
    assert.equal(videoMd5(out), videoMd5(fixtures['master.mp4']));
    const pin = packets(fixtures['master.mp4']);
    const pout = packets(out);
    assert.equal(pout.length, pin.length);
    assert.deepEqual(pout.map((p) => [p.pts_time, p.size, p.flags]), pin.map((p) => [p.pts_time, p.size, p.flags]));
  });

  test('video + audio only', async () => {
    const r = await s.run({ op: 'mux', files: { 'video.mp4': 'master.mp4', 'audio.wav': 'audio.wav' } });
    assert.equal(r.type, 'result', r.message);
    assert.equal(r.meta.command, 'ffmpeg -i video.mp4 -i audio.wav -map 0:v:0 -map 1:a:0 -c:v copy -c:a aac -b:a 128k -ar 48000 -ac 2 -metadata:s:a:0 language=eng -movflags +faststart out.mp4');
    assert.deepEqual(shape(probe(s.out(r))), ['video:h264', 'audio:aac']);
    assert.equal(videoMd5(s.out(r)), videoMd5(fixtures['master.mp4']));
    assert.equal(decodeWarnings(s.out(r)), '');
  });

  test("video + captions only: no sound track, not even the master's own", async () => {
    const r = await s.run({ op: 'mux', files: { 'video.mp4': 'master.mp4', 'captions.vtt': 'captions.vtt' } });
    assert.equal(r.type, 'result', r.message);
    assert.equal(r.meta.command, 'ffmpeg -i video.mp4 -i captions.vtt -map 0:v:0 -map 1:s:0 -c:v copy -c:s mov_text -metadata:s:s:0 language=eng -movflags +faststart out.mp4');
    assert.deepEqual(shape(probe(s.out(r))), ['video:h264', 'subtitle:mov_text']);
    assert.equal(videoMd5(s.out(r)), videoMd5(fixtures['master.mp4']));
  });

  test('a fragmented-MP4 rung (init + segments joined): copied into a regular, faststart MP4', async () => {
    const rung = fixtures['rung.mp4'];
    assert.ok(boxOrder(rung, ['moof']).moof > 0, 'fixture is fragmented');
    const r = await s.run({ op: 'mux', files: { 'video.mp4': 'rung.mp4', 'audio.wav': 'audio.wav', 'captions.vtt': 'captions.vtt' } });
    assert.equal(r.type, 'result', r.message);
    const out = s.out(r);
    const info = probe(out);
    assert.deepEqual(shape(info), ['video:h264', 'audio:aac', 'subtitle:mov_text']);
    assert.equal(boxOrder(out, ['moof']).moof, -1, 'the output is not fragmented');
    assert.ok(Number(info.format.duration) > 2.95, `format ${info.format.duration}`);
    assert.equal(decodeWarnings(out), '');
    assert.equal(videoMd5(out), videoMd5(rung));
    const pin = packets(rung);
    const pout = packets(out);
    assert.equal(pout.length, 72);
    assert.equal(pout.length, pin.length);
    assert.deepEqual(pout.map((p) => [p.size, p.flags]), pin.map((p) => [p.size, p.flags]));
  });

  test('language: only three lowercase letters reach ffmpeg, anything else falls back to eng', async () => {
    for (const [language, want] of [['fra', 'fra'], ['en', 'eng'], ['EN', 'eng'], ['ENG', 'eng'], ['english', 'eng'], ['e1g', 'eng'], ['eng; rm', 'eng'], [42, 'eng'], [null, 'eng'], ['', 'eng']]) {
      const r = await s.run({ op: 'mux', args: { language }, files: { 'video.mp4': 'master.mp4', 'captions.vtt': 'captions.vtt' } });
      assert.equal(r.type, 'result', `${JSON.stringify(language)}: ${r.message}`);
      assert.ok(r.meta.command.includes(`language=${want}`), `${JSON.stringify(language)} -> ${r.meta.command}`);
      assert.equal(kinds(probe(s.out(r)), 'subtitle')[0].tags.language, want);
    }
  });

  test('audio_kbps: out of range or not an integer falls back to 128; in range is used', async () => {
    const files = { 'video.mp4': 'master.mp4', 'audio.wav': 'audio.wav' };
    for (const [audio_kbps, want] of [[5, 128], [31, 128], [321, 128], [999, 128], [-64, 128], [128.5, 128], ['256', 128], [null, 128], [32, 32], [64, 64], [320, 320]]) {
      const r = await s.run({ op: 'mux', args: { audio_kbps }, files });
      assert.equal(r.type, 'result', `${audio_kbps}: ${r.message}`);
      assert.ok(r.meta.command.includes(` -b:a ${want}k `), `${audio_kbps} -> ${r.meta.command}`);
    }
    // and the encoder really got it: 64 k is much smaller than 320 k
    const lo = await s.run({ op: 'mux', args: { audio_kbps: 64 }, files });
    const hi = await s.run({ op: 'mux', args: { audio_kbps: 320 }, files });
    const br = (r) => Number(kinds(probe(s.out(r)), 'audio')[0].bit_rate);
    assert.ok(br(lo) < 100000 && br(hi) > 200000, `${br(lo)} vs ${br(hi)}`);
  });

  test('refusals: no video, nothing to add, empty file, unknown op, over the ceiling', async () => {
    let r = await s.run({ op: 'mux', files: { 'audio.wav': 'audio.wav' } });
    assert.equal(r.type, 'error');
    assert.match(r.message, /video\.mp4/);
    r = await s.run({ op: 'mux', files: { 'video.mp4': 'master.mp4' } });
    assert.equal(r.type, 'error');
    assert.match(r.message, /audio\.wav.*captions\.vtt/);
    r = await s.run({ op: 'mux' });
    assert.equal(r.type, 'error');
    r = await s.run({ op: 'mux', files: { 'video.mp4': { zeros: 0 }, 'audio.wav': 'audio.wav' } });
    assert.equal(r.type, 'error');
    assert.match(r.message, /empty/);
    r = await s.run({ op: 'transcode', files: fullFiles });
    assert.equal(r.type, 'error');
    assert.match(r.message, /Unknown op 'transcode'.*mux/);
    // over the ceiling: refused at once, with the numbers, before anything is written to the wasm heap
    r = await s.run({ op: 'mux', files: { 'video.mp4': { zeros: 101 * 1048576 }, 'audio.wav': 'audio.wav' } });
    assert.equal(r.type, 'error');
    assert.match(r.message, /101 MB.*at most 100 MB/);
    // and it is still usable afterwards
    r = await s.run({ op: 'mux', files: fullFiles });
    assert.equal(r.type, 'result', r.message);
  });
});

describe('failure and recovery', { skip }, () => {
  test('ffmpeg exits non-zero: error with the reason, banner says so, virtual files are gone, the next job works without a reload', async () => {
    const s = await openSession(context, opener, tool.url, outDir);
    try {
      let r = await s.run({ op: 'mux', files: fullFiles });          // a good one first, so ffmpeg is loaded
      assert.equal(r.type, 'result', r.message);
      assert.deepEqual(await s.files(), []);
      const loadedAt = await s.popup.evaluate(() => performance.timeOrigin);

      r = await s.run({ op: 'mux', files: { 'video.mp4': 'garbage.mp4', 'audio.wav': 'audio.wav', 'captions.vtt': 'captions.vtt' } });
      assert.equal(r.type, 'error');
      assert.match(r.message, /ffmpeg exited with code [1-9]\d*/);
      assert.match(await s.banner(), /Mux failed: ffmpeg exited/);
      assert.deepEqual(await s.files(), [], 'nothing left in the virtual filesystem');

      r = await s.run({ op: 'mux', files: fullFiles });
      assert.equal(r.type, 'result', r.message);
      assert.equal(probe(s.out(r)).streams.length, 3);
      assert.match(await s.banner(), /Sent/);
      assert.equal(await s.popup.evaluate(() => performance.timeOrigin), loadedAt, 'the page was not reloaded');
      assert.deepEqual(await s.files(), []);

      // a narration that is not audio fails the same way, after the video has already been written
      r = await s.run({ op: 'mux', files: { 'video.mp4': 'master.mp4', 'audio.wav': 'garbage.mp4' } });
      assert.equal(r.type, 'error');
      assert.deepEqual(await s.files(), []);
      r = await s.run({ op: 'mux', files: fullFiles });
      assert.equal(r.type, 'result', r.message);
    } finally { await s.close(); }
  });

  test('cancel while ffmpeg is encoding: terminated at once, answered with an error, and the tool works again (it reloads the core)', async () => {
    const s = await openSession(context, opener, tool.url, outDir);
    try {
      let r = await s.run({ op: 'mux', files: { 'video.mp4': 'master.mp4', 'audio.wav': 'long.wav' }, cancelOnProgress: true });
      assert.equal(r.type, 'error', JSON.stringify(r));
      assert.equal(r.message, 'Cancelled.');
      assert.ok(r.progress >= 1, 'it was cancelled while running');
      assert.match(await s.banner(), /Cancelled/);
      assert.match(await s.popup.locator('#statusText').innerText(), /ffmpeg stopped/);
      r = await s.run({ op: 'mux', files: fullFiles });
      assert.equal(r.type, 'result', r.message);
      assert.equal(probe(s.out(r)).streams.length, 3);
      assert.deepEqual(await s.files(), []);
    } finally { await s.close(); }
  });

  test('cancel while ffmpeg.wasm is still loading, then a new job', async () => {
    const c = await browser.newContext();
    try {
      let release;
      const gate = new Promise((res) => { release = res; });
      await c.route('**/ffmpeg-core.wasm', async (route) => { await gate; await route.continue().catch(() => {}); });
      const s = await openSession(c, opener, tool.url, outDir);
      let r = await s.run({ op: 'mux', files: fullFiles, cancelAfterMs: 1500, timeoutMs: 60000 });
      assert.equal(r.type, 'error', JSON.stringify(r));
      assert.equal(r.message, 'Cancelled.');
      release();
      r = await s.run({ op: 'mux', files: fullFiles });
      assert.equal(r.type, 'result', r.message);
      await s.close();
    } finally { await c.close(); }
  });

  test('ffmpeg-core cannot be fetched: an error naming the reason, not a hang, and a later job can succeed', async () => {
    const c = await browser.newContext();
    try {
      let block = true;
      await c.route('**/ffmpeg-core.{js,wasm}', (route) => (block ? route.abort() : route.continue()));
      const s = await openSession(c, opener, tool.url, outDir);
      let r = await s.run({ op: 'mux', files: fullFiles, timeoutMs: 60000 });
      assert.equal(r.type, 'error', JSON.stringify(r));
      assert.match(r.message, /ffmpeg\.wasm could not be loaded/);
      assert.match(await s.banner(), /Mux failed/);
      block = false;
      r = await s.run({ op: 'mux', files: fullFiles, timeoutMs: 120000 });
      assert.equal(r.type, 'result', r.message);
      await s.close();
    } finally { await c.close(); }
  });

  test('ffmpeg-core request stalls forever: the load times out with an error', async () => {
    const c = await browser.newContext();
    try {
      await c.addInitScript(() => { window.__handoffLoadMs = 3000; });
      await c.route('**/ffmpeg-core.wasm', () => { /* never answered */ });
      const s = await openSession(c, opener, tool.url, outDir);
      const r = await s.run({ op: 'mux', files: fullFiles, timeoutMs: 60000 });
      assert.equal(r.type, 'error', JSON.stringify(r));
      assert.match(r.message, /Timed out loading ffmpeg\.wasm/);
      assert.ok(r.ms < 30000, `${r.ms} ms`);
      await s.close();
    } finally { await c.close(); }
  });

  test('the ffmpeg library itself cannot be fetched (CDN blocked): still answers with an error, not silence', async () => {
    const c = await browser.newContext();
    try {
      await c.addInitScript(() => { window.__handoffLibraryMs = 3000; });
      await c.route('https://cdn.jsdelivr.net/**', (route) => route.abort());
      const s = await openSession(c, opener, tool.url, outDir);
      const r = await s.run({ op: 'mux', files: fullFiles, timeoutMs: 60000 });
      assert.equal(r.type, 'error', JSON.stringify(r));
      assert.match(r.message, /ffmpeg\.wasm could not be started/);
      await s.close();
    } finally { await c.close(); }
  });

  test('a job that arrives while the normal UI is processing is refused (busy), and the page is not disturbed', async () => {
    const s = await openSession(context, opener, tool.url, outDir);
    try {
      await s.ready();
      await s.popup.evaluate(() => {
        // what the editor does while it works: a spinning Process button and a running command
        const b = document.getElementById('processBtn');
        b.disabled = true;
        b.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing\u2026';
      });
      let r = await s.run({ op: 'mux', files: fullFiles });
      assert.equal(r.type, 'error');
      assert.match(r.message, /busy/);
      assert.match(await s.popup.locator('#processBtn').innerText(), /Processing/, 'the other work is untouched');
      await s.popup.evaluate(() => { document.getElementById('processBtn').innerHTML = 'Process Video'; });
      r = await s.run({ op: 'mux', files: fullFiles });
      assert.equal(r.type, 'result', r.message);
    } finally { await s.close(); }
  });
});

describe('standalone', { skip }, () => {
  test('opened in a normal tab nothing answers and the page works as before', async () => {
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto(tool.url);
    await page.waitForFunction(() => typeof window.loadFFmpeg === 'function');
    assert.equal(await page.evaluate(() => window.opener), null);
    assert.equal(await page.locator('#processBtn').isDisabled(), true);
    assert.deepEqual(errors, []);
    await page.close();
  });
});
