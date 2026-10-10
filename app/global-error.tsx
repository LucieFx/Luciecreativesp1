"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { RefreshCw, Home, AlertCircle } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global critical exception:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-white text-ink font-sans antialiased min-h-screen flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
        {null}

        <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center">
          <div className="w-16 h-16 rounded-control bg-white shadow-md border border-line flex items-center justify-center p-2.5 mb-6">
            <Image
              src="https://res.cloudinary.com/oct7txvw/image/upload/v1789835253/lucie-creatives/logo/lucie-mark.png"
              alt="Lucie Creatives Logo"
              width={44}
              height={44}
              className="w-full h-full object-contain"
            />
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-control bg-red-50 text-[#8b1a1a] text-xs font-mono font-bold uppercase tracking-wider border border-red-200/80 mb-5 shadow-xs">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Critical Exception</span>
          </div>

          <h1 className="font-sans font-black text-3xl sm:text-5xl text-ink tracking-tight mb-3">
            Something went <span className="text-[#8b1a1a] italic">wrong.</span>
          </h1>

          <p className="text-body text-sm sm:text-base font-medium max-w-md mb-8 leading-relaxed">
            A system-level error occurred while loading the application. You can attempt to retry or return home.
          </p>

          <div className="flex items-center justify-center gap-3.5 flex-wrap w-full sm:w-auto">
            <button
              type="button"
              onClick={() => reset()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#8b1a1a] hover:bg-[#8b1a1a]/90 text-white rounded-control font-bold text-sm tracking-wide shadow-md transition-all cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Try Again</span>
            </button>
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-ink border-2 border-line hover:border-[#8b1a1a]/40 hover:text-[#8b1a1a] rounded-control font-bold text-sm transition-all shadow-xs"
            >
              <Home className="w-4 h-4" />
              <span>Go to Home</span>
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
