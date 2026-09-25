"use client";

import React, { useState } from "react";
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
  Compass,
} from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitText, TiltCard, Reveal } from "@/components/motion";

interface ServiceCardData {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  badge: string;
  desc: string;
  href: string;
  items: string[];
}

const SERVICES: ServiceCardData[] = [
  {
    title: "Web Development",
    icon: Code2,
    badge: "NEXT.JS 15",
    desc: "Sub-second React & Next.js applications engineered for 95+ Core Web Vitals and frictionless conversion funnels.",
    href: "/web-development",
    items: ["Headless CMS Architecture", "Full-Stack TypeScript", "Enterprise E-Commerce"],
  },
  {
    title: "Graphic Design",
    icon: Palette,
    badge: "PACKAGING & PRINT",
    desc: "Structural packaging architecture, luxury lookbooks, and high-impact visual design with typographic rigor.",
    href: "/graphic-design",
    items: ["Packaging Die-Lines", "Editorial Publication", "Large-Format OOH Billboards"],
  },
  {
    title: "Video Editing",
    icon: Video,
    badge: "POST-PRODUCTION",
    desc: "Cinema-grade post-production engineered for algorithmic retention with sub-second hooks and binaural sound.",
    href: "/video-editing",
    items: ["9:16 Viral Reels", "16:9 Cinema Commercials", "DaVinci Color Grading"],
  },
  {
    title: "Logo Design",
    icon: Compass,
    badge: "VECTOR GEOMETRY",
    desc: "Precision vector marks grounded in mathematical balance, built to scale across micro-favicons and massive signage.",
    href: "/logo-design",
    items: ["Golden Ratio Grids", "Custom Monograms", "Scalable Vector Formats"],
  },
  {
    title: "UI/UX & Product",
    icon: Layers,
    badge: "DESIGN SYSTEMS",
    desc: "Figma token architecture, auto-layout 5.0, and conversion-optimized user flows that map 1-to-1 to React code.",
    href: "/ui-ux-design",
    items: ["Modular Figma Tokens", "Responsive Web UX", "Interactive Micro-Motion"],
  },
  {
    title: "Social Media Systems",
    icon: Share2,
    badge: "ORGANIC RETENTION",
    desc: "High-retention carousel architectures and brand design systems that stop the scroll and build compounding authority.",
    href: "/social-media-design",
    items: ["Multi-Slide Carousels", "Brand Social Kits", "Algorithmic Growth Systems"],
  },
];

export function HomeServicesMerged() {
  return (
    <section
      id="services"
      className="py-20 sm:py-28 px-4 sm:px-6 md:px-12 bg-white relative overflow-hidden font-bold select-none border-b border-line/60"
    >
      {/* Background Dot Grid */}
      <div className="absolute inset-0 dot-grid-pattern opacity-50 pointer-events-none" />

      {/* Atmospheric Soft Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-[#7A1F2B]/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-14">
          <SectionLabel number="01" text="CREATIVE & DIGITAL EXECUTION" className="mb-4" />

          <SplitText
            as="h2"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-text-primary uppercase leading-[1.08] max-w-4xl text-balance"
            accentWords={["digital", "execution.", "execution"]}
            accentClassName="text-[#7A1F2B] font-serif italic lowercase font-normal text-[1.08em]"
          >
            End-to-End Creative & *digital execution.*
          </SplitText>

          <p className="mt-4 text-sm sm:text-base md:text-lg text-text-secondary font-medium leading-relaxed max-w-2xl text-pretty">
            Six cohesive disciplines engineered under one roof. Explore each capability below.
          </p>

          {/* Capability Scope Pill */}
          <div className="mt-8 flex items-center justify-center">
            <div className="inline-flex items-center p-1.5 rounded-2xl bg-slate-100/90 border border-line/80 shadow-xs">
              <div className="flex items-center gap-2 px-4 py-2 sm:py-2.5 rounded-xl bg-white text-[#7A1F2B] shadow-xs border border-line/60 text-xs sm:text-sm font-black">
                <Sparkles className="w-4 h-4 text-[#7A1F2B]" />
                <span>Full Ecosystem We Are Capable Of</span>
              </div>
            </div>
          </div>
        </div>

        {/* All Work Capabilities Grid */}
        <div className="mt-8 sm:mt-12">
          <Reveal stagger={0.06} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {SERVICES.map((s) => (
              <ServiceSpotlightCard key={s.title} s={s} />
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ServiceSpotlightCard({ s }: { s: ServiceCardData }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const SIcon = s.icon;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <TiltCard className="h-full">
      <div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative h-full p-6 rounded-2xl bg-white/70 border border-line/80 hover:bg-white hover:border-[#7A1F2B]/30 transition-all flex flex-col justify-between group shadow-2xs hover:shadow-md overflow-hidden"
      >
        {/* Soft maroon spotlight following cursor inside card */}
        <div
          aria-hidden="true"
          style={{
            background: `radial-gradient(280px circle at ${mousePos.x}px ${mousePos.y}px, rgba(122, 31, 43, 0.12), transparent 70%)`,
          }}
          className={`pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#7A1F2B] bg-red-50 border border-red-100 px-2.5 py-0.5 rounded-full">
              {s.badge}
            </span>
            {/* The icon rotates slightly on hover */}
            <div className="w-8 h-8 rounded-xl bg-white border border-line flex items-center justify-center text-body group-hover:bg-[#7A1F2B] group-hover:text-white transition-all duration-300 group-hover:rotate-6">
              <SIcon className="w-4 h-4 transition-transform duration-300" />
            </div>
          </div>
          <h3 className="text-lg font-black text-ink mb-2">{s.title}</h3>
          <p className="text-xs text-body font-medium leading-relaxed mb-4">{s.desc}</p>
          <div className="space-y-1.5 pt-3 border-t border-line/60 mb-4">
            {s.items.map((it) => (
              <div key={it} className="flex items-center gap-2 text-[11px] font-bold text-body">
                <CheckCircle2 className="w-3 h-3 text-brand-red shrink-0" />
                <span>{it}</span>
              </div>
            ))}
          </div>
        </div>

        {/* The 'Learn more' arrow slides on hover */}
        <Link
          href={s.href}
          className="relative z-10 inline-flex items-center gap-1.5 text-xs font-black text-[#7A1F2B] hover:text-[#5c1720] transition-colors"
        >
          <span>Learn more</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </TiltCard>
  );
}
