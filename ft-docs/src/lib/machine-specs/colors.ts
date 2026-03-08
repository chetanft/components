/**
 * Machine-readable spec builder for the Colors page.
 * Shared by the interactive UI toggle and the /machine/colors route.
 */

import { designTokens } from "../../../../src/tokens/design-tokens";

const colorFamilies = [
  { name: "primary", label: "Primary" },
  { name: "secondary", label: "Secondary" },
  { name: "tertiary", label: "Tertiary" },
  { name: "neutral", label: "Neutral" },
  { name: "positive", label: "Positive" },
  { name: "warning", label: "Warning" },
  { name: "danger", label: "Danger" },
];

function extractColorScales(
  mode: "lightMode" | "darkMode" | "nightMode" = "lightMode"
) {
  const colors: Record<string, Array<{ name: string; hex: string; cssVar: string; tailwindClass: string }>> = {};
  const baseColors = designTokens.baseColors[mode];

  for (const family of ["primary", "secondary", "tertiary", "neutral", "positive", "warning", "danger"]) {
    colors[family] = Object.entries(baseColors)
      .filter(([key]) => key.startsWith(family))
      .map(([key, value]) => {
        const shade = key.replace(family, "") || "0";
        return {
          name: `${family}-${shade}`,
          hex: value as string,
          cssVar: `--${family}-${shade}`,
          tailwindClass: `bg-${family}-${shade}`,
        };
      })
      .sort((a, b) => {
        const aNum = parseInt(a.name.split("-")[1]) || 0;
        const bNum = parseInt(b.name.split("-")[1]) || 0;
        return bNum - aNum;
      });
  }

  return colors;
}

export function buildColorsSpec(): string {
  const lines: string[] = ["# FT Design System — Color Tokens", ""];
  for (const mode of ["lightMode", "darkMode", "nightMode"] as const) {
    const label =
      mode === "lightMode" ? "Light" : mode === "darkMode" ? "Dark" : "Night";
    lines.push(`## ${label} Mode`);
    const scales = extractColorScales(mode);
    for (const family of colorFamilies) {
      const swatches = scales[family.name] || [];
      if (swatches.length === 0) continue;
      lines.push(`### ${family.label}`);
      for (const s of swatches) {
        lines.push(
          `${s.name}: ${s.hex}  css: var(${s.cssVar})  tw: ${s.tailwindClass}`
        );
      }
      lines.push("");
    }
  }
  return lines.join("\n");
}
