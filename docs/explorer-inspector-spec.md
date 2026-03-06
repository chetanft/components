# Explorer Inspector Spec

`parameters.explorer.inspector` defines how a component story participates in inspector overlays.

## Schema

```ts
type ExplorerInspectorMode = "off" | "box-model" | "token-spacing" | "both"

interface ComponentInspectorSpec {
  enabled?: boolean
  defaultMode?: ExplorerInspectorMode
  rootSelector?: string
  iconSelector?: string
  labelSelector?: string
  anchors?: {
    root?: string
    content?: string
    icon?: string
    label?: string
    prefix?: string
    suffix?: string
  }
  spacingHints?: {
    outerXToken?: string
    outerYToken?: string
    innerGapToken?: string
    paddingXToken?: string
    paddingYToken?: string
  }
}
```

## Rules

- `defaultMode` must be one of `off | box-model | token-spacing | both`.
- `spacingHints.*` values must use x-token form (`x2`, `x3`, `x6`, ...).
- `anchors` may only use: `root`, `content`, `icon`, `label`, `prefix`, `suffix`.
- If `defaultMode` includes token spacing and no hints are provided, fallback inference is used.

## Validation

Run:

```bash
node scripts/check-explorer-inspector-spec.cjs
```

Strict mode (warnings fail):

```bash
node scripts/check-explorer-inspector-spec.cjs --strict
```

Outputs:

- `docs/reports/explorer-inspector-validation.json`
- `docs/reports/explorer-inspector-validation.md`

