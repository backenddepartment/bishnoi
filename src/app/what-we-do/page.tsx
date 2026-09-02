"use client";

import Header from "@/components/Header";
import NavOverlay from "@/components/NavOverlay";
import Footer from "@/components/Footer";
import RequestModal from "@/components/RequestModal";
import Hero from "@/components/Hero";
import Breadcrumbs from "@/components/Breadcrumbs";
import Portfolio from "@/components/Portfolio";
import { useLenisPage, scrollToOrNavigate } from "@/hooks/useLenisPage";

interface Capability {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  linkLabel: string;
}

const CAPABILITIES: Capability[] = [
  {
    eyebrow: "Healthcare & Pharmaceutical Access",
    title: "Pharmaceutical Distribution & Patient Logistics",
    description:
      "Cross-border movement of essential medications, specialty oncology therapies, rare medicines sourcing, and compassionate medicine access across international healthcare markets.",
    href: "/businesses/getmeds",
    linkLabel: "Explore how Getmeds delivers this capability →",
  },
  {
    eyebrow: "Hospital Infrastructure",
    title: "Hospital Supply & Medical Devices",
    description:
      "Integrated procurement, medical consumables supply, hospital furniture, specialized equipment, and healthcare infrastructure solutions supporting institutional care.",
    href: "/businesses/bishnoi-omniverse",
    linkLabel: "Explore how Bishnoi Omniverse delivers this capability →",
  },
  {
    eyebrow: "Philanthropy & Environmental Ethics",
    title: "Social Impact & Conservation",
    description:
      "Wildlife preservation, desert eco-restoration, afforestation initiatives, community welfare, and long-horizon environmental stewardship.",
    href: "/businesses/foundation",
    linkLabel: "Explore how the Foundation delivers this capability →",
  },
];

export default function WhatWeDoPage() {
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
          variant="what-we-do"
        />

        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "What We Do" }]} />

        <section style={{ padding: "3rem 0 6rem" }}>
          <div className="shell" style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <p style={{ fontSize: "1.3125rem", lineHeight: 1.6, color: "var(--ink-soft)", maxWidth: "62ch", marginBottom: "3.5rem" }}>
              Every business in the Bishnoi ecosystem runs independently, but each one falls under one of three
              capabilities the group actually builds and operates.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
              {CAPABILITIES.map((cap, i) => (
                <div
                  key={cap.title}
                  className="grid grid-cols-1 lg:grid-cols-12"
                  style={{
                    gap: "2rem",
                    // Rules separate the capabilities from each other — the last
                    // one needs none, since the Portfolio section below already
                    // opens with its own divider.
                    paddingBottom: i === CAPABILITIES.length - 1 ? 0 : "3rem",
                    borderBottom: i === CAPABILITIES.length - 1 ? "none" : "1px solid rgba(74,68,60,.12)",
                  }}
                >
                  <div className="lg:col-span-4">
                    <div className="eyebrow eyebrow-dark" style={{ fontSize: "1rem" }}>
                      <span className="dot dot-blink"></span> {cap.eyebrow}
                    </div>
                    <h2 style={{ marginTop: ".75rem", fontSize: "clamp(1.75rem, 3vw, 2.25rem)", fontWeight: 700, letterSpacing: "-.02em", color: "#2E2822" }}>
                      {cap.title}
                    </h2>
                  </div>
                  <div className="lg:col-span-8" style={{ display: "flex", flexDirection: "column", gap: "1.25rem", justifyContent: "center" }}>
                    <p style={{ fontSize: "1.0625rem", lineHeight: 1.7, color: "var(--ink-soft)" }}>{cap.description}</p>
                    <a href={cap.href} className="pill-btn" style={{ alignSelf: "flex-start" }}>
                      <span className="pill-inner pill-outline pill-no-arrow" style={{ borderColor: "rgba(74,68,60,.25)", background: "rgba(74,68,60,.04)", color: "var(--ink)" }}>
                        {cap.linkLabel}
                      </span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Global Business Ecosystem — renders the home page's own Portfolio
            section verbatim so the tile grid stays pixel-identical across both
            pages. Wrapped only to carry the divider rule; the component itself
            paints its own white background and padding. */}
        <div style={{ borderTop: "1px solid #E6DECB" }}>
          <Portfolio />
        </div>

        {/* Corporate Ethos & Governance Gateway — mirrors the closing section
            on the home page. */}
        <section style={{ background: "#ffffff", color: "var(--ink)", padding: "5rem 0", borderTop: "1px solid #E6DECB" }}>
          <div className="shell">
            <div className="grid grid-cols-1 lg:grid-cols-12" style={{ gap: "2.5rem", alignItems: "center" }}>
              <div className="lg:col-span-7" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <div className="eyebrow eyebrow-dark" style={{ fontSize: "1.125rem", color: "var(--brand-orange)" }}>
                  <span className="dot dot-blink"></span> Corporate Ethos &amp; Governance
                </div>
                <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 2.75rem)", fontWeight: 700, lineHeight: 1.2, letterSpacing: "-.02em", color: "#2E2822" }}>
                  Rooted in principles that endure. Guided by long-horizon stewardship.
                </h2>
                <p style={{ fontSize: "1.125rem", lineHeight: 1.65, color: "var(--ink-soft)", margin: 0 }}>
                  Explore how the Bishnoi ecosystem combines ethical enterprise, multi-venture operations, and centuries of conservation philosophy into one connected corporate identity.
                </p>
              </div>

              <div className="lg:col-span-5" style={{ display: "flex", flexDirection: "column", gap: "1rem", justifyContent: "center" }}>
                <a href="/about" className="pill-btn" style={{ width: "100%" }}>
                  <span className="pill-inner pill-accent pill-with-arrow" style={{ width: "100%", justifyContent: "space-between", padding: "1rem 1.75rem", fontSize: "1.0625rem", color: "#ffffff" }}>
                    Explore About &amp; Operating Ethos <span className="pill-badge up-right">→</span>
                  </span>
                </a>

                <a href="/leadership/naresh-bishnoi" className="pill-btn" style={{ width: "100%" }}>
                  <span className="pill-inner pill-outline pill-with-arrow" style={{ width: "100%", justifyContent: "space-between", padding: "1rem 1.75rem", fontSize: "1.0625rem" }}>
                    Leadership Profile (Naresh Bishnoi) <span className="pill-badge up-right">↗</span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer onOpenRequestModal={() => setModalOpen(true)} introReady={true} />
    </>
  );
}
