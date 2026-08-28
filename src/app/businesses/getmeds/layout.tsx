import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Getmeds Healthcare Network | Naresh Kumar Bishnoi",
  description:
    "A centralized global healthcare platform delivering pharmaceutical distribution, digital health services, and patient-first logistics across the Philippines, India, Vanuatu, Latin America, and Southeast Asia.",
  keywords: [
    "Getmeds",
    "Getmeds Philippines",
    "Getmeds Healthcare",
    "Getmeds Vanuatu",
    "Getmeds Latin America",
    "2MG Incorporated",
    "Pharmaceutical Distribution",
    "Oncology Medicine Supply",
    "Rare Medicines",
  ],
  openGraph: {
    title: "Getmeds Healthcare Network | Naresh Kumar Bishnoi",
    description:
      "Pharmaceutical distribution, digital health services, and patient-first logistics across the Philippines, India, Vanuatu, Latin America, and Southeast Asia.",
    url: "/businesses/getmeds",
    type: "website",
    images: [
      {
        url: "/hero_pharma.jpg",
        width: 1200,
        height: 630,
        alt: "Getmeds Healthcare Network",
      },
    ],
  },
  alternates: {
    canonical: "/businesses/getmeds",
  },
};

export default function GetmedsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
