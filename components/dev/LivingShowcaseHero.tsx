"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";

/**
 * Positioning Feature Pills
 */
const FEATURE_PILLS = [
  "Next.js 15 & TypeScript",
  "Sub-Second Latency",
  "Bespoke UI Architecture",
  "100% Mobile Responsive",
];

/**
 * Curated list of the 6 Living Showcase projects
 */
interface ShowcaseSlideItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  techLine: string;
  screenshot: string;
  alt: string;
  domain?: string;
}

const LIVING_PROJECTS: ShowcaseSlideItem[] = [
  {
    id: "media-house",
    slug: "media-house",
    title: "Media House Agency",
    category: "Influencer Marketing & Media",
    description:
      "Creator talent and influencer management platform with interactive roster showcases, brand decks, and real-time campaign metrics.",
    techLine: "TypeScript • Next.js 15",
    screenshot: "/projects/mediahouse-desktop.webp",
    alt: "Media House Agency website homepage",
    domain: "mediahouse.space",
  },
  {
    id: "forever-films",
    slug: "forever-films",
    title: "Forever Films",
    category: "Cinema & Luxury Photography",
    description:
      "Luxury wedding cinematography flagship with sub-second route transitions, dark-mode visual storytelling, and bespoke editorial typography.",
    techLine: "React • Framer Motion",
    screenshot: "/projects/forever-films-desktop.webp",
    alt: "Forever Films website homepage",
    domain: "foreverfilms.in",
  },
  {
    id: "novimail",
    slug: "novimail",
    title: "NoviMail",
    category: "Privacy Email & SaaS Infrastructure",
    description:
      "Custom-domain email hosting platform eliminating rental fees and third-party tracking with unified inbox management and sub-second delivery.",
    techLine: "TypeScript • Next.js 15",
    screenshot: "/projects/novimail-desktop.webp",
    alt: "NoviMail website homepage",
    domain: "novimail.com",
  },
  {
    id: "nimus-ai",
    slug: "nimus-ai",
    title: "Nimus AI",
    category: "Autonomous AI & DevTools",
    description:
      "Autonomous AI engineering agent platform with real-time codebase telemetry, automated debugging workflows, and private LLM infrastructure.",
    techLine: "WebSockets • Autonomous Agents",
    screenshot: "/projects/nimus-ai-desktop.webp",
    alt: "Nimus AI website homepage",
    domain: "nimus.ai",
  },
  {
    id: "kaption",
    slug: "kaption",
    title: "Kaption",
    category: "AI SaaS & Video Tech",
    description:
      "AI-powered captioning SaaS for 50+ Indic languages with sub-second speech processing, 99.2% accuracy, and high-retention typography.",
    techLine: "Web Audio API • AI Speech",
    screenshot: "/projects/kaption-desktop.webp",
    alt: "Kaption website homepage",
  },
  {
    id: "copease",
    slug: "copease",
    title: "CopEase",
    category: "Retail Tech & SaaS",
    description:
      "Zero-app QR file transfer and print queue kiosk for Indian xerox shops, eliminating WhatsApp download friction with instant auto-purge privacy.",
    techLine: "WebSockets • Realtime Queue",
    screenshot: "/projects/copease-desktop.webp",
    alt: "CopEase website homepage",
  },
];

/**
 * Single Slide Visual Card in the Linear Loop
 */
