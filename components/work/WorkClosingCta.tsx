"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Sparkles, Zap } from "lucide-react";

interface WorkClosingCtaProps {
  primaryCtaLabel?: string;
}

export function WorkClosingCta({ primaryCtaLabel = "Start a Project" }: WorkClosingCtaProps = {}) {
  return (
    <section className="relative w-full py-12 sm:py-16 bg-[#8B1A1A] text-white flex items-center justify-center px-6 sm:px-12 md:px-16 overflow-hidden select-none border-t border-white/20">
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 text-white text-xs font-black uppercase tracking-widest border border-white/30 backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>START YOUR SPRINT</span>
        </div>

        <h2 className="text-white font-black text-[clamp(2.2rem,5.5vw,4.8rem)] leading-[1.08] tracking-tight text-balance">
          Your brand <br />
          <span className="italic text-white">
            could be next.
          </span>
        </h2>

        <p className="text-sm sm:text-lg font-medium text-white/80 max-w-2xl mx-auto leading-relaxed text-pretty">
          High-retention video production, monolithic visual design systems, and viral social momentum. Let&apos;s engineer something unforgettable.
        </p>

        <div className="pt-2 flex items-center justify-center">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2.5 px-7 sm:px-9 py-3.5 sm:py-4 rounded-xl bg-white text-[#8B1A1A] hover:bg-brand-red-50 text-xs sm:text-sm font-black uppercase tracking-wider shadow-[0_15px_35px_rgba(0,0,0,0.3)] hover:scale-105 transition-all duration-300"
          >
            <span>{primaryCtaLabel}</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        <div className="pt-6 border-t border-white/15 max-w-2xl mx-auto text-xs text-white/80 font-medium space-y-2.5">
          <p className="font-bold uppercase tracking-wider text-white/60 text-[12px]">
            Explore Specific Capabilities &amp; Regional Hubs:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Link
              href="/video-editing"
              className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs transition-colors"
            >
              Video Editing Services →
            </Link>
            <Link
              href="/graphic-design"
              className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs transition-colors"
            >
              Graphic Design Services →
            </Link>
            <Link
              href="/web-development"
              className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs transition-colors"
            >
              Web Development →
            </Link>
            <Link
              href="/gujarat"
              className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs transition-colors"
            >
              Gujarat Hub →
            </Link>
            <Link
              href="/ahmedabad"
              className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs transition-colors"
            >
              Ahmedabad Hub →
            </Link>
            <Link
              href="/surat"
              className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs transition-colors"
            >
              Surat Hub →
            </Link>
          </div>
        </div>

        <div className="pt-4 flex items-center justify-center gap-6 text-xs text-white/60 font-bold flex-wrap">
          <div className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-white/70" />
            <span>Average turnaround: 7–14 business days</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
            <span>Q3/Q4 Project Sprints Available</span>
          </div>
        </div>
      </div>
    </section>
  );
}
