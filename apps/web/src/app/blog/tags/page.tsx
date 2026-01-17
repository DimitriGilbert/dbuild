import { getAllTags, getPostsByTag } from "@/lib/blog"
import { TagsPageContent } from "./tags-page-content"

interface TagWithCount {
  name: string
  count: number
}

export default function TagsPage() {
  const tags = getAllTags()

  const tagsWithCounts: TagWithCount[] = tags.map((tag) => ({
    name: tag,
    count: getPostsByTag(tag).length,
  })).sort((a, b) => b.count - a.count)

  return <TagsPageContent tagsWithCounts={tagsWithCounts} totalTags={tags.length} />
}
