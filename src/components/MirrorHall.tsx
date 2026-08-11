"use client";

import { useEffect, useRef, useState } from "react";

import { businesses, EASE, PANEL } from "./portfolioData";

interface MirrorHallProps {
  introReady: boolean;
}

interface HallCard {
  id: string;
  image: string;
  tag: string;
  title: string;
}

/* The four real divisions, interleaved with original brand-colored abstract
   tiles (generated for this section — see /public/mockups) so the hall has
   enough cards to fill the row. The abstract tiles are original art in our
   own palette, not the reference's imagery. */
const HALL_CARDS: HallCard[] = [
  { id: "mock-ember", image: "/mockups/ember-current.svg", tag: "Ember", title: "Ember Current" },
  { id: `division-${businesses[0].numeral}`, image: businesses[0].image, tag: "Healthcare", title: businesses[0].title },
  { id: "mock-deep", image: "/mockups/deep-current.svg", tag: "Depth", title: "Deep Current" },
  { id: `division-${businesses[1].numeral}`, image: businesses[1].image, tag: "Enterprise", title: businesses[1].title },
  { id: "mock-gold", image: "/mockups/golden-tide.svg", tag: "Gold", title: "Golden Tide" },
  { id: `division-${businesses[2].numeral}`, image: businesses[2].image, tag: "Conservation", title: businesses[2].title },
  { id: "mock-amber", image: "/mockups/amber-drift.svg", tag: "Drift", title: "Amber Drift" },
  { id: `division-${businesses[3].numeral}`, image: businesses[3].image, tag: "Capital", title: businesses[3].title },
  { id: "mock-quiet", image: "/mockups/quiet-current.svg", tag: "Calm", title: "Quiet Current" },
  { id: "mock-bloom", image: "/mockups/heritage-bloom.svg", tag: "Bloom", title: "Heritage Bloom" },
];

const CARD_W = 15; // rem
const CARD_H = 19; // rem
const CARD_RADIUS = "15px";
const CARD_GAP = 1.5; // rem — visible breathing room between cards, not overlap
const DRAG_THRESHOLD = 55; // px

const pad = (n: number) => String(n).padStart(2, "0");

/* Four thin L-marks framing the panel like a viewfinder. */
const CORNERS = [
  { top: "1.5rem", left: "1.5rem", borderTop: "1px solid var(--accent-line)", borderLeft: "1px solid var(--accent-line)" },
  { top: "1.5rem", right: "1.5rem", borderTop: "1px solid var(--accent-line)", borderRight: "1px solid var(--accent-line)" },
  { bottom: "1.5rem", left: "1.5rem", borderBottom: "1px solid var(--accent-line)", borderLeft: "1px solid var(--accent-line)" },
  { bottom: "1.5rem", right: "1.5rem", borderBottom: "1px solid var(--accent-line)", borderRight: "1px solid var(--accent-line)" },
];

/* A cheap, deterministic starfield — a handful of 1px dots tiled across a
   180x180 cell — instead of a raster asset. */
const STARFIELD_BG =
  "radial-gradient(1px 1px at 20% 30%, rgba(255,255,255,.9), transparent), " +
  "radial-gradient(1px 1px at 63% 72%, rgba(255,255,255,.7), transparent), " +
  "radial-gradient(1px 1px at 85% 18%, rgba(255,255,255,.8), transparent), " +
  "radial-gradient(1px 1px at 38% 88%, rgba(255,255,255,.6), transparent), " +
  "radial-gradient(1px 1px at 8% 92%, rgba(255,255,255,.7), transparent), " +
  "radial-gradient(1px 1px at 95% 55%, rgba(255,255,255,.55), transparent)";

