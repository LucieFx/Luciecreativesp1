import { execSync } from 'child_process';
import fs from 'fs';

const tempJson = 'src/scripts/lh-home-a11y-check.json';
execSync(
  `npx --yes lighthouse http://localhost:3000/ --output=json --output-path=${tempJson} --chrome-flags="--headless=new --no-sandbox" --preset=desktop --only-categories=accessibility`,
  { stdio: 'pipe' }
);
const data = JSON.parse(fs.readFileSync(tempJson, 'utf-8'));
for (const [k, a] of Object.entries(data.audits)) {
  if (a.score !== null && a.score < 1 && a.scoreDisplayMode !== 'notApplicable' && a.scoreDisplayMode !== 'informative') {
    console.log('\nFAILING AUDIT:', k);
    console.log('Items:', JSON.stringify(a.details?.items, null, 2));
  }
}
fs.unlinkSync(tempJson);
