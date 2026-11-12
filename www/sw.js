/* روض الذكر — Service Worker: تخزين كامل للعمل دون إنترنت */
const VERSION = 'rawd-v1.8.0';
const CORE = ["./", "index.html", "download.html", "app.css", "app.js", "data.js", "config.js", "i18n.js", "en.js", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png", "icons/maskable-512.png", "icons/apple-touch-icon.png", "fonts/q1.ttf", "img/mishkat.svg", "img/mushaf-icon.jpg", "fonts/q2.ttf", "fonts/q3.ttf", "fonts/q4.ttf", "bg/beach.jpg", "bg/blossom.jpg", "bg/clouds.jpg", "bg/daisies.jpg", "bg/jasmine.jpg", "bg/lake.jpg", "bg/lantern.jpg", "bg/lavender.jpg", "bg/mosque.jpg", "bg/mountains.jpg", "bg/olive.jpg", "bg/sea-dusk.jpg", "bg/sea-sunset.jpg", "bg/stream.jpg", "bg/tree-sunrise.jpg"];
const FONT_CACHE = 'rawd-fonts';
self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(CORE.map(u => new Request(u, { cache: 'reload' })))).then(() => self.skipWaiting()));   // cache:'reload' يتجاوز ذاكرة المتصفح فيجلب أحدث نسخة
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION && k !== FONT_CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request; if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // خطوط Google: تُخزَّن عند أول استخدام ثم تعمل دون إنترنت
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(caches.open(FONT_CACHE).then(async c => {
      const hit = await c.match(req); if (hit) return hit;
      try { const res = await fetch(req); if (res.ok || res.type === 'opaque') c.put(req, res.clone()); return res; }
      catch (err) { return new Response('', { status: 200, headers: { 'Content-Type': url.hostname.includes('googleapis') ? 'text/css' : 'font/woff2' } }); }
    }));
    return;
  }
  if (url.origin !== location.origin) return;
  // ملف الإعدادات: من الشبكة أولًا ليُطبَّق أي تعديل فورًا، ومن الذاكرة دون إنترنت
  if (url.pathname.endsWith('/config.js')) {
    e.respondWith(fetch(new Request(req, { cache: 'reload' })).then(res => { if (res.ok) { const cp = res.clone(); caches.open(VERSION).then(c => c.put('config.js', cp)); } return res; })
      .catch(() => caches.match('config.js')));
    return;
  }
  if (req.mode === 'navigate') {
    e.respondWith(caches.match('index.html').then(hit => hit || fetch(req)).catch(() => caches.match('index.html')));
    return;
  }
  e.respondWith(caches.match(req, { ignoreSearch: true }).then(hit => hit || fetch(req).then(res => {
    if (res.ok) { const cp = res.clone(); caches.open(VERSION).then(c => c.put(req, cp)); } return res;
  })));
});

// فتح التطبيق على الباب المطلوب عند الضغط على التنبيه
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const h = (e.notification.data && e.notification.data.h) || '';
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(cs => {
    for (const c of cs) { if ('focus' in c) { c.navigate ? c.navigate(self.registration.scope + h).catch(() => {}) : 0; return c.focus(); } }
    return self.clients.openWindow(self.registration.scope + h);
  }));
});
