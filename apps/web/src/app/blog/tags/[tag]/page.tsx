import { notFound } from "next/navigation"
import { getPostsByTag, getAllTags } from "@/lib/blog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight, ArrowLeft, Terminal, Hash, BookOpen } from "lucide-react"
import { PrefetchLink } from "@/components/prefetch-link"
import { TagDetailContent } from "./tag-detail-content"

interface TagPageProps {
  params: Promise<{ tag: string }>
}

export async function generateStaticParams() {
  const tags = getAllTags()
  return tags.map((tag) => ({
    tag: tag.toLowerCase(),
  }))
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params
  const posts = getPostsByTag(tag)

  if (posts.length === 0) {
    notFound()
  }

  return <TagDetailContent tag={tag} posts={posts} />
}
