import type { MetadataRoute } from "next"

import { getAllTagSummaries } from "@/lib/blog"
import { formatCanonicalUrl } from "@/lib/seo"
import { createUrlSet, createXmlResponse } from "@/lib/xml-sitemap"

export const dynamic = "force-static"

export function GET(): Response {
  const entries: MetadataRoute.Sitemap = getAllTagSummaries().map((tag) => ({
    url: formatCanonicalUrl(`/blog/tags/${tag.slug}`),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }))

  return createXmlResponse(createUrlSet(entries))
}
