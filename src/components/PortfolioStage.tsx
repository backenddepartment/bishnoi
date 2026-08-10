"use client";

import { EASE, PANEL, type Division } from "./portfolioData";
import { EntityChips, SectionHeading } from "./PortfolioParts";

/* Hand-placed so the scatter looks incidental but is identical every render —
   Math.random() would desync the server and client markup.
   x/y are vw/vh from centre, depth is the parallax rate against card travel. */
const SATELLITES = [
  { x: -40, y: -24, w: 12, ratio: "4 / 3", rot: -7, depth: 0.45, blur: 5, o: 0.6, dur: 11, delay: 0 },
  { x: 33, y: -30, w: 9, ratio: "3 / 4", rot: 6, depth: 0.7, blur: 7, o: 0.5, dur: 14, delay: 1.4 },
  { x: -29, y: 27, w: 10, ratio: "1 / 1", rot: 5, depth: 0.6, blur: 6, o: 0.55, dur: 13, delay: 0.7 },
  { x: 42, y: 21, w: 13, ratio: "4 / 3", rot: -5, depth: 0.4, blur: 8, o: 0.42, dur: 16, delay: 2.1 },
  { x: -48, y: 4, w: 7, ratio: "3 / 4", rot: 9, depth: 0.85, blur: 5, o: 0.38, dur: 12, delay: 3.2 },
  { x: 49, y: -6, w: 8, ratio: "1 / 1", rot: -9, depth: 0.9, blur: 6, o: 0.35, dur: 15, delay: 0.4 },
];

interface StageProps {
  businesses: Division[];
  activeFloat: number;
  activeIndex: number;
  settle: number;
  progress: number;
  compact: boolean;
  canHover: boolean;
  hovered: number | null;
  setHovered: (i: number | null) => void;
  goTo: (i: number) => void;
}

/* Cards travel laterally through a perspective volume: each keeps its own lane,
   angles away from the viewer as it leaves centre, and drops backward in Z.
   Oversized division type passes behind them at a faster rate for parallax. */
