import { execSync } from 'child_process';
import fs from 'fs';

const tmp = 'src/scripts/tmp-shift-trace.json';
execSync(
  'npx --yes lighthouse http://localhost:3000/video-editing --output=json --output-path=' + tmp + ' --chrome-flags="--headless=new --no-sandbox" --form-factor=mobile --screenEmulation.mobile=true --throttling-method=simulate --quiet',
  { stdio: 'pipe' }
);
const d = JSON.parse(fs.readFileSync(tmp, 'utf8'));
const shiftAudit = d.audits['layout-shifts'];
console.log('Layout shifts audit details:');
console.log(JSON.stringify(shiftAudit?.details?.items, null, 2));

const items = shiftAudit?.details?.items || [];
for (const item of items) {
  console.log('Shift subItems:', JSON.stringify(item.subItems, null, 2));
}

// Let's also check lcp element:
console.log('LCP element:', JSON.stringify(d.audits['largest-contentful-paint-element']?.details, null, 2));

fs.unlinkSync(tmp);
