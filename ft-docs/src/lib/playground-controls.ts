/**
 * Playground Controls Builder
 *
 * Generates a list of control definitions from Storybook argTypes
 * that can be rendered as native HTML form controls.
 */

export type ControlType =
  | "select"
  | "boolean"
  | "text"
  | "number"
  | "color"
  | "range"
  | "radio";

export interface ControlDef {
  name: string;
  label: string;
  type: ControlType;
  defaultValue?: unknown;
  options?: string[];
  min?: number;
  max?: number;
  step?: number;
}

/** Keys that are always excluded from auto-generated controls */
const BUILT_IN_DENY = new Set([
  "children",
  "className",
  "style",
  "ref",
  "key",
  "as",
  "asChild",
]);

/**
 * Build an array of ControlDef from Storybook argTypes + config filters.
 */
export function buildControls(
  argTypes: Record<string, any> | undefined,
  config?: {
    controlsAllowlist?: string[];
    controlsDenylist?: string[];
  }
): ControlDef[] {
  if (!argTypes) return [];

  const allowSet = config?.controlsAllowlist
    ? new Set(config.controlsAllowlist)
    : null;
  const denySet = new Set([
    ...BUILT_IN_DENY,
    ...(config?.controlsDenylist ?? []),
  ]);

  const controls: ControlDef[] = [];

  for (const [name, spec] of Object.entries(argTypes)) {
    // Filter out disabled or denied entries
    if (spec?.table?.disable === true) continue;
    if (denySet.has(name)) continue;
    if (allowSet && !allowSet.has(name)) continue;

    // Skip functions and complex objects
    const controlSpec = spec?.control;
    if (controlSpec === false) continue;

    const def = resolveControl(name, spec);
    if (def) controls.push(def);
  }

  return controls;
}

function resolveControl(
  name: string,
  spec: Record<string, any>
): ControlDef | null {
  const controlSpec = spec.control;
  const controlType: string | undefined =
    typeof controlSpec === "string"
      ? controlSpec
      : typeof controlSpec === "object"
        ? controlSpec?.type
        : undefined;

  const label =
    spec.name ??
    name
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (s: string) => s.toUpperCase())
      .trim();

  // select / radio
  if (
    controlType === "select" ||
    controlType === "radio" ||
    controlType === "inline-radio"
  ) {
    const options: string[] =
      spec.options ?? controlSpec?.options ?? [];
    if (options.length === 0) return null;
    return {
      name,
      label,
      type: controlType === "select" ? "select" : "radio",
      options,
    };
  }

  // boolean
  if (controlType === "boolean" || spec.type === "boolean") {
    return { name, label, type: "boolean" };
  }

  // number / range
  if (controlType === "number" || controlType === "range") {
    return {
      name,
      label,
      type: controlType as ControlType,
      min: controlSpec?.min,
      max: controlSpec?.max,
      step: controlSpec?.step,
    };
  }

  // color
  if (controlType === "color") {
    return { name, label, type: "color" };
  }

  // text (explicit or inferred)
  if (
    controlType === "text" ||
    spec.type === "string" ||
    (!controlType && typeof spec.defaultValue === "string")
  ) {
    return { name, label, type: "text" };
  }

  // Fallback: if we have options but no control type, treat as select
  if (spec.options && Array.isArray(spec.options) && spec.options.length > 0) {
    return { name, label, type: "select", options: spec.options };
  }

  return null;
}
