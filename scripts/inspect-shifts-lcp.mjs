import { execSync } from 'child_process';
import fs from 'fs';

for (const p of ['/video-editing', '/graphic-design']) {
  console.log(`\n================================`);
  console.log(`Lighthouse CLS & LCP Details on ${p}:`);
  console.log(`================================`);
  const tmp = `src/scripts/tmp-cls-${Date.now()}.json`;
  execSync(
    `npx --yes lighthouse "http://localhost:3000${p}" --output=json --output-path="${tmp}" --chrome-flags="--headless=new --no-sandbox" --form-factor=mobile --screenEmulation.mobile=true --throttling-method=simulate --quiet`,
    { stdio: 'pipe' }
  );
  const d = JSON.parse(fs.readFileSync(tmp, 'utf-8'));
  console.log('Perf Score:', Math.round(d.categories.performance.score * 100));
  console.log('CLS Score:', d.audits['cumulative-layout-shift'].displayValue);
  console.log('LCP Score:', d.audits['largest-contentful-paint'].displayValue);
  const items = d.audits['layout-shift-elements']?.details?.items || [];
  console.log(`Layout Shift Elements (${items.length}):`);
  items.forEach(it => {
    console.log('  Score:', it.score, 'Node:', it.node?.snippet || it.node?.selector);
  });
  const lcpItems = d.audits['lcp-breakdown-insight']?.details?.items || [];
  console.log('LCP Breakdown:', JSON.stringify(lcpItems, null, 2));
  fs.unlinkSync(tmp);
}
