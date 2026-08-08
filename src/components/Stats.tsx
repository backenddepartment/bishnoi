"use client";

import { useEffect, useRef, useState } from "react";

interface StatsProps {
  introReady: boolean;
}

export default function Stats({ introReady }: StatsProps) {
  const [counts, setCounts] = useState([1, 2, 3, 500]);
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef<HTMLUListElement>(null);
  const targets = [1, 2, 3, 500];

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;

    let animFrame: number;
    let started = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (!started) {
              started = true;
              const duration = 1500;
              const startTime = performance.now();

              function animate(currentTime: number) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeProgress = 1 - Math.pow(1 - progress, 3);

                setCounts(targets.map((target) => Math.round(target * easeProgress)));

                if (progress < 1) {
                  animFrame = requestAnimationFrame(animate);
                }
              }

              animFrame = requestAnimationFrame(animate);
            }
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animFrame);
    };
  }, []);

  return (
    <section style={{ background: "#fff" }}>
      <div className="shell" style={{ padding: "0 1.25rem 5rem" }}>
        <div
          id="stats-panel"
          style={{
            borderRadius: "2rem",
            background: "#0a0a0a",
            padding: "3rem 1.5rem",
            color: "#fff",
            transform: isVisible ? "translateY(0) scale(1)" : "translateY(40px) scale(.99)",
            opacity: isVisible ? 1 : 0,
            transition: "transform 0.7s cubic-bezier(.16,1,.3,1), opacity 0.7s cubic-bezier(.16,1,.3,1)",
          }}
        >
          <div className="eyebrow eyebrow-light">
            <span className="dot"></span>Vision, Mission & Values
          </div>
          <h2 style={{ marginTop: "1rem", maxWidth: "24ch", fontSize: "1.875rem", fontWeight: 500, letterSpacing: "-.01em" }}>
            <span className={`reveal-line ${isVisible ? "visible" : ""}`}>
              <span className="line-inner">Rooted in principles that endure.</span>
            </span>
          </h2>

          <ul
            ref={statsRef}
            style={{
              marginTop: "3.5rem",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              columnGap: "2rem",
              rowGap: "3rem",
            }}
          >
            <li
              className="stat-item"
              style={{
                transform: isVisible ? "translateY(0)" : "translateY(24px)",
                opacity: isVisible ? 1 : 0,
                transition: "transform 0.7s cubic-bezier(.16,1,.3,1), opacity 0.7s cubic-bezier(.16,1,.3,1)",
                transitionDelay: "200ms",
              }}
            >
              <div>
                <span className="stat-number">0{counts[0]}</span>
                <span style={{ fontSize: "1.25rem", marginLeft: ".5rem", color: "#cf8047" }}>Vision</span>
              </div>
              <div style={{ marginTop: ".75rem", fontSize: ".875rem", color: "rgba(255,255,255,.7)", lineHeight: 1.5 }}>
                To be a globally respected group that proves conservation and enterprise are not opposites — carrying a 500-year-old philosophy into new industries.
              </div>
            </li>

            <li
              className="stat-item"
              style={{
                transform: isVisible ? "translateY(0)" : "translateY(24px)",
                opacity: isVisible ? 1 : 0,
                transition: "transform 0.7s cubic-bezier(.16,1,.3,1), opacity 0.7s cubic-bezier(.16,1,.3,1)",
                transitionDelay: "300ms",
              }}
            >
              <div>
                <span className="stat-number">0{counts[1]}</span>
                <span style={{ fontSize: "1.25rem", marginLeft: ".5rem", color: "#cf8047" }}>Mission</span>
              </div>
              <div style={{ marginTop: ".75rem", fontSize: ".875rem", color: "rgba(255,255,255,.7)", lineHeight: 1.5 }}>
                To build durable businesses in medicine, agriculture and dairy that operate with the same restraint and long-term care the Bishnoi community has shown the land for centuries.
              </div>
            </li>

            <li
              className="stat-item"
              style={{
                transform: isVisible ? "translateY(0)" : "translateY(24px)",
                opacity: isVisible ? 1 : 0,
                transition: "transform 0.7s cubic-bezier(.16,1,.3,1), opacity 0.7s cubic-bezier(.16,1,.3,1)",
                transitionDelay: "400ms",
              }}
            >
              <div>
                <span className="stat-number">0{counts[2]}</span>
                <span style={{ fontSize: "1.25rem", marginLeft: ".5rem", color: "#cf8047" }}>Core Values</span>
              </div>
              <div style={{ marginTop: ".75rem", fontSize: ".875rem", color: "rgba(255,255,255,.7)", lineHeight: 1.5 }}>
                Stewardship, compassion, integrity and patience — the four core principles inherited from Guru Jambheshwar’s 29 principles of Bishnoi tradition and applied to modern business.
              </div>
            </li>

            <li
              className="stat-item"
              style={{
                transform: isVisible ? "translateY(0)" : "translateY(24px)",
                opacity: isVisible ? 1 : 0,
                transition: "transform 0.7s cubic-bezier(.16,1,.3,1), opacity 0.7s cubic-bezier(.16,1,.3,1)",
                transitionDelay: "500ms",
              }}
            >
              <div>
                <span className="stat-number">{counts[3]}</span>
                <span style={{ color: "#cf8047" }}>+</span>
                <span style={{ fontSize: "1.25rem", marginLeft: ".5rem", color: "#cf8047" }}>Years</span>
              </div>
              <div style={{ marginTop: ".75rem", fontSize: ".875rem", color: "rgba(255,255,255,.7)", lineHeight: 1.5 }}>
                Five hundred years of stewardship, environmental protection, and principled enterprise.
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
