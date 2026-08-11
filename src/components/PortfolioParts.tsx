import type { Entity } from "./portfolioData";

export function SectionHeading({ light }: { light?: boolean }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: ".75rem", alignItems: "center", flexShrink: 0 }}>
      <div className="eyebrow eyebrow-dark">
        <span className="dot"></span> Centralized Conglomerate Holdings
      </div>
      <h2 style={{ fontSize: "2.25rem", fontWeight: 600, letterSpacing: "-.02em", textAlign: "center", color: "#35302A" }}>
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
            fontWeight: 500,
            background: "#F7F3E8",
            border: "1px solid #E6DECB",
            borderRadius: "9999px",
            padding: ".375rem .75rem",
            color: "#4A443C",
          }}
        >
          <span>{entity.name}</span>
          <span style={{ fontSize: ".65rem", color: "#8A8178" }}>({entity.domain})</span>
        </a>
      ))}
    </div>
  );
}
