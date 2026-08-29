import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "What We Do",
  description:
    "The capabilities behind the Bishnoi ecosystem: healthcare, pharmaceutical distribution, hospital supply and medical devices, and social impact.",
  keywords: [
    "Bishnoi Capabilities",
    "Healthcare",
    "Pharmaceutical Distribution",
    "Medical Supply",
    "Hospital Solutions",
    "Social Impact",
    "Bishnoi Omniverse",
    "Getmeds",
  ],
  openGraph: {
    title: "What We Do",
    description:
      "Healthcare, pharmaceutical distribution, hospital supply, and social impact — the capabilities behind every business in the Bishnoi ecosystem.",
    url: "/what-we-do",
    type: "website",
    images: [
      {
        url: "/hero_pharma.jpg",
        width: 1200,
        height: 630,
        alt: "What Bishnoi Does",
      },
    ],
  },
  alternates: {
    canonical: "/what-we-do",
  },
};

export default function WhatWeDoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
