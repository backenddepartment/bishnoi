"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type Lenis from "lenis";

import { chapters, COL_FR, LEGACY_EASE as EASE, MOBILE_ROWS, placement, ROW_FR } from "./legacyData";
import LegacyCard from "./LegacyCard";
import LegacyOverlay from "./LegacyOverlay";

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

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
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
      id="services"
      ref={sectionRef}
      style={{
        background: "#F7F3E8",
        // one screen: the canvas below takes whatever the heading leaves
        minHeight: compact ? "auto" : "100vh",
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
        <div className="eyebrow eyebrow-dark">
          <span className="dot"></span> Five Hundred Years of Stewardship
        </div>
        <h2 style={{ margin: "1rem 0 1.75rem", maxWidth: "18ch", fontSize: "2.25rem", fontWeight: 600, letterSpacing: "-.02em", flexShrink: 0 }}>
          <span className={`reveal-line ${isVisible ? "visible" : ""}`}>
            <span className="line-inner">Bishnoi Legacy</span>
          </span>
        </h2>

        {/* One gapless box, subdivided by unequal grid tracks. Cards span
            different numbers of tracks, so the composition mixes wide-and-short
            with tall-and-thin while flowing edge to edge. */}
        <div
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
            // no gutters: the wall is one solid subdivided panel, so the
            // rounding lives on the container instead of on each card
            gap: 0,
            borderRadius: "1rem",
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

      {active && <LegacyOverlay chapter={chapters[active.index]} origin={active.origin} expanded={expanded} onClose={close} />}
    </section>
  );
}
