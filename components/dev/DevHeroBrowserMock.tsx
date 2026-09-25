"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Lock, Sparkles, Terminal } from "lucide-react";
import { WEB_PROJECTS } from "@/lib/dev-work-data";
import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

interface CodeToken {
  text: string;
  color?: string; // CSS color string or class
}

interface CodeLine {
  tokens: CodeToken[];
}

const CODE_LINES: CodeLine[] = [
  {
    tokens: [
      { text: "import ", color: "#F43F5E" },
      { text: "{ motion } ", color: "#E2E8F0" },
      { text: "from ", color: "#F43F5E" },
      { text: "\"react\";", color: "#94A3B8" },
    ],
  },
  {
    tokens: [
      { text: "import ", color: "#F43F5E" },
      { text: "Image ", color: "#38BDF8" },
      { text: "from ", color: "#F43F5E" },
      { text: "\"next/image\";", color: "#94A3B8" },
    ],
  },
  { tokens: [] },
  {
    tokens: [
      { text: "export default ", color: "#F43F5E" },
      { text: "function ", color: "#38BDF8" },
      { text: "Platform() {", color: "#F8FAFC" },
    ],
  },
  {
    tokens: [
      { text: "  const ", color: "#F43F5E" },
      { text: "engine ", color: "#E2E8F0" },
      { text: "= ", color: "#94A3B8" },
      { text: "\"Next.js 15\";", color: "#E11D48" },
    ],
  },
  {
    tokens: [
      { text: "  const ", color: "#F43F5E" },
      { text: "speed ", color: "#E2E8F0" },
      { text: "= ", color: "#94A3B8" },
      { text: "\"sub-second\";", color: "#E11D48" },
    ],
  },
  {
    tokens: [
      { text: "  return (", color: "#F8FAFC" },
    ],
  },
  {
    tokens: [
      { text: "    <motion.main", color: "#38BDF8" },
    ],
  },
  {
    tokens: [
      { text: "      initial={{ ", color: "#E2E8F0" },
      { text: "opacity: ", color: "#94A3B8" },
      { text: "0 }}", color: "#E2E8F0" },
    ],
  },
  {
    tokens: [
      { text: "      animate={{ ", color: "#E2E8F0" },
      { text: "opacity: ", color: "#94A3B8" },
      { text: "1 }}", color: "#E2E8F0" },
    ],
  },
  {
    tokens: [
      { text: "      className=\"relative w-full\"", color: "#7A1F2B" },
    ],
  },
  {
    tokens: [
      { text: "    >", color: "#38BDF8" },
    ],
  },
  {
    tokens: [
      { text: "      <Header status=\"live\" />", color: "#94A3B8" },
    ],
  },
  {
    tokens: [
      { text: "      <PortfolioHero data={engine} />", color: "#7A1F2B" },
    ],
  },
  {
    tokens: [
      { text: "    </motion.main>", color: "#38BDF8" },
    ],
  },
  {
    tokens: [
      { text: "  );", color: "#F8FAFC" },
    ],
  },
  {
    tokens: [
      { text: "}", color: "#F8FAFC" },
    ],
  },
];

