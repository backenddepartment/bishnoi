import type { MetadataRoute } from "next";

import { absolute } from "@/lib/seo";

export const dynamic = "force-static";

/* Standard permissive robots.txt: the site wants to be crawled, and the
   sitemaps say what to crawl. Disallow is the opposite instrument — it names
   the paths that must NOT be crawled.

   None of the admin paths below exist on this site yet. They are listed as a
   standing guard: if an admin surface is ever mounted at one of these, it is
   excluded from the day it ships rather than the day someone notices it in
   Search Console. A Disallow on a path that 404s costs nothing.

   Deliberately NOT disallowed: /_next/. Blocking it stops Googlebot fetching
   the CSS and JS it needs to render the page, and a page Google cannot render
   is a page it misjudges. */
const ADMIN_PATHS = [
  "/admin",
  "/backpanel",
  "/back-panel",
  "/dashboard",
  "/cpanel",
  "/wp-admin",
  "/login",
  "/signin",
  "/api/",
  "/private/",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ADMIN_PATHS,
    },
    sitemap: [absolute("/sitemap.xml"), absolute("/image-sitemap.xml")],
    host: absolute(""),
  };
}
