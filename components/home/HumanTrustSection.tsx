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
    <section className="relative w-full py-16 sm:py-24 bg-white border-b border-line/80 select-none overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 overflow-visible">
        {/* Team Header with smooth blur fade up */}
        <Reveal delay={0} y={16} duration={0.65} className="flex flex-col items-center text-center mb-12 sm:mb-16 overflow-visible">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-[-0.02em] leading-[1.0] text-ink max-w-3xl text-balance">
            A small team,{" "}
            <span className="font-accent italic text-[#8b1a1a] font-normal">
              working directly with you
            </span>
          </h2>
          <p className="mt-4 text-[15px] sm:text-base md:text-[18px] text-slate-700 font-medium leading-relaxed max-w-2xl text-pretty">
            A small, focused studio working directly with you from discovery to delivery. No account managers or bloated handoffs.
          </p>
        </Reveal>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-20 sm:mb-24 overflow-visible">
          {TEAM_ROLES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.role} delay={idx * 0.1} duration={0.7} className="h-full overflow-visible">
                <div className="p-6 sm:p-8 rounded-card bg-white border border-line/90 shadow-xs hover:border-[#8b1a1a]/40 hover:shadow-lg hover:scale-[1.015] hover:-translate-y-1 transition-all duration-300 ease-out flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left h-full will-change-transform overflow-visible">
                  {/* Role Icon Box */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-control bg-brand-red-50 border border-brand-red/20 flex items-center justify-center text-[#8b1a1a] shrink-0 shadow-xs">
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

        {/* Testimonials Header with smooth blur fade up */}
        <Reveal delay={0} y={16} duration={0.65} className="flex flex-col items-center text-center mb-10 sm:mb-12 overflow-visible">
          <div className="mb-2 text-xs sm:text-sm font-semibold tracking-wider text-[#8b1a1a] uppercase">
            Client Feedback
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-black text-ink tracking-[-0.02em] leading-[1.0] text-balance">
            What clients say
          </h2>
          <p className="mt-3 text-[14px] sm:text-[15px] text-slate-600 max-w-xl">
            Feedback from recent collaborations across video, web, and graphic design.
          </p>
        </Reveal>
      </div>

      {/* Testimonials Continuous Marquee (Full Viewport Bleed) */}
      <div className="testimonials-marquee-wrapper py-2">
        <div className="testimonials-marquee-track">
          {/* Primary Track Set */}
          <div className="testimonials-marquee-group">
            {HOME_TESTIMONIALS.map((item) => (
              <div
                key={`testimonial-primary-${item.id}`}
                className="testimonials-marquee-card w-[280px] sm:w-[320px] lg:w-[380px] shrink-0 h-full flex flex-col justify-between p-6 sm:p-7 rounded-card bg-[#fbfcfd] border border-line/90 shadow-none hover:border-[#8b1a1a]/30 transition-colors duration-200 select-text"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <Quote className="w-5 h-5 text-[#8b1a1a]/70 shrink-0" aria-hidden="true" />
                    <span className="text-xs font-semibold text-slate-600 bg-white border border-line/80 px-2.5 py-0.5 rounded-control shadow-xs shrink-0">
                      {item.category}
                    </span>
                  </div>

                  <p className="text-[15px] text-slate-800 leading-[1.6] font-normal italic mb-6">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                <div className="mt-auto pt-4 border-t border-line/60">
                  <div className="font-bold text-ink text-[14px]">
                    {item.name}
                  </div>
                  <div className="text-slate-600 text-[13px] font-medium leading-snug mt-0.5">
                    {item.role}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Duplicate Track Set for Seamless Infinite Loop */}
          <div className="testimonials-marquee-group marquee-duplicate" aria-hidden="true">
            {HOME_TESTIMONIALS.map((item, idx) => (
              <div
                key={`testimonial-duplicate-${item.id}-${idx}`}
                tabIndex={-1}
                className="testimonials-marquee-card w-[280px] sm:w-[320px] lg:w-[380px] shrink-0 h-full flex flex-col justify-between p-6 sm:p-7 rounded-card bg-[#fbfcfd] border border-line/90 shadow-none hover:border-[#8b1a1a]/30 transition-colors duration-200 select-text"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <Quote className="w-5 h-5 text-[#8b1a1a]/70 shrink-0" aria-hidden="true" />
                    <span className="text-xs font-semibold text-slate-600 bg-white border border-line/80 px-2.5 py-0.5 rounded-control shadow-xs shrink-0">
                      {item.category}
                    </span>
                  </div>

                  <p className="text-[15px] text-slate-800 leading-[1.6] font-normal italic mb-6">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                <div className="mt-auto pt-4 border-t border-line/60">
                  <div className="font-bold text-ink text-[14px]">
                    {item.name}
                  </div>
                  <div className="text-slate-600 text-[13px] font-medium leading-snug mt-0.5">
                    {item.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HumanTrustSection;
