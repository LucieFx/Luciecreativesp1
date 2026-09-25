import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DevHero } from "@/components/dev/DevHero";
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

      <main className="min-h-screen bg-white text-text-primary selection:bg-brand-red selection:text-white font-sans font-normal relative">
        <Navbar />

        {/* 1. Engineering Intro Hero with Self-Building Browser Mock */}
        <DevHero />

        {/* 2. Web Development — Horizontal Browser Showcase */}
        <WebDevBrowserShowcase />

        {/* 3. Development-Scoped Closing Section */}
        <DevClosingCta />

        <Footer />
      </main>
    </>
  );
}
