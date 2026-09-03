/* The page's last word.

   This panel used to close on "Corporate Ethos & Governance" and two links,
   which ended the story on an org chart — the visitor was told what the
   businesses are and then shown the door. It now closes on what is still
   unfinished, which is the only ending a legacy narrative can have.

   "One Identity. Multiple Ventures. One Purpose." moves down to a caption:
   it is the summary of the story, not the story, and reading as a headline
   was what made it sound like any other holding company. Layout, CTA
   treatment and spacing are unchanged. */
export default function EthosGateway() {
  return (
    <section style={{ background: "#ffffff", color: "var(--ink)", padding: "5rem 0", borderTop: "1px solid #E6DECB" }}>
      <div className="shell">
        <div className="grid grid-cols-1 lg:grid-cols-12" style={{ gap: "2.5rem", alignItems: "center" }}>
          <div className="lg:col-span-7" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div className="eyebrow eyebrow-dark" style={{ fontSize: "1.125rem", color: "var(--brand-orange)" }}>
              <span className="dot dot-blink"></span> The Next Chapter
            </div>
            <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 2.75rem)", fontWeight: 700, lineHeight: 1.2, letterSpacing: "-.02em", color: "#2E2822" }}>
              We are building institutions designed to outlast us.
            </h2>
            <p style={{ fontSize: "1.125rem", lineHeight: 1.65, color: "var(--ink-soft)", margin: 0 }}>
              What began as a way to survive a desert is now being read into healthcare, medical infrastructure, conservation and enterprise.
              The next five hundred years are unwritten. This is the part of them we are answerable for &mdash; and the question the next
              generation inherits is not which companies they are handed, but whether the philosophy expressed through them still holds.
            </p>
            <p
              style={{
                margin: ".5rem 0 0",
                fontSize: ".8125rem",
                fontWeight: 700,
                letterSpacing: ".14em",
                textTransform: "uppercase",
                color: "var(--brand-orange)",
              }}
            >
              One Identity. Multiple Ventures. One Purpose.
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

            {/* The history is not ours to close on. This sends the reader to
                the community, not to a third page about the company. */}
            <a href="/bishnoi" className="pill-btn" style={{ width: "100%" }}>
              <span className="pill-inner pill-outline pill-with-arrow" style={{ width: "100%", justifyContent: "space-between", padding: "1rem 1.75rem", fontSize: "1.0625rem" }}>
                The Bishnois - The Full History <span className="pill-badge up-right">→</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
