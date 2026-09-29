"use client";

import React from "react";
import Link from "next/link";
import { Building2, Palmtree, ShoppingBag, ArrowRight, ArrowUpRight } from "lucide-react";
import { m, useReducedMotion } from "framer-motion";
import { VIEWPORT, DURATION, EASE_OUT } from "@/lib/motion";

const HIGHLIGHT_SECTORS = [
  {
    icon: Building2,
    title: "Real estate & architecture",
    summary: "Property walkthrough videos, architectural photo framing, and custom luxury websites.",
    badge: "Real Estate",
  },
  {
    icon: Palmtree,
    title: "Hospitality & resorts",
    summary: "Promotional resort films, seasonal event collateral, and social media video content.",
    badge: "Hospitality",
  },
  {
    icon: ShoppingBag,
    title: "Jewelry, retail & D2C",
    summary: "Packaging design, product launch reels, print lookbooks, and brand identity systems.",
    badge: "D2C & Retail",
  },
];

export function IndustriesCondensedStrip() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative w-full py-16 sm:py-24 px-4 sm:px-6 md:px-12 bg-white border-b border-line/80 select-none">
      <div className="max-w-7xl mx-auto">
        {/* Top Header & Link to Full Dedicated Industries Page */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="mb-2 text-xs sm:text-sm font-semibold tracking-wider text-[#7A1F2B] uppercase">
              Industries
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black text-ink tracking-[-0.02em] leading-[1.0] text-balance">
              Industries we work with
            </h2>
          </div>

          <Link
            href="/industries"
            className="inline-flex items-center gap-1.5 text-[14px] sm:text-[15px] font-bold text-[#7A1F2B] hover:text-[#5c1720] transition-colors group"
          >
            <span>Explore industries</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* 3-Item Highlight Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {HIGHLIGHT_SECTORS.map((sector, idx) => {
            const Icon = sector.icon;
            return (
              <m.div
                key={idx}
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 16 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{
                  duration: DURATION.base,
                  delay: idx * 0.1,
                  ease: EASE_OUT,
                }}
                className="h-full"
              >
                <Link
                  href="/industries"
                  className="group p-6 sm:p-7 rounded-2xl bg-white border border-line/90 shadow-xs hover:shadow-md hover:border-[#7A1F2B]/40 transition-all duration-300 flex flex-col justify-between h-full"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1 rounded-full border border-line/70">
                        {sector.badge}
                      </span>
                      <div className="w-9 h-9 rounded-xl bg-red-50 text-[#7A1F2B] flex items-center justify-center group-hover:bg-[#7A1F2B] group-hover:text-white transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-ink mb-2.5 group-hover:text-[#7A1F2B] transition-colors">
                      {sector.title}
                    </h3>
                    <p className="text-[14px] sm:text-[15px] text-slate-700 font-normal leading-relaxed">
                      {sector.summary}
                    </p>
                  </div>
                  <div className="pt-4 mt-6 border-t border-line/60 flex items-center gap-1.5 text-[14px] font-bold text-[#7A1F2B]">
                    <span>View solutions</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </m.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default IndustriesCondensedStrip;
