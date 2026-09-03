export interface Entity {
  name: string;
  domain: string;
  /* Omitted where the domain does not resolve, is parked, or resolves to
     an unrelated third party (nbf.com serves a US furniture retailer).
     EntityChips renders those as plain text — the division card above
     already links to the entity’s profile page here, so repointing the
     chip at the same route would only duplicate that link. Restore a url
     when the domain actually serves the entity. */
  url?: string;
}

export interface Division {
  numeral: string;
  /* Ambient project imagery. Rendered blurred behind the card and as a wash
     across the stage, so it reads as mood rather than as a photograph. Swap
     these paths for division-specific shots when they exist. */
  image: string;
  category: string;
  title: string;
  description: string;
  href: string;
  linkLabel: string;
  entities: Entity[];
}

export const businesses: Division[] = [
  {
    numeral: "01",
    category: "Division 01 • Healthcare & E-Pharmacy Ecosystem",
    title: "Getmeds Healthcare Network",
    image: "/hero_pharma.jpg",
    description: "Global pharmaceutical distribution, e-pharmacy access, and specialty oncology medicine supply across five international hubs.",
    href: "/businesses/getmeds",
    linkLabel: "Explore Getmeds Profile →",
    entities: [
      { name: "Getmeds Philippines", domain: "getmeds.ph", url: "https://getmeds.ph" },
      { name: "Getmeds India", domain: "getmedshealthcare.com", url: "https://getmedshealthcare.com" },
      { name: "Getmeds Vanuatu", domain: "getmedsvanuatu.com" },
      { name: "Getmeds Latam", domain: "getmedslatam.com" },
      { name: "Getmeds SEA", domain: "getmedssea.com" },
      { name: "2MG Incorporated", domain: "2mginc.com", url: "https://2mginc.com/" },
    ],
  },
  {
    numeral: "02",
    category: "Division 02 • Medical Supply & Healthcare Infrastructure",
    title: "Bishnoi Omniverse",
    image: "/bishnoiimage.jpeg",
    description: "Hospital supply chain, medical consumables, equipment, and healthcare infrastructure solutions anchoring presence in India and the Philippines.",
    href: "/businesses/bishnoi-omniverse",
    linkLabel: "Explore Omniverse Profile →",
    entities: [
      { name: "Bishnoi Omniverse India", domain: "bishnoi-omniverse.in" },
      { name: "Bishnoi Omniverse Philippines", domain: "bishnoi-omniverse.ph" },
    ],
  },
  {
    numeral: "03",
    category: "Division 03 • Philanthropy & Environmental Ethics",
    title: "Naresh Bishnoi Foundation",
    image: "/hero_wildlife.jpg",
    description: "Desert eco-restoration, mass afforestation, wildlife protection, and United Nations Global Compact environmental commitments.",
    href: "/businesses/foundation",
    linkLabel: "Explore Foundation Profile →",
    entities: [{ name: "Naresh Bishnoi Foundation", domain: "nbf.com" }],
  },
  {
    numeral: "04",
    category: "Division 04 • Strategic Holdings & Family Office",
    title: "Naresh Kumar Bishnoi Office",
    image: "/hero_orange.png",
    description: "Group central intelligence, managing strategic capital frameworks and global venture holdings aligned with founding values.",
    href: "/leadership/naresh-bishnoi",
    linkLabel: "Full Leadership Profile ↗",
    entities: [{ name: "Naresh Kumar Bishnoi", domain: "nkb.com" }],
  },
];

export const PANEL = "linear-gradient(158deg,#2E2822 0%,#1C1815 100%)";
export const EASE = "cubic-bezier(.22,1,.36,1)";
/* Scroll spent per division, in vh. rem is viewport-relative in this project
   (see the html font-size ladder in globals.css), so the track is sized in vh. */
export const DWELL_VH = 70;
