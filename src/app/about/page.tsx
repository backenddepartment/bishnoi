"use client";

import Header from "@/components/Header";
import NavOverlay from "@/components/NavOverlay";
import Footer from "@/components/Footer";
import RequestModal from "@/components/RequestModal";
import Hero from "@/components/Hero";
import Breadcrumbs from "@/components/Breadcrumbs";
import EcosystemStructure from "@/components/EcosystemStructure";
import Stats from "@/components/Stats";
import OurVision from "@/components/OurVision";
import { useLenisPage, scrollToOrNavigate } from "@/hooks/useLenisPage";

export default function AboutPage() {
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
          variant="intro"
        />

        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About Us" }]} />

        {/* Corporate Identity Narrative */}
        <section style={{ padding: "4rem 0 5rem" }}>
          <div className="shell" style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div className="grid grid-cols-1 lg:grid-cols-12" style={{ gap: "3rem" }}>
              <div className="lg:col-span-5">
                <div className="eyebrow eyebrow-dark" style={{ marginBottom: "1rem" }}>
                  <span className="dot dot-blink"></span> Corporate Identity
                </div>
                <h1 style={{ fontSize: "clamp(2.25rem, 4vw, 3.25rem)", fontWeight: 700, color: "#2E2822", letterSpacing: "-.02em", lineHeight: 1.15 }}>
                  One Identity.<br />Multiple Ventures.<br />One Purpose.
                </h1>
              </div>

              <div className="lg:col-span-7" style={{ display: "flex", flexDirection: "column", gap: "1.5rem", justifyContent: "center" }}>
                <p style={{ fontSize: "1.1875rem", lineHeight: 1.65, color: "var(--ink-soft)" }}>
                  Bishnoi is a global business ecosystem building and operating entities across healthcare, pharmaceutical access, medical supply, and social impact.
                </p>
                <p style={{ fontSize: "1.0625rem", lineHeight: 1.7, color: "var(--ink-soft)" }}>
                  Rather than functioning as a traditional single-product company, Bishnoi operates as a connected umbrella. Every business under this identity maintains operational focus while sharing a common commitment to long-term stewardship, ethical enterprise, and positive human impact.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", paddingTop: "0.5rem" }}>
                  <a href="/businesses" className="pill-btn">
                    <span className="pill-inner pill-accent pill-with-arrow">
                      Explore Our Businesses <span className="pill-badge up-right">↗</span>
                    </span>
                  </a>
                  <a href="/heritage" className="pill-btn">
                    <span className="pill-inner pill-outline pill-no-arrow" style={{ borderColor: "rgba(74,68,60,.25)", background: "rgba(74,68,60,.04)", color: "var(--ink)" }}>
                      Discover Our Heritage →
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ecosystem Structure Diagram */}
        <EcosystemStructure />

        {/* Vision & Values Section */}
        <OurVision />

        {/* Principles & Mission Stats */}
        <Stats introReady={true} />

        {/* Navigation CTAs to Leadership & Capabilities */}
        <section style={{ padding: "5rem 0", background: "#FFFFFF", borderTop: "1px solid rgba(74,68,60,0.08)" }}>
          <div className="shell" style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "2rem" }}>
              <div
                style={{
                  background: "#FBF8F1",
                  borderRadius: "1.5rem",
                  padding: "2.5rem",
                  border: "1px solid rgba(74,68,60,0.1)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: "1.5rem",
                }}
              >
                <div>
                  <div className="eyebrow eyebrow-dark" style={{ marginBottom: "0.5rem" }}>Ecosystem Leadership</div>
                  <h3 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#2E2822" }}>Who Leads Bishnoi</h3>
                  <p style={{ marginTop: "0.75rem", fontSize: "1rem", color: "var(--ink-soft)", lineHeight: 1.6 }}>
                    Learn about Naresh Kumar Bishnoi, founder of Getmeds & 2MG Inc, and his work advancing global healthcare access and ethical business stewardship.
                  </p>
                </div>
                <a href="/leadership/naresh-bishnoi" className="pill-btn" style={{ alignSelf: "flex-start" }}>
                  <span className="pill-inner pill-accent pill-with-arrow">
                    Leadership Profile <span className="pill-badge up-right">↗</span>
                  </span>
                </a>
              </div>

              <div
                style={{
                  background: "#FBF8F1",
                  borderRadius: "1.5rem",
                  padding: "2.5rem",
                  border: "1px solid rgba(74,68,60,0.1)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: "1.5rem",
                }}
              >
                <div>
                  <div className="eyebrow eyebrow-dark" style={{ marginBottom: "0.5rem" }}>Operational Capabilities</div>
                  <h3 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#2E2822" }}>What We Do</h3>
                  <p style={{ marginTop: "0.75rem", fontSize: "1rem", color: "var(--ink-soft)", lineHeight: 1.6 }}>
                    Explore the specific capabilities provided across our ecosystem—from pharmaceutical distribution and hospital supply to conservation impact.
                  </p>
                </div>
                <a href="/what-we-do" className="pill-btn" style={{ alignSelf: "flex-start" }}>
                  <span className="pill-inner pill-outline pill-no-arrow" style={{ borderColor: "rgba(74,68,60,.25)", background: "rgba(74,68,60,.04)", color: "var(--ink)" }}>
                    View Capabilities →
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
