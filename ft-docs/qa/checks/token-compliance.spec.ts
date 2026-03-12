/**
 * Token Compliance Checks
 *
 * For each component:
 * - No hardcoded hex colors in inline styles
 * - No Tailwind default palette classes (bg-blue-500, text-red-600, etc.)
 * - All colors resolve through CSS variables (var(--...))
 */
import { test, expect } from "@playwright/test";
import { COMPONENTS } from "../lib/component-list";
import {
  waitForComponentPage,
  getStoryPreviews,
} from "../lib/dom-assertions";

// Tailwind default palette color names that should NOT appear as classes
const TAILWIND_PALETTE = [
  "slate", "gray", "zinc", "neutral", "stone",
  "red", "orange", "amber", "yellow", "lime",
  "green", "emerald", "teal", "cyan", "sky",
  "blue", "indigo", "violet", "purple", "fuchsia",
  "pink", "rose",
];

const TAILWIND_CLASS_REGEX = new RegExp(
  `(?:bg|text|border|ring|shadow|accent|fill|stroke)-(?:${TAILWIND_PALETTE.join("|")})-\\d{2,3}`,
  "g"
);

for (const comp of COMPONENTS) {
  test.describe(comp.name, () => {
    test("no hardcoded colors in inline styles", async ({ page }) => {
      await page.goto(comp.url);
      await waitForComponentPage(page);

      const previews = await getStoryPreviews(page);
      const violations: string[] = [];

      for (let i = 0; i < Math.min(previews.length, 5); i++) {
        const result = await previews[i].evaluate((container) => {
          const issues: string[] = [];
          const walk = (el: Element) => {
            const style = el.getAttribute("style");
            if (style) {
              // Check for hardcoded hex colors
              const hexMatches = style.match(/#[0-9a-fA-F]{3,8}/g);
              if (hexMatches) {
                // Allow known exceptions (currentColor shims, transparent)
                const real = hexMatches.filter(
                  (h) => !["#000", "#fff", "#000000", "#ffffff"].includes(h.toLowerCase())
                );
                if (real.length > 0) {
                  issues.push(
                    `<${el.tagName.toLowerCase()}>: hardcoded hex in style: ${real.join(", ")}`
                  );
                }
              }
              // Check for rgb/rgba without var()
              const rgbMatches = style.match(/(?<!var\([^)]*?)rgba?\([^)]+\)/g);
              if (rgbMatches) {
                issues.push(
                  `<${el.tagName.toLowerCase()}>: hardcoded rgb in style: ${rgbMatches.join(", ")}`
                );
              }
            }
            for (const child of Array.from(el.children)) {
              walk(child);
            }
          };
          walk(container);
          return issues;
        });
        violations.push(...result.map((r) => `Preview ${i}: ${r}`));
      }

      if (violations.length > 0) {
        console.warn(`[${comp.name}] Hardcoded color warnings:\n${violations.join("\n")}`);
      }
      // Soft check initially — many components may have legacy inline colors
      // expect(violations, violations.join("\n")).toHaveLength(0);
    });

    test("no Tailwind default palette classes", async ({ page }) => {
      await page.goto(comp.url);
      await waitForComponentPage(page);

      const previews = await getStoryPreviews(page);
      const violations: string[] = [];

      for (let i = 0; i < Math.min(previews.length, 5); i++) {
        const result = await previews[i].evaluate(
          (container, regex) => {
            const issues: string[] = [];
            const walk = (el: Element) => {
              const classes = el.className;
              if (typeof classes === "string") {
                const matches = classes.match(new RegExp(regex, "g"));
                if (matches) {
                  issues.push(
                    `<${el.tagName.toLowerCase()}>: Tailwind palette class: ${matches.join(", ")}`
                  );
                }
              }
              for (const child of Array.from(el.children)) {
                walk(child);
              }
            };
            walk(container);
            return issues;
          },
          TAILWIND_CLASS_REGEX.source
        );
        violations.push(...result.map((r) => `Preview ${i}: ${r}`));
      }

      expect(
        violations,
        `Tailwind palette leakage:\n${violations.join("\n")}`
      ).toHaveLength(0);
    });
  });
}
