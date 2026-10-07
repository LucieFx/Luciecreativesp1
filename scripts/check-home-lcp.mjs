import { execSync } from 'child_process';
import fs from 'fs';

const tmp = 'src/scripts/tmp-home-lcp.json';
execSync(
  'npx --yes lighthouse http://localhost:3000/ --output=json --output-path=' + tmp + ' --chrome-flags="--headless=new --no-sandbox" --form-factor=mobile --screenEmulation.mobile=true --throttling-method=simulate --quiet',
  { stdio: 'pipe' }
);
const d = JSON.parse(fs.readFileSync(tmp, 'utf8'));
console.log('Home mobile:');
console.log('Perf:', Math.round(d.categories.performance.score * 100));
console.log('LCP:', d.audits['largest-contentful-paint']?.displayValue);
console.log('LCP breakdown:', JSON.stringify(d.audits['lcp-breakdown-insight']?.details, null, 2));
console.log('LCP element:', JSON.stringify(d.audits['largest-contentful-paint-element']?.details, null, 2));
fs.unlinkSync(tmp);
