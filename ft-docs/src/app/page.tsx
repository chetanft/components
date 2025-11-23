import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <section className="relative overflow-hidden pt-16 md:pt-20 lg:pt-32">
          <div className="container relative z-10 mx-auto flex max-w-[64rem] flex-col items-center gap-4 text-center px-4">
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
              v0.1.0 is now available
            </div>
            <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-foreground pb-2">
              FT Design System
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Beautifully designed components built with Radix UI and Tailwind CSS.
              Accessible. Customizable. Open Source.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
              <Link
                href="/docs"
                className={cn(
                  "inline-flex h-11 items-center justify-center rounded-md px-8 text-sm font-medium shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
                  "bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
                )}
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Decorative background elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] opacity-20 bg-gradient-to-tr from-primary to-purple-500 blur-[100px] -z-10 rounded-full pointer-events-none" />
        </section>

        <section className="container mx-auto px-4 py-12 md:py-24 lg:py-32">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <FeatureCard
              title="Accessible"
              description="Adheres to WAI-ARIA design patterns. Tested with screen readers and keyboard navigation."
            />
            <FeatureCard
              title="Customizable"
              description="Built with Tailwind CSS. Change colors, typography, and spacing with ease."
            />
            <FeatureCard
              title="Open Source"
              description="Free to use for personal and commercial projects. MIT Licensed."
            />
          </div>
        </section>
      </main>
    </div>
  )
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
      <h3 className="text-lg font-semibold leading-none tracking-tight mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
