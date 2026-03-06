import { BookOpen } from "lucide-react"
import { DocPageHeader, DocSection, DocCodeBlock, DocLinkCard, DocCard, DocBottomNav } from "@/components/docs"

export default function StorybookPage() {
    return (
        <div className="space-y-8">
            <DocPageHeader
                title="Storybook"
                description="Interactive component playground for the FT Design System"
            />

            <DocLinkCard
                href="http://localhost:6006"
                title="Open Storybook"
                subtitle="http://localhost:6006"
                icon={<BookOpen className="h-6 w-6" />}
                external={true}
            />

            <DocSection title="Run Locally">
                <p className="text-sm-rem text-muted-foreground mb-2">Navigate to design system directory:</p>
                <DocCodeBlock code="cd /path/to/components" lang="bash" />
                <p className="text-sm-rem text-muted-foreground mb-2 mt-4">Start Storybook:</p>
                <DocCodeBlock code="npm run storybook" lang="bash" />
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
