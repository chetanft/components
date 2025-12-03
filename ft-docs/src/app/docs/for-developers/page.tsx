import Link from "next/link"
import { Terminal, Package, CheckCircle, RefreshCw, Rocket, ExternalLink, Code, BookOpen } from "lucide-react"

export default function ForDevelopersPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-4xl font-bold mb-2">For Developers</h1>
                <p className="text-muted-foreground text-lg">
                    Complete guide for developers using FT Design System with CLI commands, npm installation, and setup instructions
                </p>
            </div>

            {/* Quick Start */}
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-6">
                <h2 className="text-2xl font-semibold mb-4">Quick Start</h2>
                <div className="space-y-3">
                    <div>
                        <p className="text-sm font-medium mb-1">1. Install the package</p>
                        <div className="rounded-lg border bg-muted p-3">
                            <pre className="text-sm font-mono">npm install ft-design-system</pre>
                        </div>
                    </div>
                    <div>
                        <p className="text-sm font-medium mb-1">2. Run automated setup</p>
                        <div className="rounded-lg border bg-muted p-3">
                            <pre className="text-sm font-mono">npx ft-design-system setup</pre>
                        </div>
                    </div>
                    <div>
                        <p className="text-sm font-medium mb-1">3. Start using components</p>
                        <div className="rounded-lg border bg-muted p-3">
                            <pre className="text-sm font-mono whitespace-pre-wrap">{`import { Button, Input, Badge } from 'ft-design-system';`}</pre>
                        </div>
                    </div>
                </div>
            </div>

            {/* CLI Commands */}
            <div>
                <h2 className="text-2xl font-semibold mb-4">CLI Commands</h2>
                <div className="grid gap-4 md:grid-cols-2">
                    {/* Setup Command */}
                    <div className="rounded-lg border bg-surface p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Rocket className="h-6 w-6 text-primary" />
                            <h3 className="text-xl font-semibold">setup</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                            Set up FT Design System in your existing project
                        </p>
                        <div className="rounded-lg border bg-muted p-3 mb-4">
                            <pre className="text-xs font-mono">npx ft-design-system setup</pre>
                        </div>
                        <ul className="space-y-2 text-sm">
                            <li>• Detects framework automatically</li>
                            <li>• Adds CSS import to root file</li>
                            <li>• Updates Tailwind config</li>
                            <li>• Verifies setup</li>
                        </ul>
                    </div>

                    {/* Verify Command */}
                    <div className="rounded-lg border bg-surface p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <CheckCircle className="h-6 w-6 text-primary" />
                            <h3 className="text-xl font-semibold">verify</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                            Verify that FT Design System is properly configured
                        </p>
                        <div className="rounded-lg border bg-muted p-3 mb-4">
                            <pre className="text-xs font-mono">npx ft-design-system verify</pre>
                        </div>
                        <ul className="space-y-2 text-sm">
                            <li>• Checks package installation</li>
                            <li>• Verifies CSS import</li>
                            <li>• Validates Tailwind config</li>
                            <li>• Provides actionable feedback</li>
                        </ul>
                    </div>

                    {/* Update Command */}
                    <div className="rounded-lg border bg-surface p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <RefreshCw className="h-6 w-6 text-primary" />
                            <h3 className="text-xl font-semibold">update</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                            Update Tailwind config after package updates
                        </p>
                        <div className="rounded-lg border bg-muted p-3 mb-4">
                            <pre className="text-xs font-mono">npx ft-design-system update</pre>
                        </div>
                        <ul className="space-y-2 text-sm">
                            <li>• Refreshes Tailwind config</li>
                            <li>• Checks CSS import</li>
                            <li>• Updates content paths</li>
                            <li>• Safe to run multiple times</li>
                        </ul>
                    </div>

                    {/* Init Command */}
                    <div className="rounded-lg border bg-surface p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Terminal className="h-6 w-6 text-primary" />
                            <h3 className="text-xl font-semibold">init</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                            Scaffold a new project with FT Design System
                        </p>
                        <div className="rounded-lg border bg-muted p-3 mb-4">
                            <pre className="text-xs font-mono">npx ft-design-system init</pre>
                        </div>
                        <ul className="space-y-2 text-sm">
                            <li>• Interactive framework selection</li>
                            <li>• Pre-configured templates</li>
                            <li>• Ready to use immediately</li>
                            <li>• Supports Next.js, Vite, CRA</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Installation Methods */}
            <div>
                <h2 className="text-2xl font-semibold mb-4">Installation</h2>
                <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-lg border bg-surface p-4">
                        <Package className="h-6 w-6 text-primary mb-2" />
                        <h3 className="font-semibold mb-2">npm</h3>
                        <div className="rounded-lg border bg-muted p-2">
                            <pre className="text-xs font-mono">npm install ft-design-system</pre>
                        </div>
                    </div>
                    <div className="rounded-lg border bg-surface p-4">
                        <Package className="h-6 w-6 text-primary mb-2" />
                        <h3 className="font-semibold mb-2">yarn</h3>
                        <div className="rounded-lg border bg-muted p-2">
                            <pre className="text-xs font-mono">yarn add ft-design-system</pre>
                        </div>
                    </div>
                    <div className="rounded-lg border bg-surface p-4">
                        <Package className="h-6 w-6 text-primary mb-2" />
                        <h3 className="font-semibold mb-2">pnpm</h3>
                        <div className="rounded-lg border bg-muted p-2">
                            <pre className="text-xs font-mono">pnpm add ft-design-system</pre>
                        </div>
                    </div>
                </div>
            </div>

            {/* Developer Workflow */}
            <div className="rounded-lg border bg-surface p-6">
                <h2 className="text-2xl font-semibold mb-4">Developer Workflow</h2>
                <div className="space-y-4">
                    <div>
                        <h3 className="font-semibold mb-2">New Project</h3>
                        <div className="rounded-lg border bg-muted p-3">
                            <pre className="text-xs font-mono whitespace-pre-wrap">{`mkdir my-project
cd my-project
npx ft-design-system init
npm install
npm run dev`}</pre>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-2">Existing Project</h3>
                        <div className="rounded-lg border bg-muted p-3">
                            <pre className="text-xs font-mono whitespace-pre-wrap">{`npm install ft-design-system
npx ft-design-system setup
npx ft-design-system verify`}</pre>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-2">After Package Updates</h3>
                        <div className="rounded-lg border bg-muted p-3">
                            <pre className="text-xs font-mono whitespace-pre-wrap">{`npm update ft-design-system
npx ft-design-system update
npx ft-design-system verify`}</pre>
                        </div>
                    </div>
                </div>
            </div>

            {/* Using Components */}
            <div className="rounded-lg border bg-surface p-6">
                <h2 className="text-2xl font-semibold mb-4">Using Components</h2>
                <div className="space-y-4">
                    <div>
                        <h3 className="font-semibold mb-2">Basic Import</h3>
                        <div className="rounded-lg border bg-muted p-3">
                            <pre className="text-xs font-mono whitespace-pre-wrap">{`import { Button, Input, Badge, Table } from 'ft-design-system';`}</pre>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-2">Example Usage</h3>
                        <div className="rounded-lg border bg-muted p-3">
                            <pre className="text-xs font-mono whitespace-pre-wrap">{`import { Button, Input, Badge } from 'ft-design-system';

function MyComponent() {
  return (
    <div className="space-y-4">
      <Button variant="primary">Click Me</Button>
      <Input placeholder="Enter text" />
      <Badge variant="success">Active</Badge>
    </div>
  );
}`}</pre>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Links */}
            <div className="rounded-lg border bg-muted p-6">
                <h2 className="text-2xl font-semibold mb-4">Quick Links</h2>
                <div className="grid gap-3 md:grid-cols-2">
                    <Link 
                        href="/docs/npm-package" 
                        className="flex items-center gap-2 text-primary hover:underline"
                    >
                        <BookOpen className="h-4 w-4" />
                        NPM Package Setup
                    </Link>
                    <Link 
                        href="/docs/npm-package" 
                        className="flex items-center gap-2 text-primary hover:underline"
                    >
                        <Package className="h-4 w-4" />
                        NPM Package Details
                    </Link>
                    <Link 
                        href="/docs/for-designers" 
                        className="flex items-center gap-2 text-primary hover:underline"
                    >
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
            </div>

            {/* Tips */}
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-6">
                <h3 className="font-semibold mb-4">Tips & Best Practices</h3>
                <ul className="space-y-2 text-sm list-disc list-inside">
                    <li>Always run <code className="bg-muted px-1 rounded">npx ft-design-system verify</code> after setup</li>
                    <li>Update config after package updates: <code className="bg-muted px-1 rounded">npx ft-design-system update</code></li>
                    <li>Use TypeScript for better developer experience - full type definitions included</li>
                    <li>Import CSS before other styles to ensure proper cascade</li>
                    <li>Restart dev server after Tailwind config changes</li>
                    <li>Check version compatibility: <code className="bg-muted px-1 rounded">npm list ft-design-system</code></li>
                </ul>
            </div>
        </div>
    )
}

