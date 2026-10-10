"use client";

import React, { useState, useId } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { extractYouTubeVideoId, getYouTubeThumbnailUrl } from "@/lib/youtube";

interface YouTubeEmbedPlayerProps {
  videoId?: string;
  youtubeUrl?: string;
  title?: string;
  posterThumbnail?: string;
  aspectRatio?: "16/9" | "9/16" | "4/3";
  autoPlayOnScroll?: boolean; // Maintained for prop compatibility, but facade loads iframe on click only
  priority?: boolean;
  className?: string;
  onPlay?: () => void;
  onPause?: () => void;
}

export function YouTubeEmbedPlayer({
  videoId: initialVideoId,
  youtubeUrl,
  title = "Lucie Creatives Commercial Showcase",
  posterThumbnail,
  aspectRatio = "16/9",
  className = "",
  priority = false,
  onPlay,
}: YouTubeEmbedPlayerProps) {
  const reactId = useId();
  const playerId = `yt-player-${reactId.replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const [isPlaying, setIsPlaying] = useState(false);

  const videoId = initialVideoId || extractYouTubeVideoId(youtubeUrl);
  const resolvedPoster =
    posterThumbnail ||
    (videoId ? getYouTubeThumbnailUrl(videoId, "maxresdefault") : "/images/work/vedam/vedam-exterior.webp");

  const aspectClass =
    aspectRatio === "9/16"
      ? "aspect-[9/16]"
      : aspectRatio === "4/3"
      ? "aspect-[4/3]"
      : "aspect-[16/9]";

  const handlePlayClick = () => {
    setIsPlaying(true);
    if (onPlay) onPlay();
  };

  return (
    <div
      className={`relative w-full ${aspectClass} overflow-hidden rounded-media bg-slate-950 group select-none ${className}`}
    >
      {/* Background skeleton shimmer preventing layout shift */}
      <div className="absolute inset-0 bg-slate-900 pointer-events-none" aria-hidden="true" />

      {isPlaying && videoId ? (
        <iframe
          id={playerId}
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className="w-full h-full border-0 absolute inset-0 z-10"
        />
      ) : (
        /* Poster + Play button facade: Zero network overhead until clicked */
        <button
          type="button"
          onClick={handlePlayClick}
          aria-label={`Play video: ${title}`}
          className="absolute inset-0 w-full h-full cursor-pointer text-left block focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-red p-0 border-0 bg-transparent z-10"
        >
          <Image
            src={resolvedPoster}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={priority}
            loading={priority ? undefined : "lazy"}
            unoptimized={resolvedPoster.includes("ytimg.com") || resolvedPoster.includes("youtube.com")}
            className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-500 ease-out"
          />

          {/* Protective Cinematographic Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/20 pointer-events-none" />

          {/* Centered Play Button Facade */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-control bg-[#8B1A1A] text-white flex items-center justify-center shadow-md group-hover:scale-105 group-hover:bg-[#8b1a1a] transition-transform duration-200">
              <Play className="w-5 h-5 fill-white ml-0.5" />
            </div>
          </div>

          {/* Video Metadata Tag Badge */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white/90 pointer-events-none">
            <span className="font-bold tracking-tight line-clamp-1 max-w-[80%] text-shadow-sm">
              {title}
            </span>
            <span className="bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider">
              Play Video
            </span>
          </div>
        </button>
      )}
    </div>
  );
}
