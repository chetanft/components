import { Copy } from "lucide-react"

export default function AIPromptsPage() {
    const systemPrompt = `You are an expert frontend developer using the FT Design System.
This design system is built with React, Tailwind CSS, and Radix UI.

Key Principles:
1. Use the provided components from "@chetanft/design_system" whenever possible.
2. Use Tailwind CSS utility classes for layout and spacing.
3. Follow the component props definitions strictly.

Available Components:
- Button (variants: primary, secondary, text)
- Input (types: text, email, password, number)
- Checkbox
- Switch
- Badge (variants: default, secondary, success, warning, error)
- AppHeader
- Footer
- UserProfile

Example Usage:
import { Button, Input } from "@chetanft/design_system"

export function LoginForm() {
  return (
    <form className="space-y-4">
      <Input label="Email" type="email" />
      <Input label="Password" type="password" />
      <Button variant="primary">Login</Button>
    </form>
  )
}`

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                    AI Prompts
                </h1>
                <p className="text-lg text-muted-foreground">
                    Copy these prompts into your AI coding assistant (Cursor, Windsurf, GitHub Copilot) to help it understand the FT Design System.
                </p>
            </div>

            <div className="space-y-4">
                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                    System Prompt
                </h2>
                <div className="relative rounded-md border bg-muted p-4">
                    <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-sm">
                        {systemPrompt}
                    </pre>
                </div>
            </div>
        </div>
    )
}
