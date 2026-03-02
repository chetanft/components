"use client"

import { Button, Badge, Input, Avatar, SegmentedTabs, SegmentedTabItem, Card } from "@/registry"

interface ShowcaseCardProps {
  label: string
  children: React.ReactNode
}

function ShowcaseCard({ label, children }: ShowcaseCardProps) {
  return (
    <div className="group relative flex flex-col items-center justify-center gap-4 rounded-xl border border-border bg-card p-8 transition-all hover:shadow-md hover:-translate-y-0.5"
      style={{
        backgroundImage: 'radial-gradient(circle, var(--docs-border) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      <div className="relative z-10 flex items-center justify-center min-h-[60px]">
        {children}
      </div>
      <span className="text-sm-rem font-medium text-muted-foreground">{label}</span>
    </div>
  )
}

export function HomepageShowcase() {
  return (
    <section className="container mx-auto px-4" style={{ paddingTop: 'var(--docs-section-gap)', paddingBottom: 'var(--docs-section-gap)' }}>
      <div className="mx-auto max-w-[64rem]">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-display-lg font-bold tracking-tight text-foreground">
            Built for real products
          </h2>
          <p className="mt-3 max-w-[42rem] text-muted-foreground" style={{ fontSize: 'var(--font-size-lg-rem)' }}>
            Every component is production-tested across enterprise dashboards, logistics platforms, and data-heavy interfaces.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-6">
          <ShowcaseCard label="Button">
            <div className="flex items-center gap-2">
              <Button variant="primary" size="md">Primary</Button>
              <Button variant="secondary" size="md">Secondary</Button>
            </div>
          </ShowcaseCard>

          <ShowcaseCard label="Badge">
            <div className="flex items-center gap-2 flex-wrap justify-center">
              <Badge status="success">Success</Badge>
              <Badge status="warning">Warning</Badge>
              <Badge status="error">Error</Badge>
            </div>
          </ShowcaseCard>

          <ShowcaseCard label="Input">
            <div className="w-full max-w-[200px]">
              <Input placeholder="Enter text..." size="md" />
            </div>
          </ShowcaseCard>

          <ShowcaseCard label="Avatar">
            <div className="flex items-center gap-2">
              <Avatar size="sm">A</Avatar>
              <Avatar size="md">B</Avatar>
              <Avatar size="lg">C</Avatar>
            </div>
          </ShowcaseCard>

          <ShowcaseCard label="Card">
            <div className="w-full max-w-[200px]">
              <Card headerTitle="Card Title" size="sm">
                <p style={{ fontSize: 'var(--font-size-sm-rem)', color: 'var(--secondary)' }}>Card content goes here.</p>
              </Card>
            </div>
          </ShowcaseCard>

          <ShowcaseCard label="SegmentedTabs">
            <SegmentedTabs value="overview" onChange={() => {}}>
              <SegmentedTabItem value="overview" label="Overview" />
              <SegmentedTabItem value="details" label="Details" />
              <SegmentedTabItem value="settings" label="Settings" />
            </SegmentedTabs>
          </ShowcaseCard>
        </div>
      </div>
    </section>
  )
}
