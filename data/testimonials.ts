/**
 * TEMPORARY PLACEHOLDER TESTIMONIAL DATA
 * 
 * Notice: The reviews below are temporary placeholder testimonials based on recent
 * commercial projects. Replace with verified client reviews, headshots, and direct
 * LinkedIn/company links before official client onboarding.
 */

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  project: string;
  discipline: "Video" | "Design" | "Web";
  isPlaceholder: boolean;
}

export const HOME_TESTIMONIALS: Testimonial[] = [
  {
    id: "testimonial-nirva",
    name: "Managing Trustee",
    role: "Trustee & Operations Lead",
    company: "Nirva Club & Resort",
    quote:
      "The resort commercial gave our brand an international feel. Guests frequently mention the video before booking their visits and weekend stays.",
    project: "Commercial Film & Visual Assets",
    discipline: "Video",
    isPlaceholder: true,
  },
  {
    id: "testimonial-vedam",
    name: "Sales Director",
    role: "Director of Residential Sales",
    company: "Vedam Villas",
    quote:
      "The walkthrough videos helped our sales team explain the architecture before buyers visited in person. Pacing, music, and framing were spot on.",
    project: "Architectural Walkthrough Reel",
    discipline: "Video",
    isPlaceholder: true,
  },
  {
    id: "testimonial-ambica",
    name: "Principal Designer",
    role: "Lead Interior Architect",
    company: "Ambica Interior Gallery",
    quote:
      "They understood how to showcase material textures, lighting, and custom finishes without overcomplicating the edit. Clean, honest work.",
    project: "Craft & Material Showcase",
    discipline: "Design",
    isPlaceholder: true,
  },
];
