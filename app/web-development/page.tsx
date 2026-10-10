import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LivingShowcaseHero } from "@/components/dev/LivingShowcaseHero";
import { WebDevBrowserShowcase } from "@/components/dev/WebDevBrowserShowcase";
import { DevClosingCta } from "@/components/dev/DevClosingCta";
import { constructMetadata, SITE_METADATA_MAP } from "@/lib/seo-metadata";
import { getServiceSchema, getBreadcrumbSchema } from "@/lib/schema-structured-data";

export const metadata: Metadata = constructMetadata(SITE_METADATA_MAP["/web-development"]);

export default function WebDevelopmentPage() {
  const serviceSchema = getServiceSchema({
    name: "Web Development",
    description:
      "Fast, clean Next.js websites and web apps for brands that want more than a template.",
    slug: "web-development",
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Web Development", item: "/web-development" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="min-h-screen bg-white text-text-primary selection:bg-brand-red selection:text-white font-sans font-normal relative overflow-x-clip">
        <Navbar />

        {/* 1. Living Showcase Hero (Rebuilt from scratch) */}
        <LivingShowcaseHero />

        {/* 3. Web Development — Detailed Audit & Case Study Showcase */}
        <WebDevBrowserShowcase />

        {/* 4. Development-Scoped Closing Section */}
        <DevClosingCta />

        <Footer />
      </main>
    </>
  );
}
