import type { Entity } from "./portfolioData";

export function SectionHeading({ light }: { light?: boolean }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12" style={{ alignItems: "flex-start", gap: "2rem" }}>
      <div className="lg:col-span-5" style={{ display: "flex", flexDirection: "column", gap: ".75rem" }}>
        <div
          className={`eyebrow ${light ? "eyebrow-light" : "eyebrow-dark"}`}
          style={{ color: light ? "rgba(247,243,232,.85)" : "#241F1A", fontWeight: 600, fontSize: "1.25rem" }}
        >
          <span className="dot" style={light ? { background: "var(--brand-forest)" } : undefined}></span> Centralized Conglomerate Holdings
        </div>
        <h2
          style={{
            fontSize: "3rem",
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
        className="lg:col-span-7"
        style={{
          fontSize: "1.3125rem",
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

export function EntityChips({ entities, glass }: { entities: Entity[]; glass?: boolean }) {
  return (
    <div style={{ display: "flex", flexWrap: "nowrap", gap: ".375rem", overflow: "hidden" }}>
      {entities.map((entity) => (
        <span
          key={entity.name}
          style={
            glass
              ? {
                  display: "inline-flex",
                  alignItems: "center",
                  flexShrink: 0,
                  fontSize: ".75rem",
                  fontWeight: 600,
                  background: "rgba(255,255,255,.14)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,.32)",
                  borderRadius: "9999px",
                  padding: ".3rem .75rem",
                  color: "#F7F3E8",
                  whiteSpace: "nowrap",
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
                }
          }
        >
          {entity.name}
        </span>
      ))}
    </div>
  );
}
