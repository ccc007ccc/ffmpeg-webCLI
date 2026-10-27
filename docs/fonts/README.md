# Bundled watermark fonts

The text watermark tool includes two Simplified Chinese fonts, each as a static
bold (700) instance so the browser preview and FFmpeg output use the same weight:

- `noto-sans-sc.ttf` — Noto Sans SC (sans serif)
- `noto-serif-sc.ttf` — Noto Serif SC (serif)

The files are static instances generated from the official Google Fonts variable
fonts. Both remain under the SIL Open Font License 1.1. Complete license notices
are included beside the font files. Original sources:

- https://github.com/google/fonts/tree/main/ofl/notosanssc
- https://github.com/google/fonts/tree/main/ofl/notoserifsc

The editor loads a font when its preset is selected for preview or conversion.
