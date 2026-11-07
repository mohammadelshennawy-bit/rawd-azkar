# روض الذكر — الأذكار والأدعية (أندرويد + آيفون + ويب)

16 بابًا و334 نصًّا مشكولًا من «حصن المسلم» و«من جوامع دعاء النبي ﷺ» و«أفكار ذهبية للعشر الأواخر».
يعمل دون إنترنت؛ الخطوط والصور مضمَّنة. الكود كله في مجلد `www/`، والتغليف بـ Capacitor، والبناء تلقائي عبر GitHub Actions.

## الرفع والبناء (مستودع واحد ← رابط ويب + APK + IPA)
1. أنشئ مستودعًا **عامًّا** جديدًا على GitHub (مثلًا `rawd-azkar`) وارفع **محتويات هذا المجلد** إلى فرع `main` (مع المجلد المخفي `.github`).
2. **Settings ← Pages ← Source: GitHub Actions** (مرة واحدة فقط).
3. من تبويب **Actions** ستعمل ثلاث تشغيلات تلقائيًّا (أو شغّلها يدويًّا بـ Run workflow):
   - `Deploy web app to GitHub Pages` ← الرابط: `https://اسم-المستخدم.github.io/rawd-azkar/`
   - `Build Android APK` ← ملف `rawd-azkar.apk`
   - `Build iOS (unsigned IPA)` ← ملف `rawd-azkar-unsigned.ipa`
4. بعد 5–10 دقائق افتح التشغيلة وحمّل الملفات من **Artifacts**.
5. لإرفاق ملف APK بصفحة تنزيل عامة: من صفحة المستودع ← Releases ← Draft a new release ← Tag: v1.4.3 ← Publish release. يُبنى الملف ويُرفق تلقائيًّا خلال 10 دقائق.
6. صفحة التحميل الجاهزة للنشر: `https://اسم-المستخدم.github.io/rawd-azkar/download.html`
7. رابط مباشر دائم لآخر APK: `https://github.com/اسم-المستخدم/rawd-azkar/releases/latest/download/rawd-azkar.apk`

## التثبيت عند المستخدمين
- **أندرويد:** حمّل `rawd-azkar.apk` من صفحة Releases وثبّته (فعّل «التثبيت من مصادر غير معروفة»). هذه نسخة debug؛ للنشر على Google Play يلزم توقيع release.
  أو: افتح رابط الموقع في Chrome ← ⋮ ← «تثبيت التطبيق».
- **آيفون (الأسهل، بلا حساب):** افتح رابط الموقع في Safari ← مشاركة ← «إضافة إلى الشاشة الرئيسية»، ويعمل دون إنترنت.
  ملف الـ IPA غير موقّع: يُثبَّت عبر Sideloadly/AltStore بحساب Apple مجاني (صلاحية 7 أيام)، أو يُوقَّع بحساب Apple Developer للنشر على TestFlight/App Store.

## التعديل
- النصوص: `www/data.js` — بعد أي تعديل غيّر `VERSION` في `www/sw.js` لتتحدّث النسخ المثبّتة.
- اسم التطبيق ومعرّفه: `appName` و`appId` في `capacitor.config.json`. الأيقونة والسبلاش في `assets/`.
- الخطوط: `www/fonts` (خطوط مجمع الملك فهد: النسخ السندي، السعودي، المجمع).
