"use client";

import React, { useEffect, useRef, useState } from "react";

interface VibeGalleryProps {
  introReady?: boolean;
  onOpenRequestModal?: () => void;
}

export default function VibeGallery({ onOpenRequestModal }: VibeGalleryProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const [isMouseDown, setIsMouseDown] = useState(false);
  const isMouseDownRef = useRef(false);
  const isHoveredRef = useRef(false);
  const startX = useRef(0);
  const scrollLeftPos = useRef(0);

  const legacyImages = [
    { src: "/legacy/sacrifice.jpg", alt: "Amrita Devi's Sacrifice", title: "Amrita Devi's Sacrifice" },
    { src: "/legacy/homeland.jpg", alt: "From the Thar Desert, Outward", title: "Homeland & Heritage" },
    { src: "/legacy/wardens.jpg", alt: "The Desert's Unofficial Wildlife Wardens", title: "Wildlife Conservation" },
    { src: "/legacy/bustard.jpg", alt: "Guarding the Desert's Rarest Bird", title: "Protecting Endangered Species" },
    { src: "/legacy/groves.jpg", alt: "The Groves and the Water They Guard", title: "Sacred Groves & Water" },
    { src: "/legacy/faith.jpg", alt: "A Vaishnava Path, A Living Legacy", title: "Faith & Philosophy" },
    { src: "/legacy/lineage.jpg", alt: "A Legacy Still Being Written", title: "Modern Stewardship" },
    { src: "/legacy/traditions.jpg", alt: "Festivals & Living Traditions", title: "Living Traditions" },
    { src: "/hero_wildlife.jpg", alt: "Thar Desert Wildlife Sanctuary", title: "Wildlife Sanctuary" },
    { src: "/hero_hydroponics.jpg", alt: "Sustainable Eco-Agriculture", title: "Sustainable Agriculture" },
    { src: "/hero_dairy.jpg", alt: "Indigenous Dairy & Cattle Care", title: "Indigenous Dairy Care" },
    { src: "/hero_pharma.jpg", alt: "Natural Pharma & Healthcare", title: "Healthcare & Wellness" },
  ];

  // Tripled dataset for infinite loop scroll
  const galleryItems = [...legacyImages, ...legacyImages, ...legacyImages];

  // Section intersection observer for entry animation
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Initialize scroll position in the middle set
  useEffect(() => {
    const container = gridRef.current;
    if (!container) return;
    const singleSetWidth = container.scrollWidth / 3;
    container.scrollLeft = singleSetWidth;
  }, []);

  // Sync ref for animation loop
  useEffect(() => {
    isMouseDownRef.current = isMouseDown;
  }, [isMouseDown]);

  // Automated continuous right-to-left marquee animation (pauses on hover or mouse down)
  useEffect(() => {
    let animId: number;

    const autoScroll = () => {
      const container = gridRef.current;
      if (container && !isMouseDownRef.current && !isHoveredRef.current) {
        container.scrollLeft += 1.2; // Right-to-left scroll speed
      }
      animId = requestAnimationFrame(autoScroll);
    };

    animId = requestAnimationFrame(autoScroll);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Infinite scroll loop reset handler
  const handleScroll = () => {
    const container = gridRef.current;
    if (!container) return;
    const singleSetWidth = container.scrollWidth / 3;

    if (container.scrollLeft >= singleSetWidth * 2) {
      container.scrollLeft -= singleSetWidth;
    } else if (container.scrollLeft <= 5) {
      container.scrollLeft += singleSetWidth;
    }
  };

  // Mouse Hover handlers
  const handleMouseEnter = () => {
    isHoveredRef.current = true;
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    setIsMouseDown(false);
  };

  // Mouse Drag to Scroll handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = gridRef.current;
    if (!container) return;
    setIsMouseDown(true);
    startX.current = e.pageX - container.offsetLeft;
    scrollLeftPos.current = container.scrollLeft;
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isMouseDown) return;
    e.preventDefault();
    const container = gridRef.current;
    if (!container) return;
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX.current) * 1.6;
    container.scrollLeft = scrollLeftPos.current - walk;
  };

  return (
    <section ref={sectionRef} id="gallery" style={{ background: "#ffffff", padding: "5rem 0", position: "relative", overflow: "hidden" }}>
      {/* Tagline Header Block */}
      <div
        className="tagline-header"
        style={{
          maxWidth: "550px",
          textAlign: "center",
          margin: "0 auto 3rem",
          color: "#333",
          padding: "0 1.25rem",
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(24px)",
          transition: "transform 0.7s cubic-bezier(.22,1,.36,1), opacity 0.7s cubic-bezier(.22,1,.36,1)",
        }}
      >
        <h2
          style={{
            textTransform: "uppercase",
            fontWeight: 800,
            lineHeight: 1.05,
            fontSize: "2.5rem",
            letterSpacing: "-.02em",
            color: "#333",
          }}
        >
          Capturing the vibe,
          <br />
          Freezing the moment
        </h2>
        <p style={{ marginTop: "1rem", fontSize: "0.875rem", color: "rgba(51,51,51,0.8)", lineHeight: 1.6 }}>
          Specialized in nurturing amazing pictures and moments you would always remember
        </p>
        <button
          onClick={onOpenRequestModal}
          className="pill-btn hover-spring"
          style={{
            display: "inline-block",
            marginTop: "1.25rem",
            padding: "0.75rem 1.75rem",
            backgroundColor: "#333",
            color: "#ffffff",
            borderRadius: "30px",
            fontWeight: 500,
            fontSize: "0.875rem",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          }}
        >
          Send Us A Message
        </button>
      </div>

      {/* Image Grid Wrapper with Oval Framing Cutouts */}
      <div className="image-grid-wrapper" style={{ overflow: "hidden", overflowY: "hidden" }}>
        <div
          ref={gridRef}
          className="image-grid no-scrollbar"
          onScroll={handleScroll}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          style={{
            display: "flex",
            gap: "16px",
            overflowX: "auto",
            overflowY: "hidden",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            cursor: isMouseDown ? "grabbing" : "grab",
            userSelect: "none",
            WebkitUserSelect: "none",
          }}
        >
          {galleryItems.map((img, idx) => (
            <div
              key={idx}
              className="image-grid-item"
              style={{
                flexShrink: 0,
                width: "240px",
                height: "480px",
                borderRadius: "0",
                overflow: "hidden",
                position: "relative",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt={img.alt}
                draggable={false}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  pointerEvents: "none",
                  userSelect: "none",
                  borderRadius: "0",
                  transition: "transform 0.4s ease",
                }}
                className="hover-scale-103"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
