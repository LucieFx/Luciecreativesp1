"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  MapPin,
  Clock,
  ShieldCheck,
  Building2,
  Layers,
  MessageSquare,
  Globe,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "./Breadcrumbs";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { getProjectBySlug, WorkProject } from "@/lib/work-data";
import { getServiceSchema, getFaqSchema } from "@/lib/schema-structured-data";

export interface MarketPillar {
  title: string;
  description: string;
  tag: string;
}

export interface ServiceLinkItem {
  name: string;
  href: string;
  description: string;
  deliverable: string;
}

export interface LocationFaqItem {
  q: string;
  a: string;
}

export interface SisterLocation {
  name: string;
  href: string;
  description: string;
}

export interface LocationPageTemplateProps {
  locationName: string;
  slug: string;
  parentRegion?: { name: string; href: string } | Array<{ name: string; href: string }>;
  badge: string;
  headlineRegular: string;
  headlineItalic: string;
  heroDescription: string;
  marketContextTitle: string;
  marketContextSubtitle: string;
  marketPillars: MarketPillar[];
  services: ServiceLinkItem[];
  caseStudySlugs?: string[];
  faq: LocationFaqItem[];
  sisterLocations: SisterLocation[];
}

export function LocationPageTemplate({
  locationName,
  slug,
  parentRegion,
  badge,
  headlineRegular,
  headlineItalic,
  heroDescription,
  marketContextTitle,
  marketContextSubtitle,
  marketPillars,
  services,
  caseStudySlugs = [],
  faq,
  sisterLocations,
}: LocationPageTemplateProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://luciecreatives.in";

  // Filter existing case studies
  const caseStudies: WorkProject[] = caseStudySlugs
    .map((s) => getProjectBySlug(s))
    .filter((p): p is WorkProject => Boolean(p));

  // Breadcrumbs items reflecting true geographic hierarchy
  const parentItems = parentRegion
    ? Array.isArray(parentRegion)
      ? parentRegion.map((p) => ({ label: p.name, href: p.href }))
      : [{ label: parentRegion.name, href: parentRegion.href }]
    : [];

  const breadcrumbItems = [
    ...parentItems,
    { label: locationName, href: `/${slug}` },
  ];

  // Service (Regionally Served) & FAQPage Schema.org Structured Data
  const locationSchema = getServiceSchema({
    name: `Creative Digital Agency Services in ${locationName}`,
    description: heroDescription,
    slug,
    areaServed: locationName,
  });

  const faqSchema = getFaqSchema(faq);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(locationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="min-h-screen bg-white text-text-primary selection:bg-brand-red selection:text-white font-bold relative">
        <Navbar />

        {/* 1. HERO SECTION */}
        <section className="pt-32 sm:pt-40 pb-16 px-4 sm:px-6 md:px-12 relative overflow-hidden bg-white">
          {null}

          {/* Ambient Glow Orb */}
          {null}

          <div className="max-w-6xl mx-auto relative z-10">
            <Breadcrumbs items={breadcrumbItems} className="mb-8" />

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-control bg-white shadow-soft border border-[#8b1a1a]/20 mb-6 cursor-default">
              <MapPin className="w-3.5 h-3.5 text-[#8b1a1a]" />
              <span className="text-[11px] font-black uppercase tracking-widest text-ink">
                {badge}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse ml-0.5" />
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-black tracking-[-0.02em] text-ink leading-[1.0] max-w-5xl text-balance">
              {headlineRegular}{" "}
              <span className="font-accent italic text-[#8b1a1a] text-[1.1em] tracking-normal inline">
                {headlineItalic}
              </span>
            </h1>

            <p className="mt-6 text-base sm:text-lg md:text-xl text-body font-medium leading-relaxed max-w-3xl">
              {heroDescription}
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <MagneticButton
                href="/contact"
                variant="primary"
                size="lg"
                className="px-8 py-4 text-sm font-black rounded-control shadow-red-btn !bg-[#8b1a1a] hover:!bg-[#8b1a1a]/90"
              >
                <span>Start a Regional Project</span>
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </MagneticButton>

              <Link
                href="/video-editing"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-control bg-line/50 hover:bg-line/80 border border-line text-body text-sm font-bold transition-all"
              >
                <span>Explore Agency Portfolio</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Operational Model Banner */}
            <div className="mt-12 pt-8 border-t border-line/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-bold text-body">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#8b1a1a] shrink-0" />
                <span>Global Quality • Regional Understanding</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-brand-red shrink-0" />
                <span>Fast Agile Sprints • Sub-24h Response</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-red shrink-0" />
                <span>Direct Founder Consultation</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#8b1a1a] shrink-0" />
                <span>Enterprise &amp; Startup Specialization</span>
              </div>
            </div>
          </div>
        </section>

        {/* 2. LOCAL MARKET CONTEXT & STRATEGIC PILLARS */}
        <section className="py-20 px-4 sm:px-6 md:px-12 bg-white/70 border-y border-line/80">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <SectionLabel text={marketContextTitle} className="mb-3" />
              <h2 className="text-3xl sm:text-4xl font-black text-ink uppercase tracking-tight max-w-3xl mx-auto">
                {marketContextSubtitle}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {marketPillars.map((p, i) => (
                <div
                  key={i}
                  className="p-7 rounded-card backdrop-blur-xl bg-white/85 border border-white/90 shadow-[0_15px_35px_-5px_rgba(0,0,0,0.06),0_0_1px_1px_rgba(255,255,255,0.8)] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-control bg-[#FDF2F2] text-[#8b1a1a] border border-[#8b1a1a]/20">
                        {p.tag}
                      </span>
                      <span className="text-xs font-mono font-bold text-muted">
                        0{i + 1}
                      </span>
                    </div>

                    <h3 className="text-lg font-black text-ink uppercase tracking-tight mb-2">
                      {p.title}
                    </h3>
                    <p className="text-sm font-medium text-body leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. CORE SERVICES GRID (LINKING TO ALL 7 SERVICE PAGES) */}
        <section className="py-20 px-4 sm:px-6 md:px-12 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <SectionLabel text={`PRIMARY SERVICES FOR ${locationName.toUpperCase()}`} className="mb-3" />
              <h2 className="text-3xl sm:text-4xl font-black text-ink uppercase tracking-tight">
                Full-stack digital capabilities under one roof.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((s, idx) => (
                <Link
                  key={idx}
                  href={s.href}
                  className="p-7 rounded-card bg-white border border-line hover:border-[#8b1a1a]/40 hover:shadow-card transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-muted">
                        Service 0{idx + 1}
                      </span>
                      <span className="text-[#8b1a1a] font-black text-xs transition-transform inline-flex items-center gap-1">
                        {s.name} in {locationName} →
                      </span>
                    </div>
                    <h3 className="text-xl font-black text-ink group-hover:text-[#8b1a1a] transition-colors uppercase tracking-tight mb-2">
                      {s.name}
                    </h3>
                    <p className="text-xs font-medium text-body leading-relaxed mb-4">
                      {s.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-line/60 text-[11px] font-bold text-muted">
                    <span className="text-muted">Focus: </span>
                    {s.deliverable}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 4. RELEVANT PORTFOLIO WORK */}
        {caseStudies.length > 0 && (
          <section className="py-20 px-4 sm:px-6 md:px-12 bg-white/70 border-t border-line/80">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
                <div>
                  <SectionLabel text="PROVEN AGENCY WORK" className="mb-2" />
                  <h2 className="text-3xl sm:text-4xl font-black text-ink uppercase tracking-tight">
                    Case studies relevant to {locationName} commercial standards.
                  </h2>
                </div>
                <Link
                  href="/video-editing"
                  className="text-xs font-black uppercase tracking-wider text-[#8b1a1a] transition-transform inline-flex items-center gap-1.5"
                >
                  <span>Explore Video &amp; Design Portfolio</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {caseStudies.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/work/${p.slug}`}
                    className="group p-6 rounded-card bg-white border border-line shadow-soft hover:shadow-card hover:border-[#8b1a1a]/40 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-muted font-bold mb-3">
                        <span className="text-[#8b1a1a] uppercase tracking-wider">
                          {p.category}
                        </span>
                        <span>Client: {p.client}</span>
                      </div>
                      <h3 className="text-xl font-black text-ink group-hover:text-[#8b1a1a] transition-colors leading-snug mb-2">
                        {p.title}
                      </h3>
                      <p className="text-xs font-medium text-body line-clamp-2">
                        {p.brief}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-line/60 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-extrabold text-[#8b1a1a] text-base">
                          {p.outcomeMetric}
                        </span>
                        <span className="text-muted font-semibold ml-1.5">
                          {p.outcomeLabel}
                        </span>
                      </div>
                      <span className="font-black text-[#8b1a1a] transition-transform inline-flex items-center gap-1">
                        View Study →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 5. AGILE ENGAGEMENT & COLLABORATION WORKFLOW */}
        <section className="py-20 px-4 sm:px-6 md:px-12 bg-white border-t border-line/80">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <SectionLabel text="HOW WE COLLABORATE" className="mb-3" />
              <h2 className="text-3xl sm:text-4xl font-black text-ink uppercase tracking-tight">
                Frictionless collaboration for {locationName} founders.
              </h2>
              <p className="mt-3 text-sm text-body font-medium max-w-xl mx-auto">
                No bureaucratic delays. We pair enterprise-grade engineering with direct founder communication.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-card bg-white border border-line shadow-soft">
                <div className="w-10 h-10 rounded-control bg-[#FDF2F2] border border-[#8b1a1a]/20 flex items-center justify-center text-[#8b1a1a] mb-4">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <h3 className="text-base font-black text-ink uppercase mb-2">
                  1. Discovery &amp; Scope
                </h3>
                <p className="text-xs font-medium text-body leading-relaxed">
                  We schedule a virtual strategy deep-dive to review your business model, target revenue goals, and technical specs.
                </p>
              </div>

              <div className="p-6 rounded-card bg-white border border-line shadow-soft">
                <div className="w-10 h-10 rounded-control bg-[#FDF2F2] border border-[#8b1a1a]/20 flex items-center justify-center text-[#8b1a1a] mb-4">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="text-base font-black text-ink uppercase mb-2">
                  2. Rapid Sprint Cycles
                </h3>
                <p className="text-xs font-medium text-body leading-relaxed">
                  Deliverables roll out in focused 7 to 14-day milestones with active asynchronous Loom/Figma walkthroughs.
                </p>
              </div>

              <div className="p-6 rounded-card bg-white border border-line shadow-soft">
                <div className="w-10 h-10 rounded-control bg-[#FDF2F2] border border-[#8b1a1a]/20 flex items-center justify-center text-[#8b1a1a] mb-4">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base font-black text-ink uppercase mb-2">
                  3. Founder Oversight
                </h3>
                <p className="text-xs font-medium text-body leading-relaxed">
                  Direct review with agency leadership, ensuring zero quality loss or handoff miscommunication.
                </p>
              </div>

              <div className="p-6 rounded-card bg-white border border-line shadow-xs">
                <div className="w-10 h-10 rounded-control bg-[#FDF2F2] border border-[#8b1a1a]/20 flex items-center justify-center text-[#8b1a1a] mb-4">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="text-base font-black text-ink uppercase mb-2">
                  4. Production Handover
                </h3>
                <p className="text-xs font-medium text-body leading-relaxed">
                  Clean GitHub repositories, native design system tokens, and full commercial copyright transfer upon signoff.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. LOCATION FAQ */}
        <section className="py-20 px-4 sm:px-6 md:px-12 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <SectionLabel text="REGIONAL FAQ" className="mb-2" />
              <h2 className="text-3xl sm:text-4xl font-black text-ink uppercase tracking-tight">
                Frequently asked questions for {locationName}.
              </h2>
            </div>

            <div className="space-y-4">
              {faq.map((item, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-control border border-line overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full text-left p-5 sm:p-6 bg-white/50 hover:bg-brand-red-50 flex items-center justify-between gap-4 font-bold text-ink text-sm sm:text-base focus:outline-none"
                    >
                      <span>{item.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-muted shrink-0 transition-transform duration-200 ${
                          isOpen ? "rotate-180 text-[#8b1a1a]" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="p-5 sm:p-6 pt-2 bg-white text-xs sm:text-sm font-medium text-body leading-relaxed border-t border-line/60">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 6. REGIONAL NETWORK (SISTER LOCATIONS) */}
        {sisterLocations.length > 0 && (
          <section className="py-14 px-4 sm:px-6 md:px-12 bg-white border-t border-line">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-muted block mb-1">
                  REGIONAL LOCATIONS
                </span>
                <p className="text-sm font-bold text-ink">
                  Explore other creative partner hubs across India:
                </p>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                {sisterLocations.map((loc, idx) => (
                  <Link
                    key={idx}
                    href={loc.href}
                    className="px-4 py-2 rounded-control bg-white border border-line text-xs font-black text-body hover:text-[#8b1a1a] hover:border-[#8b1a1a]/40 transition-all"
                  >
                    Agency Hub in {loc.name} →
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 7. CLOSING CTA BANNER */}
        <section className="py-20 px-4 sm:px-6 md:px-12 bg-[#8B1A1A] text-white text-center select-none">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase leading-tight mb-4">
              Building in {locationName}? Let&apos;s collaborate.
            </h2>
            <p className="text-white/85 text-sm sm:text-base font-medium max-w-xl mx-auto mb-8">
              Discuss your web, branding, or video requirements with Lucie Creatives. Response guaranteed within 24 hours.
            </p>
            <MagneticButton
              href="/contact"
              variant="secondary"
              size="lg"
              className="bg-white text-[#8B1A1A] hover:bg-brand-red-50 font-black text-sm px-8 py-4 rounded-control shadow-elevated"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4 ml-1" />
            </MagneticButton>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}

export default LocationPageTemplate;
