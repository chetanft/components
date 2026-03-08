/**
 * Machine-readable spec builder for the "For Developers" page.
 * Shared by the interactive UI toggle and the /machine/docs/for-developers route.
 */

export function buildDevelopersSpec(): string {
  return [
    "# FT Design System — For Developers",
    "PURPOSE: developer setup, CLI commands, imports, workflow gates",
    "INSTALL:",
    "- npm install ft-design-system",
    "- yarn add ft-design-system",
    "- pnpm add ft-design-system",
    "",
    "CLI:",
    "- npx ft-design-system setup",
    "- npx ft-design-system verify",
    "- npx ft-design-system update",
    "- npx ft-design-system init",
    "",
    "IMPORTS:",
    "- import 'ft-design-system/styles.css';",
    "- import { Button, Input, Badge, Table } from 'ft-design-system';",
    "",
    "QUALITY_GATES:",
    "- npm run check:tokens",
    "- npm run check:consistency",
    "- npm run check:size-contract",
    "- npm run check:machine-mode",
    "- npm run check:drift",
    "",
    "RELATED_DOCS:",
    "- /machine/docs/npm-package",
    "- /machine/docs/ai-prompts",
    "- /machine/docs/global-css",
    "- /machine/docs/components/<component>",
  ].join("\n");
}
