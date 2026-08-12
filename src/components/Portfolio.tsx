"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type Lenis from "lenis";

import { businesses, DWELL_VH } from "./portfolioData";
import { EntityChips, SectionHeading } from "./PortfolioParts";
import PortfolioStack from "./PortfolioStack";

interface PortfolioProps {
  introReady: boolean;
  lenis?: Lenis | null;
}

/* Share of each division's scroll segment spent fully settled, before the
   transition to the next begins. */
const HOLD = 0.58;

export default function Portfolio({ lenis }: PortfolioProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const metrics = useRef({ top: 0, height: 0, vh: 0 });
  const rafId = useRef<number | null>(null);
  const lastProgress = useRef(0);

  const [progress, setProgress] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [compact, setCompact] = useState(false);

  // Only the first four divisions appear in the stack — it's sized to match
  // the four-color palette (green/green/orange/gold), not the full shared
  // business list (which MirrorHall's carousel still uses in full).
  const stackBusinesses = businesses.slice(0, 4);
  const count = stackBusinesses.length;
  const span = Math.max(count - 1, 1);

  /* Each division owns a segment of the track, and most of that segment is a
     HOLD — the division sits fully settled, sharp and readable. Only the tail
     of the segment is spent moving to the next one. Mapping scroll linearly
     instead leaves the whole composition permanently mid-transition. */
  const raw = progress * span;
  const segment = Math.min(Math.floor(raw), span - 1);
  const withinSegment = raw - segment;
  const t = withinSegment <= HOLD ? 0 : (withinSegment - HOLD) / (1 - HOLD);
  const eased = t * t * (3 - 2 * t); // smoothstep, so departures and arrivals ease
  const activeFloat = Math.min(segment + eased, span);

  const activeIndex = Math.min(count - 1, Math.max(0, Math.round(activeFloat)));

  const measure = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    metrics.current = {
      top: rect.top + window.scrollY,
      height: rect.height,
      vh: window.innerHeight,
    };
  }, []);

  // Environment probes: motion preference, compact layout
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const narrow = window.matchMedia("(max-width: 1023px)");

    const sync = () => {
      setReduced(motion.matches);
      setCompact(narrow.matches);
    };
    sync();

    motion.addEventListener("change", sync);
    narrow.addEventListener("change", sync);
    return () => {
      motion.removeEventListener("change", sync);
      narrow.removeEventListener("change", sync);
    };
  }, []);

  // Scroll progress. Metrics are cached and only re-read on resize; the rAF
  // loop runs solely while the track is in view.
  useEffect(() => {
    if (reduced) return;
    const el = trackRef.current;
    if (!el) return;

    measure();

    const tick = () => {
      const { top, height, vh } = metrics.current;
      const travel = height - vh;
      const p = travel > 0 ? (window.scrollY - top) / travel : 0;
      const clamped = p < 0 ? 0 : p > 1 ? 1 : p;
      if (Math.abs(clamped - lastProgress.current) > 0.0004) {
        lastProgress.current = clamped;
        setProgress(clamped);
      }
      rafId.current = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && rafId.current === null) {
          rafId.current = requestAnimationFrame(tick);
        } else if (!entry.isIntersecting && rafId.current !== null) {
          cancelAnimationFrame(rafId.current);
          rafId.current = null;
        }
      },
      { rootMargin: "20% 0px" }
    );
    observer.observe(el);

    let resizeId: number | undefined;
    const onResize = () => {
      window.clearTimeout(resizeId);
      resizeId = window.setTimeout(measure, 120);
    };
    window.addEventListener("resize", onResize);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      window.clearTimeout(resizeId);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
      rafId.current = null;
    };
  }, [measure, reduced]);

  // Selecting from the gallery moves the scroll position too, so the next wheel
  // tick continues from the chosen division instead of snapping back.
  const goTo = useCallback(
    (i: number) => {
      const { top, height, vh } = metrics.current;
      const travel = height - vh;
      if (travel <= 0) return;
      // Land in the middle of that division's hold, not on the segment edge,
      // so a click arrives at a settled state rather than a transition.
      const rawTarget = i >= span ? span : i + HOLD / 2;
      const target = top + (rawTarget / span) * travel;
      if (lenis) lenis.scrollTo(target, { duration: 0.9 });
      else window.scrollTo({ top: target, behavior: "smooth" });
    },
    [lenis, span]
  );

  /* ---------- reduced motion: the whole collection, static and readable ---------- */
  if (reduced) {
    return (
      <section id="works" style={{ background: "#ffffff" }}>
        <div className="shell" style={{ padding: "2.5rem 3.5rem 5rem" }}>
          <SectionHeading />
          <ul className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "1.5rem", marginTop: "3.5rem" }}>
            {stackBusinesses.map((biz) => (
              <li key={biz.title}>
                <article
                  style={{
                    minHeight: "22rem",
                    borderRadius: "2rem",
                    background: "#FBF8F1",
                    padding: "1.75rem",
                    color: "#35302A",
                    boxShadow: "0 0 0 1px #E6DECB",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <div style={{ fontSize: ".75rem", textTransform: "uppercase", letterSpacing: ".025em", color: "rgba(74,68,60,.5)" }}>
                      {biz.category}
                    </div>
                    <h3 style={{ fontSize: "1.5rem", fontWeight: 600, letterSpacing: "-.01em", marginTop: "1rem", color: "#35302A" }}>{biz.title}</h3>
                    <p style={{ marginTop: ".5rem", fontSize: ".875rem", color: "rgba(74,68,60,.75)", lineHeight: 1.5 }}>{biz.description}</p>
                  </div>
                  <EntityChips entities={biz.entities} />
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  return (
    <section id="works" style={{ background: "#fff" }}>
      <div ref={trackRef} style={{ position: "relative", height: `calc(100vh + ${count * DWELL_VH}vh)` }}>
        <PortfolioStack businesses={stackBusinesses} activeFloat={activeFloat} activeIndex={activeIndex} compact={compact} goTo={goTo} />
      </div>
    </section>
  );
}
