"use client"

import { useEffect, useRef } from "react"
import { useToc } from "@/components/toc-context"
import { cn } from "@/lib/utils"

export function TableOfContents() {
  const { items, activeId, setActiveId } = useToc()
  const observerRef = useRef<IntersectionObserver | null>(null)

  // Set up IntersectionObserver to track active section
  useEffect(() => {
    if (items.length === 0) return

    observerRef.current?.disconnect()

    const callback: IntersectionObserverCallback = (entries) => {
      // Find the first visible entry
      const visibleEntries = entries.filter((entry) => entry.isIntersecting)
      if (visibleEntries.length > 0) {
        setActiveId(visibleEntries[0].target.id)
      }
    }

    observerRef.current = new IntersectionObserver(callback, {
      rootMargin: "-80px 0px -60% 0px",
      threshold: 0,
    })

    // Observe all heading elements
    items.forEach((item) => {
      const el = document.getElementById(item.id)
      if (el) observerRef.current?.observe(el)
    })

    return () => observerRef.current?.disconnect()
  }, [items, setActiveId])

  if (items.length === 0) return null

  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60 mb-3">
        On This Page
      </p>
      <nav className="flex flex-col gap-1.5">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => {
              e.preventDefault()
              const el = document.getElementById(item.id)
              if (el) {
                el.scrollIntoView({ behavior: "smooth" })
                setActiveId(item.id)
              }
            }}
            className={cn(
              "text-xs transition-colors py-1",
              item.level > 2 ? "pl-3" : "",
              activeId === item.id
                ? "text-foreground font-medium"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {item.title}
          </a>
        ))}
      </nav>
    </div>
  )
}
