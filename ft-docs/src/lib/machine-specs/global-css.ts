/**
 * Machine-readable spec builder for the Global CSS page.
 * Returns the full CSS token content as plain text.
 */

import { GLOBAL_CSS_CONTENT } from "@/data/design-system.generated";

export function buildGlobalCssSpec(): string {
  return GLOBAL_CSS_CONTENT;
}
