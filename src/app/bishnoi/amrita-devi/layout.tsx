import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Amrita Devi",
  description:
    "The Bishnoi woman who refused to let the Maharaja of Marwar's men fell the khejri trees in 1730, and was killed for it \u2014 and the national wildlife protection award that now carries her name.",
  keywords: [
    "Amrita Devi",
    "Amrita Devi Bishnoi",
    "who was Amrita Devi",
    "Amrita Devi Bishnoi award",
    "first tree hugger",
    "Khejarli",
    "Asu Ratni Bhagu"
  ],
  openGraph: {
    title: "Amrita Devi",
    description:
      "She refused first, and was killed for it. 362 others died after her, every one of them knowing what had happened.",
    url: "/bishnoi/amrita-devi",
    type: "article",
    images: [
      {
        url: "/legacy/sacrifice.jpg",
        width: 1200,
        height: 630,
        alt: "Amrita Devi, killed at Khejarli in 1730",
      },
    ],
  },
  alternates: {
    canonical: "/bishnoi/amrita-devi",
  },
};

export default function AmritaDeviLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
