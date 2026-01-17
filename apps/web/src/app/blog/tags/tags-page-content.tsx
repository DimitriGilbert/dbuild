"use client"

import { Badge } from "@/components/ui/badge"
import { Terminal, Tag, Hash, ArrowRight } from "lucide-react"
import { PrefetchLink } from "@/components/prefetch-link"
import { motion } from "motion/react"
import { BentoCard } from "@/components/bento-card"

interface TagWithCount {
  name: string
  count: number
}

interface TagsPageContentProps {
  tagsWithCounts: TagWithCount[]
  totalTags: number
}

function getTagSize(count: number, index: number): { col: "1" | "2"; row: "1" | "2" } {
  if (index === 0) return { col: "2", row: "2" }
  if (index === 1 || index === 2) return { col: "1", row: "2" }
  if (count >= 3) return { col: "2", row: "1" }
  return { col: "1", row: "1" }
}

export function TagsPageContent({ tagsWithCounts, totalTags }: TagsPageContentProps) {
  const popularTags = tagsWithCounts.slice(0, 6)
  const otherTags = tagsWithCounts.slice(6)

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
            <span className="terminal-prompt">grep -r &quot;tags&quot; ./blog</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Topic <span className="text-secondary text-glow-primary">Index</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground max-w-2xl mx-auto text-lg"
          >
            Navigate the knowledge graph. Each tag is a rabbit hole.
            <span className="font-mono text-accent">{" // proceed with curiosity"}</span>
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-elevated rounded-2xl p-6 mb-10 max-w-xl mx-auto"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-primary" />
              <span className="font-mono text-sm text-muted-foreground">tags.length</span>
            </div>
            <Badge className="bg-primary/20 text-primary border-primary/30 font-mono">
              {totalTags}
            </Badge>
          </div>
        </motion.div>

        {popularTags.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-2 mb-6 text-muted-foreground font-mono text-xs">
              <span className="text-accent">$</span>
              <span>sort --by-popularity | head -6</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[minmax(140px,auto)]">
              {popularTags.map((tag, index) => {
                const size = getTagSize(tag.count, index)
                const isTopTag = index === 0

                return (
                  <BentoCard
                    key={tag.name}
                    colSpan={size.col}
                    rowSpan={size.row}
                    delay={0.1 * index}
                    featured={isTopTag}
                    asLink
                    href={`/blog/tags/${tag.name.toLowerCase()}`}
                    className="group cursor-pointer"
                  >
                    <div className="h-full flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Hash className={`w-5 h-5 ${isTopTag ? "text-accent" : "text-primary"}`} />
                          {isTopTag && (
                            <Badge className="bg-accent/20 text-accent border-accent/30 font-mono text-xs">
                              TOP
                            </Badge>
                          )}
                        </div>

                        <h2 className={`font-bold mb-2 group-hover:text-primary transition-colors ${isTopTag ? "text-3xl md:text-4xl" : size.col === "2" ? "text-2xl" : "text-xl"}`}>
                          {tag.name}
                        </h2>

                        {(isTopTag || size.row === "2") && (
                          <p className="text-muted-foreground text-sm">
                            Explore {tag.count} article{tag.count !== 1 ? "s" : ""} on this topic
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <Badge variant="secondary" className="font-mono">
                          {tag.count} post{tag.count !== 1 ? "s" : ""}
                        </Badge>
                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </BentoCard>
                )
              })}
            </div>
          </motion.div>
        )}

        {otherTags.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className="flex items-center gap-2 mb-6 text-muted-foreground font-mono text-xs">
              <span className="text-muted-foreground">#</span>
              <span>all_other_tags</span>
            </div>

            <div className="glass-elevated rounded-2xl p-6">
              <div className="flex flex-wrap gap-3">
                {otherTags.map((tag, index) => (
                  <motion.div
                    key={tag.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.02 * Math.min(index, 20) }}
                  >
                    <PrefetchLink href={`/blog/tags/${tag.name.toLowerCase()}`}>
                      <div className="glass-card rounded-xl px-4 py-3 group cursor-pointer hover:border-primary/50 flex items-center gap-3">
                        <Hash className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        <span className="font-medium group-hover:text-primary transition-colors">
                          {tag.name}
                        </span>
                        <Badge variant="outline" className="font-mono text-xs">
                          {tag.count}
                        </Badge>
                      </div>
                    </PrefetchLink>
                  </motion.div>
                ))}
              </div>
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
          <span className="text-primary">&gt;</span> taxonomy complete_
          <span className="terminal-cursor" />
        </motion.div>
      </div>
    </div>
  )
}
