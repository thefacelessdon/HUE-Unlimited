import type { MetadataRoute } from "next";

const BASE = "https://hueunlimited.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/archives",
    "/film-archive",
    "/polaroid-archives",
    "/work/frequency",
    "/work/soul",
    "/work/red-bull-camp",
    "/work/death-row",
    "/work/commerce",
  ];

  return routes.map((route) => ({
    url: `${BASE}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
