import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guru Jambheshwar (1451\u20131536)",
  description:
    "Jambhoji, the teacher around whom the Bishnoi way of life formed: born 1451 at Peepasar, founded the tradition at Samrathal Dhora in 1485, and set out the 29 niyamas recorded in the Shabadwani.",
  keywords: [
    "Guru Jambheshwar",
    "Jambhoji",
    "Jambhaji",
    "Jambheshwar Bhagwan",
    "who founded Bishnoi",
    "Bishnoi founder",
    "Shabadwani",
    "Samrathal Dhora",
    "Peepasar",
    "Mukam"
  ],
  openGraph: {
    title: "Guru Jambheshwar (1451\u20131536)",
    description:
      "The teacher around whom the Bishnoi way of life formed \u2014 and the fifteenth-century drought his twenty-nine rules answered.",
    url: "/bishnoi/guru-jambheshwar",
    type: "article",
    images: [
      {
        url: "/hero_wildlife.jpg",
        width: 1200,
        height: 630,
        alt: "Guru Jambheshwar, founder of the Bishnoi tradition",
      },
    ],
  },
  alternates: {
    canonical: "/bishnoi/guru-jambheshwar",
  },
};

export default function GuruJambheshwarLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
