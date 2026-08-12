"use client";

import { useEffect, useRef, useState } from "react";

interface MukamProps {
  introReady?: boolean;
}

const EASE = "cubic-bezier(.22,1,.36,1)";

const HEADLINE = "Mukam: The Heart of the Faith";

const SHRINES = [
  {
    site: "Mukam (Muktidham)",
    location: "Nokha tehsil, Bikaner district, Rajasthan",
    matters:
      "The community's holiest shrine — a marble temple built over Guru Jambheshwar's samadhi, enclosing the sacred khejri tree beneath which he was laid to rest.",
  },
  {
    site: "Samrathal Dhora",
    location: "~3 km south of Mukam, Bikaner district",
    matters: "The dune where Jambheshwar had his awakening in 1485 and preached the sermons that founded the faith.",
  },
  {
    site: "Peepasar",
    location: "Nagaur district, Rajasthan",
    matters: "His birthplace, home to an ancient khejri tree and annual Janmashtami celebrations.",
  },
  {
    site: "Lalasar",
    location: "Southeast of Bikaner, Rajasthan",
    matters: "Where he passed away in 1536, before his body was carried to Mukam.",
  },
  {
    site: "Jambholav",
    location: "Phalodi district, Rajasthan",
    matters: "Site of an annual fair on Chaitra Amavasya, honoring the practical application of his teachings.",
  },
  {
    site: "Lohawat",
    location: "Jodhpur district, Rajasthan",
    matters: "Linked to his historic meeting with a Marwar prince.",
  },
  {
    site: "Janglu",
    location: "Nokha tehsil, Bikaner district",
    matters: "Home to personal relics associated with the Guru.",
  },
  {
    site: "Rotu",
    location: "Nagaur district, Rajasthan",
    matters: "One of the eight principal Ashtadham shrine sites.",
  },
];

export default function Mukam({}: MukamProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [canHover, setCanHover] = useState(false);
  const [typedCount, setTypedCount] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const timeoutRef = useRef<number | undefined>(undefined);
  const intervalRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Bidirectional — fades back out on exit too, not just in on first
    // entry, so the section reads like a slide transitioning in and out.
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover)");
    const sync = () => setCanHover(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Types the headline out like a keyboard — same pattern as
  // About.tsx/Founder.tsx/Principles.tsx.
  const typeHeadline = () => {
    window.clearTimeout(timeoutRef.current);
    window.clearInterval(intervalRef.current);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTypedCount(HEADLINE.length);
      return;
    }

    setTypedCount(0);
    timeoutRef.current = window.setTimeout(() => {
      let i = 0;
      intervalRef.current = window.setInterval(() => {
        i += 1;
        setTypedCount(i);
        if (i >= HEADLINE.length) window.clearInterval(intervalRef.current);
      }, 45);
    }, 150);
  };

  useEffect(() => {
    if (canHover || !isVisible) return;
    const kickoffId = window.setTimeout(typeHeadline, 0);
    return () => {
      window.clearTimeout(kickoffId);
      window.clearTimeout(timeoutRef.current);
      window.clearInterval(intervalRef.current);
    };
  }, [isVisible, canHover]);

  useEffect(() => {
    return () => {
      window.clearTimeout(timeoutRef.current);
      window.clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <section
      id="mukam"
      ref={sectionRef}
      onMouseEnter={() => canHover && typeHeadline()}
      style={{ background: "#fff" }}
    >
      <div className="shell" style={{ paddingTop: "1.5rem", paddingBottom: "5rem", display: "flex", flexDirection: "column", gap: "2.5rem" }}>
        {/* Eyebrow + headline + intro paragraph */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div className="eyebrow eyebrow-dark" style={{ fontSize: "1.25rem" }}>
            <span className="dot dot-blink"></span> Guru Jambheshwar Bhawan
          </div>
          <h2 aria-label={HEADLINE} style={{ fontSize: "3rem", fontWeight: 600, lineHeight: 1.15, letterSpacing: "-.02em" }}>
            <span aria-hidden="true">{HEADLINE.slice(0, typedCount)}</span>
            <span className="typing-cursor" aria-hidden="true" />
          </h2>

          <p
            style={{
              fontSize: "1.3125rem",
              lineHeight: 1.6,
              color: "rgba(74,68,60,.75)",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              transition: `transform .7s ${EASE}, opacity .7s ${EASE}`,
              transitionDelay: "300ms",
            }}
          >
            The Bishnoi faith recognizes eight principal shrine sites, together known as the Ashtadham. Chief among them is Mukam &mdash; the Guru
            Jambheshwar Bhawan &mdash; in Bikaner district, where a marble temple encloses Guru Jambheshwar&rsquo;s samadhi and the sacred khejri
            tree beneath which he was laid to rest. Each year, thousands of pilgrims travel to Mukam for the community&rsquo;s largest gathering,
            held around the new moon of Bhadrapad (roughly August&ndash;September).
          </p>
        </div>

        {/* The eight Ashtadham shrine sites */}
        <div
          style={{
            overflowX: "auto",
            borderRadius: "1rem",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(24px)",
            transition: `transform .7s ${EASE}, opacity .7s ${EASE}`,
            transitionDelay: "450ms",
          }}
        >
          <table style={{ width: "100%", minWidth: "42rem", borderCollapse: "collapse", fontSize: "1.1875rem" }}>
            <thead>
              <tr>
                {["Site", "Location", "Why it matters"].map((heading, i) => (
                  <th
                    key={heading}
                    style={{
                      textAlign: "left",
                      padding: "1rem 1.25rem",
                      background: "var(--brand-heritage)",
                      color: "#F7F3E8",
                      fontSize: "1.375rem",
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                      width: i === 2 ? "auto" : "1%",
                    }}
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SHRINES.map((row) => (
                <tr key={row.site}>
                  <td style={{ padding: "1rem 1.25rem", fontSize: "1.375rem", fontWeight: 600, color: "#2A251F", verticalAlign: "top", whiteSpace: "nowrap" }}>
                    {row.site}
                  </td>
                  <td style={{ padding: "1rem 1.25rem", color: "rgba(74,68,60,.8)", verticalAlign: "top", whiteSpace: "nowrap" }}>
                    {row.location}
                  </td>
                  <td style={{ padding: "1rem 1.25rem", color: "rgba(74,68,60,.8)", verticalAlign: "top", lineHeight: 1.5 }}>{row.matters}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={3} style={{ padding: 0 }}>
                  <div aria-hidden="true" style={{ height: "4px", background: "linear-gradient(90deg, var(--brand-heritage), #ffffff)" }} />
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </section>
  );
}
