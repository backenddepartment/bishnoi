"use client";

import { useEffect, useRef, useState } from "react";

interface AboutProps {
  onScrollTo?: (id: string) => void;
  introReady?: boolean;
}

const HEADLINE = "India's Original Environmentalists";

export default function About({ onScrollTo }: AboutProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [canHover, setCanHover] = useState(false);
  const [typedCount, setTypedCount] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const timeoutRef = useRef<number | undefined>(undefined);
  const intervalRef = useRef<number | undefined>(undefined);

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
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // On a touch device there's no hover to type on, so the headline still
  // needs a fallback trigger — same probe as Portfolio.tsx/MirrorHall.tsx.
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover)");
    const sync = () => setCanHover(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Types the headline out like a keyboard, one character per tick, restarting
  // from scratch each time it's called. Skips straight to the full title for
  // prefers-reduced-motion, since this is a JS-driven reveal that the global
  // CSS animation kill-switch can't touch.
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
  // to typing it once the section scrolls into view. Deferred a tick so the
  // effect body itself never calls setState synchronously.
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
      id="about"
      ref={sectionRef}
      onMouseEnter={() => canHover && typeHeadline()}
      style={{ background: "#fff" }}
    >
      <div className="shell grid grid-cols-1 lg:grid-cols-12" style={{ alignItems: "flex-start", gap: "3rem", paddingBlock: "5rem" }}>
        {/* Headline & Paragraph */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }} className="lg:col-span-12">
          <h2 id="about-h2" aria-label={HEADLINE} style={{ fontSize: "3.25rem", fontWeight: 600, lineHeight: 1.15, letterSpacing: "-.02em" }}>
            <span aria-hidden="true">{HEADLINE.slice(0, typedCount)}</span>
            <span className="typing-cursor" aria-hidden="true" />
          </h2>

          <p
            style={{
              fontSize: "1.3125rem",
              lineHeight: 1.6,
              color: "rgba(74,68,60,.75)",
              maxWidth: "56rem",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              transition: "transform 0.7s cubic-bezier(.22,1,.36,1), opacity 0.7s cubic-bezier(.22,1,.36,1)",
              transitionDelay: "450ms",
            }}
          >
            For more than 500 years, the Bishnoi community of Rajasthan has lived by 29 simple rules: protect every tree, protect every animal, live in balance with the desert. In 1730, 363 Bishnois gave their lives defending trees at Khejarli — decades before the word &ldquo;environmentalism&rdquo; existed. Today, the community still guards the Thar Desert&rsquo;s wildlife with the same conviction.
          </p>

          <ul
            id="about-stats"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "2.5rem",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              transition: "transform 0.7s cubic-bezier(.22,1,.36,1), opacity 0.7s cubic-bezier(.22,1,.36,1)",
              transitionDelay: "550ms",
            }}
          >
            <li>
              <div style={{ fontSize: "2.5rem", fontWeight: 700, color: "#356B3F", letterSpacing: "-.02em", lineHeight: 1 }}>1485</div>
              <div style={{ marginTop: ".375rem", fontSize: ".8125rem", color: "rgba(74,68,60,.6)" }}>Founding year (AD)</div>
            </li>
            <li>
              <div style={{ fontSize: "2.5rem", fontWeight: 700, color: "#356B3F", letterSpacing: "-.02em", lineHeight: 1 }}>29</div>
              <div style={{ marginTop: ".375rem", fontSize: ".8125rem", color: "rgba(74,68,60,.6)" }}>Guiding principles</div>
            </li>
            <li>
              <div style={{ fontSize: "2.5rem", fontWeight: 700, color: "#356B3F", letterSpacing: "-.02em", lineHeight: 1 }}>363</div>
              <div style={{ marginTop: ".375rem", fontSize: ".8125rem", color: "rgba(74,68,60,.6)" }}>Lives given at Khejarli</div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
