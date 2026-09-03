import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bishnoi: History, Principles and Living Legacy",
  description:
    "Who the Bishnois are \u2014 a Vaishnava community of the Thar Desert formed around 29 principles set out by Guru Jambheshwar in 1485, the 363 killed at Khejarli in 1730, and the tradition as it is lived today.",
  keywords: [
    // History queries first, in the phrasings people actually type. The
    // page has to answer these in its headings and body for any of it to
    // matter — the meta tag alone does nothing in Google. See the timeline
    // and FAQ sections in page.tsx, which carry the same phrasings as text.
    "Bishnoi history",
    "history of Bishnoi",
    "history of Bishnoi community",
    "Bishnoi community history",
    "Bishnoi origin",
    "origin of Bishnoi community",
    "Bishnoi religion history",
    "Bishnoi ka itihas",
    "Bishnoi samaj history",
    "Bishnoi timeline",
    "when was Bishnoi founded",
    "who founded Bishnoi religion",
    "Bishnoi 1485",
    "Bishnoi Panth",
    // The entity itself.
    "Bishnoi",
    "Bishnoi community",
    "who are the Bishnoi",
    "Bishnoi people",
    "Bishnoi Rajasthan",
    "Bishnoi religion",
    "Bishnoi caste",
    "Guru Jambheshwar",
    "29 principles",
    "Khejarli"
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
