"use client"

import { AppHeader, Card, Table, Button, Badge } from "../../../../../src"
import { SiteHeader } from "@/components/site-header"
import Link from "next/link"
import { ArrowLeft, Code, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

const sampleData = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    status: "Active",
    role: "Admin",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    status: "Active",
    role: "User",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    status: "Inactive",
    role: "User",
  },
]

export default function Dashboard01Page() {
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
            <h1 className="text-3xl font-bold mb-2">Dashboard with Header and Table</h1>
            <p className="text-muted-foreground">
              A complete dashboard layout with app header, cards, and data table
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
              <DashboardPreview />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function DashboardPreview() {
  const user = {
    name: "John Doe",
    role: "Admin",
    location: "Mumbai",
    badge: "Admin",
  }

  return (
    <div className="space-y-6">
      <AppHeader user={user} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <div className="p-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Users</h3>
            <p className="text-2xl font-bold">1,234</p>
          </div>
        </Card>
        <Card>
          <div className="p-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Active Sessions</h3>
            <p className="text-2xl font-bold">567</p>
          </div>
        </Card>
        <Card>
          <div className="p-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Revenue</h3>
            <p className="text-2xl font-bold">$12,345</p>
          </div>
        </Card>
      </div>

      <Card>
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Users</h3>
            <Button variant="primary" size="md">
              Add User
            </Button>
          </div>
          <Table
            data={sampleData}
            columns={[
              { key: "name", label: "Name" },
              { key: "email", label: "Email" },
              {
                key: "status",
                label: "Status",
                render: (value) => (
                  <Badge variant={value === "Active" ? "success" : "neutral"}>
                    {value}
                  </Badge>
                ),
              },
              { key: "role", label: "Role" },
            ]}
          />
        </div>
      </Card>
    </div>
  )
}

