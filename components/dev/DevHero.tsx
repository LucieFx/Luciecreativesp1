"use client";

import React from "react";
import Link from "next/link";
import { Code2, ArrowLeft, ArrowUpRight } from "lucide-react";
import { SplitText } from "@/components/motion";
import { DevHeroBrowserMock } from "./DevHeroBrowserMock";

const FEATURE_CHIPS = [
  { label: "Next.js 15 & TypeScript" },
  { label: "Sub-Second Latency" },
  { label: "Bespoke UI Architecture" },
  { label: "100% Mobile Responsive" },
];

export function DevHero() {

  const handleScrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      const lenis = (window as any).__lenis;
      if (lenis && typeof lenis.scrollTo === "function") {
        lenis.scrollTo("#websites-weve-built", { offset: -40, duration: 1.2 });
      } else {
        const target = document.getElementById("websites-weve-built");
        target?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section className="relative w-full pt-32 sm:pt-40 pb-16 lg:pb-24 bg-white text-text-primary overflow-hidden border-b border-line">
      {/* Background Dot Grid Pattern */}
      {null}
      {null}

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        {/* Navigation Breadcrumb */}
        <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted hover:text-brand-red transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform" />
            <span>Home</span>
          </Link>

          <span className="text-xs font-mono text-muted">
            Digital Engineering &amp; Architecture
          </span>
        </div>

        {/* Hero Header */}
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-brand-redLight border border-brand-red/20 text-[#8B1A1A] text-xs font-mono font-bold tracking-wider uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-red inline-block" />
            <span>Web Development</span>
          </div>

          <SplitText
            as="h1"
            className="text-4xl sm:text-6xl lg:text-7xl font-display font-black text-ink tracking-[-0.02em] leading-[1.0] text-balance"
            accentWords={["alive."]}
            accentClassName="font-accent italic text-brand-red text-[1.1em] tracking-normal inline"
          >
            Websites that feel *alive.*
          </SplitText>

          <p className="mt-6 text-base sm:text-xl font-medium text-body leading-relaxed max-w-2xl text-pretty">
            Fast, clean Next.js websites and web apps for brands that want more than a template.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-brand-red hover:bg-brand-redDark text-white font-bold text-sm tracking-wide transition-colors shadow-xs"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <button
              onClick={handleScrollToProjects}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border border-line bg-white hover:bg-brand-red-50 text-ink font-bold text-sm tracking-wide transition-colors cursor-pointer"
            >
              <span>See our work</span>
            </button>
          </div>

          {/* Feature Chips */}
          <div className="flex flex-wrap items-center gap-2 mt-8">
            {FEATURE_CHIPS.map((chip, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-100 border border-line text-xs font-mono font-bold text-body"
              >
                <span className="w-1 h-1 rounded-full bg-brand-red inline-block" />
                <span>{chip.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hero Visual: Self-Building Browser Window Mock */}
        <DevHeroBrowserMock />
      </div>
    </section>
  );
}
