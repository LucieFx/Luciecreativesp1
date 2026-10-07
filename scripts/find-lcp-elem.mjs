import { execSync } from 'child_process';
import fs from 'fs';

const tmp = 'src/scripts/tmp-lcp-elem.json';
execSync(
  'npx --yes lighthouse http://localhost:3000/video-editing --output=json --output-path=' + tmp + ' --chrome-flags="--headless=new --no-sandbox" --form-factor=mobile --screenEmulation.mobile=true --throttling-method=simulate --quiet',
  { stdio: 'pipe' }
);
const d = JSON.parse(fs.readFileSync(tmp, 'utf8'));
for (const [k, a] of Object.entries(d.audits)) {
  if (k.includes('largest-contentful') || k.includes('lcp')) {
    console.log(`Audit: ${k}`);
    console.log('displayValue:', a.displayValue);
    console.log('details:', JSON.stringify(a.details, null, 2));
  }
}
fs.unlinkSync(tmp);
