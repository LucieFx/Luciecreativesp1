"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface AboutClosingCtaProps {
  primaryCtaLabel?: string;
}

export function AboutClosingCta({ primaryCtaLabel = "Start a Project" }: AboutClosingCtaProps) {
  return (
    <section className="relative w-full py-20 lg:py-28 bg-[#8B1A1A] text-white overflow-hidden select-none">
      <div className="max-w-5xl mx-auto px-6 sm:px-12 relative z-10 text-center">
        {/* Category Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-red-100 text-xs font-black tracking-widest uppercase mb-6 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-white inline-block" aria-hidden="true" />
          <span>Creative Partnership</span>
        </div>

        {/* Large Headline */}
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black text-white tracking-[-0.02em] leading-[1.0] text-balance">
          Let&apos;s engineer your brand&apos;s{" "}
          <span className="font-accent italic text-red-100 text-[1.1em] tracking-normal inline">
            market advantage
          </span>
          .
        </h2>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-xl font-bold text-red-100 max-w-2xl mx-auto leading-relaxed">
          Whether you need high-retention short-form video, commercial storytelling, or a sub-second web application, we are ready to sprint with you.
        </p>

        {/* In-page Primary CTA Button */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-lg bg-white hover:bg-slate-100 text-ink text-sm font-black tracking-wider uppercase transition-all shadow-md active:translate-y-px group"
          >
            <span>{primaryCtaLabel}</span>
            <ArrowRight className="w-4 h-4 text-[#8B1A1A] transition-transform group-hover:translate-x-0.5" />
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
              className="px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-colors"
            >
              Graphic Design →
            </Link>
            <Link
              href="/video-editing"
              className="px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-colors"
            >
              Video Editing →
            </Link>
            <Link
              href="/web-development"
              className="px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-colors"
            >
              Web Development →
            </Link>
            <Link
              href="/gujarat"
              className="px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-colors"
            >
              Gujarat Hub →
            </Link>
            <Link
              href="/ahmedabad"
              className="px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-colors"
            >
              Ahmedabad Hub →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
