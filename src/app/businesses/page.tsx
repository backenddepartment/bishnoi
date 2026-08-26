"use client";

import { useEffect, useState } from "react";
import Lenis from "lenis";

import Header from "@/components/Header";
import NavOverlay from "@/components/NavOverlay";
import Footer from "@/components/Footer";
import RequestModal from "@/components/RequestModal";
import Hero from "@/components/Hero";

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
    image: "/hero_pharma.jpg",
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
  },
  {
    group: "Getmeds Ecosystem",
    category: "Getmeds Ecosystem • Regional Expansion",
    title: "Getmeds Latin America",
    description:
      "Expanding Getmeds’ footprint across Latin America, forging new partnerships and establishing a stronger presence across the region.",
    linkText: "Visit Getmeds Latin America →",
    url: "https://getmedslatam.com",
    image: "/hero_dairy.jpg",
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
    image: "/bishnoione.jpg",
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
  },
  {
    group: "Foundations & Digital",
    category: "Global Commitment • Sustainability",
    title: "United Nations Global Compact",
    description:
      "Member of the United Nations Global Compact, committed to responsible business and advancing sustainable development. The commitment reflects a broader vision of building businesses that create lasting value while supporting principles of responsible business, sustainability, and positive social impact.",
    linkText: "Learn More →",
    url: "https://unglobalcompact.org",
    image: "/businesses/ungc.jpg",
  },
];

// The showcase below renders one subsection per group, in this order, each
// with its own featured panel + tabs instead of one flat list of eight.
const BUSINESS_GROUPS: { name: BusinessItem["group"]; blurb: string }[] = [
  {
    name: "Getmeds Ecosystem",
    blurb: "Healthcare and pharmaceutical access spanning Asia, Latin America, and Oceania.",
  },
  {
    name: "Bishnoi Omniverse",
    blurb: "The infrastructure powering healthcare supply at scale.",
  },
  {
    name: "Foundations & Digital",
    blurb: "Philanthropy, culture, and the digital presence behind the name.",
  },
];

const BADGES = [
  "Founder of Getmeds & 2MG Inc",
  "Oncology Medicine Supply Specialist",
  "Rare Medicines",
  "Medicine Donations & Global Healthcare",
  "European Society for Medical Oncology Member",
  "UN Global Compact Member",
];

