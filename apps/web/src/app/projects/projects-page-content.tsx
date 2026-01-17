"use client"

import type { Project } from "@/lib/projects"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, ArrowRight, Terminal, Layers, Filter } from "lucide-react"
import Link from "next/link"
import { motion } from "motion/react"
import { BentoCard } from "@/components/bento-card"
import { useState, useMemo } from "react"

interface ProjectsPageContentProps {
  projects: Project[]
  allTags: string[]
}

function seededRandom(seed: string): number {
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  const x = Math.sin(hash) * 10000
  return x - Math.floor(x)
}

function getBentoSizeFromProject(
  projectId: string,
  index: number,
  totalCount: number
): { col: "1" | "2" | "3" | "4"; row: "1" | "2" | "3" } {
  const rand = seededRandom(projectId + index.toString())
  
  if (index === 0) {
    return { col: "2", row: "2" }
  }
  
  const sizeOptions: Array<{ col: "1" | "2" | "3" | "4"; row: "1" | "2" | "3"; weight: number }> = [
    { col: "1", row: "1", weight: 0.35 },
    { col: "2", row: "1", weight: 0.25 },
    { col: "1", row: "2", weight: 0.20 },
    { col: "2", row: "2", weight: 0.12 },
    { col: "3", row: "1", weight: 0.05 },
    { col: "2", row: "3", weight: 0.03 },
  ]
  
  let cumulative = 0
  for (const option of sizeOptions) {
    cumulative += option.weight
    if (rand < cumulative) {
      return { col: option.col, row: option.row }
    }
  }
  
  return { col: "1", row: "1" }
}

export function ProjectsPageContent({ projects, allTags }: ProjectsPageContentProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const filteredProjects = useMemo(() => {
    if (!activeTag) return projects
    return projects.filter((p) => p.tags.some((t) => t.toLowerCase() === activeTag.toLowerCase()))
  }, [activeTag, projects])

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
            <span className="terminal-prompt">ls -la ./projects</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Project <span className="text-primary text-glow-primary">Archive</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground max-w-2xl mx-auto text-lg"
          >
            A collection of tools, experiments, and solutions. Each one started with
            <span className="font-mono text-primary"> &quot;what if...&quot;</span>
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-10"
        >
          <div className="glass-elevated rounded-2xl p-6 max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-4 h-4 text-primary" />
              <span className="font-mono text-sm text-muted-foreground">filter --by-tech</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={activeTag === null ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-all"
                onClick={() => setActiveTag(null)}
              >
                All
              </Badge>
              {allTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={activeTag === tag ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-all font-mono"
                  onClick={() => setActiveTag(tag === activeTag ? null : tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center gap-2 mb-6 text-muted-foreground font-mono text-sm"
        >
          <Layers className="w-4 h-4 text-secondary" />
          <span>
            showing {filteredProjects.length} of {projects.length} projects
          </span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-[minmax(200px,auto)]">
          {filteredProjects.map((project, index) => {
            const size = getBentoSizeFromProject(project.id, index, filteredProjects.length)
            const isFeatured = index === 0 && !activeTag

            return (
              <BentoCard
                key={project.id}
                colSpan={size.col}
                rowSpan={size.row}
                delay={0.1 * Math.min(index, 8)}
                featured={isFeatured}
                className="group relative"
              >
                <div className="absolute inset-0 overflow-hidden rounded-2xl">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.name}
                    className="w-full h-full object-cover opacity-30 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/80 to-card/40" />
                </div>

                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    {isFeatured && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-block mb-3"
                      >
                        <Badge className="bg-accent text-accent-foreground font-mono text-xs">
                          FEATURED
                        </Badge>
                      </motion.div>
                    )}

                    <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {project.name}
                    </h3>

                    <p className={`text-muted-foreground text-sm leading-relaxed ${size.row === "1" ? "line-clamp-2" : "line-clamp-4"}`}>
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-4 space-y-4">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.slice(0, size.col === "2" ? 5 : 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 text-xs font-mono bg-muted/50 text-muted-foreground border border-border/50 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > (size.col === "2" ? 5 : 3) && (
                        <span className="px-2 py-0.5 text-xs font-mono text-muted-foreground">
                          +{project.tags.length - (size.col === "2" ? 5 : 3)}
                        </span>
                      )}
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
                        <Button
                          size="sm"
                          className="h-8 bg-primary/90 hover:bg-primary group/btn"
                        >
                          <span className="font-mono text-xs">Details</span>
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
          className="text-center mt-16 text-muted-foreground font-mono text-sm"
        >
          <span className="text-primary">&gt;</span> end of transmission_
          <span className="terminal-cursor" />
        </motion.div>
      </div>
    </div>
  )
}
