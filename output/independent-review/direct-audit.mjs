import fs from "node:fs";
import playwright from "/Users/yohan/node_modules/playwright/index.js";
const { chromium } = playwright;

const baseUrl = "http://127.0.0.1:4174/";
const root = "/Users/yohan/Projects/space_courier/output/independent-review";
fs.mkdirSync(root, { recursive: true });

function write(name, value) {
  fs.writeFileSync(`${root}/${name}`, typeof value === "string" ? value : JSON.stringify(value, null, 2));
}

function installConsoleCapture(page) {
  const errors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push({ type: "console.error", text: msg.text() });
  });
  page.on("pageerror", (error) => errors.push({ type: "pageerror", text: String(error) }));
  return errors;
}

async function state(page) {
  return page.evaluate(() => JSON.parse(window.render_game_to_text()));
}

async function step(page, ms) {
  await page.evaluate((duration) => window.advanceTime(duration), ms);
}

async function saveState(page, name) {
  write(name, await state(page));
}

async function runDesktop(browser) {
  const context = await browser.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1 });
  const page = await context.newPage();
  const errors = installConsoleCapture(page);
  await page.goto(baseUrl, { waitUntil: "networkidle" });
  await page.screenshot({ path: `${root}/desktop-menu.png` });
  write("desktop-menu.json", await page.evaluate(async () => ({
    viewport: { width: innerWidth, height: innerHeight },
    install: { display: getComputedStyle(document.querySelector("#installHint")).display, text: document.querySelector("#installHint").textContent },
    manifestHref: document.querySelector('link[rel="manifest"]')?.href || null,
    swSupported: "serviceWorker" in navigator,
    swController: Boolean(navigator.serviceWorker?.controller),
    renderType: typeof window.render_game_to_text,
    advanceType: typeof window.advanceTime
  })));

  await page.click("#startBtn");
  await step(page, 600);
  await page.screenshot({ path: `${root}/desktop-playing.png` });
  await saveState(page, "desktop-playing.json");

  await page.keyboard.press("p");
  await page.screenshot({ path: `${root}/desktop-paused.png` });
  await saveState(page, "desktop-paused.json");
  await page.keyboard.press("p");
  await step(page, 300);
  await saveState(page, "desktop-resumed.json");

  await page.keyboard.press("f");
  await page.waitForTimeout(120);
  const fullscreenOn = await page.evaluate(() => Boolean(document.fullscreenElement));
  await page.screenshot({ path: `${root}/desktop-fullscreen.png` });
  await page.keyboard.press("Escape");
  await page.waitForTimeout(120);
  const fullscreenOff = await page.evaluate(() => Boolean(document.fullscreenElement));
  write("desktop-fullscreen.json", { fullscreenOn, fullscreenOff });

  await page.keyboard.down("ArrowRight");
  await step(page, 1500);
  await page.keyboard.up("ArrowRight");
  const picked = await state(page);
  write("desktop-picked.json", picked);
  for (let i = 0; i < 28 && (await state(page)).mode !== "gameover"; i++) await step(page, 1000);
  await page.screenshot({ path: `${root}/desktop-gameover.png` });
  await saveState(page, "desktop-gameover.json");
  await page.keyboard.press("r");
  await step(page, 100);
  await saveState(page, "desktop-restarted.json");

  write("desktop-console-errors.json", errors);
  await context.close();
}