function LivingSlideVisual({
  project,
  isCenter,
  cardWidth,
  cardHeight,
  onClick,
  reducedMotion,
}: {
  project: ShowcaseSlideItem;
  isCenter: boolean;
  cardWidth: number;
  cardHeight: number;
  onClick: () => void;
  reducedMotion: boolean;
}) {
  const [hasError, setHasError] = useState(false);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50, active: false });

  // Cursor tilt physics for interactive center slide
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), {
    stiffness: 240,
    damping: 24,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), {
    stiffness: 240,
    damping: 24,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const xRatio = (e.clientX - rect.left) / rect.width;
    const yRatio = (e.clientY - rect.top) / rect.height;
    mouseX.set(xRatio - 0.5);
    mouseY.set(yRatio - 0.5);
    setGlowPos({
      x: Math.round(xRatio * 100),
      y: Math.round(yRatio * 100),
      active: true,
    });
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setGlowPos((prev) => ({ ...prev, active: false }));
  };

  return (
    <motion.div
      style={{
        width: `${cardWidth}px`,
        height: `${cardHeight}px`,
        rotateX: isCenter && !reducedMotion ? rotateX : 0,
        rotateY: isCenter && !reducedMotion ? rotateY : 0,
        transformPerspective: 1000,
      }}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative shrink-0 rounded-2xl overflow-hidden bg-slate-100 select-none border transition-all duration-300 will-change-transform cursor-pointer ${
        isCenter
          ? "border-slate-300/90 shadow-[0_20px_50px_-10px_rgba(17,17,17,0.22)] scale-100 opacity-100 ring-2 ring-[#8B1A1A]/10"
          : "border-slate-200/80 shadow-[0_12px_32px_-10px_rgba(17,17,17,0.12)] scale-[0.95] opacity-80 hover:opacity-100 hover:scale-[0.98]"
      }`}
    >
      {/* Screenshot image */}
      {hasError ? (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-slate-200 to-slate-100 flex flex-col items-center justify-center p-6 text-center">
          <span className="text-base sm:text-lg font-bold text-slate-700">{project.title}</span>
          <span className="text-xs text-slate-500 mt-1">Website Homepage</span>
        </div>
      ) : (
        <div className="relative w-full h-full">
          <Image
            src={project.screenshot}
            alt={project.alt}
            fill
            sizes="(max-width: 768px) 85vw, 880px"
            priority={isCenter}
            draggable={false}
            onError={() => setHasError(true)}
            className="object-cover object-top select-none pointer-events-none"
          />
        </div>
      )}

      {/* Moving cursor specular highlight */}
      {!reducedMotion && (
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
            glowPos.active ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(255,255,255,0.18) 0%, transparent 60%)`,
          }}
          aria-hidden="true"
        />
      )}
    </motion.div>
  );
}

/**
 * Living Showcase Hero Component with Constant Linear Loop & Hover Pause
 */
