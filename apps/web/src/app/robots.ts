import type { MetadataRoute } from "next"

export const dynamic = "force-static"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://dbuild.dev"

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/favicon.ico"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
