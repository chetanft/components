# UI Component PR Review Checklist

A concise checklist for reviewing any UI component pull request against the FT Design System standards. Based on recommendations from [hvpandya.com](https://hvpandya.com).

---

## 1. Token Compliance

- [ ] No hardcoded hex colors — use CSS custom properties (e.g. `var(--primary-700)` or Tailwind semantic classes)
- [ ] No hardcoded px spacing — use spacing tokens (`--x1` through `--x10`) or rem
- [ ] No hardcoded font sizes — use typography tokens (e.g. `text-sm-rem`, `text-md-rem`)
- [ ] No hardcoded border-radius — use radius tokens (`--radius-sm`, `--radius-md`, etc.)
- [ ] `npm run check:tokens` passes with no regressions

## 2. Spec Alignment

- [ ] Component follows its spec contract in `specs/components/`
- [ ] Props match the documented API contract
- [ ] All documented variants, sizes, and states are implemented
- [ ] If no spec exists, one has been created before merging

## 3. State Coverage

- [ ] Default, hover, focus, active, and disabled states are handled
- [ ] Loading/skeleton state included (if applicable)
- [ ] Empty state included (if applicable)
- [ ] Error state included (if applicable)

## 4. Spacing & Layout

- [ ] Uses standard spacing scale (`--x1` through `--x10`)
- [ ] Consistent gap and padding within the component
- [ ] Responsive behavior is documented and tested

## 5. Motion & Transitions

- [ ] Uses motion tokens for transitions (`--transition-fast`, `--transition-normal`)
- [ ] No hardcoded transition durations
- [ ] Respects `prefers-reduced-motion`

## 6. Accessibility

- [ ] Keyboard navigable
- [ ] Proper ARIA attributes present
- [ ] Color contrast meets WCAG AA
- [ ] Focus indicators are visible

## 7. Documentation

- [ ] Explorer/story exists and covers all variants
- [ ] Props are documented with JSDoc
- [ ] Cross-references (Uses / Used by) are current

## 8. Intentional Divergences

- [ ] Any deviation from design tokens is documented with an inline comment explaining why
- [ ] Divergences are listed in the component spec
