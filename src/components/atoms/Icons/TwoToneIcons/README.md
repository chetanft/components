# Two-Tone Icons

Two-tone icons use opacity to create visual hierarchy and depth within a single icon. The primary elements use full opacity while secondary elements use 0.4 opacity.

## Available Icons

- `dashboard` - Dashboard icon with primary circle outline and secondary inner circle
- `control-tower` - Control tower icon with primary square and circle outlines, and secondary directional indicators
- `my-trip` - My trip icon with primary circle outline and triangle, and secondary inner circle
- `reports` - Reports icon with primary circle outline and secondary horizontal lines
- `indent` - Indent icon with primary rectangle outline and secondary horizontal lines

## Usage

```jsx
import { Icon } from 'components';

// Basic usage
<Icon name="dashboard" size={24} />

// With custom color
<Icon name="control-tower" size={24} color="#1890ff" />

// With custom className
<Icon name="my-trip" size={24} className="my-custom-class" />
```

## Design Guidelines

- Use two-tone icons when you need to create visual hierarchy within an icon
- The primary elements (full opacity) should represent the main action or concept
- Secondary elements (0.4 opacity) should provide context or additional detail
- Maintain consistent use of two-tone icons across the interface
- Two-tone icons work well in both light and dark themes

## Implementation Details

Two-tone icons are implemented as SVG components with specific opacity values for different paths. The primary paths have full opacity (1.0) while secondary paths have reduced opacity (0.4). 