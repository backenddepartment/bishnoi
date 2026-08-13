"use client";

import { useEffect, useRef, useState } from "react";

interface PrinciplesProps {
  introReady: boolean;
}

const groups = [
  {
    label: "Personal hygiene & health",
    items: [
      "A 30-day period of rest and purification after childbirth.",
      "A period of rest during menstruation.",
      "Bathing before sunrise each day.",
      "Living with modesty, patience, contentment, and cleanliness.",
      "Prayer twice daily, morning and evening.",
      "Evening aarti in devotion to Vishnu.",
      "Yajna (fire ritual) to release lust, anger, greed, attachment, and ego.",
      "Drinking only filtered water and milk.",
      "Checking firewood for living creatures before burning it.",
      "Using only clean, strained cooking fuel.",
    ],
  },
  {
    label: "Social conduct",
    items: [
      "Speaking the truth, and speaking it with sincerity.",
      "Practicing patience and forgiveness.",
      "Showing compassion and mercy.",
      "Never stealing, even in intention.",
      "Never criticizing or condemning others.",
      "Never lying.",
      "Avoiding arguments and conflict.",
    ],
  },
  {
    label: "Worship",
    items: [
      "Fasting and gathering in satsang on Amavasya, the new moon.",
      "Reciting and worshipping the name of Vishnu.",
      "Showing mercy to every living being; loving without possession.",
      "Standing apart from lust, anger, greed, and attachment.",
    ],
  },
  {
    label: "Living with nature",
    items: [
      "Never cutting a living tree.",
      "Growing and preparing one's own food.",
      "Sheltering animals that would otherwise be abandoned or slaughtered.",
      "Never castrating a bull or abandoning a male calf.",
      "Never using or trading opium.",
      "Never smoking or using tobacco.",
      "Never consuming bhang, hemp, or other intoxicants.",
      "Living free of alcohol and meat, in an ethical, largely vegetarian way.",
    ],
  },
];

const GROUP_IMAGES = [
  "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop", // Personal hygiene & health
  "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1200&auto=format&fit=crop", // Social conduct
  "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1200&auto=format&fit=crop", // Worship
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1200&auto=format&fit=crop", // Living with nature
];

/* 01–29 runs unbroken across the four groups: they are one set, not four
   lists. Numbered once at module scope so nothing mutates during render. */
let running = 0;
const numberedGroups = groups.map((group, i) => ({
  ...group,
  numeral: String(i + 1).padStart(2, "0"),
  image: GROUP_IMAGES[i],
  items: group.items.map((text) => ({ text, n: (running += 1) })),
}));

const EASE = "cubic-bezier(.22,1,.36,1)";
const PANEL_DARK = "linear-gradient(158deg,#2E2822 0%,#1C1815 100%)";

const HEADLINE = "29 Principles, One Way of Life";

