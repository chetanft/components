import { Badge } from "@/registry"

interface DocPageHeaderProps {
  title: string
  description: string
  badge?: string
}

export function DocPageHeader({ title, description, badge }: DocPageHeaderProps) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <h1 className="text-3xl-rem font-bold tracking-tight">{title}</h1>
        {badge && (
          <Badge variant="neutral" size="xs">
            {badge}
          </Badge>
        )}
      </div>
      <p className="text-muted-foreground text-lg-rem">{description}</p>
    </div>
  )
}
