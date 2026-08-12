"use client";

import { useEffect, useRef, useState } from "react";

interface MukamProps {
  introReady?: boolean;
}

const EASE = "cubic-bezier(.22,1,.36,1)";

const HEADLINE = "Mukam: The Heart of the Faith";

const SHRINES = [
  {
    site: "Mukam (Muktidham)",
    location: "Nokha tehsil, Bikaner district, Rajasthan",
    matters:
      "The community's holiest shrine — a marble temple built over Guru Jambheshwar's samadhi, enclosing the sacred khejri tree beneath which he was laid to rest.",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=800&auto=format&fit=crop",
  },
  {
    site: "Samrathal Dhora",
    location: "~3 km south of Mukam, Bikaner district",
    matters: "The dune where Jambheshwar had his awakening in 1485 and preached the sermons that founded the faith.",
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=800&auto=format&fit=crop",
  },
  {
    site: "Peepasar",
    location: "Nagaur district, Rajasthan",
    matters: "His birthplace, home to an ancient khejri tree and annual Janmashtami celebrations.",
    image: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=800&auto=format&fit=crop",
  },
  {
    site: "Lalasar",
    location: "Southeast of Bikaner, Rajasthan",
    matters: "Where he passed away in 1536, before his body was carried to Mukam.",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=800&auto=format&fit=crop",
  },
  {
    site: "Jambholav",
    location: "Phalodi district, Rajasthan",
    matters: "Site of an annual fair on Chaitra Amavasya, honoring the practical application of his teachings.",
    image: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?q=80&w=800&auto=format&fit=crop",
  },
  {
    site: "Lohawat",
    location: "Jodhpur district, Rajasthan",
    matters: "Linked to his historic meeting with a Marwar prince.",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=800&auto=format&fit=crop",
  },
  {
    site: "Janglu",
    location: "Nokha tehsil, Bikaner district",
    matters: "Home to personal relics associated with the Guru.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
  },
  {
    site: "Rotu",
    location: "Nagaur district, Rajasthan",
    matters: "One of the eight principal Ashtadham shrine sites.",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800&auto=format&fit=crop",
  },
];

export default function Mukam({}: MukamProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [canHover, setCanHover] = useState(false);
  const [typedCount, setTypedCount] = useState(0);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | undefined>(undefined);
  const intervalRef = useRef<number | undefined>(undefined);

  const updateScrollIndicators = () => {
    if (!sliderRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
    setShowLeftArrow(scrollLeft > 15);
    setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 15);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    setIsMouseDown(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeftState(sliderRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    sliderRef.current.scrollLeft = scrollLeftState - walk;
    updateScrollIndicators();
  };

  const handleMouseUpOrLeave = () => {
    setIsMouseDown(false);
  };

  useEffect(() => {
    const handleResize = () => updateScrollIndicators();
    window.addEventListener("resize", handleResize);
    updateScrollIndicators();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover)");
    const sync = () => setCanHover(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Types the headline out like a keyboard — same pattern as
  // About.tsx/Founder.tsx/Principles.tsx.
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
      id="mukam"
      ref={sectionRef}
      onMouseEnter={() => canHover && typeHeadline()}
      style={{ background: "#fff" }}
    >
      <div className="shell" style={{ paddingTop: "1.5rem", paddingBottom: "5rem", display: "flex", flexDirection: "column", gap: "2.5rem" }}>
        {/* Eyebrow + headline + intro paragraph */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div className="eyebrow eyebrow-dark" style={{ fontSize: "1.25rem" }}>
            <span className="dot dot-blink"></span> Guru Jambheshwar Bhawan
          </div>
          <h2 aria-label={HEADLINE} style={{ fontSize: "3rem", fontWeight: 600, lineHeight: 1.15, letterSpacing: "-.02em" }}>
            <span aria-hidden="true">{HEADLINE.slice(0, typedCount)}</span>
            <span className="typing-cursor" aria-hidden="true" />
          </h2>

          <p
            style={{
              fontSize: "1.3125rem",
              lineHeight: 1.6,
              color: "rgba(74,68,60,.75)",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              transition: `transform .7s ${EASE}, opacity .7s ${EASE}`,
              transitionDelay: "300ms",
            }}
          >
            The Bishnoi faith recognizes eight principal shrine sites, together known as the Ashtadham. Chief among them is Mukam &mdash; the Guru
            Jambheshwar Bhawan &mdash; in Bikaner district, where a marble temple encloses Guru Jambheshwar&rsquo;s samadhi and the sacred khejri
            tree beneath which he was laid to rest. Each year, thousands of pilgrims travel to Mukam for the community&rsquo;s largest gathering,
            held around the new moon of Bhadrapad (roughly August&ndash;September).
          </p>
        </div>

        {/* The eight Ashtadham shrine sites zero-gap side-by-side card row with floating indicators */}
        <div
          style={{
            position: "relative",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(24px)",
            transition: `transform .7s ${EASE}, opacity .7s ${EASE}`,
            transitionDelay: "450ms",
          }}
        >
          {/* Floating Left Drag Indicator (fades out at start, fades in when scrolled right) */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "1rem",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              pointerEvents: "none",
              opacity: showLeftArrow ? 0.75 : 0,
              transition: "opacity 0.35s ease, transform 0.35s ease",
              background: "rgba(26, 22, 19, 0.75)",
              backdropFilter: "blur(12px)",
              color: "#ffffff",
              padding: "0.5rem 1rem",
              borderRadius: "9999px",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.8125rem",
              fontWeight: 600,
              boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>Drag</span>
          </div>

          {/* Floating Right "See more" Indicator (fades out when reached the right end) */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              right: "1rem",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              pointerEvents: "none",
              opacity: showRightArrow ? 0.75 : 0,
              transition: "opacity 0.35s ease, transform 0.35s ease",
              background: "rgba(26, 22, 19, 0.75)",
              backdropFilter: "blur(12px)",
              color: "#ffffff",
              padding: "0.5rem 1.125rem",
              borderRadius: "9999px",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.8125rem",
              fontWeight: 600,
              boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
            }}
          >
            <span>See more</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>

          <div
            ref={sliderRef}
            className="ashtadham-scroll-row"
            onScroll={updateScrollIndicators}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            style={{
              cursor: isMouseDown ? "grabbing" : "grab",
              userSelect: isMouseDown ? "none" : "auto",
            }}
          >
            {SHRINES.map((row) => (
              <div key={row.site} className="ashtadham-card">
                {/* Image Background (animates upwards to engulf full card height on hover) */}
                <div className="ashtadham-card-img-bg">
                  <img src={row.image} alt={row.site} className="ashtadham-card-img" />
                  <div className="ashtadham-card-overlay" />
                </div>

                {/* Text Content Overlay (negative contrast blend effect on hover) */}
                <div className="ashtadham-card-content">
                  <h4 className="ashtadham-card-title">
                    {row.site}
                  </h4>
                  <div className="ashtadham-card-location">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>{row.location}</span>
                  </div>
                  <div className="ashtadham-card-divider" />
                  <p className="ashtadham-card-desc">
                    {row.matters}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
