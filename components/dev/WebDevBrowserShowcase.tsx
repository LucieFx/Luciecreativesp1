"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Lock,
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  Shield,
  Play,
  X,
  Eye,
  Gauge,
  ChevronDown,
} from "lucide-react";
import { m, useInView, useReducedMotion } from "framer-motion";
import {
  getVisibleWebProjects,
  type WebProject,
  type WebProjectStatus,
} from "@/data/web-projects";
import { Reveal } from "@/components/motion";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { buildWhatsAppLink } from "@/lib/constants";
import { ScoreRing } from "./ScoreRing";

/**
 * Status Tag Helper Component (Used in Modal Header)
 */
function StatusTag({ status }: { status: WebProjectStatus }) {
  switch (status) {
    case "client":
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-control text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/80">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" aria-hidden="true" />
          <span>Live client project</span>
        </span>
      );
    case "concept":
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-control text-[11px] font-semibold bg-sky-50 text-sky-800 border border-sky-200/80">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-600" aria-hidden="true" />
          <span>Concept project</span>
        </span>
      );
    case "own-product":
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-control text-[11px] font-semibold bg-purple-50 text-purple-800 border border-purple-200/80">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-600" aria-hidden="true" />
          <span>Our product</span>
        </span>
      );
  }
}

/**
 * Compact Score Ring for Part B (Lighthouse 64px Rectangle)
 */
