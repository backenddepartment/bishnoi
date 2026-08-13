"use client";

import { type Chapter, LEGACY_EASE as EASE } from "./legacyData";

const TYPE = {
  xl: { title: "2rem", kicker: ".875rem", mark: "2.75rem" },
  lg: { title: "1.5rem", kicker: ".8125rem", mark: "2.5rem" },
  md: { title: "1.25rem", kicker: ".75rem", mark: "2.25rem" },
  sm: { title: "1.125rem", kicker: ".75rem", mark: "2rem" },
} as const;
const NEXT_TIER = { sm: "md", md: "lg", lg: "xl", xl: "xl" } as const;

interface CardProps {
  chapter: Chapter;
  index: number;
  grow: number;
  /* thin full-height panel: the title is set on its side and the kicker is
     dropped, because neither fits across the width */
  vertical?: boolean;
  isHot: boolean;
  quiet: boolean;
  hidden: boolean;
  compact: boolean;
  onOpen: (index: number, el: HTMLElement) => void;
  onEnter?: () => void;
  onLeave?: () => void;
  revealDelay: string;
}

export default function LegacyCard({
  chapter,
  index,
  grow,
  vertical,
  isHot,
  quiet,
  hidden,
  compact,
  onOpen,
  onEnter,
  onLeave,
  revealDelay,
}: CardProps) {
  const type = TYPE[isHot ? NEXT_TIER[chapter.tier] : chapter.tier];

  return (
    <button
      type="button"
      onClick={(e) => onOpen(index, e.currentTarget)}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "stretch",
        textAlign: "left",
        minWidth: 0,
        minHeight: 0,
        // share of its group's width — never normalised
        flexGrow: grow,
        flexShrink: 1,
        flexBasis: 0,
        borderRadius: 0,
        padding: compact ? ".75rem" : ".875rem",
        background: "#141110",
        color: "#fff",
        boxShadow: isHot
          ? "inset 0 0 0 1px rgba(243,107,33,0.75)"
          : "inset 0 0 0 1px rgba(243,107,33,0.18)",
        // quiet cards step back in tone only — never blurred
        opacity: quiet ? 0.8 : 1,
        cursor: "pointer",
        transitionProperty: "flex-grow, opacity, box-shadow",
        transitionDuration: ".7s",
        transitionTimingFunction: EASE,
        transitionDelay: revealDelay,
        visibility: hidden ? "hidden" : "visible",
      }}
    >
      <img
        src={chapter.image}
        alt=""
        aria-hidden
        loading="lazy"
        decoding="async"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: isHot ? 1 : 0.82,
          transform: isHot ? "scale(1.05)" : "scale(1)",
          transitionProperty: "opacity, transform",
          transitionDuration: ".7s",
          transitionTimingFunction: EASE,
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: vertical
            ? "linear-gradient(0deg,rgba(20,17,15,.9) 0%,rgba(20,17,15,.3) 55%,rgba(20,17,15,.6) 100%)"
            : "linear-gradient(180deg,rgba(20,17,15,.62) 0%,rgba(20,17,15,.25) 38%,rgba(20,17,15,.9) 100%)",
        }}
      />

      {vertical ? (
        <>
          <span
            aria-hidden
            style={{
              position: "relative",
              alignSelf: "flex-end",
              flexShrink: 0,
              width: type.mark,
              height: type.mark,
              display: "grid",
              placeItems: "center",
              borderRadius: "9999px",
              fontSize: "1.125rem",
              background: "#F36B21",
              border: "1px solid #F36B21",
              color: "#2A1206",
              transform: isHot ? "rotate(45deg)" : "rotate(0deg)",
              transitionProperty: "background, color, transform",
              transitionDuration: ".5s",
              transitionTimingFunction: EASE,
            }}
          >
            ↗
          </span>
          <h3
            style={{
              position: "relative",
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
              maxHeight: "100%",
              overflow: "hidden",
              fontSize: type.title,
              fontWeight: 600,
              letterSpacing: "-.01em",
              lineHeight: 1.1,
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              transitionProperty: "font-size",
              transitionDuration: ".5s",
              transitionTimingFunction: EASE,
            }}
          >
            {chapter.title}
          </h3>
        </>
      ) : (
        <>
          <div
            style={{
              position: "relative",
              fontSize: type.kicker,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: ".08em",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              color: "#F36B21",
              transitionProperty: "font-size",
              transitionDuration: ".5s",
              transitionTimingFunction: EASE,
            }}
          >
            {chapter.kicker}
          </div>

          <div style={{ position: "relative", display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: ".75rem" }}>
            <h3
              style={{
                minWidth: 0,
                fontSize: type.title,
                fontWeight: 600,
                letterSpacing: "-.01em",
                lineHeight: 1.2,
                // wraps instead of truncating — the full title should always
                // read, not just once the chapter is opened. Long single
                // words (e.g. "Traditions") don't have a natural break point
                // and would otherwise overflow past this narrow column and
                // under the arrow badge on compact/mobile card widths — so
                // let the browser break mid-word rather than overflow.
                overflowWrap: "break-word",
                wordBreak: "break-word",
                transitionProperty: "font-size",
                transitionDuration: ".5s",
                transitionTimingFunction: EASE,
              }}
            >
              {chapter.title}
            </h3>
            <span
              aria-hidden
              style={{
                flexShrink: 0,
                width: type.mark,
                height: type.mark,
                display: "grid",
                placeItems: "center",
                borderRadius: "9999px",
                fontSize: "1.125rem",
                background: "#F36B21",
                border: "1px solid #F36B21",
                color: "#2A1206",
                transform: isHot ? "rotate(45deg)" : "rotate(0deg)",
                transitionProperty: "width, height, background, color, transform",
                transitionDuration: ".5s",
                transitionTimingFunction: EASE,
              }}
            >
              ↗
            </span>
          </div>
        </>
      )}
    </button>
  );
}
