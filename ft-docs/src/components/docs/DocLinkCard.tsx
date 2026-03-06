import { ReactNode } from "react"
import { ExternalLink } from "lucide-react"

interface DocLinkCardProps {
  href: string
  title: string
  subtitle: string
  icon: ReactNode
  external?: boolean
}

export function DocLinkCard({ href, title, subtitle, icon, external = true }: DocLinkCardProps) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="flex items-center gap-4 rounded-lg border border-border bg-surface p-5 transition-colors hover:border-primary hover:shadow-lg"
    >
      <div className="shrink-0 w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-primary">
        {icon}
      </div>
      <div className="flex-1">
        <p className="font-semibold text-md-rem">{title}</p>
        <p className="text-sm-rem text-muted-foreground">{subtitle}</p>
      </div>
      {external && <ExternalLink className="h-5 w-5 shrink-0 text-muted-foreground" />}
    </a>
  )
}
