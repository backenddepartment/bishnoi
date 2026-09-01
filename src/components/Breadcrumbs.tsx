export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

// Visual trail + matching BreadcrumbList JSON-LD, so the same hierarchy that
// helps a visitor orient also tells search engines where a page sits in the
// site (Home > Businesses > Bishnoi Omniverse, etc.).
export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bishnoi.ai";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `${baseUrl}${item.href}` } : {}),
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className="shell" style={{ paddingTop: "1.5rem" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ol style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: ".4rem", fontSize: ".875rem", color: "var(--ink-soft)" }}>
        {items.map((item, i) => (
          <li key={item.label} style={{ display: "flex", alignItems: "center", gap: ".4rem" }}>
            {i > 0 && <span aria-hidden="true" style={{ color: "rgba(74,68,60,.35)" }}>/</span>}
            {item.href ? (
              <a href={item.href} style={{ color: "var(--ink-soft)", textDecoration: "none" }} className="hover-underline-slide">
                {item.label}
              </a>
            ) : (
              <span style={{ color: "var(--ink)", fontWeight: 600 }}>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
