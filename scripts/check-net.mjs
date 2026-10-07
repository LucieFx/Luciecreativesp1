import { execSync } from 'child_process';
import fs from 'fs';

const tmp = 'src/scripts/tmp-net.json';
execSync(
  'npx --yes lighthouse http://localhost:3000/video-editing --output=json --output-path=' + tmp + ' --chrome-flags="--headless=new --no-sandbox" --form-factor=mobile --screenEmulation.mobile=true --throttling-method=simulate --quiet',
  { stdio: 'pipe' }
);
const d = JSON.parse(fs.readFileSync(tmp, 'utf8'));
const reqs = d.audits['network-requests']?.details?.items || [];
console.log('Total reqs:', reqs.length);
reqs.sort((a, b) => b.transferSize - a.transferSize);
for (const r of reqs.slice(0, 20)) {
  console.log(`${(r.transferSize / 1024).toFixed(1)} KB | ${r.resourceType} | ${r.url}`);
}
fs.unlinkSync(tmp);
