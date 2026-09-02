"use client";

import { useEffect, useState } from "react";
import Lenis from "lenis";

import Header from "@/components/Header";
import NavOverlay from "@/components/NavOverlay";
import Footer from "@/components/Footer";
import RequestModal from "@/components/RequestModal";
import Hero from "@/components/Hero";
import Breadcrumbs from "@/components/Breadcrumbs";
import Capabilities from "@/components/Capabilities";

interface BusinessItem {
  group: "Getmeds Ecosystem" | "Bishnoi Omniverse" | "Foundations & Digital";
  category: string;
  title: string;
  subtitle?: string;
  description: string;
  footprint?: string;
  linkText: string;
  url: string;
  image: string;
  // Colored + white logo marks, shown only on Getmeds Ecosystem cards —
  // colored badge bottom-right by default, white mark on the orange
  // hover overlay. Businesses without a supplied logo skip both.
  logo?: string;
  logoWhite?: string;
  // Override the details-row logo height (default "4.5rem") for a mark that
  // reads too small next to the others at the shared height.
  logoHeight?: string;
  // Nudge a logo up/down from the row's center alignment (e.g. "-0.5rem").
  logoOffsetY?: string;
  // Override the hover overlay's logo bounding box (defaults "13rem"/"8rem")
  // and its gap to the title below it (default "1rem") — for a mark that
  // should read bigger and sit closer to the company name.
  logoWhiteWidth?: string;
  logoWhiteHeight?: string;
  logoWhiteGap?: string;
  // Text fallback for a business with no logo artwork — a bold letter (or
  // couple of letters) shown in a colored circle instead of an <img>, in
  // both the details-row badge and the orange hover overlay.
  logoInitial?: string;
  // "grid" (default) puts this item in the group's card grid; "featured"
  // pulls it out into its own full-width left-image/right-details panel —
  // the same layout Bishnoi Omniverse uses — below the rest of the grid.
  layout?: "grid" | "featured";
}

