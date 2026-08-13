"use client";

import { useEffect, useState } from "react";
import Lenis from "lenis";

import Loader from "@/components/Loader";
import Header from "@/components/Header";
import NavOverlay from "@/components/NavOverlay";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Founder from "@/components/Founder";
import Mukam from "@/components/Mukam";
import Bands from "@/components/Bands";
import Principles from "@/components/Principles";
import Portfolio from "@/components/Portfolio";
import VibeGallery from "@/components/VibeGallery";
import OurVision from "@/components/OurVision";
import Services from "@/components/Services";
import Stats from "@/components/Stats";
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
        />
        <About onScrollTo={handleScrollTo} introReady={introReady} />
        <Founder introReady={introReady} />
        <Mukam introReady={introReady} />
        {/* Temporarily hidden — <Bands introReady={introReady} /> */}
        <Principles introReady={introReady} />
        <Portfolio introReady={introReady} lenis={lenisRef} />
        <VibeGallery onOpenRequestModal={() => setModalOpen(true)} introReady={introReady} />
        <OurVision />
        <Services introReady={introReady} lenis={lenisRef} />
        {/* Temporarily hidden — <Stats introReady={introReady} /> */}
      </main>

      <Footer onOpenRequestModal={() => setModalOpen(true)} introReady={introReady} />
    </>
  );
}
