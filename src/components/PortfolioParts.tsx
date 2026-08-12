import type { Entity } from "./portfolioData";

export function SectionHeading({ light }: { light?: boolean }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: ".75rem", alignItems: "center", flexShrink: 0 }}>
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
          textAlign: "center",
          color: light ? "#F7F3E8" : "#1C1815",
        }}
      >
        Our Operating Companies &amp; Domains
      </h2>
    </div>
  );
}

export function EntityChips({ entities }: { entities: Entity[] }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: ".5rem" }}>
      {entities.map((entity) => (
        <a
          key={entity.domain}
          href={entity.url}
          target="_blank"
          rel="noreferrer"
          className="hover-spring-sm"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: ".375rem",
            fontSize: ".75rem",
            fontWeight: 600,
            background: "#F7F3E8",
            border: "1px solid #D9CFB8",
            borderRadius: "9999px",
            padding: ".375rem .75rem",
            color: "#1C1815",
            boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
          }}
        >
          <span style={{ color: "#1C1815" }}>{entity.name}</span>
          <span style={{ fontSize: ".65rem", color: "#C2521A", fontWeight: 700 }}>({entity.domain})</span>
        </a>
      ))}
    </div>
  );
}
