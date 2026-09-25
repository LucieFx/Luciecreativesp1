"use client";

import React, { useState } from "react";
import Image from "next/image";
import { TESTIMONIALS_DATA } from "@/lib/constants";
import { SectionLabel } from "./ui/SectionLabel";
import { HandwrittenAnnotation } from "./ui/Doodles";
import { Star, CheckCircle2 } from "lucide-react";

export function Testimonials() {
  const [isPaused, setIsPaused] = useState(false);
  const items = [...TESTIMONIALS_DATA, ...TESTIMONIALS_DATA];

  return (
    <section
      className="py-24 md:py-36 bg-white relative overflow-hidden font-bold select-none border-b border-line/60"
    >
      {/* Background dot pattern */}
      <div className="absolute inset-0 dot-grid-pattern opacity-70 pointer-events-none" />

      {/* Atmospheric Depth Orb */}
      <div
        className="absolute top-1/4 right-1/3 w-[550px] h-[550px] bg-[#7A1F2B]/[0.05] rounded-full blur-[140px] pointer-events-none"
      />

      {/* Background Deep Watermark Numeral */}
      <div
        className="absolute right-8 top-12 text-[180px] sm:text-[240px] font-black text-line/70 select-none pointer-events-none leading-none -z-0 tracking-tighter"
      >
        03
      </div>

      {/* BACKGROUND S-CURVE PATH */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M -30 180 C 400 200, 750 500, 1080 480 C 1300 460, 1420 700, 1470 820"
          stroke="#7A1F2B"
          strokeWidth="2.8"
          strokeOpacity="0.18"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10 mb-14"
      >
        <SectionLabel number="03" text="VERIFIED PARTNER FEEDBACK" className="mb-8" />

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="font-black tracking-tight text-text-primary text-[clamp(2.2rem,5vw,4.5rem)] leading-[1.15] text-balance">
              Don&apos;t take our word for it. <br />
              <span className="text-brand-gradient pb-1 font-serif italic font-normal text-[1.08em] tracking-tight">
                See what partners say.
              </span>
            </h2>
          </div>

          <div className="relative">
            <div className="hidden sm:block absolute -top-8 right-2 pointer-events-none">
              <HandwrittenAnnotation
                text="? verified founders & CMO reviews"
                arrowDirection="left-down"
                color="#8B1A1A"
              />
            </div>
            <p className="text-text-secondary font-bold text-sm md:text-base max-w-md text-pretty">
              Real feedback from ambitious founders and leadership teams scaling their brand dominance with Lucie Creatives.
            </p>
          </div>
        </div>
      </div>

      {/* Infinite Continuous Right-Sliding Carousel Track with Edge Fade Masks */}
      <div
        className="relative w-full overflow-hidden select-none py-6 mask-fade-x"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className={`flex gap-7 w-max animate-marquee-reverse ${isPaused ? "[animation-play-state:paused]" : ""}`}
          style={{ animationDuration: "40s" }}
        >
          {items.map((t, idx) => (
            <div
              key={`${t.id}-${idx}`}
              className="group relative w-[340px] sm:w-[420px] backdrop-blur-xl bg-white/85 p-8 rounded-3xl border border-white/90 shadow-[0_20px_50px_rgba(0,0,0,0.06),0_0_1px_1px_rgba(255,255,255,0.8)] hover:border-[#7A1F2B]/30 hover:shadow-[0_25px_60px_-10px_rgba(122,31,43,0.15)] transition-all duration-300 flex flex-col justify-between flex-shrink-0 card-hover cursor-pointer overflow-visible"
            >
              {/* Taped Sticky Note */}
              <div
                className={`absolute -top-3.5 right-6 z-20 pointer-events-none transform ${t.rotation} group-hover:scale-105 transition-transform duration-300`}
              >
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-3 bg-white/70 backdrop-blur-xs border border-white/90 rotate-1 shadow-xs rounded-xs z-30" />
                <div
                  className={`px-2.5 py-1 rounded-lg border shadow-xs font-handwriting text-xs font-bold tracking-wide flex items-center gap-1 ${t.stickerBg}`}
                >
                  <span>{t.founderSticker}</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-5 pr-14">
                  <div className="flex items-center gap-1 text-brand-red">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-brand-red" />
                    ))}
                  </div>

                  <span className="text-[10px] font-black uppercase text-brand-purple bg-brand-purpleLight px-2 py-0.5 rounded-md border border-brand-purple/15">
                    {t.category}
                  </span>
                </div>

                <p className="text-text-primary text-sm sm:text-base font-bold leading-relaxed mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              {/* Avatar + Author Details */}
              <div className="pt-5 border-t border-line/60 flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-brand-purple/20 flex-shrink-0 shadow-sm relative">
                    <Image
                      src={t.avatar}
                      alt={`${t.clientName}, ${t.role} at ${t.company}`}
                      width={44}
                      height={44}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-black text-text-primary text-sm flex items-center gap-1">
                      {t.clientName}
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-purple fill-brand-purple text-white" />
                    </div>
                    <div className="text-xs text-text-tertiary font-bold">
                      {t.role} · {t.company}
                    </div>
                  </div>
                </div>

                <span className="text-[10px] font-bold text-brand-red bg-brand-red-50 px-2 py-0.5 rounded-full border border-brand-red/20">
                  Verified Partner
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
