"use client";

import { useEffect, useState } from "react";

interface NavOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onScrollTo: (id: string) => void;
  onOpenRequestModal: () => void;
}

export default function NavOverlay({ isOpen, onClose, onScrollTo, onOpenRequestModal }: NavOverlayProps) {
  const [time, setTime] = useState("9:41am");

  useEffect(() => {
    function updateClock() {
      const now = new Date();
      let h = now.getHours();
      const m = now.getMinutes();
      const ampm = h >= 12 ? "pm" : "am";
      h = h % 12 || 12;
      setTime(`${h}:${String(m).padStart(2, "0")}${ampm}`);
    }
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Only dedicated pages belong here — no in-page anchors ("Legacy" at
  // /heritage#services, "Vision" at /#vision are sections, not their own page).
  const navItems = [
    { num: "01", label: "Home", href: "/" },
    { num: "02", label: "About", href: "/about" },
    { num: "03", label: "Businesses", href: "/businesses" },
    { num: "04", label: "What We Do", href: "/what-we-do" },
    { num: "05", label: "Leadership", href: "/leadership/naresh-bishnoi" },
    { num: "06", label: "Heritage", href: "/heritage" },
    { num: "07", label: "Contact", action: () => { onClose(); onOpenRequestModal(); } },
  ];

  return (
    <div
      id="nav-overlay"
      className={`nav-overlay ${isOpen ? "open" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation"
    >
      <div className="shell" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.25rem", flexShrink: 0 }}>
        <a href="/" style={{ display: "flex", alignItems: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Bishnoi Omniverse" style={{ height: "2.25rem", width: "auto" }} />
        </a>
        <button
          onClick={onClose}
          style={{
            display: "inline-flex",
            gap: ".5rem",
            border: "1px solid rgba(247,243,232,.15)",
            borderRadius: ".875rem",
            padding: ".5rem 1rem",
            fontSize: ".75rem",
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: ".05em",
            color: "rgba(247,243,232,.7)",
            transition: "border .2s, color .2s",
          }}
        >
          ✕ Close
        </button>
      </div>

      <nav className="shell" style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", paddingBlock: "2rem" }}>
        <ul style={{ display: "flex", flexDirection: "column", gap: ".25rem" }}>
          {navItems.map((item, index) => {
            const delay = 80 + index * 45;
            return (
              <li
                key={item.num}
                style={{
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? "translateY(0)" : "translateY(1rem)",
                  transition: "all .5s ease-out",
                  transitionDelay: `${delay}ms`,
                }}
              >
                <button
                  className="nav-item"
                  onClick={() => {
                    if (item.action) {
                      item.action();
                    } else if (item.href) {
                      onClose();
                      if (typeof window !== "undefined") {
                        if (window.location.pathname === "/" && item.href.startsWith("/#")) {
                          onScrollTo(item.href.replace("/#", ""));
                        } else {
                          window.location.href = item.href;
                        }
                      }
                    }
                  }}
                  style={{
                    display: "flex",
                    gap: "1rem",
                    paddingBlock: ".5rem",
                    textAlign: "left",
                    fontSize: "2.25rem",
                    fontWeight: 600,
                    letterSpacing: "-.02em",
                    width: "100%",
                    color: "rgba(247,243,232,.7)",
                    transition: "color .3s",
                  }}
                >
                  <span style={{ fontSize: "1rem", fontWeight: 400, color: "rgba(247,243,232,.3)" }}>{item.num}</span> {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div
        className="shell"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: ".75rem",
          borderTop: "1px solid rgba(247,243,232,.1)",
          padding: "1.5rem 1.25rem",
          fontSize: ".75rem",
          textTransform: "uppercase",
          letterSpacing: ".025em",
          color: "rgba(247,243,232,.45)",
          flexShrink: 0,
        }}
      >
        <span id="nav-clock">Local time — {time}</span>
        <button
          onClick={() => {
            onClose();
            onOpenRequestModal();
          }}
          style={{ color: "rgba(247,243,232,.7)", textAlign: "left", transition: "color .2s" }}
        >
          Connect with us →
        </button>
      </div>
    </div>
  );
}
