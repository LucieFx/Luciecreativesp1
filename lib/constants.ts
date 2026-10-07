export const WHATSAPP_CONFIG = {
  displayText: "+91 91064 89694",
  plainNumber: "919106489694",
  baseLink: "https://wa.me/919106489694",
  defaultMessage: "Hi Lucie Creatives, I'd like to discuss a project.",
  defaultLink:
    "https://wa.me/919106489694?text=Hi%20Lucie%20Creatives%2C%20I%27d%20like%20to%20discuss%20a%20project.",
} as const;

export function buildWhatsAppLink(message?: string): string {
  const msg = message && message.trim() ? message : WHATSAPP_CONFIG.defaultMessage;
  return `${WHATSAPP_CONFIG.baseLink}?text=${encodeURIComponent(msg).replace(/'/g, "%27")}`;
}

export const HERO_EYEBROW = "WEB DEVELOPMENT · GRAPHIC DESIGN · VIDEO EDITING";
export const HERO_HOOK = "Boring gets *scrolled past.*";
export const HERO_SUB =
  "Video editing, graphic design and web development for brands that want to be noticed.";

export interface HeroRevealItem {
  id: string;
  discipline: "Design" | "Video" | "Web";
  title: string;
  image: string;
  alt: string;
  isPortrait?: boolean;
}

export const HERO_REVEALS: HeroRevealItem[] = [
  {
    id: "design-flagship",
    discipline: "Design",
    title: "Onirique Parfums 3D CGI & Identity",
    image:
      "https://res.cloudinary.com/oct7txvw/image/upload/v1789835315/lucie-creatives/portfolio/graphic-design/onirique/hero-perfume-trio.webp",
    alt: "Onirique Parfums 3D CGI and luxury fragrance branding",
    isPortrait: true,
  },
  {
    id: "video-reel",
    discipline: "Video",
    title: "Ambica Interior Gallery: Material Precision & Craft",
    image: "https://img.youtube.com/vi/F66vpDy_qQY/maxresdefault.jpg",
    alt: "Ambica Interior Gallery luxury material precision and craft reel edit",
    isPortrait: true,
  },
  {
    id: "web-platform",
    discipline: "Web",
    title: "1XL Holdings Corporate Investor Platform",
    image:
      "https://res.cloudinary.com/oct7txvw/image/upload/v1789835346/lucie-creatives/projects/1xl.jpg",
    alt: "1XL Holdings digital investor platform interface",
    isPortrait: false,
  },
];

export const SITE_CONFIG = {
  name: "Lucie Creatives",
  tagline: "WE MAKE BRANDS IMPOSSIBLE TO IGNORE.",
  secondaryTagline: "YOUR BRAND SHOULD BE IMPOSSIBLE TO IGNORE.",
  ctaTagline: "READY TO MAKE SOME NOISE?",
  description:
    "Lucie Creatives is a premier video editing and web development agency specializing in cinematic video editing, high-performance web development, graphic design, and brand identity systems.",
  officialEmail: "hello@luciecreatives.in",
  whatsapp: WHATSAPP_CONFIG,
  hero: {
    eyebrow: HERO_EYEBROW,
    hook: HERO_HOOK,
    sub: HERO_SUB,
    reveals: HERO_REVEALS,
  },
  socials: [
    { name: "Instagram", href: "https://instagram.com/luciecreatives", handle: "@luciecreatives" },
    { name: "LinkedIn", href: "https://linkedin.com/company/luciecreatives", handle: "lucie-creatives" },
    { name: "X (Twitter)", href: "https://x.com/luciecreatives", handle: "@luciecreatives" },
  ],
};

export interface NavSubLink {
  name: string;
  href: string;
  description?: string;
}

export interface NavLink {
  name: string;
  href: string;
  hasDropdown?: boolean;
  subLinks?: NavSubLink[];
}

export const NAV_SERVICES_LINKS: NavSubLink[] = [
  {
    name: "Video Editing",
    href: "/video-editing",
    description: "Cinematic commercials, reels & high-retention pacing",
  },
  {
    name: "Graphic Design",
    href: "/graphic-design",
    description: "Brand identities, luxury pitch decks & visual packaging",
  },
  {
    name: "Web Development",
    href: "/web-development",
    description: "High-speed Next.js digital platforms & responsive flagships",
  },
];

export const NAV_LINKS: NavLink[] = [
  {
    name: "Services",
    href: "/video-editing",
    hasDropdown: true,
    subLinks: NAV_SERVICES_LINKS,
  },
  { name: "About", href: "/about" },
  { name: "Careers", href: "/careers" },
  { name: "Insights", href: "/insights" },
];


export const SERVICE_CATEGORIES = [
  "Web Development",
  "Branding & Identity",
  "Video Editing",
  "Graphic Designing",
  "Social Media Marketing",
  "Full Growth Ecosystem",
  "Other",
] as const;

export const BUDGET_RANGES = [
  { label: "Under ₹50,000", value: "Under ₹50k" },
  { label: "₹50,000 to ₹1,00,000", value: "₹50k - ₹1L" },
  { label: "₹1,00,000 to ₹2,50,000", value: "₹1L - ₹2.5L" },
  { label: "₹2,50,000 to ₹5,00,000", value: "₹2.5L - ₹5L" },
  { label: "₹5,00,000+ (Enterprise)", value: "₹5L+ Enterprise" },
  { label: "Not sure yet", value: "Not sure yet" },
] as const;





import { AGENCY_STATS_LIST } from "./stats";

export const RESULTS_METRICS = AGENCY_STATS_LIST.map((stat) => ({
  id: stat.id,
  label: stat.unit.toUpperCase(),
  unit: stat.unit,
  value: stat.value,
  prefix: stat.prefix,
  suffix: stat.suffix,
}));







export { TESTIMONIALS_DATA } from "./testimonials";
export type { Testimonial, Testimonial as TestimonialItem } from "./testimonials";

export const FAQ_DATA = [
  {
    question: "What services do you offer?",
    answer:
      "We offer custom web development and web platforms, complete branding and visual identity systems (logos, style guides, packaging), end-to-end social media management, and high-retention video editing (reels, YouTube, motion graphics). Tell us what you need and we'll suggest the right mix.",
  },
  {
    question: "How does pricing work?",
    answer:
      "Every project is scoped to your requirements. Share your brief and we'll send a custom quote.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Brand identity kits and high-converting websites typically take 1 to 3 weeks. Custom web platforms and web applications typically take 3 to 6 weeks depending on feature complexity.",
  },
  {
    question: "Who owns the work, and do you sign NDAs?",
    answer:
      "You retain 100% intellectual property ownership and commercial copyright upon completion, including all open master files, Figma libraries, and source code. We also routinely execute bilateral NDAs before discovery to protect your proprietary algorithms, product launches, and confidential business data.",
  },
  {
    question: "How do I start, and how do we work together?",
    answer:
      "Submit your brief through our form, WhatsApp, or email. We respond within 24 hours to schedule a discovery session. We operate on agile remote sprints with multi-timezone overlap, collaborating via Slack/WhatsApp and cloud workspaces on Figma and Frame.io.",
  },
  {
    question: "Can I combine multiple services into one package?",
    answer:
      "Absolutely. Most of our clients combine multiple pillars (e.g. Branding + Web Development + Social Media Marketing + Video Production) for maximum synergy and rapid brand scaling.",
  },
];
