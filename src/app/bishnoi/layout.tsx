import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bishnoi: History, Principles and Living Legacy",
  description:
    "Who the Bishnois are \u2014 a Vaishnava community of the Thar Desert formed around 29 principles set out by Guru Jambheshwar in 1485, the 363 killed at Khejarli in 1730, and the tradition as it is lived today.",
  keywords: [
    "Bishnoi",
    "Bishnoi community",
    "who are the Bishnoi",
    "Bishnoi people",
    "Bishnoi history",
    "Bishnoi Rajasthan",
    "Bishnoi religion",
    "Bishnoi tribe",
    "Guru Jambheshwar",
    "29 principles"
  ],
  openGraph: {
    title: "Bishnoi: History, Principles and Living Legacy",
    description:
      "A Vaishnava community of the Thar Desert, formed around twenty-nine principles set out in 1485 \u2014 and the tradition as it is lived today.",
    url: "/bishnoi",
    type: "article",
    images: [
      {
        url: "/hero_wildlife.jpg",
        width: 1200,
        height: 630,
        alt: "The Thar Desert, homeland of the Bishnoi community",
      },
    ],
  },
  alternates: {
    canonical: "/bishnoi",
  },
};

export default function BishnoiLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
