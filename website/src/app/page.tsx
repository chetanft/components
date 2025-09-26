import Link from "next/link"
import { Button } from "ft-design-system"
import { Badge } from "ft-design-system"
import { Card } from "ft-design-system"
import { ArrowRight, GitHub, Star } from "lucide-react"

export default function HomePage() {
  return (
    <div className="container relative">
      <section className="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20">
        <Badge className="mb-4">
          ✨ Built from Figma designs
        </Badge>
        
        <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
          Build your component library with{" "}
          <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
            FT Design System
          </span>
        </h1>
        
        <p className="max-w-[750px] text-center text-lg text-muted-foreground sm:text-xl">
          Beautifully designed components built from Figma designs using Code Connect.
          Copy and paste into your apps. Built with Tailwind CSS. Open source.
        </p>
        
        <div className="flex w-full items-center justify-center space-x-4 py-4 md:pb-10">
          <Button asChild>
            <Link href="/docs">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link href="https://github.com/chetanft/components" target="_blank">
              <GitHub className="mr-2 h-4 w-4" />
              GitHub
            </Link>
          </Button>
        </div>
      </section>

      <section className="mx-auto text-center md:max-w-[58rem]">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          Features
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Everything you need to build modern React applications
        </p>
      </section>

      <section className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
        <div className="relative overflow-hidden rounded-lg border bg-background p-2">
          <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
            <Star className="h-12 w-12" />
            <div className="space-y-2">
              <h3 className="font-bold">190+ Icons</h3>
              <p className="text-sm text-muted-foreground">
                Comprehensive icon library with proper TypeScript definitions
              </p>
            </div>
          </div>
        </div>
        
        <div className="relative overflow-hidden rounded-lg border bg-background p-2">
          <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
            <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-red-500 to-orange-500" />
            <div className="space-y-2">
              <h3 className="font-bold">Figma-First</h3>
              <p className="text-sm text-muted-foreground">
                Components built directly from Figma specifications using Code Connect
              </p>
            </div>
          </div>
        </div>
        
        <div className="relative overflow-hidden rounded-lg border bg-background p-2">
          <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
            <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500" />
            <div className="space-y-2">
              <h3 className="font-bold">TypeScript</h3>
              <p className="text-sm text-muted-foreground">
                Full TypeScript support with proper type definitions
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto text-center md:max-w-[58rem] py-8">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          Components
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Over 70 components organized by atomic design principles
        </p>
        
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="p-6">
            <h3 className="font-semibold mb-2">Atoms</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Basic building blocks like Button, Input, Badge
            </p>
            <Button variant="secondary" size="sm" asChild>
              <Link href="/docs/components/button">View Atoms</Link>
            </Button>
          </Card>
          
          <Card className="p-6">
            <h3 className="font-semibold mb-2">Molecules</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Simple combinations like DatePicker, Dropdown, Tabs
            </p>
            <Button variant="secondary" size="sm" asChild>
              <Link href="/docs/components/dropdown-menu">View Molecules</Link>
            </Button>
          </Card>
          
          <Card className="p-6">
            <h3 className="font-semibold mb-2">Organisms</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Complex components like Table, Card, AppHeader
            </p>
            <Button variant="secondary" size="sm" asChild>
              <Link href="/docs/components/table">View Organisms</Link>
            </Button>
          </Card>
        </div>
      </section>
    </div>
  )
}