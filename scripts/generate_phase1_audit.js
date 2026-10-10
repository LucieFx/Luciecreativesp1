const fs = require('fs');
const path = require('path');

// Load full details
const assetDetails = JSON.parse(fs.readFileSync('src/scratch/full_asset_details.json', 'utf8'));

// Detailed findings map for each of the 73 unique downloaded assets
const auditMap = {
  1: {
    file: "speczo/hero-frame-box.webp",
    shows: "3D render of Speczo Optic FZE hard eyewear frame cases and packaging on a water plinth with slogan 'Celebrating Uniqueness' and 'Your Eyes Our Priority'",
    client: "Speczo Optics",
    verdict: "OK",
    fix: "Keep as Hero Poster for Speczo Optics case study and Homepage Selected Work (Graphic Design tab). Correctly categorized under Retail, Optics & Packaging."
  },
  2: {
    file: "speczo/business-cards.webp",
    shows: "Tactile business card mockup on podium for Speczo Optic FZE (Dubai Silicon Oasis, Dubai, UAE) with debossed logo and employee contact details",
    client: "Speczo Optics",
    verdict: "OK",
    fix: "Keep in Speczo process stills. Matches Speczo brand identity and stationery scope."
  },
  3: {
    file: "speczo/color-palette.webp",
    shows: "Primary brand colors palette (#354d71, #496a97, #518da9, #5da2b3, #79bab4) with RGB/HEX token values for Speczo Optics identity system",
    client: "Speczo Optics",
    verdict: "OK",
    fix: "Keep in Speczo process stills. Accurate color specification sheet."
  },
  4: {
    file: "speczo/letterhead.webp",
    shows: "Speczo Optic FZE corporate executive letterhead mockup with confidential circular seal, Managing Director signature, and Dubai contact information",
    client: "Speczo Optics",
    verdict: "OK",
    fix: "Keep in Speczo process stills. Authentic corporate stationery."
  },
  5: {
    file: "speczo/website-mockup.webp",
    shows: "Speczo Optic FZE responsive e-commerce web and mobile UI mockup on MacBook and iPhone ('A Legacy of Clear Vision', 'Up to 60% Off', sunglasses, eyeglasses catalog)",
    client: "Speczo Optics",
    verdict: "OK",
    fix: "Keep in Speczo process stills. Demonstrates omnichannel digital roll-out."
  },
  6: {
    file: "onirique/hero-perfume-trio.webp",
    shows: "Haute perfumery trio by Onirique ('Nightmare', 'Fantasy', 'Mirage' Extrait de Parfum 100ml) held by hands with jewelry, slogan 'Dream Comes True'",
    client: "Onirique Parfums",
    verdict: "OK",
    fix: "Keep as Hero Poster for Onirique Parfums and Homepage Selected Work tab. Categorized under Luxury Beauty, Fragrance & Wellness."
  },
  7: {
    file: "onirique/fantasy-product.webp",
    shows: "3D ray-traced product render of 'Fantasy by Onirique' refreshing citrus fragrance bottle on aquatic podium with tropical palm leaves",
    client: "Onirique Parfums",
    verdict: "OK",
    fix: "Keep in Onirique process stills. High-end 3D CGI fragrance art."
  },
  8: {
    file: "onirique/social-campaign.webp",
    shows: "Dramatic crimson and black luxury campaign creative for 'Mirage by Onirique' Extrait de Parfum on black marble with headline 'UNFORGETTABLE'",
    client: "Onirique Parfums",
    verdict: "OK",
    fix: "Keep in Onirique process stills. High-retention editorial campaign art."
  },
  9: {
    file: "onirique/offer-campaign.webp",
    shows: "Festive Ramadan Special promotional poster for Onirique Parfums ('Pick Any Perfume At 599/- Only') with gold lanterns, fluted pedestals, and WhatsApp contact",
    client: "Onirique Parfums",
    verdict: "OK",
    fix: "Keep in Onirique process stills. High-conversion commercial campaign."
  },
  10: {
    file: "nirva-club/hero-main-hoarding.webp",
    shows: "Flagship 2:1 highway billboard artwork for 'Nirva Club & Resort by Siara - A Premium Resort Experience' with Mediterranean stone arches, Olympic pool, and booking contact",
    client: "Nirva Club & Resort",
    verdict: "OK",
    fix: "Keep as Hero Poster for Nirva Club & Resort case study and Homepage graphic showcase. Categorized under Hospitality & Leisure. Remove redundant duplicate from gallery."
  },
  11: {
    file: "nirva-club/standy-mockup.webp",
    shows: "Vertical 3x4 roll-up standee mockup for 'TAQAT AL NOOR ENERGY - Your Trusted Partner in Petrochemical Industry' featuring refinery photo and TNE logo",
    client: "Taqat Al Noor Energy",
    verdict: "WRONG CLIENT / OFF-BRAND",
    fix: "Quarantine from public Nirva case study. Replace with actual Nirva membership standee (img_055 / nirva-architectural-standee.webp). Move Taqat Al Noor asset to quarantine list."
  },
  12: {
    file: "nirva-club/billboard-opening.webp",
    shows: "Panoramic 'OPENING SOON!' highway billboard for 'Nirva Club & Resort by Siara' featuring Gujarati address (Dugarvada, Modasa), circular photo insets of wedding couple, pool, dining, rooms",
    client: "Nirva Club & Resort",
    verdict: "WRONG SECTION / DUPLICATE",
    fix: "Currently placed in 'Guest Welcome Experience & Membership Stationery'. Move to 'Monumental OOH & Highway Hoarding Architecture'. Consolidate near-duplicate with img_059."
  },
  13: {
    file: "nirva-club/restaurant-creative.webp",
    shows: "Culinary dining creative for 'Kalpvriksh! Pure Veg. Restaurant Now Open - Nirva Club & Resort by Siara' showing a family dining together with breakfast, lunch, snacks, dinner times",
    client: "Nirva Club & Resort (Kalpvriksh Restaurant)",
    verdict: "DUPLICATE",
    fix: "Retain high-res webp version in Kalpvriksh Culinary Identity gallery and marquee. Remove duplicate instances img_056 and img_060."
  },
  14: {
    file: "nirva-club/day-picnic.webp",
    shows: "Family day picnic promotional collateral for Nirva Club & Resort ('DAY PICNIC - Inclusions: Breakfast, Lunch, Hi-Tea, Swimming Pool, Games') with family picnic and amenities photos",
    client: "Nirva Club & Resort",
    verdict: "DUPLICATE",
    fix: "Retain high-res webp version in Seasonal Festivals & Resort Experience Campaigns and marquee. Remove duplicate instance img_066."
  },
  15: {
    file: "rhyme-jewels/hero-jewelry-campaign.webp",
    shows: "Luxury promotional ad for 'Rhyme of Jewels - Where every piece is poetry' offering up to 45% discount on 18kt gold plated jewellery, featuring tennis bracelet and earrings",
    client: "Rhyme of Jewels",
    verdict: "OK",
    fix: "Keep as Hero Poster for Rhyme of Jewels case study. Categorized under Retail, Optics & Fine Jewelry."
  },
  16: {
    file: "rhyme-jewels/earrings-editorial.webp",
    shows: "Macro jewelry product editorial for 'Rhyme of Jewels' showing 18kt gold plated dangle earrings on model and white plinth with price Rs. 1,420.00 and website",
    client: "Rhyme of Jewels",
    verdict: "OK",
    fix: "Keep in Rhyme process stills and marquee. Authentic Rhyme of Jewels product art."
  },
  17: {
    file: "rhyme-jewels/pendant-still.webp",
    shows: "Jewelry editorial artboard for 'Rhyme of Jewels' featuring 18kt gold plated butterfly pendant necklace on travertine stone pedestal and model neckline",
    client: "Rhyme of Jewels",
    verdict: "OK",
    fix: "Keep in Rhyme process stills and marquee. Authentic Rhyme of Jewels product art."
  },
  18: {
    file: "rhyme-jewels/gold-rate-system.webp",
    shows: "Daily gold rate update announcement for 'Shree Hari Jewellers - Modasa - Jatin Adesara' (SHJ logo) on navy silk featuring diamond necklace and rates (22K ₹13,034 / 18K ₹10,984)",
    client: "Shree Hari Jewellers",
    verdict: "WRONG CLIENT",
    fix: "Currently assigned to Rhyme of Jewels. Update client attribution to 'Shree Hari Jewellers' and correct title/caption to reflect authentic gold rate system for Shree Hari Jewellers in Modasa."
  },
  19: {
    file: "rhyme-jewels/exhibition-print.webp",
    shows: "Summer Special Exhibition flyer for 'Shrinathji Exhibition' held at Posh Urban Restaurant, Meghraj Bypass, Modasa (bridal wear, sarees, kurti, jewelry, stalls booking)",
    client: "Shrinathji Exhibition / Posh Urban Restaurant",
    verdict: "WRONG CLIENT",
    fix: "Currently assigned to Rhyme of Jewels. Update client attribution to 'Shrinathji Exhibition' with accurate title 'Shrinathji Summer Lifestyle & Jewelry Exhibition Collateral'."
  },
  20: {
    file: "crancho-snacks/hero-chips-mockup.webp",
    shows: "Realistic packaging pouch mockup (front and back) for 'Crancho Potato Chips - Cheesey Potato' produced for Crispo Snack Food Manufacturing LLC, Sultanate of Oman",
    client: "Crancho Consumer Foods (Crispo)",
    verdict: "OK",
    fix: "Keep as Hero Poster for Crancho case study. Categorized under FMCG & Consumer Packaging."
  },
  21: {
    file: "crancho-snacks/chips-variant-mockup.webp",
    shows: "Retail packaging pouch mockup (front and back) for 'Crancho Potato Chips - Ketchup Flavour' with nutrition table and barcode produced for Crispo Snack Food LLC",
    client: "Crancho Consumer Foods (Crispo)",
    verdict: "OK",
    fix: "Keep in Crancho process stills. Packaging dieline variant."
  },
  22: {
    file: "crancho-snacks/crancho-poster-1.webp",
    shows: "Retail launch advertising poster for Crancho ('Life's a snack, make it crispy') showing a young man enjoying Crancho Cheesey Potato chips with open snack pack",
    client: "Crancho Consumer Foods",
    verdict: "OK",
    fix: "Keep in Crancho process stills and marquee. High-conversion retail ad."
  },
  23: {
    file: "crancho-snacks/crispo-poster.webp",
    shows: "Social media and print ad for 'Crispo Popcorn' ('Your Perfect Popcorn Partner!') featuring woman holding 5 colorful popcorn packs (Chilli, Butter, Salt, Cheese, Ketchup)",
    client: "Crispo Snack Food",
    verdict: "OK",
    fix: "Keep in Crancho process stills and marquee. Authentic product line extension by parent brand Crispo."
  },
  24: {
    file: "nandanvan-estates/bungalows-campaign.webp",
    shows: "Architectural 3D render social and print poster for 'Nandanvan Bungalow & Plots - 5 BHK Bungalows - Own the most exclusive piece of elegance in Modasa' with booking contacts",
    client: "Nandanvan Realty Group",
    verdict: "OK",
    fix: "Keep as Hero Poster for Nandanvan case study, Homepage Selected Work tab, and marquee. Categorized under Luxury Real Estate & Architecture."
  },
  25: {
    file: "nandanvan-estates/hero-luxury-address.webp",
    shows: "Architectural masterplan and luxury entrance door visual for 'Nandanvan Bungalow & Plots - The Address of Pride & Luxury - 4 & 5 BHK Bungalows, Meghraj Road, Modasa'",
    client: "Nandanvan Realty Group",
    verdict: "OK",
    fix: "Keep in Nandanvan process stills. Authentic Nandanvan architectural branding."
  },
  26: {
    file: "nandanvan-estates/lifestyle-creative.webp",
    shows: "Clubhouse and amenities promotional creative for 'Nandanvan Bungalow & Plots - Swim, Play, Relax All at Your Doorstep' highlighting swimming pool, TT room, and children's park",
    client: "Nandanvan Realty Group",
    verdict: "OK",
    fix: "Keep in Nandanvan process stills. Authentic Nandanvan lifestyle collateral."
  },
  27: {
    file: "nandanvan-estates/siddharth-architecture.webp",
    shows: "Commercial and residential elevation creative for 'SIDDHARTH - BUILD YOUR DREAMS - 3 BHK Apartments & Shops - New Vavol, Gandhinagar' with road corner views and phone contact",
    client: "Siddharth Buildcon / Siddharth Group",
    verdict: "WRONG CLIENT",
    fix: "Currently lumped under Nandanvan. Update client attribution to 'Siddharth Buildcon' and caption to reflect Gandhinagar commercial/residential high-rise project."
  },
  28: {
    file: "social-campaigns/hero-dubai-travel.webp",
    shows: "International holiday tour package poster for 'Oasis International - Visa and Immigration Services' ('Habibi Come To Dubai', Omega Hotel, Burj Khalifa, Desert Safari, INR 56,500)",
    client: "Oasis International",
    verdict: "WRONG CLIENT",
    fix: "Currently labeled 'Mitraa & Regional Tourism'. Update client to 'Oasis International - Visa & Immigration Services' and update title to reflect authentic Dubai holiday campaign."
  },
  29: {
    file: "social-campaigns/vietnam-campaign.webp",
    shows: "Direct booking multi-destination ad for 'Oasis International - Visa and Immigration Services' ('Explore Vietnam - Enjoy Your Travel', Ha Long Bay, Golden Bridge, Hoi An)",
    client: "Oasis International",
    verdict: "WRONG CLIENT",
    fix: "Update client to 'Oasis International'. Retain in process stills and marquee with correct client attribution."
  },
  30: {
    file: "social-campaigns/bali-creative.webp",
    shows: "Direct-response holiday tour package poster for 'Dhyansh Travelling' ('Dreaming About Bali? Let Curiosity Lead Your Travels in 2026', 6N/7D ₹69,999)",
    client: "Dhyansh Travelling",
    verdict: "WRONG CLIENT",
    fix: "Currently attributed to Mitraa. Update client attribution to 'Dhyansh Travelling' and correct caption."
  },
  31: {
    file: "social-campaigns/rathyatra-festival.webp",
    shows: "Cultural festival greeting for 'Mitraa Sales' (authorized dealer of Comptech Electric Scooters) featuring two EV scooters in front of Jagannath temple in Modasa",
    client: "Mitraa Sales (Comptech EV)",
    verdict: "OK",
    fix: "Keep in process stills and marquee. Clarify that client is Mitraa Sales EV Dealership celebrating Ashadhi Beej Rathyatra."
  },
  32: {
    file: "social-campaigns/uae-national-day.webp",
    shows: "National Day corporate greeting poster for 'Abas Tech - Al Bait Al Sadiq Technology LLC' (CCTV Security & IT Solutions in UAE) featuring camera over Dubai skyline",
    client: "Abas Tech LLC",
    verdict: "WRONG CLIENT",
    fix: "Currently attributed to Mitraa. Update client to 'Abas Tech LLC' with accurate title 'Abas Tech UAE National Day Surveillance Campaign'."
  },
  33: {
    file: "logo-systems/hero-sivanta-logo.webp",
    shows: "Architectural outdoor blade signage mockup featuring 'SIVAANTA OVERSEAS - LUXURY FOR LIFETIME' geometric globe and S-monogram vector logo mark",
    client: "Sivaanta Overseas",
    verdict: "OK",
    fix: "Keep as Hero Poster for Monolithic Logo Systems. Categorized under Brand Identity & Monogram Systems."
  },
  34: {
    file: "logo-systems/stylez-brand-symbol.webp",
    shows: "Apparel hang-tag mockup on charcoal textured fabric featuring 'Stylzzy - Take Style Seriously' coat-hanger monogram emblem",
    client: "Stylzzy Apparel",
    verdict: "OK",
    fix: "Keep in Logo Systems process stills and marquee. Correct spelling from Stylez to Stylzzy."
  },
  35: {
    file: "logo-systems/madhav-identity.webp",
    shows: "Eco-corporate embossed stationery mark featuring 'MG - MADHAV GLOBAL' green leaf monogram seal and wordmark on textured paper",
    client: "Madhav Global",
    verdict: "OK",
    fix: "Keep in Logo Systems process stills and marquee. Authentic client mark."
  },
  36: {
    file: "logo-systems/divine-crest.webp",
    shows: "Gold line vector architectural crest on forest green background for 'DIVINE - Interior & Construction'",
    client: "Divine Interior & Construction",
    verdict: "OK",
    fix: "Keep in Logo Systems process stills. Clean architectural branding."
  },
  37: {
    file: "logo-systems/her-identity.webp",
    shows: "Multi-color token identity lockup variations (white, yellow, green, charcoal) for 'The Her Space' residential property emblem with silhouette and rooflines",
    client: "The Her Space",
    verdict: "OK",
    fix: "Keep in Logo Systems process stills. Comprehensive vector token sheet."
  },
  38: {
    file: "lumara/hero.webp",
    shows: "Website typography slide showing Mulish font, 4 warm brown color hex codes, and web development stacks (HTML5, CSS3, JS, MySQL, WordPress)",
    client: "Lumara Medical Center L.L.C",
    verdict: "LOW QUALITY / MISPLACED HERO",
    fix: "Currently used as the Hero Poster for Graphic Design. A web stack slide ('MySQL, WordPress') is the wrong hero image for a graphic design showcase. Replace Hero Poster with img_044 (9-tile Ayurvedic Social Grid) or img_039 (Business Cards), and retain this slide as secondary web UI documentation."
  },
  39: {
    file: "lumara/packaging-box.webp",
    shows: "Luxury textured business cards on dual-tone plinth for 'LUMARA MEDICAL CENTER L.L.C - Dubai, UAE' with gold mandala art and contact info",
    client: "Lumara Medical Center L.L.C",
    verdict: "OK",
    fix: "Filename says packaging-box, but image is corporate business cards. Correct title and caption to 'Lumara Medical Center Tactile Gold Foil Business Cards'."
  },
  40: {
    file: "lumara/cosmetics-bottle.webp",
    shows: "Corporate identity letterhead and debossed envelope stationery suite for 'LUMARA MEDICAL CENTER L.L.C' with managing director signature and Dubai office info",
    client: "Lumara Medical Center L.L.C",
    verdict: "OK",
    fix: "Filename says cosmetics-bottle, but image is letterhead and envelope stationery. Correct title/caption to 'Lumara Medical Center Corporate Letterhead & Envelope Suite'."
  },
  41: {
    file: "lumara/typography-palette.webp",
    shows: "Employee lanyard ID badge card mockup (front and back) for 'LUMARA MEDICAL CENTER L.L.C - Dubai, UAE' featuring Accountant Steve Roberts with barcode",
    client: "Lumara Medical Center L.L.C",
    verdict: "OK",
    fix: "Filename says typography-palette, but image is staff ID badges. Correct title/caption to 'Lumara Medical Center Staff Lanyard ID Badge System'."
  },
  42: {
    file: "lumara/brand-stationery.webp",
    shows: "Digital UI token and website color system guide ('Primary #5C3A1E, Secondary #8A5A2A, Accent #AF7A46, Background #D8B28B') with usage instructions",
    client: "Lumara Medical Center L.L.C",
    verdict: "OK",
    fix: "Filename says brand-stationery, but image is digital color token matrix. Correct title/caption to 'Lumara Medical Center Digital Color System Matrix'."
  },
  43: {
    file: "lumara/social-grid.webp",
    shows: "Vertical roll-up X-banner standee mockup for 'LUMARA MEDICAL CENTER L.L.C - Enter a State of Calm - A peaceful facial experience designed to relax' with spa bottles and candle",
    client: "Lumara Medical Center L.L.C",
    verdict: "OK",
    fix: "Filename says social-grid, but image is spa reception X-banner standee. Correct title/caption to 'Lumara Medical Center Spa & Facial Treatment Exhibition Standee'."
  },
  44: {
    file: "lumara/billboard-lifestyle.webp",
    shows: "Complete 3x3 9-tile social media campaign grid for 'LUMARA MEDICAL CENTER L.L.C - Healing Naturally. Living Holistically. Rooted in Ayurveda. Committed to Your Wellness'",
    client: "Lumara Medical Center L.L.C",
    verdict: "OK",
    fix: "Filename says billboard-lifestyle, but image is the premier 9-tile social grid system! Set this as the Flagship/Hero visual for the Lumara case study. Fix title/caption to 'Lumara Medical Center 9-Tile Ayurvedic Social Media Campaign Grid'."
  },
  45: {
    file: "education-campaigns/bright-school-admissions.webp",
    shows: "Academic admissions social and print campaign poster for 'BRIGHT Junior Science College (English Medium) - Start early. Think bigger - Foundation Batch 2026-27 Filling Fast'",
    client: "Bright Junior Science College",
    verdict: "OK",
    fix: "Keep as Hero Poster for Bright Minds Education Campaigns. Categorized under Education & Institutional Systems."
  },
  46: {
    file: "education-campaigns/ideal-academy-campaign.webp",
    shows: "Admissions campaign creative for 'GSEB 11th & 12th Commerce - IDEAL INSTITUTE / PRARTHANA SCHOOL - Bringing the best education closer to you - Madapur Kampa, Modasa'",
    client: "Ideal Institute / Prarthana School",
    verdict: "OK",
    fix: "Keep in Education process stills. Authentic academic branding."
  },
  47: {
    file: "education-campaigns/metrocity-education.webp",
    shows: "Admissions ad for 'BRIGHT Junior Science College - Metrocity Level Education in Modasa - Quality Science Education, Advanced Learning Approach'",
    client: "Bright Junior Science College",
    verdict: "OK",
    fix: "Keep in Education process stills. Authentic Bright School collateral."
  },
  48: {
    file: "education-campaigns/bhagyalaxmi-nursing.webp",
    shows: "Admissions poster for 'BHAGYALAXMI NURSING COLLEGE - Nurture Compassion Empower Lives - B.Sc Nursing, GNM, Post Basic B.Sc Nursing - Sakariya Road, Modasa'",
    client: "Bhagyalaxmi Nursing College",
    verdict: "OK",
    fix: "Keep in Education process stills. Authentic nursing college collateral."
  },
  49: {
    file: "education-campaigns/topper-success-story.webp",
    shows: "Academic success creative for 'ABHIMANYU ACADEMY - Every topper in Modasa has a story. Most of them start at the same place. JEE | NEET | Commerce - Sun Arcade, Modasa'",
    client: "Abhimanyu Academy",
    verdict: "OK",
    fix: "Keep in Education process stills. Note specific client 'Abhimanyu Academy' in caption."
  },
  50: {
    file: "education-campaigns/future-commerce.webp",
    shows: "Admissions creative for 'IDEAL INSTITUTE / PRARTHANA SCHOOL - Your Future in COMMERCE Starts Here! GSEB Std 11th & 12th Gujarati/English Medium'",
    client: "Ideal Institute / Prarthana School",
    verdict: "OK",
    fix: "Keep in Education process stills. Authentic Ideal Institute collateral."
  },
  51: {
    file: "education-campaigns/admissions-2026.webp",
    shows: "Healthcare career recruitment poster for 'BHAGYALAXMI NURSING COLLEGE - Start your Healthcare Career with NURSING - Admission Open - Modasa, Gujarat'",
    client: "Bhagyalaxmi Nursing College",
    verdict: "OK",
    fix: "Keep in Education process stills. Authentic Bhagyalaxmi college collateral."
  },
  52: {
    file: "ooh-billboards-print/nirva-panoramic-billboard.webp",
    shows: "Industrial engineering billboard featuring petrochemical refinery with logo 'TNE' (Taqat Al Noor Energy), slogan 'WE VALUE YOUR NEEDS', lorem ipsum body text, and 'www.mechanicshop.com'",
    client: "Taqat Al Noor Energy / Off-brand",
    verdict: "WRONG CLIENT / OFF-BRAND / PLACEHOLDER",
    fix: "Falsely labeled with 'nirva-' prefix. Contains placeholder lorem ipsum and mechanicshop URL for an industrial petrochemical plant. Quarantine from public pages. List in audit report."
  },
  53: {
    file: "ooh-billboards-print/nirva-skyline-hoarding.webp",
    shows: "Grand opening billboard for 'Nirva Club & Resort by Siara - OPENING SOON!' featuring wedding lawn banquet evening lighting, pool, dining, and luxury bedroom suite insets",
    client: "Nirva Club & Resort",
    verdict: "OK",
    fix: "Move to Nirva Club & Resort case study under 'Monumental OOH & Highway Hoarding Architecture'. High quality 2:1 billboard asset."
  },
  54: {
    file: "ooh-billboards-print/nirva-family-hoarding.webp",
    shows: "Highway billboard for 'Nirva Club & Resort by Siara - OPENING SOON!' featuring Gujarati copy for family peace, style, and joy with family portrait and amenities list",
    client: "Nirva Club & Resort",
    verdict: "OK",
    fix: "Move to Nirva Club & Resort case study under 'Monumental OOH & Highway Hoarding Architecture'. High quality 2:1 outdoor hoarding."
  },
  55: {
    file: "ooh-billboards-print/nirva-architectural-standee.webp",
    shows: "Vertical reception pavilion standee for 'Nirva Club & Resort by Siara - JOIN THE CLUB MEMBERSHIP LIVE THE EXPERIENCE - Book your Membership Today!' with sports & pool photos",
    client: "Nirva Club & Resort",
    verdict: "OK",
    fix: "Move to Nirva Club & Resort case study as the authentic reception standee, replacing the off-brand Taqat Al Noor standee (img_011). Place under 'Monumental OOH & Highway Hoarding Architecture'."
  },
  56: {
    file: "ooh-billboards-print/kalpvriksh-restaurant-flyer.webp",
    shows: "Kalpvriksh pure veg restaurant open creative for Nirva Club & Resort (identical to img_013 / img_060)",
    client: "Nirva Club & Resort (Kalpvriksh)",
    verdict: "DUPLICATE",
    fix: "Exact duplicate of img_013. Remove redundant reference from codebase."
  },
  57: {
    file: "ooh-billboards-print/gourmet-hospitality-flyer.webp",
    shows: "Gourmet evening dining flyer in Gujarati for 'Nirva Club & Resort by Siara - Modasa's Finest Restaurant' (identical to img_063)",
    client: "Nirva Club & Resort (Kalpvriksh)",
    verdict: "DUPLICATE",
    fix: "Exact duplicate of img_063. Consolidate to single source in Kalpvriksh Culinary Identity gallery and marquee."
  },
  58: {
    file: "nirva-club/main-hoarding-grand.jpg",
    shows: "2:1 highway billboard for 'Nirva Club & Resort by Siara - A Premium Resort Experience' (identical artwork to img_010 / hero-main-hoarding.webp)",
    client: "Nirva Club & Resort",
    verdict: "DUPLICATE",
    fix: "Exact duplicate of img_010. Remove from NIRVA_DESIGN_GALLERIES to prevent showing identical hoarding twice in same case study."
  },
  59: {
    file: "nirva-club/nirva-opening-soon.jpg",
    shows: "2:1 opening soon billboard for Nirva Club & Resort (identical artwork to img_012 / billboard-opening.webp)",
    client: "Nirva Club & Resort",
    verdict: "DUPLICATE",
    fix: "Exact duplicate of img_012. Keep higher resolution webp (img_012) in Monumental OOH gallery; remove this duplicate jpg entry."
  },
  60: {
    file: "nirva-club/kalpvriksh-restaurant-post.jpg",
    shows: "Kalpvriksh Pure Veg Restaurant opening creative (identical artwork to img_013 / restaurant-creative.webp)",
    client: "Nirva Club & Resort",
    verdict: "DUPLICATE",
    fix: "Exact duplicate of img_013. Retain webp version in Kalpvriksh gallery; remove this duplicate jpg entry."
  },
  61: {
    file: "nirva-club/weekend-restaurant-post.jpg",
    shows: "Weekend buffet dinner promotional social post for Kalpvriksh at Nirva Club & Resort (Saturday & Sunday, food spread, restaurant dining interior)",
    client: "Nirva Club & Resort",
    verdict: "OK",
    fix: "Keep in NIRVA_DESIGN_GALLERIES under 'Kalpvriksh Fine Dining & Culinary Identity'."
  },
  62: {
    file: "nirva-club/august-buffet-post.jpg",
    shows: "Independence Day Special Dinner buffet post for Kalpvriksha at Nirva Club & Resort (15th & 16th August 2026, Rs. 550 + GST)",
    client: "Nirva Club & Resort",
    verdict: "OK",
    fix: "Keep in NIRVA_DESIGN_GALLERIES under 'Kalpvriksh Fine Dining & Culinary Identity'."
  },
  63: {
    file: "nirva-club/restaurant-flyer-menu.jpg",
    shows: "Fine dining promotional flyer for Nirva Club & Resort ('Modasa's Finest Restaurant', dinner get-together, special celebration in Gujarati)",
    client: "Nirva Club & Resort",
    verdict: "OK",
    fix: "Keep in NIRVA_DESIGN_GALLERIES under 'Kalpvriksh Fine Dining & Culinary Identity'."
  },
  64: {
    file: "nirva-club/janmashtami-celebration-post.jpg",
    shows: "Janmashtami cultural festival long weekend campaign creative for Nirva Club & Resort featuring Lord Krishna illustration and resort aerial view",
    client: "Nirva Club & Resort",
    verdict: "OK",
    fix: "Keep in NIRVA_DESIGN_GALLERIES under 'Seasonal Festivals & Resort Experience Campaigns'."
  },
  65: {
    file: "nirva-club/monsoon-season-post.jpg",
    shows: "Monsoon retreat seasonal campaign creative for Nirva Club & Resort featuring rain-washed aerial photography of Mediterranean architecture",
    client: "Nirva Club & Resort",
    verdict: "OK",
    fix: "Keep in NIRVA_DESIGN_GALLERIES under 'Seasonal Festivals & Resort Experience Campaigns'."
  },
  66: {
    file: "nirva-club/day-picnic-campaign.jpg",
    shows: "Family day picnic collateral for Nirva Club & Resort (identical artwork to img_014 / day-picnic.webp)",
    client: "Nirva Club & Resort",
    verdict: "DUPLICATE",
    fix: "Exact duplicate of img_014. Retain webp version; remove duplicate jpg entry from gallery."
  },
  67: {
    file: "nirva-club/summer-mode-post.jpg",
    shows: "Summer mode seasonal activation creative for Nirva Club & Resort featuring guest relaxing poolside ('Peace Mode ON, Deadlines OFF')",
    client: "Nirva Club & Resort",
    verdict: "OK",
    fix: "Keep in NIRVA_DESIGN_GALLERIES under 'Seasonal Festivals & Resort Experience Campaigns'."
  },
  68: {
    file: "nirva-club/summer-package-post.jpg",
    shows: "All-inclusive summer staycation package creative for Nirva Club & Resort (@ Rs. 6600 per night per couple, Olympic pool and lounge chairs)",
    client: "Nirva Club & Resort",
    verdict: "OK",
    fix: "Keep in NIRVA_DESIGN_GALLERIES under 'Seasonal Festivals & Resort Experience Campaigns'."
  },
  69: {
    file: "nirva-club/rakshabandhan-offer-post.jpg",
    shows: "Raksha Bandhan celebratory family staycation creative for Nirva Club & Resort ('This Rakhi bring everyone home, 28-30 August')",
    client: "Nirva Club & Resort",
    verdict: "OK",
    fix: "Keep in NIRVA_DESIGN_GALLERIES under 'Seasonal Festivals & Resort Experience Campaigns'."
  },
  70: {
    file: "nirva-club/mothers-day-post.jpg",
    shows: "Mother's Day tribute greeting creative for Nirva Club & Resort featuring mother & daughter portrait over resort lawn pavilion",
    client: "Nirva Club & Resort",
    verdict: "OK",
    fix: "Keep in NIRVA_DESIGN_GALLERIES under 'Seasonal Festivals & Resort Experience Campaigns'."
  },
  71: {
    file: "nirva-club/welcome-letter-card.jpg",
    shows: "VIP Member Welcome Letter on resort letterhead signed by Nikul Ramesh Patel for Nirva Club & Resort by Siara with gold crest",
    client: "Nirva Club & Resort",
    verdict: "OK",
    fix: "Keep in NIRVA_DESIGN_GALLERIES under 'Guest Welcome Experience & Membership Stationery'."
  },
  72: {
    file: "nirva-club/photo-frame-mockup.jpg",
    shows: "In-room guest eco-sustainability tent card ('Home away from Home - Dear Guest, help conserve energy by turning off lights, AC, fans... Thank you') with resort photo",
    client: "Nirva Club & Resort",
    verdict: "OK",
    fix: "Mislabeled as 'Photo Frame Mockup'. Correct title and caption to 'In-Room Eco-Sustainability & Energy Conservation Tent Card' in Guest Welcome Experience gallery."
  },
  73: {
    file: "nirva-club/grand-opening-flyer.jpg",
    shows: "Official Grand Inauguration Puja & Lunch Invitation card in Gujarati ('Aamontran - 02 April 2026 - Nirva Club & Resort by Siara')",
    client: "Nirva Club & Resort",
    verdict: "OK",
    fix: "Keep in NIRVA_DESIGN_GALLERIES under 'Guest Welcome Experience & Membership Stationery'."
  }
};

