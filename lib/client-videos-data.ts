export interface ClientVideoItem {
  id: string;
  clientId?: string;
  title: string;
  client: string;
  category:
    | "Resorts & Hospitality"
    | "Luxury Real Estate"
    | "Commercial Architecture"
    | "Founder Authority"
    | "Interior Design"
    | "Brand Campaigns & D2C";
  categoryBadge: string;
  tagline: string;
  description: string;
  videoSrc: string;
  posterSrc?: string;
  aspectRatio: "16:9" | "9:16";
  aspectRatioClass: string;
  duration: string;
  durationIso: string;
  metric: string;
  metricLabel: string;
  deliverables: string[];
  specs: {
    resolution: string;
    fps: string;
    turnaround: string;
    pacing: string;
    colorGrade: string;
  };
  tags: string[];
  featured?: boolean;
}

export const VIDEO_CATEGORIES = [
  "All Productions",
  "Resorts & Hospitality",
  "Luxury Real Estate",
  "Commercial Architecture",
  "Founder Authority",
  "Interior Design",
  "Brand Campaigns & D2C",
] as const;

export type VideoCategory = (typeof VIDEO_CATEGORIES)[number];

export const CLIENT_VIDEOS: ClientVideoItem[] = [
  // ─────────────────────────────────────────────────────────────
  // 1. RESORTS & HOSPITALITY (Nirva Club & Resort)
  // ─────────────────────────────────────────────────────────────
  {
    id: "nirva-cinema",
    title: "Nirva Club & Resort - Monumental 4K Cinema Brand Spot",
    client: "Nirva Club & Resort",
    category: "Resorts & Hospitality",
    categoryBadge: "16:9 Cinema Commercial",
    tagline:
      "Cinema-grade commercial spot showcasing monumental architecture, Olympic swimming pool, and bespoke hospitality.",
    description:
      "Broadcast-grade promotional brand film engineered for television, OTT, and digital flagships. Shot with cinema lenses, color graded under ACES color science in DaVinci Resolve, and synchronized with binaural orchestral sound design.",
    videoSrc: "https://res.cloudinary.com/oct7txvw/video/upload/v1790267038/lucie-creatives/videos/clients/nirva-resort/nirva-resort-cinema-commercial.mp4",
    posterSrc: "https://i.ytimg.com/vi/DRH6FUhej7s/hqdefault.jpg",
    aspectRatio: "16:9",
    aspectRatioClass: "aspect-[16/9]",
    duration: "0:48",
    durationIso: "PT48S",
    metric: "450+",
    metricLabel: "Foundational Memberships Enrolled",
    deliverables: [
      "ACES filmic color grading in DaVinci Resolve",
      "Layered multi-track sub-bass audio foley & risers",
      "16:9 widescreen master delivery",
      "Direct-response cutdowns for social distribution",
    ],
    specs: {
      resolution: "1920x1080 Full HD",
      fps: "60 FPS Master",
      turnaround: "7 Business Days",
      pacing: "Dynamic Speed-Ramp Narrative",
      colorGrade: "ACES Film Emulation (Kodak 2383)",
    },
    tags: ["Resort", "Cinema 16:9", "Hospitality", "Commercial", "Drone"],
    featured: true,
  },
  {
    id: "nirva-poolside",
    title: "Nirva Resort: Turquoise Poolside Oasis",
    client: "Nirva Club & Resort",
    category: "Resorts & Hospitality",
    categoryBadge: "Resort Lifestyle Reel",
    tagline:
      "Atmospheric speed-ramped vertical reel highlighting the shimmering Olympic-size resort pool and sun deck.",
    description:
      "Engineered for high algorithmic retention on Instagram reels and Meta ads. Features sub-bass water foley, micro-zoom pattern interrupts, and vibrant sunlight color science.",
    videoSrc: "https://res.cloudinary.com/oct7txvw/video/upload/v1790267018/lucie-creatives/videos/clients/nirva-resort/nirva-poolside-lifestyle.mp4",
    posterSrc: "https://i.ytimg.com/vi/pNaOG63GbZA/hqdefault.jpg",
    aspectRatio: "9:16",
    aspectRatioClass: "aspect-[9/16]",
    duration: "0:45",
    durationIso: "PT45S",
    metric: "+380%",
    metricLabel: "Organic Weekend Inquiries",
    deliverables: [
      "Sensory water splash audio foley & binaural reverb",
      "Speed-ramped sun lounger transitions",
      "Calibrated high-contrast Mediterranean teal & gold grade",
    ],
    specs: {
      resolution: "1080x1920 Vertical",
      fps: "60 FPS",
      turnaround: "48 Hours",
      pacing: "Beat-Synced Micro Pacing",
      colorGrade: "Vibrant Mediterranean Gold & Aqua",
    },
    tags: ["Resort", "Poolside", "Vertical Reel", "Hospitality"],
    featured: true,
  },
  {
    id: "nirva-evening",
    title: "Nirva Resort: Golden Hour & Twilight Dining",
    client: "Nirva Club & Resort",
    category: "Resorts & Hospitality",
    categoryBadge: "Gastronomy & Twilight",
    tagline:
      "Warm golden-hour and twilight footage capturing Mediterranean archways and alfresco poolside dining.",
    description:
      "Evocative low-light cinematography with custom noise-reduction profiling. Brings Kalpvriksh multi-cuisine dining to life with appetizing close-ups and ambient chatter foley.",
    videoSrc: "https://res.cloudinary.com/oct7txvw/video/upload/v1790267003/lucie-creatives/videos/clients/nirva-resort/nirva-evening-ambience.mp4",
    posterSrc: "https://i.ytimg.com/vi/JRHLckRIWWw/hqdefault.jpg",
    aspectRatio: "9:16",
    aspectRatioClass: "aspect-[9/16]",
    duration: "0:38",
    durationIso: "PT38S",
    metric: "12.4k",
    metricLabel: "Saves & Table Reservations Triggered",
    deliverables: [
      "Low-light DaVinci temporal noise reduction",
      "Warm amber stone arch illumination grading",
      "Culinary sizzling sound design & foley accents",
    ],
    specs: {
      resolution: "1080x1920 Vertical",
      fps: "60 FPS",
      turnaround: "48 Hours",
      pacing: "Smooth Parallax Glide",
      colorGrade: "Golden-Hour Twilight Warmth (3200K)",
    },
    tags: ["Gastronomy", "Evening Dining", "Resort", "Reel"],
  },
  {
    id: "nirva-hospitality",
    title: "Nirva Resort: Monumental Architecture & Escape",
    client: "Nirva Club & Resort",
    category: "Resorts & Hospitality",
    categoryBadge: "Suite & Architecture Tour",
    tagline:
      "First-person immersive suite walkthrough with sound design highlighting luxury textures and tranquility.",
    description:
      "FPV-style stabilization and gentle speed ramping create an aspirational VIP check-in journey. Highlights expansive balcony vistas, marble fixtures, and private family retreats.",
    videoSrc: "https://res.cloudinary.com/oct7txvw/video/upload/v1790267011/lucie-creatives/videos/clients/nirva-resort/nirva-hospitality-experience.mp4",
    posterSrc: "https://i.ytimg.com/vi/DRH6FUhej7s/hqdefault.jpg",
    aspectRatio: "9:16",
    aspectRatioClass: "aspect-[9/16]",
    duration: "0:52",
    durationIso: "PT52S",
    metric: "91%",
    metricLabel: "Video Completion Rate (VCR)",
    deliverables: [
      "FPV continuous motion stabilization",
      "Tactile sound design (linen rustle, marble taps)",
      "Dynamic typography callouts of suite features",
    ],
    specs: {
      resolution: "1080x1920 Vertical",
      fps: "60 FPS",
      turnaround: "72 Hours",
      pacing: "Continuous One-Shot Illusion",
      colorGrade: "Clean High-Key Interior Tone",
    },
    tags: ["Suite Tour", "Architecture", "VIP Hospitality", "Resort"],
  },

  // ─────────────────────────────────────────────────────────────
  // 2. LUXURY REAL ESTATE (Vedam Villas & Nandanvan Estates)
  // ─────────────────────────────────────────────────────────────
  {
    id: "vedam-villas-tour",
    title: "Vedam Villas: Influencer Tour with Taniya Oberoi",
    client: "Vedam Villas (Baroda)",
    category: "Luxury Real Estate",
    categoryBadge: "Influencer Architectural Tour",
    tagline:
      "High-converting creator walkthrough blending lifestyle presentation with luxury discovery.",
    description:
      "Fast-paced lifestyle pacing cut to upbeat audio with kinetic subtitle typography. Seamlessly transitions from double-height living areas to open-sky private courtyards, driving qualified site-visit leads.",
    videoSrc: "https://res.cloudinary.com/oct7txvw/video/upload/v1790267065/lucie-creatives/videos/clients/vedam-villas/vedam-villas-influencer-tour.mp4",
    posterSrc: "https://res.cloudinary.com/oct7txvw/image/upload/v1790684877/lucie-creatives/portfolio/vedam-villas-influencer-tour-poster.jpg",
    aspectRatio: "9:16",
    aspectRatioClass: "aspect-[9/16]",
    duration: "0:58",
    durationIso: "PT58S",
    metric: "620+",
    metricLabel: "Direct Site Visit Bookings",
    deliverables: [
      "Dynamic auto-styled captions with brand highlights",
      "Micro-whip transitions between villa zones",
      "Custom vocal clarity compression & de-essing",
    ],
    specs: {
      resolution: "1080x1920 Vertical",
      fps: "60 FPS",
      turnaround: "24 Hours",
      pacing: "High-Energy Influencer Cut",
      colorGrade: "Warm Natural Architectural Sunlight",
    },
    tags: ["Real Estate", "Villas", "Influencer", "Baroda", "Walkthrough"],
    featured: true,
  },
  {
    id: "vedam-villas-architecture",
    title: "Vedam Villas: Monolithic Villa Architecture",
    client: "Vedam Villas (Baroda)",
    category: "Luxury Real Estate",
    categoryBadge: "Architectural Showcase",
    tagline:
      "Cinematic vertical framing highlighting monolithic facades, Italian marble, and minimalist geometry.",
    description:
      "Crafted for discerning high-net-worth buyers. Uses slow-mo parallax glides, elegant typography overlays, and architectural sound design to convey uncompromising construction quality.",
    videoSrc: "https://res.cloudinary.com/oct7txvw/video/upload/v1790267044/lucie-creatives/videos/clients/vedam-villas/vedam-villas-architecture.mp4",
    posterSrc: "https://i.ytimg.com/vi/BXPo8ml3XAE/hqdefault.jpg",
    aspectRatio: "9:16",
    aspectRatioClass: "aspect-[9/16]",
    duration: "0:42",
    durationIso: "PT42S",
    metric: "1.2M+",
    metricLabel: "Targeted HNI Views in Gujarat",
    deliverables: [
      "Architectural line-correction & perspective leveling",
      "Subtle 3D tracked motion typography",
      "Atmospheric cinematic synth soundscapes",
    ],
    specs: {
      resolution: "1080x1920 Vertical",
      fps: "60 FPS",
      turnaround: "48 Hours",
      pacing: "Smooth Filmic Parallax",
      colorGrade: "Minimalist High-Contrast Neutral",
    },
    tags: ["Architecture", "Luxury Real Estate", "Villas", "Baroda"],
  },
  {
    id: "vedam-villas-luxury",
    title: "Vedam Villas: Master Living & High Ceilings",
    client: "Vedam Villas (Baroda)",
    category: "Luxury Real Estate",
    categoryBadge: "Interior Experience",
    tagline:
      "Sensory exploration of bespoke interior craft, high ceilings, and landscaped plunge-pool reflections.",
    description:
      "A tranquil, aspirational edit showcasing morning light pouring through floor-to-ceiling glass. Tailored to trigger deep emotional resonance and lifestyle visualization in luxury homebuyers.",
    videoSrc: "https://res.cloudinary.com/oct7txvw/video/upload/v1790267069/lucie-creatives/videos/clients/vedam-villas/vedam-villas-luxury-living.mp4",
    posterSrc: "https://i.ytimg.com/vi/aML3WYYORvg/hqdefault.jpg",
    aspectRatio: "9:16",
    aspectRatioClass: "aspect-[9/16]",
    duration: "0:36",
    durationIso: "PT36S",
    metric: "+420%",
    metricLabel: "Instagram Profile Engagement Surge",
    deliverables: [
      "Reflective water pool stabilization & light bleed",
      "Macro detail transitions across wooden finishes",
      "Binaural morning birdsong & breeze audio design",
    ],
    specs: {
      resolution: "1080x1920 Vertical",
      fps: "60 FPS",
      turnaround: "48 Hours",
      pacing: "Meditative Architectural Flow",
      colorGrade: "Soft Warm Interior Glow (4000K)",
    },
    tags: ["Interior Luxury", "Real Estate", "Villas", "Courtyard"],
  },
  {
    id: "vedam-villas-exterior",
    title: "Vedam Villas: Private Courtyard & Plunge Pool",
    client: "Vedam Villas (Baroda)",
    category: "Luxury Real Estate",
    categoryBadge: "Courtyard & Plunge Pool",
    tagline:
      "Sweeping drone-to-ground vertical transitions framing lush landscaping and private pool sanctuaries.",
    description:
      "Dynamic speed-ramping captures the full boundary scale of the gated villa community before zooming into the private serenity of individual courtyard splash pools.",
    videoSrc: "https://res.cloudinary.com/oct7txvw/video/upload/v1790267055/lucie-creatives/videos/clients/vedam-villas/vedam-villas-exterior-tour.mp4",
    posterSrc: "https://i.ytimg.com/vi/rNPFd-3xSuw/hqdefault.jpg",
    aspectRatio: "9:16",
    aspectRatioClass: "aspect-[9/16]",
    duration: "0:40",
    durationIso: "PT40S",
    metric: "84%",
    metricLabel: "3-Second Hook Retention Rate",
    deliverables: [
      "Aerial drone speed-ramp stabilization",
      "Color-matched sky replacement and enhancement",
      "Low-frequency impact hits on elevation reveals",
    ],
    specs: {
      resolution: "1080x1920 Vertical",
      fps: "60 FPS",
      turnaround: "48 Hours",
      pacing: "Dynamic Speed-Ramp & Parallax",
      colorGrade: "Vivid Emerald Landscape & Warm Stone",
    },
    tags: ["Drone", "Exterior", "Luxury Villas", "Baroda"],
  },
  {
    id: "nandanvan-walkthrough",
    title: "Nandanvan Estates: Grand Gated Bungalow Walkthrough",
    client: "Nandanvan Estates",
    category: "Luxury Real Estate",
    categoryBadge: "Bungalow Walkthrough",
    tagline:
      "First-person perspective gliding through grand double-height foyers and regal landscaped avenues.",
    description:
      "Smooth gimbal cinematography paired with upbeat luxury soundtrack and timed typography highlights. Positions Nandanvan as the definitive multi-generational bungalow address in the region.",
    videoSrc: "https://res.cloudinary.com/oct7txvw/video/upload/v1790266986/lucie-creatives/videos/clients/nandanvan-bungalows/nandanvan-bungalows-cinematic.mp4",
    posterSrc: "https://i.ytimg.com/vi/z4Pzj3rfCL8/hqdefault.jpg",
    aspectRatio: "9:16",
    aspectRatioClass: "aspect-[9/16]",
    duration: "0:47",
    durationIso: "PT47S",
    metric: "340k",
    metricLabel: "Organic Views on Meta Reels",
    deliverables: [
      "Steadicam continuous flow stabilization",
      "Dynamic room dimension typographic popouts",
      "Layered acoustic room reverberation foley",
    ],
    specs: {
      resolution: "1080x1920 Vertical",
      fps: "60 FPS",
      turnaround: "48 Hours",
      pacing: "Rhythmic Architectural Flow",
      colorGrade: "Opulent Warm Gold & Royal Cream",
    },
    tags: ["Bungalow", "Walkthrough", "Luxury Living", "Gated Estate"],
    featured: true,
  },
  {
    id: "nandanvan-cinematic",
    title: "Nandanvan Estates: Cinematic Estate Living",
    client: "Nandanvan Estates",
    category: "Luxury Real Estate",
    categoryBadge: "Estate Living Teaser",
    tagline:
      "Editorial teaser reel capturing golden-hour lighting across grand bungalow porticos and manicured lawns.",
    description:
      "Short, punchy teaser cut specifically optimized for Instagram Stories and Meta paid advertising campaigns. Delivers instant prestige perception within the first 1.5 seconds.",
    videoSrc: "https://res.cloudinary.com/oct7txvw/video/upload/v1790266994/lucie-creatives/videos/clients/nandanvan-bungalows/nandanvan-bungalows-walkthrough.mp4",
    posterSrc: "https://i.ytimg.com/vi/iC8Z0XmUh68/hqdefault.jpg",
    aspectRatio: "9:16",
    aspectRatioClass: "aspect-[9/16]",
    duration: "0:28",
    durationIso: "PT28S",
    metric: "+520%",
    metricLabel: "Ad Click-Through Rate (CTR) vs Benchmark",
    deliverables: [
      "Sub-1s thumb-stopping opening hook sequence",
      "Motion-tracked luxury serif title cards",
      "Bass-heavy cinematic riser & whoosh design",
    ],
    specs: {
      resolution: "1080x1920 Vertical",
      fps: "60 FPS",
      turnaround: "24 Hours",
      pacing: "Fast-Hook Ad Pacing",
      colorGrade: "Golden Sunset & Architectural Richness",
    },
    tags: ["Ad Creative", "Bungalow", "Teaser", "Meta Ads"],
  },

  // ─────────────────────────────────────────────────────────────
  // 3. COMMERCIAL ARCHITECTURE & AUTOMOTIVE (Maruti Buildcon & Delivery)
  // ─────────────────────────────────────────────────────────────
  {
    id: "maruti-project-reveal",
    title: "Maruti Buildcon: Modern Commercial Elevation",
    client: "Maruti Buildcon",
    category: "Commercial Architecture",
    categoryBadge: "Commercial Project Reveal",
    tagline:
      "High-energy structural flythroughs and typography revealing prime commercial real estate.",
    description:
      "Engineered for corporate investors and retail businesses. Features 3D-tracked floorplate labels, fast cuts synced to heavy electronic beats, and dramatic low-angle architectural shots.",
    videoSrc: "https://res.cloudinary.com/oct7txvw/video/upload/v1790266960/lucie-creatives/videos/clients/maruti-buildcon/maruti-buildcon-elevation.mp4",
    posterSrc: "https://i.ytimg.com/vi/sEvJ9brA9qo/hqdefault.jpg",
    aspectRatio: "9:16",
    aspectRatioClass: "aspect-[9/16]",
    duration: "0:44",
    durationIso: "PT44S",
    metric: "78%",
    metricLabel: "Commercial Retail Spaces Leased",
    deliverables: [
      "3D Camera tracker typography integration",
      "Precision speed ramps on structural corners",
      "Industrial bass impacts & architectural sound foley",
    ],
    specs: {
      resolution: "1080x1920 Vertical",
      fps: "60 FPS",
      turnaround: "48 Hours",
      pacing: "Dynamic High-Impact Commercial",
      colorGrade: "Clean Corporate Cool & Deep Cyan",
    },
    tags: ["Commercial Real Estate", "Elevation", "Architecture", "Retail"],
    featured: true,
  },
  {
    id: "maruti-site-tour",
    title: "Maruti Buildcon: Prime Commercial Walkthrough",
    client: "Maruti Buildcon",
    category: "Commercial Architecture",
    categoryBadge: "Executive Site Walkthrough",
    tagline:
      "Dynamic tour spotlighting expansive showroom fronts, wide corporate corridors, and modern elevators.",
    description:
      "Demonstrates high vehicular visibility and generous parking accessibility. Structured with clear informational chapters to answer key commercial tenant questions in under 40 seconds.",
    videoSrc: "https://res.cloudinary.com/oct7txvw/video/upload/v1790266968/lucie-creatives/videos/clients/maruti-buildcon/maruti-buildcon-site-tour.mp4",
    posterSrc: "https://i.ytimg.com/vi/hBqJLN1WB7I/hqdefault.jpg",
    aspectRatio: "9:16",
    aspectRatioClass: "aspect-[9/16]",
    duration: "0:39",
    durationIso: "PT39S",
    metric: "180k",
    metricLabel: "Targeted Business Owner Impressions",
    deliverables: [
      "Informational lower-third chapter graphics",
      "Seamless whip-pan transitions between floors",
      "High-clarity ambient building audio mix",
    ],
    specs: {
      resolution: "1080x1920 Vertical",
      fps: "60 FPS",
      turnaround: "48 Hours",
      pacing: "Informative Business Rhythm",
      colorGrade: "Crisp High-Key Commercial Bright",
    },
    tags: ["Site Tour", "Corporate Office", "Showroom", "Commercial"],
  },
  {
    id: "maruti-elevation",
    title: "Maruti Buildcon: Architectural Scale & Facade",
    client: "Maruti Buildcon",
    category: "Commercial Architecture",
    categoryBadge: "Glass Facade Cinema",
    tagline:
      "Hypnotic vertical speed-ramps and reflection tracking across state-of-the-art curtain wall glazing.",
    description:
      "Focuses on modern engineering and energy-efficient double-glazed facades. Positions Maruti Buildcon as the forward-thinking corporate landmark of the district.",
    videoSrc: "https://res.cloudinary.com/oct7txvw/video/upload/v1790266962/lucie-creatives/videos/clients/maruti-buildcon/maruti-buildcon-highlights.mp4",
    posterSrc: "https://i.ytimg.com/vi/u5QoK1nd8n4/hqdefault.jpg",
    aspectRatio: "9:16",
    aspectRatioClass: "aspect-[9/16]",
    duration: "0:32",
    durationIso: "PT32S",
    metric: "+290%",
    metricLabel: "Broker & Investor Inquiries",
    deliverables: [
      "Glass reflection de-glare & polarization balancing",
      "Micro-jitter removal on high-altitude drone shots",
      "Layered metallic whoosh transitions",
    ],
    specs: {
      resolution: "1080x1920 Vertical",
      fps: "60 FPS",
      turnaround: "24 Hours",
      pacing: "Gliding Architectural Pacing",
      colorGrade: "Deep Steel Blue & Warm Concrete Contrast",
    },
    tags: ["Facade", "Glass Architecture", "Drone", "Commercial"],
  },
  {
    id: "maruti-walkthrough",
    title: "Maruti Buildcon: Milestone & Structural Reveal",
    client: "Maruti Buildcon",
    category: "Commercial Architecture",
    categoryBadge: "Milestone & Structural Reveal",
    tagline:
      "Fast-paced milestone reel celebrating construction velocity, structural elevation, and corporate handover.",
    description:
      "Celebrates on-schedule structural completion with time-lapses, fast-paced crane sequences, and bold milestone typography. Generates investor excitement and urgency for remaining floorplates.",
    videoSrc: "https://res.cloudinary.com/oct7txvw/video/upload/v1790266974/lucie-creatives/videos/clients/maruti-buildcon/maruti-buildcon-walkthrough.mp4",
    posterSrc: "https://i.ytimg.com/vi/ylIDuSqZY7o/hqdefault.jpg",
    aspectRatio: "9:16",
    aspectRatioClass: "aspect-[9/16]",
    duration: "0:35",
    durationIso: "PT35S",
    metric: "94%",
    metricLabel: "Investor Sentiment Index",
    deliverables: [
      "Time-lapse stabilization & deflicker",
      "Dynamic countdown and progress metric cards",
      "Punchy beat-matched percussion soundscape",
    ],
    specs: {
      resolution: "1080x1920 Vertical",
      fps: "60 FPS",
      turnaround: "24 Hours",
      pacing: "High-Tempo Milestone Cut",
      colorGrade: "Punchy High-Contrast Industrial Tone",
    },
    tags: ["Construction", "Milestone", "Commercial", "Drone"],
  },

  // ─────────────────────────────────────────────────────────────
  // 4. FOUNDER AUTHORITY (Leaders Diary & Nishant Patel)
  // ─────────────────────────────────────────────────────────────
  {
    id: "leaders-diary-01",
    title: "Leaders Diary: High-Conviction Founder Mindset",
    client: "Leaders Diary",
    category: "Founder Authority",
    categoryBadge: "Founder Podcast Hook",
    tagline:
      "Aggressive hook pacing, kinetic captions, and multi-cam punch-ins engineered to stop the scroll.",
    description:
      "Episode 01 of the Leaders Diary series with Nishant Patel. Engineered for viral business shorts with auto-highlighted bold keywords, subtle zoom-ins on punchlines, and high-impact sound design.",
    videoSrc: "https://res.cloudinary.com/oct7txvw/video/upload/v1790266905/lucie-creatives/videos/clients/leaders-diary/leaders-diary-nishant-patel-01.mp4",
    posterSrc: "https://i.ytimg.com/vi/NajP1LgJ8qo/hqdefault.jpg",
    aspectRatio: "9:16",
    aspectRatioClass: "aspect-[9/16]",
    duration: "0:54",
    durationIso: "PT54S",
    metric: "88%",
    metricLabel: "Average Percentage Viewed (APV)",
    deliverables: [
      "Sub-frame multi-cam cut switching (3 cameras)",
      "Kinetic pop-in captions with custom brand colors",
      "Impact sound risers, whooshes & bell pings",
    ],
    specs: {
      resolution: "1080x1920 Vertical",
      fps: "60 FPS",
      turnaround: "12 Hours",
      pacing: "Rapid Multi-Cam Intercuts",
      colorGrade: "Mood Studio Charcoal & Warm Skin Tones",
    },
    tags: ["Podcast", "Founder Authority", "Nishant Patel", "Viral Reel"],
    featured: true,
  },
  {
    id: "leaders-diary-02",
    title: "Leaders Diary: Scaling Companies Through Ruthless Focus",
    client: "Leaders Diary",
    category: "Founder Authority",
    categoryBadge: "Strategic Insight Cut",
    tagline:
      "Punchy conversational cuts paired with bold typographical emphasis that turn founder insights into viral social currency.",
    description:
      "Focuses on hard-won entrepreneurial lessons. Uses split-second B-roll cutaways and strategic audio ducking to maintain viewer tension through complex business topics.",
    videoSrc: "https://res.cloudinary.com/oct7txvw/video/upload/v1790266910/lucie-creatives/videos/clients/leaders-diary/leaders-diary-nishant-patel-02.mp4",
    posterSrc: "https://i.ytimg.com/vi/rOcovaHFf1k/hqdefault.jpg",
    aspectRatio: "9:16",
    aspectRatioClass: "aspect-[9/16]",
    duration: "0:48",
    durationIso: "PT48S",
    metric: "18.6k",
    metricLabel: "Organic Shares & Bookmarks",
    deliverables: [
      "Dynamic text tracking with emoji accents",
      "Vocal presence EQ & multi-band compression",
      "Contextual cinematic b-roll overlays",
    ],
    specs: {
      resolution: "1080x1920 Vertical",
      fps: "60 FPS",
      turnaround: "12 Hours",
      pacing: "Tight Conversational Rhythm",
      colorGrade: "Deep Studio Contrast & Golden Accent",
    },
    tags: ["Business Growth", "Podcast", "Founder", "Authority"],
  },
  {
    id: "leaders-diary-03",
    title: "Leaders Diary: The Cost of Complacency in Business",
    client: "Leaders Diary",
    category: "Founder Authority",
    categoryBadge: "Contrarian Opinion Hook",
    tagline:
      "High-contrast color grading, dramatic pacing, and tension sound beds for high-retention debate.",
    description:
      "Tackles controversial industry truths with rapid punch-ins and suspenseful musical pacing. Sparked extensive comment debates on LinkedIn and Instagram Reels.",
    videoSrc: "https://res.cloudinary.com/oct7txvw/video/upload/v1790266918/lucie-creatives/videos/clients/leaders-diary/leaders-diary-nishant-patel-03.mp4",
    posterSrc: "https://i.ytimg.com/vi/ibeJ-s5tAAU/hqdefault.jpg",
    aspectRatio: "9:16",
    aspectRatioClass: "aspect-[9/16]",
    duration: "0:46",
    durationIso: "PT46S",
    metric: "4.2k+",
    metricLabel: "Active Comments & Debates Generated",
    deliverables: [
      "Tension-building cinematic drone audio beds",
      "Animated headline cards and split-screen reactions",
      "Rapid-fire punch zoom pattern interrupts",
    ],
    specs: {
      resolution: "1080x1920 Vertical",
      fps: "60 FPS",
      turnaround: "24 Hours",
      pacing: "Tension-Release Debate Flow",
      colorGrade: "High Dramatic Contrast Studio Look",
    },
    tags: ["Leadership", "Contrarian", "Podcast", "Viral"],
  },
  {
    id: "leaders-diary-04",
    title: "Leaders Diary: Architectural Execution Over Theory",
    client: "Leaders Diary",
    category: "Founder Authority",
    categoryBadge: "Tactical Playbook Reel",
    tagline:
      "Rapid delivery and synchronized text highlights dissecting tactical execution for modern enterprise founders.",
    description:
      "Breakdown format where key steps pop onto the screen as they are spoken. Optimized for high bookmark rates as an actionable reference guide for founders.",
    videoSrc: "https://res.cloudinary.com/oct7txvw/video/upload/v1790266929/lucie-creatives/videos/clients/leaders-diary/leaders-diary-nishant-patel-04.mp4",
    posterSrc: "https://i.ytimg.com/vi/LX2WRKtRpFs/hqdefault.jpg",
    aspectRatio: "9:16",
    aspectRatioClass: "aspect-[9/16]",
    duration: "0:51",
    durationIso: "PT51S",
    metric: "22.4k",
    metricLabel: "Saves by Founders & Executives",
    deliverables: [
      "Numbered step-by-step animated badge overlays",
      "Click sound foley on each framework reveal",
      "Dual-angle seamless switch on key takeaways",
    ],
    specs: {
      resolution: "1080x1920 Vertical",
      fps: "60 FPS",
      turnaround: "24 Hours",
      pacing: "Educational Speed-Teaching",
      colorGrade: "Refined Modern Monochrome with Amber Fill",
    },
    tags: ["Execution", "Tactics", "Framework", "Founder"],
  },
  {
    id: "leaders-diary-05",
    title: "Leaders Diary: Building Cultural Gravity in Enterprise",
    client: "Leaders Diary",
    category: "Founder Authority",
    categoryBadge: "Culture & Vision Reel",
    tagline:
      "Clean sonic cues and sharp b-roll cutaways reinforcing institutional leadership and long-term vision.",
    description:
      "An inspirational reflection on company culture and enduring vision. Combines intimate documentary interview lighting with grand orchestral swells for emotional resonance.",
    videoSrc: "https://res.cloudinary.com/oct7txvw/video/upload/v1790266938/lucie-creatives/videos/clients/leaders-diary/leaders-diary-nishant-patel-05.mp4",
    posterSrc: "https://i.ytimg.com/vi/WOmOLSI3OE4/hqdefault.jpg",
    aspectRatio: "9:16",
    aspectRatioClass: "aspect-[9/16]",
    duration: "0:56",
    durationIso: "PT56S",
    metric: "96%",
    metricLabel: "Positive Sentiment Score",
    deliverables: [
      "Emotional orchestral riser and subtle strings",
      "Documentary film grain & warm glow treatment",
      "Kinetic lower-thirds with brand icon animations",
    ],
    specs: {
      resolution: "1080x1920 Vertical",
      fps: "60 FPS",
      turnaround: "24 Hours",
      pacing: "Inspirational Building Arc",
      colorGrade: "Warm Filmic Gold & Rich Blacks",
    },
    tags: ["Culture", "Vision", "Documentary", "Founder Authority"],
  },
  {
    id: "talking-head-retention",
    title: "High-Retention Talking Head: Hook & Pace Mastery",
    client: "Creator Authority Suite",
    category: "Founder Authority",
    categoryBadge: "Retention Editing Master",
    tagline:
      "Precision pacing, sound foley accentuation, and micro-crop framing designed to keep retention flatlined at the top.",
    description:
      "Masterclass in creator video retention. Engineered with split-second punch crops, custom foley accents, and dynamic word-by-word subtitle styling that maximizes algorithmic reach.",
    videoSrc: "https://res.cloudinary.com/oct7txvw/video/upload/v1790266953/lucie-creatives/videos/clients/leaders-diary/leaders-diary-nishant-patel-06.mp4",
    posterSrc: "https://i.ytimg.com/vi/KowcNZgbzuE/hqdefault.jpg",
    aspectRatio: "9:16",
    aspectRatioClass: "aspect-[9/16]",
    duration: "0:42",
    durationIso: "PT42S",
    metric: "91%",
    metricLabel: "Retention at 30-Second Mark",
    deliverables: [
      "Dynamic punch-zoom reframing every 2.5s",
      "Custom kinetic typography with animated glow",
      "Multi-layered sonic punctuation and swooshes",
    ],
    specs: {
      resolution: "1080x1920 Vertical",
      fps: "60 FPS",
      turnaround: "12 Hours",
      pacing: "Sub-Second Micro-Pacing",
      colorGrade: "Crisp Creator High-Key Tone",
    },
    tags: ["Talking Head", "Hook Strategy", "Viral Pacing", "Creator"],
  },

  // ─────────────────────────────────────────────────────────────
  // 5. INTERIOR DESIGN & MATERIALS (Ambica Interior & Prerna Ply)
  // ─────────────────────────────────────────────────────────────
  {
    id: "ambica-luxury-spaces",
    title: "Ambica Interior Gallery: Contemporary Living Sanctuaries",
    client: "Ambica Interior Gallery",
    category: "Interior Design",
    categoryBadge: "Luxury Living Spaces",
    tagline:
      "Seamless match-cuts between bespoke furniture, textured wall finishes, and ambient lighting zones.",
    description:
      "Tailored for high-end residential homeowners and architects. Showcases curated living rooms, dining spaces, and master suites with fluid camera transitions that emphasize spatial harmony.",
    videoSrc: "https://res.cloudinary.com/oct7txvw/video/upload/v1790266871/lucie-creatives/videos/clients/ambica-interior/ambica-interior-luxury-spaces.mp4",
    posterSrc: "https://i.ytimg.com/vi/FfJMUIOFfUw/hqdefault.jpg",
    aspectRatio: "9:16",
    aspectRatioClass: "aspect-[9/16]",
    duration: "0:44",
    durationIso: "PT44S",
    metric: "+310%",
    metricLabel: "Showroom Walk-in Consultation Inquiries",
    deliverables: [
      "Geometric match-cut transitions across rooms",
      "Warm ambient interior lighting color correction",
      "Soft acoustic jazz & lounge soundscape mix",
    ],
    specs: {
      resolution: "1080x1920 Vertical",
      fps: "60 FPS",
      turnaround: "48 Hours",
      pacing: "Silky Match-Cut Glide",
      colorGrade: "Warm Scandinavian & Italian Luxe (3500K)",
    },
    tags: ["Interior Design", "Living Room", "Luxury Furniture", "Spaces"],
    featured: true,
  },
  {
    id: "ambica-gallery-tour",
    title: "Ambica Interior Gallery: Material Precision & Craft",
    client: "Ambica Interior Gallery",
    category: "Interior Design",
    categoryBadge: "Material Craft & Veneers",
    tagline:
      "Macro focus pulls across Italian veneers, brushed brass hardware, and tailored millwork.",
    description:
      "Takes viewers into the tactile details that define bespoke luxury interior architecture. Focuses on seamless joinery, soft-close hardware, and custom acoustic wall paneling.",
    videoSrc: "https://res.cloudinary.com/oct7txvw/video/upload/v1790266853/lucie-creatives/videos/clients/ambica-interior/ambica-interior-gallery-tour.mp4",
    posterSrc: "https://i.ytimg.com/vi/F66vpDy_qQY/hqdefault.jpg",
    aspectRatio: "9:16",
    aspectRatioClass: "aspect-[9/16]",
    duration: "0:37",
    durationIso: "PT37S",
    metric: "14.2k",
    metricLabel: "Architects & Designers Reached",
    deliverables: [
      "Macro lens depth-of-field rack focus tracking",
      "Tactile surface sound design (wood slide, brass tap)",
      "Minimalist architectural typography",
    ],
    specs: {
      resolution: "1080x1920 Vertical",
      fps: "60 FPS",
      turnaround: "48 Hours",
      pacing: "Meditative Craft Exploration",
      colorGrade: "Rich Organic Wood & Metallic Highlights",
    },
    tags: ["Veneers", "Materials", "Craftsmanship", "Interior Architecture"],
  },
  {
    id: "prerna-ply-craft",
    title: "Prerna Ply: Architectural Timber & Grain Artistry",
    client: "Prerna Ply",
    category: "Interior Design",
    categoryBadge: "Material Science & Veneers",
    tagline:
      "Kinetic industrial cuts showcasing premium ply craftsmanship, structural durability, and flawless veneers.",
    description:
      "Transforms raw timber and ply manufacturing into art. Fast-paced beat syncing highlights water-resistant testing, veneer grading, and architectural application in luxury spaces.",
    videoSrc: "https://res.cloudinary.com/oct7txvw/video/upload/v1790266889/lucie-creatives/videos/clients/brand-campaigns/prerna-ply-craftsmanship.mp4",
    posterSrc: "https://i.ytimg.com/vi/HR1MVP8i9nI/hqdefault.jpg",
    aspectRatio: "9:16",
    aspectRatioClass: "aspect-[9/16]",
    duration: "0:36",
    durationIso: "PT36S",
    metric: "88%",
    metricLabel: "Dealer Network Retention & Ad Recall",
    deliverables: [
      "Industrial precision sound design and wood saw foley",
      "Macro grain texture sharpness enhancement",
      "Dynamic split-screen durability test sequences",
    ],
    specs: {
      resolution: "1080x1920 Vertical",
      fps: "60 FPS",
      turnaround: "48 Hours",
      pacing: "Industrial Beat-Matched Rhythm",
      colorGrade: "Deep Warm Timber & Industrial Amber",
    },
    tags: ["Timber", "Ply", "Veneer", "Material Craft", "Manufacturing"],
  },

  // ─────────────────────────────────────────────────────────────
  // 6. BRAND CAMPAIGNS & D2C (Fashion, Education, Agency & UGC)
  // ─────────────────────────────────────────────────────────────
  {
    id: "carnival-lookbook",
    title: "Carnival Clothing: Urban Streetwear Kinetic Drop",
    client: "Carnival Clothing",
    category: "Brand Campaigns & D2C",
    categoryBadge: "Streetwear Drop Campaign",
    tagline:
      "Beat-matched jump cuts, glitch transitions, and vibrant street aesthetics engineered to maximize drops.",
    description:
      "Designed for a Gen-Z apparel drop. Uses flash transitions, kinetic typography, and heavy bass hits to create urgency, resulting in a sold-out capsule drop within 4 hours.",
    videoSrc: "https://res.cloudinary.com/oct7txvw/video/upload/v1790266818/lucie-creatives/videos/clients/brand-campaigns/carnival-clothing-lookbook.mp4",
    posterSrc: "https://i.ytimg.com/vi/5Dk-d1fmv3U/hqdefault.jpg",
    aspectRatio: "9:16",
    aspectRatioClass: "aspect-[9/16]",
    duration: "0:29",
    durationIso: "PT29S",
    metric: "4 Hours",
    metricLabel: "Capsule Collection Sold Out Time",
    deliverables: [
      "Glitch and CRT television overlay effects",
      "Trap beat sync and sub-bass drop accents",
      "High-velocity typography drop countdowns",
    ],
    specs: {
      resolution: "1080x1920 Vertical",
      fps: "60 FPS",
      turnaround: "24 Hours",
      pacing: "Hyper-Fast Streetwear Cut",
      colorGrade: "High Saturation Neon & Gritty Urban Shadow",
    },
    tags: ["Streetwear", "Fashion", "Apparel", "Gen-Z", "Drop Reel"],
    featured: true,
  },
  {
    id: "carnival-style",
    title: "Carnival Clothing: High-Energy Seasonal Lookbook",
    client: "Carnival Clothing",
    category: "Brand Campaigns & D2C",
    categoryBadge: "Street Style Video Lookbook",
    tagline:
      "Dynamic speed-ramping and raw street energy capturing modern apparel styling and bold color expressions.",
    description:
      "Elevates everyday street wear into runway drama. Shot on city rooftops and gritty alleys, edited with seamless match-cuts that spotlight fit, fabric, and styling versatility.",
    videoSrc: "https://res.cloudinary.com/oct7txvw/video/upload/v1790266887/lucie-creatives/videos/clients/brand-campaigns/carnival-clothing-style.mp4",
    posterSrc: "https://i.ytimg.com/vi/3b-kVgYMgjg/hqdefault.jpg",
    aspectRatio: "9:16",
    aspectRatioClass: "aspect-[9/16]",
    duration: "0:33",
    durationIso: "PT33S",
    metric: "+480%",
    metricLabel: "Direct Link-in-Bio E-Commerce Clicks",
    deliverables: [
      "Motion-blur whip zooms between outfit changes",
      "Fabric texture macro detail popups",
      "Dynamic hip-hop audio edit and foley enhancements",
    ],
    specs: {
      resolution: "1080x1920 Vertical",
      fps: "60 FPS",
      turnaround: "24 Hours",
      pacing: "Fast-Paced Style Ramping",
      colorGrade: "Vibrant Punchy Urban Film Look",
    },
    tags: ["Style Lookbook", "D2C Fashion", "Apparel", "E-Commerce"],
  },
  {
    id: "abhimanyu-campus",
    title: "Abhimanyu Academy: Dynamic Campus Life & Athletics",
    client: "Abhimanyu Academy Modasa",
    category: "Brand Campaigns & D2C",
    categoryBadge: "Campus Sports & Life Reel",
    tagline:
      "High-speed sports action, campus camaraderie, and vibrant student life cut to motivating music.",
    description:
      "Positions Abhimanyu Academy as North Gujarat's premier holistic sports and academic institution. Features rapid-fire football, cricket, and classroom sequences that inspire students and parents alike.",
    videoSrc: "https://res.cloudinary.com/oct7txvw/video/upload/v1790266883/lucie-creatives/videos/clients/brand-campaigns/abhimanyu-academy-campus.mp4",
    posterSrc: "https://i.ytimg.com/vi/sim1ak4J68Q/hqdefault.jpg",
    aspectRatio: "9:16",
    aspectRatioClass: "aspect-[9/16]",
    duration: "0:41",
    durationIso: "PT41S",
    metric: "+260%",
    metricLabel: "Annual Admission Inquiries Increase",
    deliverables: [
      "High-frame-rate sports slow-mo stabilization",
      "Student achievement metric callout animations",
      "Heartbeat percussion and uplifting orchestral riser",
    ],
    specs: {
      resolution: "1080x1920 Vertical",
      fps: "60 FPS",
      turnaround: "48 Hours",
      pacing: "Uplifting High-Energy Arc",
      colorGrade: "Sunny Vivid Campus Greens & Energetic Warmth",
    },
    tags: ["Education", "Campus Life", "Sports Academy", "School Reel"],
  },
  {
    id: "abhimanyu-admissions",
    title: "Abhimanyu Academy: Academic Excellence & Admissions",
    client: "Abhimanyu Academy Modasa",
    category: "Brand Campaigns & D2C",
    categoryBadge: "Admissions Campaign Reel",
    tagline:
      "Strategic campaign reel showcasing digital classrooms, laboratories, and merit scholarship winners.",
    description:
      "Crafted for parent conversion during the competitive admission cycle. Features crisp interviews with educators, laboratory experiments, and proud student award ceremonies.",
    videoSrc: "https://res.cloudinary.com/oct7txvw/video/upload/v1790266877/lucie-creatives/videos/clients/brand-campaigns/abhimanyu-academy-admissions.mp4",
    posterSrc: "https://i.ytimg.com/vi/CdsAmzGIhm4/hqdefault.jpg",
    aspectRatio: "9:16",
    aspectRatioClass: "aspect-[9/16]",
    duration: "0:45",
    durationIso: "PT45S",
    metric: "98%",
    metricLabel: "Parent Trust Rating in Regional Surveys",
    deliverables: [
      "Clear informational infographics on admission dates",
      "Teacher interview speech enhancement & noise reduction",
      "Warm, trustworthy acoustic guitar and piano bed",
    ],
    specs: {
      resolution: "1080x1920 Vertical",
      fps: "60 FPS",
      turnaround: "48 Hours",
      pacing: "Inspiring Educational Story",
      colorGrade: "Clean High-Trust Natural Daylight",
    },
    tags: ["Admissions", "Academic", "Classrooms", "Education"],
  },
  {
    id: "the-karm-digital",
    title: "The Karm Digital: Modern Tech Agency Culture",
    client: "The Karm Digital",
    category: "Brand Campaigns & D2C",
    categoryBadge: "Digital Growth & Agency Culture",
    tagline:
      "Futuristic fast-paced reel spotlighting analytics dashboards, team synergy, and aggressive digital scale.",
    description:
      "High-tech brand reel communicating marketing muscle and technical expertise. Built with cybernetic motion design elements, speed ramps across dual-monitor workspaces, and bold metrics.",
    videoSrc: "https://res.cloudinary.com/oct7txvw/video/upload/v1790266895/lucie-creatives/videos/clients/brand-campaigns/the-karm-digital-growth.mp4",
    posterSrc: "https://i.ytimg.com/vi/1wDwupQgP9A/hqdefault.jpg",
    aspectRatio: "9:16",
    aspectRatioClass: "aspect-[9/16]",
    duration: "0:30",
    durationIso: "PT30S",
    metric: "4.8x",
    metricLabel: "Website Discovery CTR",
    deliverables: [
      "Neon cyber typography and glitched transitions",
      "Synthesized bass drops and digital audio risers",
      "Sub-1s hook sequence for founder attention",
    ],
    specs: {
      resolution: "1080x1920 Vertical",
      fps: "60 FPS",
      turnaround: "24 Hours",
      pacing: "Glitch-Hop Cyber Pacing",
      colorGrade: "Deep Cyberpunk Neon & High Black Levels",
    },
    tags: ["Digital Marketing", "Agency Reel", "Tech Cyberpunk"],
  },
  {
    id: "cinematic-story-b-roll",
    title: "Cinematic Narrative: Texture, Light & Atmosphere",
    client: "Lucie Cinema Atelier",
    category: "Brand Campaigns & D2C",
    categoryBadge: "Cinematic Visual Narrative",
    tagline:
      "Atmospheric visual storytelling built on filmic grain, delicate camera motion, and deep color contrast.",
    description:
      "A showcase of Lucie Creatives' cinematic b-roll philosophy. Every frame is engineered with filmic texture, intentional pacing, and emotive soundscapes that transform commercial products into lifestyle poetry.",
    videoSrc: "https://res.cloudinary.com/oct7txvw/video/upload/v1790267074/lucie-creatives/videos/Story_B-Roll.mp4",
    posterSrc: "https://i.ytimg.com/vi/WfqOLmRv8Bg/hqdefault.jpg",
    aspectRatio: "9:16",
    aspectRatioClass: "aspect-[9/16]",
    duration: "0:35",
    durationIso: "PT35S",
    metric: "95%",
    metricLabel: "Viewer Immersion & Visual Hold",
    deliverables: [
      "Analog 35mm film grain emulation and halation",
      "Atmospheric ambient foley and textural tone",
      "Dynamic speed ramping with organic frame pacing",
    ],
    specs: {
      resolution: "1080x1920 Vertical",
      fps: "60 FPS",
      turnaround: "48 Hours",
      pacing: "Filmic Visual Poetry",
      colorGrade: "Subtle Kodachrome Cinema Palette",
    },
    tags: ["Cinematic", "B-Roll", "Storytelling", "Film Texture"],
  },
];

