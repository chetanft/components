"use client"

import { useState, useEffect, useRef, useMemo, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Modal, ModalContent, Icon, Input, Button } from "@/registry"
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

  // Keyboard nav inside dialog (ArrowUp/Down, Enter — ESC handled by Modal)
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

  let flatIndex = -1

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <ModalContent size="md" centered={false} className="!self-start mt-[15vh] overflow-hidden">
        {/* Search input */}
        <div className="border-b border-border px-4 py-2">
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search components, pages..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSelectedIndex(0)
            }}
            leadingIcon="search"
            className="!border-0 !shadow-none"
            wrapperClassName="w-full"
          />
        </div>

        {/* Results */}
        <div ref={listRef} className="max-h-[300px] overflow-y-auto p-2">
          {results.length === 0 ? (
            <div className="py-8 text-center text-sm-rem text-[var(--text-secondary)]">
              No results found.
            </div>
          ) : (
            Object.entries(groupedResults).map(([category, items]) => (
              <div key={category} className="mb-1">
                <div className="px-2 py-1.5 text-xs font-medium text-[var(--text-secondary)]">
                  {category}
                </div>
                {items.map((item) => {
                  flatIndex++
                  const idx = flatIndex
                  const isSelected = idx === selectedIndex
                  return (
                    <Button
                      key={item.href}
                      variant="text"
                      size="sm"
                      data-selected={isSelected}
                      onClick={() => navigate(item.href)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      icon={item.type === "component" ? (
                        <Icon name="dashboard" size={16} className="shrink-0" />
                      ) : (
                        <Icon name="document" size={16} className="shrink-0" />
                      )}
                      iconPosition="leading"
                      className={cn(
                        "!flex w-full !items-center gap-3 !rounded-md !px-3 !py-2.5 !text-sm-rem !font-medium !h-auto !justify-start",
                        isSelected
                          ? "!bg-[var(--bg-interactive)] !text-[var(--text-primary)]"
                          : "!text-[var(--text-secondary)] hover:!text-[var(--text-primary)] !bg-transparent"
                      )}
                    >
                      <span className="flex-1 text-left">{item.title}</span>
                      {isSelected && <Icon name="chevron-right" size={12} className="shrink-0 text-[var(--text-secondary)]" />}
                    </Button>
                  )
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-border px-4 py-2 text-xs text-[var(--text-secondary)]">
          <div className="flex items-center gap-2">
            <kbd className="inline-flex h-5 items-center rounded border border-border bg-[var(--bg-secondary)] px-1 font-mono">
              ↑↓
            </kbd>
            <span>Navigate</span>
            <kbd className="inline-flex h-5 items-center rounded border border-border bg-[var(--bg-secondary)] px-1 font-mono">
              ↵
            </kbd>
            <span>Open</span>
          </div>
        </div>
      </ModalContent>
    </Modal>
  )
}
