"use client";

import { useEffect, useRef, useState } from "react";

const EASE = "cubic-bezier(.22,1,.36,1)";

const pillars = [
  {
    label: "Diversified",
    body: "A strong ecosystem of companies across key industries.",
    icon: (
      <svg width="42" height="42" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <rect x="16" y="2" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <rect x="2" y="16" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <rect x="16" y="16" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    label: "Innovative",
    body: "Technology and innovation at the core of everything we do.",
    icon: (
      <svg width="42" height="42" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M14 3v4M14 21v4M3 14h4M21 14h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="14" cy="14" r="5" stroke="currentColor" strokeWidth="1.8" />
        <path d="M14 9v1M14 18v1M9 14h1M18 14h1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Trusted",
    body: "Built on integrity, ethics and a commitment to excellence.",
    icon: (
      <svg width="42" height="42" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M14 3L5 7v7c0 5.25 3.9 10.15 9 11.25C19.1 24.15 23 19.25 23 14V7l-9-4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M10 14l2.5 2.5L18 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Global",
    body: "Creating value and opportunities on a global scale.",
    icon: (
      <svg width="42" height="42" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <circle cx="14" cy="14" r="11" stroke="currentColor" strokeWidth="1.8" />
        <path d="M3 14h22M14 3c-3 4-3 14 0 22M14 3c3 4 3 14 0 22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function OurVision() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    // Bidirectional — fades back out on exit too, not just in on first
    // entry, so the section reads like a slide transitioning in and out.
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="vision"
      style={{
        background: "#ffffff",
        padding: "2rem 0 6rem 0",
        position: "relative",
        overflow: "hidden",
      }}
    >


      <div className="shell" style={{ position: "relative", zIndex: 1 }}>
        {/* Top row — eyebrow + statement */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "3rem",
            marginBottom: "4rem",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(28px)",
            transition: `opacity .7s ${EASE}, transform .7s ${EASE}`,
          }}
        >
          {/* Eyebrow */}
          <div style={{ display: "flex", alignItems: "center", gap: ".625rem" }}>
            <span
              style={{
                display: "inline-block",
                width: ".4rem",
                height: ".4rem",
                borderRadius: "9999px",
                background: "#F36B21",
              }}
            />
            <span
              style={{
                fontSize: "1rem",
                fontWeight: 700,
                letterSpacing: ".1em",
                textTransform: "uppercase",
                color: "rgba(28,24,21,.45)",
              }}
            >
              Our Vision
            </span>
          </div>

          {/* Vision statement */}
          <p
            style={{
              fontSize: "clamp(1.75rem, 4vw, 3rem)",
              fontWeight: 600,
              lineHeight: 1.2,
              letterSpacing: "-.02em",
              color: "#1C1815",
            }}
          >
            To build a smarter, healthier and sustainable world through innovation, integrity and impact.
          </p>
        </div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: "rgba(28,24,21,.1)",
            marginBottom: "4rem",
            opacity: isVisible ? 1 : 0,
            transition: `opacity .9s ${EASE} .15s`,
          }}
        />

        {/* Four pillars. Explicit column counts per breakpoint (instead of
            auto-fit/minmax) avoid an orphaned 4th item wrapping alone onto
            its own row with an awkward gap beside it — which auto-fit did
            at ~768px and ~1024px, where 3 tracks fit but not 4. */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          style={{
            gap: "2rem",
          }}
        >
          {pillars.map((pillar, i) => (
            <div
              key={pillar.label}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(32px)",
                transition: `opacity .7s ${EASE} ${.2 + i * .1}s, transform .7s ${EASE} ${.2 + i * .1}s`,
              }}
            >
              {/* Icon — no filled background, just the mark itself */}
              <div
                style={{
                  width: "3.5rem",
                  height: "3.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  color: "#F36B21",
                  marginBottom: "1.25rem",
                }}
              >
                {pillar.icon}
              </div>

              {/* Label */}
              <div
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "#1C1815",
                  marginBottom: ".625rem",
                }}
              >
                {pillar.label}
              </div>

              {/* Body */}
              <p
                style={{
                  fontSize: "1.1875rem",
                  lineHeight: 1.65,
                  color: "rgba(28,24,21,.6)",
                  maxWidth: "28ch",
                }}
              >
                {pillar.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
