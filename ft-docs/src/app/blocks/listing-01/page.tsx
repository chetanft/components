"use client"

import { AppHeader, QuickFilters, Table, Button, Badge } from "../../../../../src"
import { SiteHeader } from "@/components/site-header"
import Link from "next/link"
import { ArrowLeft, Code, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

const sampleData = [
  {
    id: 1,
    name: "Project Alpha",
    status: "Active",
    progress: 75,
    assignee: "John Doe",
  },
  {
    id: 2,
    name: "Project Beta",
    status: "Pending",
    progress: 30,
    assignee: "Jane Smith",
  },
  {
    id: 3,
    name: "Project Gamma",
    status: "Completed",
    progress: 100,
    assignee: "Bob Johnson",
  },
]

const filters = [
  { id: "all", label: "All", selected: true },
  { id: "active", label: "Active", count: 1 },
  { id: "pending", label: "Pending", count: 1 },
  { id: "completed", label: "Completed", count: 1 },
]

export default function Listing01Page() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-6">
          <Link
            href="/blocks"
            className={cn(
              "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
            )}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blocks
          </Link>

          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Listing Page with Filters</h1>
            <p className="text-muted-foreground">
              A listing page with quick filters and table
            </p>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <div className="bg-muted/50 p-4 border-b">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold">Preview</h2>
                <div className="flex items-center gap-2">
                  <button className="text-sm text-muted-foreground hover:text-foreground">
                    <Code className="h-4 w-4" />
                  </button>
                  <button className="text-sm text-muted-foreground hover:text-foreground">
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
            <div className="p-6 bg-background">
              <ListingPreview />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function ListingPreview() {
  const user = {
    name: "John Doe",
    role: "Admin",
    location: "Mumbai",
    badge: "Admin",
  }

  return (
    <div className="space-y-6">
      <AppHeader user={user} />

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Projects</h2>
        <Button variant="primary" size="md">
          New Project
        </Button>
      </div>

      <QuickFilters
        filters={filters}
        onFilterClick={(filterId) => {
          console.log("Filter clicked:", filterId)
        }}
      />

      <Table
        data={sampleData}
        columns={[
          { key: "name", label: "Project Name" },
          {
            key: "status",
            label: "Status",
            render: (value) => (
              <Badge
                variant={
                  value === "Active"
                    ? "success"
                    : value === "Completed"
                      ? "neutral"
                      : "warning"
                }
              >
                {value}
              </Badge>
            ),
          },
          {
            key: "progress",
            label: "Progress",
            render: (value) => `${value}%`,
          },
          { key: "assignee", label: "Assignee" },
        ]}
      />
    </div>
  )
}

