# Work Order — ffmpeg.webcli.app: Strata hand-off (`mux`)

**Created:** 2026-10-27
**Target repo:** `ffmpeg.wasm.editor` (deployed as `ffmpeg.webcli.app`)
**Consumer:** Strata's Publish step (`strataeditor.dev`, repo `strata-editor`)
**Sibling order:** `STRATA_HANDOFF_WORKORDER.md` in `dub-webCLI` (same protocol, other tool)
**Protocol spec:** `strata-editor/guides/HANDOFF.md` (read it first; it is the contract)

---

## 0. What this is

After a render, Strata's Publish step can open ffmpeg.webcli.app in a popup, send it a video, a narration WAV and WebVTT captions, and get back **one MP4**: the video copied (never re-encoded), the audio encoded to AAC, the captions as a soft `mov_text` track. Files move by `postMessage` in the same browser; nothing is uploaded.

The existing `#cmd=` recipes describe an operation and never carry a file, and none of them adds audio or captions to a video. This is a second entry point beside them, not a change to them.

The hand-off is **already written and working in this repo's working tree, but uncommitted and not deployed**. This order is: review it, harden it, close the untested paths, ship it.

### 0.1 Already done (working tree, uncommitted)

| File | Change |
|---|---|
| `docs/handoff.js` | new. `serve()` answers only `window.opener`, only from an allowed origin, replies to that origin only. Byte-identical to `dub-webCLI/docs/handoff.js` |
| `docs/index.html` | `import { serve } from './handoff.js'`; `handoffMux()`; `serve({ tool: 'ffmpeg.webcli.app', version: '1', handlers: { mux } })`, placed after `handleHashCommand()` |
| `test/handoff.test.mjs` | 7 tests for `serve()` (run: `node --test test/handoff.test.mjs`) |
| `README.md` | "Use it from another page" section |

Verified in real Chrome against the editor's own Publish step with this tool served from a plain static server: 4 s to mux a 18 MB video, the output has `h264`, `aac` and `mov_text` streams, decodes with **no ffmpeg warnings**, and its audio is **+0.0 ms** from the source WAV at the start, middle and end (cross-correlation).

### 0.2 The contract (do not change without changing Strata's `export/handoff.js` and the dub tool)

```
opener -> ffmpeg  { webcli: 1, type: 'job', id, op: 'mux', args: { language?: 'eng', audio_kbps?: 128 },
                    files: { 'video.mp4', 'audio.wav'?, 'captions.vtt'? } }        at least one of audio / captions
ffmpeg -> opener  { webcli: 1, type: 'ready' | 'progress' | 'result' | 'error', id, ... }
result.files['out.mp4'] (ArrayBuffer), result.meta = { command, bytes }
```

The command it runs (Strata stores it verbatim in `render.json`, so it is part of the contract):

```
ffmpeg -i video.mp4 [-i audio.wav] [-i captions.vtt] -map 0:v:0 [-map 1:a:0] [-map 2:s:0]
       -c:v copy -c:a aac -b:a 128k -ar 48000 -ac 2 -metadata:s:a:0 language=eng
       -c:s mov_text -metadata:s:s:0 language=eng -movflags +faststart out.mp4
```

`video.mp4` is either the master (a plain MP4) or a **ladder rung: an fMP4 `init.mp4` and its `seg*.m4s` joined into one file**. Both must work. Both have been tested natively and through this tool.

---

## PART A — ship what exists

**A.1** Review the diff. Keep `docs/handoff.js` byte-identical with the dub repo's copy (`cmp`); if you change one, change both.

**A.2** Commit and deploy.

**A.3** **Deployed-site checks, none of which have been run:**

