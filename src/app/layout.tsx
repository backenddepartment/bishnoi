import type { Metadata } from "next";
import { Onest } from "next/font/google";
import "./globals.css";

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bishnoi.ai";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Naresh Kumar Bishnoi | Bishnoi Ecosystem & Global Healthcare",
    template: "%s | Naresh Kumar Bishnoi",
  },
  description:
    "Naresh Kumar Bishnoi — Founder of Getmeds & 2MG Inc, Oncology Medicine Supply Specialist, and leader behind Getmeds Ecosystem, Bishnoi Omniverse, Naresh Bishnoi Foundation, and global healthcare initiatives.",
  keywords: [
    "Naresh Kumar Bishnoi",
    "Naresh Bishnoi",
    "Getmeds",
    "Getmeds Philippines",
    "Getmeds Healthcare",
    "Getmeds Vanuatu",
    "Getmeds Latam",
    "Bishnoi Omniverse",
    "Oncology Medicine Supply",
    "Rare Medicines",
    "2MG Inc",
    "UN Global Compact Member",
    "European Society for Medical Oncology",
    "Naresh Bishnoi Foundation",
    "Global Healthcare Exporter",
  ],
  authors: [{ name: "Naresh Kumar Bishnoi", url: baseUrl }],
  creator: "Naresh Kumar Bishnoi",
  publisher: "Bishnoi Omniverse",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Naresh Kumar Bishnoi | Bishnoi Ecosystem & Global Healthcare",
    description:
      "From a small village in Haryana, India, to building businesses serving healthcare markets and communities around the world.",
    url: baseUrl,
    siteName: "Bishnoi Omniverse",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/hero_pharma.jpg",
        width: 1200,
        height: 630,
        alt: "Naresh Kumar Bishnoi - Global Healthcare Ecosystem",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Naresh Kumar Bishnoi | Bishnoi Ecosystem & Global Healthcare",
    description:
      "Advancing healthcare across borders through Getmeds Ecosystem, Bishnoi Omniverse, and global initiatives.",
    images: ["/hero_pharma.jpg"],
  },
  alternates: {
    canonical: "./",
  },
  icons: {
    icon: [
      { url: "/logo_favicon.png", type: "image/png" },
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: "/apple-icon.png",
    shortcut: "/logo_favicon.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${baseUrl}/#person`,
      name: "Naresh Kumar Bishnoi",
      jobTitle: "Founder & Global Healthcare Leader",
      description:
        "Founder of Getmeds & 2MG Inc, Oncology Medicine Supply Specialist, UN Global Compact Member, and ESMO Member.",
      knowsAbout: [
        "Pharmaceutical Distribution",
        "Oncology Medicine Supply",
        "Compassionate Medicine Access",
        "Healthcare Supply Chain",
        "Global Healthcare Infrastructure",
      ],
      worksFor: [
        {
          "@type": "Organization",
          name: "Getmeds Ecosystem",
          url: "https://getmeds.ph",
        },
        {
          "@type": "Organization",
          name: "Bishnoi Omniverse",
          url: "https://bishnoi-omniverse.in",
        },
      ],
      sameAs: [
        "https://getmeds.ph",
        "https://getmedshealthcare.com",
        "https://getmedsvanuatu.com",
        "https://getmedslatam.com",
        "https://nbf.com",
        "https://nkb.com",
      ],
    },
    {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      name: "Bishnoi Omniverse & Getmeds Ecosystem",
      url: baseUrl,
      logo: `${baseUrl}/logo.png`,
      founder: {
        "@id": `${baseUrl}/#person`,
      },
      description:
        "A global conglomerate and healthcare supply powerhouse advancing pharmaceutical distribution, agritech, and philanthropic initiatives across India, Philippines, Vanuatu, and Latin America.",
      memberOf: {
        "@type": "Organization",
        name: "United Nations Global Compact",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`,
      url: baseUrl,
      name: "Naresh Kumar Bishnoi | Bishnoi Omniverse",
      publisher: {
        "@id": `${baseUrl}/#organization`,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${onest.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
