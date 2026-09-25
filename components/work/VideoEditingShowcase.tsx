"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { extractYouTubeVideoId } from "@/lib/youtube";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Film,
  Layers,
  Award,
  Clock,
  Radio,
  Sliders,
} from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { MagneticButton } from "@/components/ui/MagneticButton";
import {
  CLIENT_VIDEOS,
  VIDEO_CATEGORIES,
  ClientVideoItem,
  VideoCategory,
  generateVideoSchema,
} from "@/lib/client-videos-data";

export function VideoEditingShowcase() {
  const [activeCategory, setActiveCategory] = useState<VideoCategory>("All Productions");
  const [selectedVideo, setSelectedVideo] = useState<ClientVideoItem | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (selectedVideo) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [selectedVideo]);

  // Cinema Spot Player State
  const cinemaVideoRef = useRef<HTMLVideoElement>(null);
  const [cinemaPlaying, setCinemaPlaying] = useState(false);
  const [cinemaMuted, setCinemaMuted] = useState(true);
  const [cinemaProgress, setCinemaProgress] = useState(0);
  const [cinemaDuration, setCinemaDuration] = useState(48);
  const [cinemaCurrentTime, setCinemaCurrentTime] = useState(0);

  // Active playing card for 9:16 grid
  const [hoveredReelId, setHoveredReelId] = useState<string | null>(null);
  const [reelsMuted, setReelsMuted] = useState(true);

  // Pagination for 9:16 grid
  const [visibleCount, setVisibleCount] = useState(8);

  // Filtered reels (excluding 16:9 cinema spot from 9:16 grid)
  const filteredReels = useMemo(() => {
    return CLIENT_VIDEOS.filter((v) => {
      if (v.aspectRatio === "16:9") return false;
      if (activeCategory === "All Productions") return true;
      return v.category === activeCategory;
    });
  }, [activeCategory]);

  const cinemaVideo = useMemo(
    () => CLIENT_VIDEOS.find((v) => v.id === "nirva-cinema") || CLIENT_VIDEOS[0],
    []
  );

  // Schema.org VideoObject JSON-LD
  const videoSchema = useMemo(() => generateVideoSchema(CLIENT_VIDEOS), []);

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  // Cinema Player Listeners
  const toggleCinemaPlay = () => {
    const vid = cinemaVideoRef.current;
    if (!vid) return;
    if (vid.paused) {
      vid.play().then(() => setCinemaPlaying(true)).catch(() => {});
    } else {
      vid.pause();
      setCinemaPlaying(false);
    }
  };

  const toggleCinemaMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const vid = cinemaVideoRef.current;
    if (!vid) return;
    vid.muted = !vid.muted;
    setCinemaMuted(vid.muted);
  };

  const handleCinemaTimeUpdate = () => {
    const vid = cinemaVideoRef.current;
    if (!vid) return;
    setCinemaCurrentTime(vid.currentTime);
    if (vid.duration) {
      setCinemaDuration(vid.duration);
      setCinemaProgress((vid.currentTime / vid.duration) * 100);
    }
  };

  const handleCinemaSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vid = cinemaVideoRef.current;
    if (!vid) return;
    const newTime = (parseFloat(e.target.value) / 100) * vid.duration;
    vid.currentTime = newTime;
    setCinemaProgress(parseFloat(e.target.value));
  };

  // IntersectionObserver for Cinema Video (Autoplay when 50% in viewport, pause when out)
  useEffect(() => {
    const vid = cinemaVideoRef.current;
    if (!vid) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.45) {
            vid.play().then(() => setCinemaPlaying(true)).catch(() => {});
          } else {
            vid.pause();
            setCinemaPlaying(false);
          }
        });
      },
      { threshold: [0.1, 0.45, 0.8] }
    );

    observer.observe(vid);
    return () => observer.disconnect();
  }, []);

  // Handle keyboard escape for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedVideo(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section
      id="video-editing"
      className="py-16 sm:py-24 px-4 sm:px-6 md:px-12 bg-ink text-white relative overflow-hidden font-sans"
    >
      {/* Schema.org VideoObject JSON-LD structured data for Google Search */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
      />

      {/* Atmospheric Background Layers */}
      <div className="absolute inset-0 dot-grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-[#7A1F2B]/15 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[500px] h-[500px] bg-brand-red/[0.05] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-14">
          <SectionLabel
            text="ORIGINAL CLIENT VIDEO VAULT"
            className="mb-4 !border-white/15 !bg-white/5 !text-white"
          />

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase leading-[1.08] max-w-4xl text-balance">
            Algorithmic Retention &amp;{" "}
            <span className="text-[#C4384B] font-serif italic lowercase font-normal block sm:inline text-[1.08em]">
              commercial cinema.
            </span>
          </h2>

          <p className="mt-5 text-sm sm:text-base md:text-lg text-muted/60 font-medium leading-relaxed max-w-2xl text-pretty">
            Cinema-grade post-production engineered to command prestige and halt the scroll. Browse our complete production vault of original client videos across Gujarat &amp; India—from monumental 16:9 cinema films to viral 9:16 founder reels and luxury architectural walkthroughs.
          </p>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            PART A: FLAGSHIP 16:9 CINEMA SPOTLIGHT (Nirva Resort)
           ───────────────────────────────────────────────────────────── */}
        <div className="mb-14 sm:mb-20">
          <div className="group relative rounded-3xl overflow-hidden border border-white/10 bg-slate-900/90 shadow-2xl transition-all">
            {/* Top Floating Badge Bar */}
            <div className="absolute top-4 inset-x-4 sm:inset-x-6 flex items-center justify-between z-30 pointer-events-none">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-white/20 text-xs font-black text-white shadow-lg">
                <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
                <span className="uppercase tracking-wider">Flagship 16:9 Cinema Commercial</span>
              </div>
              <div className="px-3.5 py-1.5 rounded-full bg-[#7A1F2B] text-xs font-mono font-bold text-white shadow-md">
                Client: {cinemaVideo.client}
              </div>
            </div>

            {/* Cinema Video Container */}
            <div
              className="relative w-full aspect-[16/9] bg-black cursor-pointer overflow-hidden"
              onClick={toggleCinemaPlay}
            >
              {extractYouTubeVideoId(cinemaVideo.videoSrc) ? (
                <iframe
                  src={`https://www.youtube.com/embed/${extractYouTubeVideoId(cinemaVideo.videoSrc)}?autoplay=0&playsinline=1&rel=0`}
                  title={cinemaVideo.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  ref={cinemaVideoRef}
                  src={cinemaVideo.videoSrc}
                  playsInline
                  muted={cinemaMuted}
                  loop
                  preload="metadata"
                  onTimeUpdate={handleCinemaTimeUpdate}
                  className="w-full h-full object-cover"
                />
              )}

              {/* Center Large Play/Pause Tactile Indicator (fades on play) */}
              <div
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 pointer-events-none ${
                  cinemaPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100 bg-black/40"
                }`}
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#7A1F2B]/90 backdrop-blur-md text-white flex items-center justify-center shadow-2xl border border-white/20 transform transition-transform group-hover:scale-110">
                  {cinemaPlaying ? (
                    <Pause className="w-7 h-7 fill-current" />
                  ) : (
                    <Play className="w-7 h-7 fill-current translate-x-0.5" />
                  )}
                </div>
              </div>

              {/* Bottom Custom Cinema Player Control Strip */}
              <div
                className="absolute bottom-0 inset-x-0 p-4 sm:p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-20 flex flex-col gap-2 transition-opacity duration-300"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Timeline Progress Slider */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="0.1"
                  value={cinemaProgress}
                  onChange={handleCinemaSeek}
                  aria-label="Seek video"
                  className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#C4384B] hover:h-2 transition-all"
                />

                <div className="flex items-center justify-between text-xs font-mono text-white/80 pt-1">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={toggleCinemaPlay}
                      className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                      aria-label={cinemaPlaying ? "Pause video" : "Play video"}
                    >
                      {cinemaPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                    </button>
                    <button
                      onClick={toggleCinemaMute}
                      className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer flex items-center gap-1.5 text-[11px] font-bold"
                      aria-label={cinemaMuted ? "Unmute audio" : "Mute audio"}
                    >
                      {cinemaMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-brand-red" />}
                      <span>{cinemaMuted ? "Tap to Unmute" : "Sound On"}</span>
                    </button>
                    <span className="hidden sm:inline-block font-semibold">
                      {formatTime(cinemaCurrentTime)} / {formatTime(cinemaDuration)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-4 text-[11px]">
                    <span className="hidden md:inline-block px-2.5 py-1 rounded bg-white/10 border border-white/10 font-bold uppercase tracking-wider">
                      {cinemaVideo.specs.colorGrade}
                    </span>
                    <span className="px-2.5 py-1 rounded bg-ink/80 border border-brand-red/30 text-brand-red font-bold">
                      {cinemaVideo.metric}: {cinemaVideo.metricLabel}
                    </span>
                    <button
                      onClick={() => setSelectedVideo(cinemaVideo)}
                      className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                      title="Expand Video Details"
                      aria-label="Expand video details"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Editorial Strip below Cinema Video */}
            <div className="p-6 sm:p-8 bg-slate-900 border-t border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#C4384B] uppercase tracking-wider mb-2">
                  <span>{cinemaVideo.category}</span>
                  <span>•</span>
                  <span>{cinemaVideo.specs.resolution}</span>
                  <span>•</span>
                  <span>{cinemaVideo.specs.fps}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                  {cinemaVideo.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-muted/60 font-medium leading-relaxed">
                  {cinemaVideo.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {cinemaVideo.deliverables.map((del, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-200 font-mono font-medium"
                    >
                      {del}
                    </span>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-4 border-t lg:border-t-0 lg:border-l border-white/10 pt-4 lg:pt-0 lg:pl-6">
                <div className="text-left lg:text-right">
                  <div className="text-3xl font-black font-mono text-[#C4384B]">
                    {cinemaVideo.metric}
                  </div>
                  <div className="text-xs font-bold text-muted">
                    {cinemaVideo.metricLabel}
                  </div>
                </div>
                <MagneticButton
                  href="/contact"
                  variant="primary"
                  size="sm"
                  className="px-5 py-2.5 text-xs font-black rounded-xl shadow-red-btn !bg-[#7A1F2B] hover:!bg-[#631923] text-white shrink-0"
                >
                  <span>Start a Project</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            PART B: FILTERABLE 9:16 VERTICAL REEL GALLERY (28 Productions)
           ───────────────────────────────────────────────────────────── */}
        <div className="mt-12 sm:mt-16">
          {/* Gallery Header & Filter Pills */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#C4384B] uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Omnichannel Vertical Suites • 9:16 Fast-Hook Formats</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                High-Retention Vertical Productions
              </h3>
              <p className="text-xs sm:text-sm text-muted/60 font-medium mt-1">
                Real client reels engineered for sub-1s thumb stopping, ACES color science, and proven engagement.
              </p>
            </div>

            {/* Global Reels Audio Toggle Button */}
            <button
              onClick={() => setReelsMuted(!reelsMuted)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-bold text-white transition-all cursor-pointer self-start md:self-auto shrink-0"
            >
              {reelsMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-brand-red" />}
              <span>{reelsMuted ? "All Reels Muted (Click to Enable Sound)" : "Reel Sound Active"}</span>
            </button>
          </div>

          {/* Filter Pills Horizontal Scroller */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-4 mb-8">
            {VIDEO_CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => {
                    setActiveCategory(category);
                    setVisibleCount(8);
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-bold tracking-tight whitespace-nowrap transition-all duration-200 cursor-pointer border ${
                    isActive
                      ? "bg-[#7A1F2B] text-white border-[#7A1F2B] shadow-md scale-105"
                      : "bg-white/5 hover:bg-white/10 text-muted/60 border-white/10"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* 9:16 Vertical Reel Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredReels.slice(0, visibleCount).map((reel) => {
              return (
                <ReelCard
                  key={reel.id}
                  reel={reel}
                  isGlobalMuted={reelsMuted}
                  onExpand={() => setSelectedVideo(reel)}
                />
              );
            })}
          </div>

          {/* Show More / Show All Button */}
          {visibleCount < filteredReels.length && (
            <div className="mt-12 flex justify-center">
              <button
                onClick={() => setVisibleCount((prev) => Math.min(prev + 8, filteredReels.length))}
                className="px-8 py-3.5 rounded-2xl bg-white/10 hover:bg-[#7A1F2B] border border-white/15 text-xs font-black text-white uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-2 shadow-lg"
              >
                <span>Load More Productions ({filteredReels.length - visibleCount} remaining)</span>
                <Sparkles className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Bottom Conversion Action Strip */}
        <div className="mt-16 sm:mt-24 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-[#7A1F2B]/40 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div>
            <div className="text-xs font-mono font-bold text-[#C4384B] uppercase tracking-wider mb-2">
              Ready to Win Algorithmic Retention?
            </div>
            <h4 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Scale Your Inbound Leads with Cinema-Grade Video
            </h4>
            <p className="mt-2 text-xs sm:text-sm text-muted/60 max-w-xl font-medium">
              We manage end-to-end post-production for Gujarat&apos;s leading brands and creator founders. Turnaround in 24-48 hours.
            </p>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <MagneticButton
              href="/contact"
              variant="primary"
              size="md"
              className="px-7 py-3.5 text-xs font-black rounded-xl shadow-red-btn !bg-[#7A1F2B] hover:!bg-[#631923] text-white"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </MagneticButton>
            <Link
              href="/video-editing"
              className="text-xs font-bold text-muted/60 hover:text-white underline underline-offset-4 transition-colors"
            >
              View All Video Edits &amp; Reels →
            </Link>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          PART C: CINEMATIC THEATER MODAL
         ───────────────────────────────────────────────────────────── */}
      {selectedVideo && isMounted && createPortal(
        <div
          className="fixed inset-0 z-[9999] top-0 left-0 w-full h-full bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 md:p-10"
          onClick={() => setSelectedVideo(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-5xl bg-white border border-line rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 z-40 p-2 rounded-full bg-line/50 hover:bg-line text-body transition-colors cursor-pointer border border-line shadow-xs"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Video Player Side */}
            <div
              className={`relative bg-black flex items-center justify-center ${
                selectedVideo.aspectRatio === "16:9"
                  ? "w-full aspect-[16/9] lg:w-7/12"
                  : "w-full lg:w-5/12 aspect-[9/16] max-h-[70vh] lg:max-h-[85vh]"
              }`}
            >
              {extractYouTubeVideoId(selectedVideo.videoSrc) ? (
                <iframe
                  src={`https://www.youtube.com/embed/${extractYouTubeVideoId(selectedVideo.videoSrc)}?autoplay=1&mute=0&playsinline=1&rel=0&modestbranding=1`}
                  title={selectedVideo.title}
                  className="w-full h-full border-0 aspect-[9/16]"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="no-referrer"
                  allowFullScreen
                />
              ) : (
                <video
                  src={selectedVideo.videoSrc}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain"
                />
              )}
            </div>

            {/* Details Drawer Side */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between overflow-y-auto no-scrollbar border-t lg:border-t-0 lg:border-l border-line/60 bg-white text-ink">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-brand-red uppercase tracking-wider mb-2">
                  <span>{selectedVideo.category}</span>
                  <span>•</span>
                  <span>{selectedVideo.categoryBadge}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-ink leading-tight">
                  {selectedVideo.title}
                </h3>

                <div className="mt-2 text-xs font-bold text-muted">
                  Client: <span className="text-ink">{selectedVideo.client}</span>
                </div>

                <p className="mt-4 text-xs sm:text-sm text-body font-medium leading-relaxed">
                  {selectedVideo.description}
                </p>

                {/* Outcome Metric Callout */}
                <div className="mt-5 p-4 rounded-2xl bg-brand-redLight/40 border border-brand-red/20 flex items-center gap-4">
                  <div className="text-3xl font-black font-mono text-brand-red">
                    {selectedVideo.metric}
                  </div>
                  <div className="text-xs font-bold text-body">
                    <div className="text-brand-red uppercase tracking-wider font-black text-[10px]">
                      Documented Outcome
                    </div>
                    {selectedVideo.metricLabel}
                  </div>
                </div>

                {/* Technical Specs Matrix */}
                <div className="mt-5 space-y-2 text-xs font-mono">
                  <div className="flex justify-between py-1 border-b border-line/60 text-muted">
                    <span>Resolution:</span>
                    <span className="text-ink font-bold">{selectedVideo.specs.resolution}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-line/60 text-muted">
                    <span>Master Framerate:</span>
                    <span className="text-ink font-bold">{selectedVideo.specs.fps}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-line/60 text-muted">
                    <span>Color Science:</span>
                    <span className="text-ink font-bold">{selectedVideo.specs.colorGrade}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-line/60 text-muted">
                    <span>Sprint Turnaround:</span>
                    <span className="text-ink font-bold">{selectedVideo.specs.turnaround}</span>
                  </div>
                </div>

                {/* Deliverables Tags */}
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {selectedVideo.deliverables.map((del, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md bg-white border border-line text-[11px] text-body font-mono font-medium"
                    >
                      {del}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6 mt-6 border-t border-line/60 flex items-center justify-between gap-4">
                <span className="text-xs font-mono text-muted">
                  Duration: {selectedVideo.duration}
                </span>
                <MagneticButton
                  href="/contact"
                  variant="primary"
                  size="sm"
                  className="px-6 py-2.5 text-xs font-black rounded-xl shadow-red-btn !bg-brand-red hover:!bg-brand-redDark text-white"
                >
                  <span>Start a Project</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// REEL CARD COMPONENT (9:16 Vertical Video with In-Place Preview)
// ─────────────────────────────────────────────────────────────
interface ReelCardProps {
  reel: ClientVideoItem;
  isGlobalMuted: boolean;
  onExpand: () => void;
}

function ReelCard({ reel, isGlobalMuted, onExpand }: ReelCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLocalMuted, setIsLocalMuted] = useState(isGlobalMuted);

  // Sync with global mute state
  useEffect(() => {
    setIsLocalMuted(isGlobalMuted);
    if (videoRef.current) {
      videoRef.current.muted = isGlobalMuted;
    }
  }, [isGlobalMuted]);

  // Viewport IntersectionObserver (Autoplay when in viewport, pause when offscreen)
  useEffect(() => {
    const el = containerRef.current;
    const vid = videoRef.current;
    if (!el || !vid) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            vid.play().then(() => setIsPlaying(true)).catch(() => {});
          } else {
            vid.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: [0.1, 0.5, 0.9] }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const toggleCardMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const vid = videoRef.current;
    if (!vid) return;
    const nextMuted = !vid.muted;
    vid.muted = nextMuted;
    setIsLocalMuted(nextMuted);
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.paused) {
      vid.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      vid.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className="group relative rounded-3xl overflow-hidden border border-white/10 bg-slate-900/90 hover:border-[#7A1F2B]/60 transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-2xl"
    >
      {/* 9:16 Video Frame */}
      <div
        className="relative aspect-[9/16] w-full overflow-hidden bg-black cursor-pointer"
        onClick={onExpand}
      >
        {extractYouTubeVideoId(reel.videoSrc) ? (
          <Image
            src={reel.posterSrc || `https://i.ytimg.com/vi/${extractYouTubeVideoId(reel.videoSrc)}/hqdefault.jpg`}
            alt={reel.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <video
            ref={videoRef}
            src={reel.videoSrc}
            playsInline
            muted={isLocalMuted}
            loop
            preload="metadata"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}

        {/* Top Badges */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between z-20 pointer-events-none">
          <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-[10px] font-mono font-bold text-white uppercase tracking-wider shadow-xs">
            {reel.client}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-[#7A1F2B] text-[10px] font-mono font-bold text-white shadow-xs">
            {reel.metric}
          </span>
        </div>

        {/* Center Play/Pause indicator on hover */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 pointer-events-none ${
            isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100 bg-black/30"
          }`}
        >
          <div className="w-12 h-12 rounded-full bg-black/70 backdrop-blur-md text-white flex items-center justify-center shadow-xl border border-white/20">
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 fill-current translate-x-0.5" />
            )}
          </div>
        </div>

        {/* Bottom Card Controls */}
        <div className="absolute bottom-3 inset-x-3 flex items-center justify-between z-20">
          <button
            onClick={toggleCardMute}
            className="p-1.5 rounded-full bg-black/70 hover:bg-black/90 backdrop-blur-md border border-white/20 text-white transition-colors cursor-pointer"
            aria-label={isLocalMuted ? "Unmute reel" : "Mute reel"}
          >
            {isLocalMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-red-400" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-brand-red" />
            )}
          </button>

          <span className="px-2 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono font-semibold text-white/90">
            {reel.duration}
          </span>
        </div>
      </div>

      {/* Card Info Drawer */}
      <div className="p-4 flex flex-col justify-between flex-grow bg-slate-900 border-t border-white/10">
        <div>
          <div className="text-[10px] font-mono font-bold text-[#C4384B] uppercase tracking-wider mb-1">
            {reel.categoryBadge}
          </div>
          <h4 className="text-sm font-black text-white line-clamp-2 leading-snug group-hover:text-[#C4384B] transition-colors">
            {reel.title}
          </h4>
          <p className="mt-1 text-[11px] text-muted font-medium line-clamp-2 leading-relaxed">
            {reel.tagline}
          </p>
        </div>

        <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
          <span className="text-[10px] font-mono font-medium text-muted">
            {reel.metricLabel}
          </span>
          <button
            onClick={onExpand}
            className="inline-flex items-center gap-1 text-[11px] font-black text-[#C4384B] hover:text-white transition-colors cursor-pointer"
          >
            <span>Watch Full</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
