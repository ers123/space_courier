# Independent source/PWA audit

Date: 2026-07-15
Server: `python3 -m http.server 4174` from the repository root

## Confirmed checks

- `star_icon.png` is 1024x1024, while `manifest.json` declares the same file as `192x192` and `512x512`.
- `sw.js` activation deletes every cache whose key is not exactly its current `CACHE_NAME`; it does not restrict deletion to a Starforge-owned prefix.
- `manifest.json` declares the `Quick Play` shortcut at `./?quickplay=true`, but loading that URL left `#menuOverlay` visible and `render_game_to_text().mode` equal to `menu`.
- The app shell is installable/controllable in the local browser: service worker controller was present, and offline reload returned the menu with `render_game_to_text` available.
- The menu exposes an install affordance in the official browser context as `Install Guide`.
- Static source scan found no ads, analytics, sponsor, or online-ranking claims in `index.html`, `manifest.json`, `sw.js`, or `README.md`.

## Evidence handles

- Icon dimensions: repository file `star_icon.png`; manifest declarations in `manifest.json`.
- Cache and shortcut findings: `manifest.json`, `sw.js`, and `quickplay.json`.
- Offline proof: `pwa-online.json`, `pwa-offline.json`, `pwa-offline.png`.
- Install proof: `desktop-menu.json`, `desktop-menu.png`.
- Harness used for direct checks: `direct-audit.mjs`.
