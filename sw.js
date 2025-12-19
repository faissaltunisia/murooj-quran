const CACHE_NAME = 'murooj-v2';
const assets = [
  './',
  './index.html',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Amiri:wght@700&family=Tajawal:wght@400;700;800&display=swap'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(assets)));
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});