async function runMobile(browser) {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  const page = await context.newPage();
  const errors = installConsoleCapture(page);
  await page.goto(baseUrl, { waitUntil: "networkidle" });
  await page.screenshot({ path: `${root}/mobile-menu-portrait.png` });
  write("mobile-menu.json", await page.evaluate(() => ({
    viewport: { width: innerWidth, height: innerHeight },
    touchControls: getComputedStyle(document.querySelector("#touchControls")).display,
    install: { display: getComputedStyle(document.querySelector("#installHint")).display, text: document.querySelector("#installHint").textContent },
    menuCard: document.querySelector("#menuOverlay .card").getBoundingClientRect().toJSON(),
    installRect: document.querySelector("#installHint").getBoundingClientRect().toJSON()
  })));

  await page.click("#startBtn");
  await page.evaluate(() => {
    const stick = document.querySelector("#stick");
    const r = stick.getBoundingClientRect();
    const touch = new Touch({ identifier: 7, target: stick, clientX: r.left + r.width * .85, clientY: r.top + r.height * .5 });
    stick.dispatchEvent(new TouchEvent("touchstart", { bubbles: true, cancelable: true, changedTouches: [touch], touches: [touch] }));
  });
  await step(page, 700);
  await page.evaluate(() => document.querySelector("#touchShoot").dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, pointerId: 8, pointerType: "touch" })));
  await step(page, 500);
  await page.evaluate(() => window.dispatchEvent(new PointerEvent("pointerup", { bubbles: true, pointerId: 8, pointerType: "touch" })));
  await page.screenshot({ path: `${root}/mobile-playing-portrait.png` });
  await saveState(page, "mobile-playing-portrait.json");
  await page.evaluate(() => document.querySelector("#touchPause").click());
  await page.screenshot({ path: `${root}/mobile-paused-portrait.png` });
  await saveState(page, "mobile-paused-portrait.json");

  await page.setViewportSize({ width: 844, height: 390 });
  await page.waitForTimeout(250);
  await page.evaluate(() => document.querySelector("#resumeBtn").click());
  await page.screenshot({ path: `${root}/mobile-playing-landscape.png` });
  write("mobile-landscape.json", await page.evaluate(() => ({
    viewport: { width: innerWidth, height: innerHeight },
    touchControls: getComputedStyle(document.querySelector("#touchControls")).display,
    hud: document.querySelector("#hud").getBoundingClientRect().toJSON(),
    mission: document.querySelector("#missionPanel").getBoundingClientRect().toJSON(),
    stick: document.querySelector("#stick").getBoundingClientRect().toJSON(),
    buttons: document.querySelector("#touchButtons").getBoundingClientRect().toJSON()
  })));
  write("mobile-console-errors.json", errors);
  await context.close();
}

async function runQuickPlayAndPwa(browser) {
  const context = await browser.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1 });
  const page = await context.newPage();
  const errors = installConsoleCapture(page);
  await page.goto(`${baseUrl}?quickplay=true`, { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  write("quickplay.json", await page.evaluate(() => ({
    url: location.href,
    menuVisible: document.querySelector("#menuOverlay").classList.contains("show"),
    mode: JSON.parse(window.render_game_to_text()).mode,
    startVisible: getComputedStyle(document.querySelector("#startBtn")).display !== "none"
  })));
  await page.screenshot({ path: `${root}/quickplay.png` });

  await page.goto(baseUrl, { waitUntil: "networkidle" });
  await page.waitForTimeout(700);
  const swBefore = await page.evaluate(async () => ({
    controller: Boolean(navigator.serviceWorker.controller),
    registrations: await navigator.serviceWorker.getRegistrations().then((items) => items.map((r) => ({ scope: r.scope, active: Boolean(r.active) }))),
    caches: await caches.keys()
  }));
  write("pwa-online.json", swBefore);
  await page.reload({ waitUntil: "networkidle" });
  await page.waitForTimeout(250);
  await page.context().setOffline(true);
  await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(350);
  write("pwa-offline.json", await page.evaluate(() => ({
    online: navigator.onLine,
    controller: Boolean(navigator.serviceWorker.controller),
    menuVisible: document.querySelector("#menuOverlay").classList.contains("show"),
    renderType: typeof window.render_game_to_text,
    mode: JSON.parse(window.render_game_to_text()).mode
  })));
  await page.screenshot({ path: `${root}/pwa-offline.png` });
  await page.context().setOffline(false);

  write("pwa-console-errors.json", errors);
  await context.close();
}

const browser = await chromium.launch({ headless: true, args: ["--use-gl=angle", "--use-angle=swiftshader"] });
try {
  await runDesktop(browser);
  await runMobile(browser);
  await runQuickPlayAndPwa(browser);
} finally {
  await browser.close();
}
