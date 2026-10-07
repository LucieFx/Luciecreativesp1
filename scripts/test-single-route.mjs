import { execSync } from 'child_process';
import fs from 'fs';

const route = process.argv[2] || '/about';
const tmp = `src/scripts/tmp-test-${Date.now()}.json`;
console.log(`Running lighthouse mobile on ${route}...`);
try {
  execSync(
    `npx --yes lighthouse "http://localhost:3000${route}" --output=json --output-path="${tmp}" --chrome-flags="--headless=new --no-sandbox" --form-factor=mobile --screenEmulation.mobile=true --throttling-method=simulate --quiet`,
    { stdio: 'pipe' }
  );
  const d = JSON.parse(fs.readFileSync(tmp, 'utf8'));
  console.log('Perf:', Math.round(d.categories.performance.score * 100));
  console.log('FCP:', d.audits['first-contentful-paint']?.displayValue);
  console.log('LCP:', d.audits['largest-contentful-paint']?.displayValue);
  console.log('TBT:', d.audits['total-blocking-time']?.displayValue);
  console.log('CLS:', d.audits['cumulative-layout-shift']?.displayValue);
  console.log('LCP discovery:', JSON.stringify(d.audits['lcp-discovery-insight']?.details?.items, null, 2));
  console.log('LCP breakdown:', JSON.stringify(d.audits['lcp-breakdown-insight']?.details?.items, null, 2));
  console.log('CLS details:', JSON.stringify(d.audits['layout-shifts']?.details?.items, null, 2));
  fs.unlinkSync(tmp);
} catch (e) {
  console.error('Error:', e.message);
}
