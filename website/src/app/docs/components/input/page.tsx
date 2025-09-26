import { ComponentPreview } from "@/components/component-preview"
import { Input } from "@/components/ui/input"

export default function InputPage() {
  return (
    <div className="pb-12">
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Input</h1>
        <p className="text-lg text-muted-foreground">
          Form input component with validation support and multiple types.
        </p>
      </div>

      <div className="pb-12 pt-8">
        <ComponentPreview name="input" />
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
            <code>{`import { Input } from "ft-design-system"

export function InputDemo() {
  return <Input placeholder="Type something..." />
}`}</code>
          </pre>
        </div>

        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
          Examples
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Default</h3>
            <div className="preview flex min-h-[200px] w-full justify-center p-10 items-center border rounded-lg">
              <Input placeholder="Enter text..." className="max-w-sm" />
            </div>
            <div className="my-4 w-full overflow-x-auto">
              <pre className="rounded-lg border bg-muted p-4">
                <code>{`<Input placeholder="Enter text..." />`}</code>
              </pre>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Email</h3>
            <div className="preview flex min-h-[200px] w-full justify-center p-10 items-center border rounded-lg">
              <Input type="email" placeholder="Enter your email..." className="max-w-sm" />
            </div>
            <div className="my-4 w-full overflow-x-auto">
              <pre className="rounded-lg border bg-muted p-4">
                <code>{`<Input type="email" placeholder="Enter your email..." />`}</code>
              </pre>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Password</h3>
            <div className="preview flex min-h-[200px] w-full justify-center p-10 items-center border rounded-lg">
              <Input type="password" placeholder="Enter password..." className="max-w-sm" />
            </div>
            <div className="my-4 w-full overflow-x-auto">
              <pre className="rounded-lg border bg-muted p-4">
                <code>{`<Input type="password" placeholder="Enter password..." />`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
