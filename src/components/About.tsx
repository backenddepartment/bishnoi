"use client";

import { useEffect, useRef, useState } from "react";

interface AboutProps {
  onScrollTo: (id: string) => void;
  introReady: boolean;
}

export default function About({ onScrollTo }: AboutProps) {
  const headlineWords = ["A", "modern", "group,", "an", "ancient", "discipline."];
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

  return (
    <section id="about" ref={sectionRef} style={{ background: "#fff" }}>
      <div className="shell" style={{ display: "grid", gridTemplateColumns: "1fr", alignItems: "flex-start", gap: "3rem", padding: "5rem 1.25rem" }}>
        <div style={{ position: "relative", minHeight: "14rem" }}>
          <span style={{ position: "absolute", left: "-1rem", top: "50%", transform: "translateY(-50%)", fontSize: "12rem", color: "rgba(17,17,17,.06)", pointerEvents: "none", userSelect: "none" }}>
            🌱
          </span>
          <div className="eyebrow eyebrow-dark" style={{ position: "relative" }}>
            <span className="dot"></span>Who We Are
          </div>
          <div
            id="about-globe-text"
            style={{
              position: "relative",
              marginTop: "2rem",
              display: "flex",
              flexDirection: "column",
              gap: ".5rem",
              fontSize: ".875rem",
              color: "rgba(17,17,17,.7)",
              maxWidth: "24rem",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              transition: "transform 0.7s cubic-bezier(.22,1,.36,1), opacity 0.7s cubic-bezier(.22,1,.36,1)",
              transitionDelay: "150ms",
            }}
          >
            <p style={{ fontStyle: "italic", borderLeft: "2px solid #b15f2c", paddingLeft: "1rem", color: "rgba(17,17,17,.8)", lineHeight: 1.5 }}>
              "In 1730, Amrita Devi Bishnoi and 363 others gave their lives embracing sacred Khejri trees to stop them being felled — one of the earliest recorded environmental movements in human history."
            </p>
            <span style={{ fontSize: ".75rem", fontWeight: 500, color: "rgba(17,17,17,.5)", paddingLeft: "1rem" }}>
              — The Khejarli sacrifice, Rajasthan
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          <h2 id="about-h2" style={{ fontSize: "2.25rem", fontWeight: 600, lineHeight: 1.2, letterSpacing: "-.02em" }}>
            {headlineWords.map((word, i) => (
              <span
                key={`hw-${i}`}
                className={`reveal-word ${isVisible ? "visible" : ""}`}
                style={{ marginRight: ".4rem", transitionDelay: `${200 + i * 60}ms` }}
              >
                <span className="word-inner">{word}</span>
              </span>
            ))}
          </h2>

          <p
            style={{
              fontSize: "1.0625rem",
              lineHeight: 1.6,
              color: "rgba(17,17,17,.75)",
              maxWidth: "42rem",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              transition: "transform 0.7s cubic-bezier(.22,1,.36,1), opacity 0.7s cubic-bezier(.22,1,.36,1)",
              transitionDelay: "450ms",
            }}
          >
            Established upon the 29 principles of environmental stewardship defined by Guru Maharaj Jambheshwar in 1485 AD (Bishnoi: 20 + 9), Bishnoi Omniverse LLP brings the same principles that protected the Thar Desert’s trees and wildlife since 1730 — restraint, stewardship and long-term thinking — into pharmaceuticals, agriculture, dairy and philanthropy today.
          </p>

          <div
            id="about-footer"
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1.5rem",
              borderTop: "1px solid #e6e5e2",
              paddingTop: "1.5rem",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              transition: "transform 0.7s cubic-bezier(.22,1,.36,1), opacity 0.7s cubic-bezier(.22,1,.36,1)",
              transitionDelay: "600ms",
            }}
          >
            <div>
              <div style={{ fontSize: ".875rem", color: "rgba(17,17,17,.45)" }}>Heritage & 29 Principles</div>
              <div style={{ fontSize: ".875rem", fontWeight: 500, color: "#111", marginTop: ".25rem" }}>
                Guided by Guru Jambheshwar's 29 principles of environmental stewardship since 1485 AD
              </div>
            </div>
            <button className="pill-btn" onClick={() => onScrollTo("about")}>
              <span className="pill-inner pill-outline pill-with-arrow">
                Who we are <span className="pill-badge up-right">↗</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
