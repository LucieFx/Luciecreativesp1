"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Lock, ArrowUpRight, Globe, Layers } from "lucide-react";
import { WEB_PROJECTS } from "@/lib/dev-work-data";

export function DevHeroBrowserMock() {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const activeProject = WEB_PROJECTS[activeProjectIndex] || WEB_PROJECTS[0];

  return (
    <div className="w-full max-w-5xl mx-auto mt-12 lg:mt-16 px-2 sm:px-0">
      {/* Project Switcher Bar */}
      <div className="flex items-center justify-between gap-3 mb-3 px-2">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 border border-line">
          {WEB_PROJECTS.map((project, idx) => (
            <button
              key={project.id}
              type="button"
              onClick={() => setActiveProjectIndex(idx)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-150 hover:scale-[1.02] active:scale-[0.98] ${
                activeProjectIndex === idx
                  ? "bg-white text-ink shadow-xs border border-line/80"
                  : "text-muted hover:text-ink"
              }`}
            >
              {project.name}
            </button>
          ))}
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs font-mono font-bold text-muted">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-red inline-block" />
          <span>Next.js 15 Production Builds</span>
        </div>
      </div>

      {/* Browser Hardware Mockup */}
      <div className="w-full rounded-xl bg-white border border-line shadow-xs overflow-hidden flex flex-col group">
        {/* Minimal Editorial Browser Chrome */}
        <div className="bg-slate-50 border-b border-line px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4 select-none">
          {/* Window action indicator (neutral monochrome dots) */}
          <div className="flex items-center gap-1.5 shrink-0" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
          </div>

          {/* Browser Address Bar */}
          <div className="flex-grow max-w-md mx-auto bg-white border border-line rounded-lg px-3 py-1 flex items-center justify-center gap-2 text-[11px] font-mono text-muted shadow-2xs">
            <Lock className="w-3 h-3 text-[#8B1A1A] shrink-0" />
            <span className="truncate text-ink font-medium">
              {activeProject.domain ? `https://${activeProject.domain}` : `private-deployment/${activeProject.id}`}
            </span>
          </div>

          {/* Internal Live Link Request */}
          <div className="shrink-0">
            <Link
              href={`/contact?message=${encodeURIComponent(`Hi, I'd like the live link for ${activeProject.name}.`)}`}
              className="group/req inline-flex items-center gap-1 text-[11px] font-mono font-bold text-[#8B1A1A] hover:underline active:scale-95 transition-transform duration-150"
              title="Request private live link"
            >
              <span className="hidden sm:inline">Request Live Link</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/req:translate-x-0.5 group-hover/req:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        {/* Browser Viewport with Real Project Screenshot */}
        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] bg-slate-100 overflow-hidden">
          <Image
            key={activeProject.id}
            src={activeProject.previewImage}
            alt={activeProject.altText}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          />

          {/* Bottom Project Overlay Bar */}
          <div className="absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-line px-4 sm:px-6 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 z-10">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-ink truncate">
                  {activeProject.name}
                </span>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-100 border border-line text-muted">
                  {activeProject.category}
                </span>
              </div>
              <p className="text-[11px] text-body truncate mt-0.5 max-w-xl">
                {activeProject.description}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0 text-xs font-mono text-muted">
              <span>TypeScript</span>
              <span>•</span>
              <span>Next.js 15</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DevHeroBrowserMock;
