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
  domain?: string;
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
    slug: "media-house",
    title: "Media House Agency",
    domain: "mediahouse.space",
    category: "Influencer Marketing & Media",
    status: "client",
    description:
      "Creator talent and influencer management platform with interactive roster showcases, brand decks, and real-time campaign metrics.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "GSAP"],
    screenshotDesktop: "/projects/mediahouse-desktop.webp",
    screenshotMobile: "/projects/mediahouse-mobile.webp",
    fullPreviewImage: "/projects/mediahouse-full-desktop.png",
    poster: "/projects/mediahouse-desktop.webp",
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
    slug: "forever-films",
    title: "Forever Films",
    domain: "foreverfilms.in",
    category: "Cinema & Luxury Photography",
    status: "client",
    description:
      "Luxury wedding cinematography flagship with sub-second route transitions, dark-mode visual storytelling, and bespoke editorial typography.",
    stack: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
    screenshotDesktop: "/projects/forever-films-desktop.webp",
    screenshotMobile: "/projects/forever-films-mobile.webp",
    fullPreviewImage: "/projects/forever-films-full-desktop.webp",
    poster: "/projects/forever-films-desktop.webp",
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
    slug: "novimail",
    title: "NoviMail",
    domain: "novimail.com",
    category: "Privacy Email & SaaS Infrastructure",
    status: "client",
    description:
      "Custom-domain email hosting platform eliminating rental fees and third-party tracking with unified inbox management and sub-second delivery.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "IMAP/SMTP", "DKIM/DMARC"],
    screenshotDesktop: "/projects/novimail-desktop.webp",
    screenshotMobile: "/projects/novimail-mobile.webp",
    fullPreviewImage: "/projects/novimail-full-desktop.webp",
    poster: "/projects/novimail-desktop.webp",
    lighthouse: {
      performance: 94,
      accessibility: 94,
      bestPractices: 92,
      seo: 91,
      agenticBrowsing: "1/2",
      mode: "Desktop",
      measuredOn: "Oct 2026",
    },
    reportImage: "/projects/novimail-lighthouse-report.png",
    permissionToShow: true,
  },
  {
    slug: "nimus-ai",
    title: "Nimus AI",
    domain: "nimus.ai",
    category: "Autonomous AI & DevTools",
    status: "client",
    description:
      "Autonomous AI engineering agent platform with real-time codebase telemetry, automated debugging workflows, and private LLM infrastructure.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "WebSockets", "Autonomous Agents"],
    screenshotDesktop: "/projects/nimus-ai-desktop.webp",
    screenshotMobile: "/projects/nimus-ai-mobile.webp",
    fullPreviewImage: "/projects/nimus-ai-full-desktop.webp",
    poster: "/projects/nimus-ai-desktop.webp",
    lighthouse: {
      performance: 100,
      accessibility: 98,
      bestPractices: 100,
      seo: 83,
      mode: "Desktop",
      measuredOn: "Oct 2026",
    },
    reportImage: "/projects/nimus-ai-lighthouse-report.png",
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
