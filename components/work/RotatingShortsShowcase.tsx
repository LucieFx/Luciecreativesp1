"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { WorkProject } from "@/lib/work-data";
import { SITE_STATS } from "@/lib/site-stats";
import { extractYouTubeVideoId } from "@/lib/youtube";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Sparkles,
  ArrowUpRight,
  Maximize2,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { WorkSectionHeading } from "./WorkSectionHeading";
import { IPhoneReelsCard } from "./IPhoneReelsCard";
import { motion, AnimatePresence } from "framer-motion";

interface RotatingShortsShowcaseProps {
  projects: WorkProject[];
}

type ReelCategory =
  | "All Reels"
  | "Luxury Real Estate"
  | "Hospitality & Resort"
  | "Founder Podcasts"
  | "Interior Design"
  | "Brand & D2C";

const REEL_CATEGORIES: ReelCategory[] = [
  "All Reels",
  "Luxury Real Estate",
  "Hospitality & Resort",
  "Founder Podcasts",
  "Interior Design",
  "Brand & D2C",
];

function parseViewCount(viewsStr?: string): number {
  if (!viewsStr) return 0;
  const cleaned = viewsStr.toUpperCase().replace(/[^0-9.KMB]/g, "");
  if (cleaned.endsWith("M")) return parseFloat(cleaned) * 1_000_000;
  if (cleaned.endsWith("K")) return parseFloat(cleaned) * 1_000;
  if (cleaned.endsWith("B")) return parseFloat(cleaned) * 1_000_000_000;
  return parseFloat(cleaned) || 0;
}

function filterProjects(allProjects: WorkProject[], category: ReelCategory): WorkProject[] {
  if (category === "All Reels") return allProjects;
  return allProjects.filter((p) => {
    const cat = p.reelCategory || p.category;
    return cat === category;
  });
}

function getTilePoster(project: WorkProject): string {
  // Always prioritize curated, verified poster thumbnails over Cloudinary auto-frame so_0 (which can return blank/red placeholder frames)
  if (project.posterSrc && !project.posterSrc.includes("placeholder")) {
    return project.posterSrc;
  }
  if (
    project.videoSrc &&
    project.videoSrc.includes("res.cloudinary.com") &&
    project.videoSrc.includes("/video/upload/")
  ) {
    return project.videoSrc
      .replace("/video/upload/", "/video/upload/so_0,f_auto,q_auto,w_300/")
      .replace(/\.(mp4|mov|webm)$/i, ".jpg");
  }
  return project.posterSrc || "";
}

function NowPlayingHUD({ compact = false }: { compact?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={`absolute ${
        compact ? "top-2 right-2 px-1.5 py-0.5" : "top-2.5 right-2.5 px-2 py-1"
      } z-30 flex items-center gap-1.5 rounded-full bg-black/85 backdrop-blur-md border border-[#FF4D5E]/40 text-white shadow-[0_4px_14px_rgba(122,31,43,0.45)] pointer-events-none transition-all duration-300`}
    >
      {/* Pulsing ruby live beacon dot */}
      <span className="relative flex h-1.5 w-1.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF4D5E] opacity-75" />
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#FF4D5E]" />
      </span>

      {/* 4-bar dynamic audio equalizer */}
      <div className="flex items-end gap-[1.5px] h-2.5">
        <span className="w-[1.5px] bg-white rounded-full animate-eq-bar-1" />
        <span className="w-[1.5px] bg-[#FF4D5E] rounded-full animate-eq-bar-2" />
        <span className="w-[1.5px] bg-white rounded-full animate-eq-bar-3" />
        <span className="w-[1.5px] bg-[#FF4D5E] rounded-full animate-eq-bar-4" />
      </div>

      <span className="text-[8.5px] font-mono font-black tracking-wider uppercase text-white/95 leading-none">
        LIVE
      </span>
    </div>
  );
}

