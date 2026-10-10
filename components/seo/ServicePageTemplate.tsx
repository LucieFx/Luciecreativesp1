"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  Layers,
  MapPin,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "./Breadcrumbs";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { getServiceSchema, getFaqSchema, getBreadcrumbSchema } from "@/lib/schema-structured-data";
import { getProjectBySlug, WorkProject } from "@/lib/work-data";
import { getInsightBySlug, InsightArticle } from "@/lib/insights-data";

export interface CapabilityItem {
  title: string;
  description: string;
  tag: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface RelatedService {
  name: string;
  href: string;
  description: string;
}

export interface BenefitItem {
  title: string;
  description: string;
}

export interface ServicePageTemplateProps {
  serviceName: string;
  slug: string;
  eyebrowBadge: string;
  headlineRegular: string;
  headlineItalic: string;
  description: string;
  capabilitiesTitle?: string;
  capabilities: CapabilityItem[];
  deliverables?: string[];
  benefitsTitle?: string;
  benefits?: BenefitItem[];
  processTitle?: string;
  processSteps: ProcessStep[];
  caseStudySlugs?: string[];
  relatedInsightSlugs?: string[];
  faq: FaqItem[];
  relatedServices: RelatedService[];
  customShowcase?: React.ReactNode;
}

export function ServicePageTemplate({
  serviceName,
  slug,
  eyebrowBadge,
  headlineRegular,
  headlineItalic,
  description,
  capabilitiesTitle = "CORE CAPABILITIES & ENGINEERING",
  capabilities,
  deliverables = [],
  benefitsTitle = "STRATEGIC BUSINESS ADVANTAGES",
  benefits = [],
  processTitle = "OUR 4-STEP SPRINT EXECUTION",
  processSteps,
  caseStudySlugs = [],
  relatedInsightSlugs = [],
  faq,
  relatedServices,
  customShowcase,
}: ServicePageTemplateProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://luciecreatives.in";

  // Filter existing case studies
  const caseStudies: WorkProject[] = caseStudySlugs
    .map((s) => getProjectBySlug(s))
    .filter((p): p is WorkProject => Boolean(p));

  // Filter existing related insights
  const insights: InsightArticle[] = relatedInsightSlugs
    .map((s) => getInsightBySlug(s))
    .filter((a): a is InsightArticle => Boolean(a));

  // Service & FAQPage Schema.org Structured Data
  const serviceSchema = getServiceSchema({
    name: serviceName,
    description,
    slug,
    capabilities,
    areaServed: [
      "India",
      "Gujarat",
      "Ahmedabad",
      "Surat",
      "Mumbai",
      "Delhi",
      "Bengaluru",
    ],
  });

  const faqSchema = getFaqSchema(faq);

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
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
            <Breadcrumbs
              items={[
                { label: "Services", href: "/#services" },
                { label: serviceName, href: `/${slug.startsWith("/") ? slug.slice(1) : slug}` },
              ]}
              className="mb-8"
            />

            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-white border border-line mb-6 cursor-default shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-red inline-block" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-ink">
                {eyebrowBadge}
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-black tracking-[-0.02em] text-ink leading-[1.0] max-w-5xl text-balance">
              {headlineRegular}{" "}
              <span className="font-accent italic text-[#8b1a1a] text-[1.1em] tracking-normal inline">
                {headlineItalic}
              </span>
            </h1>

            <p className="mt-6 text-base sm:text-lg md:text-xl text-body font-medium leading-relaxed max-w-3xl">
              {description}
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <MagneticButton
                href="/contact"
                variant="primary"
                size="lg"
                className="px-8 py-4 text-sm font-black rounded-control shadow-red-btn !bg-[#8B1A1A] hover:!bg-[#8b1a1a]/90"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </MagneticButton>

              <Link
                href="/video-editing"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-control bg-line/50 hover:bg-line/80 border border-line text-body text-sm font-bold transition-all"
              >
                <span>View Video Editing</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Quick Trust Highlights */}
            <div className="mt-12 pt-8 border-t border-line/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-bold text-body">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-red shrink-0" />
                <span>Zero Outsourcing • Direct Team</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#8b1a1a] shrink-0" />
                <span>Rapid Sprint Turnaround</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-red shrink-0" />
                <span>Strict NDA &amp; IP Protection</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#8b1a1a] shrink-0" />
                <span>Serving Gujarat &amp; Global Brands</span>
              </div>
            </div>
          </div>
        </section>

