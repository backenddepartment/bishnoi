"use client";

import { useEffect, useRef, useState } from "react";

interface ServicesProps {
  introReady: boolean;
}

export default function Services({ introReady }: ServicesProps) {
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

  const servicesList = [
    { num: "01", title: "Getmeds Healthcare Network", desc: "Phils, India, Vanuatu, Latam & SEA pharmaceutical ecosystem." },
    { num: "02", title: "Bishnoi Omniverse Corporate", desc: "Bishnoi Omniverse India & Bishnoi Omniverse Philippines hubs." },
    { num: "03", title: "Financial & Capital Division", desc: "NBF (Non-Banking Financial) & NKB Group (VMAC) capital services." },
    { num: "04", title: "History of Bishnois & Conservation", desc: "Guru Jambheshwar Bhagwan, 29 Principles & Amrita Devi Sacrifice." },
  ];

  return (
    <section id="services" ref={sectionRef} style={{ background: "#fff" }}>
      <div className="shell" style={{ padding: "5rem 1.25rem" }}>
        <div className="eyebrow eyebrow-dark">
          <span className="dot"></span>www.Bishnoi.AI Operating Tree
        </div>
        <h2 style={{ margin: "1.25rem 0 3rem", maxWidth: "18ch", fontSize: "2.25rem", fontWeight: 600, letterSpacing: "-.02em" }}>
          <span className={`reveal-line ${isVisible ? "visible" : ""}`}>
            <span className="line-inner">Core Business Divisions</span>
          </span>
        </h2>
        <ul>
          {servicesList.map((service, i) => (
            <li
              key={service.num}
              className="service-row"
              style={{
                borderTop: "1px solid #e6e5e2",
                transform: isVisible ? "translateY(0)" : "translateY(32px)",
                opacity: isVisible ? 1 : 0,
                transition: "transform 0.7s cubic-bezier(.16,1,.3,1), opacity 0.7s cubic-bezier(.16,1,.3,1)",
                transitionDelay: `${200 + i * 100}ms`,
              }}
            >
              <a
                href="#works"
                className="hover-service-fill"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  borderRadius: "1.25rem",
                  paddingBlock: "1.5rem",
                  paddingLeft: "1.5rem",
                  paddingRight: "1.5rem",
                  background: "rgba(241,240,238,0)",
                }}
              >
                <span style={{ width: "1.75rem", fontSize: ".875rem", fontWeight: 500, color: "rgba(17,17,17,.4)" }}>{service.num}</span>
                <h3 style={{ flex: 1, fontSize: "1.375rem", fontWeight: 500, letterSpacing: "-.01em" }}>{service.title}</h3>
                <p style={{ maxWidth: "22rem", fontSize: ".875rem", color: "rgba(17,17,17,.55)" }} className="hidden lg:block">
                  {service.desc}
                </p>
                <span className="hover-arrow-translate" style={{ width: "2.5rem", height: "2.5rem", display: "grid", placeItems: "center", borderRadius: "9999px", background: "#0a0a0a", color: "#fff" }}>
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
