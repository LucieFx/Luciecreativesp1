import { execSync } from 'child_process';
import fs from 'fs';

const tempJson = 'src/scripts/lh-video-mobile-target.json';
execSync(
  `npx --yes lighthouse http://localhost:3000/video-editing --output=json --output-path=${tempJson} --chrome-flags="--headless=new --no-sandbox" --form-factor=mobile --screenEmulation.mobile=true --only-categories=accessibility`,
  { stdio: 'pipe' }
);
const data = JSON.parse(fs.readFileSync(tempJson, 'utf-8'));
const targetSize = data.audits['target-size'];
console.log('TARGET SIZE MOBILE:');
console.log(JSON.stringify(targetSize?.details?.items, null, 2));
fs.unlinkSync(tempJson);
