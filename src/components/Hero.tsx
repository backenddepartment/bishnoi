"use client";

import { useEffect, useRef, useState } from "react";

interface HeroProps {
  onOpenRequestModal: () => void;
  onScrollTo: (id: string) => void;
  introReady: boolean;
}

export default function Hero({ onOpenRequestModal, onScrollTo, introReady }: HeroProps) {
  const heroImages = [
    "/hero_pharma.jpg",
    "/hero_hydroponics.JPG",
    "/hero_orange.png",
    "/hero_wildlife.jpg",
  ];

  const carouselItems = [
    { caption: "Getmeds Ecosystem", title: "Global healthcare & pharmaceuticals." },
    { caption: "Bishnoi Group", title: "Sustainable agritech & enterprise." },
    { caption: "Strategic Holdings", title: "NBF financial & NKB capital." },
    { caption: "Heritage Foundation", title: "29 Principles & conservation impact." },
  ];

  const [imageIdx, setImageIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-advance timer carousel (every 5 seconds)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setImageIdx((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, heroImages.length]);

  // Pause timer on manual interaction
  const triggerInteractionPause = () => {
    setIsPaused(true);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 8000);
  };

  const carouselNext = () => {
    triggerInteractionPause();
    setImageIdx((prev) => (prev + 1) % heroImages.length);
  };

  const carouselPrev = () => {
    triggerInteractionPause();
    setImageIdx((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  const handleSelectDivision = (idx: number) => {
    triggerInteractionPause();
    setImageIdx(idx);
  };

  return (
    <section
      id="home"
      style={{
        position: "relative",
        isolation: "isolate",
        overflow: "hidden",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#ffffff",
      }}
    >
      <div id="liquid-container" style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        {/* Base Image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          id="liquid-before"
          src={heroImages[imageIdx]}
          alt="Hero background"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transition: "opacity 0.6s ease" }}
        />
      </div>

      {/* High-Contrast Gradient Backdrop Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          background: "linear-gradient(to bottom, rgba(26,22,19,0.75) 0%, rgba(26,22,19,0.35) 50%, rgba(26,22,19,0.7) 100%)",
        }}
      ></div>



      <div
        id="watermark"
        style={{
          pointerEvents: "none",
          position: "absolute",
          insetInline: 0,
          bottom: "5rem",
          zIndex: 1,
          textAlign: "center",
          userSelect: "none",
          fontWeight: 700,
          lineHeight: 1,
          fontSize: "var(--text-watermark)",
          background: "linear-gradient(to top, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.05) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.15) 100%)",
          maskImage: "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.15) 100%)",
          mixBlendMode: "difference",
          opacity: introReady ? 0.6 : 0,
          transform: introReady ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.7s cubic-bezier(.22,1,.36,1), transform 0.7s cubic-bezier(.22,1,.36,1)",
        }}
      >
        BISHNOI
      </div>

      <div
        className="shell-full grid grid-cols-1 lg:grid-cols-12"
        style={{
          position: "relative",
          zIndex: 20,
          flex: 1,
          width: "100%",
          maxWidth: "100%",
          gap: "2.5rem",
          paddingBlock: "13rem 3rem",
          color: "#ffffff",
          alignItems: "center",
          alignContent: "space-between",
        }}
      >
        <div id="hero-title-wrapper" style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }} className="lg:col-span-7">
          <h1
            id="hero-h1"
            className="text-[1.85rem] sm:text-[2.5rem] md:text-[4rem]"
            style={{
              maxWidth: "26ch",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-.02em",
              color: "#ffffff",
              textShadow: "0 4px 16px rgba(0,0,0,0.9), 0 2px 4px rgba(0,0,0,0.8)",
            }}
          >
            <span className={`reveal-line ${introReady ? "visible" : ""}`}>
              <span className="line-inner">Rooted in five hundred years. Building for what comes next.</span>
            </span>
          </h1>

          <div
            id="hero-ctas"
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: ".75rem",
              opacity: introReady ? 1 : 0,
              transition: "opacity 0.6s cubic-bezier(.22,1,.36,1)",
            }}
          >
            <button className="pill-btn" onClick={() => onScrollTo("about")}>
              <span className="pill-inner pill-accent pill-with-arrow" style={{ boxShadow: "0 8px 24px rgba(243,107,33,0.35)", whiteSpace: "nowrap" }}>
                Who we are <span className="pill-badge">→</span>
              </span>
            </button>
            <button className="pill-btn" onClick={() => onScrollTo("works")}>
              <span
                className="pill-inner pill-outline pill-with-arrow"
                style={{ color: "#ffffff", borderColor: "rgba(243,107,33,0.55)", background: "rgba(26,22,19,0.52)", backdropFilter: "blur(8px)", whiteSpace: "nowrap" }}
              >
                Our Businesses <span className="pill-badge" style={{ background: "#F36B21", color: "#2A1206" }}>→</span>
              </span>
            </button>
          </div>
        </div>

        <div
          style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}
          className="gap-3 sm:gap-6 lg:col-span-5"
        >
          {/* Reference Card Layout matching Screenshot 1 */}
          <div
            id="hero-card"
            style={{
              width: "100%",
              maxWidth: "24rem",
              padding: "1.25rem 1.5rem",
              color: "#ffffff",
              textShadow: "0 2px 10px rgba(0,0,0,.7)",
              opacity: introReady ? 1 : 0,
              transform: introReady ? "translateY(0) scale(1)" : "translateY(16px) scale(.96)",
              transition: "opacity 0.6s cubic-bezier(.16,1,.3,1), transform 0.6s cubic-bezier(.16,1,.3,1)",
            }}
          >
            <div style={{ cursor: "pointer", marginTop: ".75rem" }} onClick={carouselNext}>
              <span style={{ fontSize: ".8125rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", color: "rgba(255,255,255,0.7)" }}>
                {carouselItems[imageIdx].caption}
              </span>
              <h4 style={{ fontSize: "1.5rem", fontWeight: 700, lineHeight: 1.3, color: "#ffffff", marginTop: ".25rem" }}>
                {carouselItems[imageIdx].title}
              </h4>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: ".5rem" }}>
                <div style={{ display: "flex", gap: ".375rem" }}>
                  {heroImages.map((_, i) => (
                    <span
                      key={i}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectDivision(i);
                      }}
                      style={{
                        height: ".25rem",
                        width: i === imageIdx ? "1.25rem" : ".375rem",
                        borderRadius: "9999px",
                        background: i === imageIdx ? "#ffffff" : "rgba(255,255,255,0.32)",
                        transition: "all .3s",
                        cursor: "pointer",
                      }}
                    />
                  ))}
                </div>
                <div style={{ display: "flex", gap: ".375rem" }}>
                  <button
                    style={{ width: "1.75rem", height: "1.75rem", display: "grid", placeItems: "center", borderRadius: "9999px", background: "#F36B21", color: "#2A1206", border: "1px solid rgba(0,0,0,0.15)", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      carouselPrev();
                    }}
                  >
                    <span style={{ display: "inline-block", transform: "rotate(180deg)", fontSize: ".75rem" }}>→</span>
                  </button>
                  <button
                    style={{ width: "1.75rem", height: "1.75rem", display: "grid", placeItems: "center", borderRadius: "9999px", background: "#F36B21", color: "#2A1206", border: "1px solid rgba(0,0,0,0.15)", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      carouselNext();
                    }}
                  >
                    <span style={{ fontSize: ".75rem" }}>→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Trusted Ecosystem Divisions Grid matching Screenshot 1 */}
          <div
            id="hero-partners"
            data-lenis-prevent
            style={{
              width: "100%",
              maxWidth: "28rem",
              opacity: introReady ? 1 : 0,
              transform: introReady ? "translateY(0)" : "translateY(14px)",
              transition: "opacity 0.6s cubic-bezier(.16,1,.3,1), transform 0.6s cubic-bezier(.16,1,.3,1)",
            }}
          >
            <ul style={{ display: "flex", flexWrap: "wrap", gap: ".5rem" }} className="justify-start lg:justify-end">
              {[
                { name: "Getmeds Phils", domain: "getmeds.ph" },
                { name: "Getmeds India", domain: "getmedshealthcare.com" },
                { name: "Getmeds Vanuatu", domain: "getmedsvanuatu.com" },
                { name: "Getmeds Latam", domain: "getmedslatom.com" },
                { name: "Getmeds SEA", domain: "getmedssea.com" },
                { name: "Bishnoi India", domain: "bishnoi-omniverse.in" },
                { name: "Bishnoi Phils", domain: "bishnoi-omniverse.ph" },
                { name: "N. Bishnoi Foundation", domain: "nbf.com" },
                { name: "N. K. Bishnoi Office", domain: "nkb.com" },
              ].map((entity) => (
                <li key={entity.domain}>
                  <a
                    href={`https://${entity.domain}`}
                    target="_blank"
                    rel="noreferrer"
                    className="hover-spring-sm"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: ".375rem",
                      fontSize: ".8125rem",
                      padding: ".4rem 1rem",
                      color: "rgba(255,255,255,0.92)",
                      fontWeight: 500,
                      background: "rgba(26,22,19,0.6)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid rgba(243,107,33,0.38)",
                      borderRadius: "9999px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <span>{entity.name}</span>
                    <span className="text-[.75rem] sm:text-[.65rem]" style={{ color: "#F36B21" }}>↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          id="hero-status"
          className="col-span-full w-full"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            gap: ".75rem",
            borderTop: "1px solid rgba(255,255,255,0.2)",
            padding: "1.25rem 0 0",
            fontSize: ".75rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: ".025em",
            color: "rgba(255,255,255,0.7)",
            opacity: introReady ? 1 : 0,
            transition: "opacity 0.6s cubic-bezier(.22,1,.36,1)",
          }}
        >
          <span>500 Years of Heritage</span>
          <span style={{ display: "inline-flex", gap: ".5rem" }}>
            Scroll to explore <span style={{ display: "inline-block" }}>↓</span>
          </span>
        </div>
      </div>
    </section>
  );
}
