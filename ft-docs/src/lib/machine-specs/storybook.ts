/**
 * Machine-readable spec builder for the Storybook page.
 * Shared by the interactive UI toggle and the /machine/docs/storybook route.
 */

export function buildStorybookSpec(): string {
  return [
    "# FT Design System — Storybook",
    "PURPOSE: local interactive playground for components and variants",
    "URL: http://localhost:6006",
    "RUN:",
    "- cd /path/to/components",
    "- npm run storybook",
    "",
    "INCLUDES:",
    "- interactive playground for components",
    "- live prop controls",
    "- code examples",
    "- component documentation",
  ].join("\n");
}
