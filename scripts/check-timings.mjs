import { execSync } from 'child_process';
import fs from 'fs';

const tmp = 'src/scripts/tmp-timing.json';
execSync(
  'npx --yes lighthouse http://localhost:3000/video-editing --output=json --output-path=' + tmp + ' --chrome-flags="--headless=new --no-sandbox" --form-factor=mobile --screenEmulation.mobile=true --throttling-method=simulate --quiet',
  { stdio: 'pipe' }
);
const d = JSON.parse(fs.readFileSync(tmp, 'utf8'));
const reqs = d.audits['network-requests']?.details?.items || [];
console.log('Sample item keys:', Object.keys(reqs[0] || {}));
for (const r of reqs) {
  if (r.resourceType === 'Font' || r.resourceType === 'Document' || r.resourceType === 'Stylesheet') {
    console.log(`${r.resourceType} | ${r.url.split('/').pop()} | rendererStartTime: ${r.rendererStartTime} | mimeType: ${r.mimeType} | size: ${(r.transferSize / 1024).toFixed(1)} KB`);
  }
}
fs.unlinkSync(tmp);
