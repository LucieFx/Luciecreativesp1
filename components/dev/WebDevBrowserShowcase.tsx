"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Lock,
  ArrowUpRight,
  Globe,
  ExternalLink,
} from "lucide-react";

import { WEB_PROJECTS } from "@/lib/dev-work-data";
import { TiltCard } from "@/components/motion/TiltCard";
import { SplitText } from "@/components/motion";
import { useReducedMotion } from "framer-motion";

export interface WebProjectItem {
  name: string;
  tag: string;
  description: string;
  url: string;
  image: string;
}

// Single source of truth is WEB_PROJECTS in @/lib/dev-work-data
export const projects: WebProjectItem[] = WEB_PROJECTS.map((project) => ({
  name: project.name,
  tag: project.category,
  description: project.description,
  url: project.url,
  image: project.previewImage,
}));

export function WebDevBrowserShowcase() {
  const isCarousel = projects.length >= 4;
  const isSingle = projects.length === 1;

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollability = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    if (!isCarousel) return;
    const el = scrollContainerRef.current;
    if (!el) return;
    checkScrollability();
    el.addEventListener("scroll", checkScrollability, { passive: true });
    window.addEventListener("resize", checkScrollability);
    return () => {
      el.removeEventListener("scroll", checkScrollability);
      window.removeEventListener("resize", checkScrollability);
    };
  }, [isCarousel]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const cardWidth = el.querySelector(".browser-card")?.clientWidth || 520;
    const scrollAmount = direction === "left" ? -cardWidth - 32 : cardWidth + 32;
    el.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isCarousel) return;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      scroll("left");
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      scroll("right");
    }
  };

  return (
    <section
      id="websites-weve-built"
      className="relative w-full py-20 lg:py-28 bg-white text-text-primary overflow-hidden border-b border-line select-none"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/3 right-10 w-[600px] h-[500px] bg-brand-red/[0.03] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 lg:mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-redLight border border-brand-red/20 text-brand-red text-xs font-black tracking-widest uppercase mb-4">
              <Globe className="w-3.5 h-3.5" />
              <span>Selected Web Deployments</span>
            </div>
            <SplitText
              as="h2"
              className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-ink uppercase"
              accentWords={["platforms"]}
              accentClassName="text-brand-red font-serif italic lowercase font-normal"
            >
              Featured client *platforms*
            </SplitText>
            <p className="mt-3 text-sm sm:text-base text-body font-medium">
              A curated selection of high-performance web platforms engineered directly by our team—combining
              sub-second response times, bespoke UI architecture, and proven conversion capability.
            </p>
          </div>

          {/* Navigation Controls (Only active for carousel mode: 4+ items) */}
          {isCarousel && (
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-muted hidden sm:inline">
                Scroll or use arrow keys
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => scroll("left")}
                  disabled={!canScrollLeft}
                  aria-label="Previous website project"
                  className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all cursor-pointer shadow-xs ${
                    canScrollLeft
                      ? "bg-slate-100 hover:bg-line border-line text-ink hover:scale-105 active:scale-95"
                      : "bg-slate-50 border-line/60 text-muted/60 cursor-not-allowed opacity-50"
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => scroll("right")}
                  disabled={!canScrollRight}
                  aria-label="Next website project"
                  className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all cursor-pointer shadow-xs ${
                    canScrollRight
                      ? "bg-slate-100 hover:bg-line border-line text-ink hover:scale-105 active:scale-95"
                      : "bg-slate-50 border-line/60 text-muted/60 cursor-not-allowed opacity-50"
                  }`}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 1 PROJECT: Single wide featured card (60% Mockup Left, 40% Content Right; Stack on Mobile) */}
        {isSingle && (
          <SingleFeaturedProjectCard project={projects[0]} />
        )}

        {/* 2-3 PROJECTS: Clean responsive grid */}
        {!isSingle && !isCarousel && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {projects.map((project, idx) => (
              <GridProjectCard key={project.name} project={project} index={idx} />
            ))}
          </div>
        )}

        {/* 4+ PROJECTS: Horizontal carousel */}
        {isCarousel && (
          <div className="relative -mx-6 sm:-mx-12 px-6 sm:px-12">
            <div
              className={`pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-white via-white/80 to-transparent z-20 transition-opacity duration-300 ${
                canScrollLeft ? "opacity-100" : "opacity-0"
              }`}
            />
            <div
              className={`pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-white via-white/80 to-transparent z-20 transition-opacity duration-300 ${
                canScrollRight ? "opacity-100" : "opacity-0"
              }`}
            />

            <div
              ref={scrollContainerRef}
              tabIndex={0}
              onKeyDown={handleKeyDown}
              aria-label="Website projects"
              role="region"
              className="flex items-stretch gap-6 sm:gap-8 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-4 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-red/40 rounded-3xl"
              style={{
                scrollSnapType: "x mandatory",
                WebkitOverflowScrolling: "touch",
                touchAction: "pan-x",
              }}
            >
              {projects.map((project, idx) => (
                <CarouselProjectCard key={project.name} project={project} index={idx} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function BrowserMockupViewport({
  imageSrc,
  altText,
  isHovered,
}: {
  imageSrc: string;
  altText: string;
  isHovered: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTaller, setIsTaller] = useState(true);
  const [overflowPx, setOverflowPx] = useState(240);

  const measure = () => {
    if (!containerRef.current) return;
    const containerHeight = containerRef.current.clientHeight;
    const inner = containerRef.current.querySelector(".mockup-img-inner") as HTMLElement;
    if (inner && containerHeight > 0) {
      const imgHeight = inner.offsetHeight;
      if (imgHeight > containerHeight + 20) {
        setIsTaller(true);
        setOverflowPx(imgHeight - containerHeight);
      } else {
        setIsTaller(false);
      }
    }
  };

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative aspect-[16/10] sm:aspect-[16/9.5] w-full overflow-hidden bg-slate-100 flex-grow min-h-[260px] sm:min-h-[340px]"
    >
      <div
        className="mockup-img-inner relative w-full will-change-transform"
        style={{
          transform: shouldReduceMotion
            ? undefined
            : isHovered
            ? isTaller
              ? `translateY(-${overflowPx}px)`
              : "scale(1.05)"
            : isTaller
            ? "translateY(0px)"
            : "scale(1)",
          transition: shouldReduceMotion
            ? undefined
            : isHovered
            ? isTaller
              ? "transform 6s ease-in-out"
              : "transform 0.6s ease-out"
            : isTaller
            ? "transform 1.2s ease-out"
            : "transform 0.6s ease-out",
        }}
      >
        <Image
          src={imageSrc}
          alt={altText}
          width={1400}
          height={2400}
          loading="lazy"
          sizes="(max-width: 1024px) 100vw, 720px"
          onLoad={measure}
          className="w-full h-auto object-cover object-top block"
        />
      </div>

      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#8B1A1A]/20 to-transparent pointer-events-none opacity-0 group-hover/mockup:opacity-100 transition-opacity" />

      <div className="absolute bottom-4 right-4 opacity-0 group-hover/mockup:opacity-100 transition-opacity duration-300 pointer-events-none">
        <span className="px-3 py-1.5 rounded-full bg-[#8B1A1A]/90 backdrop-blur-md text-xs font-mono font-bold text-white border border-white/20 flex items-center gap-1.5 shadow-md">
          <ExternalLink className="w-3.5 h-3.5 text-red-200" />
          <span>Visit Site</span>
        </span>
      </div>
    </div>
  );
}

function SingleFeaturedProjectCard({ project }: { project: WebProjectItem }) {
  const [isHovered, setIsHovered] = useState(false);
  let displayUrl = project.url;
  try {
    if (project.url.startsWith("http")) {
      const parsed = new URL(project.url);
      displayUrl = parsed.hostname + (parsed.pathname !== "/" ? parsed.pathname : "");
    }
  } catch {
    displayUrl = project.url;
  }

  return (
    <div
      data-cursor="View"
      className="w-full max-w-6xl mx-auto rounded-2xl sm:rounded-3xl bg-white border border-line/90 shadow-card hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col lg:flex-row items-stretch group"
    >
      {/* Left 60%: Browser Mockup Frame with TiltCard */}
      <TiltCard
        maxTilt={5}
        glare={true}
        className="w-full lg:w-[60%] flex flex-col border-b lg:border-b-0 lg:border-r border-line/90 bg-slate-50"
      >
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="View"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex flex-col h-full group/mockup focus:outline-hidden"
          aria-label={`Open ${project.name} live site`}
        >
          {/* Browser Chrome Header (macOS-style) */}
          <div className="bg-slate-100 border-b border-line/90 px-4 sm:px-5 py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-1.5 shrink-0" aria-hidden="true">
              <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
              <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
              <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
            </div>

            <div className="flex-grow max-w-sm mx-auto bg-white/90 border border-line rounded-lg px-3 py-1 flex items-center justify-center gap-2 text-[11px] font-mono text-body shadow-2xs">
              <Lock className="w-3 h-3 text-brand-red shrink-0" />
              <span className="truncate text-body font-medium">
                {displayUrl}
              </span>
            </div>

            <div className="shrink-0 text-muted group-hover/mockup:text-brand-red transition-colors">
              <ArrowUpRight className="w-4 h-4 group-hover/mockup:translate-x-0.5 group-hover/mockup:-translate-y-0.5 transition-transform" />
            </div>
          </div>

          {/* Viewport Image with auto-scroll or slow zoom */}
          <BrowserMockupViewport
            imageSrc={project.image}
            altText={`${project.name} - ${project.tag} developed by Lucie Creatives`}
            isHovered={isHovered}
          />
        </a>
      </TiltCard>

      {/* Right 40%: Project Details */}
      <div className="w-full lg:w-[40%] flex flex-col justify-between p-6 sm:p-8 lg:p-10 bg-white">
        <div>
          {/* Tag badge: fully visible, never clipped or truncated */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-slate-100 border border-line text-[11px] font-mono font-bold uppercase tracking-wider text-body whitespace-normal">
              {project.tag}
            </span>
          </div>

          {/* Project Title */}
          <h3 className="mt-5 text-2xl sm:text-3xl lg:text-4xl font-black text-ink uppercase tracking-tight group-hover:text-brand-red transition-colors">
            {project.name}
          </h3>

          {/* Description */}
          <p className="mt-4 text-sm sm:text-base text-body font-medium leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Live Site CTA Link Button */}
        <div className="mt-8 pt-6 border-t border-line/60">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="View"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-brand-red hover:bg-brand-redDark text-white font-bold text-sm tracking-wide transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] group/btn"
          >
            <span>Visit live site</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </div>
  );
}

function GridProjectCard({
  project,
  index,
}: {
  project: WebProjectItem;
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  let displayUrl = project.url;
  try {
    if (project.url.startsWith("http")) {
      const parsed = new URL(project.url);
      displayUrl = parsed.hostname + (parsed.pathname !== "/" ? parsed.pathname : "");
    }
  } catch {
    displayUrl = project.url;
  }

  return (
    <TiltCard
      maxTilt={5}
      glare={true}
      className="w-full flex flex-col justify-between group rounded-2xl sm:rounded-3xl bg-white border border-line/90 hover:border-brand-red/40 shadow-card hover:shadow-xl transition-all duration-500 overflow-hidden"
    >
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="View"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="block bg-slate-100"
        aria-label={`Open ${project.name} live site`}
      >
        {/* Browser Chrome Header */}
        <div className="bg-slate-100 border-b border-line/90 px-4 sm:px-5 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 shrink-0" aria-hidden="true">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
            <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
          </div>

          <div className="flex-grow max-w-sm mx-auto bg-white/90 border border-line rounded-lg px-3 py-1 flex items-center justify-center gap-2 text-[11px] font-mono text-body shadow-2xs">
            <Lock className="w-3 h-3 text-brand-red shrink-0" />
            <span className="truncate text-body font-medium">
              {displayUrl}
            </span>
          </div>

          <div className="shrink-0 text-muted group-hover:text-brand-red transition-colors">
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>

        {/* Viewport Image with auto-scroll or slow zoom */}
        <BrowserMockupViewport
          imageSrc={project.image}
          altText={`${project.name} - ${project.tag} developed by Lucie Creatives`}
          isHovered={isHovered}
        />
      </a>

      {/* Details Under Card */}
      <div className="p-6 flex flex-col justify-between flex-grow">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <span className="px-2.5 py-1 rounded-full bg-slate-100 border border-line text-[10px] font-mono font-bold uppercase tracking-wider text-body whitespace-normal">
              {project.tag}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-ink group-hover:text-brand-red transition-colors">
            {project.name}
          </h3>
          <p className="text-xs sm:text-sm text-muted font-medium mt-2 leading-relaxed">
            {project.description}
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-line/60">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="View"
            className="inline-flex items-center gap-2 text-xs font-bold text-brand-red hover:text-brand-redDark group/link"
          >
            <span>Visit live site</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </TiltCard>
  );
}

function CarouselProjectCard({
  project,
  index,
}: {
  project: WebProjectItem;
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  let displayUrl = project.url;
  try {
    if (project.url.startsWith("http")) {
      const parsed = new URL(project.url);
      displayUrl = parsed.hostname + (parsed.pathname !== "/" ? parsed.pathname : "");
    }
  } catch {
    displayUrl = project.url;
  }

  return (
    <TiltCard
      maxTilt={5}
      glare={true}
      className="browser-card snap-center shrink-0 w-[85vw] sm:w-[520px] lg:w-[600px] flex flex-col justify-between group cursor-pointer focus-within:outline-hidden"
    >
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="View"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="block rounded-2xl sm:rounded-3xl bg-white border border-line/90 hover:border-brand-red/40 shadow-card hover:shadow-xl transition-all duration-500 overflow-hidden"
        aria-label={`Open ${project.name} live site`}
      >
        {/* Realistic Browser Chrome Header (macOS-style) */}
        <div className="bg-slate-100 border-b border-line/90 px-4 sm:px-5 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 shrink-0" aria-hidden="true">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
            <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
          </div>

          <div className="flex-grow max-w-sm mx-auto bg-white/90 border border-line rounded-lg px-3 py-1 flex items-center justify-center gap-2 text-[11px] font-mono text-body shadow-2xs">
            <Lock className="w-3 h-3 text-brand-red shrink-0" />
            <span className="truncate text-body font-medium">
              {displayUrl}
            </span>
          </div>

          <div className="shrink-0 text-muted group-hover:text-brand-red transition-colors">
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>

        {/* Viewport Image with auto-scroll or slow zoom */}
        <BrowserMockupViewport
          imageSrc={project.image}
          altText={`${project.name} - ${project.tag} developed by Lucie Creatives`}
          isHovered={isHovered}
        />
      </a>

      {/* Caption Under Card */}
      <div className="mt-4 px-1 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 sm:gap-4">
        <div>
          <h3 className="text-base sm:text-lg font-black text-ink group-hover:text-brand-red transition-colors">
            {project.name}
          </h3>
          <p className="text-xs sm:text-sm text-muted font-medium mt-0.5">
            {project.description}
          </p>
        </div>
        <span className="self-start sm:self-auto px-2.5 py-1 rounded-full bg-slate-100 border border-line text-[10px] font-mono font-bold uppercase tracking-wider text-body whitespace-normal">
          {project.tag}
        </span>
      </div>
    </TiltCard>
  );
}
