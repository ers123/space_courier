const VERSION = 'v1.0.0';
const STATIC_CACHE = `sfc-static-${VERSION}`;
const STATIC_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './star_icon.png',
  './start_image.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(STATIC_CACHE).then(c => c.addAll(STATIC_ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => (k.startsWith('sfc-static-') && k !== STATIC_CACHE) ? caches.delete(k) : null))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  const { request } = e;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  e.respondWith(
    fetch(request)
      .then(resp => {
        const copy = resp.clone();
        caches.open(STATIC_CACHE).then(c => c.put(request, copy));
        return resp;
      })
      .catch(() => caches.match(request).then(r => r || caches.match('./index.html')))
  );
});