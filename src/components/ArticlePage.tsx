"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

import Header from "@/components/Header";
import NavOverlay from "@/components/NavOverlay";
import Footer from "@/components/Footer";
import RequestModal from "@/components/RequestModal";
import Breadcrumbs, { type BreadcrumbItem } from "@/components/Breadcrumbs";
import { useLenisPage, scrollToOrNavigate } from "@/hooks/useLenisPage";

export interface RelatedLink {
  href: string;
  label: string;
  blurb: string;
  /** Card fill in the rail layout, as a hex string. Omit for the plain white
      card. The text colour is derived from it by default — see readableInk
      below. Ignored by the default layout. */
  color?: string;
  /** Overrides the derived text colour when the design calls for a specific
      one. "light" on a mid-tone fill trades some contrast for consistency,
      so set it deliberately rather than to save a thought. */
  ink?: "light" | "dark";
}

interface ArticlePageProps {
  /** Small label above the title — the era or topic, not a slogan. */
  kicker: string;
  title: string;
  /** One paragraph answering the page's question before the reader scrolls. */
  standfirst: string;
  breadcrumbs: BreadcrumbItem[];
  /** Rendered inside .prose. Plain markup only — see the note below. */
  children: ReactNode;
  /** Right-hand key facts panel beside the standfirst. Optional. */
  facts?: { label: string; value: ReactNode }[];
  sources: { label: string; href: string }[];
  related: RelatedLink[];
  /** Grading note shown above the sources, when a page rests on tradition. */
  sourceNote?: string;
  /** Fill for the page's two tinted bands — the opening hero and the
      "Continue" block at the foot. Ivory by default; "white" drops both
      tints so the page runs flush from top to bottom. */
  tone?: "ivory" | "white";
  /** Extra schema.org nodes for this page — an FAQPage, say. Emitted as a
      second ld+json block alongside the site-wide graph in the root layout. */
  jsonLd?: object;
  /** "rail" runs the facts panel and the Continue cards together as one
      left-hand column that pins while the article scrolls past it, instead
      of a facts panel up top and a full-width Continue block at the foot. */
  layout?: "default" | "rail";
}

const LIGHT_INK = { ink: "#ffffff", soft: "rgba(255,255,255,.88)" };
const DARK_INK = { ink: "#1C1815", soft: "rgba(28,24,21,.74)" };

/* Which text colour survives on a given card fill. Derived rather than passed
   in so a new hex can never silently produce unreadable text: white on the
   gold (#C8A45D) is only a 2.4:1 contrast ratio and fails WCAG outright,
   while the dark ink clears 6:1 on it. Standard sRGB relative luminance. */
