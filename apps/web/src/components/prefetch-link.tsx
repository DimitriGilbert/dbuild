"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCallback } from "react"
import type { ReactNode } from "react"

interface PrefetchLinkProps {
  href: string
  children: ReactNode
  className?: string
  prefetch?: boolean
}

export function PrefetchLink({ 
  href, 
  children, 
  className, 
  prefetch = true 
}: PrefetchLinkProps) {
  const router = useRouter()

  const handleMouseEnter = useCallback(() => {
    if (prefetch) {
      router.prefetch(href)
    }
  }, [router, href, prefetch])

  return (
    <Link 
      href={href} 
      className={className}
      onMouseEnter={handleMouseEnter}
      prefetch={false} // Disable automatic prefetch, we control it manually
    >
      {children}
    </Link>
  )
} 