"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

interface AboutClosingCtaProps {
  primaryCtaLabel?: string;
}

export function AboutClosingCta({ primaryCtaLabel = "Start a Project" }: AboutClosingCtaProps) {
  return (
    <section className="relative w-full py-24 lg:py-32 bg-[#8B1A1A] text-white overflow-hidden select-none">
      {/* Ambient Radial Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-white/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 sm:px-12 relative z-10 text-center">
        {/* Category Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-red-100 text-xs font-black tracking-widest uppercase mb-6 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-red-200" />
          <span>Creative Partnership</span>
        </div>

        {/* Large Headline with Editorial Serif Accent */}
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08]">
          Let&apos;s engineer your brand&apos;s{" "}
          <span className="font-serif italic font-normal text-red-100">
            unfair advantage
          </span>
          .
        </h2>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-xl font-bold text-red-100 max-w-2xl mx-auto leading-relaxed">
          Whether you need viral short-form retention, cinema-grade commercial storytelling, or a sub-second web application — we are ready to sprint with you.
        </p>

        {/* 
          In-page Primary CTA Button
        */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white hover:bg-slate-100 text-ink text-sm font-black tracking-wider uppercase transition-all shadow-xl hover:scale-105 active:scale-95 group"
          >
            <span>{primaryCtaLabel}</span>
            <ArrowRight className="w-4 h-4 text-[#8B1A1A] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Exploratory Cross-Links */}
        <div className="mt-12 pt-8 border-t border-white/15 max-w-2xl mx-auto text-xs text-red-100 font-medium space-y-3">
          <p className="font-bold uppercase tracking-wider text-red-200 text-[11px]">
            Explore Our Work, Services &amp; Hubs:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Link
              href="/graphic-design"
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-colors"
            >
              Graphic Design →
            </Link>
            <Link
              href="/video-editing"
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-colors"
            >
              Video Editing →
            </Link>
            <Link
              href="/web-development"
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-colors"
            >
              Web Development →
            </Link>
            <Link
              href="/gujarat"
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-colors"
            >
              Gujarat Hub →
            </Link>
            <Link
              href="/ahmedabad"
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-colors"
            >
              Ahmedabad Hub →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
