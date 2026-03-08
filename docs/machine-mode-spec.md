# Machine Mode Spec

## Purpose

Machine mode is the machine-readable content layer for `ft-docs`. It is distinct from `llms.txt`:

- `llms.txt`: discovery entrypoint for the overall system
- machine mode: route-level machine-readable payload for selected docs pages
- `AI_CONTEXT.md`: local/project workflow contract for AI coding assistants

## Required Coverage

These routes must provide machine mode:

- `/docs`
- `/docs/components/[component]`
- `/docs/ai-prompts`
- `/docs/for-designers`
- `/docs/for-developers`
- `/docs/storybook`
- `/docs/npm-package`
- `/docs/global-css`
- `/docs/accessibility`
- `/docs/migrations`
- `/icons`
- `/colors`
- `/charts/*`

These routes may remain human-only:

- `/`
- `/blocks`
- marketing/showcase shells and supporting navigation chrome

## Rendering Contract

Every machine-enabled route must:

1. read `viewMode` from `useViewMode()`
2. return plain text only when `viewMode === "machine"`
3. avoid app chrome, sidebars, cards, tabs, buttons, and decorative wrappers in machine mode
4. render through `MachineSpecView`
5. keep output deterministic and stable across reloads

## Content Contract

Machine mode content should prefer:

- title
- purpose/description
- imports or entrypoints where relevant
- key APIs, tokens, commands, or variants
- links or follow-up references only when they are authoritative

Machine mode should avoid:

- marketing copy
- visual-only descriptions
- duplicated prose from human UI sections
- interactive controls

## Governance

- Coverage is reported in `docs/audits/machine-mode-coverage.md`.
- `npm run check:machine-mode` enforces required route coverage.
- `npm run sync:docs` regenerates the coverage report.