export default function PortfolioStage({
  businesses,
  activeFloat,
  activeIndex,
  settle,
  progress,
  compact,
  canHover,
  hovered,
  setHovered,
  goTo,
}: StageProps) {
  const active = businesses[activeIndex];
  const cardW = compact ? "68vw" : "30vw";
  const cardH = compact ? "34vh" : "46vh";
  const STEP_X = compact ? 78 : 46; // vw travelled per division
  const LANE_Y = [-7, 8, -4, 10]; // vh scatter, so the wall never reads as a row

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        height: "100vh",
        width: "100%",
        overflow: "hidden",
        background: PANEL,
        color: "#fff",
        perspective: compact ? "1400px" : "1100px",
      }}
    >
      {/* ---------- ambient wash: the active division's imagery, heavily
           blurred, giving each division its own colour mood ---------- */}
      <div aria-hidden style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        <img
          src={active.image}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            // scaled up so the blur never exposes a soft edge at the viewport
            transform: "scale(1.15)",
            filter: "blur(48px) saturate(1.15)",
            opacity: 0.1 + Math.max(0, settle) * 0.26,
            willChange: "opacity",
          }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(158deg,rgba(46,40,34,.6) 0%,rgba(20,17,15,.88) 100%)" }} />
      </div>

      {/* ---------- oversized type behind the cards ----------
           Only the active division's title is ever drawn. Overlapping titles
           read as noise, so this one fades out through the middle of a
           transition and the next fades in on arrival. */}
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        <span
          style={{
            position: "absolute",
            left: "50%",
            top: "46%",
            whiteSpace: "nowrap",
            fontSize: compact ? "18vw" : "13vw",
            fontWeight: 600,
            letterSpacing: "-.04em",
            lineHeight: 1,
            color: "rgba(247,243,232,1)",
            opacity: Math.max(0, settle) * 0.07,
            transform: `translate3d(calc(-50% + ${(activeIndex - activeFloat) * STEP_X * 1.5}vw), -50%, 0)`,
            willChange: "transform, opacity",
          }}
        >
          {active.title}
        </span>
      </div>

      {/* ---------- floating project tiles ----------
           Scattered around the card at mixed depths. Each parallaxes at its
           own rate against the card travel and drifts slowly on its own clock,
           so the arrangement never reads as a grid. Only tiles belonging to a
           division near the active one are mounted. */}
      <div aria-hidden style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 1 }}>
        {businesses.map((biz, i) => {
          const d = i - activeFloat;
          if (Math.abs(d) > 1.25) return null;
          const presence = Math.max(0, 1 - Math.abs(d) * 0.85);

          return SATELLITES.slice(0, compact ? 3 : SATELLITES.length).map((sat, k) => {
            // cycle the image pool so a division's surroundings vary
            const src = businesses[(i + k + 1) % businesses.length].image;
            return (
              <div
                key={`${biz.title}-${k}`}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  width: `${compact ? sat.w * 1.5 : sat.w}vw`,
                  transform: `translate3d(calc(-50% + ${sat.x + d * STEP_X * sat.depth}vw), calc(-50% + ${sat.y}vh), 0)`,
                  opacity: presence * sat.o,
                  willChange: "transform, opacity",
                }}
              >
                <div style={{ animation: `tile-drift ${sat.dur}s ease-in-out ${sat.delay}s infinite` }}>
                  <img
                    src={src}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    style={{
                      width: "100%",
                      aspectRatio: sat.ratio,
                      objectFit: "cover",
                      display: "block",
                      borderRadius: ".875rem",
                      transform: `rotate(${sat.rot}deg)`,
                      filter: `blur(${sat.blur}px) saturate(.9)`,
                      boxShadow: "0 18px 40px rgba(0,0,0,.45)",
                    }}
                  />
                </div>
              </div>
            );
          });
        })}
      </div>

      {/* ---------- the gallery ---------- */}
      <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d", zIndex: 2 }}>
        {businesses.map((biz, i) => {
          const d = i - activeFloat;
          const ad = Math.abs(d);
          const isActive = ad < 0.5;
          const isHovered = canHover && hovered === i && !isActive;

          const x = d * STEP_X;
          const y = LANE_Y[i % LANE_Y.length] * Math.min(ad, 1.4);
          const z = -Math.min(ad, 3) * (compact ? 320 : 460);
          const rotY = -d * (compact ? 10 : 22);
          const rotZ = d * 1.2;

          let opacity = Math.max(0, 1 - ad * 0.3);
          // Blur stays capped at two neighbours per side.
          let blur = ad > 2.2 ? 0 : Math.min(ad, 2) * 5;
          if (ad > 3.2) opacity = 0;

          if (isHovered) {
            opacity = Math.min(1, opacity + 0.3);
            blur = 0.5;
          }

          return (
            // Outer node carries the scroll-driven position with no transition;
            // the inner node owns hover, which transitions. Keeping them apart
            // stops hover easing from lagging the scroll.
            <div
              key={biz.title}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: cardW,
                height: cardH,
                marginLeft: `calc(-${cardW} / 2)`,
                marginTop: `calc(-${cardH} / 2)`,
                transform: `translate3d(${x}vw, ${y}vh, ${z}px) rotateY(${rotY}deg) rotateZ(${rotZ}deg)`,
                transformStyle: "preserve-3d",
                zIndex: 100 - Math.round(ad * 10),
                pointerEvents: opacity < 0.06 ? "none" : "auto",
                willChange: "transform",
              }}
            >
              <article
                onMouseEnter={canHover ? () => setHovered(i) : undefined}
                onMouseLeave={canHover ? () => setHovered(null) : undefined}
                onClick={() => goTo(i)}
                style={{
                  position: "relative",
                  overflow: "hidden",
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  borderRadius: "1.5rem",
                  padding: compact ? "1.5rem" : "2rem",
                  background: "#141110",
                  boxShadow: isActive
                    ? "0 0 0 1px rgba(243,107,33,0.45), 0 40px 90px rgba(0,0,0,0.55)"
                    : isHovered
                    ? "0 0 0 1px rgba(243,107,33,0.34), 0 30px 70px rgba(0,0,0,0.5)"
                    : "0 0 0 1px rgba(247,243,232,0.08), 0 24px 60px rgba(0,0,0,0.45)",
                  transform: isHovered ? "scale(1.05)" : "scale(1)",
                  filter: blur > 0.05 ? `blur(${blur}px)` : "none",
                  opacity,
                  cursor: isActive ? "default" : "pointer",
                  transition: `transform .3s ${EASE}, filter .3s ${EASE}, opacity .3s ${EASE}, box-shadow .3s ${EASE}`,
                  willChange: "opacity, filter",
                }}
              >
                {/* project imagery, blurred back so the numeral and title stay
                    dominant; only cards near the active one are worth loading */}
                {ad < 3.2 && (
                  <img
                    src={biz.image}
                    alt=""
                    aria-hidden
                    loading={isActive ? "eager" : "lazy"}
                    decoding="async"
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transform: "scale(1.12)",
                      filter: isActive ? "blur(7px) saturate(1.1)" : "blur(10px) saturate(.9)",
                      opacity: isActive ? 0.62 : 0.4,
                      transition: `opacity .3s ${EASE}, filter .3s ${EASE}`,
                    }}
                  />
                )}
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: isActive
                      ? "linear-gradient(150deg,rgba(243,107,33,0.3) 0%,rgba(20,17,15,0.62) 45%,rgba(20,17,15,0.9) 100%)"
                      : "linear-gradient(150deg,rgba(28,24,21,0.72) 0%,rgba(20,17,15,0.92) 100%)",
                    transition: `background .3s ${EASE}`,
                  }}
                />
                <span
                  style={{
                    position: "relative",
                    fontSize: compact ? "3.5rem" : "5rem",
                    fontWeight: 600,
                    lineHeight: 1,
                    letterSpacing: "-.04em",
                    color: isActive || isHovered ? "#F36B21" : "rgba(247,243,232,.32)",
                    transition: `color .3s ${EASE}`,
                  }}
                >
                  {biz.numeral}
                </span>
                <h3
                  style={{
                    position: "relative",
                    fontSize: compact ? "1.375rem" : "1.875rem",
                    fontWeight: 600,
                    letterSpacing: "-.01em",
                    lineHeight: 1.15,
                    maxWidth: "16ch",
                    textShadow: "0 2px 14px rgba(0,0,0,.6)",
                  }}
                >
                  {biz.title}
                </h3>
              </article>
            </div>
          );
        })}
      </div>

      {/* ---------- heading, pinned to the top of the canvas ---------- */}
      <div
        style={{
          position: "absolute",
          insetInline: 0,
          top: 0,
          padding: compact ? "2rem 1.25rem 0" : "3rem 3.25rem 0",
          pointerEvents: "none",
          zIndex: 200,
        }}
      >
        <SectionHeading light />
      </div>

      {/* ---------- reel, upper right ---------- */}
      {!compact && (
        <div style={{ position: "absolute", right: "3.25rem", top: "34vh", width: "20rem", height: "17rem", overflow: "hidden", zIndex: 200 }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              transform: `translate3d(0, ${-activeFloat * 4.25}rem, 0)`,
              willChange: "transform",
            }}
          >
            {businesses.map((biz, i) => {
              const d = i - activeFloat;
              const ad = Math.abs(d);
              const isActive = ad < 0.5;
              return (
                <button
                  key={biz.title}
                  onClick={() => goTo(i)}
                  onMouseEnter={canHover ? () => setHovered(i) : undefined}
                  onMouseLeave={canHover ? () => setHovered(null) : undefined}
                  aria-current={i === activeIndex ? "true" : undefined}
                  style={{
                    position: "absolute",
                    top: `${i * 4.25}rem`,
                    right: 0,
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    gap: ".75rem",
                    textAlign: "right",
                    // slight curve: rows bow away from the active one
                    transform: `translate3d(${(1 - Math.cos(d * 0.35)) * 3.5}rem, 0, 0) scale(${1 - Math.min(ad, 3) * 0.06})`,
                    transformOrigin: "right center",
                    opacity: Math.max(0.15, 1 - ad * 0.3),
                    filter: ad > 1.6 ? `blur(${Math.min((ad - 1.6) * 3, 3)}px)` : "none",
                    color: isActive ? "#F36B21" : "rgba(247,243,232,.7)",
                    fontWeight: isActive ? 600 : 400,
                    fontSize: ".9375rem",
                    textShadow: "0 2px 12px rgba(0,0,0,.7)",
                    willChange: "transform, opacity",
                  }}
                >
                  <span>{biz.title}</span>
                  <span
                    style={{
                      width: isActive ? "2.5rem" : "1rem",
                      height: "1px",
                      flexShrink: 0,
                      background: isActive ? "#F36B21" : "rgba(247,243,232,.3)",
                      transition: `width .3s ${EASE}`,
                    }}
                  />
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ---------- content, lower left ---------- */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: compact ? "3.5rem" : "2.5rem",
          padding: compact ? "0 1.25rem" : "0 3.25rem",
          zIndex: 200,
          opacity: Math.max(0, settle),
          transform: `translate3d(0, ${(1 - Math.max(0, settle)) * 12}px, 0)`,
          pointerEvents: settle > 0.6 ? "auto" : "none",
          willChange: "transform, opacity",
        }}
      >
        <div style={{ maxWidth: compact ? "100%" : "40rem" }}>
          <div style={{ fontSize: ".75rem", textTransform: "uppercase", letterSpacing: ".025em", color: "rgba(247,243,232,.5)" }}>{active.category}</div>
          <p
            style={{
              marginTop: ".625rem",
              fontSize: ".9375rem",
              color: "rgba(247,243,232,.7)",
              lineHeight: 1.55,
              maxWidth: "44ch",
              textShadow: "0 2px 12px rgba(0,0,0,.6)",
            }}
          >
            {active.description}
          </p>
          <div style={{ fontSize: ".7rem", textTransform: "uppercase", letterSpacing: ".05em", color: "rgba(247,243,232,.4)", margin: "1.25rem 0 .625rem" }}>
            Managed Companies &amp; Central Domains ({active.entities.length})
          </div>
          <EntityChips entities={active.entities} />
        </div>
      </div>

      {/* ---------- compact nav dots ---------- */}
      {compact && (
        <div style={{ position: "absolute", insetInline: 0, bottom: "1.25rem", display: "flex", justifyContent: "center", gap: ".5rem", zIndex: 200 }}>
          {businesses.map((biz, i) => (
            <button
              key={biz.title}
              onClick={() => goTo(i)}
              aria-label={biz.title}
              aria-current={i === activeIndex ? "true" : undefined}
              style={{
                width: i === activeIndex ? "2rem" : ".5rem",
                height: ".5rem",
                borderRadius: "9999px",
                background: i === activeIndex ? "#F36B21" : "rgba(247,243,232,.28)",
                transition: `width .3s ${EASE}, background .3s ${EASE}`,
              }}
            />
          ))}
        </div>
      )}

      {/* ---------- scroll progress, flush to the bottom edge ---------- */}
      <div style={{ position: "absolute", insetInline: 0, bottom: 0, height: "2px", background: "rgba(247,243,232,.1)", zIndex: 200 }}>
        <div style={{ height: "100%", width: `${progress * 100}%`, background: "#F36B21", willChange: "width" }} />
      </div>
    </div>
  );
}