export default function MirrorHall({ introReady }: MirrorHallProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const movedRef = useRef(false);
  const startXRef = useRef(0);

  const [isVisible, setIsVisible] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [canHover, setCanHover] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffsetPx, setDragOffsetPx] = useState(0);
  // How far the track is shifted left so the active card centers in the
  // container — clamped to the track's actual scrollable range so the row
  // always fills the container edge-to-edge instead of leaving empty space
  // whenever there aren't enough cards on one side (e.g. at the first card).
  const [shiftPx, setShiftPx] = useState(0);
  // The track's full scrollable range, and the shift the bare cursor is
  // asking for while it hovers the row — null whenever the pointer is away,
  // which hands control back to the active card's centered shift.
  const [maxShiftPx, setMaxShiftPx] = useState(0);
  const [hoverShiftPx, setHoverShiftPx] = useState<number | null>(null);

  const count = HALL_CARDS.length;
  const active = HALL_CARDS[activeIndex];

  // Panel reveal on scroll into view — same pattern as Bands/Stats.
  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Reduced-motion users get a static grid — no drag, no ripple.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Hover highlight only makes sense on hover-capable pointers — same probe
  // as Portfolio.tsx.
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover)");
    const sync = () => setCanHover(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Measure the actual rendered geometry (not the rem constants — those
  // scale with viewport width via the html font-size ladder) and clamp the
  // shift to the track's real scrollable range.
  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const measure = () => {
      const activeEl = track.children[activeIndex] as HTMLElement | undefined;
      if (!activeEl) return;
      const containerWidth = container.clientWidth;
      const trackWidth = track.scrollWidth;
      const activeCenter = activeEl.offsetLeft + activeEl.offsetWidth / 2;
      const desired = activeCenter - containerWidth / 2;
      const maxShift = Math.max(0, trackWidth - containerWidth);
      setMaxShiftPx(maxShift);
      setShiftPx(Math.min(Math.max(desired, 0), maxShift));
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(container);
    return () => ro.disconnect();
  }, [activeIndex, count]);

  const goTo = (i: number) => setActiveIndex(Math.min(count - 1, Math.max(0, i)));

  const handleCardClick = (i: number) => {
    // Swallow the click that follows a drag gesture so a swipe never also
    // jumps to whatever card happened to be under the pointer on release.
    if (movedRef.current) return;
    goTo(i);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return; // left button / touch / pen only
    draggingRef.current = true;
    movedRef.current = false;
    startXRef.current = e.clientX;
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (draggingRef.current) {
      const dx = e.clientX - startXRef.current;
      if (Math.abs(dx) > 4) movedRef.current = true;
      setDragOffsetPx(dx);
      return;
    }

    // Bare hover pans the row: the cursor's horizontal position across the
    // container maps onto the track's full range, so you can browse the whole
    // hall without pressing anything or reaching for the arrows below.
    if (!canHover || e.pointerType !== "mouse" || maxShiftPx <= 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const margin = rect.width * 0.1; // dead zones at each edge so the ends are easy to hold
    const ratio = (e.clientX - rect.left - margin) / Math.max(1, rect.width - margin * 2);
    setHoverShiftPx(Math.min(1, Math.max(0, ratio)) * maxShiftPx);
  };

  const handlePointerLeave = () => setHoverShiftPx(null);

  const endDrag = () => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    setIsDragging(false);
    if (dragOffsetPx <= -DRAG_THRESHOLD) goTo(activeIndex + 1);
    else if (dragOffsetPx >= DRAG_THRESHOLD) goTo(activeIndex - 1);
    setDragOffsetPx(0);
    setHoverShiftPx(null);
  };

  // Cards are plain, uniform, front-facing flex items — no rotation, no
  // per-card scale. The whole row is one flex track; a single translateX
  // (clamped, measured above) shifts it so the active card centers when
  // there's room on both sides, and otherwise pins the track flush against
  // whichever edge it's nearest — so the row always fills the container
  // edge-to-edge instead of leaving dead space around a small centered block.
  // While the cursor is panning the row it owns the shift; otherwise the
  // active card's centered position does.
  const isHoverPanning = !isDragging && hoverShiftPx !== null;
  const effectiveShift = isHoverPanning ? (hoverShiftPx as number) : shiftPx;

  const trackStyle: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    left: 0,
    display: "flex",
    alignItems: "center",
    gap: `${CARD_GAP}rem`,
    height: `${CARD_H}rem`,
    transform: `translateY(-50%) translateX(${-effectiveShift + dragOffsetPx}px)`,
    transition: isDragging ? "none" : `transform ${isHoverPanning ? ".45s" : ".6s"} ${EASE}`,
  };

  const cardBoxStyle: React.CSSProperties = {
    position: "relative",
    flexShrink: 0,
    width: `${CARD_W}rem`,
    height: `${CARD_H}rem`,
  };

  return (
    <section id="collective" style={{ background: "#fff" }}>
      <div className="shell" style={{ padding: "0 1.25rem 5rem" }}>
        <div
          ref={panelRef}
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: "2rem",
            background: PANEL,
            padding: "3.5rem 1.5rem 3rem",
            transform: isVisible ? "translateY(0) scale(1)" : "translateY(40px) scale(.99)",
            opacity: isVisible ? 1 : 0,
            transition: `transform 0.7s cubic-bezier(.16,1,.3,1), opacity 0.7s cubic-bezier(.16,1,.3,1)`,
          }}
        >
          {/* Starfield, behind everything else in the panel. */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: STARFIELD_BG,
              backgroundSize: "180px 180px",
              backgroundRepeat: "repeat",
              opacity: 0.5,
              pointerEvents: "none",
            }}
          />

          {CORNERS.map((c, i) => (
            <span key={i} aria-hidden="true" style={{ position: "absolute", width: "1.5rem", height: "1.5rem", opacity: 0.45, pointerEvents: "none", zIndex: 2, ...c }} />
          ))}

          {/* Ripple filter for the reflection — SMIL-driven so it survives
              the global CSS transition/animation kill-switch; gated off
              entirely for prefers-reduced-motion below. */}
          <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
            <defs>
              <filter id="mirrorhall-ripple" x="-20%" y="-20%" width="140%" height="140%">
                <feTurbulence type="fractalNoise" baseFrequency="0.012 0.05" numOctaves="2" seed="7" result="noise">
                  {!reduced && <animate attributeName="baseFrequency" dur="10s" values="0.010 0.045;0.017 0.055;0.010 0.045" repeatCount="indefinite" />}
                </feTurbulence>
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="16" xChannelSelector="R" yChannelSelector="G" />
              </filter>
            </defs>
          </svg>

          <div style={{ position: "relative", zIndex: 2, textAlign: "center", marginInline: "auto" }}>
            <div className="eyebrow eyebrow-light" style={{ justifyContent: "center" }}>
              <span className="dot"></span> The Bishnoi Collective
            </div>
            {/* one line at every width — the type scales with the viewport
                rather than wrapping */}
            <h2
              style={{
                marginTop: "1rem",
                fontSize: "clamp(1.125rem, 4vw, 2.25rem)",
                fontWeight: 600,
                letterSpacing: "-.02em",
                color: "#fff",
                whiteSpace: "nowrap",
              }}
            >
              Every division, reflected in the same current.
            </h2>
            <p style={{ marginTop: ".75rem", maxWidth: "38rem", marginInline: "auto", fontSize: ".9375rem", color: "rgba(247,243,232,.65)", lineHeight: 1.6 }}>
              Healthcare, enterprise, capital and conservation — four ventures carrying one five-hundred-year discipline. Drag to look closer.
            </p>
          </div>

          {reduced ? (
            <ul
              style={{
                position: "relative",
                zIndex: 2,
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: "1.25rem",
                marginTop: "3rem",
              }}
            >
              {HALL_CARDS.map((card) => (
                <li key={card.id}>
                  <div style={{ borderRadius: CARD_RADIUS, overflow: "hidden", boxShadow: "0 0 0 1px rgba(243,107,33,0.22)" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={card.image} alt="" style={{ width: "100%", height: "12rem", objectFit: "cover" }} />
                    <div style={{ padding: "1rem", background: "#1C1815" }}>
                      <div style={{ fontSize: ".6875rem", fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", color: "#F36B21" }}>
                        {card.tag}
                      </div>
                      <div style={{ marginTop: ".375rem", fontSize: "1rem", fontWeight: 600, color: "#fff" }}>{card.title}</div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <>
              <div
                ref={containerRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={endDrag}
                onPointerCancel={endDrag}
                onPointerLeave={handlePointerLeave}
                role="group"
                aria-roledescription="carousel"
                aria-label="The Bishnoi collective, divisions and current studies"
                style={{
                  position: "relative",
                  zIndex: 2,
                  height: `${CARD_H + 3}rem`,
                  marginTop: "3.5rem",
                  marginInline: "-1.5rem", // break out of the panel's own side padding so the row is truly edge-to-edge
                  overflow: "hidden",
                  cursor: isDragging ? "grabbing" : "grab",
                  touchAction: "pan-y",
                }}
              >
                <div ref={trackRef} style={trackStyle}>
                  {HALL_CARDS.map((card, i) => (
                    <button
                      key={card.id}
                      type="button"
                      onClick={() => handleCardClick(i)}
                      onMouseEnter={() => canHover && setHoveredIndex(i)}
                      onMouseLeave={() => canHover && setHoveredIndex((h) => (h === i ? null : h))}
                      aria-label={`Show ${card.title}`}
                      aria-current={i === activeIndex}
                      style={cardBoxStyle}
                    >
                      <span
                        style={{
                          position: "absolute",
                          top: "-1.75rem",
                          left: 0,
                          right: 0,
                          textAlign: "center",
                          fontSize: ".6875rem",
                          fontWeight: 600,
                          letterSpacing: ".08em",
                          textTransform: "uppercase",
                          color: i === activeIndex || hoveredIndex === i ? "#F36B21" : "rgba(255,255,255,.5)",
                          transition: `color .4s ${EASE}`,
                        }}
                      >
                        {card.tag}
                      </span>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={card.image}
                        alt=""
                        draggable={false}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: CARD_RADIUS,
                          boxShadow: i === activeIndex ? "0 0 0 2px #F36B21, 0 20px 40px rgba(0,0,0,.45)" : "0 20px 40px rgba(0,0,0,.45)",
                          transition: `box-shadow .3s ${EASE}`,
                        }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Reflection — a mirrored, blurred, rippling copy of the same
                  cards, fading into the panel like still water. Full height,
                  same as the row above, so it's the complete reflection of
                  each card rather than a cropped sliver — the fade is done
                  entirely by the mask's opacity ramp, not by clipping. */}
              <div
                aria-hidden="true"
                style={{
                  position: "relative",
                  zIndex: 2,
                  height: `${CARD_H + 3}rem`,
                  marginTop: 0,
                  marginInline: "-1.5rem", // stay aligned under the (also edge-to-edge) card row above
                  overflow: "hidden",
                  pointerEvents: "none",
                }}
              >
                {/* Sized to match the card track exactly, so scaleY(-1) about
                    the default center origin flips the row fully in place —
                    an unclipped, exact mirror of the row above. */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: `${CARD_H + 3}rem`,
                    transform: "scaleY(-1)",
                    opacity: 0.85,
                    WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,.5) 45%, rgba(0,0,0,0) 100%)",
                    maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,.5) 45%, rgba(0,0,0,0) 100%)",
                    filter: `blur(.5px) brightness(.5) saturate(1.05) ${reduced ? "" : "url(#mirrorhall-ripple)"}`,
                  }}
                >
                  <div style={trackStyle}>
                    {HALL_CARDS.map((card) => (
                      <div key={card.id} style={cardBoxStyle}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={card.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: CARD_RADIUS }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: ".75rem", marginTop: "1rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: ".875rem" }}>
                  <button
                    type="button"
                    onClick={() => goTo(activeIndex - 1)}
                    disabled={activeIndex === 0}
                    aria-label="Previous division"
                    style={{
                      width: "1.75rem",
                      height: "1.75rem",
                      display: "grid",
                      placeItems: "center",
                      borderRadius: "9999px",
                      background: "#F36B21",
                      color: "#2A1206",
                      opacity: activeIndex === 0 ? 0.3 : 1,
                      transition: `opacity .3s ${EASE}`,
                    }}
                  >
                    <span style={{ display: "inline-block", transform: "rotate(180deg)", fontSize: ".75rem" }}>→</span>
                  </button>

                  <span style={{ fontSize: ".75rem", fontWeight: 600, letterSpacing: ".08em", color: "#C8A45D", fontVariantNumeric: "tabular-nums" }}>
                    {pad(activeIndex + 1)} / {pad(count)}
                  </span>

                  <button
                    type="button"
                    onClick={() => goTo(activeIndex + 1)}
                    disabled={activeIndex === count - 1}
                    aria-label="Next division"
                    style={{
                      width: "1.75rem",
                      height: "1.75rem",
                      display: "grid",
                      placeItems: "center",
                      borderRadius: "9999px",
                      background: "#F36B21",
                      color: "#2A1206",
                      opacity: activeIndex === count - 1 ? 0.3 : 1,
                      transition: `opacity .3s ${EASE}`,
                    }}
                  >
                    <span style={{ fontSize: ".75rem" }}>→</span>
                  </button>
                </div>

                <div style={{ fontSize: "1.25rem", fontWeight: 600, color: "#fff", letterSpacing: "-.01em" }}>{active.title}</div>

                <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap", justifyContent: "center", maxWidth: "20rem" }}>
                  {HALL_CARDS.map((card, i) => (
                    <button
                      key={card.id}
                      type="button"
                      aria-label={`Go to ${card.title}`}
                      onClick={() => handleCardClick(i)}
                      style={{
                        height: ".3125rem",
                        width: i === activeIndex ? "1.5rem" : ".375rem",
                        borderRadius: "9999px",
                        background: i === activeIndex ? "#F36B21" : "rgba(255,255,255,.28)",
                        transition: `all .3s ${EASE}`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
