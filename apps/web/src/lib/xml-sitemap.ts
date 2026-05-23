import type { MetadataRoute } from "next"

export interface SitemapIndexEntry {
  loc: string
  lastmod: string
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

function formatDate(value: Date | string | undefined): string {
  if (!value) {
    return new Date().toISOString()
  }

  if (value instanceof Date) {
    return value.toISOString()
  }

  return new Date(value).toISOString()
}

export function createUrlSet(entries: MetadataRoute.Sitemap): string {
  const urls = entries.map((entry) => {
    const fields = [
      `<loc>${escapeXml(entry.url)}</loc>`,
      `<lastmod>${formatDate(entry.lastModified)}</lastmod>`,
      entry.changeFrequency ? `<changefreq>${entry.changeFrequency}</changefreq>` : "",
      typeof entry.priority === "number" ? `<priority>${entry.priority.toFixed(1)}</priority>` : "",
    ].filter((field) => field.length > 0)

    return `<url>${fields.join("")}</url>`
  })

  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join("")}</urlset>`
}

export function createSitemapIndex(entries: readonly SitemapIndexEntry[]): string {
  const sitemaps = entries.map(
    (entry) => `<sitemap><loc>${escapeXml(entry.loc)}</loc><lastmod>${escapeXml(entry.lastmod)}</lastmod></sitemap>`
  )

  return `<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemaps.join("")}</sitemapindex>`
}

export function createXmlResponse(body: string): Response {
  return new Response(body, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
    },
  })
}