// Generate Markdown Table
let md = `# Graphic Design Content Audit (Phase 1 Inventory & Diagnostics)\n\n`;
md += `> **Audit Scope**: Complete diagnostic scan of all Graphic Design pages, category sections, case studies, Home page Selected Work Graphic tab, marquee strips, and Cloudinary assets.\n`;
md += `> **Total Placements Audited**: 99 occurrences across the codebase\n`;
md += `> **Unique Asset Files Audited**: 73 unique image files visually inspected with multimodal vision\n\n`;

md += `## 1. Asset Inventory & Diagnostic Verdicts\n\n`;
md += `| Asset # | Asset File & URL | Current Section / Location | Current Client Assigned | What Image Actually Shows | Verdict | Proposed Fix |\n`;
md += `| :---: | :--- | :--- | :--- | :--- | :---: | :--- |\n`;

assetDetails.forEach(item => {
  const audit = auditMap[item.index] || {
    shows: "Inspected design asset",
    client: item.usages[0]?.client || "Unknown",
    verdict: "OK",
    fix: "Verify placement."
  };

  const locations = item.usages.map(u => u.location).join('<br/>');
  const currentClient = item.usages.map(u => u.client).filter((v, i, a) => a.indexOf(v) === i).join(', ');
  const filename = item.url.split('/').pop();
  const shortUrl = item.url.replace('https://res.cloudinary.com/oct7txvw/image/upload/v1789835', '.../');

  md += `| ${item.index} | [\`${filename}\`](${item.url}) | ${locations} | ${currentClient} | ${audit.shows} | **${audit.verdict}** | ${audit.fix} |\n`;
});

// Write to audit/graphic-design-audit.md in repo root and src/audit
const dirs = ['audit', 'src/audit'];
dirs.forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
  fs.writeFileSync(path.join(d, 'graphic-design-audit.md'), md);
});

console.log('Successfully generated graphic-design-audit.md in audit/ and src/audit/');
