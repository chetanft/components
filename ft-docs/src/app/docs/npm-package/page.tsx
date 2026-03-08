"use client"

import { Package } from "lucide-react"
import { useViewMode } from "@/components/view-mode-context"
import { SYSTEM_VERSION, COMPONENT_COUNT } from "@/data/design-system.generated"
import { DocPageHeader, DocSection, DocCodeBlock, DocLinkCard, DocCard, DocBottomNav } from "@/components/docs"
import { MachineSpecView } from "@/components/machine-spec-view"
import { buildNpmPackageSpec } from "@/lib/machine-specs/npm-package"

export default function NPMPackagePage() {
    const { viewMode } = useViewMode()

    if (viewMode === 'machine') {
        return <MachineSpecView>{buildNpmPackageSpec()}</MachineSpecView>
    }

    return (
        <div className="space-y-8">
            <DocPageHeader
                title="NPM Package"
                description="Install and use ft-design-system in your React projects"
                badge={`v${SYSTEM_VERSION}`}
            />

            <div className="grid gap-4 md:grid-cols-2">
                <DocLinkCard
                    href="https://www.npmjs.com/package/ft-design-system"
                    title="ft-design-system"
                    subtitle="View on npmjs.com"
                    icon={<Package className="h-6 w-6" />}
                />
                <div className="flex items-center gap-4 rounded-lg border border-border bg-surface p-5">
                    <div className="shrink-0 w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-primary">
                        <Package className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                        <p className="font-semibold text-md-rem">Version</p>
                        <p className="text-sm-rem text-muted-foreground">v{SYSTEM_VERSION}</p>
                    </div>
                </div>
            </div>

            <DocSection title="Installation">
                <DocCodeBlock code="npm install ft-design-system" lang="bash" filename="Terminal" />
            </DocSection>

            <DocSection title="Setup">
                <DocCodeBlock
                    code={`// Import styles
import 'ft-design-system/styles.css';

// Import components (AI-protected by default)
import { Button, Input, Table } from 'ft-design-system';

// Advanced: unprotected components
import { Button, Input, Table } from 'ft-design-system/core';`}
                    lang="tsx"
                    filename="app.tsx"
                />
            </DocSection>

            <DocSection title="Tailwind Config">
                <DocCodeBlock
                    code={`// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/ft-design-system/**/*.{js,jsx,ts,tsx}'
  ],
}`}
                    lang="javascript"
                    filename="tailwind.config.js"
                />
            </DocSection>

            <DocCard title="Package Includes">
                <ul className="space-y-1 text-sm-rem">
                    <li>• {COMPONENT_COUNT} production-ready React components</li>
                    <li>• 190+ custom icons with TypeScript support</li>
                    <li>• Full TypeScript definitions</li>
                    <li>• AI-protected components for coding assistants</li>
                    <li>• Quality gates: <code className="bg-muted px-1 rounded">npm run check:tokens</code>, <code className="bg-muted px-1 rounded">npm run check:drift</code></li>
                    <li>• WCAG AA accessibility compliant</li>
                </ul>
            </DocCard>

            <DocBottomNav
                prev={{ label: "Storybook", href: "/docs/storybook" }}
                next={{ label: "Global CSS", href: "/docs/global-css" }}
            />
        </div>
    )
}
