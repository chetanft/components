import { Card, Statistic, StatisticValue, StatisticTitle } from "@/registry"

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
        <Card key={item.label} bordered size="sm" className="p-4">
          <Statistic className="items-center">
            <StatisticValue className={`w-auto text-2xl-rem font-bold ${item.color || "text-foreground"}`}>
              {item.value}
            </StatisticValue>
            <StatisticTitle className="text-xs">
              {item.label}
            </StatisticTitle>
          </Statistic>
        </Card>
      ))}
    </div>
  )
}
