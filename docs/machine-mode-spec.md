# Machine Mode Spec

## Purpose

Machine mode is the machine-readable content layer for `ft-docs`. It is distinct from `llms.txt`:

- `llms.txt`: discovery entrypoint for the overall system
- machine mode: route-level machine-readable payload for selected docs pages
- `AI_CONTEXT.md`: local/project workflow contract for AI coding assistants

## Implementation vs. Public Availability

Machine mode has two layers:

- **Repo implementation**: Route handlers (`ft-docs/src/app/machine/*/route.ts`), page-level `useViewMode()` branches, and `MachineSpecView` renderers. These exist in source and are verified by `npm run check:machine-mode`.
- **Public surface**: The `/machine/*` server routes and `?view=machine` client toggles become publicly accessible only after the `ft-docs` app is deployed to the hosting platform (currently Netlify). Source coverage does not guarantee public availability.
- **Server routes** (`/machine/*`): Return `text/plain`, are crawler-friendly, and are the recommended entrypoint for AI tools and automated consumers.
- **Client toggle** (`?view=machine`): Requires JavaScript hydration. Useful for interactive preview but not suitable for crawlers or headless fetches.

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

## Deployment Verification

Source-level coverage (`npm run check:machine-mode`) confirms that route handlers and machine-mode branches exist in the codebase. It does not verify that routes are publicly reachable.

After deploying `ft-docs` to Netlify, verify public availability by running:

```bash
# Smoke test: confirm each /machine/* route returns 200 with text/plain
SITE_URL="https://ft-design-system.dev"
for path in /machine/docs /machine/docs/components/button /machine/docs/ai-prompts \
  /machine/docs/for-designers /machine/docs/for-developers /machine/docs/storybook \
  /machine/docs/npm-package /machine/docs/global-css /machine/docs/accessibility \
  /machine/docs/migrations /machine/icons /machine/colors; do
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$SITE_URL$path")
  echo "$path -> $STATUS"
done
```

If any route returns a non-200 status, the deployment may be missing the `/machine` rewrite rules or the build did not include the route handlers.

