/* One manifest behind every crawl surface: /sitemap.xml, /image-sitemap.xml,
   the human /sitemap page, and /robots.txt all read this file. Adding a route
   or a photograph means editing one row here, so the four can never drift
   apart — which is the usual way sitemaps go stale. */

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://bishnoi.ai";

/* Priority bands, fixed by policy rather than chosen per row:

     main      1.0  — the top-level entry points
     secondary 0.8  — the cluster and detail pages beneath them
     static    0.5  — utility pages (sitemap, and About/Contact once they exist)

   Priority is a *relative* hint within this one sitemap, not a ranking dial.
   Google largely ignores it; Bing and Yandex still read it. It is deliberately
   separate from changeFrequency below, which is how often the page changes. */
export type Tier = "main" | "secondary" | "static";

export const PRIORITY: Record<Tier, number> = {
  main: 1.0,
  secondary: 0.8,
  static: 0.5,
};

export type ChangeFrequency = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

/** One photograph as the image sitemap needs it: where it lives, and what it
    shows. `title` and `caption` are the two optional fields Google reads. */
export interface RouteImage {
  /** Root-relative path under public/. Pre-encoded where the filename needs it. */
  loc: string;
  title: string;
  caption?: string;
}

export interface SiteRoute {
  /** Root-relative, no trailing slash. "" is the homepage. */
  path: string;
  /** Link text on the human sitemap. */
  label: string;
  /** One line under that link, so the page is worth reading on its own. */
  blurb: string;
  /** Grouping on the human sitemap. */
  section: string;
  tier: Tier;
  changeFrequency: ChangeFrequency;
  /** Images that actually appear on this page. Empty is fine and common —
      a page whose only images are the logo and chrome contributes nothing to
      an image sitemap, and padding it with furniture would be noise. */
  images: RouteImage[];
}

/* Credits for the Wikimedia photographs live in public/legacy/CREDITS.md. The
   captions below are descriptive only; they do not replace that attribution. */
