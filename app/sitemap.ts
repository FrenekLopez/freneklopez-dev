import { MetadataRoute } from "next";

// METADATA ROUTE: SITEMAP GENERATION
// Standard search engine mapping configuration compatible with production cloud compilation.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://freneklopez.dev",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
  ];
}
