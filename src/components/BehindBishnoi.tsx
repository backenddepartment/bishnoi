"use client";

import { useEffect, useRef, useState } from "react";

export default function BehindBishnoi() {
  const [isVisible, setIsVisible] = useState(false);
  const [photoFailed, setPhotoFailed] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = photoRef.current;
    if (img && img.complete && img.naturalWidth === 0) {
      setPhotoFailed(true);
    }
  }, []);

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
              display: "flex",
              flexWrap: "wrap",
              gap: "3rem",
              alignItems: "flex-start",
              marginBottom: "4rem",
            }}
          >
            {/* Portrait */}
            <div
              style={{
                flex: "0 0 220px",
                width: "220px",
                aspectRatio: "4 / 5",
                borderRadius: "1.5rem",
                overflow: "hidden",
                position: "relative",
                boxShadow: "0 20px 40px -20px rgba(28,24,21,0.3)",
                border: "1px solid #E6DECB",
                background: "linear-gradient(135deg, #2E2822 0%, #1C1815 100%)",
              }}
            >
              {!photoFailed && (
                <img
                  ref={photoRef}
                  src="/naresh.jpg"
                  alt="Naresh Bishnoi"
                  onError={() => setPhotoFailed(true)}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              )}
              {photoFailed && (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "3.5rem",
                    fontWeight: 700,
                    letterSpacing: "-.02em",
                    color: "rgba(247,243,232,0.85)",
                  }}
                >
                  NB
                </div>
              )}
            </div>

            <div
              style={{
                flex: "1 1 480px",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "3rem",
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
                    fontSize: "1.375rem",
                    fontWeight: 600,
                    color: "var(--brand-orange)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: ".4rem",
                  }}
                >
                  <span>Read his full story ↗</span>
                </a>
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
          {/* Card Grid — headline tile + business tiles, tall vertical cards
              with a "+" badge in the corner and content anchored top/bottom */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "1.5rem",
              marginBottom: "3.5rem",
            }}
          >
            {/* Tile 0: Section headline */}
            <div
              style={{
                position: "relative",
                borderRadius: "1.75rem",
                padding: "1.75rem",
                minHeight: "420px",
                background: "linear-gradient(158deg,#2E2822 0%,#1C1815 100%)",
                overflow: "hidden",
              }}
            >
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: "-4rem",
                  left: "-3rem",
                  width: "16rem",
                  height: "16rem",
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(243,107,33,0.75) 0%, rgba(243,107,33,0.15) 55%, rgba(243,107,33,0) 75%)",
                  pointerEvents: "none",
                }}
              />
              <h3
                style={{
                  position: "relative",
                  fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
                  fontWeight: 700,
                  letterSpacing: "-.02em",
                  lineHeight: 1.2,
                  color: "#ffffff",
                  maxWidth: "14ch",
                }}
              >
                His Businesses
              </h3>
              <p
                style={{
                  position: "relative",
                  fontSize: "1.0625rem",
                  color: "rgba(247,243,232,0.7)",
                  marginTop: ".5rem",
                }}
              >
                From Vision to the World.
              </p>
            </div>

            {/* Tile 1: Getmeds Ecosystem */}
            <div
              className="biz-tile"
              style={{
                position: "relative",
                borderRadius: "1.75rem",
                padding: "1.75rem",
                minHeight: "420px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                overflow: "hidden",
              }}
            >
              <span
                className="biz-tile-circle"
                style={{
                  position: "absolute",
                  top: "1.25rem",
                  right: "1.25rem",
                  width: "2rem",
                  height: "2rem",
                  borderRadius: "50%",
                  display: "grid",
                  placeItems: "center",
                  fontSize: "1.125rem",
                  fontWeight: 600,
                }}
              >
                ↗
              </span>
              <div aria-hidden="true" className="biz-tile-watermark" style={{ fontSize: "6rem", fontWeight: 800, lineHeight: 1 }}>
                G
              </div>
              <div>
                <span
                  className="biz-tile-badge"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: ".3rem",
                    fontSize: ".8125rem",
                    fontWeight: 600,
                    padding: ".3rem .7rem",
                    borderRadius: "9999px",
                  }}
                >
                  Getmeds Ecosystem <span style={{ fontSize: ".75rem" }}>↗</span>
                </span>
                <p className="biz-tile-text" style={{ fontSize: "1rem", lineHeight: 1.6, marginTop: ".75rem" }}>
                  Connecting healthcare and pharmaceutical solutions to communities across Asia, Latin America, Oceania and the Caribbean.
                </p>
              </div>
            </div>

            {/* Tile 2: Bishnoi Omniverse — accent tile */}
            <div
              className="biz-tile biz-tile-accent"
              style={{
                position: "relative",
                borderRadius: "1.75rem",
                padding: "1.75rem",
                minHeight: "420px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                overflow: "hidden",
              }}
            >
              <span
                className="biz-tile-circle"
                style={{
                  position: "absolute",
                  top: "1.25rem",
                  right: "1.25rem",
                  width: "2rem",
                  height: "2rem",
                  borderRadius: "50%",
                  display: "grid",
                  placeItems: "center",
                  fontSize: "1.125rem",
                  fontWeight: 600,
                }}
              >
                ↗
              </span>
              <div aria-hidden="true" className="biz-tile-watermark" style={{ fontSize: "6rem", fontWeight: 800, lineHeight: 1 }}>
                B
              </div>
              <div>
                <span
                  className="biz-tile-badge"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: ".3rem",
                    fontSize: ".8125rem",
                    fontWeight: 600,
                    padding: ".3rem .7rem",
                    borderRadius: "9999px",
                  }}
                >
                  Bishnoi Omniverse <span style={{ fontSize: ".75rem" }}>↗</span>
                </span>
                <p className="biz-tile-text" style={{ fontSize: "1rem", lineHeight: 1.6, marginTop: ".75rem" }}>
                  Building the healthcare supply powerhouse serving hospitals across India and the Philippines.
                </p>
              </div>
            </div>

            {/* Tile 3: Other Ventures */}
            <div
              className="biz-tile"
              style={{
                position: "relative",
                borderRadius: "1.75rem",
                padding: "1.75rem",
                minHeight: "420px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                overflow: "hidden",
              }}
            >
              <span
                className="biz-tile-circle"
                style={{
                  position: "absolute",
                  top: "1.25rem",
                  right: "1.25rem",
                  width: "2rem",
                  height: "2rem",
                  borderRadius: "50%",
                  display: "grid",
                  placeItems: "center",
                  fontSize: "1.125rem",
                  fontWeight: 600,
                }}
              >
                ↗
              </span>
              <div aria-hidden="true" className="biz-tile-watermark" style={{ fontSize: "6rem", fontWeight: 800, lineHeight: 1 }}>
                N
              </div>
              <div>
                <span
                  className="biz-tile-badge"
                  style={{
                    fontSize: ".8125rem",
                    fontWeight: 600,
                    padding: ".3rem .7rem",
                    borderRadius: "9999px",
                  }}
                >
                  Foundations & Digital
                </span>
                <ul className="biz-tile-text" style={{ fontSize: "1rem", lineHeight: 1.8, marginTop: ".75rem", paddingLeft: "1.1rem", listStyle: "disc" }}>
                  <li>Naresh Bishnoi Foundation</li>
                  <li>NKB.com</li>
                </ul>
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