export const ROUTES: SiteRoute[] = [
  {
    path: "",
    label: "Home",
    blurb: "The five-hundred-year heritage, the ventures it carries, and where the two meet.",
    section: "Main",
    tier: "main",
    changeFrequency: "weekly",
    images: [
      { loc: "/herosectionslideone.jpg", title: "Getmeds Ecosystem", caption: "Global healthcare and pharmaceuticals." },
      { loc: "/herosectionslidetwo.jpg", title: "Bishnoi Omniverse", caption: "Medical supply and hospital infrastructure." },
      { loc: "/herosectionslidethree.jpg", title: "Heritage Foundation", caption: "The 29 Principles and conservation impact." },
      { loc: "/herosectionslidefour.png", title: "Strategic Holdings", caption: "NBF financial and NKB capital." },
      { loc: "/mukam.jpg", title: "Mukam (Muktidham)", caption: "The community's holiest shrine, built over Guru Jambheshwar's samadhi." },
      { loc: "/samrathal%20dhora.jpg", title: "Samrathal Dhora", caption: "The dune where Jambheshwar preached the sermons that founded the faith in 1485." },
      { loc: "/pipasar.png", title: "Peepasar", caption: "Guru Jambheshwar's birthplace, in Nagaur district, Rajasthan." },
      { loc: "/lalasar.jpg", title: "Lalasar", caption: "Where Guru Jambheshwar died in 1536, before his body was carried to Mukam." },
      { loc: "/jhambolav.avif", title: "Jhambolav", caption: "Site of the annual fair on Chaitra Amavasya, in Phalodi district." },
      { loc: "/lohawat.jpg", title: "Lohawat", caption: "Linked to Guru Jambheshwar's meeting with a Marwar prince." },
      { loc: "/jangladesh.jpg", title: "Janglu", caption: "Home to personal relics associated with Guru Jambheshwar." },
      { loc: "/rotu.jpeg", title: "Rotu", caption: "One of the eight principal Ashtadham shrine sites." },
      { loc: "/legacy/sacrifice.jpg", title: "363 Bishnoi Sacrifice Memorial", caption: "The memorial at Khejarli to the 363 killed defending the grove in 1730." },
      { loc: "/legacy/homeland.jpg", title: "Dunes of the Thar Desert", caption: "The western Thar, the community's heartland." },
      { loc: "/legacy/wardens.jpg", title: "Blackbuck in Tal Chhapar Sanctuary", caption: "The blackbuck, protected under the twenty-nine principles." },
      { loc: "/legacy/groves.jpg", title: "Khejri (Prosopis cineraria)", caption: "The tree the Bishnois died defending at Khejarli." },
      { loc: "/legacy/faith.jpg", title: "Mukti Dham Mukam Temple", caption: "The marble temple at Mukam, the central pilgrimage site." },
      { loc: "/legacy/lineage.jpg", title: "A Bishnoi village", caption: "Village life in the Bishnoi heartland." },
      { loc: "/legacy/traditions.jpg", title: "Bishnois at the Khejarli Environment Fair", caption: "The annual commemoration held at Khejarli." },
      { loc: "/legacy/bustard.jpg", title: "Great Indian bustard, Desert National Park", caption: "A critically endangered bird of the Thar, protected on Bishnoi land." },
    ],
  },

  // The Bishnoi knowledge cluster. One concept, one canonical page.
  {
    path: "/bishnoi",
    label: "Who are the Bishnois?",
    blurb: "A Vaishnava community of the Thar Desert, formed around twenty-nine principles set out in 1485.",
    section: "The Bishnois",
    tier: "main",
    changeFrequency: "monthly",
    images: [{ loc: "/bishnois.png", title: "The Bishnoi community", caption: "The Bishnois of the western Thar Desert, Rajasthan." }],
  },
  {
    path: "/bishnoi/29-principles",
    label: "The 29 Principles",
    blurb: "All twenty-nine niyamas, and what living by them actually meant.",
    section: "The Bishnois",
    tier: "secondary",
    changeFrequency: "monthly",
    images: [
      { loc: "/legacy/groves.jpg", title: "Khejri (Prosopis cineraria)", caption: "The tree protected by the principle against felling green trees." },
      { loc: "/legacy/wardens.jpg", title: "Blackbuck in Tal Chhapar Sanctuary", caption: "The blackbuck, protected under the principle against killing animals." },
    ],
  },
  {
    path: "/bishnoi/khejarli",
    label: "Khejarli, 1730",
    blurb: "363 Bishnois killed defending a grove of khejri trees, and the decree that followed.",
    section: "The Bishnois",
    tier: "secondary",
    changeFrequency: "monthly",
    images: [{ loc: "/legacy/sacrifice.jpg", title: "363 Bishnoi Sacrifice Memorial", caption: "The memorial at Khejarli, near Jodhpur, to the 363 killed in September 1730." }],
  },
  {
    path: "/bishnoi/guru-jambheshwar",
    label: "Guru Jambheshwar",
    blurb: "The teacher around whom the way of life formed, and the drought that shaped it.",
    section: "The Bishnois",
    tier: "secondary",
    changeFrequency: "monthly",
    images: [
      { loc: "/gurujambheshwar.png", title: "Guru Jambheshwar (1451–1536)", caption: "The founder of the Bishnoi tradition." },
      { loc: "/legacy/faith.jpg", title: "Mukti Dham Mukam Temple", caption: "The temple at Mukam, built over his samadhi." },
    ],
  },
  {
    path: "/bishnoi/amrita-devi",
    label: "Amrita Devi",
    blurb: "The woman who refused first at Khejarli, and the national award that carries her name.",
    section: "The Bishnois",
    tier: "secondary",
    changeFrequency: "monthly",
    images: [
      { loc: "/amritadevi.png", title: "Amrita Devi", caption: "The Bishnoi woman who died first defending the khejri grove in 1730." },
      { loc: "/legacy/bustard.jpg", title: "Great Indian bustard, Desert National Park", caption: "Wildlife protection of the kind the award in her name recognises." },
    ],
  },
  {
    path: "/bishnoi/name-and-origin",
    label: "Where the name comes from",
    blurb: "Twenty-nine, or Vishnu? Two readings of the name, and why neither is settled.",
    section: "The Bishnois",
    tier: "secondary",
    changeFrequency: "monthly",
    images: [{ loc: "/legacy/lineage.jpg", title: "A Bishnoi village", caption: "The community whose name the two etymologies dispute." }],
  },

  // The business ecosystem.
  {
    path: "/businesses",
    label: "Businesses",
    blurb: "The ventures carrying the Bishnoi name: healthcare, medical supply, and social impact.",
    section: "Businesses",
    tier: "main",
    changeFrequency: "weekly",
    images: [
      { loc: "/herosectionbusiness.png", title: "Bishnoi ventures", caption: "One identity, multiple ventures, one purpose." },
      { loc: "/businesses/getmeds_healthcare.jpg", title: "Getmeds Healthcare", caption: "Pharmaceutical access across emerging markets." },
      { loc: "/businesses/getmeds_vauatu.jpg", title: "Getmeds Vanuatu", caption: "The Vanuatu arm of the Getmeds network." },
      { loc: "/getmedsph.jpeg", title: "Getmeds Philippines", caption: "Expanding access to essential medicines in the Philippines." },
      { loc: "/getmedslatinamerica.jpg", title: "Getmeds Latin America", caption: "The Latin American arm of the Getmeds network." },
      { loc: "/GETMEDSSEA.jpg", title: "Getmeds Southeast Asia", caption: "The Southeast Asian arm of the Getmeds network." },
      { loc: "/2mgincorp.jpg", title: "2MG Incorporated", caption: "The holding company behind Getmeds." },
      { loc: "/bishnoiimage.jpeg", title: "Bishnoi Omniverse", caption: "Medical supply and hospital infrastructure." },
      { loc: "/businesses/naresh_foundation.jpg", title: "Naresh Bishnoi Foundation", caption: "The group's social impact and conservation work." },
      { loc: "/businesses/nkb.jpg", title: "Naresh Kumar Bishnoi", caption: "Founder and chairman of the Bishnoi group of companies." },
      { loc: "/businesses/ungc.jpg", title: "UN Global Compact", caption: "The group's participation in the UN Global Compact." },
    ],
  },
  {
    path: "/businesses/getmeds",
    label: "Getmeds",
    blurb: "The healthcare and pharmaceutical network, across the Philippines, India, Vanuatu, Latam and SEA.",
    section: "Businesses",
    tier: "secondary",
    changeFrequency: "monthly",
    images: [{ loc: "/hero_pharma.jpg", title: "Getmeds Healthcare Network", caption: "Oncology and specialty medicine supply in emerging markets." }],
  },
  {
    path: "/businesses/bishnoi-omniverse",
    label: "Bishnoi Omniverse",
    blurb: "Medical supply and hospital infrastructure across the Philippines and India.",
    section: "Businesses",
    tier: "secondary",
    changeFrequency: "monthly",
    images: [{ loc: "/bishnoiimage.jpeg", title: "Bishnoi Omniverse", caption: "The infrastructure powering healthcare supply." }],
  },
  {
    path: "/businesses/foundation",
    label: "Naresh Bishnoi Foundation",
    blurb: "The foundation's conservation and community work, rooted in the twenty-nine principles.",
    section: "Businesses",
    tier: "secondary",
    changeFrequency: "monthly",
    images: [{ loc: "/businesses/naresh_foundation.jpg", title: "Naresh Bishnoi Foundation", caption: "Conservation and community programmes." }],
  },
  {
    path: "/leadership/naresh-bishnoi",
    label: "Naresh Kumar Bishnoi",
    blurb: "Founder and chairman — from the Thar Desert to a healthcare group spanning five markets.",
    section: "Leadership",
    tier: "secondary",
    changeFrequency: "monthly",
    images: [
      { loc: "/leadersection.png", title: "Naresh Kumar Bishnoi", caption: "Founder and chairman of the Bishnoi group of companies." },
      { loc: "/businesses/nkb.jpg", title: "Naresh Kumar Bishnoi", caption: "Portrait of the founder." },
    ],
  },

  // Utility. About and Contact belong in this band when they are built —
  // Contact is a modal today, not a page, so there is nothing to submit.
  {
    path: "/sitemap",
    label: "Sitemap",
    blurb: "Every page on this site, in one list.",
    section: "Utility",
    tier: "static",
    changeFrequency: "monthly",
    images: [],
  },
];

/** Absolute URL for a root-relative path. */
export const absolute = (path: string) => `${SITE_URL}${path}`;

/** Only the routes that carry images, for the image sitemap. */
export const ROUTES_WITH_IMAGES = ROUTES.filter((r) => r.images.length > 0);

/** The human sitemap groups by section, in the order sections first appear. */
export function routesBySection(): { section: string; routes: SiteRoute[] }[] {
  const order: string[] = [];
  const groups = new Map<string, SiteRoute[]>();

  for (const route of ROUTES) {
    if (!groups.has(route.section)) {
      order.push(route.section);
      groups.set(route.section, []);
    }
    groups.get(route.section)!.push(route);
  }

  return order.map((section) => ({ section, routes: groups.get(section)! }));
}
