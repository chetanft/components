"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Check, Copy } from "lucide-react"

interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  children?: React.ReactNode
  className?: string
}

export function ComponentPreview({
  name,
  children,
  className,
  ...props
}: ComponentPreviewProps) {
  const [isCopied, setIsCopied] = React.useState(false)

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const getComponentCode = (name: string) => {
    const codeMap: Record<string, string> = {
      button: `import { Button } from "ft-design-system"

export function ButtonDemo() {
  return <Button>Button</Button>
}`,
      badge: `import { Badge } from "ft-design-system"

export function BadgeDemo() {
  return <Badge>Badge</Badge>
}`,
      input: `import { Input } from "ft-design-system"

export function InputDemo() {
  return <Input placeholder="Type something..." />
}`,
      card: `// Card component not yet available in published version
// Use a styled div instead:

export function CardDemo() {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
      <h3 className="text-lg font-semibold">Card Title</h3>
      <p className="text-sm text-muted-foreground">
        Card description goes here.
      </p>
    </div>
  )
}`,
      checkbox: `// Checkbox component from ft-design-system
// Available in the full package`,
      switch: `// Switch component from ft-design-system  
// Available in the full package`,
    }
    return codeMap[name] || `// Component code for ${name}`
  }

  const renderComponent = (name: string) => {
    switch (name) {
      case "button":
        return <Button>Button</Button>
      case "badge":
        return <Badge>Badge</Badge>
      case "input":
        return <Input placeholder="Type something..." />
      case "card":
        return (
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 w-[300px]">
            <h3 className="text-lg font-semibold">Card Title</h3>
            <p className="text-sm text-muted-foreground">
              Card description goes here.
            </p>
          </div>
        )
      case "checkbox":
        return (
          <div className="flex items-center space-x-2">
            <div className="h-4 w-4 rounded border border-input bg-background"></div>
            <span className="text-sm">Accept terms and conditions</span>
          </div>
        )
      case "switch":
        return (
          <div className="flex items-center space-x-2">
            <div className="h-6 w-11 rounded-full border border-input bg-background"></div>
            <span className="text-sm">Airplane Mode</span>
          </div>
        )
      default:
        return children
    }
  }

  return (
    <div className={cn("group relative my-4 flex flex-col space-y-2", className)} {...props}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="h-2 w-2 rounded-full bg-red-500" />
          <div className="h-2 w-2 rounded-full bg-yellow-500" />
          <div className="h-2 w-2 rounded-full bg-green-500" />
        </div>
        <Button
          variant="secondary"
          className="h-6 w-6 p-0 opacity-0 transition-opacity group-hover:opacity-100"
          onClick={() => copyToClipboard(getComponentCode(name))}
        >
          {isCopied ? (
            <Check className="h-3 w-3" />
          ) : (
            <Copy className="h-3 w-3" />
          )}
          <span className="sr-only">Copy component source</span>
        </Button>
      </div>
      <div className="preview flex min-h-[350px] w-full justify-center p-10 items-center">
        {renderComponent(name)}
      </div>
    </div>
  )
}
