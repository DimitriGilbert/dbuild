import { getAllTags, getPostsByTag } from "@/lib/blog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { PrefetchLink } from "@/components/prefetch-link"

export default function TagsPage() {
  const tags = getAllTags()

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Tags</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">Explore articles by topic and technology</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tags.map((tag) => {
            const posts = getPostsByTag(tag)
            return (
              <PrefetchLink key={tag} href={`/blog/tags/${tag.toLowerCase()}`}>
                <Card className="group hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="group-hover:text-primary transition-colors">{tag}</span>
                      <Badge variant="secondary">{posts.length}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">
                      {posts.length} article{posts.length !== 1 ? "s" : ""} tagged with {tag}
                    </p>
                  </CardContent>
                </Card>
              </PrefetchLink>
            )
          })}
        </div>
      </div>
    </div>
  )
}
