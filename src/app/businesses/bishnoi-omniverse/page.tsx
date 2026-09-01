"use client";

import Header from "@/components/Header";
import NavOverlay from "@/components/NavOverlay";
import Footer from "@/components/Footer";
import RequestModal from "@/components/RequestModal";
import Hero from "@/components/Hero";
import Breadcrumbs from "@/components/Breadcrumbs";
import BusinessProfile from "@/components/BusinessProfile";
import { useLenisPage, scrollToOrNavigate } from "@/hooks/useLenisPage";

const ENTITIES = [
  {
    name: "Bishnoi Omniverse India",
    url: "https://bishnoi-omniverse.in",
    description: "The India operation of Bishnoi Omniverse's hospital supply and healthcare infrastructure business.",
  },
  {
    name: "Bishnoi Omniverse Philippines",
    url: "https://bishnoi-omniverse.ph",
    description: "The Philippines operation of Bishnoi Omniverse's hospital supply and healthcare infrastructure business.",
  },
];

export default function BishnoiOmniversePage() {
  const { navOpen, setNavOpen, modalOpen, setModalOpen, lenisRef } = useLenisPage();

  const handleScrollTo = (id: string) => scrollToOrNavigate(id, lenisRef);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-60 focus:rounded-control focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>

      <Header
        onOpenNav={() => setNavOpen(true)}
        onOpenRequestModal={() => setModalOpen(true)}
        onScrollTo={handleScrollTo}
        introReady={true}
      />

      <NavOverlay
        isOpen={navOpen}
        onClose={() => setNavOpen(false)}
        onScrollTo={handleScrollTo}
        onOpenRequestModal={() => setModalOpen(true)}
      />

      <RequestModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      <main id="main-content" style={{ background: "#FBF8F1", minHeight: "100vh", color: "var(--ink)" }}>
        <Hero
          onOpenRequestModal={() => setModalOpen(true)}
          onScrollTo={handleScrollTo}
          introReady={true}
          variant="bishnoi-omniverse"
        />

        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Businesses", href: "/businesses" }, { label: "Bishnoi Omniverse" }]} />

        <BusinessProfile
          overview="Bishnoi Omniverse is building a healthcare supply powerhouse designed to serve hospitals across the full spectrum of their needs — from essential medical supplies and medicines to specialized products and large-scale hospital requirements."
          whatItDoes="Building the infrastructure behind healthcare: medical supplies, equipment, systems and solutions that hospitals and healthcare institutions depend on, delivered at the scale their operations require."
          marketsLabel="Footprint"
          markets={["India", "Philippines"]}
          entities={ENTITIES}
          onOpenRequestModal={() => setModalOpen(true)}
        />
      </main>

      <Footer onOpenRequestModal={() => setModalOpen(true)} introReady={true} />
    </>
  );
}
