import { execSync } from 'child_process';
import fs from 'fs';

const tempJson = 'src/scripts/lh-graphic-design-a11y.json';
execSync(
  `npx --yes lighthouse http://localhost:3000/graphic-design --output=json --output-path=${tempJson} --chrome-flags="--headless=new --no-sandbox" --preset=desktop --only-categories=accessibility`,
  { stdio: 'pipe' }
);
const data = JSON.parse(fs.readFileSync(tempJson, 'utf-8'));
console.log('SCORE:', Math.round(data.categories.accessibility.score * 100));

for (const [k, a] of Object.entries(data.audits)) {
  if (a.score !== null && a.score < 1 && a.scoreDisplayMode !== 'notApplicable' && a.scoreDisplayMode !== 'informative') {
    console.log('\nFAILING AUDIT:', k);
    console.log('Title:', a.title);
    console.log('Description:', a.description);
    if (a.details?.items) {
      console.log('Items:', JSON.stringify(a.details.items, null, 2));
    }
  }
}
fs.unlinkSync(tempJson);
