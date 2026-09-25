import React from "react";
import { Sparkles } from "lucide-react";
import { SITE_STATS } from "@/lib/site-stats";
import { AGENCY_STATS } from "@/lib/stats";
import { Marquee, CountUp } from "@/components/motion";

interface ClientLogo {
  name: string;
  category: string;
  tagline: string;
  symbol: string;
}

const CLIENT_LOGOS: ClientLogo[] = [
  { name: "SPECZO", category: "OPTICS", tagline: "Luxury Eyewear Identity", symbol: "◆" },
  { name: "ONIRIQUE", category: "PARFUMS", tagline: "Haute Fragrance 3D CGI", symbol: "✦" },
  { name: "PCFITMENT", category: "AUTO SAAS", tagline: "Automotive Catalog Cloud", symbol: "⚡" },
  { name: "SAMSUNG", category: "TECH", tagline: "Consumer Electronics & Tech", symbol: "◆" },
  { name: "NIRVA CLUB", category: "RESORT", tagline: "Hospitality & Large OOH", symbol: "▲" },
  { name: "SOUL REGALTOS", category: "ESPORTS", tagline: "Gaming & Creator Ecosystem", symbol: "⚡" },
  { name: "RHYME", category: "JEWELS", tagline: "Haute Joaillerie Print", symbol: "◈" },
  { name: "LOVE BEAUTY & PLANET", category: "CARE", tagline: "Clean & Sustainable Beauty", symbol: "✦" },
  { name: "SIVANTA", category: "LIFESTYLE", tagline: "Monolithic Brand Identity", symbol: "●" },
  { name: "VANTARA", category: "WILDLIFE", tagline: "Wildlife Rescue & Conservation", symbol: "▲" },
  { name: "ADANI", category: "ENTERPRISE", tagline: "Infrastructure & Energy Systems", symbol: "■" },
  { name: "NANDANVAN", category: "REALTY", tagline: "Architectural Real Estate", symbol: "▲" },
];

export function ClientLogoStrip() {
  return (
    <section
      className="relative w-full py-10 bg-white/70 border-y border-line/80 overflow-hidden font-bold select-none"
    >
      <div className="max-w-7xl mx-auto px-6 mb-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-text-tertiary">
          <Sparkles className="w-3.5 h-3.5 text-brand-red" />
          <span>TRUSTED BY SCALING BRANDS &amp; VENTURE-BACKED TEAMS</span>
        </div>
        <div className="text-[11px] font-bold text-muted">
          {AGENCY_STATS.brandsElevated}+ High-Growth Companies Scaled Across 14 Markets
        </div>
      </div>

      {/* Infinite Smooth Marquee with Edge Fades */}
      <div className="relative w-full overflow-hidden flex items-center">
        {/* Left & Right Edge Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white/90 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white/90 to-transparent z-10 pointer-events-none" />

        <Marquee speed={45} pauseOnHover={true} gapClassName="gap-6 md:gap-10">
          {CLIENT_LOGOS.map((client, idx) => (
            <div
              key={`${client.name}-${idx}`}
              className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-white border border-line/90 shadow-xs hover:shadow-card hover:border-brand-red/40 hover:-translate-y-0.5 transition-all duration-200 cursor-default saturate-[0.6] hover:saturate-100 filter group/logo"
            >
              <span className="w-6 h-6 rounded-lg bg-brand-redLight flex items-center justify-center text-brand-red text-xs font-black transition-colors group-hover/logo:bg-[#7A1F2B] group-hover/logo:text-white">
                {client.symbol}
              </span>
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1.5 leading-none">
                  <span className="text-xs md:text-sm font-black tracking-tight text-ink group-hover/logo:text-brand-red transition-colors">
                    {client.name}
                  </span>
                  <span className="text-[9px] font-extrabold text-muted tracking-wider">
                    {client.category}
                  </span>
                </div>
                <span className="text-[10px] font-semibold text-muted mt-0.5">
                  {client.tagline}
                </span>
              </div>
            </div>
          ))}
        </Marquee>
      </div>

      {/* Merged Verified Stats Single Inline Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-6 pt-6 border-t border-line/80">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {[
            { value: `${AGENCY_STATS.brandsElevated}+`, label: "Brands Elevated" },
            { value: `${AGENCY_STATS.appsAndSitesDelivered}+`, label: "Websites Delivered" },
            { value: SITE_STATS.viewsLabel, label: "Views Generated" },
            { value: `${AGENCY_STATS.campaignsExecuted}+`, label: "Campaigns Executed" },
          ].map((stat, sIdx) => (
            <div
              key={sIdx}
              className="flex flex-col sm:flex-row items-center sm:items-baseline justify-center sm:justify-start gap-1 sm:gap-2.5 px-2.5 sm:px-3 py-2.5 rounded-xl bg-white/70 border border-line/70 sm:bg-transparent sm:border-0 hover:bg-white transition-colors text-center sm:text-left"
            >
              <div className="font-mono text-xl sm:text-2xl lg:text-3xl font-black text-ink tracking-tight shrink-0">
                <CountUp
                  value={stat.value}
                  delay={sIdx * 0.1}
                  suffixClassName="text-[#8B1A1A]"
                />
              </div>
              <div className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-body leading-tight text-center sm:text-left">
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