const BUSINESSES: BusinessItem[] = [
  {
    group: "Getmeds Ecosystem",
    category: "Getmeds Ecosystem • Philippines",
    title: "Getmeds Philippines",
    description:
      "A healthcare and pharmaceutical company focused on expanding access to essential medicines in the Philippines.",
    linkText: "Visit Getmeds Philippines →",
    url: "https://getmeds.ph",
    image: "/getmedsph.jpeg",
    logo: "/logos/getmeds-philippines-logo.png",
    logoWhite: "/logos/getmeds-philippines-logo-white.png",
    logoWhiteWidth: "15.5rem",
    logoWhiteHeight: "9.5rem",
    logoWhiteGap: ".75rem",
  },
  {
    group: "Getmeds Ecosystem",
    category: "Getmeds Ecosystem • Global Export",
    title: "Getmeds Healthcare",
    description:
      "A pharmaceutical exporter from India to the world, enabling patients to access essential and specialized medicines through compassionate access.",
    linkText: "Visit Getmeds Healthcare →",
    url: "https://getmedshealthcare.com",
    image: "/businesses/getmeds_healthcare.jpg",
    logo: "/logos/getmeds-healthcare-logo.png",
    logoWhite: "/logos/getmeds-healthcare-logo-white.png",
  },
  {
    group: "Getmeds Ecosystem",
    category: "Getmeds Ecosystem • Pacific Region",
    title: "Getmeds Vanuatu",
    description:
      "The first specialty pharmacy in the Pacific, serving communities in Vanuatu with local access to life-saving cancer medicines.",
    linkText: "Visit Getmeds Vanuatu →",
    url: "https://getmedsvanuatu.com",
    image: "/businesses/getmeds_vauatu.jpg",
    logo: "/logos/getmeds-vanuatu-logo.png",
    logoWhite: "/logos/getmeds-vanuatu-logo-white.png",
    logoWhiteWidth: "15.5rem",
    logoWhiteHeight: "9.5rem",
    logoWhiteGap: ".75rem",
  },
  {
    group: "Getmeds Ecosystem",
    category: "Getmeds Ecosystem • Regional Expansion",
    title: "Getmeds Latin America",
    description:
      "Expanding Getmeds’ footprint across Latin America, forging new partnerships and establishing a stronger presence across the region.",
    linkText: "Visit Getmeds Latin America →",
    url: "https://getmedslatam.com",
    image: "/getmedslatinamerica.jpg",
    logo: "/logos/getmeds-latam-logo.png",
    logoWhite: "/logos/getmeds-latam-logo-white.png",
    // Aspect-ratio math alone says this should already match Philippines'
    // fill, but the mark itself reads visually smaller (thinner wordmark,
    // more internal negative space) — sized up further and the gap tightened
    // to compensate.
    logoWhiteWidth: "20rem",
    logoWhiteHeight: "11.5rem",
    logoWhiteGap: ".25rem",
  },
  {
    group: "Getmeds Ecosystem",
    category: "Getmeds Ecosystem • Southeast Asia",
    title: "Getmeds South East Asia (SEA)",
    description:
      "Growing Getmeds’ presence across Southeast Asia, connecting patients and healthcare providers to essential medicines throughout the region.",
    linkText: "Visit Getmeds South East Asia (SEA) →",
    url: "#",
    image: "/GETMEDSSEA.jpg",
    logo: "/logos/getmeds-sea-logo.png",
    logoWhite: "/logos/getmeds-sea-logo-white.png",
    // SEA's white mark is much wider (~2.5:1) than Vanuatu's (~1.58:1), so at
    // the same box it's width-constrained and renders shorter — widened here
    // so it reaches the same ~9.5rem height instead of only ~6.2rem.
    logoWhiteWidth: "24rem",
    logoWhiteHeight: "9.5rem",
    logoWhiteGap: ".75rem",
  },
  {
    group: "Getmeds Ecosystem",
    category: "Getmeds Ecosystem • Group Holding",
    title: "2MG Incorporated",
    description:
      "The holding company behind the Getmeds group of businesses, providing strategic direction and support across its healthcare ventures worldwide.",
    linkText: "Visit 2MG Incorporated →",
    url: "https://2mginc.com/",
    image: "/2mgincorp.jpg",
    logo: "/logos/2mg-inc-logo.png",
    logoWhite: "/logos/2mg-inc-logo-white.png",
    // 2MG's mark is wider/shorter than the others (different aspect ratio),
    // so the box height is trimmed to match — otherwise it only fills part
    // of a 9.5rem box, leaving dead space above the gap no matter how small
    // logoWhiteGap is set.
    logoWhiteWidth: "15.5rem",
    logoWhiteHeight: "7rem",
    logoWhiteGap: ".15rem",
  },
  {
    group: "Bishnoi Omniverse",
    category: "Bishnoi Omniverse • Infrastructure",
    title: "Bishnoi Omniverse",
    subtitle: "Building the infrastructure behind healthcare.",
    description:
      "Bishnoi Omniverse is building a healthcare supply powerhouse designed to serve hospitals across the full spectrum of their needs—from essential medical supplies and medicines to specialized products and large-scale hospital requirements.",
    footprint: "India · Philippines",
    linkText: "Visit Bishnoi Omniverse →",
    url: "https://bishnoi-omniverse.in",
    image: "/bishnoiimage.jpeg",
    logo: "/logo.png",
    logoWhite: "/logowhite.png",
  },
  {
    group: "Foundations & Digital",
    category: "Impact & Initiatives • Philanthropy",
    title: "Naresh Bishnoi Foundation",
    description:
      "A lifelong commitment to education, empowerment, innovation, and cultural growth. The Foundation works to create opportunities through education, emerging fields, agricultural development, and the advancement of Indian culture—empowering communities and creating lasting impact for generations.",
    linkText: "Visit Naresh Bishnoi Foundation →",
    url: "https://nbf.com",
    image: "/businesses/naresh_foundation.jpg",
    logo: "/logos/naresh-bishnoi-foundation-logo.png",
    logoWhite: "/logos/naresh-bishnoi-foundation-logo-white.png",
    logoHeight: "6rem",
  },
  {
    group: "Foundations & Digital",
    category: "Impact & Initiatives • Digital Platform",
    title: "NKB.COM",
    description:
      "A digital platform representing the broader world of Naresh Bishnoi—his ideas, ventures, initiatives, and ongoing work.",
    linkText: "Visit NKB.COM →",
    url: "https://nkb.com",
    image: "/businesses/nkb.jpg",
    logoInitial: "N",
  },
  {
    group: "Foundations & Digital",
    category: "Global Commitment • Sustainability",
    title: "United Nations Global Compact",
    description:
      "Member of the United Nations Global Compact, committed to responsible business and advancing sustainable development. The commitment reflects a broader vision of building businesses that create lasting value while supporting principles of responsible business, sustainability, and positive social impact.",
    linkText: "Learn More →",
    url: "https://www.getmeds.ph/ungc",
    image: "/businesses/ungc.jpg",
    logoInitial: "UN",
    layout: "featured",
  },
];

