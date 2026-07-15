# Starforge Courier PWA Overhaul

Date: 2026-07-15  
Status: Approved; implementation relay ready

## Starting State

- Repository: `https://github.com/ers123/space_courier`
- Local checkout: `/Users/yohan/Projects/space_courier`
- Branch: `main`
- Starting revision: `a9476c661601e66aecf859187991cadaa7800424`
- Starting worktree: clean
- Authorized: game overhaul, documentation, install instructions, shareable video, commit, push, GitHub Pages deployment, live verification
- Not authorized: destructive history rewrite, paid services, external ads/analytics, invented ranking/traction claims, third-party copyrighted assets without clear permission

## Outcome

Turn the existing single-file mobile WebGL PWA into a polished, highly replayable casual game with a strong first 30 seconds, a clear cargo-combat-upgrade loop, reliable mobile/PWA installation, automated gameplay observability, a public README, a publishable gameplay video, and verified GitHub Pages release. “Top 5 casual game” is a quality bar, not a guaranteed external ranking.

## Relay Route

| Phase | Thread | Model | Effort | Deliverable | Gate | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Product/game design and coordination | current delegated coordinator | Sol-class coordinator | Extra High | Settled game loop, scope, route, integration/release gates | Decisions, risks, affected surfaces, checks, safe integration path | Complete |
| Implementation attempt 1 | `019f6567-8077-7c01-a6b8-ef608e8b888a` | GPT-5.5 | Extra High | Initial compact `index.html` replacement and start-flow smoke evidence | Interrupted after one large patch; no canonical evidence log/PWA/docs completion | Replaced |
| Implementation and focused tests | `019f6572-2e35-7d51-9f6f-802514db385d` | GPT-5.4 | High | Verify preserved patch, finish PWA/docs, then fix reviewed findings in small deltas | Core loop works, focused checks pass, Luna recheck still pending | Complete |
| Independent playtest and polish review | `019f6582-7e92-7633-af08-e6551e6048b0` | Luna High | High | Actionable findings plus same-thread read-only recheck | PASS — no remaining actionable finding among the five | Complete |
| Video packaging, release, and live verification | `019f65a3-ea58-7311-9a84-c672ca1996db` | GPT-5.6 Luna | Medium | Upload-ready MP4, clean integrated commit/push, Pages receipt, live proof | Integrated revision deployed and verified | Complete |

### Settled Redesign

- Preserve the single-page, no-build WebGL PWA and replace feature sprawl with one legible run loop: accept a contract, pick up cargo, survive a directed ambush, deliver, choose one of three upgrades, then take a riskier contract.
- Put the first pickup close to the player and communicate the objective with an in-world marker, bearing/distance HUD, short mission callouts, and a visible extraction/delivery destination so the first payoff lands inside 30 seconds.
- Make cargo the risk/reward hinge: value and danger rise with contract tier, taking damage threatens the carried bonus, and successful delivery restores tempo through a short upgrade choice rather than a detached shop.
- Keep three readable enemy roles (chaser, dasher, shooter), add stronger telegraphs and impact feedback, and pace encounters around cargo legs instead of an independent endless spawn flood.
- Reduce daily/achievement/leaderboard/cosmetic surfaces to secondary progression screens; remove ad/sponsor stubs and avoid networked or competitive claims. All progress remains local-only.
- Use the existing WebGL point renderer and repo-owned images only. Add deterministic hooks and concise text state before treating any visual test as passed.
- Release from a clean attached `main` only after independent review, with a repository-local exclusive lock held through GitHub Pages verification.

## Checklist

