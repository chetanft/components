# Composable Audit Rubric

This document defines the criteria for evaluating whether components follow composable patterns (LEGO-style API) versus rigid APIs with variant props, boolean flags, or data arrays.

## Audit Criteria

Each component is evaluated against 8 criteria. Components must meet all criteria to be considered fully compliant.

### 1. Slot/asChild Support ✅

**Requirement**: Component or its sub-components support the `asChild` prop, allowing consumers to merge props with child elements.

**How to Check**:
- Look for `asChild?: boolean` in component props interface
- Component uses `Slot` from `@radix-ui/react-slot` or custom Slot implementation
- Sub-components support `asChild` prop

**Example - Compliant**:
```tsx
interface ButtonProps extends ComposableProps<'button'> {
  asChild?: boolean;
  // ...
}

const Button = ({ asChild, ...props }) => {
  const Comp = asChild ? Slot : 'button';
  return <Comp {...props} />;
};
```

**Example - Non-Compliant**:
```tsx
interface ButtonProps {
  // No asChild support
  children: React.ReactNode;
}
```

---

### 2. No Variant Props ✅

**Requirement**: Component does not use a `variant` prop for visual styling. Instead, composition or CSS classes should be used.

**How to Check**:
- No `variant?: 'primary' | 'secondary' | ...` prop in interface
- Visual differences achieved through:
  - Composition (different sub-components)
  - CSS classes applied by parent
  - Context-based styling

**Exception**: Variant props are acceptable for:
- Semantic states (e.g., `state?: 'error' | 'success'` for form validation)
- Data-driven variants (e.g., `type?: 'text' | 'number'` for input types)

**Example - Compliant**:
```tsx
// Use composition instead
<Badge>
  <BadgeIcon icon="check" />
  <BadgeText>Success</BadgeText>
</Badge>
```

**Example - Non-Compliant**:
```tsx
<Badge variant="success">Success</Badge>
```

---

### 3. No Boolean Flags ✅

**Requirement**: Component does not use boolean props like `enable*`, `show*`, `hide*`, `display*` to control visibility or behavior. Use conditional rendering instead.

**How to Check**:
- No props matching patterns: `enable*`, `show*`, `hide*`, `display*`
- Visibility controlled by:
  - Conditional rendering (`{condition && <Component />}`)
  - Composition (parent decides what to render)
  - CSS classes for styling

**Exception**: Boolean props are acceptable for:
- Form states (`disabled`, `readOnly`)
- Toggle states (`checked`, `open`, `expanded`)
- Accessibility (`aria-hidden`, `aria-disabled`)

**Example - Compliant**:
```tsx
{hasIcon && <AlertIcon icon="info" />}
```

**Example - Non-Compliant**:
```tsx
<Alert showIcon={true} />
```

---

### 4. Child-Composable API ✅

**Requirement**: Component uses sub-components (e.g., `Component.SubComponent`) pattern, allowing flexible composition.

**How to Check**:
- Component exports sub-components as properties (e.g., `PageHeader.Top`, `Alert.Title`)
- Sub-components can be used independently or together
- Parent component acts as a container/layout provider

**Example - Compliant**:
```tsx
<PageHeader>
  <PageHeader.Top>
    <PageHeader.Left>
      <PageHeader.Title>Title</PageHeader.Title>
    </PageHeader.Left>
  </PageHeader.Top>
</PageHeader>
```

**Example - Non-Compliant**:
```tsx
<PageHeader title="Title" leftContent={...} />
```

---

### 5. FT Design Tokens ✅

**Requirement**: Component uses CSS variables from `ft-design-system/global.css` instead of hardcoded values.

**How to Check**:
- Colors use `var(--color-*)` or `var(--primary)`, etc.
- Spacing uses `var(--spacing-*)` or design tokens
- Typography uses design tokens
- No hardcoded hex colors, pixel values (except for design tokens)

**Example - Compliant**:
```tsx
className="bg-[var(--bg-primary)] text-[var(--primary)] p-[var(--spacing-4)]"
```

**Example - Non-Compliant**:
```tsx
className="bg-white text-gray-900 p-4"
```

---

### 6. JSDoc Documentation ✅

**Requirement**: Component has complete JSDoc with `@example` showing composable usage.

**How to Check**:
- Main component has JSDoc comment
- Includes `@example` tag showing composable API
- Documents sub-components
- Mentions FT design tokens used

**Example - Compliant**:
```tsx
/**
 * Alert Component
 * 
 * A composable alert component.
 * 
 * @public
 * 
 * @example
 * ```tsx
 * <Alert variant="info">
 *   <AlertIcon />
 *   <AlertTitle>Title</AlertTitle>
 *   <AlertDescription>Message</AlertDescription>
 * </Alert>
 * ```
 */
```

---

### 7. No Data Arrays ✅

**Requirement**: Component does not accept `columns`, `items`, `data` array props. Use children composition instead.

**How to Check**:
- No props like `columns?: Column[]`, `items?: Item[]`, `data?: Data[]`
- Data rendered through children composition
- Parent provides data, component provides structure

**Exception**: Array props are acceptable for:
- Form options (`options?: Option[]` for Select, RadioGroup)
- Chart data (`data?: DataPoint[]` for charts)

**Example - Compliant**:
```tsx
<Table>
  <Table.Header>
    <Table.Row>
      <Table.HeaderCell>Name</Table.HeaderCell>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {data.map(row => (
      <Table.Row key={row.id}>
        <Table.Cell>{row.name}</Table.Cell>
      </Table.Row>
    ))}
  </Table.Body>
</Table>
```

**Example - Non-Compliant**:
```tsx
<Table columns={columns} data={data} />
```

---

### 8. No Layout Logic ✅

**Requirement**: Component does not inject layout/spacing logic. Parent controls layout.

**How to Check**:
- Component doesn't add margins, padding (except internal spacing)
- No flexbox/grid layout injected by component
- Parent controls spacing between components
- Component focuses on its own structure, not positioning

**Exception**: Internal spacing for component structure is acceptable (e.g., gap between icon and text within a button).

**Example - Compliant**:
```tsx
// Parent controls layout
<div className="flex gap-4">
  <Button>Save</Button>
  <Button>Cancel</Button>
</div>
```

**Example - Non-Compliant**:
```tsx
// Component injects layout
<ButtonGroup>
  <Button>Save</Button>
  <Button>Cancel</Button>
</ButtonGroup>
// ButtonGroup adds flexbox and gap internally
```

---

## Scoring System

### ✅ Compliant
- Meets **all 8 criteria**
- Component follows composable patterns throughout
- No deprecated props or legacy APIs

### ⚠️ Partial
- Meets **5-7 criteria**
- Has deprecated props but supports composable API
- Migration path exists
- Can be used composably but has legacy support

### ❌ Non-Compliant
- Meets **<5 criteria**
- Requires refactor to support composable patterns
- May have some composable elements but overall rigid API
- High priority for refactoring

---

## Evaluation Process

1. **Automated Scan**: Run `npm run audit:scan` to flag potential issues
2. **Manual Review**: Review component code, stories, and tests
3. **Document Findings**: Record issues in `COMPOSABLE_AUDIT_FINDINGS.md`
4. **Update Status**: Mark component status in `COMPOSABLE_AUDIT_PROGRESS.md`
5. **Create Migration Plan**: Document refactoring steps if needed

---

## References

- [Composable Component Patterns](./composable-patterns.md) (if exists)
- [FT Design Tokens Reference](../../DESIGN_TOKENS_REFERENCE.md)
- [Component Guidelines](../CONTRIBUTING.md)

