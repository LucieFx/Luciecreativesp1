"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  X,
  Film,
  Smartphone,
  ChevronLeft,
  ChevronRight,
  Tv,
} from "lucide-react";
import { WorkVideoItem } from "@/lib/work-data";
import { extractYouTubeVideoId } from "@/lib/youtube";

interface VideoBentoGridProps {
  videos: WorkVideoItem[];
  clientName: string;
  projectTitle: string;
}

export function VideoBentoGrid({
  videos,
  clientName,
  projectTitle,
}: VideoBentoGridProps) {
  const [theaterVideo, setTheaterVideo] = useState<WorkVideoItem | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [playingStates, setPlayingStates] = useState<Record<string, boolean>>({});
  const [mutedStates, setMutedStates] = useState<Record<string, boolean>>({});
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const theaterVideoRef = useRef<HTMLVideoElement | null>(null);

  // Mount detection for React portal
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Lock body scroll when theater modal is open
  useEffect(() => {
    if (theaterVideo) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [theaterVideo]);

  // Check if there is an authentic 16:9 widescreen cinema video
  const flagship16x9 = videos.find((v) => v.aspectRatio === "16/9");
  const has16x9 = !!flagship16x9;

  // Vertical 9:16 reels (if has16x9 is true, exclude it; otherwise ALL videos are vertical reels)
  const verticalReels = has16x9
    ? videos.filter((v) => v.id !== flagship16x9?.id)
    : videos;

  // Toggle Play / Pause for a specific card
  const togglePlay = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const vid = videoRefs.current[id];
    if (vid) {
      if (vid.paused) {
        vid.play().catch(() => {});
        setPlayingStates((prev) => ({ ...prev, [id]: true }));
      } else {
        vid.pause();
        setPlayingStates((prev) => ({ ...prev, [id]: false }));
      }
    } else {
      // Toggle state for iframe embeds
      setPlayingStates((prev) => ({ ...prev, [id]: !prev[id] }));
    }
  };

  // Toggle Mute / Unmute for a specific card
  const toggleMute = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const vid = videoRefs.current[id];
    if (!vid) return;
    vid.muted = !vid.muted;
    setMutedStates((prev) => ({ ...prev, [id]: vid.muted }));
  };

  // Keyboard navigation for theater mode
  useEffect(() => {
    if (!theaterVideo) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setTheaterVideo(null);
      if (e.key === "ArrowRight") {
        const idx = videos.findIndex((v) => v.id === theaterVideo.id);
        const nextIdx = (idx + 1) % videos.length;
        setTheaterVideo(videos[nextIdx]);
      }
      if (e.key === "ArrowLeft") {
        const idx = videos.findIndex((v) => v.id === theaterVideo.id);
        const prevIdx = (idx - 1 + videos.length) % videos.length;
        setTheaterVideo(videos[prevIdx]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [theaterVideo, videos]);

  if (!videos || videos.length === 0) return null;

  return (
    <section className="space-y-8" aria-label="Video Reel Bento Grid">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-line">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red/10 text-brand-red text-xs font-black uppercase tracking-wider mb-2">
            <Smartphone className="w-3.5 h-3.5" />
            <span>High-Retention 9:16 Vertical Video Suite</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-ink tracking-tight">
            Complete Client Video Deliverables ({videos.length} Motion Cuts)
          </h2>
          <p className="text-xs sm:text-sm text-body font-normal mt-1 max-w-2xl leading-relaxed">
            High-retention vertical reels engineered for maximum organic engagement, algorithmic watch-through, and direct audience response.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono font-bold text-muted shrink-0">
          <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
          <span>{videos.length} Verified Reels Ready</span>
        </div>
      </div>

      {/* The Master Bento Grid Layout */}
      <div className="grid grid-cols-12 gap-5 sm:gap-6 lg:gap-8">
        {/* 1. Flagship 16:9 Cinema Commercial (Only rendered when an authentic 16:9 video exists) */}
        {has16x9 && flagship16x9 && (
          <div className="col-span-12 group rounded-xl bg-white border border-line shadow-xs overflow-hidden flex flex-col relative transition-colors duration-200 hover:border-brand-red/40">
            {/* Video Player Viewport */}
            <div
              className="relative w-full aspect-video bg-black cursor-pointer overflow-hidden"
              onClick={() => togglePlay(flagship16x9.id)}
            >
              {extractYouTubeVideoId(flagship16x9.videoSrc) ? (
                <iframe
                  src={`https://www.youtube.com/embed/${extractYouTubeVideoId(flagship16x9.videoSrc)}?autoplay=0&playsinline=1&rel=0&modestbranding=1`}
                  title={flagship16x9.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="no-referrer"
                  allowFullScreen
                />
              ) : (
                <video
                  ref={(el) => {
                    videoRefs.current[flagship16x9.id] = el;
                  }}
                  src={flagship16x9.videoSrc}
                  poster={flagship16x9.posterSrc}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-700"
                  aria-label={`${flagship16x9.title} for ${clientName}`}
                  onPlay={() =>
                    setPlayingStates((prev) => ({ ...prev, [flagship16x9.id]: true }))
                  }
                  onPause={() =>
                    setPlayingStates((prev) => ({ ...prev, [flagship16x9.id]: false }))
                  }
                />
              )}

              {/* Floating Top Badges */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-mono font-bold tracking-wider shadow-md">
                  <Tv className="w-3.5 h-3.5 text-brand-redLight" />
                  <span>16:9 • 4K CINEMA COMMERCIAL</span>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-brand-red/70 text-xs font-mono font-bold tracking-wider shadow-md">
                  <span className="w-2 h-2 rounded-full bg-brand-red animate-ping" />
                  <span>FLAGSHIP MASTER</span>
                </div>
              </div>
            </div>

            {/* Bottom Content Narrative */}
            <div className="p-6 sm:p-8 bg-white text-ink border-t border-line/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1.5 max-w-3xl">
                <h3 className="text-lg sm:text-xl font-black tracking-tight text-ink group-hover:text-brand-red transition-colors">
                  {flagship16x9.title}
                </h3>
                {flagship16x9.description && (
                  <p className="text-xs sm:text-sm text-body font-normal leading-relaxed">
                    {flagship16x9.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 2. Vertical 9:16 Social Reels (True 9:16 Smartphone Bento Cards) */}
        {verticalReels.map((reel) => {
          const isPlaying = !!playingStates[reel.id];
          const isMuted = mutedStates[reel.id] !== false; // default true
          const ytId = extractYouTubeVideoId(reel.videoSrc);

          return (
            <div
              key={reel.id}
              className="col-span-12 sm:col-span-6 lg:col-span-4 group rounded-xl bg-white border border-line shadow-xs overflow-hidden flex flex-col transition-colors duration-200 hover:border-brand-red/40"
            >
              {/* Smartphone Aspect 9:16 Video Container */}
              <div className="relative w-full aspect-[9/16] bg-black overflow-hidden">
                {isPlaying && ytId ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1`}
                    title={reel.title}
                    className="w-full h-full border-0 aspect-[9/16]"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="no-referrer"
                    allowFullScreen
                  />
                ) : !ytId ? (
                  <div className="relative w-full h-full">
                    <video
                      ref={(el) => {
                        videoRefs.current[reel.id] = el;
                      }}
                      src={reel.videoSrc}
                      poster={reel.posterSrc}
                      autoPlay
                      muted={isMuted}
                      loop
                      playsInline
                      preload="auto"
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                      aria-label={`${reel.title} for ${clientName}`}
                      onPlay={() =>
                        setPlayingStates((prev) => ({ ...prev, [reel.id]: true }))
                      }
                      onPause={() =>
                        setPlayingStates((prev) => ({ ...prev, [reel.id]: false }))
                      }
                    />

                    {/* Top Badges & Audio Controls for local video */}
                    <div className="absolute top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 flex items-center justify-between z-10 pointer-events-none gap-2">
                      <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider shadow-md shrink-0">
                        <Smartphone className="w-3 h-3 text-red-300" />
                        <span>9:16 REEL</span>
                      </span>

                      <button
                        type="button"
                        onClick={(e) => toggleMute(reel.id, e)}
                        className="px-2.5 py-1 rounded-full bg-black/75 hover:bg-black/90 border border-white/20 text-white backdrop-blur-md text-[10px] font-mono font-bold tracking-wider shadow-md flex items-center gap-1.5 pointer-events-auto cursor-pointer transition-colors shrink-0"
                        title={isMuted ? "Unmute Sound" : "Mute Sound"}
                      >
                        {isMuted ? <VolumeX className="w-3 h-3 text-muted" /> : <Volume2 className="w-3 h-3 text-brand-red" />}
                        <span>{isMuted ? "Muted" : "Sound On"}</span>
                      </button>
                    </div>

                    {/* Bottom Prompt Bar for local video */}
                    <div className="absolute bottom-3 inset-x-3 sm:bottom-4 sm:inset-x-4 flex items-center justify-between z-10 pointer-events-none">
                      <button
                        type="button"
                        onClick={(e) => togglePlay(reel.id, e)}
                        className="px-3 py-1.5 rounded-xl bg-black/70 hover:bg-black/90 text-white border border-white/20 backdrop-blur-md text-xs font-mono font-bold transition-all pointer-events-auto cursor-pointer flex items-center gap-1.5"
                      >
                        {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                        <span>{isPlaying ? "Pause" : "Play"}</span>
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setTheaterVideo(reel);
                        }}
                        className="p-2 rounded-xl bg-black/70 hover:bg-black/90 text-white border border-white/20 backdrop-blur-md text-xs transition-all pointer-events-auto cursor-pointer"
                        title="Fullscreen Theater Mode"
                      >
                        <Maximize2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    className="relative w-full h-full cursor-pointer group/thumb"
                    onClick={() => togglePlay(reel.id)}
                  >
                    <Image
                      src={
                        reel.posterSrc ||
                        `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`
                      }
                      alt={reel.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading="lazy"
                      className="w-full h-full object-cover group-hover/thumb:scale-[1.03] transition-transform duration-700"
                    />

                    {/* Dark Vignette Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/35 pointer-events-none" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 flex items-center justify-between z-10 pointer-events-none gap-2">
                      <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider shadow-md shrink-0">
                        <Smartphone className="w-3 h-3 text-red-300" />
                        <span>9:16 REEL</span>
                      </span>

                      <span className="px-2.5 py-1 rounded-full bg-brand-red text-white text-[10px] font-mono font-bold tracking-wider shadow-md shrink-0 truncate max-w-[55%]">
                        {reel.label.split("(")[0].trim()}
                      </span>
                    </div>

                    {/* Tactile Center Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-brand-red hover:bg-brand-redDark text-white flex items-center justify-center shadow-2xl backdrop-blur-md transform transition-all group-hover/thumb:scale-110">
                        <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-current ml-1" />
                      </div>
                    </div>

                    {/* Bottom Prompt Bar */}
                    <div className="absolute bottom-3 inset-x-3 sm:bottom-4 sm:inset-x-4 flex items-center justify-between z-10 pointer-events-none">
                      <span className="text-xs font-mono font-bold text-white/90 drop-shadow">
                        Tap to Play Reel
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setTheaterVideo(reel);
                        }}
                        className="p-2 rounded-xl bg-black/70 hover:bg-black/90 text-white border border-white/20 backdrop-blur-md text-xs transition-all pointer-events-auto cursor-pointer"
                        title="Fullscreen Theater Mode"
                      >
                        <Maximize2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Card Narrative */}
              <div className="p-5 bg-white text-ink border-t border-line/60 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-ink tracking-tight leading-snug group-hover:text-brand-red transition-colors">
                    {reel.title}
                  </h3>
                  {reel.description && (
                    <p className="text-xs text-body font-normal leading-relaxed line-clamp-2">
                      {reel.description}
                    </p>
                  )}
                </div>

                <div className="pt-3 border-t border-line/60 flex items-center justify-between text-[11px] font-mono">
                  <button
                    onClick={() => togglePlay(reel.id)}
                    className="text-brand-red hover:text-brand-redDark font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{isPlaying ? "Replay Video" : "Play Video"}</span>
                  </button>
                  <button
                    onClick={() => setTheaterVideo(reel)}
                    className="text-muted hover:text-ink font-medium flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Maximize2 className="w-3 h-3" />
                    <span>Fullscreen</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Fullscreen Theater Modal View */}
      {theaterVideo && isMounted && createPortal(
        <div
          className="fixed inset-0 z-[9999] top-0 left-0 w-full h-full bg-ink/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
          onClick={() => setTheaterVideo(null)}
          role="dialog"
          aria-modal="true"
        >
          {/* Modal Card Container */}
          <div
            className={`relative w-full rounded-3xl overflow-hidden shadow-2xl bg-white border border-line flex ${
              theaterVideo.aspectRatio === "9/16"
                ? "max-w-4xl flex-col md:flex-row max-h-[90vh]"
                : "max-w-5xl flex-col max-h-[90vh]"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setTheaterVideo(null)}
              className="absolute top-4 right-4 z-40 p-2 rounded-full bg-line/50 hover:bg-line text-body transition-colors cursor-pointer border border-line shadow-xs"
              aria-label="Close modal"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Video Viewport Column */}
            <div
              className={`relative bg-black flex items-center justify-center overflow-hidden ${
                theaterVideo.aspectRatio === "9/16"
                  ? "w-full md:w-1/2 aspect-[9/16] min-h-[360px] md:min-h-[580px] max-h-[85vh]"
                  : "w-full aspect-video"
              }`}
            >
              {extractYouTubeVideoId(theaterVideo.videoSrc) ? (
                <iframe
                  key={theaterVideo.id}
                  src={`https://www.youtube.com/embed/${extractYouTubeVideoId(theaterVideo.videoSrc)}?autoplay=1&mute=0&playsinline=1&rel=0&modestbranding=1`}
                  title={theaterVideo.title}
                  className="w-full h-full border-0 aspect-[9/16]"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="no-referrer"
                  allowFullScreen
                />
              ) : (
                <video
                  ref={theaterVideoRef}
                  key={theaterVideo.id}
                  src={theaterVideo.videoSrc}
                  poster={theaterVideo.posterSrc}
                  autoPlay
                  controls
                  playsInline
                  className="w-full h-full object-contain"
                />
              )}

              {/* Top Floating Badge on video */}
              <div className="absolute top-4 left-4 pointer-events-none z-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono font-bold uppercase tracking-wider shadow-md">
                  <Smartphone className="w-3 h-3 text-red-300" />
                  <span>{theaterVideo.aspectRatio === "9/16" ? "9:16 Social Reel" : "16:9 Cinema Film"}</span>
                </div>
              </div>
            </div>

            {/* Narrative & Navigation Column */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between overflow-y-auto bg-white text-ink border-t md:border-t-0 md:border-l border-line/60">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-redLight border border-brand-red/20 text-xs font-mono font-bold text-brand-red uppercase mb-4">
                  <span className="w-2 h-2 rounded-full bg-brand-red shrink-0" />
                  <span>{clientName}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-ink leading-tight">
                  {theaterVideo.title}
                </h3>

                {theaterVideo.description && (
                  <p className="mt-3 text-xs sm:text-sm text-body font-normal leading-relaxed">
                    {theaterVideo.description}
                  </p>
                )}

                {/* Reel Specifications Box */}
                <div className="mt-6 p-4 rounded-2xl bg-white/60 border border-line/90 space-y-2.5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-muted">Deliverable Format:</span>
                    <span className="font-bold text-ink">
                      {theaterVideo.aspectRatio === "9/16" ? "9:16 Vertical Cut" : "16:9 Cinema Master"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-muted">Production Type:</span>
                    <span className="font-bold text-brand-red">
                      {theaterVideo.label || "Verified Client Motion Cut"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-muted">Project:</span>
                    <span className="font-bold text-ink truncate max-w-[180px]">
                      {projectTitle}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Reel Navigation & Carousel */}
              <div className="mt-8 pt-4 border-t border-line/60 flex items-center justify-between">
                <div className="text-xs font-mono text-muted">
                  Reel {videos.findIndex((v) => v.id === theaterVideo.id) + 1} of {videos.length}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const idx = videos.findIndex((v) => v.id === theaterVideo.id);
                      const prevIdx = (idx - 1 + videos.length) % videos.length;
                      setTheaterVideo(videos[prevIdx]);
                    }}
                    className="p-2 px-3 rounded-xl bg-line/50 hover:bg-line text-body transition-colors cursor-pointer border border-line text-xs font-bold flex items-center gap-1"
                    title="Previous reel (←)"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">Prev</span>
                  </button>

                  <button
                    onClick={() => {
                      const idx = videos.findIndex((v) => v.id === theaterVideo.id);
                      const nextIdx = (idx + 1) % videos.length;
                      setTheaterVideo(videos[nextIdx]);
                    }}
                    className="p-2 px-3.5 rounded-xl bg-brand-red hover:bg-brand-redDark text-white transition-colors cursor-pointer text-xs font-bold flex items-center gap-1 shadow-xs"
                    title="Next reel (→)"
                  >
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
