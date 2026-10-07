import fs from 'fs';

const traceData = JSON.parse(fs.readFileSync('src/scripts/tmp-lh-trace-0.trace.json', 'utf8'));
const events = traceData.traceEvents || [];
const layoutShifts = events.filter(e => e.name === 'LayoutShift');

for (const ls of layoutShifts) {
  console.log(JSON.stringify(ls, null, 2));
}
