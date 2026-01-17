"use client"

import { getAllProjects } from "@/lib/projects"
import { motion } from "motion/react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function ProjectsPage() {
  const projects = getAllProjects()

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="text-primary">Projects</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A bento box of tools, applications, and experiments built to solve problems
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-auto"
        >
          {projects.map((project, index) => {
            const isFirst = index === 0
            const isSecond = index === 1
            const isThird = index === 2

            return (
              <motion.a
                key={project.id}
                href={`/projects/${project.id}`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
                whileHover={{ scale: 1.02, y: -4 }}
                className={`
                  relative group glass-card rounded-3xl overflow-hidden cursor-pointer
                  ${isFirst ? 'col-span-1 md:col-span-2 row-span-2' : ''}
                  ${isSecond ? 'col-span-1 row-span-1' : ''}
                  ${isThird ? 'col-span-1 md:col-span-2 row-span-1' : ''}
                  !isFirst && !isSecond && !isThird ? 'col-span-1 row-span-1' : ''
                `}
                style={{ minHeight: isFirst ? '400px' : isThird ? '300px' : '250px' }}
              >
                <div
                  className={`relative overflow-hidden ${isFirst ? 'aspect-[4/3]' : isThird ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}
                >
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="absolute inset-0 flex flex-col justify-end p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                      {project.name}
                    </h3>
                    <p className="text-sm text-gray-300 mb-3 line-clamp-2">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.slice(0, isFirst ? 4 : 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs font-mono bg-white/20 text-white border border-white/30 rounded-full backdrop-blur-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-2 mt-auto">
                      <Button
                        size="sm"
                        className="h-9 bg-primary hover:bg-primary/90"
                        asChild
                      >
                        <span>
                          Details <ArrowRight className="w-4 h-4 ml-1" />
                        </span>
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="h-9"
                        asChild
                      >
                        <a
                          href={project.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github className="w-4 h-4 mr-1" />
                        </a>
                      </Button>
                      {project.site && (
                        <Button
                          size="sm"
                          variant="secondary"
                          className="h-9"
                          asChild
                        >
                          <a
                            href={project.site}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink className="w-4 h-4 mr-1" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.a>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}