// The showcase below renders one subsection per group, in this order, each
// with its own featured panel + tabs instead of one flat list of eight.
const BUSINESS_GROUPS: { name: BusinessItem["group"]; blurb: string; id: string; profileHref?: string }[] = [
  {
    name: "Getmeds Ecosystem",
    blurb: "Healthcare and pharmaceutical access spanning Asia, Latin America, and Oceania.",
    id: "getmeds-ecosystem",
    profileHref: "/businesses/getmeds",
  },
  {
    name: "Bishnoi Omniverse",
    blurb: "The infrastructure powering healthcare supply at scale.",
    id: "bishnoi-omniverse",
    profileHref: "/businesses/bishnoi-omniverse",
  },
  {
    name: "Foundations & Digital",
    blurb: "Philanthropy, culture, and the digital presence behind the name.",
    id: "foundations-digital",
    profileHref: "/businesses/foundation",
  },
];

// Left image / right details, side by side — image is plain (no overlaid
// badges/gradient), details column leads with a dot + eyebrow label above
// the title. Used for Bishnoi Omniverse (its only item) and for any other
// business explicitly flagged layout: "featured" instead of sitting in its
// group's card grid.
function FeaturedPanel({ item }: { item: BusinessItem }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 eco-card" style={{ gap: "3rem", alignItems: "center" }}>
      <div
        className="hover-scale-1012 eco-card-image"
        style={{
          position: "relative",
          aspectRatio: "16 / 9",
          borderRadius: "1.5rem",
          overflow: "hidden",
          boxShadow: "0 10px 30px -14px rgba(28,24,21,0.18)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.image}
          alt={item.title}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />

        {/* Same hover reveal as the Getmeds Ecosystem cards — image turns
            orange on hover with the logo (or initial), name, and a link. */}
        <div
          className="eco-card-hover-overlay"
          style={{
            position: "absolute",
            inset: 0,
            background: "var(--accent-strong, var(--brand-orange))",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {(item.logoWhite || item.logoInitial) && (
            <div
              className="eco-card-hover-logo"
              style={{
                width: item.logoWhiteWidth ?? "13rem",
                height: item.logoWhiteHeight ?? "8rem",
                maxWidth: "78%",
                marginBottom: item.logoWhiteGap ?? "1rem",
                display: item.logoWhite ? undefined : "flex",
                alignItems: item.logoWhite ? undefined : "center",
                justifyContent: item.logoWhite ? undefined : "center",
              }}
            >
              {item.logoWhite ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={item.logoWhite}
                  alt={`${item.title} logo`}
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              ) : (
                <span style={{ fontSize: "5.5rem", fontWeight: 800, color: "#ffffff", lineHeight: 1 }}>
                  {item.logoInitial}
                </span>
              )}
            </div>
          )}
          <span
            className="eco-card-hover-title"
            style={{
              fontSize: "1.125rem",
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-.01em",
              textAlign: "center",
              marginBottom: "1rem",
            }}
          >
            {item.title}
          </span>
          <a
            href={item.url}
            target="_blank"
            rel="noreferrer"
            className="eco-card-hover-btn"
            style={{
              pointerEvents: "auto",
              display: "inline-block",
              fontSize: ".875rem",
              fontWeight: 600,
              color: "var(--brand-orange)",
              background: "#ffffff",
              border: "1.5px solid #ffffff",
              borderRadius: "9999px",
              padding: ".55rem 1.5rem",
              textDecoration: "none",
              boxShadow: "0 6px 16px -6px rgba(0,0,0,0.35)",
            }}
          >
            View Website
          </a>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: ".5rem" }}>
          <span
            style={{
              display: "inline-block",
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: "var(--brand-orange)",
            }}
          />
          <span
            style={{
              fontSize: ".8125rem",
              fontWeight: 600,
              letterSpacing: ".08em",
              textTransform: "uppercase",
              color: "var(--brand-orange)",
            }}
          >
            {item.category}
          </span>
        </div>

        <div>
          <h3
            style={{
              fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
              fontWeight: 800,
              letterSpacing: "-.01em",
              color: "#2E2822",
              lineHeight: 1.15,
            }}
          >
            {item.title}
          </h3>
          {item.subtitle && (
            <p
              style={{
                fontSize: "1.125rem",
                fontWeight: 500,
                color: "var(--ink-soft)",
                marginTop: ".5rem",
              }}
            >
              {item.subtitle}
            </p>
          )}
        </div>

        <p style={{ fontSize: "1.0625rem", lineHeight: 1.7, color: "var(--ink-soft)" }}>
          {item.description}
        </p>

        {item.footprint && (
          <div style={{ fontSize: "1rem", fontWeight: 700, color: "#2E2822" }}>
            Footprint: {item.footprint}
          </div>
        )}

        <div style={{ paddingTop: ".5rem" }}>
          <a href={item.url} target="_blank" rel="noreferrer" className="pill-btn">
            <span
              className="pill-inner pill-accent pill-with-arrow"
              style={{
                fontSize: ".9375rem",
                padding: ".625rem 1.5rem",
                color: "#ffffff",
                boxShadow: "none",
              }}
            >
              {item.linkText}
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function BusinessesPage() {
  const [navOpen, setNavOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [lenisRef, setLenisRef] = useState<Lenis | null>(null);
  // Which business each group's featured panel is currently displaying —
  // clicking a tab below a group swaps that group's panel instead of the
  // page scrolling through all eight businesses stacked full-height.
  const [activeByGroup, setActiveByGroup] = useState<Record<string, number>>({});

  useEffect(() => {
    // A link in from elsewhere (e.g. the home page's "His Businesses" tiles)
    // arrives as /businesses#<group-id> — jump to that section instead of
    // forcing scroll-to-top, which would otherwise stomp the browser's
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
        // Wait a frame so layout (images, fonts) has settled before Lenis
        // measures scroll distance, or it can land short.
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
    if (id === "works" || id === "businesses") {
      const el = document.getElementById("businesses-showcase");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    if (id === "about") {
      const el = document.getElementById("founder-spotlight");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    window.location.href = `/#${id}`;
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
        lightNav
      />

      <NavOverlay
        isOpen={navOpen}
        onClose={() => setNavOpen(false)}
        onScrollTo={handleScrollTo}
        onOpenRequestModal={() => setModalOpen(true)}
      />

      <RequestModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      <main id="main-content" style={{ background: "#FBF8F1", minHeight: "100vh", color: "var(--ink)" }}>
        {/* Same layout and background as the Home hero, but its own copy —
            `businesses` is not in Hero's isIntro list, so it keeps the
            full-height treatment rather than the short intro one. */}
        <Hero
          onOpenRequestModal={() => setModalOpen(true)}
          onScrollTo={handleScrollTo}
          introReady={true}
          hideOverlay
          variant="businesses"
          headlineColor="var(--brand-orange)"
          hideHeadlineShadow
          statusLabel="Scroll to Explore"
          hideScrollCue
        />

        {/* Breadcrumbs paints no background of its own, so it would otherwise
            show the cream <main>. The white band runs it flush into the
            showcase section below. */}
        <div style={{ background: "#ffffff", paddingBottom: "1.5rem" }}>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Businesses" }]} />
        </div>

        {/* Corporate Identity — mirrors the opening section on the About
            page. Its heading is an h2 here (h1 on About), since the hero
            above already owns this page's h1. */}
        <section style={{ padding: "4rem 0 5rem", background: "#ffffff" }}>
          <div className="shell" style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div className="grid grid-cols-1 lg:grid-cols-12" style={{ gap: "3rem" }}>
              <div className="lg:col-span-5">
                <div className="eyebrow eyebrow-dark" style={{ marginBottom: "1rem" }}>
                  <span className="dot dot-blink"></span> Corporate Identity
                </div>
                <h2 style={{ fontSize: "clamp(2.25rem, 4vw, 3.25rem)", fontWeight: 700, color: "#2E2822", letterSpacing: "-.02em", lineHeight: 1.15 }}>
                  One Identity.<br />Multiple Ventures.<br />One Purpose.
                </h2>
              </div>

              <div className="lg:col-span-7" style={{ display: "flex", flexDirection: "column", gap: "1.5rem", justifyContent: "center" }}>
                <p style={{ fontSize: "1.1875rem", lineHeight: 1.65, color: "var(--ink-soft)" }}>
                  Bishnoi is a global business ecosystem building and operating entities across healthcare, pharmaceutical access, medical supply, and social impact.
                </p>
                <p style={{ fontSize: "1.0625rem", lineHeight: 1.7, color: "var(--ink-soft)" }}>
                  Rather than functioning as a traditional single-product company, Bishnoi operates as a connected umbrella. Every business under this identity maintains operational focus while sharing a common commitment to long-term stewardship, ethical enterprise, and positive human impact.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", paddingTop: "0.5rem" }}>
                  {/* On About this points at /businesses; here that would be a
                      self-link, so it jumps to the showcase further down. */}
                  <a href="#businesses-showcase" className="pill-btn">
                    <span className="pill-inner pill-accent pill-with-arrow" style={{ color: "#ffffff" }}>
                      Explore Our Businesses <span className="pill-badge">↓</span>
                    </span>
                  </a>
                  <a href="/#about" className="pill-btn">
                    <span className="pill-inner pill-outline pill-no-arrow" style={{ borderColor: "rgba(74,68,60,.25)", background: "rgba(74,68,60,.04)", color: "var(--ink)" }}>
                      Discover Our Heritage →
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Capabilities — same component the What We Do page renders, with an
            eyebrow here since this page's hero doesn't name the section. */}
        <Capabilities title="What We Do" centered />

        {/* Businesses Showcase — one featured panel + a row of tabs below it,
            instead of all eight businesses stacked full-height one after
            another. Clicking a tab swaps the featured panel's content, so
            reaching any business takes one click rather than a long scroll. */}
        <section id="businesses-showcase" style={{ padding: "5rem 0 6rem 0", background: "#ffffff" }}>
          <div className="shell" style={{ maxWidth: "1280px", margin: "0 auto" }}>

            {BUSINESS_GROUPS.map((group, groupIndex) => {
              const groupItems = BUSINESSES.filter((b) => b.group === group.name);
              const activeIndex = activeByGroup[group.name] ?? 0;
              const item = groupItems[activeIndex];

              return (
                <div
                  key={group.name}
                  id={group.id}
                  style={{ marginBottom: groupIndex < BUSINESS_GROUPS.length - 1 ? "5rem" : 0, scrollMarginTop: "6rem" }}
                >
                  {/* Group heading — title stacked over its "Full Profile"
                      link on the left, blurb held to the right. Aligned to
                      flex-start (not baseline) now that the left side is a
                      two-line column rather than a lone heading. */}
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: "1rem",
                      marginBottom: "2rem",
                    }}
                  >
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: ".5rem" }}>
                      <h3
                        style={{
                          fontSize: "clamp(1.75rem, 2.8vw, 2.25rem)",
                          fontWeight: 700,
                          letterSpacing: "-.01em",
                          color: "#2E2822",
                        }}
                      >
                        {group.name}
                      </h3>
                      {group.profileHref && (
                        <a
                          href={group.profileHref}
                          style={{ fontSize: ".9375rem", fontWeight: 700, color: "#2E2822", textDecoration: "none" }}
                        >
                          Full Profile <span style={{ color: "var(--brand-orange)" }}>→</span>
                        </a>
                      )}
                    </div>
                    <p style={{ fontSize: "1.3125rem", color: "var(--ink-soft)", maxWidth: "40ch" }}>{group.blurb}</p>
                  </div>

                  {group.name === "Getmeds Ecosystem" || group.name === "Foundations & Digital" ? (
                    <>
                    {/* Case-study card grid — every business in the group
                        shown at once as its own card, instead of one
                        featured item swapped via tabs. Items flagged
                        layout: "featured" skip this grid and get their own
                        full-width panel below instead. */}
                    <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: "2rem" }}>
                      {groupItems
                        .filter((gi) => gi.layout !== "featured")
                        .map((groupItem) => (
                        <div key={groupItem.title} className="hover-scale-1012 eco-card">
                          {/* Image — just the category pill and the hover
                              reveal live on the photo; everything else sits
                              plain below it, no card/box around the text. */}
                          <div
                            className="eco-card-image"
                            style={{
                              position: "relative",
                              aspectRatio: "16 / 9",
                              borderRadius: "1.5rem",
                              overflow: "hidden",
                              boxShadow: "0 10px 30px -14px rgba(28,24,21,0.18)",
                            }}
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={groupItem.image}
                              alt={groupItem.title}
                              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                            />
                            <div
                              style={{
                                position: "absolute",
                                inset: 0,
                                background: "linear-gradient(180deg, rgba(20,16,13,0.32) 0%, rgba(20,16,13,0) 30%)",
                              }}
                            />
                            {/* Category badge */}
                            <span
                              style={{
                                position: "absolute",
                                top: ".9rem",
                                left: ".9rem",
                                fontSize: ".75rem",
                                fontWeight: 600,
                                letterSpacing: ".02em",
                                textTransform: "capitalize",
                                color: "#ffffff",
                                background: "var(--brand-orange)",
                                padding: ".3rem .75rem",
                                borderRadius: "9999px",
                              }}
                            >
                              {groupItem.category.split("•")[1]?.trim() ?? groupItem.category}
                            </span>

                            {(groupItem.logo || groupItem.logoInitial) && (
                              /* Hover overlay — orange background, white logo
                                 centered, company name underneath */
                              <div
                                className="eco-card-hover-overlay"
                                style={{
                                  position: "absolute",
                                  inset: 0,
                                  background: "var(--accent-strong, var(--brand-orange))",
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                {/* Bounding box so every logo — regardless of
                                    its native aspect ratio — reads at a
                                    consistent size on the hover overlay.
                                    Sized (not scaled) per item so it never
                                    overlaps the text below it. */}
                                <div
                                  className="eco-card-hover-logo"
                                  style={{
                                    width: groupItem.logoWhiteWidth ?? "13rem",
                                    height: groupItem.logoWhiteHeight ?? "8rem",
                                    maxWidth: "78%",
                                    marginBottom: groupItem.logoWhiteGap ?? "1rem",
                                    display: groupItem.logoWhite ? undefined : "flex",
                                    alignItems: groupItem.logoWhite ? undefined : "center",
                                    justifyContent: groupItem.logoWhite ? undefined : "center",
                                  }}
                                >
                                  {groupItem.logoWhite ? (
                                    /* eslint-disable-next-line @next/next/no-img-element */
                                    <img
                                      src={groupItem.logoWhite}
                                      alt={`${groupItem.title} logo`}
                                      style={{ width: "100%", height: "100%", objectFit: "contain" }}
                                    />
                                  ) : (
                                    <span style={{ fontSize: "5.5rem", fontWeight: 800, color: "#ffffff", lineHeight: 1 }}>
                                      {groupItem.logoInitial}
                                    </span>
                                  )}
                                </div>
                                <span
                                  className="eco-card-hover-title"
                                  style={{
                                    fontSize: "1.125rem",
                                    fontWeight: 700,
                                    color: "#ffffff",
                                    letterSpacing: "-.01em",
                                    textAlign: "center",
                                    marginBottom: "1rem",
                                  }}
                                >
                                  {groupItem.title}
                                </span>
                                <a
                                  href={groupItem.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="eco-card-hover-btn"
                                  style={{
                                    pointerEvents: "auto",
                                    display: "inline-block",
                                    fontSize: ".875rem",
                                    fontWeight: 600,
                                    color: "var(--brand-orange)",
                                    background: "#ffffff",
                                    border: "1.5px solid #ffffff",
                                    borderRadius: "9999px",
                                    padding: ".55rem 1.5rem",
                                    textDecoration: "none",
                                    boxShadow: "0 6px 16px -6px rgba(0,0,0,0.35)",
                                  }}
                                >
                                  View Website
                                </a>
                              </div>
                            )}
                          </div>

                          {/* Details — plain, no card/box around them. Logo
                              sits above the text on mobile (row squeezes the
                              description into an unreadably narrow column
                              otherwise); from sm: up it's back to logo-left,
                              text-right like desktop. */}
                          <div
                            className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-5"
                            style={{ padding: "1.25rem 0 0" }}
                          >
                            {groupItem.logo ? (
                              /* Sized by height, not a fixed square box — wordmark
                                 logos (wide) and icon marks (square) end up the
                                 same visual size instead of the wide ones
                                 shrinking to fit a box built for square ones. */
                              /* eslint-disable-next-line @next/next/no-img-element */
                              <img
                                src={groupItem.logo}
                                alt={`${groupItem.title} logo`}
                                style={{
                                  height: groupItem.logoHeight ?? "4.5rem",
                                  width: "auto",
                                  maxWidth: "14rem",
                                  flexShrink: 0,
                                  objectFit: "contain",
                                  marginTop: groupItem.logoOffsetY ?? 0,
                                }}
                              />
                            ) : groupItem.logoInitial ? (
                              <span
                                style={{
                                  flexShrink: 0,
                                  lineHeight: 1,
                                  color: "var(--brand-orange)",
                                  fontWeight: 800,
                                  fontSize: groupItem.logoHeight ?? "4.5rem",
                                  marginTop: groupItem.logoOffsetY ?? 0,
                                }}
                              >
                                {groupItem.logoInitial}
                              </span>
                            ) : null}
                            <div className="w-full" style={{ flex: 1, minWidth: 0 }}>
                              <h4
                                style={{
                                  fontSize: "1.25rem",
                                  fontWeight: 700,
                                  color: "#2E2822",
                                  letterSpacing: "-.01em",
                                  lineHeight: 1.25,
                                  marginBottom: ".5rem",
                                }}
                              >
                                {groupItem.title}
                              </h4>
                              <p
                                style={{
                                  fontSize: "1.0625rem",
                                  lineHeight: 1.6,
                                  color: "var(--ink-soft)",
                                  marginBottom: "1rem",
                                }}
                              >
                                {groupItem.description}
                              </p>
                              <a
                                href={groupItem.url}
                                target="_blank"
                                rel="noreferrer"
                                style={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: ".5rem",
                                  fontSize: ".9375rem",
                                  fontWeight: 600,
                                  color: "#2E2822",
                                  textDecoration: "none",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                Visit Website
                                <span style={{ color: "var(--brand-orange)" }}>→</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {groupItems
                      .filter((gi) => gi.layout === "featured")
                      .map((gi) => (
                        <div key={gi.title} style={{ marginTop: "2rem" }}>
                          <FeaturedPanel item={gi} />
                        </div>
                      ))}
                    </>
                  ) : group.name === "Bishnoi Omniverse" ? (
                    <FeaturedPanel item={item} />
                  ) : (
                  <div
                    className={groupItems.length > 1 ? "grid grid-cols-1 lg:grid-cols-[1fr_240px]" : ""}
                    style={{ gap: groupItems.length > 1 ? "2rem" : 0, alignItems: "start" }}
                  >
                    {/* Featured panel — image on top, details below it,
                        no card wrapper so it sits flush on the left. */}
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      {/* Featured image */}
                      <div
                        style={{
                          position: "relative",
                          minHeight: "320px",
                          borderRadius: "1.5rem",
                          overflow: "hidden",
                          background: "#1C1815",
                          marginBottom: "1.25rem",
                        }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          key={item.image}
                          src={item.image}
                          alt={item.title}
                          style={{
                            position: "absolute",
                            inset: 0,
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            filter: "brightness(0.85)",
                          }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            background: "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.6) 100%)",
                          }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            bottom: "1.5rem",
                            left: "1.5rem",
                            right: "1.5rem",
                            color: "#ffffff",
                          }}
                        >
                          <span
                            style={{
                              fontSize: ".75rem",
                              fontWeight: 600,
                              letterSpacing: ".06em",
                              textTransform: "uppercase",
                              color: "var(--brand-orange)",
                              backgroundColor: "rgba(0,0,0,0.6)",
                              padding: ".3rem .6rem",
                              borderRadius: ".5rem",
                              backdropFilter: "blur(4px)",
                            }}
                          >
                            {item.category.split("•")[0]}
                          </span>
                          {item.footprint && (
                            <div
                              style={{
                                marginTop: ".75rem",
                                fontSize: ".875rem",
                                fontWeight: 600,
                                color: "rgba(255,255,255,0.9)",
                              }}
                            >
                              Footprint: {item.footprint}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Text details */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                        <div
                          style={{
                            fontSize: ".8125rem",
                            fontWeight: 600,
                            letterSpacing: ".05em",
                            textTransform: "uppercase",
                            color: "var(--brand-orange)",
                          }}
                        >
                          {item.category}
                        </div>

                        <div>
                          <h3
                            style={{
                              fontSize: "2.25rem",
                              fontWeight: 800,
                              letterSpacing: "-.01em",
                              color: "#2E2822",
                              lineHeight: 1.15,
                            }}
                          >
                            {item.title}
                          </h3>
                          {item.subtitle && (
                            <p
                              style={{
                                fontSize: "1.125rem",
                                fontWeight: 500,
                                color: "var(--ink-soft)",
                                marginTop: ".35rem",
                              }}
                            >
                              {item.subtitle}
                            </p>
                          )}
                        </div>

                        <p
                          style={{
                            fontSize: "1.0625rem",
                            lineHeight: 1.65,
                            color: "var(--ink-soft)",
                          }}
                        >
                          {item.description}
                        </p>

                        <div style={{ paddingTop: ".5rem" }}>
                          <a href={item.url} target="_blank" rel="noreferrer" className="pill-btn">
                            <span
                              className="pill-inner pill-accent pill-with-arrow"
                              style={{
                                fontSize: ".9375rem",
                                padding: ".625rem 1.5rem",
                                boxShadow: "0 6px 20px rgba(243,107,33,0.25)",
                              }}
                            >
                              {item.linkText}
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>

                    {groupItems.length > 1 && (
                      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                        {groupItems.map((groupItem, index) => {
                          const active = index === activeIndex;
                          return (
                            <button
                              key={groupItem.title}
                              onClick={() => setActiveByGroup((prev) => ({ ...prev, [group.name]: index }))}
                              aria-pressed={active}
                              style={{
                                borderRadius: "1.25rem",
                                padding: "1.5rem 1.25rem",
                                textAlign: "left",
                                background: active ? "var(--accent-strong)" : "#ffffff",
                                color: active ? "#ffffff" : "#2E2822",
                                border: active ? "none" : "1px solid #E6DECB",
                                boxShadow: active ? "0 10px 30px -8px rgba(243,107,33,0.45)" : "none",
                                fontWeight: 700,
                                fontSize: "1.0625rem",
                                lineHeight: 1.3,
                                transition: "background .25s ease, color .25s ease, box-shadow .25s ease, transform .2s ease",
                              }}
                              className="hover-scale-1012"
                            >
                              {groupItem.title}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Legacy Banner — on mobile this loses its dark card treatment
            entirely (transparent, sits right under the showcase above) and
            switches its text to the page's normal dark ink so it still
            reads against the light page background; desktop is untouched. */}
        <section
          className="legacy-banner"
          style={{
            padding: "5rem 0",
            background: "linear-gradient(158deg,#2E2822 0%,#1C1815 100%)",
            color: "#ffffff",
            textAlign: "center",
          }}
        >
          <div className="shell" style={{ maxWidth: "800px", margin: "0 auto" }}>
            <h2
              className="legacy-banner-heading"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.25rem)",
                fontWeight: 700,
                letterSpacing: "-.02em",
                marginBottom: "1rem",
                color: "#ffffff",
              }}
            >
              A Legacy Still in the Making.
            </h2>
            <p
              className="legacy-banner-text"
              style={{
                fontSize: "clamp(1.125rem, 2vw, 1.5rem)",
                color: "rgba(247,243,232,0.75)",
                lineHeight: 1.5,
              }}
            >
              The journey continues—across markets, industries, and generations.
            </p>
          </div>
        </section>
      </main>

      <Footer onOpenRequestModal={() => setModalOpen(true)} introReady={true} />
    </>
  );
}
