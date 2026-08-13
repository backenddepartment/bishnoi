"use client";

import { useEffect, useRef, useState } from "react";

interface AboutProps {
  onScrollTo?: (id: string) => void;
  introReady?: boolean;
}

const HEADLINE = "India's Original\nEnvironmentalists";

const STATS = [
  { value: "1485", label: "Year the faith was founded" },
  { value: "29", label: "Guiding principles" },
  { value: "363", label: "Lives given at Khejarli, 1730\n" },
];

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

    // Bidirectional — fades back out on exit too, not just in on first
    // entry, so the section reads like a slide transitioning in and out.
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
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
      <div className="shell" style={{ display: "flex", flexDirection: "column", gap: "3.5rem", paddingBlock: "5rem" }}>
        {/* Headline & Paragraph */}
        <div className="grid grid-cols-1 lg:grid-cols-12" style={{ alignItems: "flex-start", gap: "2rem" }}>
          <div className="lg:col-span-6 xl:col-span-5" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div id="about-eyebrow" className="eyebrow eyebrow-dark" style={{ fontSize: "1.25rem" }}>
              <span className="dot dot-blink"></span> The Bishnoi
            </div>
            <h2
              id="about-h2"
              aria-label={HEADLINE.replace("\n", " ")}
              className="break-words"
              style={{ fontSize: "3rem", fontWeight: 600, lineHeight: 1.15, letterSpacing: "-.02em" }}
            >
              <span aria-hidden="true">
                {HEADLINE.slice(0, typedCount)
                  .split("\n")
                  .map((line, i, arr) => (
                    <span key={i}>
                      {line}
                      {i < arr.length - 1 && <br />}
                    </span>
                  ))}
              </span>
              <span className="typing-cursor" aria-hidden="true" />
            </h2>
          </div>

          <p
            id="about-p"
            className="lg:col-span-6 xl:col-span-7"
            style={{
              fontSize: "1.3125rem",
              lineHeight: 1.6,
              color: "rgba(74,68,60,.75)",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              transition: "transform 0.7s cubic-bezier(.22,1,.36,1), opacity 0.7s cubic-bezier(.22,1,.36,1)",
              transitionDelay: "450ms",
            }}
          >
            For more than 500 years, the Bishnoi community of Rajasthan has lived by 29 simple rules: protect every tree, protect every animal, live in balance with the desert. In 1730, 363 Bishnois gave their lives defending trees at Khejarli — decades before the word &ldquo;environmentalism&rdquo; existed. Today, the community still guards the Thar Desert&rsquo;s wildlife with the same conviction.
          </p>
        </div>

        {/* Stats — stacked horizontally along the bottom, sliding in one after another */}
        <ul
          id="about-stats"
          className="flex-col sm:flex-row flex-wrap"
          style={{
            display: "flex",
            borderTop: "1px solid rgba(74,68,60,.15)",
            paddingTop: "2.5rem",
          }}
        >
          {STATS.map((stat, i) => (
            <li
              key={stat.label}
              className={`py-6 sm:py-0 ${i < STATS.length - 1 ? "border-b sm:border-b-0 sm:border-r" : ""}`}
              style={{
                flex: "1 1 0",
                minWidth: "12rem",
                textAlign: "center",
                paddingInline: "1.5rem",
                borderColor: "rgba(74,68,60,.15)",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateX(0)" : "translateX(48px)",
                transition: "transform 0.7s cubic-bezier(.22,1,.36,1), opacity 0.7s cubic-bezier(.22,1,.36,1)",
                transitionDelay: `${550 + i * 150}ms`,
              }}
            >
              <div style={{ fontSize: "3.25rem", fontWeight: 700, color: "#F36B21", letterSpacing: "-.02em", lineHeight: 1 }}>{stat.value}</div>
              <div style={{ marginTop: ".625rem", fontSize: "1.125rem", color: "rgba(74,68,60,.6)" }}>{stat.label}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
