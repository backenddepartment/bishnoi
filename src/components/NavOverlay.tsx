"use client";

import { useEffect, useState } from "react";

interface NavChild {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href?: string;
  action?: () => void;
  children?: NavChild[];
}

interface NavOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onScrollTo: (id: string) => void;
  onOpenRequestModal: () => void;
}

export default function NavOverlay({ isOpen, onClose, onScrollTo, onOpenRequestModal }: NavOverlayProps) {
  const [time, setTime] = useState("9:41am");
  // Which top-level item has its sub-pages expanded. One at a time — the
  // drawer is short, and a second open group would push the rest of the nav
  // off a phone screen.
  const [expanded, setExpanded] = useState<string | null>(null);

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

  // Mirrors the navbar's own item set. The handler below scrolls a "/#"
  // href when already on /, though none of the items use one today.
  // "The Bishnois" also carries the reference pages under /bishnoi: below
  // `lg` this drawer is the whole nav, and those pages were otherwise only
  // reachable by first landing on the hub.
  const navItems: NavItem[] = [
    { label: "Home", href: "/" },
    {
      label: "The Bishnois",
      href: "/bishnoi",
      children: [
        { label: "Overview", href: "/bishnoi" },
        { label: "Guru Jambheshwar", href: "/bishnoi/guru-jambheshwar" },
        { label: "The 29 Principles", href: "/bishnoi/29-principles" },
        { label: "Amrita Devi", href: "/bishnoi/amrita-devi" },
        { label: "Khejarli", href: "/bishnoi/khejarli" },
        { label: "The name & origin", href: "/bishnoi/name-and-origin" },
      ],
    },
    { label: "Leadership", href: "/leadership/naresh-bishnoi" },
    { label: "Businesses", href: "/businesses" },
    { label: "Contact", action: () => { onClose(); onOpenRequestModal(); } },
  ];

  function navigate(href: string) {
    onClose();
    if (typeof window !== "undefined") {
      if (window.location.pathname === "/" && href.startsWith("/#")) {
        onScrollTo(href.replace("/#", ""));
      } else {
        // assign() rather than `location.href = ...` — same navigation, but
        // it isn't a write to an external binding from the component body.
        window.location.assign(href);
      }
    }
  }

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

      {/* Scrolls instead of centering rigidly — with a group expanded the
          list can outgrow a short phone viewport. */}
      <nav
        className="shell"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingBlock: "2rem",
          overflowY: "auto",
        }}
      >
        <ul style={{ display: "flex", flexDirection: "column", gap: ".25rem" }}>
          {navItems.map((item, index) => {
            const delay = 80 + index * 45;
            const isExpanded = expanded === item.label;
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
                <div style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
                  <button
                    className="nav-item"
                    onClick={() => {
                      if (item.action) {
                        item.action();
                      } else if (item.href) {
                        navigate(item.href);
                      }
                    }}
                    style={{
                      display: "flex",
                      paddingBlock: ".5rem",
                      textAlign: "left",
                      fontSize: "1.5rem",
                      fontWeight: 600,
                      letterSpacing: "-.02em",
                      flex: 1,
                      color: "rgba(247,243,232,.7)",
                      transition: "color .3s",
                    }}
                  >
                    {item.label}
                  </button>

                  {/* Kept separate from the label so the parent route stays
                      one tap away: the label goes to /bishnoi, the chevron
                      opens the pages beneath it. */}
                  {item.children && (
                    <button
                      onClick={() => setExpanded(isExpanded ? null : item.label)}
                      aria-expanded={isExpanded}
                      aria-label={`${isExpanded ? "Hide" : "Show"} ${item.label} pages`}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "2.25rem",
                        height: "2.25rem",
                        flexShrink: 0,
                        border: "1px solid rgba(247,243,232,.15)",
                        borderRadius: "9999px",
                        color: "rgba(247,243,232,.7)",
                        transition: "border .2s, color .2s",
                      }}
                    >
                      <svg
                        width="11"
                        height="7"
                        viewBox="0 0 10 6"
                        fill="none"
                        aria-hidden="true"
                        style={{
                          transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                          transition: "transform .3s cubic-bezier(.22,1,.36,1)",
                        }}
                      >
                        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  )}
                </div>

                {/* max-height rather than a display toggle, so the group
                    slides open instead of snapping. The value only has to
                    clear the real height of the list. */}
                {item.children && (
                  <ul
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: ".125rem",
                      paddingLeft: ".875rem",
                      marginLeft: ".125rem",
                      borderLeft: "1px solid rgba(247,243,232,.15)",
                      maxHeight: isExpanded ? "24rem" : 0,
                      opacity: isExpanded ? 1 : 0,
                      overflow: "hidden",
                      marginBlock: isExpanded ? ".25rem" : 0,
                      transition: "max-height .4s cubic-bezier(.22,1,.36,1), opacity .3s ease, margin .3s ease",
                    }}
                  >
                    {item.children.map((child) => (
                      <li key={child.label}>
                        <button
                          className="nav-item"
                          tabIndex={isExpanded ? 0 : -1}
                          onClick={() => navigate(child.href)}
                          style={{
                            display: "flex",
                            paddingBlock: ".4rem",
                            textAlign: "left",
                            fontSize: "1.0625rem",
                            fontWeight: 500,
                            letterSpacing: "-.01em",
                            width: "100%",
                            color: "rgba(247,243,232,.55)",
                            transition: "color .3s",
                          }}
                        >
                          {child.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
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
