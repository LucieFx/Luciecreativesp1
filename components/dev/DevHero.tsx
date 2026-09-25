"use client";

import React from "react";
import Link from "next/link";
import { Code2, ArrowLeft, ArrowUpRight } from "lucide-react";
import { SplitText } from "@/components/motion";
import { DevHeroBrowserMock } from "./DevHeroBrowserMock";

const FEATURE_CHIPS = [
  { label: "Next.js 15 & TypeScript", icon: "⚡" },
  { label: "Sub-Second Latency", icon: "⏱️" },
  { label: "Bespoke UI Architecture", icon: "💎" },
  { label: "100% Mobile Responsive", icon: "📱" },
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
      <div className="absolute inset-0 dot-grid-pattern opacity-50 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-brand-red/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        {/* Navigation Breadcrumb */}
        <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-muted hover:text-brand-red transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Home</span>
          </Link>

          <span className="text-xs font-mono text-muted">
            Digital Engineering &amp; Architecture
          </span>
        </div>

        {/* Hero Header */}
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-redLight border border-brand-red/20 text-brand-red text-xs font-black tracking-widest uppercase mb-6">
            <Code2 className="w-3.5 h-3.5" />
            <span>WEB DEVELOPMENT</span>
          </div>

          <SplitText
            as="h1"
            className="text-4xl sm:text-6xl lg:text-7xl font-black text-ink tracking-tight leading-[1.08]"
            accentWords={["alive."]}
            accentClassName="text-brand-red font-serif italic lowercase font-normal text-[1.08em]"
          >
            Websites that feel *alive.*
          </SplitText>

          <p className="mt-6 text-base sm:text-xl font-bold text-body leading-relaxed max-w-2xl text-pretty">
            Fast, clean Next.js websites and web apps for brands that want more than a template.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-brand-red hover:bg-brand-redDark text-white font-bold text-sm tracking-wide transition-all shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Start a project</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <button
              onClick={handleScrollToProjects}
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full border border-line hover:border-slate-400 bg-white hover:bg-brand-red-50 text-ink font-bold text-sm tracking-wide transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>See our work</span>
            </button>
          </div>

          {/* Feature Chips */}
          <div className="flex flex-wrap items-center gap-2 mt-8">
            {FEATURE_CHIPS.map((chip, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 border border-line text-xs font-mono font-bold text-body"
              >
                <span>{chip.icon}</span>
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
