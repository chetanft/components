import { ComponentPreview } from "@/components/component-preview"

export default function DocsPage() {
  return (
    <div className="pb-12">
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          Introduction
        </h1>
        <p className="text-lg text-muted-foreground">
          Beautifully designed components built from Figma designs. Copy and paste into your apps.
        </p>
      </div>
      
      <div className="pb-12 pt-8">
        <ComponentPreview name="button" />
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
          What is this?
        </h2>
        <p className="leading-7">
          This is a collection of reusable components built using React, TypeScript, and Tailwind CSS.
          The components are built from Figma designs using Code Connect, ensuring perfect design-to-code fidelity.
        </p>
        
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
          Features
        </h2>
        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
          <li><strong>190+ Icons:</strong> Comprehensive icon library with proper TypeScript definitions</li>
          <li><strong>Figma-First Design:</strong> Components built directly from Figma specifications</li>
          <li><strong>TypeScript:</strong> Full TypeScript support with proper type definitions</li>
          <li><strong>Tailwind CSS:</strong> Built with Tailwind for easy customization</li>
          <li><strong>Responsive:</strong> Mobile-friendly and responsive design</li>
          <li><strong>Atomic Design:</strong> Organized using atomic design principles (atoms, molecules, organisms)</li>
        </ul>

        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
          Getting Started
        </h2>
        <p className="leading-7">
          Get started by installing the package and importing the components you need.
        </p>
        
        <div className="my-6 w-full overflow-x-auto">
          <pre className="rounded-lg border bg-muted p-4">
            <code>npm install ft-design-system</code>
          </pre>
        </div>

        <p className="leading-7">
          Import the styles in your main CSS file:
        </p>
        
        <div className="my-6 w-full overflow-x-auto">
          <pre className="rounded-lg border bg-muted p-4">
            <code>{`@import 'ft-design-system/dist/styles.css';`}</code>
          </pre>
        </div>

        <p className="leading-7">
          Start using components:
        </p>
        
        <div className="my-6 w-full overflow-x-auto">
          <pre className="rounded-lg border bg-muted p-4">
            <code>{`import { Button, Badge, Input } from 'ft-design-system'

function App() {
  return (
    <div>
      <Button variant="primary">Click me</Button>
      <Badge variant="default">Status</Badge>
      <Input placeholder="Enter text" />
    </div>
  )
}`}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}
