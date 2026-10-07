"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { MagneticButton } from "./ui/MagneticButton";
import { StackedAdaptiveCards } from "./home/StackedAdaptiveCards";
import { HeroShowcaseErrorBoundary } from "./home/HeroShowcaseErrorBoundary";
import { HeroOrbit } from "./home/HeroOrbit";
import { HeroNotificationStack } from "./home/HeroNotificationStack";

interface HeroProps {
  primaryCtaLabel?: string;
}

export function Hero({ primaryCtaLabel = "Start a project" }: HeroProps = {}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      style={{ overflowX: "clip", overflowY: "visible" }}
      className="relative bg-white pt-24 md:pt-32 pb-14 md:pb-20 px-4 sm:px-6 md:px-12 overflow-visible font-sans font-normal"
    >
      {/* (A) Background Orbit Layer: 4 concentric circles, rotating highlight arcs & 8 service chips */}
      <HeroOrbit />

      {/* Main Grid: Split Layout (Narrative & Notification Stack on Left, Phone Showcase on Right) */}
      <div className="max-w-7xl mx-auto w-full relative z-10 pt-2 pb-0 overflow-visible">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center overflow-visible">
          {/* LEFT COLUMN: Agency Narrative & Actions */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left z-10 overflow-visible min-h-[375px] sm:min-h-0">
            {/* Eyebrow: Simple, clean service discipline indicator */}
            <motion.div
              className="mb-4 text-xs sm:text-sm font-semibold tracking-wider text-[#8b1a1a] uppercase min-h-[32px] sm:min-h-0 flex items-center"
              style={{ contain: "layout style" }}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { delay: 0.8, duration: 0.45, ease: [0.16, 1, 0.3, 1] }
              }
            >
              Video Editing · Graphic Design · Web Development
            </motion.div>

            {/* Single H1 on the page: "Boring gets scrolled past." */}
            <motion.h1
              className="tracking-[-0.02em] text-text-primary mb-4 text-balance font-display font-semibold text-[clamp(2.1rem,6vw,4.8rem)] leading-[1.05]"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { delay: 0.95, duration: 0.5, ease: [0.16, 1, 0.3, 1] }
              }
            >
              <span className="inline-block mr-3">Boring</span>
              <span className="inline-block mr-3">gets</span>
              <span className="font-accent italic text-[#8B1A1A] text-[1.1em] tracking-normal inline">
                scrolled past.
              </span>
            </motion.h1>

            {/* Subhead: at least 18px with strong contrast */}
            <motion.p
              className="max-w-xl text-[18px] sm:text-[20px] text-slate-700 font-medium leading-relaxed mb-8 text-pretty"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { delay: 1.1, duration: 0.45, ease: [0.16, 1, 0.3, 1] }
              }
            >
              Video editing, graphic design and web development for brands that want to be noticed.
            </motion.p>

            {/* Action Buttons: "Start a project" & "See our work" */}
            <motion.div
              className="flex flex-col sm:flex-row items-center gap-3.5 sm:gap-4 w-full sm:w-auto"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { delay: 1.25, duration: 0.45, ease: [0.16, 1, 0.3, 1] }
              }
            >
              <MagneticButton
                href="/contact"
                variant="primary"
                size="lg"
                className="w-full sm:w-auto px-6 sm:px-7 py-3.5 text-sm sm:text-base font-semibold rounded-2xl shadow-red-btn !bg-[#8b1a1a] hover:!bg-[#8b1a1a]/90 hover:scale-[1.02] transition-transform"
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
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-semibold rounded-2xl border-2 border-slate-900/15 hover:border-slate-900/40 text-ink bg-transparent hover:bg-red-50/50 hover:scale-[1.02] transition-all cursor-pointer"
              >
                <span>See our work</span>
                <ArrowRight className="w-4 h-4 text-slate-700" />
              </a>
            </motion.div>

            {/* Floating Info Cards Stack (Deflexai reference style) */}
            <HeroNotificationStack />
          </div>

          {/* RIGHT COLUMN: Stacked Adaptive Cards Showcase */}
          <motion.div
            className="lg:col-span-5 flex flex-col items-center justify-center z-20 w-full overflow-visible min-h-[520px] sm:min-h-[580px] md:min-h-[650px]"
            style={{ contain: "layout style" }}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { delay: 1.0, duration: 0.6, ease: [0.16, 1, 0.3, 1] }
            }
          >
            <HeroShowcaseErrorBoundary>
              <StackedAdaptiveCards />
            </HeroShowcaseErrorBoundary>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
