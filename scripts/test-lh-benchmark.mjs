import { execSync } from 'child_process';
import fs from 'fs';

const url = 'http://localhost:3000/';
console.log('Testing 3 runs on Home mobile & desktop...');
const start = Date.now();

function runLh(url, isMobile) {
  const tmp = `src/scripts/temp-lh-${Date.now()}-${Math.random().toString(36).slice(2)}.json`;
  const flags = isMobile
    ? '--form-factor=mobile --screenEmulation.mobile=true --throttling-method=simulate'
    : '--preset=desktop';
  execSync(
    `npx --yes lighthouse "${url}" --output=json --output-path="${tmp}" --chrome-flags="--headless=new --no-sandbox" ${flags} --quiet`,
    { stdio: 'pipe' }
  );
  const data = JSON.parse(fs.readFileSync(tmp, 'utf-8'));
  fs.unlinkSync(tmp);
  return {
    perf: Math.round(data.categories.performance.score * 100),
    a11y: Math.round(data.categories.accessibility.score * 100),
    bp: Math.round(data.categories['best-practices'].score * 100),
    seo: Math.round(data.categories.seo.score * 100),
    fcp: data.audits['first-contentful-paint']?.numericValue,
    lcp: data.audits['largest-contentful-paint']?.numericValue,
    tbt: data.audits['total-blocking-time']?.numericValue,
    cls: data.audits['cumulative-layout-shift']?.numericValue,
  };
}

console.log('Run 1 Mobile:', runLh(url, true));
console.log('Run 1 Desktop:', runLh(url, false));
console.log(`Elapsed: ${((Date.now() - start) / 1000).toFixed(1)}s`);
