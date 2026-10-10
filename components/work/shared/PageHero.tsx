"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowDown } from "lucide-react";

export interface HeroChip {
  label: string;
  href?: string;
  icon?: string;
}

export interface PageHeroProps {
  badge: string;
  headlinePrefix: string;
  headlineItalicAccent: string;
  headlineSuffix?: string;
  subheadline: string;
  chips: HeroChip[];
  primaryButton: {
    label: string;
    href: string;
  };
  secondaryButton: {
    label: string;
    href: string;
  };
  graphicDesignMotion?: boolean;
}

export function PageHero({
  badge,
  headlinePrefix,
  headlineItalicAccent,
  headlineSuffix = "",
  subheadline,
  chips,
  primaryButton,
  secondaryButton,
  graphicDesignMotion = false,
}: PageHeroProps) {
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section className="relative w-full min-h-[680px] sm:min-h-[620px] lg:h-[76vh] lg:max-h-[740px] overflow-hidden bg-[#8B1A1A] flex flex-col justify-start select-none pt-28 pb-10 sm:pb-14">
      {/* 1. Solid Red Background with Subtle Depth Vignette */}
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

      {/* 2. Hero Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-control bg-white/20 border border-white/30 text-white/95 text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span>{badge}</span>
        </div>

        {/* Primary H1: Instant High-Impact SSR Typography */}
        <div
          className="max-w-4xl overflow-visible min-h-[110px] sm:min-h-[100px] lg:min-h-[140px]"
          style={{ contain: "layout style" }}
        >
          <h1 className="text-white font-display font-black tracking-[-0.02em] leading-[1.0] text-[clamp(2.1rem,6.4vw,5.5rem)] text-balance">
            {headlinePrefix}{" "}
            <span className="font-accent italic text-white text-[1.1em] tracking-normal inline">
              {headlineItalicAccent}
            </span>
            {headlineSuffix && ` ${headlineSuffix}`}
          </h1>
        </div>

        {/* Subheadline */}
        <p
          className="mt-4 text-sm sm:text-base text-white/80 font-medium max-w-xl text-balance min-h-[48px] sm:min-h-0"
          style={{ contain: "layout style" }}
        >
          {subheadline}
        </p>

        {/* Two Buttons: Primary CTA + Anchor Scroll */}
        <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <Link
            href={primaryButton.href}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-control bg-white hover:bg-line/60 text-[#8B1A1A] text-xs sm:text-sm font-semibold uppercase tracking-wider shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>{primaryButton.label}</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>

          <a
            href={secondaryButton.href}
            onClick={(e) => handleAnchorClick(e, secondaryButton.href)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-control bg-white/20 hover:bg-white/30 border border-white/35 text-white text-xs sm:text-sm font-semibold uppercase tracking-wider hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>{secondaryButton.label}</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Chips: Clean, stable chips */}
        <div className="mt-6 flex flex-wrap items-center gap-2 sm:gap-2.5">
          {chips.map((chip, idx) => (
            <a
              key={idx}
              href={chip.href || "#"}
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                if (chip.href) handleAnchorClick(e, chip.href);
              }}
              className="px-3.5 py-1.5 rounded-control bg-white/15 hover:bg-white/25 border border-white/30 text-white text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer hover:border-white/50"
            >
              {chip.icon && <span>{chip.icon}</span>}
              <span>{chip.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
