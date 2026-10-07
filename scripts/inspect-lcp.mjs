import { execSync } from 'child_process';
import fs from 'fs';

console.log('Running mobile lighthouse to inspect LCP in detail...');
execSync(
  'npx --yes lighthouse http://localhost:3000/ --output=json --output-path=src/scripts/lcp-inspect.json --chrome-flags="--headless=new --no-sandbox" --form-factor=mobile --screenEmulation.mobile=true --throttling-method=simulate --quiet',
  { stdio: 'pipe' }
);
const d = JSON.parse(fs.readFileSync('src/scripts/lcp-inspect.json', 'utf8'));
console.log('Performance Score:', Math.round(d.categories.performance.score * 100));
console.log('LCP Display:', d.audits['largest-contentful-paint']?.displayValue);
console.log('LCP Element Details:', JSON.stringify(d.audits['largest-contentful-paint-element'], null, 2));

const metrics = ['first-contentful-paint', 'largest-contentful-paint', 'total-blocking-time', 'cumulative-layout-shift', 'speed-index'];
metrics.forEach(m => {
  console.log(`${m}: score=${d.audits[m]?.score}, value=${d.audits[m]?.displayValue}`);
});

console.log('\nRelevant audits:');
for (const [k, a] of Object.entries(d.audits)) {
  if (a.score !== null && a.score < 1 && (a.details?.overallSavingsMs || a.details?.overallSavingsBytes || a.numericValue > 100)) {
    console.log(`- ${k}: score=${a.score}, val=${a.displayValue || a.numericValue}`);
  }
}

fs.unlinkSync('src/scripts/lcp-inspect.json');
