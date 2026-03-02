# FT Design System - Canonical API Contract

> **Version:** 5.0 (target)
> **Status:** Draft
> **Purpose:** Define the single source of truth for component API design. All components must conform to this contract before v5 release.

Related docs:
- `docs/LEGACY_API_AUDIT.md`
- `docs/LEGACY_MIGRATION_MATRIX.md`
- `docs/STORY_CONTRACT.md`

---

## Core Principle

Every public prop must belong to exactly one of four concerns. No prop may encode more than one concern.

| Concern | Purpose | Examples |
|---|---|---|
| **Variant** | Visual intent only | `variant="primary"`, `variant="destructive"` |
| **Size** | Scale only | `size="sm"`, `size="md"`, `size="lg"` |
| **State** | UI feedback state | `error="Required"`, `loading`, `success` |
| **Behavior** | Interaction control | `disabled`, `readOnly`, `onChange`, `onOpenChange` |

---

## 1. Variant Rules

### 1a. Naming
- The prop MUST be named `variant`.
- Do NOT use `color`, `type`, `contentVariant`, `mode`, or any other name for the same concept.

### 1b. Values encode visual intent, not state
Allowed variant values describe **what the element looks like**, not what state it is in.

**Allowed:**
```
primary, secondary, destructive, ghost, text, link, dashed,
info, success, warning, danger, error, neutral, outline, filled, default
```

**Banned as variants (these are states):**
```
hover, focused, active, disabled, loading, typing, prefilled, selected, processing
```

### 1c. Variant budget
- Maximum 6 variants per component unless justified in a design review.
- If a component needs more, consider splitting into separate components.

### 1d. Current violations to fix

| Component | Current | Target |
|---|---|---|
| Tooltip | `color?: 'white' \| 'dark'` | Rename to `variant?: 'light' \| 'dark'` |
| Dropdown | `type?: 'normal' \| 'search' \| 'groups'` | Rename to `variant` or split into distinct components |
| Card | `contentVariant?: 'Basic' \| 'Advanced'` | Rename to `variant?: 'basic' \| 'advanced'` (lowercase) |
| DatePicker | `state` cva includes `'focused' \| 'hover' \| 'typing' \| 'prefilled'` | Remove interaction states from public API; keep only `'default' \| 'filled'` |
| Dropdown | `state?: 'default' \| 'error' \| 'disabled'` | Split: `variant` for visual, `disabled` boolean, `error` string |

---

## 2. Size Rules

### 2a. Canonical scale
All components that accept a `size` prop MUST use values from this scale:

```ts
type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
```

Extended sizes (`xxs`, `xxl`) are permitted only when the design spec explicitly requires them.

### 2b. Default
Default size MUST be `'md'` for all components.

### 2c. Banned aliases
The following size aliases are banned from public types:

| Alias | Replacement |
|---|---|
| `'default'` | `'md'` |
| `'small'` | `'sm'` |
| `'m'` | `'md'` |
| `'l'` | `'lg'` |

### 2d. Current violations to fix

| Component | Issue |
|---|---|
| Badge | `size` type includes `'default'` and `'small'` |
| Card | `size` type includes `'default'` and `'small'` |
| DatePicker | Default size is `'m'` (legacy alias); type includes `'m'` and `'l'` |

---

## 3. State Rules

### 3a. Error state
- Use `error?: string` to provide both the flag and the message.
- Do NOT use `error?: boolean` (loses the message).
- Exception: components that only need visual error indication without message text may use `boolean`.

### 3b. Standard state props
```ts
// Validation feedback (renders message text)
error?: string
warning?: string
success?: string

// Behavioral states (boolean only)
disabled?: boolean
readOnly?: boolean
loading?: boolean
```

### 3c. Do not encode disabled/error in `state` prop
The `state="disabled"` and `state="error"` pattern used by Dropdown and DatePicker is banned. Use separate boolean/string props.

