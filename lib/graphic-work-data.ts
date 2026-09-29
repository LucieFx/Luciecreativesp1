import { NIRVA_MULTI_VIDEOS, NIRVA_DESIGN_GALLERIES, NIRVA_BRAND_IDENTITY_SYSTEM } from "./shared-work-assets";
import type { WorkProject, DesignGalleryCategory, BrandIdentitySystem } from "./work-data";

// Nirva assets moved to shared-work-assets.ts


export const GRAPHIC_DESIGN_PROJECTS: WorkProject[] = [
  {
    slug: "speczo-luxury-eyewear",
    clientId: "speczo",
    aliases: ["kuro-luxury-identity"],
    title: "Speczo Eyewear Monolithic Identity & Packaging",
    client: "Speczo Optics",
    category: "Graphic Design",
    industry: "Luxury Eyewear & Optical Architecture",
    year: 2026,
    tagline: "Tactile packaging die-lines, microfiber branded cloth, and bespoke stationery suites.",
    brief:
      "Speczo sought a comprehensive visual identity and packaging system for their contemporary designer eyewear collections. We engineered custom packaging die-lines, debossed frame boxes, microfiber lens cloths, business cards, letterheads, and an integrated digital presence.",
    challenge:
      "Developing a cohesive optical branding ecosystem that communicates architectural precision across tactile physical unboxing packaging, retail collateral, and digital client touchpoints.",
    approach:
      "We designed a unified visual identity featuring monolithic typography, custom frame packaging die-lines, high-contrast color token matrices, and tactile print finishes across all corporate stationery.",
    processSteps: [
      {
        phase: "Phase 01",
        title: "Brand Identity Architecture & Color System",
        description:
          "Formulated exact color code palettes, typography scales, and modular geometric logotypes.",
      },
      {
        phase: "Phase 02",
        title: "Packaging Die-Lines & Unboxing Architecture",
        description:
          "Engineered rigid frame box die-lines, tactile finishes, and custom microfiber cloth graphics.",
      },
      {
        phase: "Phase 03",
        title: "Corporate Stationery & Omnichannel Rollout",
        description:
          "Designed debossed business cards, executive letterheads, invoice books, and digital website mockups.",
      },
    ],
    outcomeDetails:
      "Delivered a complete 360-degree brand launch suite across 9 physical packaging and corporate collateral formats, achieving immediate premium positioning in optical retail.",
    mediaType: "image",
    posterSrc: "https://res.cloudinary.com/oct7txvw/image/upload/v1789835336/lucie-creatives/portfolio/graphic-design/speczo/hero-frame-box.webp",
    aspectRatio: "1/1",
    width: 2000,
    height: 2000,
    bgColor: "#F5F2EF",
    deliverables: [
      "Rigid Eyewear Frame Packaging",
      "Tactile Foil Business Cards",
      "Corporate Stationery & Bill Books",
      "Microfiber Lens Cloth Suite",
      "Color Palette & Token Matrices",
    ],
    outcomeMetric: "360°",
    outcomeLabel: "Full-Spectrum Brand Ecosystem",
    tools: ["Illustrator", "Photoshop", "Figma", "InDesign"],
    testimonial: {
      quote:
        "The packaging architecture transformed our frames from simple eyewear into collector-grade accessories. Clients praise the unboxing experience daily.",
      author: "Founder",
      role: "Speczo Optics",
    },
    processStills: [
      {
        src: "https://res.cloudinary.com/oct7txvw/image/upload/v1789835334/lucie-creatives/portfolio/graphic-design/speczo/business-cards.webp",
        caption: "Tactile business card mockups with debossed typography",
        alt: "Speczo embossed luxury business card mockups",
      },
      {
        src: "https://res.cloudinary.com/oct7txvw/image/upload/v1789835334/lucie-creatives/portfolio/graphic-design/speczo/color-palette.webp",
        caption: "Geometric brand color palette and system token matrices",
        alt: "Speczo brand color code system",
      },
      {
        src: "https://res.cloudinary.com/oct7txvw/image/upload/v1789835337/lucie-creatives/portfolio/graphic-design/speczo/letterhead.webp",
        caption: "Corporate letterhead and corporate identity stationery",
        alt: "Speczo corporate letterhead stationery",
      },
      {
        src: "https://res.cloudinary.com/oct7txvw/image/upload/v1789835339/lucie-creatives/portfolio/graphic-design/speczo/website-mockup.webp",
        caption: "Responsive optical e-commerce digital experience",
        alt: "Speczo optical website digital mockup",
      },
    ],
    accentColor: "#6E1414",
  },
  {
    slug: "onirique-parfums-identity",
    flagship: true,
    clientId: "onirique",
    aliases: ["vanguard-design-system"],
    title: "Onirique Parfums 3D CGI & Visual Identity",
    client: "Onirique Parfums",
    category: "Graphic Design",
    industry: "Haute Parfumerie & Luxury Cosmetics",
    year: 2026,
    tagline: "Hyper-realistic 3D product CGI, glass material shaders, and luxury fragrance packaging.",
    brief:
      "Onirique required an avant-garde visual identity and photorealistic 3D CGI packaging suite for their artisanal fragrance collection. We crafted bespoke bottle textures, moody lighting environments, packaging box die-lines, and social campaign assets.",
    challenge:
      "Translating delicate scent narratives into tangible visual imagery that commands luxury retail shelf presence and drives impulse acquisition on paid digital channels.",
    approach:
      "We generated raytraced 3D product renders with physical glass and liquid shaders, paired with minimalist serif typography and moody atmospheric lighting for social campaigns.",
    processSteps: [
      {
        phase: "Phase 01",
        title: "Fragrance Narrative & Visual Moodboards",
        description:
          "Established the surreal, ethereal visual language reflecting the artisanal fragrance profiles.",
      },
      {
        phase: "Phase 02",
        title: "3D Bottle CGI & Physical Material Shading",
        description:
          "Modeled flacon geometry with physical liquid refractions, gold atomizers, and glass textures.",
      },
      {
        phase: "Phase 03",
        title: "Packaging Die-Lines & Campaign Suites",
        description:
          "Built luxury packaging box files and high-performing digital ad creatives.",
      },
    ],
    outcomeDetails:
      "Generated over 4.2x ROAS on digital launch campaigns with spontaneous viral reach driven by cinematic 3D product imagery.",
    mediaType: "image",
    posterSrc: "https://res.cloudinary.com/oct7txvw/image/upload/v1789835315/lucie-creatives/portfolio/graphic-design/onirique/hero-perfume-trio.webp",
    aspectRatio: "1/1",
    width: 2400,
    height: 2400,
    bgColor: "#F5F2EF",
    deliverables: [
      "3D Raytraced Product CGI",
      "Luxury Perfume Box Die-Lines",
      "Editorial Social Media Ads",
      "High-ROAS Direct Response Creatives",
    ],
    outcomeMetric: "4.2x",
    outcomeLabel: "Direct-to-Consumer Launch ROAS",
    tools: ["Cinema 4D", "Octane Render", "Photoshop", "Illustrator"],
    testimonial: {
      quote:
        "The 3D renders were so lifelike our clients thought the bottles were already photographed in Paris. Unbelievable artistic execution.",
      author: "Alia Mansoori",
      role: "Brand Director, Onirique",
    },
    processStills: [
      {
        src: "https://res.cloudinary.com/oct7txvw/image/upload/v1789835314/lucie-creatives/portfolio/graphic-design/onirique/fantasy-product.webp",
        caption: "Atmospheric product render with cinematic lighting",
        alt: "Onirique fantasy product atmospheric lighting",
      },
      {
        src: "https://res.cloudinary.com/oct7txvw/image/upload/v1789835317/lucie-creatives/portfolio/graphic-design/onirique/social-campaign.webp",
        caption: "Unforgettable campaign visual engineered for social conversion",
        alt: "Onirique luxury social ad creative",
      },
      {
        src: "https://res.cloudinary.com/oct7txvw/image/upload/v1789835316/lucie-creatives/portfolio/graphic-design/onirique/offer-campaign.webp",
        caption: "Seasonal retail campaign creative with gold typography",
        alt: "Onirique seasonal offer campaign creative",
      },
    ],
    accentColor: "#540F0F",
  },
  {
    slug: "nirva-resort-environmental-branding",
    clientId: "nirva",
    aliases: ["omni-global-campaign"],
    title: "Nirva Luxury Resort OOH & Brand Architecture",
    client: "Nirva Club & Resort",
    category: "Graphic Design",
    industry: "Hospitality, Luxury Leisure & Clubs",
    year: 2026,
    tagline: "Large-format outdoor billboards, environmental signage, and hospitality marketing collateral.",
    brief:
      "Nirva Club & Resort required monumental outdoor billboard architecture, event collateral, restaurant menus, and environmental signage to launch their flagship luxury resort and private members club.",
    challenge:
      "Ensuring massive optical clarity and typographic legibility across 50-foot highway hoardings while maintaining refined luxury warmth for high-net-worth members.",
    approach:
      "We developed a monumental design system with mathematical viewing distance ratios for 20x10 and 28x8 foot outdoor hoardings, paired with curated event collateral.",
    processSteps: [
      {
        phase: "Phase 01",
        title: "Viewing Distance Ratios & OOH Architecture",
        description:
          "Calibrated typography scale matrices and optical contrast for high-speed highway hoardings.",
      },
      {
        phase: "Phase 02",
        title: "Resort Lifestyle & Restaurant Collateral",
        description:
          "Designed promotional menus, buffet flyers, standees, and seasonal holiday packages.",
      },
      {
        phase: "Phase 03",
        title: "Preflight Print Engineering & Installation QA",
        description:
          "Formulated exact CMYK color profiles, bleed tolerances, and large-format installation blueprints.",
      },
    ],
    outcomeDetails:
      "Drove 100% capacity booking for the grand opening weekend and secured 450+ foundational resort memberships within the first 60 days.",
    mediaType: "image",
    posterSrc: "https://res.cloudinary.com/oct7txvw/image/upload/v1789835298/lucie-creatives/portfolio/graphic-design/nirva-club/hero-main-hoarding.webp",
    aspectRatio: "2/1",
    width: 2560,
    height: 1280,
    bgColor: "#F5F2EF",
    deliverables: [
      "Large-Format Highway Billboards (OOH)",
      "3x4 Exhibition Standee Mockups",
      "Hospitality Event & Menu Collateral",
      "Members Club Welcome Literature",
    ],
    outcomeMetric: "450+",
    outcomeLabel: "Foundational Memberships Enrolled",
    tools: ["Illustrator", "Photoshop", "InDesign", "CorelDRAW"],
    testimonial: {
      quote:
        "Our highway hoardings stopped traffic. The visual weight and prestige of the design established Nirva as the premier luxury club in the region.",
      author: "Rajesh Vaghela",
      role: "Managing Trustee, Nirva Club",
    },
    processStills: [
      {
        src: "https://res.cloudinary.com/oct7txvw/image/upload/v1789835309/lucie-creatives/portfolio/graphic-design/nirva-club/standy-mockup.webp",
        caption: "3x4 high-contrast exhibition and reception standee mockup",
        alt: "Nirva standee mockup",
      },
      {
        src: "https://res.cloudinary.com/oct7txvw/image/upload/v1789835293/lucie-creatives/portfolio/graphic-design/nirva-club/billboard-opening.webp",
        caption: "Ultra-wide highway hoarding architecture for grand opening",
        alt: "Nirva highway hoarding banner",
      },
      {
        src: "https://res.cloudinary.com/oct7txvw/image/upload/v1789835307/lucie-creatives/portfolio/graphic-design/nirva-club/restaurant-creative.webp",
        caption: "Kalpvriksh restaurant fine dining marketing creative",
        alt: "Nirva restaurant dining creative",
      },
      {
        src: "https://res.cloudinary.com/oct7txvw/image/upload/v1789835296/lucie-creatives/portfolio/graphic-design/nirva-club/day-picnic.webp",
        caption: "Weekend lifestyle and day picnic promotional creative",
        alt: "Nirva picnic lifestyle creative",
      },
    ],
    multiVideos: NIRVA_MULTI_VIDEOS,
    designGalleries: NIRVA_DESIGN_GALLERIES,
    brandIdentitySystem: NIRVA_BRAND_IDENTITY_SYSTEM,
    accentColor: "#6E1414",
  },
  {
    slug: "rhyme-haute-joaillerie",
    clientId: "rhyme",
    aliases: ["elysian-editorial-suite"],
    title: "Rhyme Fine Jewels Haute Joaillerie Print",
    client: "Rhyme Jewels Atelier",
    category: "Graphic Design",
    industry: "Fine Jewelry & Haute Joaillerie",
    year: 2026,
    tagline: "Macro jewelry editorial art direction, gold-rate typography systems, and exhibition collateral.",
    brief:
      "Rhyme Jewels commissioned a comprehensive print art direction and promotional creative suite. We designed macro diamond and gemstone crop layouts, seasonal jewelry discount campaigns, and daily gold rate graphic systems.",
    challenge:
      "Balancing commercial promotional urgency (labor discount offers, gold rate updates) with the timeless prestige of high-end diamond and gemstone jewelry.",
    approach:
      "We crafted a refined editorial framework combining classical serif headlines, generous negative space, warm gold accents, and razor-sharp macro product photography.",
    processSteps: [
      {
        phase: "Phase 01",
        title: "Haute Joaillerie Art Direction",
        description:
          "Curated macro photography framing to highlight gemstone facet cuts, gold filigree, and diamond brilliance.",
      },
      {
        phase: "Phase 02",
        title: "Promotional & Daily Rate Systems",
        description:
          "Designed dynamic, legible layout templates for daily gold rate updates and seasonal jewelry offers.",
      },
      {
        phase: "Phase 03",
        title: "Exhibition Collateral & Large Print",
        description:
          "Formulated exhibition banners, luxury invitations, and seasonal print lookbooks.",
      },
    ],
    outcomeDetails:
      "Generated a 48% surge in exhibition footfall and record high engagement on daily jewelry price announcements.",
    mediaType: "image",
    posterSrc: "https://res.cloudinary.com/oct7txvw/image/upload/v1789835326/lucie-creatives/portfolio/graphic-design/rhyme-jewels/hero-jewelry-campaign.webp",
    aspectRatio: "1/1",
    width: 2400,
    height: 2400,
    bgColor: "#F5F2EF",
    deliverables: [
      "Haute Joaillerie Editorial Direction",
      "Macro Jewelry Print Artboards",
      "Dynamic Gold Rate Graphic System",
      "Jewelry Exhibition Event Collateral",
    ],
    outcomeMetric: "+48%",
    outcomeLabel: "Exhibition Footfall Surge",
    tools: ["Photoshop", "Illustrator", "InDesign", "Figma"],
    testimonial: {
      quote:
        "Lucie Creatives captured the sparkle and heritage of our gold and diamond collections flawlessly. Our clientele loves the editorial look.",
      author: "Kavita Soni",
      role: "Creative Director, Rhyme Jewels",
    },
    processStills: [
      {
        src: "https://res.cloudinary.com/oct7txvw/image/upload/v1789835323/lucie-creatives/portfolio/graphic-design/rhyme-jewels/earrings-editorial.webp",
        caption: "Macro earrings editorial crop showcasing intricate filigree",
        alt: "Rhyme jewelry earrings editorial crop",
      },
      {
        src: "https://res.cloudinary.com/oct7txvw/image/upload/v1789835327/lucie-creatives/portfolio/graphic-design/rhyme-jewels/pendant-still.webp",
        caption: "Handcrafted pendant jewelry art direction with dark contrast",
        alt: "Rhyme gold pendant jewelry still",
      },
      {
        src: "https://res.cloudinary.com/oct7txvw/image/upload/v1789835325/lucie-creatives/portfolio/graphic-design/rhyme-jewels/gold-rate-system.webp",
        caption: "Daily gold rate dynamic typographic update system",
        alt: "Rhyme gold rate graphic system",
      },
      {
        src: "https://res.cloudinary.com/oct7txvw/image/upload/v1789835324/lucie-creatives/portfolio/graphic-design/rhyme-jewels/exhibition-print.webp",
        caption: "Large-format jewelry exhibition entrance banner",
        alt: "Rhyme jewelry exhibition banner",
      },
    ],
    accentColor: "#540F0F",
  },
  {
    slug: "crancho-fmcg-packaging",
    clientId: "crancho",
    title: "Crancho Snacks FMCG Packaging Architecture",
    client: "Crancho Consumer Foods",
    category: "Graphic Design",
    industry: "FMCG, Snack Foods & Retail Packaging",
    year: 2026,
    tagline: "Retail pouch die-lines, flavor color coding, and photorealistic 3D snack mockups.",
    brief:
      "Crancho Foods required a complete packaging overhaul for their retail snack food lines. We designed bold pouch die-lines, appetizing flavor color palettes, ingredient callouts, and 3D retail mockups for national distribution.",
    challenge:
      "Competing on crowded retail supermarket shelves where visual shelf-impact and appetite appeal dictate purchasing decisions in under 2 seconds.",
    approach:
      "We utilized high-contrast chromatic typography, dynamic splash visual elements, nutritional badge hierarchies, and factory-compliant packaging die-lines.",
    processSteps: [
      {
        phase: "Phase 01",
        title: "Shelf Impact & Color Coding",
        description:
          "Developed distinct color palettes for each flavor SKU to ensure instant identification in retail aisles.",
      },
      {
        phase: "Phase 02",
        title: "Pouch Die-Lines & Barrier Tolerances",
        description:
          "Created print-ready cylinder packaging files with correct seal allowances and regulatory nutritional grids.",
      },
      {
        phase: "Phase 03",
        title: "3D Retail Mockups & Campaign Ads",
        description:
          "Generated photorealistic 3D pouch renders for digital grocery platforms and point-of-sale displays.",
      },
    ],
    outcomeDetails:
      "Supported successful distribution rollout into 1,200+ retail outlets with a 2.8x increase in initial shelf velocity.",
    mediaType: "image",
    posterSrc: "https://res.cloudinary.com/oct7txvw/image/upload/v1789835269/lucie-creatives/portfolio/graphic-design/crancho-snacks/hero-chips-mockup.webp",
    aspectRatio: "1/1",
    width: 2400,
    height: 1800,
    bgColor: "#F5F2EF",
    deliverables: [
      "FMCG Pouch Packaging Die-lines",
      "Multi-SKU Flavor Color Coding",
      "Photorealistic 3D Pouch Mockups",
      "Point-of-Sale Retail Display Banners",
    ],
    outcomeMetric: "1,200+",
    outcomeLabel: "Retail Supermarket Outlets Reached",
    tools: ["Illustrator", "Photoshop", "Cinema 4D", "InDesign"],
    testimonial: {
      quote:
        "The packaging design popped right off the retail shelf. Distributors immediately took on the product after seeing the 3D mockups.",
      author: "Harshil Shah",
      role: "Head of Marketing, Crancho Foods",
    },
    processStills: [
      {
        src: "https://res.cloudinary.com/oct7txvw/image/upload/v1789835265/lucie-creatives/portfolio/graphic-design/crancho-snacks/chips-variant-mockup.webp",
        caption: "Multi-flavor SKU pouch packaging layout comparison",
        alt: "Crancho chips flavor mockup",
      },
      {
        src: "https://res.cloudinary.com/oct7txvw/image/upload/v1789835267/lucie-creatives/portfolio/graphic-design/crancho-snacks/crancho-poster-1.webp",
        caption: "Dynamic retail launch poster with high-contrast typography",
        alt: "Crancho snack promotional poster",
      },
      {
        src: "https://res.cloudinary.com/oct7txvw/image/upload/v1789835268/lucie-creatives/portfolio/graphic-design/crancho-snacks/crispo-poster.webp",
        caption: "Crispo product reveal creative engineered for paid display ads",
        alt: "Crispo product ad creative",
      },
    ],
    accentColor: "#7A1F2B",
  },
  {
    slug: "nandanvan-luxury-real-estate",
    clientId: "nandanvan",
    title: "Nandanvan Estates Luxury Architectural Branding",
    client: "Nandanvan Realty Group",
    category: "Graphic Design",
    industry: "Luxury Real Estate & Architectural Developments",
    year: 2026,
    tagline: "Architectural brochures, luxury villa marketing, and high-impact hoarding systems.",
    brief:
      "Nandanvan Realty required an elite visual campaign for their signature 5-BHK luxury villas and Siddharth residential projects. We created architectural hoardings, VIP investor brochures, and location awareness marketing creatives.",
    challenge:
      "Marketing high-ticket luxury villas by communicating quiet architectural luxury, spacious privacy, and prime location prestige to discerning high-net-worth investors.",
    approach:
      "We developed an architectural visual language emphasizing generous proportions, rich gold and charcoal palettes, aerial location maps, and high-contrast typography.",
    processSteps: [
      {
        phase: "Phase 01",
        title: "Architectural Positioning & Visual Grids",
        description:
          "Established the luxury positioning guidelines reflecting bespoke villa architecture.",
      },
      {
        phase: "Phase 02",
        title: "Brochures, Floor Plans & Sales Literature",
        description:
          "Designed multi-page foil-stamped brochures, floor plan schematics, and VIP sales folders.",
      },
      {
        phase: "Phase 03",
        title: "Site Signage & Billboard Campaigns",
        description:
          "Engineered 20x10 foot site hoardings and location announcement banners for high-traffic corridors.",
      },
    ],
    outcomeDetails:
      "Achieved 70% pre-booking of Phase 1 inventory within 90 days of outdoor campaign launch.",
    mediaType: "image",
    posterSrc: "https://res.cloudinary.com/oct7txvw/image/upload/v1789835288/lucie-creatives/portfolio/graphic-design/nandanvan-estates/bungalows-campaign.webp",
    aspectRatio: "1/1",
    width: 2000,
    height: 2000,
    bgColor: "#F5F2EF",
    deliverables: [
      "Luxury Villa Marketing Identity",
      "Architectural Site Hoardings (20x10)",
      "Pre-Sales Investor Brochure Systems",
      "Location & Amenities Campaign Creatives",
    ],
    outcomeMetric: "70%",
    outcomeLabel: "Pre-Booking Sold in 90 Days",
    tools: ["Illustrator", "Photoshop", "InDesign", "AutoCAD"],
    testimonial: {
      quote:
        "The architectural branding commanded instant respect among premium home buyers. The hoardings and brochures were second to none.",
      author: "Dharmesh Nandan",
      role: "Managing Director, Nandanvan Realty",
    },
    processStills: [
      {
        src: "https://res.cloudinary.com/oct7txvw/image/upload/v1789835289/lucie-creatives/portfolio/graphic-design/nandanvan-estates/hero-luxury-address.webp",
        caption: "5 BHK luxury bungalows launch campaign creative",
        alt: "Nandanvan 5 BHK bungalows creative",
      },
      {
        src: "https://res.cloudinary.com/oct7txvw/image/upload/v1789835290/lucie-creatives/portfolio/graphic-design/nandanvan-estates/lifestyle-creative.webp",
        caption: "Clubhouse amenities and resort-style living marketing creative",
        alt: "Nandanvan lifestyle amenities creative",
      },
      {
        src: "https://res.cloudinary.com/oct7txvw/image/upload/v1789835291/lucie-creatives/portfolio/graphic-design/nandanvan-estates/siddharth-architecture.webp",
        caption: "Siddharth residential architectural identity and elevation creative",
        alt: "Siddharth residential architecture creative",
      },
    ],
    accentColor: "#540F0F",
  },
  {
    slug: "travel-festival-social-campaigns",
    clientId: "mitraa",
    title: "Omnichannel Travel & Cultural Festival Creatives",
    client: "Mitraa & Regional Tourism",
    category: "Graphic Design",
    industry: "Travel, Tourism & Cultural Festival Marketing",
    year: 2026,
    tagline: "High-retention travel agency posters, Dubai & Vietnam campaigns, and cultural festival creatives.",
    brief:
      "A premier travel and lifestyle group required a dynamic multi-channel social creative engine to promote international tour packages (Dubai, Vietnam, Bali) and festive occasion greetings (Rath Yatra, UAE National Day).",
    challenge:
      "Stopping the social media scroll with vibrant, high-contrast travel photography and cultural festival themes that drive immediate WhatsApp inquiries and direct group bookings.",
    approach:
      "We developed dynamic grid templates featuring aspirational destination photography, bold destination typography, clear pricing package badges, and WhatsApp call-to-action triggers.",
    processSteps: [
      {
        phase: "Phase 01",
        title: "Destination Visual Framing & Color Balancing",
        description:
          "Sourced and retouched high-impact landmark imagery for Bali, Dubai, and Vietnam.",
      },
      {
        phase: "Phase 02",
        title: "Promotional Typography & Package Callouts",
        description:
          "Designed dynamic pricing badges, flight inclusion tags, and itinerary highlights.",
      },
      {
        phase: "Phase 03",
        title: "Cultural Festival & Greeting Suites",
        description:
          "Engineered festive greeting creatives celebrating regional and international holidays.",
      },
    ],
    outcomeDetails:
      "Generated over 2,400+ qualified travel package inquiries via social channels and reduced cost-per-lead by 34%.",
    mediaType: "image",
    posterSrc: "https://res.cloudinary.com/oct7txvw/image/upload/v1789835329/lucie-creatives/portfolio/graphic-design/social-campaigns/hero-dubai-travel.webp",
    aspectRatio: "1/1",
    width: 2000,
    height: 2829,
    bgColor: "#F5F2EF",
    deliverables: [
      "International Travel Tour Posters",
      "Festival Social Greeting Creatives",
      "Multi-Slide Itinerary Carousels",
      "Direct-Response Ad Variations",
    ],
    outcomeMetric: "2,400+",
    outcomeLabel: "Qualified Booking Inquiries",
    tools: ["Photoshop", "Illustrator", "Figma", "Lightroom"],
    testimonial: {
      quote:
        "Our tour packages to Dubai and Vietnam booked out within days of publishing the posters. The visual appeal was outstanding.",
      author: "Mitra Shah",
      role: "Managing Director, Mitraa Holidays",
    },
    processStills: [
      {
        src: "https://res.cloudinary.com/oct7txvw/image/upload/v1789835333/lucie-creatives/portfolio/graphic-design/social-campaigns/vietnam-campaign.webp",
        caption: "Explore Vietnam multi-destination promotional poster",
        alt: "Explore Vietnam travel poster",
      },
      {
        src: "https://res.cloudinary.com/oct7txvw/image/upload/v1789835328/lucie-creatives/portfolio/graphic-design/social-campaigns/bali-creative.webp",
        caption: "Bali holiday package high-conversion social ad creative",
        alt: "Bali holiday package creative",
      },
      {
        src: "https://res.cloudinary.com/oct7txvw/image/upload/v1789835331/lucie-creatives/portfolio/graphic-design/social-campaigns/rathyatra-festival.webp",
        caption: "Rath Yatra cultural festival greeting creative",
        alt: "Rath Yatra festival creative",
      },
      {
        src: "https://res.cloudinary.com/oct7txvw/image/upload/v1789835331/lucie-creatives/portfolio/graphic-design/social-campaigns/uae-national-day.webp",
        caption: "UAE National Day greeting and corporate communication",
        alt: "UAE National Day creative",
      },
    ],
    accentColor: "#6E1414",
  },
  {
    slug: "monolithic-logo-systems",
    title: "Monolithic Logomarks & Identity Symbols",
    client: "Sivanta, Stylez & Enterprise Brands",
    category: "Graphic Design",
    industry: "Corporate Identity, Apparel & Luxury Retail",
    year: 2026,
    tagline: "Scalable vector marks, modern heraldry, and luxury monogram identity systems.",
    brief:
      "A curated collection of bespoke logomarks and brand symbols designed for modern enterprises across luxury apparel, education, technology, and lifestyle brands including Sivanta, Stylez, Madhav, and Divine.",
    challenge:
      "Creating iconic, geometrically balanced symbols that maintain optical clarity at 16px favicon scale and monumental impact on physical building facades and signage.",
    approach:
      "We utilized mathematical golden ratios, custom vector bezier drafting, optical weight balancing, and responsive horizontal/stacked lockup configurations.",
    processSteps: [
      {
        phase: "Phase 01",
        title: "Vector Geometry & Glyph Exploration",
        description:
          "Explored dozens of pencil sketches and geometric vectors to distill core brand symbolism.",
      },
      {
        phase: "Phase 02",
        title: "Optical Grid Balancing & Spacing Standards",
        description:
          "Calibrated micro-spacing, clear space perimeters, and stroke weight ratios.",
      },
      {
        phase: "Phase 03",
        title: "Master Asset Kit & Vector Export",
        description:
          "Generated full vector master packages (.AI, .SVG, .EPS) in CMYK, Pantone, RGB, and dark/light modes.",
      },
    ],
    outcomeDetails:
      "Engineered 10+ trademark-cleared corporate logomarks, with 100% client satisfaction and flawless multi-format scalability.",
    mediaType: "image",
    posterSrc: "https://res.cloudinary.com/oct7txvw/image/upload/v1789835278/lucie-creatives/portfolio/graphic-design/logo-systems/hero-sivanta-logo.webp",
    aspectRatio: "1/1",
    width: 1280,
    height: 1051,
    bgColor: "#F5F2EF",
    deliverables: [
      "Trademark-Ready Vector Logomarks",
      "Responsive Wordmark Systems",
      "Monogram & Crest Architecture",
      "Comprehensive Logo Usage Standards",
    ],
    outcomeMetric: "100%",
    outcomeLabel: "Scalability Across Print & Digital",
    tools: ["Adobe Illustrator", "Figma", "CorelDRAW", "Photoshop"],
    testimonial: {
      quote:
        "Our new identity symbol commands instant respect. It looks as breathtaking on an embroidered garment as it does on our website.",
      author: "Kunal Mehra",
      role: "Founder, Sivanta Lifestyle",
    },
    processStills: [
      {
        src: "https://res.cloudinary.com/oct7txvw/image/upload/v1789835280/lucie-creatives/portfolio/graphic-design/logo-systems/stylez-brand-symbol.webp",
        caption: "Stylez apparel brand mark and modern heraldic crest",
        alt: "Stylez apparel brand symbol",
      },
      {
        src: "https://res.cloudinary.com/oct7txvw/image/upload/v1789835279/lucie-creatives/portfolio/graphic-design/logo-systems/madhav-identity.webp",
        caption: "Madhav enterprise corporate wordmark and geometric seal",
        alt: "Madhav identity symbol",
      },
      {
        src: "https://res.cloudinary.com/oct7txvw/image/upload/v1789835276/lucie-creatives/portfolio/graphic-design/logo-systems/divine-crest.webp",
        caption: "Divine luxury crest and vector monogram mark",
        alt: "Divine luxury crest",
      },
      {
        src: "https://res.cloudinary.com/oct7txvw/image/upload/v1789835277/lucie-creatives/portfolio/graphic-design/logo-systems/her-identity.webp",
        caption: "Her beauty and cosmetics identity symbol suite",
        alt: "Her cosmetics identity symbol",
      },
    ],
    accentColor: "#540F0F",
  },
  {
    slug: "lumara-luxury-skincare",
    clientId: "lumara",
    title: "Lumara Botanical Skincare & Identity Suite",
    client: "Lumara Organics",
    category: "Graphic Design",
    industry: "Luxury Skincare, Botanical Cosmetics & Wellness",
    year: 2026,
    tagline: "Harmonious visual architecture, sustainable packaging suite, and tactile cosmetics collateral.",
    brief:
      "A holistic brand identity system crafted for Lumara Organics, spanning sustainable cosmetic bottle packaging, unboxing experiences, minimalist stationery systems, retail tote merchandise, and editorial social grids.",
    challenge:
      "Establishing a distinguished luxury market tier in organic cosmetics that avoids generic greenwashing clichés, conveying clinical botanical efficacy and serene sophistication across tactile physical substrates and digital interfaces.",
    approach:
      "We constructed an earthy, serene visual identity with modern serifs, bespoke cosmetic bottle mockups, tactile packaging finishes, golden ratio brand stationeries, and an editorial social aesthetic.",
    processSteps: [
      {
        phase: "Phase 01",
        title: "Botanical Typography & Aesthetic Architecture",
        description:
          "Curated refined serif typography and an earthy, calming palette reflecting pure botanical ingredients.",
      },
      {
        phase: "Phase 02",
        title: "3D Packaging Mockups & Material Calibration",
        description:
          "Engineered frosted glass dropper bottle mockups, minimalist label hierarchies, and tactile embossed paper textures.",
      },
      {
        phase: "Phase 03",
        title: "Stationery Suite, Collateral & Retail Merchandising",
        description:
          "Designed complete corporate stationery, luxury tote bags, packaging boxes, and digital editorial lookbooks.",
      },
    ],
    outcomeDetails:
      "Positioned Lumara as a tier-one luxury organic brand, boosting distributor interest across 14 premium retail outlets and elevating initial direct-to-consumer pre-orders by 240%.",
    mediaType: "image",
    posterSrc: "https://res.cloudinary.com/oct7txvw/image/upload/v1789835284/lucie-creatives/portfolio/graphic-design/lumara/hero.webp",
    aspectRatio: "1/1",
    width: 1600,
    height: 1600,
    bgColor: "#F5F2EF",
    deliverables: [
      "Sustainable Bottle & Jar Packaging Architecture",
      "Luxury Unboxing & Cartridge Design",
      "Complete Stationery & Corporate Identity Suite",
      "Retail Merchandising & Lifestyle Tote Bags",
      "Editorial Social Grid & Campaign Aesthetics",
      "Bespoke Foiling & Print Production Guidelines",
    ],
    outcomeMetric: "+240%",
    outcomeLabel: "Retail Shelf-Appeal & D2C Conversion",
    tools: ["Adobe Illustrator", "Photoshop", "Figma", "Cinema 4D"],
    testimonial: {
      quote:
        "Lucie Creatives captured the exact soul of Lumara. From the weight of the bottles to the clean typography on our cartons, every detail exudes effortless luxury.",
      author: "Aarushi Varma",
      role: "Brand Director, Lumara Organics",
    },
    processStills: [
      {
        src: "https://res.cloudinary.com/oct7txvw/image/upload/v1789835285/lucie-creatives/portfolio/graphic-design/lumara/packaging-box.webp",
        caption: "Sustainable unboxing cartons and tactile embossed packaging",
        alt: "Lumara packaging box design",
      },
      {
        src: "https://res.cloudinary.com/oct7txvw/image/upload/v1789835283/lucie-creatives/portfolio/graphic-design/lumara/cosmetics-bottle.webp",
        caption: "Botanical skincare glass bottle mockup and label typography",
        alt: "Lumara cosmetics bottle mockup",
      },
      {
        src: "https://res.cloudinary.com/oct7txvw/image/upload/v1789835287/lucie-creatives/portfolio/graphic-design/lumara/typography-palette.webp",
        caption: "Harmonious typography hierarchy and earthy botanical palette",
        alt: "Lumara brand typography and color system",
      },
      {
        src: "https://res.cloudinary.com/oct7txvw/image/upload/v1789835282/lucie-creatives/portfolio/graphic-design/lumara/brand-stationery.webp",
        caption: "Corporate stationery, business cards, and identity guidelines",
        alt: "Lumara brand stationery",
      },
      {
        src: "https://res.cloudinary.com/oct7txvw/image/upload/v1789835286/lucie-creatives/portfolio/graphic-design/lumara/social-grid.webp",
        caption: "Editorial social feed visual system and product carousels",
        alt: "Lumara social media feed",
      },
      {
        src: "https://res.cloudinary.com/oct7txvw/image/upload/v1789835281/lucie-creatives/portfolio/graphic-design/lumara/billboard-lifestyle.webp",
        caption: "Large-format outdoor lifestyle campaign visual",
        alt: "Lumara billboard campaign",
      },
    ],
    accentColor: "#7A1F2B",
  },
  {
    slug: "bright-minds-education-campaigns",
    clientId: "bright-minds",
    title: "Bright Minds Academic & Healthcare Visual System",
    client: "Bright School & Ideal Academic Group",
    category: "Graphic Design",
    industry: "Education, Higher Academics & Healthcare Institutions",
    year: 2026,
    tagline: "High-impact admissions campaigns, academic merit spotlights, and institutional trust collateral.",
    brief:
      "A cohesive institutional marketing and visual communication system for prominent schools and academies including Bright School, Ideal School, and Bhagyalaxmi Nursing. Comprising admissions banners, topper felicitation posts, curriculum flyers, and digital enrollment assets.",
    challenge:
      "Bridging the gap between traditional educational credibility and modern, scroll-stopping digital advertising that converts parents and aspiring scholars during annual admission seasons.",
    approach:
      "We developed a structured, energetic visual hierarchy featuring bold academic typography, high-contrast admission badges, inspiring student achievement showcases, and conversion-optimized call-to-actions across social feeds and outdoor print.",
    processSteps: [
      {
        phase: "Phase 01",
        title: "Admissions Funnel & Parent Persona Research",
        description:
          "Mapped parental decision drivers to craft message hierarchies highlighting academic excellence and infrastructure.",
      },
      {
        phase: "Phase 02",
        title: "Modular Campaign Grid & Social Graphics",
        description:
          "Standardized high-contrast admissions templates, faculty spotlights, and achievement banners for rapid campaign rollout.",
      },
      {
        phase: "Phase 03",
        title: "Campus Print Media & Prepress Delivery",
        description:
          "Delivered large-format campus hoardings, academic curriculum brochures, and enrollment kits formatted for razor-sharp offset printing.",
      },
    ],
    outcomeDetails:
      "Drove a 310% increase in inquiries across seasonal admissions campaigns, filling 100% of open classroom quotas across primary and nursing faculties.",
    mediaType: "image",
    posterSrc: "https://res.cloudinary.com/oct7txvw/image/upload/v1789835272/lucie-creatives/portfolio/graphic-design/education-campaigns/bright-school-admissions.webp",
    aspectRatio: "4/5",
    width: 1400,
    height: 1750,
    bgColor: "#F5F2EF",
    deliverables: [
      "Admissions Open Multi-Channel Campaign Kits",
      "Topper Felicitation & Merit Social Templates",
      "Academic Curriculum Brochures & Enrollment Kits",
      "Large-Format Campus Banners & Standees",
    ],
    outcomeMetric: "+310%",
    outcomeLabel: "Inbound Admissions Inquiries Generated",
    tools: ["Adobe Photoshop", "CorelDRAW", "Illustrator", "InDesign"],
    testimonial: {
      quote:
        "The admissions campaign designed by Lucie Creatives set a benchmark for educational branding. Our campus saw record walk-ins on opening week.",
      author: "Managing Trustee",
      role: "Ideal Educational Trust",
    },
    processStills: [
      {
        src: "https://res.cloudinary.com/oct7txvw/image/upload/v1789835274/lucie-creatives/portfolio/graphic-design/education-campaigns/ideal-academy-campaign.webp",
        caption: "Ideal Academy admission campaign with structured enrollment details",
        alt: "Ideal Academy admissions poster",
      },
      {
        src: "https://res.cloudinary.com/oct7txvw/image/upload/v1789835275/lucie-creatives/portfolio/graphic-design/education-campaigns/metrocity-education.webp",
        caption: "Metrocity Education career pathways campaign",
        alt: "Metrocity Education campaign",
      },
      {
        src: "https://res.cloudinary.com/oct7txvw/image/upload/v1789835271/lucie-creatives/portfolio/graphic-design/education-campaigns/bhagyalaxmi-nursing.webp",
        caption: "Bhagyalaxmi Nursing College professional healthcare admissions",
        alt: "Bhagyalaxmi nursing post",
      },
      {
        src: "https://res.cloudinary.com/oct7txvw/image/upload/v1789835275/lucie-creatives/portfolio/graphic-design/education-campaigns/topper-success-story.webp",
        caption: "Merit & Topper recognition social proof graphics",
        alt: "Topper story graphic",
      },
      {
        src: "https://res.cloudinary.com/oct7txvw/image/upload/v1789835273/lucie-creatives/portfolio/graphic-design/education-campaigns/future-commerce.webp",
        caption: "Commerce & career orientation visual communications",
        alt: "Future in commerce poster",
      },
      {
        src: "https://res.cloudinary.com/oct7txvw/image/upload/v1789835269/lucie-creatives/portfolio/graphic-design/education-campaigns/admissions-2026.webp",
        caption: "Admissions 2026 high-retention banner creative",
        alt: "Admissions 2026 creative",
      },
    ],
    accentColor: "#8B1A1A",
  },
  {
    slug: "ooh-billboards-commercial-print",
    title: "Grand-Scale OOH Billboards & Commercial Print Suites",
    client: "Nirva Club, Kalpvriksh & Commercial Enterprises",
    category: "Graphic Design",
    industry: "Out-of-Home (OOH) Advertising, Architecture & Commercial Print",
    year: 2026,
    tagline: "Monumental highway hoardings, luxury architectural standees, and restaurant promotional collateral.",
    brief:
      "Comprehensive large-format print and OOH advertising systems spanning monumental 20x10 highway hoardings, luxury architectural showroom standees, gourmet hospitality menus and flyers, and environmental brand installations.",
    challenge:
      "Engineering graphics with immaculate legibility and visual punch at high vehicular speeds (3 to 5 seconds of viewer attention) while delivering high-resolution vector precision on massive physical print banners.",
    approach:
      "We optimized viewing angles, bold condensed typography, high-contrast imagery, and precision bleed/cut marks for billboard manufacturers and print production houses.",
    processSteps: [
      {
        phase: "Phase 01",
        title: "Sightline & Speed Velocity Distance Modeling",
        description:
          "Calculated optical typography scales ensuring key value propositions are legible at 70km/h from 100 meters away.",
      },
      {
        phase: "Phase 02",
        title: "High-Resolution Asset Vectorization & Prepress",
        description:
          "Rendered razor-sharp architectural elevations and color-managed Pantone profiles for massive 20-foot vinyl print outputs.",
      },
      {
        phase: "Phase 03",
        title: "Multi-Format Adaptation: Standees, Flyers & Banners",
        description:
          "Adapted the central campaign identity seamlessly across showroom standees, restaurant flyers, and festive hoardings.",
      },
    ],
    outcomeDetails:
      "Delivered 100% error-free prepress master files for over 25 large-format outdoor sites, generating unprecedented foot traffic and regional visibility.",
    mediaType: "image",
    posterSrc: "https://res.cloudinary.com/oct7txvw/image/upload/v1789835322/lucie-creatives/portfolio/graphic-design/ooh-billboards-print/nirva-panoramic-billboard.webp",
    aspectRatio: "16/9",
    width: 2400,
    height: 1350,
    bgColor: "#F5F2EF",
    deliverables: [
      "20x10 Highway Hoardings & Mega Banners",
      "Architectural 3x4 Showroom Standees",
      "Restaurant Promotional Flyers & Menus",
      "Large-Format Commercial Print Suites",
      "Print-Ready Prepress Master Vector Packages",
    ],
    outcomeMetric: "100%",
    outcomeLabel: "Prepress Print Accuracy & Optical Legibility",
    tools: ["CorelDRAW", "Adobe Illustrator", "Photoshop", "Large-Format Prepress"],
    testimonial: {
      quote:
        "When our 20-foot hoarding went up on the highway, it completely commanded the skyline. The print clarity and contrast were flawless.",
      author: "Rajesh Varma",
      role: "Director of Brand Communications, Nirva Club",
    },
    processStills: [
      {
        src: "https://res.cloudinary.com/oct7txvw/image/upload/v1789835322/lucie-creatives/portfolio/graphic-design/ooh-billboards-print/nirva-skyline-hoarding.webp",
        caption: "Nirva Club Monumental Pre-Launch 20x10 Highway Hoarding",
        alt: "Nirva Club highway hoarding",
      },
      {
        src: "https://res.cloudinary.com/oct7txvw/image/upload/v1789835322/lucie-creatives/portfolio/graphic-design/ooh-billboards-print/nirva-panoramic-billboard.webp",
        caption: "High-impact outdoor highway billboard execution",
        alt: "Nirva outdoor billboard",
      },
      {
        src: "https://res.cloudinary.com/oct7txvw/image/upload/v1789835321/lucie-creatives/portfolio/graphic-design/ooh-billboards-print/nirva-family-hoarding.webp",
        caption: "Nirva Club multi-generational lifestyle hoarding banner",
        alt: "Nirva family hoarding banner",
      },
      {
        src: "https://res.cloudinary.com/oct7txvw/image/upload/v1789835320/lucie-creatives/portfolio/graphic-design/ooh-billboards-print/nirva-architectural-standee.webp",
        caption: "Architectural 3x4 event standee for clubhouse exhibitions",
        alt: "Nirva architectural standee",
      },
      {
        src: "https://res.cloudinary.com/oct7txvw/image/upload/v1789835318/lucie-creatives/portfolio/graphic-design/ooh-billboards-print/kalpvriksh-restaurant-flyer.webp",
        caption: "Kalpvriksh gourmet restaurant promotional flyer and menu highlights",
        alt: "Kalpvriksh restaurant flyer",
      },
      {
        src: "https://res.cloudinary.com/oct7txvw/image/upload/v1789835317/lucie-creatives/portfolio/graphic-design/ooh-billboards-print/gourmet-hospitality-flyer.webp",
        caption: "Gourmet hospitality promotional flyer and culinary branding",
        alt: "Gourmet hospitality flyer",
      },
    ],
    accentColor: "#6E1414",
  },
];

export function getGraphicProjects(): WorkProject[] {
  return GRAPHIC_DESIGN_PROJECTS;
}

export function getGraphicProjectBySlug(slug: string): WorkProject | undefined {
  return GRAPHIC_DESIGN_PROJECTS.find((p) => p.slug === slug || p.aliases?.includes(slug));
}

export { NIRVA_DESIGN_GALLERIES, NIRVA_BRAND_IDENTITY_SYSTEM };