        {/* 2. CORE CAPABILITIES GRID */}
        <section className="py-20 px-4 sm:px-6 md:px-12 bg-white/70 border-y border-line/80 relative">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <SectionLabel text={capabilitiesTitle} className="mb-3" />
              <h2 className="text-3xl sm:text-4xl font-black text-ink uppercase tracking-tight">
                Engineering excellence at every layer.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {capabilities.map((c, i) => (
                <div
                  key={i}
                  className="p-6 sm:p-7 rounded-card bg-white border border-line shadow-xs flex flex-col justify-between hover:border-[#8b1a1a]/30 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#FDF2F2] text-[#8b1a1a] border border-[#8b1a1a]/20">
                        {c.tag}
                      </span>
                      <span className="text-xs font-mono font-bold text-muted">
                        0{i + 1}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-ink uppercase tracking-tight mb-2">
                      {c.title}
                    </h3>
                    <p className="text-sm font-normal text-body leading-relaxed">
                      {c.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Deliverables Checklist (if provided) */}
            {deliverables.length > 0 && (
              <div className="mt-12 p-6 sm:p-8 rounded-card bg-white border border-line shadow-xs">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-muted mb-4">
                  Standard Production Deliverables
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs font-bold text-body">
                  {deliverables.map((d, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#8b1a1a] shrink-0" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* CUSTOM INTERACTIVE SHOWCASE (IF PROVIDED) */}
        {customShowcase}

        {/* KEY BUSINESS BENEFITS */}
        {benefits && benefits.length > 0 && (
          <section className="py-20 px-4 sm:px-6 md:px-12 bg-white border-b border-line/80 relative">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-14">
                <SectionLabel text={benefitsTitle} className="mb-3" />
                <h2 className="text-3xl sm:text-4xl font-black text-ink uppercase tracking-tight">
                  Tangible commercial advantages.
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {benefits.map((b, idx) => (
                  <div
                    key={idx}
                    className="p-7 rounded-card bg-white/80 border border-line/80 hover:border-[#8b1a1a]/40 hover:bg-white transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="w-8 h-8 rounded-control bg-brand-red-50 text-[#8b1a1a] border border-[#8b1a1a]/15 flex items-center justify-center font-mono font-black text-xs mb-5 group-hover:bg-[#8b1a1a] group-hover:text-white transition-colors">
                        0{idx + 1}
                      </div>
                      <h3 className="text-lg font-black text-ink uppercase tracking-tight mb-2 group-hover:text-[#8b1a1a] transition-colors">
                        {b.title}
                      </h3>
                      <p className="text-sm font-medium text-body leading-relaxed">
                        {b.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 3. 4-STEP SPRINT WORKFLOW */}
        <section className="py-20 px-4 sm:px-6 md:px-12 bg-white relative">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <SectionLabel text={processTitle} className="mb-3" />
              <h2 className="text-3xl sm:text-4xl font-black text-ink uppercase tracking-tight">
                Clear milestones. Predictable delivery.
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {processSteps.map((p, i) => (
                <div
                  key={i}
                  className="p-6 rounded-card bg-white border border-line shadow-soft relative"
                >
                  <div className="text-3xl font-black text-[#8b1a1a] mb-4 font-mono">
                    {p.step}
                  </div>
                  <h3 className="text-base font-black text-ink uppercase tracking-tight mb-2">
                    {p.title}
                  </h3>
                  <p className="text-xs font-medium text-body leading-relaxed">
                    {p.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. FEATURED CASE STUDIES (IF AVAILABLE) */}
        {caseStudies.length > 0 && (
          <section className="py-20 px-4 sm:px-6 md:px-12 bg-white/70 border-t border-line/80">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
                <div>
                  <SectionLabel text="VERIFIED PROOF & OUTCOMES" className="mb-2" />
                  <h2 className="text-3xl sm:text-4xl font-black text-ink uppercase tracking-tight">
                    Case studies in this discipline.
                  </h2>
                </div>
                <Link
                  href="/video-editing"
                  className="text-xs font-black uppercase tracking-wider text-[#8b1a1a] transition-transform inline-flex items-center gap-1.5"
                >
                  <span>Explore All Projects</span>
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
                        Read Study →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* RELATED TECHNICAL GUIDES & INSIGHTS */}
        {insights.length > 0 && (
          <section className="py-20 px-4 sm:px-6 md:px-12 bg-white border-t border-line">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                <div>
                  <SectionLabel text="STRATEGIC INSIGHTS & METHODOLOGY" className="mb-2" />
                  <h2 className="text-3xl sm:text-4xl font-black text-ink uppercase tracking-tight">
                    Technical guides &amp; analysis for {serviceName.toLowerCase()}.
                  </h2>
                </div>
                <Link
                  href="/insights"
                  className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#8b1a1a] transition-transform"
                >
                  <span>View All Insights</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {insights.map((art) => (
                  <Link
                    key={art.slug}
                    href={`/insights/${art.slug}`}
                    className="group p-6 rounded-card bg-white border border-line shadow-soft hover:shadow-card hover:border-[#8b1a1a]/40 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-muted font-bold mb-3">
                        <span className="text-[#8b1a1a] uppercase tracking-wider">
                          {art.category}
                        </span>
                        <span>{art.readingTime}</span>
                      </div>
                      <h3 className="text-lg font-black text-ink group-hover:text-[#8b1a1a] transition-colors leading-snug mb-2 line-clamp-2">
                        {art.title}
                      </h3>
                      <p className="text-xs font-medium text-body line-clamp-3">
                        {art.excerpt}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-line/60 flex items-center justify-between text-xs">
                      <span className="text-muted font-semibold truncate max-w-[160px]">
                        By {art.author.name}
                      </span>
                      <span className="font-black text-[#8b1a1a] transition-transform inline-flex items-center gap-1 shrink-0">
                        Read Guide →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 5. FREQUENTLY ASKED QUESTIONS */}
        <section className="py-20 px-4 sm:px-6 md:px-12 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <SectionLabel text="SERVICE FAQ" className="mb-2" />
              <h2 className="text-3xl sm:text-4xl font-black text-ink uppercase tracking-tight">
                Frequently asked questions.
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

        {/* 6. REGIONAL & GLOBAL SERVICE HUBS ANCHOR */}
        <section className="py-14 px-4 sm:px-6 md:px-12 bg-white border-t border-line">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="max-w-md">
              <span className="text-[10px] font-black uppercase tracking-widest text-muted block mb-1">
                GLOBAL &amp; REGIONAL COLLABORATION
              </span>
              <p className="text-sm font-bold text-ink">
                Delivering {serviceName} across global markets &amp; Indian commercial hubs:
              </p>
            </div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <Link
                href="/global"
                className="px-3.5 py-2 rounded-control bg-[#8b1a1a] text-white border border-[#8b1a1a] text-xs font-black hover:bg-[#8b1a1a]/90 transition-all shadow-xs"
              >
                Global (Worldwide) →
              </Link>
              <Link
                href="/india"
                className="px-3.5 py-2 rounded-control bg-white border border-line text-xs font-black text-body hover:text-[#8b1a1a] hover:border-[#8b1a1a]/40 transition-all"
              >
                India (National) →
              </Link>
              <Link
                href="/gujarat"
                className="px-3.5 py-2 rounded-control bg-white border border-line text-xs font-black text-body hover:text-[#8b1a1a] hover:border-[#8b1a1a]/40 transition-all"
              >
                Gujarat →
              </Link>
              <Link
                href="/ahmedabad"
                className="px-3.5 py-2 rounded-control bg-white border border-line text-xs font-black text-body hover:text-[#8b1a1a] hover:border-[#8b1a1a]/40 transition-all"
              >
                Ahmedabad →
              </Link>
              <Link
                href="/surat"
                className="px-3.5 py-2 rounded-control bg-white border border-line text-xs font-black text-body hover:text-[#8b1a1a] hover:border-[#8b1a1a]/40 transition-all"
              >
                Surat →
              </Link>
              <Link
                href="/mumbai"
                className="px-3.5 py-2 rounded-control bg-white border border-line text-xs font-black text-body hover:text-[#8b1a1a] hover:border-[#8b1a1a]/40 transition-all"
              >
                Mumbai →
              </Link>
              <Link
                href="/delhi"
                className="px-3.5 py-2 rounded-control bg-white border border-line text-xs font-black text-body hover:text-[#8b1a1a] hover:border-[#8b1a1a]/40 transition-all"
              >
                Delhi NCR →
              </Link>
              <Link
                href="/bengaluru"
                className="px-3.5 py-2 rounded-control bg-white border border-line text-xs font-black text-body hover:text-[#8b1a1a] hover:border-[#8b1a1a]/40 transition-all"
              >
                Bengaluru →
              </Link>
            </div>
          </div>
        </section>

        {/* 7. RELATED SERVICES GRID */}
        {relatedServices.length > 0 && (
          <section className="py-16 px-4 sm:px-6 md:px-12 bg-white border-t border-line">
            <div className="max-w-6xl mx-auto">
              <h3 className="text-xs font-black uppercase tracking-widest text-muted mb-6">
                Explore Complementary Disciplines
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedServices.map((rel, idx) => (
                  <Link
                    key={idx}
                    href={rel.href}
                    className="p-5 rounded-card bg-white border border-line hover:border-[#8b1a1a]/30 hover:shadow-soft transition-all group"
                  >
                    <div className="text-sm font-black text-ink group-hover:text-[#8b1a1a] transition-colors flex items-center justify-between mb-1">
                      <span>{rel.name}</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform" />
                    </div>
                    <p className="text-xs text-muted font-medium">
                      {rel.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 8. CLOSING DISCOVERY CTA */}
        <section className="py-20 px-4 sm:px-6 md:px-12 bg-[#8B1A1A] text-white text-center select-none">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase leading-tight mb-4">
              Ready to elevate your {serviceName.toLowerCase()}?
            </h2>
            <p className="text-white/85 text-sm sm:text-base font-medium max-w-xl mx-auto mb-8">
              Discuss your project parameters with our leadership team. We review your scope within 24 hours.
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

export default ServicePageTemplate;
