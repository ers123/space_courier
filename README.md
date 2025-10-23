# Star Courier PWA

This repo hosts the production build of **Star Courier**, a cozy WebGL delivery shooter optimized as a Progressive Web App (PWA). The project is published through GitHub Pages at [`https://ers123.github.io/space_courier/`](https://ers123.github.io/space_courier/).

## Working entirely in the GitHub web UI
If you prefer to manage updates without cloning the repository locally, follow this flow:

1. **Open the existing pull request** – the "Create PR" button changes to **"View PR"** once a PR exists. Click it to open the discussion for `ers123/space_courier#1`.
2. **Review the file list** – scroll through the "Files changed" tab to confirm every edit you expect is present.
3. **Add more commits online (optional)** – use the web editor to tweak files directly on the feature branch:
   - Navigate to the file (for example `index.html`, `manifest.json`, or `sw.js`).
   - Click the pencil icon (✏️) to edit.
   - Make your change, write a short commit message in the editor footer, and choose **"Commit directly to <branch>"**.
   - The PR updates automatically with the new commit.
4. **Request reviews / run checks** – if your workflow requires approvals, invite teammates or trigger automated checks (Lighthouse, eslint, etc.) from the PR page.
5. **Merge when ready** – press the green **"Merge"** button on the PR once you are satisfied. The branch history will be integrated into `main`.
6. **Delete the branch (optional)** – after merging, GitHub offers to delete the feature branch. Do so if you no longer need it.

## Updating the deployed PWA
Because GitHub Pages serves a cached PWA shell, take these extra steps with each merge:

1. **Bump the service worker `VERSION`** in [`sw.js`](./sw.js) whenever you change cached assets. This forces browsers to pick up the new cache manifest.
2. **Confirm manifest paths** – ensure [`manifest.json`](./manifest.json) keeps `start_url`, `scope`, and icon paths rooted at `/space_courier/` so installed apps open correctly.
3. **Verify metadata** – check Open Graph and Twitter tags in [`index.html`](./index.html) to confirm the production URLs (`https://ers123.github.io/space_courier/`).
4. **Publish** – GitHub Pages redeploys automatically after the merge. Wait a minute, then visit the live URL in an incognito window (or clear storage via DevTools) to validate the update.
5. **Run post-merge QA** – optional but recommended:
   - Lighthouse (Performance + PWA) in Chrome DevTools.
   - Install/uninstall the PWA to confirm launch behavior.
   - Verify offline mode by toggling "Offline" in DevTools ➜ Application ➜ Service Workers.

## Need to roll back?
If something goes wrong after merging:

1. Use the PR page to click **"Revert"**, or
2. Create a new commit reverting the problematic files, then push it via the web editor.

Following this playbook lets you iterate on Star Courier purely through the GitHub interface while keeping the deployed PWA healthy.

## Gameplay experience snapshot
- The HUD retains the live <b>Mission Guide</b> plus adds a persistent <b>Best Score</b> badge so players always see their top run without diving into menus. Update helper copy in `setGuide(...)` inside [`index.html`](./index.html) if mission design changes.
- A <b>Pilot Coach</b> rail rotates contextual tips and hotkeys while the new <b>🌙 Chill mode</b> chip slows spawns, damage, and bullet speed for relaxed sessions. The toggle wiring lives in `toggleChill()` within [`index.html`](./index.html).
- Onboarding is now a full <b>flight manual</b> that explains delivery flow, power systems, and touch controls; adjust the markup under `#overlay` in [`index.html`](./index.html) to tune copy or layout.
