import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "What Does Bishnoi Mean?",
  description:
    "The name is commonly derived from bis (twenty) and noi (nine), for the 29 principles \u2014 the community's own account. A second reading connects it to Vishnu. Both, plus whether Bishnoi is a caste.",
  keywords: [
    "Bishnoi meaning",
    "what does Bishnoi mean",
    "Bishnoi surname origin",
    "Bishnoi name",
    "Bishnoi vs Vishnoi",
    "is Bishnoi a caste",
    "Bishnoi gotras",
    "Bishnoi etymology"
  ],
  openGraph: {
    title: "What Does Bishnoi Mean?",
    description:
      "Twenty-nine, or Vishnu? Two readings of the name, and why the community holds to one of them.",
    url: "/bishnoi/name-and-origin",
    type: "article",
    images: [
      {
        url: "/hero_wildlife.jpg",
        width: 1200,
        height: 630,
        alt: "The origin of the Bishnoi name",
      },
    ],
  },
  alternates: {
    canonical: "/bishnoi/name-and-origin",
  },
};

export default function NameAndOriginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
