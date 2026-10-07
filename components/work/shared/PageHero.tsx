"use client";

import React, { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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
  timelineEditMotion?: boolean;
  graphicDesignMotion?: boolean;
  reelThumbnails?: { posterSrc: string; title?: string }[];
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
  timelineEditMotion = false,
  graphicDesignMotion = false,
  reelThumbnails = [],
}: PageHeroProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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

  // Words list for timeline edit jump-cuts
  const words = useMemo(() => {
    const prefixWords = headlinePrefix.trim().split(/\s+/);
    const accentWords = headlineItalicAccent.trim().split(/\s+/);
    const suffixWords = headlineSuffix.trim() ? headlineSuffix.trim().split(/\s+/) : [];

    return [
      ...prefixWords.map((w) => ({ text: w, isAccent: false })),
      ...accentWords.map((w) => ({ text: w, isAccent: true })),
      ...suffixWords.map((w) => ({ text: w, isAccent: false })),
    ];
  }, [headlinePrefix, headlineItalicAccent, headlineSuffix]);

  // Ensure the reel thumbnails list has enough items to fill any display edge-to-edge
  const loopThumbnails = useMemo(() => {
    if (!reelThumbnails || reelThumbnails.length === 0) return [];
    let list = [...reelThumbnails];
    while (list.length < 10) {
      list = [...list, ...reelThumbnails];
    }
    return list.slice(0, 10);
  }, [reelThumbnails]);

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

      {/* Subtle animated film grain overlay for video hero */}
      {timelineEditMotion && (
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[1] pointer-events-none opacity-[0.055] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      )}

      {/* Continuous background reel loop string for phone & display */}
      {timelineEditMotion && isMounted && loopThumbnails.length > 0 && (
        <div
          aria-hidden="true"
          className="hidden sm:block absolute inset-x-0 top-[35%] sm:top-1/2 -translate-y-1/2 z-[2] opacity-45 sm:opacity-50 pointer-events-none select-none overflow-hidden"
        >
          {/* Edge fade masks for seamless boundary transitions on wide display */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#8B1A1A] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#8B1A1A] to-transparent z-10 pointer-events-none" />

          {/* Seamless dual-track infinite loop */}
          <div className="flex w-max shrink-0">
            {/* Track 1 */}
            <div className="flex shrink-0 items-center gap-3 sm:gap-4 lg:gap-5 pr-3 sm:pr-4 lg:pr-5 animate-hero-reel-string will-change-transform">
              {loopThumbnails.map((thumb, tIdx) => (
                <div
                  key={`track1-${tIdx}`}
                  className="w-[76px] sm:w-24 md:w-28 lg:w-32 aspect-[9/16] rounded-xl sm:rounded-2xl overflow-hidden border border-white/25 bg-black/20 shadow-xl relative shrink-0"
                >
                  <Image
                    src={thumb.posterSrc}
                    alt={thumb.title || "Reel thumbnail"}
                    fill
                    loading="lazy"
                    sizes="(max-width: 640px) 76px, (max-width: 1024px) 112px, 128px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/15" />
                </div>
              ))}
            </div>

            {/* Track 2 (Exact Duplicate) */}
            <div
              aria-hidden="true"
              className="flex shrink-0 items-center gap-3 sm:gap-4 lg:gap-5 pr-3 sm:pr-4 lg:pr-5 animate-hero-reel-string will-change-transform"
            >
              {loopThumbnails.map((thumb, tIdx) => (
                <div
                  key={`track2-${tIdx}`}
                  className="w-[76px] sm:w-24 md:w-28 lg:w-32 aspect-[9/16] rounded-xl sm:rounded-2xl overflow-hidden border border-white/25 bg-black/20 shadow-xl relative shrink-0"
                >
                  <Image
                    src={thumb.posterSrc}
                    alt={thumb.title || "Reel thumbnail"}
                    fill
                    loading="lazy"
                    sizes="(max-width: 640px) 76px, (max-width: 1024px) 112px, 128px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/15" />
                </div>
              ))}
            </div>
          </div>

          <style jsx>{`
            @keyframes heroReelSlide {
              0% {
                transform: translate3d(0, 0, 0);
              }
              100% {
                transform: translate3d(-100%, 0, 0);
              }
            }
            .animate-hero-reel-string {
              animation: heroReelSlide 60s linear infinite;
            }
            @media (prefers-reduced-motion: reduce) {
              .animate-hero-reel-string {
                animation: none;
              }
            }
          `}</style>
        </div>
      )}

      {/* 2. Hero Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 border border-white/30 text-white/95 text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
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

          {timelineEditMotion && (
            <div
              className="relative w-full max-w-2xl h-[2px] mt-4 bg-white/15 overflow-visible rounded-full"
              aria-hidden="true"
            >
              <div className="absolute top-0 left-0 h-full w-full bg-[#FF4D5E] relative shadow-[0_0_10px_#FF4D5E]">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-1.5 h-3.5 bg-white rounded-xs shadow-md border border-[#FF4D5E]" />
              </div>
            </div>
          )}
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
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-line/60 text-[#8B1A1A] text-xs sm:text-sm font-semibold uppercase tracking-wider shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>{primaryButton.label}</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>

          <a
            href={secondaryButton.href}
            onClick={(e) => handleAnchorClick(e, secondaryButton.href)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/20 hover:bg-white/30 border border-white/35 text-white text-xs sm:text-sm font-semibold uppercase tracking-wider hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
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
              className="px-3.5 py-1.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/30 text-white text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer hover:border-white/50"
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
