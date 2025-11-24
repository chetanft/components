import { Package, ExternalLink } from "lucide-react"

export default function NPMPackagePage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-4xl font-bold mb-2">NPM Package</h1>
                <p className="text-muted-foreground">
                    Install and use ft-design-system in your React projects
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <a
                    href="https://www.npmjs.com/package/ft-design-system"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-lg border border-border bg-surface p-4 transition-all hover:border-primary hover:shadow-lg"
                >
                    <Package className="h-8 w-8 text-primary" />
                    <div className="flex-1">
                        <h3 className="font-semibold">ft-design-system</h3>
                        <p className="text-sm text-muted-foreground">View on npmjs.com</p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </a>

                <div className="flex items-center gap-3 rounded-lg border border-border bg-surface p-4">
                    <Package className="h-8 w-8 text-primary" />
                    <div className="flex-1">
                        <h3 className="font-semibold">Version</h3>
                        <p className="text-sm text-muted-foreground">v4.13.9</p>
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <h2 className="text-2xl font-semibold">Installation</h2>
                <div className="rounded-lg border bg-muted p-4">
                    <pre className="text-sm font-mono">
                        npm install ft-design-system
                    </pre>
                </div>
            </div>

            <div className="space-y-2">
                <h2 className="text-2xl font-semibold">Setup</h2>
                <div className="rounded-lg border bg-muted p-4">
                    <pre className="text-sm font-mono whitespace-pre-wrap">
                        {`// Import styles
import 'ft-design-system/dist/styles.css';

// Import components
import { Button, Input, Table } from 'ft-design-system';

// For AI tools (automatic filtering)
import { Button, Input, Table } from 'ft-design-system/ai';`}
                    </pre>
                </div>
            </div>

            <div className="space-y-2">
                <h2 className="text-2xl font-semibold">Tailwind Config</h2>
                <div className="rounded-lg border bg-muted p-4">
                    <pre className="text-sm font-mono whitespace-pre-wrap">
                        {`// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/ft-design-system/**/*.{js,jsx,ts,tsx}'
  ],
}`}
                    </pre>
                </div>
            </div>

            <div className="rounded-lg border bg-surface p-4">
                <h3 className="font-semibold mb-2">Package Includes</h3>
                <ul className="space-y-1 text-sm">
                    <li>• 50+ production-ready React components</li>
                    <li>• 190+ custom icons with TypeScript support</li>
                    <li>• Full TypeScript definitions</li>
                    <li>• AI-protected components for coding assistants</li>
                    <li>• WCAG AA accessibility compliant</li>
                </ul>
            </div>
        </div>
    )
}