export function LivingShowcaseHero() {
  const shouldReduceMotion = Boolean(useReducedMotion());

  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  activeIndexRef.current = activeIndex;

  const [windowDimensions, setWindowDimensions] = useState({ width: 1440, height: 900 });

  // 4 repeated sets to guarantee 100% seamless, mathematically infinite looping
  const REPEATED_PROJECTS = useMemo(
    () => [
      ...LIVING_PROJECTS,
      ...LIVING_PROJECTS,
      ...LIVING_PROJECTS,
      ...LIVING_PROJECTS,
    ],
    []
  );

  // Measure window dimensions
  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Compute card dimensions (16:10 aspect ratio)
  const { cardWidth, cardHeight, gapPx } = useMemo(() => {
    const w = windowDimensions.width;
    const h = windowDimensions.height;
    const budgetH = Math.max(200, Math.min(360, h - 350));
    const proportionalH = Math.round(h * 0.35);
    const computedH = Math.min(budgetH, Math.max(200, proportionalH));
    const computedW = Math.min(Math.round(w * 0.60), Math.round(computedH * 1.6));
    return {
      cardWidth: computedW,
      cardHeight: Math.round(computedW / 1.6),
      gapPx: 28,
    };
  }, [windowDimensions]);

  const stepDistance = cardWidth + gapPx;
  const singleLoopWidth = LIVING_PROJECTS.length * stepDistance;

  // Track position motion value (runs on GPU)
  const currentXRef = useRef(0);
  const trackMotionX = useMotionValue(0);

  // Target gliding state (for manual clicking on tabs or arrows)
  const isTargetingRef = useRef(false);
  const targetXRef = useRef<number | null>(null);

  // Constant linear speed: ~55 pixels per second (brisk, fluid, continuous drift)
  const SPEED_PPS = 55;

  // Linear Constant Loop Engine (continuous forward drift, never pauses on hover)
  useEffect(() => {
    if (shouldReduceMotion || stepDistance <= 0 || singleLoopWidth <= 0) return;

    let lastTime = performance.now();
    let animId: number;

    const tick = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1); // in seconds
      lastTime = now;

      if (isTargetingRef.current && targetXRef.current !== null) {
        // Smoothly glide to target index
        const diff = targetXRef.current - currentXRef.current;
        if (Math.abs(diff) < 0.6) {
          currentXRef.current = targetXRef.current;
          isTargetingRef.current = false;
          targetXRef.current = null;
        } else {
          currentXRef.current += diff * Math.min(dt * 7, 0.22);
        }
      } else {
        // CONSTANT LINEAR FORWARD DRIFT - uninterrupted, never pauses on hover
        currentXRef.current += SPEED_PPS * dt;
      }

      // Seamless modular wrap without visual discontinuity
      while (currentXRef.current >= singleLoopWidth) {
        currentXRef.current -= singleLoopWidth;
        if (targetXRef.current !== null) {
          targetXRef.current -= singleLoopWidth;
        }
      }
      while (currentXRef.current < 0) {
        currentXRef.current += singleLoopWidth;
        if (targetXRef.current !== null) {
          targetXRef.current += singleLoopWidth;
        }
      }

      // Update active centered project index
      const centeredIdx =
        Math.round(currentXRef.current / stepDistance) % LIVING_PROJECTS.length;
      if (centeredIdx !== activeIndexRef.current) {
        activeIndexRef.current = centeredIdx;
        setActiveIndex(centeredIdx);
      }

      // Set hardware transform directly
      const startOffset = windowDimensions.width / 2 - cardWidth / 2;
      trackMotionX.set(startOffset - currentXRef.current);

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [
    shouldReduceMotion,
    stepDistance,
    singleLoopWidth,
    windowDimensions.width,
    cardWidth,
    trackMotionX,
  ]);

  // Navigate directly to a project
  const navigateToSlide = useCallback(
    (targetIndex: number) => {
      const clamped = ((targetIndex % LIVING_PROJECTS.length) + LIVING_PROJECTS.length) % LIVING_PROJECTS.length;
      setActiveIndex(clamped);
      activeIndexRef.current = clamped;

      if (stepDistance <= 0) return;

      const currentIdxFloat = currentXRef.current / stepDistance;
      const currentNormalized = Math.round(currentIdxFloat) % LIVING_PROJECTS.length;
      let forwardSteps = (clamped - currentNormalized + LIVING_PROJECTS.length) % LIVING_PROJECTS.length;
      if (forwardSteps > 3) forwardSteps -= LIVING_PROJECTS.length;

      targetXRef.current = currentXRef.current + forwardSteps * stepDistance;
      isTargetingRef.current = true;
    },
    [stepDistance]
  );

  const handlePrev = useCallback(() => {
    navigateToSlide(activeIndex - 1);
  }, [activeIndex, navigateToSlide]);

  const handleNext = useCallback(() => {
    navigateToSlide(activeIndex + 1);
  }, [activeIndex, navigateToSlide]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      handlePrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      handleNext();
    }
  };

  const handleScrollToGrid = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById("websites-weve-built");
    target?.scrollIntoView({ behavior: "smooth" });
  };

  const activeProject = LIVING_PROJECTS[activeIndex] || LIVING_PROJECTS[0];

  return (
    <section
      id="living-showcase-hero"
      onKeyDown={handleKeyDown}
      className="relative w-full bg-white text-text-primary pt-14 sm:pt-16 lg:pt-18 pb-8 sm:pb-12 overflow-hidden select-none"
    >
      {/* Subtle Maroon Radial Background Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] rounded-full pointer-events-none blur-3xl z-0 transition-transform duration-700 ease-out"
        style={{
          background: "radial-gradient(circle, rgba(139, 26, 26, 0.05) 0%, transparent 70%)",
          transform: `translate(calc(-50% + ${(activeIndex - 2.5) * 30}px), -50%)`,
        }}
        aria-hidden="true"
      />

      <div className="w-full flex flex-col justify-between gap-6 sm:gap-8 overflow-hidden">
        {/* ========================================================================= */}
        {/* 1. TOP TEXT BLOCK (Header, headline, subtext, CTAs, pills)                */}
        {/* ========================================================================= */}
        <div className="max-w-[1200px] w-full mx-auto px-6 relative z-10 shrink-0">
          {/* Top row: HOME link left, label right */}
          <div className="flex items-center justify-between gap-4 mb-1">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted hover:text-[#8B1A1A] transition-colors group"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
              <span>HOME</span>
            </Link>

            <span className="text-[11px] font-mono text-slate-600 font-medium">
              Digital Engineering &amp; Architecture
            </span>
          </div>

          {/* Badge: WEB DEVELOPMENT */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-brand-red-50 border border-brand-red/20 text-[#8B1A1A] text-[10px] sm:text-[11px] font-mono font-bold tracking-wider uppercase mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8B1A1A]" aria-hidden="true" />
            <span>WEB DEVELOPMENT</span>
          </div>

          {/* Headline: Websites that feel alive. with live-pulse dot */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-display font-black text-ink tracking-tight leading-[1.08] text-balance">
            <span>Websites that feel </span>
            <span className="font-accent italic text-[#8B1A1A] relative inline-flex items-baseline">
              alive.
              <span
                className="inline-block relative ml-1 sm:ml-1.5 w-2 h-2 rounded-full bg-[#8B1A1A] align-middle"
                aria-hidden="true"
              >
                {!shouldReduceMotion && (
                  <motion.span
                    className="absolute -inset-1 rounded-full border border-[#8B1A1A]"
                    animate={{
                      scale: [1, 2.2],
                      opacity: [0.8, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                  />
                )}
              </span>
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-xs sm:text-[13px] md:text-sm font-medium text-slate-600 max-w-xl mt-1 leading-snug text-pretty">
            Fast, clean Next.js websites and web apps for brands that want more than a template.
          </p>

          {/* CTAs & Feature Pills */}
          <div className="mt-2.5 flex flex-col md:flex-row md:items-center justify-between gap-2.5 flex-wrap">
            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-1.5 px-5 py-2 rounded-xl bg-[#8B1A1A] hover:bg-[#8B1A1A]/90 text-white font-bold text-xs tracking-wide transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xs cursor-pointer"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>

              <button
                type="button"
                onClick={handleScrollToGrid}
                className="inline-flex items-center justify-center gap-1.5 px-5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-ink font-bold text-xs tracking-wide transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span>See our work</span>
              </button>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {FEATURE_PILLS.map((pill) => (
                <div
                  key={pill}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200/80 text-[10px] sm:text-[11px] font-mono font-bold text-slate-700"
                >
                  <span className="w-1 h-1 rounded-full bg-[#8B1A1A] inline-block" />
                  <span>{pill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. THE STAGE (Linear Constant Infinite Loop, Pauses on Hover)              */}
        {/* ========================================================================= */}
        <div
          role="region"
          aria-label="Web development projects continuous showcase"
          tabIndex={0}
          style={{ height: cardHeight + 20 }}
          className="shrink-0 relative w-full my-auto flex items-center overflow-hidden focus:outline-none group/stage"
        >
          {/* Edge Feathering Gradients (Soft fade to pure white at screen edges) */}
          <div
            className="absolute top-0 bottom-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-white via-white/85 to-transparent z-20 pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute top-0 bottom-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-white via-white/85 to-transparent z-20 pointer-events-none"
            aria-hidden="true"
          />

          {/* Continuous Infinite Linear Marquee Track */}
          <div className="w-full overflow-visible">
            <motion.div
              style={{
                x: trackMotionX,
                gap: `${gapPx}px`,
              }}
              className="w-max flex items-center will-change-transform"
            >
              {REPEATED_PROJECTS.map((proj, idx) => (
                <LivingSlideVisual
                  key={`${proj.id}-${idx}`}
                  project={proj}
                  isCenter={idx % LIVING_PROJECTS.length === activeIndex}
                  cardWidth={cardWidth}
                  cardHeight={cardHeight}
                  onClick={() => navigateToSlide(idx % LIVING_PROJECTS.length)}
                  reducedMotion={shouldReduceMotion}
                />
              ))}
            </motion.div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. CLEAN INFO ROW & CONTROLS (Below visual, aligned, cross-fades cleanly) */}
        {/* ========================================================================= */}
        <div
          className="max-w-[1200px] w-full mx-auto px-6 relative z-10 shrink-0"
        >
          {/* Active Project Info Row */}
          <div
            style={{ maxWidth: `${Math.max(cardWidth, 680)}px` }}
            className="w-full mx-auto mb-2"
          >
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 1, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -3 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="flex flex-col gap-0.5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-sm sm:text-base font-bold font-body text-ink">
                      {activeProject.title}
                    </h2>
                    <span className="text-[10px] sm:text-[11px] font-mono font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 border border-slate-200/80">
                      {activeProject.category}
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-slate-600 shrink-0 font-medium">
                    {activeProject.techLine}
                  </div>
                </div>

                <p className="text-[11px] sm:text-xs text-slate-600 line-clamp-1 max-w-2xl text-pretty">
                  {activeProject.description}
                </p>

                <div className="pt-0.5">
                  <Link
                    href={`/contact?message=${encodeURIComponent(
                      `Hi, I'd like the live link for ${activeProject.title}.`
                    )}`}
                    className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-[#8B1A1A] hover:underline transition-all group"
                  >
                    <span>Request live link</span>
                    <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls: Arrows, Pagination Tabs */}
          <div
            style={{ maxWidth: `${Math.max(cardWidth, 680)}px` }}
            className="w-full mx-auto flex items-center justify-between gap-2"
          >
            {/* Prev Button */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous project"
              className="w-8 h-8 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-ink flex items-center justify-center transition-all cursor-pointer shrink-0 shadow-2xs focus-visible:outline-2 focus-visible:outline-[#8B1A1A]"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            {/* Pagination Tabs with sliding maroon indicator */}
            <div className="flex-1 overflow-x-auto scrollbar-none py-0.5 flex items-center justify-center gap-1 sm:gap-1.5">
              {LIVING_PROJECTS.map((proj, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={proj.id}
                    type="button"
                    onClick={() => navigateToSlide(idx)}
                    aria-label={`Go to slide ${idx + 1}: ${proj.title}`}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                      isActive ? "text-white" : "text-slate-600 hover:text-ink hover:bg-slate-100"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="livingHeroTabIndicator"
                        className="absolute inset-0 rounded-full bg-[#8B1A1A] z-0 shadow-xs"
                        transition={{ type: "spring", stiffness: 320, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{proj.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Next Button */}
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next project"
              className="w-8 h-8 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-ink flex items-center justify-center transition-all cursor-pointer shrink-0 shadow-2xs focus-visible:outline-2 focus-visible:outline-[#8B1A1A]"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Active slide counter & Progress line */}
          <div
            style={{ maxWidth: `${Math.max(cardWidth, 680)}px` }}
            className="w-full mx-auto mt-1 sm:mt-1.5 flex flex-col gap-0.5"
          >
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-600">
              <span className="flex items-center gap-1.5">
                <span>PROJECT SHOWCASE</span>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 font-normal">
                  Continuous loop
                </span>
              </span>
              <span>
                {String(activeIndex + 1).padStart(2, "0")} / {String(LIVING_PROJECTS.length).padStart(2, "0")}
              </span>
            </div>

            <div className="w-full h-[2px] bg-slate-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#8B1A1A] rounded-full"
                animate={{
                  width: `${((activeIndex + 1) / LIVING_PROJECTS.length) * 100}%`,
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LivingShowcaseHero;
