export interface HeroPill {
  label: string;
  href?: string;
}

export interface HeroCarouselSlide {
  image: string;
  caption: string;
  title: string;
}

export interface HeroContent {
  headline: string;
  subtitle?: string;
  bio?: string[];
  pills: HeroPill[];
  /** Fixed single background image — overrides the rotating carousel. */
  backgroundImage?: string;
}

export type HeroVariant =
  | "default"
  | "founder"
  | "intro"
  | "heritage"
  | "getmeds"
  | "bishnoi-omniverse"
  | "foundation"
  | "what-we-do";

export const HERO_CAROUSEL: HeroCarouselSlide[] = [
  { image: "/hero_pharma.jpg", caption: "Getmeds Ecosystem", title: "Global healthcare & pharmaceuticals." },
  { image: "/bishnoiimage.jpeg", caption: "Bishnoi Omniverse", title: "Medical supply & hospital infrastructure." },
  { image: "/bishnoicompany.png", caption: "Strategic Holdings", title: "NBF financial & NKB capital." },
  { image: "/hero_wildlife.jpg", caption: "Heritage Foundation", title: "29 Principles & conservation impact." },
];

// Businesses page's own hero carousel — deliberately separate from
// HERO_CAROUSEL above so it never picks up hero_hydroponics (removed from
// this page on request) and stays scoped to business-specific imagery.
// Currently unused (the Businesses page pins a single static background via
// HERO_CONTENT.default.backgroundImage instead), kept here in case the
// per-page carousel treatment comes back.
export const BUSINESS_HERO_CAROUSEL: HeroCarouselSlide[] = [
  { image: "/getmedsecosystem.png", caption: "Getmeds Ecosystem", title: "Healthcare & pharmaceutical access." },
  { image: "/bishnoicompany.png", caption: "Bishnoi Omniverse", title: "Infrastructure powering healthcare supply." },
  { image: "/bishnoiimage.jpeg", caption: "Bishnoi Omniverse", title: "Building the healthcare supply powerhouse." },
  { image: "/2mgincorp.jpg", caption: "2MG Incorporated", title: "The holding company behind Getmeds." },
  { image: "/getmedsph.jpeg", caption: "Getmeds Philippines", title: "Expanding access to essential medicines." },
];

export const HERO_CONTENT: Record<HeroVariant, HeroContent> = {
  default: {
    headline: "Rooted in five hundred years. Building for what comes next.",
    // Pins a single static image (no carousel) for the Home/Businesses
    // hero, per request — same mechanism the new intro-style variants below
    // use to fix their own background.
    backgroundImage: "/finalnatalaga.png",
    pills: [
      { label: "Getmeds Phils", href: "https://getmeds.ph" },
      { label: "Getmeds India", href: "https://getmedshealthcare.com" },
      { label: "Getmeds Vanuatu", href: "https://getmedsvanuatu.com" },
      { label: "Getmeds Latam", href: "https://getmedslatam.com" },
      { label: "Getmeds SEA", href: "https://getmedssea.com" },
      { label: "2MG Incorporated", href: "https://2mginc.com/" },
      { label: "Bishnoi India", href: "https://bishnoi-omniverse.in" },
      { label: "Bishnoi Phils", href: "https://bishnoi-omniverse.ph" },
      { label: "N. Bishnoi Foundation", href: "https://nbf.com" },
      { label: "N. K. Bishnoi Office", href: "https://nkb.com" },
    ],
  },
  founder: {
    headline: "Naresh Kumar Bishnoi",
    subtitle: "From Vision to the World.",
    bio: [
      "From a small village in Haryana, India, to building businesses serving healthcare markets and communities around the world, Naresh Bishnoi’s journey has been shaped by challenges, lessons, failures, and remarkable opportunities.",
      "Driven by a commitment to making healthcare more accessible, Naresh has built his work around strengthening the movement of medicines across borders, overcoming geographical barriers, and creating pathways for patients and healthcare institutions to access what they need.",
    ],
    pills: [
      { label: "Founder of Getmeds & 2MG Inc" },
      { label: "Oncology Medicine Supply Specialist" },
      { label: "Rare Medicines" },
      { label: "Medicine Donations & Global Healthcare" },
      { label: "European Society for Medical Oncology Member" },
      { label: "UN Global Compact Member" },
    ],
  },
  intro: {
    headline: "Global Enterprises & Initiatives",
    subtitle: "Advancing healthcare, medical supply, and social impact across borders.",
    pills: [],
    backgroundImage: "/hero_orange.png",
  },
  heritage: {
    headline: "Five Hundred Years of Heritage",
    subtitle:
      "The story of the Bishnoi community — a 1485 faith, 29 guiding principles, and 363 lives given at Khejarli — and how those principles still shape the businesses built in its name.",
    pills: [],
    backgroundImage: "/hero_wildlife.jpg",
  },
  getmeds: {
    headline: "Getmeds Healthcare Network",
    subtitle:
      "A centralized global healthcare platform delivering pharmaceutical distribution, digital health services, and patient-first logistics across five international hubs — spanning the Philippines, India, Vanuatu, Latin America, and Southeast Asia.",
    pills: [],
    backgroundImage: "/hero_pharma.jpg",
  },
  "bishnoi-omniverse": {
    headline: "Bishnoi Omniverse",
    subtitle:
      "Building a healthcare supply powerhouse designed to serve hospitals across the full spectrum of their needs — from essential medical supplies and medicines to specialized products and large-scale hospital requirements.",
    pills: [],
    backgroundImage: "/bishnoiimage.jpeg",
  },
  foundation: {
    headline: "Naresh Bishnoi Foundation",
    subtitle:
      "Dedicated to wildlife preservation, mass afforestation, and the living stewardship of Guru Jambheshwar's 29 Principles — funding desert eco-restoration projects and community conservation programs that carry a five-hundred-year ecological ethic forward.",
    pills: [],
    backgroundImage: "/hero_wildlife.jpg",
  },
  "what-we-do": {
    headline: "What We Do",
    subtitle:
      "Healthcare, pharmaceutical distribution, medical supply, and social impact — the capabilities behind every business in the Bishnoi ecosystem.",
    pills: [],
    backgroundImage: "/hero_pharma.jpg",
  },
};
