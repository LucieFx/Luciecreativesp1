import { SITE_STATS } from "./site-stats";
import {
  VIDEO_PROJECTS,
  LEADERS_DIARY_MULTI_VIDEOS,
  VEDAM_VILLAS_MULTI_VIDEOS,
  MARUTI_BUILDCON_MULTI_VIDEOS,
  AMBICA_INTERIOR_MULTI_VIDEOS,
  NANDANVAN_MULTI_VIDEOS,
  CARNIVAL_MULTI_VIDEOS,
  NIRVA_MULTI_VIDEOS,
  getVideoProjects,
  getShortFormProjects,
  getLongFormProjects,
  getVideoProjectBySlug,
} from "./video-work-data";
import {
  GRAPHIC_DESIGN_PROJECTS,
  NIRVA_DESIGN_GALLERIES,
  NIRVA_BRAND_IDENTITY_SYSTEM,
  getGraphicProjects,
  getGraphicProjectBySlug,
} from "./graphic-work-data";

export type ReelCategoryType =
  | "Luxury Real Estate"
  | "Hospitality & Resort"
  | "Founder Podcasts"
  | "Interior Design"
  | "Brand & D2C";

export type ProjectCategory =
  | "Short Form Videos"
  | "Long Form Videos"
  | "Graphic Design"
  | ReelCategoryType;

export interface ProcessStep {
  phase: string;
  title: string;
  description: string;
}

export interface WorkProject {
  slug: string;
  flagship?: boolean;
  clientId?: string;
  aliases?: string[];
  title: string;
  client: string;
  category: ProjectCategory;
  reelCategory?: ReelCategoryType;
  impact?: string;
  quote?: string;
  industry: string;
  year: number;
  tagline: string;
  brief: string;
  challenge: string;
  approach: string;
  processSteps: ProcessStep[];
  outcomeDetails: string;
  mediaType: "video" | "image";
  videoSrc?: string;
  posterSrc: string;
  aspectRatio: "16/9" | "9/16" | "4/5" | "1/1" | "2/1";
  width?: number;
  height?: number;
  bgColor?: string;
  deliverables: string[];
  outcomeMetric: string;
  outcomeLabel: string;
  tools: string[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
  processStills: {
    src: string;
    caption: string;
    alt?: string;
    aspectRatio?: "1/1" | "4/5" | "2/1" | "16/9" | "3/4" | "4/3" | "9/16";
    width?: number;
    height?: number;
    bgColor?: string;
  }[];
  accentColor: string;
  multiVideos?: WorkVideoItem[];
  designGalleries?: DesignGalleryCategory[];
  brandIdentitySystem?: BrandIdentitySystem;
  // Instagram Reels UI metadata (optional)
  handle?: string;
  avatar?: string;
  verified?: boolean;
  caption?: string;
  hashtags?: string[];
  audio?: string;
  likes?: string;
  comments?: string;
  focalPoint?: string;
  views?: string;
}

export interface WorkVideoItem {
  id: string;
  title: string;
  label: string;
  videoSrc: string;
  posterSrc: string;
  aspectRatio: "16/9" | "9/16";
  description?: string;
}

export interface DesignGalleryCategory {
  category: string;
  description: string;
  items: {
    src: string;
    title: string;
    caption: string;
    aspectRatio?: "16/9" | "9/16" | "4/5" | "1/1" | "2/1" | "3/4";
    width?: number;
    height?: number;
    bgColor?: string;
  }[];
}

export interface BrandIdentitySystem {
  palette: { name: string; hex: string; role: string }[];
  typography: { role: string; family: string; usage: string }[];
  architecturalNotes: string[];
  downloads?: { title: string; filename: string; size: string; href: string }[];
}

export interface StatBreakItem {
  type: "stat" | "quote";
  metric?: string;
  metricLabel?: string;
  quote?: string;
  author?: string;
  role?: string;
  subtext?: string;
}

export {
  LEADERS_DIARY_MULTI_VIDEOS,
  VEDAM_VILLAS_MULTI_VIDEOS,
  MARUTI_BUILDCON_MULTI_VIDEOS,
  AMBICA_INTERIOR_MULTI_VIDEOS,
  NANDANVAN_MULTI_VIDEOS,
  CARNIVAL_MULTI_VIDEOS,
  NIRVA_MULTI_VIDEOS,
  NIRVA_DESIGN_GALLERIES,
  NIRVA_BRAND_IDENTITY_SYSTEM,
  VIDEO_PROJECTS,
  GRAPHIC_DESIGN_PROJECTS,
  getVideoProjects,
  getShortFormProjects,
  getLongFormProjects,
  getVideoProjectBySlug,
  getGraphicProjects,
  getGraphicProjectBySlug,
};

export const WORK_PROJECTS: WorkProject[] = [
  ...VIDEO_PROJECTS,
  ...GRAPHIC_DESIGN_PROJECTS,
];

export const STAT_BREAK: StatBreakItem = {
  type: "quote",
  quote: "Great creative is not art. It is a compounding market authority engine engineered to dominate the cultural conversation.",
  author: "Founders",
  role: "Lucie Creatives",
  metric: SITE_STATS.viewsLabel,
  metricLabel: "ORGANIC IMPRESSIONS GENERATED",
  subtext: "Across Short-Form Viral Engines, Cinema Films & Global Brand Systems",
};

export function getAllProjects(): WorkProject[] {
  return WORK_PROJECTS;
}

export function getProjectBySlug(slug: string): WorkProject | undefined {
  return WORK_PROJECTS.find((p) => p.slug === slug || p.aliases?.includes(slug));
}

export function getNextProject(currentSlug: string): WorkProject {
  const index = WORK_PROJECTS.findIndex((p) => p.slug === currentSlug);
  if (index === -1 || index === WORK_PROJECTS.length - 1) {
    return WORK_PROJECTS[0];
  }
  return WORK_PROJECTS[index + 1];
}
