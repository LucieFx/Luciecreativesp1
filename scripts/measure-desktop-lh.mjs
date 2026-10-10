import { execSync } from 'child_process';
import fs from 'fs';

const tmp = 'src/scripts/tmp-desktop-baseline.json';

console.log('Running Lighthouse Desktop audit against production server (http://localhost:3000/)...');

try {
  execSync(
    'npx --yes lighthouse http://localhost:3000/ --output=json --output-path=' +
      tmp +
      ' --chrome-flags="--headless=new --no-sandbox" --preset=desktop --quiet',
    { stdio: 'pipe' }
  );
} catch (e) {
  // If temp folder cleanup threw, the JSON might still be written
  if (!fs.existsSync(tmp)) {
    console.error('Lighthouse failed:', e.message);
    process.exit(1);
  }
}

const data = JSON.parse(fs.readFileSync(tmp, 'utf8'));

const perfScore = Math.round(data.categories.performance.score * 100);
const fcp = data.audits['first-contentful-paint']?.displayValue;
const lcp = data.audits['largest-contentful-paint']?.displayValue;
const speedIndex = data.audits['speed-index']?.displayValue;
const tbt = data.audits['total-blocking-time']?.displayValue;
const cls = data.audits['cumulative-layout-shift']?.displayValue;

const totalByteWeight = data.audits['total-byte-weight']?.displayValue;
const networkRequests = data.audits['network-requests']?.details?.items?.length || 0;

console.log('=== LIGHTHOUSE DESKTOP REPORT ===');
console.log(`Performance Score: ${perfScore}`);
console.log(`FCP: ${fcp}`);
console.log(`LCP: ${lcp}`);
console.log(`Speed Index: ${speedIndex}`);
console.log(`TBT: ${tbt}`);
console.log(`CLS: ${cls}`);
console.log(`Total Byte Weight: ${totalByteWeight}`);
console.log(`Network Requests Count: ${networkRequests}`);

console.log('\n--- LCP Element ---');
const lcpElem = data.audits['largest-contentful-paint-element']?.details?.items?.[0];
if (lcpElem) {
  console.log('Node snippet:', lcpElem.node?.snippet);
  console.log('Node selector:', lcpElem.node?.selector);
}

console.log('\n--- Non-Composited Animations ---');
const nonComp = data.audits['non-composited-animations']?.details?.items;
if (nonComp && nonComp.length > 0) {
  nonComp.forEach((item, idx) => {
    console.log(`[${idx + 1}] Selector: ${item.node?.selector}`);
    console.log(`    SubItems/Reason:`, item.subItems?.items?.map(s => s.failureReason).join(', '));
  });
} else {
  console.log('None flagged!');
}

console.log('\n--- Render Blocking Resources ---');
const rb = data.audits['render-blocking-resources']?.details?.items;
if (rb && rb.length > 0) {
  rb.forEach(r => console.log(`- ${r.url} (${r.wastedMs}ms)`));
} else {
  console.log('None flagged!');
}

console.log('\n--- Image Opportunities ---');
['modern-image-formats', 'uses-optimized-images', 'uses-responsive-images', 'efficient-animated-content'].forEach(auditKey => {
  const audit = data.audits[auditKey];
  if (audit && audit.details?.overallSavingsBytes > 0) {
    console.log(`${auditKey}: ${(audit.details.overallSavingsBytes / 1024).toFixed(1)} KiB savings`);
  }
});

console.log('\n--- Unused CSS / JS ---');
const unusedCss = data.audits['unused-css-rules']?.details?.overallSavingsBytes || 0;
const unusedJs = data.audits['unused-javascript']?.details?.overallSavingsBytes || 0;
console.log(`Unused CSS: ${(unusedCss / 1024).toFixed(1)} KiB`);
console.log(`Unused JS: ${(unusedJs / 1024).toFixed(1)} KiB`);

console.log('\n--- Heaviest Assets ---');
const items = data.audits['network-requests']?.details?.items || [];
const sortedItems = [...items].sort((a, b) => (b.transferSize || 0) - (a.transferSize || 0));
sortedItems.slice(0, 10).forEach(req => {
  console.log(`${(req.transferSize / 1024).toFixed(1)} KiB | ${req.resourceType} | ${req.url.split('/').pop()?.slice(0, 50)}`);
});

fs.unlinkSync(tmp);
