"use client";

import React from "react";
import { SITE_STATS } from "@/lib/site-stats";

interface WorkHeroReelProps {
  onLoaded?: () => void;
}

export function WorkHeroReel({ onLoaded }: WorkHeroReelProps) {
  React.useEffect(() => {
    if (onLoaded) onLoaded();
  }, [onLoaded]);

  return (
    <section className="relative w-full h-[76vh] min-h-[520px] max-h-[700px] overflow-hidden bg-[#8B1A1A] flex items-end select-none">
      {/* 1. SOLID RED BACKGROUND with subtle depth vignette (matches site's red banner sections) */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(163, 31, 31, 0.40) 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.18) 100%)",
        }}
      />

      {/* 2. HERO CONTENT */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-12 pb-10 sm:pb-14">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white/90 text-xs font-black uppercase tracking-widest mb-4 shadow-md">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span>LUCIE CREATIVES • EDITING &amp; DESIGN PORTFOLIO</span>
        </div>

        {/* Primary H1 */}
        <h1 className="text-white font-black tracking-tight leading-[1.05] text-[clamp(2.5rem,6.8vw,6.5rem)] text-balance max-w-4xl">
          We make brands <br />
          <span className="font-serif italic font-normal text-white/90 tracking-tight text-[1.06em]">
            impossible to ignore.
          </span>
        </h1>

        <p className="mt-4 text-sm sm:text-base text-white/75 font-medium max-w-xl text-balance">
          Cinema-grade commercial spot editing, high-retention vertical reels, and distinctive brand identities engineered for market dominance.
        </p>

        {/* 3. QUICK DISCIPLINE JUMP ANCHORS IN SOLID PROPER WHITE */}
        <div className="mt-7 flex flex-wrap items-center gap-2 sm:gap-2.5">
          <a
            href="#short-form-videos"
            className="px-4 py-2 rounded-full bg-white hover:bg-brand-red-50 border border-white text-ink hover:text-brand-red text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>📱 9:16 Vertical Reels</span>
          </a>
          <a
            href="#long-form-videos"
            className="px-4 py-2 rounded-full bg-white hover:bg-brand-red-50 border border-white text-ink hover:text-brand-red text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>🎬 16:9 Cinema Commercials</span>
          </a>
          <a
            href="#graphic-design"
            className="px-4 py-2 rounded-full bg-white hover:bg-brand-red-50 border border-white text-ink hover:text-brand-red text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>🎨 Brand Identity &amp; Packaging</span>
          </a>
          <a
            href="#stat-break"
            className="px-4 py-2 rounded-full bg-white hover:bg-brand-red-50 border border-white text-ink hover:text-brand-red text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>📈 {SITE_STATS.viewsLabel} Client Impact</span>
          </a>
        </div>
      </div>
    </section>
  );
}

