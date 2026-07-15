const VERSION = "starforge-2026-07-15";
const CACHE_PREFIX = "starforge-shell-";
const CACHE_NAME = `starforge-shell-${VERSION}`;
const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.json",
  "./sw.js",
  "./star_icon.png",
  "./star_icon_192.png",
  "./star_icon_512.png",
  "./star_image.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.map((key) => (key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME ? caches.delete(key) : null))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request, { ignoreSearch: request.mode === "navigate" });
    const networkFetch = fetch(request).then((response) => {
      if (response && response.ok) cache.put(request, response.clone());
      return response;
    });

    if (cached) {
      event.waitUntil(networkFetch.catch(() => {}));
      return cached;
    }

    try {
      return await networkFetch;
    } catch (error) {
      if (request.mode === "navigate") {
        const shell = await cache.match("./index.html");
        if (shell) return shell;
      }
      throw error;
    }
  })());
});
