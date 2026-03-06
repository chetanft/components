"use client"

import Link from "next/link"
import { Figma, Palette, Code, BookOpen, ExternalLink } from "lucide-react"
import { getComponentsWithGuidelines } from "@/data/designer-guidelines"
import { COMPONENT_COUNT } from "@/data/design-system.generated"
import { DocPageHeader, DocSection, DocLinkCard, DocCard, DocStatCards, DocInfoBanner, DocBottomNav } from "@/components/docs"

export default function ForDesignersPage() {
    const componentsWithGuidelines = getComponentsWithGuidelines()
    const guidelineCount = componentsWithGuidelines.length
    const figmaLinkedCount = 22
    const codeConnectCount = 22
    const totalComponents = COMPONENT_COUNT

    return (
        <div className="space-y-8">
            <DocPageHeader
                title="For Designers"
                description="Resources and guidelines for designers working with the FT Design System"
            />

            <DocLinkCard
                href="https://www.figma.com/design/HMS1wPnsS1fuPyN1xSEVAH/Components"
                title="FT Components — Figma Library"
                subtitle="Open the master component file in Figma"
                icon={<Figma className="h-6 w-6" />}
            />

            <DocStatCards items={[
                { value: totalComponents, label: "Total Components" },
                { value: figmaLinkedCount, label: "Figma Linked", color: "text-green-600 dark:text-green-400" },
                { value: codeConnectCount, label: "Code Connect", color: "text-green-600 dark:text-green-400" },
                { value: guidelineCount, label: "Usage Guidelines", color: "text-indigo-600 dark:text-indigo-400" },
            ]} />

            <DocSection title="Components with Usage Guidelines">
                <p className="text-sm-rem text-muted-foreground">
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
                                    className="text-primary hover:underline"
                                >
                                    {name}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </DocSection>

            <div className="grid gap-4 md:grid-cols-2">
                <DocCard icon={<Figma className="h-6 w-6" />} title="Figma Design Files" description="Access the latest design files and component specifications in Figma.">
                    <ul className="space-y-2 text-sm-rem">
                        <li>• Component library with all variants</li>
                        <li>• Design tokens and color system</li>
                        <li>• Spacing and typography guidelines</li>
                        <li>• Interactive prototypes</li>
                    </ul>
                </DocCard>

                <DocCard icon={<Palette className="h-6 w-6" />} title="Design Tokens" description="Use consistent design tokens when creating new designs.">
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
                </DocCard>

                <DocCard icon={<Code className="h-6 w-6" />} title="Component Specifications" description="Understand how designs translate to code components.">
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
                </DocCard>

                <DocCard icon={<BookOpen className="h-6 w-6" />} title="Usage Guidelines" description="Per-component guidance on when to use, variants, and do's/don'ts.">
                    <ul className="space-y-2 text-sm-rem">
                        <li>• When to use / when not to use</li>
                        <li>• Variant descriptions and use cases</li>
                        <li>• Designer do&apos;s and don&apos;ts</li>
                        <li>• Related component alternatives</li>
                    </ul>
                    <p className="text-sm-rem mt-4 text-muted-foreground">
                        Available on {guidelineCount} component pages via the Usage button
                    </p>
                </DocCard>
            </div>

            <DocSection title="Quick Links">
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
                    <Link href="/docs/global-css" className="flex items-center gap-2 text-primary hover:underline">
                        <ExternalLink className="h-4 w-4" />
                        Global CSS & Design Tokens
                    </Link>
                    <Link href="/docs/storybook" className="flex items-center gap-2 text-primary hover:underline">
                        <ExternalLink className="h-4 w-4" />
                        Storybook Component Playground
                    </Link>
                    <Link href="/colors" className="flex items-center gap-2 text-primary hover:underline">
                        <ExternalLink className="h-4 w-4" />
                        Color System Reference
                    </Link>
                    <Link href="/docs/components" className="flex items-center gap-2 text-primary hover:underline">
                        <ExternalLink className="h-4 w-4" />
                        All Components Documentation
                    </Link>
                    <Link href="/docs/ai-prompts" className="flex items-center gap-2 text-primary hover:underline">
                        <ExternalLink className="h-4 w-4" />
                        AI Prompts & Machine-Readable Rules
                    </Link>
                </div>
            </DocSection>

            <DocSection title="Design Handoff Process">
                <ol className="space-y-2 text-sm-rem list-decimal list-inside">
                    <li>Create designs using FT Design System components in Figma</li>
                    <li>Use design tokens for colors, spacing, and typography</li>
                    <li>Annotate component variants and states</li>
                    <li>Share Figma links with developers</li>
                    <li>Review implementation in Storybook or docs</li>
                </ol>
            </DocSection>

            <DocBottomNav
                prev={{ label: "AI Prompts", href: "/docs/ai-prompts" }}
                next={{ label: "For Developers", href: "/docs/for-developers" }}
            />
        </div>
    )
}
