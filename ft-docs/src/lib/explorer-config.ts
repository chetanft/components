/**
 * Explorer Config Reader
 *
 * Reads story-level `parameters.explorer` and returns
 * a fully-resolved ExplorerConfig.
 */

import type { StoryMeta, StoryDefinition } from "./story-loader";
import type { ExplorerConfig } from "@/types/explorer";

/**
 * Resolve the explorer config for a component.
 *
 * Priority:
 *   1. Explicit `parameters.explorer` on the story meta
 *   2. Fallback: playground-only mode (works for any component)
 */
export function getExplorerConfig(
  meta: StoryMeta,
  stories: StoryDefinition[],
  _componentName: string
): ExplorerConfig {
  const explicit = meta.parameters?.explorer as ExplorerConfig | undefined;

  if (explicit) {
    return {
      ...explicit,
      previewMode: explicit.previewMode ?? "inline",
    };
  }

  // Auto-detect a good default story for the playground
  const defaultStory = stories.find((s) => s.name === "Default") ?? stories[0];

  return {
    mode: "playground",
    previewMode: "inline",
    playground: {
      story: defaultStory?.name,
    },
  };
}
