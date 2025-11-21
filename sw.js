const VERSION = 'v2.0.0'; // Updated with 2025 features
const STATIC_CACHE = `sfc-static-${VERSION}`;
const DYNAMIC_CACHE = `sfc-dynamic-${VERSION}`;
const STATIC_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './star_icon.png',
  './star_image.png'
];

// Install: cache static assets
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(STATIC_CACHE)
      .then(c => c.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate: cleanup old caches
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.map(k => {
          if (k.startsWith('sfc-') && k !== STATIC_CACHE && k !== DYNAMIC_CACHE) {
            return caches.delete(k);
          }
        })
      ))
      .then(() => self.clients.claim())
  );
});

// Fetch: Network-first with fallback for better updates
self.addEventListener('fetch', (e) => {
  const { request } = e;
  const url = new URL(request.url);

  // Skip cross-origin requests
  if (url.origin !== self.location.origin) return;

  // Network-first strategy with timeout
  e.respondWith(
    Promise.race([
      fetch(request)
        .then(resp => {
          // Cache successful responses
          if (resp && resp.status === 200) {
            const copy = resp.clone();
            const cacheName = STATIC_ASSETS.some(asset =>
              request.url.endsWith(asset.replace('./', ''))
            ) ? STATIC_CACHE : DYNAMIC_CACHE;
            caches.open(cacheName).then(c => c.put(request, copy));
          }
          return resp;
        }),
      // Timeout after 3s on slow networks
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('timeout')), 3000)
      )
    ])
    .catch(() =>
      // Fallback to cache
      caches.match(request)
        .then(r => r || caches.match('./index.html'))
    )
  );
});