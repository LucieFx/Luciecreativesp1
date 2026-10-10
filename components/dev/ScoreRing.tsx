"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useInView,
  useReducedMotion,
} from "framer-motion";

export interface ScoreRingProps {
  value: number;
  label: string;
  size: "sm" | "lg";
  delay?: number;
  trigger?: boolean;
}

export function ScoreRing({
  value,
  label,
  size = "sm",
  delay = 0,
  trigger,
}: ScoreRingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-20px" });
  const shouldReduceMotion = useReducedMotion();

  const isLg = size === "lg";
  const dim = isLg ? 84 : 44;
  const strokeWidth = isLg ? 6 : 4;
  const radius = (dim - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Lighthouse standard color mapping:
  // 90-100 green, 50-89 orange, 0-49 red
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

  const motionProgress = useMotionValue(shouldReduceMotion ? value : 0);
  const [displayNumber, setDisplayNumber] = useState(
    shouldReduceMotion ? value : 0
  );

  const strokeDashoffset = useTransform(motionProgress, (val) => {
    const clamped = Math.max(0, Math.min(100, val));
    return circumference * (1 - clamped / 100);
  });

  useEffect(() => {
    if (shouldReduceMotion) {
      motionProgress.set(value);
      setDisplayNumber(value);
      return;
    }

    const shouldAnimate = trigger !== undefined ? trigger : isInView;

    if (shouldAnimate) {
      motionProgress.set(0);
      setDisplayNumber(0);

      const controls = animate(motionProgress, value, {
        duration: 1.2,
        delay: delay ?? 0,
        ease: "easeOut",
        onUpdate: (latest) => {
          setDisplayNumber(Math.round(latest));
        },
      });

      return () => controls.stop();
    }
  }, [isInView, trigger, value, delay, shouldReduceMotion, motionProgress]);

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center text-center select-none"
      aria-label={`${label}: ${value} out of 100`}
      role="meter"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        style={{ width: dim, height: dim }}
        className={`relative rounded-full flex items-center justify-center ${bgTint} transition-transform duration-200`}
      >
        <svg
          width={dim}
          height={dim}
          viewBox={`0 0 ${dim} ${dim}`}
          className="-rotate-90"
          aria-hidden="true"
        >
          {/* Background track circle with soft tint */}
          <circle
            cx={dim / 2}
            cy={dim / 2}
            r={radius}
            fill="transparent"
            stroke={trackColor}
            strokeWidth={strokeWidth}
          />
          {/* Animated progress circle */}
          <motion.circle
            cx={dim / 2}
            cy={dim / 2}
            r={radius}
            fill="transparent"
            stroke={ringColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            style={{ strokeDashoffset }}
            strokeLinecap="round"
          />
        </svg>

        {/* Center score number */}
        <span
          className={`absolute inset-0 flex items-center justify-center font-body font-semibold tabular-nums leading-none select-none ${textColor} ${
            isLg ? "text-2xl sm:text-3xl" : "text-xs sm:text-[13px]"
          }`}
        >
          {displayNumber}
        </span>
      </div>

      {/* Label under the ring */}
      <span
        className={`font-medium text-slate-500 leading-tight text-center mt-1.5 block ${
          isLg ? "text-xs sm:text-sm text-slate-600" : "text-[11px]"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

export default ScoreRing;
