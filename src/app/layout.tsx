import type { Metadata } from "next";
import { Onest } from "next/font/google";
import "./globals.css";

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bishnoi.ai";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Bishnoi | The Community, Its History and Its Living Legacy",
    template: "%s | Bishnoi",
  },
  description:
    "The history of the Bishnoi community of Rajasthan — Guru Jambheshwar, the 29 principles, and the 363 killed at Khejarli in 1730 — and the modern business ecosystem that carries the name.",
  keywords: [
    // Brand-level only. The history queries — "history of Bishnoi",
    // "Bishnoi ka itihas", "when was Bishnoi founded" and the rest — are
    // deliberately NOT here: /bishnoi owns that cluster, and it is the page
    // that can actually answer them (a dated timeline, ten FAQ answers,
    // FAQPage markup). Home mentions "history" once in its visible copy.
    // Listing the cluster in both places would put the two pages in
    // competition and split the signal towards the weaker one. Home already
    // links to /bishnoi five times, which is the useful thing it can do.
    "Bishnoi",
    "Bishnoi community",
    "Guru Jambheshwar",
    "29 Bishnoi principles",
    "Khejarli",
    "Bishnoi conservation",
    // The business ecosystem.
    "Naresh Kumar Bishnoi",
    "Naresh Bishnoi",
    "Getmeds",
    "Getmeds Philippines",
    "Getmeds Healthcare",
    "Getmeds Vanuatu",
    "Getmeds Latam",
    "Bishnoi Omniverse",
    "Oncology Medicine Supply",
    "Rare Medicines",
    "2MG Inc",
    "UN Global Compact Member",
    "European Society for Medical Oncology",
    "Naresh Bishnoi Foundation",
    "Global Healthcare Exporter",
  ],
  authors: [{ name: "Naresh Kumar Bishnoi", url: baseUrl }],
  creator: "Naresh Kumar Bishnoi",
  publisher: "Bishnoi Omniverse",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Bishnoi | The Community, Its History and Its Living Legacy",
    description:
      "A philosophy born in the Thar Desert in 1485, the community that formed around it, and the enterprise a new generation is building in its name.",
    url: baseUrl,
    siteName: "Bishnoi Omniverse",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/hero_pharma.jpg",
        width: 1200,
        height: 630,
        alt: "Naresh Kumar Bishnoi - Global Healthcare Ecosystem",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bishnoi | The Community, Its History and Its Living Legacy",
    description:
      "Advancing healthcare across borders through Getmeds Ecosystem, Bishnoi Omniverse, and global initiatives.",
    images: ["/hero_pharma.jpg"],
  },
  alternates: {
    canonical: "./",
  },
  icons: {
    icon: [
      { url: "/logo_favicon.png", type: "image/png" },
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: "/apple-icon.png",
    shortcut: "/logo_favicon.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${baseUrl}/#person`,
      name: "Naresh Kumar Bishnoi",
      jobTitle: "Founder & Global Healthcare Leader",
      description:
        "Founder of Getmeds & 2MG Inc, Oncology Medicine Supply Specialist, UN Global Compact Member, and ESMO Member.",
      knowsAbout: [
        "Pharmaceutical Distribution",
        "Oncology Medicine Supply",
        "Compassionate Medicine Access",
        "Healthcare Supply Chain",
        "Global Healthcare Infrastructure",
      ],
      worksFor: [
        {
          "@type": "Organization",
          name: "Getmeds Ecosystem",
          url: "https://getmeds.ph",
        },
      ],
      // Only sameAs targets that actually resolve to Bishnoi/Getmeds-controlled
      // sites — bishnoi-omniverse.in doesn't resolve, getmedsvanuatu.com and
      // getmedslatam.com don't resolve, and nbf.com redirects to an unrelated
      // third-party furniture retailer, so none of those belong here.
      sameAs: ["https://getmeds.ph", "https://getmedshealthcare.com"],
    },
    {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      name: "Bishnoi Omniverse & Getmeds Ecosystem",
      url: baseUrl,
      logo: `${baseUrl}/logo.png`,
      founder: {
        "@id": `${baseUrl}/#person`,
      },
      description:
        "A global business ecosystem and healthcare supply powerhouse advancing pharmaceutical distribution, medical supply, and philanthropic initiatives across India, Philippines, Vanuatu, and Latin America.",
    },
    // Getmeds, Bishnoi Omniverse, and the Foundation are each described here
    // as their own Organization — matching what their own profile pages say —
    // but WITHOUT a parentOrganization/subOrganization edge to the main
    // "#organization" node above. No source (including these entities' own
    // websites) states a formal legal parent/subsidiary relationship, and for
    // Bishnoi Omniverse and the Foundation specifically, independent research
    // couldn't confirm the entities exist as operating organizations at all —
    // asserting a corporate hierarchy here would be a stronger claim than the
    // underlying facts support. Revisit once that relationship (or the
    // entities' basic existence) is actually established.
    {
      "@type": "Organization",
      "@id": `${baseUrl}/businesses/getmeds#organization`,
      name: "Getmeds",
      url: `${baseUrl}/businesses/getmeds`,
      founder: { "@id": `${baseUrl}/#person` },
      description:
        "A centralized global healthcare platform delivering pharmaceutical distribution, digital health services, and patient-first logistics across the Philippines, India, Vanuatu, Latin America, and Southeast Asia.",
      // UN Global Compact membership is verified specifically for Getmeds
      // Philippines Incorporated (joined 4 Nov 2024) — not for the wider
      // Bishnoi brand, so it's attached at this level, not the main org.
      memberOf: {
        "@type": "Organization",
        name: "United Nations Global Compact",
      },
      sameAs: ["https://getmeds.ph", "https://getmedshealthcare.com", "https://2mginc.com/"],
    },
    {
      "@type": "Organization",
      "@id": `${baseUrl}/businesses/bishnoi-omniverse#organization`,
      name: "Bishnoi Omniverse",
      url: `${baseUrl}/businesses/bishnoi-omniverse`,
      description:
        "A healthcare supply powerhouse serving hospitals across India and the Philippines with medical supplies, equipment, and infrastructure.",
    },
    {
      "@type": "Organization",
      "@id": `${baseUrl}/businesses/foundation#organization`,
      name: "Naresh Bishnoi Foundation",
      url: `${baseUrl}/businesses/foundation`,
      description:
        "A lifelong commitment to education, empowerment, cultural growth, and environmental stewardship, including wildlife preservation and desert eco-restoration.",
    },
    {
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`,
      url: baseUrl,
      name: "Bishnoi",
      publisher: {
        "@id": `${baseUrl}/#organization`,
      },
      about: [{ "@id": `${baseUrl}/#community` }, { "@id": `${baseUrl}/#organization` }],
    },

    // ── The Bishnoi community as an entity in its own right ────────────────
    // This node exists to make an explicit separation that matters three ways
    // over: the community is not the company; the company does not own the
    // heritage; and "Bishnoi" in current news is dominated by an unrelated
    // crime story, so the graph should say plainly which Bishnoi this site is
    // about. sameAs points at the encyclopedia entry so the entity resolves.
    {
      "@type": "Organization",
      "@id": `${baseUrl}/#community`,
      name: "Bishnoi community",
      alternateName: ["Bishnoi", "Vishnoi", "Bishnoi Panth"],
      url: `${baseUrl}/bishnoi`,
      foundingDate: "1485",
      founder: { "@id": `${baseUrl}/#jambheshwar` },
      description:
        "A Vaishnava religious and social community of the Thar Desert in western Rajasthan, formed around the twenty-nine niyamas set out by Guru Jambheshwar in 1485.",
      sameAs: ["https://en.wikipedia.org/wiki/Bishnoi"],
    },
    {
      "@type": "Person",
      "@id": `${baseUrl}/#jambheshwar`,
      name: "Guru Jambheshwar",
      alternateName: ["Jambhoji", "Jambhaji", "Jambheshwar Bhagwan"],
      birthDate: "1451",
      deathDate: "1536",
      birthPlace: { "@type": "Place", name: "Peepasar, Nagaur, Rajasthan" },
      url: `${baseUrl}/bishnoi/guru-jambheshwar`,
      description:
        "The teacher around whom the Bishnoi way of life formed. Established the tradition at Samrathal Dhora in 1485 and set out the twenty-nine niyamas recorded in the Shabadwani.",
    },
    {
      "@type": "Person",
      "@id": `${baseUrl}/#amritadevi`,
      name: "Amrita Devi",
      alternateName: "Amrita Devi Bishnoi",
      deathDate: "1730-09",
      url: `${baseUrl}/bishnoi/amrita-devi`,
      description:
        "A Bishnoi woman of Marwar killed in September 1730 refusing to let khejri trees be felled. The Government of India's Amrita Devi Bishnoi National Award for wildlife protection carries her name.",
      sameAs: ["https://en.wikipedia.org/wiki/Amrita_Devi"],
    },
    {
      "@type": "Event",
      "@id": `${baseUrl}/#khejarli`,
      name: "The Khejarli massacre",
      startDate: "1730-09",
      url: `${baseUrl}/bishnoi/khejarli`,
      location: { "@type": "Place", name: "Khejarli, near Jodhpur, Rajasthan" },
      description:
        "363 Bishnois were killed defending a grove of khejri trees from a timber party sent by Maharaja Abhai Singh of Marwar. Commemorated in India on 11 September as National Forest Martyrs Day.",
      sameAs: ["https://en.wikipedia.org/wiki/Khejarli_massacre"],
    },
    {
      "@type": "DefinedTermSet",
      "@id": `${baseUrl}/#niyamas`,
      name: "The 29 Bishnoi principles",
      alternateName: "The 29 niyamas",
      url: `${baseUrl}/bishnoi/29-principles`,
      description:
        "Twenty-nine rules set out by Guru Jambheshwar in 1485, recorded in the Shabadwani, covering worship, personal discipline, social conduct, and the treatment of animals and vegetation. Eight concern the environment.",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${onest.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
