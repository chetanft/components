import Link from "next/link"

export default function ComponentsPage() {
  const components = [
    {
      name: "Button",
      description: "Displays a button or a component that looks like a button.",
      href: "/docs/components/button"
    },
    {
      name: "Input",
      description: "Displays a form input field or a component that looks like an input field.",
      href: "/docs/components/input"
    },
    {
      name: "Badge",
      description: "Displays a badge or a component that looks like a badge.",
      href: "/docs/components/badge"
    },
    {
      name: "Card",
      description: "Displays a card with header, content, and footer.",
      href: "/docs/components/card"
    },
    {
      name: "Table",
      description: "A responsive table component.",
      href: "/docs/components/table"
    }
  ]

  return (
    <div className="container relative">
      <div className="mx-auto w-full min-w-0">
        <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
          <div className="overflow-hidden text-ellipsis whitespace-nowrap">
            Docs
          </div>
          <div>/</div>
          <div className="font-medium text-foreground">Components</div>
        </div>
        <div className="space-y-2">
          <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
            Components
          </h1>
          <p className="text-lg text-muted-foreground">
            Beautifully designed components built from Figma designs. Copy and paste into your apps.
          </p>
        </div>
        <div className="pb-12 pt-8">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {components.map((component) => (
              <Link
                key={component.name}
                href={component.href}
                className="card p-6 hover:shadow-md transition-shadow"
              >
                <div className="space-y-2">
                  <h3 className="font-semibold">{component.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {component.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
