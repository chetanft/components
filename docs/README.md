# Design System Documentation

This folder contains comprehensive documentation for the `@chetanft/design_system` package, specifically formatted for use in AI development environments like lovable.dev and bolt.new.

## Files Overview

### 🎨 `for-designers.md`
**Purpose**: Comprehensive design guidelines for designers
- Unified component sizing system (36px, 44px, 52px, 64px)
- Color system specifications (#434f64 primary brand color)
- Figma design requirements and handoff specifications
- Accessibility and responsive design guidelines

**Best for**: Designers, design system consistency, Figma component creation

### 👨‍💻 `for-developers.md`
**Purpose**: Developer-focused guide with CLI commands and setup
- Complete npx CLI command reference (setup, verify, update, init)
- npm installation and usage instructions
- Developer workflow and best practices
- Troubleshooting guide for common issues

**Best for**: Developers, quick setup, CLI usage, troubleshooting

### 📋 `components.json`
**Purpose**: Machine-readable component specifications
- Complete prop definitions with types
- Usage examples for each component
- Installation and setup instructions
- Structured for AI parsing and code generation

**Best for**: AI assistants, automated documentation, API references

### 📖 `design-system.mdx`
**Purpose**: Comprehensive human-readable documentation
- Detailed component explanations with examples
- Complete usage patterns and best practices
- Full API documentation
- Step-by-step guides and tutorials

**Best for**: Developers, detailed implementation guides, learning

### ⚡ `quick-reference.md`
**Purpose**: Fast component usage snippets
- Essential import statements
- Common patterns and code snippets
- Quick prop reference
- Copy-paste ready examples

**Best for**: Rapid development, quick lookups, code snippets

## How to Use in AI Development Platforms

### For lovable.dev
1. Upload any of these files to your lovable project
2. Reference components in your prompts:
   ```
   Use the AppHeader component from @chetanft/design_system with user data
   ```
3. The AI will have context about available props and usage patterns

### For bolt.new
1. Share the content of these files in your conversation
2. Ask bolt to implement specific components:
   ```
   Create a dashboard using the AppHeader, Button, and Badge components
   ```
3. Reference the documentation for accurate implementation

### Quick Start Commands

**Installation:**
```bash
npm install @chetanft/design_system
```

**Basic Import:**
```jsx
import { AppHeader, Button, Footer } from '@chetanft/design_system';
```

**Example Usage:**
```jsx
<AppHeader 
  user={{
    name: 'John Doe',
    role: 'Manager',
    location: 'Mumbai',
    badge: 'Admin'
  }}
/>
```

## Component Categories

### 🏗️ Layout Components
- **AppHeader**: Application header with branding and user profile
- **Footer**: Page footer with multiple variants
- **UserProfile**: User dropdown menu component

### 🎛️ Interactive Components
- **Button**: Primary interaction buttons with icon support
- **Input**: Form input fields with validation
- **Checkbox**: Form checkboxes with labels
- **Switch**: Toggle switches for settings

### 🏷️ Display Components
- **Badge**: Status and label indicators
- **Typography**: Text components (coming soon)
- **Icons**: Icon components (coming soon)

## Usage Patterns

### Complete Application Layout
```jsx
function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader user={userData} />
      <main className="flex-1">
        {/* Your content */}
      </main>
      <Footer variant="standard" />
    </div>
  );
}
```

### Form Implementation
```jsx
function ContactForm() {
  return (
    <form className="space-y-4">
      <Input label="Email" type="email" />
      <Input label="Password" type="password" />
      <Checkbox label="Remember me" />
      <Button variant="primary">Submit</Button>
    </form>
  );
}
```

## Tips for AI Platforms

1. **Be Specific**: Reference exact component names and props
2. **Use Examples**: Copy examples from the documentation
3. **Mention Variants**: Specify which variant/style you want
4. **Include Props**: Provide realistic data for props

### Example Prompts

**Good:**
> "Create a dashboard using AppHeader with user data, Button components for actions, and Badge components to show status"

**Better:**
> "Create a dashboard with AppHeader (user: John Doe, Manager, Mumbai, Admin badge), primary Button for 'Create Order', secondary Button for 'View Reports', and success Badge showing 'Online' status"

## Support

- **GitHub**: https://github.com/chetanft/components
- **Issues**: Report bugs or request features
- **Storybook**: [Add your Storybook URL here]

## Updates

This documentation is automatically updated with each release. Always reference the latest version for accurate prop definitions and usage examples. 