# Starforge Courier

Single-page WebGL cargo-combat runner built for quick replayable sessions. Accept a contract, pick up the cargo, survive the ambush line, deliver for score and scrap, choose one upgrade, and launch the next harder route.

Live demo: [https://ers123.github.io/space_courier/](https://ers123.github.io/space_courier/)

Gameplay video: [Starforge Courier gameplay MP4](docs/media/starforge-courier-gameplay.mp4)

## Features

- Fast first loop: the first pickup sits close to spawn and the first delivery payout is reachable in a few seconds with clean routing.
- Cargo risk/reward: every hit while carrying cargo reduces the delivery bonus.
- Three enemy roles: chasers pressure space, dashers punish straight lines, shooters force movement.
- Immediate upgrades: each delivery pauses for one of three high-impact choices.
- Mobile and desktop play: keyboard/mouse on desktop, virtual stick plus action buttons on touch devices.
- Installable PWA: manifest, service worker, and install guidance for desktop and mobile.
- Local-only progression: high score, mute state, and run progress stay on-device.

## Controls

Desktop:

- `WASD` or arrow keys: move
- Mouse: aim
- `Space` or mouse hold: fire
- `Shift`: focus burst when charged
- `P`: pause/resume
- `R`: restart after game over
- `F`: toggle fullscreen
- `Esc`: exit fullscreen

Touch:

- Left stick: move and aim
- `FIRE`: shoot
- `FX`: focus burst
- `II`: pause/resume

## Install

Android / Chrome:

1. Open the live demo.
2. Tap the browser install prompt or the in-game `Install App` button when it appears.
3. Confirm `Install`.

iPhone / iPad Safari:

1. Open the live demo in Safari.
2. Tap `Share`.
3. Choose `Add to Home Screen`.
4. Confirm `Add`.

Desktop Chrome / Edge:

1. Open the live demo.
2. Use the browser install icon or the in-game `Install App` button when available.
3. Confirm installation.

If the browser does not expose an install prompt, use the browser menu and choose `Install app` or `Create shortcut`.

## Local Run

Serve the folder with any static server. Example:

```bash
git clone https://github.com/ers123/space_courier.git
cd space_courier
python3 -m http.server 4173
```

Then open [http://127.0.0.1:4173](http://127.0.0.1:4173).

## Architecture

- `index.html`: all UI, input handling, game state, WebGL rendering, HUD, overlays, and install affordance.
- `manifest.json`: install metadata for the PWA shell.
- `sw.js`: offline app-shell caching for the single-page game and local assets.
- `star_icon.png`, `star_icon_192.png`, `star_icon_512.png`, `star_image.png`: repo-owned art used for app metadata, install surfaces, and previews.

The game also exposes two automation hooks for deterministic testing:

- `window.render_game_to_text()`: concise JSON summary of the visible and player-relevant state.
- `window.advanceTime(ms)`: deterministic fixed-step runner for automated checks.

## Testing

Representative local verification used the official `develop-web-game` client plus direct Playwright checks.

Official client examples:

```bash
node /Users/yohan/.codex/skills/develop-web-game/scripts/web_game_playwright_client.js \
  --url http://127.0.0.1:4173 \
  --click-selector "#startBtn" \
  --actions-json '{"steps":[{"buttons":["right"],"frames":90},{"buttons":["right"],"frames":70},{"buttons":["down"],"frames":50}]}' \
  --iterations 1 \
  --pause-ms 250 \
  --screenshot-dir /Users/yohan/Projects/space_courier/output/readme-example
```

Checks covered:

- Start flow and first-run state capture
- Pickup, ambush spawn, delivery, upgrade choice, and tier-2 restart
- Shooting, enemy kill, player damage, cargo-integrity loss
- Pause/resume, fullscreen enter/exit, and restart flow
- Desktop and mobile viewport screenshots
- Service worker registration and offline app-shell fallback

## Privacy and Storage

- No backend, ads, analytics, login, or online leaderboard.
- `localStorage` keeps only lightweight local preferences and score data such as mute state and best score.
- All gameplay state stays in the browser on the current device.

## Known Limitations

- WebGL is required; browsers with WebGL disabled cannot run the game.
- iOS does not expose the same install prompt API as Chromium browsers, so Safari uses `Share > Add to Home Screen`.
- The service worker caches the app shell and local assets only; there is no networked content sync.
