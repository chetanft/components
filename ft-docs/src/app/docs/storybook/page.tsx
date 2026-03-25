"use client"

import { BookOpen } from "lucide-react"
import { DocPageHeader, DocSection, DocCodeBlock, DocLinkCard, DocCard, DocBottomNav } from "@/components/docs"
import { useViewMode } from "@/components/view-mode-context"
import { MachineSpecView } from "@/components/machine-spec-view"
import { buildStorybookSpec } from "@/lib/machine-specs/storybook"

export default function StorybookPage() {
    const { viewMode } = useViewMode()

    if (viewMode === "machine") {
        return <MachineSpecView>{buildStorybookSpec()}</MachineSpecView>
    }

    return (
        <div className="space-y-8">
            <DocPageHeader
                title="Storybook"
                description="Interactive component playground for the FT Design System"
            />

            <DocSection title="Run Locally">
                <p className="text-sm-rem text-muted-foreground mb-2">Navigate to design system directory:</p>
                <DocCodeBlock code="cd /path/to/components" lang="bash" />
                <p className="text-sm-rem text-muted-foreground mb-2 mt-4">Start Storybook:</p>
                <DocCodeBlock code="npm run storybook" lang="bash" />
                <p className="text-sm-rem text-muted-foreground mt-2">Storybook will open at <code className="text-xs bg-muted px-1 py-0.5 rounded">http://localhost:6006</code></p>
            </DocSection>

            <DocCard title="What You'll Find" description="Explore the full component library interactively.">
                <ul className="space-y-1 text-sm-rem">
                    <li>• Interactive playground for all 50+ components</li>
                    <li>• Live prop controls and variant testing</li>
                    <li>• Code examples for copy/paste</li>
                    <li>• Component documentation and usage guidelines</li>
                </ul>
            </DocCard>

            <DocBottomNav
                prev={{ label: "For Developers", href: "/docs/for-developers" }}
                next={{ label: "NPM Package", href: "/docs/npm-package" }}
            />
        </div>
    )
}
