/**
 * Machine-readable spec builder for the docs introduction page.
 * Shared by the interactive UI toggle and the /machine/docs route.
 */

export function buildDocsIntroSpec(): string {
  return [
    "# FT Design System — Documentation",
    "PURPOSE: entrypoint for FT Design System docs",
    "INSTALL: npm install ft-design-system",
    "KEY_AREAS: components, design tokens, AI prompts, CLI tools, charts, icons, colors",
    "MACHINE_ENTRYPOINTS:",
    "- /machine/docs/components/<component>",
    "- /machine/docs/ai-prompts",
    "- /machine/docs/for-designers",
    "- /machine/docs/for-developers",
    "- /machine/docs/storybook",
    "- /machine/docs/npm-package",
    "- /machine/docs/global-css",
    "- /machine/docs/accessibility",
    "- /machine/docs/migrations",
    "- /machine/colors",
    "- /machine/icons",
  ].join("\n");
}
