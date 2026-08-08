"use client";

import { useEffect, useRef, useState } from "react";

interface FooterProps {
  onOpenRequestModal: () => void;
  introReady: boolean;
}

export default function Footer({ onOpenRequestModal, introReady }: FooterProps) {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = footerRef.current;
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
    <footer ref={footerRef} style={{ position: "relative", overflow: "hidden", borderRadius: "2rem 2rem 0 0", background: "#0a0a0a", color: "#fff" }}>
      <div className="shell" style={{ position: "relative", zIndex: 10, padding: "5rem 1.25rem 2.5rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem", borderBottom: "1px solid rgba(255,255,255,.1)", paddingBottom: "4rem" }}>
          <h2 style={{ maxWidth: "20ch", fontSize: "2.25rem", fontWeight: 600, letterSpacing: "-.02em" }}>
            <span className={`reveal-line ${isVisible ? "visible" : ""}`}>
              <span className="line-inner">Rooted in five hundred years.</span>
            </span>
            <span className={`reveal-line ${isVisible ? "visible" : ""}`}>
              <span className="line-inner">Building for what comes next.</span>
            </span>
          </h2>
          <button className="pill-btn" onClick={onOpenRequestModal}>
            <span className="pill-inner pill-light pill-with-arrow">
              Connect with us <span className="pill-badge up-right">↗</span>
            </span>
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "3rem", paddingBlock: "4rem" }}>
          <div>
            <span style={{ fontSize: "1.125rem", fontWeight: 600, display: "flex", alignItems: "center", gap: ".5rem" }}>
              <span style={{ color: "#cf8047", fontSize: "1.25rem" }}>★</span> Bishnoi Omniverse LLP
            </span>
            <p style={{ maxWidth: "20rem", fontSize: ".875rem", color: "rgba(255,255,255,.55)", marginTop: ".5rem", lineHeight: 1.5 }}>
              A diversified group spanning pharmaceuticals, hydroponics, dairy and social impact — guided by a conservation philosophy older than most nations.
            </p>
          </div>

          <div>
            <div style={{ fontSize: ".75rem", textTransform: "uppercase", letterSpacing: ".025em", color: "rgba(255,255,255,.4)" }}>Organization</div>
            <ul style={{ marginTop: ".75rem", fontSize: ".875rem", display: "flex", flexDirection: "column", gap: ".5rem" }}>
              <li>
                <a className="animated-link legal" href="#about">
                  <span>Who We Are</span>
                </a>
              </li>
              <li>
                <a className="animated-link legal" href="#works">
                  <span>Businesses</span>
                </a>
              </li>
              <li>
                <a className="animated-link legal" href="#stats-panel">
                  <span>Vision & Mission</span>
                </a>
              </li>
              <li>
                <button className="animated-link legal" onClick={onOpenRequestModal}>
                  <span>Contact</span>
                </button>
              </li>
            </ul>
          </div>

          <div>
            <div style={{ fontSize: ".75rem", textTransform: "uppercase", letterSpacing: ".025em", color: "rgba(255,255,255,.4)" }}>Divisions</div>
            <ul style={{ marginTop: ".75rem", fontSize: ".875rem", display: "flex", flexDirection: "column", gap: ".5rem" }}>
              <li>
                <a className="animated-link legal" href="#works">
                  <span>Pharmaceuticals</span>
                </a>
              </li>
              <li>
                <a className="animated-link legal" href="#works">
                  <span>Hydroponics</span>
                </a>
              </li>
              <li>
                <a className="animated-link legal" href="#works">
                  <span>Dairy</span>
                </a>
              </li>
              <li>
                <a className="animated-link legal" href="#works">
                  <span>Social Impact</span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div style={{ fontSize: ".75rem", textTransform: "uppercase", letterSpacing: ".025em", color: "rgba(255,255,255,.4)" }}>Heritage</div>
            <ul style={{ marginTop: ".75rem", fontSize: ".875rem", display: "flex", flexDirection: "column", gap: ".5rem" }}>
              <li>
                <a className="animated-link legal" href="#about">
                  <span>Khejarli Movement</span>
                </a>
              </li>
              <li>
                <a className="animated-link legal" href="#about">
                  <span>Environmental Ethics</span>
                </a>
              </li>
              <li>
                <a className="animated-link legal" href="#about">
                  <span>Conservation Legacy</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem", borderTop: "1px solid rgba(255,255,255,.1)", paddingTop: "2rem", fontSize: ".75rem", color: "rgba(255,255,255,.45)" }}>
          <span>© {new Date().getFullYear()} Bishnoi Omniverse LLP. All rights reserved.</span>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <a className="animated-link legal" href="#">
              <span>Privacy Policy</span>
            </a>
            <a className="animated-link legal" href="#">
              <span>Terms of Stewardship</span>
            </a>
          </div>
        </div>
      </div>

      <div style={{ position: "absolute", insetInline: 0, bottom: "-1.5rem", zIndex: 0, textAlign: "center", pointerEvents: "none", userSelect: "none", fontWeight: 700, lineHeight: 1, fontSize: "var(--text-watermark)", color: "#ffffff", mixBlendMode: "difference", opacity: 0.1 }}>
        BISHNOI
      </div>
    </footer>
  );
}
