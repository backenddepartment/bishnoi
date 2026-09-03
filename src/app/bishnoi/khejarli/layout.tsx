import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Khejarli Massacre, 1730",
  description:
    "In September 1730, 363 Bishnois were killed defending khejri trees from the Maharaja of Marwar's timber party. The sequence of that day, what followed it, and why 11 September is National Forest Martyrs Day.",
  keywords: [
    "Khejarli massacre",
    "Khejarli 1730",
    "363 Bishnois",
    "Bishnoi tree protest",
    "Khejadli",
    "Amrita Devi",
    "Abhai Singh Marwar",
    "National Forest Martyrs Day",
    "Chipko origin"
  ],
  openGraph: {
    title: "The Khejarli Massacre, 1730",
    description:
      "363 Bishnois died defending a grove of khejri trees. Almost all of them arrived after the killing had started.",
    url: "/bishnoi/khejarli",
    type: "article",
    images: [
      {
        url: "/legacy/sacrifice.jpg",
        width: 1200,
        height: 630,
        alt: "Khejarli, where 363 Bishnois died in 1730",
      },
    ],
  },
  alternates: {
    canonical: "/bishnoi/khejarli",
  },
};

export default function KhejarliLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
