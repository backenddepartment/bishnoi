"use client";

import { useEffect, useState } from "react";

interface HeaderProps {
  onOpenNav: () => void;
  onOpenRequestModal: () => void;
  onScrollTo: (id: string) => void;
  introReady: boolean;
}

export default function Header({ onOpenNav, onOpenRequestModal, onScrollTo, introReady }: HeaderProps) {
  const [time, setTime] = useState("9:41am");
  const [date, setDate] = useState("12 March, 2025");

  useEffect(() => {
    function updateClock() {
      const now = new Date();
      let h = now.getHours();
      const m = now.getMinutes();
      const ampm = h >= 12 ? "pm" : "am";
      h = h % 12 || 12;
      const formattedTime = `${h}:${String(m).padStart(2, "0")}${ampm}`;
      const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      const formattedDate = `${now.getDate()} ${months[now.getMonth()]}, ${now.getFullYear()}`;

      setTime(formattedTime);
      setDate(formattedDate);
    }

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header
      id="header"
      className="shell"
      style={{
        position: "absolute",
        insetInline: 0,
        top: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1.5rem",
        padding: "1.25rem",
        opacity: introReady ? 1 : 0,
        transform: introReady ? "translateY(0)" : "translateY(-14px)",
        transition: "opacity 0.7s cubic-bezier(.22,1,.36,1), transform 0.7s cubic-bezier(.22,1,.36,1)",
        mixBlendMode: "difference",
        color: "#ffffff",
      }}
    >
      <button
        className="hover-spring-sm"
        onClick={() => onScrollTo("home")}
        style={{ display: "flex", alignItems: "center", gap: ".5rem", fontSize: "1.125rem", fontWeight: 600, letterSpacing: "-.01em", color: "#ffffff" }}
      >
        <span style={{ color: "#ffffff", fontSize: "1.25rem", display: "inline-flex", lineHeight: 1 }}>★</span> Bishnoi Omniverse
      </button>

      <nav className="hidden lg:flex">
        <ul style={{ display: "flex", gap: "2rem", fontSize: ".875rem", fontWeight: 600 }}>
          <li>
            <button className="hover-lift" style={{ color: "#ffffff" }} aria-current="page" onClick={() => onScrollTo("home")}>
              Home
            </button>
          </li>
          <li>
            <button className="hover-lift" style={{ color: "#ffffff" }} onClick={() => onScrollTo("about")}>
              Who We Are
            </button>
          </li>
          <li>
            <button className="hover-lift" style={{ color: "#ffffff" }} onClick={() => onScrollTo("works")}>
              Businesses <span style={{ fontSize: ".75rem", opacity: 0.8 }}>▾</span>
            </button>
          </li>
          <li>
            <button className="hover-lift" style={{ color: "#ffffff" }} onClick={() => onScrollTo("services")}>
              Philosophy
            </button>
          </li>
          <li>
            <button className="hover-lift" style={{ color: "#ffffff" }} onClick={() => onScrollTo("stats-panel")}>
              Vision & Mission
            </button>
          </li>
          <li>
            <button className="hover-lift" style={{ color: "#ffffff" }} onClick={onOpenRequestModal}>
              Contact
            </button>
          </li>
        </ul>
      </nav>

      <div style={{ display: "flex", alignItems: "center", gap: ".75rem" }}>
        <div
          id="clock-chip"
          className="hidden md:flex"
          style={{
            border: "1px solid rgba(255,255,255,.6)",
            background: "rgba(255,255,255,.15)",
            backdropFilter: "blur(4px)",
            borderRadius: ".875rem",
            padding: ".5rem .75rem",
            gap: ".75rem",
            fontSize: ".75rem",
            color: "#ffffff",
            alignItems: "center",
          }}
        >
          <span style={{ opacity: 0.8 }}>Local time</span>
          <span id="clock-time" style={{ minWidth: "3.5rem", fontVariantNumeric: "tabular-nums", fontWeight: 600, color: "#ffffff" }}>
            {time}
          </span>
          <span style={{ opacity: 0.5 }}>•</span>
          <span id="clock-date" style={{ fontWeight: 600 }}>
            {date}
          </span>
        </div>

        <button
          className="hover-spring-sm"
          style={{
            border: "1px solid rgba(255,255,255,.6)",
            background: "rgba(255,255,255,.15)",
            backdropFilter: "blur(4px)",
            borderRadius: ".875rem",
            color: "#ffffff",
            transition: "background .2s",
          }}
          onClick={onOpenNav}
        >
          <span style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", padding: ".5rem 1rem", fontSize: ".75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".05em" }}>
            <span style={{ fontSize: ".875rem", display: "inline-flex", lineHeight: 1 }}>≡</span>
            <span className="hidden sm:inline">Menu</span>
          </span>
        </button>
      </div>
    </header>
  );
}
