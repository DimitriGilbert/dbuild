import { ProjectHero } from "@/components/project-hero"
import { getAllProjects } from "@/lib/projects"
import { getAllPosts } from "@/lib/blog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"
import { PrefetchLink } from "@/components/prefetch-link"

export default function HomePage() {
  const projects = getAllProjects()
  const recentPosts = getAllPosts().slice(0, 3)

  return (
    <div className="min-h-screen">
      <ProjectHero projects={projects} />

      {/* Recent Articles Section */}
      {recentPosts.length > 0 && (
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Latest Articles</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Insights, tutorials, and thoughts on development, tools, and technology
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {recentPosts.map((post) => (
                <Card key={post.slug} className="group hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                      <Clock className="w-4 h-4 ml-2" />
                      <span>{post.readTime} min read</span>
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      <PrefetchLink href={`/blog/${post.slug}`}>{post.title}</PrefetchLink>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 line-clamp-3">{post.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="secondary">{post.category}</Badge>
                      {post.tags.slice(0, 2).map((tag) => (
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

            <div className="text-center">
              <PrefetchLink href="/blog">
                <Button size="lg">
                  View All Articles <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </PrefetchLink>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
