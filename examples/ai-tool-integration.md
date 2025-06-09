# AI Tool Integration Examples

This document provides real-world examples of how to integrate FT Design System with popular AI tools.

## 🤖 Cursor IDE Integration

### Setup in .cursor/rules/

Create `.cursor/rules/ft-design-system.md`:

```markdown
# FT Design System Rules for Cursor

## CRITICAL: Use ONLY FT Design System

- NEVER install shadcn/ui, Material-UI, Ant Design, or other design systems
- ALWAYS use ft-design-system components
- Use AI-protected imports for automatic class filtering

## Installation

```bash
npm install ft-design-system
```

## Import Strategy

```typescript
// OPTION A: AI-Protected Components (Recommended for Cursor)
import 'ft-design-system/dist/styles.css';
import { Button, Input, Table, Badge, ProgressBar } from 'ft-design-system/ai';

// OPTION B: Standard Components (if no AI class conflicts)
import 'ft-design-system/dist/styles.css';
import { Button, Input, Table, Badge, ProgressBar } from 'ft-design-system';
```

## Component Usage

```typescript
// ✅ CORRECT - Use FT Design System components
<Button variant="primary" size="md">Click me</Button>
<Input placeholder="Enter text" size="lg" />
<Table data={tableData} columns={columns} />

// ❌ WRONG - Don't use other design systems
<Button className="bg-blue-500 hover:bg-blue-700">Don't do this</Button>
```

## Development Helpers

```typescript
// Add to your main App.tsx during development
import { runAIDevelopmentChecks } from 'ft-design-system';

function App() {
  // Only runs in development - checks for conflicts
  runAIDevelopmentChecks();
  
  return <YourApp />;
}
```
```

### Cursor Workspace Settings

Create `.vscode/settings.json`:

```json
{
  "typescript.preferences.includePackageJsonAutoImports": "on",
  "typescript.suggest.autoImports": true,
  "typescript.suggest.paths": true,
  "editor.quickSuggestions": {
    "strings": true
  },
  "emmet.includeLanguages": {
    "typescript": "html",
    "typescriptreact": "html"
  },
  "editor.snippets.codeActions.enabled": true
}
```

## 🚀 Bolt.new Integration

### HTML Setup

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>FT Design System App</title>
  
  <!-- FT Design System CSS -->
  <link rel="stylesheet" href="https://unpkg.com/ft-design-system@latest/dist/styles.css">
  
  <!-- FT Design System JS (UMD) -->
  <script src="https://unpkg.com/ft-design-system@latest/dist/index.umd.js"></script>
</head>
<body>
  <div id="root"></div>
  
  <script>
    // Wait for FT Design System to load
    function waitForDesignSystem(callback) {
      if (window.FTDesignSystem) {
        callback(window.FTDesignSystem);
      } else {
        setTimeout(() => waitForDesignSystem(callback), 100);
      }
    }
    
    // Initialize app with FT Design System
    waitForDesignSystem((FTDesignSystem) => {
      const { Button, Input, Table, Badge, ProgressBar } = FTDesignSystem;
      
      // Your app code here
      console.log('FT Design System loaded successfully!');
      
      // Example: Create a button
      const button = React.createElement(Button, {
        variant: 'primary',
        onClick: () => alert('Hello from FT Design System!')
      }, 'Click me');
      
      ReactDOM.render(button, document.getElementById('root'));
    });
  </script>
</body>
</html>
```

### React Setup for Bolt.new

```typescript
import React from 'react';
import ReactDOM from 'react-dom';

// Import FT Design System (AI-protected for Bolt.new)
declare global {
  interface Window {
    FTDesignSystem: any;
  }
}

