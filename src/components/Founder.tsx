"use client";

import { useEffect, useRef, useState } from "react";

interface FounderProps {
  introReady?: boolean;
}

const EASE = "cubic-bezier(.22,1,.36,1)";

export default function Founder({}: FounderProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      document.documentElement.style.setProperty("--founder-card-height", `${el.getBoundingClientRect().height}px`);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <section
      id="founder"
      ref={sectionRef}
      style={{ background: "#fff" }}
    >
      <div className="shell" style={{ paddingTop: "2rem", paddingBottom: "5rem", display: "flex", flexDirection: "column", gap: "3.5rem" }}>
        {/* Eyebrow + headline (left) / quote (right, smaller) */}
        <div className="grid grid-cols-1 lg:grid-cols-12" style={{ alignItems: "flex-start", gap: "2.5rem" }}>
          <div className="lg:col-span-6 xl:col-span-5" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div className="eyebrow eyebrow-dark" style={{ fontSize: "1.125rem" }}>
              <span className="dot dot-blink"></span> 1485 &middot; Guru Jambheshwar
            </div>
            <h2
              style={{
                fontSize: "clamp(1.875rem, 2.8vw, 2.375rem)",
                fontWeight: 700,
                lineHeight: 1.15,
                letterSpacing: "-.02em",
                color: "#2E2822",
              }}
            >
              {/* Nowrap only from lg: up — the exact two-line break is a
                  desktop design choice; on mobile each line just wraps
                  normally so it can't overflow a narrow viewport. */}
              <span className="block lg:whitespace-nowrap">The Man Who Answered a</span>
              <span className="block lg:whitespace-nowrap">Drought With 29 Rules</span>
            </h2>

            <div>
              <a href="/bishnoi/guru-jambheshwar" className="pill-btn">
                <span className="pill-inner pill-outline pill-with-arrow" style={{ borderColor: "rgba(74,68,60,0.25)", background: "rgba(74,68,60,0.04)", color: "var(--ink)" }}>
                  Guru Jambheshwar, 1451&ndash;1536 <span className="pill-badge" style={{ background: "#F36B21", color: "#2A1206" }}>→</span>
                </span>
              </a>
            </div>
          </div>

          <div
            className="lg:col-span-6 xl:col-span-7"
            style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", paddingLeft: "2rem" }}
          >
            <p
              className="founder-quote"
              style={{
                fontSize: "1.25rem",
                fontStyle: "italic",
                lineHeight: 1.65,
                color: "var(--ink-soft)",
                maxWidth: "46ch",
                margin: 0,
                marginTop: "1.5rem",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(16px)",
                transition: `transform .6s ${EASE}, opacity .6s ${EASE}`,
              }}
            >
              &ldquo;For the Bishnoi, nature is not a resource to be managed; it is a sacred trust. A faith born in the desert, written in 29 rules, and proven with 363 lives.&rdquo;
            </p>
          </div>
        </div>

        {/* Biography inside green container */}
        <div
          ref={cardRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 founder-green-box"
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: "2rem",
            background: "var(--brand-heritage)",
            padding: "clamp(2rem, 4vw, 3.5rem)",
            fontSize: "1.25rem",
            lineHeight: 1.65,
            color: "rgba(247,243,232,.9)",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: `transform .7s ${EASE}, opacity .7s ${EASE}`,
            transitionDelay: "200ms",
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "20rem",
              height: "16rem",
              zIndex: 0,
              backgroundImage: "radial-gradient(rgba(247,243,232,.45) 2.5px, transparent 2.5px)",
              backgroundSize: "26px 26px",
              WebkitMaskImage: "radial-gradient(ellipse at 0% 0%, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 78%)",
              maskImage: "radial-gradient(ellipse at 0% 0%, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 78%)",
              opacity: isVisible ? 1 : 0,
              transition: `opacity 1s ${EASE}`,
              transitionDelay: "400ms",
              pointerEvents: "none",
            }}
          />

          <p style={{ position: "relative", zIndex: 1 }}>
            In 1485, a devastating drought swept across the Thar Desert in Rajasthan. Crops failed, cattle perished, and human survival was pushed to the brink. It was during this crisis that Guru Jambheshwar, known to his followers as Jambhoji, revealed 29 rules designed to restore environmental balance and preserve life in the desert.
          </p>
          <p style={{ position: "relative", zIndex: 1 }}>
            Of the 29 rules, 8 are dedicated specifically to preserving biodiversity and animal husbandry — prohibiting the cutting of green trees, banning the killing of animals, and mandating compassionate care for all living creatures. The community took the name Bishnoi (from &apos;Beesh&apos; = twenty, and &apos;Noi&apos; = nine) to honor these 29 rules, which have guided their way of life for over five centuries.
          </p>
        </div>
      </div>
    </section>
  );
}
