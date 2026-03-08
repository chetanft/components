import Link from "next/link"
import { Icon } from "@/registry"

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
          <Icon name="chevron-left" size={16} />
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
          <Icon name="chevron-right" size={16} />
        </Link>
      ) : (
        <div />
      )}
    </div>
  )
}
