"use client";

import { useEffect, useRef, useState } from "react";

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
        padding: "6rem 0",
        background: "linear-gradient(180deg, #FBF8F1 0%, #F4ECE0 100%)",
        color: "var(--ink)",
        overflow: "hidden",
      }}
    >
      <div className="shell" style={{ maxWidth: "1280px", margin: "0 auto" }}>
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
              Behind Bishnoi AI
            </span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "3rem",
              alignItems: "start",
              marginBottom: "4rem",
            }}
          >
            <div>
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
                Member of the Bishnoi Community
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <p
                style={{
                  fontSize: "1.125rem",
                  lineHeight: 1.7,
                  color: "var(--ink-soft)",
                }}
              >
                Naresh Bishnoi built this site to give the community&apos;s history, principles, and legacy a lasting home online — a way of carrying its story forward for a wider audience, and preserving it for the generations of Bishnois still to come.
              </p>
              <div>
                <a
                  href="/businesses"
                  className="animated-link"
                  style={{
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: "var(--brand-orange)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: ".4rem",
                  }}
                >
                  <span>Read his full story →</span>
                </a>
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
            boxShadow: "0 20px 50px -15px rgba(28,24,21,0.25)",
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
              maxWidth: "44ch",
              margin: 0,
            }}
          >
            “That same conviction — protect what&apos;s worth protecting, build what lasts — now extends into the businesses he leads.”
          </blockquote>
        </div>

        {/* His Businesses Subsection */}
        <div
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.8s cubic-bezier(.22,1,.36,1) 0.3s, transform 0.8s cubic-bezier(.22,1,.36,1) 0.3s",
          }}
        >
          <div style={{ marginBottom: "3rem" }}>
            <h3
              style={{
                fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
                fontWeight: 700,
                letterSpacing: "-.02em",
                color: "#2E2822",
              }}
            >
              His Businesses
            </h3>
            <p
              style={{
                fontSize: "1.25rem",
                color: "var(--ink-soft)",
                marginTop: ".35rem",
              }}
            >
              From Vision to the World.
            </p>
          </div>

          {/* Cards Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "2rem",
              marginBottom: "3.5rem",
            }}
          >
            {/* Card 1: Getmeds Ecosystem */}
            <div
              style={{
                background: "#ffffff",
                borderRadius: "1.5rem",
                padding: "2rem",
                boxShadow: "0 6px 24px rgba(0,0,0,0.04)",
                border: "1px solid #E6DECB",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: ".75rem",
                    fontWeight: 600,
                    letterSpacing: ".06em",
                    textTransform: "uppercase",
                    color: "var(--brand-orange)",
                    backgroundColor: "var(--accent-wash)",
                    padding: ".3rem .6rem",
                    borderRadius: ".5rem",
                  }}
                >
                  Healthcare Ecosystem
                </span>
                <h4
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    color: "#2E2822",
                    marginTop: "1rem",
                    marginBottom: ".75rem",
                  }}
                >
                  Getmeds Ecosystem
                </h4>
                <p style={{ fontSize: "1rem", lineHeight: 1.6, color: "var(--ink-soft)" }}>
                  Connecting healthcare and pharmaceutical solutions to communities worldwide.
                </p>
              </div>

              <div
                style={{
                  marginTop: "1.75rem",
                  paddingTop: "1rem",
                  borderTop: "1px solid #E6DECB",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span style={{ fontSize: ".8125rem", fontWeight: 600, color: "var(--ink)" }}>
                  Asia · Latin America · Oceania | Caribbean
                </span>
              </div>
            </div>

            {/* Card 2: Bishnoi Omniverse */}
            <div
              style={{
                background: "#ffffff",
                borderRadius: "1.5rem",
                padding: "2rem",
                boxShadow: "0 6px 24px rgba(0,0,0,0.04)",
                border: "1px solid #E6DECB",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: ".75rem",
                    fontWeight: 600,
                    letterSpacing: ".06em",
                    textTransform: "uppercase",
                    color: "var(--brand-orange)",
                    backgroundColor: "var(--accent-wash)",
                    padding: ".3rem .6rem",
                    borderRadius: ".5rem",
                  }}
                >
                  Supply Infrastructure
                </span>
                <h4
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    color: "#2E2822",
                    marginTop: "1rem",
                    marginBottom: ".75rem",
                  }}
                >
                  Bishnoi Omniverse
                </h4>
                <p style={{ fontSize: "1rem", lineHeight: 1.6, color: "var(--ink-soft)" }}>
                  Building the healthcare supply powerhouse designed to serve hospitals across their full spectrum of needs.
                </p>
              </div>

              <div
                style={{
                  marginTop: "1.75rem",
                  paddingTop: "1rem",
                  borderTop: "1px solid #E6DECB",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span style={{ fontSize: ".8125rem", fontWeight: 600, color: "var(--ink)" }}>
                  India · Philippines
                </span>
              </div>
            </div>

            {/* Card 3: Other Ventures */}
            <div
              style={{
                background: "#ffffff",
                borderRadius: "1.5rem",
                padding: "2rem",
                boxShadow: "0 6px 24px rgba(0,0,0,0.04)",
                border: "1px solid #E6DECB",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: ".75rem",
                    fontWeight: 600,
                    letterSpacing: ".06em",
                    textTransform: "uppercase",
                    color: "var(--brand-orange)",
                    backgroundColor: "var(--accent-wash)",
                    padding: ".3rem .6rem",
                    borderRadius: ".5rem",
                  }}
                >
                  Foundations & Digital
                </span>
                <h4
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    color: "#2E2822",
                    marginTop: "1rem",
                    marginBottom: ".75rem",
                  }}
                >
                  Other Ventures
                </h4>
                <ul style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--ink-soft)", paddingLeft: "1.25rem", listStyle: "disc" }}>
                  <li>Naresh Bishnoi Foundation</li>
                  <li>NKB.com</li>
                </ul>
              </div>

              <div
                style={{
                  marginTop: "1.75rem",
                  paddingTop: "1rem",
                  borderTop: "1px solid #E6DECB",
                }}
              >
                <span style={{ fontSize: ".8125rem", fontWeight: 600, color: "var(--brand-orange)" }}>
                  Impact & Digital Initiatives
                </span>
              </div>
            </div>
          </div>

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