- [x] Settle a compact redesign that preserves the single-file/no-build PWA advantage while clarifying the core loop: pick up cargo, survive combat, deliver, upgrade, repeat.
- [x] Replacement-child preflight: verify the preserved patch with a local server and the official Playwright client before trusting any prior implementation claim.
- [x] Record first-run evidence in `progress.md`: exact command, screenshot paths, representative `render_game_to_text` output, and console status.
- [x] Keep all fixes in small deltas only, rerunning the official client after each meaningful change and inspecting the resulting screenshots.
- [x] Create a strong onboarding/start experience and make the first mission understandable and fun within 30 seconds.
- [x] Improve moment-to-moment play: movement, aim/shooting, impact feedback, enemy patterns, wave pacing, cargo risk/reward, upgrades, scoring, combo/reward cadence, game-over/restart.
- [x] Simplify or reposition secondary systems so daily missions, achievements, rewards, leaderboard, cosmetics, streamer mode, and monetization stubs do not overwhelm the core game.
- [x] Make desktop and mobile controls reliable; handle safe areas, orientation/resize, touch targets, `F` fullscreen and `Esc` exit.
- [x] Repair PWA functionality, including the missing service worker, offline cache, manifest consistency, install affordance, and documented install flows for Android/Chrome, iPhone/iPad Safari, and desktop Chrome/Edge.
- [x] Add accessible semantics/labels and honest metadata; remove stale `single-file MVP` positioning.
- [x] Add `window.render_game_to_text()` and deterministic `window.advanceTime(ms)` for gameplay verification.
- [x] Write `README.md` with live demo, features, controls, install instructions, local run, structure, testing, privacy/storage behavior, and known limitations.
- [x] Use the official `develop-web-game` Playwright client after every meaningful change; inspect gameplay screenshots, state JSON, and console errors.
- [x] Exercise start, movement, aiming, shooting, enemy death, player damage, cargo pickup/delivery, upgrades, pause/resume, game over/restart, mobile layout, fullscreen, install/offline behavior.
- [x] Produce a short upload-ready gameplay video showing hook, core loop, and progression without misleading claims or unlicensed assets.
- [x] Run independent review and fix/recheck every actionable finding.
- [x] Commit only task changes, push to `main`, verify GitHub Pages from the integrated revision, and record live health/gameplay evidence.
- [x] Update this file and `progress.md` with actual thread IDs, model/effort, artifacts, checks, deployment revision, and remaining risks.

## Review

Replacement child verified the preserved overhaul instead of rewriting it, then limited code edits to:

- Resetting stale pointer aim on run start/restart so early desktop keyboard movement does not inherit the menu click aim vector.
- Finishing PWA consistency in `manifest.json` and `sw.js`, including offline app-shell reload and a visible install affordance above overlays.
- Addressing the independent-review findings with scoped service-worker cleanup, actual 192/512 icons, working Quick Play boot, mobile HUD/touch separation, and a restrained renderer blend/point-size change.
- Writing `README.md` with live demo, controls, install flows, local serve instructions, architecture, testing, privacy, and known limitations.

Evidence recorded in `progress.md` includes official-client screenshots/state captures for smoke, pickup, delivery, upgrade, tier-2 continuation, and combat plus direct Playwright screenshots/state for pause/resume, fullscreen, game-over/restart, mobile portrait/landscape, and offline reload.

Independent Luna High recheck verdict: **PASS — no remaining actionable finding among the five.** Fresh read-only evidence covered the full loop, portrait/landscape HUD, renderer readability, Quick Play, manifest/icon dimensions, scoped cache behavior, offline reload, and zero console errors. Temporary recheck artifacts are under `/tmp/space-courier-independent-recheck`; durable fix evidence remains under `output/review-fixes/`.

Release/video owner: persistent thread `019f65a3-ea58-7311-9a84-c672ca1996db`, GPT-5.6 Luna, Medium effort, sole repository writer from this point. Independent Luna High reviewer thread `019f6582-7e92-7633-af08-e6551e6048b0` returned PASS before this phase. This release phase will add only repo-owned video/docs/evidence artifacts, rerun the official client and live gates, then commit/push/deploy from clean attached `main` while holding `/tmp/space_courier.deploy.lock` through live verification.

### Release plan

- [ ] Capture controlled gameplay frames for hook, pickup, ambush/combat, delivery, upgrade, tier 2, and install affordance; inspect representative frames/contact sheet.
- [ ] Encode `/Users/yohan/Projects/space_courier/docs/media/starforge-courier-gameplay.mp4` as 1280x720 H.264 yuv420p faststart and record metadata/commands.
- [ ] Add a GitHub-compatible README video link/preview without disturbing live demo/install guidance.
- [ ] Rerun the official develop-web-game client and direct PWA checks after video/docs changes; inspect screenshots/state and console output.
- [ ] Review the final diff, commit only intended task artifacts, and verify clean attached `main`.
- [ ] Acquire `/tmp/space_courier.deploy.lock`, fetch/pull/ancestor-check, push non-destructively, and verify GitHub Pages build/source/revision.
- [ ] Run bounded live HTTP/PWA/gameplay/Quick Play/offline/console verification and write durable release proof.

### Release review

Release complete: `docs/media/starforge-courier-gameplay.mp4` is a 23.240-second, 1280x720, H.264/yuv420p, silent, faststart MP4. The final capture/contact sheet was visually inspected; local and live official-client/PWA gates are clean. Final commit, Pages receipt, and live proof are recorded in `progress.md`.
