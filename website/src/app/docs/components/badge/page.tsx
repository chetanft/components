import { ComponentPreview } from "@/components/component-preview"

export default function BadgePage() {
  return (
    <div className="container relative">
      <div className="mx-auto w-full min-w-0">
        <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
          <div className="overflow-hidden text-ellipsis whitespace-nowrap">
            Docs
          </div>
          <div>/</div>
          <div className="overflow-hidden text-ellipsis whitespace-nowrap">
            Components
          </div>
          <div>/</div>
          <div className="font-medium text-foreground">Badge</div>
        </div>
        <div className="space-y-2">
          <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Badge</h1>
          <p className="text-lg text-muted-foreground">
            Displays a badge or a component that looks like a badge.
          </p>
        </div>
        <div className="pb-12 pt-8">
          <div className="space-y-10">
            <div>
              <h2 className="font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0">
                Example
              </h2>
              <div className="mt-6">
                <ComponentPreview name="badge-demo">
                  <div className="flex items-center space-x-2">
                    <div className="badge">Default</div>
                    <div className="badge" style={{ backgroundColor: 'var(--secondary)', color: 'var(--secondary-foreground)' }}>
                      Secondary
                    </div>
                    <div className="badge" style={{ backgroundColor: '#ef4444', color: 'white' }}>
                      Destructive
                    </div>
                  </div>
                </ComponentPreview>
              </div>
            </div>

            <div>
              <h2 className="font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0">
                Installation
              </h2>
              <div className="mt-6">
                <pre className="mb-4 mt-6 overflow-x-auto rounded-lg border bg-zinc-950 py-4 dark:bg-zinc-900">
                  <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm text-white">
                    npm install ft-design-system
                  </code>
                </pre>
              </div>
            </div>

            <div>
              <h2 className="font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0">
                Usage
              </h2>
              <div className="mt-6">
                <pre className="mb-4 mt-6 overflow-x-auto rounded-lg border bg-zinc-950 py-4 dark:bg-zinc-900">
                  <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm text-white">
{`import { Badge } from "ft-design-system"

export default function BadgeDemo() {
  return <Badge>Default</Badge>
}`}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
