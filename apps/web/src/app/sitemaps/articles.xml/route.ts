import type { MetadataRoute } from "next"

import { getAllPosts } from "@/lib/blog"
import { formatCanonicalUrl } from "@/lib/seo"
import { createUrlSet, createXmlResponse } from "@/lib/xml-sitemap"

export const dynamic = "force-static"

export function GET(): Response {
  const entries: MetadataRoute.Sitemap = getAllPosts()
    .filter((post) => !post.isCategory)
    .map((post) => ({
      url: formatCanonicalUrl(`/blog/${post.slug}`),
      lastModified: new Date(post.updatedAt ?? post.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))

  return createXmlResponse(createUrlSet(entries))
}
