"use client";

import React from "react";

interface MarqueeProps {
  items: string[];
  separator?: string;
  speedSeconds?: number;
  reverse?: boolean;
  className?: string;
}

export function Marquee({
  items,
  separator = "•",
  speedSeconds = 25,
  reverse = false,
  className = "",
}: MarqueeProps) {
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div className={`overflow-hidden whitespace-nowrap select-none ${className}`}>
      <div
        className={`inline-flex items-center gap-8 ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
        style={{ animationDuration: `${speedSeconds}s` }}
      >
        {repeated.map((item, idx) => (
          <React.Fragment key={idx}>
            <span className="font-bold uppercase tracking-tight text-text-secondary/90 text-sm md:text-base">
              {item}
            </span>
            <span className="text-brand-purple font-black text-lg">{separator}</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
