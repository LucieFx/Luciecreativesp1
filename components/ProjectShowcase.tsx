"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type PanInfo,
  type Transition,
} from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface ProjectItem {
  name: string;
  type: string;
  description: string;
  image: string;
  alt: string;
  href: string;
  darkBg: boolean;
  bgColor: string;
}

export const projects: ProjectItem[] = [
  {
    name: "Media House Agency",
    type: "Influencer marketing & media",
    description:
      "Creator talent and influencer management platform with interactive roster showcases, brand decks, and real-time campaign metrics.",
    image: "/projects/mediahouse-desktop.webp",
    alt: "Media House Agency influencer talent and campaign analytics platform screenshot",
    href: "/contact?message=Hi%2C%20I%27d%20like%20to%20inquire%20about%20Media%20House%20Agency.",
    darkBg: true,
    bgColor: "#0c0c0c",
  },
  {
    name: "Forever Films",
    type: "Cinema & luxury photography",
    description:
      "Luxury wedding cinematography flagship with sub-second route transitions, dark-mode visual storytelling, and bespoke editorial typography.",
    image: "/projects/forever-films-desktop.webp",
    alt: "Forever Films luxury wedding cinematography and editorial photography website screenshot",
    href: "/contact?message=Hi%2C%20I%27d%20like%20to%20inquire%20about%20Forever%20Films.",
    darkBg: true,
    bgColor: "#0a0a0a",
  },
  {
    name: "NoviMail",
    type: "Privacy email & SaaS infrastructure",
    description:
      "Custom-domain email hosting platform eliminating rental fees and third-party tracking with unified inbox management and sub-second delivery.",
    image: "/projects/novimail-desktop.webp",
    alt: "NoviMail custom-domain email infrastructure and inbox management screenshot",
    href: "/contact?message=Hi%2C%20I%27d%20like%20to%20inquire%20about%20NoviMail.",
    darkBg: true,
    bgColor: "#0b0f19",
  },
  {
    name: "Nimus AI",
    type: "Autonomous AI & DevTools",
    description:
      "Autonomous AI engineering agent platform with real-time codebase telemetry, automated debugging workflows, and private LLM infrastructure.",
    image: "/projects/nimus-ai-desktop.webp",
    alt: "Nimus AI autonomous software engineering agent interface screenshot",
    href: "/contact?message=Hi%2C%20I%27d%20like%20to%20inquire%20about%20Nimus%20AI.",
    darkBg: true,
    bgColor: "#090d16",
  },
  {
    name: "Kaption",
    type: "AI SaaS & video tech",
    description:
      "AI-powered captioning SaaS for 50+ Indic languages with sub-second speech processing, 99.2% accuracy, and high-retention typography.",
    image: "/projects/kaption-desktop.webp",
    alt: "Kaption Indic language AI video captioning SaaS dashboard screenshot",
    href: "/contact?message=Hi%2C%20I%27d%20like%20to%20inquire%20about%20Kaption.",
    darkBg: true,
    bgColor: "#0f172a",
  },
  {
    name: "CopEase",
    type: "Retail tech & SaaS",
    description:
      "Zero-app QR file transfer and print queue kiosk for Indian xerox shops, eliminating WhatsApp download friction with instant auto-purge privacy.",
    image: "/projects/copease-desktop.webp",
    alt: "CopEase zero-app QR file transfer and print kiosk interface screenshot",
    href: "/contact?message=Hi%2C%20I%27d%20like%20to%20inquire%20about%20CopEase.",
    darkBg: false,
    bgColor: "#f8fafc",
  },
];

function getShortestDistance(idx: number, active: number, total: number): number {
  let diff = idx - active;
  while (diff > total / 2) diff -= total;
  while (diff < -total / 2) diff += total;
  return diff;
}

