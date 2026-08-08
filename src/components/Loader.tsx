"use client";

import { useEffect, useState } from "react";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const FILL_MS = 1300;
    const startTime = performance.now();

    function easeInOutCubic(t: number) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    let animationFrameId: number;

    function updateLoader() {
      const elapsed = performance.now() - startTime;
      const p = Math.min(elapsed / FILL_MS, 1);
      const ep = easeInOutCubic(p);
      const val = Math.round(ep * 100);

      setProgress(val);

      if (p < 1) {
        animationFrameId = requestAnimationFrame(updateLoader);
      } else {
        setIsExiting(true);
        setTimeout(() => {
          onComplete();
        }, 800);
      }
    }

    animationFrameId = requestAnimationFrame(updateLoader);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [onComplete]);

  return (
    <div
      id="loader"
      className={`loader ${isExiting ? "exit" : ""}`}
      role="status"
      aria-label="Loading"
    >
      <div className="content">
        <div style={{ display: "flex", alignItems: "center", gap: ".5rem", fontWeight: 600, fontSize: "1.5rem" }}>
          <span style={{ color: "#cf8047", fontSize: "1.875rem", display: "inline-flex", lineHeight: 1 }}>★</span>
          <span>Bishnoi</span>
        </div>
        <p style={{ maxWidth: "28ch", fontSize: ".875rem", color: "rgba(255,255,255,.55)", textAlign: "center" }}>
          Rooted in five hundred years. Building for what comes next.
        </p>
        <div style={{ width: "min(22rem, 72vw)", display: "flex", flexDirection: "column", gap: ".75rem" }}>
          <div style={{ height: "1px", background: "rgba(255,255,255,.15)", overflow: "hidden" }}>
            <div
              id="loader-fill"
              style={{
                height: "100%",
                background: "#cf8047",
                width: `${progress}%`,
                transition: "width .1s ease-out",
              }}
            ></div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: ".75rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: ".05em", color: "rgba(255,255,255,.45)" }}>
            <span>Loading</span>
            <span id="loader-counter" style={{ color: "rgba(255,255,255,.8)", fontVariantNumeric: "tabular-nums" }}>
              {String(progress).padStart(3, "0")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
