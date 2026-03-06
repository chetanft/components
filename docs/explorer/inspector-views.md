# Explorer Inspector Views

This document defines the two inspector views available in Variant Explorer:

1. `Box Model`
2. `Token Spacing`

## Purpose

- Help designers and engineers inspect spacing, border, and padding without leaving explorer.
- Provide a token-oriented visual validation layer for component variants.
- Keep story previews interactive while overlays are pointer-transparent.

## Modes

- `off`: no overlay.
- `box-model`: shows measured root, padding/border/content areas with badges.
- `token-spacing`: shows spacing labels (`x*` tokens or px fallback) for outer spacing and inner gap.
- `both`: combines both overlays.
- Zoom levels: `1x`, `1.25x`, `1.5x`.
- Contrast: normal or high contrast badges/overlay colors.

### Keyboard Shortcuts

- `0`: Off
- `1`: Box Model
- `2`: Token Spacing
- `3`: Both
- `+` or `=`: zoom in
- `-`: zoom out
- `c`: toggle high contrast

## Story-Level Config

Use `parameters.explorer.inspector` in story meta:

```ts
explorer: {
  mode: 'matrix',
  inspector: {
    enabled: true,
    defaultMode: 'token-spacing',
    rootSelector: '[data-inspector-root]',
    spacingHints: {
      outerXToken: 'x6',
      outerYToken: 'x3',
      innerGapToken: 'x2',
    },
  },
}
```

## Measurement Strategy

- Explicit root via `rootSelector` (if provided).
- Fallback root detection using a single-child wrapper descent heuristic.
- Uses `ResizeObserver` + `getComputedStyle` to derive:
  - border widths
  - padding
  - gap
  - outer spacing relative to preview host

## Coverage Tracking

Run:

```bash
npm run generate:explorer-inspector-coverage
node scripts/check-explorer-inspector-spec.cjs
```

Outputs:

- `docs/reports/explorer-inspector-coverage.json`
- `docs/reports/explorer-inspector-coverage.md`
- `docs/reports/explorer-inspector-validation.json`
- `docs/reports/explorer-inspector-validation.md`

## Notes

- Token spacing mode uses nearest known spacing token (`x0..x38`) and falls back to px when needed.
- Prefer story metadata hints for exact design-token labels in critical components.

## Troubleshooting

- Portal content (Modal/Drawer): set `rootSelector` or `anchors.root` to the rendered panel container.
- Flex/grid wrappers: if overlays bind to an outer scaffold, add `anchors.root` to force correct measurement target.
- Compound controls (icon + label + suffix): add `anchors.icon`, `anchors.label`, `anchors.suffix` for precise token gaps.
- Non-measurable nodes (display none / zero-size): inspector gracefully falls back to no overlay and marks inference in reports.
