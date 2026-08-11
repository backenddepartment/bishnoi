"use client";

import { useState } from "react";
import { EASE, type Division } from "./portfolioData";
import { EntityChips, SectionHeading } from "./PortfolioParts";

/* Hand-placed satellite position definitions */
const SATELLITES = [
  { x: -40, y: -24, w: 12, ratio: "4 / 3", rot: -7, depth: 0.45, o: 0.85, dur: 11, delay: 0 },
  { x: 33, y: -30, w: 9, ratio: "3 / 4", rot: 6, depth: 0.7, o: 0.8, dur: 14, delay: 1.4 },
  { x: -29, y: 27, w: 10, ratio: "1 / 1", rot: 5, depth: 0.6, o: 0.82, dur: 13, delay: 0.7 },
  { x: 42, y: 21, w: 13, ratio: "4 / 3", rot: -5, depth: 0.4, o: 0.75, dur: 16, delay: 2.1 },
  { x: -48, y: 4, w: 7, ratio: "3 / 4", rot: 9, depth: 0.85, o: 0.7, dur: 12, delay: 3.2 },
  { x: 49, y: -6, w: 8, ratio: "1 / 1", rot: -9, depth: 0.9, o: 0.65, dur: 15, delay: 0.4 },
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
  const [hoveredSat, setHoveredSat] = useState<string | null>(null);

  const active = businesses[activeIndex];
  const cardW = compact ? "68vw" : "30vw";
  const cardH = compact ? "34vh" : "46vh";
  const STEP_X = compact ? 78 : 46;
  const STEP_Y = compact ? 26 : 18;
  const LANE_Y = [-4, 5, -3, 6];

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        height: "100vh",
        width: "100%",
        overflow: "hidden",
        background: "#ffffff",
        color: "#1C1815",
        perspective: compact ? "1400px" : "1100px",
      }}
    >
      {/* ---------- soft faded ambient shadow background backdrop ---------- */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          background: "radial-gradient(circle at 50% 45%, #ffffff 0%, #F8F5EE 60%, #E6DFD1 100%)",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          boxShadow: "inset 0 0 140px rgba(0,0,0,0.07)",
        }}
      />

      {/* ---------- oversized watermark type behind the cards ---------- */}
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 1 }}>
        <span
          style={{
            position: "absolute",
            left: "50%",
            top: "46%",
            whiteSpace: "nowrap",
            fontSize: compact ? "18vw" : "13vw",
            fontWeight: 700,
            letterSpacing: "-.04em",
            lineHeight: 1,
            color: "rgba(36,31,26,0.11)",
            opacity: Math.max(0, settle) * 0.9,
            transform: `translate3d(calc(-50% + ${(activeIndex - activeFloat) * STEP_X * 1.5}vw), calc(-50% + ${(activeIndex - activeFloat) * STEP_Y * 1.2}vh), 0)`,
            willChange: "transform, opacity",
          }}
        >
          {active.title}
        </span>
      </div>

      {/* ---------- floating satellite project tiles (hoverable: clears blur on hover) ---------- */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 1 }}>
        {businesses.map((biz, i) => {
          const d = i - activeFloat;
          if (Math.abs(d) > 1.25) return null;
          const presence = Math.max(0, 1 - Math.abs(d) * 0.85);

          return SATELLITES.slice(0, compact ? 3 : SATELLITES.length).map((sat, k) => {
            const src = businesses[(i + k + 1) % businesses.length].image;
            const satKey = `${biz.title}-${k}`;
            const isSatHovered = hoveredSat === satKey;

            return (
              <div
                key={satKey}
                onMouseEnter={() => setHoveredSat(satKey)}
                onMouseLeave={() => setHoveredSat(null)}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  width: `${compact ? sat.w * 1.5 : sat.w}vw`,
                  transform: `translate3d(calc(-50% + ${sat.x + d * STEP_X * sat.depth}vw), calc(-50% + ${sat.y + d * STEP_Y * sat.depth}vh), 0)`,
                  opacity: isSatHovered ? 1 : presence * sat.o,
                  zIndex: isSatHovered ? 150 : 1,
                  pointerEvents: "auto",
                  cursor: "pointer",
                  willChange: "transform, opacity",
                  transition: `opacity .3s ${EASE}`,
                }}
              >
                <div
                  style={{
                    animation: isSatHovered ? "none" : `tile-drift ${sat.dur}s ease-in-out ${sat.delay}s infinite`,
                    transform: isSatHovered ? "scale(1.15)" : "scale(1)",
                    transition: `transform .3s ${EASE}`,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
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
                      filter: isSatHovered ? "none" : "blur(5px) saturate(1.15)",
                      border: isSatHovered ? "1.5px solid #F36B21" : "1px solid #D9CFB8",
                      boxShadow: isSatHovered ? "0 20px 40px rgba(0,0,0,0.2)" : "0 10px 25px rgba(0,0,0,0.08)",
                      transition: `filter .3s ${EASE}, border .3s ${EASE}, box-shadow .3s ${EASE}`,
                    }}
                  />
                </div>
              </div>
            );
          });
        })}
      </div>

      {/* ---------- main card gallery with hover clear image effect ---------- */}
      <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d", zIndex: 2 }}>
        {businesses.map((biz, i) => {
          const d = i - activeFloat;
          const ad = Math.abs(d);
          const isActive = ad < 0.5;
          const isHovered = canHover && hovered === i && !isActive;

          const x = d * STEP_X;
          const y = d * STEP_Y + LANE_Y[i % LANE_Y.length] * Math.min(ad, 0.6);
          const z = -Math.min(ad, 3) * (compact ? 320 : 460);
          const rotY = -d * (compact ? 10 : 22);
          const rotZ = d * (compact ? 3 : 5);

          let opacity = Math.max(0, 1 - ad * 0.3);
          if (ad > 3.2) opacity = 0;

          if (isHovered) {
            opacity = Math.min(1, opacity + 0.35);
          }

          return (
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
                  background: "#ffffff",
                  boxShadow: isActive
                    ? "0 0 0 1px #D9CFB8, 0 25px 50px -12px rgba(0,0,0,0.15)"
                    : isHovered
                    ? "0 0 0 1px #D9CFB8, 0 22px 45px -10px rgba(0,0,0,0.16)"
                    : "0 0 0 1px #E6DECB, 0 12px 30px -8px rgba(0,0,0,0.08)",
                  transform: isHovered ? "scale(1.05)" : "scale(1)",
                  opacity,
                  cursor: isActive ? "default" : "pointer",
                  transition: `transform .3s ${EASE}, opacity .3s ${EASE}, box-shadow .3s ${EASE}`,
                  willChange: "opacity",
                }}
              >
                {/* Active OR Hovered card image becomes 100% crisp & clear (filter: "none"), non-hovered background images stay blurred */}
                {ad < 3.2 && (
                  /* eslint-disable-next-line @next/next/no-img-element */
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
                      transform: isHovered ? "scale(1.1)" : "scale(1.05)",
                      filter: isActive || isHovered ? "none" : "blur(6px) saturate(1.0)",
                      opacity: isActive || isHovered ? 0.95 : 0.65,
                      transition: `opacity .3s ${EASE}, filter .3s ${EASE}, transform .3s ${EASE}`,
                    }}
                  />
                )}
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: isHovered
                      ? "linear-gradient(180deg, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.75) 100%)"
                      : "linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.85) 100%)",
                    transition: `background .3s ${EASE}`,
                  }}
                />
                <span
                  style={{
                    position: "relative",
                    fontSize: compact ? "3.5rem" : "5rem",
                    fontWeight: 700,
                    lineHeight: 1,
                    letterSpacing: "-.04em",
                    color: isActive || isHovered ? "#F36B21" : "#6B6157",
                    transition: `color .3s ${EASE}`,
                  }}
                >
                  {biz.numeral}
                </span>
                <h3
                  style={{
                    position: "relative",
                    fontSize: compact ? "1.375rem" : "1.875rem",
                    fontWeight: 700,
                    letterSpacing: "-.01em",
                    lineHeight: 1.15,
                    maxWidth: "16ch",
                    color: "#1C1815",
                  }}
                >
                  {biz.title}
                </h3>
              </article>
            </div>
          );
        })}
      </div>

      {/* ---------- heading pinned to top of canvas ---------- */}
      <div
        style={{
          position: "absolute",
          insetInline: 0,
          top: 0,
          padding: compact ? "2rem 1.25rem 0" : "3rem 3.5rem 0",
          pointerEvents: "none",
          zIndex: 200,
        }}
      >
        <SectionHeading />
      </div>

      {/* ---------- upper right reel navigation ---------- */}
      {!compact && (
        <div style={{ position: "absolute", right: "3.5rem", top: "34vh", width: "20rem", height: "17rem", overflow: "hidden", zIndex: 200 }}>
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
                    transform: `translate3d(${(1 - Math.cos(d * 0.35)) * 3.5}rem, 0, 0) scale(${1 - Math.min(ad, 3) * 0.06})`,
                    transformOrigin: "right center",
                    opacity: Math.max(0.35, 1 - ad * 0.25),
                    color: isActive ? "#F36B21" : "#1C1815",
                    fontWeight: isActive ? 700 : 600,
                    fontSize: ".9375rem",
                    willChange: "transform, opacity",
                  }}
                >
                  <span>{biz.title}</span>
                  <span
                    style={{
                      width: isActive ? "2.5rem" : "1rem",
                      height: "2px",
                      flexShrink: 0,
                      background: isActive ? "#F36B21" : "#241F1A",
                      transition: `width .3s ${EASE}`,
                    }}
                  />
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ---------- lower left content info ---------- */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: compact ? "3.5rem" : "2.5rem",
          padding: compact ? "0 1.25rem" : "0 3.5rem",
          zIndex: 200,
          opacity: Math.max(0, settle),
          transform: `translate3d(0, ${(1 - Math.max(0, settle)) * 12}px, 0)`,
          pointerEvents: settle > 0.6 ? "auto" : "none",
          willChange: "transform, opacity",
        }}
      >
        <div style={{ maxWidth: compact ? "100%" : "40rem" }}>
          <div style={{ fontSize: ".75rem", textTransform: "uppercase", letterSpacing: ".04em", color: "#C2521A", fontWeight: 700 }}>
            {active.category}
          </div>
          <p
            style={{
              marginTop: ".625rem",
              fontSize: "1rem",
              fontWeight: 500,
              color: "#1C1815",
              lineHeight: 1.55,
              maxWidth: "44ch",
            }}
          >
            {active.description}
          </p>
          <div style={{ fontSize: ".75rem", textTransform: "uppercase", letterSpacing: ".05em", color: "#241F1A", fontWeight: 700, margin: "1.25rem 0 .625rem" }}>
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
                background: i === activeIndex ? "#F36B21" : "rgba(74,68,60,.4)",
                transition: `width .3s ${EASE}, background .3s ${EASE}`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
