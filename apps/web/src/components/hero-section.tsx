"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Github, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { TypingAnimation } from "./typing-animation"

const projects = [
  {
    title: "AI-Powered Code Analyzer",
    description: "TypeScript tool that analyzes code complexity and suggests optimizations",
    tech: ["TypeScript", "Node.js", "OpenAI API"],
    image: "/placeholder.svg?height=300&width=500",
    github: "#",
    demo: "#",
  },
  {
    title: "IoT Home Automation",
    description: "Arduino-based system with web dashboard for smart home control",
    tech: ["Arduino", "C++", "React", "WebSocket"],
    image: "/placeholder.svg?height=300&width=500",
    github: "#",
    demo: "#",
  },
  {
    title: "Bash Deployment Scripts",
    description: "Automated deployment pipeline with monitoring and rollback capabilities",
    tech: ["Bash", "Docker", "CI/CD"],
    image: "/placeholder.svg?height=300&width=500",
    github: "#",
    demo: "#",
  },
]

export function HeroSection() {
  const [currentProject, setCurrentProject] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentProject((prev) => (prev + 1) % projects.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextProject = () => setCurrentProject((prev) => (prev + 1) % projects.length)
  const prevProject = () => setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length)

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,200,120,0.1),transparent_70%)]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Hi, I'm a{" "}
                <TypingAnimation
                  words={["Developer", "Creator", "Problem Solver", "Innovator"]}
                  className="text-primary"
                />
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                I build tools and solutions across the entire stack - from embedded systems to web applications. Turning
                ideas into reality, one line of code at a time.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                View My Work
              </Button>
              <Button size="lg" variant="outline">
                Read Articles
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {["TypeScript", "Arduino", "Bash", "React", "Node.js", "Python"].map((tech) => (
                <span key={tech} className="px-3 py-1 text-sm bg-muted rounded-full text-muted-foreground">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Right side - Project carousel */}
          <div className="relative">
            <Card className="overflow-hidden border-2 border-border/50 shadow-2xl">
              <CardContent className="p-0">
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={projects[currentProject].image || "/placeholder.svg"}
                    alt={projects[currentProject].title}
                    className="w-full h-full object-cover transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">{projects[currentProject].title}</h3>
                    <p className="text-sm opacity-90 mb-3">{projects[currentProject].description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {projects[currentProject].tech.map((tech) => (
                        <span key={tech} className="px-2 py-1 text-xs bg-white/20 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="secondary" className="h-8">
                        <Github className="w-4 h-4 mr-1" />
                        Code
                      </Button>
                      <Button size="sm" variant="secondary" className="h-8">
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Demo
                      </Button>
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
            <div className="flex justify-center gap-2 mt-4">
              {projects.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentProject ? "bg-primary" : "bg-muted"
                  }`}
                  onClick={() => setCurrentProject(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
