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

export interface ExplorerInspectorConfig {
  enabled?: boolean;
  defaultMode?: ExplorerInspectorMode;
  rootSelector?: string;
  iconSelector?: string;
  labelSelector?: string;
  anchors?: ExplorerInspectorAnchors;
  spacingHints?: ExplorerInspectorSpacingHints;
}

