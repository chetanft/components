import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface NavLink {
  label: string
  href: string
}

interface DocBottomNavProps {
  prev?: NavLink
  next?: NavLink
}

export function DocBottomNav({ prev, next }: DocBottomNavProps) {
  return (
    <div className="flex items-center justify-between border-t border-border pt-6 mt-8">
      {prev ? (
        <Link
          href={prev.href}
          className="inline-flex items-center gap-2 text-sm-rem text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          {prev.label}
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={next.href}
          className="inline-flex items-center gap-2 text-sm-rem text-muted-foreground hover:text-foreground transition-colors"
        >
          {next.label}
          <ChevronRight className="h-4 w-4" />
        </Link>
      ) : (
        <div />
      )}
    </div>
  )
}
