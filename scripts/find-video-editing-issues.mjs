import { execSync } from 'child_process';
import fs from 'fs';

const tempJson = 'src/scripts/lh-video-editing-prohibited.json';
execSync(
  `npx --yes lighthouse http://localhost:3000/video-editing --output=json --output-path=${tempJson} --chrome-flags="--headless=new --no-sandbox" --preset=desktop --only-categories=accessibility`,
  { stdio: 'pipe' }
);
const data = JSON.parse(fs.readFileSync(tempJson, 'utf-8'));
const audit = data.audits['aria-prohibited-attr'];
if (audit) {
  console.log('PROHIBITED ATTR ITEMS:');
  console.log(JSON.stringify(audit.details?.items, null, 2));
}
const mismatch = data.audits['label-content-name-mismatch'];
if (mismatch) {
  console.log('MISMATCH ITEMS:');
  console.log(JSON.stringify(mismatch.details?.items, null, 2));
}
fs.unlinkSync(tempJson);
