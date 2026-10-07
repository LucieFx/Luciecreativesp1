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
        <div className="max-w-4xl mx-auto relative z-10">
          {/* Back Link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-border-light text-text-secondary hover:text-[#8b1a1a] hover:border-[#8b1a1a]/30 text-xs font-black uppercase tracking-wider mb-8 shadow-xs transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Homepage</span>
          </Link>

          {/* Header Badge & Title */}
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-redLight text-brand-red text-xs font-black uppercase tracking-wider border border-brand-red/20 mb-4">
              <FileText className="w-4 h-4" />
              <span>Agency Governance</span>
            </div>

            <h1 className="font-black text-4xl sm:text-5xl md:text-6xl text-text-primary tracking-tight">
              Terms of <span className="text-[#8B1A1A]">Service</span>.
            </h1>
            <p className="text-text-tertiary text-xs sm:text-sm font-bold uppercase tracking-wider mt-2">
              Effective Date: August 2026 · Lucie Creatives Digital Studio
            </p>
          </div>

          {/* Content Card */}
          <div className="bg-white p-8 sm:p-12 rounded-lg border border-line shadow-xs space-y-8 text-text-secondary font-medium text-sm sm:text-base leading-relaxed">
            <div className="p-4 rounded-lg bg-brand-redLight/40 border border-brand-red/15 text-text-primary text-sm font-semibold">
              Welcome to Lucie Creatives. By accessing our websites, contracting our agency services, or submitting project briefs, you agree to comply with the terms and conditions outlined below. These terms apply to all clients, partners, and visitors.
            </div>

            {/* 1. Scope of Services */}
            <div>
              <h2 className="font-black text-lg sm:text-xl text-text-primary tracking-tight mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#8B1A1A]" />
                1. Scope of Creative &amp; Engineering Services
              </h2>
              <p className="text-body leading-relaxed">
                Lucie Creatives provides bespoke digital agency services across four core competencies: (a) High-Retention Video Editing and Post-Production (short-form Reels/Shorts, YouTube long-form content, corporate films, DaVinci Resolve color grading, motion graphics, sound design); (b) Custom Web Engineering &amp; Application Development (Next.js, React, TypeScript, high-performance web architecture); (c) Graphic &amp; Visual Communication Design (social media design, digital marketing collateral, presentation systems); and (d) Brand Identity Systems (logo design, typography guidelines, brand rulebooks).
              </p>
              <p className="mt-2 text-body leading-relaxed">
                Specific project scopes, technical deliverables, delivery formats, and sprint milestones are formally established in written estimates, proposals, or Statements of Work (SOWs) mutually executed before sprint commencement.
              </p>
            </div>

            {/* 2. Estimates, Commercial Quotes & Milestone Payments */}
            <div className="pt-6 border-t border-line/60">
              <h2 className="font-black text-lg sm:text-xl text-text-primary tracking-tight mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#8B1A1A]" />
                2. Estimates, Commercial Quotes &amp; Milestone Payments
              </h2>
              <p className="text-body leading-relaxed">
                All pricing quoted by Lucie Creatives is custom-quote only, calculated based on technical scope, production complexity, timeline requirements, and deliverable volume.
              </p>
              <ul className="mt-2 space-y-1.5 list-disc list-inside text-body">
                <li>
                  <strong className="text-ink">Standard Sprints:</strong> A 50% upfront deposit is required prior to project scheduling and sprint kickoff. The remaining 50% balance is payable upon final deliverable review and prior to production release or final source handoff.
                </li>
                <li>
                  <strong className="text-ink">Phased Engineering Engagements:</strong> Web development projects may be structured across phased milestone payments (e.g., Wireframing/UI Architecture, Staging Deployment, Production Handover) as detailed in the relevant SOW.
                </li>
                <li>
                  <strong className="text-ink">Payment Terms:</strong> Invoices are payable within seven (7) calendar days of issuance in INR (for domestic Indian clients) or designated international currencies via verified bank transfer or authorized payment gateways.
                </li>
              </ul>
            </div>

            {/* 3. Revisions & Collaborative Review Cadence */}
            <div className="pt-6 border-t border-line/60">
              <h2 className="font-black text-lg sm:text-xl text-text-primary tracking-tight mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#8B1A1A]" />
                3. Revisions &amp; Review Cadence
              </h2>
              <p className="text-body leading-relaxed">
                Each deliverable sprint includes up to two (2) consolidated rounds of client revisions within the agreed brief. Revisions encompass adjustments to pacing, audio balance, color grading adjustments, typographic tweaks, layout refinements, and copy adjustments.
              </p>
              <p className="mt-2 text-body leading-relaxed">
                Requests introducing structural conceptual changes, net-new scenes, new feature development, or revisions outside the approved brief are treated as Scope Expansions and will be estimated under a separate addendum. Clients agree to provide consolidated feedback within five (5) business days of deliverable submission to maintain sprint velocity.
              </p>
            </div>

            {/* 4. Intellectual Property & Commercial Rights Transfer */}
            <div className="pt-6 border-t border-line/60">
              <h2 className="font-black text-lg sm:text-xl text-text-primary tracking-tight mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#8B1A1A]" />
                4. Intellectual Property &amp; Rights Transfer
              </h2>
              <p className="text-body leading-relaxed">
                Upon complete receipt of 100% of all agreed project fees, Lucie Creatives transfers exclusive, perpetual, worldwide commercial ownership and copyright of the final deliverables (including final exported videos, graphics, brand mark vector assets, and bespoke web code written specifically for the client) to the client.
              </p>
              <p className="mt-2 text-body leading-relaxed">
                <strong className="text-ink">Agency Portfolio Attribution:</strong> Unless a formal Non-Disclosure Agreement (NDA) explicitly prohibits public attribution, Lucie Creatives retains the non-exclusive, royalty-free right to display completed deliverables, video clips, case study documentation, and client logos in our agency portfolio, case study archives, and marketing channels for promotional and retrospective evaluation purposes.
              </p>
            </div>

            {/* 5. Deliverable Formats, Source Files & Archival Policy */}
            <div className="pt-6 border-t border-line/60">
              <h2 className="font-black text-lg sm:text-xl text-text-primary tracking-tight mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#8B1A1A]" />
                5. Deliverables, Source Files &amp; Archival Policy
              </h2>
              <ul className="space-y-1.5 list-disc list-inside text-body">
                <li>
                  <strong className="text-ink">Video Deliverables:</strong> Delivered in mastered ProRes, H.264, or H.265 files formatted for intended distribution platforms. Raw camera footage and native editing project files (e.g., DaVinci Resolve project archives or Premiere timelines) are not part of standard deliverables unless specified in the SOW.
                </li>
                <li>
                  <strong className="text-ink">Design Deliverables:</strong> Brand marks and graphics are delivered in vector (SVG, EPS, PDF) and optimized raster (PNG, WebP) formats. Source Figma design files are released upon final settlement.
                </li>
                <li>
                  <strong className="text-ink">Web Engineering:</strong> Codebases are transferred via GitHub repository ownership transfer or direct production deployment to client-managed cloud hosting (Vercel, AWS, etc.).
                </li>
                <li>
                  <strong className="text-ink">Archival Window:</strong> Lucie Creatives maintains client production assets in active storage for sixty (60) calendar days post-completion. Clients are responsible for downloading and archiving deliverables upon final handoff.
                </li>
              </ul>
            </div>

            {/* 6. Client Assets & Indemnification */}
            <div className="pt-6 border-t border-line/60">
              <h2 className="font-black text-lg sm:text-xl text-text-primary tracking-tight mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#8B1A1A]" />
                6. Client Supplied Assets &amp; Clearances
              </h2>
              <p className="text-body leading-relaxed">
                The client represents and warrants that all raw assets, video footage, photographs, audio tracks, brand marks, and copy provided to Lucie Creatives are either owned by the client or accompanied by appropriate commercial usage licenses. The client agrees to indemnify Lucie Creatives against any third-party claims, trademark infringements, or licensing violations resulting from materials provided by the client.
              </p>
            </div>

            {/* 7. Limitation of Liability */}
            <div className="pt-6 border-t border-line/60">
              <h2 className="font-black text-lg sm:text-xl text-text-primary tracking-tight mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#8B1A1A]" />
                7. Limitation of Liability
              </h2>
              <p className="text-body leading-relaxed">
                Lucie Creatives executes all engagements with professional care and industry standard diligence. To the maximum extent permitted by applicable law, the aggregate liability of Lucie Creatives arising out of or related to any project engagement shall not exceed the total fees actually received by Lucie Creatives under the applicable Statement of Work. Neither party shall be liable for indirect, incidental, consequential, or punitive damages.
              </p>
            </div>

            {/* 8. Governing Law & Dispute Resolution */}
            <div className="pt-6 border-t border-line/60">
              <h2 className="font-black text-lg sm:text-xl text-text-primary tracking-tight mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#8B1A1A]" />
                8. Governing Law &amp; Jurisdiction
              </h2>
              <p className="text-body leading-relaxed">
                These terms shall be governed by and construed in accordance with the substantive laws of India. Any dispute, controversy, or claim arising out of or relating to these terms or agency contracts shall be subject to the exclusive jurisdiction of the competent courts in Ahmedabad, Gujarat, India.
              </p>
            </div>

            {/* 9. Contact & Legal Notices */}
            <div className="pt-6 border-t border-line/60">
              <h2 className="font-black text-lg sm:text-xl text-text-primary tracking-tight mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#8B1A1A]" />
                9. Contact &amp; Legal Notices
              </h2>
              <p className="mb-4 text-body leading-relaxed">
                For contract inquiries, Master Service Agreements (MSAs), or legal notices, please contact our administrative desk:
              </p>
              <a
                href={`mailto:${SITE_CONFIG.officialEmail}`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-brand-redLight text-brand-red font-black text-sm border border-brand-red/20 hover:bg-[#8B1A1A] hover:text-white transition-colors shadow-xs"
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
