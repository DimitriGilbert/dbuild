"use client"

import { motion, useMotionValue, useTransform, MotionValue } from "motion/react"
import type React from "react"
import { cn } from "@/lib/utils"

interface BentoCardProps {
  children: React.ReactNode
  className?: string
  colSpan?: "1" | "2" | "3" | "4"
  rowSpan?: "1" | "2" | "3"
  delay?: number
  onClick?: () => void
  asLink?: boolean
  href?: string
  featured?: boolean
}

export function BentoCard({
  children,
  className,
  colSpan = "1",
  rowSpan = "1",
  delay = 0,
  onClick,
  asLink = false,
  href,
  featured = false,
}: BentoCardProps) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useTransform(mouseY, [-100, 100], [2, -2])
  const rotateY = useTransform(mouseX, [-100, 100], [-2, 2])

  const gridClasses = {
    "1": "col-span-1",
    "2": "col-span-1 md:col-span-2",
    "3": "col-span-1 md:col-span-2 lg:col-span-3",
    "4": "col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4",
  }

  const rowClasses = {
    "1": "row-span-1",
    "2": "row-span-1 md:row-span-2",
    "3": "row-span-1 md:row-span-2 lg:row-span-3",
  }

  const content = (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay, ease: [0.4, 0, 0.2, 1] }}
      style={{ rotateX, rotateY }}
      onMouseMove={(e: React.MouseEvent) => {
        const target = e.currentTarget as HTMLElement
        const rect = target.getBoundingClientRect()
        mouseX.set(e.clientX - rect.left - rect.width / 2)
        mouseY.set(e.clientY - rect.top - rect.height / 2)
      }}
      onMouseLeave={() => {
        mouseX.set(0)
        mouseY.set(0)
      }}
      className={cn(
        "relative overflow-hidden rounded-2xl p-6",
        "glass-card",
        gridClasses[colSpan],
        rowClasses[rowSpan],
        featured && "border-2 border-accent/50",
        className
      )}
      onClick={onClick}
      whileHover={asLink || onClick ? { scale: 1.02 } : undefined}
    >
      {children}
    </motion.div>
  )

  if (asLink && href) {
    return (
      <a href={href} className="block">
        {content}
      </a>
    )
  }

  return content
}
