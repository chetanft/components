"use client"

import { useState } from "react"
import { Button, Icon } from "@/registry"
import { useViewMode } from "@/components/view-mode-context"
import { GLOBAL_CSS_CONTENT } from "@/data/design-system.generated"
import { DocPageHeader, DocSection, DocInfoBanner, DocCard, DocCodeBlock, DocBottomNav } from "@/components/docs"
import { MachineSpecView } from "@/components/machine-spec-view"
import { buildGlobalCssSpec } from "@/lib/machine-specs/global-css"

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
        return <MachineSpecView>{buildGlobalCssSpec()}</MachineSpecView>
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
                        <Button
                            variant="secondary"
                            size="sm"
                            icon="download"
                            iconPosition="leading"
                            onClick={downloadFile}
                        >
                            Download
                        </Button>
                        <Button
                            variant="primary"
                            size="sm"
                            icon={copied ? 'check' : 'copy'}
                            iconPosition="leading"
                            onClick={copyToClipboard}
                        >
                            {copied ? 'Copied!' : 'Copy CSS'}
                        </Button>
                    </div>
                </div>
                <div className="relative rounded-lg border border-border overflow-hidden group">
                    <Button
                        variant="secondary"
                        size="xs"
                        icon={copied ? <Icon name="check" size={14} className="text-[var(--positive-dark)]" /> : <Icon name="copy" size={14} />}
                        iconPosition="only"
                        onClick={copyToClipboard}
                        aria-label="Copy to clipboard"
                        className="absolute right-3 top-3 z-10 opacity-0 group-hover:opacity-100"
                    />
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
