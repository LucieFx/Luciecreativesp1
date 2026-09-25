"use client";

import React, { useState } from "react";

interface MarqueeProps {
  children: React.ReactNode;
  speed?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  className?: string;
  gapClassName?: string;
}

export function Marquee({
  children,
  speed = 30,
  direction = "left",
  pauseOnHover = true,
  className = "",
  gapClassName = "gap-8",
}: MarqueeProps) {
  const [isHovered, setIsHovered] = useState(false);
  const animationDirection = direction === "right" ? "reverse" : "normal";

  // Match padding-right to gap so track-to-track wrapping has zero gap discontinuity
  const prClass = gapClassName.includes("gap-2")
    ? "pr-2"
    : gapClassName.includes("gap-3")
    ? "pr-3"
    : gapClassName.includes("gap-4")
    ? "pr-4"
    : gapClassName.includes("gap-5")
    ? "pr-5"
    : gapClassName.includes("gap-6")
    ? "pr-6"
    : gapClassName.includes("gap-10")
    ? "pr-10"
    : gapClassName.includes("gap-12")
    ? "pr-12"
    : "pr-8";

  return (
    <div
      className={`relative overflow-hidden flex w-full select-none ${className}`}
      onMouseEnter={() => pauseOnHover && setIsHovered(true)}
      onMouseLeave={() => pauseOnHover && setIsHovered(false)}
    >
      <div className="flex w-max shrink-0">
        <div
          style={{
            animation: `motion-marquee-dual ${speed}s linear infinite ${animationDirection}`,
            animationPlayState: isHovered ? "paused" : "running",
          }}
          className={`flex shrink-0 items-center ${gapClassName} ${prClass} will-change-transform`}
        >
          {children}
        </div>
        <div
          aria-hidden="true"
          style={{
            animation: `motion-marquee-dual ${speed}s linear infinite ${animationDirection}`,
            animationPlayState: isHovered ? "paused" : "running",
          }}
          className={`flex shrink-0 items-center ${gapClassName} ${prClass} will-change-transform`}
        >
          {children}
        </div>
      </div>

      <style jsx>{`
        @keyframes motion-marquee-dual {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-100%, 0, 0);
          }
        }
      `}</style>
    </div>
  );
}

export default Marquee;
