/**
 * Prompt Builders
 *
 * Builds AI prompt strings from generated design system data.
 * Used by ai-prompts/page.tsx to render machine/human/cursor formats.
 */

import {
  SYSTEM_VERSION,
  COMPONENT_COUNT,
  SPACING_SUMMARY,
  HALF_STEP_SUMMARY,
  TYPOGRAPHY_SUMMARY,
  RADIUS_SUMMARY,
} from './design-system.generated';

export function buildMachinePrompt(): string {
  return `# FT Design System - AI Rules
# Version: ${SYSTEM_VERSION} | Components: ${COMPONENT_COUNT}

## WORKFLOW CONTRACT (MANDATORY)
- Before writing/modifying UI code, read relevant files under specs/
- Before commit or PR, run: npm run check:tokens
- Before commit or PR for UI/component changes, run: npm run check:consistency
- Before commit or PR for component size/variant changes, run: npm run check:size-contract
- Before commit or PR touching explorer configs, run: npm run check:explorer-inspector
- Before merging dependency updates, run: npm run check:drift
- For PR reviews, follow: specs/review-checklist.md

## IMPORTS
css: import 'ft-design-system/styles';
components: import { Button, Input, Table } from 'ft-design-system';
provider: import { FTProvider } from 'ft-design-system';

## FORBIDDEN (Never generate these)
- Arbitrary background/text/border with hex: bg-[ #HEX ], text-[ #HEX ]
- Arbitrary with CSS vars: bg-[ var(--name) ], text-[ var(--name) ]
- Dimension overrides on components: h-[ X ], w-[ X ], rounded-[ X ], p-[ X ]
- CSS vars with underscore: var(--some_token)
- CSS vars with slash: var(--some/token)
- Hardcoded font: fontSize: '16px'

## REQUIRED
- Components are AI-protected by default
- Use size prop: size="sm"|"md"|"lg"
- Use variant prop for styling
- Table rows must have 'id' field
- Table columns use 'title' not 'header'

## COMPONENT API
Button: variant=primary|secondary|destructive|text|link|ghost|dashed, size=sm|md|lg
Input: label, placeholder, error, helperText, size=sm|md|lg
Badge: variant=primary|secondary|danger|success|warning|neutral (NOT 'error')
Table: compose with TableHeader/TableBody/TableRow/TableHead/TableCell
Modal: open, onOpenChange, children=ModalContent

## COLORS (use Tailwind classes)
primary-700=#434F64 → bg-primary-700
critical=#ff3532 → text-critical
positive=#00c637 → text-positive

## SPACING (8-point grid, use --spacing-x* canonical names)
${SPACING_SUMMARY}
${HALF_STEP_SUMMARY}

## TYPOGRAPHY (rem-based)
${TYPOGRAPHY_SUMMARY}

## BORDER RADIUS
${RADIUS_SUMMARY}

## EXAMPLES
<Button variant="primary" size="md">Save</Button>
<Input label="Email" size="md" />
<Table><TableHeader><TableRow><TableHead>Name</TableHead></TableRow></TableHeader><TableBody><TableRow><TableCell>John</TableCell></TableRow></TableBody></Table>
<Badge variant="danger">Error</Badge>`;
}

export function buildHumanPrompt(): string {
  return `You are an expert frontend developer using the FT Design System.

## Quick Setup
\`\`\`tsx
import 'ft-design-system/styles';
import { Button, Input, Table } from 'ft-design-system';
\`\`\`

## Critical Rules

### 1. Components are AI-protected by default
\`\`\`tsx
// ✅ CORRECT - AI-protected by default
import { Button } from 'ft-design-system';

// ⚠️ ADVANCED - unprotected (use only if needed)
import { Button } from 'ft-design-system/core';
\`\`\`

### 2. Never use arbitrary Tailwind values
\`\`\`tsx
// ❌ FORBIDDEN - no hardcoded hex colors or arbitrary values
<div className="bg-[ #434F64 ] text-[ #838C9D ]" />
<Button className="h-12 rounded-lg p-4" />

// ✅ CORRECT
<div className="bg-primary-700 text-tertiary" />
<Button size="lg" variant="primary" />
\`\`\`

### 3. Use component props, not utility classes
\`\`\`tsx
// ❌ WRONG - Tailwind classes ignored on FT components
<Button className="h-16 text-lg-rem">Big Button</Button>

// ✅ CORRECT - use size prop
<Button size="lg">Big Button</Button>
\`\`\`

### 4. Component-specific rules
- **Table**: rows need \`id\`, columns use \`title\` (not \`header\`)
- **Badge**: use \`danger\` not \`error\`
- **Button**: variants are primary|secondary|destructive|text|link|ghost|dashed

### 5. Typography
Use rem-based classes: \`text-sm-rem\`, \`text-md-rem\`, \`text-lg-rem\`, \`text-3xl-rem\`, \`text-4xl-rem\`, etc.

### 6. Spacing
Use canonical \`--spacing-x*\` tokens (not legacy \`--x*\`):
\`--spacing-x1\` (4px) through \`--spacing-x24\` (96px), plus half-steps \`--spacing-x1-5\` (6px), \`--spacing-x2-5\` (10px), \`--spacing-x3-5\` (14px).

### 7. Quality Gates
Before commit: \`npm run check:tokens\`
Before UI/component PRs: \`npm run check:consistency\`
Before size/variant changes: \`npm run check:size-contract\`
Before explorer metadata changes: \`npm run check:explorer-inspector\`
Before merging deps: \`npm run check:drift\`

## Component Reference
- ${COMPONENT_COUNT} total components across atoms, molecules, organisms, charts
- Access metadata: \`import registry from 'ft-design-system/registry'\`
- See examples: \`import examples from 'ft-design-system/examples'\``;
}

export function buildCursorRules(): string {
  return `# .cursor/rules or .cursorrules

Use FT Design System for all UI components.

## Imports
- CSS: \`import 'ft-design-system/styles';\`
- Components: \`import { X } from 'ft-design-system';\` (AI-protected by default)

## NEVER generate
- Arbitrary color classes with hex values
- Height, width, rounded, padding utilities on FT components
- CSS variables with underscores or slashes

## ALWAYS use
- \`size="sm|md|lg"\` prop for component sizing
- \`variant="..."\` prop for styling
- Theme classes: \`bg-primary-700\`, \`text-tertiary\`
- Canonical spacing: \`var(--spacing-x4)\` not \`var(--x4)\`

## Quality Gates
- Before commit: \`npm run check:tokens\`
- Before UI/component PRs: \`npm run check:consistency\`
- Before size/variant changes: \`npm run check:size-contract\`
- Before explorer metadata changes: \`npm run check:explorer-inspector\`
- Before merging deps: \`npm run check:drift\`

## Component Rules
- Table: columns use \`title\` not \`header\`, rows need \`id\`
- Badge: variants are danger|success|warning (not error)
- Button: primary|secondary|destructive|text|link|ghost|dashed`;
}
