/**
 * QA spec loader — merges per-component specs with defaults.
 */
import * as fs from "fs";
import * as path from "path";

export interface StructuralSpec {
  minStoryCount: number;
  requirePreviewVisible: boolean;
  requireNoEmptyPreviews: boolean;
  requireNoOverflow: boolean;
  requiredStories?: string[];
  requireDisabledState?: boolean;
}

export interface SemanticSpec {
  requireTextContent: boolean;
  requireAriaLabelsOnInteractive: boolean;
  skipTextCheck?: boolean; // For purely visual components (Divider, Spacer, etc.)
  requireVisibleSelectedState?: boolean;
}

export interface LayoutSpec {
  maxAllowedOverflowPx: number;
  requireNoClipping: boolean;
  requireNoTextWrapping?: boolean;
  requireFullRowHover?: boolean;
  requireDarkSurfaceContrast?: boolean;
}

export interface TokenSpec {
  disallowHardcodedColors: boolean;
  allowedColorPatterns: string[];
}

export interface VisualSpec {
  diffThreshold: number;
  themes: string[];
}

export interface QASpec {
  structural: StructuralSpec;
  semantic: SemanticSpec;
  layout: LayoutSpec;
  tokens: TokenSpec;
  visual: VisualSpec;
}

const SPEC_DIR = path.resolve(__dirname, "../../qa-specs");

function readJSON(filePath: string): Record<string, any> | null {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch {
    return null;
  }
}

function deepMerge(base: any, override: any): any {
  const result = { ...base };
  for (const key of Object.keys(override)) {
    if (
      typeof override[key] === "object" &&
      override[key] !== null &&
      !Array.isArray(override[key]) &&
      typeof base[key] === "object"
    ) {
      result[key] = deepMerge(base[key], override[key]);
    } else {
      result[key] = override[key];
    }
  }
  return result;
}

export function loadSpec(componentSlug: string): QASpec {
  const defaults = readJSON(path.join(SPEC_DIR, "_defaults.json")) || {};
  const component = readJSON(path.join(SPEC_DIR, `${componentSlug}.qa.json`));
  const merged = component ? deepMerge(defaults, component) : defaults;
  return merged as QASpec;
}
