import { ReactNode } from "react"

interface DocCardProps {
  icon?: ReactNode
  title: string
  description?: string
  children?: ReactNode
}

export function DocCard({ icon, title, description, children }: DocCardProps) {
  return (
    <div className="rounded-lg border border-border bg-surface p-6">
      <div className="flex items-center gap-3 mb-4">
        {icon && <div className="text-primary">{icon}</div>}
        <h3 className="text-lg-rem font-semibold">{title}</h3>
      </div>
      {description && (
        <p className="text-sm-rem text-muted-foreground mb-4">{description}</p>
      )}
      {children}
    </div>
  )
}
