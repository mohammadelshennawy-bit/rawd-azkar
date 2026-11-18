/* روض الذكر — تطبيق ويب تقدّمي (PWA) يعمل دون إنترنت — الإصدار 1.2 */
(() => {
'use strict';
const DATA = window.AZKAR_DATA || [];
const CAT = Object.fromEntries(DATA.map(c => [c.id, c]));
const ITEM = {};
DATA.forEach(c => c.items.forEach((it, i) => { it.cat = c.id; it.idx = i; ITEM[it.id] = it; }));
const $ = (s, el = document) => el.querySelector(s);
const view = $('#view');
const AR = n => String(n);                       // الأرقام بالإنجليزية (0-9) في كل التطبيق
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const clean = t => String(t || '').replace(/[ \t]+\n/g, '\n').replace(/\n\s*\n+/g, '\n').trim();   // حذف الأسطر الفارغة
const pad = n => String(n).padStart(2, '0');
const LOGO = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="40 40 920 920" role="img" aria-label="شعار مشكاة"><polygon points="500.0,76.0 624.4,199.7 799.8,200.2 800.3,375.6 924.0,500.0 800.3,624.4 799.8,799.8 624.4,800.3 500.0,924.0 375.6,800.3 200.2,799.8 199.7,624.4 76.0,500.0 199.7,375.6 200.2,200.2 375.6,199.7" fill="#0f2350" stroke="#D9B15C" stroke-width="18" stroke-linejoin="round"/><path d="M379 670 V480 Q379 360 500 297 Q621 360 621 480 V670" fill="none" stroke="#D9B15C" stroke-width="16" stroke-linejoin="round"/><line x1="335" y1="677" x2="665" y2="677" stroke="#D9B15C" stroke-width="16" stroke-linecap="round"/><line x1="500" y1="340" x2="500" y2="420" stroke="#D9B15C" stroke-width="12"/><path d="M448 422 H552 L528 458 Q578 482 578 532 Q578 598 500 622 Q422 598 422 532 Q422 482 472 458 Z" fill="#17336e" stroke="#D9B15C" stroke-width="12" stroke-linejoin="round"/><path d="M500 488 Q528 525 500 580 Q472 525 500 488 Z" fill="#D9B15C"/></svg>';
const INSTAPAY = 'moshen2026@instapay';
const INSTAPAY_URL = 'https://ipn.eg/C/Q/moshen2026/instapay?ISIGN=23052603MEUCIQCB/caVkAj879K/uDiPj2rXI0mT+feDQupgvva37LHEvgIgfxEdjo/IOCdGlkMOQJPYHdv1MvuhF2Zzip2uxgTTn94=';
const INSTAPAY_QR = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 57 57" shape-rendering="crispEdges" role="img" aria-label="رمز InstaPay"><rect width="57" height="57" fill="#ffffff"/><g fill="#0B1D3F"><rect x="4" y="4" width="7" height="1"/><rect x="13" y="4" width="2" height="1"/><rect x="17" y="4" width="1" height="1"/><rect x="22" y="4" width="3" height="1"/><rect x="26" y="4" width="2" height="1"/><rect x="30" y="4" width="3" height="1"/><rect x="34" y="4" width="2" height="1"/><rect x="38" y="4" width="1" height="1"/><rect x="40" y="4" width="2" height="1"/><rect x="44" y="4" width="1" height="1"/><rect x="46" y="4" width="7" height="1"/><rect x="4" y="5" width="1" height="1"/><rect x="10" y="5" width="1" height="1"/><rect x="12" y="5" width="5" height="1"/><rect x="20" y="5" width="1" height="1"/><rect x="25" y="5" width="3" height="1"/><rect x="30" y="5" width="1" height="1"/><rect x="32" y="5" width="2" height="1"/><rect x="36" y="5" width="4" height="1"/><rect x="42" y="5" width="3" height="1"/><rect x="46" y="5" width="1" height="1"/><rect x="52" y="5" width="1" height="1"/><rect x="4" y="6" width="1" height="1"/><rect x="6" y="6" width="3" height="1"/><rect x="10" y="6" width="1" height="1"/><rect x="12" y="6" width="1" height="1"/><rect x="14" y="6" width="1" height="1"/><rect x="16" y="6" width="2" height="1"/><rect x="19" y="6" width="3" height="1"/><rect x="24" y="6" width="1" height="1"/><rect x="27" y="6" width="1" height="1"/><rect x="31" y="6" width="1" height="1"/><rect x="34" y="6" width="4" height="1"/><rect x="39" y="6" width="1" height="1"/><rect x="43" y="6" width="2" height="1"/><rect x="46" y="6" width="1" height="1"/><rect x="48" y="6" width="3" height="1"/><rect x="52" y="6" width="1" height="1"/><rect x="4" y="7" width="1" height="1"/><rect x="6" y="7" width="3" height="1"/><rect x="10" y="7" width="1" height="1"/><rect x="12" y="7" width="1" height="1"/><rect x="14" y="7" width="1" height="1"/><rect x="17" y="7" width="1" height="1"/><rect x="21" y="7" width="2" height="1"/><rect x="24" y="7" width="2" height="1"/><rect x="28" y="7" width="1" height="1"/><rect x="31" y="7" width="3" height="1"/><rect x="36" y="7" width="2" height="1"/><rect x="39" y="7" width="3" height="1"/><rect x="43" y="7" width="1" height="1"/><rect x="46" y="7" width="1" height="1"/><rect x="48" y="7" width="3" height="1"/><rect x="52" y="7" width="1" height="1"/><rect x="4" y="8" width="1" height="1"/><rect x="6" y="8" width="3" height="1"/><rect x="10" y="8" width="1" height="1"/><rect x="13" y="8" width="3" height="1"/><rect x="17" y="8" width="1" height="1"/><rect x="19" y="8" width="1" height="1"/><rect x="22" y="8" width="9" height="1"/><rect x="32" y="8" width="6" height="1"/><rect x="39" y="8" width="3" height="1"/><rect x="46" y="8" width="1" height="1"/><rect x="48" y="8" width="3" height="1"/><rect x="52" y="8" width="1" height="1"/><rect x="4" y="9" width="1" height="1"/><rect x="10" y="9" width="1" height="1"/><rect x="15" y="9" width="2" height="1"/><rect x="18" y="9" width="1" height="1"/><rect x="24" y="9" width="1" height="1"/><rect x="26" y="9" width="1" height="1"/><rect x="30" y="9" width="2" height="1"/><rect x="38" y="9" width="3" height="1"/><rect x="42" y="9" width="1" height="1"/><rect x="46" y="9" width="1" height="1"/><rect x="52" y="9" width="1" height="1"/><rect x="4" y="10" width="7" height="1"/><rect x="12" y="10" width="1" height="1"/><rect x="14" y="10" width="1" height="1"/><rect x="16" y="10" width="1" height="1"/><rect x="18" y="10" width="1" height="1"/><rect x="20" y="10" width="1" height="1"/><rect x="22" y="10" width="1" height="1"/><rect x="24" y="10" width="1" height="1"/><rect x="26" y="10" width="1" height="1"/><rect x="28" y="10" width="1" height="1"/><rect x="30" y="10" width="1" height="1"/><rect x="32" y="10" width="1" height="1"/><rect x="34" y="10" width="1" height="1"/><rect x="36" y="10" width="1" height="1"/><rect x="38" y="10" width="1" height="1"/><rect x="40" y="10" width="1" height="1"/><rect x="42" y="10" width="1" height="1"/><rect x="44" y="10" width="1" height="1"/><rect x="46" y="10" width="7" height="1"/><rect x="12" y="11" width="1" height="1"/><rect x="17" y="11" width="3" height="1"/><rect x="23" y="11" width="4" height="1"/><rect x="30" y="11" width="1" height="1"/><rect x="32" y="11" width="1" height="1"/><rect x="34" y="11" width="1" height="1"/><rect x="37" y="11" width="2" height="1"/><rect x="40" y="11" width="1" height="1"/><rect x="4" y="12" width="1" height="1"/><rect x="10" y="12" width="1" height="1"/><rect x="12" y="12" width="1" height="1"/><rect x="14" y="12" width="2" height="1"/><rect x="17" y="12" width="3" height="1"/><rect x="21" y="12" width="1" height="1"/><rect x="26" y="12" width="5" height="1"/><rect x="33" y="12" width="1" height="1"/><rect x="35" y="12" width="1" height="1"/><rect x="39" y="12" width="2" height="1"/><rect x="45" y="12" width="2" height="1"/><rect x="49" y="12" width="3" height="1"/><rect x="4" y="13" width="2" height="1"/><rect x="8" y="13" width="2" height="1"/><rect x="12" y="13" width="2" height="1"/><rect x="16" y="13" width="1" height="1"/><rect x="20" y="13" width="1" height="1"/><rect x="22" y="13" width="5" height="1"/><rect x="30" y="13" width="1" height="1"/><rect x="33" y="13" width="7" height="1"/><rect x="42" y="13" width="7" height="1"/><rect x="50" y="13" width="1" height="1"/><rect x="52" y="13" width="1" height="1"/><rect x="4" y="14" width="5" height="1"/><rect x="10" y="14" width="1" height="1"/><rect x="14" y="14" width="2" height="1"/><rect x="17" y="14" width="1" height="1"/><rect x="19" y="14" width="2" height="1"/><rect x="22" y="14" width="2" height="1"/><rect x="27" y="14" width="1" height="1"/><rect x="29" y="14" width="2" height="1"/><rect x="34" y="14" width="1" height="1"/><rect x="37" y="14" width="1" height="1"/><rect x="40" y="14" width="4" height="1"/><rect x="46" y="14" width="4" height="1"/><rect x="51" y="14" width="2" height="1"/><rect x="6" y="15" width="1" height="1"/><rect x="9" y="15" width="1" height="1"/><rect x="15" y="15" width="1" height="1"/><rect x="17" y="15" width="2" height="1"/><rect x="21" y="15" width="1" height="1"/><rect x="24" y="15" width="2" height="1"/><rect x="28" y="15" width="1" height="1"/><rect x="30" y="15" width="7" height="1"/><rect x="40" y="15" width="1" height="1"/><rect x="42" y="15" width="1" height="1"/><rect x="49" y="15" width="1" height="1"/><rect x="51" y="15" width="1" height="1"/><rect x="6" y="16" width="2" height="1"/><rect x="9" y="16" width="2" height="1"/><rect x="13" y="16" width="1" height="1"/><rect x="15" y="16" width="1" height="1"/><rect x="17" y="16" width="2" height="1"/><rect x="20" y="16" width="1" height="1"/><rect x="24" y="16" width="2" height="1"/><rect x="28" y="16" width="1" height="1"/><rect x="31" y="16" width="2" height="1"/><rect x="36" y="16" width="3" height="1"/><rect x="40" y="16" width="1" height="1"/><rect x="43" y="16" width="1" height="1"/><rect x="45" y="16" width="1" height="1"/><rect x="48" y="16" width="2" height="1"/><rect x="7" y="17" width="1" height="1"/><rect x="9" y="17" width="1" height="1"/><rect x="12" y="17" width="1" height="1"/><rect x="14" y="17" width="2" height="1"/><rect x="18" y="17" width="1" height="1"/><rect x="22" y="17" width="1" height="1"/><rect x="26" y="17" width="1" height="1"/><rect x="28" y="17" width="2" height="1"/><rect x="33" y="17" width="5" height="1"/><rect x="39" y="17" width="1" height="1"/><rect x="41" y="17" width="1" height="1"/><rect x="46" y="17" width="1" height="1"/><rect x="49" y="17" width="1" height="1"/><rect x="51" y="17" width="1" height="1"/><rect x="9" y="18" width="2" height="1"/><rect x="12" y="18" width="1" height="1"/><rect x="14" y="18" width="3" height="1"/><rect x="21" y="18" width="3" height="1"/><rect x="31" y="18" width="1" height="1"/><rect x="34" y="18" width="6" height="1"/><rect x="42" y="18" width="2" height="1"/><rect x="48" y="18" width="2" height="1"/><rect x="51" y="18" width="2" height="1"/><rect x="5" y="19" width="2" height="1"/><rect x="9" y="19" width="1" height="1"/><rect x="12" y="19" width="2" height="1"/><rect x="15" y="19" width="5" height="1"/><rect x="21" y="19" width="2" height="1"/><rect x="24" y="19" width="1" height="1"/><rect x="26" y="19" width="2" height="1"/><rect x="31" y="19" width="1" height="1"/><rect x="35" y="19" width="4" height="1"/><rect x="40" y="19" width="1" height="1"/><rect x="43" y="19" width="3" height="1"/><rect x="48" y="19" width="3" height="1"/><rect x="52" y="19" width="1" height="1"/><rect x="4" y="20" width="5" height="1"/><rect x="10" y="20" width="1" height="1"/><rect x="13" y="20" width="4" height="1"/><rect x="21" y="20" width="1" height="1"/><rect x="26" y="20" width="1" height="1"/><rect x="28" y="20" width="2" height="1"/><rect x="35" y="20" width="1" height="1"/><rect x="37" y="20" width="5" height="1"/><rect x="44" y="20" width="1" height="1"/><rect x="47" y="20" width="1" height="1"/><rect x="49" y="20" width="1" height="1"/><rect x="4" y="21" width="3" height="1"/><rect x="8" y="21" width="2" height="1"/><rect x="13" y="21" width="3" height="1"/><rect x="17" y="21" width="1" height="1"/><rect x="22" y="21" width="2" height="1"/><rect x="28" y="21" width="2" height="1"/><rect x="31" y="21" width="1" height="1"/><rect x="33" y="21" width="2" height="1"/><rect x="36" y="21" width="2" height="1"/><rect x="39" y="21" width="3" height="1"/><rect x="46" y="21" width="4" height="1"/><rect x="4" y="22" width="2" height="1"/><rect x="7" y="22" width="1" height="1"/><rect x="10" y="22" width="1" height="1"/><rect x="13" y="22" width="4" height="1"/><rect x="18" y="22" width="1" height="1"/><rect x="20" y="22" width="3" height="1"/><rect x="27" y="22" width="1" height="1"/><rect x="29" y="22" width="1" height="1"/><rect x="32" y="22" width="2" height="1"/><rect x="35" y="22" width="2" height="1"/><rect x="39" y="22" width="4" height="1"/><rect x="48" y="22" width="3" height="1"/><rect x="52" y="22" width="1" height="1"/><rect x="5" y="23" width="3" height="1"/><rect x="11" y="23" width="2" height="1"/><rect x="16" y="23" width="10" height="1"/><rect x="29" y="23" width="1" height="1"/><rect x="32" y="23" width="1" height="1"/><rect x="35" y="23" width="5" height="1"/><rect x="41" y="23" width="2" height="1"/><rect x="47" y="23" width="3" height="1"/><rect x="51" y="23" width="1" height="1"/><rect x="4" y="24" width="1" height="1"/><rect x="6" y="24" width="2" height="1"/><rect x="10" y="24" width="2" height="1"/><rect x="15" y="24" width="2" height="1"/><rect x="21" y="24" width="2" height="1"/><rect x="26" y="24" width="5" height="1"/><rect x="34" y="24" width="1" height="1"/><rect x="38" y="24" width="3" height="1"/><rect x="42" y="24" width="1" height="1"/><rect x="44" y="24" width="3" height="1"/><rect x="50" y="24" width="1" height="1"/><rect x="52" y="24" width="1" height="1"/><rect x="4" y="25" width="1" height="1"/><rect x="6" y="25" width="3" height="1"/><rect x="12" y="25" width="1" height="1"/><rect x="15" y="25" width="1" height="1"/><rect x="19" y="25" width="1" height="1"/><rect x="23" y="25" width="2" height="1"/><rect x="27" y="25" width="4" height="1"/><rect x="33" y="25" width="8" height="1"/><rect x="42" y="25" width="3" height="1"/><rect x="46" y="25" width="2" height="1"/><rect x="51" y="25" width="2" height="1"/><rect x="4" y="26" width="1" height="1"/><rect x="7" y="26" width="7" height="1"/><rect x="16" y="26" width="1" height="1"/><rect x="18" y="26" width="2" height="1"/><rect x="21" y="26" width="3" height="1"/><rect x="25" y="26" width="6" height="1"/><rect x="40" y="26" width="1" height="1"/><rect x="42" y="26" width="1" height="1"/><rect x="44" y="26" width="5" height="1"/><rect x="51" y="26" width="2" height="1"/><rect x="4" y="27" width="1" height="1"/><rect x="6" y="27" width="1" height="1"/><rect x="8" y="27" width="1" height="1"/><rect x="12" y="27" width="1" height="1"/><rect x="14" y="27" width="1" height="1"/><rect x="16" y="27" width="1" height="1"/><rect x="18" y="27" width="2" height="1"/><rect x="21" y="27" width="3" height="1"/><rect x="25" y="27" width="2" height="1"/><rect x="30" y="27" width="2" height="1"/><rect x="34" y="27" width="2" height="1"/><rect x="37" y="27" width="1" height="1"/><rect x="39" y="27" width="1" height="1"/><rect x="41" y="27" width="1" height="1"/><rect x="44" y="27" width="1" height="1"/><rect x="48" y="27" width="2" height="1"/><rect x="51" y="27" width="2" height="1"/><rect x="4" y="28" width="5" height="1"/><rect x="10" y="28" width="1" height="1"/><rect x="12" y="28" width="1" height="1"/><rect x="16" y="28" width="1" height="1"/><rect x="19" y="28" width="1" height="1"/><rect x="21" y="28" width="1" height="1"/><rect x="23" y="28" width="1" height="1"/><rect x="25" y="28" width="2" height="1"/><rect x="28" y="28" width="1" height="1"/><rect x="30" y="28" width="1" height="1"/><rect x="32" y="28" width="2" height="1"/><rect x="36" y="28" width="1" height="1"/><rect x="38" y="28" width="3" height="1"/><rect x="42" y="28" width="3" height="1"/><rect x="46" y="28" width="1" height="1"/><rect x="48" y="28" width="1" height="1"/><rect x="50" y="28" width="2" height="1"/><rect x="4" y="29" width="2" height="1"/><rect x="7" y="29" width="2" height="1"/><rect x="12" y="29" width="4" height="1"/><rect x="17" y="29" width="2" height="1"/><rect x="23" y="29" width="1" height="1"/><rect x="25" y="29" width="2" height="1"/><rect x="30" y="29" width="2" height="1"/><rect x="34" y="29" width="2" height="1"/><rect x="37" y="29" width="1" height="1"/><rect x="40" y="29" width="1" height="1"/><rect x="43" y="29" width="2" height="1"/><rect x="48" y="29" width="1" height="1"/><rect x="50" y="29" width="2" height="1"/><rect x="6" y="30" width="1" height="1"/><rect x="8" y="30" width="5" height="1"/><rect x="19" y="30" width="2" height="1"/><rect x="25" y="30" width="7" height="1"/><rect x="36" y="30" width="1" height="1"/><rect x="40" y="30" width="3" height="1"/><rect x="44" y="30" width="7" height="1"/><rect x="52" y="30" width="1" height="1"/><rect x="9" y="31" width="1" height="1"/><rect x="12" y="31" width="4" height="1"/><rect x="18" y="31" width="1" height="1"/><rect x="22" y="31" width="1" height="1"/><rect x="24" y="31" width="1" height="1"/><rect x="26" y="31" width="1" height="1"/><rect x="29" y="31" width="3" height="1"/><rect x="33" y="31" width="1" height="1"/><rect x="37" y="31" width="2" height="1"/><rect x="41" y="31" width="2" height="1"/><rect x="45" y="31" width="1" height="1"/><rect x="48" y="31" width="1" height="1"/><rect x="50" y="31" width="3" height="1"/><rect x="6" y="32" width="1" height="1"/><rect x="8" y="32" width="1" height="1"/><rect x="10" y="32" width="2" height="1"/><rect x="13" y="32" width="2" height="1"/><rect x="17" y="32" width="2" height="1"/><rect x="20" y="32" width="1" height="1"/><rect x="22" y="32" width="1" height="1"/><rect x="25" y="32" width="2" height="1"/><rect x="29" y="32" width="1" height="1"/><rect x="31" y="32" width="1" height="1"/><rect x="34" y="32" width="2" height="1"/><rect x="38" y="32" width="1" height="1"/><rect x="40" y="32" width="1" height="1"/><rect x="42" y="32" width="2" height="1"/><rect x="45" y="32" width="1" height="1"/><rect x="50" y="32" width="1" height="1"/><rect x="4" y="33" width="1" height="1"/><rect x="11" y="33" width="1" height="1"/><rect x="13" y="33" width="2" height="1"/><rect x="17" y="33" width="3" height="1"/><rect x="23" y="33" width="2" height="1"/><rect x="27" y="33" width="2" height="1"/><rect x="30" y="33" width="1" height="1"/><rect x="32" y="33" width="4" height="1"/><rect x="37" y="33" width="1" height="1"/><rect x="39" y="33" width="1" height="1"/><rect x="41" y="33" width="1" height="1"/><rect x="43" y="33" width="1" height="1"/><rect x="45" y="33" width="1" height="1"/><rect x="47" y="33" width="1" height="1"/><rect x="49" y="33" width="1" height="1"/><rect x="4" y="34" width="1" height="1"/><rect x="7" y="34" width="5" height="1"/><rect x="13" y="34" width="1" height="1"/><rect x="17" y="34" width="1" height="1"/><rect x="19" y="34" width="1" height="1"/><rect x="21" y="34" width="1" height="1"/><rect x="23" y="34" width="1" height="1"/><rect x="27" y="34" width="8" height="1"/><rect x="40" y="34" width="2" height="1"/><rect x="46" y="34" width="1" height="1"/><rect x="52" y="34" width="1" height="1"/><rect x="4" y="35" width="6" height="1"/><rect x="11" y="35" width="2" height="1"/><rect x="14" y="35" width="1" height="1"/><rect x="16" y="35" width="3" height="1"/><rect x="22" y="35" width="3" height="1"/><rect x="27" y="35" width="2" height="1"/><rect x="30" y="35" width="3" height="1"/><rect x="35" y="35" width="3" height="1"/><rect x="39" y="35" width="1" height="1"/><rect x="42" y="35" width="1" height="1"/><rect x="44" y="35" width="3" height="1"/><rect x="48" y="35" width="2" height="1"/><rect x="51" y="35" width="2" height="1"/><rect x="5" y="36" width="2" height="1"/><rect x="8" y="36" width="1" height="1"/><rect x="10" y="36" width="3" height="1"/><rect x="15" y="36" width="5" height="1"/><rect x="21" y="36" width="1" height="1"/><rect x="24" y="36" width="4" height="1"/><rect x="33" y="36" width="2" height="1"/><rect x="40" y="36" width="1" height="1"/><rect x="43" y="36" width="3" height="1"/><rect x="47" y="36" width="1" height="1"/><rect x="49" y="36" width="4" height="1"/><rect x="5" y="37" width="2" height="1"/><rect x="9" y="37" width="1" height="1"/><rect x="11" y="37" width="4" height="1"/><rect x="16" y="37" width="1" height="1"/><rect x="18" y="37" width="2" height="1"/><rect x="21" y="37" width="2" height="1"/><rect x="24" y="37" width="1" height="1"/><rect x="26" y="37" width="5" height="1"/><rect x="33" y="37" width="2" height="1"/><rect x="37" y="37" width="2" height="1"/><rect x="41" y="37" width="2" height="1"/><rect x="45" y="37" width="1" height="1"/><rect x="47" y="37" width="4" height="1"/><rect x="52" y="37" width="1" height="1"/><rect x="5" y="38" width="3" height="1"/><rect x="9" y="38" width="2" height="1"/><rect x="13" y="38" width="1" height="1"/><rect x="18" y="38" width="1" height="1"/><rect x="23" y="38" width="2" height="1"/><rect x="29" y="38" width="1" height="1"/><rect x="31" y="38" width="1" height="1"/><rect x="33" y="38" width="1" height="1"/><rect x="35" y="38" width="1" height="1"/><rect x="37" y="38" width="4" height="1"/><rect x="42" y="38" width="1" height="1"/><rect x="44" y="38" width="1" height="1"/><rect x="46" y="38" width="1" height="1"/><rect x="48" y="38" width="2" height="1"/><rect x="51" y="38" width="2" height="1"/><rect x="4" y="39" width="3" height="1"/><rect x="9" y="39" width="1" height="1"/><rect x="12" y="39" width="1" height="1"/><rect x="14" y="39" width="1" height="1"/><rect x="16" y="39" width="1" height="1"/><rect x="20" y="39" width="2" height="1"/><rect x="23" y="39" width="2" height="1"/><rect x="26" y="39" width="3" height="1"/><rect x="30" y="39" width="5" height="1"/><rect x="36" y="39" width="1" height="1"/><rect x="39" y="39" width="5" height="1"/><rect x="49" y="39" width="1" height="1"/><rect x="51" y="39" width="1" height="1"/><rect x="4" y="40" width="1" height="1"/><rect x="6" y="40" width="1" height="1"/><rect x="8" y="40" width="3" height="1"/><rect x="15" y="40" width="1" height="1"/><rect x="19" y="40" width="1" height="1"/><rect x="25" y="40" width="1" height="1"/><rect x="30" y="40" width="1" height="1"/><rect x="32" y="40" width="1" height="1"/><rect x="34" y="40" width="1" height="1"/><rect x="36" y="40" width="1" height="1"/><rect x="38" y="40" width="1" height="1"/><rect x="40" y="40" width="2" height="1"/><rect x="43" y="40" width="2" height="1"/><rect x="47" y="40" width="2" height="1"/><rect x="5" y="41" width="3" height="1"/><rect x="11" y="41" width="1" height="1"/><rect x="17" y="41" width="3" height="1"/><rect x="22" y="41" width="2" height="1"/><rect x="28" y="41" width="4" height="1"/><rect x="33" y="41" width="2" height="1"/><rect x="36" y="41" width="1" height="1"/><rect x="40" y="41" width="2" height="1"/><rect x="43" y="41" width="1" height="1"/><rect x="45" y="41" width="3" height="1"/><rect x="5" y="42" width="1" height="1"/><rect x="9" y="42" width="2" height="1"/><rect x="17" y="42" width="1" height="1"/><rect x="20" y="42" width="1" height="1"/><rect x="23" y="42" width="2" height="1"/><rect x="26" y="42" width="1" height="1"/><rect x="29" y="42" width="1" height="1"/><rect x="35" y="42" width="1" height="1"/><rect x="37" y="42" width="4" height="1"/><rect x="42" y="42" width="2" height="1"/><rect x="46" y="42" width="2" height="1"/><rect x="50" y="42" width="3" height="1"/><rect x="5" y="43" width="3" height="1"/><rect x="12" y="43" width="2" height="1"/><rect x="16" y="43" width="3" height="1"/><rect x="20" y="43" width="1" height="1"/><rect x="22" y="43" width="2" height="1"/><rect x="25" y="43" width="2" height="1"/><rect x="33" y="43" width="1" height="1"/><rect x="36" y="43" width="4" height="1"/><rect x="42" y="43" width="2" height="1"/><rect x="45" y="43" width="1" height="1"/><rect x="49" y="43" width="2" height="1"/><rect x="52" y="43" width="1" height="1"/><rect x="4" y="44" width="3" height="1"/><rect x="10" y="44" width="2" height="1"/><rect x="13" y="44" width="2" height="1"/><rect x="16" y="44" width="2" height="1"/><rect x="19" y="44" width="3" height="1"/><rect x="23" y="44" width="8" height="1"/><rect x="33" y="44" width="1" height="1"/><rect x="35" y="44" width="1" height="1"/><rect x="40" y="44" width="1" height="1"/><rect x="42" y="44" width="8" height="1"/><rect x="51" y="44" width="2" height="1"/><rect x="12" y="45" width="1" height="1"/><rect x="19" y="45" width="3" height="1"/><rect x="23" y="45" width="1" height="1"/><rect x="25" y="45" width="2" height="1"/><rect x="30" y="45" width="8" height="1"/><rect x="43" y="45" width="2" height="1"/><rect x="48" y="45" width="1" height="1"/><rect x="51" y="45" width="1" height="1"/><rect x="4" y="46" width="7" height="1"/><rect x="14" y="46" width="1" height="1"/><rect x="16" y="46" width="1" height="1"/><rect x="18" y="46" width="2" height="1"/><rect x="21" y="46" width="1" height="1"/><rect x="24" y="46" width="1" height="1"/><rect x="26" y="46" width="1" height="1"/><rect x="28" y="46" width="1" height="1"/><rect x="30" y="46" width="4" height="1"/><rect x="35" y="46" width="4" height="1"/><rect x="40" y="46" width="1" height="1"/><rect x="44" y="46" width="1" height="1"/><rect x="46" y="46" width="1" height="1"/><rect x="48" y="46" width="2" height="1"/><rect x="52" y="46" width="1" height="1"/><rect x="4" y="47" width="1" height="1"/><rect x="10" y="47" width="1" height="1"/><rect x="15" y="47" width="3" height="1"/><rect x="20" y="47" width="2" height="1"/><rect x="26" y="47" width="1" height="1"/><rect x="30" y="47" width="3" height="1"/><rect x="36" y="47" width="2" height="1"/><rect x="41" y="47" width="1" height="1"/><rect x="43" y="47" width="2" height="1"/><rect x="48" y="47" width="2" height="1"/><rect x="51" y="47" width="2" height="1"/><rect x="4" y="48" width="1" height="1"/><rect x="6" y="48" width="3" height="1"/><rect x="10" y="48" width="1" height="1"/><rect x="13" y="48" width="4" height="1"/><rect x="19" y="48" width="1" height="1"/><rect x="22" y="48" width="1" height="1"/><rect x="25" y="48" width="7" height="1"/><rect x="34" y="48" width="2" height="1"/><rect x="37" y="48" width="5" height="1"/><rect x="44" y="48" width="5" height="1"/><rect x="50" y="48" width="1" height="1"/><rect x="52" y="48" width="1" height="1"/><rect x="4" y="49" width="1" height="1"/><rect x="6" y="49" width="3" height="1"/><rect x="10" y="49" width="1" height="1"/><rect x="14" y="49" width="2" height="1"/><rect x="17" y="49" width="2" height="1"/><rect x="24" y="49" width="1" height="1"/><rect x="29" y="49" width="2" height="1"/><rect x="33" y="49" width="3" height="1"/><rect x="37" y="49" width="6" height="1"/><rect x="44" y="49" width="1" height="1"/><rect x="46" y="49" width="2" height="1"/><rect x="49" y="49" width="1" height="1"/><rect x="51" y="49" width="2" height="1"/><rect x="4" y="50" width="1" height="1"/><rect x="6" y="50" width="3" height="1"/><rect x="10" y="50" width="1" height="1"/><rect x="14" y="50" width="1" height="1"/><rect x="16" y="50" width="8" height="1"/><rect x="25" y="50" width="4" height="1"/><rect x="32" y="50" width="1" height="1"/><rect x="34" y="50" width="3" height="1"/><rect x="38" y="50" width="3" height="1"/><rect x="46" y="50" width="2" height="1"/><rect x="49" y="50" width="1" height="1"/><rect x="4" y="51" width="1" height="1"/><rect x="10" y="51" width="1" height="1"/><rect x="16" y="51" width="3" height="1"/><rect x="20" y="51" width="1" height="1"/><rect x="22" y="51" width="3" height="1"/><rect x="26" y="51" width="2" height="1"/><rect x="29" y="51" width="1" height="1"/><rect x="31" y="51" width="2" height="1"/><rect x="34" y="51" width="1" height="1"/><rect x="38" y="51" width="2" height="1"/><rect x="41" y="51" width="1" height="1"/><rect x="43" y="51" width="1" height="1"/><rect x="45" y="51" width="2" height="1"/><rect x="49" y="51" width="1" height="1"/><rect x="52" y="51" width="1" height="1"/><rect x="4" y="52" width="7" height="1"/><rect x="12" y="52" width="3" height="1"/><rect x="17" y="52" width="2" height="1"/><rect x="22" y="52" width="2" height="1"/><rect x="26" y="52" width="1" height="1"/><rect x="30" y="52" width="5" height="1"/><rect x="36" y="52" width="3" height="1"/><rect x="40" y="52" width="6" height="1"/><rect x="47" y="52" width="3" height="1"/><rect x="52" y="52" width="1" height="1"/></g></svg>';

/* ---------- state ---------- */
const TIMED_CATS = ['prayer', 'morning', 'evening', 'sleep'];   // تُصفَّر بمواقيت الصلاة لا بمنتصف الليل
const KEY = 'rawd-azkar-v1';
const today = () => { const d = new Date(); return d.getFullYear() + '-' + pad(d.getMonth()+1) + '-' + pad(d.getDate()); };
let S;
try { S = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { S = {}; }
S.settings = Object.assign({ theme: 'ivory', font: 'Q1', fs: 0.95, vibrate: true, rotate: true, autoNext: true,
  showVirtue: false, showSrc: false, mode: 'scroll', showStats: true, showPrayer: true, tzAuto: true, showGreet: true, remindPopup: true, showHadith: true }, S.settings || {});
if (!S.settings.fs20) { if (S.settings.fs === 1.15) S.settings.fs = 0.95; S.settings.fs20 = 1; }   // الحجم الافتراضي الجديد 20
S.fav = S.fav || []; S.counts = S.counts || {}; S.days = S.days || {};
S.tasbih = Object.assign({ p: 0, total: 0, counts: {}, targets: {}, zfs: 1 }, S.tasbih || {});
S.pray = Object.assign({ city: 'cairo', method: 'egypt', asr: 1, h24: false, lat: null, lng: null, tz: null, label: '' }, S.pray || {});
S.lastPos = S.lastPos || {};
function dayRollover() {   // بداية يوم جديد: تُصفَّر الأبواب العادية (أبواب الوقت تتبع المواقيت)
  if (S.day === today()) return false;
  S.day = today(); const keep = {}; let ch = false;
  for (const id in S.counts) { if (ITEM[id] && TIMED_CATS.includes(ITEM[id].cat)) keep[id] = S.counts[id]; else ch = true; }
  S.counts = keep;
  if (S.last && !TIMED_CATS.includes(S.last.cat)) { delete S.last; ch = true; }
  for (const k in S.lastPos) if (!TIMED_CATS.includes(k.split('|')[0])) delete S.lastPos[k];
  return ch;
}
dayRollover();
S.slots = S.slots || {};
S.rem = Object.assign({ morning: false, evening: false, sleep: false, mOff: 30, eOff: 30, sleepAt: '22:30' }, S.rem || {});
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} };
save();

/* ---------- helpers ---------- */
function targetOf(it) {
  const r = String(it.r || '').trim();
  const paren = (it.t.match(/\((\d+)\)/g) || []).map(x => +x.replace(/\D/g, ''));
  if (paren.length >= 2) return paren.reduce((a, b) => a + b, 0) + (/\+\s*1/.test(r) ? 1 : 0);
  const m = r.match(/\d+/);
  return m ? Math.max(1, +m[0]) : 1;
}
const countOf = id => S.counts[id] || 0;
const groupOf = (c, occ) => c.groups ? (c.groups.includes(occ) ? occ : c.groups[0]) : null;
/* اللغة: الترجمة الكاملة تُضاف في i18n.js؛ tr() تعيد النص العربي إن لم توجد ترجمة */
const EN = !!(window.I18N && I18N.lang === 'en');
const LOC_G = EN ? 'en-GB-u-nu-latn' : 'ar-EG-u-nu-latn', LOC_H = EN ? 'en-u-ca-islamic-umalqura-nu-latn' : 'ar-SA-u-ca-islamic-umalqura-nu-latn';
const tr = s => (window.I18N && window.I18N.tr) ? window.I18N.tr(s) : s;
S.order = S.order || {};   // ترتيب المستخدم للأذكار داخل كل باب: { catId: [ids] }
function ordered(c, arr) {
  const o = S.order[c.id]; if (!o || !o.length) return arr;
  const pos = {}; o.forEach((id, i) => pos[id] = i);
  return arr.slice().sort((a, b) => (pos[a.id] ?? 1e6 + a.idx) - (pos[b.id] ?? 1e6 + b.idx));
}
const listOf = (c, g) => ordered(c, g ? c.items.filter(x => x.o === g) : c.items);
const qs = g => g ? '?o=' + encodeURIComponent(g) : '';
const isDone = it => countOf(it.id) >= targetOf(it);
function catProgress(c) { const d = c.items.filter(isDone).length; return { d, n: c.items.length, p: c.items.length ? d / c.items.length : 0 }; }
function vibrate(ms) { if (S.settings.vibrate && navigator.vibrate) try { navigator.vibrate(ms); } catch (e) {} }
function toast(msg) { const t = $('#toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove('show'), 1900); }
function celebrate(sym = '✨') { const c = document.createElement('div'); c.className = 'confetti'; c.innerHTML = `<div>${sym}</div>`; document.body.appendChild(c); setTimeout(() => c.remove(), 1300); }
const strip = s => String(s).replace(/[ؐ-ًؚ-ٰٟۖ-ۭـ]/g, '');
const norm = s => strip(s).replace(/[أإآٱ]/g, 'ا').replace(/ى/g, 'ي').replace(/ة/g, 'ه').replace(/ؤ/g, 'و').replace(/ئ/g, 'ي');

/* ---------- theme & background ---------- */
function applySettings() {
  document.body.className = 't-' + S.settings.theme;
  document.documentElement.style.setProperty('--fs', S.settings.fs);
  document.documentElement.style.setProperty('--qf', S.settings.font || 'Q1');
  const tb = $('#btnTheme'); if (tb) tb.textContent = S.settings.theme === 'ivory' ? '☀' : (S.settings.theme === 'night' ? '★' : '☾');
  const m = document.querySelector('meta[name=theme-color]');
  if (m) m.content = S.settings.theme === 'ivory' ? '#f6efe0' : (S.settings.theme === 'night' ? '#050c1c' : '#0b2a33');
}
const layers = [...document.querySelectorAll('.bg-layer')];
let bgCur = '', bgFlip = 0;
function setBg(name) {
  if (!name || name === bgCur) return;
  bgCur = name;
  const url = (window.BG_DATA || {})[name] || `bg/${name}.jpg`;
  const img = new Image();
  img.onload = img.onerror = () => {
    bgFlip ^= 1;
    const on = layers[bgFlip], off = layers[bgFlip ^ 1];
    on.style.backgroundImage = `url("${url}")`;
    requestAnimationFrame(() => { on.classList.add('on'); off.classList.remove('on'); });
  };
  img.src = url;
}
function timeBg() {
  const h = new Date().getHours();
  if (h >= 4 && h < 10) return 'mountains';
  if (h >= 10 && h < 15) return 'daisies';
  if (h >= 15 && h < 19) return 'sea-sunset';
  return 'sea-dusk';
}
function period() {
  const h = new Date().getHours();
  if (h >= 3 && h < 12) return { g: 'صباح الخير والبركة', key: 'morning' };
  if (h >= 12 && h < 15) return { g: 'طاب يومك بذكر الله', key: 'prayer' };
  if (h >= 15 && h < 21) return { g: 'مساء الطمأنينة', key: 'evening' };
  return { g: 'ليلة هانئة بذكر الله', key: 'sleep' };
}

/* ======================================================================
   مواقيت الصلاة — حساب فلكي محلي (بدون إنترنت) على طريقة PrayTimes
   ====================================================================== */
const CITIES = [
  ['cairo','القاهرة',30.0444,31.2357,'Africa/Cairo','egypt'],['giza','الجيزة',30.0131,31.2089,'Africa/Cairo','egypt'],
  ['alex','الإسكندرية',31.2001,29.9187,'Africa/Cairo','egypt'],['mansoura','المنصورة',31.0409,31.3785,'Africa/Cairo','egypt'],
  ['tanta','طنطا',30.7865,31.0004,'Africa/Cairo','egypt'],['zagazig','الزقازيق',30.5877,31.502,'Africa/Cairo','egypt'],
  ['benha','بنها',30.4659,31.1848,'Africa/Cairo','egypt'],['shebin','شبين الكوم',30.5503,31.0106,'Africa/Cairo','egypt'],
  ['damanhour','دمنهور',31.0341,30.4682,'Africa/Cairo','egypt'],['kafr','كفر الشيخ',31.1107,30.9388,'Africa/Cairo','egypt'],
  ['damietta','دمياط',31.4165,31.8133,'Africa/Cairo','egypt'],['portsaid','بورسعيد',31.2653,32.3019,'Africa/Cairo','egypt'],
  ['ismailia','الإسماعيلية',30.5965,32.2715,'Africa/Cairo','egypt'],['suez','السويس',29.9668,32.5498,'Africa/Cairo','egypt'],
  ['fayoum','الفيوم',29.3084,30.8428,'Africa/Cairo','egypt'],['benisuef','بني سويف',29.0661,31.0994,'Africa/Cairo','egypt'],
  ['minya','المنيا',28.0871,30.7618,'Africa/Cairo','egypt'],['assiut','أسيوط',27.1783,31.1859,'Africa/Cairo','egypt'],
  ['sohag','سوهاج',26.5591,31.6957,'Africa/Cairo','egypt'],['qena','قنا',26.1551,32.716,'Africa/Cairo','egypt'],
  ['luxor','الأقصر',25.6872,32.6396,'Africa/Cairo','egypt'],['aswan','أسوان',24.0889,32.8998,'Africa/Cairo','egypt'],
  ['hurghada','الغردقة',27.2579,33.8116,'Africa/Cairo','egypt'],['sharm','شرم الشيخ',27.9158,34.3299,'Africa/Cairo','egypt'],
  ['arish','العريش',31.1313,33.7983,'Africa/Cairo','egypt'],['matrouh','مرسى مطروح',31.3543,27.2373,'Africa/Cairo','egypt'],
  ['makkah','مكة المكرمة',21.4225,39.8262,'Asia/Riyadh','umm'],['madinah','المدينة المنورة',24.4672,39.6111,'Asia/Riyadh','umm'],
  ['riyadh','الرياض',24.7136,46.6753,'Asia/Riyadh','umm'],['jeddah','جدة',21.4858,39.1925,'Asia/Riyadh','umm'],
  ['dammam','الدمام',26.4207,50.0888,'Asia/Riyadh','umm'],['dubai','دبي',25.2048,55.2708,'Asia/Dubai','dubai'],
  ['abudhabi','أبوظبي',24.4539,54.3773,'Asia/Dubai','dubai'],['doha','الدوحة',25.2854,51.531,'Asia/Qatar','qatar'],
  ['kuwait','الكويت',29.3759,47.9774,'Asia/Kuwait','kuwait'],['manama','المنامة',26.2285,50.586,'Asia/Bahrain','mwl'],
  ['muscat','مسقط',23.588,58.3829,'Asia/Muscat','mwl'],['amman','عمّان',31.9454,35.9284,'Asia/Amman','mwl'],
  ['quds','القدس',31.7683,35.2137,'Asia/Jerusalem','mwl'],['gaza','غزة',31.5017,34.4668,'Asia/Gaza','egypt'],
  ['beirut','بيروت',33.8938,35.5018,'Asia/Beirut','mwl'],['damascus','دمشق',33.5138,36.2765,'Asia/Damascus','mwl'],
  ['baghdad','بغداد',33.3152,44.3661,'Asia/Baghdad','mwl'],['khartoum','الخرطوم',15.5007,32.5599,'Africa/Khartoum','egypt'],
  ['tripoli','طرابلس',32.8872,13.1913,'Africa/Tripoli','egypt'],['tunis','تونس',36.8065,10.1815,'Africa/Tunis','mwl'],
  ['algiers','الجزائر',36.7538,3.0588,'Africa/Algiers','mwl'],['rabat','الرباط',34.0209,-6.8416,'Africa/Casablanca','mwl'],
  ['casablanca','الدار البيضاء',33.5731,-7.5898,'Africa/Casablanca','mwl'],['sanaa','صنعاء',15.3694,44.191,'Asia/Aden','mwl'],
  ['istanbul','إسطنبول',41.0082,28.9784,'Europe/Istanbul','turkey'],['london','لندن',51.5074,-0.1278,'Europe/London','mwl']
];
const CITY = Object.fromEntries(CITIES.map(c => [c[0], { id: c[0], name: c[1], lat: c[2], lng: c[3], tz: c[4], method: c[5] }]));
const METHODS = {
  egypt: ['الهيئة المصرية العامة للمساحة', 19.5, 17.5], umm: ['أم القرى (مكة)', 18.5, '90'],
  mwl: ['رابطة العالم الإسلامي', 18, 17], karachi: ['جامعة العلوم الإسلامية بكراتشي', 18, 18],
  isna: ['أمريكا الشمالية (ISNA)', 15, 15], dubai: ['دبي', 18.2, 18.2], kuwait: ['الكويت', 18, 17.5],
  qatar: ['قطر', 18, '90'], turkey: ['رئاسة الشؤون الدينية التركية', 18, 17]
};
const PNAMES = [['fajr','الفجر'],['sunrise','الشروق'],['dhuhr','الظهر'],['asr','العصر'],['maghrib','المغرب'],['isha','العشاء']];
const dtr = d => d * Math.PI / 180, rtd = r => r * 180 / Math.PI;
const sin = d => Math.sin(dtr(d)), cos = d => Math.cos(dtr(d)), tan = d => Math.tan(dtr(d));
const asin = x => rtd(Math.asin(x)), acos = x => rtd(Math.acos(Math.max(-1, Math.min(1, x)))), atan2 = (y, x) => rtd(Math.atan2(y, x)), acot = x => rtd(Math.atan(1 / x));
const fixA = a => a - 360 * Math.floor(a / 360), fixH = a => a - 24 * Math.floor(a / 24);
function julian(y, m, d) { if (m <= 2) { y -= 1; m += 12; } const A = Math.floor(y / 100), B = 2 - A + Math.floor(A / 4); return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d + B - 1524.5; }
function sunPos(jd) {
  const D = jd - 2451545.0, g = fixA(357.529 + 0.98560028 * D), q = fixA(280.459 + 0.98564736 * D);
  const L = fixA(q + 1.915 * sin(g) + 0.020 * sin(2 * g)), e = 23.439 - 0.00000036 * D;
  const RA = atan2(cos(e) * sin(L), cos(L)) / 15;
  return { decl: asin(sin(e) * sin(L)), eqt: q / 15 - fixH(RA) };
}
function tzOffsetMin(tz, date) {
  try {
    const p = new Intl.DateTimeFormat('en-US', { timeZone: tz, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).formatToParts(date);
    const g = t => +p.find(x => x.type === t).value;
    return Math.round((Date.UTC(g('year'), g('month') - 1, g('day'), g('hour') % 24, g('minute'), g('second')) - date.getTime()) / 60000);
  } catch (e) { return -date.getTimezoneOffset(); }
}
function ymdIn(tz, date) {
  try { const p = new Intl.DateTimeFormat('en-CA', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(date);
    const g = t => +p.find(x => x.type === t).value; return [g('year'), g('month'), g('day')]; }
  catch (e) { return [date.getFullYear(), date.getMonth() + 1, date.getDate()]; }
}
function prayLoc() {
  const P = S.pray;
  if (P.city === 'custom' && P.lat != null) return { name: P.label || 'موقعي', lat: P.lat, lng: P.lng, tz: P.tz || Intl.DateTimeFormat().resolvedOptions().timeZone };
  return CITY[P.city] || CITY.cairo;
}
function prayerTimes(y, m, d, loc) {
  const [, fa, is] = METHODS[S.pray.method] || METHODS.egypt;
  const lat = loc.lat, lng = loc.lng;
  const jd0 = julian(y, m, d) - lng / (15 * 24);
  const mid = t => fixH(12 - sunPos(jd0 + t).eqt);
  const angT = (ang, t, ccw) => { const dc = sunPos(jd0 + t).decl, n = mid(t); const T = acos((-sin(ang) - sin(dc) * sin(lat)) / (cos(dc) * cos(lat))) / 15; return n + (ccw ? -T : T); };
  const asrT = (f, t) => { const dc = sunPos(jd0 + t).decl; return angT(-acot(f + tan(Math.abs(lat - dc))), t); };
  let t = { fajr: 5, sunrise: 6, dhuhr: 12, asr: 13, maghrib: 18, isha: 18 };
  for (let k = 0; k < 2; k++) {
    const p = Object.fromEntries(Object.entries(t).map(([a, b]) => [a, b / 24]));
    t = { fajr: angT(fa, p.fajr, true), sunrise: angT(0.833, p.sunrise, true), dhuhr: mid(p.dhuhr),
          asr: asrT(S.pray.asr === 2 ? 2 : 1, p.asr), maghrib: angT(0.833, p.maghrib), isha: typeof is === 'string' ? 0 : angT(is, p.isha) };
    if (typeof is === 'string') t.isha = t.maghrib + (+is) / 60;
  }
  const base = Date.UTC(y, m - 1, d), off = tzOffsetMin(loc.tz, new Date(base + 12 * 3600e3));
  const out = {};
  for (const [k] of PNAMES) {
    const utcH = t[k] - lng / 15;                                  // الزمن العالمي
    out[k] = new Date(base + Math.round(utcH * 60) * 60000);        // لحظة مطلقة
  }
  out._off = off;
  return out;
}
function fmtTime(date, loc) {
  const o = { hour: 'numeric', minute: '2-digit', hour12: !S.pray.h24, timeZone: loc.tz, numberingSystem: 'latn' };
  try { return new Intl.DateTimeFormat(LOC_G, o).format(date); }
  catch (e) { return pad(date.getHours()) + ':' + pad(date.getMinutes()); }
}
function nextPrayer() {
  const loc = prayLoc(), now = new Date();
  const [y, m, d] = ymdIn(loc.tz, now);
  const T = prayerTimes(y, m, d, loc);
  for (const [k, n] of PNAMES) { if (k === 'sunrise') continue; if (T[k] > now) return { key: k, name: n, at: T[k], T, loc }; }
  const tm = new Date(Date.UTC(y, m - 1, d) + 36 * 3600e3); const [y2, m2, d2] = ymdIn(loc.tz, tm);
  const T2 = prayerTimes(y2, m2, d2, loc);
  return { key: 'fajr', name: 'الفجر', at: T2.fajr, T, loc, tomorrow: true };
}
function countdown(ms) { const s = Math.max(0, Math.floor(ms / 1000)); return pad(Math.floor(s / 3600)) + ':' + pad(Math.floor(s % 3600 / 60)) + ':' + pad(s % 60); }
let ticker = null;
function startTicker() {
  clearInterval(ticker);
  ticker = setInterval(() => {
    const els = document.querySelectorAll('[data-cd]'); if (!els.length) return;
    const np = nextPrayer();
    els.forEach(el => {
      const left = np.at - new Date();
      if (el.dataset.key !== np.key) { route(); return; }
      el.textContent = countdown(left);
    });
  }, 1000);
}

/* ---------- router (internal: works even where link navigation is blocked, e.g. iPhone Files preview) ---------- */
let CUR = location.hash || '#/';
const STACK = [];
function setHash(h, replace) {
  try { if (replace) history.replaceState(null, '', h); else history.pushState(null, '', h); } catch (e) {}
}
function nav(h, replace) {
  if (!h || h === '#') h = '#/';
  if (!replace && h !== CUR) STACK.push(CUR);
  CUR = h; setHash(h, replace); route();
}
function replaceNav(h) { CUR = h; setHash(h, true); }
function goBack() { const h = STACK.pop() || '#/'; CUR = h; setHash(h, true); route(); }
document.addEventListener('click', e => {
  const a = e.target.closest && e.target.closest('a[href^="#"]');
  if (!a) return;
  e.preventDefault(); nav(a.getAttribute('href'));
}, true);
window.addEventListener('popstate', () => { if (location.hash && location.hash !== CUR) { CUR = location.hash; route(); } });
let prevDepth = 0;
const depthOf = r => r === '' || r === 'home' ? 0 : (['sections','tasbih','favorites','settings','search','prayer','support','rate'].includes(r) ? 1 : 2);
function route() {
  checkPrayerReset();
  const h = decodeURIComponent(CUR.replace(/^#\/?/, ''));
  const [path, query] = h.split('?');
  const parts = path.split('/').filter(Boolean);
  const params = new URLSearchParams(query || '');
  let r = parts[0] || 'home';
  // وضع العرض: صفحات أو تمرير متصل
  if (r === 's' && S.settings.mode === 'page' && CAT[parts[1]] && (CAT[parts[1]].groups || !params.get('o'))) {
    const c = CAT[parts[1]], g = groupOf(c, params.get('o')), i = S.lastPos[parts[1] + (g ? '|' + g : '')] || 0;
    replaceNav(`#/r/${parts[1]}/${i}${qs(g)}`); parts[0] = r = 'r'; parts[2] = i;
  }
  const d = depthOf(r);
  view.classList.remove('enter-fwd', 'enter-back', 'enter-fade');
  void view.offsetWidth;
  view.classList.add(d > prevDepth ? 'enter-fwd' : d < prevDepth ? 'enter-back' : 'enter-fade');
  prevDepth = d;
  view.scrollTop = 0;
  $('#btnBack').hidden = d === 0;
  document.querySelectorAll('.bottombar a').forEach(a => a.classList.toggle('active',
    a.dataset.tab === r || (a.dataset.tab === 'sections' && (r === 's' || r === 'r'))));
  $('#topTitle').innerHTML = '<span class="brand-star">۞</span> روض الذكر';
  switch (r) {
    case 'home': renderHome(); break;
    case 'sections': renderSections(); break;
    case 's': renderSection(parts[1], params.get('o')); break;
    case 'r': renderReader(parts[1], +(parts[2] || 0), params.get('o')); break;
    case 'tasbih': renderTasbih(); break;
    case 'favorites': renderFavorites(); break;
    case 'search': renderSearch(params.get('q') || ''); break;
    case 'settings': renderSettings(); break;
    case 'prayer': renderPrayer(); break;
    case 'support': renderSupport(); break;
    case 'rate': renderRate(); break;
    default: renderHome();
  }
}
window.addEventListener('hashchange', () => { if (location.hash !== CUR) { CUR = location.hash || '#/'; route(); } });
$('#btnBack').onclick = () => goBack();
$('#btnSearch').onclick = () => nav('#/search');
const THEMES = ['nature', 'night', 'ivory'], THEME_NAMES = { nature: 'سمة الطبيعة', night: 'السمة الليلية', ivory: 'السمة العاجية' };
$('#btnTheme').onclick = () => { S.settings.theme = THEMES[(THEMES.indexOf(S.settings.theme) + 1) % 3]; save(); applySettings(); toast(THEME_NAMES[S.settings.theme]); if (CUR.includes('settings')) renderSettings(); };
function setFs(d) { S.settings.fs = Math.round(Math.max(0.8, Math.min(1.8, S.settings.fs + d)) * 100) / 100; save(); applySettings(); toast('حجم الخط ' + Math.round(21 * S.settings.fs)); }
const FONTS = [['Q1', 'النسخ السندي'], ['Q2', 'النسخ السندي العريض'], ['Q4', 'النسخ السعودي'], ['Q3', 'خط المجمع']];
function setMode(m, id, g) { S.settings.mode = m; save(); toast(m === 'page' ? 'وضع عرض الصفحات' : 'وضع التمرير المتصل'); if (id) nav(m === 'page' ? `#/r/${id}/${S.lastPos[id + (g ? '|' + g : '')] || 0}${qs(g)}` : `#/s/${id}${qs(g)}`, true); }

/* ---------- views ---------- */
function featureCard(c, big) {
  const p = catProgress(c);
  return `<a class="fcard fbg-${c.bg} ${big ? 'big' : ''}" href="#/s/${c.id}"${window.BG_DATA ? '' : ` style="--img:url('bg/${c.bg}.jpg')"`}>
    <span class="ic">${c.icon}</span><span class="cnt">${c.items.length}</span>
    <h3>${esc(c.name)}</h3><p>${esc(c.desc)}</p>
    <div class="prog"><i style="width:${Math.round(p.p * 100)}%"></i></div></a>`;
}
function dhikrOfDay() {
  const pool = [...CAT.jawami.items, ...CAT.quran.items];
  const d = new Date(); const seed = d.getFullYear() * 372 + d.getMonth() * 31 + d.getDate();
  return pool[seed % pool.length];
}
function hijri() {
  try { return new Intl.DateTimeFormat(LOC_H, { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date()); }
  catch (e) { return ''; }
}
/* ---------- تنبيهات الأذكار: الصباح بعد الفجر، المساء بعد العصر، النوم في وقت يختاره المستخدم ---------- */
const LN = () => window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.LocalNotifications;
const REM = { morning: { id: 1000, t: '☀️ أذكار الصباح', b: 'حان وقت أذكار الصباح — لا تنسَ وردك' },
              evening: { id: 1010, t: '🌙 أذكار المساء', b: 'حان وقت أذكار المساء — لا تنسَ وردك' },
              sleep:   { id: 1020, t: '🛏️ أذكار النوم', b: 'قبل أن تنام: أذكار النوم والاستيقاظ' } };
function remTimes() {   // مواعيد الأيام السبعة القادمة
  const loc = prayLoc(), now = Date.now(), out = [];
  for (let di = 0; di < 7; di++) {
    const [y, m, d] = ymdIn(loc.tz, new Date(now + di * 864e5)); let T = null;
    try { T = prayerTimes(y, m, d, loc); } catch (e) {}
    const add = (k, at) => { if (at && at.getTime() > now + 30e3 && !(di === 0 && CAT[k] && catProgress(CAT[k]).p === 1)) out.push({ k, at, id: REM[k].id + di }); };
    if (S.rem.morning && T) add('morning', new Date(T.fajr.getTime() + S.rem.mOff * 6e4));
    if (S.rem.evening && T) add('evening', new Date(T.asr.getTime() + S.rem.eOff * 6e4));
    if (S.rem.sleep) { const [h, mi] = String(S.rem.sleepAt || '22:30').split(':').map(Number); const x = new Date(now + di * 864e5); x.setHours(h, mi, 0, 0); add('sleep', x); }
  }
  return out;
}
let _webRem = [];
async function scheduleReminders() {
  const list = remTimes(), ln = LN();
  if (ln) {
    try {
      const ids = []; for (const k in REM) for (let i = 0; i < 7; i++) ids.push({ id: REM[k].id + i });
      await ln.cancel({ notifications: ids });
      if (list.length) await ln.schedule({ notifications: list.map(x => ({ id: x.id, title: REM[x.k].t, body: REM[x.k].b,
        schedule: { at: x.at, allowWhileIdle: true }, extra: { h: '#/s/' + x.k } })) });
    } catch (e) {}
    return;
  }
  // المتصفح: تعمل التنبيهات ما دام التطبيق مفتوحًا أو في الخلفية
  _webRem.forEach(clearTimeout); _webRem = [];
  if (!('Notification' in window) || Notification.permission !== 'granted') return;
  list.filter(x => x.at - Date.now() < 864e5).forEach(x => _webRem.push(setTimeout(async () => {
    if (CAT[x.k] && catProgress(CAT[x.k]).p === 1) return;
    try { const r = await navigator.serviceWorker.getRegistration(); const o = { body: REM[x.k].b, icon: 'icons/icon-192.png', badge: 'icons/icon-192.png', tag: x.k, data: { h: '#/s/' + x.k } };
      if (r) r.showNotification(REM[x.k].t, o); else new Notification(REM[x.k].t, o); } catch (e) {}
  }, x.at - Date.now())));
}
async function askNotify() {
  const ln = LN();
  try {
    if (ln) { let p = await ln.checkPermissions(); if (p.display !== 'granted') p = await ln.requestPermissions(); return p.display === 'granted'; }
    if (!('Notification' in window)) return false;
    if (Notification.permission === 'granted') return true;
    return (await Notification.requestPermission()) === 'granted';
  } catch (e) { return false; }
}
try { const ln = LN(); if (ln) ln.addListener('localNotificationActionPerformed', a => { const h = a && a.notification && a.notification.extra && a.notification.extra.h; if (h) location.hash = h; }); } catch (e) {}
setTimeout(scheduleReminders, 1500);
document.addEventListener('visibilitychange', () => { if (!document.hidden) scheduleReminders(); });

/* ---------- أذكار الوقت: اقتراحات مرتبطة بالمواقيت + تصفير أذكار بعد الصلاة ---------- */
const G_EACH = 'بعد كل صلاة مفروضة', G_FM = 'بعد صلاتي الفجر والمغرب';
function lastPrayers() {   // آخر صلاة دخل وقتها، وآخر فجر/مغرب، وآخر فجر وعصر ومغرب
  const loc = prayLoc(), now = new Date();
  const [y, m, d] = ymdIn(loc.tz, now), T = prayerTimes(y, m, d, loc);
  const [y0, m0, d0] = ymdIn(loc.tz, new Date(Date.UTC(y, m - 1, d) - 12 * 3600e3)), Y = prayerTimes(y0, m0, d0, loc);
  const pick = keys => { for (let i = keys.length - 1; i >= 0; i--) if (T[keys[i]] <= now) return { k: keys[i], id: `${y}-${m}-${d}-${keys[i]}` };
    const k = keys[keys.length - 1]; return { k, id: `${y0}-${m0}-${d0}-${k}`, at: Y[k] }; };
  return { each: pick(['fajr', 'dhuhr', 'asr', 'maghrib', 'isha']), fm: pick(['fajr', 'maghrib']),
           fajr: pick(['fajr']), asr: pick(['asr']), maghrib: pick(['maghrib']) };
}
/* جدول التصفير بالمواقيت:
   أذكار بعد كل صلاة ← عند دخول كل صلاة · أذكار بعد الفجر والمغرب ← عند الفجر والمغرب
   أذكار الصباح ← عند الفجر · أذكار المساء ← عند العصر · أذكار النوم ← عند المغرب */
const RESET_PLAN = [
  ['each', () => CAT.prayer ? listOf(CAT.prayer, G_EACH) : [], 'prayer'],
  ['fm', () => CAT.prayer ? listOf(CAT.prayer, G_FM) : [], 'prayer'],
  ['fajr', () => CAT.morning ? CAT.morning.items : [], 'morning'],
  ['asr', () => CAT.evening ? CAT.evening.items : [], 'evening'],
  ['maghrib', () => CAT.sleep ? CAT.sleep.items : [], 'sleep']
];
function checkPrayerReset() {   // يُصفّر العدّادات عند دخول الوقت المناسب لكل باب
  let lp; try { lp = lastPrayers(); } catch (e) { return false; }
  let changed = dayRollover();
  RESET_PLAN.forEach(([k, items, cat]) => {
    if (S.slots[k] === lp[k].id) return;
    if (S.slots[k]) { items().forEach(x => { if (S.counts[x.id]) { delete S.counts[x.id]; changed = true; } });
      if (S.last && S.last.cat === cat) { delete S.last; changed = true; }   // «تابع من حيث توقفت» يبدأ من جديد
      for (const p in S.lastPos) if (p.split('|')[0] === cat) delete S.lastPos[p];   // وضع الصفحات يبدأ من أول ذكر
      if (renderReader._last && renderReader._last.id.split('|')[0] === cat) renderReader._last = null; }
    S.slots[k] = lp[k].id;
  });
  save(); return changed;
}
function suggestions() {
  let k = 'fajr'; try { k = lastPrayers().each.k; } catch (e) {}
  const P = g => ({ cat: 'prayer', g }), C = c => ({ cat: c });
  const plan = { fajr: [P(G_FM), C('morning')], dhuhr: [P(G_EACH)], asr: [P(G_EACH), C('evening')],
                 maghrib: [P(G_FM), C('evening')], isha: [P(G_EACH), C('sleep')] }[k] || [];
  return plan.filter(x => CAT[x.cat]).map(x => { const c = CAT[x.cat], L = listOf(c, x.g || null), dn = L.filter(isDone).length;
    return Object.assign(x, { c, d: dn, n: L.length, done: L.length > 0 && dn === L.length }); });
}
function suggestCard(list) {
  if (!list.length) return '';
  const sorted = list.filter(x => !x.done).concat(list.filter(x => x.done));
  return `<div class="section-title">مقترح لك الآن</div><div class="glass sugg">${sorted.map(x =>
    `<a class="sg-row${x.done ? ' done' : ''}" href="#/s/${x.cat}${qs(x.g)}"><span class="ic">${x.c.icon}</span>
      <span class="t"><b>${esc(x.c.name)}</b>${x.g ? `<small>${esc(x.g)}</small>` : ''}<div class="bar"><i style="width:${x.n ? x.d / x.n * 100 : 0}%"></i></div></span>
      <span class="st">${x.done ? '✓ أتممته' : `${x.d}/${x.n}`}</span></a>`).join('')}</div>`;
}
// يُفحص كل 30 ثانية، وفور عودة التطبيق من الخلفية (أندرويد يوقف المؤقتات في الخلفية)
function resetTick() {
  try { const raw = localStorage.getItem(KEY); if (raw) { const o = JSON.parse(raw); if (o && o.slots) { S.slots = o.slots; S.day = o.day; S.counts = o.counts || {}; } } } catch (e) {}   // أحدث حالة محفوظة
  if (checkPrayerReset() && /^#\/?($|\?|home|s\/|r\/|sections)/.test(CUR || '#/')) route();
  if (GR.bank) setTimeout(() => showReminders(), 800);   // تذكير المناسبات عند العودة للتطبيق
}
setInterval(resetTick, 30000);
document.addEventListener('visibilitychange', () => { if (!document.hidden) resetTick(); });
window.addEventListener('focus', resetTick);
window.addEventListener('pageshow', resetTick);
try { const CA = window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.App; if (CA) { CA.addListener('resume', resetTick); CA.addListener('appStateChange', st => { if (st && st.isActive) resetTick(); }); } } catch (e) {}

/* ---------- تنبيه «يتوفر إصدار أحدث» ---------- */
// الرقم يُكتب تلقائيًا من وسم الإصدار عند النشر (نفس نمط appver)
const APP_VER = '<span class="appver">1.7.0</span>'.replace(/<[^>]+>/g, '').trim();
const verCmp = (a, b) => { const x = String(a).replace(/^v/i, '').split('.').map(Number), y = String(b).replace(/^v/i, '').split('.').map(Number);
  for (let i = 0; i < 3; i++) { const d = (x[i] || 0) - (y[i] || 0); if (d) return d; } return 0; };
S.upd = S.upd || {};
function checkUpdate() {
  if (!navigator.onLine || (S.upd.at && Date.now() - S.upd.at < 6 * 3600e3)) return;
  fetch('https://api.github.com/repos/mohammadelshennawy-bit/rawd-azkar/releases/latest').then(r => r.ok ? r.json() : null).then(j => {
    if (!j || !j.tag_name) return;
    S.upd = Object.assign(S.upd, { at: Date.now(), latest: j.tag_name.replace(/^v/i, '') }); save();
    if (/^#\/?($|\?|home)/.test(CUR) && updateAvail()) route();
  }).catch(() => {});
}
const updateAvail = () => S.upd.latest && verCmp(S.upd.latest, APP_VER) > 0 && S.upd.hide !== S.upd.latest;
function updBanner() {
  if (!updateAvail()) return '';
  const native = !!(window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform());
  return `<section class="glass upd-card"><span class="ic">🎉</span><div class="t"><b>${tr('يتوفر إصدار جديد')} ${esc(S.upd.latest)}</b>
    <small>${tr('إصدارك الحالي')} ${esc(APP_VER)}${native ? ' — ' + t('حمّل ملف التحديث وثبّته فوق التطبيق الحالي') : ''}</small></div>
    <div class="b">${native ? `<a class="btn btn-gold" href="https://mohammadelshennawy-bit.github.io/rawd-azkar/download.html" target="_blank" rel="noopener">${tr('تحديث')}</a>`
      : `<button class="btn btn-gold" id="updNow">${tr('تحديث')}</button>`}<button class="btn btn-ghost" id="updLater" aria-label="${tr('لاحقًا')}">✕</button></div></section>`;
}
function bindUpdate() {
  const n = $('#updNow'); if (n) n.onclick = async () => { try { const r = await navigator.serviceWorker.getRegistration(); if (r) await r.update(); } catch (e) {} location.reload(); };
  const l = $('#updLater'); if (l) l.onclick = () => { S.upd.hide = S.upd.latest; save(); route(); };
}
setTimeout(checkUpdate, 3000);

/* ======================================================================
   التهاني وتوصيات الوقت والتذكير المسبق — نفس بنك موقع مشكاة
   المصدر: جدول Google «بنك تهاني وتوصيات مشكاة» (ورقتا «المناسبات» و«العبارات»)
   دون إنترنت: آخر نسخة محفوظة على الجهاز، ثم النسخة المدمجة greet-data.js
   ====================================================================== */
const GR_SHEET = '1cR7mfBJTQsePtKjPTtSFrOw4f4HMNG_h1FkHVTBmHN8', GR_CK = 'rawd-greet-v1';
const GR_SITE = 'https://mishkatapps.github.io/';
const GR = { bank: null, cur: {}, sig: '' };
function grCsv(text) {
  const rows = []; let row = [], f = '', q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) { if (c === '"') { if (text[i + 1] === '"') { f += '"'; i++; } else q = false; } else f += c; }
    else if (c === '"') q = true;
    else if (c === ',') { row.push(f); f = ''; }
    else if (c === '\n') { row.push(f); rows.push(row); row = []; f = ''; }
    else if (c !== '\r') f += c;
  }
  if (f !== '' || row.length) { row.push(f); rows.push(row); }
  return rows;
}
function grFetch() {
  const url = n => 'https://docs.google.com/spreadsheets/d/' + GR_SHEET + '/gviz/tq?tqx=out:csv&headers=1&sheet=' + encodeURIComponent(n) + '&_=' + Math.floor(Date.now() / 300000);
  return Promise.all(['المناسبات', 'العبارات'].map(n => fetch(url(n), { cache: 'no-store' }).then(r => { if (!r.ok) throw 0; return r.text(); }).then(grCsv)))
    .then(a => { if (a[0].length < 2 || a[1].length < 2) throw 0; return { occ: a[0], msg: a[1] }; });
}
function grParse(bank) {
  const on = v => !/^(لا|no|false|0)$/i.test(v || '');
  const objs = (rows, map) => { const h = (rows[0] || []).map(x => String(x).trim());
    return rows.slice(1).map(r => { const o = {}; for (const k in map) { const i = h.indexOf(map[k]); o[k] = i < 0 ? '' : String(r[i] ?? '').trim(); } return o; }); };
  return {
    occ: objs(bank.occ, { key: 'المفتاح', name: 'المناسبة', en: 'English', hm: 'الشهر الهجري', d1: 'من يوم', d2: 'إلى يوم', wd: 'يوم الأسبوع', t1: 'من وقت', t2: 'إلى وقت', pr: 'الأولوية', on: 'مفعّل', rem: 'التذكير قبل (أيام)', rs: 'يبدأ التذكير من وقت', re: 'ينتهي التذكير يوم المناسبة عند' }).filter(o => o.key && on(o.on)),
    msg: objs(bank.msg, { key: 'المفتاح', type: 'النوع', ar: 'النص العربي', en: 'English', ev: 'الدليل', st: 'الملصق', img: 'صورة (رابط اختياري)', on: 'مفعّل' }).filter(m => m.key && (m.ar || m.en) && on(m.on))
  };
}
const GR_WD = { 'الأحد': 0, 'الاحد': 0, 'الاثنين': 1, 'الإثنين': 1, 'الثلاثاء': 2, 'الأربعاء': 3, 'الاربعاء': 3, 'الخميس': 4, 'الجمعة': 5, 'السبت': 6,
  sun: 0, sunday: 0, mon: 1, monday: 1, tue: 2, tuesday: 2, wed: 3, wednesday: 3, thu: 4, thursday: 4, fri: 5, friday: 5, sat: 6, saturday: 6 };
const GR_TK = { 'بداية اليوم': 'start', 'الفجر': 'fajr', 'الشروق': 'sunrise', 'الظهر': 'dhuhr', 'العصر': 'asr', 'المغرب': 'maghrib', 'العشاء': 'isha', 'منتصف الليل': 'mid', 'الثلث الأخير': 'third', 'نهاية اليوم': 'end' };
function grParts(tz, date, cal) {
  const p = {}; try { new Intl.DateTimeFormat('en-US-u-nu-latn' + (cal ? '-ca-' + cal : ''), { timeZone: tz, year: 'numeric', month: 'numeric', day: 'numeric', weekday: 'short', hour: 'numeric', minute: 'numeric', hourCycle: 'h23' }).formatToParts(date).forEach(x => { p[x.type] = x.value; }); } catch (e) {}
  return p;
}
const grDays = s => String(s).split(/[،,؛;\s]+/).filter(Boolean).map(w => GR_WD[w.toLowerCase()]);
function grDay(tz, d) { const h = grParts(tz, d, 'islamic-umalqura'), g = grParts(tz, d);
  return { hm: parseInt(h.month, 10), hd: parseInt(h.day, 10), wd: { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[g.weekday], ymd: g.year + '-' + g.month + '-' + g.day }; }
function grContext(now) {   // الشهر واليوم الهجري ويوم الأسبوع والدقائق بتوقيت مدينة المواقيت
  const loc = prayLoc(), tz = loc.tz, mins = d => { const p = grParts(tz, d); return (+p.hour % 24) * 60 + (+p.minute); };
  const x = grDay(tz, now), M = { now: mins(now) };
  try {
    const [y, m, d] = ymdIn(tz, now), T = prayerTimes(y, m, d, loc);
    for (const [k] of PNAMES) M[k] = mins(T[k]);
    const night = 1440 - M.maghrib + M.fajr;
    M.mid = Math.round(M.maghrib + night / 2) % 1440; M.third = Math.round(M.fajr - night / 3 + 1440) % 1440;
  } catch (e) {}
  return Object.assign(x, { M, ok: M.fajr != null });
}
function grActive(o, c) {
  const n = v => { const k = parseInt(v, 10); return isNaN(k) ? null : k; };
  if (String(o.hm).trim()) { const ms = String(o.hm).split(/[،,؛;\s]+/).map(x => parseInt(x, 10)).filter(x => !isNaN(x)); if (ms.length && !ms.includes(c.hm)) return false; }
  const d1 = n(o.d1), d2 = n(o.d2) ?? d1;
  if (d1 != null && c.hd < d1) return false;
  if (d2 != null && c.hd > d2) return false;
  if (o.wd && !grDays(o.wd).includes(c.wd)) return false;
  if (o.t1 || o.t2) {
    if (!c.ok && (GR_TK[o.t1] || GR_TK[o.t2])) return false;
    const tm = (v, end) => { const k = GR_TK[v] || String(v).toLowerCase(); if (k === 'start') return 0; if (k === 'end') return 1440;
      const mm = /^(\d{1,2}):(\d{2})$/.exec(v); if (mm) return +mm[1] * 60 + +mm[2]; return c.M[k] ?? (end ? 1440 : 0); };
    const a = o.t1 ? tm(o.t1) : 0, b = o.t2 ? tm(o.t2, true) : 1440, t = c.M.now;
    if (a <= b ? !(t >= a && t < b) : !(t >= a || t < b)) return false;
  }
  return true;
}
const grTxt = m => EN ? (m.en || m.ar) : (m.ar || m.en);
function grPick(type, ctx, avoid) {
  const occ = GR.bank.occ.filter(o => grActive(o, ctx)).sort((a, b) => (+b.pr || 0) - (+a.pr || 0));
  for (const o of occ) {
    let list = GR.bank.msg.filter(m => m.key === o.key && (m.type === type || (type === 'توصية' && m.type === 'نصيحة')) && (EN ? m.en : m.ar));
    if (!list.length) continue;
    if (avoid && list.length > 1) list = list.filter(m => m !== avoid);
    return { occ: o, m: list[Math.floor(Math.random() * list.length)], n: list.length };
  }
  return null;
}
function grRefresh(force) {   // تُختار العبارات من جديد عند دخول وقت أو مناسبة جديدة فقط
  if (!GR.bank) return false;
  const ctx = grContext(new Date()), sig = GR.bank.occ.filter(o => grActive(o, ctx)).map(o => o.key).join(',');
  if (!force && sig === GR.sig) return false;
  GR.sig = sig; GR.cur = { g: grPick('تهنئة', ctx), r: grPick('توصية', ctx) }; return true;
}
// الملصقات مدمجة في التطبيق (img/stickers) فتعمل دون إنترنت؛ والجديد منها يُجلب من موقع مشكاة
const grLocal = u => String(u || '').replace(/^https?:\/\/mishkatapps\.github\.io\/(img\/stickers\/)/i, '$1');
const grRemote = u => /^https?:/i.test(u || '') ? u : GR_SITE + String(u || '').replace(/^\.?\//, '');
const grName = o => EN ? (o.en || o.name) : o.name;
const grNative = () => !!(window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform());
function grCard(kind, r) {
  const m = r.m, emo = esc(m.st || '✨'), canImg = true;
  const stk = m.img ? `<img class="gs-img" src="${esc(grLocal(m.img))}" data-remote="${esc(grRemote(m.img))}" alt="" loading="lazy" onerror="if(this.dataset.remote&&this.src!==this.dataset.remote){this.src=this.dataset.remote}else{this.outerHTML='<span class=gs-emo>${emo}</span>'}">` : `<span class="gs-emo" aria-hidden="true">${emo}</span>`;
  return `<section class="glass gcard g-${kind}" data-noi18n><span class="lbl">${kind === 'g' ? '🎉' : '✦'} ${esc(grName(r.occ))}</span>
    <div class="gbody">${stk}<p class="gtxt"${EN ? ' dir="auto"' : ''}>${esc(grTxt(m))}</p>${evT(m) ? `<small class="gev">${esc(evT(m))}</small>` : ''}</div>
    <div class="gbtns">${r.n > 1 ? `<button class="btn btn-ghost btn-sm" data-gr="next" data-k="${kind}">${EN ? '↻ Another' : '↻ عبارة أخرى'}</button>` : ''}
      <button class="btn btn-ghost btn-sm" data-gr="copy" data-k="${kind}">${EN ? '⧉ Copy' : '⧉ نسخ'}</button>
      <button class="btn btn-ghost btn-sm" data-gr="share" data-k="${kind}">${EN ? '↗ Share' : '↗ مشاركة'}</button>
      ${canImg ? `<button class="btn btn-gold btn-sm" data-gr="img" data-k="${kind}">${EN ? '🖼 As image' : '🖼 كصورة'}</button>` : ''}
      ${m.img ? `<button class="btn btn-ghost btn-sm" data-gr="stk" data-k="${kind}">${EN ? '📥 Sticker' : '📥 الملصق'}</button>` : ''}</div></section>`;
}
function greetCards() {
  if (!S.settings.showGreet || !GR.bank) return '';
  grRefresh();
  const { g, r } = GR.cur;
  return (g ? grCard('g', g) : '') + (r ? grCard('r', r) : '') +
    `<div class="gal-row" data-noi18n><button class="btn btn-ghost btn-sm" data-gr="gal">${EN ? '🎨 Stickers to share' : '🎨 ملصقات للمشاركة'}</button></div>`;
}
const grShareText = r => (r.m.st ? r.m.st + ' ' : '') + grTxt(r.m) + '\n\n— ' + (EN ? 'Rawd adh-Dhikr · Mishkat' : 'روض الذكر · مشكاة') + '\n' + GR_SITE;
const grPlug = n => window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins[n];
const grB64 = blob => new Promise((res, rej) => { const fr = new FileReader(); fr.onload = () => res(String(fr.result).split(',')[1]); fr.onerror = rej; fr.readAsDataURL(blob); });
async function grShareFile(blob, name, text) {   // مشاركة صورة: في التطبيق المثبّت عبر نافذة المشاركة في أندرويد، وفي المتصفح عبر Web Share أو التنزيل
  const SH = grPlug('Share'), FS = grPlug('Filesystem');
  if (grNative() && SH && FS) {
    try { const w = await FS.writeFile({ path: name, data: await grB64(blob), directory: 'CACHE' });
      await SH.share({ files: [w.uri], text: text || undefined, dialogTitle: EN ? 'Share' : 'مشاركة' }); return; } catch (e) { if (/cancel/i.test(String(e && (e.message || e)))) return; }
  }
  const f = new File([blob], name, { type: blob.type || 'image/png' });
  if (navigator.canShare && navigator.canShare({ files: [f] })) { try { await navigator.share(text ? { files: [f], text } : { files: [f] }); } catch (e) {} return; }
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 4000); toast(EN ? 'Image saved' : 'تم حفظ الصورة');
}
async function grShareText2(text) {
  const SH = grPlug('Share');
  if (grNative() && SH) { try { await SH.share({ text, dialogTitle: EN ? 'Share' : 'مشاركة' }); return true; } catch (e) { return /cancel/i.test(String(e && (e.message || e))); } }
  if (navigator.share) { try { await navigator.share({ text }); } catch (e) {} return true; }
  return false;
}
let GR_GAL = null;
async function grGallery() {   // معرض الملصقات: ملصقات المناسبة الحالية أولًا
  if (!GR_GAL) { try { GR_GAL = await (await fetch('img/stickers/index.json')).json(); } catch (e) { return toast(EN ? 'Could not load stickers' : 'تعذّر تحميل الملصقات'); } }
  const c = grContext(new Date()), now = GR.bank ? GR.bank.occ.filter(o => grActive(o, c)).map(o => o.key) : [];
  grUpcoming().forEach(r => now.push(r.occ.key));
  const score = it => { const o = it.occ || []; return o.some(k => now.includes(k)) ? 0 : !o.length ? 1 : /^g-/.test(it.id) ? 2 : 3; };
  const list = GR_GAL.slice().sort((a, b) => score(a) - score(b));
  const old = $('#grGal'); if (old) old.remove();
  const w = document.createElement('div'); w.id = 'grGal'; w.className = 'rmd-back'; w.setAttribute('role', 'dialog'); w.setAttribute('aria-modal', 'true'); w.dataset.noi18n = '';
  w.innerHTML = `<div class="rmd glass gal"><button class="rmd-x" aria-label="${EN ? 'Close' : 'إغلاق'}">✕</button><h3>🎨 ${EN ? 'Stickers to share' : 'ملصقات للمشاركة'}</h3>
    <p class="gal-tip">${EN ? 'Tap a sticker to send it to friends' : 'اضغط على أي ملصق لإرساله إلى أصدقائك'}</p>
    <div class="gal-grid">${list.map(it => `<button class="gal-it${score(it) === 0 ? ' now' : ''}" data-id="${esc(it.id)}"><img src="img/stickers/${esc(it.id)}.png" alt="${esc(it.ar || '')}" loading="lazy"></button>`).join('')}</div></div>`;
  document.body.appendChild(w);
  w.addEventListener('click', async e => {
    if (e.target === w || e.target.closest('.rmd-x')) return w.remove();
    const b = e.target.closest('.gal-it'); if (!b) return;
    try { const blob = await (await fetch('img/stickers/' + b.dataset.id + '.png')).blob(); await grShareFile(blob, 'rawd-' + b.dataset.id + '.png'); } catch (x) {}
  });
}
function grWrap(x, text, maxW) { const words = String(text).split(/\s+/), L = []; let line = '';
  for (const w of words) { const t = line ? line + ' ' + w : w; if (x.measureText(t).width > maxW && line) { L.push(line); line = w; } else line = t; }
  if (line) L.push(line); return L; }
function grLoadImg(u) { return new Promise(res => { if (!u) return res(null); const i = new Image(); i.crossOrigin = 'anonymous';
  i.onload = () => res(i); i.onerror = () => { if (i.src.indexOf('http') === 0) return res(null); i.src = grRemote(u); }; i.src = grLocal(u); }); }
async function grImage(r) {   // صورة مربعة يغلب عليها الملصق، والنص قصير تحته
  const im = await grLoadImg(r.m.img), SZ = 1080, cv = document.createElement('canvas'); cv.width = cv.height = SZ;
  const x = cv.getContext('2d'), txt = grTxt(r.m), F = getComputedStyle(document.body).getPropertyValue('--qf').trim() || 'Q1';
  const bg = x.createRadialGradient(SZ / 2, SZ * .35, 80, SZ / 2, SZ / 2, SZ * .8); bg.addColorStop(0, '#1d3c80'); bg.addColorStop(.55, '#0b1d48'); bg.addColorStop(1, '#050d24');
  x.fillStyle = bg; x.fillRect(0, 0, SZ, SZ);
  x.fillStyle = 'rgba(233,207,140,.07)'; for (let i = 0; i < 26; i++) { x.beginPath(); x.arc((i * 397) % SZ, (i * 263) % SZ, 3 + (i % 4), 0, 7); x.fill(); }
  x.strokeStyle = '#d9b15c'; x.lineWidth = 6; x.strokeRect(30, 30, SZ - 60, SZ - 60); x.lineWidth = 2; x.strokeRect(46, 46, SZ - 92, SZ - 92);
  x.textAlign = 'center'; x.textBaseline = 'middle'; x.direction = EN ? 'ltr' : 'rtl';
  let y1, box;
  if (im) { x.drawImage(im, SZ / 2 - 370, 60, 740, 740); y1 = 800; box = 190; }
  else { x.font = '300px "Noto Color Emoji","Apple Color Emoji","Segoe UI Emoji",sans-serif'; x.fillText(r.m.st || '✨', SZ / 2, 330);
    x.fillStyle = '#e9cf8c'; x.font = 'bold 54px system-ui, sans-serif'; x.fillText(grName(r.occ), SZ / 2, 600); y1 = 680; box = 300; }
  let fs = EN ? 40 : 48, L; x.fillStyle = '#f6e7bd';
  do { x.font = (EN ? fs + 'px system-ui, sans-serif' : fs + 'px ' + F + ', "Traditional Arabic", serif'); L = grWrap(x, txt, SZ - 180); fs -= 2; } while (L.length * fs * 1.7 > box && fs > 24);
  const lh = (fs + 2) * 1.7, y0 = y1 + (box - L.length * lh) / 2 + lh / 2;
  L.forEach((l, i) => x.fillText(l, SZ / 2, y0 + i * lh));
  x.fillStyle = '#d9b15c'; x.font = 'bold 30px system-ui, sans-serif'; x.direction = 'rtl';
  x.fillText(EN ? 'Rawd adh-Dhikr · Mishkat' : 'روض الذكر · مشكاة', SZ / 2, SZ - 72);
  return new Promise(res => cv.toBlob(res, 'image/png'));
}
async function grAction(act, k) {
  const r = GR.cur[k]; if (!r) return;
  if (act === 'next') {
    const ctx = grContext(new Date()); GR.cur[k] = grPick(k === 'g' ? 'تهنئة' : 'توصية', ctx, r.m) || r;
    const el = view.querySelector('.gcard.g-' + k); if (el) { const t = document.createElement('div'); t.innerHTML = grCard(k, GR.cur[k]); el.replaceWith(t.firstElementChild); }
  } else if (act === 'copy') {
    try { await navigator.clipboard.writeText(grShareText(r)); } catch (e) { const ta = document.createElement('textarea'); ta.value = grShareText(r); document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove(); }
    toast(EN ? 'Copied' : 'تم النسخ');
  } else if (act === 'share') {
    if (!(await grShareText2(grShareText(r)))) grAction('copy', k);
  } else if (act === 'img') {
    try { await document.fonts.ready; } catch (e) {}
    await grShareFile(await grImage(r), 'rawd-' + r.occ.key + '.png', grShareText(r));
  } else if (act === 'stk') {
    const im = await grLoadImg(r.m.img); if (!im) return;
    const cv = document.createElement('canvas'); cv.width = im.naturalWidth || 512; cv.height = im.naturalHeight || 512; cv.getContext('2d').drawImage(im, 0, 0);
    await grShareFile(await new Promise(res => cv.toBlob(res, 'image/png')), 'rawd-sticker-' + r.occ.key + '.png');
  }
}
document.addEventListener('click', e => { const b = e.target.closest('[data-gr]'); if (!b) return; if (b.dataset.gr === 'gal') return grGallery(); grAction(b.dataset.gr, b.dataset.k); });

/* ---------- التذكير المسبق بالمناسبات (نافذة عند فتح التطبيق) ---------- */
const GR_ACK = 'rawd-remind-ack', GR_SHOWN = 'rawd-remind-shown';
function grStarts(o, x) {   // هل تبدأ المناسبة في هذا اليوم؟
  const n = v => { const k = parseInt(v, 10); return isNaN(k) ? null : k; }, m = n(o.hm), d1 = n(o.d1);
  if (o.wd) { if (!grDays(o.wd).includes(x.wd)) return false; if (m == null && d1 == null) return true; }
  if (d1 == null) return m != null && x.hm === m && x.hd === 1;
  return (m == null || x.hm === m) && x.hd === d1;
}
function grUpcoming() {
  if (!GR.bank) return [];
  const tz = prayLoc().tz, now = Date.now(); let ack = {}; try { ack = JSON.parse(localStorage.getItem(GR_ACK) || '{}'); } catch (e) {}
  const out = [], seen = {}, C = grContext(new Date(now)), t = C.M.now, tm = v => { const k = GR_TK[v]; if (k === 'start') return 0; if (k === 'end') return 1440;
    const mm = /^(\d{1,2}):(\d{2})$/.exec(v); if (mm) return +mm[1] * 60 + +mm[2]; return C.M[k] ?? 0; };
  for (const o of GR.bank.occ) {
    const R = parseInt(o.rem, 10); if (!(R > 0) || seen[o.key]) continue;
    // نافذة التذكير: من «يبدأ التذكير من وقت» في أول أيامه، حتى «ينتهي التذكير يوم المناسبة عند» في يوم المناسبة
    for (let d = 0; d <= R; d++) {
      const x = grDay(tz, new Date(now + d * 864e5)); if (!grStarts(o, x)) continue;
      if (d > 1 && grStarts(o, grDay(tz, new Date(now)))) break;
      if (d === 0 && !(o.re && C.ok && t < tm(o.re))) break;
      if (d === R && o.rs && t < tm(o.rs)) break;
      const id = o.key + '|' + x.ymd; if (ack[id]) break;
      const list = GR.bank.msg.filter(m => m.key === o.key && m.type === 'تذكير' && (EN ? m.en : m.ar));
      if (!list.length) break;
      seen[o.key] = 1; out.push({ id, occ: o, d, m: list[Math.floor(Math.random() * list.length)] }); break;
    }
  }
  return out.sort((a, b) => a.d - b.d || (+b.occ.pr || 0) - (+a.occ.pr || 0));
}
const grWhen = d => d === 0 ? (EN ? 'Today' : 'اليوم') : EN ? (d === 1 ? 'Tomorrow' : d === 2 ? 'In two days' : 'In ' + d + ' days') : (d === 1 ? 'غدًا' : d === 2 ? 'بعد يومين' : 'بعد ' + d + ' أيام');
function showReminders(force) {
  if (!force && (!S.settings.remindPopup || $('#cover') || $('#grRemind'))) return;
  let shown = []; try { shown = JSON.parse(sessionStorage.getItem(GR_SHOWN) || '[]'); if (!Array.isArray(shown)) shown = []; } catch (e) {}
  let list = grUpcoming(); if (!force) list = list.filter(r => !shown.includes(r.id));   // في نفس الجلسة لا يظهر إلا الجديد
  if (!list.length) { if (force) toast(EN ? 'No upcoming reminders' : 'لا توجد تذكيرات قادمة'); return; }
  try { sessionStorage.setItem(GR_SHOWN, JSON.stringify(shown.concat(list.map(r => r.id)))); } catch (e) {}
  const old = $('#grRemind'); if (old) old.remove();
  const w = document.createElement('div'); w.id = 'grRemind'; w.className = 'rmd-back'; w.setAttribute('role', 'dialog'); w.setAttribute('aria-modal', 'true'); w.dataset.noi18n = '';
  w.innerHTML = `<div class="rmd glass"><button class="rmd-x" aria-label="${EN ? 'Close' : 'إغلاق'}">✕</button><h3>🔔 ${EN ? 'Reminder' : 'تذكير'}</h3>
    ${list.map(r => `<div class="rmd-it">${r.m.img ? `<img src="${esc(grLocal(r.m.img))}" onerror="this.src='${esc(grRemote(r.m.img))}';this.onerror=null" alt="">` : `<span class="rmd-emo">${esc(r.m.st || '🔔')}</span>`}
      <div><b>${esc(grName(r.occ))} <em>— ${grWhen(r.d)}</em></b><p>${esc(grTxt(r.m))}</p>${evT(r.m) ? `<small>${esc(evT(r.m))}</small>` : ''}</div></div>`).join('')}
    <div class="rmd-btns"><button class="btn btn-gold" data-r="ok">${EN ? '✓ Got it — don’t remind me again' : '✓ تلقّيت التذكير — لا تكرّره'}</button><button class="btn btn-ghost" data-r="later">${EN ? 'Later' : 'لاحقًا'}</button></div>
    <button class="rmd-off" data-r="off">${EN ? 'Don’t show the reminder window again' : 'عدم إظهار نافذة التذكير مرة أخرى'}</button></div>`;
  document.body.appendChild(w);
  const close = () => w.remove();
  w.addEventListener('click', e => {
    if (e.target === w || e.target.closest('.rmd-x,[data-r="later"]')) return close();
    if (e.target.closest('[data-r="ok"]')) { let a = {}; try { a = JSON.parse(localStorage.getItem(GR_ACK) || '{}'); } catch (x) {} list.forEach(r => { a[r.id] = Date.now(); });
      try { localStorage.setItem(GR_ACK, JSON.stringify(a)); } catch (x) {} close(); toast(EN ? 'May Allah accept from you' : 'تقبّل الله منك'); }
    else if (e.target.closest('[data-r="off"]')) { S.settings.remindPopup = false; save(); close(); toast(EN ? 'Reminder window turned off — re-enable it from Settings' : 'أُوقفت نافذة التذكير — يمكن تفعيلها من الإعدادات'); if (/settings/.test(location.hash)) route(); }
  });
}
function greetInit() {
  let cached = null; try { cached = JSON.parse(localStorage.getItem(GR_CK) || 'null'); } catch (e) {}
  try { GR.bank = grParse(cached || window.MK_GREET_DEFAULT || { occ: [[]], msg: [[]] }); } catch (e) { GR.bank = { occ: [], msg: [] }; }
  grFetch().then(b => {
    const s = JSON.stringify(b); if (cached && JSON.stringify(cached) === s) return;
    try { localStorage.setItem(GR_CK, s); } catch (e) {}
    GR.bank = grParse(b); grRefresh(true); if (/^#?\/?$|^#\/home/.test(location.hash)) route();
  }).catch(() => {});
  const tryShow = () => { if ($('#cover')) return setTimeout(tryShow, 1000); setTimeout(() => showReminders(), 1200); };
  setTimeout(tryShow, 1500);
  setInterval(() => { if (!document.hidden) showReminders(); }, 5 * 60000);   // يظهر التذكير عند دخول وقته والتطبيق مفتوح
  setInterval(() => { if (GR.bank && grRefresh() && /^#?\/?$|^#\/home/.test(location.hash) && S.settings.showGreet) route(); }, 60000);
}

/* ======================================================================
   «مشكاة النبوة»: حديث اليوم — نفس أحاديث موقع مشكاة وصورها
   النصوص مدمجة (hadith-data.js)، والتفعيل والمناسبة من ورقة «مشكاة النبوة»، والصور من موقع مشكاة
   ====================================================================== */
  /* ترجمة «الدليل» إلى الإنجليزية: أسماء الكتب والدرجات ومراجع الآيات؛ وإن بقي نص عربي لا يُعرض */
var SURA = 'الفاتحة البقرة آل_عمران النساء المائدة الأنعام الأعراف الأنفال التوبة يونس هود يوسف الرعد إبراهيم الحجر النحل الإسراء الكهف مريم طه الأنبياء الحج المؤمنون النور الفرقان الشعراء النمل القصص العنكبوت الروم لقمان السجدة الأحزاب سبأ فاطر يس الصافات ص الزمر غافر فصلت الشورى الزخرف الدخان الجاثية الأحقاف محمد الفتح الحجرات ق الذاريات الطور النجم القمر الرحمن الواقعة الحديد المجادلة الحشر الممتحنة الصف الجمعة المنافقون التغابن الطلاق التحريم الملك القلم الحاقة المعارج نوح الجن المزمل المدثر القيامة الإنسان المرسلات النبأ النازعات عبس التكوير الانفطار المطففين الانشقاق البروج الطارق الأعلى الغاشية الفجر البلد الشمس الليل الضحى الشرح التين العلق القدر البينة الزلزلة العاديات القارعة التكاثر العصر الهمزة الفيل قريش الماعون الكوثر الكافرون النصر المسد الإخلاص الفلق الناس'.split(' ').map(function (x) { return x.replace(/_/g, ' '); });
var EVB = [['صحيح الجامع', 'Sahih al-Jamiʿ'], ['صحيح الترغيب', 'Sahih at-Targhib'], ['السلسلة الصحيحة', 'as-Silsilah as-Sahihah'], ['فتح الباري', 'Fath al-Bari'],
  ['وصححه الألباني في', 'graded sahih by al-Albani in'], ['وحسّنه الألباني في', 'graded hasan by al-Albani in'], ['وصححه الألباني', 'graded sahih by al-Albani'], ['وحسّنه الألباني', 'graded hasan by al-Albani'], ['وحسنه الألباني', 'graded hasan by al-Albani'],
  ['البخاري', 'al-Bukhari'], ['مسلم', 'Muslim'], ['الترمذي', 'at-Tirmidhi'], ['النسائي', 'an-Nasa’i'], ['أبو داود', 'Abu Dawud'], ['ابن ماجه', 'Ibn Majah'], ['أحمد', 'Ahmad'], ['الحاكم', 'al-Hakim'], ['ابن حبان', 'Ibn Hibban'], ['البيهقي', 'al-Bayhaqi'], ['الطبراني', 'at-Tabarani']];
function evEn(ev) {
  var t = String(ev || '').replace(/﴿[^﴾]*﴾\s*/g, '').replace(/\[([^\]:]+):\s*([\d–\-]+)\]/g, function (m, s, v) { var i = SURA.indexOf(s.trim()); return i < 0 ? m : '[Qur’an ' + (i + 1) + ':' + v + ']'; });
  EVB.forEach(function (p) { t = t.split(p[0]).join(p[1]); });
  t = t.replace(/،/g, ',').replace(/\s+و(?=[A-Za-z])/g, ' and ').replace(/^[\s,—-]+|[\s,—-]+$/g, '');
  return /[؀-ۿ]/.test(t) ? '' : t;
}
const evT = m => EN ? evEn(m.ev) : (m.ev || '');
const HD = { all: window.MK_HADITH || [], ov: null, cur: null, day: 0 };
function hdFetch() {
  const u = 'https://docs.google.com/spreadsheets/d/' + GR_SHEET + '/gviz/tq?tqx=out:csv&headers=1&sheet=' + encodeURIComponent('مشكاة النبوة') + '&_=' + Math.floor(Date.now() / 300000);
  return fetch(u, { cache: 'no-store' }).then(r => { if (!r.ok) throw 0; return r.text(); }).then(t => {
    const rows = grCsv(t), h = (rows[0] || []).map(x => String(x).trim()), iN = h.indexOf('الرقم'), iO = h.indexOf('المناسبة'), iE = h.indexOf('مفعّل'), iD = h.indexOf('تاريخ محدد'), o = {};
    if (iN < 0 || iE < 0) throw 0;
    rows.slice(1).forEach(r => { const n = parseInt(r[iN], 10); if (n) o[n] = { on: String(r[iE] || '').trim(), occ: iO < 0 ? null : String(r[iO] || '').trim(), pin: iD < 0 ? '' : String(r[iD] || '').trim() }; });
    return o;
  });
}
function hdList() {
  return HD.all.map(h => { const o = HD.ov && HD.ov[h.n];
    return { h, on: o && o.on ? !/^(لا|no|false|0)$/i.test(o.on) : h.on === 'نعم', occ: o && o.occ != null ? o.occ : h.occ, pin: (o && o.pin) || '' }; }).filter(x => x.on || x.pin);
}
function hdDay() { const [y, m, d] = ymdIn(prayLoc().tz, new Date()); return Math.floor(Date.UTC(y, m - 1, d) / 864e5); }
function hdPerm(n) { const a = [...Array(n).keys()]; let s = 20261117;
  for (let j = n - 1; j > 0; j--) { s = (s * 1103515245 + 12345) % 2147483648; const k = s % (j + 1); [a[j], a[k]] = [a[k], a[j]]; } return a; }
function hdToday() {   // نفس حديث اليوم في الموقع والتطبيق؛ وأحاديث المواسم تظهر في مواسمها
  const All = hdList(), [yy, mm, dd] = ymdIn(prayLoc().tz, new Date()), ymd = yy + '-' + String(mm).padStart(2, '0') + '-' + String(dd).padStart(2, '0');
  const pin = All.find(x => String(x.pin).split(/[،,\s]+/).includes(ymd)); if (pin) return pin.h;   // حديث مثبّت لهذا التاريخ من لوحة المدير
  const L = All.filter(x => x.on); if (!L.length) return null;
  const d = hdDay(), c = grContext(new Date());
  const act = GR.bank ? GR.bank.occ.filter(o => (String(o.hm).trim() || o.d1 || o.wd) && grActive(Object.assign({}, o, { t1: '', t2: '' }), c)).map(o => o.key) : [];
  const occ = L.filter(x => String(x.occ || '').split(/[،,\s]+/).some(k => k && act.includes(k)));
  if (occ.length >= 3) return occ[d % occ.length].h;   // مناسبة لها أحاديث كثيرة: حديثها كل يوم
  if (occ.length && d % 2 === 0) return occ[(d / 2) % occ.length].h;   // مناسبة طويلة بحديث أو اثنين: يومًا بيوم مع العشوائي حتى لا يتكرر الحديث نفسه شهرًا
  const SEAS = /(^|,)\s*(ramadan|ramadan_start|last_ten|dhulhijja_ten|arafah|ashura|suhur|iftar)\s*(,|$)/;
  let Rr = L.filter(x => !SEAS.test(String(x.occ || ''))); if (!Rr.length) Rr = L;
  return Rr[hdPerm(Rr.length)[d % Rr.length]].h;
}
const hdEN = h => EN && !!h.ten;
const hdImg = h => GR_SITE + 'img/hadith/' + (hdEN(h) ? 'en/' : '') + String(h.n).padStart(3, '0') + '.jpg';
const hdMeta = h => hdEN(h) ? [h.nen, h.sen + (h.gen ? ' (' + h.gen + ')' : '')].filter(Boolean).join(' · ') : [h.nar, h.src + (h.grade ? ' (' + h.grade + ')' : '')].filter(Boolean).join(' · ');
const hdText = h => hdEN(h) ? h.hen + ': “' + h.ten + '”\n' + hdMeta(h) + '\n\n' + h.head + ': «' + h.text + '»' : h.head + ': «' + h.text + '»\n' + hdMeta(h);
function hadithCard() {
  if (!S.settings.showHadith) return '';
  const day = hdDay(); if (!HD.cur || HD.day !== day) { HD.cur = hdToday(); HD.day = day; }
  const h = HD.cur; if (!h) return '';
  return `<section class="glass hcard" data-noi18n><span class="lbl">✦ ${EN ? 'Mishkat an-Nubuwwah · Hadith of the day' : 'مشكاة النبوة · حديث اليوم'}</span>
    <figure class="h-fig"><img src="${hdImg(h)}" alt="${esc(hdEN(h) ? h.hen + ': ' + h.ten : h.head + ': ' + h.text)}" loading="lazy" crossorigin="anonymous" onerror="this.parentNode.classList.add('noimg')">
    ${hdEN(h) ? `<figcaption class="h-txt" lang="en" dir="ltr"><b>${esc(h.hen)}:</b> “${esc(h.ten)}”<small>${esc(hdMeta(h))}</small><span class="h-ar" lang="ar" dir="rtl">${esc(h.head)}: «${esc(h.text)}»</span></figcaption>`
      : `<figcaption class="h-txt" lang="ar" dir="rtl"><b>${esc(h.head)}:</b> «${esc(h.text)}»<small>${esc(hdMeta(h))}</small></figcaption>`}</figure>
    <div class="gbtns"><button class="btn btn-gold btn-sm" data-hd="img">${EN ? '🖼 Share image' : '🖼 مشاركة الصورة'}</button>
    <button class="btn btn-ghost btn-sm" data-hd="text">${EN ? '↗ Share text' : '↗ مشاركة النص'}</button>
    <button class="btn btn-ghost btn-sm" data-hd="next">${EN ? '↻ Another' : '↻ حديث آخر'}</button></div></section>`;
}
document.addEventListener('click', async e => {
  const b = e.target.closest('[data-hd]'); if (!b || !HD.cur) return; const h = HD.cur;
  if (b.dataset.hd === 'next') { const L = hdList().filter(x => x.on); if (L.length < 2) return; let x; do { x = L[Math.floor(Math.random() * L.length)].h; } while (x === h);
    HD.cur = x; const el = view.querySelector('.hcard'); if (el) { const t = document.createElement('div'); t.innerHTML = hadithCard(); el.replaceWith(t.firstElementChild); } }
  else if (b.dataset.hd === 'text') { const t = hdText(h) + '\n\n— ' + (EN ? 'Rawd adh-Dhikr · Mishkat' : 'روض الذكر · مشكاة') + '\n' + GR_SITE;
    if (!(await grShareText2(t))) { try { await navigator.clipboard.writeText(t); toast(EN ? 'Copied' : 'تم النسخ'); } catch (x) {} } }
  else if (b.dataset.hd === 'img') {
    try { const r = await fetch(hdImg(h)); if (!r.ok) throw 0; await grShareFile(await r.blob(), 'mishkat-hadith-' + h.n + '.jpg'); }
    catch (x) { toast(EN ? 'The image needs an internet connection' : 'صورة الحديث تحتاج اتصالًا بالإنترنت'); }
  }
});
function hadithInit() {
  try { HD.ov = JSON.parse(localStorage.getItem('rawd-hadith-v1') || 'null'); } catch (e) {}
  hdFetch().then(o => { const s = JSON.stringify(o); if (s === JSON.stringify(HD.ov)) return; HD.ov = o;
    try { localStorage.setItem('rawd-hadith-v1', s); } catch (e) {} HD.cur = null; if (/^#?\/?$|^#\/home/.test(location.hash)) route(); }).catch(() => {});
}

function prayerCard() {
  if (!S.settings.showPrayer) return '';
  const np = nextPrayer();
  return `<a class="glass pcard" href="#/prayer"><span class="pc-ic">🕌</span><span class="t"><small>الصلاة القادمة · ${esc(np.loc.name)}</small>
    <b>${np.name} <span class="pc-at">${fmtTime(np.at, np.loc)}</span></b></span>
    <span class="pc-cd"><small>متبقٍّ</small><b data-cd data-key="${np.key}">${countdown(np.at - new Date())}</b></span></a>`;
}
function renderHome() {
  setBg(timeBg());
  const pr = period();
  const greg = new Intl.DateTimeFormat(LOC_G, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date());
  const doneToday = Object.keys(S.counts).filter(id => ITEM[id] && isDone(ITEM[id])).length;
  const catsDone = DATA.filter(c => catProgress(c).p === 1).length;
  const dod = dhikrOfDay();
  const main = ['morning', 'evening', 'prayer', 'jawami', 'ramadan', 'sleep'].map(id => CAT[id]);
  const sg = suggestions(), first = sg.find(x => !x.done);
  const cta = first ? { h: `#/s/${first.cat}${qs(first.g)}`, t: 'ابدأ ' + first.c.name + (first.g ? ' · ' + first.g : '') } : (sg.length ? { h: '#/s/jawami', t: '✓ أتممت أذكار هذا الوقت — من جوامع الدعاء' } : { h: `#/s/${pr.key}`, t: 'ابدأ ' + CAT[pr.key].name });
  view.innerHTML = `<div class="wrap stagger">
    <section class="glass hero">
      <div class="greet">${esc(pr.g)}</div>
      <h1>أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ</h1>${EN ? `<p class="hero-tr">“Verily, in the remembrance of Allah do hearts find rest.” [Ar-Ra'd 13:28]</p>` : ''}
      <div class="dates"><span>📅 <b>${esc(greg)}</b></span>${hijri() ? `<span>🌙 <b>${esc(hijri())}</b></span>` : ''}</div>
      <div class="hero-cta">
        <a class="btn btn-gold" href="${cta.h}">${esc(cta.t)} ←</a>
        <a class="btn btn-ghost" href="#/tasbih">📿 السبحة</a>
        <button class="btn btn-ghost" id="installBtn" hidden>⬇︎ تثبيت التطبيق</button>
      </div>
    </section>
    ${updBanner()}
    ${prayerCard()}
    ${greetCards()}
    ${hadithCard()}
    ${suggestCard(sg)}
    ${resumeCard()}
    ${S.settings.showStats ? `<div class="stats">
      <div class="glass stat"><b>${doneToday}</b><span>ذكر أتممته اليوم</span></div>
      <div class="glass stat"><b>${S.tasbih.total}</b><span>مجموع التسبيح</span></div>
      <div class="glass stat"><b>${calcStreak()}</b><span>أيام متتالية</span></div>
    </div>` : ''}
    <div class="section-title">الوصول السريع <a href="#/sections">كل الأبواب ←</a></div>
    <div class="feature-grid">${main.map(c => featureCard(c, true)).join('')}</div>
    <div class="section-title">ذكر اليوم <a href="#/favorites">♥ المفضلة</a></div>
    <section class="glass dod">
      <span class="lbl">✦ ${esc(CAT[dod.cat].name)}</span>
      <div class="txt">${esc(clean(dod.t))}</div>${xlHtml(dod)}
      <div class="src">${esc(EN ? I18N.src(dod.s) : dod.s)}</div>
      <div class="hero-cta" style="justify-content:center">
        <button class="btn btn-ghost" data-fav="${dod.id}">${S.fav.includes(dod.id) ? '♥ في المفضلة' : '♡ أضف للمفضلة'}</button>
        <button class="btn btn-ghost" data-share="${dod.id}">↗ مشاركة</button>
      </div>
    </section>
    <div class="section-title">أبواب الأذكار والأدعية</div>
    <div class="feature-grid">${DATA.filter(c => !main.includes(c)).map(c => featureCard(c)).join('')}</div>
    ${supportBtn()}
    <p style="text-align:center;margin-top:14px"><span class="offline-badge">● يعمل دون إنترنت</span></p>
  </div>`;
  bindCommon(); setupInstall(); startTicker(); bindUpdate();
}
function resumeCard() {
  const L = S.last; if (!L || !CAT[L.cat]) return '';
  const c = CAT[L.cat], LL = listOf(c, L.g || null), n = LL.length; let i = Math.min(L.i, n - 1);
  if (!n || LL.every(isDone)) return '';   // لا يظهر إذا اكتمل الباب
  let j = i; while (j < n && isDone(LL[j])) j++;
  if (j >= n) return '';   // أُتمّ الذكر الأخير — لا داعي لـ«تابع من حيث توقفت»
  i = j;
  return `<a class="glass resume" href="#/r/${c.id}/${i}${qs(L.g)}"><span class="ic">${c.icon}</span><span class="t"><small>تابع من حيث توقفت</small>
    <b>${esc(c.name)}${L.g ? ' · ' + esc(L.g) : ''}</b><small>الذكر ${i + 1} من ${n}</small><div class="bar"><i style="width:${(i + 1) / n * 100}%"></i></div></span><span style="color:var(--gold-2);font-size:22px">←</span></a>`;
}
function calcStreak() {
  let n = 0; const d = new Date();
  const k = x => x.getFullYear() + '-' + pad(x.getMonth()+1) + '-' + pad(x.getDate());
  if (!S.days[k(d)]) d.setDate(d.getDate() - 1);
  while (S.days[k(d)]) { n++; d.setDate(d.getDate() - 1); }
  return n;
}
function renderSections() {
  setBg('lake');
  $('#topTitle').textContent = 'أبواب الأذكار والأدعية';
  view.innerHTML = `<div class="wrap">
    <div class="glass sec-head"><h2>📚 الأبواب (${DATA.length})</h2>
    <p>الأذكار والأدعية مبوّبة حسب الغرض: من «حصن المسلم»، و«من جوامع دعاء النبي ﷺ»، و«أفكار ذهبية للعشر الأواخر». مجموع النصوص: ${Object.keys(ITEM).length}.</p>
    <div class="sec-tools">${modeSwitch()}</div></div>
    <div class="feature-grid sections stagger">${DATA.map(c => featureCard(c)).join('')}</div></div>`;
  bindMode();
}
function modeSwitch(id, g) {
  const m = S.settings.mode;
  return `<div class="seg mode-seg" data-modeid="${id || ''}" data-modeg="${esc(g || '')}"><button class="${m === 'page' ? 'on' : ''}" data-mode="page">📄 صفحات</button><button class="${m === 'scroll' ? 'on' : ''}" data-mode="scroll">📜 تمرير متصل</button></div>`;
}
function bindMode() { view.querySelectorAll('[data-mode]').forEach(b => b.onclick = () => { const id = b.parentElement.dataset.modeid; setMode(b.dataset.mode, id, b.parentElement.dataset.modeg); if (!id) { view.querySelectorAll('[data-mode]').forEach(x => x.classList.toggle('on', x === b)); } }); }

const ICON = {
  fav: '<svg viewBox="0 0 24 24"><path d="M12 21s-7-4.5-9.3-9A5.3 5.3 0 0 1 12 6.3 5.3 5.3 0 0 1 21.3 12C19 16.5 12 21 12 21z"/></svg>',
  copy: '<svg viewBox="0 0 24 24"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>',
  share: '<svg viewBox="0 0 24 24"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',
  full: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.7 2.7L16.5 9"/></svg>',
  zero: '<svg viewBox="0 0 24 24"><path d="M4 12a8 8 0 1 0 2.3-5.6"/><path d="M4 4v5h5"/></svg>',
  info: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/></svg>'
};
/* اللغات: النطق والترجمة تحت النص العربي */
const XL = it => EN && window.I18N ? I18N.item(it) : null;
function xlHtml(it) {
  const x = XL(it); if (!x) return '';
  return `<div class="xl" dir="ltr">${x.tl ? `<div class="xl-tl">${esc(x.tl)}</div>` : ''}${x.en ? `<div class="xl-en">${esc(x.en)}</div>` : ''}</div>`;
}
function extraHtml(it, force) {
  const x = XL(it);
  const v = (force || S.settings.showVirtue) && it.v, s = (force || S.settings.showSrc) && it.s;
  const vt = x && x.v ? x.v : it.v, st = EN ? I18N.src(it.s) : it.s;
  return (v ? `<div class="zvirtue"${x && x.v ? ' dir="ltr"' : ''}>${esc(vt)}</div>` : '') + (s ? `<div class="zsrc"${EN ? ' dir="ltr"' : ''}>📖 ${esc(st)}</div>` : '');
}
/* الأبواب التي كلها أدعية: زر «آمين» بدل العدّاد، وبقية ما يُقرأ مرة واحدة: «تمّ» */
const DUA_CATS = ['jawami', 'quran', 'relief'];
const onceLabel = it => DUA_CATS.includes(it.cat) ? 'آمين' : 'تمّ';
const NUM_CATS = ['morning', 'evening', 'prayer'];   // تُعرض فيها الأعداد دائمًا حتى لو كان العدد 1
const isOnce = it => targetOf(it) === 1 && !NUM_CATS.includes(it.cat);
function ringHtml(it, size = 54) {
  const t = targetOf(it), c = Math.min(countOf(it.id), t), done = c >= t, r = size / 2 - 4, C = 2 * Math.PI * r;
  if (isOnce(it)) return `<span class="once ${done ? 'on' : ''}">${done ? '✓ ' + onceLabel(it) : onceLabel(it)}</span>`;
  return `<span class="ring" style="width:${size}px;height:${size}px"><svg viewBox="0 0 ${size} ${size}"><circle class="tr" cx="${size/2}" cy="${size/2}" r="${r}"/><circle class="pr" cx="${size/2}" cy="${size/2}" r="${r}" stroke-dasharray="${C}" stroke-dashoffset="${C * (1 - c / t)}"/></svg><b>${done ? '✓' : t - c}</b></span>`;
}
function zcard(it, n, opts = {}) {
  const done = isDone(it);
  const showOcc = it.o && !opts.hideOcc;
  const hasExtra = it.v || it.s;
  return `<article class="glass zcard ${done ? 'done' : ''}" id="z-${it.id}" data-id="${it.id}">
    ${showOcc || opts.showCat ? `<div class="zmeta">${showOcc ? `<span class="zocc">${esc(it.o)}</span>` : ''}${opts.showCat ? `<a class="zcat" href="#/s/${it.cat}">${esc(CAT[it.cat].name)}</a>` : ''}</div>` : ''}
    <div class="zbody">${opts.hl ? opts.hl : esc(clean(it.t))}</div>${xlHtml(it)}
    <div class="zextra">${extraHtml(it)}</div>
    <div class="zfoot">
      <span class="zno">${n}</span>
      <button class="zact ${S.fav.includes(it.id) ? 'fav-on' : ''}" data-fav="${it.id}" aria-label="مفضلة">${ICON.fav}</button>
      <button class="zact" data-copy="${it.id}" aria-label="نسخ">${ICON.copy}</button>
      <button class="zact" data-share="${it.id}" aria-label="مشاركة">${ICON.share}</button>
      ${hasExtra ? `<button class="zact" data-info="${it.id}" aria-label="الفضل والتخريج">${ICON.info}</button>` : ''}
      <button class="zact full" data-full="${it.id}" aria-label="إتمام العدّ" title="إتمام العدّ"${!isOnce(it) && targetOf(it) > 1 && !isDone(it) ? '' : ' hidden'}>${ICON.full}</button><button class="zact zero" data-zero="${it.id}" aria-label="تصفير عدّاد هذا الذكر" title="تصفير العدّاد"${countOf(it.id) ? '' : ' hidden'}>${ICON.zero}</button>
      <button class="counter" data-count="${it.id}" aria-label="عدّاد">${ringHtml(it)}</button>
    </div></article>`;
}
function renderSection(id, occ) {
  const c = CAT[id]; if (!c) return renderSections();
  setBg(c.bg);
  $('#topTitle').textContent = c.name;
  if (c.groups) occ = groupOf(c, occ);
  const occs = c.groups || [...new Set(c.items.map(x => x.o).filter(Boolean))];
  const useChips = occs.length > 1 && occs.length < c.items.length;
  const list = ordered(c, c.items.filter(x => !occ || x.o === occ)), custom = !!(S.order[id] && S.order[id].length);
  const p = c.groups ? catProgress({ items: list }) : catProgress(c);
  view.innerHTML = `<div class="wrap">
    <section class="glass sec-head"><h2><span>${c.icon}</span>${esc(c.name)}</h2>
      <p>${esc(c.desc)}<br><small>المصدر: ${esc(c.src)}</small></p>
      <div class="sec-tools">${modeSwitch(id, c.groups ? occ : '')}
        <button class="btn btn-ghost btn-sm" id="resetSec">↺ تصفير الباب</button>
        <button class="btn btn-ghost btn-sm" id="orderSec">↕ ترتيب الأذكار</button>
        <span class="ring-mini" id="secProg">${p.d} / ${p.n} مكتمل</span>
      </div></section>
    ${useChips && id !== 'morning' && id !== 'evening' ? `<div class="chips ${c.groups ? 'groups' : ''}">
      ${c.groups ? '' : `<a class="chip ${!occ ? 'on' : ''}" href="#/s/${id}">الكل</a>`}
      ${occs.map(o => `<a class="chip ${o === occ ? 'on' : ''}" href="#/s/${id}?o=${encodeURIComponent(o)}">${esc(o)}</a>`).join('')}</div>` : ''}
    <div class="stagger">${list.map((it, k) => zcard(it, c.groups || custom ? k + 1 : it.idx + 1, { hideOcc: id === 'morning' || id === 'evening' || !!c.groups })).join('')}</div>
  </div>`;
  $('#orderSec').onclick = () => renderOrder(id, occ);
  $('#resetSec').onclick = () => { if (resetCat(id)) renderSection(id, occ); };
  bindCommon(); bindMode();
}
/* ترتيب الأذكار داخل الباب */
function renderOrder(id, occ) {
  const c = CAT[id], list = ordered(c, c.items.filter(x => !occ || x.o === occ));
  const first = t => clean(t).split('\n')[0].slice(0, 90);
  view.innerHTML = `<div class="wrap">
    <section class="glass sec-head"><h2><span>↕</span>${tr('ترتيب الأذكار')} — ${esc(c.name)}${occ ? ' · ' + esc(occ) : ''}</h2>
      <p>${tr('رتّب الأذكار كما تحب باستخدام الأسهم، ويُحفظ الترتيب تلقائيًا ويُطبَّق في كل طرق العرض.')}</p>
      <div class="sec-tools"><a class="btn btn-gold btn-sm" href="#/s/${id}${qs(occ)}">✓ ${tr('تم')}</a>
        <button class="btn btn-ghost btn-sm" id="ordReset">↺ ${tr('الترتيب الأصلي')}</button></div></section>
    <div class="ord-list">${list.map((it, k) => `<div class="glass ord-row" data-id="${it.id}"><span class="n">${k + 1}</span>
      <span class="t">${esc(first(it.t))}${clean(it.t).length > 90 || clean(it.t).includes('\n') ? '…' : ''}</span>
      <span class="b"><button data-mv="top" aria-label="${tr('إلى الأعلى')}" ${k === 0 ? 'disabled' : ''}>⤒</button><button data-mv="-1" aria-label="${tr('لأعلى')}" ${k === 0 ? 'disabled' : ''}>▲</button><button data-mv="1" aria-label="${tr('لأسفل')}" ${k === list.length - 1 ? 'disabled' : ''}>▼</button></span></div>`).join('')}</div>
  </div>`;
  view.querySelectorAll('[data-mv]').forEach(b => b.onclick = () => {
    const ids = list.map(x => x.id), i = ids.indexOf(b.closest('.ord-row').dataset.id), mv = b.dataset.mv;
    const j = mv === 'top' ? 0 : i + +mv; if (j < 0 || j >= ids.length) return;
    const [x] = ids.splice(i, 1); ids.splice(j, 0, x);
    // ضع العناصر المعاد ترتيبها في مواضعها داخل ترتيب الباب الكامل
    const full = ordered(c, c.items).map(y => y.id), slots = full.map((y, k2) => ids.includes(y) ? k2 : -1).filter(k2 => k2 >= 0);
    slots.forEach((sl, n) => full[sl] = ids[n]);
    S.order[id] = full; save(); renderOrder(id, occ);
    const row = view.querySelector(`.ord-row[data-id="${x}"]`); if (row) { row.classList.add('moved'); row.scrollIntoView({ block: 'center', behavior: 'smooth' }); }
  });
  $('#ordReset').onclick = () => { delete S.order[id]; save(); renderOrder(id, occ); toast(tr('استُعيد الترتيب الأصلي')); };
}
function updateCard(it) {
  const el = document.getElementById('z-' + it.id);
  if (!el) return;
  el.classList.toggle('done', isDone(it));
  el.querySelector('.counter').innerHTML = ringHtml(it);
  const z = el.querySelector('[data-zero]'); if (z) z.hidden = !countOf(it.id);
  const f = el.querySelector('[data-full]'); if (f) f.hidden = isOnce(it) || targetOf(it) <= 1 || isDone(it);
  return el;
}
function onFinish(it) {   // عند اكتمال ذكر: إحصاء اليوم + تهنئة إتمام الباب
  S.days[today()] = (S.days[today()] || 0) + 1;
  const cat = CAT[it.cat]; if (catProgress(cat).p === 1) { celebrate('🌟'); toast('أتممت ' + cat.name + ' — تقبّل الله'); if (REM[it.cat]) scheduleReminders(); }
}
function completeItem(it) {   // زر «إتمام العدّ»: يعتبر العدّاد وصل للعدد المطلوب
  if (isDone(it)) return false;
  S.counts[it.id] = targetOf(it); vibrate([40, 60, 40]); onFinish(it); save(); return true;
}
function resetCat(id) {   // تصفير أذكار الباب كله
  const c = CAT[id]; if (!c) return false;
  if (!confirm(EN ? 'Reset the counters of all adhkar in this section?' : 'تصفير عدّادات جميع أذكار «' + c.name + '»؟')) return false;
  c.items.forEach(x => delete S.counts[x.id]); if (S.last && S.last.cat === id) delete S.last;
  save(); toast('صُفّرت أذكار الباب ↺'); return true;
}
function bump(it) {
  const t = targetOf(it); const c = countOf(it.id);
  if (c >= t) { vibrate(25); return false; }
  S.counts[it.id] = c + 1;
  const finished = c + 1 >= t;
  if (finished) {
    vibrate([40, 60, 40]); onFinish(it);
  } else vibrate(18);
  save(); return finished;
}
function bindCommon() {
  view.onclick = async e => {
    const b = e.target.closest('[data-count],[data-fav],[data-copy],[data-share],[data-info],[data-zero],[data-full]');
    if (!b) return;
    if (b.dataset.count) {
      const it = ITEM[b.dataset.count]; const fin = bump(it);
      const nw = updateCard(it); if (nw) { const k = nw.querySelector('.counter'); k.classList.remove('pulse'); void k.offsetWidth; k.classList.add('pulse');
        if (fin && S.settings.autoNext) { const nx = nw.nextElementSibling; if (nx) setTimeout(() => { const tb = $('.topbar'); nx.style.scrollMarginTop = ((tb ? tb.offsetHeight : 70) + 12) + 'px'; nx.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 350); } }
      const sp = $('#secProg'); if (sp) { const cc = CAT[it.cat]; const p = cc.groups ? catProgress({ items: cc.items.filter(x => x.o === it.o) }) : catProgress(cc); sp.textContent = `${p.d} / ${p.n} مكتمل`; }
    } else if (b.dataset.full) {
      const it = ITEM[b.dataset.full]; if (!completeItem(it)) return;
      if ($('#rcard')) return route();
      const nw = updateCard(it); if (nw) { const k = nw.querySelector('.counter'); k.classList.remove('pulse'); void k.offsetWidth; k.classList.add('pulse'); }
      const sp = $('#secProg'); if (sp) { const cc = CAT[it.cat]; const p = cc.groups ? catProgress({ items: cc.items.filter(x => x.o === it.o) }) : catProgress(cc); sp.textContent = `${p.d} / ${p.n} مكتمل`; }
    } else if (b.dataset.zero) {
      const it = ITEM[b.dataset.zero]; delete S.counts[it.id]; save(); vibrate(20); toast('صُفّر عدّاد هذا الذكر ↺');
      if ($('#rcard')) return route();
      updateCard(it);
      const sp = $('#secProg'); if (sp) { const cc = CAT[it.cat]; const p = cc.groups ? catProgress({ items: cc.items.filter(x => x.o === it.o) }) : catProgress(cc); sp.textContent = `${p.d} / ${p.n} مكتمل`; }
    } else if (b.dataset.fav) toggleFav(b.dataset.fav, b);
    else if (b.dataset.copy) copyItem(ITEM[b.dataset.copy]);
    else if (b.dataset.share) shareItem(ITEM[b.dataset.share]);
    else if (b.dataset.info) {
      const card = b.closest('.zcard,.reader-card'), box = card.querySelector('.zextra'), it = ITEM[b.dataset.info];
      const open = !card.classList.contains('xopen'); card.classList.toggle('xopen', open);
      box.innerHTML = open ? extraHtml(it, true) : extraHtml(it); b.classList.toggle('on', open);
    }
  };
}
function toggleFav(id, btn) {
  const i = S.fav.indexOf(id);
  if (i >= 0) { S.fav.splice(i, 1); toast('أُزيل من المفضلة'); } else { S.fav.push(id); toast('أُضيف إلى المفضلة ♥'); }
  save();
  if (btn) { if (btn.classList.contains('zact')) btn.classList.toggle('fav-on', S.fav.includes(id)); else btn.textContent = S.fav.includes(id) ? '♥ في المفضلة' : '♡ أضف للمفضلة'; }
}
function itemShareText(it) {
  const t = targetOf(it), x = XL(it);
  if (x) return `${clean(it.t)}\n\n${x.tl ? x.tl + '\n\n' : ''}${x.en || ''}\n${t > 1 ? '(' + t + ' times)\n' : ''}${it.s ? '— ' + I18N.src(it.s) : ''}\n\nFrom the “Rawd adh-Dhikr” app`;
  return `${clean(it.t)}\n${t > 1 ? '(' + t + ' مرات)\n' : ''}${it.s ? '— ' + it.s : ''}\n\nمن تطبيق «روض الذكر»`;
}
async function copyItem(it) {
  try { await navigator.clipboard.writeText(itemShareText(it)); toast('تم النسخ'); }
  catch (e) { const ta = document.createElement('textarea'); ta.value = itemShareText(it); document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove(); toast('تم النسخ'); }
}
async function shareItem(it) {
  if (navigator.share) { try { await navigator.share({ title: CAT[it.cat].name, text: itemShareText(it) }); } catch (e) {} }
  else copyItem(it);
}

/* reader — وضع عرض الصفحات */
function renderReader(id, i, occ) {
  const c0 = CAT[id]; if (!c0) return renderSections();
  const g = groupOf(c0, occ), c = { ...c0, items: listOf(c0, g) }, Q = qs(g);
  i = Math.max(0, Math.min(i, c.items.length - 1));
  $('#topTitle').textContent = c.name;
  const pool = c.pool && c.pool.length ? c.pool : [c.bg];
  setBg(S.settings.rotate ? pool[i % pool.length] : c.bg);
  const it = c.items[i]; const t = targetOf(it), cnt = Math.min(countOf(it.id), t), done = cnt >= t;
  const dir = renderReader._last && renderReader._last.id === id + (g ? '|' + g : '') ? (i > renderReader._last.i ? 'slide-l' : 'slide-r') : '';
  const lk = id + (g ? '|' + g : ''); if (renderReader._last && renderReader._last.id !== lk) { /* new list */ }
  renderReader._last = { id: lk, i }; S.last = { cat: id, i, g }; S.lastPos[lk] = i; save();
  view.innerHTML = `<div class="wrap reader">
    ${c0.groups ? `<div class="chips groups">${c0.groups.map(x => `<a class="chip ${x === g ? 'on' : ''}" href="#/r/${id}/${S.lastPos[id + '|' + x] || 0}${qs(x)}">${esc(x)}</a>`).join('')}</div>` : ''}
    <div class="rinfo"><span class="r-occ">${esc(c.name)}</span>
      <span class="fsctl"><button id="fsMinus" aria-label="تصغير الخط">A−</button><button id="fsPlus" aria-label="تكبير الخط">A+</button><button id="toScroll" title="تمرير متصل">📜</button></span>
      <span>${i + 1} / ${c.items.length}</span></div>
    <div class="rprog"><i style="width:${(i + 1) / c.items.length * 100}%"></i></div>
    <article class="glass reader-card ${dir}" id="rcard">
      ${it.o && !c0.groups && id !== 'morning' && id !== 'evening' ? `<div class="zocc">${esc(it.o)}</div>` : ''}
      <div class="zbody">${esc(clean(it.t))}</div>${xlHtml(it)}
      <div class="zextra">${extraHtml(it)}</div>
      <div class="zfoot">
        <span class="zno">${i + 1}</span>
        <button class="zact ${S.fav.includes(it.id) ? 'fav-on' : ''}" data-fav="${it.id}" aria-label="مفضلة">${ICON.fav}</button>
        <button class="zact" data-copy="${it.id}" aria-label="نسخ">${ICON.copy}</button>
        <button class="zact" data-share="${it.id}" aria-label="مشاركة">${ICON.share}</button>
        ${it.v || it.s ? `<button class="zact" data-info="${it.id}" aria-label="الفضل والتخريج">${ICON.info}</button>` : ''}
        <button class="zact full" data-full="${it.id}" aria-label="إتمام العدّ" title="إتمام العدّ"${!isOnce(it) && targetOf(it) > 1 && !isDone(it) ? '' : ' hidden'}>${ICON.full}</button><button class="zact zero" data-zero="${it.id}" aria-label="تصفير عدّاد هذا الذكر" title="تصفير العدّاد"${countOf(it.id) ? '' : ' hidden'}>${ICON.zero}</button>
      </div>
    </article>
    <div class="reader-nav">
      <button class="rnav" id="rPrev" ${i === 0 ? 'disabled' : ''} aria-label="السابق"><svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg></button>
      <button class="big-count ${done ? 'done' : ''} ${isOnce(it) ? 'once-big' : ''}" id="rCount">${isOnce(it) ? (done ? '✓ ' + onceLabel(it) : onceLabel(it)) : (done ? '✓' : t - cnt)}</button>
      <button class="rnav" id="rNext" ${i === c.items.length - 1 ? 'disabled' : ''} aria-label="التالي"><svg viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6"/></svg></button>
    </div>
    <div class="reader-tools"><button class="btn btn-ghost btn-sm" id="resetSec">↺ تصفير الباب</button></div></div>`;
  const go = k => { if (k >= 0 && k < c.items.length) { replaceNav(`#/r/${id}/${k}${Q}`); renderReader(id, k, g); view.scrollTop = 0; } };
  $('#fsMinus').onclick = () => setFs(-0.1); $('#fsPlus').onclick = () => setFs(0.1);
  $('#toScroll').onclick = () => setMode('scroll', id, g);
  $('#resetSec').onclick = () => { if (resetCat(id)) { renderReader._last = null; go(0); } };
  $('#rPrev').onclick = () => go(i - 1);
  $('#rNext').onclick = () => go(i + 1);
  $('#rCount').onclick = () => {
    if (isDone(it)) { if (i < c.items.length - 1) go(i + 1); else { celebrate('🌟'); toast('أتممت ' + c.name); } return; }
    const fin = bump(it);
    const b = $('#rCount'); const left = targetOf(it) - countOf(it.id);
    const zz = $('#rcard [data-zero]'); if (zz) zz.hidden = !countOf(it.id);
    const ff = $('#rcard [data-full]'); if (ff) ff.hidden = isDone(it);
    b.textContent = isOnce(it) ? '✓ ' + onceLabel(it) : (fin ? '✓' : left); b.classList.toggle('done', fin); b.classList.remove('pulse'); void b.offsetWidth; b.classList.add('pulse');
    if (fin && S.settings.autoNext && i < c.items.length - 1) setTimeout(() => go(i + 1), 450);
  };
  const card = $('#rcard'); let sx = 0, sy = 0;
  card.addEventListener('touchstart', e => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
  card.addEventListener('touchend', e => { const dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.4) go(dx < 0 ? i + 1 : i - 1); }, { passive: true });
  bindCommon();
}
document.addEventListener('keydown', e => {
  if (!CUR.startsWith('#/r/')) return;
  if (e.key === 'ArrowLeft') $('#rNext')?.click();
  if (e.key === 'ArrowRight') $('#rPrev')?.click();
  if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); $('#rCount')?.click(); }
});

/* ======================= السبحة الإلكترونية ======================= */
const TASBIH = [
  ['سُبْحَانَ اللَّهِ', 33], ['الْحَمْدُ لِلَّهِ', 33], ['اللَّهُ أَكْبَرُ', 33], ['لَا إِلَهَ إِلَّا اللَّهُ', 100],
  ['سُبْحَانَ اللَّهِ وَبِحَمْدِهِ', 100],
  ['لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ', 100],
  ['اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبِيِّنَا مُحَمَّدٍ', 100],
  ['سُبْحَانَ اللَّهِ، وَالْحَمْدُ لِلَّهِ، وَلَا إِلَهَ إِلَّا اللَّهُ، وَاللَّهُ أَكْبَرُ', 100],
  ['لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ الْعَلِيِّ الْعَظِيمِ', 100],
  ['سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، سُبْحَانَ اللَّهِ الْعَظِيمِ', 100],
  ['أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ وَأَتُوبُ إِلَيْهِ', 100],
  ['اللَّهُمَّ اغْفِرْ لِلْمُؤْمِنِينَ وَالْمُؤْمِنَاتِ', 10],
  ['لَا إِلَهَ إِلَّا اللَّهُ، وَاللَّهُ أَكْبَرُ،\nلَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ،\nلَا إِلَهَ إِلَّا اللَّهُ، لَا شَرِيكَ لَهُ،\nلَا إِلَهَ إِلَّا اللَّهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ،\nلَا إِلَهَ إِلَّا اللَّهُ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ', 10]
];
const TZ_VERSES = [
  ['﴿وَسَبِّحْ بِحَمْدِ رَبِّكَ قَبْلَ طُلُوعِ الشَّمْسِ وَقَبْلَ غُرُوبِهَا﴾', 'طه: 130'],
  ['﴿فَاصْبِرْ إِنَّ وَعْدَ اللَّهِ حَقٌّ وَاسْتَغْفِرْ لِذَنْبِكَ وَسَبِّحْ بِحَمْدِ رَبِّكَ بِالْعَشِيِّ وَالْإِبْكَارِ﴾', 'غافر: 55'],
  ['﴿إِنَّ اللَّهَ وَمَلَائِكَتَهُ يُصَلُّونَ عَلَى النَّبِيِّ ۚ يَا أَيُّهَا الَّذِينَ آمَنُوا صَلُّوا عَلَيْهِ وَسَلِّمُوا تَسْلِيمًا﴾', 'الأحزاب: 56']
];
S.tasbih.custom = S.tasbih.custom || [];   // أذكار يضيفها المستخدم: { id, t, n }
const tzList = () => TASBIH.map((p, j) => ({ k: j, t: p[0], n: p[1] })).concat(S.tasbih.custom.map(c => ({ k: c.id, t: c.t, n: c.n, custom: true })));
const tzItem = k => tzList().find(x => String(x.k) === String(k));
const tzTarget = k => { const v = S.tasbih.targets[k]; if (v !== undefined && v !== null && v !== '') return +v; const it = tzItem(k); return it ? it.n : 0; };
const tzCount = k => S.tasbih.counts[k] || 0;
const tzBase = t => t.length <= 22 ? 30 : t.length <= 60 ? 24 : 19;
function renderTasbih() {
  setBg('jasmine'); $('#topTitle').textContent = 'السبحة الإلكترونية';
  const T = S.tasbih, L = tzList(); if (!tzItem(T.p)) T.p = 0;
  const k = T.p, cur = tzItem(k), pos = L.indexOf(L.find(x => String(x.k) === String(k))), tg = tzTarget(k), cn = tzCount(k);
  const R = 140, C = 2 * Math.PI * R, prog = tg ? Math.min(1, cn / tg) : 0;
  const vs = TZ_VERSES[new Date().getDate() % 3];
  view.innerHTML = `<div class="wrap tasbih">
    <div class="tz-verse">${vs[0]} <small>[${vs[1]}]</small>${EN && I18N.pack && I18N.pack.tzv ? `<div class="xl-en" dir="ltr">${esc(I18N.pack.tzv[vs[1]] || '')}</div>` : ''}</div>
    <div class="tz-phrase" id="tzPhrase" style="font-size:${tzBase(cur.t) * T.zfs}px">${esc(cur.t)}</div>${(() => { const x = EN && I18N.pack && I18N.pack.tz ? I18N.pack.tz[cur.t] : null; return x ? `<div class="xl tz-xl" dir="ltr"><div class="xl-tl">${esc(x[0])}</div><div class="xl-en">${esc(x[1])}</div></div>` : ''; })()}
    <button class="bead-btn" id="bead" aria-label="سبّح">
      <svg class="ringbig" viewBox="0 0 300 300"><circle cx="150" cy="150" r="${R}" stroke="rgba(255,255,255,.14)" stroke-width="8" fill="none"/>
      <circle id="tzRing" cx="150" cy="150" r="${R}" stroke="url(#gg)" stroke-width="8" fill="none" stroke-linecap="round" stroke-dasharray="${C}" stroke-dashoffset="${C * (1 - prog)}" style="transition:stroke-dashoffset .25s"/>
      <defs><linearGradient id="gg"><stop offset="0" stop-color="#f2d083"/><stop offset="1" stop-color="#c99a45"/></linearGradient></defs></svg>
      <div style="text-align:center"><div class="num" id="tzNum">${cn}</div><div class="of">${tg ? 'من ' + tg : 'بلا حد'}</div></div>
    </button>
    <div class="tz-row">
      <button class="btn btn-ghost btn-sm" id="tzReset">↺ تصفير هذا الذكر</button>
      <a class="btn btn-ghost btn-sm" href="#/settings?s=tasbih">⚙ تعديل الأعداد</a>
      <span class="tz-fs"><button class="btn btn-ghost btn-sm" id="tzFm" aria-label="تصغير خط الذكر">أ−</button><button class="btn btn-ghost btn-sm" id="tzFp" aria-label="تكبير خط الذكر">أ+</button></span>
    </div>
    <div class="tz-total">مجموع تسبيحك: <b id="tzTot">${T.total}</b></div>
    <div class="section-title" style="width:100%">اختر الذكر <a href="#" id="tzResetAll">تصفير الكل</a></div>
    <div class="tz-list">${L.map(x => { const j = x.k, t2 = tzTarget(j), c2 = tzCount(j);
      return `<div class="tz-wrap"><button class="tz-item ${String(j) === String(k) ? 'on' : ''} ${t2 && c2 >= t2 ? 'done' : ''} ${x.custom ? 'mine' : ''}" data-p="${j}">
        <span class="tz-t">${x.custom ? '<em class="tz-mine">ذكري</em>' : ''}${esc(x.t)}</span>${(() => { const tx = EN && I18N.pack && I18N.pack.tz ? I18N.pack.tz[x.t] : null; return tx ? `<span class="tz-en" dir="ltr">${esc(tx[1])}</span>` : ''; })()}<span class="tz-c">${c2}${t2 ? ' / ' + t2 : ''}</span>
        <i style="width:${t2 ? Math.min(100, c2 / t2 * 100) : 0}%"></i></button>${x.custom ? `<button class="tz-del" data-del="${j}" aria-label="حذف الذكر">✕</button>` : ''}</div>`; }).join('')}</div>
    <div class="glass tz-add" id="tzAdd">
      <button class="btn btn-gold" id="tzAddOpen">＋ أضف ذكرًا إلى السبحة</button>
      <div class="tz-form" hidden>
        <label>نص الذكر<textarea id="tzNewT" rows="3" maxlength="400" placeholder="اكتب الذكر أو الدعاء…"></textarea></label>
        <label>عدد مرات التكرار <small>(0 = بلا حد)</small><input type="number" id="tzNewN" inputmode="numeric" min="0" max="100000" value="33" class="num-in"></label>
        <div class="tz-quick">${[3, 7, 10, 33, 100, 1000].map(v => `<button class="chip" data-qn="${v}">${v}</button>`).join('')}</div>
        <div class="tz-row"><button class="btn btn-gold" id="tzNewSave">حفظ</button><button class="btn btn-ghost" id="tzNewCancel">إلغاء</button></div>
      </div>
    </div>
  </div>`;
  const form = view.querySelector('.tz-form');
  $('#tzAddOpen').onclick = () => { form.hidden = false; $('#tzAddOpen').hidden = true; $('#tzNewT').focus(); };
  $('#tzNewCancel').onclick = () => { form.hidden = true; $('#tzAddOpen').hidden = false; };
  view.querySelectorAll('[data-qn]').forEach(b => b.onclick = () => { $('#tzNewN').value = b.dataset.qn; });
  $('#tzNewSave').onclick = () => {
    const txt = $('#tzNewT').value.trim(), n = Math.max(0, Math.floor(+$('#tzNewN').value || 0));
    if (!txt) { toast('اكتب نص الذكر أولًا'); return; }
    const id = 'c' + Date.now().toString(36); T.custom.push({ id, t: txt, n }); T.p = id; save(); renderTasbih(); window.scrollTo(0, 0); view.scrollTop = 0; toast('أُضيف الذكر إلى السبحة');
  };
  view.querySelectorAll('[data-del]').forEach(b => b.onclick = e => {
    e.stopPropagation(); const id = b.dataset.del; if (!confirm('حذف هذا الذكر من السبحة؟')) return;
    T.custom = T.custom.filter(c => c.id !== id); delete T.counts[id]; delete T.targets[id]; if (String(T.p) === id) T.p = 0; save(); renderTasbih(); toast('حُذف الذكر');
  });
  view.querySelectorAll('[data-p]').forEach(b => b.onclick = () => { T.p = /^\d+$/.test(b.dataset.p) ? +b.dataset.p : b.dataset.p; save(); renderTasbih(); window.scrollTo(0, 0); view.scrollTop = 0; });
  $('#tzReset').onclick = () => { T.counts[k] = 0; save(); renderTasbih(); };
  const tzFs = d => { T.zfs = Math.round(Math.max(0.55, Math.min(1.6, T.zfs + d)) * 100) / 100; save(); $('#tzPhrase').style.fontSize = tzBase(cur.t) * T.zfs + 'px'; toast('خط الذكر ' + Math.round(T.zfs * 100) + '%'); };
  $('#tzFm').onclick = () => tzFs(-0.1); $('#tzFp').onclick = () => tzFs(0.1);
  $('#tzResetAll').onclick = e => { e.preventDefault(); T.counts = {}; save(); renderTasbih(); toast('تم تصفير السبحة'); };
  $('#bead').onclick = () => {
    const c2 = tzCount(k) + 1; T.counts[k] = c2; T.total++;
    const hit = tg && c2 === tg;
    vibrate(hit ? [60, 50, 60] : 15); save();
    $('#tzNum').textContent = c2; $('#tzTot').textContent = T.total;
    $('#tzRing').style.strokeDashoffset = C * (1 - (tg ? Math.min(1, c2 / tg) : 0));
    const item = view.querySelector(`.tz-item[data-p="${k}"]`); if (item) { item.querySelector('.tz-c').textContent = c2 + (tg ? ' / ' + tg : ''); item.querySelector('i').style.width = (tg ? Math.min(100, c2 / tg * 100) : 0) + '%'; item.classList.toggle('done', !!tg && c2 >= tg); }
    if (hit) {
      celebrate('📿'); toast('أتممت ' + tg + ' — بارك الله فيك');
      if (S.settings.autoNext && pos < L.length - 1) setTimeout(() => { T.p = L[pos + 1].k; save(); renderTasbih(); }, 700);
    }
  };
}

/* favorites */
function renderFavorites() {
  setBg('blossom'); $('#topTitle').textContent = 'المفضلة';
  const items = S.fav.map(id => ITEM[id]).filter(Boolean);
  view.innerHTML = `<div class="wrap">${items.length ? `<div class="stagger">${items.map((it, k) => zcard(it, k + 1, { showCat: true })).join('')}</div>`
    : `<div class="glass empty"><div class="big">♡</div>لم تُضف شيئًا إلى المفضلة بعد.<br>اضغط على القلب أسفل أي ذكر لحفظه هنا.<br><br><a class="btn btn-gold" href="#/sections">تصفّح الأبواب</a></div>`}</div>`;
  bindCommon();
}

/* search */
function highlight(orig, q) {
  if (!q) return esc(orig);
  const map = []; let nstr = '';
  for (let i = 0; i < orig.length; i++) { const n = norm(orig[i]); for (const ch of n) { nstr += ch; map.push(i); } }
  const idx = nstr.indexOf(q); if (idx < 0) return esc(orig);
  const a = map[idx], bEnd = map[idx + q.length - 1];
  let b = bEnd + 1; while (b < orig.length && norm(orig[b]) === '') b++;
  return esc(orig.slice(0, a)) + '<mark>' + esc(orig.slice(a, b)) + '</mark>' + esc(orig.slice(b));
}
function renderSearch(q) {
  setBg('sea-dusk'); $('#topTitle').textContent = 'البحث';
  view.innerHTML = `<div class="wrap"><div class="glass search-box"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>
    <input id="q" type="search" placeholder="ابحث في الأذكار والأدعية… (مثال: الهم، السفر، المطر)" value="${esc(q)}" autocomplete="off"></div>
    <div id="results"></div></div>`;
  const inp = $('#q'); const res = $('#results');
  const run = () => {
    const raw = inp.value.trim(); const nq = norm(raw);
    replaceNav('#/search' + (raw ? '?q=' + encodeURIComponent(raw) : ''));
    if (nq.length < 2) { res.innerHTML = `<div class="glass empty"><div class="big">🔎</div>اكتب كلمتين أو أكثر من الذكر أو المناسبة أو المصدر — البحث لا يتأثر بالتشكيل.</div>`; return; }
    const hits = Object.values(ITEM).map(it => ({ it, sc: norm(it.t).includes(nq) ? 0 : norm(it.o).includes(nq) ? 1 : norm(it.v + ' ' + it.s + ' ' + CAT[it.cat].name).includes(nq) ? 2 : -1 }))
      .filter(x => x.sc >= 0).sort((a, b) => a.sc - b.sc).slice(0, 80).map(x => x.it);
    res.innerHTML = hits.length ? `<div class="section-title">${hits.length} نتيجة</div>` + hits.map((it, k) => zcard(it, k + 1, { showCat: true, hl: highlight(clean(it.t), nq) })).join('')
      : `<div class="glass empty"><div class="big">🤲</div>لا توجد نتائج لـ «${esc(raw)}»</div>`;
  };
  let h; inp.oninput = () => { clearTimeout(h); h = setTimeout(run, 180); };
  run(); setTimeout(() => inp.focus(), 250);
  bindCommon();
}

/* ======================= مواقيت الصلاة ======================= */
function renderPrayer() {
  setBg('mosque'); $('#topTitle').textContent = 'مواقيت الصلاة';
  const np = nextPrayer(), loc = np.loc, T = np.T, now = new Date();
  let cur = null; for (const [k] of PNAMES) if (k !== 'sunrise' && T[k] <= now) cur = k;
  view.innerHTML = `<div class="wrap">
    <section class="glass pnext">
      <small>الصلاة القادمة${np.tomorrow ? ' (غدًا)' : ''}</small>
      <h2>${np.name} <span>${fmtTime(np.at, loc)}</span></h2>
      <div class="pcd" data-cd data-key="${np.key}">${countdown(np.at - now)}</div>
      <small>📍 ${esc(loc.name)} · ${esc((METHODS[S.pray.method] || METHODS.egypt)[0])}</small>
    </section>
    <section class="glass ptable">${PNAMES.map(([k, n]) => `<div class="prow ${k === np.key && !np.tomorrow ? 'next' : ''} ${k === cur ? 'cur' : ''}"><span>${n}</span><b>${fmtTime(T[k], loc)}</b></div>`).join('')}</section>
    <div class="section-title">الموقع وطريقة الحساب</div>
    <section class="glass set-group">
      <div class="set-row" style="display:block"><div class="t"><b>المدينة</b><small>اختر مدينتك أو استخدم موقعك الحالي</small></div>
        <select id="pCity" class="sel">${CITIES.map(c => `<option value="${c[0]}" ${S.pray.city === c[0] ? 'selected' : ''}>${c[1]}</option>`).join('')}
          ${S.pray.city === 'custom' ? `<option value="custom" selected>${esc(S.pray.label || 'موقعي')}</option>` : ''}</select>
        <button class="btn btn-ghost btn-sm" id="pGeo" style="margin-top:8px">📍 استخدم موقعي الحالي</button></div>
      <div class="set-row" style="display:block"><div class="t"><b>طريقة الحساب</b></div>
        <select id="pMethod" class="sel">${Object.entries(METHODS).map(([k, v]) => `<option value="${k}" ${S.pray.method === k ? 'selected' : ''}>${v[0]}</option>`).join('')}</select></div>
      <div class="set-row"><div class="t"><b>مذهب العصر</b></div>
        <div class="seg" id="pAsr"><button class="${S.pray.asr !== 2 ? 'on' : ''}" data-a="1">الجمهور</button><button class="${S.pray.asr === 2 ? 'on' : ''}" data-a="2">الحنفي</button></div></div>
      <div class="set-row"><div class="t"><b>صيغة الوقت</b></div>
        <div class="seg" id="pFmt"><button class="${!S.pray.h24 ? 'on' : ''}" data-f="12">12 ساعة</button><button class="${S.pray.h24 ? 'on' : ''}" data-f="24">24 ساعة</button></div></div>
      ${'<div class="set-row"><div class="t"><b>عرض الصلاة القادمة في الرئيسية</b></div><button class="switch ' + (S.settings.showPrayer ? 'on' : '') + '" id="pShow"></button></div>'}
    </section>
    <p class="note">المواقيت محسوبة فلكيًّا على الجهاز دون إنترنت؛ قد تختلف دقيقة أو دقيقتين عن التقويم الرسمي.</p>
  </div>`;
  $('#pCity').onchange = e => { const c = CITY[e.target.value]; if (c) { S.pray.city = c.id; S.pray.method = c.method; } save(); renderPrayer(); };
  $('#pMethod').onchange = e => { S.pray.method = e.target.value; save(); renderPrayer(); };
  view.querySelectorAll('#pAsr button').forEach(b => b.onclick = () => { S.pray.asr = +b.dataset.a; save(); renderPrayer(); });
  view.querySelectorAll('#pFmt button').forEach(b => b.onclick = () => { S.pray.h24 = b.dataset.f === '24'; save(); renderPrayer(); });
  $('#pShow').onclick = e => { S.settings.showPrayer = !S.settings.showPrayer; e.target.classList.toggle('on', S.settings.showPrayer); save(); };
  $('#pGeo').onclick = () => {
    if (!navigator.geolocation) return toast('تحديد الموقع غير متاح على هذا الجهاز');
    toast('جارٍ تحديد موقعك…');
    navigator.geolocation.getCurrentPosition(p => {
      Object.assign(S.pray, { city: 'custom', lat: +p.coords.latitude.toFixed(4), lng: +p.coords.longitude.toFixed(4), tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
        label: `موقعي (${p.coords.latitude.toFixed(2)}, ${p.coords.longitude.toFixed(2)})` });
      save(); renderPrayer(); toast('تم تحديد موقعك');
    }, () => toast('تعذّر تحديد الموقع — اختر المدينة من القائمة'), { timeout: 10000 });
  };
  startTicker();
}

/* settings */
let deferredPrompt = null;
window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); deferredPrompt = e; setupInstall(); });
function setupInstall() {
  document.querySelectorAll('#installBtn,#installBtn2').forEach(b => {
    b.hidden = !deferredPrompt;
    b.onclick = async () => { if (!deferredPrompt) return; deferredPrompt.prompt(); await deferredPrompt.userChoice; deferredPrompt = null; setupInstall(); };
  });
}
function supportCard() {
  return `<div class="glass support">
    <div class="sp-head"><span class="sp-logo">${LOGO}</span><div><b>مِشْكَاة</b><small dir="ltr">MISHKAT APPS · برمجيات نافعة للهاتف والحاسب</small></div></div>
    <p>ساهم في تطوير تطبيقَي «المصحف الشريف» و«روض الذكر» وإبقائهما مجانيين وبلا إعلانات</p>
    <div class="sp-ayah">﴿مَنْ ذَا الَّذِي يُقْرِضُ اللَّهَ قَرْضًا حَسَنًا﴾</div>
    <div class="sp-pay"><small>التحويل عبر InstaPay</small>
      <div class="sp-qr">${INSTAPAY_QR}</div>
      <b dir="ltr">${INSTAPAY}</b>
      <div class="sp-btns"><a class="btn btn-gold btn-sm" href="${INSTAPAY_URL}" target="_blank" rel="noopener">ادفع عبر InstaPay ↗</a>
      <button class="btn btn-ghost btn-sm" id="copyPay">نسخ العنوان</button></div>
      <small>من جوال آخر: امسح الرمز بكاميرا الهاتف أو من تطبيق InstaPay</small></div>
  </div>`;
}
function supportBtn() {
  return `<div class="sup-cta"><span class="sp-logo">${LOGO}</span><small>من إنتاج مِشْكَاة · مجاني وبلا إعلانات</small>
    <a class="btn btn-gold sup-btn" href="#/support">♡ ادعم التطبيق</a></div>`;
}
/* ---------- التقييم والاقتراحات (تُحفظ في جدول Google عبر Apps Script) ---------- */
const FEEDBACK_URL = () => (window.MK_CFG && window.MK_CFG.feedbackUrl) || '';
S.fbq = S.fbq || [];   // تقييمات تنتظر الإنترنت
S.dev = S.dev || ('d' + Math.random().toString(36).slice(2, 10));
function platformName() {
  const n = window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform();
  const ua = navigator.userAgent; const os = /android/i.test(ua) ? 'Android' : /iphone|ipad|ipod/i.test(ua) ? 'iOS' : /windows/i.test(ua) ? 'Windows' : /mac/i.test(ua) ? 'Mac' : 'Other';
  return os + (n ? ' · APK' : matchMedia('(display-mode: standalone)').matches ? ' · PWA' : ' · Web');
}
async function sendFeedback(f) {
  const url = FEEDBACK_URL(); if (!url) throw new Error('nourl');
  await fetch(url, { method: 'POST', mode: 'no-cors', body: new URLSearchParams(f) });
}
async function flushFeedback() {
  if (!S.fbq.length || !navigator.onLine || !FEEDBACK_URL()) return;
  const q = S.fbq.slice();
  for (const f of q) { try { await sendFeedback(f); S.fbq.splice(S.fbq.indexOf(f), 1); save(); } catch (e) { break; } }
}
window.addEventListener('online', flushFeedback); setTimeout(flushFeedback, 5000);
function renderRate() {
  setBg('blossom'); $('#topTitle').textContent = tr('قيّم التطبيق');
  const prev = S.rated || {};
  view.innerHTML = `<div class="wrap">
    <section class="glass rate">
      <h2>⭐ ${tr('ما رأيك في «روض الذكر»؟')}</h2>
      <p>${tr('تقييمك واقتراحاتك تصل مباشرة إلى فريق مشكاة وتساعدنا على تطوير التطبيق.')}</p>
      <div class="stars" id="stars" role="radiogroup" aria-label="${tr('التقييم')}">${[1, 2, 3, 4, 5].map(n => `<button data-st="${n}" role="radio" aria-label="${n}">★</button>`).join('')}</div>
      <div class="st-lbl" id="stLbl">${tr('اضغط على النجوم للتقييم')}</div>
      <label class="fl">${tr('اقتراحات أو تعديلات تحب إضافتها (اختياري)')}
        <textarea id="fbText" rows="5" maxlength="2000" placeholder="${tr('مثال: أتمنى إضافة…')}"></textarea></label>
      <div class="two">
        <label class="fl">${tr('الاسم (اختياري)')}<input id="fbName" maxlength="80"></label>
        <label class="fl">${tr('بريد أو هاتف للرد (اختياري)')}<input id="fbContact" maxlength="120" dir="ltr"></label>
      </div>
      <button class="btn btn-gold" id="fbSend" style="width:100%;margin-top:12px">${tr('إرسال')}</button>
      <p class="note" style="margin-top:10px">${tr('لا نجمع أي بيانات أخرى. إن لم يتوفر الإنترنت يُحفظ تقييمك ويُرسل تلقائيًا لاحقًا.')}</p>
      ${prev.at ? `<p class="note">✓ ${tr('أرسلت تقييمًا سابقًا')}: ${'★'.repeat(prev.stars || 0)}</p>` : ''}
    </section></div>`;
  let stars = 0;
  const LBL = ['', 'ضعيف', 'مقبول', 'جيد', 'جيد جدًا', 'ممتاز'];
  const paint = n => { view.querySelectorAll('[data-st]').forEach(b => b.classList.toggle('on', +b.dataset.st <= n)); $('#stLbl').textContent = n ? tr(LBL[n]) : tr('اضغط على النجوم للتقييم'); };
  view.querySelectorAll('[data-st]').forEach(b => b.onclick = () => { stars = +b.dataset.st; paint(stars); vibrate(15); });
  $('#fbSend').onclick = async () => {
    const text = $('#fbText').value.trim();
    if (!stars && !text) { toast(tr('اختر عدد النجوم أو اكتب اقتراحك')); return; }
    const f = { app: 'روض الذكر', ver: APP_VER, platform: platformName(), lang: (window.I18N && I18N.lang) || 'ar', stars, text,
                name: $('#fbName').value.trim(), contact: $('#fbContact').value.trim(), device: S.dev };
    const btn = $('#fbSend'); btn.disabled = true; btn.textContent = tr('جارٍ الإرسال…');
    try { if (!navigator.onLine) throw 0; await sendFeedback(f); }
    catch (e) { S.fbq.push(f); }
    S.rated = { at: Date.now(), stars }; save();
    view.querySelector('.rate').innerHTML = `<div class="rate-done"><div class="big">💚</div><h2>${tr('جزاك الله خيرًا')}</h2>
      <p>${tr('وصلنا تقييمك، وسنقرأ كل اقتراح باهتمام.')}</p><a class="btn btn-gold" href="#/">${tr('العودة للرئيسية')}</a></div>`;
    celebrate('⭐');
  };
}

function renderSupport() {
  view.innerHTML = `<div class="wrap">${supportCard()}
    <div class="glass author" style="margin-top:12px"><div class="au-t"><b>تواصل مع مِشْكَاة</b>
      <a href="mailto:mishkatapps@gmail.com" dir="ltr">✉ mishkatapps@gmail.com</a></div></div>
    <a class="glass made-by" href="https://mishkatapps.github.io/" target="_blank" rel="noopener"><span class="sp-logo">${LOGO}</span><span><b>موقع مِشْكَاة ↗</b><small dir="ltr" style="display:block;text-align:right">mishkatapps.github.io</small></span></a></div>`;
  $('#topTitle').textContent = 'ادعم التطبيق';
  bindSupport();
}
function bindSupport() { const b = $('#copyPay'); if (b) b.onclick = async () => { try { await navigator.clipboard.writeText(INSTAPAY); } catch (e) { const t = document.createElement('textarea'); t.value = INSTAPAY; document.body.appendChild(t); t.select(); document.execCommand('copy'); t.remove(); } toast('تم نسخ عنوان InstaPay'); }; }
function renderSettings() {
  setBg('lake'); $('#topTitle').textContent = 'الإعدادات';
  const st = S.settings;
  const sw = (k, t, d) => `<div class="set-row"><div class="t"><b>${t}</b><small>${d}</small></div><button class="switch ${st[k] ? 'on' : ''}" data-sw="${k}" aria-label="${t}"></button></div>`;
  const ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
  view.innerHTML = `<div class="wrap">
    <div class="section-title">اللغة · Language</div>
    <div class="glass set-group">
      <div class="set-row"><div class="t"><b data-noi18n>${EN ? 'Language' : 'اللغة · Language'}</b><small>العربية هي الأصل؛ الإنجليزية تضيف النطق والترجمة تحت كل ذكر</small></div>
        <div class="seg" id="langSeg" data-noi18n>${[['ar', 'العربية'], ['en', 'English']].map(([v, l]) => `<button class="${((window.I18N && I18N.lang) || 'ar') === v ? 'on' : ''}" data-lang="${v}">${l}</button>`).join('')}</div></div>
    </div>
    <div class="section-title">المظهر</div>
    <div class="glass set-group">
      <div class="set-row"><div class="t"><b>السمة</b><small>طبيعة زجاجية، ليلية، أو عاجية فاتحة</small></div>
        <div class="seg" id="themeSeg">${[['nature', 'طبيعة'], ['night', 'ليلي'], ['ivory', 'عاجي']].map(([v, l]) => `<button class="${st.theme === v ? 'on' : ''}" data-v="${v}">${l}</button>`).join('')}</div></div>
      <div class="set-row" style="display:block"><div class="t"><b>حجم خط الأذكار: <span id="fsVal">${Math.round(21 * st.fs)}</span></b><small>يُطبّق على جميع النصوص المشكولة</small></div>
        <input type="range" min="0.8" max="1.8" step="0.05" value="${st.fs}" id="fsRange">
        <div class="fs-preview">سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، سُبْحَانَ اللَّهِ الْعَظِيمِ</div></div>
      <div class="set-row" style="display:block"><div class="t"><b>نوع خط الأذكار</b><small>خطوط مجمع الملك فهد مضمَّنة في التطبيق وتعمل دون إنترنت</small></div>
        <div class="fch" id="fontCh">${FONTS.map(([k, l]) => `<button data-font="${k}" class="${st.font === k ? 'on' : ''}" style="font-family:${k},serif">${l}</button>`).join('')}</div></div>
      ${sw('rotate', 'تبديل الخلفيات تلقائيًا', 'خلفيات طبيعية متغيّرة تلائم كل باب أثناء القراءة')}
    </div>
    <div class="section-title">القراءة والعدّ</div>
    <div class="glass set-group">
      <div class="set-row"><div class="t"><b>وضع القراءة</b><small>صفحة لكل ذكر، أو كل الأذكار في تمرير متصل</small></div>${modeSwitch()}</div>
      ${sw('showVirtue', 'إظهار الفضل والملاحظات', 'يظهر دائمًا أسفل الذكر (ويمكن إظهاره لكل ذكر بزر ⓘ)')}
      ${sw('showSrc', 'إظهار التخريج', 'مصدر الذكر أو الدعاء من كتب السنة')}
      ${sw('vibrate', 'الاهتزاز عند العدّ', 'اهتزاز خفيف مع كل ضغطة (على الأجهزة الداعمة)')}
      ${sw('autoNext', 'الانتقال التلقائي', 'الانتقال إلى الذكر التالي عند إتمام العدد (في الأذكار والسبحة)')}
      <div class="set-row"><div class="t"><b>إعادة ضبط عدّادات اليوم</b><small>تُصفَّر تلقائيًا بمواقيت الصلاة: الصباح عند الفجر، والمساء عند العصر، والنوم عند المغرب، وأذكار بعد الصلاة عند كل صلاة، والباقي مع بداية اليوم</small></div><button class="btn btn-ghost btn-sm" id="resetAll">↺ تصفير</button></div>
    </div>
    <div class="section-title">التنبيهات</div>
    <div class="glass set-group">
      <div class="set-row"><div class="t"><b>☀️ أذكار الصباح</b><small>بعد أذان الفجر بـ
        <select class="sel sel-sm" data-remoff="mOff">${[0, 15, 30, 45, 60, 90].map(v => `<option value="${v}" ${S.rem.mOff === v ? 'selected' : ''}>${v}</option>`).join('')}</select> دقيقة</small></div>
        <button class="switch ${S.rem.morning ? 'on' : ''}" data-rem="morning" aria-label="تنبيه أذكار الصباح"></button></div>
      <div class="set-row"><div class="t"><b>🌙 أذكار المساء</b><small>بعد أذان العصر بـ
        <select class="sel sel-sm" data-remoff="eOff">${[0, 15, 30, 45, 60, 90].map(v => `<option value="${v}" ${S.rem.eOff === v ? 'selected' : ''}>${v}</option>`).join('')}</select> دقيقة</small></div>
        <button class="switch ${S.rem.evening ? 'on' : ''}" data-rem="evening" aria-label="تنبيه أذكار المساء"></button></div>
      <div class="set-row"><div class="t"><b>🛏️ أذكار النوم</b><small>الساعة <input type="time" class="sel sel-sm" id="remSleepAt" value="${esc(S.rem.sleepAt)}"></small></div>
        <button class="switch ${S.rem.sleep ? 'on' : ''}" data-rem="sleep" aria-label="تنبيه أذكار النوم"></button></div>
      <div class="set-row" style="display:block"><div class="t"><small>لا يصلك التنبيه إذا أتممت الأذكار قبل موعدها. ${LN() ? 'المواعيد تتبع مواقيت الصلاة لمدينتك.' : 'في المتصفح تصل التنبيهات ما دام التطبيق مفتوحًا أو في الخلفية؛ وللتنبيهات الكاملة ثبّت نسخة أندرويد (APK).'}</small></div></div>
    </div>
    <div class="section-title">الصفحة الرئيسية</div>
    <div class="glass set-group">
      ${sw('showStats', 'إظهار الإحصاءات', 'الأذكار المكتملة، مجموع التسبيح، الأيام المتتالية')}
      ${sw('showPrayer', 'إظهار الصلاة القادمة', 'اسم الصلاة التالية والوقت المتبقي')}
      ${sw('showGreet', EN ? 'Greetings & timely tips' : 'التهاني وتوصيات الوقت', EN ? 'Occasion greetings and recommendations for the current time' : 'تهنئة المناسبة وتوصية الوقت الحالي (من بنك مشكاة)')}
      ${sw('showHadith', EN ? 'Hadith of the day' : 'مشكاة النبوة (حديث اليوم)', EN ? 'A hadith each day, as a shareable image' : 'حديث نبوي كل يوم في صورة قابلة للمشاركة')}
      ${sw('remindPopup', EN ? 'Reminder window on opening' : 'نافذة التذكير عند فتح التطبيق', EN ? 'Reminds you a day or more before occasions such as fasting days' : 'تذكير قبل المناسبات بيوم أو أكثر، كأيام الصيام')}
      <div class="set-row"><div class="t"><b>${EN ? 'Upcoming reminders' : 'التذكيرات القادمة'}</b><small>${EN ? 'Show them now' : 'عرضها الآن'}</small></div><button class="btn btn-ghost btn-sm" id="grShowRem">🔔 ${EN ? 'Show' : 'عرض'}</button></div>
      <div class="set-row"><div class="t"><b>مواقيت الصلاة</b><small>المدينة: ${esc(prayLoc().name)}</small></div><a class="btn btn-ghost btn-sm" href="#/prayer">🕌 الإعدادات</a></div>
    </div>
    <div class="section-title" id="tzSet">أعداد التسبيح في السبحة</div>
    <div class="glass set-group">
      <p class="note" style="margin:10px 0 4px">حدّد عدد مرات التكرار لكل ذكر (0 = بلا حد).</p>
      ${tzList().map(x => `<div class="set-row tzset"><div class="t"><b class="q">${x.custom ? '<em class="tz-mine">ذكري</em>' : ''}${esc(x.t.split('\n')[0])}${x.t.includes('\n') ? '…' : ''}</b></div>
        <input type="number" inputmode="numeric" min="0" max="100000" class="num-in" data-tz="${x.k}" value="${tzTarget(x.k)}"></div>`).join('')}
      <div class="set-row"><div class="t"><b>أذكارك الخاصة</b><small>أضف أذكارك وحدّد عددها من صفحة السبحة</small></div><a class="btn btn-ghost btn-sm" href="#/tasbih">＋ إضافة</a></div>
      <div class="set-row"><div class="t"><b>استعادة الأعداد الافتراضية</b></div><button class="btn btn-ghost btn-sm" id="tzDefaults">↺ استعادة</button></div>
    </div>
    <div class="section-title">التثبيت والعمل دون إنترنت</div>
    <div class="glass set-group">
      <div class="set-row" style="display:block"><div class="t"><b>ثبّت التطبيق على جهازك</b><small>بعد أول فتح يعمل التطبيق بالكامل دون إنترنت</small></div>
        <button class="btn btn-gold" id="installBtn2" hidden style="margin-top:10px">⬇︎ تثبيت الآن</button>
        <a class="btn btn-ghost btn-sm" href="download.html" target="_blank" rel="noopener" style="margin-top:10px">صفحة التحميل لكل الأجهزة ↗</a>
        <ol class="install-steps">${ios
          ? '<li>افتح الرابط في متصفح Safari.</li><li>اضغط زر المشاركة ⎋.</li><li>اختر «إضافة إلى الشاشة الرئيسية».</li>'
          : '<li>افتح الرابط في Chrome.</li><li>اضغط ⋮ ثم «تثبيت التطبيق» أو «إضافة إلى الشاشة الرئيسية».</li><li>سيظهر الأيقون بين تطبيقاتك ويعمل دون إنترنت.</li>'}</ol>
      </div>
    </div>
    <div class="section-title">قيّم التطبيق</div>
    <a class="glass set-group rate-link" href="#/rate"><span class="ic">⭐</span><span class="t"><b>قيّم «روض الذكر» واقترح إضافات</b><small>رأيك يصل مباشرة إلى فريق مشكاة</small></span><span class="go">←</span></a>
    <div class="section-title">تواصل معنا</div>
    <div class="glass author">
      <div class="au-t"><b>مِشْكَاة · MISHKAT APPS</b>
        <a href="mailto:mishkatapps@gmail.com" dir="ltr">✉ mishkatapps@gmail.com</a></div>
    </div>
    <div class="section-title">من تطبيقات مِشْكَاة</div>
    <a class="glass made-by" style="margin:0 0 10px" href="https://mishkatapps.github.io/" target="_blank" rel="noopener"><span class="sp-logo">${LOGO}</span><span><b>موقع مِشْكَاة ↗</b><small dir="ltr" style="display:block;text-align:right">mishkatapps.github.io</small></span></a>
    <a class="glass made-by" href="https://mohammadelshennawy-bit.github.io/Quran-app/download.html" target="_blank" rel="noopener" style="margin-top:0"><img src="img/mushaf-icon.jpg" alt="" style="width:46px;height:46px;border-radius:12px;flex-shrink:0"><span><b>المصحف الشريف ↗</b><small>برواية حفص عن عاصم، بفهرس وبحث وعلامات — يعمل دون إنترنت</small></span></a>
    <div class="section-title">عن التطبيق</div>
    <div class="glass set-group"><div class="set-row" style="display:block;line-height:1.9;font-size:14px;color:var(--muted)">
      <b style="color:var(--ink)">روض الذكر <span class="appver">1.4.8</span></b> — ${DATA.length} بابًا و${Object.keys(ITEM).length} نصًّا مشكولًا من:<br>
      • «حصن المسلم» للشيخ سعيد بن وهف القحطاني (مع التخريج)<br>• «من جوامع دعاء النبي ﷺ» (50 دعاءً)<br>• «أفكار ذهبية للعشر الأواخر من رمضان»<br>
      يُنصح بمراجعة النصوص على المصادر المعتمدة عند الحفظ.</div></div>
    ${supportBtn()}
  </div>`;
  view.querySelectorAll('#themeSeg button').forEach(b => b.onclick = () => { st.theme = b.dataset.v; save(); applySettings(); renderSettings(); });
  view.querySelectorAll('[data-font]').forEach(b => b.onclick = () => { st.font = b.dataset.font; save(); applySettings(); view.querySelectorAll('[data-font]').forEach(x => x.classList.toggle('on', x === b)); });
  $('#fsRange').oninput = e => { st.fs = +e.target.value; applySettings(); save(); $('#fsVal').textContent = Math.round(21 * st.fs); };
  view.querySelectorAll('[data-lang]').forEach(b => b.onclick = () => { if (window.I18N && b.dataset.lang !== I18N.lang) I18N.setLang(b.dataset.lang); });
  view.querySelectorAll('[data-rem]').forEach(b => b.onclick = async () => {
    const k = b.dataset.rem, on = !S.rem[k];
    if (on && !(await askNotify())) { toast('لم يُسمح بالتنبيهات — فعّلها من إعدادات الجهاز'); return; }
    S.rem[k] = on; b.classList.toggle('on', on); save(); scheduleReminders(); if (on) toast('سيصلك التنبيه في موعده بإذن الله');
  });
  view.querySelectorAll('[data-remoff]').forEach(x => x.onchange = () => { S.rem[x.dataset.remoff] = +x.value; save(); scheduleReminders(); });
  $('#remSleepAt').onchange = e => { S.rem.sleepAt = e.target.value || '22:30'; save(); scheduleReminders(); };
  view.querySelectorAll('[data-sw]').forEach(b => b.onclick = () => { st[b.dataset.sw] = !st[b.dataset.sw]; b.classList.toggle('on', st[b.dataset.sw]); save(); });
  $('#grShowRem').onclick = () => showReminders(true);
  view.querySelectorAll('[data-tz]').forEach(inp => inp.onchange = () => { const v = Math.max(0, Math.floor(+inp.value || 0)); inp.value = v; S.tasbih.targets[inp.dataset.tz] = v; save(); toast('تم الحفظ'); });
  $('#tzDefaults').onclick = () => { S.tasbih.targets = {}; save(); renderSettings(); toast('استُعيدت الأعداد الافتراضية'); };
  $('#resetAll').onclick = () => { S.counts = {}; save(); toast('تم تصفير عدّادات اليوم'); };
  bindMode(); setupInstall();
  if (/s=tasbih/.test(CUR)) setTimeout(() => $('#tzSet').scrollIntoView({ behavior: 'smooth' }), 200);
}

/* ---------- boot ---------- */
applySettings();
greetInit();
hadithInit();
route();
(() => {
  const cv = $('#cover'); if (!cv) return;
  let seen = false; try { seen = sessionStorage.getItem('rawd-cover') === '1'; } catch (e) {}
  const hide = () => { cv.classList.add('gone'); try { sessionStorage.setItem('rawd-cover', '1'); } catch (e) {} setTimeout(() => cv.remove(), 700); };
  if (seen) { cv.remove(); return; }
  $('#cvStart').onclick = hide; cv.addEventListener('click', e => { if (e.target === cv) hide(); });
  setTimeout(hide, 3500);
})();
try {
  const CapApp = window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.App;
  if (CapApp) CapApp.addListener('backButton', () => { if (depthOf((CUR.replace(/^#\/?/, '').split(/[/?]/)[0]) || 'home') === 0) CapApp.exitApp(); else goBack(); });
} catch (e) {}
if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
}
})();
