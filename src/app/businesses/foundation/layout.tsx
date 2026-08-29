import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Naresh Bishnoi Foundation | Bishnoi",
  description:
    "A lifelong commitment to education, empowerment, cultural growth, and environmental stewardship — funding desert eco-restoration, community conservation, and educational opportunity carrying a five-hundred-year ecological ethic forward.",
  keywords: [
    "Naresh Bishnoi Foundation",
    "NBF",
    "Bishnoi Conservation",
    "Wildlife Preservation",
    "29 Principles",
    "Guru Jambheshwar",
    "UN Global Compact",
  ],
  openGraph: {
    title: "Naresh Bishnoi Foundation | Bishnoi",
    description:
      "Education, empowerment, cultural growth, and environmental stewardship — carrying a five-hundred-year ecological ethic forward.",
    url: "/businesses/foundation",
    type: "website",
    images: [
      {
        url: "/hero_wildlife.jpg",
        width: 1200,
        height: 630,
        alt: "Naresh Bishnoi Foundation",
      },
    ],
  },
  alternates: {
    canonical: "/businesses/foundation",
  },
};

export default function FoundationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
