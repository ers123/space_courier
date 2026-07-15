# Starforge Courier PWA Overhaul

Date: 2026-07-15  
Status: visual-quality recovery approved; Terra implementation gate in progress

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

- [x] Capture controlled gameplay frames for hook, pickup, ambush/combat, delivery, upgrade, tier 2, and install affordance; inspect representative frames/contact sheet.
- [x] Encode `/Users/yohan/Projects/space_courier/docs/media/starforge-courier-gameplay.mp4` as 1280x720 H.264 yuv420p faststart and record metadata/commands.
- [x] Add a GitHub-compatible README video link/preview without disturbing live demo/install guidance.
- [x] Rerun the official develop-web-game client and direct PWA checks after video/docs changes; inspect screenshots/state and console output.
- [x] Review the final diff, commit only intended task artifacts, and verify clean attached `main`.
- [x] Acquire `/tmp/space_courier.deploy.lock`, fetch/pull/ancestor-check, push non-destructively, and verify GitHub Pages build/source/revision.
- [x] Run bounded live HTTP/PWA/gameplay/Quick Play/offline/console verification and write durable release proof.

### Release review

Release complete: `docs/media/starforge-courier-gameplay.mp4` is a 23.240-second, 1280x720, H.264/yuv420p, silent, faststart MP4. The final capture/contact sheet was visually inspected; local and live official-client/PWA gates are clean. Final commit, Pages receipt, and live proof are recorded in `progress.md`.

## Current Luna Medium Release Takeover Plan — 2026-07-15

Persistent release thread: `019f6615-e235-75d0-bfdb-6c3f41765426` (GPT-5.6 Luna, Medium effort). This checklist supersedes stale release checkmarks above for the current recovery run; only fresh evidence from this thread may close these items.

- [x] Inspect the final recovery implementation, existing evidence, and current worktree; preserve unrelated `.DS_Store` files and exclude them from release.
- [x] Run the official web-game client and direct local full-loop/control/PWA gates; inspect fresh screenshots, text state, and console output.
- [x] Capture a real-input 24–30 second gameplay trailer showing start/install affordance, desktop controls, mobile twin-stick controls, pickup, combat/fire/impact, delivery score/scrap, upgrade, and tier progression.
- [x] Inspect the candidate MP4 with exact ffprobe metadata, faststart evidence, extracted frames, and a visually inspected contact sheet; replace the HOLD video only after it passes.
- [x] Reconcile `docs/social/x-post-kit.md` minimally against shipped behavior, including factual Korean/English copy, accessibility text, video description, and exactly `#GPT56 #Codex #gamedev` for the main post; do not post to X.
- [x] Verify README links and shipped manifest, service-worker, icon, sprite, video, and documentation assets.
- [x] Acquire `/tmp/space_courier.deploy.lock`, stage only intended release files, reconcile `main` non-destructively, commit, push, verify exact `origin/main`, GitHub Pages build/source, and live HTTP/gameplay/PWA/offline/console gates while holding the lock.
- [x] Record exact final revision, video specs, commands, Pages receipt, live proof, preserved leftovers, route thread/model/effort, and final Review in `tasks/todo.md` and `progress.md`.

### Current release review

Fresh local and live evidence is complete for verified evidence revision `22a3c617f85a95a9cba1242ef05d372bc4686fdc`; Pages built that exact revision and the live audit passed. The final docs-only receipt commit is reported in the release handoff. Persistent thread: `019f6615-e235-75d0-bfdb-6c3f41765426` (GPT-5.6 Luna, Medium effort); nothing has been posted to X.

### Final Review — 2026-07-15

- [x] Final MP4 replaced and independently inspected: 26.240 seconds, 1280×720, H.264 High, yuv420p, 25 fps, video-only, faststart; SHA-256 `0331c5e13683afdd8d4684506822712e68258a998e1ec8ff8cc4137a6bd489b3`.
- [x] Local official client, full loop, controls, gamepad, mobile layouts, PWA/offline, asset HTTP, and console gates passed.
- [x] X kit is factual and ready; Terra High is credited for final visual/control recovery; main hashtags are exactly `#GPT56 #Codex #gamedev`; no X post was made.
- [x] Prior exact evidence revision `22a3c617f85a95a9cba1242ef05d372bc4686fdc` was on `origin/main` and Pages reported `built` from that revision before this final docs-only receipt.
- [x] Final live HTTP, gameplay/full loop, Quick Play, mobile controls, controlled offline reload, and console gates passed; durable proof is `output/release/live-recovery-audit.json` and `output/release/live-full-loop.png`.
- [x] Preserved and excluded machine leftovers: `.DS_Store`, `docs/.DS_Store`, and `output/.DS_Store` remain untracked and unstaged; raw WebM/temporary scripts/obsolete delta captures were excluded.

## Visual Quality Recovery Plan — Approved 2026-07-15

