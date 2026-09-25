"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Briefcase,
  Calendar,
  Building2,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import { getProjectBySlug, WorkProject } from "@/lib/work-data";
import { extractYouTubeVideoId } from "@/lib/youtube";
import {
  getClientPortfolioItems,
  getRelatedCategoryProjects,
  getNavigationProjectContext,
} from "@/lib/cross-portfolio";
import { MoreFromClientStrip } from "./MoreFromClientStrip";
import { MoreInCategoryStrip } from "./MoreInCategoryStrip";
import { CaseStudyConversionFooter } from "./CaseStudyConversionFooter";
import { VideoBentoGrid } from "./VideoBentoGrid";
import { NirvaDesignGallery } from "./NirvaDesignGallery";
import { NirvaBrandSystem } from "./NirvaBrandSystem";
import { MaskReveal } from "@/components/motion";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { SPRING_SOFT } from "@/lib/motion";

const slideVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction < 0 ? "100%" : "-100%", opacity: 0 }),
};

interface CaseStudyOverlayProps {
  slug: string;
}

export function CaseStudyOverlay({ slug }: CaseStudyOverlayProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const prefersReducedMotion = useReducedMotion();
  const [slideDirection, setSlideDirection] = useState<number>(0);
  const [activeStillIndex, setActiveStillIndex] = useState<number | null>(null);

  const backdropRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const project = useMemo(() => getProjectBySlug(slug), [slug]);

  // Read category filter from URL search params or session storage
  const categoryFilter = useMemo(() => {
    const fromUrl = searchParams.get("category");
    if (fromUrl) return fromUrl;
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("lucie_graphic_category") || null;
    }
    return null;
  }, [searchParams]);

  // Navigation: Prev & Next projects in grid order
  const { prevProject, nextProject } = useMemo(() => {
    return getNavigationProjectContext(slug, categoryFilter);
  }, [slug, categoryFilter]);

  // Strips data
  const clientCards = useMemo(() => {
    if (!project) return [];
    return getClientPortfolioItems(project);
  }, [project]);

  const categoryCards = useMemo(() => {
    if (!project) return [];
    const excludedIds = new Set(clientCards.map((c) => c.slug || c.id));
    return getRelatedCategoryProjects(project, excludedIds);
  }, [project, clientCards]);

  // Lock body scroll & pause Lenis while overlay is mounted
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const lenis = (window as any).__lenis;
    if (lenis && typeof lenis.stop === "function") {
      lenis.stop();
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      if (lenis && typeof lenis.start === "function") {
        lenis.start();
      }
    };
  }, []);

  // Close handler: navigate back to the underlying page
  const handleClose = () => {
    router.back();
  };

  // Switch to another project without adding history entries
  const handleNavigate = (targetSlug: string, dir: number = 0) => {
    setSlideDirection(dir);
    const catQuery = categoryFilter && categoryFilter !== "All" ? `?category=${encodeURIComponent(categoryFilter)}` : "";
    router.replace(`/work/${targetSlug}${catQuery}`, { scroll: false });
  };

  // Keyboard navigation: Escape, ArrowLeft, ArrowRight, and Focus trap
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeStillIndex !== null) {
        if (e.key === "Escape") {
          e.preventDefault();
          setActiveStillIndex(null);
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          if (project?.processStills?.length) {
            setActiveStillIndex((prev) =>
              prev !== null
                ? prev === 0
                  ? project.processStills!.length - 1
                  : prev - 1
                : null
            );
          }
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          if (project?.processStills?.length) {
            setActiveStillIndex((prev) =>
              prev !== null
                ? prev === project.processStills!.length - 1
                  ? 0
                  : prev + 1
                : null
            );
          }
        }
        return;
      }

      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (prevProject) handleNavigate(prevProject.slug, -1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        if (nextProject) handleNavigate(nextProject.slug, 1);
      } else if (e.key === "Tab") {
        // Focus trap
        if (!panelRef.current) return;
        const focusables = panelRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prevProject, nextProject, activeStillIndex, project]);

  // Initial focus on mount
  useEffect(() => {
    closeBtnRef.current?.focus();
  }, []);

  if (!project) {
    return null;
  }

  const isVideo =
    project.category === "Short Form Videos" ||
    project.category === "Long Form Videos" ||
    Boolean(project.videoSrc);
  const videoId = project.videoSrc ? extractYouTubeVideoId(project.videoSrc) : null;

  return (
    <div
      ref={backdropRef}
      onClick={(e) => {
        if (e.target === backdropRef.current) {
          handleClose();
        }
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/75 backdrop-blur-md overflow-hidden animate-in fade-in duration-200"
    >
      {/* Desktop Prev Button (Fixed Left) */}
      <div className="hidden lg:flex fixed left-4 top-1/2 -translate-y-1/2 z-50">
        <button
          onClick={() => handleNavigate(prevProject.slug, -1)}
          className="group relative flex items-center gap-2 p-3.5 rounded-full bg-black/70 hover:bg-black/90 text-white border border-white/20 hover:border-white/40 shadow-xl backdrop-blur-md transition-all duration-200 cursor-pointer"
          aria-label={`Previous project: ${prevProject.title}`}
        >
          <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap text-xs font-bold text-white/90 transition-all duration-300 group-hover:max-w-xs group-hover:pr-2">
            {prevProject.title}
          </span>
        </button>
      </div>

      {/* Desktop Next Button (Fixed Right) */}
      <div className="hidden lg:flex fixed right-4 top-1/2 -translate-y-1/2 z-50">
        <button
          onClick={() => handleNavigate(nextProject.slug, 1)}
          className="group relative flex items-center gap-2 p-3.5 rounded-full bg-black/70 hover:bg-black/90 text-white border border-white/20 hover:border-white/40 shadow-xl backdrop-blur-md transition-all duration-200 cursor-pointer"
          aria-label={`Next project: ${nextProject.title}`}
        >
          <span className="max-w-0 overflow-hidden whitespace-nowrap text-xs font-bold text-white/90 transition-all duration-300 group-hover:max-w-xs group-hover:pl-2">
            {nextProject.title}
          </span>
          <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      {/* Main Modal Panel */}
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-study-title"
        data-lenis-prevent="true"
        initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
        animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
        exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
        transition={SPRING_SOFT}
        className="relative w-full max-w-[1100px] max-h-[92vh] flex flex-col bg-white rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden border border-line"
      >
        {/* Sticky Top Header with Close Button */}
        <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md px-5 sm:px-8 py-3.5 border-b border-line/60 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 min-w-0">
            <span className="px-2.5 py-1 rounded-full bg-brand-redLight text-brand-red border border-brand-red/20 text-[11px] font-black uppercase tracking-wider shrink-0">
              {project.category}
            </span>
            <span className="text-xs font-mono text-muted truncate hidden sm:inline">
              {project.client}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              ref={closeBtnRef}
              onClick={handleClose}
              className="p-2 rounded-full text-muted hover:text-ink bg-slate-100 hover:bg-line transition-colors cursor-pointer"
              aria-label="Close case study"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body with Horizontal Slide Transition */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-8 md:px-10 py-6 sm:py-8 no-scrollbar">
          <AnimatePresence mode="popLayout" custom={slideDirection} initial={false}>
            <motion.div
              key={project.slug}
              custom={slideDirection}
              variants={slideVariants}
              initial={prefersReducedMotion ? undefined : "enter"}
              animate={prefersReducedMotion ? undefined : "center"}
              exit={prefersReducedMotion ? undefined : "exit"}
              transition={SPRING_SOFT}
              className="space-y-8"
            >
              {/* 1. Header Details */}
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-body mb-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 border border-line font-bold">
                <Briefcase className="w-3.5 h-3.5 text-muted" />
                <span>{project.industry}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 border border-line font-bold">
                <Calendar className="w-3.5 h-3.5 text-muted" />
                <span>{project.year}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 border border-line font-bold">
                <Building2 className="w-3.5 h-3.5 text-muted" />
                <span>{project.client}</span>
              </span>
            </div>

            <h1
              id="case-study-title"
              className="text-2xl sm:text-3xl md:text-4xl font-black text-ink tracking-tight leading-snug mb-3"
            >
              {project.title}
            </h1>

            <p className="text-sm sm:text-base text-body font-medium leading-relaxed max-w-3xl">
              {project.tagline || project.brief}
            </p>
          </div>

          {/* 2. Hero Visual Showcase */}
          <div className="w-full">
            {project.multiVideos && project.multiVideos.length > 0 ? (
              <VideoBentoGrid
                videos={project.multiVideos}
                clientName={project.client}
                projectTitle={project.title}
              />
            ) : (
              <motion.div
                layoutId={`case-image-${project.slug}`}
                className={`relative mx-auto rounded-2xl overflow-hidden shadow-lg ${
                  project.mediaType === "video" ? "bg-black" : "bg-slate-50"
                } border border-line ${
                  project.aspectRatio === "9/16"
                    ? "max-w-[340px] aspect-[9/16]"
                    : project.aspectRatio === "4/5"
                    ? "max-w-[540px] aspect-[4/5]"
                    : project.aspectRatio === "1/1"
                    ? "max-w-[600px] aspect-square"
                    : "w-full aspect-video"
                }`}
              >
                {project.mediaType === "video" && project.videoSrc ? (
                  videoId ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&playsinline=1&rel=0`}
                      title={project.title}
                      className="w-full h-full border-0 aspect-[9/16]"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      src={project.videoSrc}
                      poster={project.posterSrc}
                      autoPlay
                      muted
                      loop
                      playsInline
                      controls
                      className="w-full h-full object-cover"
                    />
                  )
                ) : (
                  <div className="relative w-full h-full p-3 sm:p-5 flex items-center justify-center">
                    <Image
                      src={project.posterSrc}
                      alt={project.title}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 1000px"
                      className="object-contain drop-shadow-md"
                    />
                  </div>
                )}
              </motion.div>
            )}
          </div>

          {/* 3. Metric & Deliverables Highlight Card */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-5 sm:p-6 bg-white rounded-2xl border border-line">
            <div className="md:col-span-4 flex flex-col justify-center border-b md:border-b-0 md:border-r border-line pb-4 md:pb-0 md:pr-4">
              <span className="text-2xl sm:text-3xl font-black text-brand-red font-mono">
                {project.outcomeMetric}
              </span>
              <span className="text-xs font-mono font-bold text-body mt-0.5">
                {project.outcomeLabel}
              </span>
            </div>

            <div className="md:col-span-8 flex flex-col justify-center">
              <div className="text-[11px] font-mono font-bold text-muted uppercase tracking-wider mb-2">
                Deliverables
              </div>
              <div className="flex flex-wrap gap-1.5">
                {project.deliverables.map((del, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white border border-line text-xs font-medium text-body shadow-2xs"
                  >
                    <CheckCircle2 className="w-3 h-3 text-brand-red" />
                    <span>{del}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 4. Strategic Narrative (Brief & Approach) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="space-y-2">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-muted">
                The Challenge
              </h3>
              <p className="text-sm text-body leading-relaxed font-normal">
                {project.challenge || project.brief}
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-muted">
                The Solution &amp; Execution
              </h3>
              <p className="text-sm text-body leading-relaxed font-normal">
                {project.approach || project.outcomeDetails}
              </p>
            </div>
          </div>

          {/* 5. Nirva Specific Assets if applicable */}
          {project.designGalleries && project.designGalleries.length > 0 && (
            <NirvaDesignGallery
              categories={project.designGalleries}
              clientName={project.client}
            />
          )}

          {project.brandIdentitySystem && (
            <NirvaBrandSystem
              palette={project.brandIdentitySystem.palette}
              typography={project.brandIdentitySystem.typography}
              architecturalNotes={project.brandIdentitySystem.architecturalNotes}
              downloads={project.brandIdentitySystem.downloads}
              clientName={project.client}
            />
          )}

          {/* 6. Process Stills Gallery if present */}
          {project.processStills && project.processStills.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-line">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-muted">
                Visual Artifacts &amp; Collateral
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.processStills.slice(0, 4).map((still, i) => (
                  <div
                    key={i}
                    onClick={() => setActiveStillIndex(i)}
                    className="group relative rounded-xl overflow-hidden border border-line bg-white/60 cursor-pointer shadow-2xs hover:shadow-md transition-shadow"
                  >
                    <MaskReveal direction="up" duration={0.6} className="w-full">
                      <div className="relative w-full aspect-[4/3] bg-[#F5F2EF] p-2 flex items-center justify-center">
                        <Image
                          src={still.src}
                          alt={still.alt || still.caption}
                          fill
                          sizes="(max-width: 640px) 100vw, 50vw"
                          className="object-contain group-hover:scale-103 transition-transform duration-300"
                        />
                      </div>
                    </MaskReveal>
                    {still.caption && (
                      <div className="p-2.5 text-xs text-body font-mono flex items-center justify-between">
                        <span>{still.caption}</span>
                        <span className="text-brand-red text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">View →</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 7. "More from {Client}" Strip (Cross-Discipline) */}
          <MoreFromClientStrip
            clientName={project.client}
            cards={clientCards}
            onNavigate={(href) => {
              if (href.startsWith("/work/")) {
                const targetSlug = href.replace("/work/", "");
                handleNavigate(targetSlug);
              } else {
                router.push(href);
              }
            }}
          />

          {/* 8. "More in {Category}" Strip */}
          <MoreInCategoryStrip
            categoryName={project.category}
            cards={categoryCards}
            onNavigate={(href) => {
              if (href.startsWith("/work/")) {
                const targetSlug = href.replace("/work/", "");
                handleNavigate(targetSlug);
              } else {
                router.push(href);
              }
            }}
          />

          {/* Mobile Prev / Next Controls at bottom of panel */}
          <div className="flex lg:hidden items-center justify-between gap-3 pt-6 border-t border-line">
            <button
              onClick={() => handleNavigate(prevProject.slug, -1)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-line text-ink text-xs font-bold transition-colors cursor-pointer truncate"
            >
              <ChevronLeft className="w-4 h-4 shrink-0" />
              <span className="truncate">Prev: {prevProject.title}</span>
            </button>
            <button
              onClick={() => handleNavigate(nextProject.slug, 1)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-line text-ink text-xs font-bold transition-colors cursor-pointer truncate"
            >
              <span className="truncate">Next: {nextProject.title}</span>
              <ChevronRight className="w-4 h-4 shrink-0" />
            </button>
          </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 9. Slim Conversion Footer Bar */}
        <CaseStudyConversionFooter projectTitle={project.title} />
      </motion.div>

      {/* 10. High-Resolution Lightbox Modal for Process Stills */}
      {typeof document !== "undefined" && (
        <AnimatePresence>
          {activeStillIndex !== null && project?.processStills && project.processStills[activeStillIndex] && createPortal(
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              role="dialog"
              aria-modal="true"
              aria-label="High-resolution image viewer"
              className="fixed inset-0 z-[10000] top-0 left-0 w-full h-full bg-white/95 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-8 select-none shadow-2xl"
              onClick={() => setActiveStillIndex(null)}
            >
              {/* Lightbox Header Bar */}
              <div
                className="flex items-center justify-between text-ink z-20 pb-4 border-b border-line"
                onClick={(e) => e.stopPropagation()}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-brand-red uppercase tracking-wider bg-brand-redLight px-2 py-0.5 rounded-full border border-brand-red/20">
                      Visual Artifact
                    </span>
                    <span className="text-muted font-bold">•</span>
                    <span className="text-xs font-mono font-bold text-body">
                      Asset {activeStillIndex + 1} of {project.processStills.length}
                    </span>
                  </div>
                  {project.processStills[activeStillIndex].caption && (
                    <h3 className="text-base sm:text-lg font-black text-ink mt-1">
                      {project.processStills[activeStillIndex].caption}
                    </h3>
                  )}
                </div>

                <button
                  onClick={() => setActiveStillIndex(null)}
                  aria-label="Close high-resolution viewer"
                  className="p-2.5 rounded-full bg-slate-100 hover:bg-line text-ink border border-line shadow-sm transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Main Lightbox Display */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={SPRING_SOFT}
                className="relative flex-grow flex items-center justify-center my-4 overflow-hidden"
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
              >
                {project.processStills.length > 1 && (
                  <button
                    onClick={() =>
                      setActiveStillIndex((prev) =>
                        prev !== null ? (prev === 0 ? project.processStills!.length - 1 : prev - 1) : null
                      )
                    }
                    aria-label="Previous image"
                    className="absolute left-2 sm:left-6 z-30 p-3.5 rounded-full bg-white/90 hover:bg-white text-ink border border-line shadow-xl transition-all cursor-pointer backdrop-blur-sm hover:scale-105 active:scale-95"
                  >
                    <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
                  </button>
                )}

                <div className="relative w-full h-full max-w-5xl max-h-[75vh] flex items-center justify-center p-2">
                  <Image
                    src={project.processStills[activeStillIndex].src}
                    alt={
                      project.processStills[activeStillIndex].alt ||
                      project.processStills[activeStillIndex].caption ||
                      project.title
                    }
                    fill
                    priority
                    sizes="(max-width: 1200px) 100vw, 1400px"
                    className="object-contain drop-shadow-2xl rounded-lg"
                  />
                </div>

                {project.processStills.length > 1 && (
                  <button
                    onClick={() =>
                      setActiveStillIndex((prev) =>
                        prev !== null ? (prev === project.processStills!.length - 1 ? 0 : prev + 1) : null
                      )
                    }
                    aria-label="Next image"
                    className="absolute right-2 sm:right-6 z-30 p-3.5 rounded-full bg-white/90 hover:bg-white text-ink border border-line shadow-xl transition-all cursor-pointer backdrop-blur-sm hover:scale-105 active:scale-95"
                  >
                    <ChevronRight className="w-6 h-6 stroke-[2.5]" />
                  </button>
                )}
              </motion.div>

              {/* Lightbox Footer Bar */}
              <div
                className="flex items-center justify-between text-xs text-body pt-3 border-t border-line font-mono"
                onClick={(e) => e.stopPropagation()}
              >
                <div>
                  <span className="text-body">Project: </span>
                  <strong className="text-ink font-bold">{project.title}</strong>
                </div>
                <div className="hidden sm:block text-body font-medium">
                  <span>Use Left/Right arrows or ESC to navigate</span>
                </div>
              </div>
            </motion.div>,
            document.body
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
