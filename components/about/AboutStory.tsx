"use client";

import React from "react";
import { Compass, Flame, ShieldAlert } from "lucide-react";

export function AboutStory() {
  return (
    <section id="story" className="relative w-full py-20 sm:py-28 px-4 sm:px-8 md:px-12 bg-white/60 border-y border-line/60 select-none">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-line">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-black text-maroon-700 tracking-widest uppercase mb-2">
              <Compass className="w-3.5 h-3.5" />
              <span>The Origin</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-ink tracking-[-0.02em] leading-[1.0] text-balance">
              The Story Behind{" "}
              <span className="font-accent italic text-[#8B1A1A] text-[1.1em] tracking-normal inline">
                Lucie Creatives
              </span>
            </h2>
          </div>
          <div className="text-xs font-bold text-muted uppercase tracking-wider">
            Real Craft • Zero Fluff
          </div>
        </div>

        {/* Narrative Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Paragraph 1 Card */}
          <div className="p-6 sm:p-7 rounded-xl bg-white border border-line shadow-xs flex flex-col justify-between space-y-4 hover:border-maroon-700/30 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-maroon-50 border border-maroon-100 flex items-center justify-center text-maroon-700 font-bold text-xs font-mono">
              01
            </div>
            <div>
              <h3 className="text-base font-bold text-ink mb-2">
                The Frustration
              </h3>
              <p className="text-sm font-normal text-body leading-relaxed text-pretty">
                Traditional creative agencies were never designed for the internet era. They took months to produce safe, forgettable campaigns that died the second paid ads were turned off. We saw ambitious founders burning capital on aesthetic fluff that generated zero organic velocity.
              </p>
            </div>
            <div className="pt-2 text-[11px] font-bold text-maroon-700/80 uppercase tracking-wider font-mono">
              The Spark
            </div>
          </div>

          {/* Paragraph 2 Card */}
          <div className="p-6 sm:p-7 rounded-xl bg-white border border-line shadow-xs flex flex-col justify-between space-y-4 hover:border-maroon-700/30 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-maroon-50 border border-maroon-100 flex items-center justify-center text-maroon-700 font-bold text-xs font-mono">
              02
            </div>
            <div>
              <h3 className="text-base font-bold text-ink mb-2">
                The Formula
              </h3>
              <p className="text-sm font-normal text-body leading-relaxed text-pretty">
                We engineered an alternative: treat video editing like algorithmic science and web development like performance engineering. By pairing sub-second hooks with obsessive typography and high-converting product architecture, we proved that attention could be systematized.
              </p>
            </div>
            <div className="pt-2 text-[11px] font-bold text-maroon-700/80 uppercase tracking-wider font-mono">
              The System
            </div>
          </div>

          {/* Paragraph 3 Card */}
          <div className="p-6 sm:p-7 rounded-xl bg-white border border-line shadow-xs flex flex-col justify-between space-y-4 hover:border-maroon-700/30 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-maroon-50 border border-maroon-100 flex items-center justify-center text-maroon-700 font-bold text-xs font-mono">
              03
            </div>
            <div>
              <h3 className="text-base font-bold text-ink mb-2">
                The Standard Today
              </h3>
              <p className="text-sm font-normal text-body leading-relaxed text-pretty">
                Today, the Lucie Creatives team leads as an agile creative and engineering studio for high-growth brands globally. No account managers playing telephone, no bloated timelines: just direct collaboration with partners who care obsessively about the craft.
              </p>
            </div>
            <div className="pt-2 text-[11px] font-bold text-maroon-700/80 uppercase tracking-wider font-mono">
              Our Conviction
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
