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
const KEY = 'rawd-azkar-v1';
const today = () => { const d = new Date(); return d.getFullYear() + '-' + pad(d.getMonth()+1) + '-' + pad(d.getDate()); };
let S;
try { S = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { S = {}; }
S.settings = Object.assign({ theme: 'nature', font: 'Q1', fs: 1, vibrate: true, rotate: true, autoNext: true,
  showVirtue: false, showSrc: false, mode: 'page', showStats: true, showPrayer: true, tzAuto: true }, S.settings || {});
S.fav = S.fav || []; S.counts = S.counts || {}; S.days = S.days || {};
S.tasbih = Object.assign({ p: 0, total: 0, counts: {}, targets: {} }, S.tasbih || {});
S.pray = Object.assign({ city: 'cairo', method: 'egypt', asr: 1, h24: false, lat: null, lng: null, tz: null, label: '' }, S.pray || {});
S.lastPos = S.lastPos || {};
if (S.day !== today()) { S.day = today(); S.counts = {}; }
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
const listOf = (c, g) => g ? c.items.filter(x => x.o === g) : c.items;
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
  try { return new Intl.DateTimeFormat('ar-EG-u-nu-latn', o).format(date); }
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
const depthOf = r => r === '' || r === 'home' ? 0 : (['sections','tasbih','favorites','settings','search','prayer'].includes(r) ? 1 : 2);
function route() {
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
    default: renderHome();
  }
}
window.addEventListener('hashchange', () => { if (location.hash !== CUR) { CUR = location.hash || '#/'; route(); } });
$('#btnBack').onclick = () => goBack();
$('#btnSearch').onclick = () => nav('#/search');
const THEMES = ['nature', 'night', 'ivory'], THEME_NAMES = { nature: 'سمة الطبيعة', night: 'السمة الليلية', ivory: 'السمة العاجية' };
$('#btnTheme').onclick = () => { S.settings.theme = THEMES[(THEMES.indexOf(S.settings.theme) + 1) % 3]; save(); applySettings(); toast(THEME_NAMES[S.settings.theme]); if (CUR.includes('settings')) renderSettings(); };
function setFs(d) { S.settings.fs = Math.round(Math.max(0.8, Math.min(1.8, S.settings.fs + d)) * 100) / 100; save(); applySettings(); toast('حجم الخط ' + Math.round(S.settings.fs * 100) + '%'); }
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
  try { return new Intl.DateTimeFormat('ar-SA-u-ca-islamic-umalqura-nu-latn', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date()); }
  catch (e) { return ''; }
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
  const greg = new Intl.DateTimeFormat('ar-EG-u-nu-latn', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date());
  const doneToday = Object.keys(S.counts).filter(id => ITEM[id] && isDone(ITEM[id])).length;
  const catsDone = DATA.filter(c => catProgress(c).p === 1).length;
  const dod = dhikrOfDay();
  const main = ['morning', 'evening', 'prayer', 'jawami', 'ramadan', 'sleep'].map(id => CAT[id]);
  view.innerHTML = `<div class="wrap stagger">
    <section class="glass hero">
      <div class="greet">${esc(pr.g)}</div>
      <h1>أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ</h1>
      <div class="dates"><span>📅 <b>${esc(greg)}</b></span>${hijri() ? `<span>🌙 <b>${esc(hijri())}</b></span>` : ''}</div>
      <div class="hero-cta">
        <a class="btn btn-gold" href="#/s/${pr.key}">ابدأ ${esc(CAT[pr.key].name)} ←</a>
        <a class="btn btn-ghost" href="#/tasbih">📿 السبحة</a>
        <button class="btn btn-ghost" id="installBtn" hidden>⬇︎ تثبيت التطبيق</button>
      </div>
    </section>
    ${prayerCard()}
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
      <div class="txt">${esc(clean(dod.t))}</div>
      <div class="src">${esc(dod.s)}</div>
      <div class="hero-cta" style="justify-content:center">
        <button class="btn btn-ghost" data-fav="${dod.id}">${S.fav.includes(dod.id) ? '♥ في المفضلة' : '♡ أضف للمفضلة'}</button>
        <button class="btn btn-ghost" data-share="${dod.id}">↗ مشاركة</button>
      </div>
    </section>
    <div class="section-title">أبواب الأذكار والأدعية</div>
    <div class="feature-grid">${DATA.filter(c => !main.includes(c)).map(c => featureCard(c)).join('')}</div>
    <a class="glass made-by" href="#/settings?s=support"><span class="sp-logo">${LOGO}</span><span><b>من إنتاج مِشْكَاة</b><small>ادعم استمرار التطبيق مجانيًّا بلا إعلانات ←</small></span></a>
    <p style="text-align:center;margin-top:14px"><span class="offline-badge">● يعمل دون إنترنت</span></p>
  </div>`;
  bindCommon(); setupInstall(); startTicker();
}
function resumeCard() {
  const L = S.last; if (!L || !CAT[L.cat]) return '';
  const c = CAT[L.cat], n = listOf(c, L.g || null).length, i = Math.min(L.i, n - 1);
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
  info: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/></svg>'
};
function extraHtml(it, force) {
  const v = (force || S.settings.showVirtue) && it.v, s = (force || S.settings.showSrc) && it.s;
  return (v ? `<div class="zvirtue">${esc(it.v)}</div>` : '') + (s ? `<div class="zsrc">📖 ${esc(it.s)}</div>` : '');
}
function ringHtml(it, size = 54) {
  const t = targetOf(it), c = Math.min(countOf(it.id), t), done = c >= t, r = size / 2 - 4, C = 2 * Math.PI * r;
  return `<span class="ring" style="width:${size}px;height:${size}px"><svg viewBox="0 0 ${size} ${size}"><circle class="tr" cx="${size/2}" cy="${size/2}" r="${r}"/><circle class="pr" cx="${size/2}" cy="${size/2}" r="${r}" stroke-dasharray="${C}" stroke-dashoffset="${C * (1 - c / t)}"/></svg><b>${done ? '✓' : t - c}</b></span>`;
}
function zcard(it, n, opts = {}) {
  const done = isDone(it);
  const showOcc = it.o && !opts.hideOcc;
  const hasExtra = it.v || it.s;
  return `<article class="glass zcard ${done ? 'done' : ''}" id="z-${it.id}" data-id="${it.id}">
    ${showOcc || opts.showCat ? `<div class="zmeta">${showOcc ? `<span class="zocc">${esc(it.o)}</span>` : ''}${opts.showCat ? `<a class="zcat" href="#/s/${it.cat}">${esc(CAT[it.cat].name)}</a>` : ''}</div>` : ''}
    <div class="zbody">${opts.hl ? opts.hl : esc(clean(it.t))}</div>
    <div class="zextra">${extraHtml(it)}</div>
    <div class="zfoot">
      <span class="zno">${n}</span>
      <button class="zact ${S.fav.includes(it.id) ? 'fav-on' : ''}" data-fav="${it.id}" aria-label="مفضلة">${ICON.fav}</button>
      <button class="zact" data-copy="${it.id}" aria-label="نسخ">${ICON.copy}</button>
      <button class="zact" data-share="${it.id}" aria-label="مشاركة">${ICON.share}</button>
      ${hasExtra ? `<button class="zact" data-info="${it.id}" aria-label="الفضل والتخريج">${ICON.info}</button>` : ''}
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
  const list = c.items.filter(x => !occ || x.o === occ);
  const p = c.groups ? catProgress({ items: list }) : catProgress(c);
  view.innerHTML = `<div class="wrap">
    <section class="glass sec-head"><h2><span>${c.icon}</span>${esc(c.name)}</h2>
      <p>${esc(c.desc)}<br><small>المصدر: ${esc(c.src)}</small></p>
      <div class="sec-tools">${modeSwitch(id, c.groups ? occ : '')}
        <button class="btn btn-ghost btn-sm" id="resetSec">↺ إعادة العدّ</button>
        <span class="ring-mini" id="secProg">${p.d} / ${p.n} مكتمل</span>
      </div></section>
    ${useChips && id !== 'morning' && id !== 'evening' ? `<div class="chips ${c.groups ? 'groups' : ''}">
      ${c.groups ? '' : `<a class="chip ${!occ ? 'on' : ''}" href="#/s/${id}">الكل</a>`}
      ${occs.map(o => `<a class="chip ${o === occ ? 'on' : ''}" href="#/s/${id}?o=${encodeURIComponent(o)}">${esc(o)}</a>`).join('')}</div>` : ''}
    <div class="stagger">${list.map((it, k) => zcard(it, c.groups ? k + 1 : it.idx + 1, { hideOcc: id === 'morning' || id === 'evening' || !!c.groups })).join('')}</div>
  </div>`;
  $('#resetSec').onclick = () => { c.items.forEach(x => delete S.counts[x.id]); save(); renderSection(id, occ); toast('أُعيد ضبط العدّاد'); };
  bindCommon(); bindMode();
}
function updateCard(it) {
  const el = document.getElementById('z-' + it.id);
  if (!el) return;
  el.classList.toggle('done', isDone(it));
  el.querySelector('.counter').innerHTML = ringHtml(it);
  return el;
}
function bump(it) {
  const t = targetOf(it); const c = countOf(it.id);
  if (c >= t) { vibrate(25); return false; }
  S.counts[it.id] = c + 1;
  const finished = c + 1 >= t;
  if (finished) {
    vibrate([40, 60, 40]); S.days[today()] = (S.days[today()] || 0) + 1;
    const cat = CAT[it.cat]; if (catProgress(cat).p === 1) { celebrate('🌟'); toast('أتممت ' + cat.name + ' — تقبّل الله'); }
  } else vibrate(18);
  save(); return finished;
}
function bindCommon() {
  view.onclick = async e => {
    const b = e.target.closest('[data-count],[data-fav],[data-copy],[data-share],[data-info]');
    if (!b) return;
    if (b.dataset.count) {
      const it = ITEM[b.dataset.count]; const fin = bump(it);
      const nw = updateCard(it); if (nw) { const k = nw.querySelector('.counter'); k.classList.remove('pulse'); void k.offsetWidth; k.classList.add('pulse');
        if (fin && S.settings.autoNext) { const nx = nw.nextElementSibling; if (nx) setTimeout(() => nx.scrollIntoView({ behavior: 'smooth', block: 'start' }), 350); } }
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
function itemShareText(it) { const t = targetOf(it); return `${clean(it.t)}\n${t > 1 ? '(' + t + ' مرات)\n' : ''}${it.s ? '— ' + it.s : ''}\n\nمن تطبيق «روض الذكر»`; }
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
      <div class="zbody">${esc(clean(it.t))}</div>
      <div class="zextra">${extraHtml(it)}</div>
      <div class="zfoot">
        <span class="zno">${i + 1}</span>
        <button class="zact ${S.fav.includes(it.id) ? 'fav-on' : ''}" data-fav="${it.id}" aria-label="مفضلة">${ICON.fav}</button>
        <button class="zact" data-copy="${it.id}" aria-label="نسخ">${ICON.copy}</button>
        <button class="zact" data-share="${it.id}" aria-label="مشاركة">${ICON.share}</button>
        ${it.v || it.s ? `<button class="zact" data-info="${it.id}" aria-label="الفضل والتخريج">${ICON.info}</button>` : ''}
      </div>
    </article>
    <div class="reader-nav">
      <button class="rnav" id="rPrev" ${i === 0 ? 'disabled' : ''} aria-label="السابق"><svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg></button>
      <button class="big-count ${done ? 'done' : ''}" id="rCount">${done ? '✓' : t - cnt}</button>
      <button class="rnav" id="rNext" ${i === c.items.length - 1 ? 'disabled' : ''} aria-label="التالي"><svg viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6"/></svg></button>
    </div></div>`;
  const go = k => { if (k >= 0 && k < c.items.length) { replaceNav(`#/r/${id}/${k}${Q}`); renderReader(id, k, g); view.scrollTop = 0; } };
  $('#fsMinus').onclick = () => setFs(-0.1); $('#fsPlus').onclick = () => setFs(0.1);
  $('#toScroll').onclick = () => setMode('scroll', id, g);
  $('#rPrev').onclick = () => go(i - 1);
  $('#rNext').onclick = () => go(i + 1);
  $('#rCount').onclick = () => {
    if (isDone(it)) { if (i < c.items.length - 1) go(i + 1); else { celebrate('🌟'); toast('أتممت ' + c.name); } return; }
    const fin = bump(it);
    const b = $('#rCount'); const left = targetOf(it) - countOf(it.id);
    b.textContent = fin ? '✓' : left; b.classList.toggle('done', fin); b.classList.remove('pulse'); void b.offsetWidth; b.classList.add('pulse');
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
const tzTarget = k => { const v = S.tasbih.targets[k]; return v === undefined || v === null || v === '' ? TASBIH[k][1] : +v; };
const tzCount = k => S.tasbih.counts[k] || 0;
function renderTasbih() {
  setBg('jasmine'); $('#topTitle').textContent = 'السبحة الإلكترونية';
  const T = S.tasbih; if (!TASBIH[T.p]) T.p = 0;
  const k = T.p, tg = tzTarget(k), cn = tzCount(k);
  const R = 140, C = 2 * Math.PI * R, prog = tg ? Math.min(1, cn / tg) : 0;
  const vs = TZ_VERSES[new Date().getDate() % 3];
  view.innerHTML = `<div class="wrap tasbih">
    <div class="tz-verse">${vs[0]} <small>[${vs[1]}]</small></div>
    <div class="tz-phrase">${esc(TASBIH[k][0])}</div>
    <button class="bead-btn" id="bead" aria-label="سبّح">
      <svg class="ringbig" viewBox="0 0 300 300"><circle cx="150" cy="150" r="${R}" stroke="rgba(255,255,255,.14)" stroke-width="8" fill="none"/>
      <circle id="tzRing" cx="150" cy="150" r="${R}" stroke="url(#gg)" stroke-width="8" fill="none" stroke-linecap="round" stroke-dasharray="${C}" stroke-dashoffset="${C * (1 - prog)}" style="transition:stroke-dashoffset .25s"/>
      <defs><linearGradient id="gg"><stop offset="0" stop-color="#f2d083"/><stop offset="1" stop-color="#c99a45"/></linearGradient></defs></svg>
      <div style="text-align:center"><div class="num" id="tzNum">${cn}</div><div class="of">${tg ? 'من ' + tg : 'بلا حد'}</div></div>
    </button>
    <div class="tz-row">
      <button class="btn btn-ghost btn-sm" id="tzReset">↺ تصفير هذا الذكر</button>
      <a class="btn btn-ghost btn-sm" href="#/settings?s=tasbih">⚙ تعديل الأعداد</a>
    </div>
    <div class="tz-total">مجموع تسبيحك: <b id="tzTot">${T.total}</b></div>
    <div class="section-title" style="width:100%">اختر الذكر <a href="#" id="tzResetAll">تصفير الكل</a></div>
    <div class="tz-list">${TASBIH.map((p, j) => { const t2 = tzTarget(j), c2 = tzCount(j);
      return `<button class="tz-item ${j === k ? 'on' : ''} ${t2 && c2 >= t2 ? 'done' : ''}" data-p="${j}">
        <span class="tz-t">${esc(p[0])}</span><span class="tz-c">${c2}${t2 ? ' / ' + t2 : ''}</span>
        <i style="width:${t2 ? Math.min(100, c2 / t2 * 100) : 0}%"></i></button>`; }).join('')}</div>
  </div>`;
  view.querySelectorAll('[data-p]').forEach(b => b.onclick = () => { T.p = +b.dataset.p; save(); renderTasbih(); window.scrollTo(0, 0); view.scrollTop = 0; });
  $('#tzReset').onclick = () => { T.counts[k] = 0; save(); renderTasbih(); };
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
      if (S.settings.autoNext && k < TASBIH.length - 1) setTimeout(() => { T.p = k + 1; save(); renderTasbih(); }, 700);
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
function bindSupport() { const b = $('#copyPay'); if (b) b.onclick = async () => { try { await navigator.clipboard.writeText(INSTAPAY); } catch (e) { const t = document.createElement('textarea'); t.value = INSTAPAY; document.body.appendChild(t); t.select(); document.execCommand('copy'); t.remove(); } toast('تم نسخ عنوان InstaPay'); }; }
function renderSettings() {
  setBg('lake'); $('#topTitle').textContent = 'الإعدادات';
  const st = S.settings;
  const sw = (k, t, d) => `<div class="set-row"><div class="t"><b>${t}</b><small>${d}</small></div><button class="switch ${st[k] ? 'on' : ''}" data-sw="${k}" aria-label="${t}"></button></div>`;
  const ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
  view.innerHTML = `<div class="wrap">
    <div class="section-title">المظهر</div>
    <div class="glass set-group">
      <div class="set-row"><div class="t"><b>السمة</b><small>طبيعة زجاجية، ليلية، أو عاجية فاتحة</small></div>
        <div class="seg" id="themeSeg">${[['nature', 'طبيعة'], ['night', 'ليلي'], ['ivory', 'عاجي']].map(([v, l]) => `<button class="${st.theme === v ? 'on' : ''}" data-v="${v}">${l}</button>`).join('')}</div></div>
      <div class="set-row" style="display:block"><div class="t"><b>حجم خط الأذكار</b><small>يُطبّق على جميع النصوص المشكولة</small></div>
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
      <div class="set-row"><div class="t"><b>إعادة ضبط عدّادات اليوم</b><small>تُصفَّر تلقائيًا مع بداية كل يوم</small></div><button class="btn btn-ghost btn-sm" id="resetAll">↺ تصفير</button></div>
    </div>
    <div class="section-title">الصفحة الرئيسية</div>
    <div class="glass set-group">
      ${sw('showStats', 'إظهار الإحصاءات', 'الأذكار المكتملة، مجموع التسبيح، الأيام المتتالية')}
      ${sw('showPrayer', 'إظهار الصلاة القادمة', 'اسم الصلاة التالية والوقت المتبقي')}
      <div class="set-row"><div class="t"><b>مواقيت الصلاة</b><small>المدينة: ${esc(prayLoc().name)}</small></div><a class="btn btn-ghost btn-sm" href="#/prayer">🕌 الإعدادات</a></div>
    </div>
    <div class="section-title" id="tzSet">أعداد التسبيح في السبحة</div>
    <div class="glass set-group">
      <p class="note" style="margin:10px 0 4px">حدّد عدد مرات التكرار لكل ذكر (0 = بلا حد).</p>
      ${TASBIH.map((p, j) => `<div class="set-row tzset"><div class="t"><b class="q">${esc(p[0].split('\n')[0])}${p[0].includes('\n') ? '…' : ''}</b></div>
        <input type="number" inputmode="numeric" min="0" max="100000" class="num-in" data-tz="${j}" value="${tzTarget(j)}"></div>`).join('')}
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
    <div class="section-title">ادعم مِشْكَاة</div>
    ${supportCard()}
    <div class="section-title">مُعِدّ التطبيق</div>
    <div class="glass author">
      <div class="au-t"><b>إعداد: د. محمد الشناوي</b>
        <a href="mailto:mohammad.elshennawy@gmail.com" dir="ltr">✉ mohammad.elshennawy@gmail.com</a></div>
    </div>
    <div class="section-title">من تطبيقات مِشْكَاة</div>
    <a class="glass made-by" href="https://mohammadelshennawy-bit.github.io/Quran-app/download.html" target="_blank" rel="noopener" style="margin-top:0"><img src="img/mushaf-icon.jpg" alt="" style="width:46px;height:46px;border-radius:12px;flex-shrink:0"><span><b>المصحف الشريف ↗</b><small>برواية حفص عن عاصم، بفهرس وبحث وعلامات — يعمل دون إنترنت</small></span></a>
    <div class="section-title">عن التطبيق</div>
    <div class="glass set-group"><div class="set-row" style="display:block;line-height:1.9;font-size:14px;color:var(--muted)">
      <b style="color:var(--ink)">روض الذكر 1.4.5</b> — ${DATA.length} بابًا و${Object.keys(ITEM).length} نصًّا مشكولًا من:<br>
      • «حصن المسلم» للشيخ سعيد بن وهف القحطاني (مع التخريج)<br>• «من جوامع دعاء النبي ﷺ» (50 دعاءً)<br>• «أفكار ذهبية للعشر الأواخر من رمضان»<br>
      يُنصح بمراجعة النصوص على المصادر المعتمدة عند الحفظ.</div></div>
  </div>`;
  view.querySelectorAll('#themeSeg button').forEach(b => b.onclick = () => { st.theme = b.dataset.v; save(); applySettings(); renderSettings(); });
  view.querySelectorAll('[data-font]').forEach(b => b.onclick = () => { st.font = b.dataset.font; save(); applySettings(); view.querySelectorAll('[data-font]').forEach(x => x.classList.toggle('on', x === b)); });
  $('#fsRange').oninput = e => { st.fs = +e.target.value; applySettings(); save(); };
  view.querySelectorAll('[data-sw]').forEach(b => b.onclick = () => { st[b.dataset.sw] = !st[b.dataset.sw]; b.classList.toggle('on', st[b.dataset.sw]); save(); });
  view.querySelectorAll('[data-tz]').forEach(inp => inp.onchange = () => { const v = Math.max(0, Math.floor(+inp.value || 0)); inp.value = v; S.tasbih.targets[inp.dataset.tz] = v; save(); toast('تم الحفظ'); });
  $('#tzDefaults').onclick = () => { S.tasbih.targets = {}; save(); renderSettings(); toast('استُعيدت الأعداد الافتراضية'); };
  $('#resetAll').onclick = () => { S.counts = {}; save(); toast('تم تصفير عدّادات اليوم'); };
  bindMode(); setupInstall(); bindSupport();
  if (/s=support/.test(CUR)) setTimeout(() => $('.support').scrollIntoView({ behavior: 'smooth', block: 'center' }), 200);
  if (/s=tasbih/.test(CUR)) setTimeout(() => $('#tzSet').scrollIntoView({ behavior: 'smooth' }), 200);
}

/* ---------- boot ---------- */
applySettings();
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
