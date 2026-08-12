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
// Alternates green / orange per card, matching the Founder section's palette.
const CARD_COLORS = ["var(--brand-heritage)", "var(--brand-orange)"];
// Reserved space above the card's "home" box so older cards have somewhere
// to peek from as they tuck in behind — clipped beyond this, so a still
// off-screen upcoming card (parked one full height below) stays invisible.
const PEEK_PX = 96;
const PEEK_PX_COMPACT = 20;
const PEEK_STEP_PX = 20;
const PEEK_STEP_PX_COMPACT = 6;
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
        rowGap: compact ? ".75rem" : "1rem",
        padding: compact ? ".75rem 0" : "1rem 0",
      }}
    >
      <div className="shell">
        <SectionHeading />
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
                desktop it's capped at 29rem, matching the Founder section's
                green container at its own typical (desktop) size, rather
                than stretching to fill all available space; it still
                shrinks below that on short viewports so nothing clips.
                Compact keeps filling the available space, since Founder's
                own height balloons unusably tall on narrow screens. */}
            <div
              style={{
                position: "absolute",
                top: `${peekPx}px`,
                left: 0,
                right: 0,
                ...(compact ? { bottom: 0 } : { height: `min(29rem, calc(100% - ${peekPx}px))` }),
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
                    padding: compact ? "2.25rem" : "3rem 3.5rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
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
                        textTransform: "uppercase",
                        letterSpacing: ".06em",
                        color: "rgba(247,243,232,.7)",
                      }}
                    >
                      {biz.category}
                    </div>
                    <h3
                      style={{
                        marginTop: ".75rem",
                        fontSize: compact ? "2rem" : "3rem",
                        fontWeight: 600,
                        lineHeight: 1.1,
                        letterSpacing: "-.02em",
                        maxWidth: "20ch",
                      }}
                    >
                      {biz.title}
                    </h3>
                  </div>

                  {/* Decorative play affordance — purely visual, echoes the
                      reference design's centered play button. Skipped on
                      compact layouts, where the card is too tight for it not
                      to collide with the entity chips/description below. */}
                  {!compact && (
                    <div
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "6rem",
                        height: "6rem",
                        borderRadius: "9999px",
                        background: "rgba(247,243,232,.16)",
                        display: "grid",
                        placeItems: "center",
                        opacity: contentOpacity,
                      }}
                    >
                      <span
                        style={{
                          marginLeft: "4px",
                          width: 0,
                          height: 0,
                          borderStyle: "solid",
                          borderWidth: "13px 0 13px 20px",
                          borderColor: "transparent transparent transparent rgba(247,243,232,.85)",
                        }}
                      />
                    </div>
                  )}

                  <div style={{ opacity: contentOpacity, transition: `opacity .4s ${EASE}` }}>
                    <div style={{ paddingBottom: "1rem", borderBottom: "1px solid rgba(247,243,232,.22)" }}>
                      <EntityChips entities={biz.entities} />
                    </div>
                    <p
                      style={{
                        marginTop: "1rem",
                        display: "flex",
                        gap: ".625rem",
                        fontSize: "1rem",
                        lineHeight: 1.6,
                        color: "rgba(247,243,232,.9)",
                        maxWidth: "42rem",
                      }}
                    >
                      <span aria-hidden="true" style={{ flexShrink: 0 }}>
                        ✳
                      </span>
                      {biz.description}
                    </p>
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
