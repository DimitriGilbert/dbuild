"use client"

import type { BlogPost } from "@/lib/blog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight, ArrowLeft, Terminal, Hash, BookOpen } from "lucide-react"
import { PrefetchLink } from "@/components/prefetch-link"
import { motion } from "motion/react"
import { BentoCard } from "@/components/bento-card"

interface TagDetailContentProps {
  tag: string
  posts: BlogPost[]
}

export function TagDetailContent({ tag, posts }: TagDetailContentProps) {
  const featuredPost = posts[0]
  const otherPosts = posts.slice(1)

  return (
    <div className="min-h-screen pt-20 relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />

      <div className="container mx-auto px-4 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <PrefetchLink href="/blog/tags">
            <Button variant="ghost" className="mb-8 group font-mono text-sm">
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              cd ../tags
            </Button>
          </PrefetchLink>
        </motion.div>

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
            <span className="terminal-prompt">find ./blog -tag &quot;{tag}&quot;</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="inline-flex items-center gap-3 mb-4"
          >
            <Hash className="w-8 h-8 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="text-primary text-glow-primary">{tag}</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-4"
          >
            <Badge variant="secondary" className="font-mono text-sm px-4 py-1">
              <BookOpen className="w-4 h-4 mr-2" />
              {posts.length} article{posts.length !== 1 ? "s" : ""}
            </Badge>
          </motion.div>
        </motion.div>

        {featuredPost && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-10"
          >
            <div className="flex items-center gap-2 mb-4 text-muted-foreground font-mono text-xs">
              <span className="text-accent">$</span>
              <span>head -1 ./results</span>
            </div>

            <BentoCard colSpan="4" rowSpan="1" featured className="group">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3 font-mono">
                    <Calendar className="w-3 h-3 text-primary" />
                    <span>{new Date(featuredPost.date).toISOString().split('T')[0]}</span>
                    <span className="text-border">|</span>
                    <Clock className="w-3 h-3" />
                    <span>{featuredPost.readTime} min read</span>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-primary transition-colors">
                    <PrefetchLink href={`/blog/${featuredPost.slug}`}>
                      {featuredPost.title}
                    </PrefetchLink>
                  </h2>

                  <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-3">
                    {featuredPost.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <Badge variant="secondary" className="font-mono">
                      {featuredPost.category}
                    </Badge>
                    {featuredPost.tags.map((postTag) => (
                      <PrefetchLink key={postTag} href={`/blog/tags/${postTag.toLowerCase()}`}>
                        <Badge
                          variant={postTag.toLowerCase() === tag.toLowerCase() ? "default" : "outline"}
                          className="hover:bg-primary hover:text-primary-foreground cursor-pointer font-mono text-xs"
                        >
                          {postTag}
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

        {otherPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-6 text-muted-foreground font-mono text-xs">
              <span className="text-muted-foreground">#</span>
              <span>remaining_results</span>
            </div>

            <div className="space-y-4">
              {otherPosts.map((post, index) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: 0.05 * Math.min(index, 10) }}
                >
                  <BentoCard delay={0} className="group">
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2 font-mono">
                          <Calendar className="w-3 h-3 text-primary" />
                          <span>{new Date(post.date).toISOString().split('T')[0]}</span>
                          <span className="text-border">|</span>
                          <Clock className="w-3 h-3" />
                          <span>{post.readTime}m</span>
                        </div>

                        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                          <PrefetchLink href={`/blog/${post.slug}`}>
                            {post.title}
                          </PrefetchLink>
                        </h3>

                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                          {post.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant="secondary" className="font-mono text-xs">
                            {post.category}
                          </Badge>
                          {post.tags.slice(0, 4).map((postTag) => (
                            <PrefetchLink key={postTag} href={`/blog/tags/${postTag.toLowerCase()}`}>
                              <Badge
                                variant={postTag.toLowerCase() === tag.toLowerCase() ? "default" : "outline"}
                                className="hover:bg-primary hover:text-primary-foreground cursor-pointer font-mono text-xs"
                              >
                                {postTag}
                              </Badge>
                            </PrefetchLink>
                          ))}
                        </div>
                      </div>

                      <PrefetchLink href={`/blog/${post.slug}`} className="shrink-0">
                        <Button variant="ghost" className="font-mono text-sm group/btn">
                          read
                          <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-0.5 transition-transform" />
                        </Button>
                      </PrefetchLink>
                    </div>
                  </BentoCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16 text-muted-foreground font-mono text-sm"
        >
          <span className="text-primary">&gt;</span> {posts.length} result{posts.length !== 1 ? "s" : ""} found_
          <span className="terminal-cursor" />
        </motion.div>
      </div>
    </div>
  )
}
