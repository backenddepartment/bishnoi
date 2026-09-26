import { PRIORITY, ROUTES_WITH_IMAGES, absolute } from "@/lib/seo";

export const dynamic = "force-static";

/* The image sitemap, at /image-sitemap.xml.

   Hand-rolled rather than produced by app/sitemap.ts, because Next's `images`
   property emits image entries into the SAME urlset as the pages — which is
   valid, but gives one combined file. Google reads image entries from either
   arrangement; two files means Search Console reports page indexing and image
   indexing separately, which is the whole point of splitting them.

   An image sitemap keys images to the page they appear on, so <loc> is the page
   and each <image:image> beneath it is a photograph on that page. The same
   photograph legitimately appears under more than one page.

   Schema: https://developers.google.com/search/docs/crawling-indexing/sitemaps/image-sitemaps */

/** XML text escaping. Titles and captions are prose and will contain & and
    quotes sooner or later; an unescaped one makes the whole file unparseable. */
function xml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const lastModified = new Date().toISOString();

  const urls = ROUTES_WITH_IMAGES.map((route) => {
    const images = route.images
      .map((image) =>
        [
          "    <image:image>",
          `      <image:loc>${xml(absolute(image.loc))}</image:loc>`,
          `      <image:title>${xml(image.title)}</image:title>`,
          ...(image.caption ? [`      <image:caption>${xml(image.caption)}</image:caption>`] : []),
          "    </image:image>",
        ].join("\n")
      )
      .join("\n");

    return [
      "  <url>",
      `    <loc>${xml(absolute(route.path))}</loc>`,
      `    <lastmod>${lastModified}</lastmod>`,
      `    <changefreq>${route.changeFrequency}</changefreq>`,
      `    <priority>${PRIORITY[route.tier].toFixed(1)}</priority>`,
      images,
      "  </url>",
    ].join("\n");
  }).join("\n");

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
    urls,
    "</urlset>",
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