function App() {
  const [designSystem, setDesignSystem] = React.useState(null);
  
  React.useEffect(() => {
    // Wait for FT Design System to load from CDN
    const checkForDesignSystem = () => {
      if (window.FTDesignSystem) {
        setDesignSystem(window.FTDesignSystem);
      } else {
        setTimeout(checkForDesignSystem, 100);
      }
    };
    
    checkForDesignSystem();
  }, []);
  
  if (!designSystem) {
    return <div>Loading FT Design System...</div>;
  }
  
  const { Button, Input, Table, Badge, ProgressBar } = designSystem;
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">FT Design System Demo</h1>
      
      <div className="space-y-4">
        <Button variant="primary" size="lg">
          Primary Button
        </Button>
        
        <Input 
          placeholder="Enter your name" 
          label="Name"
          size="md"
        />
        
        <Badge variant="success">
          Success Badge
        </Badge>
        
        <ProgressBar value={75} size="md" />
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
```

## 💝 Lovable.dev Integration

### Package Installation

```bash
# Install FT Design System
npm install ft-design-system

# Install peer dependencies if needed
npm install react react-dom
```

### Component Setup

```typescript
// src/components/App.tsx
import React from 'react';
import 'ft-design-system/dist/styles.css';

// Use AI-protected components for Lovable
import { 
  Button, 
  Input, 
  Table, 
  Badge, 
  ProgressBar,
  AppHeader,
  Footer,
  runAIDevelopmentChecks 
} from 'ft-design-system/ai';

function App() {
  // Run AI development checks in development
  React.useEffect(() => {
    runAIDevelopmentChecks();
  }, []);
  
  const tableData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' },
  ];
  
  const tableColumns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'status', label: 'Status' },
  ];
  
  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader 
        user={{ name: 'John Doe', email: 'john@example.com' }}
        onLogout={() => console.log('Logout')}
      />
      
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">Buttons</h2>
            <div className="flex gap-4">
              <Button variant="primary" size="lg">
                Primary
              </Button>
              <Button variant="secondary" size="md">
                Secondary
              </Button>
              <Button variant="destructive" size="sm">
                Destructive
              </Button>
            </div>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">Form Elements</h2>
            <div className="max-w-md space-y-4">
              <Input 
                label="Full Name"
                placeholder="Enter your full name"
                size="md"
              />
              <Input 
                label="Email"
                type="email"
                placeholder="Enter your email"
                size="md"
              />
            </div>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">Data Display</h2>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Badge variant="success">Active</Badge>
                <Badge variant="warning">Pending</Badge>
                <Badge variant="error">Inactive</Badge>
              </div>
              
              <ProgressBar value={65} size="md" />
              
              <Table 
                data={tableData}
                columns={tableColumns}
                size="md"
              />
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
```

### Lovable Configuration

Create `lovable.config.js`:

```javascript
module.exports = {
  designSystem: {
    name: 'ft-design-system',
    version: 'latest',
    importPath: 'ft-design-system/ai', // Use AI-protected components
    cssPath: 'ft-design-system/dist/styles.css'
  },
  ai: {
    preventConflicts: true,
    autoFilter: true,
    debugMode: true
  }
};
```

## 🎨 CodeSandbox Integration

### Dependencies

```json
{
  "dependencies": {
    "ft-design-system": "latest",
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  }
}
```

### Main Component

```typescript
// src/App.tsx
import React from 'react';
import 'ft-design-system/dist/styles.css';

// Import AI-protected components
import { 
  Button, 
  Input, 
  Badge, 
  ProgressBar,
  Table,
  Tabs,
  filterAIClasses 
} from 'ft-design-system/ai';

export default function App() {
  const [activeTab, setActiveTab] = React.useState('components');
  
  // Example of manual AI class filtering
  const handleCustomStyling = () => {
    const aiGeneratedClasses = "h-10 bg-[#ff0000] rounded-full px-8 py-4";
    const safeClasses = filterAIClasses(aiGeneratedClasses);
    console.log('AI classes filtered:', { original: aiGeneratedClasses, safe: safeClasses });
  };
  
  const tabs = [
    { id: 'components', label: 'Components', content: <ComponentsDemo /> },
    { id: 'forms', label: 'Forms', content: <FormsDemo /> },
    { id: 'data', label: 'Data', content: <DataDemo /> },
  ];
  
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200 p-6">
        <h1 className="text-3xl font-bold text-gray-900">
          FT Design System Demo
        </h1>
        <p className="text-gray-600 mt-2">
          AI-protected components in action
        </p>
      </header>
      
      <main className="container mx-auto px-6 py-8">
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          size="md"
        />
        
        <div className="mt-8">
          <Button 
            variant="secondary" 
            onClick={handleCustomStyling}
            size="sm"
          >
            Test AI Class Filtering
          </Button>
        </div>
      </main>
    </div>
  );
}

