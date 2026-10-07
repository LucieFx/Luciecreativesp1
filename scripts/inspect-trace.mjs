import { execSync } from 'child_process';
import fs from 'fs';

const tmp = 'src/scripts/tmp-lh-trace.json';
execSync(
  'npx --yes lighthouse http://localhost:3000/video-editing --output=json --save-assets --output-path=' + tmp + ' --chrome-flags="--headless=new --no-sandbox" --form-factor=mobile --screenEmulation.mobile=true --throttling-method=simulate --quiet',
  { stdio: 'pipe' }
);
const d = JSON.parse(fs.readFileSync(tmp, 'utf8'));
const shifts = d.audits['layout-shifts']?.details?.items;
console.log('Shifts count:', shifts?.length);
console.log('Shifts:', JSON.stringify(shifts, null, 2));

// Check if trace exists
const files = fs.readdirSync('src/scripts').filter(f => f.includes('trace') || f.endsWith('.trace.json'));
console.log('Trace files:', files);

fs.unlinkSync(tmp);
