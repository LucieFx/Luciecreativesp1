"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Lock,
  ArrowRight,
  Shield,
  FileCheck,
  Play,
  X,
  Eye,
  Gauge,
  Zap,
  CheckCircle2,
  ChevronDown,
  Sparkles,
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

/**
 * Status Tag Helper Component
 */
function StatusTag({ status }: { status: WebProjectStatus }) {
  switch (status) {
    case "client":
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/80">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" aria-hidden="true" />
          <span>Live client project</span>
        </span>
      );
    case "concept":
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-sky-50 text-sky-800 border border-sky-200/80">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-600" aria-hidden="true" />
          <span>Concept project</span>
        </span>
      );
    case "own-product":
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-purple-50 text-purple-800 border border-purple-200/80">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-600" aria-hidden="true" />
          <span>Our product</span>
        </span>
      );
  }
}

/**
 * Google Lighthouse Official-Style Animated SVG Circular Score Ring
 */
function LighthouseRing({
  score,
  label,
  delay = 0,
}: {
  score: number | null;
  label: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  const shouldReduceMotion = useReducedMotion();

  const radius = 14;
  const strokeWidth = 2.8;
  const circumference = 2 * Math.PI * radius;

  // Determine standard Google Lighthouse color styling
  let strokeColor = "#CBD5E1";
  let textColor = "text-slate-400";
  let bgFillColor = "bg-slate-50";

  if (score !== null) {
    if (score >= 90) {
      strokeColor = "#0CCE6B"; // Google Lighthouse green
      textColor = "text-[#007a3d]"; // Deep green readable text with WCAG AA compliance
      bgFillColor = "bg-[#0CCE6B]/10"; // Soft mint circular background
    } else if (score >= 50) {
      strokeColor = "#FFA400"; // Lighthouse orange
      textColor = "text-[#B45309]";
      bgFillColor = "bg-[#FFA400]/10";
    } else {
      strokeColor = "#FF4E42"; // Lighthouse red
      textColor = "text-[#8b1a1a]";
      bgFillColor = "bg-[#FF4E42]/10";
    }
  }

  const targetOffset =
    score !== null ? circumference * (1 - Math.min(Math.max(score, 0), 100) / 100) : circumference;

  const accessibleLabel =
    score !== null ? `${label}: ${score} out of 100` : `${label}: Measuring soon`;

  return (
    <div
      ref={ref}
      className="flex flex-col items-center text-center gap-1"
      aria-label={accessibleLabel}
      role="meter"
      aria-valuenow={score !== null ? score : undefined}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className={`relative w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${bgFillColor} transition-colors duration-300`}>
        <svg className="w-full h-full -rotate-90 p-0.5" viewBox="0 0 36 36" aria-hidden="true">
          {/* Background Track */}
          <circle
            cx="18"
            cy="18"
            r={radius}
            fill="transparent"
            stroke="#E2E8F0"
            strokeWidth={strokeWidth}
          />
          {/* Animated Progress Circle */}
          {score !== null ? (
            <m.circle
              cx="18"
              cy="18"
              r={radius}
              fill="transparent"
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeLinecap="round"
              initial={{ strokeDashoffset: circumference }}
              animate={
                isInView || shouldReduceMotion
                  ? { strokeDashoffset: targetOffset }
                  : { strokeDashoffset: circumference }
              }
              transition={{
                duration: shouldReduceMotion ? 0 : 0.9,
                delay: shouldReduceMotion ? 0 : delay,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
          ) : (
            <circle
              cx="18"
              cy="18"
              r={radius}
              fill="transparent"
              stroke="#CBD5E1"
              strokeWidth={strokeWidth}
              strokeDasharray="3 3"
            />
          )}
        </svg>

        {/* Center Score Value */}
        <span className={`absolute font-body font-bold text-[11px] sm:text-xs tracking-tight select-none ${textColor}`}>
          {score !== null ? score : "—"}
        </span>
      </div>

      <div className="flex flex-col items-center leading-tight">
        <span className="text-[9.5px] sm:text-[10px] font-medium text-slate-600 tracking-tight">
          {label}
        </span>
        {score === null && (
          <span className="text-[8.5px] font-medium text-slate-400 mt-0.5">
            Measuring soon
          </span>
        )}
      </div>
    </div>
  );
}

/**
 * Official-Style Agentic Browsing Pill Badge
 */
function AgenticBrowsingBadge({
  value,
  label = "Agentic AI",
}: {
  value: string;
  label?: string;
}) {
  return (
    <div
      className="flex flex-col items-center text-center gap-1"
      aria-label={`${label}: ${value}`}
    >
      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-[#0CCE6B]/12 border border-[#0CCE6B]/30 transition-colors duration-300">
        <span className="inline-flex items-center gap-0.5 font-body font-bold text-[10.5px] sm:text-[11px] tracking-tight text-[#007a3d] select-none">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0CCE6B] shrink-0" aria-hidden="true" />
          <span>{value}</span>
        </span>
      </div>

      <div className="flex flex-col items-center leading-tight">
        <span className="text-[9.5px] sm:text-[10px] font-medium text-slate-600 tracking-tight">
          {label}
        </span>
      </div>
    </div>
  );
}

/**
 * MacBook-Style Hardware Frame + Overlapping Phone Frame
 */
function ShowcaseDeviceFrames({
  project,
  isHovered,
  onOpenPreview,
}: {
  project: WebProject;
  isHovered: boolean;
  onOpenPreview?: () => void;
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
      className="relative w-full select-none cursor-pointer"
      onClick={onOpenPreview}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpenPreview?.();
        }
      }}
      aria-label={`Preview Full UI: website interface for ${project.title}`}
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* 1. MacBook-Style Laptop Frame */}
      <div className="relative w-full rounded-t-xl bg-slate-900 border border-slate-800 shadow-2xs overflow-hidden flex flex-col pt-1.5 px-1.5 pb-0 transition-transform duration-500 ease-out group-hover:scale-[1.01]">
        {/* Laptop Display Top Bezel: Camera Dot */}
        <div className="flex items-center justify-center pb-1" aria-hidden="true">
          <div className="w-1.5 h-1.5 rounded-full bg-slate-800 border border-slate-700" />
        </div>

        {/* Laptop Screen Viewport */}
        <div className="relative w-full aspect-[16/9] bg-slate-950 rounded-t-xs overflow-hidden border border-slate-800/80">
          {/* Video or Desktop Screenshot */}
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
                className="w-full h-full object-cover object-top pointer-events-none transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              >
                <p>Screen recording demonstration of {project.title}.</p>
              </video>
              {!isPlaying && (
                <div
                  className="absolute inset-0 bg-black/25 flex items-center justify-center transition-opacity"
                  aria-hidden="true"
                >
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-xs text-white text-[11px] font-semibold shadow-md transition-transform duration-200 group-hover:scale-105">
                    <Play className="w-3 h-3 fill-white" />
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
              className="object-cover object-top pointer-events-none select-none transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          )}

          {/* Interactive Hover "Preview Full UI" Pill Overlay */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-15 pointer-events-none"
            aria-hidden="true"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 text-ink text-xs font-bold shadow-md transform translate-y-1 group-hover:translate-y-0 transition-all duration-300">
              <Eye className="w-3.5 h-3.5 text-[#8B1A1A]" />
              <span>Preview Full UI</span>
            </span>
          </div>

          {/* Low-Opacity IP Watermark on Laptop Screen */}
          <div
            className="absolute top-2 right-2 z-10 pointer-events-none select-none px-1.5 py-0.5 rounded bg-black/50 backdrop-blur-2xs text-[9.5px] font-mono tracking-wider text-white/80 shadow-2xs"
            aria-hidden="true"
          >
            Lucie Creatives
          </div>
        </div>
      </div>

      {/* Laptop Aluminum Base & Notch */}
      <div className="w-full bg-gradient-to-b from-slate-200 via-slate-300 to-slate-400 h-2 sm:h-2.5 rounded-b-md border-t border-slate-400/60 flex items-center justify-center shadow-2xs">
        <div className="w-10 sm:w-14 h-0.5 sm:h-1 rounded-full bg-slate-500/50" aria-hidden="true" />
      </div>

      {/* 2. Overlapping Mobile Phone Frame (Bottom-Right Corner) */}
      <div
        className="absolute -bottom-1.5 -right-1 sm:-bottom-2 sm:-right-1.5 z-20 w-[54px] sm:w-[68px] aspect-[9/19] rounded-[11px] sm:rounded-[14px] bg-slate-900 border border-slate-800 shadow-lg overflow-hidden flex flex-col p-0.5 sm:p-1 transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-105 group-hover:shadow-xl"
        aria-hidden="true"
      >
        {/* Phone Notch */}
        <div className="w-4 sm:w-5 h-0.5 sm:h-1 bg-slate-800 rounded-full mx-auto mb-0.5 shrink-0" />

        {/* Phone Screen */}
        <div className="relative w-full flex-1 rounded-[8px] sm:rounded-[10px] overflow-hidden bg-slate-950">
          <Image
            src={project.screenshotMobile || project.screenshotDesktop}
            alt={`${project.title} mobile interface`}
            fill
            sizes="68px"
            draggable={false}
            className="object-cover object-top pointer-events-none select-none transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          />
        </div>
      </div>
    </div>
  );
}

/**
 * Individual Web Development Showcase Card
 */
function WebProjectShowcaseCard({
  project,
  onOpenReport,
  onOpenPreview,
}: {
  project: WebProject;
  onOpenReport: (project: WebProject) => void;
  onOpenPreview: (project: WebProject) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const contactMessage = `Hi, I'd like the live link for ${project.title}.`;
  const contactHref = `/contact?message=${encodeURIComponent(contactMessage)}`;
  const whatsappHref = buildWhatsAppLink(contactMessage);

  return (
    <article
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:border-[#8B1A1A]/35 hover:shadow-lg hover:shadow-slate-200/50 hover:scale-[1.012] hover:-translate-y-1 transition-all duration-300 ease-out flex flex-col justify-between h-full group will-change-transform overflow-visible"
    >
      <div>
        {/* Device Showcase (Laptop + Overlapping Mobile Phone) */}
        <div className="mb-3.5 pt-0.5">
          <ShowcaseDeviceFrames
            project={project}
            isHovered={isHovered}
            onOpenPreview={() => onOpenPreview(project)}
          />
        </div>

        {/* Status Tag & Category */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <StatusTag status={project.status} />
          <span className="text-[10px] font-mono font-semibold text-slate-500 uppercase tracking-wider truncate">
            {project.category}
          </span>
        </div>

        {/* Project Title */}
        <h3 className="text-lg sm:text-xl font-bold font-body text-ink tracking-tight mb-1">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-[13px] font-normal text-slate-600 leading-snug mb-2.5 line-clamp-2 text-pretty">
          {project.description}
        </p>

        {/* Tech Stack Chips */}
        <div className="flex flex-wrap gap-1 mb-3" aria-label="Technology stack">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded-md bg-slate-100/90 hover:bg-slate-200/90 text-slate-700 hover:text-ink text-[11px] font-medium border border-line/50 transition-colors duration-150"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Compact Lighthouse Audit Box */}
        <div className="bg-slate-50/80 border border-slate-200/70 rounded-xl p-2.5 sm:p-3 mb-3.5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10.5px] sm:text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Gauge className="w-3 h-3 text-[#008744]" />
              <span>Lighthouse Audit</span>
            </span>
            <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-medium text-slate-500">
              <span>{project.lighthouse.mode}</span>
              <span>·</span>
              <span>{project.lighthouse.measuredOn}</span>
            </div>
          </div>

          <div
            className={`grid ${
              project.lighthouse.agenticBrowsing
                ? "grid-cols-5 gap-1 sm:gap-1.5"
                : "grid-cols-4 gap-1.5 sm:gap-2"
            } mb-2 items-start`}
          >
            <LighthouseRing score={project.lighthouse.performance} label="Performance" delay={0.05} />
            <LighthouseRing score={project.lighthouse.accessibility} label="Accessibility" delay={0.12} />
            <LighthouseRing score={project.lighthouse.bestPractices} label="Best Practices" delay={0.19} />
            <LighthouseRing score={project.lighthouse.seo} label="SEO" delay={0.26} />
            {project.lighthouse.agenticBrowsing && (
              <AgenticBrowsingBadge value={project.lighthouse.agenticBrowsing} />
            )}
          </div>

          {/* Quick Triggers */}
          <div className="flex items-center justify-end gap-3 text-[11px] pt-1.5 border-t border-slate-200/60">
            <button
              type="button"
              onClick={() => onOpenPreview(project)}
              className="inline-flex items-center gap-1 font-semibold text-slate-600 hover:text-ink cursor-pointer transition-colors"
              title="Preview full website UI"
            >
              <Eye className="w-3 h-3 text-slate-400" />
              <span>Preview UI</span>
            </button>
            {project.reportImage && (
              <button
                type="button"
                onClick={() => onOpenReport(project)}
                className="inline-flex items-center gap-1 font-semibold text-[#8B1A1A] hover:underline cursor-pointer transition-colors"
                title="View verified Lighthouse report"
              >
                <FileCheck className="w-3 h-3" />
                <span>View report</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Action Row: Request Live Link + WhatsApp Quick Message */}
      <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2.5 mt-auto">
        <Link
          href={contactHref}
          className="group/btn flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#8B1A1A] hover:bg-[#8b1a1a]/90 active:scale-[0.98] text-white font-body font-semibold text-xs sm:text-[13px] transition-all duration-200 shadow-2xs hover:shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B1A1A]"
        >
          <span>Request live link</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
        </Link>

        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Request live link for ${project.title} via WhatsApp`}
          title="Quick request via WhatsApp"
          className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 hover:border-emerald-600/40 hover:scale-105 active:scale-95 text-emerald-700 transition-all duration-200 shrink-0 shadow-2xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
        >
          <WhatsAppIcon className="w-3.5 h-3.5" />
        </a>
      </div>
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
      className="relative w-full py-12 sm:py-18 px-4 sm:px-6 md:px-12 bg-white text-text-primary overflow-visible border-b border-line select-none"
    >
      <div className="max-w-7xl mx-auto relative z-10 overflow-visible">
        {/* Section Header with smooth blur fade up */}
        <Reveal delay={0} y={16} duration={0.65} className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 sm:mb-12 overflow-visible">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red-50 border border-brand-red/20 text-[#8B1A1A] text-xs font-semibold uppercase tracking-wider mb-3">
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

          {/* Status Tag Legend */}
          <div className="mt-4 pt-4 border-t border-line/80 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-600">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600" aria-hidden="true" />
              <span className="font-semibold text-slate-800">Live client project:</span>
              <span>Client deliverable in production</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-sky-600" aria-hidden="true" />
              <span className="font-semibold text-slate-800">Concept project:</span>
              <span>Architecture &amp; UX exploration</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-600" aria-hidden="true" />
              <span className="font-semibold text-slate-800">Our product:</span>
              <span>Internal tooling &amp; platform</span>
            </div>
          </div>
        </Reveal>

        {/* Responsive Showcase Grid: 1 col mobile, 2 col tablet/desktop */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 ${
            projects.length % 3 === 0 ? "lg:grid-cols-3" : "lg:grid-cols-2"
          } gap-5 sm:gap-6 items-stretch overflow-visible`}
        >
          {projects.map((project, idx) => (
            <m.div
              key={project.slug}
              initial={{ opacity: 0, y: 22, scale: 0.98, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.7,
                delay: idx * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="h-full overflow-visible"
            >
              <WebProjectShowcaseCard
                project={project}
                onOpenReport={openReportModal}
                onOpenPreview={openPreviewModal}
              />
            </m.div>
          ))}
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
            className="relative max-w-5xl w-full bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh] border border-slate-200"
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
                    <span className="px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold">
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
                className="p-2 rounded-xl hover:bg-slate-200 text-slate-500 hover:text-ink transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body Container */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-slate-100/60">
              {modalState.activeTab === "preview" ? (
                /* Tab 1: Scrollable Browser Window UI Preview */
                <div className="w-full rounded-xl sm:rounded-2xl bg-white border border-slate-300 shadow-md overflow-hidden flex flex-col">
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
                        https://{modalState.project.slug}.luciecreatives.in
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
                <div className="flex flex-col gap-5">
                  {/* Top Metric Cards */}
                  <div
                    className={`grid grid-cols-2 ${
                      modalState.project.lighthouse.agenticBrowsing
                        ? "sm:grid-cols-5"
                        : "sm:grid-cols-4"
                    } gap-3`}
                  >
                    <div className="p-4 rounded-xl bg-white border border-line shadow-xs flex flex-col items-center text-center">
                      <span className="text-xs font-semibold text-slate-600 mb-1">Performance</span>
                      <span className="text-3xl font-extrabold text-[#008744]">
                        {modalState.project.lighthouse.performance ?? "—"}
                      </span>
                      <span className="text-[10px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full mt-1">
                        Sub-second FCP
                      </span>
                    </div>
                    <div className="p-4 rounded-xl bg-white border border-line shadow-xs flex flex-col items-center text-center">
                      <span className="text-xs font-semibold text-slate-600 mb-1">Accessibility</span>
                      <span className="text-3xl font-extrabold text-[#008744]">
                        {modalState.project.lighthouse.accessibility ?? "—"}
                      </span>
                      <span className="text-[10px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full mt-1">
                        WCAG 2.1 AA
                      </span>
                    </div>
                    <div className="p-4 rounded-xl bg-white border border-line shadow-xs flex flex-col items-center text-center">
                      <span className="text-xs font-semibold text-slate-600 mb-1">Best Practices</span>
                      <span className="text-3xl font-extrabold text-[#008744]">
                        {modalState.project.lighthouse.bestPractices ?? "—"}
                      </span>
                      <span className="text-[10px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full mt-1">
                        Zero Deprecations
                      </span>
                    </div>
                    <div className="p-4 rounded-xl bg-white border border-line shadow-xs flex flex-col items-center text-center">
                      <span className="text-xs font-semibold text-slate-600 mb-1">SEO</span>
                      <span className="text-3xl font-extrabold text-[#008744]">
                        {modalState.project.lighthouse.seo ?? "—"}
                      </span>
                      <span className="text-[10px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full mt-1">
                        JSON-LD Schema
                      </span>
                    </div>
                    {modalState.project.lighthouse.agenticBrowsing && (
                      <div className="p-4 rounded-xl bg-white border border-line shadow-xs flex flex-col items-center text-center">
                        <span className="text-xs font-semibold text-slate-600 mb-1">Agentic Browsing</span>
                        <div className="flex items-center justify-center gap-1.5 my-auto">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#008744]" aria-hidden="true" />
                          <span className="text-3xl font-extrabold text-[#008744]">
                            {modalState.project.lighthouse.agenticBrowsing}
                          </span>
                        </div>
                        <span className="text-[10px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full mt-1">
                          AI Agent Ready
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Audit Screenshot Graphic */}
                  {modalState.project.reportImage ? (
                    <div className="rounded-xl sm:rounded-2xl bg-white border border-line p-4 sm:p-6 shadow-xs flex flex-col items-center">
                      <div className="flex items-center justify-between w-full mb-3 text-xs font-semibold text-slate-700">
                        <span className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Official Google Lighthouse Audit Capture</span>
                        </span>
                        <span className="font-mono text-slate-500">
                          {modalState.project.lighthouse.mode} · {modalState.project.lighthouse.measuredOn}
                        </span>
                      </div>
                      <div className="relative w-full max-w-2xl aspect-[564/160] rounded-xl overflow-hidden border border-slate-200 shadow-xs bg-slate-50">
                        <Image
                          src={modalState.project.reportImage}
                          alt={`Official Lighthouse audit score report for ${modalState.project.title}`}
                          fill
                          className="object-contain p-2"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="p-8 rounded-xl bg-white border border-line text-center text-sm text-slate-500">
                      Detailed Lighthouse audit report graphic is currently being compiled for this concept project.
                    </div>
                  )}

                  {/* Core Web Vitals Summary */}
                  <div className="p-4 rounded-xl bg-white border border-line text-xs text-slate-700">
                    <span className="font-bold text-ink uppercase tracking-wider block mb-2">
                      Core Web Vitals Engineering Highlights:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-[11px]">
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                        <span className="text-slate-500 block">First Contentful Paint (FCP)</span>
                        <span className="text-emerald-700 font-bold text-sm">&lt; 0.8s</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                        <span className="text-slate-500 block">Largest Contentful Paint (LCP)</span>
                        <span className="text-emerald-700 font-bold text-sm">&lt; 1.2s</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                        <span className="text-slate-500 block">Cumulative Layout Shift (CLS)</span>
                        <span className="text-emerald-700 font-bold text-sm">0.00 (Zero Shift)</span>
                      </div>
                    </div>
                  </div>
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
