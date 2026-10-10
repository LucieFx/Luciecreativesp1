import { execSync } from 'child_process';
import fs from 'fs';

const tmp = 'src/scripts/lh-debug.json';
try {
  execSync(
    'npx --yes lighthouse http://localhost:3000/ --output=json --output-path=' +
      tmp +
      ' --chrome-flags="--headless=new --no-sandbox" --preset=desktop --quiet',
    { stdio: 'pipe' }
  );
} catch (e) {
  // ignore
}

if (fs.existsSync(tmp)) {
  const d = JSON.parse(fs.readFileSync(tmp, 'utf8'));
  console.log('--- LCP Element ---');
  console.log(JSON.stringify(d.audits['largest-contentful-paint-element'], null, 2));

  console.log('\n--- LCP Insights ---');
  console.log('LCP breakdown:', JSON.stringify(d.audits['lcp-breakdown-insight']?.details, null, 2));
  console.log('LCP discovery:', JSON.stringify(d.audits['lcp-discovery-insight']?.details, null, 2));

  console.log('\n--- Non-composited Animations ---');
  console.log(JSON.stringify(d.audits['non-composited-animations']?.details, null, 2));
} else {
  console.log('tmp file not found');
}
