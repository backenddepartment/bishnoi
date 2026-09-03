import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The 29 Bishnoi Principles",
  description:
    "All twenty-nine niyamas set out by Guru Jambheshwar in 1485 \u2014 including the rule against wearing blue, because indigo dye is drawn from the indigo plant \u2014 with the source text and what living by them meant.",
  keywords: [
    "29 Bishnoi principles",
    "29 principles of Bishnoi",
    "Bishnoi rules",
    "Bishnoi niyamas",
    "why don't Bishnoi wear blue",
    "Bishnoi vegetarian",
    "Shabadwani",
    "Guru Jambheshwar principles"
  ],
  openGraph: {
    title: "The 29 Bishnoi Principles",
    description:
      "All twenty-nine niyamas, in full, with the source text and what living by them actually meant.",
    url: "/bishnoi/29-principles",
    type: "article",
    images: [
      {
        url: "/hero_wildlife.jpg",
        width: 1200,
        height: 630,
        alt: "The 29 principles of the Bishnoi tradition",
      },
    ],
  },
  alternates: {
    canonical: "/bishnoi/29-principles",
  },
};

export default function TwentyNinePrinciplesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
