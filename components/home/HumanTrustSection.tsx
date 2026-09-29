"use client";

import React from "react";
import { Quote, PenTool, Code2 } from "lucide-react";
import { HOME_TESTIMONIALS } from "@/data/testimonials";
import { Reveal } from "@/components/motion";

const TEAM_ROLES = [
  {
    role: "Creative Lead",
    focus: "Leads visual design, branding systems, and video post-production.",
    icon: PenTool,
  },
  {
    role: "Technical Lead",
    focus: "Leads web development, interactive engineering, and technical systems.",
    icon: Code2,
  },
];

export function HumanTrustSection() {
  return (
    <section className="relative w-full py-16 sm:py-24 px-4 sm:px-6 md:px-12 bg-white border-b border-line/80 select-none">
      <div className="max-w-7xl mx-auto">
        {/* Team Header */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-[-0.02em] leading-[1.0] text-ink max-w-3xl text-balance">
            A small team,{" "}
            <span className="font-accent italic text-[#7A1F2B] font-normal">
              working directly with you
            </span>
          </h2>
          <p className="mt-4 text-[15px] sm:text-base md:text-[18px] text-slate-700 font-medium leading-relaxed max-w-2xl text-pretty">
            A small, focused studio working directly with you from discovery to delivery. No account managers or bloated handoffs.
          </p>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-20 sm:mb-24">
          {TEAM_ROLES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.role} delay={idx * 0.1} className="h-full">
                <div className="p-6 sm:p-8 rounded-2xl bg-white border border-line/90 shadow-xs hover:border-[#7A1F2B]/40 transition-colors flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left h-full">
                  {/* Role Icon Box */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-brand-red-50 border border-brand-red/20 flex items-center justify-center text-[#7A1F2B] shrink-0 shadow-xs">
                    <Icon className="w-7 h-7 sm:w-8 sm:h-8 stroke-[1.75]" />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl sm:text-2xl font-bold font-body text-ink tracking-tight mb-2">
                      {item.role}
                    </h3>
                    <p className="text-[14px] sm:text-[15px] text-slate-700 leading-relaxed font-normal">
                      {item.focus}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Testimonials Header */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-12">
          <div className="mb-2 text-xs sm:text-sm font-semibold tracking-wider text-[#7A1F2B] uppercase">
            Client Feedback
          </div>
          <h3 className="text-2xl sm:text-3xl font-display font-black text-ink tracking-[-0.02em] leading-[1.0] text-balance">
            What clients say
          </h3>
          <p className="mt-3 text-[14px] sm:text-[15px] text-slate-600 max-w-xl">
            Feedback from recent collaborations across video, web, and graphic design.
          </p>
        </div>

        {/* Testimonials Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {HOME_TESTIMONIALS.slice(0, 3).map((item, idx) => (
            <Reveal key={item.id} delay={idx * 0.1} className="h-full">
              <div className="p-6 sm:p-7 rounded-2xl bg-slate-50/60 border border-line/90 hover:bg-white hover:border-[#7A1F2B]/40 hover:shadow-xs transition-all duration-200 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <Quote className="w-5 h-5 text-[#7A1F2B]/70" />
                    <span className="text-xs font-semibold text-slate-600 bg-white border border-line/80 px-2.5 py-0.5 rounded-md shadow-xs">
                      {item.discipline}
                    </span>
                  </div>

                  <p className="text-[15px] text-slate-800 leading-relaxed font-normal italic mb-6">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-line/60">
                  <div className="font-bold text-ink text-[14px]">
                    {item.name}
                  </div>
                  <div className="text-slate-600 text-[13px] font-medium leading-snug mt-0.5">
                    {item.role}, {item.company}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HumanTrustSection;
