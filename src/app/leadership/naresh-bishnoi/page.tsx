"use client";

import Header from "@/components/Header";
import NavOverlay from "@/components/NavOverlay";
import Footer from "@/components/Footer";
import RequestModal from "@/components/RequestModal";
import Hero from "@/components/Hero";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useLenisPage, scrollToOrNavigate } from "@/hooks/useLenisPage";

export default function LeadershipPage() {
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

      <main id="main-content" style={{ background: "#FFFFFF", minHeight: "100vh", color: "var(--ink)" }}>
        <Hero
          onOpenRequestModal={() => setModalOpen(true)}
          onScrollTo={handleScrollTo}
          introReady={true}
          variant="founder"
        />

        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Leadership", href: "/leadership/naresh-bishnoi" },
            { label: "Naresh Kumar Bishnoi" },
          ]}
        />

        <section style={{ padding: "4rem 0 7rem" }}>
          <div className="shell" style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div className="grid grid-cols-1 lg:grid-cols-12" style={{ gap: "3.5rem" }}>
              {/* Sidebar Info */}
              <div className="lg:col-span-4">
                <div
                  style={{
                    background: "#FFFFFF",
                    borderRadius: "1.5rem",
                    padding: "2.5rem",
                    border: "1px solid rgba(74,68,60,0.1)",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.03)",
                    position: "sticky",
                    top: "6rem",
                  }}
                >
                  <div className="eyebrow eyebrow-dark" style={{ marginBottom: "1rem" }}>
                    <span className="dot dot-blink"></span> Ecosystem Founder
                  </div>
                  <h1 style={{ fontSize: "1.875rem", fontWeight: 700, color: "#2E2822", letterSpacing: "-.02em" }}>
                    Naresh Kumar Bishnoi
                  </h1>
                  <p style={{ fontSize: "0.9375rem", color: "#F36B21", fontWeight: 600, marginTop: "0.25rem" }}>
                    Founder & Global Healthcare Leader
                  </p>

                  <hr style={{ border: 0, borderTop: "1px solid rgba(74,68,60,0.1)", margin: "1.5rem 0" }} />

                  {/* One size on the wrapper — the labels and values both
                      inherit it, so the whole detail list scales together. */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem", fontSize: "1.0625rem", lineHeight: 1.5 }}>
                    <div>
                      <span style={{ color: "var(--ink-soft)", display: "block" }}>Key Role</span>
                      <strong style={{ color: "var(--ink)" }}>Founder, Getmeds & 2MG Inc</strong>
                    </div>
                    <div>
                      <span style={{ color: "var(--ink-soft)", display: "block" }}>Specialization</span>
                      <strong style={{ color: "var(--ink)" }}>Oncology Medicine & Rare Disease Supply</strong>
                    </div>
                    <div>
                      <span style={{ color: "var(--ink-soft)", display: "block" }}>Memberships</span>
                      <strong style={{ color: "var(--ink)" }}>
                        UN Global Compact Member <br />
                        ESMO (European Society for Medical Oncology) Member
                      </strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Biography & Sections */}
              <div className="lg:col-span-8" style={{ display: "flex", flexDirection: "column", gap: "3.5rem" }}>
                {/* Section 1: Role in the Ecosystem */}
                <div>
                  <div className="eyebrow eyebrow-dark" style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>
                    01 • Leadership
                  </div>
                  <h2 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#2E2822", letterSpacing: "-.01em" }}>
                    Role in the Ecosystem
                  </h2>
                  <p style={{ fontSize: "1.0625rem", lineHeight: 1.7, color: "var(--ink-soft)", marginTop: "1rem" }}>
                    Naresh Kumar Bishnoi provides strategic direction and long-horizon vision across the Bishnoi ecosystem. 
                    He anchors the group’s work around building sustainable businesses that expand healthcare access, 
                    strengthen hospital supply chains, and carry forward centuries of ecological and community stewardship.
                  </p>
                </div>

                {/* Section 2: Business Background */}
                <div>
                  <div className="eyebrow eyebrow-dark" style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>
                    02 • Roots & Growth
                  </div>
                  <h2 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#2E2822", letterSpacing: "-.01em" }}>
                    Business Background
                  </h2>
                  <p style={{ fontSize: "1.0625rem", lineHeight: 1.7, color: "var(--ink-soft)", marginTop: "1rem" }}>
                    Originating from Haryana, India, Naresh built his enterprise starting with a deep commitment to addressing fundamental healthcare gaps. Over years of operational experience, he expanded Getmeds into an international e-pharmacy and pharmaceutical exporter operating across the Philippines, India, Vanuatu, Latin America, and Southeast Asia, backed by holding company 2MG Inc.
                  </p>
                </div>

                {/* Section 3: Healthcare Work */}
                <div>
                  <div className="eyebrow eyebrow-dark" style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>
                    03 • Impact & Access
                  </div>
                  <h2 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#2E2822", letterSpacing: "-.01em" }}>
                    Healthcare Work & Specialization
                  </h2>
                  <p style={{ fontSize: "1.0625rem", lineHeight: 1.7, color: "var(--ink-soft)", marginTop: "1rem" }}>
                    A major focus of Naresh’s work is oncology medicine supply and compassionate medicine access. Through Getmeds and Bishnoi Omniverse, he helps patients and healthcare institutions acquire critical life-saving medications, specialty oncology therapies, and specialized hospital consumables that are otherwise challenging to source in emerging markets.
                  </p>
                </div>

                {/* Section 4: Vision */}
                <div>
                  <div className="eyebrow eyebrow-dark" style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>
                    04 • Guiding Philosophy
                  </div>
                  <h2 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#2E2822", letterSpacing: "-.01em" }}>
                    Vision for Purposeful Enterprise
                  </h2>
                  <p style={{ fontSize: "1.0625rem", lineHeight: 1.7, color: "var(--ink-soft)", marginTop: "1rem" }}>
                    Guided by the Bishnoi tradition’s 500-year ecological ethic—protecting life, conserving environment, and serving communities—Naresh believes that commercial enterprise must create enduring value rather than short-term gains. This vision connects commercial operations with social impact through the Naresh Bishnoi Foundation and commitment to the UN Global Compact.
                  </p>
                </div>

                {/* Section 5: Connected Organizations */}
                <div
                  style={{
                    background: "#FFFFFF",
                    borderRadius: "1.5rem",
                    padding: "2.5rem",
                    border: "1px solid rgba(74,68,60,0.1)",
                  }}
                >
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#2E2822", marginBottom: "1.25rem" }}>
                    Associated Organizations & Initiatives
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "1rem" }}>
                    <div style={{ padding: "1rem", background: "var(--brand-orange)", borderRadius: "0.75rem" }}>
                      <strong style={{ display: "block", fontWeight: 600, color: "#ffffff" }}>Getmeds Ecosystem</strong>
                      <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "#ffffff" }}>
                        Pharmaceutical distribution & e-pharmacy platforms (PH, IN, VU, LATAM, SEA)
                      </span>
                    </div>
                    <div style={{ padding: "1rem", background: "var(--brand-orange)", borderRadius: "0.75rem" }}>
                      <strong style={{ display: "block", fontWeight: 600, color: "#ffffff" }}>Bishnoi Omniverse</strong>
                      <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "#ffffff" }}>
                        Hospital supply & medical device infrastructure (IN, PH)
                      </span>
                    </div>
                    <div style={{ padding: "1rem", background: "var(--brand-orange)", borderRadius: "0.75rem" }}>
                      <strong style={{ display: "block", fontWeight: 600, color: "#ffffff" }}>Naresh Bishnoi Foundation</strong>
                      <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "#ffffff" }}>
                        Conservation, tree planting, & community welfare initiatives
                      </span>
                    </div>
                    <div style={{ padding: "1rem", background: "var(--brand-orange)", borderRadius: "0.75rem" }}>
                      <strong style={{ display: "block", fontWeight: 600, color: "#ffffff" }}>UN Global Compact</strong>
                      <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "#ffffff" }}>
                        Member commitment to sustainable development goals
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer onOpenRequestModal={() => setModalOpen(true)} introReady={true} />
    </>
  );
}
