"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

export function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isReduced) {
      const timer = setTimeout(() => setLoading(false), 300);
      return () => clearTimeout(timer);
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setFade(true);
          setTimeout(() => setLoading(false), 400);
          return 100;
        }
        return prev + Math.floor(Math.random() * 25) + 15;
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white transition-opacity duration-400 ${
        fade ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="relative flex flex-col items-center gap-4">
        {/* Lucie Creatives Centered Logo Badge */}
        <div className="w-24 h-24 bg-white rounded-3xl shadow-floating border border-line/60 flex items-center justify-center p-4 animate-pulse">
          <Image
            src="https://res.cloudinary.com/oct7txvw/image/upload/v1789835253/lucie-creatives/logo/lucie-mark.png"
            alt="Lucie Creatives Logo"
            width={72}
            height={72}
            className="w-full h-full object-contain"
            priority
          />
        </div>

        {/* Brand Typography */}
        <div className="font-black text-xs tracking-widest text-text-primary uppercase mt-1">
          LUCIE CREATIVES
        </div>

        {/* Progress Bar */}
        <div className="w-48 h-1 bg-surface-muted rounded-full relative overflow-hidden mt-1">
          <div
            className="h-full bg-gradient-to-r from-brand-red via-[#A31F1F] to-brand-red rounded-full transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="font-mono font-bold text-xs text-text-tertiary">
          {progress.toString().padStart(3, "0")}%
        </div>
      </div>
    </div>
  );
}
