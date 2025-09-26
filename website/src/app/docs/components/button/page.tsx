import { ComponentPreview } from "@/components/component-preview"
import { Button } from "ft-design-system"
import { Copy, Check } from "lucide-react"

export default function ButtonPage() {
  return (
    <div className="pb-12">
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Button</h1>
        <p className="text-lg text-muted-foreground">
          Interactive button component with multiple variants and icon support.
        </p>
      </div>

      <div className="pb-12 pt-8">
        <ComponentPreview name="button" />
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

        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
          Usage
        </h2>
        
        <div className="my-6 w-full overflow-x-auto">
          <pre className="rounded-lg border bg-muted p-4">
            <code>{`import { Button } from "ft-design-system"

export function ButtonDemo() {
  return <Button>Click me</Button>
}`}</code>
          </pre>
        </div>

        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
          Examples
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Primary</h3>
            <div className="preview flex min-h-[200px] w-full justify-center p-10 items-center border rounded-lg">
              <Button variant="primary">Primary Button</Button>
            </div>
            <div className="my-4 w-full overflow-x-auto">
              <pre className="rounded-lg border bg-muted p-4">
                <code>{`<Button variant="primary">Primary Button</Button>`}</code>
              </pre>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Secondary</h3>
            <div className="preview flex min-h-[200px] w-full justify-center p-10 items-center border rounded-lg">
              <Button variant="secondary">Secondary Button</Button>
            </div>
            <div className="my-4 w-full overflow-x-auto">
              <pre className="rounded-lg border bg-muted p-4">
                <code>{`<Button variant="secondary">Secondary Button</Button>`}</code>
              </pre>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">With Icon</h3>
            <div className="preview flex min-h-[200px] w-full justify-center p-10 items-center border rounded-lg">
              <Button variant="primary">
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </Button>
            </div>
            <div className="my-4 w-full overflow-x-auto">
              <pre className="rounded-lg border bg-muted p-4">
                <code>{`<Button variant="primary">
  <Copy className="mr-2 h-4 w-4" />
  Copy
</Button>`}</code>
              </pre>
            </div>
          </div>
        </div>

        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
          Props
        </h2>
        
        <div className="my-6">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="border-b border-border">
                  <th className="border-r border-border px-4 py-2 text-left">Prop</th>
                  <th className="border-r border-border px-4 py-2 text-left">Type</th>
                  <th className="border-r border-border px-4 py-2 text-left">Default</th>
                  <th className="px-4 py-2 text-left">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="border-r border-border px-4 py-2 font-mono text-sm">variant</td>
                  <td className="border-r border-border px-4 py-2 font-mono text-sm">&apos;primary&apos; | &apos;secondary&apos; | &apos;text&apos;</td>
                  <td className="border-r border-border px-4 py-2 font-mono text-sm">primary</td>
                  <td className="px-4 py-2">Button visual style variant</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="border-r border-border px-4 py-2 font-mono text-sm">size</td>
                  <td className="border-r border-border px-4 py-2 font-mono text-sm">&apos;small&apos; | &apos;medium&apos; | &apos;large&apos;</td>
                  <td className="border-r border-border px-4 py-2 font-mono text-sm">medium</td>
                  <td className="px-4 py-2">Button size</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="border-r border-border px-4 py-2 font-mono text-sm">disabled</td>
                  <td className="border-r border-border px-4 py-2 font-mono text-sm">boolean</td>
                  <td className="border-r border-border px-4 py-2 font-mono text-sm">false</td>
                  <td className="px-4 py-2">Whether the button is disabled</td>
                </tr>
                <tr>
                  <td className="border-r border-border px-4 py-2 font-mono text-sm">children</td>
                  <td className="border-r border-border px-4 py-2 font-mono text-sm">React.ReactNode</td>
                  <td className="border-r border-border px-4 py-2 font-mono text-sm">-</td>
                  <td className="px-4 py-2">Button content</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
