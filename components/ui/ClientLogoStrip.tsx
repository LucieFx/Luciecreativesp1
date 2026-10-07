import React from "react";
import { SITE_STATS } from "@/lib/site-stats";
import { AGENCY_STATS } from "@/lib/stats";
import { Marquee, CountUp } from "@/components/motion";

/**
 * Easy-to-edit heading constant for the client reels & short-form showcase strip.
 * Can be updated later when commercial/campaign videos are added.
 */
export const CLIENT_LOGOS_HEADING = "Brands we've made content for.";

interface ClientLogo {
  name: string;
  category: string;
  tagline: string;
  fontClass: string;
}

const CLIENT_LOGOS: ClientLogo[] = [
  { name: "SAMSUNG", category: "TECH", tagline: "Consumer Tech", fontClass: "font-sans font-black tracking-widest text-sm" },
  { name: "ADANI", category: "ENTERPRISE", tagline: "Infrastructure", fontClass: "font-sans font-black tracking-wider text-sm" },
  { name: "NIRVA CLUB", category: "RESORT", tagline: "Hospitality & Leisure", fontClass: "font-sans font-bold tracking-wider text-sm" },
  { name: "VEDAM VILLAS", category: "LIVING", tagline: "Luxury Real Estate", fontClass: "font-sans font-bold tracking-wide text-sm" },
  { name: "SPECZO", category: "OPTICS", tagline: "Luxury Eyewear", fontClass: "font-sans font-black tracking-[0.2em] text-xs" },
  { name: "ONIRIQUE", category: "PARFUMS", tagline: "Haute Fragrance", fontClass: "font-sans font-bold tracking-wider text-sm" },
  { name: "RHYME JEWELS", category: "JEWELRY", tagline: "Fine Jewelry", fontClass: "font-sans font-bold tracking-wide text-sm" },
  { name: "NANDANVAN", category: "REALTY", tagline: "Architectural Realty", fontClass: "font-sans font-bold tracking-wider text-sm" },
  { name: "AMBICA", category: "INTERIOR", tagline: "Interior Gallery", fontClass: "font-sans font-bold tracking-wide text-sm" },
  { name: "LOVE BEAUTY & PLANET", category: "CARE", tagline: "Clean Beauty", fontClass: "font-sans font-extrabold tracking-tight text-xs" },
  { name: "SOUL REGALTOS", category: "ESPORTS", tagline: "Creator Ecosystem", fontClass: "font-sans font-black tracking-tight text-sm" },
  { name: "PCFITMENT", category: "AUTO", tagline: "Automotive Cloud", fontClass: "font-sans font-bold tracking-wider text-sm" },
];

export function ClientLogoStrip() {
  return (
    <section
      className="relative w-full py-12 sm:py-16 bg-white border-y border-line/80 overflow-hidden font-sans font-normal select-none"
    >
      <div className="max-w-7xl mx-auto px-6 mb-6 flex items-center justify-center text-center">
        <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider text-slate-700 uppercase font-sans">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-red inline-block" aria-hidden="true" />
          <span>{CLIENT_LOGOS_HEADING}</span>
        </div>
      </div>

      {/* Infinite Smooth Marquee with Edge Fades */}
      <div className="relative w-full overflow-hidden flex items-center">
        {/* Left & Right Edge Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <Marquee speed={40} pauseOnHover={true} gapClassName="gap-6 md:gap-8">
          {CLIENT_LOGOS.map((client, idx) => (
            <div
              key={`${client.name}-${idx}`}
              className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-slate-50/80 border border-line/80 hover:border-brand-red/40 hover:bg-white transition-all duration-200 cursor-default group/logo"
            >
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-2 leading-none">
                  <span className={`${client.fontClass} text-slate-800 group-hover/logo:text-brand-red transition-colors`}>
                    {client.name}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500 tracking-wider">
                    {client.category}
                  </span>
                </div>
                <span className="text-xs text-slate-600 mt-1 font-medium">
                  {client.tagline}
                </span>
              </div>
            </div>
          ))}
        </Marquee>
      </div>

      {/* Stats Band: 3 Verified Metrics */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-10 pt-8 sm:pt-10 border-t border-line/80">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          {[
            { value: "63M+", label: "Views generated" },
            { value: "14+", label: "Brands worked with" },
            { value: "12+", label: "Websites delivered" },
          ].map((stat, sIdx) => (
            <div
              key={sIdx}
              className="flex flex-col items-center sm:items-start justify-center gap-1.5 p-4 rounded-xl bg-slate-50/50 sm:bg-transparent border border-line/60 sm:border-0 text-center sm:text-left"
            >
              <div className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-ink tracking-tight">
                <CountUp
                  value={stat.value}
                  delay={sIdx * 0.12}
                  suffixClassName="text-[#8B1A1A]"
                />
              </div>
              <div className="text-[14px] sm:text-[15px] font-semibold text-slate-700 leading-snug">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ClientLogoStrip;
