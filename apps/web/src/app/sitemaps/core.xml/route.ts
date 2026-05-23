import type { MetadataRoute } from "next"

import { formatCanonicalUrl } from "@/lib/seo"
import { createUrlSet, createXmlResponse } from "@/lib/xml-sitemap"

export const dynamic = "force-static"

export function GET(): Response {
  const entries: MetadataRoute.Sitemap = [
    {
      url: formatCanonicalUrl(),
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: formatCanonicalUrl("/blog"),
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: formatCanonicalUrl("/blog/tags"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: formatCanonicalUrl("/projects"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: formatCanonicalUrl("/index.json"),
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.4,
    },
    {
      url: formatCanonicalUrl("/llms.txt"),
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.4,
    },
  ]

  return createXmlResponse(createUrlSet(entries))
}
