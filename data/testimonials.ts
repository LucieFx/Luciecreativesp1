export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  category: "Video" | "UGC" | "Branding";
  company: string;
  discipline?: "Video" | "Design" | "Web";
  project?: string;
  isPlaceholder?: boolean;
}

export const HOME_TESTIMONIALS: Testimonial[] = [
  {
    id: "crazydeep",
    name: "Crazydeep",
    role: "Gaming Creator",
    category: "Video",
    quote:
      "Working with Lucie Creatives was a great experience. They crafted a clean, engaging intro for my podcast that matched my content's vibe perfectly. Professional editing, seamless communication, and results that exceeded expectations.",
    company: "Crazydeep",
    discipline: "Video",
    isPlaceholder: false,
  },
  {
    id: "media-house",
    name: "Media House",
    role: "Talent Management Company",
    category: "UGC",
    quote:
      "Lucie Creatives consistently delivers high-quality UGC and creator reels tailored for social performance. They understand creator branding, maintain quick turnaround times, and are a reliable creative partner for brands and creators alike.",
    company: "Media House",
    discipline: "Video",
    isPlaceholder: false,
  },
  {
    id: "farmey",
    name: "Farmey",
    role: "Leading Digital Platform",
    category: "Branding",
    quote:
      "Working with Lucie Creatives was seamless. They helped us with branding and content editing, understood our brand vision quickly, and delivered exceptional quality. A professional team that truly strengthens brand presence.",
    company: "Farmey",
    discipline: "Design",
    isPlaceholder: false,
  },
  {
    id: "nirva-club-resort",
    name: "Nirva Club & Resort",
    role: "Club & Resort",
    category: "Video",
    quote:
      "Lucie Creatives delivered an excellent resort promotional video that perfectly reflected our brand. The editing was professional, creative, and engaging. We were very happy with the final result.",
    company: "Nirva Club & Resort",
    discipline: "Video",
    isPlaceholder: false,
  },
  {
    id: "naman-sharma",
    name: "Naman Sharma",
    role: "Content Creator",
    category: "Video",
    quote:
      "Working with Lucie Creatives has been an absolute game-changer for my content. He has this rare ability to make viewers feel connected with the story, making every video more engaging and impactful.",
    company: "Naman Sharma",
    discipline: "Video",
    isPlaceholder: false,
  },
  {
    id: "aaradhya",
    name: "Aaradhya",
    role: "UGC Creator",
    category: "UGC",
    quote:
      "Lucie Creatives is a skilled and reliable agency with a strong eye for detail and creative execution. His work is consistently high quality and he delivers polished results on time. A valuable contributor to any creative project.",
    company: "Aaradhya",
    discipline: "Video",
    isPlaceholder: false,
  },
  {
    id: "bhumi-dhare",
    name: "Bhumi Dhare",
    role: "UGC Creator",
    category: "UGC",
    quote:
      "Lucie Creatives is one of those rare editors who just gets it. Every time I've worked with them, they've brought a level of care and precision that really stands out.",
    company: "Bhumi Dhare",
    discipline: "Video",
    isPlaceholder: false,
  },
];
