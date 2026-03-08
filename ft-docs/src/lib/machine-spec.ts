/**
 * Machine-readable spec builder for component documentation.
 * Used by the Machine view toggle on component pages and the Usage overlay.
 */

import type { StoryMeta, StoryDefinition } from "@/lib/story-loader";
import { getComponentGuideline } from "@/data/designer-guidelines";

export interface MachineSpecInput {
  variantOptions?: string[];
  sizeOptions?: string[];
  propNames?: string[];
  storyCount?: number;
}

export function buildMachineSpecFromInput(
  componentName: string,
  input: MachineSpecInput
): string {
  const guideline = getComponentGuideline(componentName);
  const lines: string[] = [];

  lines.push(`# ${componentName}`);

  if (guideline) {
    lines.push(`CATEGORY: ${guideline.category}`);
  }

  lines.push(`IMPORT: import { ${componentName} } from 'ft-design-system';`);

  if (guideline?.variants?.length) {
    lines.push(`VARIANTS: ${guideline.variants.map((v) => v.name).join(" | ")}`);
  } else if (input.variantOptions?.length) {
    lines.push(`VARIANTS: ${input.variantOptions.join(" | ")}`);
  }

  if (input.sizeOptions?.length) {
    lines.push(`SIZES: ${input.sizeOptions.join(" | ")}`);
  }

  if (input.propNames?.length) {
    lines.push(`PROPS: ${input.propNames.join(", ")}`);
  }

  if (guideline?.figmaLinks?.length) {
    guideline.figmaLinks.forEach((link) => {
      lines.push(`FIGMA: ${link}`);
    });
  }

  if (typeof input.storyCount === "number") {
    lines.push(`STORIES: ${input.storyCount}`);
  }

  if (guideline) {
    lines.push("");
    lines.push(`WHEN_TO_USE: ${guideline.whenToUse.join("; ")}`);
    lines.push(`WHEN_NOT_TO_USE: ${guideline.whenNotToUse.join("; ")}`);

    lines.push("");
    guideline.designDosAndDonts.forEach((pair) => {
      lines.push(`DO: ${pair.do}`);
      lines.push(`DONT: ${pair.dont}`);
    });

    if (guideline.relatedComponents.length > 0) {
      lines.push("");
      lines.push(`RELATED: ${guideline.relatedComponents.join(", ")}`);
    }
  }

  return lines.join("\n");
}

export function buildMachineSpec(
  componentName: string,
  meta: StoryMeta,
  stories: StoryDefinition[]
): string {
  return buildMachineSpecFromInput(componentName, {
    variantOptions: (meta.argTypes?.variant?.options as string[] | undefined) || [],
    sizeOptions: (meta.argTypes?.size?.options as string[] | undefined) || [],
    propNames: meta.argTypes
      ? Object.keys(meta.argTypes).filter((k) => k !== "children")
      : [],
    storyCount: stories.length,
  });
}
