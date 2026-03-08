import React from "react"
import { Card } from "@/registry"

interface DocCardProps {
  icon?: React.ReactNode
  title: string
  description?: string
  children?: React.ReactNode
}

export function DocCard({ icon, title, description, children }: DocCardProps) {
  const headerWithIcon = (
    <span className="flex items-center gap-3">
      {icon && <span className="text-primary">{icon}</span>}
      {title}
    </span>
  )

  // Cast props to bridge dual @types/react versions (ft-docs vs src)
  const cardProps = {
    bordered: true,
    headerTitle: headerWithIcon,
    headerSubText: description,
    size: "md" as const,
    children,
  }

  return <Card {...(cardProps as any)} />
}
