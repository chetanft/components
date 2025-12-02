import { Button, Input, Badge } from 'ft-design-system';

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">FT Design System</h1>
      
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Buttons</h2>
          <div className="flex gap-2">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Input</h2>
          <Input label="Email" placeholder="Enter your email" />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Badges</h2>
          <div className="flex gap-2">
            <Badge variant="success">Success</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="warning">Warning</Badge>
          </div>
        </div>
      </div>
    </main>
  );
}

