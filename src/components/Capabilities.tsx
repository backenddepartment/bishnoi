interface Capability {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  linkLabel: string;
}

const CAPABILITIES: Capability[] = [
  {
    eyebrow: "Healthcare & Pharmaceutical Access",
    title: "Pharmaceutical Distribution & Patient Logistics",
    description:
      "Cross-border movement of essential medications, specialty oncology therapies, rare medicines sourcing, and compassionate medicine access across international healthcare markets.",
    href: "/businesses/getmeds",
    linkLabel: "Explore how Getmeds delivers this capability →",
  },
  {
    eyebrow: "Hospital Infrastructure",
    title: "Hospital Supply & Medical Devices",
    description:
      "Integrated procurement, medical consumables supply, hospital furniture, specialized equipment, and healthcare infrastructure solutions supporting institutional care.",
    href: "/businesses/bishnoi-omniverse",
    linkLabel: "Explore how Bishnoi Omniverse delivers this capability →",
  },
  {
    eyebrow: "Philanthropy & Environmental Ethics",
    title: "Social Impact & Conservation",
    description:
      "Wildlife preservation, desert eco-restoration, afforestation initiatives, community welfare, and long-horizon environmental stewardship.",
    href: "/businesses/foundation",
    linkLabel: "Explore how the Foundation delivers this capability →",
  },
];

interface CapabilitiesProps {
  /** Section heading above the intro paragraph. The What We Do page leaves
   *  this off — its hero already names the section — while pages that drop
   *  this in mid-scroll pass one so the block is introduced. */
  title?: string;
  /** Centers the title and intro paragraph. The capability rows below stay on
   *  their two-column grid either way. */
  centered?: boolean;
}

export default function Capabilities({ title, centered }: CapabilitiesProps) {
  return (
    <section id="what-we-do" style={{ padding: "3rem 0 6rem", background: "#ffffff" }}>
      <div className="shell" style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div style={centered ? { textAlign: "center" } : undefined}>
          {title && (
            <h2
              style={{
                fontSize: "clamp(2.25rem, 4vw, 3.25rem)",
                fontWeight: 700,
                color: "#2E2822",
                letterSpacing: "-.02em",
                lineHeight: 1.15,
                marginBottom: "1.25rem",
              }}
            >
              {title}
            </h2>
          )}

          <p
            style={{
              fontSize: "1.3125rem",
              lineHeight: 1.6,
              color: "var(--ink-soft)",
              maxWidth: "62ch",
              marginBottom: "3.5rem",
              // maxWidth would otherwise pin the paragraph to the left edge even
              // with the text itself centered.
              ...(centered ? { marginInline: "auto" } : {}),
            }}
          >
            Every business in the Bishnoi ecosystem runs independently, but each one falls under one of three
            capabilities the group actually builds and operates.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
          {CAPABILITIES.map((cap, i) => (
            <div
              key={cap.title}
              className="grid grid-cols-1 lg:grid-cols-12"
              style={{
                gap: "2rem",
                // Rules separate the capabilities from each other — the last
                // one needs none, since whatever follows brings its own edge.
                paddingBottom: i === CAPABILITIES.length - 1 ? 0 : "3rem",
                borderBottom: i === CAPABILITIES.length - 1 ? "none" : "1px solid rgba(74,68,60,.12)",
              }}
            >
              <div className="lg:col-span-4">
                <div className="eyebrow eyebrow-dark" style={{ fontSize: "1rem" }}>
                  <span className="dot dot-blink"></span> {cap.eyebrow}
                </div>
                <h2 style={{ marginTop: ".75rem", fontSize: "clamp(1.75rem, 3vw, 2.25rem)", fontWeight: 700, letterSpacing: "-.02em", color: "#2E2822" }}>
                  {cap.title}
                </h2>
              </div>
              <div className="lg:col-span-8" style={{ display: "flex", flexDirection: "column", gap: "1.25rem", justifyContent: "center" }}>
                <p style={{ fontSize: "1.0625rem", lineHeight: 1.7, color: "var(--ink-soft)" }}>{cap.description}</p>
                <a href={cap.href} className="pill-btn" style={{ alignSelf: "flex-start" }}>
                  <span className="pill-inner pill-accent pill-no-arrow" style={{ color: "#ffffff" }}>
                    {cap.linkLabel}
                  </span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
