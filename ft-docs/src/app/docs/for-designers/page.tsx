import Link from "next/link"
import { Figma, ExternalLink, Palette, Code, FileText } from "lucide-react"

export default function ForDesignersPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-4xl font-bold mb-2">For Designers</h1>
                <p className="text-muted-foreground text-lg">
                    Resources and guidelines for designers working with the FT Design System
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border bg-surface p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Figma className="h-6 w-6 text-primary" />
                        <h2 className="text-xl font-semibold">Figma Design Files</h2>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                        Access the latest design files and component specifications in Figma.
                    </p>
                    <ul className="space-y-2 text-sm">
                        <li>• Component library with all variants</li>
                        <li>• Design tokens and color system</li>
                        <li>• Spacing and typography guidelines</li>
                        <li>• Interactive prototypes</li>
                    </ul>
                </div>

                <div className="rounded-lg border bg-surface p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Palette className="h-6 w-6 text-primary" />
                        <h2 className="text-xl font-semibold">Design Tokens</h2>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                        Use consistent design tokens when creating new designs.
                    </p>
                    <ul className="space-y-2 text-sm">
                        <li>• Color palette (primary, secondary, tertiary)</li>
                        <li>• Spacing system (8px grid)</li>
                        <li>• Typography scale</li>
                        <li>• Border radius and shadows</li>
                    </ul>
                    <Link 
                        href="/docs/global-css" 
                        className="text-primary hover:underline text-sm mt-4 inline-block"
                    >
                        View all design tokens →
                    </Link>
                </div>

                <div className="rounded-lg border bg-surface p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Code className="h-6 w-6 text-primary" />
                        <h2 className="text-xl font-semibold">Component Specifications</h2>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                        Understand how designs translate to code components.
                    </p>
                    <ul className="space-y-2 text-sm">
                        <li>• Component naming conventions</li>
                        <li>• Props and variants mapping</li>
                        <li>• Responsive behavior</li>
                        <li>• Accessibility requirements</li>
                    </ul>
                    <Link 
                        href="/docs/components/button" 
                        className="text-primary hover:underline text-sm mt-4 inline-block"
                    >
                        Browse components →
                    </Link>
                </div>

                <div className="rounded-lg border bg-surface p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <FileText className="h-6 w-6 text-primary" />
                        <h2 className="text-xl font-semibold">Design Guidelines</h2>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                        Best practices for creating designs that align with the system.
                    </p>
                    <ul className="space-y-2 text-sm">
                        <li>• Component composition patterns</li>
                        <li>• Layout and spacing rules</li>
                        <li>• Color usage guidelines</li>
                        <li>• Typography hierarchy</li>
                    </ul>
                </div>
            </div>

            <div className="rounded-lg border bg-muted p-6">
                <h2 className="text-2xl font-semibold mb-4">Quick Links</h2>
                <div className="grid gap-3 md:grid-cols-2">
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
                </div>
            </div>

            <div className="rounded-lg border border-primary/20 bg-primary/5 p-6">
                <h3 className="font-semibold mb-2">Design Handoff Process</h3>
                <ol className="space-y-2 text-sm list-decimal list-inside">
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

