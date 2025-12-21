const cacheName = 'murooj-v5'; // قمنا بتغيير الإصدار لتنظيف الكاش القديم
const assets = ['./', './index.html', './manifest.json'];

// عند التثبيت: تخزين الملفات الأساسية
self.addEventListener('install', e => {
  self.skipWaiting(); // إجبار المتصفح على تفعيل النسخة الجديدة فوراً
  e.waitUntil(
    caches.open(cacheName).then(c => c.addAll(assets))
  );
});

// عند التفعيل: حذف الكاش القديم تماماً
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== cacheName).map(key => caches.delete(key))
      );
    })
  );
});

// استراتيجية Network First: اطلب من الإنترنت أولاً، وإذا فشل استخدم الكاش
self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request)
      .then(res => {
        // إذا نجح الاتصال، خذ نسخة حديثة للكاش ورجع النتيجة
        const resClone = res.clone();
        caches.open(cacheName).then(cache => cache.put(e.request, resClone));
        return res;
      })
      .catch(() => caches.match(e.request)) // إذا انقطع الإنترنت، اعرض المخزن
  );
});
