# Starforge Courier — Design QA

## Comparison target

- Locked Option 3 visual reference: `/Users/yohan/.codex/generated_images/019f6503-0372-70d1-a71c-1534ba8db0ca/exec-c13b1acd-f93a-434e-9283-5c0d7e74aefb.png`
- Implementation desktop capture: `output/visual-recovery/final-page-1440x810.png`
- Comparison viewport and state: 1440×810 active gameplay frame with HUD, carrier/cargo/escorts, route lane, asteroid depth, and delivery-station anchor visible.
- Full-view comparison evidence: `output/visual-recovery/qa-reference-vs-implementation.png` (locked reference normalized to 1440×810 at left; implementation capture at right).
- Mobile/toast evidence: `output/visual-recovery/mobile-portrait-toast.png`, `output/visual-recovery/mobile-landscape-toast.png`, `output/visual-recovery/mobile-portrait.png`, and `output/visual-recovery/mobile-landscape.png`.

## Required fidelity surfaces

- The carrier is the dominant, readable broad triangular silhouette, with a visible orange mounted cargo bay and escort drones.
- The station is a clear right-side delivery anchor. Teal/orange route language, asteroid depth, and HUD establish an asteroid-world courier composition.
- Primary entities use cataloged raster sprites/textured quads; points remain limited to stars, trails, telegraphs, and impact/background FX. Asset source and usage: `docs/assets/starforge-asset-catalog.md`.
- Desktop keeps independent move/aim/fire behavior; mobile exposes MOVE/AIM twin sticks plus explicit FIRE and FOCUS controls.

## Comparison history

### Review 1 — FAIL, fixed by Terra

Independent reviewer: thread `019f65fe-231c-7e02-8a2a-bc3226abc7a0`, GPT-5.6 Luna, High effort.

- P2: the portrait startup toast obscured the mission row. Terra moved the portrait toast above touch controls and the short-landscape toast below the compact HUD; fresh visible-toast captures are listed above.
- P2: shipped `control-move.png`, `control-aim.png`, `control-fire.png`, and `control-focus.png` were cached/cataloged but unused. Terra applied those raster assets to the semantic, interactive mobile control surfaces without changing their touch behavior.
- P2: restart retained stale `aimSource:"mouse"`. Terra reset `activeAimInput` to `keyboard`, touch aim-assist state, and pointer eligibility in `resetRun()`; `output/visual-recovery/loop-states.json` records mouse ownership before restart and keyboard ownership immediately after.

### Review 2 — PASS

The same Luna thread rechecked the fixes read-only and returned **PASS**: no remaining P0, P1, or P2 findings. Luna explicitly authorized marking this Design QA result passed.

### Firing-direction regression — PASS

The user-supplied live screenshot exposed a post-review orientation defect: the route and projectile traveled right while the oversized carrier art faced left and was vertically flipped. The root cause was the texture-upload Y convention plus a world-Z/screen-Y sign mismatch in directional billboard rotation, not projectile physics.

- `output/release/firing-direction-right.png`: carrier nose, route marker, muzzle, and live bolt align right.
- `output/release/firing-direction-up.png`: arrow-key up aim rotates the carrier and live bolt upward.
- Carrier scale is reduced from 16.5 to 13 world units; cargo and escorts scale with it; gentler camera follow and restrained thrust bob make movement legible.
- The full desktop/mouse/touch/gamepad/game-loop suite and local PWA/offline audit pass with empty console errors.
- The 26.24-second release video and contact sheet were regenerated after the fix, so promotional evidence matches the shipped orientation.

## Findings

No actionable P0/P1/P2 findings remain. The implementation is a playable adaptation rather than a literal static-painting reproduction, while preserving the approved Option 3’s prioritized carrier, cargo/escort, station, palette, lane, and control hierarchy.

## Open Questions

No Design QA blocker remains. Release/video, commit, push, GitHub Pages verification, and X posting are intentionally not part of this gate and have not been performed in this recovery phase.

## Implementation Checklist

- [x] Compare the locked Option 3 reference and a full 1440×810 implementation capture.
- [x] Verify fresh portrait and landscape mobile control/toast evidence.
- [x] Verify official client smoke output: `output/visual-recovery/luna-fix-official/shot-0.png` and `state-0.json`.
- [x] Verify direct desktop control, cargo/combat/delivery/upgrade/restart, gamepad, and mobile suite: `node output/visual-recovery/acceptance.mjs http://127.0.0.1:4173`.
- [x] Verify restart ownership and touch aim assist through `loop-states.json` and `mobile-controls.json`.
- [x] Verify PWA subpath, service-worker cache, control sprites, Quick Play, and controlled offline reload: `output/visual-recovery/pwa-subpath-offline-r2.json`.
- [x] Verify console evidence: `output/visual-recovery/acceptance-errors.json` is `[]`; the official smoke emitted no error artifact.
- [x] Complete independent Luna High Review 2 with no remaining P0/P1/P2 findings.

## Follow-up Polish

No further visual/control polish is required for this approved QA gate. A separate Luna Medium release/video handoff remains pending and must create its own release evidence before any commit, push, deployment, trailer replacement, or X post.

final result: passed
