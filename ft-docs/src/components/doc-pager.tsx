"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { docsConfig } from "@/config/docs"
import { cn } from "@/lib/utils"
import { Icon } from "@/registry"

export function DocPager() {
  const pathname = usePathname()

  // Flatten all sidebar nav items into an ordered list
  const allItems = docsConfig.sidebarNav.flatMap((section) =>
    section.items.map((item) => ({ title: item.title, href: item.href }))
  )

  const currentIndex = allItems.findIndex((item) => item.href === pathname)
  if (currentIndex === -1) return null

  const prev = currentIndex > 0 ? allItems[currentIndex - 1] : null
  const next = currentIndex < allItems.length - 1 ? allItems[currentIndex + 1] : null

  if (!prev && !next) return null

  return (
    <div className="flex items-center justify-between gap-4 pt-8 mt-8 border-t border-border">
      {prev ? (
        <Link
          href={prev.href}
          className={cn(
            "group flex flex-col items-start gap-1 rounded-lg border border-border px-4 py-3 transition-all hover:bg-muted/50 hover:shadow-sm",
            "flex-1"
          )}
        >
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Icon name="chevron-left" size={12} />
            Previous
          </span>
          <span className="text-sm-rem font-medium text-foreground group-hover:text-foreground">
            {prev.title}
          </span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
      {next ? (
        <Link
          href={next.href}
          className={cn(
            "group flex flex-col items-end gap-1 rounded-lg border border-border px-4 py-3 transition-all hover:bg-muted/50 hover:shadow-sm",
            "flex-1"
          )}
        >
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            Next
            <Icon name="chevron-right" size={12} />
          </span>
          <span className="text-sm-rem font-medium text-foreground group-hover:text-foreground">
            {next.title}
          </span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </div>
  )
}
