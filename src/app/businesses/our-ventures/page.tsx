"use client";

/* Unlinked landing page (QR code / direct URL only — see the hidden route in
   src/lib/seo.ts). Two companies, side by side: logo, what it is, and a door
   to its own website. Getmeds' blue and green carry the page's accents.

   Deliberately chrome-free: no Header, NavOverlay, or Footer — the page is a
   standalone destination, not part of the site's navigation. */

const VENTURES = [
  {
    name: "Getmeds",
    logo: "/logos/getmeds-philippines-logo.png",
    logoAlt: "GetMEDS — Your Compassionate Health Ally",
    description:
      "A centralized global healthcare platform delivering pharmaceutical distribution, digital health services, and patient-first logistics across five international hubs — the Philippines, India, Vanuatu, Latin America, and Southeast Asia.",
    url: "https://getmeds.ph",
  },
  {
    name: "2MG Incorporated",
    logo: "/logos/2mg-inc-logo.png",
    logoAlt: "2MG Inc. — Agile, Accessible, Affordable",
    description:
      "The holding company behind the Getmeds group of businesses, providing strategic direction and support across its healthcare ventures worldwide — agile, accessible, and affordable by design.",
    url: "https://2mginc.com/",
  },
];

export default function OurVenturesPage() {
  return (
    <>
      {/* Structured data for the two organizations this page presents. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Our Ventures",
            itemListElement: VENTURES.map((v, i) => ({
              "@type": "ListItem",
              position: i + 1,
              item: {
                "@type": "Organization",
                name: v.name,
                description: v.description,
                url: v.url,
              },
            })),
          }),
        }}
      />

      <main
        id="main-content"
        style={{
          background: "#ffffff",
          minHeight: "100vh",
          color: "var(--ink)",
          display: "flex",
          alignItems: "center",
        }}
      >
        <section style={{ padding: "4rem 0", width: "100%" }}>
          <div className="shell" style={{ maxWidth: "1100px", margin: "0 auto" }}>
            {/* No visible heading — the page is just the two cards. The h1
                stays for crawlers and screen readers, visually hidden. */}
            <h1 className="sr-only">Our Ventures — Getmeds & 2MG Incorporated</h1>

            <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "2rem" }}>
              {VENTURES.map((v) => (
                <div
                  key={v.name}
                  style={{
                    padding: "2.5rem 2rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    gap: "1.25rem",
                    background: "#fff",
                  }}
                >
                  <div style={{ height: "8rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={v.logo}
                      alt={v.logoAlt}
                      style={{ maxHeight: "100%", maxWidth: "16rem", objectFit: "contain" }}
                    />
                  </div>
                  <h2 style={{ fontSize: "1.375rem", fontWeight: 700, color: "#2E2822" }}>{v.name}</h2>
                  <p style={{ fontSize: "1rem", lineHeight: 1.7, color: "var(--ink-soft)", flex: 1 }}>
                    {v.description}
                  </p>
                  <a
                    href={v.url}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: ".5rem",
                      padding: ".875rem 2rem",
                      borderRadius: "9999px",
                      background: "linear-gradient(135deg, #1EA0DA 0%, #61A644 100%)",
                      color: "#fff",
                      fontSize: ".9375rem",
                      fontWeight: 700,
                      textDecoration: "none",
                      boxShadow: "0 8px 24px rgba(30,160,218,.28)",
                    }}
                  >
                    Visit Website <span aria-hidden="true">→</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
