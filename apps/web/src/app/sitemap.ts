import type { MetadataRoute } from "next"

import { getAllCategoryPosts, getAllPosts, getAllTagSummaries } from "@/lib/blog"
import { getAllProjects } from "@/lib/projects"
import { formatCanonicalUrl } from "@/lib/seo"

export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
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
  ]

  const posts = getAllPosts().filter((post) => !post.isCategory)
  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: formatCanonicalUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  const categories = getAllCategoryPosts()
  const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: formatCanonicalUrl(`/blog/category/${category.slug}`),
    lastModified: new Date(category.date),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }))

  const tags = getAllTagSummaries()
  const tagPages: MetadataRoute.Sitemap = tags.map((tag) => ({
    url: formatCanonicalUrl(`/blog/tags/${tag.slug}`),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }))

  const projects = getAllProjects()
  const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
    url: formatCanonicalUrl(`/projects/${project.id}`),
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [
    ...staticPages,
    ...blogPages,
    ...categoryPages,
    ...tagPages,
    ...projectPages,
  ]
}
