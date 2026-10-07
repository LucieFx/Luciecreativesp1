import fs from 'fs';

const mobile = JSON.parse(fs.readFileSync('src/scripts/lighthouse-mobile.json', 'utf-8'));
const desktop = JSON.parse(fs.readFileSync('src/scripts/lighthouse-desktop.json', 'utf-8'));

function dumpAuditIssues(report, label) {
  console.log(`\n================================================================================`);
  console.log(`AUDIT ISSUES FOR: ${label}`);
  console.log(`================================================================================`);

  const audits = report.audits;
  const categories = report.categories;

  // Map each audit to its categories
  const auditToCat = {};
  for (const [catId, cat] of Object.entries(categories)) {
    cat.auditRefs.forEach(ref => {
      if (!auditToCat[ref.id]) auditToCat[ref.id] = [];
      auditToCat[ref.id].push({ cat: cat.title, weight: ref.weight, group: ref.group });
    });
  }

  // Find all audits where score < 1 (or warnings/errors)
  const failedAudits = [];
  for (const [id, a] of Object.entries(audits)) {
    if (a.scoreDisplayMode === 'notApplicable' || a.scoreDisplayMode === 'informative') continue;
    if (a.score !== null && a.score < 1) {
      failedAudits.push({ id, ...a });
    }
  }

  // Also check audits that have warnings
  for (const [id, a] of Object.entries(audits)) {
    if (a.warnings && a.warnings.length > 0) {
      if (!failedAudits.some(x => x.id === id)) {
        failedAudits.push({ id, ...a, isWarningOnly: true });
      }
    }
  }

  console.log(`Total failing/warning audits found: ${failedAudits.length}\n`);

  failedAudits.forEach((a, idx) => {
    const cats = (auditToCat[a.id] || []).map(c => `${c.cat} (weight: ${c.weight})`).join(', ') || 'Uncategorized / Diagnostic';
    console.log(`[${idx+1}] ID: ${a.id}`);
    console.log(`    Category   : ${cats}`);
    console.log(`    Title      : ${a.title}`);
    console.log(`    Score      : ${a.score} | Display: ${a.displayValue || 'N/A'}`);
    if (a.warnings) console.log(`    Warnings   : ${JSON.stringify(a.warnings)}`);
    if (a.explanation) console.log(`    Explanation: ${a.explanation}`);

    const items = a.details?.items || [];
    if (items.length > 0) {
      console.log(`    Affected Elements / Resources (${items.length}):`);
      items.forEach((item, itemIdx) => {
        let line = `      - `;
        if (item.node) {
          line += `Selector: "${item.node.selector}" | Snippet: "${item.node.snippet}" | Label: "${item.node.nodeLabel || ''}" `;
        }
        if (item.url) line += `URL: ${item.url} `;
        if (item.source) line += `Source: ${item.source.url}:${item.source.line}:${item.source.column} `;
        if (item.wastedBytes) line += `Wasted: ${(item.wastedBytes/1024).toFixed(1)} KB `;
        if (item.wastedMs) line += `WastedMs: ${item.wastedMs}ms `;
        if (item.subItems?.items) {
          line += `Sub-issues: ` + item.subItems.items.map(s => s.message || s.node?.snippet || s.ruleId).join(' ; ');
        }
        if (item.message) line += `Message: ${item.message} `;
        if (item.description) line += `Desc: ${item.description} `;
        if (!item.node && !item.url && !item.source && !item.message) {
          line += JSON.stringify(item);
        }
        console.log(line);
      });
    }
    console.log('');
  });
}

dumpAuditIssues(mobile, 'MOBILE');
dumpAuditIssues(desktop, 'DESKTOP');
