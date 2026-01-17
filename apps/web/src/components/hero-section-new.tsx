"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { ChevronLeft, ChevronRight, Github, ExternalLink, ArrowRight, Terminal, Code2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TypingAnimation } from "./typing-animation"
import { AnimatedStat } from "./animated-stats"
import type { Project } from "@/lib/projects"
import Link from "next/link"

interface HeroSectionProps {
  projects: Project[]
}

export function HeroSection({ projects }: HeroSectionProps) {
  const [currentProject, setCurrentProject] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentProject((prev) => (prev + 1) % projects.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [projects.length])

  const nextProject = () => setCurrentProject((prev) => (prev + 1) % projects.length)
  const prevProject = () => setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length)

  if (projects.length === 0) return null

  const currentProj = projects[currentProject]
  const allTags = Array.from(new Set(projects.flatMap((p) => p.tags))).slice(0, 6)

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden py-20">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="space-y-8 order-2 lg:order-1"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-2 text-muted-foreground font-mono text-sm mb-4"
              >
                <Terminal className="w-4 h-4 text-primary" />
                <span className="terminal-prompt">init portfolio.exe</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="text-4xl md:text-6xl font-bold tracking-tight"
              >
                Building <TypingAnimation words={projects.map((p) => p.name)} className="text-primary" />
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-xl text-muted-foreground max-w-2xl leading-relaxed"
              >
                I create tools that solve my problems. From arduino to web apps, each project is a
                journey of learning, building, and breaking things (then fixing them).
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/projects">
                <Button size="lg" className="bg-primary hover:bg-primary/90 shadow-lg">
                  View Projects <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/blog">
                <Button size="lg" variant="outline">
                  Read Blog
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="pt-4"
            >
              <p className="text-sm font-medium text-muted-foreground mb-4 font-mono-decorative">
                <Code2 className="w-4 h-4 inline mr-2" />
                Tech stack
              </p>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tech) => (
                  <Badge
                    key={tech}
                    variant="outline"
                    className="hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all cursor-default"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </motion.div>

            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-border/50">
              <AnimatedStat value={projects.length.toString()} label="Projects" delay={1.2} />
              <AnimatedStat value="∞" label="Bugs Fixed" delay={1.3} />
              <AnimatedStat value="24/7" label="Coffee" delay={1.4} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="relative order-1 lg:order-2"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
              className="glass-elevated rounded-3xl overflow-hidden border-2 border-border/50 shadow-2xl relative group"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentProj.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                  className="relative aspect-[4/3] overflow-hidden"
                >
                  <img
                    src={currentProj.image || "/placeholder.svg"}
                    alt={currentProj.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                        {currentProj.name}
                      </h3>
                      <p className="text-sm md:text-base text-gray-300 mb-4 line-clamp-2">
                        {currentProj.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {currentProj.tags.slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 text-xs font-mono bg-white/20 text-white border border-white/30 rounded-full backdrop-blur-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-3">
                        <Link href={`/projects/${currentProj.id}`}>
                          <Button size="sm" className="h-10 bg-primary hover:bg-primary/90">
                            Details
                          </Button>
                        </Link>
                        <Button
                          size="sm"
                          variant="secondary"
                          className="h-10"
                          asChild
                        >
                          <a href={currentProj.repo} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4 mr-2" />
                            Code
                          </a>
                        </Button>
                        {currentProj.site && (
                          <Button
                            size="sm"
                            variant="secondary"
                            className="h-10"
                            asChild
                          >
                            <a href={currentProj.site} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Live
                            </a>
                          </Button>
                        )}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              onClick={prevProject}
              className="absolute left-4 top-1/2 -translate-y-1/2 glass-elevated rounded-full p-3 hover:scale-110 transition-transform z-10 group"
            >
              <ChevronLeft className="w-5 h-5 text-foreground group-hover:text-primary transition-colors" />
            </motion.button>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              onClick={nextProject}
              className="absolute right-4 top-1/2 -translate-y-1/2 glass-elevated rounded-full p-3 hover:scale-110 transition-transform z-10 group"
            >
              <ChevronRight className="w-5 h-5 text-foreground group-hover:text-primary transition-colors" />
            </motion.button>

            <div className="flex justify-center gap-2 mt-6">
              {projects.map((project, index) => (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => setCurrentProject(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentProject
                      ? "w-8 bg-primary"
                      : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
