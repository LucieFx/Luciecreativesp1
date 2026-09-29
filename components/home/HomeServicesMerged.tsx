"use client";

import React from "react";
import Link from "next/link";
import {
  Code2,
  Palette,
  Video,
  Layers,
  Share2,
  ArrowUpRight,
  Compass,
} from "lucide-react";
import { Reveal } from "@/components/motion";

interface ServiceCardData {
  number: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  badge: string;
  desc: string;
  href: string;
  items: string[];
}

const SERVICES: ServiceCardData[] = [
  {
    number: "01",
    title: "Web Development",
    icon: Code2,
    badge: "Next.js & React",
    desc: "Fast, responsive websites and web applications built with Next.js and React that load quickly, look great on any screen, and convert visitors.",
    href: "/web-development",
    items: ["Custom Next.js & React Builds", "Full-Stack Development", "Responsive Layouts & CMS"],
  },
  {
    number: "02",
    title: "Graphic Design",
    icon: Palette,
    badge: "Packaging & Print",
    desc: "Packaging die-lines, marketing print, lookbooks, and brand collateral designed with clean typography and layout rigor.",
    href: "/graphic-design",
    items: ["Packaging & Labels", "Editorial & Print Collateral", "Large-Format Posters & OOH"],
  },
  {
    number: "03",
    title: "Video Editing",
    icon: Video,
    badge: "Post-Production",
    desc: "High-engagement short-form reels, commercial videos, and brand films with sharp pacing, sound design, and clean color grading.",
    href: "/video-editing",
    items: ["9:16 Social Reels & Shorts", "Commercial & Brand Films", "Color Grading & Sound Foley"],
  },
  {
    number: "04",
    title: "Logo Design",
    icon: Compass,
    badge: "Brand Marks",
    desc: "Distinct vector logos and brand marks designed to scale cleanly across everything from website headers to physical signage.",
    href: "/logo-design",
    items: ["Custom Vector Marks", "Monograms & Wordmarks", "Full Export Asset Sets"],
  },
  {
    number: "05",
    title: "UI/UX & Product",
    icon: Layers,
    badge: "Product Design",
    desc: "Intuitive, clean interface designs and interactive Figma prototypes built for modern web products and user flows.",
    href: "/ui-ux-design",
    items: ["Interactive Figma Prototypes", "Responsive Web App UX", "Clean Component Libraries"],
  },
  {
    number: "06",
    title: "Social Media Design",
    icon: Share2,
    badge: "Content Systems",
    desc: "Consistent social media carousels, ad creatives, and story templates crafted to capture attention in crowded feeds.",
    href: "/social-media-design",
    items: ["Educational Carousels", "High-Converting Ad Creatives", "Cohesive Feed Templates"],
  },
];

export function HomeServicesMerged() {
  return (
    <section
      id="services"
      className="py-16 sm:py-24 px-4 sm:px-6 md:px-12 bg-white relative overflow-hidden select-none border-b border-line/60"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header: Clean, honest, sentence-case layout */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <div className="mb-3 text-xs sm:text-sm font-semibold tracking-wider text-[#7A1F2B] uppercase">
            Services
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-[-0.02em] leading-[1.0] text-ink max-w-3xl text-balance">
            What we do
          </h2>

          <p className="mt-4 text-[15px] sm:text-base md:text-[18px] text-slate-700 font-medium leading-relaxed max-w-2xl text-pretty">
            Video editing, graphic design and web development for brands, all handled by one small team.
          </p>
        </div>

        {/* All Work Capabilities Grid */}
        <div>
          <Reveal stagger={0.06} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {SERVICES.map((s) => (
              <ServiceEditorialCard key={s.title} s={s} />
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ServiceEditorialCard({ s }: { s: ServiceCardData }) {
  const SIcon = s.icon;

  return (
    <div className="relative h-full p-6 sm:p-7 rounded-2xl bg-white border border-line/90 hover:border-[#7A1F2B]/40 transition-colors flex flex-col justify-between group shadow-xs">
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold text-[#7A1F2B] bg-red-50/80 border border-red-200/80 px-2.5 py-1 rounded-md">
            {s.badge}
          </span>
          <span className="text-xs font-mono font-bold text-slate-500">
            {s.number}
          </span>
        </div>

        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-ink shrink-0 group-hover:bg-[#7A1F2B] group-hover:text-white transition-colors">
            <SIcon className="w-4 h-4" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-ink">{s.title}</h3>
        </div>

        <p className="text-[14px] sm:text-[15px] text-slate-700 font-normal leading-relaxed mb-5">{s.desc}</p>

        <div className="space-y-2 pt-3 border-t border-line/60 mb-5">
          {s.items.map((it) => (
            <div key={it} className="flex items-center gap-2 text-[14px] font-medium text-slate-800">
              <span className="text-[#8B1A1A] font-bold text-sm leading-none shrink-0">—</span>
              <span>{it}</span>
            </div>
          ))}
        </div>
      </div>

      <Link
        href={s.href}
        className="inline-flex items-center gap-1.5 text-[14px] sm:text-[15px] font-bold text-[#7A1F2B] hover:text-[#5c1720] transition-colors pt-2"
      >
        <span>Explore service</span>
        <ArrowUpRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

export default HomeServicesMerged;
