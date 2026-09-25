export interface WebProject {
  id: string;
  name: string;
  url: string;
  category: string;
  description: string;
  previewImage: string;
  altText: string;
}


// ─────────────────────────────────────────────────────────────
// FEATURED CLIENT WEBSITE PROJECT
// Screenshots hosted on Cloudinary CDN.
// ─────────────────────────────────────────────────────────────
export const WEB_PROJECTS: WebProject[] = [
  {
    id: "1xl-holdings",
    name: "1XL Holdings",
    url: "https://1xl.com/",
    category: "CORPORATE / HOLDING COMPANY",
    description:
      "Investor-facing site for a Dubai holding company, with portfolio, ecosystem, and capital-raising pages built on a data-heavy layout.",
    previewImage:
      "https://res.cloudinary.com/oct7txvw/image/upload/v1789835346/lucie-creatives/projects/1xl.jpg",
    altText: "1XL Holdings corporate investor platform interface",
  },
];