function CompactScoreRing({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  const dim = 28;
  const strokeWidth = 2.5;
  const radius = (dim - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, value));
  const strokeDashoffset = circumference * (1 - clamped / 100);

  // Standard Lighthouse Colors: 90-100 green, 50-89 orange, <50 red
  let ringColor = "#0CCE6B";
  let textColor = "text-[#007a3d]";
  let bgTint = "bg-[#0CCE6B]/10";
  let trackColor = "rgba(12, 206, 107, 0.15)";

  if (value < 50) {
    ringColor = "#FF4E42";
    textColor = "text-[#8B1A1A]";
    bgTint = "bg-[#FF4E42]/10";
    trackColor = "rgba(255, 78, 66, 0.15)";
  } else if (value < 90) {
    ringColor = "#FFA400";
    textColor = "text-[#B45309]";
    bgTint = "bg-[#FFA400]/10";
    trackColor = "rgba(255, 164, 0, 0.15)";
  }

  return (
    <div
      className="flex flex-col items-center justify-center text-center shrink-0 min-w-0"
      aria-label={`${label}: ${value}`}
    >
      <div
        style={{ width: dim, height: dim }}
        className={`relative rounded-full flex items-center justify-center ${bgTint} shrink-0`}
      >
        <svg
          width={dim}
          height={dim}
          viewBox={`0 0 ${dim} ${dim}`}
          className="-rotate-90"
          aria-hidden="true"
        >
          <circle
            cx={dim / 2}
            cy={dim / 2}
            r={radius}
            fill="transparent"
            stroke={trackColor}
            strokeWidth={strokeWidth}
          />
          <circle
            cx={dim / 2}
            cy={dim / 2}
            r={radius}
            fill="transparent"
            stroke={ringColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        <span
          className={`absolute inset-0 flex items-center justify-center font-mono font-bold tabular-nums text-[10px] sm:text-[11px] leading-none select-none ${textColor}`}
        >
          {value}
        </span>
      </div>
      <span className="hidden min-[380px]:block text-[9px] sm:text-[10px] text-slate-500 font-medium leading-none mt-1 truncate max-w-[62px] text-center">
        {label === "Best Practices" ? "Practices" : label}
      </span>
    </div>
  );
}

/**
 * MacBook-Style Laptop Frame + Overlapping Phone Frame
 */
function ShowcaseDeviceFrames({
  project,
  isHovered,
  onError,
}: {
  project: WebProject;
  isHovered: boolean;
  onError?: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "-40px" });
  const [isPlaying, setIsPlaying] = useState(false);

  // Play video on hover (desktop) or in-view (mobile)
  useEffect(() => {
    if (!project.scrollVideo || !videoRef.current) return;
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const shouldPlay = isMobile ? isInView : isHovered;

    if (shouldPlay) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [isHovered, isInView, project.scrollVideo]);

  return (
    <div
      ref={containerRef}
      className="relative w-full select-none"
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* 1. MacBook-Style Laptop Frame */}
      <div className="relative w-full rounded-t-lg bg-slate-900 border border-slate-800 shadow-sm overflow-hidden flex flex-col pt-1.5 px-1.5 pb-0">
        {/* Laptop Display Top Bezel: Camera Dot */}
        <div className="flex items-center justify-center pb-1" aria-hidden="true">
          <div className="w-1.5 h-1.5 rounded-full bg-slate-800 border border-slate-700" />
        </div>

        {/* Laptop Screen Viewport: 16:10 Native Display Ratio */}
        <div className="relative w-full aspect-[16/10] bg-slate-950 rounded-t-xs overflow-hidden border border-slate-800/80">
          {project.scrollVideo ? (
            <>
              <video
                ref={videoRef}
                src={project.scrollVideo}
                poster={project.poster || project.screenshotDesktop}
                muted
                loop
                playsInline
                preload="none"
                onError={onError}
                className="w-full h-full object-cover object-top pointer-events-none"
              >
                <p>Screen recording demonstration of {project.title}.</p>
              </video>
              {!isPlaying && (
                <div
                  className="absolute inset-0 bg-black/25 flex items-center justify-center"
                  aria-hidden="true"
                >
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-control bg-black/70 backdrop-blur-xs text-white text-[10px] font-semibold shadow-md">
                    <Play className="w-2.5 h-2.5 fill-white" />
                    <span>Preview</span>
                  </div>
                </div>
              )}
            </>
          ) : (
            <Image
              src={project.screenshotDesktop}
              alt={`${project.title} desktop web interface`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              draggable={false}
              onError={onError}
              className="object-cover object-top pointer-events-none select-none"
            />
          )}

          {/* Low-Opacity Watermark on Laptop Screen */}
          <div
            className="absolute top-1.5 right-1.5 z-10 pointer-events-none select-none px-1.5 py-0.5 rounded bg-black/50 backdrop-blur-2xs text-[9px] font-mono tracking-wider text-white/80 shadow-2xs"
            aria-hidden="true"
          >
            Lucie Creatives
          </div>
        </div>
      </div>

      {/* Laptop Aluminum Base & Notch */}
      <div className="w-full bg-gradient-to-b from-slate-200 via-slate-300 to-slate-400 h-2 sm:h-2.5 rounded-b-md border-t border-slate-400/60 flex items-center justify-center shadow-2xs">
        <div className="w-10 sm:w-14 h-0.5 sm:h-1 rounded-sm bg-slate-500/50" aria-hidden="true" />
      </div>

      {/* 2. Overlapping Mobile Phone Frame (Bottom-Right Corner) */}
      <div
        className="absolute -bottom-1.5 -right-1 sm:-bottom-2 sm:-right-1.5 z-20 w-[48px] sm:w-[60px] aspect-[9/19] rounded-card bg-slate-900 border border-slate-800 shadow-lg overflow-hidden flex flex-col p-0.5 sm:p-1"
        aria-hidden="true"
      >
        {/* Phone Notch */}
        <div className="w-3.5 sm:w-4 h-0.5 sm:h-1 bg-slate-800 rounded-sm mx-auto mb-0.5 shrink-0" />

        {/* Phone Screen */}
        <div className="relative w-full flex-1 rounded-control overflow-hidden bg-slate-950">
          <Image
            src={project.screenshotMobile || project.screenshotDesktop}
            alt={`${project.title} mobile interface`}
            fill
            sizes="60px"
            draggable={false}
            onError={onError}
            className="object-cover object-top pointer-events-none select-none"
          />
        </div>
      </div>
    </div>
  );
}

/**
 * PART A: SQUARE WEBSITE BOX (aspect-ratio: 1/1)
 */
function SquareWebsiteBox({
  project,
  isHovered,
  onOpenPreview,
}: {
  project: WebProject;
  isHovered: boolean;
  onOpenPreview: () => void;
}) {
  const [hasError, setHasError] = useState(false);

  return (
    <div
      onClick={onOpenPreview}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpenPreview();
        }
      }}
      aria-label={`Preview full website UI for ${project.title}`}
      className="relative w-full aspect-square rounded-[12px] overflow-hidden border border-slate-200/90 bg-[#f4f6f9] flex items-center justify-center p-3.5 sm:p-5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B1A1A] group/square select-none shadow-2xs"
    >
      {/* Top-Left Chip: Project name only with 95% opacity background, tiny green dot if live */}
      <div className="absolute top-3 left-3 z-20 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-xs text-ink text-xs font-bold border border-slate-200/80 shadow-2xs pointer-events-none">
        {project.status === "client" && (
          <span
            className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0"
            aria-hidden="true"
          />
        )}
        <span className="truncate max-w-[200px]">{project.title}</span>
      </div>

      {/* Inside: Centered laptop + phone mockup */}
      {hasError ? (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-slate-200 to-slate-100 flex flex-col items-center justify-center p-4 text-center">
          <span className="text-sm font-bold text-slate-700">{project.title}</span>
          <span className="text-xs text-slate-500 mt-1">Web Platform</span>
        </div>
      ) : (
        <div className="w-full transform transition-transform duration-400 ease-out group-hover/card:scale-[1.03]">
          <ShowcaseDeviceFrames
            project={project}
            isHovered={isHovered}
            onError={() => setHasError(true)}
          />
        </div>
      )}

      {/* Bottom-Right Corner: Small "View live" icon arrow on hover */}
      <div
        className="absolute bottom-3 right-3 z-20 w-8 h-8 rounded-full bg-white/95 border border-slate-200/90 shadow-xs flex items-center justify-center text-ink opacity-0 group-hover/card:opacity-100 transition-all duration-300 transform translate-y-1 group-hover/card:translate-y-0 pointer-events-none"
        aria-hidden="true"
      >
        <ArrowUpRight className="w-4 h-4 text-[#8B1A1A]" />
      </div>
    </div>
  );
}

