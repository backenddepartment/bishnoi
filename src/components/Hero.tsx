"use client";

import { useEffect, useState } from "react";

import { HERO_CAROUSEL, HERO_CONTENT, type HeroVariant } from "./heroContent";
// Hero pills hidden for now — see the commented-out usage below.
// import HeroPillList from "./HeroPillList";

interface HeroProps {
  onOpenRequestModal: () => void;
  onScrollTo: (id: string) => void;
  introReady: boolean;
  variant?: HeroVariant;
  // Drops the dark gradient scrim over the background image — used on the
  // Businesses page, whose background doesn't need the extra darkening for
  // text contrast the way the Home page's photo did.
  hideOverlay?: boolean;
}

const CAROUSEL_INTERVAL_MS = 5000;

export default function Hero({ onScrollTo, introReady, variant = "default", hideOverlay }: HeroProps) {
  const content = HERO_CONTENT[variant];
  const isIntro =
    variant === "intro" ||
    variant === "heritage" ||
    variant === "getmeds" ||
    variant === "bishnoi-omniverse" ||
    variant === "foundation" ||
    variant === "what-we-do";

  const [imageIdx, setImageIdx] = useState(0);

  // Auto-advance the background image every few seconds — skipped when the
  // variant pins a single fixed background image (every variant currently
  // in use sets one, so this carousel is effectively dormant unless a
  // future variant is added without a backgroundImage).
  useEffect(() => {
    if (content.backgroundImage) return;

    const interval = setInterval(() => {
      setImageIdx((prev) => (prev + 1) % HERO_CAROUSEL.length);
    }, CAROUSEL_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [content.backgroundImage]);

  const backgroundSrc = content.backgroundImage ?? HERO_CAROUSEL[imageIdx].image;

  // Self-contained entrance trigger for the background image slide and the
  // title/CTA slide below — independent of the `introReady` prop, which
  // currently starts (and stays) `true` on mount site-wide, so nothing
  // gated on it ever visibly animates. rAF delays the flip one frame so the
  // initial offset/opacity actually paints before transitioning, otherwise
  // React can apply both states before the first paint and the transition
  // never renders.
  const [slideIn, setSlideIn] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setSlideIn(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section
      id="home"
      style={{
        position: "relative",
        isolation: "isolate",
        overflow: "hidden",
        minHeight: isIntro ? "60vh" : "115vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#ffffff",
      }}
    >
      <div id="liquid-container" style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        {/* Fades in while sliding right-to-left into place. A slight scale
            on the initial state keeps the edges covered while it's offset,
            so no gap flashes at the side during the slide (a plain
            translateX on an inset:0 image would otherwise reveal the
            section's white background along that edge). */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          id="liquid-before"
          src={backgroundSrc}
          alt="Hero background"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: slideIn ? 1 : 0,
            transform: slideIn ? "translateX(0) scale(1)" : "translateX(4%) scale(1.06)",
            transition: "opacity 2.2s cubic-bezier(.16,1,.3,1), transform 2.6s cubic-bezier(.16,1,.3,1)",
          }}
        />
      </div>

      {/* High-Contrast Gradient Backdrop Overlay */}
      {!hideOverlay && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            pointerEvents: "none",
            background: "linear-gradient(to bottom, rgba(26,22,19,0.75) 0%, rgba(26,22,19,0.35) 50%, rgba(26,22,19,0.7) 100%)",
          }}
        />
      )}

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
        {/* Slides in left-to-right (starts offset left, settles at 0) while
            fading in — covers the headline, subtitle/bio, and the two CTA
            buttons together as one unit, on top of whatever fade timing
            their own inner elements already have. */}
        <div
          id="hero-title-wrapper"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.75rem",
            opacity: slideIn ? 1 : 0,
            transform: slideIn ? "translateX(0)" : "translateX(-60px)",
            transition: "opacity 2.2s cubic-bezier(.16,1,.3,1), transform 2.2s cubic-bezier(.16,1,.3,1)",
            ...(isIntro && { alignItems: "center", textAlign: "center" as const }),
          }}
          className={isIntro ? "lg:col-span-12" : "lg:col-span-7"}
        >
          <h1
            id="hero-h1"
            className="text-[1.65rem] sm:text-[2.25rem] md:text-[3.5rem]"
            style={{
              maxWidth: isIntro ? "20ch" : "26ch",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-.02em",
              color: "#ffffff",
              textShadow: "0 2px 8px rgba(0,0,0,0.5)",
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
                <span className="pill-inner pill-accent pill-with-arrow" style={{ boxShadow: "none", whiteSpace: "nowrap", color: "#ffffff" }}>
                  Who we are <span className="pill-badge">→</span>
                </span>
              </button>
              <a href="/businesses" className="pill-btn">
                <span
                  className="pill-inner pill-outline pill-with-arrow"
                  style={{ color: "#ffffff", borderColor: "rgba(243,107,33,0.55)", background: "rgba(26,22,19,0.52)", backdropFilter: "blur(8px)", whiteSpace: "nowrap" }}
                >
                  Our Businesses <span className="pill-badge" style={{ background: "#F36B21", color: "#2A1206" }}>→</span>
                </span>
              </a>
            </div>
          )}
        </div>

        {!isIntro && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }} className="gap-3 sm:gap-6 lg:col-span-5">
            {/* Hero pills (Getmeds Phils, Bishnoi India, etc.) hidden for now —
                re-enable by uncommenting this block. Data in heroContent.ts is
                untouched. */}
            {/* <div
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
              <HeroPillList pills={content.pills} />
            </div> */}
          </div>
        )}

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
              color: "#000000",
              opacity: introReady ? 1 : 0,
              transition: "opacity 0.6s cubic-bezier(.22,1,.36,1)",
            }}
          >
            <span>500 Years of Heritage</span>
            <span style={{ display: "inline-flex", gap: ".5rem", color: "#ffffff", textShadow: "0 2px 8px rgba(0,0,0,0.6)" }}>
              Scroll to explore <span style={{ display: "inline-block" }}>↓</span>
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
