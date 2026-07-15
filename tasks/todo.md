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
| Implementation and focused tests | implementation child (to be recorded) | GPT-5.5 | Extra High | Cohesive no-build game/PWA/docs patch plus Playwright evidence | Core loop works, focused checks pass, unrelated state preserved | Ready |
| Independent playtest and polish review | review child (after implementation) | GPT-5.4 | High | Actionable findings with screenshot/text-state/console evidence | Findings fixed or explicitly resolved | Pending |
| Video packaging, release, and live verification | release child (after review) | Luna | Medium | Upload-ready MP4, clean integrated commit/push, Pages receipt, live proof | Integrated revision deployed and verified | Pending |

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
- [ ] Create a strong onboarding/start experience and make the first mission understandable and fun within 30 seconds.
- [ ] Improve moment-to-moment play: movement, aim/shooting, impact feedback, enemy patterns, wave pacing, cargo risk/reward, upgrades, scoring, combo/reward cadence, game-over/restart.
- [ ] Simplify or reposition secondary systems so daily missions, achievements, rewards, leaderboard, cosmetics, streamer mode, and monetization stubs do not overwhelm the core game.
- [ ] Make desktop and mobile controls reliable; handle safe areas, orientation/resize, touch targets, `F` fullscreen and `Esc` exit.
- [ ] Repair PWA functionality, including the missing service worker, offline cache, manifest consistency, install affordance, and documented install flows for Android/Chrome, iPhone/iPad Safari, and desktop Chrome/Edge.
- [ ] Add accessible semantics/labels and honest metadata; remove stale `single-file MVP` positioning.
- [ ] Add `window.render_game_to_text()` and deterministic `window.advanceTime(ms)` for gameplay verification.
- [ ] Write `README.md` with live demo, features, controls, install instructions, local run, structure, testing, privacy/storage behavior, and known limitations.
- [ ] Use the official `develop-web-game` Playwright client after every meaningful change; inspect gameplay screenshots, state JSON, and console errors.
- [ ] Exercise start, movement, aiming, shooting, enemy death, player damage, cargo pickup/delivery, upgrades, pause/resume, game over/restart, mobile layout, fullscreen, install/offline behavior.
- [ ] Produce a short upload-ready gameplay video showing hook, core loop, and progression without misleading claims or unlicensed assets.
- [ ] Run independent review and fix/recheck every actionable finding.
- [ ] Commit only task changes, push to `main`, verify GitHub Pages from the integrated revision, and record live health/gameplay evidence.
- [ ] Update this file and `progress.md` with actual thread IDs, model/effort, artifacts, checks, deployment revision, and remaining risks.

## Review

Execution in progress. Final review will be written only after live deployment verification.
