import { execSync } from 'child_process';
import fs from 'fs';

console.log('Running mobile Lighthouse audit on http://localhost:3000/ ...');
const outputPath = 'src/scripts/lh-optimized-home.json';

try {
  execSync(
    `npx --yes lighthouse http://localhost:3000/ --output=json --output-path=${outputPath} --chrome-flags="--headless=new --no-sandbox" --form-factor=mobile --screenEmulation.mobile=true --throttling-method=simulate --quiet`,
    { stdio: 'inherit' }
  );
  console.log('Lighthouse audit completed. Output saved to', outputPath);
} catch (e) {
  console.error('Lighthouse run error:', e.message);
}
