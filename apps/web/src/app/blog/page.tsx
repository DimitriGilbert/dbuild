import { getAllPosts, getAllCategories, getAllTags, getAllCategoryPosts } from "@/lib/blog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"
import { PrefetchLink } from "@/components/prefetch-link"

export default function BlogPage() {
  const allPosts = getAllPosts()
  const posts = allPosts.filter(post => !post.isCategory) // Exclude category index pages
  const categories = getAllCategories()
  const tags = getAllTags()
  const categoryPosts = getAllCategoryPosts()

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Blog</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Articles about development, tools, and the craft of building things
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div>
                <h3 className="font-semibold mb-3">Categories</h3>
                <div className="space-y-2">
                  {categoryPosts.map((category) => (
                    <PrefetchLink
                      key={category.slug}
                      href={`/blog/category/${category.slug}`}
                      className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {category.title}
                    </PrefetchLink>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {tags.slice(0, 10).map((tag) => (
                    <PrefetchLink key={tag} href={`/blog/tags/${tag.toLowerCase()}`}>
                      <Badge variant="outline" className="hover:bg-primary hover:text-primary-foreground">
                        {tag}
                      </Badge>
                    </PrefetchLink>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Posts */}
          <div className="lg:col-span-3">
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
