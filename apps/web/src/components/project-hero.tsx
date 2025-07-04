"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Github, ExternalLink, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TypingAnimation } from "./typing-animation"
import type { Project } from "@/lib/projects"
import Link from "next/link"

interface ProjectHeroProps {
  projects: Project[]
}

export function ProjectHero({ projects }: ProjectHeroProps) {
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

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,200,120,0.1),transparent_70%)]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Project showcase */}
          <div className="relative order-2 lg:order-1">
            <Card className="overflow-hidden border-2 border-border/50 shadow-2xl">
              <CardContent className="p-0">
                <div className="relative h-96 overflow-hidden">
                  <img
                    src={currentProj.image || "/placeholder.svg"}
                    alt={currentProj.name}
                    className="w-full h-full object-cover transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-3">{currentProj.name}</h3>
                    <p className="text-sm opacity-90 mb-4 line-clamp-2">{currentProj.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {currentProj.tags.slice(0, 4).map((tag) => (
                        <Badge key={tag} variant="secondary" className="bg-white/20 text-white border-white/30">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <Link href={`/projects/${currentProj.id}`}>
                        <Button size="sm" variant="secondary" className="h-9">
                          <Play className="w-4 h-4 mr-2" />
                          Details
                        </Button>
                      </Link>
                      <Button size="sm" variant="secondary" className="h-9" asChild>
                        <a href={currentProj.repo} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" />
                          Code
                        </a>
                      </Button>
                      {currentProj.site && (
                        <Button size="sm" variant="secondary" className="h-9" asChild>
                          <a href={currentProj.site} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Live
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Carousel controls */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
              onClick={prevProject}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
              onClick={nextProject}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>

            {/* Carousel indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {projects.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentProject ? "bg-primary" : "bg-muted"
                  }`}
                  onClick={() => setCurrentProject(index)}
                />
              ))}
            </div>
          </div>

          {/* Right side - Text content */}
          <div className="space-y-8 order-1 lg:order-2">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Building <TypingAnimation words={projects.map((p) => p.name)} className="text-primary" />
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                I create tools and solutions that solve real problems. From embedded systems to web applications, each
                project represents a journey of learning, building, and iterating.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link href="/projects">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  View All Projects
                </Button>
              </Link>
              <Link href="/blog">
                <Button size="lg" variant="outline">
                  Read Articles
                </Button>
              </Link>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium text-muted-foreground">Technologies I work with:</p>
              <div className="flex flex-wrap gap-2">
                {Array.from(new Set(projects.flatMap((p) => p.tags)))
                  .slice(0, 8)
                  .map((tech) => (
                    <span key={tech} className="px-3 py-1 text-sm bg-muted rounded-full text-muted-foreground">
                      {tech}
                    </span>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
