import { WEB_PROJECTS_DATA, type WebProject as ModernWebProject } from "@/data/web-projects";

export interface WebProject {
  id: string;
  name: string;
  domain?: string;
  url: string;
  category: string;
  description: string;
  previewImage: string;
  altText: string;
}

/**
 * Re-exports WEB_PROJECTS for backward compatibility with components like DevHeroBrowserMock.
 * Notice: URLs now route internally to request access privately, eliminating external links.
 */
export const WEB_PROJECTS: WebProject[] = WEB_PROJECTS_DATA.map((p) => ({
  id: p.slug,
  name: p.title,
  domain: p.domain,
  url: `/contact?message=${encodeURIComponent(`Hi, I'd like the live link for ${p.title}.`)}`,
  category: p.category,
  description: p.description,
  previewImage: p.screenshotDesktop,
  altText: `${p.title} desktop web interface`,
}));