export function RotatingShortsShowcase({ projects }: RotatingShortsShowcaseProps) {
  const [activeCategory, setActiveCategory] = useState<ReelCategory>("All Reels");
  const [activeSlug, setActiveSlug] = useState<string>(projects[0]?.slug || "");
  const [showAll, setShowAll] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isInViewport, setIsInViewport] = useState(false);
  const [isHoveredPhone, setIsHoveredPhone] = useState(false);
  const pauseAutoRotateTimer = useRef<NodeJS.Timeout | null>(null);

  // Theater modal state
  const [theaterProject, setTheaterProject] = useState<WorkProject | null>(null);
  const [theaterPlaying, setTheaterPlaying] = useState(true);
  const [theaterMuted, setTheaterMuted] = useState(false);
  const [theaterProgress, setTheaterProgress] = useState(0);
  const theaterVideoRef = useRef<HTMLVideoElement>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const phoneContainerRef = useRef<HTMLDivElement>(null);
  const desktopTileRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Detect reduced motion preference
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // IntersectionObserver to only autoplay when the phone is in the viewport
  useEffect(() => {
    const target = phoneContainerRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  // Body overflow locking for theater modal
  useEffect(() => {
    if (theaterProject) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [theaterProject]);

  // Escape key closes modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setTheaterProject(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Filter projects
  const filteredProjects = useMemo(
    () => filterProjects(projects, activeCategory),
    [projects, activeCategory]
  );

  // Active project selection
  const activeProject = useMemo(() => {
    const found = filteredProjects.find((p) => p.slug === activeSlug);
    if (found) return found;
    return filteredProjects[0] || projects[0];
  }, [filteredProjects, activeSlug, projects]);

  // Top 3 highest-view-count reels for auto-rotation
  const top3Reels = useMemo(() => {
    return [...filteredProjects]
      .sort((a, b) => parseViewCount(b.views) - parseViewCount(a.views))
      .slice(0, 3);
  }, [filteredProjects]);

  // Sync featured phone mockup on the left to auto-rotate through the top 3 highest-view reels
  useEffect(() => {
    if (reducedMotion || !isInViewport || isHoveredPhone || top3Reels.length < 2) {
      return;
    }

    const interval = setInterval(() => {
      setActiveSlug((currentSlug) => {
        const currentIdx = top3Reels.findIndex((r) => r.slug === currentSlug);
        const nextIdx = (currentIdx + 1) % top3Reels.length;
        return top3Reels[nextIdx].slug;
      });
    }, 6000);

    return () => clearInterval(interval);
  }, [top3Reels, isInViewport, isHoveredPhone, reducedMotion]);

  // Handle category chip click
  const handleCategorySelect = (category: ReelCategory) => {
    setActiveCategory(category);
    setShowAll(false);
    const nextFiltered = filterProjects(projects, category);
    if (nextFiltered.length > 0 && !nextFiltered.some((p) => p.slug === activeSlug)) {
      setActiveSlug(nextFiltered[0].slug);
    }
  };

  // Handle tile selection
  const handleSelectReel = (reel: WorkProject, scrollOnMobile = false) => {
    setActiveSlug(reel.slug);
    setIsHoveredPhone(true);
    if (pauseAutoRotateTimer.current) clearTimeout(pauseAutoRotateTimer.current);
    pauseAutoRotateTimer.current = setTimeout(() => {
      setIsHoveredPhone(false);
    }, 15000);
    if (scrollOnMobile && phoneContainerRef.current) {
      const rect = phoneContainerRef.current.getBoundingClientRect();
      if (rect.top < 0 || rect.bottom > window.innerHeight) {
        phoneContainerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  // Desktop keyboard arrow navigation between tiles
  const handleTileKeyDown = (e: React.KeyboardEvent, index: number, total: number) => {
    let nextIndex = index;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      nextIndex = (index + 1) % total;
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      nextIndex = (index - 1 + total) % total;
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      nextIndex = Math.min(total - 1, index + 4);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      nextIndex = Math.max(0, index - 4);
    }

    if (nextIndex !== index) {
      const target = desktopTileRefs.current[nextIndex];
      if (target) {
        target.focus();
        handleSelectReel(visibleDesktopProjects[nextIndex], false);
      }
    }
  };

  // Desktop visible tiles: 2 rows of 4 = 8 tiles visible unless showAll is true
  const visibleDesktopProjects = useMemo(() => {
    if (showAll) return filteredProjects;
    return filteredProjects.slice(0, 8);
  }, [filteredProjects, showAll]);

  // Theater time update & seek
  const handleTheaterTimeUpdate = () => {
    const vid = theaterVideoRef.current;
    if (!vid || !vid.duration) return;
    setTheaterProgress((vid.currentTime / vid.duration) * 100);
  };

  const handleTheaterSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vid = theaterVideoRef.current;
    if (!vid || !vid.duration) return;
    const newTime = (parseFloat(e.target.value) / 100) * vid.duration;
    vid.currentTime = newTime;
    setTheaterProgress(parseFloat(e.target.value));
  };

  if (projects.length === 0 || !activeProject) return null;

  return (
    <section
      id="short-form-videos"
      ref={sectionRef}
      className="relative w-full py-16 sm:py-24 bg-[#FAFAF9] text-text-primary overflow-hidden select-none border-b border-line/90"
      style={{
        backgroundImage: `
          radial-gradient(ellipse 70% 55% at 50% 25%, rgba(139, 26, 26, 0.055) 0%, rgba(139, 26, 26, 0.015) 55%, transparent 100%),
          radial-gradient(circle at 10% 80%, rgba(139, 26, 26, 0.035) 0%, transparent 45%),
          radial-gradient(circle at 90% 20%, rgba(139, 26, 26, 0.035) 0%, transparent 45%)
        `,
      }}
    >
      {/* Background Micro-Dot Grid Texture matching maroon/white palette */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage: `radial-gradient(circle, #8B1A1A 0.75px, transparent 0.75px)`,
          backgroundSize: "24px 24px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        {/* Section Header with Unified System Architecture */}
        <WorkSectionHeading
          badgeIcon={Sparkles}
          badgeText="High-Retention Vertical Cinema"
          primaryWord="Short Form"
          accentWord="Reels"
          description="Engineered to stop the scroll in under 1.2 seconds. Dynamic 9:16 vertical cinema designed for Instagram Reels, TikTok, and YouTube Shorts."
          actionSlot={
            <div className="flex items-center gap-2.5">
              {/* Audio Toggle Button */}
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="px-3.5 py-2 rounded-full bg-white hover:bg-line/60 border border-line text-xs font-bold flex items-center gap-2 text-ink transition-all cursor-pointer shadow-2xs"
                title={isMuted ? "Unmute Audio" : "Mute Audio"}
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4 text-muted" />
                ) : (
                  <Volume2 className="w-4 h-4 text-[#7A1F2B]" />
                )}
                <span className="hidden sm:inline">{isMuted ? "Muted" : "Sound On"}</span>
              </button>
            </div>
          }
        />

        {/* ─────────────────────────────────────────────────────────────
            MAIN LAYOUT: TWO COLUMNS ON DESKTOP (>= 1024px), STACKED ON MOBILE
           ───────────────────────────────────────────────────────────── */}
        <div className="mt-8 lg:mt-12 lg:grid lg:grid-cols-12 lg:gap-10 lg:items-start">
          {/* ─────────────────────────────────────────────────────────
              COLUMN 1 / TOP: HERO PHONE + METADATA & BUTTONS
             ───────────────────────────────────────────────────────── */}
          <div
            ref={phoneContainerRef}
            onMouseEnter={() => setIsHoveredPhone(true)}
            onMouseLeave={() => setIsHoveredPhone(false)}
            className="lg:col-span-5 xl:col-span-5 flex flex-col items-center"
          >
            {/* Top 3 Auto-Rotation Indicator */}
            {top3Reels.length > 1 && (
              <div className="flex items-center gap-2 mb-3.5 px-3 py-1 rounded-full bg-white/90 border border-[#8B1A1A]/15 shadow-2xs">
                <span className="text-[10px] font-mono tracking-wider uppercase text-[#8B1A1A] font-bold">
                  Auto-Rotating Top 3 ({Math.max(1, top3Reels.findIndex((r) => r.slug === activeProject.slug) + 1)}/3)
                </span>
                <div className="flex items-center gap-1.5">
                  {top3Reels.map((r, i) => {
                    const isCurrent = r.slug === activeProject.slug;
                    return (
                      <button
                        key={r.slug}
                        onClick={() => handleSelectReel(r)}
                        className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                          isCurrent ? "w-5 bg-[#8B1A1A]" : "w-1.5 bg-[#8B1A1A]/25 hover:bg-[#8B1A1A]/50"
                        }`}
                        title={`Top Reel ${i + 1}: ${r.client}`}
                        aria-label={`View top reel ${i + 1}: ${r.client}`}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {/* The Single Phone (Height exact 576/1024 aspect ratio, responsive widths) */}
            <div className="relative w-[260px] min-[360px]:w-[280px] sm:w-[320px] lg:w-[360px] xl:w-[380px] aspect-[576/1024] max-w-full drop-shadow-[0_25px_35px_rgba(122,31,43,0.28)] drop-shadow-[0_15px_20px_rgba(0,0,0,0.20)] overflow-hidden rounded-[48px]">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={activeProject.slug}
                  initial={
                    reducedMotion
                      ? false
                      : { x: "100%", opacity: 0.85, filter: "blur(8px)" }
                  }
                  animate={
                    reducedMotion
                      ? false
                      : { x: "0%", opacity: 1, filter: "blur(0px)" }
                  }
                  exit={
                    reducedMotion
                      ? undefined
                      : {
                          x: "-100%",
                          opacity: 0.8,
                          filter: "blur(8px)",
                        }
                  }
                  transition={{
                    x: { type: "spring", stiffness: 340, damping: 24, mass: 0.8 },
                    opacity: { duration: 0.25 },
                    filter: { duration: 0.25 },
                  }}
                  className="w-full h-full"
                >
                  <IPhoneReelsCard
                    project={activeProject}
                    isCenter={true}
                    isMuted={isMuted}
                    reducedMotion={reducedMotion}
                    isInViewport={isInViewport}
                    onOpenTheater={() => setTheaterProject(activeProject)}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Metadata & Actions Under the Phone */}
            <div className="w-full max-w-sm text-center mt-5 sm:mt-6 px-2">
              <span className="text-xs font-mono tracking-widest text-[#7A1F2B] font-bold uppercase block mb-1">
                {activeProject.client}
              </span>
              <h3 className="text-base sm:text-lg font-black text-ink leading-snug mb-3.5 line-clamp-2">
                {activeProject.title}
              </h3>

              <div className="flex items-center justify-center gap-2.5 sm:gap-3 flex-wrap">
                <button
                  onClick={() => setTheaterProject(activeProject)}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-ink hover:text-ink bg-white hover:bg-line/60 px-4 sm:px-5 py-2.5 rounded-full border border-line/90 shadow-2xs hover:shadow-xs transition-all cursor-pointer"
                >
                  <Maximize2 className="w-4 h-4 text-body" />
                  <span>Watch Full</span>
                </button>

                <Link
                  href={`/work/${activeProject.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-white bg-[#7A1F2B] hover:bg-[#631923] px-5 sm:px-6 py-2.5 rounded-full transition-all shadow-red-btn hover:shadow-red-hover group/btn cursor-pointer"
                >
                  <span>Case Study</span>
                  <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────
              COLUMN 2 / BOTTOM: FILTER CHIPS + REEL PICKER GRID / SNAP ROW
             ───────────────────────────────────────────────────────── */}
          <div className="lg:col-span-7 xl:col-span-7 mt-10 lg:mt-0 flex flex-col">
            {/* Filter Chips: Desktop row, Mobile horizontally scrollable row */}
            <div className="w-full overflow-x-auto no-scrollbar py-1 mb-5 sm:mb-6">
              <div className="flex items-center gap-2 min-w-max lg:flex-wrap">
                {REEL_CATEGORIES.map((cat) => {
                  const isActive = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => handleCategorySelect(cat)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all cursor-pointer shadow-2xs whitespace-nowrap ${
                        isActive
                          ? "bg-[#7A1F2B] text-white border border-[#7A1F2B] shadow-sm"
                          : "bg-white text-body border border-line hover:border-[#7A1F2B]/40 hover:text-[#7A1F2B]"
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mobile / Tablet (< 1024px): Horizontally Scrolling Snap Row (~3.2 tiles visible) */}
            <div className="lg:hidden w-full overflow-x-auto no-scrollbar snap-x snap-mandatory flex gap-3.5 py-3 px-0.5">
              {filteredProjects.map((reel) => {
                const isActive = reel.slug === activeProject.slug;
                return (
                  <button
                    key={`mob-${reel.slug}`}
                    onClick={() => handleSelectReel(reel, true)}
                    aria-label={`Play ${reel.title}`}
                    aria-pressed={isActive}
                    className={`relative shrink-0 w-[calc((100%-2.2*14px)/3.2)] min-w-[105px] max-w-[135px] aspect-[9/16] rounded-2xl overflow-hidden snap-start transition-all duration-300 cursor-pointer text-left group ${
                      isActive
                        ? "ring-2 ring-[#FF4D5E] ring-offset-2 ring-offset-white shadow-[0_0_20px_rgba(255,77,94,0.35),0_8px_20px_rgba(122,31,43,0.22)] -translate-y-0.5"
                        : "border border-[#8B1A1A]/10 shadow-[0_4px_16px_rgba(139,26,26,0.06)] hover:border-[#8B1A1A]/30 bg-slate-950"
                    }`}
                  >
                    {/* Active Laser Perimeter Ring (Center Masked so Thumbnail is 100% visible) */}
                    {isActive && !reducedMotion && (
                      <div
                        aria-hidden="true"
                        className="absolute -inset-[2px] rounded-[18px] pointer-events-none p-[2px] z-20 overflow-hidden"
                        style={{
                          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                          WebkitMaskComposite: "xor",
                          maskComposite: "exclude",
                        }}
                      >
                        <div
                          style={{
                            background:
                              "conic-gradient(from 0deg, #FF4D5E 0%, #7A1F2B 20%, #FF808F 45%, #FFFFFF 50%, #FF808F 55%, #7A1F2B 80%, #FF4D5E 100%)",
                            animation: "spin-conic 3s linear infinite",
                          }}
                          className="absolute -inset-[150%] will-change-transform"
                        />
                      </div>
                    )}

                    {/* Creative Cinema Skeleton Background */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#180507] via-[#290b10] to-[#140406] z-0 flex flex-col items-center justify-center pointer-events-none overflow-hidden">
                      <div
                        aria-hidden="true"
                        className="absolute inset-x-0 h-10 bg-gradient-to-b from-transparent via-[#FF4D5E]/20 to-transparent pointer-events-none animate-radar-sweep"
                      />
                      <div className="flex items-center gap-1 opacity-25">
                        <div className="w-1 h-3 bg-[#FF4D5E] rounded-full animate-pulse" />
                        <div className="w-1 h-6 bg-[#FF4D5E] rounded-full animate-pulse [animation-delay:200ms]" />
                        <div className="w-1 h-8 bg-[#FF4D5E] rounded-full animate-pulse [animation-delay:400ms]" />
                        <div className="w-1 h-4 bg-[#FF4D5E] rounded-full animate-pulse [animation-delay:300ms]" />
                      </div>
                    </div>

                    <Image
                      src={getTilePoster(reel)}
                      alt={reel.title}
                      fill
                      sizes="(max-width: 1024px) 140px, 160px"
                      className="object-cover transition-transform duration-300 group-hover:scale-105 relative z-10"
                    />
                    {isActive && <NowPlayingHUD compact />}

                    {/* Bottom Overlay: Thin client name with semi-transparent black gradient */}
                    <div className="absolute inset-x-0 bottom-0 pt-8 pb-2.5 px-2 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none z-10 flex flex-col justify-end">
                      <span className="text-[10.5px] font-bold text-white tracking-tight line-clamp-1 leading-tight drop-shadow-xs">
                        {reel.client}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Desktop (>= 1024px): 4-Column Grid with Wave Reveal from Top-Left */}
            <div className="hidden lg:block">
              <div className="grid grid-cols-4 gap-4">
                {visibleDesktopProjects.map((reel, idx) => {
                  const isActive = reel.slug === activeProject.slug;
                  const col = idx % 4;
                  const row = Math.floor(idx / 4);
                  const waveDelay = (col + row) * 0.05;

                  return (
                    <motion.div
                      key={`desk-wrap-${reel.slug}`}
                      initial={reducedMotion ? undefined : { opacity: 0, scale: 0.92, y: 16 }}
                      whileInView={reducedMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{
                        delay: waveDelay,
                        duration: 0.4,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="w-full"
                    >
                      <button
                        ref={(el) => {
                          desktopTileRefs.current[idx] = el;
                        }}
                        onClick={() => handleSelectReel(reel, false)}
                        onKeyDown={(e) =>
                          handleTileKeyDown(e, idx, visibleDesktopProjects.length)
                        }
                        aria-label={`Play ${reel.title}`}
                        aria-pressed={isActive}
                        className={`relative w-full aspect-[9/16] rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer text-left group hover:-translate-y-1 ${
                          isActive
                            ? "ring-2 ring-[#FF4D5E] ring-offset-2 ring-offset-white shadow-[0_0_25px_rgba(255,77,94,0.35),0_12px_28px_rgba(122,31,43,0.25)] -translate-y-1"
                            : "border border-[#8B1A1A]/10 shadow-[0_4px_16px_rgba(139,26,26,0.06)] hover:shadow-[0_10px_24px_rgba(139,26,26,0.12)] hover:border-[#8B1A1A]/30 bg-slate-950"
                        }`}
                      >
                        {/* Active Rotating Laser Perimeter Ring (Center Masked so Thumbnail is 100% visible) */}
                        {isActive && !reducedMotion && (
                          <div
                            aria-hidden="true"
                            className="absolute -inset-[2px] rounded-[18px] pointer-events-none p-[2.5px] z-20 overflow-hidden"
                            style={{
                              WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                              WebkitMaskComposite: "xor",
                              maskComposite: "exclude",
                            }}
                          >
                            <div
                              style={{
                                background:
                                  "conic-gradient(from 0deg, #FF4D5E 0%, #7A1F2B 20%, #FF808F 45%, #FFFFFF 50%, #FF808F 55%, #7A1F2B 80%, #FF4D5E 100%)",
                                animation: "spin-conic 3s linear infinite",
                              }}
                              className="absolute -inset-[150%] will-change-transform"
                            />
                          </div>
                        )}

                        {/* Creative Cinema Skeleton Background */}
                        <div className="absolute inset-0 bg-gradient-to-b from-[#180507] via-[#290b10] to-[#140406] z-0 flex flex-col items-center justify-center pointer-events-none overflow-hidden">
                          <div
                            aria-hidden="true"
                            className="absolute inset-x-0 h-12 bg-gradient-to-b from-transparent via-[#FF4D5E]/20 to-transparent pointer-events-none animate-radar-sweep"
                          />
                          <div className="flex items-center gap-1.5 opacity-25">
                            <div className="w-1 h-4 bg-[#FF4D5E] rounded-full animate-pulse" />
                            <div className="w-1 h-8 bg-[#FF4D5E] rounded-full animate-pulse [animation-delay:200ms]" />
                            <div className="w-1 h-12 bg-[#FF4D5E] rounded-full animate-pulse [animation-delay:400ms]" />
                            <div className="w-1 h-6 bg-[#FF4D5E] rounded-full animate-pulse [animation-delay:300ms]" />
                            <div className="w-1 h-3 bg-[#FF4D5E] rounded-full animate-pulse [animation-delay:150ms]" />
                          </div>
                        </div>

                        <Image
                          src={getTilePoster(reel)}
                          alt={reel.title}
                          fill
                          sizes="(max-width: 1280px) 25vw, 200px"
                          className="object-cover transition-transform duration-500 group-hover:scale-105 relative z-10"
                        />
                        {isActive && <NowPlayingHUD />}

                        {/* Thin client name overlay with semi-transparent black gradient */}
                        <div className="absolute inset-x-0 bottom-0 pt-10 pb-3 px-3 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none z-10 flex flex-col justify-end">
                          <span className="text-[11.5px] font-bold text-white tracking-tight line-clamp-1 leading-tight drop-shadow-xs">
                            {reel.client}
                          </span>
                          <div className="mt-1 text-[9.5px]">
                            <span className="font-mono text-white/75 uppercase tracking-wider truncate block">
                              {reel.reelCategory || reel.category}
                            </span>
                          </div>
                        </div>
                      </button>
                    </motion.div>
                  );
                })}
              </div>

              {/* Show More / Load More Button if more than 8 tiles */}
              {filteredProjects.length > 8 && (
                <div className="mt-8 flex justify-center">
                  <button
                    onClick={() => setShowAll((prev) => !prev)}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white hover:bg-[#8B1A1A]/5 border border-[#8B1A1A]/20 hover:border-[#8B1A1A]/40 text-xs font-bold text-[#8B1A1A] transition-all cursor-pointer shadow-2xs hover:shadow-xs"
                  >
                    <span>
                      {showAll
                        ? "Show Less"
                        : `Load More Reels (${filteredProjects.length - 8} more)`}
                    </span>
                    {showAll ? (
                      <ChevronUp className="w-4 h-4 text-[#8B1A1A]" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#8B1A1A]" />
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          FULLSCREEN THEATER MODAL (True 9:16 Vertical Cinema Player)
         ───────────────────────────────────────────────────────────── */}
      {theaterProject &&
        isMounted &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] top-0 left-0 w-full h-full bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
            onClick={() => setTheaterProject(null)}
            role="dialog"
            aria-modal="true"
          >
            <div
              className="relative w-full max-w-4xl bg-white border border-line rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setTheaterProject(null)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-40 p-2.5 rounded-full bg-black/60 md:bg-white/90 text-white md:text-ink hover:scale-105 active:scale-95 transition-all cursor-pointer border border-white/20 md:border-line shadow-md"
                aria-label="Close theater modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left Column: 9:16 Video Canvas */}
              <div className="relative w-full md:w-1/2 bg-black flex items-center justify-center overflow-hidden min-h-[360px] md:min-h-[580px]">
                {extractYouTubeVideoId(theaterProject.videoSrc) ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${extractYouTubeVideoId(
                      theaterProject.videoSrc
                    )}?autoplay=1&mute=${
                      theaterMuted ? 1 : 0
                    }&loop=1&playlist=${extractYouTubeVideoId(
                      theaterProject.videoSrc
                    )}&playsinline=1&rel=0&modestbranding=1`}
                    title={theaterProject.title}
                    className="w-full h-full max-h-[85vh] border-0 aspect-[9/16]"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="no-referrer"
                    allowFullScreen
                  />
                ) : (
                  <>
                    <video
                      ref={theaterVideoRef}
                      src={theaterProject.videoSrc}
                      playsInline
                      autoPlay
                      muted={theaterMuted}
                      loop
                      preload="metadata"
                      onTimeUpdate={handleTheaterTimeUpdate}
                      onEnded={(e) => {
                        e.currentTarget.currentTime = 0;
                        e.currentTarget.play().catch(() => {});
                      }}
                      className="w-full h-full max-h-[85vh] object-contain"
                    />

                    {/* Video Bottom Player Controls */}
                    <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/95 via-black/60 to-transparent z-30 flex flex-col gap-2">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="0.1"
                        value={theaterProgress}
                        onChange={handleTheaterSeek}
                        aria-label="Seek reel"
                        className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-brand-red"
                      />

                      <div className="flex items-center justify-between text-xs font-mono text-white/90">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => {
                              const vid = theaterVideoRef.current;
                              if (!vid) return;
                              if (vid.paused) {
                                vid.play();
                                setTheaterPlaying(true);
                              } else {
                                vid.pause();
                                setTheaterPlaying(false);
                              }
                            }}
                            className="p-1 rounded bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                          >
                            {theaterPlaying ? (
                              <Pause className="w-4 h-4" />
                            ) : (
                              <Play className="w-4 h-4 fill-current" />
                            )}
                          </button>

                          <button
                            onClick={() => setTheaterMuted(!theaterMuted)}
                            className="p-1 rounded bg-white/10 hover:bg-white/20 text-white cursor-pointer flex items-center gap-1.5"
                          >
                            {theaterMuted ? (
                              <VolumeX className="w-4 h-4 text-red-400" />
                            ) : (
                              <Volume2 className="w-4 h-4 text-brand-red" />
                            )}
                            <span className="text-[10px]">
                              {theaterMuted ? "Muted" : "Sound"}
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Right Column: Case Details & Brief */}
              <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto bg-white text-ink border-t md:border-t-0 md:border-l border-line/60">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-redLight border border-brand-red/20 text-xs font-mono font-bold text-brand-red uppercase mb-4">
                    <span>{theaterProject.client}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-ink leading-tight">
                    {theaterProject.title}
                  </h3>

                  <p className="mt-3 text-xs sm:text-sm text-body font-medium leading-relaxed">
                    {theaterProject.brief}
                  </p>

                  {/* Key Deliverables Pill Badges */}
                  <div className="mt-5 space-y-2">
                    <div className="text-[11px] font-mono text-muted font-bold uppercase tracking-wider">
                      Production Deliverables:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {theaterProject.deliverables.map((deliv, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-lg bg-white border border-line text-[11px] font-semibold text-body"
                        >
                          {deliv}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Documented Outcome Metric Block */}
                  <div className="mt-6 p-4 rounded-2xl bg-brand-redLight/40 border border-brand-red/20 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-wider text-muted">
                        Documented Commercial Result
                      </div>
                      <div className="text-2xl font-black text-brand-red font-mono mt-0.5">
                        {theaterProject.views || theaterProject.outcomeMetric || SITE_STATS.viewsLabel}
                      </div>
                    </div>
                    <div className="text-xs text-body font-semibold text-right">
                      Total Organic Views Generated
                    </div>
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="mt-8 pt-4 border-t border-line/60 flex items-center justify-between">
                  <span className="text-xs font-mono text-muted">
                    Client: {theaterProject.client}
                  </span>

                  <Link
                    href={`/work/${theaterProject.slug}`}
                    onClick={() => setTheaterProject(null)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-red hover:bg-brand-redDark text-white text-xs font-black transition-all shadow-red-btn"
                  >
                    <span>Explore Full Case Study</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}

      <style jsx>{`
        @keyframes spin-conic {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        @keyframes eq-1 {
          0%, 100% { height: 2px; }
          50% { height: 9px; }
        }
        @keyframes eq-2 {
          0%, 100% { height: 10px; }
          50% { height: 3px; }
        }
        @keyframes eq-3 {
          0%, 100% { height: 5px; }
          50% { height: 10px; }
        }
        @keyframes eq-4 {
          0%, 100% { height: 9px; }
          50% { height: 3px; }
        }
        @keyframes radar-sweep {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(400%); }
        }
        :global(.animate-eq-bar-1) { animation: eq-1 0.7s ease-in-out infinite; }
        :global(.animate-eq-bar-2) { animation: eq-2 0.5s ease-in-out infinite; }
        :global(.animate-eq-bar-3) { animation: eq-3 0.9s ease-in-out infinite; }
        :global(.animate-eq-bar-4) { animation: eq-4 0.6s ease-in-out infinite; }
        :global(.animate-radar-sweep) { animation: radar-sweep 2.8s ease-in-out infinite; }
      `}</style>
    </section>
  );
}
