/**
 * Machine-readable spec builders — barrel export.
 *
 * Each builder returns a plain-text string suitable for crawlers / LLMs.
 * Used by both the interactive view-mode toggle and the /machine/* API routes.
 */

export { buildDocsIntroSpec } from "./docs-intro";
export { buildAiPromptsSpec } from "./ai-prompts";
export { buildDevelopersSpec } from "./developers";
export { buildDesignersSpec } from "./designers";
export { buildGlobalCssSpec } from "./global-css";
export { buildAccessibilitySpec } from "./accessibility";
export { buildStorybookSpec } from "./storybook";
export { buildNpmPackageSpec } from "./npm-package";
export { buildMigrationsSpec } from "./migrations";
export { buildIconsSpec } from "./icons";
export { buildColorsSpec } from "./colors";
