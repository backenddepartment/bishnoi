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
      category: "Division 01 • Healthcare & E-Pharmacy Ecosystem",
      title: "Getmeds Healthcare Network",
      description: "Centralized global healthcare platform and pharmaceutical distribution across 5 international hubs.",
      entities: [
        { name: "Getmeds Philippines", domain: "getmeds.ph", url: "https://getmeds.ph" },
        { name: "Getmeds India", domain: "getmedshealthcare.com", url: "https://getmedshealthcare.com" },
        { name: "Getmeds Vanuatu", domain: "getmedsvanuatu.com", url: "https://getmedsvanuatu.com" },
        { name: "Getmeds Latam", domain: "getmedslatom.com", url: "https://getmedslatom.com" },
        { name: "Getmeds SEA", domain: "getmedssea.com", url: "https://getmedssea.com" },
      ],
    },
    {
      category: "Division 02 • Global Enterprise & Industrial Hubs",
      title: "Bishnoi Corporate Hubs",
      description: "Regional agritech, sustainable manufacturing, and industrial trade centers governing Asia-Pacific operations.",
      entities: [
        { name: "Bishnoi India", domain: "bishnoi-omniverse.in", url: "https://bishnoi-omniverse.in" },
        { name: "Bishnoi Philippines", domain: "bishnoi-omniverse.ph", url: "https://bishnoi-omniverse.ph" },
      ],
    },
    {
      category: "Division 03 • Philanthropy & Environmental Ethics",
      title: "Naresh Bishnoi Foundation",
      description: "Dedicated to wildlife preservation, afforestation, 29 Principles stewardship, and desert eco-restoration.",
      entities: [
        { name: "Naresh Bishnoi Foundation", domain: "nbf.com", url: "https://nbf.com" },
      ],
    },
    {
      category: "Division 04 • Strategic Holdings & Family Office",
      title: "Naresh Kumar Bishnoi Office",
      description: "Strategic investment management, non-banking financial services, and global venture holdings.",
      entities: [
        { name: "Naresh Kumar Bishnoi", domain: "nkb.com", url: "https://nkb.com" },
      ],
    },
  ];

  return (
    <section id="works" ref={sectionRef} style={{ background: "#fff" }}>
      <div className="shell" style={{ padding: "2.5rem 1.25rem 5rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", alignItems: "center", marginBottom: "3.5rem" }}>
          <div className="eyebrow">
            <span className="dot"></span> Centralized Conglomerate Holdings
          </div>
          <h2 style={{ fontSize: "2.25rem", fontWeight: 600, letterSpacing: "-.02em", textAlign: "center", width: "fit-content" }}>
            <span className={`reveal-line ${isVisible ? "visible" : ""}`}>
              <span className="line-inner">Our Operating Companies & Domains</span>
            </span>
          </h2>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "1.5rem" }}>
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
              <article
                className="hover-translate-8 hover-scale-1012"
                style={{
                  position: "relative",
                  minHeight: "24rem",
                  overflow: "hidden",
                  borderRadius: "2rem",
                  background: "#0a0a0a",
                  padding: "1.75rem",
                  color: "#fff",
                  boxShadow: "0 0 0 1px rgba(255,255,255,.05)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: ".75rem", textTransform: "uppercase", letterSpacing: ".025em", color: "rgba(255,255,255,.45)" }}>
                    <span>{biz.category}</span>
                    <span className="hover-arrow" style={{ width: "2.75rem", height: "2.75rem", display: "grid", placeItems: "center", borderRadius: "9999px", background: "rgba(255,255,255,.1)", color: "#fff", boxShadow: "0 0 0 1px rgba(255,255,255,.15)" }}>
                      ↗
                    </span>
                  </div>
                  <h3 style={{ fontSize: "1.5rem", fontWeight: 600, letterSpacing: "-.01em", marginTop: "1rem" }}>{biz.title}</h3>
                  <p style={{ marginTop: ".5rem", fontSize: ".875rem", color: "rgba(255,255,255,.65)", lineHeight: 1.5 }}>{biz.description}</p>
                </div>

                <div style={{ marginTop: "1.5rem" }}>
                  <div style={{ fontSize: ".7rem", textTransform: "uppercase", letterSpacing: ".05em", color: "rgba(255,255,255,.4)", marginBottom: ".625rem" }}>
                    Managed Companies & Central Domains ({biz.entities.length})
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: ".5rem" }}>
                    {biz.entities.map((entity) => (
                      <a
                        key={entity.domain}
                        href={entity.url}
                        target="_blank"
                        rel="noreferrer"
                        className="hover-spring-sm"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: ".375rem",
                          fontSize: ".75rem",
                          fontWeight: 500,
                          background: "rgba(255,255,255,0.08)",
                          border: "1px solid rgba(255,255,255,0.15)",
                          borderRadius: "9999px",
                          padding: ".375rem .75rem",
                          color: "#ffffff",
                          backdropFilter: "blur(6px)",
                        }}
                      >
                        <span>{entity.name}</span>
                        <span style={{ fontSize: ".65rem", color: "#cf8047" }}>({entity.domain})</span>
                      </a>
                    ))}
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
