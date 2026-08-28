import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Heritage",
  description:
    "The story of the Bishnoi community — a faith founded in 1485, 29 guiding principles, and 363 lives given at Khejarli in 1730 — and how that heritage still shapes the businesses built in its name.",
  keywords: [
    "Bishnoi Community",
    "Bishnoi Heritage",
    "Guru Jambheshwar",
    "29 Principles",
    "Khejarli Massacre",
    "Amrita Devi",
    "Mukam",
    "Naresh Kumar Bishnoi",
  ],
  openGraph: {
    title: "Our Heritage",
    description:
      "A faith founded in 1485, 29 guiding principles, and 363 lives given at Khejarli — the heritage behind the Bishnoi ecosystem.",
    url: "/heritage",
    type: "website",
    images: [
      {
        url: "/hero_wildlife.jpg",
        width: 1200,
        height: 630,
        alt: "The Bishnoi Community Heritage",
      },
    ],
  },
  alternates: {
    canonical: "/heritage",
  },
};

export default function HeritageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
