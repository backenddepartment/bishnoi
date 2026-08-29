import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bishnoi Omniverse | Bishnoi",
  description:
    "Bishnoi Omniverse is building a healthcare supply powerhouse serving hospitals across India and the Philippines — medical supplies, equipment, systems, and large-scale hospital requirements.",
  keywords: [
    "Bishnoi Omniverse",
    "Hospital Supply",
    "Medical Devices",
    "Medical Equipment",
    "Healthcare Infrastructure",
    "Hospital Equipment India",
    "Hospital Equipment Philippines",
  ],
  openGraph: {
    title: "Bishnoi Omniverse | Bishnoi",
    description:
      "Building a healthcare supply powerhouse serving hospitals across India and the Philippines.",
    url: "/businesses/bishnoi-omniverse",
    type: "website",
    images: [
      {
        url: "/bishnoiimage.jpeg",
        width: 1200,
        height: 630,
        alt: "Bishnoi Omniverse",
      },
    ],
  },
  alternates: {
    canonical: "/businesses/bishnoi-omniverse",
  },
};

export default function BishnoiOmniverseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
