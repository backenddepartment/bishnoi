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

  // Mirrors the navbar's own item set — only dedicated pages, no in-page
  // anchors.
  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "What We Do", href: "/what-we-do" },
    { label: "Leadership", href: "/leadership/naresh-bishnoi" },
    { label: "Businesses", href: "/businesses" },
    { label: "Contact", action: () => { onClose(); onOpenRequestModal(); } },
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
          {/* Same colored logo.png as everywhere else, whitened with a
              filter — matches how the hero header renders it white instead
              of relying on a separate logowhite.png asset. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="Bishnoi Omniverse"
            style={{ height: "2.25rem", width: "auto", filter: "brightness(0) invert(1)" }}
          />
        </a>
        <button
          onClick={onClose}
          aria-label="Close navigation"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "2.5rem",
            height: "2.5rem",
            border: "1px solid rgba(247,243,232,.15)",
            borderRadius: "9999px",
            fontSize: "1rem",
            fontWeight: 500,
            color: "rgba(247,243,232,.7)",
            transition: "border .2s, color .2s",
          }}
        >
          ✕
        </button>
      </div>

      <nav className="shell" style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", paddingBlock: "2rem" }}>
        <ul style={{ display: "flex", flexDirection: "column", gap: ".25rem" }}>
          {navItems.map((item, index) => {
            const delay = 80 + index * 45;
            return (
              <li
                key={item.label}
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
                    paddingBlock: ".5rem",
                    textAlign: "left",
                    fontSize: "1.5rem",
                    fontWeight: 600,
                    letterSpacing: "-.02em",
                    width: "100%",
                    color: "rgba(247,243,232,.7)",
                    transition: "color .3s",
                  }}
                >
                  {item.label}
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
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
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
          style={{ color: "rgba(247,243,232,.7)", textAlign: "left", transition: "color .2s", whiteSpace: "nowrap" }}
        >
          Connect with us →
        </button>
      </div>
    </div>
  );
}
