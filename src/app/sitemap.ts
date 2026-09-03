import type { MetadataRoute } from "next";

export const dynamic = "force-static";

/* One manifest rather than a hand-kept list, so adding a route means adding a
   row here and nothing else. Priorities express what this site is for: the
   Bishnoi reference pages sit level with the corporate pages, because the
   informational queries they answer are the ones the site can realistically
   win. The head term "bishnoi" belongs to an encyclopedia and, in news, to an
   unrelated crime story — the long tail below is the winnable ground. */
const ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "", priority: 1.0, changeFrequency: "weekly" },

  // The Bishnoi knowledge cluster. One concept, one canonical page.
  { path: "/bishnoi", priority: 0.9, changeFrequency: "monthly" },
  { path: "/bishnoi/29-principles", priority: 0.9, changeFrequency: "monthly" },
  { path: "/bishnoi/khejarli", priority: 0.9, changeFrequency: "monthly" },
  { path: "/bishnoi/guru-jambheshwar", priority: 0.8, changeFrequency: "monthly" },
  { path: "/bishnoi/amrita-devi", priority: 0.8, changeFrequency: "monthly" },
  { path: "/bishnoi/name-and-origin", priority: 0.8, changeFrequency: "monthly" },

  // The business ecosystem.
  { path: "/businesses", priority: 0.9, changeFrequency: "weekly" },
  { path: "/leadership/naresh-bishnoi", priority: 0.8, changeFrequency: "monthly" },
  { path: "/businesses/getmeds", priority: 0.8, changeFrequency: "monthly" },
  { path: "/businesses/bishnoi-omniverse", priority: 0.7, changeFrequency: "monthly" },
  { path: "/businesses/foundation", priority: 0.7, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bishnoi.ai";
  const lastModified = new Date();

  return ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${baseUrl}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
