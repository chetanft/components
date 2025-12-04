"use client";
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { Card, Icon, PageHeader } from "@chetanft/design_system"

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
    <div
      className="relative flex min-h-screen flex-col"
      style={{ backgroundColor: "var(--bg-secondary)" }}
    >
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto w-full max-w-6xl px-4 py-10 md:py-14">
          <div
            className="mb-10 rounded-2xl border"
            style={{
              backgroundColor: "var(--bg-primary)",
              borderColor: "var(--border-secondary)",
            }}
          >
            <PageHeader className="!bg-transparent !px-6">
              <PageHeader.Top>
                <PageHeader.Left>
                  <PageHeader.TitleGroup>
                    <PageHeader.Title>Building Blocks</PageHeader.Title>
                    <PageHeader.Subtitle>
                      Clean, modern building blocks built with FT Design System. Copy and paste into your apps.
                    </PageHeader.Subtitle>
                  </PageHeader.TitleGroup>
                </PageHeader.Left>
              </PageHeader.Top>
            </PageHeader>
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
    <Link href={block.preview} className="group block h-full">
      <Card
        hoverable
        className="h-full transition-shadow"
        style={{
          backgroundColor: "var(--bg-primary)",
          borderColor: "var(--border-secondary)",
        }}
      >
        <div className="flex flex-col gap-4">
          <div
            className="relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl"
            style={{ backgroundColor: "var(--bg-secondary)" }}
          >
            <span
              className="text-sm font-semibold uppercase tracking-wider"
              style={{ color: "var(--secondary)" }}
            >
              {block.category}
            </span>
            <div className="absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(67,79,100,0.08), rgba(67,79,100,0))",
                }}
              />
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3
                  className="text-lg font-semibold leading-6"
                  style={{ color: "var(--primary)" }}
                >
                  {block.title}
                </h3>
                <p
                  className="mt-2 text-sm leading-relaxed"
                  style={{ color: "var(--secondary)" }}
                >
                  {block.description}
                </p>
              </div>
              <Icon
                name="arrow-top-right"
                size={20}
                className="shrink-0"
                style={{ color: "var(--tertiary)" }}
              />
            </div>

            <div
              className="flex items-center justify-between text-sm"
              style={{ color: "var(--tertiary)" }}
            >
              <span>Preview blueprint</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )
}
