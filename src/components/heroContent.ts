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

export type HeroVariant = "default" | "founder" | "intro" | "heritage";

export const HERO_CAROUSEL: HeroCarouselSlide[] = [
  { image: "/hero_pharma.jpg", caption: "Getmeds Ecosystem", title: "Global healthcare & pharmaceuticals." },
  { image: "/hero_hydroponics.JPG", caption: "Bishnoi Group", title: "Sustainable agritech & enterprise." },
  { image: "/hero_orange.png", caption: "Strategic Holdings", title: "NBF financial & NKB capital." },
  { image: "/hero_wildlife.jpg", caption: "Heritage Foundation", title: "29 Principles & conservation impact." },
];

export const HERO_CONTENT: Record<HeroVariant, HeroContent> = {
  default: {
    headline: "One Identity. Multiple Ventures. One Purpose.",
    subtitle:
      "Bishnoi is a global business ecosystem building and operating ventures across healthcare, pharmaceutical access, medical supply, technology and social impact.",
    pills: [
      { label: "Getmeds Phils", href: "https://getmeds.ph" },
      { label: "Getmeds India", href: "https://getmedshealthcare.com" },
      { label: "Getmeds Vanuatu", href: "https://getmedsvanuatu.com" },
      { label: "Getmeds Latam", href: "https://getmedslatom.com" },
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
    subtitle: "Advancing healthcare, infrastructure, technology, and social impact across borders.",
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
};
