import type { CSSProperties } from "react";

import type { Entity } from "./portfolioData";

export function SectionHeading({ light, compact }: { light?: boolean; compact?: boolean }) {
  // `compact` is only ever passed from the pinned card-stack (PortfolioStack),
  // where the heading shares a fixed-height sticky viewport with the cards —
  // at full desktop size (3rem heading + full paragraph) it was eating most
  // of that height on mobile/tablet, squeezing the card row down to a
  // sliver. The static reduced-motion grid (Portfolio.tsx) scrolls normally
  // and always renders the full, uncompacted heading.
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12" style={{ alignItems: "flex-start", gap: compact ? ".75rem" : "2rem" }}>
      <div className="lg:col-span-5" style={{ display: "flex", flexDirection: "column", gap: ".75rem" }}>
        <div
          className={`eyebrow ${light ? "eyebrow-light" : "eyebrow-dark"}`}
          style={{ color: light ? "rgba(247,243,232,.85)" : "#241F1A", fontWeight: 600, fontSize: compact ? ".9375rem" : "1.25rem" }}
        >
          <span className="dot" style={light ? { background: "var(--brand-forest)" } : undefined}></span> Global Business Ecosystem
        </div>
        <h2
          style={{
            fontSize: compact ? "1.625rem" : "3rem",
            fontWeight: 600,
            lineHeight: 1.15,
            letterSpacing: "-.02em",
            color: light ? "#F7F3E8" : "#1C1815",
          }}
        >
          Our Operating Companies &amp; Domains
        </h2>
      </div>

      <p
        className={`lg:col-span-7 ${compact ? "hidden sm:block" : ""}`}
        style={{
          fontSize: compact ? ".9375rem" : "1.3125rem",
          lineHeight: 1.6,
          color: light ? "rgba(247,243,232,.75)" : "rgba(74,68,60,.75)",
        }}
      >
        From healthcare to conservation, each division runs independently while carrying the same five-hundred-year discipline &mdash; centrally
        aligned under one holding, built to scale on its own terms.
      </p>
    </div>
  );
}

export function EntityChips({ entities, glass, compact }: { entities: Entity[]; glass?: boolean; compact?: boolean }) {
  return (
    // flexWrap/overflow are left off the inline style (rather than pinned to
    // "nowrap"/"hidden") so rows that don't fit — five-entity divisions on
    // narrow cards — wrap onto a second line instead of silently clipping
    // pills off the edge. Desktop cards already fit every row on one line,
    // so wrapping here doesn't change how they render there.
    <div className="flex-wrap" style={{ display: "flex", gap: ".375rem" }}>
      {entities.map((entity) => {
        const chipStyle: CSSProperties =
          glass
              ? {
                  display: "inline-flex",
                  alignItems: "center",
                  flexShrink: 0,
                  fontSize: compact ? ".6875rem" : ".75rem",
                  fontWeight: 600,
                  background: "rgba(255,255,255,.14)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,.32)",
                  borderRadius: "9999px",
                  padding: compact ? ".2rem .55rem" : ".3rem .75rem",
                  color: "#F7F3E8",
                  whiteSpace: "nowrap",
                  cursor: "pointer",
                }
              : {
                  display: "inline-flex",
                  alignItems: "center",
                  flexShrink: 0,
                  fontSize: ".6875rem",
                  fontWeight: 600,
                  background: "#F7F3E8",
                  border: "1px solid #D9CFB8",
                  borderRadius: "9999px",
                  padding: ".25rem .625rem",
                  color: "#1C1815",
                  whiteSpace: "nowrap",
                  cursor: "pointer",
                };

        // Entities whose domain is dead, parked, or serves an unrelated
        // party carry no url (see portfolioData). They stay listed, but as
        // text rather than as a link that goes nowhere.
        return entity.url ? (
          <a key={entity.name} href={entity.url} target="_blank" rel="noreferrer" className="hover-lift" style={chipStyle}>
            {entity.name}
          </a>
        ) : (
          <span key={entity.name} style={{ ...chipStyle, cursor: "default" }}>
            {entity.name}
          </span>
        );
      })}
    </div>
  );
}
