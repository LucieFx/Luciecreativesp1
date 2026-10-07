import { execSync } from 'child_process';
import fs from 'fs';

const runs = [];

for (let i = 1; i <= 3; i++) {
  console.log(`\n================== RUN ${i} / 3 ==================`);
  const outputPath = `src/scripts/lh-run-${i}.json`;
  
  execSync(
    `npx --yes lighthouse http://localhost:3000/ --output=json --output-path=${outputPath} --chrome-flags="--headless=new --no-sandbox" --form-factor=mobile --screenEmulation.mobile=true --throttling-method=simulate --quiet`,
    { stdio: 'inherit' }
  );

  const data = JSON.parse(fs.readFileSync(outputPath, 'utf-8'));
  const a = data.audits;
  const categories = data.categories;

  const result = {
    run: i,
    performance: Math.round(categories.performance.score * 100),
    accessibility: Math.round(categories.accessibility.score * 100),
    bestPractices: Math.round(categories['best-practices'].score * 100),
    seo: Math.round(categories.seo.score * 100),
    fcp: a['first-contentful-paint']?.numericValue,
    fcpDisplay: a['first-contentful-paint']?.displayValue,
    lcp: a['largest-contentful-paint']?.numericValue,
    lcpDisplay: a['largest-contentful-paint']?.displayValue,
    tbt: a['total-blocking-time']?.numericValue,
    tbtDisplay: a['total-blocking-time']?.displayValue,
    cls: a['cumulative-layout-shift']?.numericValue,
    clsDisplay: a['cumulative-layout-shift']?.displayValue,
    speedIndex: a['speed-index']?.numericValue,
    speedIndexDisplay: a['speed-index']?.displayValue,
  };

  runs.push(result);
  console.log(`Run ${i} Result:`, JSON.stringify(result, null, 2));
}

function median(arr) {
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

const summary = {
  runs,
  median: {
    performance: median(runs.map(r => r.performance)),
    accessibility: median(runs.map(r => r.accessibility)),
    bestPractices: median(runs.map(r => r.bestPractices)),
    seo: median(runs.map(r => r.seo)),
    fcp: (median(runs.map(r => r.fcp)) / 1000).toFixed(2) + ' s',
    lcp: (median(runs.map(r => r.lcp)) / 1000).toFixed(2) + ' s',
    tbt: Math.round(median(runs.map(r => r.tbt))) + ' ms',
    cls: median(runs.map(r => r.cls)).toFixed(3),
    speedIndex: (median(runs.map(r => r.speedIndex)) / 1000).toFixed(2) + ' s',
  }
};

fs.writeFileSync('src/scripts/lh-3-runs-summary.json', JSON.stringify(summary, null, 2));
console.log('\n================== FINAL 3-RUN SUMMARY ==================');
console.log(JSON.stringify(summary, null, 2));