function readableInk(hex: string) {
  const h = hex.replace("#", "");
  const channel = (i: number) => {
    const c = parseInt(h.slice(i * 2, i * 2 + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  const luminance = 0.2126 * channel(0) + 0.7152 * channel(1) + 0.0722 * channel(2);
  const onLight = (luminance + 0.05) / 0.1;
  const onDark = 1.05 / (luminance + 0.05);
  return onDark >= onLight ? LIGHT_INK : DARK_INK;
}

/* Shared shell for the /bishnoi/* reference pages.

   These pages exist to BE the record, so unlike the homepage they render
   every word of their content unconditionally, in the document, at full
   opacity. No accordions, no overlays, no reveal-on-scroll. That is a
   deliberate split of duties: the homepage's job is to make someone want
   the story and it earns its interaction budget doing that; these pages'
   job is to be findable and readable, and content behind a click is
   neither. (Before this split, only 8 of the 29 principles and none of the
   eight legacy chapter bodies appeared in the served HTML at all.) */
export default function ArticlePage({
  kicker,
  title,
  standfirst,
  breadcrumbs,
  children,
  facts,
  sources,
  related,
  sourceNote,
  tone = "ivory",
  jsonLd,
  layout = "default",
}: ArticlePageProps) {
  const { navOpen, setNavOpen, modalOpen, setModalOpen, lenisRef } = useLenisPage();
  const handleScrollTo = (id: string) => scrollToOrNavigate(id, lenisRef);

  const hasFacts = !!(facts && facts.length > 0);
  const isRail = layout === "rail";

  /* The rail pins by its BOTTOM edge, so the last Continue card is what comes
     to rest on screen. CSS `bottom:` sticky cannot do this: once the rail is
     taller than the viewport it no longer fits the sticky constraint rect and
     Chrome applies no shift at all, so the rail just scrolls away. A negative
     `top:` does work — pin the top that far above the viewport and the bottom
     lands just inside it — but the offset depends on the rail's own height,
     which only the browser knows. So measure it into a custom property and let
     the min() in globals.css choose: 7rem for a rail that fits on screen,
     the negative offset for one that doesn't. */
  const railRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      el.style.setProperty("--rail-h", `${el.getBoundingClientRect().height}px`);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /* The four blocks both layouts are built from. Declared once so the two
     arrangements below differ only in how they are nested, never in what
     they render. */
  const headBlock = (
    <div className="article-head-main" style={{ display: "flex", flexDirection: "column", gap: "1.25rem", minWidth: 0 }}>
      <div className="act-mark">
        <span className="act-mark-rule" aria-hidden="true" />
        <span className="act-mark-era">{kicker}</span>
      </div>
      <h1
        className="act-title break-words text-[2.25rem] sm:text-[3rem] md:text-[3.5rem]"
        style={{ fontWeight: 700, lineHeight: 1.08, letterSpacing: "-.025em", color: "var(--ink-deep)" }}
      >
        {title}
      </h1>
      <p style={{ fontSize: "1.25rem", lineHeight: 1.6, color: "var(--ink-soft)", margin: 0, maxWidth: "58ch" }}>
        {standfirst}
      </p>
    </div>
  );

  const factsBlock = hasFacts ? (
    <dl className="fact-panel">
      {facts!.map((f) => (
        <div key={f.label} className="fact-row">
          <dt>{f.label}</dt>
          <dd>{f.value}</dd>
        </div>
      ))}
    </dl>
  ) : null;

  const bodyBlock = (
    <>
      <div className="prose">{children}</div>

      <div className="article-sources">
        <h2>Sources</h2>
        {sourceNote && <p className="source-note">{sourceNote}</p>}
        <ul>
          {sources.map((s) => (
            <li key={s.href}>
              <a href={s.href} target="_blank" rel="noreferrer">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="source-note">
          This page describes the history of the Bishnoi community, which is far larger than, and mostly unconnected
          to, the businesses that carry the Bishnoi name. Nothing here is a claim on that heritage.
        </p>
      </div>
    </>
  );

  const cardInk = (r: RelatedLink) =>
    r.ink === "light" ? LIGHT_INK : r.ink === "dark" ? DARK_INK : readableInk(r.color!);

  const relatedCards = related.map((r) => (
    <a
      key={r.href}
      href={r.href}
      className="related-card"
      style={
        isRail && r.color
          ? ({
              "--card-bg": r.color,
              "--card-ink": cardInk(r).ink,
              "--card-ink-soft": cardInk(r).soft,
            } as CSSProperties)
          : undefined
      }
    >
      <span className="related-label">{r.label}</span>
      <span className="related-blurb">{r.blurb}</span>
      <span className="related-arrow" aria-hidden="true">
        &rarr;
      </span>
    </a>
  ));

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-60 focus:rounded-control focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>

      <Header
        onOpenNav={() => setNavOpen(true)}
        onOpenRequestModal={() => setModalOpen(true)}
        onScrollTo={handleScrollTo}
        introReady={true}
        lightNav
      />

      <NavOverlay
        isOpen={navOpen}
        onClose={() => setNavOpen(false)}
        onScrollTo={handleScrollTo}
        onOpenRequestModal={() => setModalOpen(true)}
      />

      <RequestModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      <main id="main-content" style={{ background: "#ffffff", color: "var(--ink)" }}>
        {jsonLd && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        )}
        {/* Opening band. A tint rather than a photographic hero: these are
            reference pages, and a full-bleed image would push the answer
            below the fold on every one of them. */}
        <div
          style={{
            background: tone === "white" ? "#ffffff" : "var(--brand-ivory)",
            paddingTop: "7.5rem",
            paddingBottom: isRail ? "4rem" : "3.5rem",
          }}
        >
          <div className="shell">
            {isRail ? (
              /* One grid for the whole page: the rail holds the facts and the
                 Continue cards together on the left and pins itself there,
                 while the title, breadcrumbs and article scroll past on the
                 right. Article first in the DOM so the stacked layout still
                 opens on the title; the rail is placed left by CSS. */
              <div className="article-rail-layout">
                <div className="article-rail-main">
                  {headBlock}
                  <Breadcrumbs items={breadcrumbs} />
                  <article style={{ paddingTop: "2.5rem" }}>{bodyBlock}</article>
                </div>

                <aside className="article-rail" ref={railRef}>
                  {factsBlock}
                  {related.length > 0 && (
                    <div>
                      <div className="eyebrow eyebrow-dark" style={{ fontSize: "1.125rem", marginBottom: "1.25rem" }}>
                        <span className="dot"></span> Continue
                      </div>
                      <div className="article-rail-cards">{relatedCards}</div>
                    </div>
                  )}
                </aside>
              </div>
            ) : (
              <div className={`article-head${hasFacts ? " article-head--facts" : ""}`}>
                {/* Kept first in the DOM even though the facts panel sits to its
                    left: the stacked layout follows source order, and the title
                    has to be the first thing read there. The swap is done with
                    grid placement in globals.css, not by reordering markup. */}
                {headBlock}
                {factsBlock}
              </div>
            )}
          </div>
        </div>

        {!isRail && (
          <>
            {/* Breadcrumbs and body share the hero's column split, so the whole
                page reads down one right-hand column with the facts panel alone
                on the left. Applied on a wrapper rather than on each block, and
                only when there is a facts panel to sit opposite. */}
            <div className={hasFacts ? "article-indent" : undefined}>
              <Breadcrumbs items={breadcrumbs} />

              <article className="shell" style={{ paddingTop: "2.5rem", paddingBottom: "4rem" }}>
                {bodyBlock}
              </article>
            </div>

            {related.length > 0 && (
              <section style={{ background: tone === "white" ? "#ffffff" : "var(--brand-ivory)", padding: "4rem 0 5rem" }}>
                <div className="shell">
                  <div className="eyebrow eyebrow-dark" style={{ fontSize: "1.125rem", marginBottom: "1.75rem" }}>
                    <span className="dot"></span> Continue
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: "1.25rem" }}>
                    {relatedCards}
                  </div>
                </div>
              </section>
            )}
          </>
        )}
      </main>

      <Footer onOpenRequestModal={() => setModalOpen(true)} introReady={true} />
    </>
  );
}
