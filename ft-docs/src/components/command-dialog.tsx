"use client"

import { useState, useEffect, useRef, useMemo, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Search, FileText, Component, ArrowRight } from "lucide-react"
import { docsConfig } from "@/config/docs"
import { cn } from "@/lib/utils"

interface SearchResult {
  title: string
  href: string
  category: string
  type: "component" | "page"
}

interface CommandDialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function CommandDialog({ open: controlledOpen, onOpenChange }: CommandDialogProps = {}) {
  const [internalOpen, setInternalOpen] = useState(false)
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen
  const setOpen = (value: boolean) => {
    setInternalOpen(value)
    onOpenChange?.(value)
  }
  const [query, setQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Build searchable items
  const searchableItems = useMemo(() => {
    const items: SearchResult[] = []
    docsConfig.mainNav.forEach((item) => {
      if (!item.external) {
        items.push({ title: item.title, href: item.href, category: "Navigation", type: "page" })
      }
    })
    docsConfig.sidebarNav.forEach((section) => {
      section.items.forEach((item) => {
        items.push({ title: item.title, href: item.href, category: section.title, type: "component" })
      })
    })
    return items
  }, [])

  // Filter results
  const results = useMemo(() => {
    if (!query.trim()) return searchableItems.slice(0, 10)
    const q = query.toLowerCase().trim()
    return searchableItems
      .filter((item) => item.title.toLowerCase().includes(q) || item.category.toLowerCase().includes(q))
      .slice(0, 12)
  }, [query, searchableItems])

  // Group results by category
  const groupedResults = useMemo(() => {
    const groups: Record<string, SearchResult[]> = {}
    results.forEach((r) => {
      if (!groups[r.category]) groups[r.category] = []
      groups[r.category].push(r)
    })
    return groups
  }, [results])

  // Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setOpen(!open)
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [open])

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setQuery("")
      setSelectedIndex(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  // Navigation handler
  const navigate = useCallback(
    (href: string) => {
      router.push(href)
      setOpen(false)
    },
    [router]
  )

  // Keyboard nav inside dialog
  useEffect(() => {
    if (!open) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault()
        setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1))
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setSelectedIndex((prev) => Math.max(prev - 1, 0))
      } else if (e.key === "Enter" && results[selectedIndex]) {
        e.preventDefault()
        navigate(results[selectedIndex].href)
      } else if (e.key === "Escape") {
        e.preventDefault()
        setOpen(false)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [open, results, selectedIndex, navigate])

  // Scroll selected into view
  useEffect(() => {
    if (!listRef.current) return
    const selected = listRef.current.querySelector('[data-selected="true"]')
    selected?.scrollIntoView({ block: "nearest" })
  }, [selectedIndex])

  if (!open) return null

  let flatIndex = -1

  return (
    <div className="fixed inset-0 z-[9999]">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-in fade-in-0"
        onClick={() => setOpen(false)}
      />
      {/* Dialog */}
      <div className="relative mx-auto mt-[15vh] w-full max-w-lg animate-in fade-in-0 slide-in-from-top-2">
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-2xl">
          {/* Search input */}
          <div className="flex items-center border-b border-border px-4">
            <Search className="mr-3 h-4 w-4 shrink-0 text-muted-foreground" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search components, pages..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setSelectedIndex(0)
              }}
              className="flex h-12 w-full bg-transparent text-sm-rem text-foreground placeholder:text-muted-foreground outline-none"
            />
            <kbd className="pointer-events-none ml-2 inline-flex h-5 shrink-0 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-xs text-muted-foreground">
              ESC
            </kbd>
          </div>

          {/* Results */}
          <div ref={listRef} className="max-h-[300px] overflow-y-auto p-2">
            {results.length === 0 ? (
              <div className="py-8 text-center text-sm-rem text-muted-foreground">
                No results found.
              </div>
            ) : (
              Object.entries(groupedResults).map(([category, items]) => (
                <div key={category} className="mb-1">
                  <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                    {category}
                  </div>
                  {items.map((item) => {
                    flatIndex++
                    const idx = flatIndex
                    const isSelected = idx === selectedIndex
                    return (
                      <button
                        key={item.href}
                        data-selected={isSelected}
                        onClick={() => navigate(item.href)}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm-rem transition-colors",
                          isSelected
                            ? "bg-primary/10 text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {item.type === "component" ? (
                          <Component className="h-4 w-4 shrink-0" />
                        ) : (
                          <FileText className="h-4 w-4 shrink-0" />
                        )}
                        <span className="flex-1 text-left font-medium">{item.title}</span>
                        {isSelected && <ArrowRight className="h-3 w-3 shrink-0 text-muted-foreground" />}
                      </button>
                    )
                  })}
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-border px-4 py-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <kbd className="inline-flex h-5 items-center rounded border border-border bg-muted px-1 font-mono">
                ↑↓
              </kbd>
              <span>Navigate</span>
              <kbd className="inline-flex h-5 items-center rounded border border-border bg-muted px-1 font-mono">
                ↵
              </kbd>
              <span>Open</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
