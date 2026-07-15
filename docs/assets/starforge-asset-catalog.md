# Starforge Courier Asset Catalog

## Source and art direction

- Visual truth: `/Users/yohan/.codex/generated_images/019f6503-0372-70d1-a71c-1534ba8db0ca/exec-c13b1acd-f93a-434e-9283-5c0d7e74aefb.png`
- Reference viewport: 1680 x 943 (comparison capture target: 1440 x 810).
- Style: friendly pulp-space illustration; inked navy outlines, cream metal, burnt-orange cargo and engines, cyan energy accents, teal/orange nebulae, warm-gold objective light.
- Rendering contract: named gameplay entities are individual raster assets rendered on textured WebGL quads. The point pass is restricted to stars, trails, and impact/background particles.

## Required entity inventory

| Asset | Target evidence | Planned path | Runtime usage |
| --- | --- | --- | --- |
| Carrier | Broad cream triangular ship, nose right, twin orange engines | `assets/sprites/carrier.png` | Player body; rotates to active aim heading |
| Mounted cargo bay | Orange outlined crate mounted in carrier fuselage | `assets/sprites/cargo-bay.png` | Rendered over carrier only while carrying cargo |
| Escort drone | Small cream/cyan companion drone | `assets/sprites/escort-drone.png` | Two orbiting player escorts |
| Delivery station | Circular industrial dock with gold objective aura | `assets/sprites/delivery-station.png` | Pickup/drop anchors with distinct rings and marker |
| Chaser | Crimson compact patrol silhouette | `assets/sprites/enemy-chaser.png` | Chaser encounter role |
| Dasher | Orange swept-wing raider silhouette | `assets/sprites/enemy-dasher.png` | Dasher encounter role |
| Shooter | Cyan/teal long-range gunship silhouette | `assets/sprites/enemy-shooter.png` | Shooter encounter role |
| Player bolt | Warm orange pulse streak | `assets/sprites/player-bolt.png` | Player muzzle/projectile direction |
| Enemy bolt | Red pulse streak | `assets/sprites/enemy-bolt.png` | Enemy projectile direction |
| Cargo/interactable | Amber cargo crystal/crate | `assets/sprites/cargo-pod.png` | Pickup indicator and nearby cargo interaction anchor |
| Aim marker | Teal directional marker | `assets/sprites/aim-marker.png` | Directional objective/aim-assist marker |
| Asteroid | Jagged mineral asteroid-world anchor | `assets/sprites/asteroid.png` | Composed background depth and readable travel lanes |
| MOVE / AIM controls | Paired teal thumbstick controls | `assets/sprites/control-move.png`, `assets/sprites/control-aim.png` | Mobile twin-stick movement and independent aim |
| FIRE / FOCUS controls | Orange fire and teal focus action controls | `assets/sprites/control-fire.png`, `assets/sprites/control-focus.png` | Mobile action buttons |

## Provenance and processing log

| Asset family | Source | Transparency/process | Status |
| --- | --- | --- | --- |
| Gameplay sprite set | Generated as individual consistent-style image assets from the locked target art direction | Verified RGBA PNG transparency; safely downscaled from 1024px sources to 512px delivery textures, reducing the shipped sprite folder from 21MB to 2.8MB | Complete |

## Deliberate exclusions

- The target’s decorative large asteroids and nebula are world/background composition, not primary entities. They remain a restrained procedural/background layer in this no-build PWA.
- HUD text and standard control labels remain semantic DOM UI. Their game-specific control artwork is not substituted by emoji, glyph, inline SVG, or CSS drawings.
