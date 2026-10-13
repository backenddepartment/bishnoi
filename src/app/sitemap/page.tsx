"use client";

import Header from "@/components/Header";
import NavOverlay from "@/components/NavOverlay";
import Footer from "@/components/Footer";
import RequestModal from "@/components/RequestModal";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useLenisPage, scrollToOrNavigate } from "@/hooks/useLenisPage";
import { PRIORITY, ROUTES, routesBySection } from "@/lib/seo";

/* The human sitemap. Built from the same manifest as /sitemap.xml, so the page
   a reader sees and the file a crawler reads can never list different routes.

   It earns its place twice over: it is a real navigation aid on a site whose
   menu is an overlay, and it gives every page one more internal link from a
   crawlable, static page. */
export default function SitemapPage() {
  const { navOpen, setNavOpen, modalOpen, setModalOpen, lenisRef } = useLenisPage();
  const handleScrollTo = (id: string) => scrollToOrNavigate(id, lenisRef);

  const sections = routesBySection();
  const imageCount = ROUTES.reduce((total, route) => total + route.images.length, 0);

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
      />

      <NavOverlay
        isOpen={navOpen}
        onClose={() => setNavOpen(false)}
        onScrollTo={handleScrollTo}
        onOpenRequestModal={() => setModalOpen(true)}
      />

      <RequestModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      <main id="main-content" style={{ background: "#ffffff", minHeight: "100vh", color: "var(--ink)" }}>
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Sitemap" }]} />

        <div className="shell sitemap-page">
          <header className="sitemap-head">
            <span className="sitemap-kicker">Sitemap</span>
            <h1>Every page on this site</h1>
            <p className="sitemap-standfirst">
              {ROUTES.length} pages, grouped as the site is. For crawlers, the same list is served as{" "}
              <a href="/sitemap.xml">sitemap.xml</a>, and the {imageCount} photographs across these pages as{" "}
              <a href="/image-sitemap.xml">image-sitemap.xml</a>.
            </p>
          </header>

          {sections.map(({ section, routes }) => (
            <section key={section} className="sitemap-section">
              <h2>{section}</h2>
              <ul>
                {routes.map((route) => (
                  <li key={route.path}>
                    <a href={route.path || "/"}>{route.label}</a>
                    <span className="sitemap-blurb">{route.blurb}</span>
                    <span className="sitemap-meta">
                      {route.path || "/"} · priority {PRIORITY[route.tier].toFixed(1)} · {route.changeFrequency}
                      {route.images.length > 0 && ` · ${route.images.length} image${route.images.length === 1 ? "" : "s"}`}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </main>

      <Footer onOpenRequestModal={() => setModalOpen(true)} introReady={true} />
    </>
  );
}
