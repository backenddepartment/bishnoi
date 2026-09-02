"use client";

import { useEffect, useRef, useState } from "react";

interface MukamProps {
  introReady?: boolean;
}

const EASE = "cubic-bezier(.22,1,.36,1)";

const SHRINES = [
  {
    site: "Mukam (Muktidham)",
    location: "Nokha tehsil, Bikaner district",
    matters:
      "The community's holiest shrine — a marble temple built over Guru Jambheshwar's samadhi, enclosing the sacred khejri tree beneath which he was laid to rest.",
    image: "/mukam.jpg",
  },
  {
    site: "Samrathal Dhora",
    location: "~3 km south of Mukam, Bikaner district",
    matters: "The dune where Jambheshwar had his awakening in 1485 and preached the sermons that founded the faith.",
    image: "/samrathal%20dhora.jpg",
  },
  {
    site: "Peepasar",
    location: "Nagaur district, Rajasthan",
    matters: "His birthplace, home to an ancient khejri tree and annual Janmashtami celebrations.",
    image: "/pipasar.png",
  },
  {
    site: "Lalasar",
    location: "Southeast of Bikaner, Rajasthan",
    matters: "Where he passed away in 1536, before his body was carried to Mukam.",
    image: "/lalasar.jpg",
  },
  {
    site: "Jhambolav",
    location: "Phalodi district, Rajasthan",
    matters: "Site of an annual fair on Chaitra Amavasya, honoring the practical application of his teachings.",
    image: "/jhambolav.avif",
  },
  {
    site: "Lohawat",
    location: "Jodhpur district, Rajasthan",
    matters: "Linked to his historic meeting with a Marwar prince.",
    image: "/lohawat.jpg",
  },
  {
    site: "Janglu",
    location: "Nokha tehsil, Bikaner district",
    matters: "Home to personal relics associated with the Guru.",
    image: "/jangladesh.jpg",
  },
  {
    site: "Rotu",
    location: "Nagaur district, Rajasthan",
    matters: "One of the eight principal Ashtadham shrine sites.",
    image: "/rotu.jpeg",
  },
];

export default function Mukam({}: MukamProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

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
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="mukam"
      ref={sectionRef}
      style={{ background: "#fff" }}
    >
      {/* Reduced bottom padding — Principles follows directly below on the
          same white background, and the combined 7rem gap read as a break. */}
      <div className="shell" style={{ paddingTop: "2rem", paddingBottom: "2rem", display: "flex", flexDirection: "column", gap: "2.5rem" }}>
        {/* Eyebrow + headline (left) / intro paragraph (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12" style={{ alignItems: "flex-start", gap: "2.5rem" }}>
          <div className="lg:col-span-6 xl:col-span-5" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div className="eyebrow eyebrow-dark" style={{ fontSize: "1.125rem" }}>
              <span className="dot dot-blink"></span> Faith & The Sacred Land
            </div>
            <h2 style={{ fontSize: "3rem", fontWeight: 700, lineHeight: 1.15, letterSpacing: "-.02em", color: "#2E2822" }}>
              Mukam: The Heart of the Faith
            </h2>
          </div>

          <div
            className="lg:col-span-6 xl:col-span-7"
            style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", paddingLeft: "2rem" }}
          >
            <p
              style={{
                fontSize: "1.25rem",
                lineHeight: 1.65,
                color: "rgba(74,68,60,.82)",
                maxWidth: "46ch",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                transition: `transform .7s ${EASE}, opacity .7s ${EASE}`,
                transitionDelay: "200ms",
              }}
            >
              For Bishnois, holy sites are not distant monuments; they are living places of connection. Mukam is the central pilgrimage site — the final resting place of Guru Jambheshwar — where thousands gather twice a year to renew their vows to nature and community.
            </p>
          </div>
        </div>

        {/* Sacred Sites Cards Slider */}
        <div
          style={{
            position: "relative",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(24px)",
            transition: `transform .7s ${EASE}, opacity .7s ${EASE}`,
            transitionDelay: "350ms",
          }}
        >
          {/* Floating Left Arrow Indicator */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "0.75rem",
              top: "22%",
              transform: "translateY(-50%)",
              zIndex: 10,
              pointerEvents: "none",
              opacity: showLeftArrow ? 0.85 : 0,
              transition: "opacity 0.35s ease, transform 0.35s ease",
              background: "rgba(26, 22, 19, 0.8)",
              backdropFilter: "blur(12px)",
              color: "#ffffff",
              width: "2.25rem",
              height: "2.25rem",
              borderRadius: "9999px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </div>

          {/* Floating Right Arrow Indicator */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              right: "0.75rem",
              top: "22%",
              transform: "translateY(-50%)",
              zIndex: 10,
              pointerEvents: "none",
              opacity: showRightArrow ? 0.85 : 0,
              transition: "opacity 0.35s ease, transform 0.35s ease",
              background: "rgba(26, 22, 19, 0.8)",
              backdropFilter: "blur(12px)",
              color: "#ffffff",
              width: "2.25rem",
              height: "2.25rem",
              borderRadius: "9999px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
                <div className="ashtadham-card-img-bg">
                  <img src={row.image} alt={row.site} className="ashtadham-card-img" />
                  <div className="ashtadham-card-overlay" />
                </div>

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
