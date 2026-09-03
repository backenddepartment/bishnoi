"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type Lenis from "lenis";

import { chapters, COL_FR, LEGACY_EASE as EASE, MOBILE_ROWS, placement, ROW_FR } from "./legacyData";
import LegacyCard from "./LegacyCard";
import LegacyOverlay from "./LegacyOverlay";
import ActMark from "./ActMark";

interface ServicesProps {
  introReady: boolean;
  lenis?: Lenis | null;
}

interface Origin {
  left: number;
  top: number;
  width: number;
  height: number;
  vw: number;
  vh: number;
}

/* Engulfing. Hovering a card swells the grid TRACKS it occupies and squeezes the
   rest; because the tracks are fr units of one box, the tiling stays gapless
   throughout the transition. grid-template-columns/rows animate, so the whole
   composition flows rather than snapping. */
const TRACK_LIVE = 1.9;
const TRACK_QUIET = 0.86;

export default function Services({ lenis }: ServicesProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [active, setActive] = useState<{ index: number; origin: Origin } | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [compact, setCompact] = useState(false);
  const [canHover, setCanHover] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const closingRef = useRef<number | undefined>(undefined);
  const lastTrigger = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Bidirectional — fades back out on exit too, not just in on first
    // entry, so the section reads like a slide transitioning in and out.
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const narrow = window.matchMedia("(max-width: 1023px)");
    const hover = window.matchMedia("(hover: hover)");
    const sync = () => {
      setCompact(narrow.matches);
      setCanHover(hover.matches);
    };
    sync();
    narrow.addEventListener("change", sync);
    hover.addEventListener("change", sync);
    return () => {
      narrow.removeEventListener("change", sync);
      hover.removeEventListener("change", sync);
    };
  }, []);

  // The page must not scroll behind an expanded chapter.
  useEffect(() => {
    if (!lenis) return;
    if (active) lenis.stop();
    else lenis.start();
  }, [active, lenis]);

  useEffect(() => () => window.clearTimeout(closingRef.current), []);

  const open = useCallback((index: number, el: HTMLElement) => {
    const rect = el.getBoundingClientRect();
    lastTrigger.current = el;
    window.clearTimeout(closingRef.current);
    setActive({
      index,
      origin: {
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
        vw: window.innerWidth,
        vh: window.innerHeight,
      },
    });
    // one frame at the collapsed size, then grow
    requestAnimationFrame(() => setExpanded(true));
  }, []);

  const close = useCallback(() => {
    setExpanded(false);
    closingRef.current = window.setTimeout(() => {
      setActive(null);
      lastTrigger.current?.focus();
    }, 620);
  }, []);

  const live = canHover && hovered !== null ? hovered : null;
  const liveSlot = live === null ? null : placement.find((slot) => slot.item === live) ?? null;
  const liveCol = liveSlot ? liveSlot.col : null;
  const liveRows = liveSlot ? liveSlot.rows : null;

  return (
    <section
      id="legacy"
      ref={sectionRef}
      style={{
        background: "#ffffff",
        // taller than one screen now, so the mosaic gets more room to breathe
        minHeight: compact ? "auto" : "135vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* shell-full: the canvas spans the container's whole width, not the
          narrower centred measure the text sections use */}
      <div
        className="shell-full"
        style={{ paddingBlock: compact ? "4rem" : "3rem", flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}
      >
        <div
          className="grid grid-cols-1 lg:grid-cols-12"
          style={{ alignItems: "flex-start", gap: "2rem", marginBottom: "1.75rem", flexShrink: 0 }}
        >
          <div className="lg:col-span-5">
            <ActMark numeral="II" era="1730" label="The principles are tested" />
            <h2 className="act-title" style={{ margin: ".75rem 0 0", fontSize: "clamp(2.5rem, 4vw, 3.75rem)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-.02em" }}>
              <span className={`reveal-line ${isVisible ? "visible" : ""}`}>
                <span className="line-inner">Bishnoi Legacy</span>
              </span>
            </h2>
          </div>

          <p className="lg:col-span-7" style={{ fontSize: "1.3125rem", lineHeight: 1.6, color: "rgba(74,68,60,.75)" }}>
            Eight chapters of the same discipline &mdash; sacrifice, migration, conservation, and craft &mdash; carried from Amrita Devi&rsquo;s
            stand at Khejarli to the wildlife wardens and artisans who still live it today.
          </p>
        </div>

        {/* One gapless box, subdivided by unequal grid tracks. Cards span
            different numbers of tracks, so the composition mixes wide-and-short
            with tall-and-thin while flowing edge to edge. full-bleed breaks it
            out of .shell-full's own padding so it spans the entire section
            width, not just the padded measure the heading sits in. */}
        <div
          className="full-bleed"
          style={{
            display: "grid",
            gridTemplateColumns: compact
              ? "1.35fr 1fr"
              : COL_FR.map((fr, i) => `${fr * (liveCol === null ? 1 : i === liveCol ? TRACK_LIVE : TRACK_QUIET)}fr`).join(" "),
            gridTemplateRows: compact
              ? MOBILE_ROWS
              : ROW_FR.map((fr, i) => `${fr * (liveRows === null ? 1 : liveRows.includes(i) ? TRACK_LIVE : TRACK_QUIET)}fr`).join(" "),
            flex: compact ? "none" : 1,
            minHeight: 0,
            // no gutters: the wall is one solid subdivided panel. Full-bleed
            // now runs it flush to the section's own edges, so there's no
            // inset rectangle left to round.
            gap: 0,
            overflow: "hidden",
            opacity: isVisible ? 1 : 0,
            transitionProperty: "grid-template-columns, grid-template-rows, opacity",
            transitionDuration: ".7s, .7s, .8s",
            transitionTimingFunction: EASE,
          }}
        >
          {placement.map((slot) => {
            const chapter = chapters[slot.item];
            const isHot = live === slot.item;

            return (
              <div
                key={chapter.title}
                style={{
                  gridArea: compact ? slot.mobileArea : slot.area,
                  display: "flex",
                  minWidth: 0,
                  minHeight: 0,
                }}
              >
                <LegacyCard
                  chapter={chapter}
                  index={slot.item}
                  grow={1}
                  vertical={!compact && slot.vertical}
                  isHot={isHot}
                  quiet={live !== null && !isHot}
                  hidden={active?.index === slot.item}
                  compact={compact}
                  onOpen={open}
                  onEnter={canHover ? () => setHovered(slot.item) : undefined}
                  onLeave={canHover ? () => setHovered(null) : undefined}
                  revealDelay={isVisible ? "0ms" : `${140 + slot.item * 60}ms`}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Two closing notes below the mosaic — outside .shell-full's flex
          column so they don't compete with the mosaic's own flex:1 sizing,
          using the narrower .shell measure since this is reading copy, not
          the full-bleed canvas. */}
      <div className="shell" style={{ paddingBlock: compact ? "3rem" : "4rem" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: compact ? "3rem" : "4rem" }}>
          <div>
            <div className="eyebrow eyebrow-dark" style={{ fontSize: "1.25rem" }}>
              <span className="dot dot-blink"></span> Today
            </div>
            <h3 style={{ margin: ".75rem 0 1rem", fontSize: "1.875rem", fontWeight: 600, letterSpacing: "-.01em" }}>
              Faces of the Community
            </h3>
            <p style={{ fontSize: "1.125rem", lineHeight: 1.7, color: "rgba(74,68,60,.75)" }}>
              The community&rsquo;s values live on through people like Bhajan Lal, a former Chief Minister of Haryana; Ravi Bishnoi, an Indian
              international cricketer; and conservationists Khamu Ram Bishnoi and Radheshyam Bishnoi, who carry the community&rsquo;s
              centuries-old commitment to wildlife into the present day.
            </p>
          </div>

          <div>
            <div className="eyebrow eyebrow-dark" style={{ fontSize: "1.25rem" }}>
              <span className="dot dot-blink"></span> Join the Story
            </div>
            <h3 style={{ margin: ".75rem 0 1rem", fontSize: "1.875rem", fontWeight: 600, letterSpacing: "-.01em" }}>
              Faith and Ecology, Never Separate
            </h3>
            <p style={{ fontSize: "1.125rem", lineHeight: 1.7, color: "rgba(74,68,60,.75)" }}>
              Long before conservation was a matter of policy, it was a matter of obligation — written into rules about what a household may cut,
              kill, drink and wear. Explore the 29 principles, walk through the story of Khejarli, or see how a 15th-century faith still shapes
              the Thar Desert today.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: ".75rem", marginTop: "1.5rem" }}>
              <a href="#principles" className="pill-btn">
                <span className="pill-inner pill-accent pill-no-arrow" style={{ color: "#fff" }}>
                  Explore the 29 Principles
                </span>
              </a>
              <button type="button" className="pill-btn" onClick={(e) => open(0, e.currentTarget)}>
                <span className="pill-inner pill-outline pill-no-arrow">The Story of Amrita Devi</span>
              </button>
              <a href="#mukam" className="pill-btn">
                <span className="pill-inner pill-outline pill-no-arrow">Visit Mukam</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {active && <LegacyOverlay chapter={chapters[active.index]} origin={active.origin} expanded={expanded} onClose={close} />}
    </section>
  );
}
