"use client";

import type Lenis from "lenis";

import { SectionHeading } from "./PortfolioParts";

interface PortfolioProps {
  introReady?: boolean;
  lenis?: Lenis | null;
}

// Static "His Businesses" tile grid — the same four-tile layout the home
// page used before the merge (BehindBishnoi.tsx), reinstated here under the
// new section's "Global Business Ecosystem" heading in place of the
// scroll-pinned PortfolioStack card carousel. introReady/lenis are accepted
// so the call site (page.tsx) doesn't need to change, but this version has
// no scroll-driven animation to gate on them.
export default function Portfolio(_props: PortfolioProps) {
  return (
    <section id="works" style={{ background: "#ffffff" }}>
      {/* Extra top padding (vs. the original 2.5rem) so this section doesn't
          sit flush against the hero above it. */}
      <div className="shell" style={{ paddingTop: "8rem", paddingBottom: "5rem" }}>
        <SectionHeading />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1.5rem",
            marginTop: "3.5rem",
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
              Businesses
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
          <a
            href="/businesses#getmeds-ecosystem"
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
              textDecoration: "none",
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
          </a>

          {/* Tile 2: Bishnoi Omniverse — accent tile */}
          <a
            href="/businesses#bishnoi-omniverse"
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
              textDecoration: "none",
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
          </a>

          {/* Tile 3: Foundations & Digital */}
          <a
            href="/businesses#foundations-digital"
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
              textDecoration: "none",
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
          </a>
        </div>
      </div>
    </section>
  );
}
