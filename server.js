#!/usr/bin/env node
/**
 * Static file server for the docs/ folder.
 * The single-thread core in use (@ffmpeg/core 0.12.10) does not need SharedArrayBuffer, so no
 * cross-origin isolation headers are sent by default. Cross-Origin-Opener-Policy: same-origin also
 * severs window.opener, which the hand-off popup (docs/handoff.js) depends on, as it does on the deployed site.
 *
 * Set FFMPEG_ISOLATION=1 to send COOP + COEP + CORP, e.g. to try the multi-thread core (ffmpeg-core-mt).
 *
 * Usage:  node server.js [port]                       (default: 5500)
 *         FFMPEG_ISOLATION=1 node server.js 8080
 */

const http = require('http');
const fs   = require('fs');
const path = require('path');

const PORT  = parseInt(process.argv[2] || '5500', 10);
const ISOLATION = process.env.FFMPEG_ISOLATION === '1';
const ROOT  = path.join(__dirname, 'docs');

const MIME = {
  '.html' : 'text/html; charset=utf-8',
  '.js'   : 'application/javascript; charset=utf-8',
  '.mjs'  : 'application/javascript; charset=utf-8',
  '.css'  : 'text/css; charset=utf-8',
  '.wasm' : 'application/wasm',
  '.json' : 'application/json; charset=utf-8',
  '.png'  : 'image/png',
  '.jpg'  : 'image/jpeg',
  '.jpeg' : 'image/jpeg',
  '.gif'  : 'image/gif',
  '.svg'  : 'image/svg+xml',
  '.ico'  : 'image/x-icon',
  '.mp4'  : 'video/mp4',
  '.webm' : 'video/webm',
  '.mp3'  : 'audio/mpeg',
  '.wav'  : 'audio/wav',
};

function mime(file) {
  return MIME[path.extname(file).toLowerCase()] || 'application/octet-stream';
}

const server = http.createServer((req, res) => {
  // Resolve URL to a file path inside docs/
  let urlPath = req.url.split('?')[0];          // strip query string
  if (urlPath === '/') urlPath = '/index.html';  // default document

  const filePath = path.join(ROOT, urlPath);

  // Security: prevent path traversal outside docs/
  if (!filePath.startsWith(ROOT + path.sep) && filePath !== ROOT) {
    res.writeHead(403);
    res.end('403 Forbidden');
    return;
  }

  fs.stat(filePath, (err, stat) => {
    if (err || !stat.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }

    // ── Headers for SharedArrayBuffer / cross-origin isolation (opt-in) ──
    if (ISOLATION) {
      res.setHeader('Cross-Origin-Opener-Policy',   'same-origin');
      res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
      // Allow CDN resources (jsDelivr) to load inside the isolated context
      res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    }

    // ── Cache headers for PWA offline support ──
    const baseName = path.basename(filePath);
    if (baseName === 'service-worker.js' || baseName === 'manifest.json') {
      // Don't cache service worker and manifest to ensure updates
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    } else if (baseName === 'index.html') {
      // Cache index for short period to enable offline access
      res.setHeader('Cache-Control', 'public, max-age=3600');
    } else if (filePath.endsWith('.js') || filePath.endsWith('.css')) {
      // Cache app resources longer
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    } else {
      // Cache static assets long-term
      res.setHeader('Cache-Control', 'public, max-age=86400');
    }

    res.setHeader('Content-Type',   mime(filePath));
    res.setHeader('Content-Length', stat.size);
    res.writeHead(200);

    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Serving docs/ at http://127.0.0.1:${PORT}`);
  console.log(ISOLATION ? 'COOP + COEP headers active — SharedArrayBuffer enabled'
                        : 'No COOP/COEP headers (set FFMPEG_ISOLATION=1 to send them)');
  console.log('Press Ctrl+C to stop.');
});
