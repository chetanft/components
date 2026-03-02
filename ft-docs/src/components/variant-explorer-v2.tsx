"use client";

import * as React from "react";
import { useMemo } from "react";
import type { StoryMeta, StoryDefinition } from "@/lib/story-loader";
import { getExplorerConfig } from "@/lib/explorer-config";
import { ExplorerMatrix } from "@/components/explorer-matrix";

interface VariantExplorerV2Props {
  stories: StoryDefinition[];
  meta: StoryMeta;
  componentName: string;
}

/**
 * Explorer V2 Container
 *
 * Reads explorer config from story meta and renders the appropriate mode:
 *   - "matrix"     → ExplorerMatrix
 *   - "playground"  → ExplorerPlayground
 *   - "both"        → sub-tabs for Matrix | Playground
 */
export function VariantExplorerV2({
  stories,
  meta,
  componentName,
}: VariantExplorerV2Props) {
  const config = useMemo(
    () => getExplorerConfig(meta, stories, componentName),
    [meta, stories, componentName]
  );

  const sharedProps = { meta, stories, componentName, config };
  return <ExplorerMatrix {...sharedProps} />;
}
