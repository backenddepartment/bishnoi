"use client";

import { useEffect, useRef, useState } from "react";

interface BandsProps {
  introReady: boolean;
}

export default function Bands({ introReady }: BandsProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  const bands = [
    { label: "Stewardship", bg: "#F7F3E8", color: "#4A443C" },
    { label: "Restraint", bg: "linear-gradient(to bottom right,#F36B21,#C2521A)", color: "#fff" },
    { label: "→", bg: "#173F2A", color: "#fff", isArrow: true },
    { label: "Enterprise", bg: "rgba(247,243,232,.6)", color: "rgba(74,68,60,.5)" },
  ];

  return (
    <section ref={sectionRef} style={{ background: "#fff" }}>
      <ul className="shell" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", paddingBlock: "2.5rem" }}>
        {bands.map((band, idx) => (
          <li
            key={idx}
            className="band-item"
            style={{
              flex: 1,
              transform: isVisible ? "translateY(0)" : "translateY(36px)",
              opacity: isVisible ? 1 : 0,
              transition: "transform 0.7s cubic-bezier(.16,1,.3,1), opacity 0.7s cubic-bezier(.16,1,.3,1)",
              transitionDelay: `${idx * 120}ms`,
            }}
          >
            <span
              className="hover-scale-103"
              style={{
                display: "grid",
                placeItems: "center",
                height: "6rem",
                borderRadius: "9999px",
                fontSize: band.isArrow ? "2.25rem" : "1.875rem",
                fontWeight: 500,
                background: band.bg,
                color: band.color,
              }}
            >
              {band.label}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
