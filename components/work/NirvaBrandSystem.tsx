"use client";

import React, { useState } from "react";
import {
  Palette,
  Type,
  Compass,
  FileDown,
  ExternalLink,
  Check,
  Copy,
} from "lucide-react";

export interface PaletteItem {
  name: string;
  hex: string;
  role: string;
}

export interface TypographyItem {
  role: string;
  family: string;
  usage: string;
}

export interface DownloadItem {
  title: string;
  filename: string;
  size: string;
  href: string;
}

interface NirvaBrandSystemProps {
  palette: PaletteItem[];
  typography: TypographyItem[];
  architecturalNotes: string[];
  downloads?: DownloadItem[];
  clientName: string;
}

export function NirvaBrandSystem({
  palette,
  typography,
  architecturalNotes,
  downloads,
  clientName,
}: NirvaBrandSystemProps) {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <section
      className="px-6 sm:px-12 max-w-7xl mx-auto mb-16 sm:mb-20"
      aria-label="Brand Identity System Specifications"
    >
      <div className="p-8 sm:p-12 rounded-3xl bg-white text-ink border border-line shadow-xl relative overflow-hidden space-y-12">
        {/* Ambient Top Glow */}
        {null}

        {/* Section Title */}
        <div className="max-w-3xl relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-redLight border border-brand-red/20 text-xs font-mono font-bold text-brand-red uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5" />
            <span>Design Tokens &amp; System Architecture</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-ink tracking-tight">
            The {clientName} Design System
          </h2>
          <p className="text-xs sm:text-sm text-body font-normal leading-relaxed text-pretty">
            Mathematical harmony between large-format highway print, ACES cinema
            color grading, and tactile luxury guest touchpoints.
          </p>
        </div>

        {/* 1. Color Palette Tokens */}
        <div className="space-y-4 relative z-10">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-brand-red">
            <Palette className="w-3.5 h-3.5" />
            <span>Verified Chromatic Palette</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {palette.map((color) => {
              const isCopied = copiedHex === color.hex;
              return (
                <div
                  key={color.hex}
                  onClick={() => copyToClipboard(color.hex)}
                  className="group cursor-pointer rounded-2xl bg-white/80 border border-line/90 p-4 hover:bg-line/60 hover:border-line transition-all flex flex-col justify-between shadow-2xs"
                >
                  <div>
                    <div
                      className="w-full h-16 rounded-xl border border-line shadow-xs mb-3 transition-transform group-hover:scale-[1.03]"
                      style={{ backgroundColor: color.hex }}
                    />
                    <div className="text-sm font-black text-ink">
                      {color.name}
                    </div>
                    <p className="text-[11px] text-muted mt-1 font-normal leading-relaxed line-clamp-2">
                      {color.role}
                    </p>
                  </div>
                  <div className="mt-3 pt-3 border-t border-line/80 flex items-center justify-between font-mono text-xs">
                    <span className="text-body font-bold">{color.hex}</span>
                    <span className="text-[10px] text-muted flex items-center gap-1 group-hover:text-brand-red">
                      {isCopied ? (
                        <>
                          <Check className="w-3 h-3 text-brand-red" />
                          <span className="text-brand-red">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Typographic Scale Matrices */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10 pt-4 border-t border-line/80">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-brand-red">
              <Type className="w-3.5 h-3.5" />
              <span>Typographic Hierarchy Matrix</span>
            </div>
            <div className="space-y-3">
              {typography.map((type, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white/80 border border-line/90 flex flex-col justify-between shadow-2xs"
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-mono text-brand-red font-bold">
                      {type.role}
                    </span>
                  </div>
                  <div className="text-base font-black text-ink tracking-tight">
                    {type.family}
                  </div>
                  <p className="text-xs text-body mt-1 font-normal">
                    {type.usage}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Architectural Notes & Prepress QA */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-brand-red">
              <Compass className="w-3.5 h-3.5" />
              <span>Architectural Prepress &amp; Viewing Distance QA</span>
            </div>
            <div className="p-6 rounded-2xl bg-white/80 border border-line/90 space-y-4 shadow-2xs">
              {architecturalNotes.map((note, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-brand-red text-white text-[10px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                    0{idx + 1}
                  </div>
                  <p className="text-xs sm:text-sm text-body font-normal leading-relaxed">
                    {note}
                  </p>
                </div>
              ))}
            </div>

            {/* Official PDF Document Downloads */}
            {downloads && downloads.length > 0 && (
              <div className="pt-2">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-muted mb-2.5">
                  Official Client Literature Artifacts
                </div>
                <div className="space-y-2">
                  {downloads.map((doc, idx) => (
                    <a
                      key={idx}
                      href={doc.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group p-3 rounded-xl bg-white/80 hover:bg-line/60 border border-line/90 flex items-center justify-between transition-colors shadow-2xs"
                    >
                      <div className="flex items-center gap-3">
                        <FileDown className="w-4 h-4 text-brand-red group-hover:scale-110 transition-transform" />
                        <div>
                          <div className="text-xs font-bold text-ink group-hover:text-brand-red transition-colors">
                            {doc.title}
                          </div>
                          <div className="text-[10px] font-mono text-muted">
                            PDF Archive • {doc.size}
                          </div>
                        </div>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-muted group-hover:text-brand-red transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