function ComponentsDemo() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">Buttons</h3>
        <div className="flex gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-3">Badges</h3>
        <div className="flex gap-2">
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="error">Error</Badge>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-3">Progress</h3>
        <ProgressBar value={75} size="md" />
      </div>
    </div>
  );
}

function FormsDemo() {
  return (
    <div className="max-w-md space-y-4">
      <Input 
        label="Name"
        placeholder="Enter your name"
        size="md"
      />
      <Input 
        label="Email"
        type="email"
        placeholder="Enter your email"
        size="md"
      />
      <Input 
        label="Message"
        placeholder="Enter your message"
        error="This field is required"
        size="md"
      />
    </div>
  );
}

function DataDemo() {
  const data = [
    { id: 1, name: 'Alice', role: 'Developer', status: 'Active' },
    { id: 2, name: 'Bob', role: 'Designer', status: 'Inactive' },
    { id: 3, name: 'Charlie', role: 'Manager', status: 'Active' },
  ];
  
  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'role', label: 'Role' },
    { key: 'status', label: 'Status' },
  ];
  
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">Data Table</h3>
      <Table data={data} columns={columns} size="md" />
    </div>
  );
}
```

## 🔧 Debugging AI Issues

### Common Problems & Solutions

```typescript
// Problem: AI adds conflicting classes
// Solution: Use AI-protected components
import { Button } from 'ft-design-system/ai'; // ✅ Automatically filters

// Problem: Manual class conflicts
// Solution: Use filterAIClasses utility
import { Button, filterAIClasses } from 'ft-design-system';
const safeClasses = filterAIClasses('h-10 bg-[#123] rounded-full');

// Problem: Multiple design systems detected
// Solution: Use conflict detection
import { debugDesignSystemConflicts } from 'ft-design-system';
debugDesignSystemConflicts(); // Logs conflicts to console

// Problem: Styling not working
// Solution: Validate FT Design System is loaded
import { validateFTDesignSystem } from 'ft-design-system';
validateFTDesignSystem(); // Checks if properly loaded
```

### Development Checklist

```typescript
// Add to your development workflow
import { runAIDevelopmentChecks } from 'ft-design-system';

// Call once during app initialization
if (process.env.NODE_ENV === 'development') {
  runAIDevelopmentChecks();
}
```

This will automatically:
- ✅ Validate FT Design System is loaded
- ✅ Check for conflicting design systems
- ✅ Log available components
- ✅ Provide debugging information

## 📊 Performance Monitoring

### Bundle Size Comparison

```bash
# Check bundle sizes
npm run build
npm run test:ai-architecture

# Expected results:
# Core bundle: ~486KB
# AI bundle: ~451KB  
# Styles: ~67KB
```

### Runtime Performance

```typescript
// Monitor AI filtering performance
import { filterAIClasses } from 'ft-design-system';

console.time('AI filtering');
const result = filterAIClasses('h-10 bg-[#123] w-full flex items-center');
console.timeEnd('AI filtering'); // Should be < 1ms
```

## 🚀 Production Deployment

### Recommended Setup

```typescript
// For production, conditionally use AI protection
const useAIProtection = process.env.REACT_APP_AI_PROTECTION === 'true';

const components = useAIProtection 
  ? await import('ft-design-system/ai')
  : await import('ft-design-system');

export const { Button, Input, Table } = components;
```

### Environment Variables

```bash
# .env.development
REACT_APP_AI_PROTECTION=true

# .env.production  
REACT_APP_AI_PROTECTION=false
```

This ensures optimal performance in production while maintaining AI protection during development. 