/**
 * PART B: COMPACT LIGHTHOUSE RECTANGLE (Height: 64px, White, Rounded 10px)
 */
function CompactLighthouseBar({
  project,
  onOpenReport,
}: {
  project: WebProject;
  onOpenReport: () => void;
}) {
  const lh = project.lighthouse;

  const scoreItems = [
    { label: "Performance", val: lh.performance },
    { label: "Accessibility", val: lh.accessibility },
    { label: "Best Practices", val: lh.bestPractices },
    { label: "SEO", val: lh.seo },
  ];

  return (
    <div
      onClick={onOpenReport}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpenReport();
        }
      }}
      title={`${project.title} Lighthouse Audit · ${lh.mode}, ${lh.measuredOn}`}
      aria-label={`View Lighthouse scores for ${project.title}: Performance ${lh.performance}, Accessibility ${lh.accessibility}, Best Practices ${lh.bestPractices}, SEO ${lh.seo}`}
      className="w-full h-[64px] rounded-[10px] bg-white border border-slate-200/90 shadow-2xs px-2.5 sm:px-3 flex items-center justify-between gap-1 sm:gap-2 cursor-pointer transition-all duration-200 hover:border-slate-300 hover:bg-slate-50/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B1A1A] select-none overflow-hidden"
    >
      {/* 4 Score Rings (or 5 with Agentic AI) */}
      <div className="flex items-center justify-around flex-1 gap-1 sm:gap-2 min-w-0">
        {scoreItems.map((item) => (
          <CompactScoreRing
            key={item.label}
            value={item.val ?? 0}
            label={item.label}
          />
        ))}

        {/* 5th Chip: Agentic AI score (shown on sm+, dropped on mobile) */}
        {lh.agenticBrowsing && (
          <div className="hidden sm:flex flex-col items-center justify-center shrink-0">
            <div className="w-[28px] h-[28px] rounded-full bg-purple-50 border border-purple-200/80 flex items-center justify-center text-purple-700 font-mono font-bold text-[10px]">
              {lh.agenticBrowsing}
            </div>
            <span className="hidden min-[420px]:block text-[9px] sm:text-[10px] text-slate-500 font-medium leading-none mt-1 truncate max-w-[56px] text-center">
              Agentic
            </span>
          </div>
        )}
      </div>

      {/* Right End: View Report external icon */}
      {project.reportImage && (
        <a
          href={project.reportImage}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          title="View verified Google Lighthouse report"
          aria-label={`View verified Lighthouse report for ${project.title} (opens in new tab)`}
          className="p-1.5 rounded-md hover:bg-slate-100 text-slate-400 hover:text-ink transition-colors cursor-pointer shrink-0 ml-1"
        >
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      )}
    </div>
  );
}

