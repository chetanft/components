import { ComponentPreview } from "@/components/component-preview"
import { Card } from "ft-design-system"

export default function CardPage() {
  return (
    <div className="pb-12">
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Card</h1>
        <p className="text-lg text-muted-foreground">
          Displays a card with header, content and footer sections.
        </p>
      </div>

      <div className="pb-12 pt-8">
        <ComponentPreview name="card" />
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
          Installation
        </h2>
        
        <div className="my-6 w-full overflow-x-auto">
          <pre className="rounded-lg border bg-muted p-4">
            <code>npm install ft-design-system</code>
          </pre>
        </div>

        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibent tracking-tight">
          Usage
        </h2>
        
        <div className="my-6 w-full overflow-x-auto">
          <pre className="rounded-lg border bg-muted p-4">
            <code>{`import { Card } from "ft-design-system"

export function CardDemo() {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold">Card Title</h3>
      <p className="text-sm text-muted-foreground">
        Card description goes here.
      </p>
    </Card>
  )
}`}</code>
          </pre>
        </div>

        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
          Examples
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Basic Card</h3>
            <div className="preview flex min-h-[200px] w-full justify-center p-10 items-center border rounded-lg">
              <Card className="p-6 w-[300px]">
                <h3 className="text-lg font-semibold">Card Title</h3>
                <p className="text-sm text-muted-foreground">
                  Card description goes here.
                </p>
              </Card>
            </div>
            <div className="my-4 w-full overflow-x-auto">
              <pre className="rounded-lg border bg-muted p-4">
                <code>{`<Card className="p-6">
  <h3 className="text-lg font-semibold">Card Title</h3>
  <p className="text-sm text-muted-foreground">
    Card description goes here.
  </p>
</Card>`}</code>
              </pre>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Card with Content</h3>
            <div className="preview flex min-h-[200px] w-full justify-center p-10 items-center border rounded-lg">
              <Card className="p-6 w-[350px]">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold">Project Alpha</h3>
                    <p className="text-sm text-muted-foreground">
                      A comprehensive design system for modern applications.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                      React
                    </span>
                    <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-700/10">
                      TypeScript
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
