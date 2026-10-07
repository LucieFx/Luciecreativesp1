import { execSync } from 'child_process';
import fs from 'fs';

const routes = [
  '/',
  '/video-editing',
  '/graphic-design',
  '/web-development',
  '/about',
  '/careers',
  '/contact',
  '/testimonials',
  '/industries',
  '/insights',
  '/ui-ux-design',
  '/branding',
  '/logo-design',
  '/social-media-design',
  '/privacy',
  '/terms',
  '/work/vedam-villas-influencer-tour'
];

console.log('Starting full 17-route baseline check (Desktop & Mobile)...');
console.log('='.repeat(90));

const results = [];

for (const r of routes) {
  const tmpM = `src/scripts/tmp-qm-${Date.now()}.json`;
  const tmpD = `src/scripts/tmp-qd-${Date.now()}.json`;

  try {
    // Mobile
    execSync(
      `npx --yes lighthouse "http://localhost:3000${r}" --output=json --output-path="${tmpM}" --chrome-flags="--headless=new --no-sandbox" --form-factor=mobile --screenEmulation.mobile=true --throttling-method=simulate --quiet`,
      { stdio: 'pipe' }
    );
    const dM = JSON.parse(fs.readFileSync(tmpM, 'utf8'));
    fs.unlinkSync(tmpM);

    // Desktop
    execSync(
      `npx --yes lighthouse "http://localhost:3000${r}" --output=json --output-path="${tmpD}" --chrome-flags="--headless=new --no-sandbox" --preset=desktop --quiet`,
      { stdio: 'pipe' }
    );
    const dD = JSON.parse(fs.readFileSync(tmpD, 'utf8'));
    fs.unlinkSync(tmpD);

    const mPerf = Math.round(dM.categories.performance.score * 100);
    const mA11y = Math.round(dM.categories.accessibility.score * 100);
    const mBP = Math.round(dM.categories['best-practices'].score * 100);
    const mSEO = Math.round(dM.categories.seo.score * 100);
    const mLCP = dM.audits['largest-contentful-paint']?.displayValue;
    const mCLS = dM.audits['cumulative-layout-shift']?.displayValue;

    const dPerf = Math.round(dD.categories.performance.score * 100);
    const dA11y = Math.round(dD.categories.accessibility.score * 100);
    const dBP = Math.round(dD.categories['best-practices'].score * 100);
    const dSEO = Math.round(dD.categories.seo.score * 100);
    const dLCP = dD.audits['largest-contentful-paint']?.displayValue;
    const dCLS = dD.audits['cumulative-layout-shift']?.displayValue;

    results.push({ route: r, mPerf, mA11y, mBP, mSEO, mLCP, mCLS, dPerf, dA11y, dBP, dSEO, dLCP, dCLS });

    console.log(
      `${r.padEnd(36)} | M: P=${mPerf} A=${mA11y} BP=${mBP} S=${mSEO} (LCP=${mLCP}, CLS=${mCLS}) | D: P=${dPerf} A=${dA11y} BP=${dBP} S=${dSEO} (LCP=${dLCP}, CLS=${dCLS})`
    );
  } catch (err) {
    console.error(`Error on route ${r}:`, err.message);
  }
}

fs.writeFileSync('src/scripts/quick-17-results.json', JSON.stringify(results, null, 2));
console.log('='.repeat(90));
console.log('Results saved to src/scripts/quick-17-results.json');
