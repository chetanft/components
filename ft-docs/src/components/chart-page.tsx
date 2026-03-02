"use client"

import { ComponentPreview } from "@/components/component-preview"
import { useViewMode } from "@/components/view-mode-context"

export interface ChartVariant {
  id: string
  name: string
  description: string
  code: string
}

interface ChartPageProps {
  title: string
  description: string
  variants: ChartVariant[]
}

export function ChartPage({ title, description, variants }: ChartPageProps) {
  const { viewMode } = useViewMode()

  if (viewMode === "machine") {
    const machineSpec = [
      `# ${title}`,
      description,
      `IMPORT: import { ${title.replace(/\s+Charts?$/i, "").replace(/\s+/g, "")}Chart } from "ft-design-system"`,
      "",
      ...variants.map((v) => [`## ${v.name}`, v.description, "```tsx", v.code, "```", ""].join("\n")),
    ].join("\n")

    return (
      <pre
        className="whitespace-pre-wrap font-mono"
        style={{ fontSize: "var(--font-size-xs-rem)", color: "var(--primary)", lineHeight: 1.7 }}
      >
        {machineSpec}
      </pre>
    )
  }

  return (
    <div className="space-y-12">
      <div className="mb-12">
        <h1 className="font-heading text-3xl-rem font-bold tracking-tight sm:text-4xl-rem mb-4">
          {title}
        </h1>
        <p className="text-lg-rem text-muted-foreground">{description}</p>
      </div>

      <div className="space-y-12">
        {variants.map((variant) => (
          <div key={variant.id} id={variant.id} className="scroll-mt-20 space-y-4">
            <div>
              <h2 className="text-xl-rem font-semibold mb-2">{variant.name}</h2>
              <p className="text-sm-rem text-muted-foreground">{variant.description}</p>
            </div>
            <ComponentPreview code={variant.code} />
          </div>
        ))}
      </div>
    </div>
  )
}
