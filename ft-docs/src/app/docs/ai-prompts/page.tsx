import Link from "next/link"
import { ExternalLink } from "lucide-react"

export default function AIPromptsPage() {
    const systemPrompt = `You are an expert frontend developer using the FT Design System.

## Installation
\`\`\`bash
npm install ft-design-system
\`\`\`

## Setup
\`\`\`tsx
import 'ft-design-system/dist/styles.css';
import { Button, Input, Table } from 'ft-design-system/ai';
\`\`\`

## Core Rules

1. **Use semantic color tokens** - NEVER arbitrary colors
   ✅ bg-primary, text-secondary, border-border
   ❌ bg-[#123456], bg-blue-500

2. **Component specifications**
   - Table: data needs 'id', columns use 'title' (NOT 'header')
   - Badge: variant="danger" (NOT "error")
   - Tabs: use tabs array (NOT children)
   - Button: variants 'primary' | 'secondary' | 'destructive' | 'text' | 'link'
   - Icons: pass string names, NOT React elements

3. **Never override heights** - use size props (sm|md|lg)

## Available Components
Atoms: Button, Badge, Checkbox, Switch, Icon, Input, Label, Avatar, Divider
Molecules: DatePicker, Dropdown, Steps, Tooltip, ProgressBar, Upload components
Organisms: Table, Tabs, AppHeader, Card, Upload, UserProfile, Footer

## Quick Examples
\`\`\`tsx
<Button variant="primary">Save</Button>
<Input label="Email" type="email" />
<Table columns={[{key: 'name', title: 'Name'}]} data={[{id: 1}]} />
<Badge variant="danger">Error</Badge>
\`\`\``

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-4xl font-bold mb-2">AI Prompts</h1>
                <p className="text-muted-foreground">
                    System prompt for AI coding assistants (Cursor, Windsurf, GitHub Copilot, ChatGPT, etc.)
                </p>
            </div>

            <div className="space-y-2">
                <h2 className="text-2xl font-semibold">System Prompt</h2>
                <p className="text-sm text-muted-foreground">
                    Copy this into your AI assistant's rules (.cursor/rules, .windsurf/rules)
                </p>
                <div className="rounded-lg border bg-muted p-4">
                    <pre className="text-xs overflow-x-auto whitespace-pre-wrap font-mono">
                        {systemPrompt}
                    </pre>
                </div>
            </div>

            <div className="rounded-lg border bg-surface p-4">
                <h3 className="font-semibold mb-2">Additional Resources</h3>
                <ul className="space-y-1 text-sm">
                    <li>
                        <Link href="/docs/storybook" className="text-primary hover:underline">
                            Storybook - Component playground
                        </Link>
                    </li>
                    <li>
                        <Link href="/docs/npm-package" className="text-primary hover:underline">
                            NPM Package - Installation guide
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}
