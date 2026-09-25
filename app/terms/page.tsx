import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SITE_CONFIG } from "@/lib/constants";
import { ArrowLeft, FileText, Mail } from "lucide-react";

import type { Metadata } from "next";
import { constructMetadata, SITE_METADATA_MAP } from "@/lib/seo-metadata";

export const metadata: Metadata = constructMetadata(SITE_METADATA_MAP["/terms"]);

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white text-text-primary pt-36 pb-24 px-6 md:px-12 relative overflow-hidden font-sans font-normal">
        {/* Background Dots Overlay Pattern */}
        <div className="absolute inset-0 dot-grid-pattern opacity-70 pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Back Link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-border-light text-text-secondary hover:text-[#7A1F2B] hover:border-[#7A1F2B]/30 text-xs font-black uppercase tracking-wider mb-8 shadow-soft transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Homepage</span>
          </Link>

        {/* Header Badge & Title */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-purpleLight text-brand-purple text-xs font-black uppercase tracking-wider border border-brand-purple/20 mb-4 shadow-soft">
            <FileText className="w-4 h-4" />
            <span>AGENCY GOVERNANCE</span>
          </div>

          <h1 className="font-black text-4xl sm:text-5xl md:text-6xl text-text-primary tracking-tight">
            Terms of <span className="text-brand-gradient text-purple-glow">Service.</span>
          </h1>
          <p className="text-text-tertiary text-xs sm:text-sm font-bold uppercase tracking-wider mt-2">
            Effective Date: August 2026 · Lucie Creatives Digital Agency
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-brand-purple/20 shadow-floating space-y-8 text-text-secondary font-semibold text-sm sm:text-base leading-relaxed">
          <div className="p-4 rounded-2xl bg-brand-purpleLight/40 border border-brand-purple/15 text-text-primary text-sm font-bold">
            Welcome to Lucie Creatives. By accessing our websites, engaging our services, or submitting project briefs, you agree to comply with the terms and conditions outlined below.
          </div>

          <div>
            <h2 className="font-black text-xl text-text-primary tracking-tight mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-purple" />
              1. Intellectual Property &amp; Ownership
            </h2>
            <p>
              All final custom deliverables produced by Lucie Creatives (including source code, web platform deployments, brand identity kits, graphic assets, and video content) transfer to full client ownership upon receipt of 100% agreed project fees, governed by individual Master Services Agreements (MSAs).
            </p>
          </div>

          <div className="pt-6 border-t border-line/60">
            <h2 className="font-black text-xl text-text-primary tracking-tight mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-purple" />
              2. Scope, Milestones &amp; Deliverables
            </h2>
            <p>
              Project timelines, sprint milestones, and deliverables are formally defined in Statements of Work (SOWs). Lucie Creatives commits to high-velocity turnaround with transparent staging previews and feedback checkpoints.
            </p>
          </div>

          <div className="pt-6 border-t border-line/60">
            <h2 className="font-black text-xl text-text-primary tracking-tight mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-purple" />
              3. Confidentiality &amp; NDAs
            </h2>
            <p>
              We treat all partner proprietary information, pre-launch roadmaps, and business data under strict confidentiality and non-disclosure standards.
            </p>
          </div>

          <div className="pt-6 border-t border-line/60">
            <h2 className="font-black text-xl text-text-primary tracking-tight mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-purple" />
              4. Contact &amp; Legal Notices
            </h2>
            <p className="mb-4">
              For legal inquiries, contracts, or partnership terms, please contact:
            </p>
            <a
              href={`mailto:${SITE_CONFIG.officialEmail}`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-purpleLight text-brand-purple font-black text-sm border border-brand-purple/20 hover:bg-brand-purple hover:text-white transition-all shadow-soft"
            >
              <Mail className="w-4 h-4" />
              <span>{SITE_CONFIG.officialEmail}</span>
            </a>
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </>
  );
}
