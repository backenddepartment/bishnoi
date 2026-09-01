import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Naresh Kumar Bishnoi",
  description:
    "Biography and leadership profile of Naresh Kumar Bishnoi — Founder of Getmeds & 2MG Inc, Oncology Medicine Supply Specialist, and leader behind the Bishnoi ecosystem.",
  keywords: [
    "Naresh Kumar Bishnoi",
    "Naresh Bishnoi",
    "Getmeds Founder",
    "Oncology Medicine Supply Specialist",
    "2MG Inc",
    "UN Global Compact Member",
    "European Society for Medical Oncology",
    "Bishnoi Ecosystem Leadership",
  ],
  openGraph: {
    title: "Naresh Kumar Bishnoi | Bishnoi Leadership",
    description:
      "Founder of Getmeds & 2MG Inc, Oncology Medicine Supply Specialist, advancing global healthcare access and ethical enterprise.",
    url: "/leadership/naresh-bishnoi",
    type: "profile",
    images: [
      {
        url: "/hero_pharma.jpg",
        width: 1200,
        height: 630,
        alt: "Naresh Kumar Bishnoi",
      },
    ],
  },
  alternates: {
    canonical: "/leadership/naresh-bishnoi",
  },
};

export default function LeadershipLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
