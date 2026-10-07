"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { WorkProject } from "@/lib/work-data";
import { SITE_STATS } from "@/lib/site-stats";
import {
  Film,
  ArrowUpRight,
  Volume2,
  VolumeX,
  Play,
  Pause,
  CheckCircle2,
} from "lucide-react";
import { WorkSectionHeading } from "./WorkSectionHeading";
import { motion, useReducedMotion, useInView } from "framer-motion";

interface LongFormCinemaShowcaseProps {
  projects: WorkProject[];
}

export function LongFormCinemaShowcase({ projects }: LongFormCinemaShowcaseProps) {
  if (projects.length === 0) return null;

  const featuredFilm = projects[0];
  const additionalFilms = projects.slice(1);
  const isSingleFilm = projects.length === 1;

  return (
    <section
      id="long-form-videos"
      className={`relative w-full ${
        isSingleFilm ? "py-8 sm:py-12" : "py-12 sm:py-16"
      } bg-white text-text-primary overflow-hidden border-b border-line`}
    >
      {/* Background Ambience */}
      {null}
      {null}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        {/* Section Header with Unified System Architecture */}
        <WorkSectionHeading
          badgeIcon={Film}
          badgeText="16:9 Cinema Commercial"
          primaryWord="Long Form"
          accentWord="Cinema"
          description="Flagship 4K commercial spot production engineered with Hollywood-grade ACES color science, cinematic drone cinematography, and precision orchestral sound design."
        />

        {/* Featured Film Panel */}
        <div className={isSingleFilm ? "mt-2" : "space-y-10"}>
          <CinemaProjectPanel project={featuredFilm} index={0} />

          {/* Compact Grid for Additional Films when more than one film exists */}
          {additionalFilms.length > 0 && (
            <div className="pt-8 border-t border-line">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-muted mb-6">
                More Commercial Films &amp; Documentaries ({additionalFilms.length})
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {additionalFilms.map((film) => (
                  <CompactCinemaCard key={film.slug} project={film} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function CompactCinemaCard({ project }: { project: WorkProject }) {
  return (
    <div className="group bg-white/70 border border-line/90 hover:border-brand-red/40 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
      <div>
        <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-slate-900 mb-4 shadow-sm">
          <Image
            src={project.posterSrc}
            alt={`${project.title} - 16:9 commercial still for ${project.client}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between pointer-events-none">
            <span className="px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-mono text-white">
              {project.client}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-brand-red uppercase mb-1">
          <span>{project.industry}</span>
          <span>•</span>
          <span>{project.year}</span>
        </div>

        <h4 className="text-base font-black text-ink group-hover:text-brand-red transition-colors leading-snug">
          {project.title}
        </h4>

        <p className="mt-1.5 text-xs text-body line-clamp-2 leading-relaxed">
          {project.brief}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-line/60 flex items-center justify-between">
        <span className="text-[10px] font-mono text-muted truncate mr-2">
          {project.outcomeLabel}
        </span>
        <Link
          href={`/work/${project.slug}`}
          className="inline-flex items-center gap-1 text-[11px] font-bold text-brand-red hover:text-brand-redDark shrink-0"
        >
          <span>Case Study</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

function CinemaProjectPanel({
  project,
  index,
}: {
  project: WorkProject;
  index: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isScreenInView = useInView(screenRef as React.RefObject<Element>, { once: true, amount: 0.25 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Intersection Observer for Autoplay at 0.5 threshold
  useEffect(() => {
    const el = containerRef.current;
    if (!el || !project.videoSrc) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const vid = videoRef.current;
          if (!vid) return;

          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            vid.muted = isMuted;
            vid.play().then(() => setIsPlaying(true)).catch(() => {});
          } else {
            vid.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: [0.2, 0.5, 0.8] }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [project.videoSrc, isMuted]);

  const togglePlay = () => {
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.paused) {
      vid.play();
      setIsPlaying(true);
    } else {
      vid.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = !vid.muted;
    setIsMuted(vid.muted);
  };

  const isEven = index % 2 === 0;

  return (
    <div
      ref={containerRef}
      className={`flex flex-col ${
        isEven ? "lg:flex-row" : "lg:flex-row-reverse"
      } items-center gap-10 lg:gap-14 bg-white/70 border border-line/90 rounded-3xl p-4 sm:p-8 lg:p-10 shadow-sm hover:shadow-xl hover:border-brand-red/30 transition-all duration-500`}
    >
      {/* 1. Cinema 16:9 Screen */}
      <div
        ref={screenRef}
        data-cursor="Play"
        onClick={togglePlay}
        className="w-full lg:w-3/5 relative aspect-[16/9] rounded-2xl overflow-hidden bg-slate-900 border border-line shadow-xl group cursor-pointer"
      >

        {/* Thumbnail slowly pushes in (scale 1.0 to 1.06 over 8s) */}
        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : isScreenInView
              ? { scale: [1, 1.06] }
              : { scale: 1 }
          }
          transition={{ duration: 8, ease: "linear" }}
          className="w-full h-full relative"
        >
          {/* Base Cinema Poster Still */}
          <Image
            src={project.posterSrc}
            alt={`${project.title} - 16:9 commercial cinema still for ${project.client}`}
            fill
            loading="lazy"
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover z-0"
          />

          {/* Seamless Video Overlay */}
          {project.videoSrc && (
            <video
              ref={videoRef}
              src={project.videoSrc}
              poster={project.posterSrc}
              muted={isMuted}
              loop
              playsInline
              preload="none"
              onError={() => setIsPlaying(false)}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 z-0 ${
                isPlaying ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            />
          )}
        </motion.div>

        {/* Subtle bottom shadow gradient only behind badge for maximum video brightness */}
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none z-10" />

        {/* Top Badges */}
        <div className="absolute top-2.5 sm:top-4 inset-x-2.5 sm:inset-x-4 flex items-center justify-between pointer-events-none z-10">
          <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] sm:text-xs font-mono font-bold text-white uppercase">
            16:9 Commercial
          </span>
        </div>

        {/* Interactive Play / Mute Overlays */}
        <div className="absolute bottom-2.5 sm:bottom-4 inset-x-2.5 sm:inset-x-4 flex items-center justify-between z-20">
          <button
            type="button"
            data-cursor="Play"
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
            className="px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-black/70 hover:bg-black/90 border border-white/20 text-white text-[11px] sm:text-xs font-bold flex items-center gap-1.5 sm:gap-2 backdrop-blur-md transition-all cursor-pointer"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white" />}
            <span>{isPlaying ? "Pause" : "Play"}</span>
          </button>

          <button
            type="button"
            onClick={toggleMute}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/70 hover:bg-black/90 border border-white/20 flex items-center justify-center text-white backdrop-blur-md transition-all cursor-pointer"
            title={isMuted ? "Unmute Sound" : "Mute Sound"}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted" /> : <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-red" />}
          </button>
        </div>
      </div>

      {/* 2. Film Metadata & Directorial Concept */}
      <div className="w-full lg:w-2/5 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-mono uppercase tracking-widest text-brand-red font-bold">
              {project.client}
            </span>
            <span className="text-muted/60">•</span>
            <span className="text-xs font-mono text-muted">{project.year}</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-ink leading-tight">
            {project.title}
          </h3>

          <p className="mt-3 text-sm text-body leading-relaxed font-normal">
            {project.brief}
          </p>

          {/* Deliverables List */}
          <div className="mt-6 space-y-2">
            <div className="text-xs font-mono uppercase tracking-wider text-muted font-bold">
              Key Deliverables
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {project.deliverables.slice(0, 4).map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-body font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-red shrink-0" />
                  <span className="truncate">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tools & Pipeline */}
          <div className="mt-6 flex items-center flex-wrap gap-1.5">
            {project.tools.map((tool, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-md bg-white border border-line text-[11px] font-mono text-body shadow-xs"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Case Study Link */}
        <div className="mt-8 pt-6 border-t border-line flex items-center justify-between">
          <div>
            <div className="text-xs text-muted font-medium">Outcome Impact</div>
            <div className="text-sm font-black text-ink">{project.outcomeLabel}</div>
          </div>
          <Link
            href={`/work/${project.slug}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-red hover:bg-brand-redDark text-white text-xs font-black tracking-wider uppercase transition-all shadow-red-btn group/btn"
          >
            <span>Case Study</span>
            <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
