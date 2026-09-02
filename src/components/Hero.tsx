"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { HERO_CAROUSEL, HERO_CONTENT, type HeroVariant } from "./heroContent";
import HeroPillList from "./HeroPillList";

interface HeroProps {
  onOpenRequestModal: () => void;
  onScrollTo: (id: string) => void;
  introReady: boolean;
  variant?: HeroVariant;
  // Drops the dark gradient scrim over the background image — used on the
  // Businesses page, whose background doesn't need the extra darkening for
  // text contrast the way the Home page's photo did.
  hideOverlay?: boolean;
  // Opt-in canvas "liquid" reveal: dragging across the hero rubs through to
  // the *next* carousel slide, leaving a soft brush trail that slowly fades
  // back. Needs a carousel to have a next slide, so it's Home-only.
  liquidReveal?: boolean;
  // Left-hand label in the #hero-status bar. Home and Businesses share
  // HERO_CONTENT.default, so this is a prop rather than variant content.
  statusLabel?: string;
  // Color for that label. The bar defaults to black ink; pass white where the
  // label sits over a dark part of the hero photo, and it picks up the same
  // drop shadow the "Scroll to explore" cue uses for legibility.
  statusLabelColor?: string;
  // Drops the "Scroll to explore" cue on the right of that same bar.
  hideScrollCue?: boolean;
  // Overrides the h1 color. Defaults to white, which every hero over a photo
  // wants; the Businesses page takes brand orange instead.
  headlineColor?: string;
  // Drops the h1's drop shadow. That shadow exists to hold light text off a
  // photographic background, so only turn it off where the headline reads
  // cleanly without it.
  hideHeadlineShadow?: boolean;
  // Shows the ecosystem pill list in the hero's right-hand column. Opt-in so
  // that variants which carry pill data don't all sprout one.
  showPills?: boolean;
  // Overrides the section's minHeight. Defaults to 115vh (60vh for the short
  // intro-style variants).
  minHeight?: string;
}

const CAROUSEL_INTERVAL_MS = 5000;
// Liquid-reveal brush. RADIUS is the stamp size in CSS px; DECAY is how much
// alpha each frame subtracts while you're drawing (higher = trail dies
// sooner); IDLE_FRAMES_TO_CLEAR is how long the trail lingers untouched
// before it's wiped. Interaction also pauses the carousel for PAUSE_MS so a
// slide never swaps out from under the stroke you're painting — kept short,
// since every pointer move over the hero re-arms it and a long pause stalls
// the carousel for as long as the cursor is anywhere over the section.
const BRUSH_RADIUS_PX = 143;
const BRUSH_DECAY = 0.016;
const IDLE_FRAMES_TO_CLEAR = 120;
const PAUSE_MS = 2000;