export default function Principles({}: PrinciplesProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState(0);
  const [compact, setCompact] = useState(false);
  const [canHover, setCanHover] = useState(false);
  const [typedCount, setTypedCount] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const timeoutRef = useRef<number | undefined>(undefined);
  const intervalRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Bidirectional — fades back out on exit too, not just in on first
    // entry, so the section reads like a slide transitioning in and out.
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.08 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // The 4-column side-by-side spine layout only has room to breathe at
    // true desktop widths — tablet landscape (1024–1194px) squeezes the
    // three closed panels down to ~130px, clipping/wrapping their titles.
    // Below 1280px we fall back to the stacked accordion used on phones
    // and tablet portrait instead.
    const narrow = window.matchMedia("(max-width: 1279px)");
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

  // Types the headline out like a keyboard, one character per tick — same
  // pattern as About.tsx/Founder.tsx.
  const typeHeadline = () => {
    window.clearTimeout(timeoutRef.current);
    window.clearInterval(intervalRef.current);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTypedCount(HEADLINE.length);
      return;
    }

    setTypedCount(0);
    timeoutRef.current = window.setTimeout(() => {
      let i = 0;
      intervalRef.current = window.setInterval(() => {
        i += 1;
        setTypedCount(i);
        if (i >= HEADLINE.length) window.clearInterval(intervalRef.current);
      }, 45);
    }, 150);
  };

  // Hover-capable pointers type the title on hover; touch devices fall back
  // to typing it once the section scrolls into view.
  useEffect(() => {
    if (canHover || !isVisible) return;
    const kickoffId = window.setTimeout(typeHeadline, 0);
    return () => {
      window.clearTimeout(kickoffId);
      window.clearTimeout(timeoutRef.current);
      window.clearInterval(intervalRef.current);
    };
  }, [isVisible, canHover]);

  useEffect(() => {
    return () => {
      window.clearTimeout(timeoutRef.current);
      window.clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <section
      id="principles"
      ref={sectionRef}
      onMouseEnter={() => canHover && typeHeadline()}
      style={{ background: "#FFFFFF" }}
    >
      <div className="shell" style={{ paddingTop: "1.5rem", paddingBottom: "5rem" }}>
        {/* title holds the left column; the blurb sits beside it on desktop so
            the header spans the shell instead of trailing off to empty space */}
        <div
          style={{
            display: "flex",
            flexDirection: compact ? "column" : "row",
            alignItems: compact ? "stretch" : "flex-end",
            gap: compact ? "1.25rem" : "4rem",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", flex: compact ? "1 1 auto" : "1 1 0%", minWidth: 0 }}>
            <div className="eyebrow eyebrow-dark" style={{ fontSize: "1.25rem" }}>
              <span className="dot dot-blink"></span> The 29 Principles
            </div>
            <h2 aria-label={HEADLINE} style={{ fontSize: "3rem", fontWeight: 600, lineHeight: 1.15, letterSpacing: "-.02em" }}>
              <span aria-hidden="true">{HEADLINE.slice(0, typedCount)}</span>
              <span className="typing-cursor" aria-hidden="true" />
            </h2>
          </div>
          <p
            style={{
              flex: compact ? "1 1 auto" : "1 1 0%",
              minWidth: 0,
              maxWidth: "34rem",
              fontSize: "1.3125rem",
              lineHeight: 1.6,
              color: "rgba(74,68,60,.75)",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              transition: `transform .7s ${EASE}, opacity .7s ${EASE}`,
              transitionDelay: "300ms",
            }}
          >
            The name &ldquo;Bishnoi&rdquo; comes from the Marwari <em>bis</em> (twenty) and <em>noi</em> (nine) &mdash; the 29 principles
            Guru Jambheshwar set down as a complete way of life, covering health, conduct, worship, and the natural world.
          </p>
        </div>

        {/* Four panels, one open. The open panel carries its principles inside;
            the closed ones collapse to a titled spine. */}
        <div
          style={{
            marginTop: "3.5rem",
            display: "flex",
            flexDirection: compact ? "column" : "row",
            gap: ".5rem",
            height: compact ? "auto" : "34rem",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(28px)",
            transition: `transform .8s ${EASE}, opacity .8s ${EASE}`,
            transitionDelay: "450ms",
          }}
        >
          {numberedGroups.map((group, i) => {
            const isOpen = i === openIndex;
            const open = () => setOpenIndex(i);

            return (
              <section
                key={group.label}
                aria-label={group.label}
                onMouseEnter={canHover && !compact ? open : undefined}
                onClick={open}
                onFocus={open}
                style={{
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: "1.5rem",
                  flex: compact ? (isOpen ? "1 1 auto" : "0 0 4.5rem") : isOpen ? "4 1 0%" : "1 1 0%",
                  minWidth: 0,
                  background: isOpen ? PANEL_DARK : "#ffffff",
                  boxShadow: isOpen ? "0 0 0 1px rgba(243,107,33,0.34)" : "0 0 0 1px #E6DECB",
                  color: isOpen ? "#fff" : "#4A443C",
                  cursor: isOpen ? "default" : "pointer",
                  transition: `flex .7s ${EASE}, background .5s ${EASE}, box-shadow .5s ${EASE}, color .5s ${EASE}`,
                }}
              >
                {/* Background Image & Gradient Overlay */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 0,
                    pointerEvents: "none",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={group.image}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      opacity: isOpen ? 0.75 : 0.35,
                      filter: isOpen ? "brightness(0.75) contrast(1.15)" : "brightness(0.85)",
                      transform: isOpen ? "scale(1.06)" : "scale(1)",
                      transition: `opacity .6s ${EASE}, transform .8s ${EASE}, filter .6s ${EASE}`,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: isOpen
                        ? "linear-gradient(180deg, rgba(15, 12, 10, 0.45) 0%, rgba(15, 12, 10, 0.78) 100%)"
                        : "linear-gradient(180deg, rgba(255, 255, 255, 0.55) 0%, rgba(248, 245, 238, 0.85) 100%)",
                      transition: `background .5s ${EASE}`,
                    }}
                  />
                </div>

                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={open}
                  style={{
                    position: "relative",
                    zIndex: 1,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "stretch",
                    textAlign: "left",
                    padding: compact ? "1.25rem" : "1.75rem",
                    cursor: "inherit",
                  }}
                >
                  {/* every panel leads with its name; the numeral survives only
                      as the ghost ornament behind */}
                  <div style={{ display: "flex", alignItems: "baseline", gap: ".75rem", flexShrink: 0, flexWrap: "wrap" }}>
                    <span
                      style={{
                        width: isOpen ? "2.5rem" : "1.25rem",
                        height: "2px",
                        background: "#F36B21",
                        alignSelf: "center",
                        transition: `width .5s ${EASE}`,
                      }}
                    />
                    {isOpen ? (
                      <h3 style={{ fontSize: compact ? "1.375rem" : "1.75rem", fontWeight: 600, letterSpacing: "-.01em", textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}>{group.label}</h3>
                    ) : (
                      compact && <h3 style={{ fontSize: "1.375rem", fontWeight: 600, letterSpacing: "-.01em" }}>{group.label}</h3>
                    )}
                  </div>

                  {/* closed spine on desktop: the title sits under the rule and
                      wraps, since the panel is too narrow for one line */}
                  {!isOpen && !compact && (
                    <h3 style={{ marginTop: "1rem", fontSize: "2rem", fontWeight: 600, letterSpacing: "-.015em", lineHeight: 1.15 }}>{group.label}</h3>
                  )}

                  {isOpen ? (
                    <div style={{ marginTop: "1.25rem", display: "flex", flexDirection: "column", minHeight: 0, flex: 1 }}>
                      <ul
                        className="no-scrollbar grid grid-cols-1 md:grid-cols-2"
                        style={{ gap: "0 2.5rem", overflow: "auto", minHeight: 0, flex: 1 }}
                      >
                        {group.items.map(({ text, n }, k) => (
                          <li
                            key={text}
                            style={{
                              display: "flex",
                              gap: ".875rem",
                              alignItems: "baseline",
                              padding: ".625rem 0",
                              borderTop: "1px solid rgba(255,255,255,.2)",
                              opacity: 0,
                              animation: `principle-in .5s ${EASE} ${120 + k * 45}ms forwards`,
                            }}
                          >
                            <span
                              style={{
                                flexShrink: 0,
                                fontSize: "1rem",
                                fontWeight: 700,
                                color: "#F36B21",
                                fontVariantNumeric: "tabular-nums",
                                paddingTop: ".15rem",
                              }}
                            >
                              {String(n).padStart(2, "0")}
                            </span>
                            <span style={{ fontSize: "1.0625rem", lineHeight: 1.5, color: "#FFFFFF", textShadow: "0 1px 4px rgba(0,0,0,0.6)" }}>{text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </button>
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}
