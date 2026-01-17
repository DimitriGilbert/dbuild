"use client"

import type { BlogPost } from "@/lib/blog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight, Terminal, BookOpen, Tag, FolderOpen } from "lucide-react"
import { PrefetchLink } from "@/components/prefetch-link"
import { motion } from "motion/react"
import { BentoCard } from "@/components/bento-card"

interface BlogPageContentProps {
  posts: BlogPost[]
  tags: string[]
  categoryPosts: BlogPost[]
}

export function BlogPageContent({ posts, tags, categoryPosts }: BlogPageContentProps) {
  const featuredPost = posts[0]
  const recentPosts = posts.slice(1, 4)
  const olderPosts = posts.slice(4)

  return (
    <div className="min-h-screen pt-20 relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />

      <div className="container mx-auto px-4 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-2 text-muted-foreground font-mono text-sm mb-4"
          >
            <Terminal className="w-4 h-4 text-primary" />
            <span className="terminal-prompt">cat ./blog/posts.md</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Digital <span className="text-primary text-glow-primary">Grimoire</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground max-w-2xl mx-auto text-lg"
          >
            Articles about development, tools, and the craft of building things.
            <span className="font-mono text-secondary">{" // mostly coherent"}</span>
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="lg:col-span-1 order-2 lg:order-1"
          >
            <div className="sticky top-24 space-y-6">
              <div className="glass-elevated rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <FolderOpen className="w-4 h-4 text-primary" />
                  <span className="font-mono text-sm text-muted-foreground">categories/</span>
                </div>
                <div className="space-y-2">
                  {categoryPosts.map((category, index) => (
                    <motion.div
                      key={category.slug}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.05 }}
                    >
                      <PrefetchLink
                        href={`/blog/category/${category.slug}`}
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors py-1.5 group"
                      >
                        <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                          &gt;
                        </span>
                        <span className="font-mono">{category.title}</span>
                      </PrefetchLink>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="glass-elevated rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="w-4 h-4 text-secondary" />
                  <span className="font-mono text-sm text-muted-foreground">tags.json</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.slice(0, 12).map((tag, index) => (
                    <motion.div
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7 + index * 0.03 }}
                    >
                      <PrefetchLink href={`/blog/tags/${tag.toLowerCase()}`}>
                        <Badge
                          variant="outline"
                          className="hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all font-mono text-xs cursor-pointer"
                        >
                          {tag}
                        </Badge>
                      </PrefetchLink>
                    </motion.div>
                  ))}
                  {tags.length > 12 && (
                    <PrefetchLink href="/blog/tags">
                      <Badge variant="secondary" className="font-mono text-xs cursor-pointer hover:bg-secondary/80">
                        +{tags.length - 12} more
                      </Badge>
                    </PrefetchLink>
                  )}
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-center text-muted-foreground font-mono text-xs p-4"
              >
                <BookOpen className="w-4 h-4 mx-auto mb-2 text-primary" />
                <span>{posts.length} articles indexed</span>
              </motion.div>
            </div>
          </motion.aside>

          <div className="lg:col-span-3 order-1 lg:order-2">
            {featuredPost && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-8"
              >
                <div className="flex items-center gap-2 mb-4 text-muted-foreground font-mono text-xs">
                  <span className="text-accent">$</span>
                  <span>latest --featured</span>
                </div>
                <BentoCard colSpan="3" rowSpan="1" featured className="relative overflow-hidden">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3 font-mono">
                        <span className="text-primary">[{new Date(featuredPost.date).toISOString().split('T')[0]}]</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {featuredPost.readTime}m
                        </span>
                      </div>

                      <h2 className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-primary transition-colors">
                        <PrefetchLink href={`/blog/${featuredPost.slug}`}>
                          {featuredPost.title}
                        </PrefetchLink>
                      </h2>

                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {featuredPost.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        <Badge variant="secondary" className="font-mono">
                          {featuredPost.category}
                        </Badge>
                        {featuredPost.tags.slice(0, 3).map((tag) => (
                          <PrefetchLink key={tag} href={`/blog/tags/${tag.toLowerCase()}`}>
                            <Badge
                              variant="outline"
                              className="hover:bg-primary hover:text-primary-foreground cursor-pointer font-mono text-xs"
                            >
                              {tag}
                            </Badge>
                          </PrefetchLink>
                        ))}
                      </div>

                      <PrefetchLink href={`/blog/${featuredPost.slug}`}>
                        <Button className="bg-primary hover:bg-primary/90 group/btn">
                          <span className="font-mono">Read Article</span>
                          <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </PrefetchLink>
                    </div>
                  </div>
                </BentoCard>
              </motion.div>
            )}

            {recentPosts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mb-8"
              >
                <div className="flex items-center gap-2 mb-4 text-muted-foreground font-mono text-xs">
                  <span className="text-secondary">$</span>
                  <span>ls -lt ./recent | head -3</span>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  {recentPosts.map((post, index) => (
                    <BentoCard
                      key={post.slug}
                      delay={0.1 * index}
                      className="group"
                    >
                      <div className="flex flex-col h-full">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3 font-mono">
                          <Calendar className="w-3 h-3 text-primary" />
                          <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                          <span className="text-border">|</span>
                          <Clock className="w-3 h-3" />
                          <span>{post.readTime}m</span>
                        </div>

                        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          <PrefetchLink href={`/blog/${post.slug}`}>
                            {post.title}
                          </PrefetchLink>
                        </h3>

                        <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-1">
                          {post.description}
                        </p>

                        <div className="flex flex-wrap gap-1.5 mb-4">
                          <Badge variant="secondary" className="font-mono text-xs">
                            {post.category}
                          </Badge>
                          {post.tags.slice(0, 2).map((tag) => (
                            <PrefetchLink key={tag} href={`/blog/tags/${tag.toLowerCase()}`}>
                              <Badge
                                variant="outline"
                                className="hover:bg-primary hover:text-primary-foreground cursor-pointer font-mono text-xs"
                              >
                                {tag}
                              </Badge>
                            </PrefetchLink>
                          ))}
                        </div>

                        <PrefetchLink href={`/blog/${post.slug}`} className="mt-auto">
                          <Button variant="ghost" className="p-0 h-auto font-mono text-sm group/btn">
                            read_more
                            <ArrowRight className="w-3 h-3 ml-1 group-hover/btn:translate-x-0.5 transition-transform" />
                          </Button>
                        </PrefetchLink>
                      </div>
                    </BentoCard>
                  ))}
                </div>
              </motion.div>
            )}

            {olderPosts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex items-center gap-2 mb-4 text-muted-foreground font-mono text-xs">
                  <span className="text-muted-foreground">#</span>
                  <span>archive --chronological</span>
                </div>

                <div className="space-y-3">
                  {olderPosts.map((post, index) => (
                    <motion.div
                      key={post.slug}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ delay: 0.05 * Math.min(index, 10) }}
                    >
                      <PrefetchLink href={`/blog/${post.slug}`}>
                        <div className="glass-card rounded-xl p-4 group cursor-pointer hover:border-primary/50">
                          <div className="flex flex-col md:flex-row md:items-center gap-3">
                            <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono shrink-0">
                              <span className="text-primary w-20">
                                {new Date(post.date).toISOString().split('T')[0]}
                              </span>
                              <span className="text-border hidden md:inline">|</span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {post.readTime}m
                              </span>
                            </div>

                            <h4 className="font-medium group-hover:text-primary transition-colors flex-1">
                              {post.title}
                            </h4>

                            <div className="flex items-center gap-2 shrink-0">
                              <Badge variant="outline" className="font-mono text-xs hidden sm:inline-flex">
                                {post.category}
                              </Badge>
                              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                            </div>
                          </div>
                        </div>
                      </PrefetchLink>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16 text-muted-foreground font-mono text-sm"
        >
          <span className="text-secondary">/*</span> end of file <span className="text-secondary">*/</span>
          <span className="terminal-cursor" />
        </motion.div>
      </div>
    </div>
  )
}
