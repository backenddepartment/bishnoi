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
    name: "Naresh Bishnoi Foundation",
    url: "https://nbf.com",
    description: "A lifelong commitment to education, empowerment, innovation, and cultural growth — creating opportunities through education, emerging fields, agricultural development, and the advancement of Indian culture.",
  },
  {
    name: "United Nations Global Compact",
    url: "https://unglobalcompact.org",
    description: "The Foundation's parent ecosystem is a member of the United Nations Global Compact, committed to responsible business and advancing sustainable development.",
  },
];

export default function FoundationPage() {
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
          variant="foundation"
        />

        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Businesses", href: "/businesses" }, { label: "Foundation" }]} />

        <BusinessProfile
          overview="Dedicated to wildlife preservation, mass afforestation, and the living stewardship of Guru Jambheshwar's 29 Principles — funding desert eco-restoration projects and community conservation programs that carry a five-hundred-year ecological ethic forward."
          whatItDoes="A lifelong commitment to education, empowerment, innovation, and cultural growth alongside its conservation work — creating opportunities through education, emerging fields, agricultural development, and the advancement of Indian culture, empowering communities and creating lasting impact for generations."
          marketsLabel="Focus Areas"
          markets={["Wildlife Conservation", "Desert Eco-Restoration", "Education", "Agricultural Development", "Cultural Advancement"]}
          entities={ENTITIES}
          entitiesLabel="Related Entities & Commitments"
          onOpenRequestModal={() => setModalOpen(true)}
        />
      </main>

      <Footer onOpenRequestModal={() => setModalOpen(true)} introReady={true} />
    </>
  );
}
