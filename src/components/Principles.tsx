"use client";

import { useEffect, useRef, useState } from "react";

interface PrinciplesProps {
  introReady?: boolean;
}

/* The 29 niyamas, as they come down through the Shabadwani.

   Renderings and groupings vary between sources; these four categories are
   this site's own, arranged to show how far the rules reach into ordinary
   life rather than to reproduce a traditional division. The section intro
   below says so — do not let the page imply the grouping is inherited.

   Three corrections against the standard enumeration, made 2026-09-03 (see
   research/claims-register.md item 4):

   - "Never wearing blue" was missing entirely. It is the indigo rule, and
     arguably the most telling of the 29: a prohibition on a COLOUR, derived
     from a prohibition on harming the plant the dye comes from.
   - "Use filtered water, milk, and cleaned firewood" had been split across
     three items, padding the count.
   - Alcohol and meat had been merged into one item, offsetting that padding.

   The total is 29 either way, which is how the gap went unnoticed. */
const groups = [
  {
    label: "Personal Hygiene & Health",
    items: [
      "A 30-day period of rest and purification after childbirth.",
      "A 5-day period of rest during menstruation.",
      "Bathing before sunrise each day.",
      "Living with modesty, patience, contentment, and cleanliness.",
      "Prayer twice daily, morning and evening.",
      "Evening aarti in devotion to God.",
      "Yajna (fire ritual) to release lust, anger, greed, attachment, and ego.",
      "Using filtered water, filtered milk, and firewood cleaned of living creatures.",
    ],
  },
  {
    label: "Ethical Conduct",
    items: [
      "Speaking the truth, and speaking it with sincerity.",
      "Practicing patience and forgiveness.",
      "Showing compassion and mercy to all living beings.",
      "Never stealing, even in intention.",
      "Never criticizing or condemning others.",
      "Never lying.",
      "Avoiding arguments and conflict.",
    ],
  },
  {
    label: "Morality",
    items: [
      "Fasting and gathering in satsang on Amavasya, the new moon.",
      "Reciting and worshipping the divine name.",
      "Showing mercy to every living being; loving without possession.",
      "Standing apart from lust, anger, greed, and attachment.",
    ],
  },
  {
    label: "Living in Harmony",
    items: [
      "Never cutting a living green tree.",
      "Growing and preparing ethical food.",
      "Sheltering animals that would otherwise be abandoned or slaughtered.",
      "Never castrating a bull or abandoning a male calf.",
      "Never using or trading opium.",
      "Never smoking or using tobacco.",
      "Never consuming bhang, hemp, or other intoxicants.",
      "Never drinking alcohol.",
      "Never eating meat; keeping a strict vegetarian diet.",
      "Never wearing blue \u2014 the dye is drawn from the indigo plant.",
    ],
  },
];

const GROUP_IMAGES = [
  "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1200&auto=format&fit=crop",
];

let running = 0;
const numberedGroups = groups.map((group, i) => ({
  ...group,
  numeral: String(i + 1).padStart(2, "0"),
  image: GROUP_IMAGES[i],
  items: group.items.map((text) => ({ text, n: (running += 1) })),
}));

const EASE = "cubic-bezier(.22,1,.36,1)";
const PANEL_DARK = "linear-gradient(158deg,#2E2822 0%,#1C1815 100%)";

export default function Principles({}: PrinciplesProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState(0);
  const [compact, setCompact] = useState(false);
  const [canHover, setCanHover] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const panelRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

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

  /* The full reference lives at /bishnoi/29-principles, which renders all 29
     statically, with sources. This section only previews them.

     Declared once and placed in one of two spots below: on the wide layout it
     sits inside the left column so the row's flex-end alignment drops the
     intro paragraph's last line level with the button rather than with the
     heading; on the stacked layout it stays after the paragraph, so the
     explanation still comes before the call to action. */
  const readAllCta = (
    <a href="/bishnoi/29-principles" className="pill-btn">
      <span className="pill-inner pill-accent pill-with-arrow" style={{ color: "#ffffff" }}>
        Read all 29, with sources <span className="pill-badge">&rarr;</span>
      </span>
    </a>
  );

  return (
    <section
      id="principles"
      ref={sectionRef}
      style={{ background: "#FFFFFF" }}
    >
      {/* No top padding — Mukam's own bottom padding above supplies the
          whole gap between the two sections. */}
      <div className="shell" style={{ paddingTop: 0, paddingBottom: "5rem" }}>
        <div
          style={{
            display: "flex",
            flexDirection: compact ? "column" : "row",
            alignItems: compact ? "stretch" : "flex-end",
            gap: compact ? "1.25rem" : "4rem",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", flex: compact ? "1 1 auto" : "1 1 0%", minWidth: 0 }}>
            <div className="eyebrow eyebrow-dark" style={{ fontSize: "1.125rem" }}>
              <span className="dot dot-blink"></span> The 29 Principles
            </div>
            <h2 style={{ fontSize: "clamp(1.875rem, 2.8vw, 2.375rem)", fontWeight: 700, lineHeight: 1.15, letterSpacing: "-.02em", color: "#2E2822" }}>
              29 Principles, One Way of Life
            </h2>
            {!compact && <div style={{ marginTop: ".5rem" }}>{readAllCta}</div>}
          </div>
          <p
            style={{
              flex: compact ? "1 1 auto" : "1 1 0%",
              minWidth: 0,
              maxWidth: "34rem",
              fontSize: "1.25rem",
              lineHeight: 1.6,
              color: "rgba(74,68,60,.82)",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              transition: `transform .7s ${EASE}, opacity .7s ${EASE}`,
              transitionDelay: "200ms",
            }}
          >
            The 29 rules of Guru Jambheshwar come down through the Shabadwani, his 120 shabads. Renderings and groupings vary between sources &mdash; the four categories below are our own, arranged to show how far the rules reach into ordinary life.
          </p>
        </div>

        {compact && <div style={{ marginTop: "1.75rem" }}>{readAllCta}</div>}

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
            transitionDelay: "350ms",
          }}
        >
          {numberedGroups.map((group, i) => {
            const isOpen = i === openIndex;
            const open = () => {
              setOpenIndex(i);
              if (compact) {
                requestAnimationFrame(() => {
                  const el = panelRefs.current[i];
                  if (!el) return;
                  const HEADER_OFFSET = 80;
                  const top =
                    el.getBoundingClientRect().top +
                    window.pageYOffset -
                    HEADER_OFFSET;
                  window.scrollTo({ top, behavior: "smooth" });
                });
              }
            };

            return (
              <section
                key={group.label}
                ref={(el) => { panelRefs.current[i] = el; }}
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
