import 'ft-design-system/index.css'
import { Button, Badge, Input, Label } from 'ft-design-system'

function App() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">FT/ui</h1>
            <Badge variant="secondary">v4.10.1</Badge>
          </div>
          <nav className="flex items-center gap-6">
            <a href="#" className="text-sm font-medium hover:underline">Documentation</a>
            <a href="#" className="text-sm font-medium hover:underline">Components</a>
            <a href="#" className="text-sm font-medium hover:underline">Examples</a>
            <a href="#" className="text-sm font-medium hover:underline">GitHub</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight mb-6">
            Build your component library with{' '}
            <span className="text-primary">FT Design System</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Beautifully designed components that you can copy and paste into your apps.
            Accessible. Customizable. Open Source.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button size="lg">Get Started</Button>
            <Button variant="outline" size="lg">Browse Components</Button>
          </div>
        </div>
      </section>

      {/* Component Preview */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card border rounded-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Components</h2>
              <Badge variant="outline">React</Badge>
            </div>
            
            {/* Button Examples */}
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-medium mb-4">Button</h3>
                <div className="flex flex-wrap gap-4">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                </div>
              </div>

              {/* Badge Examples */}
              <div>
                <h3 className="text-lg font-medium mb-4">Badge</h3>
                <div className="flex flex-wrap gap-4 items-center">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                  <Badge variant="outline">Outline</Badge>
                </div>
              </div>

              {/* Input Examples */}
              <div>
                <h3 className="text-lg font-medium mb-4">Input</h3>
                <div className="max-w-sm space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t mt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Built with FT Design System. The source code is available on GitHub.
            </p>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="text-xs">
                MIT License
              </Badge>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App