1. `https://ffmpeg.webcli.app/handoff.js` serves the file, not `index.html`. `vercel.json` rewrites `/**` to `/index.html`; rewrites should lose to a real file, but confirm it with `curl -I` and the content type.
2. A popup opened from `https://strataeditor.dev` completes the ready handshake and returns an MP4. Check the **response headers of the page**: it must not send `Cross-Origin-Opener-Policy: same-origin`, which makes the browser cut the link to the opener and the tool can never answer. (This repo's `server.js` does send it for local development; see B.3.)
3. A **returning visitor** with the old service worker gets the new page. The worker is network-first for same-origin files, so it should; prove it with a profile that visited before the deploy.

**GATE F-A:** the deployed tool answers a popup from `strataeditor.dev` and returns a valid MP4.

---

## PART B — close the paths that were written but not exercised

### B.1 Every shape of `mux`

Write automated tests (Playwright, against the real ffmpeg.wasm) for: video + audio + captions; video + audio only; video + captions only; a **fragmented-MP4 `video.mp4`** (a rung); a missing `video.mp4`; neither audio nor captions; a `language` that is not three lowercase letters (must fall back to `eng`, not be passed to ffmpeg); `audio_kbps` out of range (must fall back to 128). Assert with ffprobe-equivalent checks on the output (stream codecs, durations) rather than file size.

### B.2 Failure and recovery

- ffmpeg exits non-zero, or produces nothing: the job must answer `error` with the message, the banner must say so, and the **virtual files must be deleted**. Prove a second job works afterwards without reloading.
- ffmpeg.wasm cannot load (CDN blocked): `error`, not a hang. There is currently no timeout on `loadFFmpeg()` inside `handoffMux`.
- Strata sends `cancel`: today it only aborts the signal, which `handoffMux` ignores; ffmpeg.wasm has no clean cancel. Decide: either `ffmpeg.terminate()` and rebuild the instance so the tool is usable again, or document that closing the popup is the cancel. Either is acceptable; silently ignoring it is not.

### B.3 Local development

`server.js` sets `COOP: same-origin` and `COEP: require-corp` for SharedArrayBuffer. The core in use (`@ffmpeg/core@0.12.10`, single-thread) does not need them. Test whether it runs without them; if so, drop the headers (or put them behind an env flag as Strata did with `STRATA_NO_ISOLATION`) so the hand-off can be developed against `server.js`. Currently the only way to test it locally is a plain static server (`python3 -m http.server`).

**GATE F-B:** B.1 passes; failure and recovery proven; the cancel decision is made and stated.

---

## PART C — size and quality limits the consumer cares about

- **Memory.** A 1080p60 master is hundreds of MB in the worst case (Strata's default master is about 37 MB for 80 s at 720p30; a rung at 1080p60 is about 35 MB). ffmpeg.wasm holds the input, the output and the `+faststart` second pass in its 2 GB wasm heap. Measure a 1080p60, ~100 s input (about 45 MB) and report peak memory and time; define the largest input you will accept and make the tool `error` with a clear message above it instead of crashing the tab. Strata publishes a 100 MB-or-less file anyway (GitHub's limit), so 100 MB is the natural ceiling.
- **Copy, not re-encode.** `-c:v copy` must stay. A test must assert that the output's video stream packets are the same bytes as the input's (or at least identical `nb_frames`, `pts` and keyframe positions): Strata tells the user "not re-encoded" in `render.json`.
- **Audio length.** The video is longer than the narration (80.7 s vs 79.05 s in the test film). The output must keep the video's full length; do **not** add `-shortest`.
- **Languages.** `language` is mapped to a 3-letter code by Strata (`en` becomes `eng`). Accept only `^[a-z]{3}$`.

**GATE F-C:** 1080p60 ~100 s measured and reported; ceiling enforced with a message; copy-not-re-encode asserted by a test.

---

## PART D — hygiene

- **Origin allow-list** lives in `docs/handoff.js` (`ALLOWED_ORIGINS`: `strataeditor.dev`, `www.strataeditor.dev`; localhost and 127.0.0.1 on any port for development). If Strata moves domains, this is the one line to change, in **both** tools. Do not widen it.
- Add `handoff.js` to `STATIC_ASSETS` in `service-worker.js` and bump the cache names (`v4` to `v5`) so the offline PWA ships the same page the network does.
- `handoffMux` reuses the page's `ffmpeg` instance and `loadFFmpeg()` UI. If a user is mid-job in the normal UI when a popup job arrives, the two collide on the virtual filesystem (`out.mp4`, `video.mp4`). A popup opened by Strata is a fresh page, so this cannot happen from Strata, but the handler should refuse (`error`: busy) if `processBtn` is disabled.
- Standalone behaviour is unchanged: opened in a normal tab (no `window.opener`) `serve()` returns `null` and nothing else runs. The `#cmd=` recipes must keep working; run their existing demo or test after your change.

---

## Gates

| Gate | Condition |
|---|---|
| **F-A** | deployed `ffmpeg.webcli.app` answers a popup from `strataeditor.dev` and returns a valid MP4; `handoff.js` served as JS; no COOP on the page |
| **F-B** | every `mux` shape tested (including a fragmented-MP4 input); failure recovers; cancel decided |
| **F-C** | 1080p60 ~100 s measured; input ceiling enforced; video copied byte-for-byte; full video length kept |
| **F-D** | `docs/handoff.js` byte-identical with the dub repo's; service worker precaches it; `#cmd=` recipes unaffected |

## Out of scope

- more ops than `mux` (no transcode, no HLS packaging: Strata packages its own segments and audio rendition, which measured +0.0 ms in sync)
- any server, upload, or account
- changing Strata (separate repo); report protocol questions to its owner
- changing how the tool works standalone
