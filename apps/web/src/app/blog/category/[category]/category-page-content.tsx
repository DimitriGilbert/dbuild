"use client"

import type { Category } from "@/lib/blog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Calendar,
  Clock,
  ArrowRight,
  ArrowLeft,
  FolderOpen,
  FileText,
  Terminal,
  ChevronRight,
  Folder,
  GitBranch,
} from "lucide-react"
import { PrefetchLink } from "@/components/prefetch-link"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import { motion } from "motion/react"
import { BentoCard } from "@/components/bento-card"

interface CategoryPageContentProps {
  categoryData: Category
}

export function CategoryPageContent({ categoryData }: CategoryPageContentProps) {
  const featuredPost = categoryData.posts[0]
  const otherPosts = categoryData.posts.slice(1)

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
          <PrefetchLink href="/blog">
            <Button variant="ghost" className="mb-8 group font-mono text-sm">
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              cd ..
            </Button>
          </PrefetchLink>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2 text-muted-foreground font-mono text-sm mb-6"
            >
              <Terminal className="w-4 h-4 text-primary" />
              <span className="terminal-prompt">tree ./{categoryData.directory}</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="glass-elevated rounded-2xl p-6 mb-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                  <FolderOpen className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono mb-1">
                    <span className="text-secondary">~/blog</span>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-primary">{categoryData.directory}</span>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold">
                    {categoryData.title}
                  </h1>
                </div>
              </div>

              {categoryData.description && (
                <p className="text-muted-foreground text-lg mb-4 pl-14">
                  {categoryData.description}
                </p>
              )}

              <div className="flex items-center gap-6 pl-14 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <FileText className="w-4 h-4 text-secondary" />
                  <span className="font-mono">
                    {categoryData.posts.length} file{categoryData.posts.length !== 1 ? "s" : ""}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <GitBranch className="w-4 h-4 text-accent" />
                  <span className="font-mono">indexed</span>
                </div>
              </div>
            </motion.div>

            {categoryData.content && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="glass-card rounded-2xl p-6 mb-8"
              >
                <div className="flex items-center gap-2 mb-4 text-muted-foreground font-mono text-xs">
                  <FileText className="w-3 h-3 text-primary" />
                  <span>README.md</span>
                </div>
                <div className="prose prose-gray dark:prose-invert max-w-none prose-headings:font-mono prose-code:text-primary">
                  <MarkdownRenderer content={categoryData.content} />
                </div>
              </motion.div>
            )}
          </motion.header>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 mb-6 text-muted-foreground font-mono text-xs">
              <span className="text-accent">$</span>
              <span>ls -la --sort=date</span>
            </div>

            <div className="glass-elevated rounded-2xl overflow-hidden">
              <div className="grid grid-cols-12 gap-4 p-4 border-b border-border/50 text-xs font-mono text-muted-foreground bg-muted/30">
                <div className="col-span-1">TYPE</div>
                <div className="col-span-5 md:col-span-6">FILENAME</div>
                <div className="col-span-3 md:col-span-2 hidden sm:block">DATE</div>
                <div className="col-span-3 text-right">SIZE</div>
              </div>

              {categoryData.posts.length > 0 ? (
                <div className="divide-y divide-border/30">
                  {categoryData.posts.map((post, index) => (
                    <motion.div
                      key={post.slug}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.05 }}
                    >
                      <PrefetchLink href={`/blog/${post.slug}`}>
                        <div className="grid grid-cols-12 gap-4 p-4 group hover:bg-muted/30 transition-colors cursor-pointer items-center">
                          <div className="col-span-1">
                            <FileText className="w-4 h-4 text-secondary group-hover:text-primary transition-colors" />
                          </div>
                          <div className="col-span-5 md:col-span-6">
                            <div className="font-medium group-hover:text-primary transition-colors line-clamp-1">
                              {post.title}
                            </div>
                            <div className="text-xs text-muted-foreground line-clamp-1 mt-0.5 hidden md:block">
                              {post.description}
                            </div>
                          </div>
                          <div className="col-span-3 md:col-span-2 hidden sm:block">
                            <span className="font-mono text-xs text-muted-foreground">
                              {new Date(post.date).toISOString().split('T')[0]}
                            </span>
                          </div>
                          <div className="col-span-3 text-right flex items-center justify-end gap-2">
                            <span className="font-mono text-xs text-muted-foreground">
                              {post.readTime}m read
                            </span>
                            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                          </div>
                        </div>
                      </PrefetchLink>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-muted-foreground font-mono">
                  <Folder className="w-12 h-12 mx-auto mb-4 opacity-30" />
                  <p>{`// directory is empty`}</p>
                </div>
              )}
            </div>
          </motion.div>

          {featuredPost && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mb-8"
            >
              <div className="flex items-center gap-2 mb-4 text-muted-foreground font-mono text-xs">
                <span className="text-primary">#</span>
                <span>featured --latest</span>
              </div>

              <BentoCard colSpan="4" rowSpan="1" featured className="group">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className="bg-accent/20 text-accent border-accent/30 font-mono text-xs">
                        LATEST
                      </Badge>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(featuredPost.date).toISOString().split('T')[0]}</span>
                        <span className="text-border">|</span>
                        <Clock className="w-3 h-3" />
                        <span>{featuredPost.readTime}m</span>
                      </div>
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
                        <span className="font-mono">open ./article</span>
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
              transition={{ delay: 0.8 }}
            >
              <div className="flex items-center gap-2 mb-6 text-muted-foreground font-mono text-xs">
                <span className="text-muted-foreground">#</span>
                <span>more_in_directory</span>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {otherPosts.map((post, index) => (
                  <BentoCard
                    key={post.slug}
                    delay={0.05 * Math.min(index, 10)}
                    className="group"
                  >
                    <div className="flex flex-col h-full">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3 font-mono">
                        <FileText className="w-3 h-3 text-secondary" />
                        <span>{new Date(post.date).toISOString().split('T')[0]}</span>
                        <span className="text-border">|</span>
                        <Clock className="w-3 h-3" />
                        <span>{post.readTime}m</span>
                      </div>

                      <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        <PrefetchLink href={`/blog/${post.slug}`}>
                          {post.title}
                        </PrefetchLink>
                      </h3>

                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
                        {post.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {post.tags.slice(0, 3).map((tag) => (
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
                          read_file
                          <ArrowRight className="w-3 h-3 ml-1 group-hover/btn:translate-x-0.5 transition-transform" />
                        </Button>
                      </PrefetchLink>
                    </div>
                  </BentoCard>
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
            <span className="text-secondary">$</span> pwd: <span className="text-primary">~/{categoryData.directory}</span>
            <span className="terminal-cursor" />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
