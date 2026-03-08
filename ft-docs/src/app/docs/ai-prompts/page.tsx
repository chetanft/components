"use client"

import Link from "next/link"
import { useState } from "react"
import { Button, SegmentedTabs, SegmentedTabItem } from "@/registry"
import { useViewMode } from "@/components/view-mode-context"
import { buildMachinePrompt, buildHumanPrompt, buildCursorRules } from "@/data/prompt-builders"
import { COMPONENT_COUNT } from "@/data/design-system.generated"
import { DocPageHeader, DocSection, DocInfoBanner, DocCard, DocBottomNav } from "@/components/docs"
import { MachineSpecView } from "@/components/machine-spec-view"

export default function AIPromptsPage() {
    const { viewMode } = useViewMode()

    const machineReadablePrompt = buildMachinePrompt()
    const humanReadablePrompt = buildHumanPrompt()
    const cursorRulesFormat = buildCursorRules()

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

    if (viewMode === 'machine') {
        return <MachineSpecView>{machineReadablePrompt}</MachineSpecView>
    }

    return (
        <div className="space-y-8">
            <DocPageHeader
                title="AI Prompts"
                description="Machine-readable rules for AI coding assistants (Cursor, Windsurf, Copilot, Claude, GPT)"
            />

            <DocInfoBanner variant="recommendation">
                <p>
                    <strong>Recommendation:</strong> Use the <strong>Machine-Readable</strong> format for best results.
                    AI models parse structured rules more accurately than prose.
                </p>
            </DocInfoBanner>

            {/* Tab buttons */}
            <SegmentedTabs
                value={activeTab}
                onChange={(value) => setActiveTab(value as 'machine' | 'human' | 'cursor')}
            >
                <SegmentedTabItem value="machine" label="Machine-Readable" />
                <SegmentedTabItem value="cursor" label="Cursor Rules" />
                <SegmentedTabItem value="human" label="Human-Readable" />
            </SegmentedTabs>

            {/* Content */}
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <p className="text-sm-rem text-muted-foreground">
                        {activeTab === 'machine' && 'Structured format optimized for AI parsing. Copy to system prompt or rules file.'}
                        {activeTab === 'cursor' && 'Copy to .cursor/rules or .cursorrules file in your project root.'}
                        {activeTab === 'human' && 'Detailed explanations for human understanding. Use if AI needs more context.'}
                    </p>
                    <Button
                        variant="primary"
                        size="sm"
                        icon={copied ? 'check' : 'copy'}
                        iconPosition="leading"
                        onClick={() => copyToClipboard(getActiveContent())}
                    >
                        {copied ? 'Copied!' : 'Copy'}
                    </Button>
                </div>
                <div className="relative rounded-lg border border-border bg-muted overflow-hidden">
                    <pre className="p-4 overflow-x-auto font-mono text-xs-rem max-h-[500px] overflow-y-auto">
                        {getActiveContent()}
                    </pre>
                </div>
            </div>

            {/* Why Machine-Readable */}
            <DocSection title="Why Machine-Readable?">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <DocCard title="Better Parsing" description="Structured key-value format is easier for LLMs to parse than prose. Rules are unambiguous." />
                    <DocCard title="Smaller Context" description="~50% smaller than prose version. Leaves more context window for your code." />
                    <DocCard title="Clear Forbidden List" description="Explicit FORBIDDEN section prevents common AI mistakes like hardcoded colors." />
                    <DocCard title="API Reference" description="Component API specs in scannable format. AI knows exact prop names and values." />
                </div>
            </DocSection>

            {/* Additional Resources */}
            <DocSection title="Machine-Readable Resources">
                <div className="rounded-lg border border-border bg-muted p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <code className="text-xs-rem text-muted-foreground">ft-design-system/registry</code>
                            <p className="text-sm-rem text-muted-foreground">{COMPONENT_COUNT} components with metadata</p>
                        </div>
                        <div>
                            <code className="text-xs-rem text-muted-foreground">ft-design-system/schema</code>
                            <p className="text-sm-rem text-muted-foreground">Props, types, descriptions</p>
                        </div>
                        <div>
                            <code className="text-xs-rem text-muted-foreground">ft-design-system/examples</code>
                            <p className="text-sm-rem text-muted-foreground">785+ code examples</p>
                        </div>
                    </div>
                </div>
            </DocSection>

            {/* Links */}
            <div className="flex gap-4">
                <Link href="/docs/storybook" className="text-sm-rem text-muted-foreground hover:text-foreground hover:underline">
                    Storybook →
                </Link>
                <Link href="/docs/npm-package" className="text-sm-rem text-muted-foreground hover:text-foreground hover:underline">
                    NPM Package →
                </Link>
                <Link href="/docs/global-css" className="text-sm-rem text-muted-foreground hover:text-foreground hover:underline">
                    Global CSS →
                </Link>
            </div>

            <DocBottomNav
                prev={{ label: "Introduction", href: "/docs" }}
                next={{ label: "For Designers", href: "/docs/for-designers" }}
            />
        </div>
    )
}
