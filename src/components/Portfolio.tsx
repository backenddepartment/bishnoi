"use client";

import { useEffect, useRef, useState } from "react";

interface PortfolioProps {
  introReady: boolean;
}

export default function Portfolio({ introReady }: PortfolioProps) {
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
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const businesses = [
    {
      category: "Division 01 • Getmeds Ecosystem",
      title: "Getmeds Healthcare Network",
      description: "Global healthcare and pharmaceutical distribution spanning Getmeds Philippines, India, Vanuatu, Latam & Southeast Asia (SEA).",
      tags: ["Getmeds Phils", "India", "Vanuatu", "Latam", "SEA"],
    },
    {
      category: "Division 02 • Corporate Hubs",
      title: "Bishnoi Omniverse Group",
      description: "Global enterprise operations, agritech and sustainable business hubs across Bishnoi Omniverse India & Bishnoi Omniverse Philippines.",
      tags: ["Bishnoi Omniverse India", "Bishnoi Omniverse Phils"],
    },
    {
      category: "Division 03 • Strategic Holdings",
      title: "Financial & Capital Division",
      description: "Non-Banking Financial (NBF) capital services and strategic holdings under NKB Group (VMAC).",
      tags: ["NBF Financial", "NKB Group", "VMAC Capital"],
    },
    {
      category: "Division 04 • Heritage Foundation",
      title: "History of Bishnois & Conservation Impact",
      description: "Environmental stewardship honoring Guru Jambheshwar Bhagwan, the 29 Principles, and the sacred 1730 Amrita Devi sacrifice.",
      tags: ["Guru Jambheshwar Bhagwan", "29 Principles", "Amrita Devi Sacrifice"],
    },
  ];

  return (
    <section id="works" ref={sectionRef} style={{ background: "#fff" }}>
      <div className="shell" style={{ padding: "2.5rem 1.25rem 5rem" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: ".5rem", marginBottom: "2.5rem" }}>
          <div className="eyebrow eyebrow-dark" style={{ border: "1px solid #e6e5e2", borderRadius: "9999px", padding: ".375rem 1rem" }}>
            <span className="dot"></span>www.Bishnoi.AI • Global Corporate Ecosystem
          </div>
          <h2 style={{ fontSize: "2.25rem", fontWeight: 600, letterSpacing: "-.02em", textAlign: "center", width: "fit-content" }}>
            <span className={`reveal-line ${isVisible ? "visible" : ""}`}>
              <span className="line-inner">Our Businesses</span>
            </span>
          </h2>
        </div>

        <ul style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.5rem" }}>
          {businesses.map((biz, i) => (
            <li
              key={biz.title}
              className="portfolio-item"
              style={{
                transform: isVisible ? "translateY(0)" : "translateY(56px)",
                opacity: isVisible ? 1 : 0,
                transition: "transform 0.7s cubic-bezier(.16,1,.3,1), opacity 0.7s cubic-bezier(.16,1,.3,1)",
                transitionDelay: `${150 + i * 110}ms`,
              }}
            >
              <a href="#services">
                <article
                  className="hover-translate-8 hover-scale-1012"
                  style={{
                    position: "relative",
                    minHeight: "22rem",
                    overflow: "hidden",
                    borderRadius: "2rem",
                    background: "#0a0a0a",
                    padding: "1.5rem",
                    color: "#fff",
                    boxShadow: "0 0 0 1px rgba(255,255,255,.05)",
                    display: "block",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: ".75rem", textTransform: "uppercase", letterSpacing: ".025em", color: "rgba(255,255,255,.45)" }}>
                    <span>{biz.category}</span>
                    <span className="hover-arrow" style={{ width: "2.75rem", height: "2.75rem", display: "grid", placeItems: "center", borderRadius: "9999px", background: "rgba(255,255,255,.1)", color: "#fff", boxShadow: "0 0 0 1px rgba(255,255,255,.15)" }}>
                      ↗
                    </span>
                  </div>
                  <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", pointerEvents: "none" }}>
                    <span style={{ fontSize: "4.5rem", color: "rgba(255,255,255,.9)" }}>
                      ★<sup style={{ fontSize: ".75rem", color: "rgba(255,255,255,.6)" }}>®</sup>
                    </span>
                  </div>
                  <div style={{ position: "absolute", insetInline: "1.5rem", bottom: "1.5rem" }}>
                    <h3 style={{ fontSize: "1.5rem", fontWeight: 500, letterSpacing: "-.01em" }}>{biz.title}</h3>
                    <p style={{ marginTop: ".5rem", maxWidth: "28rem", fontSize: ".875rem", color: "rgba(255,255,255,.55)" }}>{biz.description}</p>
                    <div style={{ marginTop: "1.25rem", display: "flex", flexWrap: "wrap", gap: ".5rem" }}>
                      {biz.tags.map((tag) => (
                        <span key={tag} className="tag-chip">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
