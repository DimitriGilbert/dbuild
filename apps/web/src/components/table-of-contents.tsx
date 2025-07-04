'use client'

import { useState, useEffect } from "react"
import type { TocItem } from "@/lib/blog"

interface TableOfContentsProps {
  toc: TocItem[]
}

export function TableOfContents({ toc }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "-20% 0% -35% 0%" },
    )

    toc.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [toc])

  if (toc.length === 0) return null

  return (
    <nav className="sticky top-8 space-y-2">
      <h4 className="font-semibold text-sm text-foreground mb-4">Table of Contents</h4>
      <ul className="space-y-2 text-sm">
        {toc.map(({ id, title, level }) => (
          <li key={id} style={{ paddingLeft: `${(level - 1) * 12}px` }}>
            <a
              href={`#${id}`}
              className={`block py-1 text-muted-foreground hover:text-foreground transition-colors border-l-2 pl-3 ${
                activeId === id ? "border-primary text-primary font-medium" : "border-transparent"
              }`}
            >
              {title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}