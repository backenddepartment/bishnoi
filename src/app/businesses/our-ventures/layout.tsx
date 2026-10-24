import type { Metadata } from "next";

/* Unlinked landing page: reachable only by direct URL / QR code, so this
   metadata is its entire presence on Google — it is in sitemap.xml (see
   src/lib/seo.ts, hidden: true) but carries no link from the site's own
   navigation, footer, or human sitemap. */
export const metadata: Metadata = {
  title: "Our Ventures — Getmeds & 2MG Incorporated | Bishnoi",
  description:
    "The two companies at the heart of the Bishnoi healthcare group: Getmeds, the global pharmacy and healthcare network spanning the Philippines, India, Vanuatu, Latin America and Southeast Asia, and 2MG Incorporated, the holding company behind it.",
  keywords: [
    "Getmeds",
    "2MG Incorporated",
    "2MG Inc",
    "Bishnoi Ventures",
    "Online Pharmacy Philippines",
    "Pharmaceutical Distribution",
    "Healthcare Holding Company",
    "Oncology Medicine Supply",
  ],
  openGraph: {
    title: "Our Ventures — Getmeds & 2MG Incorporated | Bishnoi",
    description:
      "Getmeds, the global pharmacy and healthcare network, and 2MG Incorporated, the holding company behind it.",
    url: "/businesses/our-ventures",
    type: "website",
    images: [
      {
        url: "/getmedsph.jpeg",
        width: 1200,
        height: 630,
        alt: "Getmeds and 2MG Incorporated — ventures of the Bishnoi group",
      },
    ],
  },
  alternates: {
    canonical: "/businesses/our-ventures",
  },
};

export default function OurVenturesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
