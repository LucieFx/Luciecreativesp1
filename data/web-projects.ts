/**
 * Single source of truth for Web Development projects.
 * Only projects with `permissionToShow: true` are rendered on the site.
 */

export interface LighthouseScores {
  performance: number | null;
  accessibility: number | null;
  bestPractices: number | null;
  seo: number | null;
  mode: "Mobile" | "Desktop";
  measuredOn: string;
}

export type WebProjectStatus = "client" | "concept" | "own-product";

export interface WebProject {
  slug: string;
  title: string;
  category: string;
  status: WebProjectStatus;
  description: string;
  stack: string[];
  screenshotDesktop: string;
  screenshotMobile: string;
  scrollVideo?: string;
  poster?: string;
  lighthouse: LighthouseScores;
  reportImage?: string;
  permissionToShow: boolean;
}

export const WEB_PROJECTS_DATA: WebProject[] = [
  {
    slug: "1xl-holdings",
    title: "1XL Holdings",
    category: "Fintech & Corporate",
    status: "client",
    description:
      "Investor platform for a Dubai holding company featuring portfolio ecosystems and capital-raising pages. Built with a structured data layout to ensure fast, clear disclosure navigation.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    screenshotDesktop: "/projects/1xl.png",
    screenshotMobile: "/projects/1xl.png", // TODO: Add dedicated mobile screenshot (replace with /projects/1xl-mobile.png)
    scrollVideo: undefined, // TODO: Add 720p scroll walkthrough video (15-20s, mp4)
    poster: "/projects/1xl.png",
    lighthouse: {
      performance: null, // TODO: replace with real measured score
      accessibility: null, // TODO: replace with real measured score
      bestPractices: null, // TODO: replace with real measured score
      seo: null, // TODO: replace with real measured score
      mode: "Desktop",
      measuredOn: "Sept 2026",
    },
    reportImage: undefined, // TODO: Add Lighthouse report screenshot path (e.g. /projects/1xl-lighthouse-report.png)
    permissionToShow: true,
  },
  {
    slug: "nandanvan-realty",
    title: "Nandanvan Realty",
    category: "Real Estate & Architecture",
    status: "client",
    description:
      "Digital flagship platform showcasing architectural real estate developments across Gujarat. Includes interactive floor plan views and streamlined prospective buyer inquiry funnels.",
    stack: ["Next.js", "React", "Tailwind CSS", "GSAP"],
    screenshotDesktop: "/projects/nandanvan-realty-web.jpg",
    screenshotMobile: "/projects/nandanvan-realty-web.jpg", // TODO: Add dedicated mobile screenshot (replace with /projects/nandanvan-mobile.png)
    scrollVideo: undefined, // TODO: Add 720p scroll walkthrough video (15-20s, mp4)
    poster: "/projects/nandanvan-realty-web.jpg",
    lighthouse: {
      performance: null, // TODO: replace with real measured score
      accessibility: null, // TODO: replace with real measured score
      bestPractices: null, // TODO: replace with real measured score
      seo: null, // TODO: replace with real measured score
      mode: "Mobile",
      measuredOn: "Sept 2026",
    },
    reportImage: undefined, // TODO: Add Lighthouse report screenshot path (e.g. /projects/nandanvan-lighthouse-report.png)
    permissionToShow: true,
  },
  {
    slug: "media-house",
    title: "Media House Agency",
    category: "Media & Production",
    status: "concept",
    description:
      "A fast, editorial web concept crafted for creative media and video production agencies. Demonstrates fluid media layouts and low-latency asset delivery without heavy framework overhead.",
    stack: ["Next.js", "Tailwind CSS", "Framer Motion"],
    screenshotDesktop: "/projects/mediahouse.png",
    screenshotMobile: "/projects/mediahouse.png", // TODO: Add dedicated mobile screenshot (replace with /projects/mediahouse-mobile.png)
    scrollVideo: undefined, // TODO: Add 720p scroll walkthrough video (15-20s, mp4)
    poster: "/projects/mediahouse.png",
    lighthouse: {
      performance: null, // TODO: replace with real measured score
      accessibility: null, // TODO: replace with real measured score
      bestPractices: null, // TODO: replace with real measured score
      seo: null, // TODO: replace with real measured score
      mode: "Desktop",
      measuredOn: "Sept 2026",
    },
    reportImage: undefined, // TODO: Add Lighthouse report screenshot path (e.g. /projects/mediahouse-lighthouse-report.png)
    permissionToShow: true,
  },
];

/**
 * Filtered helper that only returns projects with explicit permission to showcase.
 */
export function getVisibleWebProjects(): WebProject[] {
  return WEB_PROJECTS_DATA.filter((p) => p.permissionToShow);
}