export default function Hero({
  onScrollTo,
  introReady,
  variant = "default",
  hideOverlay,
  liquidReveal,
  statusLabel = "500 Years of Heritage",
  statusLabelColor,
  hideScrollCue,
  headlineColor = "#ffffff",
  hideHeadlineShadow,
  showPills,
  minHeight,
}: HeroProps) {
  const content = HERO_CONTENT[variant];
  const isIntro =
    variant === "intro" ||
    variant === "heritage" ||
    variant === "getmeds" ||
    variant === "bishnoi-omniverse" ||
    variant === "foundation" ||
    variant === "what-we-do";

  const [imageIdx, setImageIdx] = useState(0);
  // Held while the pointer is actively rubbing, so the base image underneath
  // the brush stroke stays put.
  const [isPaused, setIsPaused] = useState(false);
  const pauseTimeoutRef = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(pauseTimeoutRef.current), []);

  // Auto-advance the background image every few seconds — skipped when the
  // variant pins a single fixed background image (every variant currently
  // in use sets one, so this carousel is effectively dormant unless a
  // future variant is added without a backgroundImage).
  useEffect(() => {
    if (content.backgroundImage || isPaused) return;

    const interval = setInterval(() => {
      setImageIdx((prev) => (prev + 1) % HERO_CAROUSEL.length);
    }, CAROUSEL_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [content.backgroundImage, isPaused]);

  // One entry when the variant pins a background, the whole carousel
  // otherwise — rendered as a stack either way so both paths share markup.
  const slides = content.backgroundImage
    ? [{ image: content.backgroundImage, alt: "Hero background" }]
    : HERO_CAROUSEL.map((slide) => ({ image: slide.image, alt: slide.title }));
  const activeSlide = slides.length > 1 ? imageIdx % slides.length : 0;

  // Self-contained entrance trigger for the background image slide and the
  // title/CTA slide below — independent of the `introReady` prop, which
  // currently starts (and stays) `true` on mount site-wide, so nothing
  // gated on it ever visibly animates. rAF delays the flip one frame so the
  // initial offset/opacity actually paints before transitioning, otherwise
  // React can apply both states before the first paint and the transition
  // never renders.
  const [slideIn, setSlideIn] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setSlideIn(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Liquid reveal. A canvas sits over the base image holding the *next*
  // slide, initially fully erased; each pointer sample stamps a soft radial
  // brush of that image onto it, and every frame subtracts a little alpha
  // from the whole canvas so the trail bleeds away behind the cursor.
  // Everything lives inside the effect — none of it belongs in React state,
  // since it repaints per animation frame.
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const revealSrc = slides.length > 1 ? slides[(activeSlide + 1) % slides.length].image : null;

  // Stable identity, so listing it in the effect's deps below doesn't tear
  // down and rebuild the canvas on every render.
  const pauseInteraction = useCallback(() => {
    setIsPaused(true);
    window.clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = window.setTimeout(() => setIsPaused(false), PAUSE_MS);
  }, []);

  useEffect(() => {
    if (!liquidReveal || !revealSrc) return;
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Offscreen buffers: `cover` holds the reveal image drawn at cover-fit
    // size, `brush` composites one soft stamp of it before it's blitted.
    const cover = document.createElement("canvas");
    const coverCtx = cover.getContext("2d");
    const brush = document.createElement("canvas");
    const brushCtx = brush.getContext("2d");
    if (!coverCtx || !brushCtx) return;

    const img = new Image();
    img.src = revealSrc;

    let W = 0;
    let H = 0;
    let dpr = 1;
    let points: { x: number; y: number }[] = [];
    let idle = 0;
    let drawing = false;

    function drawCover() {
      if (!coverCtx || !W || !H) return;
      const iw = img.naturalWidth || W;
      const ih = img.naturalHeight || H;
      const scale = Math.max(W / iw, H / ih);
      const sw = iw * scale;
      const sh = ih * scale;
      coverCtx.clearRect(0, 0, W, H);
      coverCtx.drawImage(img, (W - sw) / 2, (H - sh) / 2, sw, sh);
    }

    function resize() {
      if (!container || !canvas) return;
      const rect = container.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = rect.width * dpr;
      H = rect.height * dpr;
      canvas.width = W;
      canvas.height = H;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      cover.width = W;
      cover.height = H;
      brush.width = Math.ceil(BRUSH_RADIUS_PX * 2 * dpr);
      brush.height = Math.ceil(BRUSH_RADIUS_PX * 2 * dpr);
      if (img.complete && img.naturalWidth) drawCover();
    }

    img.onload = () => {
      if (W && H) drawCover();
    };

    // One stamp: a radial alpha gradient masked down to the reveal image
    // (source-in), so the brush carries picture rather than flat color.
    function stamp(x: number, y: number) {
      if (!brushCtx || !ctx) return;
      const r = BRUSH_RADIUS_PX * dpr;
      const diam = Math.ceil(r * 2);
      brushCtx.clearRect(0, 0, diam, diam);
      const grad = brushCtx.createRadialGradient(r, r, 0, r, r, r);
      grad.addColorStop(0, "rgba(255,255,255,1)");
      grad.addColorStop(0.55, "rgba(255,255,255,.82)");
      grad.addColorStop(1, "rgba(255,255,255,0)");
      brushCtx.fillStyle = grad;
      brushCtx.fillRect(0, 0, diam, diam);
      brushCtx.globalCompositeOperation = "source-in";
      const sx = Math.round(x - r);
      const sy = Math.round(y - r);
      brushCtx.drawImage(cover, sx, sy, diam, diam, 0, 0, diam, diam);
      brushCtx.globalCompositeOperation = "source-over";
      ctx.drawImage(brush, sx, sy);
    }

    let animId = 0;
    function tick() {
      if (!ctx || !W || !H) {
        animId = requestAnimationFrame(tick);
        return;
      }
      if (points.length > 0) {
        idle = 0;
        drawing = true;
      } else {
        idle++;
      }

      // Fade accelerates the longer the pointer sits still, so an abandoned
      // trail clears out instead of hanging on the image.
      const fade = drawing ? BRUSH_DECAY : Math.min(BRUSH_DECAY + idle * 0.004, 0.5);
      if (idle > IDLE_FRAMES_TO_CLEAR) {
        ctx.clearRect(0, 0, W, H);
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

    let last: { x: number; y: number } | null = null;
    function handlePointerMove(e: PointerEvent) {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) * dpr;
      const y = (e.clientY - rect.top) * dpr;
      const r = BRUSH_RADIUS_PX * dpr;
      if (x < -r || x > W + r || y < -r || y > H + r) {
        last = null;
        return;
      }
      pauseInteraction();
      // Interpolate along the path — a fast flick would otherwise leave a
      // dotted line of stamps instead of one continuous stroke.
      if (last) {
        const dx = x - last.x;
        const dy = y - last.y;
        const step = Math.max(r * 0.3, 1);
        const n = Math.min(Math.ceil(Math.hypot(dx, dy) / step), 60);
        for (let i = 1; i <= n; i++) {
          points.push({ x: last.x + (dx * i) / n, y: last.y + (dy * i) / n });
        }
      } else {
        points.push({ x, y });
      }
      last = { x, y };
    }
    const handlePointerLeave = () => {
      last = null;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(container);
    resize();
    animId = requestAnimationFrame(tick);
    window.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [liquidReveal, revealSrc, pauseInteraction]);

  return (
    <section
      id="home"
      style={{
        position: "relative",
        isolation: "isolate",
        overflow: "hidden",
        minHeight: minHeight ?? (isIntro ? "60vh" : "115vh"),
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#ffffff",
      }}
    >
      <div id="liquid-container" ref={containerRef} style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        {/* Fades in while sliding right-to-left into place. A slight scale
            on the initial state keeps the edges covered while it's offset,
            so no gap flashes at the side during the slide (a plain
            translateX on an inset:0 image would otherwise reveal the
            section's white background along that edge). */}
        <div
          id="liquid-before"
          style={{
            position: "absolute",
            inset: 0,
            opacity: slideIn ? 1 : 0,
            transform: slideIn ? "translateX(0) scale(1)" : "translateX(4%) scale(1.06)",
            transition: "opacity 2.2s cubic-bezier(.16,1,.3,1), transform 2.6s cubic-bezier(.16,1,.3,1)",
          }}
        >
          {/* Every slide stays mounted and crossfades by opacity — swapping a
              single <img>'s src would blank the hero while the next file
              downloads. A pinned backgroundImage collapses this to one. */}
          {slides.map((slide, i) => (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              key={slide.image}
              src={slide.image}
              alt={slide.alt}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: i === activeSlide ? 1 : 0,
                transition: "opacity 1.6s cubic-bezier(.16,1,.3,1)",
              }}
            />
          ))}
        </div>

        {/* Brush trail is painted here, above the base slide but still inside
            #liquid-container — so it stays under the scrim, watermark and
            copy. pointerEvents:none because the effect listens on window. */}
        {liquidReveal && revealSrc && (
          <canvas
            id="liquid-canvas"
            ref={canvasRef}
            aria-hidden="true"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
          />
        )}
      </div>

      {/* High-Contrast Gradient Backdrop Overlay */}
      {!hideOverlay && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            pointerEvents: "none",
            background: "linear-gradient(to bottom, rgba(26,22,19,0.75) 0%, rgba(26,22,19,0.35) 50%, rgba(26,22,19,0.7) 100%)",
          }}
        />
      )}

      {!isIntro && (
        <div
          id="watermark"
          style={{
            pointerEvents: "none",
            position: "absolute",
            insetInline: 0,
            bottom: "5rem",
            zIndex: 1,
            textAlign: "center",
            userSelect: "none",
            fontWeight: 700,
            lineHeight: 1,
            fontSize: "var(--text-watermark)",
            background: "linear-gradient(to top, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.05) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.15) 100%)",
            maskImage: "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.15) 100%)",
            mixBlendMode: "difference",
            opacity: introReady ? 0.6 : 0,
            transform: introReady ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s cubic-bezier(.22,1,.36,1), transform 0.7s cubic-bezier(.22,1,.36,1)",
          }}
        >
          BISHNOI
        </div>
      )}

      <div
        className="shell-full grid grid-cols-1 lg:grid-cols-12"
        style={{
          position: "relative",
          zIndex: 20,
          flex: 1,
          width: "100%",
          maxWidth: "100%",
          gap: "2.5rem",
          paddingBlock: isIntro ? "8rem" : "13rem 3rem",
          color: "#ffffff",
          alignItems: "center",
          alignContent: isIntro ? "center" : "space-between",
        }}
      >
        {/* Slides in left-to-right (starts offset left, settles at 0) while
            fading in — covers the headline, subtitle/bio, and the two CTA
            buttons together as one unit, on top of whatever fade timing
            their own inner elements already have. */}
        <div
          id="hero-title-wrapper"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.75rem",
            opacity: slideIn ? 1 : 0,
            transform: slideIn ? "translateX(0)" : "translateX(-60px)",
            transition: "opacity 2.2s cubic-bezier(.16,1,.3,1), transform 2.2s cubic-bezier(.16,1,.3,1)",
            ...(isIntro && { alignItems: "center", textAlign: "center" as const }),
          }}
          className={isIntro ? "lg:col-span-12" : "lg:col-span-7"}
        >
          <h1
            id="hero-h1"
            className="text-[1.65rem] sm:text-[2.25rem] md:text-[3.5rem]"
            style={{
              maxWidth: isIntro ? "20ch" : "26ch",
              // Honors newlines written into a variant's `headline`, so copy
              // that has to break at a specific word can say so in the data
              // instead of relying on where the width cap happens to wrap it.
              whiteSpace: "pre-line",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-.02em",
              color: headlineColor,
              textShadow: hideHeadlineShadow ? "none" : "0 2px 8px rgba(0,0,0,0.5)",
            }}
          >
            <span className={`reveal-line ${introReady ? "visible" : ""}`}>
              <span className="line-inner">{content.headline}</span>
            </span>
          </h1>

          {(content.subtitle || content.bio) && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                opacity: introReady ? 1 : 0,
                transform: introReady ? "translateY(0)" : "translateY(14px)",
                transition: "opacity 0.6s cubic-bezier(.22,1,.36,1), transform 0.6s cubic-bezier(.22,1,.36,1)",
              }}
            >
              {content.subtitle && (
                <p
                  style={{
                    fontSize: "clamp(1.125rem, 2vw, 1.5rem)",
                    fontWeight: 500,
                    color: "rgba(255,255,255,0.85)",
                    textShadow: "0 2px 10px rgba(0,0,0,.7)",
                  }}
                >
                  {content.subtitle}
                </p>
              )}
              {content.bio?.map((paragraph) => (
                <p
                  key={paragraph}
                  style={{
                    maxWidth: "58ch",
                    fontSize: "1.0625rem",
                    lineHeight: 1.7,
                    color: "rgba(255,255,255,0.85)",
                    textShadow: "0 2px 10px rgba(0,0,0,.7)",
                  }}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          )}

          {!isIntro && (
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
                <span className="pill-inner pill-accent pill-with-arrow" style={{ boxShadow: "none", whiteSpace: "nowrap", color: "#ffffff" }}>
                  Who we are <span className="pill-badge">→</span>
                </span>
              </button>
              <a href="/businesses" className="pill-btn">
                <span
                  className="pill-inner pill-outline pill-with-arrow"
                  style={{ color: "#ffffff", borderColor: "rgba(243,107,33,0.55)", background: "rgba(26,22,19,0.52)", backdropFilter: "blur(8px)", whiteSpace: "nowrap" }}
                >
                  Our Businesses <span className="pill-badge" style={{ background: "#F36B21", color: "#2A1206" }}>→</span>
                </span>
              </a>
            </div>
          )}
        </div>

        {!isIntro && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }} className="gap-3 sm:gap-6 lg:col-span-5">
            {/* Ecosystem pills (Getmeds Phils, Bishnoi India, etc.).
                #hero-partners already has mobile rules in globals.css that
                turn this into a horizontal scroller below the lg breakpoint. */}
            {showPills && content.pills.length > 0 && (
              <div
                id="hero-partners"
                data-lenis-prevent
                style={{
                  width: "100%",
                  maxWidth: "28rem",
                  opacity: introReady ? 1 : 0,
                  transform: introReady ? "translateY(0)" : "translateY(14px)",
                  transition: "opacity 0.6s cubic-bezier(.16,1,.3,1), transform 0.6s cubic-bezier(.16,1,.3,1)",
                }}
              >
                <HeroPillList pills={content.pills} />
              </div>
            )}
          </div>
        )}

        {!isIntro && (
          <div
            id="hero-status"
            className="col-span-full w-full"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              gap: ".75rem",
              borderTop: "1px solid rgba(255,255,255,0.2)",
              padding: "1.25rem 0 0",
              fontSize: ".75rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: ".025em",
              color: "#000000",
              opacity: introReady ? 1 : 0,
              transition: "opacity 0.6s cubic-bezier(.22,1,.36,1)",
            }}
          >
            <span
              style={
                statusLabelColor
                  ? { color: statusLabelColor, textShadow: "0 2px 8px rgba(0,0,0,0.6)" }
                  : undefined
              }
            >
              {statusLabel}
            </span>
            {!hideScrollCue && (
              <span style={{ display: "inline-flex", gap: ".5rem", color: "#ffffff", textShadow: "0 2px 8px rgba(0,0,0,0.6)" }}>
                Scroll to explore <span style={{ display: "inline-block" }}>↓</span>
              </span>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
