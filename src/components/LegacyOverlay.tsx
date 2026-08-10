"use client";

import { useEffect, useRef } from "react";

import { type Chapter, LEGACY_DARK, LEGACY_EASE } from "./legacyData";

interface OverlayProps {
  chapter: Chapter;
  /* Where the clicked box sat on screen — the zoom starts from exactly there. */
  origin: { left: number; top: number; width: number; height: number; vw: number; vh: number };
  expanded: boolean;
  onClose: () => void;
}

export default function LegacyOverlay({ chapter, origin, expanded, onClose }: OverlayProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  /* FLIP: the panel is always viewport-sized and starts scaled down onto the
     box's rect, so the growth animates on transform alone. */
  const collapsed = `translate(${origin.left}px, ${origin.top}px) scale(${origin.width / origin.vw}, ${origin.height / origin.vh})`;

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 118,
          background: "rgba(26,22,19,.55)",
          backdropFilter: "blur(6px)",
          opacity: expanded ? 1 : 0,
          transition: `opacity .45s ${LEGACY_EASE}`,
        }}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={chapter.title}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 119,
          overflow: "hidden",
          transformOrigin: "top left",
          transform: expanded ? "none" : collapsed,
          borderRadius: expanded ? 0 : "1.25rem",
          background: LEGACY_DARK,
          color: "#fff",
          transition: `transform .6s ${LEGACY_EASE}, border-radius .6s ${LEGACY_EASE}`,
          willChange: "transform",
        }}
      >
        {/* the artwork IS the panel's ground — full bleed, fixed while the copy
            scrolls over it, with scrims that keep the text readable */}
        <img
          src={chapter.image}
          alt=""
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: expanded ? 0.6 : 0,
            transition: `opacity .5s ${LEGACY_EASE} ${expanded ? ".15s" : "0s"}`,
          }}
        />
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg,rgba(20,17,15,.95) 0%,rgba(20,17,15,.78) 45%,rgba(20,17,15,.42) 100%)," +
              "linear-gradient(180deg,rgba(20,17,15,.5) 0%,rgba(20,17,15,.85) 100%)",
          }}
        />

        {/* the non-uniform scale would distort text, so content fades in once
            the panel has most of its size */}
        <div
          className="no-scrollbar"
          /* Lenis intercepts wheel events on the whole document, so a nested
             scroller has to opt out or it never receives them. */
          data-lenis-prevent
          style={{
            position: "absolute",
            inset: 0,
            overflowY: "auto",
            overscrollBehavior: "contain",
            WebkitOverflowScrolling: "touch",
            opacity: expanded ? 1 : 0,
            transition: `opacity .35s ${LEGACY_EASE} ${expanded ? ".22s" : "0s"}`,
          }}
        >
          <div className="shell-full" style={{ paddingBlock: "6rem 5rem", maxWidth: "62rem", marginInline: 0 }}>
            <div style={{ fontSize: ".75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".08em", color: "#F36B21" }}>
              {chapter.kicker}
            </div>
            <h2 style={{ marginTop: "1rem", maxWidth: "26ch", fontSize: "2.75rem", fontWeight: 600, lineHeight: 1.1, letterSpacing: "-.02em" }}>
              {chapter.title}
            </h2>
            <span style={{ display: "block", width: "3.5rem", height: "2px", background: "#F36B21", margin: "2rem 0 2.5rem" }} />

            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", maxWidth: "68ch" }}>
              {chapter.body.map((para) => (
                <p key={para.slice(0, 40)} style={{ fontSize: "1.0625rem", lineHeight: 1.75, color: "rgba(247,243,232,.78)" }}>
                  {para}
                </p>
              ))}

              {chapter.list && (
                <ul style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {chapter.list.map((item) => (
                    <li key={item} style={{ display: "flex", gap: "1rem", alignItems: "baseline" }}>
                      <span
                        style={{
                          flexShrink: 0,
                          width: ".375rem",
                          height: ".375rem",
                          borderRadius: "9999px",
                          background: "#F36B21",
                          transform: "translateY(-.2rem)",
                        }}
                      />
                      <span style={{ fontSize: "1.0625rem", lineHeight: 1.7, color: "rgba(247,243,232,.78)" }}>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <p style={{ marginTop: "3rem", fontSize: ".6875rem", letterSpacing: ".04em", color: "rgba(247,243,232,.4)" }}>
              {chapter.credit}
            </p>
          </div>
        </div>

        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="hover-spring-sm"
          style={{
            position: "absolute",
            top: "2rem",
            right: "2rem",
            width: "3rem",
            height: "3rem",
            display: "grid",
            placeItems: "center",
            borderRadius: "9999px",
            fontSize: "1.25rem",
            lineHeight: 1,
            background: "#F36B21",
            color: "#2A1206",
            opacity: expanded ? 1 : 0,
            transition: `opacity .35s ${LEGACY_EASE}`,
          }}
        >
          ✕
        </button>
      </div>
    </>
  );
}
