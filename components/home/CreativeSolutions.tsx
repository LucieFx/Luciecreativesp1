"use client";

import React from "react";
import Link from "next/link";
import {
  Code2,
  Palette,
  Video,
  Sparkles,
  Layers,
  Share2,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";

const SOLUTIONS = [
  {
    title: "Web Development",
    slug: "/web-development",
    anchorText: "Explore web development services",
    badge: "FULL-STACK ARCHITECTURE",
    icon: Code2,
    description:
      "Production-grade Next.js, React, and TypeScript web applications engineered for sub-second load times, 95+ Core Web Vitals, and seamless conversion funnels.",
    capabilities: [
      "Next.js 15 & React Full-Stack",
      "Headless CMS & API Integration",
      "Lighthouse 95+ Performance",
      "Enterprise E-Commerce Platforms",
    ],
  },
  {
    title: "Graphic Design",
    slug: "/graphic-design",
    anchorText: "Explore graphic design services",
    badge: "MONOLITHIC SYSTEMS",
    icon: Palette,
    description:
      "Systematic visual design systems, luxury packaging architecture, and editorial lookbooks crafted with mathematical grid mechanics and typographic rigor.",
    capabilities: [
      "Monolithic Brand Systems",
      "Structural Packaging Dielines",
      "Editorial & Publication Layouts",
      "Large-Format OOH Billboards",
    ],
  },
  {
    title: "Video Editing",
    slug: "/video-editing",
    anchorText: "Explore video editing & motion",
    badge: "CINEMA POST-PRODUCTION",
    icon: Video,
    description:
      "Cinema-grade post-production engineered for algorithmic retention. Sub-1-second psychological hooks, DaVinci Resolve color grading, and binaural sound foley.",
    capabilities: [
      "9:16 Viral Short-Form Reels",
      "16:9 Cinema Commercials",
      "DaVinci Resolve Color Grading",
      "Custom Foley & Sound Design",
    ],
  },
  {
    title: "Logo Design & Branding",
    slug: "/logo-design",
    secondarySlug: "/branding",
    anchorText: "Explore logo design services",
    secondaryAnchorText: "Brand identity & strategy →",
    badge: "TIMELESS IDENTITY",
    icon: Sparkles,
    description:
      "Mathematical logomarks, distinctive wordmarks, and 80+ page holistic brand identity books that establish unquestioned market authority from day one.",
    capabilities: [
      "Golden Ratio Logomarks",
      "Comprehensive Brand Books",
      "Color Psychology & Tokens",
      "Verbal Identity & Voice Playbooks",
    ],
  },
  {
    title: "UI/UX Design",
    slug: "/ui-ux-design",
    anchorText: "Explore UI/UX design services",
    badge: "HUMAN-CENTERED UX",
    icon: Layers,
    description:
      "Transforming complex workflows into fluid digital journeys. Figma design token architecture, interactive micro-prototypes, and responsive web interfaces.",
    capabilities: [
      "Figma Design Token Systems",
      "Interactive Micro-Prototypes",
      "Responsive Web & SaaS UX",
      "Conversion Rate Optimization (CRO)",
    ],
  },
  {
    title: "Social Media Design",
    slug: "/social-media-design",
    anchorText: "Explore social media creatives",
    badge: "ALGORITHMIC VELOCITY",
    icon: Share2,
    description:
      "High-velocity social media creative suites engineered to stop the scroll. Multi-slide educational carousels, striking launch banners, and synchronized feed aesthetics.",
    capabilities: [
      "Multi-Slide Carousels (LinkedIn/IG)",
      "High-Converting Ad Creatives",
      "Synchronized Feed Systems",
      "Agile In-House Figma Templates",
    ],
  },
];

export function CreativeSolutions() {
  return (
    <section
      id="services"
      className="py-24 sm:py-32 px-4 sm:px-6 md:px-12 bg-white relative overflow-hidden font-bold scroll-mt-20"
    >
      <div id="solutions" className="relative -top-24 pointer-events-none" />
      {/* Background Dot Matrix Pattern */}
      <div className="absolute inset-0 dot-grid-pattern opacity-60 pointer-events-none" />

      {/* Atmospheric Ambient Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-[#8b1a1a]/[0.04] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 sm:mb-20">
          <SectionLabel number="01" text="CREATIVE & DIGITAL EXECUTION" className="mb-4" />

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-text-primary uppercase leading-[1.08] max-w-4xl text-balance">
            End-to-End Creative &amp;{" "}
            <span className="text-[#8b1a1a] italic block sm:inline">
              Digital Execution.
            </span>
          </h2>

          <p className="mt-5 text-sm sm:text-base md:text-lg text-text-secondary font-medium leading-relaxed max-w-2xl text-pretty">
            We bridge high-performance software engineering, cinematic motion production, and monolithic brand design into a cohesive commercial growth engine.
          </p>
        </div>

        {/* 6-Card Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {SOLUTIONS.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group relative rounded-3xl p-7 sm:p-8 bg-white/80 backdrop-blur-xl border border-line hover:border-[#8b1a1a]/40 hover:shadow-[0_20px_45px_-10px_rgba(139, 26, 26,0.12)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-red-50 text-[10px] font-black text-[#8b1a1a] tracking-wider uppercase border border-[#8b1a1a]/15">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8b1a1a]" />
                      {item.badge}
                    </span>

                    <Link
                      href={item.slug}
                      aria-label={item.anchorText}
                      className="w-10 h-10 rounded-2xl bg-white border border-line group-hover:bg-[#8b1a1a] group-hover:border-[#8b1a1a] group-hover:text-white text-body flex items-center justify-center transition-all duration-300"
                    >
                      <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                    </Link>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-black text-text-primary tracking-tight mb-3">
                    <Link
                      href={item.slug}
                      className="hover:text-[#8b1a1a] transition-colors"
                    >
                      {item.title}
                    </Link>
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-text-secondary font-medium leading-relaxed mb-6">
                    {item.description}
                  </p>

                  {/* Capabilities List */}
                  <ul className="space-y-2 mb-8 pt-4 border-t border-line/60">
                    {item.capabilities.map((cap, cIdx) => (
                      <li
                        key={cIdx}
                        className="flex items-center gap-2 text-xs font-bold text-body"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#8b1a1a] flex-shrink-0" />
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Links */}
                <div className="pt-4 border-t border-line/60 flex items-center justify-between text-xs font-black">
                  <Link
                    href={item.slug}
                    className="inline-flex items-center gap-1.5 text-[#8b1a1a] hover:text-[#8b1a1a] hover:opacity-80 transition-colors"
                  >
                    <span>{item.anchorText}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>

                  {item.secondarySlug && (
                    <Link
                      href={item.secondarySlug}
                      className="text-muted hover:text-[#8b1a1a] transition-colors"
                    >
                      {item.secondaryAnchorText}
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
