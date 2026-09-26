import type { MetadataRoute } from "next";

import { PRIORITY, ROUTES, absolute } from "@/lib/seo";

export const dynamic = "force-static";

/* The URL sitemap — pages only. Images are listed separately in
   /image-sitemap.xml so that an image crawl and a page crawl can be submitted,
   diagnosed and re-fetched independently in Search Console.

   Routes, tiers and priorities all come from src/lib/seo.ts. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.map(({ path, tier, changeFrequency }) => ({
    url: absolute(path),
    lastModified,
    changeFrequency,
    priority: PRIORITY[tier],
  }));
}
