import type { MetadataRoute } from "next"

import { getAllCategoryPosts } from "@/lib/blog"
import { formatCanonicalUrl } from "@/lib/seo"
import { createUrlSet, createXmlResponse } from "@/lib/xml-sitemap"

export const dynamic = "force-static"

export function GET(): Response {
  const entries: MetadataRoute.Sitemap = getAllCategoryPosts().map((category) => ({
    url: formatCanonicalUrl(`/blog/category/${category.slug}`),
    lastModified: new Date(category.updatedAt ?? category.date),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }))

  return createXmlResponse(createUrlSet(entries))
}
