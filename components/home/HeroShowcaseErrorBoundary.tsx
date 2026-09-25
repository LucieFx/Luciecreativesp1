"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import Image from "next/image";
import { RefreshCw, Sparkles, Layers } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage: string;
}

export class HeroShowcaseErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: "",
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      errorMessage: error.message || "WebGL/3D context initialization failed.",
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("[Hero Showcase ErrorBoundary Caught]", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, errorMessage: "" });
  };

  render() {
    if (this.state.hasError) {
      // Static 2D Fallback Layout (Guarantees zero blank or broken screens)
      return (
        <div
          role="region"
          aria-label="Static 2D hero showcase fallback"
          className="w-full max-w-[460px] sm:max-w-[480px] lg:max-w-[500px] flex flex-col items-center select-none"
        >
          {/* Static Bounding Container Matching the Active Stage Dimensions */}
          <div className="relative w-full h-[400px] sm:h-[440px] md:h-[460px] flex items-center justify-center">
            <div className="relative w-[320px] sm:w-[330px] aspect-square rounded-2xl overflow-hidden bg-[#EBE7E2] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] ring-1 ring-black/5">
              {/* Static 2D Image */}
              <Image
                src="https://res.cloudinary.com/oct7txvw/image/upload/v1789835315/lucie-creatives/portfolio/graphic-design/onirique/hero-perfume-trio.webp"
                alt="Onirique Parfums 3D CGI and luxury fragrance branding"
                fill
                priority
                unoptimized
                sizes="(max-width: 640px) 280px, 340px"
                className="object-cover"
              />

              {/* Inner Border */}
              <div className="absolute inset-0 rounded-2xl border border-black/10 pointer-events-none" />

              {/* Signature "OURS" Badge */}
              <div className="absolute top-3.5 left-3.5 z-30 pointer-events-none">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md text-white border border-white/20 text-[10px] font-mono font-bold tracking-wider uppercase shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
                  <span>Ours</span>
                </span>
              </div>

              {/* 2D Fallback Notice Badge */}
              <div className="absolute bottom-3 right-3 z-30 pointer-events-none">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-sm text-white/80 text-[9px] font-mono font-medium">
                  <Layers className="w-2.5 h-2.5" />
                  <span>2D Mode</span>
                </span>
              </div>
            </div>
          </div>

          {/* Fallback Metadata & Recovery Action */}
          <div className="mt-4 w-full flex flex-col items-center">
            {/* Discipline Tag & Retry */}
            <div className="inline-flex items-center gap-2">
              <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-white text-[#7A1F2B] shadow-xs border border-line">
                Design Flagship
              </span>

              <button
                type="button"
                onClick={this.handleReset}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-ink text-xs font-mono font-medium transition-colors cursor-pointer border border-line"
                title="Retry interactive showcase"
              >
                <RefreshCw className="w-3 h-3 text-[#7A1F2B]" />
                <span>Retry</span>
              </button>
            </div>

            {/* Project Caption */}
            <div className="mt-2.5 flex items-center gap-2 text-center text-xs px-2">
              <span className="font-bold text-text-primary tracking-tight">
                Onirique Parfums
              </span>
              <span className="text-text-tertiary">/</span>
              <span className="font-mono text-text-tertiary">
                3D CGI &amp; Identity
              </span>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default HeroShowcaseErrorBoundary;
