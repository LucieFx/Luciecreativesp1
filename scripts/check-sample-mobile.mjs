import { execSync } from 'child_process';
import fs from 'fs';

const routes = ['/', '/about', '/contact', '/graphic-design', '/web-development', '/testimonials'];

for (const r of routes) {
  const tmp = `src/scripts/tmp-scan-${Date.now()}.json`;
  execSync(
    `npx --yes lighthouse "http://localhost:3000${r}" --output=json --output-path="${tmp}" --chrome-flags="--headless=new --no-sandbox" --form-factor=mobile --screenEmulation.mobile=true --throttling-method=simulate --quiet`,
    { stdio: 'pipe' }
  );
  const d = JSON.parse(fs.readFileSync(tmp, 'utf8'));
  console.log(`${r.padEnd(20)} | Perf: ${Math.round(d.categories.performance.score * 100)} | A11y: ${Math.round(d.categories.accessibility.score * 100)} | BP: ${Math.round(d.categories['best-practices'].score * 100)} | SEO: ${Math.round(d.categories.seo.score * 100)} | LCP: ${d.audits['largest-contentful-paint']?.displayValue} | CLS: ${d.audits['cumulative-layout-shift']?.displayValue}`);
  fs.unlinkSync(tmp);
}
