import { ReactNode } from "react"

interface DocSectionProps {
  title: string
  id?: string
  children: ReactNode
}

export function DocSection({ title, id, children }: DocSectionProps) {
  const sectionId = id || title.toLowerCase().replace(/\s+/g, "-")

  return (
    <div className="space-y-4">
      <h2 id={sectionId} className="text-2xl-rem font-semibold tracking-tight scroll-m-20">
        {title}
      </h2>
      {children}
    </div>
  )
}
