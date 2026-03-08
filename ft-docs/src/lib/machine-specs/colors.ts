/**
 * Machine-readable spec builder for the Colors page.
 * Shared by the interactive UI toggle and the /machine/colors route.
 */

import { designTokens } from "../../../../src/tokens/design-tokens";

// Standard Tailwind colors (duplicated from colors page to keep server-safe)
const standardTailwindColors: Record<string, Record<string, string>> = {
  teal: {
    50: "#ecf8f8", 100: "#c6ebeb", 200: "#a1dede", 300: "#7bd1d1",
    400: "#4cc0c0", 500: "#42bdbd", 600: "#3caaaa", 700: "#2e8484",
    800: "#215e5e", 900: "#143939", 950: "#0d2626",
  },
  indigo: {
    50: "#e6e9fe", 100: "#b5befd", 200: "#8393fb", 300: "#6377fa",
    400: "#213df8", 500: "#0828f7", 600: "#0724de", 700: "#061cad",
    800: "#04147c", 900: "#020c4a", 950: "#020831",
  },
  blue: {
    50: "#e8f4fd", 100: "#b9dff8", 200: "#8bc9f3", 300: "#5db4ef",
    400: "#37a2eb", 500: "#1793e8", 600: "#1584d1", 700: "#1067a2",
    800: "#0c4a74", 900: "#072c46", 950: "#051d2e",
  },
  pink: {
    50: "#ffe5eb", 100: "#ffb3c3", 200: "#ff809a", 300: "#ff6384",
    400: "#ff1a4a", 500: "#ff0036", 600: "#e60031", 700: "#b30026",
    800: "#80001b", 900: "#4d0010", 950: "#33000b",
  },
  gold: {
    50: "#fffbf0", 100: "#fff4d6", 200: "#ffe9b3", 300: "#ffdd8f",
    400: "#ffd16c", 500: "#ffbe07", 600: "#e6a806", 700: "#cc9205",
    800: "#b37c04", 900: "#996603", 950: "#805002",
  },
  charcoal: {
    50: "#f5f5f5", 100: "#e5e5e5", 200: "#d4d4d4", 300: "#a3a3a3",
    400: "#737373", 500: "#525252", 600: "#404040", 700: "#363636",
    800: "#2a2a2a", 900: "#211f1f", 950: "#1a1818",
  },
};

const colorFamilies = [
  { name: "primary", label: "Primary" },
  { name: "secondary", label: "Secondary" },
  { name: "tertiary", label: "Tertiary" },
  { name: "neutral", label: "Neutral" },
  { name: "positive", label: "Positive" },
  { name: "warning", label: "Warning" },
  { name: "danger", label: "Danger" },
  { name: "teal", label: "Teal" },
  { name: "indigo", label: "Indigo" },
  { name: "blue", label: "Blue" },
  { name: "pink", label: "Pink" },
  { name: "gold", label: "Gold" },
  { name: "charcoal", label: "Charcoal" },
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

  // Standard Tailwind colors
  for (const [colorName, shades] of Object.entries(standardTailwindColors)) {
    colors[colorName] = Object.entries(shades)
      .map(([shade, hex]) => ({
        name: `${colorName}-${shade}`,
        hex,
        cssVar: `--${colorName}-${shade}`,
        tailwindClass: `bg-${colorName}-${shade}`,
      }))
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
  // Standard Tailwind colors
  lines.push("## Standard Tailwind Colors");
  for (const [name, shades] of Object.entries(standardTailwindColors)) {
    lines.push(`### ${name}`);
    for (const [shade, hex] of Object.entries(shades).sort(
      ([a], [b]) => Number(b) - Number(a)
    )) {
      lines.push(`${name}-${shade}: ${hex}  tw: bg-${name}-${shade}`);
    }
    lines.push("");
  }
  return lines.join("\n");
}
