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
  Sparkles,
} from "lucide-react";
import { m, useInView, useReducedMotion } from "framer-motion";
import {
  getVisibleWebProjects,
  type WebProject,
  type WebProjectStatus,
} from "@/data/web-projects";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { buildWhatsAppLink } from "@/lib/constants";

/**
 * Status Tag Helper Component
 */
function StatusTag({ status }: { status: WebProjectStatus }) {
  switch (status) {
    case "client":
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/80">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" aria-hidden="true" />
          <span>Live client project</span>
        </span>
      );
    case "concept":
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-50 text-sky-800 border border-sky-200/80">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-600" aria-hidden="true" />
          <span>Concept project</span>
        </span>
      );
    case "own-product":
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-800 border border-purple-200/80">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-600" aria-hidden="true" />
          <span>Our product</span>
        </span>
      );
  }
}

/**
 * Animated SVG Circular Score Ring
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

  const radius = 17;
  const strokeWidth = 3;
  const circumference = 2 * Math.PI * radius;

  // Determine standard Lighthouse color
  let strokeColor = "#94A3B8"; // neutral slate gray for null / unmeasured
  if (score !== null) {
    if (score >= 90) strokeColor = "#0CCE6B"; // green
    else if (score >= 50) strokeColor = "#FFA400"; // orange
    else strokeColor = "#FF4E42"; // red
  }

  const targetOffset =
    score !== null ? circumference * (1 - Math.min(Math.max(score, 0), 100) / 100) : circumference;

  const accessibleLabel =
    score !== null ? `${label}: ${score} out of 100` : `${label}: Measuring soon`;

  return (
    <div
      ref={ref}
      className="flex flex-col items-center text-center gap-1.5"
      aria-label={accessibleLabel}
      role="meter"
      aria-valuenow={score !== null ? score : undefined}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className="relative w-12 h-12 flex items-center justify-center">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 44 44" aria-hidden="true">
          {/* Background Track */}
          <circle
            cx="22"
            cy="22"
            r={radius}
            fill="transparent"
            stroke="#E2E8F0"
            strokeWidth={strokeWidth}
          />
          {/* Animated Progress Circle */}
          {score !== null ? (
            <m.circle
              cx="22"
              cy="22"
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
              cx="22"
              cy="22"
              r={radius}
              fill="transparent"
              stroke="#CBD5E1"
              strokeWidth={strokeWidth}
              strokeDasharray="3 3"
            />
          )}
        </svg>

        {/* Center Score Value */}
        <span className="absolute font-body font-bold text-xs sm:text-[13px] text-ink select-none">
          {score !== null ? score : "—"}
        </span>
      </div>

      <div className="flex flex-col items-center leading-none">
        <span className="text-[11px] font-semibold text-slate-700 tracking-tight">
          {label}
        </span>
        {score === null && (
          <span className="text-[9px] font-medium text-slate-400 mt-0.5">
            Measuring soon
          </span>
        )}
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
}: {
  project: WebProject;
  isHovered: boolean;
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
      {/* 1. MacBook-Style Laptop Frame (CSS / SVG) */}
      <div className="relative w-full rounded-t-xl sm:rounded-t-2xl bg-slate-900 border border-slate-800 shadow-sm overflow-hidden flex flex-col pt-2 px-2 pb-0 transition-transform duration-500 ease-out group-hover:scale-[1.01]">
        {/* Laptop Display Top Bezel: Camera Dot */}
        <div className="flex items-center justify-center pb-1.5" aria-hidden="true">
          <div className="w-1.5 h-1.5 rounded-full bg-slate-800 border border-slate-700" />
        </div>

        {/* Laptop Screen Viewport */}
        <div className="relative w-full aspect-[16/10] bg-slate-950 rounded-t-sm overflow-hidden border border-slate-800/80">
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
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-xs text-white text-xs font-semibold shadow-md transition-transform duration-200 group-hover:scale-105">
                    <Play className="w-3.5 h-3.5 fill-white" />
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

          {/* Low-Opacity IP Watermark on Laptop Screen */}
          <div
            className="absolute top-2.5 right-2.5 z-10 pointer-events-none select-none px-2 py-0.5 rounded bg-black/40 backdrop-blur-2xs text-[10px] font-mono tracking-wider text-white/70 shadow-2xs"
            aria-hidden="true"
          >
            Lucie Creatives
          </div>
        </div>
      </div>

      {/* Laptop Aluminum Base & Notch */}
      <div className="w-full bg-gradient-to-b from-slate-200 via-slate-300 to-slate-400 h-2.5 sm:h-3 rounded-b-lg border-t border-slate-400/60 flex items-center justify-center shadow-xs">
        <div className="w-12 sm:w-16 h-1 rounded-full bg-slate-500/50" aria-hidden="true" />
      </div>

      {/* 2. Overlapping Mobile Phone Frame (Bottom-Right Corner) */}
      <div
        className="absolute -bottom-2 -right-1 sm:-bottom-3 sm:-right-2 z-20 w-[68px] sm:w-[84px] aspect-[9/19.5] rounded-[14px] sm:rounded-[18px] bg-slate-900 border-2 border-slate-800 shadow-xl overflow-hidden flex flex-col p-1 transition-all duration-500 ease-out group-hover:-translate-y-1.5 group-hover:scale-105 group-hover:shadow-2xl"
        aria-hidden="true"
      >
        {/* Phone Notch */}
        <div className="w-5 sm:w-6 h-1 bg-slate-800 rounded-full mx-auto mb-0.5 shrink-0" />

        {/* Phone Screen */}
        <div className="relative w-full flex-1 rounded-[10px] sm:rounded-[13px] overflow-hidden bg-slate-950">
          <Image
            src={project.screenshotMobile || project.screenshotDesktop}
            alt={`${project.title} mobile interface`}
            fill
            sizes="84px"
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
}: {
  project: WebProject;
  onOpenReport: (imageSrc: string, projectTitle: string) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const contactMessage = `Hi, I'd like the live link for ${project.title}.`;
  const contactHref = `/contact?message=${encodeURIComponent(contactMessage)}`;
  const whatsappHref = buildWhatsAppLink(contactMessage);

  return (
    <article
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-line/80 shadow-xs hover:border-[#8B1A1A]/35 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1.5 transition-all duration-300 ease-out flex flex-col justify-between h-full group"
    >
      <div>
        {/* Device Showcase (Laptop + Overlapping Mobile Phone) */}
        <div className="mb-6 pt-1">
          <ShowcaseDeviceFrames project={project} isHovered={isHovered} />
        </div>

        {/* Status Tag & Category */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <StatusTag status={project.status} />
          <span className="text-[11px] font-mono font-semibold text-slate-500 uppercase tracking-wider truncate">
            {project.category}
          </span>
        </div>

        {/* Project Title */}
        <h3 className="text-xl sm:text-2xl font-bold font-body text-ink tracking-tight mb-2">
          {project.title}
        </h3>

        {/* Description (max 2 short sentences) */}
        <p className="text-sm sm:text-[15px] font-normal text-slate-700 leading-relaxed mb-4 text-pretty">
          {project.description}
        </p>

        {/* Tech Stack Chips */}
        <div className="flex flex-wrap gap-1.5 mb-6" aria-label="Technology stack">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded-md bg-slate-100/90 hover:bg-slate-200/90 text-slate-700 hover:text-ink text-xs font-semibold border border-line/60 transition-colors duration-150"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Lighthouse Score Row */}
        <div className="pt-4 border-t border-line/80 mb-6">
          <div className="grid grid-cols-4 gap-2 mb-3">
            <LighthouseRing score={project.lighthouse.performance} label="Performance" delay={0.05} />
            <LighthouseRing score={project.lighthouse.accessibility} label="Accessibility" delay={0.12} />
            <LighthouseRing score={project.lighthouse.bestPractices} label="Best Practices" delay={0.19} />
            <LighthouseRing score={project.lighthouse.seo} label="SEO" delay={0.26} />
          </div>

          {/* Audit Metadata & Report Link */}
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium pt-1">
            <span>
              {project.lighthouse.mode}, measured {project.lighthouse.measuredOn}
            </span>
            {project.reportImage && (
              <button
                type="button"
                onClick={() => onOpenReport(project.reportImage!, project.title)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#8B1A1A] hover:underline cursor-pointer transition-colors"
              >
                <FileCheck className="w-3.5 h-3.5" />
                <span>View report</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Action Row: Request Live Link + WhatsApp Quick Message */}
      <div className="pt-4 border-t border-line/80 flex items-center justify-between gap-3 mt-auto">
        <Link
          href={contactHref}
          className="group/btn flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#8B1A1A] hover:bg-[#721515] active:scale-[0.98] text-white font-body font-bold text-xs sm:text-sm transition-all duration-200 shadow-xs hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B1A1A]"
        >
          <span>Request live link</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
        </Link>

        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Request live link for ${project.title} via WhatsApp`}
          title="Quick request via WhatsApp"
          className="p-2.5 rounded-xl border border-line/80 bg-white hover:bg-slate-50 hover:border-emerald-600/40 hover:scale-105 active:scale-95 text-emerald-700 transition-all duration-200 shrink-0 shadow-2xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
        >
          <WhatsAppIcon className="w-4 h-4" />
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
  const [reportModal, setReportModal] = useState<{ src: string; title: string } | null>(null);

  // Close report modal on Esc key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setReportModal(null);
    };
    if (reportModal) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [reportModal]);

  return (
    <section
      id="websites-weve-built"
      className="relative w-full py-16 sm:py-24 px-4 sm:px-6 md:px-12 bg-white text-text-primary overflow-hidden border-b border-line select-none"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-red-50 border border-brand-red/20 text-[#8B1A1A] text-xs font-semibold uppercase tracking-wider mb-4">
            <Shield className="w-3.5 h-3.5" />
            <span>Digital Engineering Portfolio</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-[-0.02em] leading-[1.0] text-ink text-balance mb-4">
            Websites we&apos;ve built
          </h2>

          <p className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed max-w-2xl text-pretty mb-2">
            Screenshots and real performance scores. Live links on request.
          </p>

          <p className="text-xs sm:text-sm text-slate-500 font-normal">
            Live links are shared privately on request.
          </p>

          {/* Status Tag Legend */}
          <div className="mt-6 pt-5 border-t border-line/80 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-600">
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
        </div>

        {/* Responsive Showcase Grid: 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {projects.map((project, idx) => (
            <m.div
              key={project.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.45,
                delay: idx * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="h-full"
            >
              <WebProjectShowcaseCard
                project={project}
                onOpenReport={(src, title) => setReportModal({ src, title })}
              />
            </m.div>
          ))}
        </div>
      </div>

      {/* Accessible Report Lightbox Modal */}
      {reportModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="report-modal-title"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setReportModal(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-line mb-4">
              <h3 id="report-modal-title" className="text-base font-bold text-ink">
                Lighthouse Audit Report — {reportModal.title}
              </h3>
              <button
                type="button"
                onClick={() => setReportModal(null)}
                aria-label="Close Lighthouse report modal"
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-ink transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative w-full aspect-16/10 bg-slate-50 rounded-xl overflow-hidden border border-line">
              <Image
                src={reportModal.src}
                alt={`Lighthouse audit report for ${reportModal.title}`}
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default WebDevBrowserShowcase;
