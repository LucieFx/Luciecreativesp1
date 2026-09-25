"use client";

import React, { useMemo } from "react";

interface SplitTextProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
  className?: string;
  accentWords?: string[];
  accentClassName?: string;
  delay?: number;
  markerHighlight?: boolean;
  markerClassName?: string;
}

export function SplitText({
  children,
  as: Component = "h2",
  className = "",
  accentWords = [],
  accentClassName = "font-serif italic text-[#7A1F2B]",
  markerHighlight = false,
  markerClassName,
}: SplitTextProps) {
  const { cleanText, words } = useMemo(() => {
    const raw = children || "";
    const clean = raw.replace(/\*([^*]+)\*/g, "$1");
    const tokens = raw.trim().split(/\s+/);
    let inAsterisk = false;

    const parsed = tokens.map((token) => {
      let isAccent = false;
      let word = token;

      if (token.startsWith("*") && token.endsWith("*") && token.length > 1) {
        word = token.slice(1, -1);
        isAccent = true;
      } else if (token.startsWith("*")) {
        inAsterisk = true;
        word = token.slice(1);
        isAccent = true;
      } else if (token.endsWith("*")) {
        inAsterisk = false;
        word = token.slice(0, -1);
        isAccent = true;
      } else if (inAsterisk) {
        isAccent = true;
      }

      const stripped = word.replace(/[.,/#!$%^&*;:{}=\-_`~()?"']/g, "");
      if (
        accentWords.some(
          (w) => w.toLowerCase() === stripped.toLowerCase()
        )
      ) {
        isAccent = true;
      }

      return { word, isAccent };
    });

    return { cleanText: clean, words: parsed };
  }, [children, accentWords]);

  return (
    <Component className={className} aria-label={cleanText}>
      {words.map(({ word, isAccent }, i) => (
        <React.Fragment key={i}>
          {isAccent ? (
            <span
              className={`${accentClassName} ${
                markerHighlight ? markerClassName || "marker-highlight" : ""
              }`}
            >
              {word}
            </span>
          ) : (
            <span>{word}</span>
          )}
          {i < words.length - 1 && " "}
        </React.Fragment>
      ))}
    </Component>
  );
}

export default SplitText;