export default function BusinessesPage() {
  const [navOpen, setNavOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [lenisRef, setLenisRef] = useState<Lenis | null>(null);
  // Which business each group's featured panel is currently displaying —
  // clicking a tab below a group swaps that group's panel instead of the
  // page scrolling through all eight businesses stacked full-height.
  const [activeByGroup, setActiveByGroup] = useState<Record<string, number>>({});

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
        />

        {/* Founder Spotlight Hero */}
        <section
          id="founder-spotlight"
          style={{
            position: "relative",
            paddingTop: "6rem",
            paddingBottom: "4.5rem",
            background: "#ffffff",
            color: "#2E2822",
          }}
        >
          <div className="shell" style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", marginBottom: "1rem" }}>
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
                  fontSize: ".875rem",
                  fontWeight: 600,
                  letterSpacing: ".08em",
                  textTransform: "uppercase",
                  color: "var(--brand-orange)",
                }}
              >
                Businesses & Impact
              </span>
            </div>

            <h1
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4.25rem)",
                fontWeight: 700,
                letterSpacing: "-.02em",
                lineHeight: 1.1,
                marginBottom: ".5rem",
                color: "#2E2822",
              }}
            >
              Naresh Kumar Bishnoi
            </h1>
            <p
              style={{
                fontSize: "clamp(1.25rem, 2.5vw, 1.875rem)",
                fontWeight: 400,
                color: "rgba(46,40,34,0.75)",
                marginBottom: "2rem",
              }}
            >
              From Vision to the World.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "2.5rem",
                alignItems: "start",
              }}
            >
              <div style={{ fontSize: "1.0625rem", lineHeight: 1.7, color: "rgba(46,40,34,0.85)" }}>
                <p style={{ marginBottom: "1.25rem" }}>
                  From a small village in Haryana, India, to building businesses serving healthcare markets and
                  communities around the world, Naresh Bishnoi’s journey has been shaped by challenges, lessons,
                  failures, and remarkable opportunities.
                </p>
                <p>
                  Driven by a commitment to making healthcare more accessible, Naresh has built his work around
                  strengthening the movement of medicines across borders, overcoming geographical barriers, and creating
                  pathways for patients and healthcare institutions to access what they need.
                </p>
              </div>

              <div style={{ fontSize: "1.0625rem", lineHeight: 1.7, color: "rgba(46,40,34,0.85)" }}>
                <p style={{ marginBottom: "1.75rem" }}>
                  What began with a vision in healthcare has grown into an expanding ecosystem spanning pharmaceutical
                  distribution, healthcare supply, technology, and social initiatives—building businesses with the
                  ambition to create lasting impact across markets and generations.
                </p>

                {/* Badges / Memberships */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: ".625rem" }}>
                  {BADGES.map((badge) => (
                    <span
                      key={badge}
                      style={{
                        padding: ".4rem .85rem",
                        borderRadius: "9999px",
                        background: "var(--brand-orange)",
                        border: "1px solid var(--brand-orange)",
                        fontSize: ".8125rem",
                        fontWeight: 500,
                        color: "#ffffff",
                      }}
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Businesses Showcase — one featured panel + a row of tabs below it,
            instead of all eight businesses stacked full-height one after
            another. Clicking a tab swaps the featured panel's content, so
            reaching any business takes one click rather than a long scroll. */}
        <section id="businesses-showcase" style={{ padding: "5rem 0 6rem 0", background: "#ffffff" }}>
          <div className="shell" style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <h2
                style={{
                  fontSize: "clamp(2rem, 3.5vw, 3rem)",
                  fontWeight: 700,
                  letterSpacing: "-.02em",
                  color: "#2E2822",
                }}
              >
                Global Enterprises & Initiatives
              </h2>
              <p
                style={{
                  fontSize: "1.125rem",
                  color: "var(--ink-soft)",
                  marginTop: ".5rem",
                  maxWidth: "36ch",
                  marginInline: "auto",
                }}
              >
                Advancing healthcare, infrastructure, technology, and social impact across borders.
              </p>
            </div>

            {BUSINESS_GROUPS.map((group, groupIndex) => {
              const groupItems = BUSINESSES.filter((b) => b.group === group.name);
              const activeIndex = activeByGroup[group.name] ?? 0;
              const item = groupItems[activeIndex];

              return (
                <div key={group.name} style={{ marginBottom: groupIndex < BUSINESS_GROUPS.length - 1 ? "5rem" : 0 }}>
                  {/* Group heading */}
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "baseline",
                      justifyContent: "space-between",
                      gap: "1rem",
                      marginBottom: "2rem",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                        fontWeight: 700,
                        letterSpacing: "-.01em",
                        color: "#2E2822",
                      }}
                    >
                      {group.name}
                    </h3>
                    <p style={{ fontSize: "1rem", color: "var(--ink-soft)", maxWidth: "40ch" }}>{group.blurb}</p>
                  </div>

                  {/* Featured panel on the left (image on top, details
                      stacked below it inside the panel), tabs on the right. */}
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
                </div>
              );
            })}
          </div>
        </section>

        {/* Legacy Banner */}
        <section
          style={{
            padding: "5rem 0",
            background: "linear-gradient(158deg,#2E2822 0%,#1C1815 100%)",
            color: "#ffffff",
            textAlign: "center",
          }}
        >
          <div className="shell" style={{ maxWidth: "800px", margin: "0 auto" }}>
            <h2
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
