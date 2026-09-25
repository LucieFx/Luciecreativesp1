"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { MagneticButton } from "./ui/MagneticButton";
import { StackedAdaptiveCards } from "./home/StackedAdaptiveCards";
import { HeroShowcaseErrorBoundary } from "./home/HeroShowcaseErrorBoundary";
import { HERO_EYEBROW, HERO_SUB } from "@/lib/constants";

interface HeroProps {
  primaryCtaLabel?: string;
}

export function Hero({ primaryCtaLabel = "Start a project" }: HeroProps = {}) {
  return (
    <section
      style={{ overflowX: "clip", overflowY: "visible" }}
      className="relative bg-white pt-24 md:pt-32 pb-14 md:pb-20 px-4 sm:px-6 md:px-12 overflow-visible font-sans font-normal"
    >
      {/* Background Dot Matrix Pattern */}
      <div
        className="absolute inset-0 dot-grid-pattern dot-grid-radial-mask pointer-events-none opacity-60"
      />

      {/* Atmospheric Floating Depth Orb */}
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-[#7A1F2B]/[0.04] rounded-full blur-[140px] pointer-events-none" />

      {/* Background S-Curve Line */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M -40 50 C 180 70 280 230 520 235 C 780 240 940 430 1140 580 C 1280 685 1380 770 1480 840"
          stroke="#7A1F2B"
          strokeWidth="2.4"
          strokeOpacity={0.15}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Main Grid: Split Layout (Headline & Narrative on Left, Boring vs Ours on Right) */}
      <div className="max-w-7xl mx-auto w-full relative z-10 pt-2 pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* LEFT COLUMN: Agency Narrative & Actions */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left z-10">
            {/* Eyebrow: visible, small caps, above the H1 */}
            <div className="mb-4 text-xs sm:text-[13px] font-mono font-bold tracking-widest text-[#7A1F2B] uppercase [font-variant-caps:all-small-caps]">
              {HERO_EYEBROW}
            </div>

            {/* Single H1 on the page: "Boring gets scrolled past." */}
            <h1 className="tracking-tight text-text-primary mb-4 text-balance font-sans font-black text-[clamp(2.1rem,6vw,4.8rem)] leading-[1.06]">
              <span className="inline-block mr-3">Boring</span>
              <span className="inline-block mr-3">gets</span>
              <span className="font-serif italic font-normal text-[#7A1F2B] inline-block">
                scrolled past.
              </span>
            </h1>

            {/* Subhead */}
            <p className="max-w-xl text-base sm:text-lg text-text-secondary font-medium leading-relaxed mb-8 text-pretty">
              {HERO_SUB}
            </p>

            {/* Action Buttons: "Start a project" & "See our work" */}
            <div className="flex flex-col sm:flex-row items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
              <MagneticButton
                href="/contact"
                variant="primary"
                size="lg"
                className="w-full sm:w-auto px-6 sm:px-7 py-3.5 text-sm sm:text-base font-black rounded-2xl shadow-red-btn !bg-[#7A1F2B] hover:!bg-[#631923]"
              >
                <span>{primaryCtaLabel}</span>
              </MagneticButton>

              <a
                href="#portfolio"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById("portfolio");
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth" });
                  } else {
                    window.location.hash = "portfolio";
                  }
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-bold rounded-2xl border-2 border-slate-900/15 hover:border-slate-900/40 text-ink bg-transparent hover:bg-brand-red-50 transition-all cursor-pointer"
              >
                <span>See our work</span>
                <ArrowRight className="w-4 h-4 text-body" />
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN: Stacked Adaptive Cards Showcase (with 2D Static Fallback Error Boundary) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center z-20 w-full">
            <HeroShowcaseErrorBoundary>
              <StackedAdaptiveCards />
            </HeroShowcaseErrorBoundary>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
