/* Closing "where to go next" panel — narrative on the left, two stacked CTAs
   on the right. Leadership leads as the solid orange primary; What We Do sits
   below it as the outline secondary, pointing at the capabilities section on
   the Businesses page. */
export default function EthosGateway() {
  return (
    <section style={{ background: "#ffffff", color: "var(--ink)", padding: "5rem 0", borderTop: "1px solid #E6DECB" }}>
      <div className="shell">
        <div className="grid grid-cols-1 lg:grid-cols-12" style={{ gap: "2.5rem", alignItems: "center" }}>
          <div className="lg:col-span-7" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div className="eyebrow eyebrow-dark" style={{ fontSize: "1.125rem", color: "var(--brand-orange)" }}>
              <span className="dot dot-blink"></span> Corporate Ethos &amp; Governance
            </div>
            <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 2.75rem)", fontWeight: 700, lineHeight: 1.2, letterSpacing: "-.02em", color: "#2E2822" }}>
              Rooted in principles that endure. Guided by long-horizon stewardship.
            </h2>
            <p style={{ fontSize: "1.125rem", lineHeight: 1.65, color: "var(--ink-soft)", margin: 0 }}>
              Explore how the Bishnoi ecosystem combines ethical enterprise, multi-venture operations, and centuries of conservation philosophy into one connected corporate identity.
            </p>
          </div>

          <div className="lg:col-span-5" style={{ display: "flex", flexDirection: "column", gap: "1rem", justifyContent: "center" }}>
            <a href="/leadership/naresh-bishnoi" className="pill-btn" style={{ width: "100%" }}>
              <span className="pill-inner pill-accent pill-with-arrow" style={{ width: "100%", justifyContent: "space-between", padding: "1rem 1.75rem", fontSize: "1.0625rem", color: "#ffffff" }}>
                Leadership Profile (Naresh Bishnoi) <span className="pill-badge up-right">↗</span>
              </span>
            </a>

            <a href="/businesses#what-we-do" className="pill-btn" style={{ width: "100%" }}>
              <span className="pill-inner pill-outline pill-with-arrow" style={{ width: "100%", justifyContent: "space-between", padding: "1rem 1.75rem", fontSize: "1.0625rem" }}>
                What We Do - View Capabilities <span className="pill-badge up-right">→</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
