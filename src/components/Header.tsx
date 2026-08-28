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
  { label: "Who We Are", id: "about", href: "/#about" },
  { label: "Legacy", id: "services", href: "/#services" },
  { label: "Vision", id: "vision", href: "/#vision" },
  { label: "Businesses", id: "works", href: "/businesses", hasDropdown: true },
];

const EASE = "cubic-bezier(.22,1,.36,1)";

/* Hamburger trigger for the mobile/tablet nav drawer — only ever rendered
   below the `lg` breakpoint (the desktop nav in `NavItems` takes over at
   `lg` and up), so it never has to coexist with the full inline nav. */
function MenuIcon() {
  return (
    <svg width="22" height="16" viewBox="0 0 22 16" fill="none" aria-hidden="true">
      <path d="M1 1H21M1 8H21M1 15H21" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

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
  fontWeight?: number;
  onScrollTo: (id: string) => void;
  dropdown: ReturnType<typeof useDropdown>;
  trailing?: React.ReactNode;
}

function NavItems({ textColor, fontSize, fontWeight = 400, onScrollTo, dropdown, trailing }: NavItemsProps) {
  return (
    <ul style={{ display: "flex", gap: "2rem", fontSize, fontWeight, color: textColor, transition: "color .35s ease" }}>
      {NAV_ITEMS.map((item) => (
        <li key={item.id} {...(item.hasDropdown ? dropdown.hoverProps : {})}>
          <a
            href={item.href}
            className="hover-lift"
            style={{
              color: textColor,
              fontWeight,
              display: "inline-flex",
              alignItems: "center",
              gap: ".4rem",
              transition: "color .35s ease",
            }}
            onClick={(e) => {
              if (item.id === "works" || item.href === "/businesses") {
                return; // Direct browser navigation to /businesses
              }
              if (typeof window !== "undefined" && window.location.pathname === "/") {
                e.preventDefault();
                onScrollTo(item.id);
              }
            }}
          >
            {item.label}
            {item.hasDropdown && <ChevronIcon open={dropdown.open} />}
          </a>
        </li>
      ))}
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
  // Slow, deliberate cascade — each row stacks in well after the last
  // (ROW_STEP) and each column starts slightly behind the one before it
  // (COL_STEP), so the whole panel reads as a gentle diagonal stack rather
  // than everything popping in at once.
  const ROW_STEP = 130;
  const COL_STEP = 90;
  const BASE_DELAY = 150;
  const linkDelay = (col: number, row: number) => BASE_DELAY + col * COL_STEP + row * ROW_STEP;

  const getLinkStyle = (col: number, row: number) => ({
    display: "block",
    position: "relative" as const,
    padding: "0.75rem 1rem",
    borderRadius: "0.75rem",
    color: "var(--ink)",
    fontSize: "1.15rem",
    fontWeight: 600,
    opacity: dropdown.open ? 1 : 0,
    transform: dropdown.open ? "translateY(0)" : "translateY(18px)",
    transition: "opacity 0.75s cubic-bezier(.16, 1, .3, 1), transform 0.75s cubic-bezier(.16, 1, .3, 1), background-color 0.2s",
    transitionDelay: dropdown.open ? `${linkDelay(col, row)}ms` : "0ms",
  });

  return (
    // Rounded bottom corners are meant to cut away to whatever's behind the
    // panel (the hero photo, on the hero header) — that's the natural look
    // of a floating rounded card, not a bug. A solid backer here would just
    // paint an ugly flat white patch over that curve, so there isn't one.
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
        // The hero header sets a white-on-photo text-shadow for legibility;
        // as an inherited property it otherwise bleeds onto this panel's
        // dark text on a white background, reading as smudged/blurry type.
        textShadow: "none",
      }}
    >
      <div
        className="shell"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0,1.2fr) repeat(3, minmax(0,1fr))",
          gap: "2rem",
          padding: "2rem 3.25rem",
        }}
      >
        {/* Intro column — heading + short description, mirrors the linked
            navigation columns to its right. */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: ".75rem",
            paddingRight: "2rem",
            borderRight: "1px solid #E6DECB",
            opacity: dropdown.open ? 1 : 0,
            transform: dropdown.open ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.6s cubic-bezier(.16, 1, .3, 1), transform 0.6s cubic-bezier(.16, 1, .3, 1)",
            transitionDelay: dropdown.open ? "80ms" : "0ms",
          }}
        >
          <span style={{ fontSize: "2rem", fontWeight: 700, color: "var(--brand-orange)" }}>Businesses</span>
          <p style={{ fontSize: "1.1875rem", lineHeight: 1.65, color: "var(--ink-soft)" }}>
            Five hundred years of Bishnoi discipline, carried into healthcare, industry, philanthropy and family office holdings across borders.
            Each division below runs independently, yet answers to the same founding principles.
          </p>
        </div>

        {/* Column 1: Healthcare */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <a
            href="https://getmeds.ph"
            target="_blank"
            rel="noreferrer"
            className="hover-underline-slide"
            style={getLinkStyle(0, 0)}
          >
            Getmeds Philippines
          </a>
          <a
            href="https://getmedshealthcare.com"
            target="_blank"
            rel="noreferrer"
            className="hover-underline-slide"
            style={getLinkStyle(0, 1)}
          >
            Getmeds India
          </a>
          <a
            href="https://getmedsvanuatu.com"
            target="_blank"
            rel="noreferrer"
            className="hover-underline-slide"
            style={getLinkStyle(0, 2)}
          >
            Getmeds Vanuatu
          </a>
          <a
            href="https://getmedslatom.com"
            target="_blank"
            rel="noreferrer"
            className="hover-underline-slide"
            style={getLinkStyle(0, 3)}
          >
            Getmeds Latam
          </a>
          <a
            href="https://getmedssea.com"
            target="_blank"
            rel="noreferrer"
            className="hover-underline-slide"
            style={getLinkStyle(0, 4)}
          >
            Getmeds SEA
          </a>
          <a
            href="https://2mginc.com/"
            target="_blank"
            rel="noreferrer"
            className="hover-underline-slide"
            style={getLinkStyle(0, 5)}
          >
            2MG Incorporated
          </a>
        </div>

        {/* Column 2: Omniverse */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <a
            href="https://bishnoi-omniverse.in"
            target="_blank"
            rel="noreferrer"
            className="hover-underline-slide"
            style={getLinkStyle(1, 0)}
          >
            Bishnoi Omniverse India
          </a>
          <a
            href="https://bishnoi-omniverse.ph"
            target="_blank"
            rel="noreferrer"
            className="hover-underline-slide"
            style={getLinkStyle(1, 1)}
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
            style={getLinkStyle(2, 0)}
          >
            Naresh Bishnoi Foundation
          </a>
          <a
            href="https://nkb.com"
            target="_blank"
            rel="noreferrer"
            className="hover-underline-slide"
            style={getLinkStyle(2, 1)}
          >
            Naresh Kumar Bishnoi Office
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Header({ onOpenNav, onOpenRequestModal, onScrollTo, introReady }: HeaderProps) {
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
          // White bg + orange links only kick in once the Businesses dropdown
          // is open (hover or click on that one nav item) — not on hovering
          // the navbar generally — so the bar visually matches the white
          // mega-menu it's about to open beneath it.
          background: heroDropdown.open ? "#ffffff" : "transparent",
          color: heroDropdown.open ? "var(--brand-orange)" : "#ffffff",
          textShadow: heroDropdown.open ? "none" : "0 2px 6px rgba(0,0,0,.8)",
          transition:
            "opacity 0.7s cubic-bezier(.22,1,.36,1), transform 0.7s cubic-bezier(.22,1,.36,1), background-color .35s ease, color .35s ease",
        }}
      >
        {/* Plain white + drop-shadow instead of mix-blend-mode: difference —
            difference shifts hue against colored (e.g. sunset-toned) hero
            photos instead of staying white, which read as a gray cast. A drop
            shadow keeps it legible without touching its actual color. Always
            the same colored logo.png — the white-in-hero look comes from a
            filter (brightness(0) invert(1) crushes any color to solid white
            while preserving transparency) instead of a separate pre-made
            white asset, so there's one source image to keep in sync. When
            the Businesses dropdown opens, the bar goes white, so the logo
            drops the filter (and the shadow it no longer needs) to show its
            real colors instead. */}
        <a href="/" className="hover-spring-sm" style={{ display: "flex", alignItems: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="Bishnoi Omniverse"
            style={{
              height: "3.5rem",
              width: "auto",
              filter: heroDropdown.open
                ? "none"
                : "brightness(0) invert(1) drop-shadow(0 2px 6px rgba(0,0,0,.8))",
              transition: "filter .35s ease",
            }}
          />
        </a>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1.5rem", flex: 1 }}>
          <nav className="hidden lg:flex">
            <NavItems
              textColor={heroDropdown.open ? "var(--brand-orange)" : "#ffffff"}
              fontSize="1rem"
              fontWeight={heroDropdown.open ? 600 : 400}
              onScrollTo={onScrollTo}
              dropdown={heroDropdown}
              trailing={
                <li>
                  <button
                    className="hover-lift"
                    style={{
                      color: heroDropdown.open ? "var(--brand-orange)" : "#ffffff",
                      fontWeight: heroDropdown.open ? 600 : 400,
                      transition: "color .35s ease",
                    }}
                    onClick={onOpenRequestModal}
                  >
                    Contact
                  </button>
                </li>
              }
            />
          </nav>
        </div>

        {/* Mobile/tablet nav trigger — the inline `nav` above is `hidden`
            below `lg`, so this is the only way to reach NavOverlay there. */}
        <button
          className="hover-spring-sm flex lg:hidden"
          aria-label="Open menu"
          onClick={onOpenNav}
          style={{
            alignItems: "center",
            justifyContent: "center",
            padding: ".625rem",
            color: heroDropdown.open ? "var(--brand-orange)" : "#ffffff",
            transition: "color .35s ease",
          }}
        >
          <MenuIcon />
        </button>

        <BusinessesPanel dropdown={heroDropdown} onScrollTo={onScrollTo} />
      </header>

      {/* Sticky navbar — colored logo, plain white bar, appears only when
          scrolling up past the hero. */}
      <header
        id="sticky-nav"
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
        {/* Extra left clearance below `lg` only — the hamburger has its own
            button padding giving it breathing room from the edge, but the
            logo had none, so it read tighter against the edge in comparison.
            `lg:ml-0` keeps desktop exactly as it was. */}
        <a
          href="/"
          className="hover-spring-sm ml-2 lg:ml-0"
          style={{ display: "flex", alignItems: "center" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Bishnoi Omniverse" style={{ height: "2.25rem", width: "auto" }} />
        </a>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1.5rem", flex: 1 }}>
          <nav className="hidden lg:flex">
            <NavItems textColor="var(--ink)" fontSize="1.0625rem" onScrollTo={onScrollTo} dropdown={stickyDropdown} />
          </nav>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
          {/* Mobile/tablet nav trigger — mirrors the hero header's; the
              inline `nav` above is `hidden` below `lg`. */}
          <button
            className="hover-spring-sm flex lg:hidden"
            aria-label="Open menu"
            onClick={onOpenNav}
            style={{ alignItems: "center", justifyContent: "center", padding: ".625rem", color: "var(--ink)" }}
          >
            <MenuIcon />
          </button>

          {/* Hidden below `lg` — Contact is already reachable from the
              NavOverlay this hamburger opens, so showing it here too would
              be a redundant second button. Wrapped in its own span rather
              than putting `hidden` directly on the button: `.pill-btn`'s own
              `display: inline-block` (globals.css, loaded after Tailwind's
              utilities) wins the display tie-break on the same element and
              would silently cancel `hidden`. */}
          <span className="hidden lg:inline-block">
            <button className="pill-btn" onClick={onOpenRequestModal}>
              <span className="pill-inner pill-accent pill-no-arrow" style={{ fontSize: ".875rem", padding: ".5rem 1.5rem", color: "#ffffff" }}>
                Contact
              </span>
            </button>
          </span>
        </div>

        <BusinessesPanel dropdown={stickyDropdown} onScrollTo={onScrollTo} />
      </header>
    </>
  );
}
