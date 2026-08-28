"use client";

import { useEffect, useState } from "react";

import { HERO_CAROUSEL, HERO_CONTENT, type HeroVariant } from "./heroContent";

interface HeroProps {
  onOpenRequestModal: () => void;
  onScrollTo: (id: string) => void;
  introReady: boolean;
  variant?: HeroVariant;
}

const CAROUSEL_INTERVAL_MS = 5000;

export default function Hero({ onScrollTo, introReady, variant = "default" }: HeroProps) {
  const content = HERO_CONTENT[variant];
  const isIntro = variant === "intro";

  const [imageIdx, setImageIdx] = useState(0);

  // Auto-advance the background image every few seconds — skipped when the
  // variant pins a single fixed background image.
  useEffect(() => {
    if (content.backgroundImage) return;

    const interval = setInterval(() => {
      setImageIdx((prev) => (prev + 1) % HERO_CAROUSEL.length);
    }, CAROUSEL_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [content.backgroundImage]);

  const backgroundSrc = content.backgroundImage ?? HERO_CAROUSEL[imageIdx].image;

  return (
    <section
      id="home"
      style={{
        position: "relative",
        isolation: "isolate",
        overflow: "hidden",
        minHeight: isIntro ? "60vh" : "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#ffffff",
      }}
    >
      <div id="liquid-container" style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          id="liquid-before"
          src={backgroundSrc}
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
      />

      {!isIntro && (
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
      )}

      <div
        className="shell-full grid grid-cols-1 lg:grid-cols-12"
        style={{
          position: "relative",
          zIndex: 20,
          flex: 1,
          width: "100%",
          maxWidth: "100%",
          gap: "2.5rem",
          paddingBlock: isIntro ? "8rem" : "13rem 3rem",
          color: "#ffffff",
          alignItems: "center",
          alignContent: isIntro ? "center" : "space-between",
        }}
      >
        <div
          id="hero-title-wrapper"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.75rem",
            ...(isIntro && { alignItems: "center", textAlign: "center" }),
          }}
          className="lg:col-span-12"
        >
          <h1
            id="hero-h1"
            className="text-[1.85rem] sm:text-[2.5rem] md:text-[4rem]"
            style={{
              maxWidth: isIntro ? "20ch" : "26ch",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-.02em",
              color: "#ffffff",
              textShadow: "0 4px 16px rgba(0,0,0,0.9), 0 2px 4px rgba(0,0,0,0.8)",
            }}
          >
            <span className={`reveal-line ${introReady ? "visible" : ""}`}>
              <span className="line-inner">{content.headline}</span>
            </span>
          </h1>

          {(content.subtitle || content.bio) && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                opacity: introReady ? 1 : 0,
                transform: introReady ? "translateY(0)" : "translateY(14px)",
                transition: "opacity 0.6s cubic-bezier(.22,1,.36,1), transform 0.6s cubic-bezier(.22,1,.36,1)",
              }}
            >
              {content.subtitle && (
                <p
                  style={{
                    fontSize: "clamp(1.125rem, 2vw, 1.5rem)",
                    fontWeight: 500,
                    color: "rgba(255,255,255,0.85)",
                    textShadow: "0 2px 10px rgba(0,0,0,.7)",
                  }}
                >
                  {content.subtitle}
                </p>
              )}
              {content.bio?.map((paragraph) => (
                <p
                  key={paragraph}
                  style={{
                    maxWidth: "58ch",
                    fontSize: "1.0625rem",
                    lineHeight: 1.7,
                    color: "rgba(255,255,255,0.85)",
                    textShadow: "0 2px 10px rgba(0,0,0,.7)",
                  }}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          )}

          {!isIntro && (
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
          )}
        </div>

        {!isIntro && (
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
        )}
      </div>
    </section>
  );
}
