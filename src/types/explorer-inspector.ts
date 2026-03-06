export type ExplorerInspectorMode = "off" | "box-model" | "token-spacing" | "both";

export interface ExplorerInspectorSpacingHints {
  outerXToken?: string;
  outerYToken?: string;
  innerGapToken?: string;
  paddingXToken?: string;
  paddingYToken?: string;
}

export interface ExplorerInspectorAnchors {
  root?: string;
  content?: string;
  icon?: string;
  label?: string;
  prefix?: string;
  suffix?: string;
}

export interface ComponentInspectorSpec {
  enabled?: boolean;
  defaultMode?: ExplorerInspectorMode;
  rootSelector?: string;
  iconSelector?: string;
  labelSelector?: string;
  anchors?: ExplorerInspectorAnchors;
  spacingHints?: ExplorerInspectorSpacingHints;
}

export interface InspectorSpecValidationResult {
  valid: boolean;
  errors: string[];
}

export function validateInspectorSpec(spec?: ComponentInspectorSpec): InspectorSpecValidationResult {
  const errors: string[] = [];
  if (!spec) return { valid: true, errors };

  const validModes: ExplorerInspectorMode[] = ["off", "box-model", "token-spacing", "both"];
  if (spec.defaultMode && !validModes.includes(spec.defaultMode)) {
    errors.push(`defaultMode must be one of: ${validModes.join(", ")}`);
  }

  const tokenPattern = /^x\d+$/;
  const hintEntries = Object.entries(spec.spacingHints || {});
  for (const [key, value] of hintEntries) {
    if (!value) continue;
    if (!tokenPattern.test(value)) {
      errors.push(`spacingHints.${key} must use x-token format like "x6"`);
    }
  }

  const anchorEntries = Object.entries(spec.anchors || {});
  for (const [key, value] of anchorEntries) {
    if (!value) continue;
    if (typeof value !== "string") {
      errors.push(`anchors.${key} must be a CSS selector string`);
    }
  }

  return { valid: errors.length === 0, errors };
}

