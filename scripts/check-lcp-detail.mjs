import { execSync } from 'child_process';
import fs from 'fs';

const tmp = 'src/scripts/tmp-lcp.json';
execSync(
  'npx --yes lighthouse http://localhost:3000/video-editing --output=json --output-path=' + tmp + ' --chrome-flags="--headless=new --no-sandbox" --form-factor=mobile --screenEmulation.mobile=true --throttling-method=simulate --quiet',
  { stdio: 'pipe' }
);
const d = JSON.parse(fs.readFileSync(tmp, 'utf8'));
console.log('LCP audit:', JSON.stringify(d.audits['largest-contentful-paint-element'], null, 2));
console.log('LCP phases:', JSON.stringify(d.audits['lcp-breakdown-insight']?.details, null, 2));
fs.unlinkSync(tmp);
