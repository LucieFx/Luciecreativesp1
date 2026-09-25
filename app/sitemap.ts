import { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/work-data";
import { getAllInsights } from "@/lib/insights-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://luciecreatives.in";

  // Stable dates for sitemap lastModified — only update when content actually changes
  const CORE_LAST_MODIFIED = "2026-09-12";
  const LOCATION_LAST_MODIFIED = "2026-09-12";

  return [
    {
      url: baseUrl,
      lastModified: CORE_LAST_MODIFIED,
      changeFrequency: "daily",
      priority: 1.0,
    },
    // Primary Services
    {
      url: `${baseUrl}/web-development`,
      lastModified: CORE_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/video-editing`,
      lastModified: CORE_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/graphic-design`,
      lastModified: CORE_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/branding`,
      lastModified: CORE_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ui-ux-design`,
      lastModified: CORE_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/logo-design`,
      lastModified: CORE_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/social-media-design`,
      lastModified: CORE_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    // Global & Regional Geographies — Worldwide & India hub
    {
      url: `${baseUrl}/global`,
      lastModified: LOCATION_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/india`,
      lastModified: LOCATION_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    // Regional Geographies — Gujarat cluster
    {
      url: `${baseUrl}/gujarat`,
      lastModified: LOCATION_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/ahmedabad`,
      lastModified: LOCATION_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/surat`,
      lastModified: LOCATION_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    // Regional Geographies — Metro cities
    {
      url: `${baseUrl}/mumbai`,
      lastModified: LOCATION_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/delhi`,
      lastModified: LOCATION_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/bengaluru`,
      lastModified: LOCATION_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/dev`,
      lastModified: CORE_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: CORE_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/industries`,
      lastModified: CORE_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/testimonials`,
      lastModified: CORE_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    ...getAllProjects().map((project) => ({
      url: `${baseUrl}/work/${project.slug}`,
      lastModified: CORE_LAST_MODIFIED,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
    {
      url: `${baseUrl}/contact`,
      lastModified: CORE_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/insights`,
      lastModified: CORE_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/careers`,
      lastModified: CORE_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/careers/video-editor`,
      lastModified: CORE_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/careers/graphic-designer`,
      lastModified: CORE_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...getAllInsights().map((insight) => ({
      url: `${baseUrl}/insights/${insight.slug}`,
      lastModified: insight.updatedDate || CORE_LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${baseUrl}/privacy`,
      lastModified: CORE_LAST_MODIFIED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: CORE_LAST_MODIFIED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
