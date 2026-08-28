"use client";

import { useEffect, useState } from "react";
import Lenis from "lenis";

import Header from "@/components/Header";
import NavOverlay from "@/components/NavOverlay";
import Footer from "@/components/Footer";
import RequestModal from "@/components/RequestModal";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Founder from "@/components/Founder";
import Mukam from "@/components/Mukam";
import Principles from "@/components/Principles";
import Services from "@/components/Services";

export default function HeritagePage() {
  const [navOpen, setNavOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [lenisRef, setLenisRef] = useState<Lenis | null>(null);

  useEffect(() => {
    // A link in from elsewhere (e.g. the home page's "Who We Are" nav item)
    // may arrive as /heritage#<id> — jump there instead of forcing
    // scroll-to-top, which would otherwise stomp the browser's native
    // hash-jump before Lenis ever takes over scrolling.
    const targetId = window.location.hash ? window.location.hash.slice(1) : null;
    if (!targetId) window.scrollTo(0, 0);

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

    if (targetId) {
      const target = document.getElementById(targetId);
      if (target) {
        requestAnimationFrame(() => {
          lenis.scrollTo(target, { offset: 0 });
        });
      }
    }

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

  useEffect(() => {
    if (!lenisRef) return;
    if (navOpen || modalOpen) {
      lenisRef.stop();
      document.documentElement.classList.add("scroll-lock");
    } else {
      lenisRef.start();
      document.documentElement.classList.remove("scroll-lock");
    }
  }, [navOpen, modalOpen, lenisRef]);

  const handleScrollTo = (id: string) => {
    // "works", "vision" and "behind-bishnoi" live on the home page, not
    // here — send those through to it instead of scrolling nowhere.
    if (id === "works" || id === "vision" || id === "behind-bishnoi") {
      window.location.href = `/#${id}`;
      return;
    }
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (el && lenisRef) {
      lenisRef.scrollTo(el, { offset: 0, duration: 0.8 });
    }
  };

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

      <main id="main-content">
        <Hero
          onOpenRequestModal={() => setModalOpen(true)}
          onScrollTo={handleScrollTo}
          introReady={true}
          variant="heritage"
        />
        <About onScrollTo={handleScrollTo} introReady={true} />
        <Founder introReady={true} />
        <Mukam introReady={true} />
        <Principles introReady={true} />
        {/* Temporarily hidden — <Bands introReady={true} /> */}
        <Services introReady={true} lenis={lenisRef} />
        {/* <VibeGallery introReady={true} /> */}
      </main>

      <Footer onOpenRequestModal={() => setModalOpen(true)} introReady={true} />
    </>
  );
}
