"use client";

import { useEffect, useState } from "react";
import Lenis from "lenis";

import Loader from "@/components/Loader";
import Header from "@/components/Header";
import NavOverlay from "@/components/NavOverlay";
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import Footer from "@/components/Footer";
import RequestModal from "@/components/RequestModal";

export default function Home() {
  const [showLoader, setShowLoader] = useState(false);
  const [introReady, setIntroReady] = useState(true);
  const [navOpen, setNavOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [lenisRef, setLenisRef] = useState<Lenis | null>(null);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    window.scrollTo(0, 0);
    const lenis = new Lenis({
      smoothWheel: true,
    });
    setLenisRef(lenis);

    let rafId: number;
    function raf(t: number) {
      lenis.raf(t);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Touch vs no-touch class
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      document.documentElement.classList.add("touch");
    } else {
      document.documentElement.classList.add("no-touch");
    }

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // Lock scroll when loader, nav or modal is open
  useEffect(() => {
    if (!lenisRef) return;
    if (showLoader || navOpen || modalOpen) {
      lenisRef.stop();
      document.documentElement.classList.add("scroll-lock");
    } else {
      lenisRef.start();
      document.documentElement.classList.remove("scroll-lock");
    }
  }, [showLoader, navOpen, modalOpen, lenisRef]);

  const handleLoaderComplete = () => {
    setShowLoader(false);
    setIntroReady(true);
  };

  const handleScrollTo = (id: string) => {
    if (!lenisRef) return;
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.pageYOffset;
    lenisRef.scrollTo(top, { offset: 0, duration: 0.8 });
  };

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-60 focus:rounded-control focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>

      {showLoader && <Loader onComplete={handleLoaderComplete} />}

      <Header
        onOpenNav={() => setNavOpen(true)}
        onOpenRequestModal={() => setModalOpen(true)}
        onScrollTo={handleScrollTo}
        introReady={introReady}
        lightNav
      />

      <NavOverlay
        isOpen={navOpen}
        onClose={() => setNavOpen(false)}
        onScrollTo={handleScrollTo}
        onOpenRequestModal={() => setModalOpen(true)}
      />

      <RequestModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      <main id="main">
        <Hero
          onOpenRequestModal={() => setModalOpen(true)}
          onScrollTo={handleScrollTo}
          introReady={introReady}
          hideOverlay
        />
        <Portfolio introReady={introReady} lenis={lenisRef} />

        {/* Corporate Ethos & Governance Gateway */}
        <section style={{ background: "#1C1815", color: "#F7F3E8", padding: "5rem 0", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <div className="shell">
            <div className="grid grid-cols-1 lg:grid-cols-12" style={{ gap: "2.5rem", alignItems: "center" }}>
              <div className="lg:col-span-7" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <div className="eyebrow eyebrow-light" style={{ fontSize: "1.125rem", color: "var(--brand-orange)" }}>
                  <span className="dot dot-blink"></span> Corporate Ethos &amp; Governance
                </div>
                <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 2.75rem)", fontWeight: 700, lineHeight: 1.2, letterSpacing: "-.02em", color: "#ffffff" }}>
                  Rooted in principles that endure. Guided by long-horizon stewardship.
                </h2>
                <p style={{ fontSize: "1.125rem", lineHeight: 1.65, color: "rgba(247,243,232,0.8)", margin: 0 }}>
                  Explore how the Bishnoi ecosystem combines ethical enterprise, multi-venture operations, and centuries of conservation philosophy into one connected corporate identity.
                </p>
              </div>

              <div className="lg:col-span-5" style={{ display: "flex", flexDirection: "column", gap: "1rem", justifyContent: "center" }}>
                <a href="/about" className="pill-btn" style={{ width: "100%" }}>
                  <span className="pill-inner pill-accent pill-with-arrow" style={{ width: "100%", justifyContent: "space-between", padding: "1rem 1.75rem", fontSize: "1.0625rem" }}>
                    Explore About &amp; Operating Ethos <span className="pill-badge up-right">→</span>
                  </span>
                </a>

                <a href="/leadership/naresh-bishnoi" className="pill-btn" style={{ width: "100%" }}>
                  <span className="pill-inner pill-dark pill-with-arrow" style={{ width: "100%", justifyContent: "space-between", padding: "1rem 1.75rem", fontSize: "1.0625rem", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.2)", color: "#ffffff" }}>
                    Leadership Profile (Naresh Bishnoi) <span className="pill-badge up-right">↗</span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer onOpenRequestModal={() => setModalOpen(true)} introReady={introReady} />
    </>
  );
}
