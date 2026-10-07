import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Contact } from "@/components/Contact";
import { FAQ } from "@/components/FAQ";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

import type { Metadata } from "next";
import { constructMetadata, SITE_METADATA_MAP } from "@/lib/seo-metadata";
import { getFaqSchema, getBreadcrumbSchema, getContactPageSchema } from "@/lib/schema-structured-data";
import { FAQ_DATA } from "@/lib/constants";

export const metadata: Metadata = constructMetadata(SITE_METADATA_MAP["/contact"]);

export default function ContactPage() {
  const contactPageSchema = getContactPageSchema();

  const faqSchema = getFaqSchema(
    FAQ_DATA.map((item) => ({ q: item.question, a: item.answer }))
  );

  const breadcrumbSchema = getBreadcrumbSchema([{ name: "Contact", item: "/contact" }]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <main className="min-h-screen bg-white text-text-primary selection:bg-[#8B1A1A] selection:text-white font-sans font-normal pt-28 sm:pt-32">
        <Navbar />

        {/* Top Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-4 pb-2">
          <Breadcrumbs items={[{ label: "Contact", href: "/contact" }]} />
        </div>

        {/* Primary Contact Form (single authoritative H1 & unified CTA) */}
        <Contact />

        {/* FAQ Section */}
        <FAQ />

        {/* Pre-Brief Exploration Strip */}
        <section className="py-14 px-4 sm:px-6 md:px-12 bg-white border-t border-line">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-muted block mb-1">
                PRE-BRIEF EXPLORATION
              </span>
              <p className="text-sm font-bold text-ink">
                Not ready to submit a brief yet? Explore our capabilities and proof:
              </p>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <Link
                href="/web-development"
                className="px-4 py-2 rounded-xl bg-white border border-line text-xs font-black text-body hover:text-[#8b1a1a] hover:border-[#8b1a1a]/40 transition-all"
              >
                Web Development →
              </Link>
              <Link
                href="/video-editing"
                className="px-4 py-2 rounded-xl bg-white border border-line text-xs font-black text-body hover:text-[#8b1a1a] hover:border-[#8b1a1a]/40 transition-all"
              >
                Video Editing →
              </Link>
              <Link
                href="/graphic-design"
                className="px-4 py-2 rounded-xl bg-white border border-line text-xs font-black text-body hover:text-[#8b1a1a] hover:border-[#8b1a1a]/40 transition-all"
              >
                Graphic Design →
              </Link>
              <Link
                href="/gujarat"
                className="px-4 py-2 rounded-xl bg-white border border-line text-xs font-black text-body hover:text-[#8b1a1a] hover:border-[#8b1a1a]/40 transition-all"
              >
                Gujarat Hub →
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
