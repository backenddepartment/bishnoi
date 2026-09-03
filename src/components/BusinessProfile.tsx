"use client";

export interface RelatedEntity {
  name: string;
  /* Absent for entities with no live site of their own. The "#" sentinel
     predates this and is kept working. */
  url?: string;
  description: string;
}

interface BusinessProfileProps {
  overview: string;
  whatItDoes: string;
  marketsLabel: string;
  markets: string[];
  entities: RelatedEntity[];
  entitiesLabel?: string;
  onOpenRequestModal: () => void;
}

// Shared section layout for the three dedicated business profile pages
// (Overview / What It Does / Markets-or-Focus-Areas / Related Entities /
// Contact) — the three pages differ only in copy, not structure.
export default function BusinessProfile({
  overview,
  whatItDoes,
  marketsLabel,
  markets,
  entities,
  entitiesLabel = "Related Entities",
  onOpenRequestModal,
}: BusinessProfileProps) {
  return (
    <section style={{ padding: "3rem 0 6rem" }}>
      <div className="shell" style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "3.5rem" }}>
        <div>
          <div className="eyebrow eyebrow-dark" style={{ fontSize: "1rem" }}>
            <span className="dot dot-blink"></span> Overview
          </div>
          <p style={{ marginTop: "1rem", fontSize: "1.3125rem", lineHeight: 1.65, color: "var(--ink-soft)", maxWidth: "68ch" }}>{overview}</p>
        </div>

        <div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#2E2822", marginBottom: ".75rem" }}>What It Does</h2>
          <p style={{ fontSize: "1.0625rem", lineHeight: 1.7, color: "var(--ink-soft)", maxWidth: "68ch" }}>{whatItDoes}</p>
        </div>

        <div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#2E2822", marginBottom: "1rem" }}>{marketsLabel}</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: ".625rem" }}>
            {markets.map((m) => (
              <span
                key={m}
                style={{
                  padding: ".5rem 1.1rem",
                  borderRadius: "9999px",
                  background: "rgba(74,68,60,.06)",
                  fontSize: ".9375rem",
                  fontWeight: 600,
                  color: "#2E2822",
                }}
              >
                {m}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#2E2822", marginBottom: "1.25rem" }}>{entitiesLabel}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: "1.5rem" }}>
            {entities.map((e) => (
              <div
                key={e.name}
                style={{
                  borderRadius: "1.25rem",
                  border: "1px solid #E6DECB",
                  padding: "1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: ".5rem",
                }}
              >
                <h3 style={{ fontSize: "1.125rem", fontWeight: 700, color: "#2E2822" }}>{e.name}</h3>
                <p style={{ fontSize: ".9375rem", lineHeight: 1.6, color: "var(--ink-soft)", flex: 1 }}>{e.description}</p>
                {e.url && e.url !== "#" && (
                  <a
                    href={e.url}
                    target="_blank"
                    rel="noreferrer"
                    style={{ fontSize: ".875rem", fontWeight: 600, color: "#2E2822", textDecoration: "none" }}
                  >
                    Visit Website <span style={{ color: "var(--brand-orange)" }}>→</span>
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            borderRadius: "1.5rem",
            background: "linear-gradient(158deg,#2E2822 0%,#1C1815 100%)",
            padding: "2.5rem",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1.5rem",
            color: "#fff",
          }}
        >
          <p style={{ fontSize: "1.25rem", fontWeight: 600, maxWidth: "34ch", margin: 0 }}>
            Interested in partnering or have a business inquiry?
          </p>
          <button className="pill-btn" onClick={onOpenRequestModal}>
            <span className="pill-inner pill-accent pill-with-arrow" style={{ boxShadow: "0 8px 24px rgba(243,107,33,0.3)" }}>
              Get in Touch <span className="pill-badge">→</span>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
