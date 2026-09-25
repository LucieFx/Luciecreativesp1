"use client";

import React from "react";



interface HandwrittenAnnotationProps {
  text: string;
  subtext?: string;
  arrowDirection?: "left-down" | "right-down" | "curved-up" | "straight-right";
  className?: string;
  color?: string;
}

/**
 * Playful handwritten note with sketched arrow
 */
export function HandwrittenAnnotation({
  text,
  arrowDirection = "right-down",
  className = "",
  color = "#8B1A1A",
}: HandwrittenAnnotationProps) {
  return (
    <div className={`inline-flex items-center gap-1.5 font-handwriting text-sm sm:text-base select-none pointer-events-none whitespace-nowrap ${className}`} style={{ color }}>
      {arrowDirection === "left-down" && (
        <svg className="w-5 h-5 transform -scale-x-100 rotate-12 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4c6 1 12 6 14 14" />
          <path d="M12 18h6v-6" />
        </svg>
      )}
      <span>{text}</span>
      {arrowDirection === "right-down" && (
        <svg className="w-5 h-5 -rotate-12 transform flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4c6 1 12 6 14 14" />
          <path d="M12 18h6v-6" />
        </svg>
      )}
    </div>
  );
}
