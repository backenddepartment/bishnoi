"use client";

import { useEffect, useRef, useState } from "react";

import { businesses } from "./portfolioData";

interface HeaderProps {
  onOpenNav: () => void;
  onOpenRequestModal: () => void;
  onScrollTo: (id: string) => void;
  introReady: boolean;
}

const NAV_ITEMS = [
  { label: "Home", id: "home", current: true },
  { label: "Who We Are", id: "about" },
  { label: "Businesses", id: "works", hasDropdown: true },
  { label: "Philosophy", id: "services" },
  { label: "Vision & Mission", id: "stats-panel" },
];

const EASE = "cubic-bezier(.22,1,.36,1)";

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
      aria-hidden="true"
      style={{ display: "inline-block", transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: `transform .3s ${EASE}` }}
    >
      <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* Shared open/close behavior for the "Businesses" dropdown — hover opens it
   on hover-capable pointers, click always opens (never toggles closed, so a
   click that follows a hover doesn't immediately re-close it), and an
   outside click, Escape, or mouse-leave (with a short grace period) close it.
   `containerRef` should wrap both the trigger and the panel, since the panel
   now lives outside the trigger's own DOM subtree (it's full-width). */
function useDropdown(containerRef: React.RefObject<HTMLElement | null>) {
  const [open, setOpen] = useState(false);
  const [canHover, setCanHover] = useState(false);
  const closeTimeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover)");
    const sync = () => setCanHover(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, containerRef]);

  useEffect(() => () => window.clearTimeout(closeTimeoutRef.current), []);

  const openNow = () => {
    window.clearTimeout(closeTimeoutRef.current);
    setOpen(true);
  };
  const closeSoon = () => {
    closeTimeoutRef.current = window.setTimeout(() => setOpen(false), 150);
  };
  const hoverProps = {
    onMouseEnter: () => canHover && openNow(),
    onMouseLeave: () => canHover && closeSoon(),
  };

  return { open, openNow, hoverProps };
}

interface NavItemsProps {
  textColor: string;
  fontSize: string;
  onScrollTo: (id: string) => void;
  dropdown: ReturnType<typeof useDropdown>;
  trailing?: React.ReactNode;
}

/* The plain link list — the "Businesses" trigger only opens the dropdown
   (rendered separately, full-width, by the parent); it no longer scrolls. */
function NavItems({ textColor, fontSize, onScrollTo, dropdown, trailing }: NavItemsProps) {
  return (
    <ul style={{ display: "flex", gap: "2rem", fontSize, fontWeight: 400, color: textColor }}>
      {NAV_ITEMS.map((item) =>
        item.hasDropdown ? (
          <li key={item.id} {...dropdown.hoverProps}>
            <button
              className="hover-lift"
              style={{ color: textColor, display: "inline-flex", alignItems: "center", gap: ".4rem" }}
              aria-haspopup="true"
              aria-expanded={dropdown.open}
              onClick={dropdown.openNow}
            >
              {item.label}
              <ChevronIcon open={dropdown.open} />
            </button>
          </li>
        ) : (
          <li key={item.id}>
            <button className="hover-lift" style={{ color: textColor }} aria-current={item.current ? "page" : undefined} onClick={() => onScrollTo(item.id)}>
              {item.label}
            </button>
          </li>
        )
      )}
      {trailing}
    </ul>
  );
}

interface BusinessesPanelProps {
  dropdown: ReturnType<typeof useDropdown>;
  onScrollTo: (id: string) => void;
}

/* Full-width mega-menu — matches the navbar's own width exactly and sits
   flush against its bottom edge, no gap, no shadow. */
