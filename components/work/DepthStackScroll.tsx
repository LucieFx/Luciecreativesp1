"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { WorkProject, StatBreakItem } from "@/lib/work-data";
import { ArrowUpRight, Sparkles, Play } from "lucide-react";

interface DepthStackScrollProps {
  projects: WorkProject[];
  statBreak: StatBreakItem;
}

// Single Project Panel with Lazy-Loading Shimmer Skeleton & Video Autoplay IntersectionObserver
function ProjectPanel({
  project,
  index,
  total,
  isFinal,
}: {
  project: WorkProject;
  index: number;
  total: number;
  isFinal: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInLoadMargin, setIsInLoadMargin] = useState(index < 2); // Eager load first 2 projects
  const [mediaReady, setMediaReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // 1. Lazy-load media when within ~1 viewport (rootMargin: "100% 0px")
  useEffect(() => {
    if (isInLoadMargin) return;
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInLoadMargin(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isInLoadMargin]);

  // 2. Video Autoplay / Pause & Reset Observer (threshold: 0.6)
  useEffect(() => {
    if (project.mediaType !== "video") return;
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.current;
        if (!video) return;

        if (entry.intersectionRatio >= 0.6) {
          video
            .play()
            .then(() => setIsPlaying(true))
            .catch(() => {
              // Autoplay policy fallback
            });
        } else {
          video.pause();
          video.currentTime = 0;
          setIsPlaying(false);
        }
      },
      { threshold: [0, 0.6, 1] }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [project.mediaType, isInLoadMargin]);

  return (
    <article
      ref={containerRef}
      className={`relative w-full ${
        isFinal ? "min-h-[92vh]" : "min-h-[85vh] sm:min-h-[90vh]"
      } py-10 sm:py-16 px-4 sm:px-8 md:px-12 flex items-center justify-center`}
    >
      <Link
        href={`/work/${project.slug}`}
        data-cursor-hover="true"
        data-cursor-text="VIEW"
        className="group relative w-full max-w-6xl block rounded-3xl overflow-hidden shadow-2xl border border-line/80 bg-ink transition-all duration-500 hover:shadow-[0_25px_60px_rgba(139,26,26,0.25)] hover:border-brand-red/40"
      >
        {/* Aspect Ratio Container filling ~80%+ viewport height */}
        <div
          className={`relative w-full ${
            isFinal
              ? "h-[65vh] sm:h-[78vh]"
              : "h-[55vh] sm:h-[70vh] md:h-[76vh]"
          } overflow-hidden bg-[#0A0505]`}
        >
          {/* Skeleton Shimmer State: Shown until media is within margin and ready */}
          {(!isInLoadMargin || !mediaReady) && (
            <div className="absolute inset-0 z-10 skeleton-shimmer flex items-center justify-center">
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/40">
                <Play className="w-5 h-5 ml-0.5" />
              </div>
            </div>
          )}

          {/* Real Media (Mounted once in load margin) */}
          {isInLoadMargin && (
            <>
              {project.mediaType === "video" && project.videoSrc ? (
                <video
                  ref={videoRef}
                  src={project.videoSrc}
                  poster={project.posterSrc}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  onLoadedData={() => setMediaReady(true)}
                  className={`w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 ${
                    mediaReady ? "opacity-100" : "opacity-0"
                  }`}
                />
              ) : (
                <Image
                  src={project.posterSrc}
                  alt={`${project.title} — ${project.client} graphic design case`}
                  fill
                  sizes="(max-width: 768px) 100vw, 1200px"
                  onLoad={() => setMediaReady(true)}
                  className={`object-cover object-center transition-all duration-700 ease-out group-hover:scale-105 ${
                    mediaReady ? "opacity-100" : "opacity-0"
                  }`}
                />
              )}
            </>
          )}

          {/* Liquid-Glass Dark Gradient Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

          {/* Top-Right: Category & Year Liquid-Glass Badge */}
          <div className="absolute top-5 right-5 sm:top-7 sm:right-7 z-20 pointer-events-none">
            <div className="px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-xs font-black tracking-wider uppercase flex items-center gap-2 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-brand-red" />
              <span>{project.category}</span>
              <span className="text-white/50">• {project.year}</span>
            </div>
          </div>

          {/* Bottom-Left: Liquid-Glass Client Name Pill & Project Meta */}
          <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 z-20 max-w-2xl text-left pointer-events-none">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white text-xs font-black uppercase tracking-wider mb-3 shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-brand-redLight" />
              <span>{project.client}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-2 drop-shadow-md">
              {project.title}
            </h2>

            <p className="text-xs sm:text-sm md:text-base font-semibold text-white/80 line-clamp-2 max-w-xl text-pretty drop-shadow-sm">
              {project.tagline}
            </p>
          </div>

          {/* Final Project: Prominent "View case study →" Button */}
          {isFinal && (
            <div className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 z-20">
              <span className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-brand-red hover:bg-brand-redDark text-white text-xs sm:text-sm font-black uppercase tracking-wider shadow-red-btn transition-transform group-hover:scale-105 pointer-events-auto">
                <span>View Case Study</span>
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>
          )}

          {/* Non-Final: Subtle Corner Arrow Icon */}
          {!isFinal && (
            <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-20 pointer-events-none">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center group-hover:bg-brand-red group-hover:scale-110 transition-all shadow-md">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}

// Full-Width Stat/Quote Break Panel
function StatQuoteBreak({ stat }: { stat: StatBreakItem }) {
  return (
    <section className="relative w-full py-24 sm:py-32 my-12 bg-[#8B1A1A] text-white px-6 sm:px-12 md:px-20 overflow-hidden border-y border-white/10 select-none">
      <div className="max-w-5xl mx-auto relative z-10 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white/90 text-xs font-black uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Founders&apos; Conviction</span>
        </div>

        <blockquote className="font-serif italic font-normal text-white text-[clamp(1.8rem,4vw,3.5rem)] leading-tight tracking-tight max-w-4xl mx-auto text-balance">
          {stat.quote}
        </blockquote>

        {/* Explicit Attribution */}
        <div className="pt-2 text-xs sm:text-sm font-mono uppercase tracking-widest text-red-200 font-bold">
          <span>— {stat.author}</span>
          {stat.role && <span className="text-white/70 ml-2 font-normal">[{stat.role}]</span>}
        </div>

        {stat.metric && (
          <div className="pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-center gap-6 text-center">
            <div>
              <div className="text-4xl sm:text-6xl font-black text-white tracking-tight">
                {stat.metric}
              </div>
              <div className="text-xs font-black uppercase tracking-widest text-red-200">
                {stat.metricLabel}
              </div>
            </div>
            {stat.subtext && (
              <div className="text-xs sm:text-sm font-bold text-white/80 max-w-xs text-pretty sm:text-left sm:border-l sm:border-white/20 sm:pl-6">
                {stat.subtext}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export function DepthStackScroll({
  projects,
  statBreak,
}: DepthStackScrollProps) {
  return (
    <div className="w-full bg-white relative">
      <div>
          {projects.map((project, idx) => {
            const isFinal = idx === projects.length - 1;
            const insertBreakAfter = Math.min(3, Math.floor(projects.length / 2) - 1);

            return (
              <React.Fragment key={project.slug}>
                <ProjectPanel
                  project={project}
                  index={idx}
                  total={projects.length}
                  isFinal={isFinal}
                />

                {/* Insert full-width stat/quote break after ~4th project */}
                {idx === insertBreakAfter && <StatQuoteBreak stat={statBreak} />}
              </React.Fragment>
            );
          })}
      </div>
    </div>
  );
}
