"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  Heart,
  MessageCircle,
  Send,
  MoreHorizontal,
  Camera,
  Play,
  Pause,
  Music,
} from "lucide-react";
import { WorkProject } from "@/lib/work-data";
import { extractYouTubeVideoId } from "@/lib/youtube";
import { IPHONE_FRAME } from "./iphone-frame-constants";
import { motion, AnimatePresence } from "framer-motion";

interface IPhoneReelsCardProps {
  project: WorkProject;
  isCenter: boolean;
  isMuted: boolean;
  reducedMotion: boolean;
  onOpenTheater: () => void;
  videoRefCallback?: (el: HTMLVideoElement | null) => void;
  isInViewport?: boolean;
}

export function IPhoneReelsCard({
  project,
  isCenter,
  isMuted,
  reducedMotion,
  onOpenTheater,
  videoRefCallback,
  isInViewport = true,
}: IPhoneReelsCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [showHeartBurst, setShowHeartBurst] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isCaptionExpanded, setIsCaptionExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(!reducedMotion && isInViewport);
  const [likePop, setLikePop] = useState(false);

  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const lastTapRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);

  // Derive handle from client if missing
  const handle =
    project.handle ||
    `@${project.client.toLowerCase().replace(/[^a-z0-9]/g, "")}`;
  const caption = project.caption || project.title;
  const viewsText = project.views || undefined;

  // Double-tap for big heart burst & like
  const handleScreenClick = (e: React.MouseEvent) => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;

    if (now - lastTapRef.current < DOUBLE_TAP_DELAY) {
      // Double tap detected
      e.stopPropagation();
      setIsLiked(true);
      if (!reducedMotion) {
        setShowHeartBurst(true);
        setTimeout(() => setShowHeartBurst(false), 900);
      }
    } else {
      // Single tap -> toggle play/pause on active video
      if (isCenter && localVideoRef.current) {
        if (localVideoRef.current.paused) {
          localVideoRef.current.play().catch(() => {});
          setIsPlaying(true);
        } else {
          localVideoRef.current.pause();
          setIsPlaying(false);
        }
      }
    }
    lastTapRef.current = now;
  };

  // Track progress bar via requestAnimationFrame (no React state updates on every timeupdate)
  useEffect(() => {
    if (!isCenter) {
      if (progressBarRef.current) {
        progressBarRef.current.style.width = "30%";
      }
      return;
    }

    const updateProgress = () => {
      const vid = localVideoRef.current;
      if (vid && progressBarRef.current && vid.duration) {
        const pct = Math.min(100, Math.max(0, (vid.currentTime / vid.duration) * 100));
        progressBarRef.current.style.width = `${pct}%`;
      }
      rafRef.current = requestAnimationFrame(updateProgress);
    };

    rafRef.current = requestAnimationFrame(updateProgress);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isCenter]);

  // Sync playback with viewport and reduced-motion preference; restart progress and trigger like pop
  useEffect(() => {
    if (progressBarRef.current) {
      progressBarRef.current.style.width = "0%";
    }
    if (!reducedMotion) {
      setLikePop(true);
      const timer = setTimeout(() => setLikePop(false), 500);
      return () => clearTimeout(timer);
    }
  }, [project.slug, reducedMotion]);

  useEffect(() => {
    const vid = localVideoRef.current;
    if (!vid) return;
    if (isCenter && isInViewport && !reducedMotion) {
      vid.play().catch(() => {});
      setIsPlaying(true);
    } else {
      vid.pause();
      setIsPlaying(false);
    }
  }, [isCenter, isInViewport, reducedMotion, project.slug]);

  const setVideoRefs = useCallback(
    (el: HTMLVideoElement | null) => {
      localVideoRef.current = el;
      if (videoRefCallback) videoRefCallback(el);
    },
    [videoRefCallback]
  );

  const youtubeId = extractYouTubeVideoId(project.videoSrc);

  return (
    <div
      className="relative w-full select-none"
      style={{
        aspectRatio: IPHONE_FRAME.aspectRatio,
      }}
    >
      {/* ─────────────────────────────────────────────────────────────
          LAYER A: CLIPPED SCREEN (via iphone-screen-mask.png)
          mask-image cuts the rounded rectangle shape. No border-radius or clip-path.
         ───────────────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-auto"
        style={{
          maskImage: "url(/iphone-screen-mask.png)",
          WebkitMaskImage: "url(/iphone-screen-mask.png)",
          maskSize: "100% 100%",
          WebkitMaskSize: "100% 100%",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
        }}
      >
        {/* Inside Layer A: screen div positioned absolutely at measured insets */}
        <div
          className="absolute overflow-hidden text-white"
          style={{
            top: `${IPHONE_FRAME.screenInsets.topPercent}%`,
            bottom: `${IPHONE_FRAME.screenInsets.bottomPercent}%`,
            left: `${IPHONE_FRAME.screenInsets.leftPercent}%`,
            right: `${IPHONE_FRAME.screenInsets.rightPercent}%`,
            containerType: "inline-size",
            fontFamily:
              '-apple-system, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            // Define --pt for all child elements
            // @ts-expect-error custom CSS variable for container queries
            "--pt": "calc(100cqw / 393)",
          }}
          onClick={handleScreenClick}
        >
          {/* ── VIDEO / POSTER MEDIA LAYER ── */}
          <div
            className="absolute overflow-hidden bg-black"
            style={{
              top: "-2px",
              bottom: "-2px",
              left: "-2px",
              right: "-2px",
            }}
          >
          {isCenter && youtubeId ? (
            <iframe
              key={`yt-stage-${project.slug}`}
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=${
                isMuted ? 1 : 0
              }&loop=1&playlist=${youtubeId}&playsinline=1&controls=0&rel=0&modestbranding=1`}
              title={project.title}
              className="absolute inset-0 w-full h-full border-0 pointer-events-auto aspect-[9/16]"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="no-referrer"
              allowFullScreen
            />
          ) : project.videoSrc && !youtubeId ? (
            <video
              ref={setVideoRefs}
              src={project.videoSrc}
              poster={project.posterSrc}
              muted={isMuted}
              autoPlay={isCenter && isInViewport && !reducedMotion}
              loop
              playsInline
              preload={isCenter ? "auto" : "metadata"}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={(e) => {
                e.currentTarget.currentTime = 0;
                e.currentTarget.play().catch(() => {});
              }}
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: project.focalPoint || "center 30%",
              }}
            />
          ) : (
            <Image
              src={project.posterSrc}
              alt={`${project.title} - vertical reel showcase`}
              fill
              priority={isCenter}
              loading={isCenter ? "eager" : "lazy"}
              sizes="(max-width: 640px) 280px, 320px"
              className="object-cover"
              style={{
                objectPosition: project.focalPoint || "center 30%",
              }}
            />
          )}

          {/* Pause indicator on center video if paused */}
          {isCenter && !isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none z-15">
              <div
                className="rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white/90"
                style={{
                  width: "calc(54 * var(--pt))",
                  height: "calc(54 * var(--pt))",
                }}
              >
                <Play
                  className="ml-1 fill-white"
                  style={{ width: "calc(24 * var(--pt))", height: "calc(24 * var(--pt))" }}
                />
              </div>
            </div>
          )}

          {/* Side phone ambient occlusion overlay */}
          {!isCenter && (
            <div className="absolute inset-0 bg-black/40 z-20 pointer-events-none" />
          )}

          {/* Top subtle scrim */}
          <div
            className="absolute top-0 inset-x-0 bg-gradient-to-b from-black/65 via-black/20 to-transparent pointer-events-none z-10"
            style={{ height: "calc(110 * var(--pt))" }}
          />

          {/* Bottom subtle scrim */}
          <div
            className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent pointer-events-none z-10"
            style={{ height: "calc(240 * var(--pt))" }}
          />
        </div>

        {/* ── DOUBLE-TAP HEART BURST ANIMATION ── */}
        <AnimatePresence>
          {showHeartBurst && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.25, 1], opacity: [0, 1, 0.9] }}
              exit={{ scale: 1.4, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-40"
            >
              <Heart
                className="fill-white text-white drop-shadow-[0_10px_25px_rgba(0,0,0,0.5)]"
                style={{
                  width: "calc(88 * var(--pt))",
                  height: "calc(88 * var(--pt))",
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── A. iOS STATUS BAR (FLANKING THE DYNAMIC ISLAND) ── */}
        <div
          className="absolute top-0 inset-x-0 flex items-center justify-between pointer-events-none z-30"
          style={{
            paddingLeft: "calc(24 * var(--pt))",
            paddingRight: "calc(24 * var(--pt))",
            paddingTop: "calc(16 * var(--pt))",
          }}
          aria-hidden="true"
        >
          {/* Time on left */}
          <span
            className="font-semibold tracking-tight text-white select-none"
            style={{ fontSize: "calc(13.5 * var(--pt))" }}
          >
            9:41
          </span>

          {/* Spacer for Dynamic Island */}
          <div style={{ width: `${IPHONE_FRAME.dynamicIsland.widthPercentOfScreen}%` }} />

          {/* iOS Icons on right: Cellular, Wi-Fi, Battery */}
          <div
            className="flex items-center text-white"
            style={{ gap: "calc(6 * var(--pt))" }}
          >
            {/* Cellular signal bars */}
            <svg
              viewBox="0 0 18 12"
              fill="currentColor"
              style={{ width: "calc(16 * var(--pt))", height: "calc(11 * var(--pt))" }}
            >
              <rect x="0" y="9" width="2.5" height="3" rx="0.6" />
              <rect x="4" y="6" width="2.5" height="6" rx="0.6" />
              <rect x="8" y="3" width="2.5" height="9" rx="0.6" />
              <rect x="12" y="0" width="2.5" height="12" rx="0.6" />
            </svg>

            {/* Wi-Fi icon */}
            <svg
              viewBox="0 0 16 12"
              fill="currentColor"
              style={{ width: "calc(14 * var(--pt))", height: "calc(11 * var(--pt))" }}
            >
              <path d="M8 12a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm-4.24-4.24a6 6 0 0 1 8.48 0 .8.8 0 1 1-1.13 1.13 4.4 4.4 0 0 0-6.22 0 .8.8 0 0 1-1.13-1.13zm-2.83-2.83a10 10 0 0 1 14.14 0 .8.8 0 1 1-1.13 1.13 8.4 8.4 0 0 0-11.88 0 .8.8 0 0 1-1.13-1.13z" />
            </svg>

            {/* Battery pill */}
            <div
              className="flex items-center"
              style={{ gap: "calc(1 * var(--pt))" }}
            >
              <div
                className="border border-white/80 rounded-sm flex items-center"
                style={{
                  width: "calc(20 * var(--pt))",
                  height: "calc(10 * var(--pt))",
                  padding: "calc(1.5 * var(--pt))",
                }}
              >
                <div className="w-full h-full bg-white rounded-xs" />
              </div>
              <div
                className="bg-white/80 rounded-r-xs"
                style={{ width: "calc(1.5 * var(--pt))", height: "calc(4 * var(--pt))" }}
              />
            </div>
          </div>
        </div>

        {/* ── B. REELS HEADER (JUST BELOW STATUS BAR) ── */}
        <div
          className="absolute inset-x-0 flex items-center justify-between pointer-events-auto z-25 text-white"
          style={{
            top: "calc(48 * var(--pt))",
            paddingLeft: "calc(18 * var(--pt))",
            paddingRight: "calc(18 * var(--pt))",
          }}
        >
          <span
            className="font-semibold tracking-tight text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]"
            style={{ fontSize: "calc(19 * var(--pt))" }}
          >
            Reels
          </span>
          <button
            type="button"
            aria-label="Open Camera"
            className="text-white hover:opacity-80 transition-opacity drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]"
          >
            <Camera style={{ width: "calc(22 * var(--pt))", height: "calc(22 * var(--pt))" }} />
          </button>
        </div>

        {/* ── D. RIGHT ACTION RAIL ── */}
        <div
          className="absolute flex flex-col items-center pointer-events-auto z-25 text-white"
          style={{
            right: "calc(12 * var(--pt))",
            bottom: "calc(94 * var(--pt))",
            gap: "calc(16 * var(--pt))",
          }}
        >
          {/* 1. Like Button */}
          <div className="flex flex-col items-center">
            <motion.button
              type="button"
              whileTap={{ scale: 0.8 }}
              animate={likePop ? { scale: [1, 1.4, 1] } : { scale: 1 }}
              transition={
                likePop
                  ? { duration: 0.35, ease: "easeInOut" }
                  : { type: "spring", stiffness: 450, damping: 18 }
              }
              aria-label={isLiked ? "Unlike reel" : "Like reel"}
              aria-pressed={isLiked}
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                setIsLiked(!isLiked);
              }}
              className="transition-colors cursor-pointer"
            >
              <Heart
                style={{
                  width: "calc(26 * var(--pt))",
                  height: "calc(26 * var(--pt))",
                }}
                className={`drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] transition-colors ${
                  isLiked ? "fill-[#FF3040] text-[#FF3040]" : "text-white"
                }`}
              />
            </motion.button>
            {project.likes && (
              <span
                className="font-semibold tracking-tight text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]"
                style={{
                  fontSize: "calc(11 * var(--pt))",
                  marginTop: "calc(3 * var(--pt))",
                }}
              >
                {project.likes}
              </span>
            )}
          </div>

          {/* 2. Comment Button */}
          <div className="flex flex-col items-center">
            <button
              type="button"
              aria-label="View comments"
              onClick={(e) => e.stopPropagation()}
              className="text-white hover:opacity-80 transition-opacity cursor-pointer"
            >
              <MessageCircle
                style={{
                  width: "calc(26 * var(--pt))",
                  height: "calc(26 * var(--pt))",
                }}
                className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
              />
            </button>
            {project.comments && (
              <span
                className="font-semibold tracking-tight text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]"
                style={{
                  fontSize: "calc(11 * var(--pt))",
                  marginTop: "calc(3 * var(--pt))",
                }}
              >
                {project.comments}
              </span>
            )}
          </div>

          {/* 3. Share Button */}
          <button
            type="button"
            aria-label="Share reel"
            onClick={(e) => e.stopPropagation()}
            className="text-white hover:opacity-80 transition-opacity cursor-pointer"
          >
            <Send
              style={{
                width: "calc(24 * var(--pt))",
                height: "calc(24 * var(--pt))",
              }}
              className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
            />
          </button>

          {/* 4. Three-dot Menu */}
          <button
            type="button"
            aria-label="More options"
            onClick={(e) => e.stopPropagation()}
            className="text-white hover:opacity-80 transition-opacity cursor-pointer"
          >
            <MoreHorizontal
              style={{
                width: "calc(24 * var(--pt))",
                height: "calc(24 * var(--pt))",
              }}
              className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
            />
          </button>

          {/* 5. Audio Square Thumbnail */}
          <div
            className="relative overflow-hidden bg-black border-[1.5px] border-white cursor-pointer shadow-md"
            style={{
              width: "calc(26 * var(--pt))",
              height: "calc(26 * var(--pt))",
              borderRadius: "calc(6 * var(--pt))",
            }}
            onClick={(e) => e.stopPropagation()}
            aria-label="Audio track"
          >
            <Image
              src={project.posterSrc}
              alt=""
              fill
              sizes="32px"
              className="object-cover"
            />
          </div>
        </div>

        {/* ── E. BOTTOM-LEFT INFO BLOCK ── */}
        <div
          className="absolute flex flex-col pointer-events-auto z-25 text-white"
          style={{
            left: "calc(14 * var(--pt))",
            bottom: "calc(94 * var(--pt))",
            maxWidth: "calc(260 * var(--pt))",
          }}
        >
          {/* F. Views Badge (Translucent pill with play icon) */}
          {viewsText && (
            <div
              className="inline-flex items-center bg-black/45 backdrop-blur-md border border-white/15 rounded-full text-white/90 font-semibold"
              style={{
                gap: "calc(4 * var(--pt))",
                paddingLeft: "calc(7 * var(--pt))",
                paddingRight: "calc(9 * var(--pt))",
                paddingTop: "calc(2.5 * var(--pt))",
                paddingBottom: "calc(2.5 * var(--pt))",
                fontSize: "calc(10 * var(--pt))",
                marginBottom: "calc(7 * var(--pt))",
                width: "fit-content",
              }}
            >
              <Play
                className="fill-white"
                style={{ width: "calc(8 * var(--pt))", height: "calc(8 * var(--pt))" }}
              />
              <span>{viewsText} views</span>
            </div>
          )}

          {/* Account Header Row: Avatar, Handle, Verified Check, Follow Pill */}
          <div
            className="flex items-center"
            style={{ gap: "calc(8 * var(--pt))", marginBottom: "calc(6 * var(--pt))" }}
          >
            {/* 32pt Avatar */}
            <div
              className="relative overflow-hidden rounded-full border border-white/20 bg-slate-800 shrink-0 flex items-center justify-center"
              style={{
                width: "calc(32 * var(--pt))",
                height: "calc(32 * var(--pt))",
              }}
            >
              {project.avatar ? (
                <Image
                  src={project.avatar}
                  alt={project.client}
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              ) : (
                <span
                  className="font-black text-white"
                  style={{ fontSize: "calc(14 * var(--pt))" }}
                >
                  {project.client.charAt(0)}
                </span>
              )}
            </div>

            {/* Handle */}
            <span
              className="font-bold tracking-tight text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] truncate"
              style={{ fontSize: "calc(13.5 * var(--pt))" }}
            >
              {handle}
            </span>

            {/* Blue Verified Badge (if verified) */}
            {project.verified && (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="shrink-0"
                style={{ width: "calc(13 * var(--pt))", height: "calc(13 * var(--pt))" }}
              >
                <circle cx="12" cy="12" r="10" fill="#3897F0" />
                <path
                  d="M9 12l2 2 4-4"
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}

            {/* Follow Pill Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsFollowing(!isFollowing);
              }}
              aria-pressed={isFollowing}
              className={`font-semibold transition-all cursor-pointer ${
                isFollowing
                  ? "bg-white/20 text-white/90 border-transparent"
                  : "bg-transparent text-white border border-white/80 hover:bg-white/10"
              }`}
              style={{
                fontSize: "calc(11.5 * var(--pt))",
                paddingLeft: "calc(8 * var(--pt))",
                paddingRight: "calc(8 * var(--pt))",
                paddingTop: "calc(2.5 * var(--pt))",
                paddingBottom: "calc(2.5 * var(--pt))",
                borderRadius: "calc(8 * var(--pt))",
              }}
            >
              {isFollowing ? "Following" : "Follow"}
            </button>
          </div>

          {/* Caption (Clamped to 2 lines, expands with "... more") */}
          <div
            className="text-white/95 leading-[1.3] drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]"
            style={{ fontSize: "calc(13 * var(--pt))" }}
          >
            <p className={isCaptionExpanded ? "" : "line-clamp-2"}>
              <span>{caption}</span>
              {project.hashtags && project.hashtags.length > 0 && (
                <span className="text-white/80 ml-1">
                  {project.hashtags.map((h) => (h.startsWith("#") ? h : `#${h}`)).join(" ")}
                </span>
              )}
            </p>
            {caption.length > 45 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsCaptionExpanded(!isCaptionExpanded);
                }}
                className="text-white/70 hover:text-white font-medium ml-1 cursor-pointer transition-colors"
                style={{ fontSize: "calc(12 * var(--pt))" }}
              >
                {isCaptionExpanded ? " less" : "... more"}
              </button>
            )}
          </div>

          {/* Audio Row (Translucent marquee pill) */}
          <div
            className="inline-flex items-center overflow-hidden bg-black/40 backdrop-blur-md rounded-full text-white/90"
            style={{
              gap: "calc(5 * var(--pt))",
              paddingLeft: "calc(8 * var(--pt))",
              paddingRight: "calc(10 * var(--pt))",
              paddingTop: "calc(2.5 * var(--pt))",
              paddingBottom: "calc(2.5 * var(--pt))",
              fontSize: "calc(11 * var(--pt))",
              marginTop: "calc(7 * var(--pt))",
              maxWidth: "calc(220 * var(--pt))",
            }}
          >
            <Music
              className="shrink-0 text-white/80"
              style={{ width: "calc(11 * var(--pt))", height: "calc(11 * var(--pt))" }}
            />
            <div className="overflow-hidden whitespace-nowrap">
              <div
                className={
                  isCenter && !reducedMotion ? "inline-block animate-marquee" : "truncate"
                }
              >
                <span>{project.audio || `Original audio · ${handle}`}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── G. PROGRESS BAR (ON TOP OF BOTTOM NAV) ── */}
        <div
          className="absolute inset-x-0 z-30 bg-white/30"
          style={{
            bottom: "calc(84 * var(--pt))",
            height: "calc(2 * var(--pt))",
          }}
        >
          <div
            ref={progressBarRef}
            className="h-full bg-white transition-[width] duration-100 ease-linear"
            style={{ width: isCenter ? "0%" : "30%" }}
          />
        </div>

        {/* ── H. BOTTOM NAV ON SOLID BLACK ── */}
        <div
          className="absolute bottom-0 inset-x-0 bg-black flex flex-col justify-between z-30 pointer-events-none select-none"
          style={{ height: "calc(84 * var(--pt))" }}
          aria-hidden="true"
        >
          {/* Top 5 Icons */}
          <div
            className="flex items-center justify-around text-white/90"
            style={{
              paddingTop: "calc(10 * var(--pt))",
              paddingLeft: "calc(20 * var(--pt))",
              paddingRight: "calc(20 * var(--pt))",
            }}
          >
            {/* Home Icon */}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ width: "calc(22 * var(--pt))", height: "calc(22 * var(--pt))" }}
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>

            {/* Search Icon */}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ width: "calc(22 * var(--pt))", height: "calc(22 * var(--pt))" }}
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>

            {/* Reels Icon (Filled / Active) */}
            <div
              className="flex items-center justify-center border-2 border-white rounded-md p-0.5"
              style={{ width: "calc(22 * var(--pt))", height: "calc(22 * var(--pt))" }}
            >
              <Play
                className="fill-white text-white ml-0.5"
                style={{ width: "calc(12 * var(--pt))", height: "calc(12 * var(--pt))" }}
              />
            </div>

            {/* Direct / Send Icon */}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ width: "calc(22 * var(--pt))", height: "calc(22 * var(--pt))" }}
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>

            {/* Profile Avatar Circle */}
            <div
              className="rounded-full border border-white/60 bg-slate-700 flex items-center justify-center overflow-hidden"
              style={{ width: "calc(22 * var(--pt))", height: "calc(22 * var(--pt))" }}
            >
              <span className="text-[10px] font-bold text-white">
                {project.client.charAt(0)}
              </span>
            </div>
          </div>

          {/* White Home Indicator Bar */}
          <div
            className="flex items-center justify-center"
            style={{ paddingBottom: "calc(9 * var(--pt))" }}
          >
            <div
              className="bg-white rounded-full"
              style={{
                width: "calc(134 * var(--pt))",
                height: "calc(4.5 * var(--pt))",
              }}
            />
          </div>
        </div>
      </div>
    </div>

    {/* ─────────────────────────────────────────────────────────────
        LAYER B: HARDWARE FRAME PNG OVERLAY ON TOP
        Absolute inset 0, pointer-events: none, aria-hidden, via next/image
       ───────────────────────────────────────────────────────────── */}
    <div className="absolute inset-0 z-35 pointer-events-none" aria-hidden="true">
      <Image
        src="/iphone-frame.png"
        alt=""
        fill
        priority={isCenter}
        unoptimized
        sizes="(max-width: 640px) 280px, 380px"
        className="object-contain pointer-events-none select-none"
      />
    </div>
  </div>
  );
}
