"use client";

import { useEffect, useState } from "react";
import Lenis from "lenis";

// Shared Lenis + nav/modal scroll-lock plumbing for secondary pages (mirrors
// the pattern already used inline on /businesses and /heritage) — pulled out
// here because a fourth and fifth page need the identical setup.
export function useLenisPage() {
  const [navOpen, setNavOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [lenisRef, setLenisRef] = useState<Lenis | null>(null);

  useEffect(() => {
    // A link in from elsewhere may arrive as /path#<id> — jump there instead
    // of forcing scroll-to-top, which would otherwise stomp the browser's
    // native hash-jump before Lenis ever takes over scrolling.
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

  return { navOpen, setNavOpen, modalOpen, setModalOpen, lenisRef };
}

const HOME_SECTION_IDS = new Set(["works", "vision", "behind-bishnoi"]);
const HERITAGE_SECTION_IDS = new Set(["about", "founder", "mukam", "principles", "services"]);

// Shared nav-target resolution for any secondary page: ids that live on the
// home page or the heritage page redirect there, everything else is assumed
// to be a section on the current page and gets a local Lenis scroll.
export function scrollToOrNavigate(id: string, lenisRef: Lenis | null) {
  if (id === "home") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  if (HOME_SECTION_IDS.has(id)) {
    window.location.href = `/#${id}`;
    return;
  }
  if (HERITAGE_SECTION_IDS.has(id)) {
    window.location.href = `/heritage#${id}`;
    return;
  }
  const el = document.getElementById(id);
  if (el && lenisRef) {
    lenisRef.scrollTo(el, { offset: 0, duration: 0.8 });
  }
}