Screenshot audit on 2026-07-15 found that the deployed build is functionally complete but does not meet the intended top-tier casual-game presentation bar. The point-sprite renderer gives the player, stations, enemies, projectiles, and effects nearly the same glowing-circle language, so the game reads as a particle prototype rather than a finished courier game. The current Pages deployment remains a valid PWA preview, but should not be treated as the final contest-facing cut.

Primary visual truth is concept option 3:
`/Users/yohan/.codex/generated_images/019f6503-0372-70d1-a71c-1534ba8db0ca/exec-c13b1acd-f93a-434e-9283-5c0d7e74aefb.png`

This choice is final for the recovery: the friendly broad triangular carrier, mounted cargo, escort drones, delivery station, explicit independent MOVE/AIM controls, and FIRE/FOCUS actions define the target. `star_image.png` is secondary art-direction context only.

### Firing-direction regression — 2026-07-15

- [x] Reproduce a fixed right-aim shot and compare the carrier nose, muzzle marker, bolt sprite, and projectile travel direction.
- [x] Correct the single visual-orientation source of truth without changing projectile physics or control ownership.
- [x] Rerun the official web-game client plus focused keyboard, mouse, touch, and gamepad fire-direction assertions; inspect screenshots and console output.
- [ ] Update the service-worker cache, commit only scoped files, push `main`, and verify the exact GitHub Pages revision and live asset responses.

Review: the texture upload was vertically flipped and billboard rotations used the world-Z sign directly even though world +Z projects down-screen. The fix enables WebGL Y-flip, converts world headings at one boundary, applies the carrier art's measured forward offset, reduces the carrier from 16.5 to 13 world units, and eases camera follow from 0.08 to 0.05. Focused right/up screenshots, the full acceptance suite, regenerated video contact sheet, and local PWA/offline audit passed with no console errors. Deployment remains the final unchecked gate.

Recovery starting state:

- Branch/revision: `main` at `ba8d2d3dfad17c75c0ad447444d36089f3c385a6`
- Pre-existing task changes to preserve: `tasks/todo.md`, `docs/social/x-post-kit.md`
- Unrelated machine files to preserve and exclude: `.DS_Store`, `docs/.DS_Store`, `output/.DS_Store`
- Existing `docs/media/starforge-courier-gameplay.mp4`: HOLD; not final

### Recovery relay route

| Phase | Thread | Model | Effort | Deliverable | Gate | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Recovery coordination | `019f65df-6b20-7fa0-a54a-10d7669b8f93` | GPT-5.6 Sol | Extra High | Exact target, phase briefs, gate decisions | Canonical checklist and evidence-backed handoffs | Complete |
| Art/control/gameplay implementation | `019f65e2-99b2-7f81-aef9-031b5fde0760` | GPT-5.6 Terra | High | Raster assets, renderer/control/game-feel overhaul, local verification | Review 1 P2 fixes verified; same-thread Luna Review 2 passed | Complete — Review 2 PASS |
| Independent visual/control review | `019f65fe-231c-7e02-8a2a-bc3226abc7a0` | GPT-5.6 Luna | High | Read-only findings and pass/recheck verdict | Review 1 FAIL → Terra fixes → same-thread Review 2 PASS; no P0/P1/P2 | Complete — Review 2 PASS |
| Video/release/live verification | `019f6615-e235-75d0-bfdb-6c3f41765426` | GPT-5.6 Luna | Medium | 26.24-second MP4, reconciled X kit, exact commit/push/Pages proof | Exact revision live and verified | Complete |

- [x] Audit the user-provided gameplay and Codex-sidebar screenshots and identify the renderer and routing root causes.
- [x] Resolve and inspect concept option 3 as the exact visual target; do not switch concepts.
- [x] Catalog every visible raster gameplay asset and save generated/imported assets as individual repo-owned files with source/usage notes.
  - [x] Inspect the locked Option 3 target and record measured entity/scene requirements in `docs/assets/starforge-asset-catalog.md`.
  - [x] Add one consistent, repo-owned raster asset for each carrier, mounted cargo, escort, station, enemy role, projectile, cargo/interactable, and UI control role.
