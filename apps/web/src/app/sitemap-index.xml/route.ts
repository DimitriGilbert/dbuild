import { createSitemapIndex, createXmlResponse } from "@/lib/xml-sitemap"
import { formatCanonicalUrl } from "@/lib/seo"

export const dynamic = "force-static"

export function GET(): Response {
  const lastmod = new Date().toISOString()

  return createXmlResponse(
    createSitemapIndex([
      { loc: formatCanonicalUrl("/sitemaps/core.xml"), lastmod },
      { loc: formatCanonicalUrl("/sitemaps/articles.xml"), lastmod },
      { loc: formatCanonicalUrl("/sitemaps/projects.xml"), lastmod },
      { loc: formatCanonicalUrl("/sitemaps/categories.xml"), lastmod },
      { loc: formatCanonicalUrl("/sitemaps/tags.xml"), lastmod },
    ])
  )
}
