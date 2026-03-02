export type ExplorerMode = "matrix" | "playground" | "both";
export type PreviewMode = "inline" | "positioned";
export type ExplorerBehavior =
  | "inline"
  | "top-overlay"
  | "right-overlay"
  | "center-overlay"
  | "anchored"
  | "layout"
  | "chart";
export type DimensionKey = "type" | "state" | "size" | "shape" | "icon" | "theme" | "other";

export interface ExplorerScenario {
  id: string;
  label: string;
  story?: string;
  args?: Record<string, unknown>;
}

export interface ExplorerRow {
  id: string;
  label: string;
  values?: Partial<Record<DimensionKey, string>>;
  scenarios: ExplorerScenario[];
}

export interface ExplorerPositionedPreview {
  enabled: boolean;
  placement?: "top-right" | "top-left" | "top-center" | "bottom-right" | "bottom-left";
  width?: number;
}

export interface ExplorerConfig {
  mode: ExplorerMode;
  baseStory?: string;
  behavior?: ExplorerBehavior;
  rows?: ExplorerRow[];
  defaultRowId?: string;
  defaultScenarioId?: string;
  previewMode?: PreviewMode;
  positionedPreview?: ExplorerPositionedPreview;
  /** Show Glass Mode chips (Normal/Subtle/Glass/Prominent) with gradient backdrop */
  supportsGlass?: boolean;
  playground?: {
    story?: string;
    controlsAllowlist?: string[];
    controlsDenylist?: string[];
  };
}
