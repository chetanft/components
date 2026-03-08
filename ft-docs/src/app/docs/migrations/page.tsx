"use client"

import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { Icon } from "@/registry"
import { useViewMode } from "@/components/view-mode-context"
import { MachineSpecView } from "@/components/machine-spec-view"
import { buildMigrationsSpec } from "@/lib/machine-specs/migrations"

export default function MigrationsPage() {
    const { viewMode } = useViewMode()
    const migrations = [
        {
            component: "Table",
            version: "v2",
            status: "complete",
            description: "Column header props, render functions, and data access patterns updated",
            changes: [
                "`title`/`label` → `header`",
                "`render` → `cell`",
                "Updated render signature: `(row, context)` instead of `(value, row, index)`",
                "Added `accessorKey` for explicit data access"
            ],
            file: "docs/migrations/table-v2.md"
        },
        {
            component: "Card",
            version: "v2",
            status: "complete",
            description: "Size prop standardization and composable API improvements",
            changes: [
                "`size=\"default\"` → `size=\"md\"`",
                "`size=\"small\"` → `size=\"sm\"`",
                "Legacy props (`title`, `content`, `extra`) deprecated",
                "New composable API with `headerTitle`, `bodySections`"
            ],
            file: "docs/migrations/card-v2.md"
        },
        {
            component: "Badge",
            version: "v2",
            status: "complete",
            description: "Variant name standardization for consistency",
            changes: [
                "`variant=\"normal\"` → `variant=\"default\"`",
                "`variant=\"danger\"` → `variant=\"error\"`",
                "All changes backward compatible with deprecation warnings"
            ],
            file: "docs/migrations/badge-v2.md"
        },
        {
            component: "Dropdown",
            version: "v2",
            status: "complete",
            description: "Options API enhancement and improved accessibility",
            changes: [
                "Enhanced `options` prop with better typing",
                "Improved keyboard navigation",
                "Better ARIA support"
            ],
            file: "docs/migrations/dropdown-v2.md"
        },
        {
            component: "Modal",
            version: "v2",
            status: "complete",
            description: "Size presets and API consistency improvements",
            changes: [
                "Standardized size presets",
                "Improved prop naming consistency",
                "Better event handler patterns"
            ],
            file: "docs/migrations/modal-v2.md"
        }
    ]

    if (viewMode === "machine") {
        return <MachineSpecView>{buildMigrationsSpec()}</MachineSpecView>
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl-rem font-bold mb-2">Migration Guides</h1>
                <p className="text-muted-foreground text-lg-rem">
                    Step-by-step guides for migrating to updated component APIs
                </p>
            </div>

            <div className="rounded-lg border border-primary/20 bg-primary/5 p-6">
                <div className="flex items-start gap-3">
                    <Icon name="triangle-alert" size={20} className="text-primary mt-0.5" />
                    <div>
                        <h3 className="font-semibold mb-2">Before You Start</h3>
                        <ul className="space-y-1 text-sm-rem text-muted-foreground">
                            <li>• Review the breaking changes for each component</li>
                            <li>• Test migrations in a development environment first</li>
                            <li>• All v2 changes include backward compatibility where possible</li>
                            <li>• Deprecated props will show console warnings</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-xl-rem font-semibold">Available Migrations</h2>
                <div className="grid gap-4">
                    {migrations.map((migration) => (
                        <div
                            key={migration.component}
                            className="rounded-lg border bg-surface p-6 hover:border-primary transition-colors"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <Icon name="document" size={20} className="text-primary" />
                                    <div>
                                        <h3 className="text-lg-rem font-semibold">
                                            {migration.component} {migration.version}
                                        </h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Icon name="check-fill" size={16} className="text-[var(--positive-dark)]" />
                                            <span className="text-sm-rem text-muted-foreground">
                                                {migration.status === "complete" ? "Complete" : "In Progress"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm-rem text-muted-foreground mb-4">
                                {migration.description}
                            </p>
                            <div className="mb-4">
                                <h4 className="text-sm-rem font-semibold mb-2">Key Changes:</h4>
                                <ul className="space-y-1 text-sm-rem text-muted-foreground">
                                    {migration.changes.map((change, idx) => (
                                        <li key={idx} className="flex items-start gap-2">
                                            <span className="text-primary mt-1">•</span>
                                            <code className="bg-muted px-1.5 py-0.5 rounded text-xs-rem">
                                                {change}
                                            </code>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <a
                                href={`https://github.com/chetanft/components/blob/main/${migration.file}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline text-sm-rem inline-flex items-center gap-1"
                            >
                                View full migration guide
                                <ExternalLink className="h-3 w-3" />
                            </a>
                        </div>
                    ))}
                </div>
            </div>

            <div className="rounded-lg border bg-muted p-6">
                <h3 className="font-semibold mb-2">Related Resources</h3>
                <div className="grid gap-2 md:grid-cols-2">
                    <Link href="/docs/global-css" className="text-primary hover:underline text-sm-rem">
                        Global CSS & Design Tokens
                    </Link>
                    <Link href="/docs/components" className="text-primary hover:underline text-sm-rem">
                        Component Documentation
                    </Link>
                    <Link href="/docs/ai-prompts" className="text-primary hover:underline text-sm-rem">
                        AI Prompts & Best Practices
                    </Link>
                    <Link href="/docs/accessibility" className="text-primary hover:underline text-sm-rem">
                        Accessibility Guidelines
                    </Link>
                </div>
            </div>
        </div>
    )
}
