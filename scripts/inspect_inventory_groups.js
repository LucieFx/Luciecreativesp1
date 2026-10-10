const fs = require('fs');

const inv = JSON.parse(fs.readFileSync('scripts/inventory_data.json', 'utf8'));
const specs = JSON.parse(fs.readFileSync('scratch/image_specs.json', 'utf8'));

// Group by slug/location
const groups = {};
inv.forEach(item => {
  const key = item.slug || item.location;
  if (!groups[key]) groups[key] = { key, location: item.location, client: item.client, industry: item.industry, items: [] };
  const spec = specs[item.src] || {};
  groups[key].items.push({
    title: item.title,
    caption: item.caption,
    role: item.role,
    src: item.src,
    filename: spec.filename,
    localPath: spec.localPath,
    width: spec.width,
    height: spec.height,
    aspectRatio: spec.aspectRatio,
    sizeBytes: spec.sizeBytes,
  });
});

console.log('Group count:', Object.keys(groups).length);
fs.writeFileSync('scratch/grouped_inventory.json', JSON.stringify(groups, null, 2));

Object.values(groups).forEach((g, idx) => {
  console.log(`\n======================================================`);
  console.log(`[GROUP ${idx + 1}] ${g.key} | Client: ${g.client} | Industry: ${g.industry}`);
  console.log(`Location: ${g.location} | Items: ${g.items.length}`);
  g.items.forEach((it, i) => {
    console.log(`  (${i + 1}) [${it.role}] "${it.title}"`);
    console.log(`      File: ${it.filename} (${it.width}x${it.height}, ${Math.round(it.sizeBytes/1024)}KB)`);
    console.log(`      URL: ${it.src}`);
  });
});
