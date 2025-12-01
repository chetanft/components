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
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80" style={{ fontSize: 'var(--font-size-xs-rem)' }}>
              {/* 12px → 0.857rem (responsive) */}
              v0.1.0 is now available
            </div>
            <h1 className="font-heading font-bold tracking-tight text-foreground pb-2" style={{ fontSize: 'var(--font-size-xxl-rem)' }}>
              {/* 28px → 2rem (responsive) */}
              FT Design System
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground" style={{ fontSize: 'var(--font-size-lg-rem)' }}>
              {/* 20px → 1.429rem (responsive) */}
              Beautifully designed components built with Radix UI and Tailwind CSS.
              Accessible. Customizable. Open Source.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
              <Link
                href="/docs"
                className={cn(
                  "inline-flex h-11 items-center justify-center rounded-md px-8 font-medium shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
                  "text-sm-rem",
                  "bg-[var(--button-primary-bg)] text-[var(--button-primary-text)] border border-[var(--button-primary-border)]",
                  "hover:bg-[var(--button-primary-hover-bg)] hover:border-[var(--button-primary-hover-bg)]"
                )}
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Decorative background elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] opacity-20 bg-gradient-to-tr blur-[100px] -z-10 rounded-full pointer-events-none" style={{ background: 'linear-gradient(to top right, var(--primary), var(--tertiary))' }} />
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
      <h3 className="font-semibold leading-none tracking-tight mb-2" style={{ fontSize: 'var(--font-size-lg-rem)' }}>
        {/* 20px → 1.429rem (responsive) */}
        {title}
      </h3>
      <p className="text-muted-foreground" style={{ fontSize: 'var(--font-size-sm-rem)' }}>
        {/* 14px → 1rem (responsive) */}
        {description}
      </p>
    </div>
  )
}
