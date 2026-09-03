"use client";

import { useEffect, useRef, useState } from "react";

import ActMark from "./ActMark";

interface AboutProps {
  onScrollTo?: (id: string) => void;
  introReady?: boolean;
}

const STATS = [
  { value: "1485", label: "Year the faith was founded" },
  { value: "29", label: "Guiding principles" },
  { value: "363", label: "Lives given at Khejarli, 1730" },
];

export default function About({ onScrollTo, introReady = true }: AboutProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        position: "relative",
        background: "#ffffff",
        color: "var(--ink)",
        minHeight: "88vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        paddingTop: "3rem",
        paddingBottom: "4rem",
        borderBottomLeftRadius: "var(--radius-card, 2rem)",
        borderBottomRightRadius: "var(--radius-card, 2rem)",
      }}
    >
      <div className="shell" style={{ display: "flex", flexDirection: "column", gap: "3.5rem", flex: 1, justifyContent: "center" }}>
        {/* Headline & Narrative Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12" style={{ alignItems: "flex-start", gap: "2.5rem" }}>
          <div className="lg:col-span-6 xl:col-span-5" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div id="about-eyebrow">
              <ActMark numeral="I" era="1485" label="Where it began" />
            </div>
            <h2
              id="about-h2"
              // Sized as the "The Man Who Answered a / Drought With 29 Rules"
              // heading in Founder.tsx, so the two read as one tier.
              // No `.act-title` here on purpose: that class carries the larger
              // act-opener sizes as `!important` mobile overrides, which would
              // win against this inline size below 1024px.
              className="break-words"
              style={{
                fontSize: "clamp(1.875rem, 2.8vw, 2.375rem)",
                fontWeight: 700,
                lineHeight: 1.15,
                letterSpacing: "-.02em",
                color: "var(--ink-deep)",
              }}
            >
              A Conservation Ethic<br />Born in the Desert
            </h2>
          </div>

          <div
            className="lg:col-span-6 xl:col-span-7"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              transition: "transform 0.7s cubic-bezier(.22,1,.36,1), opacity 0.7s cubic-bezier(.22,1,.36,1)",
              transitionDelay: "250ms",
            }}
          >
            <p
              id="about-p"
              style={{
                fontSize: "1.25rem",
                lineHeight: 1.65,
                color: "var(--ink-soft)",
              }}
            >
              For more than 500 years, the Bishnoi community of Rajasthan has lived by 29 principles that reach into everything — what a household may cut, what it may kill, what it may drink, even what colour it may wear. In 1730, 363 Bishnois gave their lives defending trees at Khejarli. Today the community still guards the Thar Desert&rsquo;s wildlife with the same conviction.
            </p>

            {/* Hero CTAs */}
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "1rem", paddingTop: ".5rem" }}>
              <button className="pill-btn" onClick={() => onScrollTo ? onScrollTo("principles") : (window.location.href = "/#principles")}>
                <span className="pill-inner pill-accent pill-with-arrow" style={{ boxShadow: "none", color: "#ffffff" }}>
                  Explore the 29 Principles <span className="pill-badge">→</span>
                </span>
              </button>
              {/* Leaves the page on purpose: /bishnoi/khejarli is the canonical
                  account, and this act only previews it. */}
              <a href="/bishnoi/khejarli" className="pill-btn">
                <span className="pill-inner pill-outline pill-with-arrow" style={{ borderColor: "rgba(74,68,60,0.25)", background: "rgba(74,68,60,0.04)", color: "var(--ink)" }}>
                  The Story of Khejarli <span className="pill-badge" style={{ background: "#F36B21", color: "#2A1206" }}>→</span>
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Stats — stacked horizontally along the bottom */}
        <ul
          id="about-stats"
          className="flex-col sm:flex-row flex-wrap"
          style={{
            display: "flex",
            borderTop: "1px solid rgba(74,68,60,0.15)",
            paddingTop: "2.5rem",
          }}
        >
          {STATS.map((stat, i) => (
            <li
              key={stat.label}
              className={`py-6 sm:py-0 ${i < STATS.length - 1 ? "border-b sm:border-b-0 sm:border-r" : ""}`}
              style={{
                flex: "1 1 0",
                minWidth: "12rem",
                textAlign: "center",
                paddingInline: "1.5rem",
                borderColor: "rgba(74,68,60,0.15)",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateX(0)" : "translateX(30px)",
                transition: "transform 0.7s cubic-bezier(.22,1,.36,1), opacity 0.7s cubic-bezier(.22,1,.36,1)",
                transitionDelay: `${400 + i * 120}ms`,
              }}
            >
              <div style={{ fontSize: "3.25rem", fontWeight: 700, color: "#F36B21", letterSpacing: "-.02em", lineHeight: 1 }}>{stat.value}</div>
              <div style={{ marginTop: ".625rem", fontSize: "1.0625rem", color: "var(--ink-soft)" }}>{stat.label}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