export function ProjectShowcase() {
  const containerRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const isDraggingRef = useRef(false);

  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  // Responsive carousel dimensions scaled strictly from viewport height & width
  const [dimensions, setDimensions] = useState({
    containerWidth: 1200,
    cardWidth: 960,
    cardHeight: 600,
    step: 196,
    stageHeight: 600,
  });

  const updateDimensions = useCallback(() => {
    if (!stageRef.current) return;
    const cw = stageRef.current.offsetWidth;
    const vh = window.innerHeight || 900;
    const isDesk = cw >= 1024;
    const isTab = cw >= 640 && cw < 1024;

    let cardWidth: number;
    if (isDesk) {
      // Desktop: min(68vw, calc((100svh - 300px) * 1.6)) with hard max of 1180px and min ~640px
      const widthFromVh = Math.max(0, (vh - 300) * 1.6);
      const widthFromVw = cw * 0.68;
      const computed = Math.min(widthFromVw, widthFromVh);
      cardWidth = Math.round(Math.min(1180, Math.max(640, computed)));
    } else if (isTab) {
      // Tablet: 84% width
      cardWidth = Math.round(cw * 0.84);
    } else {
      // Mobile: 92% width
      cardWidth = Math.round(cw * 0.92);
    }

    // Aspect-ratio 16/10 (height follows strictly from width)
    const cardHeight = Math.round((cardWidth * 10) / 16);

    // Step offset: translateX so ~13.5% of the card width peeks out on each side
    // (step + 0.43 * cardWidth) - 0.50 * cardWidth = 0.135 * cardWidth => step = 0.205 * cardWidth
    const step = Math.round(cardWidth * 0.205);

    setDimensions({
      containerWidth: cw,
      cardWidth,
      cardHeight,
      step,
      stageHeight: cardHeight,
    });
  }, []);

  useEffect(() => {
    updateDimensions();

    const ro = new ResizeObserver(() => {
      updateDimensions();
    });

    if (stageRef.current) {
      ro.observe(stageRef.current);
    }
    window.addEventListener("resize", updateDimensions);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateDimensions);
    };
  }, [updateDimensions]);

  // Slide navigation handlers (NO autoplay - strictly user-driven)
  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  }, []);

  const handleTabClick = useCallback((idx: number) => {
    setActiveIndex(idx);
  }, []);

  // Keyboard navigation (ArrowLeft / ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      }
    };

    const container = containerRef.current;
    if (!container) return;
    container.addEventListener("keydown", handleKeyDown);
    return () => container.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  // Auto-scroll active tab into view on mobile
  useEffect(() => {
    const activeTab = tabRefs.current[activeIndex];
    if (activeTab) {
      activeTab.scrollIntoView({
        inline: "center",
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [activeIndex]);

  // Drag / swipe handler
  const handleDragStart = () => {
    isDraggingRef.current = true;
  };

  const handleDragEnd = (
    _e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    setTimeout(() => {
      isDraggingRef.current = false;
    }, 100);

    const swipe = info.offset.x;
    const vel = info.velocity.x;
    if (swipe < -80 || vel < -500) {
      handleNext();
    } else if (swipe > 80 || vel > 500) {
      handlePrev();
    }
  };

  const activeProject = projects[activeIndex];

  // Motion physics
  const springTransition: Transition = shouldReduceMotion
    ? { duration: 0.25, ease: "easeInOut" }
    : { type: "spring", stiffness: 140, damping: 24, mass: 0.9 };

  return (
    <section
      ref={containerRef}
      id="project-showcase"
      role="region"
      aria-roledescription="carousel"
      aria-label="Web Development Project Showcase"
      tabIndex={0}
      className="relative w-full bg-white select-none pt-8 pb-16 scroll-mt-28 overflow-x-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B1A1A] focus-visible:ring-offset-4"
    >
      {/* 1. Header row with tabs and build tag (aligned with max-w-7xl page content) */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        {/* Rectangular control tabs: 10px track, 8px active tab indicator */}
        <div
          role="tablist"
          aria-label="Project showcase tabs"
          className="relative flex items-center gap-1.5 sm:gap-2 p-1.5 rounded-control bg-slate-100/90 border border-slate-200/80 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory max-w-full"
        >
          {projects.map((project, idx) => {
            const isActive = activeIndex === idx;
            return (
              <button
                key={project.name}
                ref={(el) => {
                  tabRefs.current[idx] = el;
                }}
                type="button"
                role="tab"
                id={`showcase-tab-${idx}`}
                aria-controls={`showcase-panel-${idx}`}
                aria-selected={isActive}
                onClick={() => handleTabClick(idx)}
                className={`relative min-h-[44px] px-4 sm:px-5 py-2.5 rounded-control-inner text-sm sm:text-base font-medium tracking-tight whitespace-nowrap transition-colors z-10 cursor-pointer snap-center select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B1A1A] focus-visible:ring-offset-2 ${
                  isActive ? "text-white" : "text-slate-700 hover:text-slate-900"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-showcase-tab-indicator"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 32,
                    }}
                    className="absolute inset-0 bg-[#8B1A1A] rounded-control-inner shadow-xs -z-10"
                  />
                )}
                <span>{project.name}</span>
              </button>
            );
          })}
        </div>

        {/* Small label on right (stays top-right on desktop, hidden on mobile) */}
        <div className="hidden min-[820px]:flex items-center gap-2 text-xs font-mono font-medium text-slate-500 shrink-0 select-none">
          <span className="w-1.5 h-1.5 rounded-full bg-[#8B1A1A] inline-block animate-pulse" />
          <span>Next.js 15 production builds</span>
        </div>
      </div>

      {/* 2. Interactive Carousel Wrapper with Edge Gradients & Arrow Controls */}
      <div className="relative w-full overflow-hidden">
        {/* Pure white gradient overlays on far left and right (~12% width) */}
        <div
          className="absolute left-0 top-0 bottom-0 w-[12%] pointer-events-none z-20 bg-gradient-to-r from-white via-white/80 to-transparent"
          aria-hidden="true"
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-[12%] pointer-events-none z-20 bg-gradient-to-l from-white via-white/80 to-transparent"
          aria-hidden="true"
        />

        {/* Rounded square navigation arrows (44x44, 10px radius, positioned in the gutter OUTSIDE the card edges) */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous project"
          style={{
            left: `max(28px, calc(50% - ${dimensions.cardWidth / 2}px - 36px))`,
          }}
          className="hidden sm:flex absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-control bg-[#8B1A1A] hover:bg-[#721515] active:scale-95 text-white items-center justify-center transition-all shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B1A1A] focus-visible:ring-offset-2 z-30 cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 text-white" aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Next project"
          style={{
            left: `min(calc(100% - 28px), calc(50% + ${dimensions.cardWidth / 2}px + 36px))`,
          }}
          className="hidden sm:flex absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-control bg-[#8B1A1A] hover:bg-[#721515] active:scale-95 text-white items-center justify-center transition-all shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B1A1A] focus-visible:ring-offset-2 z-30 cursor-pointer"
        >
          <ChevronRight className="w-5 h-5 text-white" aria-hidden="true" />
        </button>

        {/* 3. Drag stage containing the infinite slides */}
        <div
          ref={stageRef}
          className="relative w-full flex items-center justify-center select-none"
          style={{ height: dimensions.stageHeight }}
        >
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            className="relative w-full h-full cursor-grab active:cursor-grabbing flex items-center justify-center"
          >
            {projects.map((project, idx) => {
              const diff = getShortestDistance(idx, activeIndex, projects.length);
              const isCenter = diff === 0;
              const isLeftNeighbour = diff === -1;
              const isRightNeighbour = diff === 1;
              const isFar = Math.abs(diff) > 1;

              // Target X offset in pixels relative to center
              let targetX = 0;
              if (isCenter) {
                targetX = 0;
              } else if (isRightNeighbour) {
                targetX = dimensions.step;
              } else if (isLeftNeighbour) {
                targetX = -dimensions.step;
              } else {
                targetX = diff > 0 ? dimensions.step * 2 : -dimensions.step * 2;
              }

              // Neighbours: scale 0.86, opacity 0.6, translateX so ~13.5% peeks out on each side, z-index below center card
              const targetScale = isCenter ? 1.0 : 0.86;
              const targetOpacity = isCenter ? 1.0 : isLeftNeighbour || isRightNeighbour ? 0.6 : 0;
              const zIndex = isCenter ? 20 : isLeftNeighbour || isRightNeighbour ? 10 : 0;

              return (
                <motion.div
                  key={project.name}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${idx + 1} of ${projects.length}`}
                  id={`showcase-panel-${idx}`}
                  aria-hidden={!isCenter}
                  style={{
                    width: dimensions.cardWidth,
                    height: dimensions.cardHeight,
                    zIndex,
                    visibility: isFar ? "hidden" : "visible",
                    pointerEvents: isCenter || isLeftNeighbour || isRightNeighbour ? "auto" : "none",
                  }}
                  animate={{
                    x: targetX - dimensions.cardWidth / 2,
                    y: -dimensions.cardHeight / 2,
                    scale: shouldReduceMotion ? 1 : targetScale,
                    opacity: targetOpacity,
                  }}
                  transition={springTransition}
                  onClick={() => {
                    if (isDraggingRef.current) return;
                    if (isLeftNeighbour) handlePrev();
                    if (isRightNeighbour) handleNext();
                  }}
                  className={`absolute top-1/2 left-1/2 will-change-transform ${
                    isLeftNeighbour || isRightNeighbour ? "cursor-pointer" : ""
                  }`}
                >
                  <div
                    className="w-full h-full relative aspect-[16/10] rounded-media overflow-hidden shadow-[0_20px_60px_-15px_rgba(139,26,26,0.18)]"
                    style={{
                      backgroundColor: project.bgColor || (project.darkBg ? "#0c0c0c" : "#ffffff"),
                    }}
                  >
                    {isCenter ? (
                      <Link
                        href={project.href}
                        onClick={(e) => {
                          if (isDraggingRef.current) e.preventDefault();
                        }}
                        className="block w-full h-full relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B1A1A] rounded-media overflow-hidden"
                        aria-label={`View ${project.name}`}
                      >
                        <Image
                          src={project.image}
                          alt={project.alt}
                          fill
                          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 84vw, (max-width: 1400px) 68vw, 1180px"
                          priority={idx === 0}
                          loading={idx === 0 ? "eager" : Math.abs(diff) === 1 ? "eager" : "lazy"}
                          className="object-cover object-top select-none pointer-events-none"
                          draggable={false}
                        />
                      </Link>
                    ) : (
                      <div className="w-full h-full relative rounded-media overflow-hidden">
                        <Image
                          src={project.image}
                          alt={project.alt}
                          fill
                          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 84vw, (max-width: 1400px) 68vw, 1180px"
                          loading={Math.abs(diff) === 1 ? "eager" : "lazy"}
                          className="object-cover object-top select-none pointer-events-none"
                          draggable={false}
                        />
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* 4. Caption & Progress Directly Below the Card (Centered on Plain White) */}
      <div className="w-full max-w-3xl mx-auto px-6 mt-5 text-center">
        {/* Progress counter */}
        <div className="text-xs font-mono font-medium text-slate-400 mb-2 tracking-wider select-none">
          0{activeIndex + 1} / 0{projects.length}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex flex-col items-center gap-1.5"
          >
            <h3 className="text-lg sm:text-xl font-semibold text-slate-900 tracking-tight">
              {activeProject.name}
            </h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl line-clamp-1 sm:line-clamp-2">
              {activeProject.description}
            </p>
            <Link
              href={activeProject.href}
              className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-[#8B1A1A] hover:text-[#6a1313] transition-colors group/link focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B1A1A] rounded-control px-2.5 py-1"
              aria-label={`View project: ${activeProject.name}`}
            >
              <span>View project</span>
              <span
                className="transition-transform duration-200 group-hover/link:translate-x-1"
                aria-hidden="true"
              >
                →
              </span>
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

export default ProjectShowcase;
