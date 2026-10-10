const fs = require('fs');
const downloads = JSON.parse(fs.readFileSync('src/scratch/download_results.json', 'utf8'));
downloads.forEach((d, i) => {
  const parts = d.url.includes('/graphic-design/') ? d.url.split('/graphic-design/')[1] : d.url;
  console.log(`${i+1}. [${d.id}] ${parts}`);
});
