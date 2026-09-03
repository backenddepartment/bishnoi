"use client";

import type { ReactNode } from "react";

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
}: ArticlePageProps) {
  const { navOpen, setNavOpen, modalOpen, setModalOpen, lenisRef } = useLenisPage();
  const handleScrollTo = (id: string) => scrollToOrNavigate(id, lenisRef);

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
        <div style={{ background: tone === "white" ? "#ffffff" : "var(--brand-ivory)", paddingTop: "7.5rem", paddingBottom: "3.5rem" }}>
          <div className="shell">
            <div className={`article-head${facts && facts.length > 0 ? " article-head--facts" : ""}`}>
              {/* Kept first in the DOM even though the facts panel sits to its
                  left: the stacked layout follows source order, and the title
                  has to be the first thing read there. The swap is done with
                  grid placement in globals.css, not by reordering markup. */}
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

              {facts && facts.length > 0 && (
                <dl className="fact-panel">
                  {facts.map((f) => (
                    <div key={f.label} className="fact-row">
                      <dt>{f.label}</dt>
                      <dd>{f.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
          </div>
        </div>

        {/* Breadcrumbs and body share the hero's column split, so the whole
            page reads down one right-hand column with the facts panel alone
            on the left. Applied on a wrapper rather than on each block, and
            only when there is a facts panel to sit opposite. */}
        <div className={facts && facts.length > 0 ? "article-indent" : undefined}>
          <Breadcrumbs items={breadcrumbs} />

          <article className="shell" style={{ paddingTop: "2.5rem", paddingBottom: "4rem" }}>
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
          </article>
        </div>

        {related.length > 0 && (
          <section style={{ background: tone === "white" ? "#ffffff" : "var(--brand-ivory)", padding: "4rem 0 5rem" }}>
            <div className="shell">
              <div className="eyebrow eyebrow-dark" style={{ fontSize: "1.125rem", marginBottom: "1.75rem" }}>
                <span className="dot"></span> Continue
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: "1.25rem" }}>
                {related.map((r) => (
                  <a key={r.href} href={r.href} className="related-card">
                    <span className="related-label">{r.label}</span>
                    <span className="related-blurb">{r.blurb}</span>
                    <span className="related-arrow" aria-hidden="true">
                      &rarr;
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer onOpenRequestModal={() => setModalOpen(true)} introReady={true} />
    </>
  );
}
