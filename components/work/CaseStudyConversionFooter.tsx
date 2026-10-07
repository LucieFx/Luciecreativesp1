import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/site-config";

interface CaseStudyConversionFooterProps {
  projectTitle: string;
}

export function CaseStudyConversionFooter({ projectTitle }: CaseStudyConversionFooterProps) {
  const whatsAppMessage = `Hi Lucie Creatives, I saw your ${projectTitle} work and I'd like something similar.`;
  const whatsAppUrl = typeof buildWhatsAppLink === "function" ? buildWhatsAppLink(whatsAppMessage) : "";

  return (
    <div className="sticky bottom-0 z-20 bg-white/95 backdrop-blur-md border-t border-line px-5 sm:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-[0_-4px_16px_rgba(0,0,0,0.04)]">
      <div className="flex items-center gap-2">
        <span className="text-sm sm:text-base font-bold text-ink tracking-tight">
          Want something like this?
        </span>
      </div>

      <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end flex-wrap">
        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-brand-red text-white text-xs font-bold hover:bg-[#8b1a1a]/90 transition-all shadow-xs shrink-0"
        >
          <span>Start a project</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>

        {whatsAppUrl && (
          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-white border border-line text-ink text-xs font-bold hover:bg-brand-red-50 hover:border-brand-red/40 transition-all shadow-xs shrink-0"
          >
            <span>Message on WhatsApp</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-muted" />
          </a>
        )}
      </div>
    </div>
  );
}
