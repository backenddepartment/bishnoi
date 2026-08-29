import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Bishnoi Ecosystem",
  description:
    "Who is Bishnoi: A global business ecosystem building and operating ventures across healthcare, pharmaceutical access, medical supply, and social impact — guided by long-term stewardship.",
  keywords: [
    "Bishnoi Ecosystem",
    "Who We Are",
    "Bishnoi Corporate Identity",
    "Bishnoi Vision & Values",
    "Ethical Enterprise",
    "Global Healthcare Ecosystem",
  ],
  openGraph: {
    title: "About Us | Bishnoi Ecosystem",
    description:
      "One Identity. Multiple Ventures. One Purpose. Discover how the Bishnoi ecosystem operates across healthcare, medical supply, and social initiatives.",
    url: "/about",
    type: "website",
    images: [
      {
        url: "/hero_pharma.jpg",
        width: 1200,
        height: 630,
        alt: "About Bishnoi Ecosystem",
      },
    ],
  },
  alternates: {
    canonical: "/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
