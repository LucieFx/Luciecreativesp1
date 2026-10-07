import { execSync } from 'child_process';
import fs from 'fs';

const tmp = 'src/scripts/tmp-webdev-a11y.json';
execSync(
  'npx --yes lighthouse http://localhost:3000/web-development --output=json --output-path=' + tmp + ' --only-categories=accessibility --chrome-flags="--headless=new --no-sandbox" --quiet',
  { stdio: 'pipe' }
);
const d = JSON.parse(fs.readFileSync(tmp, 'utf8'));
console.log('A11y score:', Math.round(d.categories.accessibility.score * 100));
for (const [k, a] of Object.entries(d.audits)) {
  if (a.score !== null && a.score < 1) {
    console.log('Failing a11y audit:', k, a.title, JSON.stringify(a.details?.items, null, 2));
  }
}
fs.unlinkSync(tmp);
