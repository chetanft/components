# FT Design System - CDN Usage

Use FT Design System directly from CDN without npm installation. Perfect for:
- Quick prototypes
- CodeSandbox / CodePen projects
- Bolt.new projects
- Static HTML pages

## Quick Start

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>FT Design System CDN Demo</title>
  
  <!-- FT Design System CSS -->
  <link rel="stylesheet" href="https://unpkg.com/ft-design-system@latest/dist/styles.css">
  
  <!-- React (required) -->
  <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  
  <!-- FT Design System UMD Bundle -->
  <script src="https://unpkg.com/ft-design-system@latest/dist/index.umd.js"></script>
</head>
<body>
  <div id="root"></div>
  
  <script>
    const { Button, Input, Card, Badge } = FTDesignSystem;
    const { createElement: h } = React;
    
    function App() {
      return h('div', { className: 'p-8 space-y-4' },
        h(Card, { title: 'Welcome' },
          h('p', null, 'Hello from FT Design System!'),
          h('div', { className: 'flex gap-2 mt-4' },
            h(Button, { variant: 'primary' }, 'Primary'),
            h(Button, { variant: 'secondary' }, 'Secondary')
          )
        )
      );
    }
    
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(h(App));
  </script>
</body>
</html>
```

## CDN URLs

### unpkg (recommended)

```html
<!-- CSS -->
<link rel="stylesheet" href="https://unpkg.com/ft-design-system@latest/dist/styles.css">

<!-- UMD Bundle -->
<script src="https://unpkg.com/ft-design-system@latest/dist/index.umd.js"></script>

<!-- Specific version -->
<link rel="stylesheet" href="https://unpkg.com/ft-design-system@4.15.14/dist/styles.css">
<script src="https://unpkg.com/ft-design-system@4.15.14/dist/index.umd.js"></script>
```

### jsDelivr

```html
<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ft-design-system@latest/dist/styles.css">

<!-- UMD Bundle -->
<script src="https://cdn.jsdelivr.net/npm/ft-design-system@latest/dist/index.umd.js"></script>
```

### ESM via esm.sh (for modern browsers)

```html
<script type="module">
  import { Button, Input, Card } from 'https://esm.sh/ft-design-system@latest';
  
  // Use components...
</script>
```

## Global Variable

When using the UMD bundle, components are available on the global `FTDesignSystem` object:

```javascript
const { 
  // Atoms
  Button, Input, Checkbox, Switch, Badge, Avatar, Icon,
  // Molecules
  Alert, DatePicker, Dropdown, Select, Pagination, Steps,
  // Organisms
  Table, Card, Modal, Drawer, Form, Tabs, PageHeader,
  // Charts
  BarChart, LineChart, PieChart,
  // Utilities
  cn, filterAIClasses
} = FTDesignSystem;
```

## Using with JSX (via Babel)

If you want JSX syntax, add Babel:

```html
<!-- Add Babel -->
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

<script type="text/babel">
  const { Button, Card, Input } = FTDesignSystem;
  
  function App() {
    const [name, setName] = React.useState('');
    
    return (
      <div className="p-8">
        <Card title="Contact Form">
          <Input 
            label="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button variant="primary" className="mt-4">
            Submit
          </Button>
        </Card>
      </div>
    );
  }
  
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<App />);
</script>
```

## Complete Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>FT Design System Demo</title>
  
  <!-- FT Design System CSS -->
  <link rel="stylesheet" href="https://unpkg.com/ft-design-system@latest/dist/styles.css">
  
  <!-- React -->
  <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  
  <!-- FT Design System -->
  <script src="https://unpkg.com/ft-design-system@latest/dist/index.umd.js"></script>
  
  <!-- Babel for JSX -->
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body>
  <div id="root"></div>
  
  <script type="text/babel">
    const { 
      Button, Input, Card, Badge, Alert, 
      Table, Modal, Tabs, Icon 
    } = FTDesignSystem;
    
    function App() {
      const [isModalOpen, setModalOpen] = React.useState(false);
      
      const tableData = [
        { id: 1, name: 'John Doe', status: 'Active' },
        { id: 2, name: 'Jane Smith', status: 'Pending' },
      ];
      
      const columns = [
        { key: 'name', title: 'Name' },
        { key: 'status', title: 'Status', render: (v) => (
          <Badge variant={v === 'Active' ? 'success' : 'warning'}>{v}</Badge>
        )},
      ];
      
      return (
        <div className="min-h-screen bg-bg-secondary p-8">
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold text-primary">
              FT Design System Demo
            </h1>
            
            <Alert variant="info" title="CDN Usage">
              This page is using FT Design System from CDN!
            </Alert>
            
            <Card title="User Management">
              <Table columns={columns} data={tableData} />
              <div className="mt-4 flex gap-2">
                <Button variant="primary" onClick={() => setModalOpen(true)}>
                  Add User
                </Button>
                <Button variant="secondary">Export</Button>
              </div>
            </Card>
            
            <Modal 
              open={isModalOpen} 
              onOpenChange={setModalOpen}
              title="Add New User"
            >
              <div className="space-y-4">
                <Input label="Name" placeholder="Enter name" />
                <Input label="Email" type="email" placeholder="Enter email" />
                <div className="flex justify-end gap-2">
                  <Button variant="secondary" onClick={() => setModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button variant="primary">Save</Button>
                </div>
              </div>
            </Modal>
          </div>
        </div>
      );
    }
    
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<App />);
  </script>
</body>
</html>
```

## Bolt.new / CodeSandbox

For Bolt.new and CodeSandbox, you can either:

1. **Use npm installation** (recommended for larger projects):
   ```bash
   npm install ft-design-system
   ```

2. **Use CDN in index.html**:
   Add the CDN links to your `index.html` head section.

3. **Use import maps** (modern browsers):
   ```html
   <script type="importmap">
   {
     "imports": {
       "ft-design-system": "https://esm.sh/ft-design-system@latest"
     }
   }
   </script>
   ```

## Troubleshooting

### Components not rendering?
1. Make sure React is loaded BEFORE FT Design System
2. Verify CSS is loaded
3. Check browser console for errors

### Styles look wrong?
1. Ensure CSS file is loaded: Check Network tab for `styles.css`
2. Make sure CSS is loaded BEFORE component usage

### TypeScript support in CDN?
Use the npm package for TypeScript projects. CDN is best for quick prototypes and demos.
