"use client"

import Link from "next/link"
import { Figma, ExternalLink, Palette, Code, BookOpen } from "lucide-react"
import { getComponentsWithGuidelines } from "@/data/designer-guidelines"

export default function ForDesignersPage() {
    const componentsWithGuidelines = getComponentsWithGuidelines()
    const guidelineCount = componentsWithGuidelines.length
    const figmaLinkedCount = 22
    const codeConnectCount = 22
    const totalComponents = 124

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl-rem font-bold mb-2">For Designers</h1>
                <p className="text-muted-foreground text-lg-rem">
                    Resources and guidelines for designers working with the FT Design System
                </p>
            </div>

            {/* Figma file hero */}
            <a
                href="https://www.figma.com/design/HMS1wPnsS1fuPyN1xSEVAH/Components"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-lg border p-5 transition-colors hover:bg-[var(--bg-secondary)]"
                style={{ borderColor: "var(--border-primary)" }}
            >
                <div className="shrink-0 w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: "var(--bg-secondary)" }}>
                    <Figma className="h-6 w-6" style={{ color: "var(--primary)" }} />
                </div>
                <div className="flex-1">
                    <p className="font-semibold text-md-rem" style={{ color: "var(--primary)" }}>FT Components — Figma Library</p>
                    <p className="text-sm-rem" style={{ color: "var(--secondary)" }}>
                        Open the master component file in Figma
                    </p>
                </div>
                <ExternalLink className="h-5 w-5 shrink-0" style={{ color: "var(--tertiary)" }} />
            </a>

            {/* Coverage stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="rounded-lg border p-4 text-center" style={{ borderColor: "var(--border-primary)" }}>
                    <p className="text-2xl-rem font-bold" style={{ color: "var(--primary)" }}>{totalComponents}</p>
                    <p className="text-xs" style={{ color: "var(--tertiary)" }}>Total Components</p>
                </div>
                <div className="rounded-lg border p-4 text-center" style={{ borderColor: "var(--border-primary)" }}>
                    <p className="text-2xl-rem font-bold" style={{ color: "var(--positive, #22c55e)" }}>{figmaLinkedCount}</p>
                    <p className="text-xs" style={{ color: "var(--tertiary)" }}>Figma Linked</p>
                </div>
                <div className="rounded-lg border p-4 text-center" style={{ borderColor: "var(--border-primary)" }}>
                    <p className="text-2xl-rem font-bold" style={{ color: "var(--positive, #22c55e)" }}>{codeConnectCount}</p>
                    <p className="text-xs" style={{ color: "var(--tertiary)" }}>Code Connect</p>
                </div>
                <div className="rounded-lg border p-4 text-center" style={{ borderColor: "var(--border-primary)" }}>
                    <p className="text-2xl-rem font-bold" style={{ color: "var(--neutral, #6366f1)" }}>{guidelineCount}</p>
                    <p className="text-xs" style={{ color: "var(--tertiary)" }}>Usage Guidelines</p>
                </div>
            </div>

            {/* Components with guidelines */}
            <div className="space-y-3">
                <h2 className="text-lg-rem font-semibold" style={{ color: "var(--primary)" }}>
                    Components with Usage Guidelines
                </h2>
                <p className="text-sm-rem" style={{ color: "var(--secondary)" }}>
                    These components have designer guidelines available. Click any component to view its page.
                </p>
                <ul className="columns-2 md:columns-3 gap-x-6 text-sm-rem">
                    {componentsWithGuidelines.map((name) => {
                        const slug = name.replace(/([A-Z])/g, (m, p1, offset) =>
                            offset > 0 ? `-${p1.toLowerCase()}` : p1.toLowerCase()
                        )
                        return (
                            <li key={name} className="py-1">
                                <Link
                                    href={`/docs/components/${slug}`}
                                    className="hover:underline"
                                    style={{ color: "var(--primary)" }}
                                >
                                    {name}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border bg-surface p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Figma className="h-6 w-6 text-primary" />
                        <h2 className="text-lg-rem font-semibold">Figma Design Files</h2>
                    </div>
                    <p className="text-sm-rem text-muted-foreground mb-4">
                        Access the latest design files and component specifications in Figma.
                    </p>
                    <ul className="space-y-2 text-sm-rem">
                        <li>• Component library with all variants</li>
                        <li>• Design tokens and color system</li>
                        <li>• Spacing and typography guidelines</li>
                        <li>• Interactive prototypes</li>
                    </ul>
                </div>

                <div className="rounded-lg border bg-surface p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Palette className="h-6 w-6 text-primary" />
                        <h2 className="text-lg-rem font-semibold">Design Tokens</h2>
                    </div>
                    <p className="text-sm-rem text-muted-foreground mb-4">
                        Use consistent design tokens when creating new designs.
                    </p>
                    <ul className="space-y-2 text-sm-rem">
                        <li>• Color palette (primary, secondary, tertiary)</li>
                        <li>• Spacing system (8px grid)</li>
                        <li>• Typography scale</li>
                        <li>• Border radius and shadows</li>
                    </ul>
                    <Link
                        href="/docs/global-css"
                        className="text-primary hover:underline text-sm-rem mt-4 inline-block"
                    >
                        View all design tokens →
                    </Link>
                </div>

                <div className="rounded-lg border bg-surface p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Code className="h-6 w-6 text-primary" />
                        <h2 className="text-lg-rem font-semibold">Component Specifications</h2>
                    </div>
                    <p className="text-sm-rem text-muted-foreground mb-4">
                        Understand how designs translate to code components.
                    </p>
                    <ul className="space-y-2 text-sm-rem">
                        <li>• Component naming conventions</li>
                        <li>• Props and variants mapping</li>
                        <li>• Responsive behavior</li>
                        <li>• Accessibility requirements</li>
                    </ul>
                    <Link
                        href="/docs/components/button"
                        className="text-primary hover:underline text-sm-rem mt-4 inline-block"
                    >
                        Browse components →
                    </Link>
                </div>

                <div className="rounded-lg border bg-surface p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <BookOpen className="h-6 w-6 text-primary" />
                        <h2 className="text-lg-rem font-semibold">Usage Guidelines</h2>
                    </div>
                    <p className="text-sm-rem text-muted-foreground mb-4">
                        Per-component guidance on when to use, variants, and do&apos;s/don&apos;ts.
                    </p>
                    <ul className="space-y-2 text-sm-rem">
                        <li>• When to use / when not to use</li>
                        <li>• Variant descriptions and use cases</li>
                        <li>• Designer do&apos;s and don&apos;ts</li>
                        <li>• Related component alternatives</li>
                    </ul>
                    <p className="text-sm-rem mt-4" style={{ color: "var(--tertiary)" }}>
                        Available on {guidelineCount} component pages via the Usage button
                    </p>
                </div>
            </div>

            <div className="rounded-lg border bg-muted p-6">
                <h2 className="text-xl-rem font-semibold mb-4">Quick Links</h2>
                <div className="grid gap-3 md:grid-cols-2">
                    <a
                        href="https://www.figma.com/design/HMS1wPnsS1fuPyN1xSEVAH/Components"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-primary hover:underline"
                    >
                        <Figma className="h-4 w-4" />
                        Figma Component Library
                    </a>
                    <Link
                        href="/docs/global-css"
                        className="flex items-center gap-2 text-primary hover:underline"
                    >
                        <ExternalLink className="h-4 w-4" />
                        Global CSS & Design Tokens
                    </Link>
                    <Link
                        href="/docs/storybook"
                        className="flex items-center gap-2 text-primary hover:underline"
                    >
                        <ExternalLink className="h-4 w-4" />
                        Storybook Component Playground
                    </Link>
                    <Link
                        href="/colors"
                        className="flex items-center gap-2 text-primary hover:underline"
                    >
                        <ExternalLink className="h-4 w-4" />
                        Color System Reference
                    </Link>
                    <Link
                        href="/docs/components"
                        className="flex items-center gap-2 text-primary hover:underline"
                    >
                        <ExternalLink className="h-4 w-4" />
                        All Components Documentation
                    </Link>
                    <Link
                        href="/docs/ai-prompts"
                        className="flex items-center gap-2 text-primary hover:underline"
                    >
                        <ExternalLink className="h-4 w-4" />
                        AI Prompts & Machine-Readable Rules
                    </Link>
                </div>
            </div>

            <div className="rounded-lg border border-primary/20 bg-primary/5 p-6">
                <h3 className="font-semibold mb-2">Design Handoff Process</h3>
                <ol className="space-y-2 text-sm-rem list-decimal list-inside">
                    <li>Create designs using FT Design System components in Figma</li>
                    <li>Use design tokens for colors, spacing, and typography</li>
                    <li>Annotate component variants and states</li>
                    <li>Share Figma links with developers</li>
                    <li>Review implementation in Storybook or docs</li>
                </ol>
            </div>
        </div>
    )
}
