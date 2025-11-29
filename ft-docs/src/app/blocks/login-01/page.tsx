"use client"

import { Button, Input, Card } from "@chetanft/design_system"
import { SiteHeader } from "@/components/site-header"
import Link from "next/link"
import { ArrowLeft, Code, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Login01Page() {
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
            <h1 className="text-3xl font-bold mb-2">Login Page</h1>
            <p className="text-muted-foreground">
              A clean login page with form and branding
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
              <LoginPreview />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function LoginPreview() {
  return (
    <div className="bg-muted flex min-h-[400px] flex-col items-center justify-center gap-6 p-6 rounded-lg">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            FT
          </div>
          FT Design System
        </div>
        <Card>
          <div className="p-6 space-y-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">Welcome back</h2>
              <p className="text-sm text-muted-foreground">
                Enter your credentials to access your account
              </p>
            </div>
            <div className="space-y-4">
              <Input label="Email" type="email" placeholder="name@example.com" />
              <Input label="Password" type="password" placeholder="••••••••" />
              <Button variant="primary" size="md" className="w-full">
                Sign in
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
