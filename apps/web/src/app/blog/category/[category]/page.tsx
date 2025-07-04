import { notFound } from "next/navigation"
import { getCategoryBySlug, getAllCategoryPosts } from "@/lib/blog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight, ArrowLeft, FolderOpen } from "lucide-react"
import Link from "next/link"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import { PrefetchLink } from "@/components/prefetch-link"

interface CategoryPageProps {
  params: Promise<{ category: string }>
}

export async function generateStaticParams() {
  const categories = getAllCategoryPosts()
  return categories.map((category) => ({
    category: category.slug,
  }))
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params
  const categoryData = getCategoryBySlug(category)

  if (!categoryData) {
    notFound()
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-12">
        <PrefetchLink href="/blog">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            All Articles
          </Button>
        </PrefetchLink>

        <div className="max-w-4xl mx-auto">
          {/* Category Header */}
          <header className="mb-12">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <PrefetchLink 
                href="/blog" 
                className="hover:text-primary transition-colors"
              >
                Blog
              </PrefetchLink>
              <span>/</span>
              <FolderOpen className="w-4 h-4" />
              <span>{categoryData.directory}</span>
            </div>
            
            <h1 className="text-4xl font-bold mb-4">{categoryData.title}</h1>
            
            {categoryData.description && (
              <p className="text-xl text-muted-foreground mb-6">{categoryData.description}</p>
            )}

            <div className="text-sm text-muted-foreground">
              {categoryData.posts.length} article{categoryData.posts.length !== 1 ? "s" : ""} in this category
            </div>
          </header>

          {/* Category Description/Content */}
          {categoryData.content && (
            <div className="mb-12 prose prose-gray dark:prose-invert max-w-none">
              <MarkdownRenderer content={categoryData.content} />
            </div>
          )}

          {/* Articles in Category */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Articles</h2>
            {categoryData.posts.length > 0 ? (
              categoryData.posts.map((post) => (
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
                      {post.tags.map((tag) => (
                        <PrefetchLink key={tag} href={`/blog/tags/${tag.toLowerCase()}`}>
                          <Badge variant="outline" className="hover:bg-primary hover:text-primary-foreground cursor-pointer">
                            {tag}
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
              ))
            ) : (
              <p className="text-muted-foreground">No articles in this category yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 