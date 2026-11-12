// يضيف إذن التنبيهات إلى تطبيق أندرويد بعد كل «cap sync» (لا يضر إن كان موجودًا)
const fs = require('fs'), f = 'android/app/src/main/AndroidManifest.xml';
if (!fs.existsSync(f)) process.exit(0);
let x = fs.readFileSync(f, 'utf8');
for (const p of ['POST_NOTIFICATIONS', 'RECEIVE_BOOT_COMPLETED', 'WAKE_LOCK']) {
  const tag = `<uses-permission android:name="android.permission.${p}" />`;
  if (!x.includes(`android.permission.${p}"`)) x = x.replace('</manifest>', `    ${tag}\n</manifest>`);
}
fs.writeFileSync(f, x); console.log('Android permissions OK');
