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

export interface NavLink {
  name: string;
  href: string;
  hasDropdown?: boolean;
}

export const NAV_LINKS: NavLink[] = [
  { name: "Video Editing", href: "/video-editing" },
  { name: "Graphic Design", href: "/graphic-design" },
  { name: "Web Development", href: "/dev" },
  { name: "About", href: "/about" },
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
  { label: "₹50,000 – ₹1,00,000", value: "₹50k - ₹1L" },
  { label: "₹1,00,000 – ₹2,50,000", value: "₹1L - ₹2.5L" },
  { label: "₹2,50,000 – ₹5,00,000", value: "₹2.5L - ₹5L" },
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







export interface TestimonialItem {
  id: string;
  clientName: string;
  role: string;
  company: string;
  category: string;
  quote: string;
  avatar: string;
  rating: number;
  founderSticker: string;
  stickerBg: string;
  rotation: string;
}

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: "test-1",
    clientName: "Harsh Patel",
    role: "Managing Director",
    company: "Nirva Club & Resort",
    category: "Luxury Hospitality",
    quote: "Lucie Creatives captured the architectural grandeur and serene poolside vibe of Nirva with breathtaking 4K cinematic clarity. Weekend suite bookings filled up immediately.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces",
    rating: 5,
    founderSticker: "🏊 100% weekend bookings filled",
    stickerBg: "bg-brand-red-50 border-brand-red/30 text-ink",
    rotation: "-rotate-2",
  },
  {
    id: "test-2",
    clientName: "Taniya Oberoi",
    role: "Brand Ambassador & Sales Lead",
    company: "Vedam Villas",
    category: "Ultra-Luxury Real Estate",
    quote: "The architectural walkthroughs and influencer reels reached over 4.2M views across Gujarat and Mumbai. Serious buyer inquiries doubled within our launch month.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces",
    rating: 5,
    founderSticker: "🏡 4.2M views on villa launch",
    stickerBg: "bg-amber-100 border-amber-300 text-amber-950",
    rotation: "rotate-2",
  },
  {
    id: "test-3",
    clientName: "Executive Team",
    role: "Project Directors",
    company: "Maruti Buildcon",
    category: "Infrastructure & Living",
    quote: "From drone construction progressions to cinematic project reveal reels, Lucie Creatives delivers unmatched speed and engineering-grade visual precision.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces",
    rating: 5,
    founderSticker: "🏗️ 3X site-visit booking surge",
    stickerBg: "bg-purple-100 border-purple-300 text-purple-950",
    rotation: "-rotate-1",
  },
  {
    id: "test-4",
    clientName: "Principal Designer",
    role: "Design Director",
    company: "Ambica Interior",
    category: "Bespoke Interior Design",
    quote: "Every luxury texture, light reflection, and custom woodwork finish was showcased with editorial elegance. Our high-ticket residential inquiries have never been stronger.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces",
    rating: 5,
    founderSticker: "✨ High-ticket client pipeline",
    stickerBg: "bg-rose-100 border-rose-300 text-rose-950",
    rotation: "rotate-3",
  },
  {
    id: "test-5",
    clientName: "Nishant Patel",
    role: "Executive Producer & Host",
    company: "Leaders Diary Podcast",
    category: "Leadership & Media",
    quote: "Lucie Creatives turns 60-minute executive discussions into viral, high-retention podcast clips. Watch times jumped +340% across YouTube and Instagram.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces",
    rating: 5,
    founderSticker: "🎙️ +340% audience watch time",
    stickerBg: "bg-sky-100 border-sky-300 text-sky-950",
    rotation: "-rotate-2",
  },
  {
    id: "test-6",
    clientName: "Technical Leadership",
    role: "Product & Engineering",
    company: "PCFitment",
    category: "Automotive Catalog Cloud SaaS",
    quote: "Lucie Creatives elevated our B2B SaaS product positioning, brand collateral, and marketing assets. They turned complex ACES & PIES fitment workflows into sleek, intuitive, and high-converting creative systems.",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=faces",
    rating: 5,
    founderSticker: "⚡ Enterprise SaaS growth boost",
    stickerBg: "bg-indigo-100 border-indigo-300 text-indigo-950",
    rotation: "rotate-1",
  },
];

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
      "Brand identity kits and high-converting websites typically take 1–3 weeks. Custom web platforms and web applications typically take 3–6 weeks depending on feature complexity.",
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
