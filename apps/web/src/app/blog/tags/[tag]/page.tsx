import { notFound } from "next/navigation"
import { getPostsByTag, getAllTags } from "@/lib/blog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { PrefetchLink } from "@/components/prefetch-link"

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

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-12">
        <PrefetchLink href="/blog/tags">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            All Tags
          </Button>
        </PrefetchLink>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Articles tagged with <span className="text-primary">{tag}</span>
          </h1>
          <p className="text-muted-foreground">
            {posts.length} article{posts.length !== 1 ? "s" : ""} found
          </p>
        </div>

        <div className="space-y-6">
          {posts.map((post) => (
            <Card key={post.slug} className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                  <Clock className="w-4 h-4 ml-2" />
                  <span>{post.readTime} min read</span>
                </div>
                <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                  <PrefetchLink href={`/blog/${post.slug}`}>{post.title}</PrefetchLink>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{post.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">{post.category}</Badge>
                  {post.tags.map((postTag) => (
                    <PrefetchLink key={postTag} href={`/blog/tags/${postTag.toLowerCase()}`}>
                      <Badge variant={postTag.toLowerCase() === tag.toLowerCase() ? "default" : "outline"} className="hover:bg-primary hover:text-primary-foreground cursor-pointer">
                        {postTag}
                      </Badge>
                    </PrefetchLink>
                  ))}
                </div>
                <PrefetchLink href={`/blog/${post.slug}`}>
                  <Button variant="ghost" className="p-0 h-auto font-medium">
                    Read more <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </PrefetchLink>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
