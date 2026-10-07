import { execSync } from 'child_process';
import fs from 'fs';

const tmp = 'src/scripts/tmp-ve.json';
execSync(
  'npx --yes lighthouse http://localhost:3000/video-editing --output=json --output-path=' + tmp + ' --chrome-flags="--headless=new --no-sandbox" --form-factor=mobile --screenEmulation.mobile=true --throttling-method=simulate --quiet',
  { stdio: 'pipe' }
);
const d = JSON.parse(fs.readFileSync(tmp, 'utf8'));
console.log('Categories:', Object.fromEntries(Object.entries(d.categories).map(([k, v]) => [k, Math.round(v.score * 100)])));
['first-contentful-paint', 'largest-contentful-paint', 'total-blocking-time', 'cumulative-layout-shift', 'speed-index'].forEach(m => {
  console.log(m, d.audits[m]?.displayValue, 'numeric:', d.audits[m]?.numericValue);
});
console.log('LCP item:', JSON.stringify(d.audits['largest-contentful-paint-element']?.details?.items, null, 2));
console.log('Layout shifts:', JSON.stringify(d.audits['layout-shifts']?.details?.items, null, 2));
fs.unlinkSync(tmp);
