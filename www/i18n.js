/* روض الذكر — محرّك اللغات
   العربية هي الأصل. عند اختيار لغة أخرى:
   - تُترجم الواجهة تلقائيًا من القاموس (en.js) لكل نص يظهر على الشاشة
   - يبقى نص الذكر بالعربية كما هو، ويُضاف تحته النطق بحروف لاتينية وترجمة المعنى */
(function () {
  const KEY = 'rawd-lang';
  let lang = 'ar';
  try { lang = localStorage.getItem(KEY) || 'ar'; } catch (e) {}
  const LANGS = { ar: { name: 'العربية', dir: 'rtl' }, en: { name: 'English', dir: 'ltr' } };
  if (!LANGS[lang]) lang = 'ar';
  const html = document.documentElement;
  html.lang = lang; html.dir = LANGS[lang].dir;

  const I = window.I18N = {
    lang, LANGS,
    get pack() { return lang === 'ar' ? null : window['I18N_' + lang.toUpperCase()] || null; },
    setLang(l) { try { localStorage.setItem(KEY, l); } catch (e) {} location.reload(); },
    tr, item, cat, occ, src, apply
  };

  const ARABIC = /[؀-ۿ]/;
  const norm = s => String(s).replace(/\s+/g, ' ').trim();
  // يفصل الرموز في البداية والنهاية (↺ ⚙ ♥ : … ←) عن النص نفسه
  const SPLIT = /^([^؀-ۿ]*?)([؀-ۿ][\s\S]*[؀-ۿﷺ»)؟!.…])([^؀-ۿﷺ]*)$/;

  function lookup(core) {
    const P = I.pack; if (!P) return null;
    const d = P.ui;
    if (d[core] != null) return d[core];
    if (P.names && P.names[core] != null) return P.names[core];
    const k2 = core.replace(/[:：.،]+$/, '');
    if (k2 !== core && (d[k2] != null || (P.names && P.names[k2] != null))) return (d[k2] ?? P.names[k2]) + core.slice(k2.length).replace('،', ',').replace('：', ':');
    for (const [re, fn] of P.pat || []) { const m = core.match(re); if (m) return typeof fn === 'function' ? fn(...m) : fn; }
    return null;
  }
  function tr(s) {
    if (lang === 'ar' || s == null) return s;
    const str = String(s); if (!ARABIC.test(str)) return str;
    // النص كاملًا أولًا، ثم بعد فصل الرموز في طرفيه
    const whole = lookup(norm(str));
    if (whole != null) return str.match(/^\s*/)[0] + whole + str.match(/\s*$/)[0];
    const m = str.match(SPLIT); if (!m) return str;
    const hit = lookup(norm(m[2]));
    return hit == null ? str : m[1] + hit + m[3];
  }
  // بيانات المحتوى
  function item(it) { const P = I.pack; return P && P.items ? P.items[it.id] || null : null; }
  function cat(c) { const P = I.pack; return P && P.cats ? P.cats[c.id] || null : null; }
  function occ(o) { const P = I.pack; return P && P.occ ? P.occ[o] || o : o; }
  function src(s) { const P = I.pack; if (!P || !s) return s; return (P.src && P.src[s]) || (P.srcFn ? P.srcFn(s) : s); }

  // لا نترجم نصوص الأذكار والآيات نفسها
  const SKIP = '.zbody,.zt,.reader-text,.rtext,.tz-phrase,.tz-t,.tz-verse,.dod .txt,.ord-row .t,.q,.xl,.ayah,textarea,input,script,style,[data-noi18n]';
  function translateText(node) {
    const v = node.nodeValue; if (!v || !ARABIC.test(v)) return;
    const p = node.parentElement; if (!p || p.closest(SKIP)) return;
    const t = tr(v); if (t !== v) node.nodeValue = t;
  }
  function translateAttrs(el) {
    if (el.closest && el.closest(SKIP) && !el.matches('input,textarea')) return;
    for (const a of ['placeholder', 'aria-label', 'title']) {
      const v = el.getAttribute && el.getAttribute(a);
      if (v && ARABIC.test(v)) { const t = tr(v); if (t !== v) el.setAttribute(a, t); }
    }
  }
  function apply(root) {
    if (lang === 'ar' || !I.pack || !root) return;
    if (root.nodeType === 3) return translateText(root);
    if (root.nodeType !== 1) return;
    translateAttrs(root);
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
    let n; while ((n = w.nextNode())) { if (n.nodeType === 3) translateText(n); else translateAttrs(n); }
  }
  if (lang !== 'ar') {
    const start = () => {
      apply(document.body);
      new MutationObserver(ms => { for (const m of ms) {
        if (m.type === 'characterData') translateText(m.target);
        else if (m.type === 'attributes') translateAttrs(m.target);
        else m.addedNodes.forEach(apply);
      } }).observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['placeholder', 'aria-label', 'title'] });
      document.title = tr(document.title);
    };
    // حزمة اللغة تُحمَّل بعد هذا الملف، فنبدأ عند اكتمال تحميل الصفحة
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
  }
})();
