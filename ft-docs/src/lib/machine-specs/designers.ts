/**
 * Machine-readable spec builder for the "For Designers" page.
 * Shared by the interactive UI toggle and the /machine/docs/for-designers route.
 */

import { getComponentsWithGuidelines } from "@/data/designer-guidelines";
import { COMPONENT_COUNT } from "@/data/design-system.generated";

export function buildDesignersSpec(): string {
  const componentsWithGuidelines = getComponentsWithGuidelines();
  const guidelineCount = componentsWithGuidelines.length;
  const figmaLinkedCount = 22;
  const codeConnectCount = 22;

  return [
    "# FT Design System — For Designers",
    "PURPOSE: designer-facing reference for Figma, tokens, component specs, and handoff",
    `TOTAL_COMPONENTS: ${COMPONENT_COUNT}`,
    `GUIDELINE_COMPONENTS: ${guidelineCount}`,
    `FIGMA_LINKED_COMPONENTS: ${figmaLinkedCount}`,
    `CODE_CONNECT_COMPONENTS: ${codeConnectCount}`,
    "PRIMARY_FIGMA_FILE: https://www.figma.com/design/HMS1wPnsS1fuPyN1xSEVAH/Components",
    "DESIGN_RESOURCES:",
    "- /machine/docs/global-css",
    "- /machine/docs/components/<component>",
    "- /machine/colors",
    "",
    "HANDOFF_PROCESS:",
    "1. Design with FT components in Figma",
    "2. Use FT tokens for color, spacing, and typography",
    "3. Annotate variants and states",
    "4. Share component-specific Figma links",
    "5. Validate implementation in docs or Storybook",
  ].join("\n");
}
