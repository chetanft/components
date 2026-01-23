# Logo Components

Company logo components for the FT Design System.

## Available Logos

- **FT Logo** (`ft`) - FreightTiger company logo with branding colors (yellow/black)
- **FT Logo White** (`ft-white`) - FreightTiger company logo with white text variant
- **Tata Motors Logo** (`tata-motors`) - Tata Motors partner logo
- **MDC Labs Logo** (`mdc-labs`) - MDC Labs company logo (Teal & Blue)
- **Shakthi Logistics Logo** (`shakthi-logistics`) - Shakthi Logistics company logo (Black Italic Text)
- **GATI Logo** (`gati`) - GATI company logo (Teal/Blue stylized)
- **Birla Pivot Logo** (`birla-pivot`) - Birla Pivot company logo (Black with Gradient Polygon)
- **Diageo Logo** (`diageo`) - Diageo company logo (Black)
- **Diageo Logo White** (`diageo-white`) - Diageo company logo (White variant)
- **JSW ONE Logo** (`jsw-one`) - JSW ONE company logo (Red, White & Blue)
- **Shadowfax Logo** (`shadowfax`) - Shadowfax company logo (Orange)

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
import { 
  FTLogo, 
  FTLogoWhite,
  TataMotorsLogo,
  MDCLabsLogo,
  ShakthiLogisticsLogo,
  GatiLogo,
  BirlaPivotLogo,
  DiageoLogo,
  DiageoWhiteLogo,
  JSWOneLogo,
  ShadowfaxLogo
} from 'ft-design-system';

function App() {
  return (
    <div>
      <FTLogo />
      <FTLogoWhite />
      <TataMotorsLogo />
      <MDCLabsLogo />
      <ShakthiLogisticsLogo />
      <GatiLogo />
      <BirlaPivotLogo />
      <DiageoLogo />
      <DiageoWhiteLogo />
      <JSWOneLogo />
      <ShadowfaxLogo />
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

### Logo Variants

Some logos have multiple variants for different use cases:

```tsx
import { Logo } from 'ft-design-system';

function App() {
  return (
    <div>
      {/* Use white variant on dark backgrounds */}
      <Logo name="ft-white" />
      <Logo name="diageo-white" />
      
      {/* Use standard variants on light backgrounds */}
      <Logo name="ft" />
      <Logo name="diageo" />
    </div>
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
type LogoName = 
  | 'ft' 
  | 'ft-white'
  | 'tata-motors'
  | 'mdc-labs'
  | 'shakthi-logistics'
  | 'gati'
  | 'birla-pivot'
  | 'diageo'
  | 'diageo-white'
  | 'jsw-one'
  | 'shadowfax';
```

## Default Sizes

- **FT Logo**: 191×28px
- **FT Logo White**: 191×28px
- **Tata Motors Logo**: 155×26px
- **MDC Labs Logo**: 120×28px
- **Shakthi Logistics Logo**: 180×28px
- **GATI Logo**: 80×28px
- **Birla Pivot Logo**: 160×28px
- **Diageo Logo**: 100×28px
- **Diageo Logo White**: 100×28px
- **JSW ONE Logo**: 120×28px
- **Shadowfax Logo**: 140×28px

## Design System Integration

These logos are sourced directly from our Figma design system using the MCP (Model Context Protocol) integration, ensuring they stay in sync with the latest design specifications.

**Figma Reference**: [Company Logos](https://www.figma.com/design/HMS1wPnsS1fuPyN1xSEVAH/Components?node-id=2661-91&t=Eq74uetvti3Thts5-4) 