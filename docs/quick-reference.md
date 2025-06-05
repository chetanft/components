# Quick Reference - Design System Components

## Installation
```bash
npm install @chetanft/design_system
```

## Essential Imports
```jsx
import { 
  AppHeader, 
  Button, 
  UserProfile, 
  Footer, 
  Badge, 
  Checkbox, 
  Input, 
  Switch 
} from '@chetanft/design_system';
```

## Component Snippets

### Complete App Layout
```jsx
function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader 
        user={{
          name: 'John Doe',
          role: 'Manager',
          location: 'Mumbai',
          badge: 'Admin'
        }}
      />
      <main className="flex-1 p-6">
        {/* Your content here */}
      </main>
      <Footer variant="standard" />
    </div>
  );
}
```

### Buttons
```jsx
<Button variant="primary">Save</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="text">Learn More</Button>

// With icons
<Button variant="primary" iconPosition="leading" icon={<PlusIcon />}>
  Add Item
</Button>
```

### Form Components
```jsx
// Input
<Input 
  label="Name" 
  placeholder="Enter your name" 
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>

// Checkbox
<Checkbox 
  label="I agree to terms" 
  checked={checked}
  onChange={setChecked}
/>

// Switch
<Switch 
  label="Enable notifications" 
  checked={enabled}
  onChange={setEnabled}
/>
```

### Status Badges
```jsx
<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="error">Failed</Badge>
```

### User Profile
```jsx
<UserProfile 
  userName="John Doe"
  userRole="Manager"
  userLocation="Mumbai"
  userBadge="Admin"
  onMenuItemClick={(item) => console.log(item)}
/>
```

## Common Patterns

### Dashboard Header
```jsx
<div className="mb-6">
  <h1 className="text-2xl font-bold">Dashboard</h1>
  <div className="mt-2 flex gap-2">
    <Badge variant="success">Online</Badge>
    <Badge variant="warning">3 Pending</Badge>
  </div>
</div>
```

### Action Buttons
```jsx
<div className="flex gap-2">
  <Button variant="primary">Save Changes</Button>
  <Button variant="secondary">Cancel</Button>
</div>
```

### Form Group
```jsx
<div className="space-y-4">
  <Input label="Email" type="email" />
  <Input label="Password" type="password" />
  <Checkbox label="Remember me" />
  <Button variant="primary" className="w-full">Sign In</Button>
</div>
```

## Props Quick Reference

### AppHeader
- `user`: `{ name, role, location, badge }`
- `onNotificationClick`: `(type) => void`
- `onUserMenuItemClick`: `(item) => void`

### Button
- `variant`: `'primary' | 'secondary' | 'text'`
- `size`: `'small' | 'medium' | 'large'`
- `iconPosition`: `'leading' | 'trailing' | 'only'`
- `disabled`: `boolean`

### Input
- `type`: `'text' | 'email' | 'password' | 'number'`
- `label`: `string`
- `error`: `string`
- `disabled`: `boolean`

### Footer
- `variant`: `'minimal' | 'standard' | 'detailed' | 'corporate' | 'social'`

### Badge
- `variant`: `'default' | 'secondary' | 'success' | 'warning' | 'error'`
- `size`: `'small' | 'medium' | 'large'` 