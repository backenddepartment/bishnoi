"use client";

import { useEffect, useRef, useState } from "react";

const FOUNDER_BADGES = [
  "Founder of Getmeds & 2MG Inc",
  "Oncology Medicine Supply Specialist",
  "Rare Medicines",
  "Medicine Donations & Global Healthcare",
  "European Society for Medical Oncology Member",
  "UN Global Compact Member",
];

export default function BehindBishnoi() {
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
      ref={sectionRef}
      id="behind-bishnoi"
      style={{
        position: "relative",
        paddingTop: "1.5rem",
        paddingBottom: "6rem",
        background: "#ffffff",
        color: "var(--ink)",
        overflow: "hidden",
      }}
    >
      <div className="shell" style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <h2
          style={{
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 700,
            letterSpacing: "-.02em",
            lineHeight: 1.2,
            color: "#2E2822",
            marginBottom: "3rem",
            textAlign: "center",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.8s cubic-bezier(.22,1,.36,1), transform 0.8s cubic-bezier(.22,1,.36,1)",
          }}
        >
          The Person Behind the Ecosystem
        </h2>

        {/* Top Header & Bio Block */}
        <div
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.8s cubic-bezier(.22,1,.36,1), transform 0.8s cubic-bezier(.22,1,.36,1)",
          }}
        >
          <div style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", marginBottom: "1rem" }}>
            <span
              style={{
                fontSize: ".875rem",
                fontWeight: 600,
                letterSpacing: ".08em",
                textTransform: "uppercase",
                color: "var(--brand-orange)",
              }}
            >
              The Founder
            </span>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "3rem",
              alignItems: "flex-start",
              marginBottom: "4rem",
            }}
          >
            <div
              style={{
                flex: "1 1 480px",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "3rem",
              }}
            >
            <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
              <h2
                style={{
                  fontSize: "clamp(2.25rem, 4vw, 3.5rem)",
                  fontWeight: 700,
                  letterSpacing: "-.02em",
                  lineHeight: 1.15,
                  color: "#2E2822",
                }}
              >
                Naresh Bishnoi
              </h2>
              <p
                style={{
                  fontSize: "1.125rem",
                  fontWeight: 500,
                  color: "var(--brand-orange)",
                  marginTop: ".5rem",
                }}
              >
                Born into the Bishnoi Community
              </p>

              <div
                style={{
                  marginTop: "2rem",
                  flex: 1,
                  minHeight: "180px",
                  borderRadius: "1.5rem",
                  overflow: "hidden",
                  boxShadow: "0 10px 30px -14px rgba(28,24,21,0.25)",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/businesses/nkb.jpg"
                  alt="Naresh Bishnoi"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <p style={{ fontSize: "1.125rem", lineHeight: 1.7, color: "var(--ink-soft)" }}>
                From a small village in Haryana, India, to building businesses serving healthcare markets and
                communities around the world, Naresh Bishnoi&apos;s journey has been shaped by challenges, lessons,
                failures, and remarkable opportunities.
              </p>
              <p style={{ fontSize: "1.125rem", lineHeight: 1.7, color: "var(--ink-soft)" }}>
                Driven by a commitment to making healthcare more accessible, Naresh has built his work around
                strengthening the movement of medicines across borders, overcoming geographical barriers, and
                creating pathways for patients and healthcare institutions to access what they need.
              </p>
              <p style={{ fontSize: "1.125rem", lineHeight: 1.7, color: "var(--ink-soft)" }}>
                What began with a vision in healthcare has grown into an expanding ecosystem spanning pharmaceutical
                distribution, healthcare supply, technology, and social initiatives — building businesses with the
                ambition to create lasting impact across markets and generations.
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: ".625rem", marginTop: ".25rem" }}>
                {FOUNDER_BADGES.map((badge) => (
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
        </div>

        {/* Quote Box */}
        <div
          style={{
            margin: "0 0 5rem 0",
            padding: "3rem 2.5rem",
            borderRadius: "1.75rem",
            background: "#1C1815",
            color: "#ffffff",
            position: "relative",
            overflow: "hidden",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.8s cubic-bezier(.22,1,.36,1) 0.15s, transform 0.8s cubic-bezier(.22,1,.36,1) 0.15s",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-2rem",
              right: "2rem",
              fontSize: "10rem",
              fontFamily: "serif",
              color: "rgba(243,107,33,0.08)",
              lineHeight: 1,
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            “
          </div>
          <blockquote
            style={{
              position: "relative",
              zIndex: 1,
              fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
              fontWeight: 400,
              fontStyle: "italic",
              lineHeight: 1.5,
              color: "#F7F3E8",
              margin: 0,
            }}
          >
            That same conviction — protect what&apos;s worth protecting, build what lasts — now extends into the businesses he leads.
          </blockquote>
        </div>

        {/* Tie-back to the ecosystem shown earlier on the page */}
        <div
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.8s cubic-bezier(.22,1,.36,1) 0.3s, transform 0.8s cubic-bezier(.22,1,.36,1) 0.3s",
          }}
        >
          {/* Bottom Bar: UN Global Compact badge & Visit Businesses CTA */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1.5rem",
              padding: "1.75rem 2.25rem",
              borderRadius: "1.5rem",
              background: "#ffffff",
              border: "1px solid #E6DECB",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: ".875rem" }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "2.5rem",
                  height: "2.5rem",
                  borderRadius: "50%",
                  backgroundColor: "rgba(243,107,33,0.1)",
                  color: "var(--brand-orange)",
                  fontWeight: 700,
                  fontSize: "1rem",
                }}
              >
                UN
              </span>
              <span style={{ fontSize: "1.0625rem", fontWeight: 600, color: "#2E2822" }}>
                Proud Member of the United Nations Global Compact.
              </span>
            </div>

            <a href="/businesses" className="pill-btn">
              <span
                className="pill-inner pill-accent pill-with-arrow"
                style={{
                  fontSize: "1rem",
                  padding: ".75rem 1.75rem",
                  boxShadow: "0 8px 24px rgba(243,107,33,0.3)",
                }}
              >
                Visit Businesses <span className="pill-badge up-right">↗</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
