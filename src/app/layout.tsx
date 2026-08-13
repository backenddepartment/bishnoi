import type { Metadata } from "next";
import { Onest } from "next/font/google";
import "./globals.css";

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Bishnoi — Rooted in five hundred years. Building for what comes next.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${onest.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
