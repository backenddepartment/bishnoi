"use client";

import React from "react";

export default function EcosystemStructure() {
  return (
    <section
      style={{
        background: "linear-gradient(180deg, #FBF8F1 0%, #F5EFE0 100%)",
        padding: "5rem 1.25rem",
        borderTop: "1px solid rgba(74, 68, 60, 0.08)",
        borderBottom: "1px solid rgba(74, 68, 60, 0.08)",
      }}
    >
      <div className="shell" style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <div className="eyebrow eyebrow-dark" style={{ justifyContent: "center", display: "inline-flex" }}>
            <span className="dot dot-blink"></span> Ecosystem Architecture
          </div>
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 2.75rem)",
              fontWeight: 700,
              letterSpacing: "-.02em",
              color: "#2E2822",
              marginTop: "0.75rem",
            }}
          >
            How The Ecosystem Works
          </h2>
          <p
            style={{
              fontSize: "1.0625rem",
              color: "var(--ink-soft)",
              maxWidth: "60ch",
              margin: "0.75rem auto 0",
              lineHeight: 1.6,
            }}
          >
            One central purpose guiding operational businesses, strategic leadership, and social impact initiatives.
          </p>
        </div>

        {/* Tree Structure Card */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "1.75rem",
            padding: "3rem 2rem",
            boxShadow: "0 10px 40px rgba(0,0,0,0.04)",
            border: "1px solid rgba(74, 68, 60, 0.1)",
          }}
        >
          {/* Root Node */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div
              style={{
                background: "linear-gradient(135deg, #2E2822 0%, #1C1815 100%)",
                color: "#FFFFFF",
                padding: "1rem 2.5rem",
                borderRadius: "9999px",
                textAlign: "center",
                boxShadow: "0 8px 24px rgba(46, 40, 34, 0.2)",
              }}
            >
              <div style={{ fontSize: "1.25rem", fontWeight: 700, letterSpacing: "0.05em" }}>BISHNOI</div>
              <div style={{ fontSize: "0.75rem", textTransform: "uppercase", opacity: 0.8, letterSpacing: "0.08em" }}>
                Global Business Ecosystem
              </div>
            </div>

            {/* Vertical Line from Root */}
            <div
              style={{
                width: "2px",
                height: "2.5rem",
                background: "#F36B21",
                margin: "0 auto",
              }}
            />
          </div>

          {/* Branches Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: "2rem", marginTop: "1rem" }}>
            {/* Branch 1: Operational Businesses */}
            <div
              style={{
                background: "#FBF8F1",
                borderRadius: "1.25rem",
                padding: "1.75rem 1.5rem",
                border: "1px solid rgba(74, 68, 60, 0.08)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "#F36B21",
                  marginBottom: "0.5rem",
                }}
              >
                Operational Pillar
              </div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#2E2822", marginBottom: "1rem" }}>
                Businesses
              </h3>
              <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <a
                  href="/businesses/getmeds"
                  className="hover-lift"
                  style={{
                    background: "#FFFFFF",
                    padding: "0.875rem 1rem",
                    borderRadius: "0.75rem",
                    border: "1px solid rgba(74,68,60,0.12)",
                    fontSize: "0.9375rem",
                    fontWeight: 600,
                    color: "var(--ink)",
                    display: "block",
                    textDecoration: "none",
                  }}
                >
                  Getmeds Ecosystem
                  <span style={{ display: "block", fontSize: "0.75rem", fontWeight: 400, color: "var(--ink-soft)" }}>
                    Healthcare & Pharma Access
                  </span>
                </a>
                <a
                  href="/businesses/bishnoi-omniverse"
                  className="hover-lift"
                  style={{
                    background: "#FFFFFF",
                    padding: "0.875rem 1rem",
                    borderRadius: "0.75rem",
                    border: "1px solid rgba(74,68,60,0.12)",
                    fontSize: "0.9375rem",
                    fontWeight: 600,
                    color: "var(--ink)",
                    display: "block",
                    textDecoration: "none",
                  }}
                >
                  Bishnoi Omniverse
                  <span style={{ display: "block", fontSize: "0.75rem", fontWeight: 400, color: "var(--ink-soft)" }}>
                    Hospital Supply & Devices
                  </span>
                </a>
              </div>
            </div>

            {/* Branch 2: Strategic Leadership */}
            <div
              style={{
                background: "#FBF8F1",
                borderRadius: "1.25rem",
                padding: "1.75rem 1.5rem",
                border: "1px solid rgba(74, 68, 60, 0.08)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "#F36B21",
                  marginBottom: "0.5rem",
                }}
              >
                Strategic Pillar
              </div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#2E2822", marginBottom: "1rem" }}>
                Strategic Organization
              </h3>
              <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <a
                  href="/leadership/naresh-bishnoi"
                  className="hover-lift"
                  style={{
                    background: "#FFFFFF",
                    padding: "0.875rem 1rem",
                    borderRadius: "0.75rem",
                    border: "1px solid rgba(74,68,60,0.12)",
                    fontSize: "0.9375rem",
                    fontWeight: 600,
                    color: "var(--ink)",
                    display: "block",
                    textDecoration: "none",
                  }}
                >
                  Naresh Bishnoi Office
                  <span style={{ display: "block", fontSize: "0.75rem", fontWeight: 400, color: "var(--ink-soft)" }}>
                    Vision & Strategic Capital
                  </span>
                </a>
              </div>
            </div>

            {/* Branch 3: Social Impact */}
            <div
              style={{
                background: "#FBF8F1",
                borderRadius: "1.25rem",
                padding: "1.75rem 1.5rem",
                border: "1px solid rgba(74, 68, 60, 0.08)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "#F36B21",
                  marginBottom: "0.5rem",
                }}
              >
                Impact Pillar
              </div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#2E2822", marginBottom: "1rem" }}>
                Social Impact
              </h3>
              <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <a
                  href="/businesses/foundation"
                  className="hover-lift"
                  style={{
                    background: "#FFFFFF",
                    padding: "0.875rem 1rem",
                    borderRadius: "0.75rem",
                    border: "1px solid rgba(74,68,60,0.12)",
                    fontSize: "0.9375rem",
                    fontWeight: 600,
                    color: "var(--ink)",
                    display: "block",
                    textDecoration: "none",
                  }}
                >
                  Naresh Bishnoi Foundation
                  <span style={{ display: "block", fontSize: "0.75rem", fontWeight: 400, color: "var(--ink-soft)" }}>
                    Conservation & Community Impact
                  </span>
                </a>
              </div>
            </div>
          </div>

          <p
            style={{
              textAlign: "center",
              fontSize: "0.8125rem",
              color: "var(--ink-soft)",
              marginTop: "2rem",
              fontStyle: "italic",
            }}
          >
            * Illustrative ecosystem structure showing how entities and initiatives connect under the Bishnoi identity.
          </p>
        </div>
      </div>
    </section>
  );
}
