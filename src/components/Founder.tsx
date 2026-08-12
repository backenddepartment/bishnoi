"use client";

import { useEffect, useRef, useState } from "react";

interface FounderProps {
  introReady?: boolean;
}

const EASE = "cubic-bezier(.22,1,.36,1)";

const HEADLINE = "The Man Who Answered a\nDrought With 29 Rules";

export default function Founder({}: FounderProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [compact, setCompact] = useState(false);
  const [canHover, setCanHover] = useState(false);
  const [typedCount, setTypedCount] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
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

  // Publishes this container's live rendered height as a CSS custom
  // property, so other sections (PortfolioStack) can size themselves to
  // genuinely match it at whatever width the page is viewed at, instead of
  // a single guessed rem value that only held true at one screen size.
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      // getBoundingClientRect (not entry.contentRect, which excludes padding)
      // so this matches the card's true rendered box height.
      document.documentElement.style.setProperty("--founder-card-height", `${el.getBoundingClientRect().height}px`);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const sync = () => setCompact(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // On a touch device there's no hover to type on, so the headline still
  // needs a fallback trigger — same probe as About.tsx/Portfolio.tsx.
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
  // CSS animation kill-switch can't touch. Same pattern as About.tsx.
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
      id="founder"
      ref={sectionRef}
      onMouseEnter={() => canHover && typeHeadline()}
      style={{ background: "#fff" }}
    >
      <div className="shell" style={{ paddingTop: "1.5rem", paddingBottom: "5rem", display: "flex", flexDirection: "column", gap: "3rem" }}>
        {/* Eyebrow + headline, full width up top */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div className="eyebrow eyebrow-dark" style={{ fontSize: "1.25rem" }}>
            <span className="dot dot-blink"></span> The Founder
          </div>
          <h2
            aria-label={HEADLINE.replace("\n", " ")}
            style={{
              fontSize: "3rem",
              fontWeight: 600,
              lineHeight: 1.15,
              letterSpacing: "-.02em",
              maxWidth: "22ch",
            }}
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

        {/* Bottom: the biography, in three paragraphs, inside a green container */}
        <div
          ref={cardRef}
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: "2rem",
            background: "var(--brand-heritage)",
            padding: compact ? "2.25rem" : "3rem 3.5rem",
            display: "grid",
            gridTemplateColumns: compact ? "1fr" : "repeat(3, 1fr)",
            gap: compact ? "1.5rem" : "2.5rem",
            fontSize: "1.3125rem",
            lineHeight: 1.6,
            color: "rgba(247,243,232,.85)",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: `transform .7s ${EASE}, opacity .7s ${EASE}`,
            transitionDelay: "250ms",
          }}
        >
          {/* Dotted grid, fading in from the top-left corner */}
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
              transitionDelay: "500ms",
              pointerEvents: "none",
            }}
          />

          {/* Dotted grid, fading in from the bottom-right corner */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: "20rem",
              height: "16rem",
              zIndex: 0,
              backgroundImage: "radial-gradient(rgba(247,243,232,.45) 2.5px, transparent 2.5px)",
              backgroundSize: "26px 26px",
              WebkitMaskImage: "radial-gradient(ellipse at 100% 100%, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 78%)",
              maskImage: "radial-gradient(ellipse at 100% 100%, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 78%)",
              opacity: isVisible ? 1 : 0,
              transition: `opacity 1s ${EASE}`,
              transitionDelay: "600ms",
              pointerEvents: "none",
            }}
          />

          <p style={{ position: "relative", zIndex: 1 }}>
            Guru Jambheshwar — also known as Jambhoji — was born in 1451 in Peepasar, a village in Nagaur district, Rajasthan. The only child of
            Lohat Panwar and Hansa Devi, he spent his early years as a quiet, introspective child and 27 years tending cattle, an upbringing that
            gave him an intimate understanding of the desert and its scarcity of water, trees, and grazing land.
          </p>
          <p style={{ position: "relative", zIndex: 1 }}>
            In 1485, amid a severe multi-year drought, 34-year-old Jambheshwar experienced a spiritual awakening at a dune called Samrathal Dhora.
            There he founded the Bishnoi Panth and spent the next 51 years teaching across the region. His words were preserved as 120 devotional
            hymns — the Shabadwani — which remain the scripture of the faith today.
          </p>
          <p style={{ position: "relative", zIndex: 1 }}>
            He passed away in 1536 at Lalasar, and his body was carried to Mukam, where his memorial still stands as the community&rsquo;s most
            sacred site.
          </p>
        </div>
      </div>
    </section>
  );
}
