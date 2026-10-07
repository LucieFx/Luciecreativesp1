/**
 * Single source of truth for Web Development projects.
 * Only projects with `permissionToShow: true` are rendered on the site.
 */

export interface LighthouseScores {
  performance: number | null;
  accessibility: number | null;
  bestPractices: number | null;
  seo: number | null;
  agenticBrowsing?: string;
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
  fullPreviewImage?: string;
  permissionToShow: boolean;
}

export const WEB_PROJECTS_DATA: WebProject[] = [
  {
    slug: "forever-films",
    title: "Forever Films",
    category: "Cinema & Luxury Photography",
    status: "client",
    description:
      "Luxury wedding cinematography flagship with sub-second route transitions, dark-mode visual storytelling, and bespoke editorial typography.",
    stack: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
    screenshotDesktop: "/projects/forever-films-desktop.png",
    screenshotMobile: "/projects/forever-films-mobile.png",
    fullPreviewImage: "/projects/forever-films-full-desktop.png",
    poster: "/projects/forever-films-desktop.png",
    lighthouse: {
      performance: 95,
      accessibility: 96,
      bestPractices: 100,
      seo: 100,
      mode: "Desktop",
      measuredOn: "Oct 2026",
    },
    reportImage: "/projects/forever-films-lighthouse-report.png",
    permissionToShow: true,
  },
  {
    slug: "media-house",
    title: "Media House Agency",
    category: "Influencer Marketing & Media",
    status: "client",
    description:
      "Creator talent and influencer management platform with interactive roster showcases, brand decks, and real-time campaign metrics.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "GSAP"],
    screenshotDesktop: "/projects/mediahouse-desktop.png",
    screenshotMobile: "/projects/mediahouse-mobile.png",
    fullPreviewImage: "/projects/mediahouse-full-desktop.png",
    poster: "/projects/mediahouse-desktop.png",
    lighthouse: {
      performance: 99,
      accessibility: 96,
      bestPractices: 100,
      seo: 100,
      agenticBrowsing: "3/3",
      mode: "Desktop",
      measuredOn: "Oct 2026",
    },
    reportImage: "/projects/mediahouse-lighthouse-report.png",
    permissionToShow: true,
  },
  {
    slug: "kaption",
    title: "Kaption",
    category: "AI SaaS & Video Tech",
    status: "client",
    description:
      "AI-powered captioning SaaS for 50+ Indic languages with sub-second speech processing, 99.2% accuracy, and high-retention typography.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Web Audio API", "AI Speech API"],
    screenshotDesktop: "/projects/kaption-desktop.png",
    screenshotMobile: "/projects/kaption-mobile.png",
    fullPreviewImage: "/projects/kaption-full-desktop.png",
    poster: "/projects/kaption-desktop.png",
    lighthouse: {
      performance: 94,
      accessibility: 98,
      bestPractices: 100,
      seo: 100,
      mode: "Desktop",
      measuredOn: "Oct 2026",
    },
    reportImage: "/projects/kaption-lighthouse-report.png",
    permissionToShow: true,
  },
  {
    slug: "copease",
    title: "CopEase",
    category: "Retail Tech & SaaS",
    status: "client",
    description:
      "Zero-app QR file transfer and print queue kiosk for Indian xerox shops, eliminating WhatsApp download friction with instant auto-purge privacy.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "WebSockets"],
    screenshotDesktop: "/projects/copease-desktop.webp",
    screenshotMobile: "/projects/copease-mobile.webp",
    fullPreviewImage: "/projects/copease-full-desktop.webp",
    scrollVideo: undefined,
    poster: "/projects/copease-desktop.webp",
    lighthouse: {
      performance: 99,
      accessibility: 79,
      bestPractices: 100,
      seo: 92,
      mode: "Desktop",
      measuredOn: "Oct 2026",
    },
    reportImage: "/projects/copease-lighthouse-report.png",
    permissionToShow: true,
  },
];

/**
 * Filtered helper that only returns projects with explicit permission to showcase.
 */
export function getVisibleWebProjects(): WebProject[] {
  return WEB_PROJECTS_DATA.filter((p) => p.permissionToShow);
}
