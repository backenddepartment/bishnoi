"use client";

import type { Division } from "./portfolioData";
import { EntityChips, SectionHeading } from "./PortfolioParts";

interface PortfolioStackProps {
  businesses: Division[];
  activeFloat: number;
  activeIndex: number;
  compact: boolean;
  goTo: (i: number) => void;
}

const EASE = "cubic-bezier(.22,1,.36,1)";
// One fixed color per card, in order.
const CARD_COLORS = ["#173F2A", "#356B3F", "#F36B21", "#C8A45D"];
// The shared "Division 0X • " prefix is stripped from the category label —
// it's still useful as a data label elsewhere, just redundant next to the
// title here.
const stripDivisionPrefix = (category: string) => category.replace(/^Division\s*\d+\s*•\s*/i, "");

// A cluster of layered, low-opacity circles scattered in the bottom-right
// corner of each card — a soft decorative shade rather than a literal icon.
// One scatter pattern per card so the four don't look identical.
const CARD_CIRCLES = [
  [
    { size: 220, right: -70, bottom: -90, opacity: 0.1 },
    { size: 130, right: 30, bottom: -20, opacity: 0.14 },
    { size: 70, right: 150, bottom: 50, opacity: 0.16 },
  ],
  [
    { size: 180, right: -40, bottom: -110, opacity: 0.12 },
    { size: 100, right: 90, bottom: -10, opacity: 0.15 },
    { size: 55, right: 40, bottom: 70, opacity: 0.18 },
    { size: 30, right: 170, bottom: 30, opacity: 0.2 },
  ],
  [
    { size: 240, right: -100, bottom: -60, opacity: 0.09 },
    { size: 110, right: 10, bottom: 40, opacity: 0.15 },
    { size: 60, right: 110, bottom: -20, opacity: 0.18 },
  ],
  [
    { size: 160, right: -30, bottom: -70, opacity: 0.12 },
    { size: 95, right: 100, bottom: -50, opacity: 0.14 },
    { size: 45, right: 30, bottom: 60, opacity: 0.2 },
    { size: 75, right: 160, bottom: 80, opacity: 0.15 },
  ],
];
// Reserved space above the card's "home" box so older cards have somewhere
// to peek from as they tuck in behind — clipped beyond this, so a still
// off-screen upcoming card (parked one full height below) stays invisible.
const PEEK_PX = 60;
const PEEK_PX_COMPACT = 64;
const PEEK_STEP_PX = 16;
const PEEK_STEP_PX_COMPACT = 22;
const MAX_BEHIND_STEPS = 4;

