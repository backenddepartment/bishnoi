import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sitemap | Bishnoi",
  description:
    "Every page on bishnoi.ai in one list — the Bishnoi community reference pages, the business ecosystem, and leadership. The same routes are served as sitemap.xml and image-sitemap.xml.",
  keywords: ["Bishnoi sitemap", "bishnoi.ai site index", "all pages"],
  openGraph: {
    title: "Sitemap | Bishnoi",
    description: "Every page on bishnoi.ai in one list.",
    url: "/sitemap",
    type: "website",
  },
  alternates: {
    canonical: "/sitemap",
  },
};

export default function SitemapLayout({ children }: { children: React.ReactNode }) {
  return children;
}