### 3d. Current violations to fix

| Component | Issue | Target |
|---|---|---|
| Dropdown | `state?: 'default' \| 'error' \| 'disabled'` | `disabled?: boolean`, `error?: string` |
| DatePicker | `state` cva includes `'disabled'` + separate `disabled` prop | Remove from cva, keep only `disabled` prop |
| DatePicker | `error?: boolean` | Change to `error?: string` |

---

## 4. Behavior Rules

### 4a. Controlled components
- Open/close: `open?: boolean` + `onOpenChange?: (open: boolean) => void`
- Do NOT use `onClose` (use `onOpenChange(false)` instead).
- Value: `value` + `onChange`
- Do NOT use `onSelect` alongside `onChange`.

### 4b. Current violations to fix

| Component | Issue | Target |
|---|---|---|
| Modal | `onClose` deprecated alongside `onOpenChange` | Remove `onClose`, keep `onOpenChange` |
| Drawer | `onClose` deprecated alongside `onOpenChange` | Remove `onClose`, keep `onOpenChange` |
| Dropdown | `onSelect` deprecated alongside `onChange` | Remove `onSelect`, keep `onChange` |

---

## 5. Semantic Color Vocabulary

All components MUST use the same words for semantic intent:

| Intent | Canonical Term | Banned Aliases |
|---|---|---|
| Negative/error | `error` | `danger`, `critical` |
| Positive/success | `success` | `positive` |
| Caution | `warning` | `caution` |
| Informational | `info` | `information` |
| Neutral/default | `default` | `normal`, `neutral` (as variant value) |

### Current violations to fix

| Component | Issue | Target |
|---|---|---|
| Alert | Uses `variant="danger"` | Change to `variant="error"` |
| Badge | `'danger'` silently remapped to `'error'` | Remove `'danger'` from type, keep only `'error'` |
| Badge | `'normal'` silently remapped to `'default'` | Remove `'normal'` from type |

---

## 6. Composable API Rules

### 6a. Detection
All dual-API components detect composable usage via child `displayName` inspection. This is the standard pattern and must be preserved until legacy paths are fully removed.

### 6b. Sub-component naming
Sub-components MUST be named `{ParentName}{Role}`:
- `AlertTitle`, `AlertDescription`, `AlertIcon`, `AlertAction`
- `ModalHeader`, `ModalTitle`, `ModalBody`, `ModalFooter`

### 6c. Static sub-components
Do NOT attach sub-components as static properties (`Card.Meta`, `Badge.Ribbon`). Export them as separate named exports instead.

### 6d. Current violations

| Component | Issue |
|---|---|
| Card | Uses `(Card as any).Meta = CardMeta` pattern |
| Badge | Uses `(Badge as any).Ribbon = BadgeRibbon` pattern |

---

## 7. Glass Prop

The `glass?: GlassVariant` prop (`true | 'subtle' | 'prominent'`) is optional and follows these rules:
- Include on components that render visible backgrounds/borders (Card, Modal, Alert, Input, etc.)
- Exclude from purely textual or inline components (Typography, SubText)
- On Button, glass applies only to `variant="ghost"`

---

## Compliance Checklist

For each component, verify:

- [ ] `variant` is the only prop for visual intent (no `color`, `type`, `contentVariant`)
- [ ] `size` uses canonical scale with `'md'` default (no `'default'`, `'small'`, `'m'`, `'l'`)
- [ ] State props are separate booleans/strings (no `state="disabled"`)
- [ ] No interaction states in public variant/state types (`hover`, `focused`, `typing`)
- [ ] Error is `string` type (not `boolean`) where message is needed
- [ ] Controlled open uses `onOpenChange` (not `onClose`)
- [ ] Controlled value uses `onChange` (not `onSelect`)
- [ ] Semantic colors use canonical vocabulary (`error` not `danger`)
- [ ] Sub-components are named exports (not static properties)
- [ ] Default story uses composable API only
