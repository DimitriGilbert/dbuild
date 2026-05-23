import type { MetadataRoute } from "next"

import { getAllProjects } from "@/lib/projects"
import { formatCanonicalUrl } from "@/lib/seo"
import { createUrlSet, createXmlResponse } from "@/lib/xml-sitemap"

export const dynamic = "force-static"

export function GET(): Response {
  const entries: MetadataRoute.Sitemap = getAllProjects().map((project) => ({
    url: formatCanonicalUrl(`/projects/${project.id}`),
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return createXmlResponse(createUrlSet(entries))
}
