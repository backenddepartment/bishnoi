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
    <footer ref={footerRef} style={{ position: "relative", overflow: "hidden", borderRadius: "2rem 2rem 0 0", background: "linear-gradient(158deg,#2E2822 0%,#1C1815 100%)", color: "#fff" }}>
      <div className="shell" style={{ position: "relative", zIndex: 10, padding: "5rem 1.25rem 2.5rem" }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "2rem", borderBottom: "1px solid rgba(247,243,232,.1)", paddingBottom: "4rem" }}>
          <h2 style={{ maxWidth: "20ch", fontSize: "2.25rem", fontWeight: 600, letterSpacing: "-.02em" }}>
            <span className={`reveal-line ${isVisible ? "visible" : ""}`}>
              <span className="line-inner">Rooted in five hundred years.</span>
            </span>
            <span className={`reveal-line ${isVisible ? "visible" : ""}`}>
              <span className="line-inner">Building for what comes next.</span>
            </span>
          </h2>
          <button className="pill-btn" onClick={onOpenRequestModal}>
            <span className="pill-inner pill-accent pill-with-arrow" style={{ boxShadow: "0 8px 24px rgba(243,107,33,0.3)" }}>
              Connect with us <span className="pill-badge up-right">↗</span>
            </span>
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "3rem", paddingBlock: "4rem" }}>
          <div>
            <span style={{ fontSize: "1.125rem", fontWeight: 600, display: "flex", alignItems: "center", gap: ".5rem" }}>
              <span style={{ color: "#F36B21", fontSize: "1.25rem" }}>★</span> Bishnoi
            </span>
            <p style={{ maxWidth: "20rem", fontSize: ".875rem", color: "rgba(247,243,232,.55)", marginTop: ".5rem", lineHeight: 1.5 }}>
              A diversified group spanning pharmaceuticals, hydroponics, dairy and social impact — guided by a conservation philosophy older than most nations.
            </p>
          </div>

          <div>
            <div style={{ fontSize: ".75rem", textTransform: "uppercase", letterSpacing: ".025em", color: "rgba(247,243,232,.4)" }}>Organization</div>
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
            <div style={{ fontSize: ".75rem", textTransform: "uppercase", letterSpacing: ".025em", color: "rgba(247,243,232,.4)" }}>Getmeds Ecosystem</div>
            <ul style={{ marginTop: ".75rem", fontSize: ".875rem", display: "flex", flexDirection: "column", gap: ".5rem" }}>
              <li><a className="animated-link legal" href="https://getmeds.ph" target="_blank" rel="noreferrer"><span>getmeds.ph (Philippines)</span></a></li>
              <li><a className="animated-link legal" href="https://getmedshealthcare.com" target="_blank" rel="noreferrer"><span>getmedshealthcare.com (India)</span></a></li>
              <li><a className="animated-link legal" href="https://getmedsvanuatu.com" target="_blank" rel="noreferrer"><span>getmedsvanuatu.com (Vanuatu)</span></a></li>
              <li><a className="animated-link legal" href="https://getmedslatom.com" target="_blank" rel="noreferrer"><span>getmedslatom.com (Latam)</span></a></li>
              <li><a className="animated-link legal" href="https://getmedssea.com" target="_blank" rel="noreferrer"><span>getmedssea.com (SEA)</span></a></li>
            </ul>
          </div>

          <div>
            <div style={{ fontSize: ".75rem", textTransform: "uppercase", letterSpacing: ".025em", color: "rgba(247,243,232,.4)" }}>Corporate Hubs</div>
            <ul style={{ marginTop: ".75rem", fontSize: ".875rem", display: "flex", flexDirection: "column", gap: ".5rem" }}>
              <li><a className="animated-link legal" href="https://bishnoi-omniverse.in" target="_blank" rel="noreferrer"><span>bishnoi-omniverse.in (India)</span></a></li>
              <li><a className="animated-link legal" href="https://bishnoi-omniverse.ph" target="_blank" rel="noreferrer"><span>bishnoi-omniverse.ph (Philippines)</span></a></li>
            </ul>
          </div>

          <div>
            <div style={{ fontSize: ".75rem", textTransform: "uppercase", letterSpacing: ".025em", color: "rgba(247,243,232,.4)" }}>Foundation & Office</div>
            <ul style={{ marginTop: ".75rem", fontSize: ".875rem", display: "flex", flexDirection: "column", gap: ".5rem" }}>
              <li><a className="animated-link legal" href="https://nbf.com" target="_blank" rel="noreferrer"><span>nbf.com (N. Bishnoi Foundation)</span></a></li>
              <li><a className="animated-link legal" href="https://nkb.com" target="_blank" rel="noreferrer"><span>nkb.com (N. K. Bishnoi Office)</span></a></li>
            </ul>
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem", borderTop: "1px solid rgba(247,243,232,.1)", paddingTop: "2rem", fontSize: ".75rem", color: "rgba(247,243,232,.45)" }}>
          <span>© {new Date().getFullYear()} Bishnoi. All rights reserved.</span>
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

      <div
        style={{
          position: "absolute",
          insetInline: 0,
          bottom: "-1.5rem",
          zIndex: 0,
          textAlign: "center",
          pointerEvents: "none",
          userSelect: "none",
          fontWeight: 700,
          lineHeight: 1,
          fontSize: "var(--text-watermark)",
          background: "linear-gradient(to top, rgba(247,243,232,0.7) 0%, rgba(247,243,232,0.05) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.15) 100%)",
          maskImage: "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.15) 100%)",
          mixBlendMode: "difference",
          opacity: 0.15,
        }}
      >
        BISHNOI
      </div>
    </footer>
  );
}
