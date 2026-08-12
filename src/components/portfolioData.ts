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
    description: "Centralized global healthcare platform and pharmaceutical distribution across 5 international hubs.",
    entities: [
      { name: "Getmeds Philippines", domain: "getmeds.ph", url: "https://getmeds.ph" },
      { name: "Getmeds India", domain: "getmedshealthcare.com", url: "https://getmedshealthcare.com" },
      { name: "Getmeds Vanuatu", domain: "getmedsvanuatu.com", url: "https://getmedsvanuatu.com" },
      { name: "Getmeds Latam", domain: "getmedslatom.com", url: "https://getmedslatom.com" },
      { name: "Getmeds SEA", domain: "getmedssea.com", url: "https://getmedssea.com" },
    ],
  },
  {
    numeral: "02",
    category: "Division 02 • Global Enterprise & Industrial Hubs",
    title: "Bishnoi Corporate Hubs",
    image: "/hero_hydroponics.jpg",
    description: "Regional agritech, sustainable manufacturing, and industrial trade centers governing Asia-Pacific operations.",
    entities: [
      { name: "Bishnoi India", domain: "bishnoi-omniverse.in", url: "https://bishnoi-omniverse.in" },
      { name: "Bishnoi Philippines", domain: "bishnoi-omniverse.ph", url: "https://bishnoi-omniverse.ph" },
    ],
  },
  {
    numeral: "03",
    category: "Division 03 • Philanthropy & Environmental Ethics",
    title: "Naresh Bishnoi Foundation",
    image: "/hero_wildlife.jpg",
    description: "Dedicated to wildlife preservation, afforestation, 29 Principles stewardship, and desert eco-restoration.",
    entities: [{ name: "Naresh Bishnoi Foundation", domain: "nbf.com", url: "https://nbf.com" }],
  },
  {
    numeral: "04",
    category: "Division 04 • Strategic Holdings & Family Office",
    title: "Naresh Kumar Bishnoi Office",
    image: "/hero_dairy.jpg",
    description: "Strategic investment management, non-banking financial services, and global venture holdings.",
    entities: [{ name: "Naresh Kumar Bishnoi", domain: "nkb.com", url: "https://nkb.com" }],
  },
  {
    numeral: "05",
    category: "Division 05 • Indigenous Dairy & Cattle Care",
    title: "Indigenous Dairy Care",
    image: "/hero_dairy.jpg",
    description: "Dedicated to the preservation of indigenous cattle breeds, promoting sustainable organic dairy farming, and supporting rural livelihoods.",
    entities: [{ name: "Indigenous Dairy Care", domain: "nkb.com", url: "https://nkb.com" }],
  },
];

export const PANEL = "linear-gradient(158deg,#2E2822 0%,#1C1815 100%)";
export const EASE = "cubic-bezier(.22,1,.36,1)";
/* Scroll spent per division, in vh. rem is viewport-relative in this project
   (see the html font-size ladder in globals.css), so the track is sized in vh. */
export const DWELL_VH = 70;
