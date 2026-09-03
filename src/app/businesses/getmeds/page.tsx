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
    name: "Getmeds Philippines",
    url: "https://getmeds.ph",
    description: "A healthcare and pharmaceutical company focused on expanding access to essential medicines in the Philippines.",
  },
  {
    name: "Getmeds Healthcare (India)",
    url: "https://getmedshealthcare.com",
    description: "A pharmaceutical exporter from India to the world, enabling patients to access essential and specialized medicines through compassionate access.",
  },
  {
    name: "Getmeds Vanuatu",
    description: "The first specialty pharmacy in the Pacific, serving communities in Vanuatu with local access to life-saving cancer medicines.",
  },
  {
    name: "Getmeds Latin America",
    description: "Expanding Getmeds' footprint across Latin America, forging new partnerships and establishing a stronger presence across the region.",
  },
  {
    name: "Getmeds Southeast Asia (SEA)",
    url: "#",
    description: "Growing Getmeds' presence across Southeast Asia, connecting patients and healthcare providers to essential medicines throughout the region.",
  },
  {
    name: "2MG Incorporated",
    url: "https://2mginc.com/",
    description: "The holding company behind the Getmeds group of businesses, providing strategic direction and support across its healthcare ventures worldwide.",
  },
];

export default function GetmedsPage() {
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

      <main id="main-content" style={{ background: "#ffffff", minHeight: "100vh", color: "var(--ink)" }}>
        <Hero
          onOpenRequestModal={() => setModalOpen(true)}
          onScrollTo={handleScrollTo}
          introReady={true}
          variant="getmeds"
        />

        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Businesses", href: "/businesses" }, { label: "Getmeds" }]} />

        <BusinessProfile
          overview="A centralized global healthcare platform delivering pharmaceutical distribution, digital health services, and patient-first logistics across five international hubs — spanning the Philippines, India, Vanuatu, Latin America, and Southeast Asia."
          whatItDoes="Getmeds moves medicines across borders — from oncology medicine supply and rare medicines sourcing to compassionate access programs and medicine donations — connecting patients and healthcare institutions with essential and specialized medicines wherever the demand exists."
          marketsLabel="Markets"
          markets={["Philippines", "India", "Vanuatu", "Latin America", "Southeast Asia"]}
          entities={ENTITIES}
          onOpenRequestModal={() => setModalOpen(true)}
        />
      </main>

      <Footer onOpenRequestModal={() => setModalOpen(true)} introReady={true} />
    </>
  );
}
