"use client";

import React, { useState } from "react";
import { getActiveTestimonials, type Testimonial } from "@/lib/testimonials";
import { SectionLabel } from "./ui/SectionLabel";

function getInitials(company: string, name: string): string {
  const source = company.trim() || name.trim() || "LC";
  const words = source.split(/\s+/).filter(Boolean);
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return source.slice(0, 2).toUpperCase();
}

export function Testimonials() {
  const [isPaused, setIsPaused] = useState(false);
  const testimonials = getActiveTestimonials();

  // If no active (or non-placeholder) testimonials exist in production,
  // return null cleanly without breaking page flow or leaving blank space.
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  // Duplicate list for infinite smooth marquee track
  const items = testimonials.length < 6 ? [...testimonials, ...testimonials, ...testimonials] : [...testimonials, ...testimonials];

  return (
    <section
      id="testimonials"
      className="py-20 md:py-28 bg-white relative overflow-hidden font-bold select-none border-b border-line/60"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10 mb-12">
        <SectionLabel number="03" text="PARTNER FEEDBACK" className="mb-6" />

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="font-display font-black tracking-[-0.02em] text-text-primary text-[clamp(2rem,4vw,3.5rem)] leading-[1.0] text-balance">
              Client reviews &amp; <br />
              <span className="font-accent italic text-[#8B1A1A] text-[1.1em] tracking-normal inline">
                collaborative feedback.
              </span>
            </h2>
          </div>

          <p className="text-text-secondary font-medium text-sm md:text-base max-w-md text-pretty">
            Feedback and notes from teams collaborating with Lucie Creatives across brand, short-form, and digital engineering.
          </p>
        </div>
      </div>

      {/* Marquee Carousel Track */}
      <div
        className="relative w-full overflow-hidden select-none py-4 mask-fade-x"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className={`flex gap-6 w-max animate-marquee-reverse ${isPaused ? "[animation-play-state:paused]" : ""}`}
          style={{ animationDuration: "35s" }}
        >
          {items.map((t: Testimonial, idx: number) => {
            const initials = getInitials(t.company, t.name);
            return (
              <div
                key={`${t.id}-${idx}`}
                className="group relative w-[320px] sm:w-[380px] bg-white p-7 rounded-2xl border border-line/90 shadow-xs hover:border-[#8b1a1a]/40 transition-colors duration-200 flex flex-col justify-between flex-shrink-0"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-[#8B1A1A] tracking-wider uppercase">
                      {t.company}
                    </span>
                    {t.isPlaceholder && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-sm bg-amber-50 text-amber-800 border border-amber-200">
                        Dev Placeholder
                      </span>
                    )}
                  </div>

                  <p className="text-text-primary text-sm sm:text-base font-normal leading-relaxed mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                {/* Author Info with Company Monogram Circle */}
                <div className="pt-4 border-t border-line/60 flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full bg-brand-redLight border border-brand-red/20 text-[#8B1A1A] font-bold text-xs flex items-center justify-center font-mono tracking-wider shrink-0"
                    aria-label={`Initials for ${t.company}`}
                  >
                    {initials}
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-text-primary text-sm truncate">
                      {t.name}
                    </div>
                    <div className="text-xs text-text-tertiary font-medium truncate">
                      {t.role} · {t.company}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
