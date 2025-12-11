"use client"

import Link from "next/link"
import { Copy, Check } from "lucide-react"
import { useState } from "react"

export default function AIPromptsPage() {
    // Machine-readable format (recommended for AI tools)
    const machineReadablePrompt = `# FT Design System - AI Rules
# Version: 4.15.14 | Components: 124

## IMPORTS
css: import 'ft-design-system/styles';
components: import { Button, Input, Table } from 'ft-design-system';
provider: import { FTProvider } from 'ft-design-system';

## FORBIDDEN (Never generate these)
- Arbitrary background/text/border with hex: bg-[ #HEX ], text-[ #HEX ]
- Arbitrary with CSS vars: bg-[ var(--name) ], text-[ var(--name) ]
- Dimension overrides on components: h-[ X ], w-[ X ], rounded-[ X ], p-[ X ]
- CSS vars with underscore: var(--some_token)
- CSS vars with slash: var(--some/token)
- Hardcoded font: fontSize: '16px'

## REQUIRED
- Components are AI-protected by default
- Use size prop: size="sm"|"md"|"lg"
- Use variant prop for styling
- Table rows must have 'id' field
- Table columns use 'title' not 'header'

## COMPONENT API
Button: variant=primary|secondary|destructive|text|link|ghost|dashed, size=sm|md|lg
Input: label, placeholder, error, helperText, size=sm|md|lg
Badge: variant=primary|secondary|danger|success|warning|neutral (NOT 'error')
Table: columns=[{key,title}], data=[{id,...}]
Modal: open, onOpenChange, children=ModalContent

## COLORS (use Tailwind classes)
primary-700=#434F64 → bg-primary-700
critical=#ff3532 → text-critical
positive=#00c637 → text-positive

## TYPOGRAPHY (rem-based)
text-xs-rem=12px, text-sm-rem=14px, text-md-rem=16px
text-lg-rem=20px, text-xl-rem=24px, text-xxl-rem=28px

## EXAMPLES
<Button variant="primary" size="md">Save</Button>
<Input label="Email" size="md" />
<Table columns={[{key:'name',title:'Name'}]} data={[{id:1,name:'John'}]} />
<Badge variant="danger">Error</Badge>`

    // Human-readable format (detailed explanations)
    const humanReadablePrompt = `You are an expert frontend developer using the FT Design System.

## Quick Setup
\`\`\`tsx
import 'ft-design-system/styles';
import { Button, Input, Table } from 'ft-design-system';
\`\`\`

## Critical Rules

### 1. Components are AI-protected by default
\`\`\`tsx
// ✅ CORRECT - AI-protected by default
import { Button } from 'ft-design-system';

// ⚠️ ADVANCED - unprotected (use only if needed)
import { Button } from 'ft-design-system/core';
\`\`\`

### 2. Never use arbitrary Tailwind values
\`\`\`tsx
// ❌ FORBIDDEN - no hardcoded hex colors or arbitrary values
<div className="bg-[ #434F64 ] text-[ #838C9D ]" />
<Button className="h-12 rounded-lg p-4" />

// ✅ CORRECT
<div className="bg-primary-700 text-tertiary" />
<Button size="lg" variant="primary" />
\`\`\`

### 3. Use component props, not utility classes
\`\`\`tsx
// ❌ WRONG - Tailwind classes ignored on FT components
<Button className="h-16 text-xl">Big Button</Button>

// ✅ CORRECT - use size prop
<Button size="lg">Big Button</Button>
\`\`\`

### 4. Component-specific rules
- **Table**: rows need \`id\`, columns use \`title\` (not \`header\`)
- **Badge**: use \`danger\` not \`error\`
- **Button**: variants are primary|secondary|destructive|text|link|ghost|dashed

### 5. Typography
Use rem-based classes: \`text-sm-rem\`, \`text-md-rem\`, \`text-lg-rem\`, etc.

## Component Reference
- 124 total components across atoms, molecules, organisms, charts
- Access metadata: \`import registry from 'ft-design-system/registry'\`
- See examples: \`import examples from 'ft-design-system/examples'\``

    // Cursor rules format
    const cursorRulesFormat = `# .cursor/rules or .cursorrules

Use FT Design System for all UI components.

## Imports
- CSS: \`import 'ft-design-system/styles';\`
- Components: \`import { X } from 'ft-design-system';\` (AI-protected by default)

## NEVER generate
- Arbitrary color classes with hex values
- Height, width, rounded, padding utilities on FT components
- CSS variables with underscores or slashes

## ALWAYS use
- \`size="sm|md|lg"\` prop for component sizing
- \`variant="..."\` prop for styling
- Theme classes: \`bg-primary-700\`, \`text-tertiary\`

## Component Rules
- Table: columns use \`title\` not \`header\`, rows need \`id\`
- Badge: variants are danger|success|warning (not error)
- Button: primary|secondary|destructive|text|link|ghost|dashed`

    const [activeTab, setActiveTab] = useState<'machine' | 'human' | 'cursor'>('machine')
    const [copied, setCopied] = useState(false)

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const getActiveContent = () => {
        switch (activeTab) {
            case 'machine': return machineReadablePrompt
            case 'human': return humanReadablePrompt
            case 'cursor': return cursorRulesFormat
        }
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 style={{ fontSize: 'var(--font-size-xxl-rem)' }} className="font-bold mb-2">AI Prompts</h1>
                <p style={{ color: 'var(--secondary)', fontSize: 'var(--font-size-md-rem)' }}>
                    Machine-readable rules for AI coding assistants (Cursor, Windsurf, Copilot, Claude, GPT)
                </p>
            </div>

            {/* Format recommendation */}
            <div className="rounded-lg border p-4" style={{ backgroundColor: 'var(--positive-light)', borderColor: 'var(--positive)' }}>
                <p style={{ fontSize: 'var(--font-size-sm-rem)', color: 'var(--positive-dark)' }}>
                    <strong>💡 Recommendation:</strong> Use the <strong>Machine-Readable</strong> format for best results. 
                    AI models parse structured rules more accurately than prose.
                </p>
            </div>

            {/* Tab buttons */}
            <div className="flex gap-2 border-b" style={{ borderColor: 'var(--border-primary)' }}>
                <button
                    onClick={() => setActiveTab('machine')}
                    className="px-4 py-2 font-medium transition-colors"
                    style={{
                        fontSize: 'var(--font-size-sm-rem)',
                        color: activeTab === 'machine' ? 'var(--primary)' : 'var(--tertiary)',
                        borderBottom: activeTab === 'machine' ? '2px solid var(--primary)' : '2px solid transparent',
                    }}
                >
                    Machine-Readable
                </button>
                <button
                    onClick={() => setActiveTab('cursor')}
                    className="px-4 py-2 font-medium transition-colors"
                    style={{
                        fontSize: 'var(--font-size-sm-rem)',
                        color: activeTab === 'cursor' ? 'var(--primary)' : 'var(--tertiary)',
                        borderBottom: activeTab === 'cursor' ? '2px solid var(--primary)' : '2px solid transparent',
                    }}
                >
                    Cursor Rules
                </button>
                <button
                    onClick={() => setActiveTab('human')}
                    className="px-4 py-2 font-medium transition-colors"
                    style={{
                        fontSize: 'var(--font-size-sm-rem)',
                        color: activeTab === 'human' ? 'var(--primary)' : 'var(--tertiary)',
                        borderBottom: activeTab === 'human' ? '2px solid var(--primary)' : '2px solid transparent',
                    }}
                >
                    Human-Readable
                </button>
            </div>

            {/* Content */}
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <p style={{ fontSize: 'var(--font-size-sm-rem)', color: 'var(--secondary)' }}>
                        {activeTab === 'machine' && 'Structured format optimized for AI parsing. Copy to system prompt or rules file.'}
                        {activeTab === 'cursor' && 'Copy to .cursor/rules or .cursorrules file in your project root.'}
                        {activeTab === 'human' && 'Detailed explanations for human understanding. Use if AI needs more context.'}
                    </p>
                    <button
                        onClick={() => copyToClipboard(getActiveContent())}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md transition-colors"
                        style={{
                            fontSize: 'var(--font-size-sm-rem)',
                            backgroundColor: 'var(--primary)',
                            color: 'var(--bg-primary)',
                        }}
                    >
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        {copied ? 'Copied!' : 'Copy'}
                    </button>
                </div>
                <div
                    className="relative rounded-lg border overflow-hidden"
                    style={{ backgroundColor: 'var(--primary-900)', borderColor: 'var(--border-primary)' }}
                >
                    <pre
                        className="p-4 overflow-x-auto font-mono max-h-[500px] overflow-y-auto"
                        style={{ fontSize: 'var(--font-size-xs-rem)', color: 'var(--tertiary-0)' }}
                    >
                        {getActiveContent()}
                    </pre>
                </div>
            </div>

            {/* Why Machine-Readable */}
            <div className="space-y-4">
                <h2 style={{ fontSize: 'var(--font-size-xl-rem)' }} className="font-semibold">Why Machine-Readable?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-lg border p-4" style={{ borderColor: 'var(--border-primary)' }}>
                        <h3 style={{ fontSize: 'var(--font-size-md-rem)' }} className="font-semibold mb-2">✅ Better Parsing</h3>
                        <p style={{ fontSize: 'var(--font-size-sm-rem)', color: 'var(--secondary)' }}>
                            Structured key-value format is easier for LLMs to parse than prose. Rules are unambiguous.
                        </p>
                    </div>
                    <div className="rounded-lg border p-4" style={{ borderColor: 'var(--border-primary)' }}>
                        <h3 style={{ fontSize: 'var(--font-size-md-rem)' }} className="font-semibold mb-2">✅ Smaller Context</h3>
                        <p style={{ fontSize: 'var(--font-size-sm-rem)', color: 'var(--secondary)' }}>
                            ~50% smaller than prose version. Leaves more context window for your code.
                        </p>
                    </div>
                    <div className="rounded-lg border p-4" style={{ borderColor: 'var(--border-primary)' }}>
                        <h3 style={{ fontSize: 'var(--font-size-md-rem)' }} className="font-semibold mb-2">✅ Clear Forbidden List</h3>
                        <p style={{ fontSize: 'var(--font-size-sm-rem)', color: 'var(--secondary)' }}>
                            Explicit FORBIDDEN section prevents common AI mistakes like hardcoded colors.
                        </p>
                    </div>
                    <div className="rounded-lg border p-4" style={{ borderColor: 'var(--border-primary)' }}>
                        <h3 style={{ fontSize: 'var(--font-size-md-rem)' }} className="font-semibold mb-2">✅ API Reference</h3>
                        <p style={{ fontSize: 'var(--font-size-sm-rem)', color: 'var(--secondary)' }}>
                            Component API specs in scannable format. AI knows exact prop names and values.
                        </p>
                    </div>
                </div>
            </div>

            {/* Additional Resources */}
            <div className="rounded-lg border p-4" style={{ borderColor: 'var(--border-primary)', backgroundColor: 'var(--bg-secondary)' }}>
                <h3 style={{ fontSize: 'var(--font-size-md-rem)' }} className="font-semibold mb-3">Machine-Readable Resources</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <code style={{ fontSize: 'var(--font-size-xs-rem)', color: 'var(--neutral)' }}>ft-design-system/registry</code>
                        <p style={{ fontSize: 'var(--font-size-sm-rem)', color: 'var(--secondary)' }}>124 components with metadata</p>
                    </div>
                    <div>
                        <code style={{ fontSize: 'var(--font-size-xs-rem)', color: 'var(--neutral)' }}>ft-design-system/schema</code>
                        <p style={{ fontSize: 'var(--font-size-sm-rem)', color: 'var(--secondary)' }}>Props, types, descriptions</p>
                    </div>
                    <div>
                        <code style={{ fontSize: 'var(--font-size-xs-rem)', color: 'var(--neutral)' }}>ft-design-system/examples</code>
                        <p style={{ fontSize: 'var(--font-size-sm-rem)', color: 'var(--secondary)' }}>785+ code examples</p>
                    </div>
                </div>
            </div>

            {/* Links */}
            <div className="flex gap-4">
                <Link href="/docs/storybook" className="hover:underline" style={{ color: 'var(--neutral)', fontSize: 'var(--font-size-sm-rem)' }}>
                    Storybook →
                </Link>
                <Link href="/docs/npm-package" className="hover:underline" style={{ color: 'var(--neutral)', fontSize: 'var(--font-size-sm-rem)' }}>
                    NPM Package →
                        </Link>
                <Link href="/docs/global-css" className="hover:underline" style={{ color: 'var(--neutral)', fontSize: 'var(--font-size-sm-rem)' }}>
                    Global CSS →
                        </Link>
            </div>
        </div>
    )
}
