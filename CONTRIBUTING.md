# Contributing to FT Design System

Thank you for your interest in contributing to the FT Design System! This guide will help you understand our development process, coding standards, and how to submit your contributions.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Design System Standards](#design-system-standards)
- [Component Guidelines](#component-guidelines)
- [Testing Requirements](#testing-requirements)
- [Accessibility Standards](#accessibility-standards)
- [Documentation](#documentation)
- [Submitting Changes](#submitting-changes)
- [Release Process](#release-process)

## Code of Conduct

This project adheres to a code of conduct adapted from the [Contributor Covenant](https://www.contributor-covenant.org/). By participating, you are expected to uphold this code.

## Getting Started

### Prerequisites

- Node.js 18+ and npm 8+
- Git
- Code editor with TypeScript support (VS Code recommended)

### Installation

```bash
# Clone the repository
git clone https://github.com/chetanft/components.git
cd components

# Install dependencies
npm install

# Start development environment
npm run storybook
```

### Project Structure

```
src/
├── components/
│   ├── atoms/          # Basic building blocks
│   ├── molecules/      # Simple combinations
│   ├── organisms/      # Complex combinations
│   └── templates/      # Layout structures
├── styles/             # Global styles and tokens
├── lib/                # Utilities
├── stories/            # Storybook stories
└── tokens/             # Design tokens
```

## Development Workflow

### Component Source-First Architecture

This project follows a **component source-first architecture** where:

- Component source code (`src/components/`) is the single source of truth
- Changes automatically flow to docs, Storybook, and npm package
- Versions are synchronized across all artifacts
- Pre-commit hooks ensure consistency

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed information.

### Branch Naming

- `feature/component-name` - New components or features
- `fix/issue-description` - Bug fixes
- `docs/update-description` - Documentation updates
- `refactor/component-name` - Code refactoring
- `chore/task-description` - Maintenance tasks

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

feat(button): add dark mode support
fix(input): resolve focus state issue
docs(readme): update installation guide
refactor(tokens): organize spacing system
test(badge): add unit tests
chore(deps): update dependencies
```

### Component Update Workflow

1. **Update Component Source**
   ```bash
   # Edit component files in src/components/
   # Component changes are the source of truth
   ```

2. **Automatic Sync** (via pre-commit hook)
   - Versions are automatically synchronized
   - Component exports are validated
   - Changes are staged if needed

3. **Commit Changes**
   ```bash
   git add src/components/
   git commit -m "feat(button): add new variant"
   # Pre-commit hook runs automatically
   ```

4. **Build & Test**
   ```bash
   npm run build        # Auto-syncs versions and validates
   npm run test
   npm run storybook    # Test in Storybook
   ```

5. **Sync Source to Docs and NPM** (after component updates)
   ```bash
   npm run sync:source-to-docs    # Sync component source → docs → npm
   ```

6. **Sync Everything** (if needed)
   ```bash
   npm run sync:all     # Complete sync workflow
   ```

### Version Management

**Important**: Never manually edit versions in `ft-docs/package.json` or other locations.

**Always update version in root `package.json`** (single source of truth):

```bash
# Use npm version commands (auto-syncs)
npm version patch   # 4.13.9 → 4.13.10
npm version minor   # 4.13.9 → 4.14.0
npm version major   # 4.13.9 → 5.0.0

# Or manually edit root package.json, then:
npm run sync:version
```

The pre-commit hook ensures versions stay synchronized automatically.

## Design System Standards

### Atomic Design Principles

Our components follow atomic design methodology:

1. **Atoms**: Button, Input, Badge, Icon, Typography
2. **Molecules**: SearchBox, FormField, ButtonGroup
3. **Organisms**: Header, Footer, DataTable, Modal
4. **Templates**: PageLayout, DashboardShell

### Design Tokens

#### 8-Point Grid System
All spacing should follow the 8-point grid (4px base unit):

```css
/* Use design tokens */
--space-1: 4px;   /* 1x */
--space-2: 8px;   /* 2x */
--space-3: 12px;  /* 3x */
--space-4: 16px;  /* 4x */
--space-5: 20px;  /* 5x - Special unit */
--space-6: 24px;  /* 6x */
```

#### Color System
```css
/* Light mode */
--dark-100: #434f64;  /* Primary text */
--dark-50: #5f697b;   /* Secondary text */
--dark-25: #838c9d;   /* Muted text */

/* Dark mode */
--dark-100: #e2e8f0;  /* Primary text */
--dark-50: #94a3b8;   /* Secondary text */
--dark-25: #64748b;   /* Muted text */
```

## Component Guidelines

### File Structure

```
ComponentName/
├── ComponentName.tsx           # Main component
├── ComponentName.test.tsx      # Unit tests
├── ComponentName.stories.tsx   # Storybook stories
├── index.ts                    # Exports
└── README.md                   # Component documentation
```

### Component Template

```typescript
"use client";

import React from 'react';
import { cn } from '../../lib/utils';

export interface ComponentNameProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children: React.ReactNode;
}

export const ComponentName = React.forwardRef<HTMLDivElement, ComponentNameProps>(
  ({ className, variant = 'primary', size = 'md', disabled = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Base styles
          "inline-flex items-center justify-center transition-all duration-200",
          // Size variants
          {
            'px-3 py-1 text-sm': size === 'sm',
            'px-4 py-2 text-base': size === 'md',
            'px-6 py-3 text-lg': size === 'lg',
          },
          // Variant styles
          {
            'bg-blue-600 text-white hover:bg-blue-700': variant === 'primary',
            'bg-gray-200 text-gray-900 hover:bg-gray-300': variant === 'secondary',
          },
          // State styles
          {
            'opacity-50 cursor-not-allowed': disabled,
          },
          className
        )}
        aria-disabled={disabled}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ComponentName.displayName = 'ComponentName';
```

### Props Guidelines

1. **Extend native HTML props** when appropriate
2. **Use strict TypeScript unions** for variants
3. **Provide sensible defaults** for all optional props
4. **Support className override** for customization
5. **Forward refs** for DOM access

### Composable API Guidelines

Components should follow composable patterns (LEGO-style API) rather than rigid APIs:

1. **Use Sub-Components**: Prefer `Component.SubComponent` pattern over prop-based configuration
   ```tsx
   // ✅ Good - Composable
   <Alert>
     <AlertIcon />
     <AlertTitle>Title</AlertTitle>
     <AlertDescription>Message</AlertDescription>
   </Alert>
   
   // ❌ Avoid - Declarative
   <Alert title="Title" message="Message" icon="info" />
   ```

2. **Support asChild**: Components should support `asChild` prop for flexible composition
   ```tsx
   <Button asChild>
     <Link href="/">Click me</Link>
   </Button>
   ```

3. **Avoid Variant Props**: Use composition or CSS classes instead of `variant` prop for visual styling
   ```tsx
   // ✅ Good - Composition
   <Badge>
     <BadgeIcon icon="check" />
     <BadgeText>Success</BadgeText>
   </Badge>
   
   // ❌ Avoid - Variant prop
   <Badge variant="success">Success</Badge>
   ```

4. **Avoid Boolean Flags**: Use conditional rendering instead of `show*`, `enable*`, `hide*` props
   ```tsx
   // ✅ Good - Conditional rendering
   {hasIcon && <AlertIcon />}
   
   // ❌ Avoid - Boolean flag
   <Alert showIcon={true} />
   ```

5. **Avoid Data Arrays**: Use children composition instead of `columns`, `items`, `data` array props
   ```tsx
   // ✅ Good - Children composition
   <Table>
     <Table.Header>
       <Table.Row>
         <Table.HeaderCell>Name</Table.HeaderCell>
       </Table.Row>
     </Table.Header>
   </Table>
   
   // ❌ Avoid - Data array prop
   <Table columns={columns} data={data} />
   ```

6. **No Layout Logic**: Components should not inject layout/spacing. Parent controls layout.

For more details, see [Composable Audit Rubric](docs/standards/composable-audit-rubric.md).

### Styling Guidelines

1. **Use design tokens** instead of hardcoded values
2. **Follow mobile-first responsive design**
3. **Support dark mode** with appropriate color variables
4. **Use Tailwind utilities** with `cn()` helper
5. **Avoid inline styles** unless absolutely necessary

## Testing Requirements

### Unit Tests

Every component must have unit tests covering:

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  it('renders correctly', () => {
    render(<ComponentName>Test</ComponentName>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('applies variant styles', () => {
    render(<ComponentName variant="secondary">Test</ComponentName>);
    expect(screen.getByText('Test')).toHaveClass('bg-gray-200');
  });

  it('handles disabled state', () => {
    render(<ComponentName disabled>Test</ComponentName>);
    expect(screen.getByText('Test')).toHaveAttribute('aria-disabled', 'true');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<ComponentName ref={ref}>Test</ComponentName>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
```

### Test Coverage

- Minimum 80% code coverage
- All public props and variants
- Error states and edge cases
- Accessibility features
- Keyboard navigation

## Accessibility Standards

### WCAG 2.1 AA Compliance

All components must meet WCAG 2.1 AA standards:

1. **Color Contrast**: Minimum 4.5:1 ratio for normal text
2. **Keyboard Navigation**: All interactive elements accessible via keyboard
3. **Screen Reader Support**: Proper ARIA attributes and semantic HTML
4. **Focus Management**: Visible focus indicators and logical tab order

### Accessibility Checklist

- [ ] Semantic HTML elements used where appropriate
- [ ] Proper ARIA attributes added
- [ ] Keyboard navigation implemented
- [ ] Focus states clearly visible
- [ ] Color is not the only means of conveying information
- [ ] Text has sufficient contrast ratios
- [ ] Screen reader tested with NVDA/JAWS

### ARIA Attributes

```typescript
// Example: Proper ARIA attributes
<button
  aria-label="Close dialog"
  aria-describedby="tooltip-123"
  aria-expanded={isOpen}
  aria-haspopup="true"
>
  Close
</button>
```

## Documentation

### Storybook Stories

Every component needs comprehensive Storybook documentation:

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from './ComponentName';

const meta: Meta<typeof ComponentName> = {
  title: 'Atoms/ComponentName',
  component: ComponentName,
  parameters: {
    docs: {
      description: {
        component: 'A flexible component for...'
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'Visual style variant'
    }
  }
};

export default meta;
type Story = StoryObj<typeof ComponentName>;

export const Default: Story = {
  args: {
    children: 'Default Component'
  }
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <ComponentName variant="primary">Primary</ComponentName>
      <ComponentName variant="secondary">Secondary</ComponentName>
    </div>
  )
};
```

### Component README

Each component needs a README.md with:

- Purpose and use cases
- Props API documentation
- Usage examples
- Accessibility notes
- Design guidelines

## Submitting Changes

### Pull Request Process

1. **Create feature branch** from `main`
2. **Implement changes** following guidelines
   - Update component source (`src/components/`)
   - Versions sync automatically via pre-commit hook
3. **Add/update tests** with good coverage
4. **Update documentation** (Storybook, README)
5. **Run quality checks**:
   ```bash
   npm run sync:version    # Ensure versions are synced
   npm run type-check
   npm run lint
   npm run test
   npm run build           # Auto-syncs versions and validates
   ```
6. **Submit pull request** with clear description

**Note**: The pre-commit hook automatically syncs versions and validates exports. If versions are out of sync, the hook will fix them automatically.

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Checklist
- [ ] Tests added/updated
- [ ] Storybook stories added/updated
- [ ] Documentation updated
- [ ] Accessibility tested
- [ ] Dark mode support added
- [ ] TypeScript types exported

## Screenshots
[Add screenshots for visual changes]

## Breaking Changes
[List any breaking changes]
```

### Review Criteria

PRs are reviewed for:
- Design system consistency
- Code quality and TypeScript usage
- Test coverage and quality
- Accessibility compliance
- Documentation completeness
- Performance implications

## Release Process

### Semantic Versioning

- **Major (x.0.0)**: Breaking changes
- **Minor (0.x.0)**: New features, non-breaking
- **Patch (0.0.x)**: Bug fixes, non-breaking

### Release Checklist

1. **Update version** in root `package.json` (single source of truth)
   ```bash
   npm version patch   # or minor/major
   # This auto-syncs versions across all packages
   ```

2. **Update `CHANGELOG.md`** with release notes

3. **Run full test suite**
   ```bash
   npm run test
   npm run type-check
   npm run lint
   ```

4. **Build and verify package**
   ```bash
   npm run build        # Auto-syncs versions and validates
   npm run validate:package
   ```

5. **Sync everything** (if needed)
   ```bash
   npm run sync:all     # Complete sync workflow
   ```

6. **Publish to NPM**
   ```bash
   npm run publish      # Interactive CLI
   # Or use specific commands:
   npm run publish:patch
   npm run publish:minor
   npm run publish:major
   ```

7. **Create git tag** (if not done by npm version)
   ```bash
   git tag v4.13.10
   git push --tags
   ```

8. **Update GitHub release**

**Note**: Version synchronization happens automatically. The publish commands ensure versions are synced before publishing.

## Getting Help

- **Questions**: Open a GitHub Discussion
- **Bugs**: Create a GitHub Issue
- **Feature Requests**: Open a GitHub Issue with feature template
- **Security Issues**: Email security@example.com

## Resources

- [Architecture Documentation](./ARCHITECTURE.md) - Component source-first architecture
- [Design System Documentation](./docs/)
- [Storybook](https://your-storybook-url.com)
- [Figma Design Files](https://figma.com/your-design-files)
- [Accessibility Guide](./docs/ACCESSIBILITY.md)

## Quick Reference

### Common Commands

```bash
# Sync versions across all packages
npm run sync:version

# Complete sync workflow (versions + docs + storybook + build)
npm run sync:all

# Build with version sync and validation
npm run build

# Publish (interactive CLI with version sync)
npm run publish
```

### Version Management

```bash
# Update version (auto-syncs)
npm version patch   # 4.13.9 → 4.13.10
npm version minor   # 4.13.9 → 4.14.0
npm version major   # 4.13.9 → 5.0.0

# Manual version sync
npm run sync:version
```

Thank you for contributing to make our design system better! 🎉 