export default function PortfolioStack({ businesses, activeFloat, activeIndex, compact, goTo }: PortfolioStackProps) {
  const peekPx = compact ? PEEK_PX_COMPACT : PEEK_PX;
  const peekStepPx = compact ? PEEK_STEP_PX_COMPACT : PEEK_STEP_PX;

  return (
    // Heading / card-stack / pager sit in fixed (auto) and flexible (1fr)
    // grid rows within the viewport — the card stack fills whatever height
    // is left over instead of a guessed fixed rem value, so it can never
    // get clipped top or bottom regardless of screen height. Also offset
    // below the site's fixed sticky navbar (header height is .75rem
    // padding * 2 + a 2.25rem logo = 3.75rem) — pinning at a bare top:0
    // would tuck the eyebrow/heading underneath it instead.
    <div
      style={{
        position: "sticky",
        top: "3.75rem",
        height: "calc(100vh - 3.75rem)",
        display: "grid",
        gridTemplateRows: "auto 1fr auto",
        rowGap: compact ? ".75rem" : ".5rem",
        padding: compact ? ".75rem 0" : ".5rem 0",
      }}
    >
      <div className="shell">
        <SectionHeading compact={compact} />
      </div>

      {/* Plain (non-positioned) shell, so its own left/right padding pushes
          the card area inward normally — an absolutely-positioned child
          would instead measure from the shell's full padding box and
          ignore that inset, running the cards edge-to-edge. */}
      <div className="shell" style={{ minHeight: 0 }}>
        <div style={{ position: "relative", height: "100%", overflow: "hidden" }}>
          {/* Clip wrapper — fills the flexible row; cards tucking in behind
              can poke out the top (within PEEK_PX) while cards still waiting
              below stay fully hidden until their turn. */}
          <div style={{ position: "absolute", inset: 0 }}>
            {/* The "home" box — where the active (depth 0) card sits. On
                desktop it tracks the Founder section's green container's
                actual live height (published as a CSS var by Founder.tsx
                via ResizeObserver, so it stays accurate at any screen width
                instead of a single guessed rem value), capped so it still
                shrinks below that on short viewports and never clips.
                Compact keeps filling the available space, since Founder's
                own height balloons unusably tall on narrow screens. */}
            <div
              style={{
                position: "absolute",
                top: `${peekPx}px`,
                left: 0,
                right: 0,
                bottom: 0,
              }}
            >
              {businesses.map((biz, i) => {
                const depth = i - activeFloat;
                // Not yet reached: parked one full card-height below, sliding
                // up to 0 as depth counts down to 0.
                const incoming = Math.min(Math.max(depth, 0), 1);
                // Already passed: shrinks and tucks in behind, peeking above.
                const behind = Math.min(Math.max(-depth, 0), MAX_BEHIND_STEPS);

                const translateY = incoming > 0 ? `${incoming * 100}%` : `${-behind * peekStepPx}px`;
                const scale = 1 - behind * 0.035;
                const opacity = 1 - Math.min(behind, MAX_BEHIND_STEPS) * 0.12;
                const contentOpacity = Math.max(0, 1 - Math.abs(depth) * 3);
                const color = CARD_COLORS[i % CARD_COLORS.length];

                return (
                  <article
                    key={biz.title}
                    style={{
                      position: "absolute",
                      inset: 0,
                      zIndex: i,
                      borderRadius: "2rem",
                      background: color,
                      color: "#F7F3E8",
                      padding: compact ? "1.375rem 1.25rem" : "3rem 3.5rem",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      overflow: "hidden",
                      transform: `translateY(${translateY}) scale(${scale})`,
                      opacity,
                      boxShadow: "0 30px 60px -20px rgba(0,0,0,.35)",
                      transition: `transform .6s ${EASE}, opacity .6s ${EASE}`,
                      pointerEvents: i === activeIndex ? "auto" : "none",
                    }}
                  >
                    <div style={{ opacity: contentOpacity, transition: `opacity .4s ${EASE}` }}>
                      <div
                        style={{
                          fontSize: ".8125rem",
                          fontWeight: 600,
                          letterSpacing: ".02em",
                          color: "rgba(247,243,232,.7)",
                        }}
                      >
                        {stripDivisionPrefix(biz.category)}
                      </div>
                      <h3
                        // Compact (mobile/tablet, both orientations) clamps to two
                        // lines — at 1.5rem in a narrow card, a full title plus a
                        // wrapped 5-pill entity row plus the description no longer
                        // reliably fits the home box, and the card clips its own
                        // overflow rather than growing, so a still-legible clamp
                        // beats letting the tail run under the rounded corner.
                        className={compact ? "line-clamp-2" : undefined}
                        style={{
                          marginTop: ".75rem",
                          fontSize: compact ? "1.5rem" : "2.5rem",
                          fontWeight: 600,
                          lineHeight: 1.15,
                          letterSpacing: "-.02em",
                          maxWidth: i === 0 ? "none" : "20ch",
                          whiteSpace: i === 0 && !compact ? "nowrap" : undefined,
                        }}
                      >
                        {biz.title}
                      </h3>
                      {/* Pills sit immediately under the title */}
                      <div style={{ marginTop: ".75rem" }}>
                        <EntityChips entities={biz.entities} glass compact={compact} />
                      </div>
                      {/* Description sits right below the pills */}
                      <p
                        style={{
                          marginTop: ".625rem",
                          display: "flex",
                          gap: ".5rem",
                          fontSize: compact ? ".875rem" : "1.125rem",
                          lineHeight: compact ? 1.5 : 1.6,
                          color: "rgba(247,243,232,.9)",
                          maxWidth: "56rem",
                          opacity: contentOpacity,
                          transition: `opacity .4s ${EASE}`,
                        }}
                      >
                        <span aria-hidden="true" style={{ flexShrink: 0 }}>✳</span>
                        <span>{biz.description}</span>
                      </p>

                      {biz.href && (
                        <div style={{ marginTop: compact ? ".75rem" : "1.25rem" }}>
                          <a href={biz.href} className="pill-btn">
                            <span className="pill-inner pill-accent pill-with-arrow" style={{ fontSize: compact ? ".8125rem" : ".9375rem" }}>
                              {biz.linkLabel || "Explore Profile →"}
                            </span>
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Layered, low-opacity circles scattered in the
                        bottom-right corner — a soft decorative shade. */}
                    <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
                      {CARD_CIRCLES[i % CARD_CIRCLES.length].map((c, k) => {
                        const scale = compact ? 0.7 : 1;
                        return (
                          <span
                            key={k}
                            style={{
                              position: "absolute",
                              right: `${c.right * scale}px`,
                              bottom: `${c.bottom * scale}px`,
                              width: `${c.size * scale}px`,
                              height: `${c.size * scale}px`,
                              borderRadius: "9999px",
                              background: `rgba(247,243,232,${c.opacity})`,
                            }}
                          />
                        );
                      })}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Pager dots */}
      <div className="shell" style={{ position: "relative", zIndex: businesses.length + 1, display: "flex", justifyContent: "center", gap: ".5rem" }}>
        {businesses.map((biz, i) => (
          <button
            key={biz.title}
            type="button"
            aria-label={`Show ${biz.title}`}
            aria-current={i === activeIndex}
            onClick={() => goTo(i)}
            style={{
              width: i === activeIndex ? "1.75rem" : ".5rem",
              height: ".5rem",
              borderRadius: "9999px",
              background: i === activeIndex ? "#F36B21" : "rgba(74,68,60,.25)",
              transition: `all .3s ${EASE}`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
