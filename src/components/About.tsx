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
      <div className="shell grid grid-cols-1 lg:grid-cols-12" style={{ alignItems: "flex-start", gap: "3rem", padding: "5rem 1.25rem" }}>
        {/* Left Side: Headline & Paragraph */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }} className="lg:col-span-7">
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
            Established upon the 29 principles of environmental stewardship defined by Guru Maharaj Jambheshwar in 1485 AD (Bishnoi: 20 + 9), Bishnoi brings the same principles that protected the Thar Desert’s trees and wildlife since 1730 — restraint, stewardship and long-term thinking — into pharmaceuticals, agriculture, dairy and philanthropy today.
          </p>
        </div>

        {/* Right Side: Who We Are & Quote Glass Card */}
        <div style={{ position: "relative", minHeight: "14rem" }} className="lg:col-span-5">
          <span style={{ position: "absolute", right: "-1rem", top: "50%", transform: "translateY(-50%)", fontSize: "12rem", color: "rgba(17,17,17,.06)", pointerEvents: "none", userSelect: "none" }}>
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
              background: "#f9f8f6",
              border: "1px solid #e6e5e2",
              borderRadius: "1.5rem",
              padding: "1.75rem",
              boxShadow: "0 8px 30px rgba(0,0,0,0.04)",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              transition: "transform 0.7s cubic-bezier(.22,1,.36,1), opacity 0.7s cubic-bezier(.22,1,.36,1)",
              transitionDelay: "150ms",
            }}
          >
            <p style={{ fontStyle: "italic", borderLeft: "3px solid #b15f2c", paddingLeft: "1rem", color: "rgba(17,17,17,.85)", lineHeight: 1.6, fontSize: ".9375rem" }}>
              "In 1730, Amrita Devi Bishnoi and 363 others gave their lives embracing sacred Khejri trees to stop them being felled — one of the earliest recorded environmental movements in human history."
            </p>
            <span style={{ fontSize: ".75rem", fontWeight: 600, color: "#b15f2c", paddingLeft: "1rem", marginTop: ".5rem" }}>
              — The Khejarli sacrifice, Rajasthan (1730 AD)
            </span>
          </div>
        </div>

        {/* Full-Width Bottom Bar Spread Side-by-Side */}
        <div
          id="about-footer"
          className="col-span-full w-full"
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            gap: "1.5rem",
            borderTop: "1px solid #e6e5e2",
            paddingTop: "1.75rem",
            marginTop: "1rem",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "transform 0.7s cubic-bezier(.22,1,.36,1), opacity 0.7s cubic-bezier(.22,1,.36,1)",
            transitionDelay: "600ms",
          }}
        >
          <div>
            <div style={{ fontSize: ".875rem", color: "rgba(17,17,17,.45)", textTransform: "uppercase", letterSpacing: ".025em" }}>Heritage & 29 Principles</div>
            <div style={{ fontSize: ".9375rem", fontWeight: 500, color: "#111", marginTop: ".25rem" }}>
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
    </section>
  );
}
