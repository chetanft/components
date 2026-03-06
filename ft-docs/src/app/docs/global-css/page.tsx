"use client"

import { useState } from "react"
import { Check, Copy, Download } from "lucide-react"
import { useViewMode } from "@/components/view-mode-context"
import { GLOBAL_CSS_CONTENT } from "@/data/design-system.generated"
import { DocPageHeader, DocSection, DocInfoBanner, DocCard, DocCodeBlock, DocBottomNav } from "@/components/docs"

const globalCssContent = GLOBAL_CSS_CONTENT

export default function GlobalCSSPage() {
    const { viewMode } = useViewMode()
    const [copied, setCopied] = useState(false)

    const copyToClipboard = () => {
        navigator.clipboard.writeText(globalCssContent)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const downloadFile = () => {
        const blob = new Blob([globalCssContent], { type: 'text/css' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'globals.css'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
    }

    if (viewMode === 'machine') {
        return (
            <pre className="whitespace-pre-wrap font-mono text-xs-rem leading-relaxed">
                {globalCssContent}
            </pre>
        )
    }

    return (
        <div className="space-y-8">
            <DocPageHeader
                title="Global CSS"
                description="The complete FT Design System CSS file containing all design tokens, color scales, and utility classes."
            />

            {/* Quick Start */}
            <DocSection title="Quick Start">
                <DocInfoBanner variant="warning">
                    <p>
                        <strong>1.</strong> Copy or download the CSS file below<br />
                        <strong>2.</strong> Save it as <code className="px-1.5 py-0.5 rounded font-mono bg-amber-200 text-amber-900 text-xs-rem dark:bg-amber-800 dark:text-amber-200">globals.css</code> in your project<br />
                        <strong>3.</strong> Import it in your root layout: <code className="px-1.5 py-0.5 rounded font-mono bg-amber-200 text-amber-900 text-xs-rem dark:bg-amber-800 dark:text-amber-200">import &apos;./globals.css&apos;</code>
                    </p>
                </DocInfoBanner>
            </DocSection>

            {/* Token Categories */}
            <DocSection title="What's Included">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <DocCard title="Color Scales" description="9-shade scales for Primary, Secondary, Tertiary, Neutral, Positive, Warning, and Danger colors." />
                    <DocCard title="Component Tokens" description="Button, Badge, Form, Switch, and Radio component variables with hover and focus states." />
                    <DocCard title="Spacing System" description="8-point grid with --spacing-x1 (4px) to --spacing-x38 (152px), plus half-steps." />
                    <DocCard title="Dark Mode" description="Full dark mode support with inverted color scales and adjusted semantic colors." />
                    <DocCard title="Night Mode" description="True black theme for OLED displays with high contrast colors." />
                    <DocCard title="Utility Classes" description="Text, background, and border utility classes using design tokens." />
                    <DocCard title="Rem Typography" description="Responsive font sizes (xs to 4xl) that scale proportionally with base font size (14px)." />
                </div>
            </DocSection>

            {/* CSS File */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl-rem font-semibold tracking-tight scroll-m-20">globals.css</h2>
                    <div className="flex gap-2">
                        <button
                            onClick={downloadFile}
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm-rem font-medium rounded-md border border-border bg-background transition-colors hover:bg-muted"
                        >
                            <Download className="h-4 w-4" />
                            Download
                        </button>
                        <button
                            onClick={copyToClipboard}
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm-rem font-medium rounded-md bg-foreground text-background transition-colors hover:bg-foreground/90"
                        >
                            {copied ? (
                                <>
                                    <Check className="h-4 w-4" />
                                    Copied!
                                </>
                            ) : (
                                <>
                                    <Copy className="h-4 w-4" />
                                    Copy CSS
                                </>
                            )}
                        </button>
                    </div>
                </div>
                <div className="relative rounded-lg border border-border overflow-hidden group">
                    <button
                        onClick={copyToClipboard}
                        className="absolute right-3 top-3 z-10 inline-flex h-8 w-8 items-center justify-center rounded-md border bg-background text-sm-rem font-medium transition-all opacity-0 group-hover:opacity-100 hover:bg-muted"
                        title="Copy to clipboard"
                    >
                        {copied ? (
                            <Check className="h-3.5 w-3.5 text-green-600" />
                        ) : (
                            <Copy className="h-3.5 w-3.5" />
                        )}
                    </button>
                    <pre className="p-4 overflow-x-auto font-mono text-sm-rem max-h-[600px] overflow-y-auto bg-muted">
                        <code>{globalCssContent}</code>
                    </pre>
                </div>
            </div>

            {/* Usage Examples */}
            <DocSection title="Usage Examples">
                <div className="space-y-4">
                    <DocCard title="Using CSS Variables">
                        <DocCodeBlock
                            code={`.my-component {
  color: var(--primary);
  background: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  padding: var(--spacing-x4);
  border-radius: var(--component-border-radius);
}`}
                            lang="css"
                        />
                    </DocCard>
                    <DocCard title="Using Utility Classes">
                        <DocCodeBlock
                            code={`<div class="text-primary bg-neutral border-warning">
  Styled with utility classes
</div>`}
                            lang="html"
                        />
                    </DocCard>
                    <DocCard title="Theme Switching">
                        <DocCodeBlock
                            code={`<!-- Light mode (default) -->
<html>

<!-- Dark mode -->
<html class="dark">

<!-- Night mode (true black) -->
<html class="night">`}
                            lang="html"
                        />
                    </DocCard>
                    <DocCard title="Rem-Based Typography">
                        <DocCodeBlock
                            code={`/* Tailwind classes (recommended for components) */
<h1 className="text-xxl-rem">Title</h1>
<p className="text-sm-rem">Body text</p>

/* CSS variables (alternative for inline styles) */
<h1 style={{ fontSize: 'var(--font-size-xxl-rem)' }}>Title</h1>
<p style={{ fontSize: 'var(--font-size-sm-rem)' }}>Body text</p>

/* Font sizes scale: xs (12px), sm (14px), md (16px),
   lg (20px), xl (24px), xxl (28px), 3xl (36px), 4xl (48px) */`}
                            lang="tsx"
                        />
                    </DocCard>
                </div>
            </DocSection>

            <DocBottomNav
                prev={{ label: "NPM Package", href: "/docs/npm-package" }}
            />
        </div>
    )
}
