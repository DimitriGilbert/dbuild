import { getAllTagSummaries } from "@/lib/blog"
import { createStaticPageMetadata } from "@/lib/seo"

import { TagsPageContent } from "./tags-page-content"

const TAGS_DESCRIPTION = "Navigate the Dbuild.dev knowledge graph by topic and tag."

export const metadata = createStaticPageMetadata({
  title: "Blog Tags",
  description: TAGS_DESCRIPTION,
  pathname: "/blog/tags",
  imageAlt: "Dbuild.dev Blog Tags",
})

interface TagWithCount {
  name: string
  slug: string
  count: number
}

export default function TagsPage() {
  const tags = getAllTagSummaries()

  const tagsWithCounts: TagWithCount[] = tags.map((tag) => ({
    name: tag.name,
    slug: tag.slug,
    count: tag.count,
  })).sort((a, b) => b.count - a.count)

  return <TagsPageContent tagsWithCounts={tagsWithCounts} totalTags={tags.length} />
}