/**
 * Generate Google-compliant Schema.org VideoObject JSON-LD markup
 * for rich search snippets and video carousel ranking.
 */
export function generateVideoSchema(
  videos: ClientVideoItem[] = CLIENT_VIDEOS,
  siteUrl = "https://luciecreatives.in"
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Lucie Creatives Client Video Production Showcase",
    description:
      "Curated commercial portfolio of high-retention video editing, 4K brand commercials, and viral Instagram reels produced by Lucie Creatives.",
    itemListElement: videos.map((video, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "VideoObject",
        name: video.title,
        description: video.description,
        thumbnailUrl: [
          video.posterSrc || `${siteUrl}https://res.cloudinary.com/oct7txvw/image/upload/v1789835212/lucie-creatives/brand/hero-og.webp`,
          `${siteUrl}https://res.cloudinary.com/oct7txvw/image/upload/v1789835298/lucie-creatives/portfolio/graphic-design/nirva-club/hero-main-hoarding.webp`,
        ],
        uploadDate: "2026-03-01T00:00:00Z",
        duration: video.durationIso,
        contentUrl: video.videoSrc,
        embedUrl: video.videoSrc,
        publisher: {
          "@type": "Organization",
          name: "Lucie Creatives",
          url: siteUrl,
          logo: {
            "@type": "ImageObject",
            url: `${siteUrl}/brand/lucie-logo.webp`,
          },
        },
      },
    })),
  };
}
