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
        {/* Quote Block without container */}
        <p
          style={{
            fontSize: "clamp(1.25rem, 2vw, 1.625rem)",
            fontStyle: "italic",
            lineHeight: 1.5,
            color: "var(--ink-soft)",
            margin: 0,
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(16px)",
            transition: `transform .6s ${EASE}, opacity .6s ${EASE}`,
          }}
        >
          &ldquo;For the Bishnoi, nature is not a resource to be managed; it is a sacred trust. A faith born in the desert, written in 29 rules, and proven with 363 lives.&rdquo;
        </p>

        {/* Eyebrow + headline, full width */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div className="eyebrow eyebrow-dark" style={{ fontSize: "1.125rem" }}>
            <span className="dot dot-blink"></span> The Founder
          </div>
          <h2
            style={{
              fontSize: "3rem",
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: "-.02em",
              maxWidth: "22ch",
              color: "#2E2822",
            }}
          >
            The Man Who Answered a<br />Drought With 29 Rules
          </h2>
        </div>

        {/* Biography inside green container */}
        <div
          ref={cardRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
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
