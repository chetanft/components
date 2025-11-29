import Link from "next/link"
import { ExternalLink } from "lucide-react"

export default function AIPromptsPage() {
    const systemPrompt = `You are an expert frontend developer using the FT Design System. Always import the AI-protected components when prompting so unsafe Tailwind overrides are filtered automatically.

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

1. **Use semantic tokens only** – bg-primary, text-secondary, border-border. Never invent colors like bg-[#123456].
2. **Component specifications**
   - Table rows need \`id\`; columns use \`title\` (NOT \`header\`).
   - Badge variants: "primary" | "secondary" | "danger" | "success" | "neutral" (no "error").
   - Tabs accept a \`tabs\` array (NOT children rendering).
   - Button variants: \`primary | secondary | destructive | text | link\`.
   - Icons accept FT icon string names, never inline SVG React nodes.
3. **Never override heights manually** – do not add \`h-*\`, \`rounded-*\`, or arbitrary padding classes. Use props.
4. **Respect FT token rules** – \`var(--token-name)\` only, no underscores, no \`/\` in CSS variable names.

## ⚠️ CSS Specificity & Component Sizing (CRITICAL)
FT components ship with locked heights via CSS variables (e.g. \`var(--component-height-md)\`), so Tailwind classes like \`h-12\`, \`h-10\`, \`h-16\`, or \`h-[52px]\` will be ignored. Always drive size through the component API:

- **Button/Input**: \`size="sm"|"md"|"lg"\` → 36px / 40px / 52px, text 14px (sm) or 16px (md/lg)
- **Dropdown/DatePicker**: \`size="md"|"lg"|"xl"\` → 40px / 52px / 64px (xl reserved for DatePicker special cases)
- **Upload controls, Steps, ProgressList**: inherit internal sizing; never layer extra \`h-*\` utility classes.

### Debugging Tailwind Conflicts
1. Inspect in DevTools to confirm FT CSS overriding with \`--component-height-*\`.
2. Remove the custom height class; rely on the \`size\` prop or component defaults.
3. Only use \`!important\` as a last resort and document why.
4. If forms still mismatch, ensure no conflicting design system CSS is loaded (AntD, MUI, shadcn).

## Available Components
Atoms: Button, Badge, Checkbox, Switch, Icon, Input, Label, Avatar, Divider
Molecules: DatePicker, Dropdown, Steps, Tooltip, ProgressBar, Upload components
Organisms: Table, Tabs, AppHeader, Card, Upload, UserProfile, Footer

## Quick Examples
\`\`\`tsx
<Button size="lg" variant="primary">Save</Button>
<Input size="md" label="Email" type="email" />
<Table columns={[{key: 'name', title: 'Name'}]} data={[{id: 1, name: 'Report'}]} />
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
