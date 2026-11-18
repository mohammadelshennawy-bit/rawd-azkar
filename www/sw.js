/* روض الذكر — Service Worker: تخزين كامل للعمل دون إنترنت */
const VERSION = 'rawd-1.11.1';
const CORE = ["./", "index.html", "download.html", "app.css", "app.js", "data.js", "greet-data.js", "hadith-data.js", "config.js", "i18n.js", "en.js", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png", "icons/maskable-512.png", "icons/apple-touch-icon.png", "fonts/q1.ttf", "img/mishkat.svg", "img/mushaf-icon.jpg", "fonts/q2.ttf", "fonts/q3.ttf", "fonts/q4.ttf", "bg/beach.jpg", "bg/blossom.jpg", "bg/clouds.jpg", "bg/daisies.jpg", "bg/jasmine.jpg", "bg/lake.jpg", "bg/lantern.jpg", "bg/lavender.jpg", "bg/mosque.jpg", "bg/mountains.jpg", "bg/olive.jpg", "bg/sea-dusk.jpg", "bg/sea-sunset.jpg", "bg/stream.jpg", "bg/tree-sunrise.jpg", "img/stickers/arafah.png", "img/stickers/ashura.png", "img/stickers/badr.png", "img/stickers/balaghana.png", "img/stickers/dawud.png", "img/stickers/dhulhijja.png", "img/stickers/dua-hour.png", "img/stickers/eid-adha.png", "img/stickers/eid-fitr.png", "img/stickers/fast-tomorrow.png", "img/stickers/fath.png", "img/stickers/g-adha.png", "img/stickers/g-ameen.png", "img/stickers/g-aqsa.png", "img/stickers/g-arafah.png", "img/stickers/g-dua.png", "img/stickers/g-eid-gift.png", "img/stickers/g-fanous.png", "img/stickers/g-fasting.png", "img/stickers/g-hajj.png", "img/stickers/g-hamd.png", "img/stickers/g-hijri.png", "img/stickers/g-iftar.png", "img/stickers/g-jazak.png", "img/stickers/g-jumuah-roses.png", "img/stickers/g-jumuah.png", "img/stickers/g-kahf.png", "img/stickers/g-kahk.png", "img/stickers/g-masaa.png", "img/stickers/g-mashallah.png", "img/stickers/g-palm.png", "img/stickers/g-qadr.png", "img/stickers/g-quran.png", "img/stickers/g-ramadan-lanterns.png", "img/stickers/g-sabah.png", "img/stickers/g-salah.png", "img/stickers/g-salam.png", "img/stickers/g-salawat.png", "img/stickers/g-suhur.png", "img/stickers/g-tasbih.png", "img/stickers/g-white-moon.png", "img/stickers/hijri.png", "img/stickers/hurum.png", "img/stickers/iftar.png", "img/stickers/index.json", "img/stickers/isra.png", "img/stickers/istighfar.png", "img/stickers/jumuah-1.png", "img/stickers/jumuah-2.png", "img/stickers/jumuah-3.png", "img/stickers/kahf.png", "img/stickers/kul-am.png", "img/stickers/masaa.png", "img/stickers/mawlid.png", "img/stickers/mon-thu.png", "img/stickers/muharram.png", "img/stickers/nisf-shaban.png", "img/stickers/qadr.png", "img/stickers/ramadan-kareem.png", "img/stickers/ramadan-mubarak.png", "img/stickers/sabah.png", "img/stickers/salawat.png", "img/stickers/shaban.png", "img/stickers/shawwal.png", "img/stickers/suhur.png", "img/stickers/takbir.png", "img/stickers/taqabbal.png", "img/stickers/white-days.png", "img/stickers/zakat-fitr.png"];
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
