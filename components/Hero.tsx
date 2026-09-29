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
      {null}

      {/* Atmospheric Floating Depth Orb */}
      {null}

      {/* Main Grid: Split Layout (Headline & Narrative on Left, Phone Showcase on Right) */}
      <div className="max-w-7xl mx-auto w-full relative z-10 pt-2 pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* LEFT COLUMN: Agency Narrative & Actions */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left z-10">
            {/* Eyebrow: Simple, clean service discipline indicator */}
            <div className="mb-4 text-xs sm:text-sm font-semibold tracking-wider text-[#7A1F2B] uppercase">
              Video Editing · Graphic Design · Web Development
            </div>

            {/* Single H1 on the page: "Boring gets scrolled past." */}
            <h1 className="tracking-[-0.02em] text-text-primary mb-4 text-balance font-display font-black text-[clamp(2.1rem,6vw,4.8rem)] leading-[1.0]">
              <span className="inline-block mr-3">Boring</span>
              <span className="inline-block mr-3">gets</span>
              <span className="font-accent italic text-[#8B1A1A] text-[1.1em] tracking-normal inline-block">
                scrolled past.
              </span>
            </h1>

            {/* Subhead: at least 18px with strong contrast */}
            <p className="max-w-xl text-[18px] sm:text-[20px] text-slate-700 font-medium leading-relaxed mb-8 text-pretty">
              Video editing, graphic design and web development for brands that want to be noticed.
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