/**
 * Individual Web Development Showcase Card:
 * Vertical stack with 12px gap: [Square website box] + [Compact Lighthouse rectangle]
 */
function WebProjectCompactCard({
  project,
  onOpenReport,
  onOpenPreview,
}: {
  project: WebProject;
  onOpenReport: (project: WebProject) => void;
  onOpenPreview: (project: WebProject) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <article
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex flex-col gap-3 group/card transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-md rounded-[12px] will-change-transform max-w-[420px] mx-auto w-full md:max-w-none"
    >
      {/* PART A: Square Website Box */}
      <SquareWebsiteBox
        project={project}
        isHovered={isHovered}
        onOpenPreview={() => onOpenPreview(project)}
      />

      {/* PART B: Compact Lighthouse Rectangle directly under the square */}
      <CompactLighthouseBar
        project={project}
        onOpenReport={() => onOpenReport(project)}
      />
    </article>
  );
}

/**
 * Main Web Development Showcase Section
 */
export function WebDevBrowserShowcase() {
  const projects = getVisibleWebProjects();
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    project: WebProject | null;
    activeTab: "preview" | "audit";
  }>({
    isOpen: false,
    project: null,
    activeTab: "preview",
  });
  const shouldReduceMotion = useReducedMotion();

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalState((prev) => ({ ...prev, isOpen: false }));
    };
    if (modalState.isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "unset";
      };
    }
  }, [modalState.isOpen]);

  const openPreviewModal = (project: WebProject) => {
    setModalState({
      isOpen: true,
      project,
      activeTab: "preview",
    });
  };

  const openReportModal = (project: WebProject) => {
    setModalState({
      isOpen: true,
      project,
      activeTab: "audit",
    });
  };

  return (
    <section
      id="websites-weve-built"
      className="relative w-full py-12 sm:py-16 px-4 sm:px-6 md:px-12 bg-white text-text-primary overflow-visible border-b border-line select-none"
    >
      <div className="max-w-7xl mx-auto relative z-10 overflow-visible">
        {/* Section Header */}
        <Reveal
          delay={0}
          y={16}
          duration={0.65}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-8 sm:mb-10 overflow-visible"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-control bg-brand-red-50 border border-brand-red/20 text-[#8B1A1A] text-xs font-semibold uppercase tracking-wider mb-3">
            <Shield className="w-3.5 h-3.5" />
            <span>Digital Engineering Portfolio</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-[-0.02em] leading-[1.05] text-ink text-balance mb-3">
            Websites we&apos;ve built
          </h2>

          <p className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed max-w-2xl text-pretty mb-2">
            Clean architectures, real Google Lighthouse performance scores, and bespoke UI.
          </p>

          <p className="text-xs sm:text-sm text-slate-500 font-normal">
            Click any project to inspect full interactive UI and verified audit reports. Live links shared privately.
          </p>
        </Reveal>

        {/* 3-Column Desktop (1280px+), 2-Column Tablet (768px), 1-Column Mobile Grid. Gap: 24px */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start overflow-visible w-full">
          {projects.map((project, idx) => (
            <m.div
              key={project.slug}
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
              whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.45,
                delay: idx * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="w-full overflow-visible"
            >
              <WebProjectCompactCard
                project={project}
                onOpenReport={openReportModal}
                onOpenPreview={openPreviewModal}
              />
            </m.div>
          ))}
        </div>

        {/* Bottom CTA Button */}
        <div className="mt-10 sm:mt-12 flex items-center justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#8B1A1A] hover:bg-[#8B1A1A]/90 text-white font-body font-semibold text-sm transition-all duration-200 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-[#8B1A1A]"
          >
            <span>Start your web project</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Enhanced Interactive Showcase Modal (UI Preview & Lighthouse Audit) */}
      {modalState.isOpen && modalState.project && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="showcase-modal-title"
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
          onClick={() => setModalState((prev) => ({ ...prev, isOpen: false }))}
        >
          <div
            className="relative max-w-5xl w-full bg-white rounded-card overflow-hidden shadow-2xl flex flex-col max-h-[92vh] border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Bar */}
            <div className="px-5 sm:px-8 py-4 border-b border-line flex items-center justify-between gap-4 bg-slate-50/80">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <StatusTag status={modalState.project.status} />
                  <span className="text-[11px] font-mono uppercase text-slate-500 font-semibold truncate">
                    {modalState.project.category}
                  </span>
                </div>
                <h3 id="showcase-modal-title" className="text-lg sm:text-2xl font-bold font-body text-ink truncate">
                  {modalState.project.title}
                </h3>
              </div>

              {/* Tab Selector */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-200/70 border border-line text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setModalState((prev) => ({ ...prev, activeTab: "preview" }))}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    modalState.activeTab === "preview"
                      ? "bg-white text-ink shadow-xs font-bold"
                      : "text-slate-600 hover:text-ink"
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Website</span> UI Preview
                </button>
                <button
                  type="button"
                  onClick={() => setModalState((prev) => ({ ...prev, activeTab: "audit" }))}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    modalState.activeTab === "audit"
                      ? "bg-white text-ink shadow-xs font-bold"
                      : "text-slate-600 hover:text-ink"
                  }`}
                >
                  <Gauge className="w-3.5 h-3.5 text-[#008744]" />
                  <span>Lighthouse Audit</span>
                  {modalState.project.lighthouse.performance && (
                    <span className="px-1.5 py-0.2 rounded-control bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold">
                      {modalState.project.lighthouse.performance}
                    </span>
                  )}
                </button>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setModalState((prev) => ({ ...prev, isOpen: false }))}
                aria-label="Close modal"
                className="p-2 rounded-control hover:bg-slate-200 text-slate-500 hover:text-ink transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body Container */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-slate-100/60">
              {modalState.activeTab === "preview" ? (
                /* Tab 1: Scrollable Browser Window UI Preview */
                <div className="w-full rounded-media bg-white border border-slate-300 shadow-md overflow-hidden flex flex-col">
                  {/* Browser Chrome Header */}
                  <div className="bg-slate-100 border-b border-slate-200 px-4 py-2.5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-1.5" aria-hidden="true">
                      <span className="w-3 h-3 rounded-full bg-rose-400" />
                      <span className="w-3 h-3 rounded-full bg-amber-400" />
                      <span className="w-3 h-3 rounded-full bg-emerald-400" />
                    </div>
                    <div className="flex-1 max-w-md mx-auto bg-white border border-slate-200 rounded-lg px-3 py-1 flex items-center justify-center gap-2 text-xs font-mono text-slate-600 shadow-2xs">
                      <Lock className="w-3 h-3 text-[#008744]" />
                      <span className="truncate font-medium">
                        https://{modalState.project.domain || `${modalState.project.slug}.luciecreatives.in`}
                      </span>
                    </div>
                    <div className="text-[11px] font-mono text-slate-400 hidden sm:block">
                      100% Responsive Next.js
                    </div>
                  </div>

                  {/* Scrollable Viewport with High-Res Interface */}
                  <div className="relative w-full max-h-[62vh] overflow-y-auto bg-slate-950 scrollbar-thin scrollbar-thumb-slate-400">
                    <Image
                      src={modalState.project.fullPreviewImage || modalState.project.screenshotDesktop}
                      alt={`${modalState.project.title} full interface view`}
                      width={1440}
                      height={9000}
                      className="w-full h-auto object-top select-none"
                      priority
                    />
                  </div>

                  {/* Scroll Hint Footer Bar */}
                  <div className="bg-slate-50 border-t border-slate-200 px-4 py-2 flex items-center justify-between text-xs text-slate-500 font-medium">
                    <span className="flex items-center gap-1.5">
                      <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
                      <span>Scroll inside frame to explore full page architecture</span>
                    </span>
                    <span className="text-[11px] font-mono">
                      High-Resolution Production Capture
                    </span>
                  </div>
                </div>
              ) : (
                /* Tab 2: Verified Google Lighthouse Audit */
                <div className="flex flex-col gap-6">
                  {/* Top Metric Cards: 4 equal cards in a row */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                    <div className="p-4 sm:p-5 rounded-card bg-white border border-slate-200/80 shadow-xs flex flex-col items-center justify-center text-center">
                      <ScoreRing
                        value={modalState.project.lighthouse.performance ?? 0}
                        label="Performance"
                        size="lg"
                        delay={0}
                        trigger={modalState.activeTab === "audit"}
                      />
                    </div>
                    <div className="p-4 sm:p-5 rounded-card bg-white border border-slate-200/80 shadow-xs flex flex-col items-center justify-center text-center">
                      <ScoreRing
                        value={modalState.project.lighthouse.accessibility ?? 0}
                        label="Accessibility"
                        size="lg"
                        delay={0.12}
                        trigger={modalState.activeTab === "audit"}
                      />
                    </div>
                    <div className="p-4 sm:p-5 rounded-card bg-white border border-slate-200/80 shadow-xs flex flex-col items-center justify-center text-center">
                      <ScoreRing
                        value={modalState.project.lighthouse.bestPractices ?? 0}
                        label="Best Practices"
                        size="lg"
                        delay={0.24}
                        trigger={modalState.activeTab === "audit"}
                      />
                    </div>
                    <div className="p-4 sm:p-5 rounded-card bg-white border border-slate-200/80 shadow-xs flex flex-col items-center justify-center text-center">
                      <ScoreRing
                        value={modalState.project.lighthouse.seo ?? 0}
                        label="SEO"
                        size="lg"
                        delay={0.36}
                        trigger={modalState.activeTab === "audit"}
                      />
                    </div>
                  </div>

                  {/* Core Web Vitals Summary */}
                  <div className="p-4 sm:p-5 rounded-card bg-white border border-slate-200/80 shadow-xs">
                    <span className="text-[11px] font-mono font-bold tracking-wider text-slate-400 uppercase block mb-3">
                      Core Web Vitals
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono">
                      <m.div
                        initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: shouldReduceMotion ? 0 : 1.2,
                          ease: "easeOut",
                        }}
                        className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col gap-1"
                      >
                        <span className="text-[11px] font-sans font-medium text-slate-500">
                          First Contentful Paint (FCP)
                        </span>
                        <span className="text-base sm:text-lg font-semibold text-emerald-700">
                          &lt; 0.8s
                        </span>
                      </m.div>

                      <m.div
                        initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: shouldReduceMotion ? 0 : 1.3,
                          ease: "easeOut",
                        }}
                        className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col gap-1"
                      >
                        <span className="text-[11px] font-sans font-medium text-slate-500">
                          Largest Contentful Paint (LCP)
                        </span>
                        <span className="text-base sm:text-lg font-semibold text-emerald-700">
                          &lt; 1.2s
                        </span>
                      </m.div>

                      <m.div
                        initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: shouldReduceMotion ? 0 : 1.4,
                          ease: "easeOut",
                        }}
                        className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col gap-1"
                      >
                        <span className="text-[11px] font-sans font-medium text-slate-500">
                          Cumulative Layout Shift (CLS)
                        </span>
                        <span className="text-base sm:text-lg font-semibold text-emerald-700">
                          0.00 (Zero Shift)
                        </span>
                      </m.div>
                    </div>
                  </div>

                  <p className="text-center text-xs text-slate-400 font-mono py-1">
                    Measured with Google Lighthouse · {modalState.project.lighthouse.mode} · {modalState.project.lighthouse.measuredOn}
                  </p>
                </div>
              )}
            </div>

            {/* Modal Bottom Footer Actions */}
            <div className="px-5 sm:px-8 py-3.5 border-t border-line bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-xs text-slate-500 font-medium">
                Want similar sub-second performance for your brand?
              </span>
              <div className="flex items-center gap-2.5">
                <Link
                  href={`/contact?message=${encodeURIComponent(`Hi, I'd like the live link for ${modalState.project.title}.`)}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#8B1A1A] hover:bg-[#8b1a1a]/90 text-white font-bold text-xs sm:text-sm transition-colors shadow-xs"
                >
                  <span>Request Live Link</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <a
                  href={buildWhatsAppLink(`Hi, I'd like the live link for ${modalState.project.title}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl border border-line hover:border-emerald-600 bg-white hover:bg-emerald-50 text-emerald-700 transition-colors"
                  title="WhatsApp Inquiry"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                </a>
                <button
                  type="button"
                  onClick={() => setModalState((prev) => ({ ...prev, isOpen: false }))}
                  className="px-4 py-2 rounded-xl border border-line bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default WebDevBrowserShowcase;
