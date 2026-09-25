import React from "react";

export function ContinuousPageSpine() {
  return (
    <div
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0 select-none"
      aria-hidden="true"
    >
      <div className="absolute inset-0 dot-grid-pattern pointer-events-none opacity-[0.45]" />
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
        viewBox="0 0 1440 5400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="
            M -40 70 
            C 200 90, 320 250, 580 255 
            C 840 260, 1060 460, 1240 690 
            C 1380 870, 1440 1150, 1200 1380 
            C 920 1640, 380 1720, 200 1980 
            C 60 2200, 120 2520, 480 2740 
            C 840 2960, 1360 3180, 1220 3580 
            C 1100 3950, 420 4080, 260 4450 
            C 140 4750, 540 5050, 1480 5350
          "
          stroke="#7A1F2B"
          strokeWidth="2.8"
          strokeOpacity={0.22}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}

export default ContinuousPageSpine;
