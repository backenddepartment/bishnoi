"use client";

import { useEffect, useState } from "react";

interface RequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RequestModal({ isOpen, onClose }: RequestModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", inquiry: "" });

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setIsSubmitted(false);
      setIsSubmitting(false);
      setFormData({ name: "", email: "", phone: "", inquiry: "" });
    }, 300);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  return (
    <div
      id="request-modal"
      className={`modal-backdrop ${isOpen ? "open" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Connect with Bishnoi"
      onClick={handleClose}
    >
      {/* Lenis intercepts wheel/trackpad scroll on the whole document, so this
          nested scroller has to opt out or it never receives those events —
          same pattern as LegacyOverlay.tsx. */}
      <div className="modal-panel" data-lenis-prevent onClick={(e) => e.stopPropagation()} style={{ position: "relative" }}>
        <button
          onClick={handleClose}
          style={{
            position: "absolute",
            right: "1rem",
            top: "1rem",
            width: "2.25rem",
            height: "2.25rem",
            display: "grid",
            placeItems: "center",
            borderRadius: "9999px",
            background: "#F7F3E8",
            color: "rgba(74,68,60,.6)",
            transition: "background .2s, color .2s",
          }}
        >
          ✕
        </button>

        {!isSubmitted ? (
          <div id="modal-form">
            <div style={{ marginBottom: "1.5rem" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", fontSize: ".875rem", fontWeight: 500, color: "rgba(74,68,60,.6)" }}>
                <span style={{ width: ".375rem", height: ".375rem", borderRadius: "9999px", background: "#F36B21" }}></span>Connect with us
              </div>
              <p style={{ marginTop: ".5rem", fontSize: "1.25rem", fontWeight: 700, lineHeight: 1.4, color: "#241F1A" }}>
                Fill out the form below and our team will get back to you shortly.
              </p>
            </div>

            <form id="request-form" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }} onSubmit={handleSubmit}>
              <label>
                <div style={{ marginBottom: ".5rem", fontSize: ".9375rem", fontWeight: 500, color: "rgba(58,52,44,.8)" }}>Full Name</div>
                <input
                  type="text"
                  required
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: "100%", border: "1px solid #E2E2DE", background: "#F5F5F4", borderRadius: "10px", padding: ".75rem 1rem", fontSize: ".875rem", outline: "none", transition: "border .2s, background .2s" }}
                />
              </label>

              <label>
                <div style={{ marginBottom: ".5rem", fontSize: ".9375rem", fontWeight: 500, color: "rgba(58,52,44,.8)" }}>Email Address</div>
                <input
                  type="email"
                  required
                  placeholder="you@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{ width: "100%", border: "1px solid #E2E2DE", background: "#F5F5F4", borderRadius: "10px", padding: ".75rem 1rem", fontSize: ".875rem", outline: "none", transition: "border .2s, background .2s" }}
                />
              </label>

              <label>
                <div style={{ marginBottom: ".5rem", fontSize: ".9375rem", fontWeight: 500, color: "rgba(58,52,44,.8)" }}>Phone Number</div>
                <input
                  type="tel"
                  placeholder="+63 900 000 0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={{ width: "100%", border: "1px solid #E2E2DE", background: "#F5F5F4", borderRadius: "10px", padding: ".75rem 1rem", fontSize: ".875rem", outline: "none", transition: "border .2s, background .2s" }}
                />
              </label>

              <label>
                <div style={{ marginBottom: ".5rem", fontSize: ".9375rem", fontWeight: 500, color: "rgba(58,52,44,.8)" }}>Inquiry</div>
                <textarea
                  rows={4}
                  required
                  placeholder="Please share details regarding your inquiry or partnership interest."
                  value={formData.inquiry}
                  onChange={(e) => setFormData({ ...formData, inquiry: e.target.value })}
                  style={{ width: "100%", border: "1px solid #E2E2DE", background: "#F5F5F4", borderRadius: "10px", padding: ".75rem 1rem", fontSize: ".875rem", outline: "none", resize: "none", transition: "border .2s, background .2s" }}
                />
              </label>

              <div style={{ marginTop: ".5rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
                <span style={{ fontSize: ".75rem", color: "rgba(74,68,60,.45)" }}>We reply within one business day.</span>
                <button type="submit" className="pill-btn" disabled={isSubmitting}>
                  <span className="pill-inner pill-accent pill-with-arrow">
                    {isSubmitting ? "Sending…" : <>Send inquiry <span className="pill-badge up-right">↗</span></>}
                  </span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div id="modal-success" style={{ display: "flex", paddingBlock: "2rem", gap: "1rem", textAlign: "center", flexDirection: "column", alignItems: "center" }}>
            <span style={{ width: "3.5rem", height: "3.5rem", display: "grid", placeItems: "center", borderRadius: "9999px", background: "#241F1A", color: "#F36B21", fontSize: "1.5rem" }}>★</span>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 600 }}>Message received</h2>
            <p style={{ maxWidth: "32ch", fontSize: ".875rem", color: "rgba(74,68,60,.6)" }}>Thank you for reaching out to Bishnoi — we will get back to you within one business day.</p>
            <button className="pill-btn" onClick={handleClose}>
              <span className="pill-inner pill-dark pill-no-arrow">Close</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
