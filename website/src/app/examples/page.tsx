import Link from "next/link"

export default function ExamplesPage() {
  const examples = [
    {
      name: "Authentication",
      description: "Login and signup forms using the form components.",
      href: "/examples/authentication"
    },
    {
      name: "Dashboard",
      description: "A dashboard with navigation, cards, and tables.",
      href: "/examples/dashboard"
    },
    {
      name: "Settings",
      description: "Settings forms with various input types.",
      href: "/examples/settings"
    },
    {
      name: "E-commerce",
      description: "Product cards, checkout forms, and shopping cart.",
      href: "/examples/ecommerce"
    }
  ]

  return (
    <div className="container relative">
      <div className="mx-auto w-full min-w-0">
        <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
          <div className="overflow-hidden text-ellipsis whitespace-nowrap">
            Examples
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
            Examples
          </h1>
          <p className="text-lg text-muted-foreground">
            Dashboard, cards, authentication. Some examples built using the components.
          </p>
        </div>
        <div className="pb-12 pt-8">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {examples.map((example) => (
              <Link
                key={example.name}
                href={example.href}
                className="card p-6 hover:shadow-md transition-shadow"
              >
                <div className="space-y-2">
                  <h3 className="font-semibold">{example.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {example.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-muted-foreground">
              More examples coming soon. Check back later!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
