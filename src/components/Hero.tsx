"use client";

import { useEffect, useRef, useState } from "react";

interface HeroProps {
  onOpenRequestModal: () => void;
  onScrollTo: (id: string) => void;
  introReady: boolean;
}

export default function Hero({ onOpenRequestModal, onScrollTo, introReady }: HeroProps) {
  const heroImages = [
    "/hero_pharma.jpg",
    "/hero_hydroponics.jpg",
    "/hero_dairy.jpg",
    "/hero_wildlife.jpg",
  ];

  const carouselItems = [
    { caption: "Getmeds Ecosystem", title: "Global healthcare & pharmaceuticals." },
    { caption: "Bishnoi Omniverse", title: "Sustainable agritech & enterprise." },
    { caption: "Strategic Holdings", title: "NBF financial & NKB capital." },
    { caption: "Heritage Foundation", title: "29 Principles & conservation impact." },
  ];

  const [imageIdx, setImageIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-advance timer carousel (every 5 seconds)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setImageIdx((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, heroImages.length]);

  // Pause timer on manual interaction
  const triggerInteractionPause = () => {
    setIsPaused(true);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 8000);
  };

  const carouselNext = () => {
    triggerInteractionPause();
    setImageIdx((prev) => (prev + 1) % heroImages.length);
  };

  const carouselPrev = () => {
    triggerInteractionPause();
    setImageIdx((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  const handleSelectDivision = (idx: number) => {
    triggerInteractionPause();
    setImageIdx(idx);
  };

  // Canvas liquid reveal logic
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const afterImgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const nextImageSrc = heroImages[(imageIdx + 1) % heroImages.length];

    const afterImg = new Image();
    afterImg.src = nextImageSrc;
    afterImgRef.current = afterImg;

    let W = 0,
      H = 0,
      dpr = 1,
      radius = 143;
    const decay = 0.016;
    let points: { x: number; y: number }[] = [];
    let idle = 0;
    let drawing = false;

    const coverCanvas = document.createElement("canvas");
    const coverCtx = coverCanvas.getContext("2d");
    const brushCanvas = document.createElement("canvas");
    const brushCtx = brushCanvas.getContext("2d");

    if (!coverCtx || !brushCtx) return;

    function resize() {
      if (!container || !canvas || !coverCtx || !brushCtx) return;
      const rect = container.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = rect.width * dpr;
      H = rect.height * dpr;
      canvas.width = W;
      canvas.height = H;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      coverCanvas.width = W;
      coverCanvas.height = H;
      brushCanvas.width = Math.ceil(radius * 2 * dpr);
      brushCanvas.height = Math.ceil(radius * 2 * dpr);
      if (afterImg.complete && afterImg.naturalWidth) drawCover();
    }

    function drawCover() {
      if (!coverCtx) return;
      const iw = afterImg.naturalWidth || W;
      const ih = afterImg.naturalHeight || H;
      const scale = Math.max(W / iw, H / ih);
      const sw = iw * scale;
      const sh = ih * scale;
      const sx = (W - sw) / 2;
      const sy = (H - sh) / 2;
      coverCtx.clearRect(0, 0, W, H);
      coverCtx.drawImage(afterImg, sx, sy, sw, sh);
    }

    afterImg.onload = function () {
      if (W && H) drawCover();
    };

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const ro = new ResizeObserver(() => {
      resize();
    });
    ro.observe(container);
    requestAnimationFrame(() => {
      resize();
    });

    function getCanvasCoords(e: PointerEvent) {
      if (!canvas) return { x: 0, y: 0 };
      const rect = canvas.getBoundingClientRect();
      return { x: (e.clientX - rect.left) * dpr, y: (e.clientY - rect.top) * dpr };
    }

    function stamp(x: number, y: number) {
      if (!brushCtx || !ctx) return;
      const r = radius * dpr;
      const diam = Math.ceil(r * 2);
      const cx = r,
        cy = r;
      brushCtx.clearRect(0, 0, diam, diam);
      const grad = brushCtx.createRadialGradient(cx, cy, 0, cx, cy, r);
      grad.addColorStop(0, "rgba(255,255,255,1)");
      grad.addColorStop(0.55, "rgba(255,255,255,.82)");
      grad.addColorStop(1, "rgba(255,255,255,0)");
      brushCtx.fillStyle = grad;
      brushCtx.fillRect(0, 0, diam, diam);
      brushCtx.globalCompositeOperation = "source-in";
      const sx = Math.round(x - r);
      const sy = Math.round(y - r);
      brushCtx.drawImage(coverCanvas, sx, sy, diam, diam, 0, 0, diam, diam);
      brushCtx.globalCompositeOperation = "source-over";
      ctx.drawImage(brushCanvas, sx, sy);
    }

    function clearCanvas() {
      if (ctx) ctx.clearRect(0, 0, W, H);
    }

    let animId: number;

    function tick() {
      if (!W || !H || !ctx) return;
      if (points.length > 0) {
        idle = 0;
        drawing = true;
      } else {
        idle++;
      }

      const fade = drawing ? decay : Math.min(decay + idle * 0.004, 0.5);
      if (idle > 120) {
        clearCanvas();
        drawing = false;
        idle = 0;
        animId = requestAnimationFrame(tick);
        return;
      }

      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = `rgba(0,0,0,${fade})`;
      ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = "source-over";

      if (drawing) {
        for (const p of points) stamp(p.x, p.y);
        points = [];
      }

      animId = requestAnimationFrame(tick);
    }
    animId = requestAnimationFrame(tick);

    let lastMove: { x: number; y: number } | null = null;

    function handlePointerMove(e: PointerEvent) {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      triggerInteractionPause();
      const { x, y } = getCanvasCoords(e);
      if (x < -radius || x > W + radius || y < -radius || y > H + radius) {
        lastMove = null;
        return;
      }
      const r = radius * dpr;
      if (lastMove) {
        const dx = x - lastMove.x,
          dy = y - lastMove.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const step = Math.max(r * 0.3, 1);
        const n = Math.min(Math.ceil(dist / step), 60);
        for (let i = 1; i <= n; i++) {
          const t = i / n;
          points.push({ x: lastMove.x + dx * t, y: lastMove.y + dy * t });
        }
      } else {
        points.push({ x, y });
      }
      lastMove = { x, y };
    }

    function handlePointerLeave() {
      lastMove = null;
    }

    window.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [imageIdx, heroImages]);

  return (
    <section id="home" style={{ position: "relative", isolation: "isolate", overflow: "hidden", borderRadius: "0 0 2rem 2rem", background: "#050505" }}>
      <div id="liquid-container" ref={containerRef} style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        {/* Base Image underneath canvas */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          id="liquid-before"
          src={heroImages[imageIdx]}
          alt="Hero background"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transition: "opacity 0.6s ease" }}
        />
        {/* Canvas painting the next image in sequence */}
        <canvas
          id="liquid-canvas"
          ref={canvasRef}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
          aria-hidden="true"
        />
      </div>

      {/* High-Contrast Gradient Backdrop Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          background: "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.8) 100%)",
        }}
      ></div>

      <div
        id="watermark"
        style={{
          pointerEvents: "none",
          position: "absolute",
          insetInline: 0,
          bottom: "7rem",
          zIndex: 1,
          textAlign: "center",
          userSelect: "none",
          fontWeight: 700,
          lineHeight: 1,
          fontSize: "var(--text-watermark)",
          color: "#ffffff",
          mixBlendMode: "difference",
          opacity: introReady ? 0.35 : 0,
          transform: introReady ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.7s cubic-bezier(.22,1,.36,1), transform 0.7s cubic-bezier(.22,1,.36,1)",
        }}
      >
        BISHNOI
      </div>

      <div className="shell" style={{ position: "relative", zIndex: 20, display: "flex", flexDirection: "column", gap: "2rem", padding: "7.5rem 1.25rem 5rem", color: "#ffffff" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }} className="lg:col-span-7">
          <div
            id="hero-eyebrow"
            className="eyebrow eyebrow-light"
            style={{
              opacity: introReady ? 1 : 0,
              transform: introReady ? "translateY(0)" : "translateY(10px)",
              transition: "opacity 0.6s cubic-bezier(.22,1,.36,1), transform 0.6s cubic-bezier(.22,1,.36,1)",
              color: "#ffffff",
              textShadow: "0 2px 6px rgba(0,0,0,0.8)",
            }}
          >
            <span className="dot" style={{ background: "#cf8047" }}></span> Bishnoi Omniverse LLP
          </div>

          <h1
            id="hero-h1"
            style={{
              maxWidth: "20ch",
              fontSize: "2.5rem",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-.02em",
              color: "#ffffff",
              textShadow: "0 4px 16px rgba(0,0,0,0.9), 0 2px 4px rgba(0,0,0,0.8)",
            }}
          >
            <span className={`reveal-line ${introReady ? "visible" : ""}`}>
              <span className="line-inner">Rooted in five hundred years.</span>
            </span>
            <span className={`reveal-line ${introReady ? "visible" : ""}`}>
              <span className="line-inner">Building for what comes next.</span>
            </span>
          </h1>

          <div
            id="hero-ctas"
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: ".75rem",
              opacity: introReady ? 1 : 0,
              transition: "opacity 0.6s cubic-bezier(.22,1,.36,1)",
            }}
          >
            <button className="pill-btn" onClick={() => onScrollTo("about")}>
              <span className="pill-inner pill-light pill-with-arrow" style={{ background: "#0a0a0a", color: "#ffffff", border: "1px solid rgba(255,255,255,0.2)" }}>
                Who we are <span className="pill-badge" style={{ background: "#ffffff", color: "#0a0a0a" }}>→</span>
              </span>
            </button>
            <button className="pill-btn" onClick={() => onScrollTo("works")}>
              <span className="pill-inner pill-outline pill-with-arrow" style={{ color: "#ffffff", borderColor: "rgba(255,255,255,0.5)", background: "rgba(0,0,0,0.45)", backdropFilter: "blur(8px)" }}>
                Our Businesses <span className="pill-badge" style={{ background: "#ffffff", color: "#0a0a0a" }}>→</span>
              </span>
            </button>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "1.5rem" }} className="lg:items-end lg:col-span-5">
          {/* Reference Card Layout matching Screenshot 1 */}
          <div
            id="hero-card"
            style={{
              width: "100%",
              maxWidth: "24rem",
              borderRadius: "1.25rem",
              background: "rgba(245,245,245,0.92)",
              padding: ".5rem",
              boxShadow: "0 12px 40px rgba(0,0,0,0.6)",
              backdropFilter: "blur(16px)",
              color: "#111111",
              opacity: introReady ? 1 : 0,
              transform: introReady ? "translateY(0) scale(1)" : "translateY(16px) scale(.96)",
              transition: "opacity 0.6s cubic-bezier(.16,1,.3,1), transform 0.6s cubic-bezier(.16,1,.3,1)",
            }}
          >
            <div style={{ display: "flex", gap: ".625rem", cursor: "pointer" }} onClick={carouselNext}>
              <div style={{ width: "5.5rem", height: "5.5rem", borderRadius: "1rem", background: "#0a0a0a", display: "grid", placeItems: "center", flexShrink: 0, boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }}>
                <span style={{ color: "#cf8047", fontSize: "1.75rem" }}>★</span>
              </div>
              <div style={{ flex: 1, padding: ".375rem .25rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <span style={{ fontSize: ".65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", color: "rgba(17,17,17,0.5)" }}>
                    {carouselItems[imageIdx].caption}
                  </span>
                  <h4 style={{ fontSize: ".875rem", fontWeight: 700, lineHeight: 1.3, color: "#111111", marginTop: ".125rem" }}>
                    {carouselItems[imageIdx].title}
                  </h4>
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: ".5rem" }}>
                  <div style={{ display: "flex", gap: ".375rem" }}>
                    {heroImages.map((_, i) => (
                      <span
                        key={i}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectDivision(i);
                        }}
                        style={{
                          height: ".25rem",
                          width: i === imageIdx ? "1.25rem" : ".375rem",
                          borderRadius: "9999px",
                          background: i === imageIdx ? "#111111" : "rgba(17,17,17,0.25)",
                          transition: "all .3s",
                          cursor: "pointer",
                        }}
                      />
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: ".375rem" }}>
                    <button
                      style={{ width: "1.75rem", height: "1.75rem", display: "grid", placeItems: "center", borderRadius: "9999px", background: "#ffffff", color: "#111111", border: "1px solid rgba(0,0,0,0.15)", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        carouselPrev();
                      }}
                    >
                      <span style={{ display: "inline-block", transform: "rotate(180deg)", fontSize: ".75rem" }}>→</span>
                    </button>
                    <button
                      style={{ width: "1.75rem", height: "1.75rem", display: "grid", placeItems: "center", borderRadius: "9999px", background: "#ffffff", color: "#111111", border: "1px solid rgba(0,0,0,0.15)", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        carouselNext();
                      }}
                    >
                      <span style={{ fontSize: ".75rem" }}>→</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trusted Ecosystem Divisions Grid matching Screenshot 1 */}
          <div
            id="hero-partners"
            style={{
              width: "100%",
              maxWidth: "24rem",
              opacity: introReady ? 1 : 0,
              transform: introReady ? "translateY(0)" : "translateY(14px)",
              transition: "opacity 0.6s cubic-bezier(.16,1,.3,1), transform 0.6s cubic-bezier(.16,1,.3,1)",
            }}
          >
            <div style={{ marginBottom: ".5rem", fontSize: ".75rem", fontWeight: 600, color: "rgba(255,255,255,0.75)", textShadow: "0 2px 4px rgba(0,0,0,0.8)" }} className="text-left lg:text-right">
              Core Divisions
            </div>
            <ul style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", columnGap: ".75rem", rowGap: ".5rem" }}>
              {["Getmeds Phils", "India", "Vanuatu", "Latam", "SEA", "Omniverse India", "Omniverse Phils"].map((division, idx) => (
                <li key={division}>
                  <button
                    onClick={() => handleSelectDivision(idx % 4)}
                    className="hover-spring"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: ".375rem",
                      fontSize: ".75rem",
                      color: "rgba(255,255,255,0.9)",
                      fontWeight: 500,
                      background: "rgba(0,0,0,0.45)",
                      backdropFilter: "blur(8px)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: "9999px",
                      padding: ".25rem .75rem",
                      width: "100%",
                      cursor: "pointer",
                    }}
                  >
                    <span style={{ fontSize: ".625rem", color: "#cf8047" }}>☉</span>
                    <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{division}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          id="hero-status"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: ".75rem",
            borderTop: "1px solid rgba(255,255,255,.2)",
            padding: "1.25rem 0 0",
            fontSize: ".75rem",
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: ".025em",
            color: "rgba(255,255,255,.8)",
            textShadow: "0 2px 4px rgba(0,0,0,0.8)",
            opacity: introReady ? 1 : 0,
            transition: "opacity 0.6s cubic-bezier(.22,1,.36,1)",
          }}
        >
          <span>500 Years of Heritage</span>
          <span style={{ display: "inline-flex", gap: ".5rem" }}>
            Scroll to explore <span style={{ display: "inline-block" }}>↓</span>
          </span>
        </div>
      </div>
    </section>
  );
}
