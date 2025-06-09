# Logo Components

Company logo components for the FT Design System.

## Available Logos

- **FT Logo** (`ft`) - FreightTiger company logo with branding colors
- **Tata Motors Logo** (`tata-motors`) - Tata Motors partner logo

## Usage

### Basic Logo Component

```tsx
import { Logo } from 'ft-design-system';

function App() {
  return <Logo name="ft" />;
}
```

### Individual Logo Components

```tsx
import { FTLogo, TataMotorsLogo } from 'ft-design-system';

function App() {
  return (
    <div>
      <FTLogo />
      <TataMotorsLogo />
    </div>
  );
}
```

### Custom Sizing

```tsx
import { Logo } from 'ft-design-system';

function App() {
  return (
    <Logo 
      name="ft" 
      width={100} 
      height={50} 
    />
  );
}
```

### With Custom Styling

```tsx
import { Logo } from 'ft-design-system';

function App() {
  return (
    <Logo 
      name="tata-motors" 
      className="my-custom-logo-class" 
    />
  );
}
```

## Props

### Logo Component

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `LogoName` | required | Logo identifier |
| `width` | `number` | varies | Custom width in pixels |
| `height` | `number` | varies | Custom height in pixels |
| `className` | `string` | - | Additional CSS classes |

### LogoName Type

```typescript
type LogoName = 'ft' | 'tata-motors';
```

## Default Sizes

- **FT Logo**: 191×28px
- **Tata Motors Logo**: 155×26px

## Design System Integration

These logos are sourced directly from our Figma design system using the MCP (Model Context Protocol) integration, ensuring they stay in sync with the latest design specifications.

**Figma Reference**: [Company Logos](https://www.figma.com/design/HMS1wPnsS1fuPyN1xSEVAH/Components?node-id=2661-91&t=Eq74uetvti3Thts5-4) 