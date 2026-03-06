interface StatItem {
  value: number | string
  label: string
  color?: string
}

interface DocStatCardsProps {
  items: StatItem[]
}

export function DocStatCards({ items }: DocStatCardsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {items.map((item) => (
        <div key={item.label} className="rounded-lg border border-border p-4 text-center">
          <p className={`text-2xl-rem font-bold ${item.color || "text-foreground"}`}>
            {item.value}
          </p>
          <p className="text-xs text-muted-foreground">{item.label}</p>
        </div>
      ))}
    </div>
  )
}
