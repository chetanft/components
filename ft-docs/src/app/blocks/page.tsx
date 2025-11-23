import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { cn } from "@/lib/utils"
import { ArrowRight, ExternalLink } from "lucide-react"

const blocks = [
  {
    id: "dashboard-01",
    title: "Dashboard with Header and Table",
    description: "A complete dashboard layout with app header, cards, and data table",
    category: "Dashboard",
    preview: "/blocks/dashboard-01",
  },
  {
    id: "login-01",
    title: "Login Page",
    description: "A clean login page with form and branding",
    category: "Authentication",
    preview: "/blocks/login-01",
  },
  {
    id: "listing-01",
    title: "Listing Page with Filters",
    description: "A listing page with quick filters and table",
    category: "Listing",
    preview: "/blocks/listing-01",
  },
  {
    id: "my-journeys-01",
    title: "My Journeys Listing Page",
    description: "A comprehensive listing page with filters, tabs, table view, and responsive card view",
    category: "Listing",
    preview: "/blocks/my-journeys-01",
  },
]

export default function BlocksPage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <section className="container mx-auto px-4 py-12 md:py-16">
          <div className="mb-8">
            <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl mb-4">
              Building Blocks
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Clean, modern building blocks built with FT Design System. Copy and paste into your apps.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blocks.map((block) => (
              <BlockCard key={block.id} block={block} />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

function BlockCard({ block }: { block: typeof blocks[0] }) {
  return (
    <Link href={block.preview}>
      <div className="group relative overflow-hidden rounded-lg border bg-card transition-all hover:shadow-lg">
        <div className="aspect-video bg-muted/50 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
          <div className="relative z-10 text-muted-foreground text-sm font-medium">
            {block.category}
          </div>
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-semibold leading-none tracking-tight">
              {block.title}
            </h3>
            <ExternalLink className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {block.description}
          </p>
        </div>
      </div>
    </Link>
  )
}

