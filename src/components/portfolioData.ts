export interface Entity {
  name: string;
  domain: string;
  url: string;
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
  entities: Entity[];
}

export const businesses: Division[] = [
  {
    numeral: "01",
    category: "Division 01 • Healthcare & E-Pharmacy Ecosystem",
    title: "Getmeds Healthcare Network",
    image: "/hero_pharma.jpg",
    description: "A centralized global healthcare platform delivering pharmaceutical distribution, digital health services, and patient-first logistics across five international hubs — spanning the Philippines, India, Vanuatu, Latin America, and Southeast Asia.",
    entities: [
      { name: "Getmeds Philippines", domain: "getmeds.ph", url: "https://getmeds.ph" },
      { name: "Getmeds India", domain: "getmedshealthcare.com", url: "https://getmedshealthcare.com" },
      { name: "Getmeds Vanuatu", domain: "getmedsvanuatu.com", url: "https://getmedsvanuatu.com" },
      { name: "Getmeds Latam", domain: "getmedslatam.com", url: "https://getmedslatam.com" },
      { name: "Getmeds SEA", domain: "getmedssea.com", url: "https://getmedssea.com" },
      { name: "2MG Incorporated", domain: "2mginc.com", url: "https://2mginc.com/" },
    ],
  },
  {
    numeral: "02",
    category: "Division 02 • Medical Supply & Healthcare Infrastructure",
    title: "Bishnoi Omniverse",
    image: "/bishnoiimage.jpeg",
    description: "A healthcare supply powerhouse designed to serve hospitals across the full spectrum of their needs — from essential medical supplies and medicines to specialized products and large-scale hospital requirements — anchoring the group's presence in India and the Philippines.",
    entities: [
      { name: "Bishnoi Omniverse India", domain: "bishnoi-omniverse.in", url: "https://bishnoi-omniverse.in" },
      { name: "Bishnoi Omniverse Philippines", domain: "bishnoi-omniverse.ph", url: "https://bishnoi-omniverse.ph" },
    ],
  },
  {
    numeral: "03",
    category: "Division 03 • Philanthropy & Environmental Ethics",
    title: "Naresh Bishnoi Foundation",
    image: "/hero_wildlife.jpg",
    description: "Dedicated to wildlife preservation, mass afforestation, and the living stewardship of Guru Jambheshwar's 29 Principles — funding desert eco-restoration projects and community conservation programs that carry a five-hundred-year ecological ethic forward.",
    entities: [{ name: "Naresh Bishnoi Foundation", domain: "nbf.com", url: "https://nbf.com" }],
  },
  {
    numeral: "04",
    category: "Division 04 • Strategic Holdings & Family Office",
    title: "Naresh Kumar Bishnoi Office",
    image: "/hero_orange.png",
    description: "The group's central intelligence — managing strategic investment portfolios, non-banking financial services, and global venture holdings that bind each division under one disciplined, long-term capital framework aligned with the family's founding values.",
    entities: [{ name: "Naresh Kumar Bishnoi", domain: "nkb.com", url: "https://nkb.com" }],
  },
];

export const PANEL = "linear-gradient(158deg,#2E2822 0%,#1C1815 100%)";
export const EASE = "cubic-bezier(.22,1,.36,1)";
/* Scroll spent per division, in vh. rem is viewport-relative in this project
   (see the html font-size ladder in globals.css), so the track is sized in vh. */
export const DWELL_VH = 70;
