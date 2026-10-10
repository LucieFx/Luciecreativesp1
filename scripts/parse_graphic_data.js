const fs = require('fs');

const content = fs.readFileSync('lib/graphic-work-data.ts', 'utf8');
const lines = content.split('\n');
const projects = [];
let current = null;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const slugMatch = line.match(/^\s*slug:\s*"([^"]+)"/);
  if (slugMatch) {
    if (current) projects.push(current);
    current = { slug: slugMatch[1], line: i + 1, stills: [] };
  }
  if (current) {
    const titleMatch = line.match(/^\s*title:\s*"([^"]+)"/);
    if (titleMatch && !current.title) current.title = titleMatch[1];
    const clientMatch = line.match(/^\s*client:\s*"([^"]+)"/);
    if (clientMatch && !current.client) current.client = clientMatch[1];
    const industryMatch = line.match(/^\s*industry:\s*"([^"]+)"/);
    if (industryMatch && !current.industry) current.industry = industryMatch[1];
    const posterMatch = line.match(/^\s*posterSrc:\s*"([^"]+)"/);
    if (posterMatch && !current.posterSrc) current.posterSrc = posterMatch[1];
    const stillMatch = line.match(/^\s*src:\s*"([^"]+)"/);
    if (stillMatch) current.stills.push(stillMatch[1]);
  }
}
if (current) projects.push(current);

console.log('Total Graphic Projects:', projects.length);
projects.forEach((p, idx) => {
  console.log(`\n[${idx + 1}] SLUG: ${p.slug}`);
  console.log(`    TITLE: ${p.title}`);
  console.log(`    CLIENT: ${p.client}`);
  console.log(`    INDUSTRY: ${p.industry}`);
  console.log(`    POSTER: ${p.posterSrc}`);
  console.log(`    STILLS COUNT: ${p.stills.length}`);
});
