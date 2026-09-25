"use client";

import React from "react";
import Link from "next/link";
import { Factory, ShoppingBag, TrendingUp, ArrowRight, ArrowUpRight } from "lucide-react";
import { SplitText } from "@/components/motion";
import { m, useReducedMotion } from "framer-motion";
import { VIEWPORT, DURATION, EASE_OUT } from "@/lib/motion";

const HIGHLIGHT_SECTORS = [
  {
    icon: Factory,
    title: "Industrial & Manufacturing",
    summary: "Machinery catalogs, export packaging dielines & factory cinema films.",
    badge: "Gujarat Statewide",
  },
  {
    icon: ShoppingBag,
    title: "D2C, Fashion & Luxury",
    summary: "Headless e-commerce, viral short-form 9:16 reels & lookbooks.",
    badge: "Surat & Ahmedabad",
  },
  {
    icon: TrendingUp,
    title: "Fintech, SaaS & Startups",
    summary: "Institutional UI/UX, investor pitch decks & 48h MVP sprints.",
    badge: "GIFT City & Global",
  },
];

export function IndustriesCondensedStrip() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative w-full py-16 sm:py-20 px-4 sm:px-6 md:px-12 bg-white/70 border-b border-line/80 select-none">
      <div className="max-w-7xl mx-auto">
        {/* Top Header & Link to Full Dedicated Industries Page */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-[11px] font-black uppercase tracking-widest text-[#7A1F2B] mb-2">
              Commercial Specialization
            </div>
            <SplitText
              as="h2"
              className="text-2xl sm:text-3xl lg:text-4xl font-black text-ink tracking-tight"
              accentWords={["accelerate.", "accelerate"]}
              accentClassName="text-[#7A1F2B] font-serif italic lowercase font-normal text-[1.08em]"
            >
              Industries We *accelerate.*
            </SplitText>
          </div>

          <Link
            href="/industries"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-black text-[#7A1F2B] hover:text-[#5c1720] transition-colors group"
          >
            <span>Explore All 6 Commercial Sectors</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* 3-Item Highlight Row: Staggers in from the left */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {HIGHLIGHT_SECTORS.map((sector, idx) => {
            const Icon = sector.icon;
            return (
              <m.div
                key={idx}
                initial={shouldReduceMotion ? undefined : { opacity: 0, x: -32 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
                viewport={VIEWPORT}
                transition={{
                  duration: DURATION.base,
                  delay: idx * 0.12,
                  ease: EASE_OUT,
                }}
                className="h-full"
              >
                <Link
                  href="/industries"
                  className="group p-6 rounded-2xl bg-white border border-line/90 shadow-2xs hover:shadow-md hover:border-[#7A1F2B]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-black uppercase tracking-wider text-muted bg-slate-100 px-2.5 py-0.5 rounded-full border border-line/60">
                        {sector.badge}
                      </span>
                      <div className="w-8 h-8 rounded-xl bg-red-50 text-[#7A1F2B] flex items-center justify-center group-hover:bg-[#7A1F2B] group-hover:text-white transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>
                    <h3 className="text-base sm:text-lg font-black text-ink mb-2 group-hover:text-[#7A1F2B] transition-colors relative inline-block">
                      <span>{sector.title}</span>
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#7A1F2B] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]" />
                    </h3>
                    <p className="text-xs text-body font-medium leading-relaxed">
                      {sector.summary}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-line/60 flex items-center gap-1 text-xs font-black text-[#7A1F2B]">
                    <span className="relative inline-block">
                      <span>View sector solutions</span>
                      <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#7A1F2B] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]" />
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </m.div>
            );
          })}
        </div>

        {/* Condensed One-Line Strip Linking to /industries */}
        <Link
          href="/industries"
          className="group flex flex-col sm:flex-row items-center justify-between gap-3 p-4 sm:p-5 rounded-2xl bg-white border border-line hover:border-[#7A1F2B]/40 hover:bg-red-50/30 transition-all shadow-xs"
        >
          <div className="flex items-center gap-2.5 text-center sm:text-left">
            <span className="w-2 h-2 rounded-full bg-[#7A1F2B] shrink-0" />
            <span className="text-xs sm:text-sm font-bold text-ink">
              Trusted across <strong className="font-black text-ink">Manufacturing</strong>,{" "}
              <strong className="font-black text-ink">D2C</strong>,{" "}
              <strong className="font-black text-ink">Fintech</strong>,{" "}
              <strong className="font-black text-ink">Healthcare</strong>,{" "}
              <strong className="font-black text-ink">SaaS &amp; more</strong>
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs font-black text-[#7A1F2B] group-hover:translate-x-1 transition-transform shrink-0">
            <span>Explore Full Sector Breakdown</span>
            <ArrowRight className="w-4 h-4" />
          </span>
        </Link>
      </div>
    </section>
  );
}
