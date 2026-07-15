import { chromium } from "playwright";
import fs from "node:fs";

const base = process.argv[2] || "http://127.0.0.1:4173";
const out = new URL(".", import.meta.url).pathname;
const write = (name, value) => fs.writeFileSync(`${out}/${name}`, typeof value === "string" ? value : JSON.stringify(value, null, 2));
const state = async (page) => JSON.parse(await page.evaluate(() => window.render_game_to_text()));
const step = (page, ms) => page.evaluate((amount) => window.advanceTime(amount), ms);
const errors = [];

async function fresh(browser, viewport = { width: 1440, height: 810 }, touch = false) {
  const page = await browser.newPage({ viewport, hasTouch: touch, isMobile: touch });
  page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
  page.on("pageerror", (error) => errors.push(String(error)));
  const url = new URL(base);
  url.searchParams.set("acceptance", "r2");
  await page.goto(url.href, { waitUntil: "networkidle" });
  await page.click("#startBtn");
  return page;
}

async function touch(page, selector, type, x, y, id) {
  await page.$eval(selector, (el, data) => {
    const point = new Touch({ identifier: data.id, target: el, clientX: data.x, clientY: data.y, pageX: data.x, pageY: data.y });
    el.dispatchEvent(new TouchEvent(data.type, { bubbles: true, cancelable: true, changedTouches: [point], touches: data.type === "touchend" ? [] : [point] }));
  }, { type, x, y, id });
}

async function driveToTarget(page, fire = false, maxSteps = 22, done = (current) => current.mode === "upgrade") {
  for (let i = 0; i < maxSteps; i++) {
    const current = await state(page);
    if (done(current)) return current;
    const target = current.contract?.target;
    if (!target) return current;
    const dx = target.x - current.player.x;
    const dz = target.z - current.player.z;
    const held = [];
    if (dx > 1) held.push("KeyD"); else if (dx < -1) held.push("KeyA");
    if (dz > 1) held.push("KeyS"); else if (dz < -1) held.push("KeyW");
    if (fire) held.push("Space");
    for (const key of held) await page.keyboard.down(key);
    await step(page, 180);
    for (const key of held) await page.keyboard.up(key);
  }
  return state(page);
}

const browser = await chromium.launch({ headless: true });
try {
  const keyboard = await fresh(browser);
  await keyboard.keyboard.down("ArrowUp"); await step(keyboard, 120); await keyboard.keyboard.up("ArrowUp");
  const keyboardAim = await state(keyboard);
  await step(keyboard, 240);
  const staleMouseBlocked = await state(keyboard);
  await keyboard.mouse.move(1260, 405); await step(keyboard, 120);
  const mouseRetake = await state(keyboard);
  await keyboard.screenshot({ path: `${out}/desktop-controls.png` });
  write("desktop-controls.json", { keyboardAim, staleMouseBlocked, mouseRetake });
  if (keyboardAim.player.aimSource !== "keyboard" || staleMouseBlocked.player.aimSource !== "keyboard" || mouseRetake.player.aimSource !== "mouse") throw new Error("keyboard/mouse aim ownership assertion failed");

  const loop = await fresh(browser);
  await loop.keyboard.press("ArrowRight");
  const pickup = await driveToTarget(loop, false, 22, (current) => current.contract?.carrying);
  await loop.screenshot({ path: `${out}/loop-pickup.png` });
  let delivery = await driveToTarget(loop, true, 22, (current) => current.mode === "upgrade");
  await loop.screenshot({ path: `${out}/loop-delivery.png` });
  if (delivery.mode !== "upgrade") throw new Error(`delivery assertion failed: ${delivery.mode}`);
  await loop.click(".upgradeCard");
  const tierTwo = await state(loop);
  await loop.keyboard.press("KeyP");
  await loop.click("#restartFromPauseBtn");
  const restarted = await state(loop);
  await loop.mouse.move(1260, 405); await step(loop, 120);
  const mouseBeforeRestart = await state(loop);
  await loop.keyboard.press("KeyP");
  await loop.click("#restartFromPauseBtn");
  const aimAfterMouseRestart = await state(loop);
  write("loop-states.json", { pickup, delivery, tierTwo, restarted, mouseBeforeRestart, aimAfterMouseRestart });
  if (!pickup.contract.carrying || tierTwo.tier !== 2 || restarted.tier !== 1 || restarted.elapsed !== 0 || mouseBeforeRestart.player.aimSource !== "mouse" || aimAfterMouseRestart.player.aimSource !== "keyboard") throw new Error("loop/restart assertion failed");

  const mobile = await fresh(browser, { width: 390, height: 844 }, true);
  await mobile.waitForTimeout(80);
  await mobile.screenshot({ path: `${out}/mobile-portrait-toast.png` });
  await mobile.setViewportSize({ width: 844, height: 390 }); await step(mobile, 60);
  await mobile.screenshot({ path: `${out}/mobile-landscape-toast.png` });
  await mobile.setViewportSize({ width: 390, height: 844 }); await step(mobile, 60);
  const move = await mobile.locator("#stick").boundingBox();
  await touch(mobile, "#stick", "touchstart", move.x + move.width - 8, move.y + move.height / 2, 1);
  await step(mobile, 1600);
  const afterTouchMove = await state(mobile);
  const aim = await mobile.locator("#aimStick").boundingBox();
  const enemy = afterTouchMove.enemies[0];
  const dx = enemy ? enemy.x - afterTouchMove.player.x : 1;
  const dz = enemy ? enemy.z - afterTouchMove.player.z : 0;
  const norm = Math.hypot(dx, dz) || 1;
  await touch(mobile, "#aimStick", "touchstart", aim.x + aim.width / 2 + dx / norm * aim.width * .38, aim.y + aim.height / 2 + dz / norm * aim.height * .38, 2);
  await step(mobile, 300);
  const touchAssist = await state(mobile);
  await mobile.waitForTimeout(1400);
  await mobile.screenshot({ path: `${out}/mobile-portrait.png` });
  await mobile.setViewportSize({ width: 844, height: 390 }); await step(mobile, 120);
  await mobile.screenshot({ path: `${out}/mobile-landscape.png` });
  write("mobile-controls.json", { afterTouchMove, touchAssist });
  if (afterTouchMove.player.x <= 1 || touchAssist.player.aimSource !== "touch" || !touchAssist.player.touchAimAssistTarget) throw new Error("touch/touch-assist assertion failed");

  const gamepad = await fresh(browser);
  await gamepad.evaluate(() => {
    window.__acceptancePad = { axes: [1, 0, 0, -1], buttons: [{ pressed: true, value: 1 }, { pressed: false, value: 0 }, {}, {}, {}, {}, { value: 0 }, { value: 0 }] };
    navigator.getGamepads = () => [window.__acceptancePad];
  });
  await step(gamepad, 600);
  const gamepadState = await state(gamepad);
  write("gamepad.json", gamepadState);
  if (gamepadState.player.aimSource !== "gamepad" || gamepadState.player.x <= 1 || gamepadState.bullets.player < 1) throw new Error("gamepad assertion failed");

  write("acceptance-errors.json", errors);
  if (errors.length) throw new Error(`console errors: ${errors.join(" | ")}`);
} finally {
  await browser.close();
}
