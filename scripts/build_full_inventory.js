const fs = require('fs');

// We will load the actual exported data by evaluating or parsing the typescript files
const graphicContent = fs.readFileSync('lib/graphic-work-data.ts', 'utf8');
const sharedContent = fs.readFileSync('lib/shared-work-assets.ts', 'utf8');
const showcaseContent = fs.readFileSync('components/work/GraphicDesignShowcase.tsx', 'utf8');
const homeShowcaseContent = fs.readFileSync('components/home/GraphicDesignShowcase.tsx', 'utf8');
const portfolioContent = fs.readFileSync('components/home/FeaturedPortfolio.tsx', 'utf8');

const inventory = [];

// Helper to add
function addItem(item) {
  inventory.push(item);
}

// 1. Parse GRAPHIC_DESIGN_PROJECTS
// Let's use regex to extract each project block
const projectBlocks = graphicContent.split(/\{\s*slug:\s*"/g).slice(1);

projectBlocks.forEach(block => {
  const slug = block.match(/^([^"]+)"/)?.[1];
  const title = block.match(/title:\s*"([^"]+)"/)?.[1];
  const client = block.match(/client:\s*"([^"]+)"/)?.[1];
  const industry = block.match(/industry:\s*"([^"]+)"/)?.[1];
  const posterSrc = block.match(/posterSrc:\s*"([^"]+)"/)?.[1];

  if (posterSrc) {
    addItem({
      location: `Case Study Hero Poster: ${slug}`,
      slug,
      client,
      industry,
      role: 'Hero Poster',
      title,
      src: posterSrc,
    });
  }

  // Process stills
  const stillsMatch = block.match(/processStills:\s*\[([\s\S]*?)\]\s*(?:,|\})/);
  if (stillsMatch) {
    const stillsBlock = stillsMatch[1];
    const stillItems = stillsBlock.split(/\{\s*src:\s*"/g).slice(1);
    stillItems.forEach(s => {
      const src = s.match(/^([^"]+)"/)?.[1];
      const caption = s.match(/caption:\s*"([^"]+)"/)?.[1];
      const alt = s.match(/alt:\s*"([^"]+)"/)?.[1];
      if (src) {
        addItem({
          location: `Process Still: ${slug}`,
          slug,
          client,
          industry,
          role: 'Process Still',
          title: caption || alt || title,
          src,
        });
      }
    });
  }
});

// 2. Parse NIRVA_DESIGN_GALLERIES from shared-work-assets.ts line by line
const sharedLines = sharedContent.split('\n');
let inNirvaGallery = false;
let currentCat = '';
let currentItem = null;

for (let i = 0; i < sharedLines.length; i++) {
  const line = sharedLines[i];
  if (line.includes('export const NIRVA_DESIGN_GALLERIES')) {
    inNirvaGallery = true;
    continue;
  }
  if (inNirvaGallery && line.includes('export const NIRVA_BRAND_IDENTITY_SYSTEM')) {
    break;
  }
  if (!inNirvaGallery) continue;

  const catM = line.match(/category:\s*"([^"]+)"/);
  if (catM) {
    currentCat = catM[1];
    continue;
  }

  const srcM = line.match(/src:\s*"([^"]+)"/);
  if (srcM) {
    if (currentItem && currentItem.src) {
      addItem(currentItem);
    }
    currentItem = {
      location: `Nirva Gallery [${currentCat}]`,
      slug: 'nirva-resort-environmental-branding',
      client: 'Nirva Club & Resort',
      industry: 'Hospitality, Luxury Leisure & Clubs',
      category: currentCat,
      role: 'Gallery Item',
      src: srcM[1],
    };
    continue;
  }

  if (currentItem) {
    const titleM = line.match(/title:\s*"([^"]+)"/);
    if (titleM && !currentItem.title) currentItem.title = titleM[1];
    const capM = line.match(/caption:\s*"([^"]+)"/);
    if (capM && !currentItem.caption) currentItem.caption = capM[1];
  }
}
if (currentItem && currentItem.src) {
  addItem(currentItem);
}

// 3. Parse SIMILAR_CREATIVES from GraphicDesignShowcase.tsx
const simMatch = showcaseContent.match(/const SIMILAR_CREATIVES\s*=\s*\[([\s\S]*?)\];/);
if (simMatch) {
  const simBlocks = simMatch[1].split(/\{\s*title:\s*"/g).slice(1);
  simBlocks.forEach(sb => {
    const title = sb.match(/^([^"]+)"/)?.[1];
    const tag = sb.match(/tag:\s*"([^"]+)"/)?.[1];
    const src = sb.match(/src:\s*"([^"]+)"/)?.[1];
    if (src) {
      addItem({
        location: `Graphic Design Page: Similar Creatives Marquee`,
        slug: 'marquee',
        client: 'Various',
        industry: tag,
        role: 'Marquee Creative',
        title,
        src,
      });
    }
  });
}

// 4. Parse Home Page FeaturedPortfolio.tsx graphic design items
const portMatch = portfolioContent.match(/\/\/\s*---\s*GRAPHIC DESIGN TAB[\s\S]*?\];/);
if (portMatch) {
  const portBlocks = portMatch[0].split(/\{\s*id:\s*"/g).slice(1);
  portBlocks.forEach(pb => {
    const id = pb.match(/^([^"]+)"/)?.[1];
    const title = pb.match(/title:\s*"([^"]+)"/)?.[1];
    const thumbnail = pb.match(/thumbnail:\s*"([^"]+)"/)?.[1];
    const href = pb.match(/href:\s*"([^"]+)"/)?.[1];
    const categoryChip = pb.match(/categoryChip:\s*"([^"]+)"/)?.[1];
    if (thumbnail) {
      addItem({
        location: `Home Page: FeaturedPortfolio (Graphic Design Tab)`,
        slug: id,
        client: title,
        industry: categoryChip,
        role: 'Home Portfolio Card',
        title,
        href,
        src: thumbnail,
      });
    }
  });
}

// 5. Parse Home Page GraphicDesignShowcase.tsx
const homeHeroImg = homeShowcaseContent.match(/<Image[\s\S]*?src="([^"]+)"/)?.[1];
if (homeHeroImg) {
  addItem({
    location: `Home Page: GraphicDesignShowcase Section`,
    slug: 'nirva-resort-environmental-branding',
    client: 'Nirva Club & Resort',
    industry: 'Hospitality, Luxury Leisure & Clubs',
    role: 'Home Section Feature',
    title: 'Nirva Luxury Resort OOH & Brand Architecture',
    src: homeHeroImg,
  });
}

console.log('Total Graphic Design Content Items found:', inventory.length);
fs.writeFileSync('scripts/inventory_data.json', JSON.stringify(inventory, null, 2));
console.log('Saved to scripts/inventory_data.json');
