"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Magnetic, Reveal } from "@/components/motion";

interface CrossLinkStripProps {
  heading: string;
  subtext?: string;
  buttonLabel: string;
  buttonHref: string;
  eyebrow?: string;
  chips?: string[];
  icon?: "layers" | "film" | "palette";
}

function VideoCinemaIcon() {
  return (
    <div className="relative w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-full h-full text-white"
      >
        <rect x="2" y="2" width="20" height="20" rx="4" stroke="currentColor" fill="rgba(255,255,255,0.08)" />
        <path d="M7 2v20" />
        <path d="M17 2v20" />
        <path d="M2 12h20" strokeOpacity="0.4" />
        <path d="M2 7h5" />
        <path d="M2 17h5" />
        <path d="M17 17h5" />
        <path d="M17 7h5" />
        <polygon points="10 8.5 15.5 12 10 15.5" fill="white" stroke="none" />
      </svg>
    </div>
  );
}

function BrandingLayersIcon() {
  return (
    <div className="relative w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-full h-full text-white"
      >
        <path
          d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"
          fill="rgba(255,255,255,0.2)"
        />
        <path d="m2 12 8.58 3.91a2 2 0 0 0 1.66 0L22 12" />
        <path d="m2 17 8.58 3.91a2 2 0 0 0 1.66 0L22 17" />
      </svg>
    </div>
  );
}

export function CrossLinkStrip({
  heading,
  subtext = "We engineer end-to-end creative ecosystems for ambitious brands.",
  buttonLabel,
  buttonHref,
  eyebrow = "CROSS-DISCIPLINE CAPABILITIES",
  chips,
  icon = "layers",
}: CrossLinkStripProps) {
  // Determine relevant bespoke icon
  const renderIcon = () => {
    if (icon === "film" || buttonHref.includes("video")) {
      return <VideoCinemaIcon />;
    }
    return <BrandingLayersIcon />;
  };

  return (
    <section className="relative w-full py-12 sm:py-18 bg-white text-ink select-none overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <Reveal>
          <div className="group relative bg-white hover:bg-surface-alt/40 border border-line hover:border-brand-red/35 rounded-lg p-5 sm:p-8 lg:p-10 transition-all duration-300 shadow-sm overflow-hidden flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            {/* Left Content Area */}
            <div className="max-w-3xl space-y-4">
              {/* Category Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-control bg-brand-red-50 border border-brand-red/20 text-brand-red text-xs font-black uppercase tracking-widest shadow-xs">
                <span className="w-2 h-2 rounded-full bg-brand-red shrink-0" />
                <span>{eyebrow}</span>
              </div>

              {/* Header with Jewel Icon */}
              <div className="flex items-start sm:items-center gap-4 sm:gap-5">
                <div className="relative shrink-0">
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-lg bg-[#8B1A1A] text-white flex items-center justify-center border border-[#8B1A1A]/40 transition-colors duration-200">
                    {renderIcon()}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-ink tracking-tight leading-snug">
                    {heading}
                  </h3>
                  <p className="text-xs sm:text-sm text-body/90 mt-1 font-normal leading-relaxed max-w-2xl">
                    {subtext}
                  </p>
                </div>
              </div>

              {/* Capability Chips */}
              {chips && chips.length > 0 && (
                <div className="pt-2 flex flex-wrap items-center gap-2">
                  {chips.map((chip, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center px-3 py-1 rounded-lg bg-surface-alt text-ink/80 text-xs font-semibold border border-line/80 group-hover:border-brand-red/20 group-hover:bg-white transition-colors"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Right Action Button Area */}
            <div className="flex flex-col sm:items-end justify-center shrink-0 w-full sm:w-auto">
              <Magnetic maxPull={8}>
                <Link
                  href={buttonHref}
                  className="group/btn inline-flex items-center justify-center gap-3 w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-lg bg-brand-red hover:bg-brand-redDark text-white text-xs sm:text-sm font-black uppercase tracking-wider shadow-sm transition-colors shrink-0 cursor-pointer"
                >
                  <span>{buttonLabel}</span>
                  <ArrowRight className="w-4 h-4 text-white transition-transform duration-300 ease-out group-hover/btn:translate-x-1.5" />
                </Link>
              </Magnetic>
              <span className="text-[11px] font-medium text-muted mt-2 sm:text-right hidden sm:block">
                Explore portfolio and case studies
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default CrossLinkStrip;
