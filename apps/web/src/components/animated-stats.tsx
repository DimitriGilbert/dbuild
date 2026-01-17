"use client"

import { motion, useInView } from "motion/react"
import { useRef } from "react"

interface AnimatedStatProps {
  value: string
  label: string
  delay?: number
}

export function AnimatedStat({ value, label, delay = 0 }: AnimatedStatProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay, ease: [0.4, 0, 0.2, 1] }}
      className="text-center"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
        transition={{ duration: 0.5, delay: delay + 0.2, type: "spring" }}
        className="text-4xl md:text-5xl font-bold text-primary mb-2 font-mono"
      >
        {value}
      </motion.div>
      <div className="text-sm text-muted-foreground font-mono-decorative">
        {label}
      </div>
    </motion.div>
  )
}
