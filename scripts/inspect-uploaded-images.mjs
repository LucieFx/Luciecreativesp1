import sharp from 'sharp';
import fs from 'fs';

const files = [
  { name: 'Forever Films full screenshot', path: 'C:/Users/lucie/.gemini/antigravity-ide/brain/a9b69f8c-2d5b-4229-9430-cfc7c9520231/.user_uploaded/media_1791408113922.png' },
  { name: 'NoviMail full screenshot', path: 'C:/Users/lucie/.gemini/antigravity-ide/brain/a9b69f8c-2d5b-4229-9430-cfc7c9520231/.user_uploaded/media_1791408113972.png' },
  { name: 'Nimus AI full screenshot', path: 'C:/Users/lucie/.gemini/antigravity-ide/brain/a9b69f8c-2d5b-4229-9430-cfc7c9520231/.user_uploaded/media_1791408114023.png' },
  { name: 'NoviMail Lighthouse score', path: 'C:/Users/lucie/.gemini/antigravity-ide/brain/a9b69f8c-2d5b-4229-9430-cfc7c9520231/.user_uploaded/media_1791408164233.png' },
  { name: 'Nimus AI Lighthouse score', path: 'C:/Users/lucie/.gemini/antigravity-ide/brain/a9b69f8c-2d5b-4229-9430-cfc7c9520231/.user_uploaded/media_1791408180142.png' }
];

for (const item of files) {
  if (fs.existsSync(item.path)) {
    const meta = await sharp(item.path).metadata();
    const stats = fs.statSync(item.path);
    console.log(`[${item.name}]`);
    console.log(`  Path: ${item.path}`);
    console.log(`  Dimensions: ${meta.width}x${meta.height}, format: ${meta.format}, size: ${(stats.size/1024).toFixed(1)} KB\n`);
  } else {
    console.log(`[${item.name}] NOT FOUND: ${item.path}\n`);
  }
}
