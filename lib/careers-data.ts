export interface CareerRole {
  slug: string;
  title: string;
  department: string;
  type: string;
  location: string;
  shortDescription: string;
  intro: string;
  whatYouWillDo: string[];
  whatWeNeed: string[];
  niceToHave: string[];
}

export const CAREER_ROLES: CareerRole[] = [
  {
    slug: "video-editor",
    title: "Video Editor",
    department: "Creative Production",
    type: "Full-time",
    location: "Ahmedabad / Hybrid or Remote",
    shortDescription:
      "Cut short-form (Reels/Shorts) and long-form video for client brands, turning raw footage into content that's fast, clean, and on-brand.",
    intro:
      "You'll cut short-form and long-form video for our clients, turning raw footage into content that's fast, clean, and on-brand. This is a hands-on editing role, not a strategy seat.",
    whatYouWillDo: [
      "Edit short-form (Reels/Shorts) and long-form video for client brands",
      "Color grade, sound design, and add motion graphics/captions as needed",
      "Work from creative briefs and raw footage to deliver polished cuts",
      "Manage multiple project timelines and hit delivery deadlines",
      "Collaborate with the design and social teams on visual consistency",
    ],
    whatWeNeed: [
      "Proven experience editing video for brands, agencies, or content creators",
      "Strong command of Premiere Pro or DaVinci Resolve",
      "An eye for pacing, rhythm, and hook-driven short-form editing",
      "Comfortable taking direction and iterating quickly on feedback",
      "Portfolio or reel required",
    ],
    niceToHave: [
      "After Effects / motion graphics skills",
      "Experience editing for D2C or e-commerce brands",
    ],
  },
  {
    slug: "graphic-designer",
    title: "Graphic Designer",
    department: "Brand & Visual Systems",
    type: "Full-time",
    location: "Ahmedabad / Hybrid or Remote",
    shortDescription:
      "Design visual assets across social, brand, and client deliverables, from social creatives to brand decks and campaign visuals.",
    intro:
      "You'll design visual assets across social, brand, and client deliverables, from social creatives to brand decks and campaign visuals. You'll work closely with the video and social teams to keep everything on-brand.",
    whatYouWillDo: [
      "Design social media creatives, carousels, and campaign visuals",
      "Build and maintain brand guidelines for client accounts",
      "Create presentation decks, pitch materials, and brand assets",
      "Collaborate with editors and strategists on visual direction",
      "Turn briefs into polished, on-brand designs on tight timelines",
    ],
    whatWeNeed: [
      "Proven experience designing for brands or agencies",
      "Strong skills in Figma and/or Adobe Creative Suite (Illustrator, Photoshop)",
      "Good typography, layout, and color sense",
      "Ability to work across multiple brand identities without losing consistency",
      "Portfolio required",
    ],
    niceToHave: [
      "Basic video/motion design skills",
      "Experience with UGC or D2C brand content",
    ],
  },
];

export function getAllCareerRoles(): CareerRole[] {
  return CAREER_ROLES;
}

export function getCareerRoleBySlug(slug: string): CareerRole | undefined {
  return CAREER_ROLES.find((role) => role.slug === slug);
}
