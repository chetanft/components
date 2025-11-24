import { BookOpen, ExternalLink } from "lucide-react"

export default function StorybookPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-4xl font-bold mb-2">Storybook</h1>
                <p className="text-muted-foreground">
                    Interactive component playground for the FT Design System
                </p>
            </div>

            <a
                href="http://localhost:6006"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-lg border border-border bg-surface p-6 transition-all hover:border-primary hover:shadow-lg"
            >
                <BookOpen className="h-10 w-10 text-primary" />
                <div className="flex-1">
                    <h3 className="font-semibold text-lg">Open Storybook</h3>
                    <p className="text-sm text-muted-foreground">http://localhost:6006</p>
                </div>
                <ExternalLink className="h-5 w-5 text-muted-foreground" />
            </a>

            <div className="space-y-2">
                <h2 className="text-2xl font-semibold">Run Locally</h2>
                <div className="rounded-lg border bg-muted p-4 space-y-3">
                    <div>
                        <p className="text-sm mb-2">Navigate to design system directory:</p>
                        <pre className="text-xs bg-surface p-2 rounded font-mono">
                            cd /path/to/components
                        </pre>
                    </div>
                    <div>
                        <p className="text-sm mb-2">Start Storybook:</p>
                        <pre className="text-xs bg-surface p-2 rounded font-mono">
                            npm run storybook
                        </pre>
                    </div>
                </div>
            </div>

            <div className="rounded-lg border bg-surface p-4">
                <h3 className="font-semibold mb-2">What You'll Find</h3>
                <ul className="space-y-1 text-sm">
                    <li>• Interactive playground for all 50+ components</li>
                    <li>• Live prop controls and variant testing</li>
                    <li>• Code examples for copy/paste</li>
                    <li>• Component documentation and usage guidelines</li>
                </ul>
            </div>
        </div>
    )
}
