"use client";

import React from "react";
import Link from "next/link";
import {
  Factory,
  ShoppingBag,
  TrendingUp,
  Gem,
  Building2,
  Globe,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";

const INDUSTRIES = [
  {
    icon: Factory,
    title: "Industrial & Manufacturing Conglomerates",
    geography: "Gujarat Statewide",
    regionHref: "/gujarat",
    serviceHref: "/web-development",
    serviceLabel: "custom web development",
    description:
      "Modernizing legacy manufacturing giants with fast Next.js corporate platforms, interactive 3D product cutaways, global export packaging dielines, and cinematic factory overview films.",
    deliverables: ["Interactive Machinery Catalogs", "Export Brand Packaging", "Factory Cinema Films"],
  },
  {
    icon: ShoppingBag,
    title: "D2C, Fashion & Textile Brands",
    geography: "Surat & Ahmedabad",
    regionHref: "/surat",
    serviceHref: "/video-editing",
    serviceLabel: "short-form video editing",
    description:
      "Accelerating consumer apparel and lifestyle brands with headless Shopify e-commerce, viral short-form 9:16 Instagram Reels, multi-slide seasonal lookbooks, and high-converting paid ad creatives.",
    deliverables: ["Headless Shopify Storefronts", "Viral Short-Form Reels", "Lookbook Systems"],
  },
  {
    icon: TrendingUp,
    title: "Startups & GIFT City Fintech",
    geography: "Ahmedabad Hub",
    regionHref: "/ahmedabad",
    serviceHref: "/ui-ux-design",
    serviceLabel: "UI/UX design systems",
    description:
      "Engineering institutional-grade UI/UX, WCAG 2.1 AA compliant investor portals, cryptographic security standards, and rapid 48-hour sprint execution for venture-backed founders and scaling B2B SaaS platforms like PCFitment.",
    deliverables: ["Institutional Fintech UI/UX", "Investor Pitch Decks", "48h Rapid MVP Sprints"],
  },
  {
    icon: Gem,
    title: "Diamond, Gems & Luxury Craftsmanship",
    geography: "Surat & Global",
    regionHref: "/surat",
    serviceHref: "/branding",
    serviceLabel: "brand identity systems",
    description:
      "Elevating diamond innovators, lab-grown pioneers, and haute horlogerie houses with monolithic luxury typography, 3D ray-traced product CGI, macro probe lens filming, and sensory brand books.",
    deliverables: ["Haute Luxury Visual Systems", "3D Raytraced CGI Renders", "Macro Product Films"],
  },
  {
    icon: Building2,
    title: "Healthcare, Biotech & Enterprise Services",
    geography: "Gujarat & National",
    regionHref: "/gujarat",
    serviceHref: "/web-development",
    serviceLabel: "enterprise web development",
    description:
      "Delivering high-trust web applications, patient portal workflows, clinical presentation collateral, and authoritative brand identity systems for healthcare networks and research institutions.",
    deliverables: ["Patient Web Portals", "Healthcare Compliance UX", "Corporate Brand Manuals"],
  },
  {
    icon: Globe,
    title: "Global SaaS, Tech & International Exporters",
    geography: "Worldwide & Gujarat",
    regionHref: "/global",
    serviceHref: "/web-development",
    serviceLabel: "global web development",
    description:
      "Empowering cross-border SaaS scale-ups, multinational exporters, and US/UK consumer brands with edge-optimized Next.js web applications, international visual identity books, and viral multi-market video engines.",
    deliverables: ["Edge SaaS Web Applications", "Multi-Currency Commerce", "Global Video Content"],
  },
];

export function IndustriesServed() {
  return (
    <section
      id="industries"
      className="py-24 sm:py-32 px-4 sm:px-6 md:px-12 bg-white relative overflow-hidden font-bold"
    >
      {/* Dot Grid Pattern */}
      {null}

      {/* Atmospheric Glow */}
      {null}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Label & Header */}
        <div className="flex flex-col items-center text-center mb-16 sm:mb-20">
          <SectionLabel number="09" text="COMMERCIAL SECTORS" className="mb-4" />

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-[-0.02em] text-text-primary leading-[1.0] max-w-4xl text-balance">
            Industries &amp; businesses{" "}
            <span className="font-accent italic text-[#8b1a1a] text-[1.1em] tracking-normal inline">
              we accelerate.
            </span>
          </h2>

          <p className="mt-5 text-sm sm:text-base md:text-lg text-text-secondary font-medium leading-relaxed max-w-2xl text-pretty">
            We adapt our creative engineering and sprint cadence to the unique commercial dynamics, regulatory standards, and growth goals of Gujarat&apos;s commercial leaders and ambitious global brands worldwide.
          </p>
        </div>

        {/* 6-Card Industry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {INDUSTRIES.map((ind, idx) => {
            const Icon = ind.icon;
            return (
              <div
                key={idx}
                className="group p-8 rounded-3xl bg-white/80 border border-line/80 hover:border-[#8b1a1a]/40 hover:bg-white hover:shadow-[0_20px_45px_-10px_rgba(139, 26, 26,0.12)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <Link
                      href={ind.regionHref}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[10px] font-black text-body tracking-wider uppercase border border-line hover:border-[#8b1a1a]/40 hover:text-[#8b1a1a] transition-colors"
                    >
                      <span>{ind.geography}</span>
                      <ArrowUpRight className="w-3 h-3 text-muted group-hover:text-[#8b1a1a]" />
                    </Link>
                    <div className="w-10 h-10 rounded-2xl bg-white border border-line text-[#8b1a1a] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-xl font-black text-text-primary tracking-tight mb-3">
                    <Link
                      href={ind.serviceHref}
                      className="hover:text-[#8b1a1a] transition-colors"
                    >
                      {ind.title}
                    </Link>
                  </h3>

                  <p className="text-xs sm:text-sm text-text-secondary font-medium leading-relaxed mb-6">
                    {ind.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-line/60">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black text-muted uppercase tracking-wider block">
                      Core Solutions
                    </span>
                    <Link
                      href={ind.serviceHref}
                      className="text-[11px] font-bold text-[#8b1a1a] hover:text-[#8b1a1a] hover:opacity-80 inline-flex items-center gap-1 transition-colors"
                    >
                      <span>{ind.serviceLabel}</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </Link>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {ind.deliverables.map((del, dIdx) => (
                      <span
                        key={dIdx}
                        className="px-2.5 py-0.5 rounded-md bg-white border border-line text-body text-[11px] font-bold"
                      >
                        {del}
                      </span>
                    ))}
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