export function DevHeroBrowserMock() {
  const prefersReducedMotion = useReducedMotion();
  const [typedLinesCount, setTypedLinesCount] = useState<number>(
    prefersReducedMotion ? CODE_LINES.length : 0
  );
  const [isWiped, setIsWiped] = useState<boolean>(Boolean(prefersReducedMotion));
  const [isIdleFloating, setIsIdleFloating] = useState<boolean>(false);

  // Fallback screenshot if projects list is empty
  const projectImage =
    WEB_PROJECTS[0]?.previewImage ||
    "https://res.cloudinary.com/oct7txvw/image/upload/v1789835346/lucie-creatives/projects/1xl.jpg";
  const projectUrl = WEB_PROJECTS[0]?.url || "https://1xl.com";

  useEffect(() => {
    if (prefersReducedMotion) {
      setTypedLinesCount(CODE_LINES.length);
      setIsWiped(true);
      return;
    }

    // 1. Type lines over ~2.5s (2500ms / 17 lines ≈ 140ms per line)
    const lineIntervalMs = 2500 / CODE_LINES.length;
    let currentLine = 0;

    const typeTimer = setInterval(() => {
      currentLine += 1;
      setTypedLinesCount(currentLine);

      if (currentLine >= CODE_LINES.length) {
        clearInterval(typeTimer);

        // 2. Trigger render wipe immediately when code finishes
        setTimeout(() => {
          setIsWiped(true);

          // 3. After wipe finishes (0.85s transition), begin subtle idle float
          setTimeout(() => {
            setIsIdleFloating(true);
          }, 900);
        }, 120);
      }
    }, lineIntervalMs);

    return () => {
      clearInterval(typeTimer);
    };
  }, [prefersReducedMotion]);

  return (
    <div className="w-full max-w-5xl mx-auto mt-12 lg:mt-16 px-2 sm:px-0">
      <motion.div
        animate={
          isIdleFloating && !prefersReducedMotion
            ? { y: [-5, 5, -5] }
            : { y: 0 }
        }
        transition={{
          repeat: Infinity,
          duration: 6,
          ease: "easeInOut",
        }}
        className="w-full rounded-2xl sm:rounded-3xl bg-slate-900 border border-slate-700/60 shadow-2xl overflow-hidden text-slate-100 flex flex-col"
      >
        {/* macOS Browser Chrome Header */}
        <div className="bg-slate-950 border-b border-slate-800/90 px-4 sm:px-6 py-3 flex items-center justify-between gap-4 select-none">
          {/* Traffic lights */}
          <div className="flex items-center gap-2 shrink-0" aria-hidden="true">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
            <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
          </div>

          {/* Browser Address Pill */}
          <div className="flex-grow max-w-md mx-auto bg-slate-900/90 border border-slate-800 rounded-lg px-3 py-1 flex items-center justify-center gap-2 text-[11px] font-mono text-muted shadow-inner">
            <Lock className="w-3 h-3 text-brand-red shrink-0" />
            <span className="truncate text-slate-200 font-medium">
              {projectUrl.replace(/^https?:\/\//, "")}
            </span>
          </div>

          {/* Active Build Status Pill */}
          <div className="shrink-0 flex items-center gap-1.5 text-[11px] font-mono font-bold text-muted">
            <span
              className={`w-2 h-2 rounded-full ${
                isWiped ? "bg-brand-red animate-pulse" : "bg-amber-400 animate-ping"
              }`}
            />
            <span className="hidden sm:inline">
              {isWiped ? "Rendered • Production" : "Compiling..."}
            </span>
          </div>
        </div>

        {/* Split Screen Stage: Left Editor, Right Rendered Wipe */}
        <div className="relative w-full grid grid-cols-1 md:grid-cols-2 bg-[#0A0F1D] min-h-[380px] sm:min-h-[440px] md:min-h-[480px]">
          {/* Left Half: Monospace Code Editor */}
          <div className="relative p-5 sm:p-6 font-mono text-[11px] sm:text-xs leading-relaxed bg-[#0B1120] border-b md:border-b-0 md:border-r border-slate-800/80 overflow-hidden flex flex-col justify-between">
            {/* Editor File Bar */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/60 text-muted text-[10px] uppercase tracking-wider">
              <div className="flex items-center gap-1.5 text-muted/60">
                <Terminal className="w-3.5 h-3.5 text-brand-redLight" />
                <span>page.tsx</span>
              </div>
              <span className="text-muted">TypeScript • React 19</span>
            </div>

            {/* Code Lines Container */}
            <div className="flex-grow space-y-0.5 overflow-hidden">
              {CODE_LINES.slice(0, typedLinesCount).map((line, lineIdx) => (
                <div key={lineIdx} className="flex items-baseline gap-3">
                  <span className="w-5 text-right text-body select-none text-[10px]">
                    {lineIdx + 1}
                  </span>
                  <div className="flex-1 whitespace-pre truncate">
                    {line.tokens.length === 0 ? (
                      <span>&nbsp;</span>
                    ) : (
                      line.tokens.map((token, tokenIdx) => (
                        <span
                          key={tokenIdx}
                          style={{ color: token.color || "#CBD5E1" }}
                        >
                          {token.text}
                        </span>
                      ))
                    )}
                    {/* Blinking Cursor on the currently active typing line */}
                    {lineIdx === typedLinesCount - 1 && !isWiped && (
                      <span className="inline-block w-1.5 h-3.5 bg-brand-red ml-0.5 align-middle animate-pulse" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Editor Footer Status */}
            <div className="pt-3 mt-3 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-muted">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#E11D48]" />
                <span>Zero runtime bloat</span>
              </span>
              <span>UTF-8</span>
            </div>
          </div>

          {/* Right Half: Rendered Page Wiping In */}
          <div className="relative w-full h-full min-h-[260px] md:min-h-full bg-slate-950 overflow-hidden flex items-center justify-center">
            {/* Background placeholder while code is typing */}
            {!isWiped && !prefersReducedMotion && (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center space-y-3 z-0">
                <div className="w-8 h-8 rounded-full border-2 border-brand-red border-t-transparent animate-spin" />
                <p className="text-xs font-mono text-muted">
                  Compiling Next.js layout...
                </p>
              </div>
            )}

            {/* Wiping Screen Container */}
            <motion.div
              initial={
                prefersReducedMotion
                  ? { clipPath: "inset(0% 0% 0% 0%)" }
                  : { clipPath: "inset(0% 100% 0% 0%)" }
              }
              animate={
                isWiped || prefersReducedMotion
                  ? { clipPath: "inset(0% 0% 0% 0%)" }
                  : { clipPath: "inset(0% 100% 0% 0%)" }
              }
              transition={{
                duration: 0.85,
                ease: EASE_OUT,
              }}
              className="absolute inset-0 w-full h-full z-10 flex flex-col bg-white"
            >
              {/* Inner Preview Screenshot with gentle overflow visibility */}
              <div className="relative w-full h-full overflow-hidden bg-slate-100 flex items-start justify-center">
                <Image
                  src={projectImage}
                  alt="1XL Holdings web platform production render"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 600px"
                  className="object-cover object-top"
                />

                {/* Light wash edge during wipe */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />

                {/* Floating "Live Preview" Pill */}
                <div className="absolute top-4 right-4 z-20 pointer-events-none">
                  <span className="px-3 py-1 rounded-full bg-slate-900/85 backdrop-blur-md text-[10px] font-mono font-bold text-white border border-white/20 shadow-md flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />
                    <span>Live Render</span>
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
