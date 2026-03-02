/**
 * Machine-readable spec builder for component documentation.
 * Used by the Machine view toggle on component pages and the Usage overlay.
 */

import type { StoryMeta, StoryDefinition } from "@/lib/story-loader";
import { getComponentGuideline } from "@/data/designer-guidelines";

export function buildMachineSpec(
  componentName: string,
  meta: StoryMeta,
  stories: StoryDefinition[]
): string {
  const guideline = getComponentGuideline(componentName);
  const lines: string[] = [];

  lines.push(`# ${componentName}`);

  if (guideline) {
    lines.push(`CATEGORY: ${guideline.category}`);
  }

  lines.push(`IMPORT: import { ${componentName} } from 'ft-design-system';`);

  // Variants from guidelines or argTypes
  if (guideline?.variants) {
    lines.push(
      `VARIANTS: ${guideline.variants.map((v) => v.name).join(" | ")}`
    );
  } else if (meta.argTypes?.variant?.options) {
    lines.push(
      `VARIANTS: ${(meta.argTypes.variant.options as string[]).join(" | ")}`
    );
  }

  // Sizes from argTypes
  if (meta.argTypes?.size?.options) {
    lines.push(
      `SIZES: ${(meta.argTypes.size.options as string[]).join(" | ")}`
    );
  }

  // Props from argTypes
  if (meta.argTypes) {
    const propNames = Object.keys(meta.argTypes).filter(
      (k) => k !== "children"
    );
    if (propNames.length > 0) {
      lines.push(`PROPS: ${propNames.join(", ")}`);
    }
  }

  // Figma links
  if (guideline?.figmaLinks && guideline.figmaLinks.length > 0) {
    guideline.figmaLinks.forEach((link) => {
      lines.push(`FIGMA: ${link}`);
    });
  }

  // Stories count
  lines.push(`STORIES: ${stories.length}`);

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
