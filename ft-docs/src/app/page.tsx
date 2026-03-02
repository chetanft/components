import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { HomepageShowcase } from "@/components/homepage-showcase"
import {
  ArrowRight,
  Palette,
  Accessibility,
  Moon,
  Layers,
  Zap,
  Code2,
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden" style={{ paddingTop: 'var(--docs-section-gap)', paddingBottom: 'var(--docs-section-gap)' }}>
          {/* Dot grid background */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: 'radial-gradient(var(--docs-border) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />
          <div className="container relative z-10 mx-auto flex max-w-[64rem] flex-col items-center gap-6 text-center px-4">
            {/* Version badge */}
            <div
              className="inline-flex items-center rounded-full border px-3 py-1 font-medium transition-colors border-border bg-card text-muted-foreground"
              style={{ fontSize: 'var(--font-size-xs-rem)' }}
            >
              v4.21.0 — 80+ components available
            </div>

            {/* Display heading */}
            <h1 className="text-display-xl font-bold tracking-tighter text-foreground leading-[1.1]">
              The design system for{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(to right, var(--primary), var(--tertiary))',
                }}
              >
                enterprise products
              </span>
            </h1>

            <p
              className="max-w-[42rem] leading-relaxed text-muted-foreground"
              style={{ fontSize: 'var(--docs-display-sm)' }}
            >
              Production-grade React components built with accessibility, theming, and performance in mind. From atoms to complex organisms — everything you need to ship fast.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
              <Link
                href="/docs"
                className={cn(
                  "inline-flex h-12 items-center justify-center rounded-md px-8 font-medium shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                  "text-sm-rem",
                  "bg-[var(--button-primary-bg)] text-[var(--button-primary-text)] border border-[var(--button-primary-border)]",
                  "hover:bg-[var(--button-primary-hover-bg)] hover:border-[var(--button-primary-hover-bg)]"
                )}
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/docs/components/button"
                className={cn(
                  "inline-flex h-12 items-center justify-center rounded-md px-8 font-medium shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                  "text-sm-rem",
                  "bg-background text-foreground border border-border",
                  "hover:bg-muted hover:text-foreground"
                )}
              >
                Browse Components
              </Link>
            </div>
          </div>

          {/* Decorative gradient blob */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] opacity-15 blur-[120px] -z-10 rounded-full pointer-events-none"
            style={{
              background: 'linear-gradient(to top right, var(--primary), var(--tertiary))',
            }}
          />
        </section>

        {/* Component Showcase */}
        <HomepageShowcase />

        {/* Stats Section */}
        <section className="container mx-auto px-4" style={{ paddingTop: 'var(--docs-section-gap)', paddingBottom: 'var(--docs-section-gap)' }}>
          <div className="mx-auto max-w-[64rem]">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              <StatBlock value="80+" label="Components" />
              <StatBlock value="300+" label="Design Tokens" />
              <StatBlock value="3" label="Themes" />
              <StatBlock value="100%" label="TypeScript" />
            </div>
          </div>
        </section>

        {/* Feature Cards */}
        <section className="container mx-auto px-4 pb-20" style={{ paddingTop: 'var(--docs-section-gap)' }}>
          <div className="mx-auto max-w-[64rem]">
            <div className="flex flex-col items-center text-center mb-12">
              <h2 className="text-display-lg font-bold tracking-tight text-foreground">
                Why FT Design System?
              </h2>
              <p className="mt-3 max-w-[42rem] text-muted-foreground" style={{ fontSize: 'var(--font-size-lg-rem)' }}>
                Built from the ground up for complex, data-rich applications.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={Accessibility}
                title="Accessible by Default"
                description="WAI-ARIA compliant. Every component tested with screen readers and keyboard navigation."
              />
              <FeatureCard
                icon={Palette}
                title="Design Token Architecture"
                description="300+ tokens for colors, spacing, and typography. Change your entire look with one file."
              />
              <FeatureCard
                icon={Moon}
                title="Three Built-in Themes"
                description="Light, dark, and night modes — plus optional glassmorphism. All automatic."
              />
              <FeatureCard
                icon={Layers}
                title="Atomic Hierarchy"
                description="Atoms, molecules, and organisms. Compose complex UIs from simple, tested building blocks."
              />
              <FeatureCard
                icon={Zap}
                title="Performance First"
                description="Tree-shakeable exports, minimal runtime overhead, and optimized bundle sizes."
              />
              <FeatureCard
                icon={Code2}
                title="Full TypeScript"
                description="Complete type definitions for every component, prop, and event handler."
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

function StatBlock({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1 text-center">
      <span className="text-display-lg font-bold tracking-tight text-foreground">{value}</span>
      <span className="text-sm-rem text-muted-foreground font-medium">{label}</span>
    </div>
  )
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}) {
  return (
    <div className="group rounded-xl border border-border bg-card p-6 transition-all hover:shadow-md hover:-translate-y-0.5">
      <div
        className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg"
        style={{ backgroundColor: 'var(--bg-secondary)' }}
      >
        <Icon className="h-5 w-5 text-foreground" />
      </div>
      <h3
        className="font-semibold leading-none tracking-tight mb-2 text-foreground"
        style={{ fontSize: 'var(--font-size-lg-rem)' }}
      >
        {title}
      </h3>
      <p className="text-muted-foreground leading-relaxed" style={{ fontSize: 'var(--font-size-sm-rem)' }}>
        {description}
      </p>
    </div>
  )
}
