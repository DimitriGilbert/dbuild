"use client"

import { HeroSection } from "@/components/hero-section-new"
import { motion } from "motion/react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Calendar,
  Clock,
  ArrowRight,
  Terminal,
  Cpu,
  Zap,
  Github,
  ExternalLink,
  BookOpen,
  Code2,
  Sparkles,
  Coffee,
  Hash,
} from "lucide-react"
import { PrefetchLink } from "@/components/prefetch-link"
import { BentoCard } from "@/components/bento-card"
import type { Project } from "@/lib/projects"
import type { BlogPost } from "@/lib/blog"
import Link from "next/link"

interface HomePageContentProps {
  projects: Project[]
  projectTags: string[]
  recentPosts: BlogPost[]
  blogTags: string[]
  totalPosts: number
}

export function HomePageContent({
  projects,
  projectTags,
  recentPosts,
  blogTags,
  totalPosts,
}: HomePageContentProps) {
  const featuredProjects = projects.slice(0, 4)
  const featuredPost = recentPosts[0]
  const otherPosts = recentPosts.slice(1, 5)

  return (
    <div className="min-h-screen">
      <HeroSection projects={projects} />

      {/* Featured Projects Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern-dense opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-2 text-muted-foreground font-mono text-sm mb-4">
              <Cpu className="w-4 h-4 text-secondary" />
              <span className="terminal-prompt">./showcase --featured</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-2">
                  Shipped <span className="text-secondary text-glow-primary">Experiments</span>
                </h2>
                <p className="text-muted-foreground max-w-xl">
                  Tools and projects born from curiosity and caffeine.
                  <span className="font-mono text-accent">{" // batteries included"}</span>
                </p>
              </div>

              <Link href="/projects">
                <Button variant="outline" className="glass group">
                  <span className="font-mono">browse_all()</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[minmax(220px,auto)]">
            {featuredProjects.map((project, index) => {
              const isLarge = index === 0
              const isTall = index === 2

              return (
                <BentoCard
                  key={project.id}
                  colSpan={isLarge ? "2" : "1"}
                  rowSpan={isTall ? "2" : "1"}
                  delay={0.1 * index}
                  featured={isLarge}
                  className="group relative"
                >
                  <div className="absolute inset-0 overflow-hidden rounded-2xl">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.name}
                      className="w-full h-full object-cover opacity-20 group-hover:opacity-30 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/80 to-card/40" />
                  </div>

                  <div className="relative z-10 h-full flex flex-col justify-between">
                    <div>
                      {isLarge && (
                        <Badge className="bg-secondary/20 text-secondary border-secondary/30 font-mono text-xs mb-3">
                          <Zap className="w-3 h-3 mr-1" />
                          FLAGSHIP
                        </Badge>
                      )}

                      <h3 className={`font-bold mb-2 group-hover:text-primary transition-colors ${isLarge ? "text-2xl md:text-3xl" : "text-xl"}`}>
                        {project.name}
                      </h3>

                      <p className={`text-muted-foreground text-sm leading-relaxed ${isLarge || isTall ? "line-clamp-4" : "line-clamp-2"}`}>
                        {project.description}
                      </p>
                    </div>

                    <div className="mt-4 space-y-3">
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.slice(0, isLarge ? 4 : 2).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 text-xs font-mono bg-muted/50 text-muted-foreground border border-border/50 rounded-md"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 px-3 glass hover:glow-primary transition-all"
                          asChild
                        >
                          <a href={project.repo} target="_blank" rel="noopener noreferrer">
                            <Github className="w-3.5 h-3.5" />
                          </a>
                        </Button>
                        {project.site && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 px-3 glass hover:glow-accent transition-all"
                            asChild
                          >
                            <a href={project.site} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </Button>
                        )}
                        <Link href={`/projects/${project.id}`} className="ml-auto">
                          <Button size="sm" className="h-8 bg-primary/90 hover:bg-primary group/btn font-mono text-xs">
                            explore
                            <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover/btn:translate-x-0.5 transition-transform" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </BentoCard>
              )
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-8 glass-elevated rounded-2xl p-6"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Code2 className="w-5 h-5 text-primary" />
                <span className="font-mono text-sm text-muted-foreground">tech_stack.map()</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {projectTags.slice(0, 8).map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="font-mono text-xs hover:bg-primary hover:text-primary-foreground transition-all"
                  >
                    {tag}
                  </Badge>
                ))}
                {projectTags.length > 8 && (
                  <Badge variant="secondary" className="font-mono text-xs">
                    +{projectTags.length - 8}
                  </Badge>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Latest Transmissions (Blog) Section */}
      {recentPosts.length > 0 && (
        <section className="py-24 relative overflow-hidden bg-gradient-to-b from-muted/20 to-background">
          <div className="absolute inset-0 grid-pattern opacity-10" />

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <div className="flex items-center gap-2 text-muted-foreground font-mono text-sm mb-4">
                <Terminal className="w-4 h-4 text-primary" />
                <span className="terminal-prompt">tail -f ./transmissions.log</span>
              </div>

              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-2">
                    Latest <span className="text-primary text-glow-primary">Transmissions</span>
                  </h2>
                  <p className="text-muted-foreground max-w-xl">
                    Thoughts, tutorials, and occasional rants about code.
                    <span className="font-mono text-secondary">{" // subscribe to chaos"}</span>
                  </p>
                </div>

                <PrefetchLink href="/blog">
                  <Button variant="outline" className="glass group">
                    <span className="font-mono">view_archive()</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </PrefetchLink>
              </div>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Featured Post - Large Card */}
              {featuredPost && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="lg:col-span-2 lg:row-span-2"
                >
                  <BentoCard colSpan="2" rowSpan="2" featured className="h-full group">
                    <div className="h-full flex flex-col">
                      <div className="flex items-center gap-2 mb-4">
                        <Sparkles className="w-4 h-4 text-accent" />
                        <Badge className="bg-accent/20 text-accent border-accent/30 font-mono text-xs">
                          LATEST
                        </Badge>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4 font-mono">
                        <span className="text-primary">[{new Date(featuredPost.date).toISOString().split('T')[0]}]</span>
                        <span className="text-border">|</span>
                        <Clock className="w-3 h-3" />
                        <span>{featuredPost.readTime} min read</span>
                      </div>

                      <h3 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                        <PrefetchLink href={`/blog/${featuredPost.slug}`}>
                          {featuredPost.title}
                        </PrefetchLink>
                      </h3>

                      <p className="text-muted-foreground mb-6 leading-relaxed flex-1">
                        {featuredPost.description}
                      </p>

                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-2">
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
                            <span className="font-mono">read_article()</span>
                            <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                          </Button>
                        </PrefetchLink>
                      </div>
                    </div>
                  </BentoCard>
                </motion.div>
              )}

              {/* Other Posts - Stacked Cards */}
              <div className="space-y-4">
                {otherPosts.map((post, index) => (
                  <motion.div
                    key={post.slug}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                  >
                    <PrefetchLink href={`/blog/${post.slug}`}>
                      <div className="glass-card rounded-xl p-4 group cursor-pointer hover:border-primary/50">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2 font-mono">
                          <Calendar className="w-3 h-3 text-primary" />
                          <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                          <span className="text-border">|</span>
                          <Clock className="w-3 h-3" />
                          <span>{post.readTime}m</span>
                        </div>

                        <h4 className="font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h4>

                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="font-mono text-xs">
                            {post.category}
                          </Badge>
                          <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    </PrefetchLink>
                  </motion.div>
                ))}

                {/* Stats Card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  <div className="glass-elevated rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <BookOpen className="w-4 h-4 text-secondary" />
                      <span className="font-mono text-xs text-muted-foreground">blog.stats()</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-2xl font-bold text-primary">{totalPosts}</div>
                        <div className="text-xs text-muted-foreground font-mono">articles</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-secondary">{blogTags.length}</div>
                        <div className="text-xs text-muted-foreground font-mono">topics</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Tags Cloud */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-8 glass-elevated rounded-2xl p-6"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Hash className="w-5 h-5 text-secondary" />
                  <span className="font-mono text-sm text-muted-foreground">topics.popular()</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {blogTags.slice(0, 10).map((tag) => (
                    <PrefetchLink key={tag} href={`/blog/tags/${tag.toLowerCase()}`}>
                      <Badge
                        variant="outline"
                        className="font-mono text-xs hover:bg-primary hover:text-primary-foreground cursor-pointer transition-all"
                      >
                        {tag}
                      </Badge>
                    </PrefetchLink>
                  ))}
                  {blogTags.length > 10 && (
                    <PrefetchLink href="/blog/tags">
                      <Badge variant="secondary" className="font-mono text-xs cursor-pointer hover:bg-secondary/80">
                        +{blogTags.length - 10} more
                      </Badge>
                    </PrefetchLink>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Terminal Footer Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-elevated rounded-3xl p-8 md:p-12 text-center max-w-3xl mx-auto"
          >
            <div className="flex items-center justify-center gap-2 text-muted-foreground font-mono text-sm mb-6">
              <Coffee className="w-4 h-4 text-accent" />
              <span>process.status()</span>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Still <span className="text-primary">Building</span>
            </h2>

            <p className="text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed">
              Always shipping, always learning. Got a cool idea or just want to chat about code?
              The terminal is always open.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-primary hover:bg-primary/90 group" asChild>
                <a href="https://github.com/DimitriGilbert" target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  <span className="font-mono">github.connect()</span>
                </a>
              </Button>
              <PrefetchLink href="/projects">
                <Button variant="outline" className="glass group">
                  <Cpu className="w-4 h-4 mr-2" />
                  <span className="font-mono">explore.projects()</span>
                </Button>
              </PrefetchLink>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-10 pt-6 border-t border-border/50"
            >
              <p className="font-mono text-xs text-muted-foreground">
                <span className="text-secondary">{"<!-- "}</span>
                thanks for scrolling, you absolute legend
                <span className="text-secondary">{" -->"}</span>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Terminal Sign-off */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="text-center pb-12 text-muted-foreground font-mono text-sm"
      >
        <span className="text-primary">&gt;</span> console.log(<span className="text-accent">&quot;EOF&quot;</span>)_
        <span className="terminal-cursor" />
      </motion.div>
    </div>
  )
}
