import fs from 'fs';

const b64 = fs.readFileSync('src/public/iphone-screen-mask.png').toString('base64');
const dataUri = `data:image/png;base64,${b64}`;

const content = `/**
 * Precise measurements programmatically extracted from iphone-frame-raw.png (576 x 1024).
 * All measurements are stored as constants in one place.
 */
export const IPHONE_FRAME = {
  naturalWidth: 576,
  naturalHeight: 1024,
  aspectRatio: "576 / 1024",

  // Screen rectangle relative to the 576x1024 frame image
  // Sized to the exact screen cutout bounds (x: 77 to 499, y: 51 to 972)
  screenInsets: {
    topPercent: 4.98046875,       // y = 51 / 1024 (exact 4.98%)
    bottomPercent: 4.98046875,    // (1024 - 1 - 972) / 1024 (exact 4.98%)
    leftPercent: 13.368055555555555,  // x = 77 / 576 (~13.37%)
    rightPercent: 13.194444444444445, // (576 - 1 - 499) / 576 (~13.19%)
  },

  // Screen dimensions inside the frame
  screenWidth: 423,
  screenHeight: 922,
  screenAspectRatio: "423 / 922", // ~0.4588

  // Dynamic Island bounding box (relative to screen container)
  dynamicIsland: {
    // Exact pixels: x: 216 to 360, y: 61 to 105
    widthPercentOfScreen: 34.28,   // 145 / 423 (~34.28%)
    heightPercentOfScreen: 4.88,   // 45 / 922 (~4.88%)
    leftPercentOfScreen: 32.86,    // (216 - 77) / 423 (~32.86%)
    topPercentOfScreen: 1.08,      // (61 - 51) / 922 (~1.08% below screen top)
    gapAboveIslandPx: 10,
  },
} as const;

export const IPHONE_SCREEN_MASK_DATA_URI = "${dataUri}";
`;

fs.writeFileSync('src/components/work/iphone-frame-constants.ts', content, 'utf-8');
fs.writeFileSync('Luciecreativesp1/components/work/iphone-frame-constants.ts', content, 'utf-8');
console.log('Successfully updated iphone-frame-constants.ts with inlined mask data URI');
