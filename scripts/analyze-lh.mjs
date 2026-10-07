import fs from 'fs';

function analyze(filePath, mode) {
  console.log('================================================================');
  console.log('MODE:', mode);
  console.log('================================================================');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const cats = data.categories;
  console.log('CATEGORY SCORES:');
  for (const [k, v] of Object.entries(cats)) {
    console.log(`  ${v.title.padEnd(20)}: ${Math.round(v.score * 100)} / 100`);
  }

  const audits = data.audits;
  console.log('\nCORE WEB VITALS & TIMINGS:');
  const metrics = [
    'first-contentful-paint',
    'largest-contentful-paint',
    'total-blocking-time',
    'cumulative-layout-shift',
    'speed-index',
    'interactive',
    'max-potential-fid'
  ];
  metrics.forEach(m => {
    if (audits[m]) {
      console.log(`  ${audits[m].title.padEnd(30)}: ${audits[m].displayValue || audits[m].numericValue}`);
    }
  });

  // LCP element
  if (audits['largest-contentful-paint-element']) {
    console.log('\nLCP ELEMENT:');
    const items = audits['largest-contentful-paint-element'].details?.items || [];
    items.forEach(it => {
      console.log(`  Selector   : ${it.node?.selector}`);
      console.log(`  Snippet    : ${it.node?.snippet}`);
      console.log(`  Explanation: ${it.node?.explanation || 'N/A'}`);
    });
  }

  // Network resources breakdown
  if (audits['network-requests']) {
    const items = audits['network-requests'].details?.items || [];
    let totalJsTransfer = 0;
    let totalJsResource = 0;
    items.filter(i => i.resourceType === 'Script').forEach(i => {
      totalJsTransfer += i.transferSize || 0;
      totalJsResource += i.resourceSize || 0;
    });
    console.log(`\nTOTAL JAVASCRIPT SIZE:`);
    console.log(`  Transfer size: ${(totalJsTransfer / 1024).toFixed(1)} KB`);
    console.log(`  Resource size: ${(totalJsResource / 1024).toFixed(1)} KB`);

    console.log('\nTOP 10 HEAVIEST RESOURCES (Transfer Size):');
    const sorted = [...items].sort((a,b) => (b.transferSize || 0) - (a.transferSize || 0)).slice(0, 10);
    sorted.forEach((r, idx) => {
      const urlShort = r.url.length > 70 ? '...' + r.url.slice(-67) : r.url;
      console.log(`  [${idx+1}] ${(r.transferSize / 1024).toFixed(1).padStart(7)} KB | ${(r.resourceType || 'other').padEnd(10)} | ${urlShort}`);
    });
  }

  console.log('\nFAILING OR WARNING AUDITS:');
  const failedList = [];
  for (const [id, a] of Object.entries(audits)) {
    if (a.score !== null && a.score < 1 && a.scoreDisplayMode !== 'notApplicable' && a.scoreDisplayMode !== 'informative') {
      failedList.push({ id, ...a });
    }
  }

  // Group by category if possible or list
  failedList.forEach((a, idx) => {
    console.log(`\n----------------------------------------------------------------`);
    console.log(`[${idx+1}] ID: ${a.id}`);
    console.log(`    Title      : ${a.title}`);
    console.log(`    Score      : ${a.score} (Display: ${a.displayValue || 'N/A'})`);
    if (a.description) {
      const cleanDesc = a.description.split('[Learn')[0].trim();
      console.log(`    Description: ${cleanDesc}`);
    }

    if (a.details?.items && a.details.items.length > 0) {
      console.log(`    Offending Items (${a.details.items.length}):`);
      a.details.items.slice(0, 8).forEach((item, itemIdx) => {
        let detailsStr = '';
        if (item.node) detailsStr += `Node: ${item.node.selector || item.node.snippet || ''} `;
        if (item.url) detailsStr += `URL: ${item.url} `;
        if (item.source) detailsStr += `Source: ${item.source.url}:${item.source.line}:${item.source.column} `;
        if (item.wastedBytes) detailsStr += `Wasted: ${(item.wastedBytes/1024).toFixed(1)} KB `;
        if (item.wastedMs) detailsStr += `WastedMs: ${item.wastedMs}ms `;
        if (item.subItems?.items) {
          detailsStr += `SubItems: ` + item.subItems.items.map(s => s.message || s.node?.snippet || s.ruleId).join(' | ');
        }
        if (item.explanation) detailsStr += `Explanation: ${item.explanation} `;
        if (!detailsStr) detailsStr = JSON.stringify(item);
        console.log(`      (${itemIdx+1}) ${detailsStr}`);
      });
      if (a.details.items.length > 8) {
        console.log(`      ... and ${a.details.items.length - 8} more items`);
      }
    }
  });
}

analyze('src/scripts/lighthouse-mobile.json', 'MOBILE');
console.log('\n\n');
analyze('src/scripts/lighthouse-desktop.json', 'DESKTOP');
