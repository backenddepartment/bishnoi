"use client";

import { useEffect, useRef, useState } from "react";

import ActMark from "./ActMark";

const EASE = "cubic-bezier(.22,1,.36,1)";

/* Act III. This is the section the site was missing: the visitor used to have
   to work out "Bishnoi philosophy + modern businesses = the modern Bishnoi
   legacy" on their own, because heritage and enterprise were only ever placed
   next to each other, never joined.

   Each entry names a principle, the modern practice it translates into, and
   the business that carries it — so the ventures read as this generation's
   reading of the 29 principles rather than an unrelated portfolio.

   It replaces the old Diversified / Innovative / Trusted / Global pillars,
   which any holding company could have written verbatim. Same grid, same
   icon treatment, same type sizes as those pillars — only the content model
   changed. */
const bridges = [
  {
    principle: "Protect every living thing",
    practice: "Healthcare",
    body: "Moving medicines across borders to the patients and hospitals that would otherwise go without them.",
    venture: "Getmeds Healthcare Network",
    href: "/businesses/getmeds",
    icon: (
      <svg width="42" height="42" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M14 25s-9-5.4-9-12a5 5 0 019-3 5 5 0 019 3c0 6.6-9 12-9 12z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M14 9.5v6M11 12.5h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    principle: "Serve the community",
    practice: "Medical infrastructure",
    // Bishnoi Omniverse could not be verified as an operating organisation
    // (see research/claims-register.md), so this reads as intent rather
    // than as track record. Restore the stronger wording with evidence.
    body: "Building towards supplying the hospitals themselves: the consumables, equipment and specialised products that make care possible at all.",
    venture: "Bishnoi Omniverse",
    href: "/businesses/bishnoi-omniverse",
    icon: (
      <svg width="42" height="42" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M4 25V10l10-6 10 6v15" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M2 25h24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M14 12v7M10.5 15.5h7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    principle: "Guard what cannot speak for itself",
    practice: "Conservation",
    // Same as above, for the Foundation.
    body: "A commitment to wildlife protection and afforestation in the Thar, answering the stewardship that eight of the 29 principles ask for.",
    venture: "Naresh Bishnoi Foundation",
    href: "/businesses/foundation",
    icon: (
      <svg width="42" height="42" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M14 25V14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M14 14c0-5 3.5-9 9-9 0 5-3.5 9-9 9z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M14 19c0-4-3-7-7-7 0 4 3 7 7 7z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    principle: "Restraint over extraction",
    practice: "Long-horizon enterprise",
    body: "Ownership built to be handed on rather than sold off — institutions meant to outlast the people who started them.",
    venture: "2MG Incorporated & the N. K. Bishnoi Office",
    href: "/businesses",
    icon: (
      <svg width="42" height="42" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <circle cx="14" cy="14" r="11" stroke="currentColor" strokeWidth="1.8" />
        <path d="M14 7.5V14l4.5 2.75" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function PrinciplesToEnterprise() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    // Bidirectional, matching the section this replaced — it fades back out
    // on exit so the act reads like a slide moving in and out.
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="vision"
      style={{
        // The one background break on the page. Acts I and II run white and
        // Act IV opens on the green panel, so this ivory band is what marks
        // the turn from heritage into enterprise.
        background: "var(--brand-ivory)",
        padding: "5rem 0 6rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="shell" style={{ position: "relative", zIndex: 1 }}>
        <div
          className="grid grid-cols-1 lg:grid-cols-12"
          style={{
            alignItems: "flex-start",
            gap: "2.5rem",
            marginBottom: "4rem",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(28px)",
            transition: `opacity .7s ${EASE}, transform .7s ${EASE}`,
          }}
        >
          <div className="lg:col-span-6 xl:col-span-5" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <ActMark numeral="III" era="Today" label="From principles to enterprise" />
            <h2
              className="act-title break-words text-[2.5rem] sm:text-[3.25rem] md:text-[3.75rem]"
              style={{ fontWeight: 700, lineHeight: 1.1, letterSpacing: "-.025em", color: "var(--ink-deep)" }}
            >
              The world changed.<br />The principles didn&rsquo;t.
            </h2>
          </div>

          <div className="lg:col-span-6 xl:col-span-7" style={{ display: "flex", alignItems: "center" }}>
            <p style={{ fontSize: "1.25rem", lineHeight: 1.65, color: "var(--ink-soft)", margin: 0 }}>
              Four of the twenty-nine principles translate almost directly into work a modern business can do. What follows is not a portfolio
              that happens to carry the Bishnoi name &mdash; it is this generation&rsquo;s reading of those principles, and the part of the
              story it is responsible for writing.
            </p>
          </div>
        </div>

        <div
          style={{
            height: "1px",
            background: "rgba(28,24,21,.1)",
            marginBottom: "4rem",
            opacity: isVisible ? 1 : 0,
            transition: `opacity .9s ${EASE} .15s`,
          }}
        />

        {/* Explicit column counts per breakpoint, as the pillars grid used —
            auto-fit orphaned the 4th item onto its own row at ~768px. */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: "2.5rem 2rem" }}>
          {bridges.map((item, i) => (
            <div
              key={item.practice}
              style={{
                display: "flex",
                flexDirection: "column",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(32px)",
                transition: `opacity .7s ${EASE} ${0.2 + i * 0.1}s, transform .7s ${EASE} ${0.2 + i * 0.1}s`,
              }}
            >
              <div
                style={{
                  width: "3.5rem",
                  height: "3.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  color: "var(--brand-orange)",
                  marginBottom: "1.25rem",
                }}
              >
                {item.icon}
              </div>

              {/* The principle, then what it becomes. The step between these
                  two lines is the whole point of the section. */}
              <div
                style={{
                  fontSize: ".8125rem",
                  fontWeight: 700,
                  letterSpacing: ".08em",
                  textTransform: "uppercase",
                  color: "var(--brand-orange)",
                  lineHeight: 1.45,
                  marginBottom: ".5rem",
                }}
              >
                {item.principle}
              </div>

              <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#1C1815", marginBottom: ".625rem", letterSpacing: "-.01em" }}>
                {item.practice}
              </div>

              <p style={{ fontSize: "1.0625rem", lineHeight: 1.65, color: "rgba(28,24,21,.6)", margin: 0 }}>{item.body}</p>

              <a
                href={item.href}
                className="animated-link"
                style={{
                  marginTop: "auto",
                  paddingTop: "1.25rem",
                  fontSize: ".9375rem",
                  fontWeight: 600,
                  color: "var(--ink-deep)",
                  alignItems: "baseline",
                  gap: ".4rem",
                }}
              >
                <span>{item.venture}</span>
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
