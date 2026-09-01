import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Businesses & Global Ecosystem",
  description:
    "Explore the global enterprises, healthcare supply infrastructure, and social initiatives founded by Naresh Kumar Bishnoi: Getmeds Ecosystem, Bishnoi Omniverse, Naresh Bishnoi Foundation, and UN Global Compact commitment.",
  keywords: [
    "Naresh Kumar Bishnoi Businesses",
    "Getmeds Philippines",
    "Getmeds Healthcare",
    "Getmeds Vanuatu",
    "Getmeds Latin America",
    "Bishnoi Omniverse",
    "Naresh Bishnoi Foundation",
    "NKB.COM",
    "UN Global Compact",
  ],
  openGraph: {
    title: "Businesses & Global Ecosystem",
    description:
      "Explore Getmeds Ecosystem, Bishnoi Omniverse, Naresh Bishnoi Foundation, and UN Global Compact commitment.",
    url: "/businesses",
    type: "website",
    images: [
      {
        url: "/hero_pharma.jpg",
        width: 1200,
        height: 630,
        alt: "Businesses of Naresh Kumar Bishnoi",
      },
    ],
  },
  alternates: {
    canonical: "/businesses",
  },
};

export default function BusinessesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