- [x] Replace point sprites only for primary gameplay objects with distinct sprite/mesh silhouettes; retain points for trails, stars, pickups, and impact particles.
- [x] Implement independent controls: WASD move + arrow-key aim + Space fire; optional mouse aim that cannot permanently override keyboard; gamepad left/right sticks + fire; mobile twin sticks + FIRE/FOCUS + mild aim assist.
- [x] Keep carrier orientation, muzzle/projectile direction, input hints, and `render_game_to_text()` direction/control state consistent.
- [x] Rework the world composition with clear travel lanes, environmental depth, target gates, and less empty black space.
- [x] Rebuild the HUD hierarchy and responsive bounds so the objective, hull/cargo state, weapon state, and controls are legible without clipping or debug-like presentation.
- [x] Add restrained game feel: directional thrust, recoil, hit response, enemy telegraphs, delivery celebration, upgrade feedback, and game-over recovery.
- [x] Run the official web-game Playwright client after every meaningful gameplay delta and inspect screenshots, text state, and console output.
- [x] Verify the entire loop: pickup, combat/fire, delivery, score/scrap, upgrade/tier, restart/Quick Play.
- [x] Verify desktop keyboard aim without mouse, optional mouse aim, mobile twin-stick/fire/focus, and gamepad logic.
- [x] Compare 1440x810 desktop gameplay against the exact target; also verify mobile portrait/landscape and zero unexpected console errors.
- [x] Preserve and verify install/offline behavior, manifest/service-worker/assets, and GitHub Pages subpath compatibility.
- [x] Complete independent Luna High visual/control review; send findings to the same Terra thread and repeat until passed.
- [x] Create root `design-qa.md` with source/implementation evidence and `final result: passed` only after independent review genuinely clears P0/P1/P2.
- [x] Replace the HOLD video only after the visual gate passes with a real 24–30 second, 1280x720-or-better, H.264 MP4 showing the actual loop and controls.
- [x] Draft the complete X posting package: Korean and English main copy, optional replies, honest model-role framing, video edit script, accessibility text, and submission checklist.
- [x] Recheck every X claim against the shipped build; recommend `#GPT56 #Codex #gamedev` and keep `#PWA #WebGame` only for an optional technical reply.
- [x] Export and inspect the replacement X-ready MP4, then mark `docs/social/x-post-kit.md` ready instead of draft/hold.
- [x] Commit only scoped changes, push `main`, verify GitHub Pages was built from the exact revision, then rerun live gameplay/PWA checks while holding the deployment lock.
- [x] Route new child work to a separate projectless `space_courier` target with the absolute repo path pinned, avoiding the broad `/Users/yohan/Projects` project.
- [x] Record every recovery child thread ID/model/effort and the exact final revision/evidence here and in the final handoff.

### Recovery Review

The approved Option 3 target shipped. Terra High completed the visual/control recovery, Luna High independently cleared the second review with no P0/P1/P2 findings, and Luna Medium completed the video, scoped release, Pages build, and live gameplay/PWA verification. X remains intentionally unposted; the ready-to-copy package is in `docs/social/x-post-kit.md`.

### Terra implementation review — 2026-07-15

- Raster implementation is complete with individual 512px RGBA sources under `assets/sprites/`; primary gameplay entities use textured, camera-facing WebGL quads. Legacy point rendering is limited to stars, trails, telegraphs, and impact FX.
- The approved Option 3 comparison is captured at `output/visual-recovery/final-page-1440x810.png`; it shows the dominant carrier, cargo bay/escorts, asteroid field, route chevrons, right-side delivery anchor, and live HUD together.
- Acceptance evidence is under `output/visual-recovery/`: `desktop-controls.json`, `loop-states.json`, `mobile-controls.json`, `gamepad.json`, `pwa-subpath-offline.json`, and the associated inspected screenshots. All final direct console lists are empty; the final official client produced no `errors-*.json` artifact.
- No commit, push, deploy, trailer replacement, or X posting occurred. `design-qa.md` remains intentionally absent/unpassed until the independent Luna High review is genuinely complete.
- Remaining review focus: independent verification of visual fidelity, mobile control ergonomics, and the raster renderer on a fresh browser/device. The CSS touch-control chrome remains functional and is deliberately not a release blocker for this implementation phase.

### Luna Review 1 P2 fixes — 2026-07-15

- [x] Moved the mobile startup toast into a dedicated clear zone: above touch controls in portrait and directly below the compact HUD in short landscape. Fresh visible-toast captures: `output/visual-recovery/mobile-portrait-toast.png` and `mobile-landscape-toast.png`.
- [x] Bound the cached/cataloged raster `control-move.png`, `control-aim.png`, `control-fire.png`, and `control-focus.png` directly to the semantic, interactive touch elements. MOVE/AIM still retain move nubs; FIRE/FOCUS retain their original hit targets and labels.
- [x] Reset `activeAimInput` to `keyboard` and `touchAimAssistTarget`/pointer eligibility in `resetRun()`. `loop-states.json` now proves `aimSource:"mouse"` before pause/restart and `aimSource:"keyboard"` immediately after Restart Run.
- [x] Reran the official client, full acceptance suite, and a new-version subpath/offline test. Console evidence remains empty.

Independent Luna Review 2 is complete and passed; root `design-qa.md` records the approved final result.

### Luna Review 2 gate — 2026-07-15

- Independent reviewer thread `019f65fe-231c-7e02-8a2a-bc3226abc7a0` (GPT-5.6 Luna, High) completed the same-thread read-only recheck with verdict: **PASS**.
- Review sequence: Review 1 FAIL (three P2 findings) → Terra’s narrowly scoped fixes → Review 2 PASS. No P0/P1/P2 findings remain.
- `design-qa.md` is now created with the locked target, desktop/mobile evidence, verification record, and `final result: passed`.
- Video/release/live verification, commit, push, GitHub Pages verification, and X posting remain pending and were not performed by this QA-closeout update.
