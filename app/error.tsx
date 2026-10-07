"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { RefreshCw, Home, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Log the error to browser console for developer inspection
    console.error("Application runtime error:", error);
  }, [error]);

  return (
    <main className="min-h-screen bg-white text-text-primary flex flex-col items-center justify-center p-6 text-center relative overflow-hidden font-sans">
      {/* Background Dot Grid Pattern */}
      {null}

      {/* Atmospheric Depth Blur */}
      {null}

      <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center">
        {/* Chiclet Logo Mark */}
        <div className="w-16 h-16 rounded-2xl bg-white shadow-md border border-line flex items-center justify-center p-2.5 mb-6">
          <Image
            src="https://res.cloudinary.com/oct7txvw/image/upload/v1789835253/lucie-creatives/logo/lucie-mark.png"
            alt="Lucie Creatives Logo"
            width={44}
            height={44}
            className="w-full h-full object-contain"
            priority
          />
        </div>

        {/* Notice Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 text-[#8b1a1a] text-xs font-mono font-bold uppercase tracking-wider border border-red-200/80 mb-5 shadow-xs">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>Notice — Something Went Wrong</span>
        </div>

        {/* Heading */}
        <h1 className="font-sans font-black text-3xl sm:text-5xl text-ink tracking-tight mb-3">
          Something went <span className="text-[#8b1a1a] italic">wrong.</span>
        </h1>

        {/* Message */}
        <p className="text-body text-sm sm:text-base font-medium max-w-md mb-8 leading-relaxed">
          An unexpected error occurred while processing this page. You can try recovering this view or return safely to the home page.
        </p>

        {/* Action Buttons: "Try Again" (calls reset()) and "Go to Home" (link to /) */}
        <div className="flex items-center justify-center gap-3.5 flex-wrap w-full sm:w-auto">
          <button
            type="button"
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#8b1a1a] hover:bg-[#8b1a1a]/90 text-white rounded-xl font-bold text-sm tracking-wide shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-ink border-2 border-line hover:border-[#8b1a1a]/40 hover:text-[#8b1a1a] rounded-xl font-bold text-sm transition-all shadow-xs"
          >
            <Home className="w-4 h-4" />
            <span>Go to Home</span>
          </Link>
        </div>

        {/* Optional Collapsible Technical Details for Debugging */}
        {(error?.message || error?.digest) && (
          <div className="mt-8 w-full max-w-md text-left">
            <button
              type="button"
              onClick={() => setShowDetails(!showDetails)}
              className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-muted hover:text-ink transition-colors mx-auto block cursor-pointer"
            >
              <span>{showDetails ? "Hide technical details" : "Show technical details"}</span>
              {showDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {showDetails && (
              <div className="mt-3 p-4 rounded-xl bg-slate-50 border border-line text-xs font-mono text-body space-y-1.5 overflow-x-auto text-left">
                {error.digest && (
                  <p>
                    <span className="font-bold text-ink">Digest:</span> {error.digest}
                  </p>
                )}
                {error.message && (
                  <p>
                    <span className="font-bold text-ink">Error:</span> {error.message}
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
