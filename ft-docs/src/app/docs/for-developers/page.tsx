"use client"

import Link from "next/link"
import { Terminal, Package, ExternalLink, Code, BookOpen } from "lucide-react"
import { Icon } from "@/registry"
import { DocPageHeader, DocSection, DocCodeBlock, DocCard, DocBottomNav } from "@/components/docs"
import { useViewMode } from "@/components/view-mode-context"
import { MachineSpecView } from "@/components/machine-spec-view"

export default function ForDevelopersPage() {
    const { viewMode } = useViewMode()

    if (viewMode === "machine") {
        const machineSpec = [
            "# FT Design System — For Developers",
            "PURPOSE: developer setup, CLI commands, imports, workflow gates",
            "INSTALL:",
            "- npm install ft-design-system",
            "- yarn add ft-design-system",
            "- pnpm add ft-design-system",
            "",
            "CLI:",
            "- npx ft-design-system setup",
            "- npx ft-design-system verify",
            "- npx ft-design-system update",
            "- npx ft-design-system init",
            "",
            "IMPORTS:",
            "- import 'ft-design-system/styles.css';",
            "- import { Button, Input, Badge, Table } from 'ft-design-system';",
            "",
            "QUALITY_GATES:",
            "- npm run check:tokens",
            "- npm run check:consistency",
            "- npm run check:size-contract",
            "- npm run check:machine-mode",
            "- npm run check:drift",
            "",
            "RELATED_DOCS:",
            "- /docs/npm-package?view=machine",
            "- /docs/ai-prompts?view=machine",
            "- /docs/global-css?view=machine",
            "- /docs/components/<component>?view=machine",
        ].join("\n")

        return <MachineSpecView>{machineSpec}</MachineSpecView>
    }

    return (
        <div className="space-y-8">
            <DocPageHeader
                title="For Developers"
                description="Complete guide for developers using FT Design System with CLI commands, npm installation, and setup instructions"
            />

            {/* Quick Start */}
            <DocSection title="Quick Start">
                <div className="space-y-3">
                    <div>
                        <p className="text-sm-rem font-medium mb-1">1. Install the package</p>
                        <DocCodeBlock code="npm install ft-design-system" lang="bash" />
                    </div>
                    <div>
                        <p className="text-sm-rem font-medium mb-1">2. Run automated setup</p>
                        <DocCodeBlock code="npx ft-design-system setup" lang="bash" />
                    </div>
                    <div>
                        <p className="text-sm-rem font-medium mb-1">3. Start using components</p>
                        <DocCodeBlock code={`import { Button, Input, Badge } from 'ft-design-system';`} lang="tsx" />
                    </div>
                </div>
            </DocSection>

            {/* CLI Commands */}
            <DocSection title="CLI Commands">
                <div className="grid gap-4 md:grid-cols-2">
                    <DocCard icon={<Icon name="rocket" size={24} />} title="setup" description="Set up FT Design System in your existing project">
                        <DocCodeBlock code="npx ft-design-system setup" lang="bash" />
                        <ul className="space-y-2 text-sm-rem mt-4">
                            <li>• Detects framework automatically</li>
                            <li>• Adds CSS import to root file</li>
                            <li>• Updates Tailwind config</li>
                            <li>• Verifies setup</li>
                        </ul>
                    </DocCard>

                    <DocCard icon={<Icon name="check-fill" size={24} />} title="verify" description="Verify that FT Design System is properly configured">
                        <DocCodeBlock code="npx ft-design-system verify" lang="bash" />
                        <ul className="space-y-2 text-sm-rem mt-4">
                            <li>• Checks package installation</li>
                            <li>• Verifies CSS import</li>
                            <li>• Validates Tailwind config</li>
                            <li>• Provides actionable feedback</li>
                        </ul>
                    </DocCard>

                    <DocCard icon={<Icon name="refresh" size={24} />} title="update" description="Update Tailwind config after package updates">
                        <DocCodeBlock code="npx ft-design-system update" lang="bash" />
                        <ul className="space-y-2 text-sm-rem mt-4">
                            <li>• Refreshes Tailwind config</li>
                            <li>• Checks CSS import</li>
                            <li>• Updates content paths</li>
                            <li>• Safe to run multiple times</li>
                        </ul>
                    </DocCard>

                    <DocCard icon={<Terminal className="h-6 w-6" />} title="init" description="Scaffold a new project with FT Design System">
                        <DocCodeBlock code="npx ft-design-system init" lang="bash" />
                        <ul className="space-y-2 text-sm-rem mt-4">
                            <li>• Interactive framework selection</li>
                            <li>• Pre-configured templates</li>
                            <li>• Ready to use immediately</li>
                            <li>• Supports Next.js, Vite, CRA</li>
                        </ul>
                    </DocCard>
                </div>
            </DocSection>

            {/* Installation Methods */}
            <DocSection title="Installation">
                <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-lg border border-border bg-surface p-4">
                        <Package className="h-6 w-6 text-primary mb-2" />
                        <h3 className="font-semibold mb-2">npm</h3>
                        <DocCodeBlock code="npm install ft-design-system" lang="bash" />
                    </div>
                    <div className="rounded-lg border border-border bg-surface p-4">
                        <Package className="h-6 w-6 text-primary mb-2" />
                        <h3 className="font-semibold mb-2">yarn</h3>
                        <DocCodeBlock code="yarn add ft-design-system" lang="bash" />
                    </div>
                    <div className="rounded-lg border border-border bg-surface p-4">
                        <Package className="h-6 w-6 text-primary mb-2" />
                        <h3 className="font-semibold mb-2">pnpm</h3>
                        <DocCodeBlock code="pnpm add ft-design-system" lang="bash" />
                    </div>
                </div>
            </DocSection>

            {/* Developer Workflow */}
            <DocCard title="Developer Workflow">
                <div className="space-y-4">
                    <div>
                        <h3 className="font-semibold mb-2">New Project</h3>
                        <DocCodeBlock code={`mkdir my-project
cd my-project
npx ft-design-system init
npm install
npm run dev`} lang="bash" />
                    </div>
                    <div>
                        <h3 className="font-semibold mb-2">Existing Project</h3>
                        <DocCodeBlock code={`npm install ft-design-system
npx ft-design-system setup
npx ft-design-system verify`} lang="bash" />
                    </div>
                    <div>
                        <h3 className="font-semibold mb-2">After Package Updates</h3>
                        <DocCodeBlock code={`npm update ft-design-system
npx ft-design-system update
npx ft-design-system verify`} lang="bash" />
                    </div>
                </div>
            </DocCard>

            {/* Using Components */}
            <DocCard title="Using Components">
                <div className="space-y-4">
                    <div>
                        <h3 className="font-semibold mb-2">Basic Import</h3>
                        <DocCodeBlock code={`import { Button, Input, Badge, Table } from 'ft-design-system';`} lang="tsx" />
                    </div>
                    <div>
                        <h3 className="font-semibold mb-2">Example Usage</h3>
                        <DocCodeBlock code={`import { Button, Input, Badge } from 'ft-design-system';

function MyComponent() {
  return (
    <div className="space-y-4">
      <Button variant="primary">Click Me</Button>
      <Input placeholder="Enter text" />
      <Badge variant="success">Active</Badge>
    </div>
  );
}`} lang="tsx" filename="MyComponent.tsx" />
                    </div>
                </div>
            </DocCard>

            {/* Quick Links */}
            <DocSection title="Quick Links">
                <div className="grid gap-3 md:grid-cols-2">
                    <Link href="/docs/npm-package" className="flex items-center gap-2 text-primary hover:underline">
                        <BookOpen className="h-4 w-4" />
                        NPM Package Setup
                    </Link>
                    <Link href="/docs/npm-package" className="flex items-center gap-2 text-primary hover:underline">
                        <Package className="h-4 w-4" />
                        NPM Package Details
                    </Link>
                    <Link href="/docs/for-designers" className="flex items-center gap-2 text-primary hover:underline">
                        <Code className="h-4 w-4" />
                        For Designers
                    </Link>
                    <a
                        href="https://www.npmjs.com/package/ft-design-system"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-primary hover:underline"
                    >
                        <ExternalLink className="h-4 w-4" />
                        View on npmjs.com
                    </a>
                </div>
            </DocSection>

            {/* Quality Gates */}
            <DocCard title="Quality Gates">
                <div className="space-y-4">
                    <div>
                        <h3 className="font-semibold mb-2">Token Audit (before commit)</h3>
                        <DocCodeBlock code="npm run check:tokens" lang="bash" />
                        <p className="text-sm-rem text-muted-foreground mt-1">Scans for hardcoded px, hex, rgba values that should use design tokens.</p>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-2">Drift Detection (before merging dep updates)</h3>
                        <DocCodeBlock code="npm run check:drift" lang="bash" />
                        <p className="text-sm-rem text-muted-foreground mt-1">Detects upstream dependency changes that may affect component specs.</p>
                    </div>
                </div>
            </DocCard>

            {/* Tips */}
            <DocSection title="Tips & Best Practices">
                <ul className="space-y-2 text-sm-rem list-disc list-inside">
                    <li>Always run <code className="bg-muted px-1 rounded">npx ft-design-system verify</code> after setup</li>
                    <li>Run <code className="bg-muted px-1 rounded">npm run check:tokens</code> before committing UI changes</li>
                    <li>Use canonical <code className="bg-muted px-1 rounded">--spacing-x*</code> tokens (not legacy <code className="bg-muted px-1 rounded">--x*</code>)</li>
                    <li>Use TypeScript for better developer experience - full type definitions included</li>
                    <li>Import CSS before other styles to ensure proper cascade</li>
                    <li>Restart dev server after Tailwind config changes</li>
                    <li>Check version compatibility: <code className="bg-muted px-1 rounded">npm list ft-design-system</code></li>
                </ul>
            </DocSection>

            <DocBottomNav
                prev={{ label: "For Designers", href: "/docs/for-designers" }}
                next={{ label: "Storybook", href: "/docs/storybook" }}
            />
        </div>
    )
}