function BusinessesPanel({ dropdown }: BusinessesPanelProps) {
  const getLinkStyle = (delay: number) => ({
    display: "block",
    position: "relative" as const,
    padding: "0.75rem 1rem",
    borderRadius: "0.75rem",
    color: "var(--ink)",
    fontSize: "1.15rem",
    fontWeight: 600,
    opacity: dropdown.open ? 1 : 0,
    transform: dropdown.open ? "translateY(0)" : "translateY(12px)",
    transition: "opacity 0.5s cubic-bezier(.22, 1, .36, 1), transform 0.5s cubic-bezier(.22, 1, .36, 1), background-color 0.2s",
    transitionDelay: dropdown.open ? `${delay}ms` : "0ms",
  });

  return (
    <div
      role="menu"
      aria-hidden={!dropdown.open}
      {...dropdown.hoverProps}
      style={{
        position: "absolute",
        insetInline: 0,
        top: "100%",
        background: "#fff",
        borderBottom: "1px solid #E6DECB",
        borderBottomLeftRadius: "var(--radius-card, 2rem)",
        borderBottomRightRadius: "var(--radius-card, 2rem)",
        overflow: "hidden",
        opacity: dropdown.open ? 1 : 0,
        visibility: dropdown.open ? "visible" : "hidden",
        transform: dropdown.open ? "translateY(0)" : "translateY(-20px)",
        transition: "opacity 0.6s cubic-bezier(.16, 1, .3, 1), transform 0.6s cubic-bezier(.16, 1, .3, 1), visibility 0.6s",
        pointerEvents: dropdown.open ? "auto" : "none",
        zIndex: 80,
      }}
    >
      <div className="shell" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: "2rem", padding: "2rem 3.25rem" }}>
        {/* Column 1: Healthcare */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <a
            href="https://getmeds.ph"
            target="_blank"
            rel="noreferrer"
            className="hover-underline-slide"
            style={getLinkStyle(100)}
          >
            Getmeds Philippines
          </a>
          <a
            href="https://getmedshealthcare.com"
            target="_blank"
            rel="noreferrer"
            className="hover-underline-slide"
            style={getLinkStyle(150)}
          >
            Getmeds India
          </a>
          <a
            href="https://getmedsvanuatu.com"
            target="_blank"
            rel="noreferrer"
            className="hover-underline-slide"
            style={getLinkStyle(200)}
          >
            Getmeds Vanuatu
          </a>
          <a
            href="https://getmedslatom.com"
            target="_blank"
            rel="noreferrer"
            className="hover-underline-slide"
            style={getLinkStyle(250)}
          >
            Getmeds Latam
          </a>
          <a
            href="https://getmedssea.com"
            target="_blank"
            rel="noreferrer"
            className="hover-underline-slide"
            style={getLinkStyle(300)}
          >
            Getmeds SEA
          </a>
        </div>

        {/* Column 2: Omniverse */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <a
            href="https://bishnoi-omniverse.in"
            target="_blank"
            rel="noreferrer"
            className="hover-underline-slide"
            style={getLinkStyle(150)}
          >
            Bishnoi Omniverse India
          </a>
          <a
            href="https://bishnoi-omniverse.ph"
            target="_blank"
            rel="noreferrer"
            className="hover-underline-slide"
            style={getLinkStyle(200)}
          >
            Bishnoi Omniverse Philippines
          </a>
        </div>

        {/* Column 3: Foundations & Offices */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <a
            href="https://nbf.com"
            target="_blank"
            rel="noreferrer"
            className="hover-underline-slide"
            style={getLinkStyle(200)}
          >
            Naresh Bishnoi Foundation
          </a>
          <a
            href="https://nkb.com"
            target="_blank"
            rel="noreferrer"
            className="hover-underline-slide"
            style={getLinkStyle(250)}
          >
            Naresh Kumar Bishnoi Office
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Header({ onOpenRequestModal, onScrollTo, introReady }: HeaderProps) {
  // A second, fixed navbar that slides in with the colored logo once the
  // hero (with its own white/absolute header) has scrolled out of view —
  // and stays pinned regardless of scroll direction, so the two never
  // overlap but the sticky nav is always available past the hero.
  const [stickyVisible, setStickyVisible] = useState(false);

  const heroHeaderRef = useRef<HTMLElement>(null);
  const stickyHeaderRef = useRef<HTMLElement>(null);
  const heroDropdown = useDropdown(heroHeaderRef);
  const stickyDropdown = useDropdown(stickyHeaderRef);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const heroHeight = window.innerHeight;

      if (y > heroHeight * 0.6) setStickyVisible(true);
      else if (y <= heroHeight * 0.3) setStickyVisible(false);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        id="header"
        ref={heroHeaderRef}
        style={{
          position: "absolute",
          insetInline: 0,
          top: 0,
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1.5rem",
          padding: "2rem 3.25rem",
          opacity: introReady ? 1 : 0,
          transform: introReady ? "translateY(0)" : "translateY(-14px)",
          transition: "opacity 0.7s cubic-bezier(.22,1,.36,1), transform 0.7s cubic-bezier(.22,1,.36,1)",
          color: "#ffffff",
          textShadow: "0 2px 6px rgba(0,0,0,.8)",
        }}
      >
        {/* Plain white + drop-shadow instead of mix-blend-mode: difference —
            difference shifts hue against colored (e.g. sunset-toned) hero
            photos instead of staying white, which read as a gray cast. A drop
            shadow keeps it legible without touching its actual color. */}
        <button className="hover-spring-sm" onClick={() => onScrollTo("home")} style={{ display: "flex", alignItems: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logowhite.png"
            alt="Bishnoi Omniverse"
            style={{ height: "3.5rem", width: "auto", filter: "drop-shadow(0 2px 6px rgba(0,0,0,.8))" }}
          />
        </button>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1.5rem", flex: 1 }}>
          <nav className="hidden lg:flex">
            <NavItems
              textColor="#ffffff"
              fontSize="1rem"
              onScrollTo={onScrollTo}
              dropdown={heroDropdown}
              trailing={
                <li>
                  <button className="hover-lift" style={{ color: "#ffffff" }} onClick={onOpenRequestModal}>
                    Contact
                  </button>
                </li>
              }
            />
          </nav>
        </div>

        <BusinessesPanel dropdown={heroDropdown} onScrollTo={onScrollTo} />
      </header>

      {/* Sticky navbar — colored logo, plain white bar, appears only when
          scrolling up past the hero. */}
      <header
        ref={stickyHeaderRef}
        style={{
          position: "fixed",
          insetInline: 0,
          top: 0,
          zIndex: 55,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1.5rem",
          padding: ".75rem 3.25rem",
          background: "#ffffff",
          boxShadow: "none",
          transform: stickyVisible ? "translateY(0)" : "translateY(-100%)",
          transition: `transform .4s ${EASE}`,
        }}
      >
        <button className="hover-spring-sm" onClick={() => onScrollTo("home")} style={{ display: "flex", alignItems: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Bishnoi Omniverse" style={{ height: "2.25rem", width: "auto" }} />
        </button>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1.5rem", flex: 1 }}>
          <nav className="hidden lg:flex">
            <NavItems textColor="var(--ink)" fontSize="1.0625rem" onScrollTo={onScrollTo} dropdown={stickyDropdown} />
          </nav>
        </div>

        <button className="pill-btn" onClick={onOpenRequestModal}>
          <span className="pill-inner pill-accent pill-no-arrow" style={{ fontSize: ".875rem", padding: ".5rem 1.5rem", color: "#ffffff" }}>
            Contact
          </span>
        </button>

        <BusinessesPanel dropdown={stickyDropdown} onScrollTo={onScrollTo} />
      </header>
    </>
  );
}
