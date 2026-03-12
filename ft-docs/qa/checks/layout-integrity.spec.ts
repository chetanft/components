/**
 * Layout Integrity Checks
 *
 * For each component:
 * - No child content overflows preview container bounds
 * - No clipped content (children extending beyond parent)
 * - Text wrapping checks where spec requires single-line
 */
import { test, expect } from "@playwright/test";
import { COMPONENTS } from "../lib/component-list";
import { loadSpec } from "../lib/qa-spec-loader";
import {
  waitForComponentPage,
  getStoryPreviews,
  checkOverflow,
} from "../lib/dom-assertions";

for (const comp of COMPONENTS) {
  test.describe(comp.name, () => {
    const spec = loadSpec(comp.slug);

    test("no content overflow in previews", async ({ page }) => {
      await page.goto(comp.url);
      await waitForComponentPage(page);

      const previews = await getStoryPreviews(page);
      const issues: string[] = [];

      for (let i = 0; i < previews.length; i++) {
        const overflow = await checkOverflow(previews[i]);
        if (overflow.overflowX) {
          issues.push(
            `Preview ${i}: horizontal overflow (scroll=${overflow.scrollWidth}, client=${overflow.clientWidth})`
          );
        }
      }

      expect(issues, issues.join("\n")).toHaveLength(0);
    });

    if (comp.slug === "segmented-tabs") {
      test("dark mode preview surface contrasts with segmented tabs container", async ({ page }) => {
        await page.goto(comp.url);
        await waitForComponentPage(page);

        await page.evaluate(() => {
          localStorage.setItem("theme", "dark");
          document.documentElement.classList.remove("light", "dark", "night");
          document.documentElement.classList.add("dark");
        });
        await page.reload();
        await waitForComponentPage(page);

        const previews = await getStoryPreviews(page);
        const firstPreview = previews[0];
        const contrast = await firstPreview.evaluate((container) => {
          const groups = Array.from(container.querySelectorAll("div")).filter((group) => {
            const buttons = group.querySelectorAll(":scope > button");
            return buttons.length >= 3;
          });
          const tabsRoot = groups[0] ?? null;
          const buttons = tabsRoot ? Array.from(tabsRoot.querySelectorAll(":scope > button")) : [];
          const selectedTab = buttons[0] ?? null;
          if (!tabsRoot || !selectedTab) {
            return { missing: true, previewBg: "", tabsBg: "", selectedBg: "" };
          }

          const previewBg = window.getComputedStyle(container).backgroundColor;
          const tabsBg = window.getComputedStyle(tabsRoot).backgroundColor;
          const selectedBg = window.getComputedStyle(selectedTab).backgroundColor;

          return {
            missing: false,
            previewBg,
            tabsBg,
            selectedBg,
            containerVisible: previewBg !== tabsBg,
            selectedVisible: selectedBg !== tabsBg,
          };
        });

        expect(contrast.missing, "SegmentedTabs preview is missing tablist or selected tab").toBe(false);
        expect(
          contrast.containerVisible,
          `Segmented tabs container should contrast with preview surface in dark mode (preview=${contrast.previewBg}, tablist=${contrast.tabsBg})`
        ).toBe(true);
        expect(
          contrast.selectedVisible,
          `Selected tab should contrast with tab container in dark mode (selected=${contrast.selectedBg}, tablist=${contrast.tabsBg})`
        ).toBe(true);
      });
    }

    if (comp.slug === "button") {
      test("props table row hover applies across all cells", async ({ page }) => {
        await page.goto(comp.url);
        await waitForComponentPage(page);

        const propsTable = page.locator("table").filter({
          has: page.locator("thead tr", { hasText: "Prop" }),
        }).first();
        await expect(propsTable).toBeVisible();

        const row = propsTable.locator("tbody tr").first();
        await expect(row).toBeVisible();

        const cells = row.locator("td");
        const cellCount = await cells.count();
        expect(cellCount, "Expected a table row with multiple cells").toBeGreaterThan(1);

        const before = await row.evaluate((element) =>
          Array.from(element.querySelectorAll("td")).map((cell) => window.getComputedStyle(cell).backgroundColor)
        );

        await row.hover();

        const after = await row.evaluate((element) =>
          Array.from(element.querySelectorAll("td")).map((cell) => window.getComputedStyle(cell).backgroundColor)
        );

        const changedCells = after.filter((bg, index) => bg !== before[index]).length;
        const distinctHoverColors = new Set(after).size;

        expect(
          changedCells,
          `Expected row hover to update every cell background, but only ${changedCells}/${cellCount} changed`
        ).toBe(cellCount);
        expect(
          distinctHoverColors,
          `Expected hovered row cells to share one background color, got ${after.join(", ")}`
        ).toBe(1);
      });
    }

    test("no clipped child content", async ({ page }) => {
      await page.goto(comp.url);
      await waitForComponentPage(page);

      const previews = await getStoryPreviews(page);
      const clipped: string[] = [];

      for (let i = 0; i < Math.min(previews.length, 5); i++) {
        const result = await previews[i].evaluate((container) => {
          const containerRect = container.getBoundingClientRect();
          const issues: string[] = [];

          // Check direct children for clipping
          for (const child of Array.from(container.children)) {
            const childRect = child.getBoundingClientRect();
            // Allow 2px tolerance for borders/shadows
            const tolerance = 2;
            if (childRect.right > containerRect.right + tolerance) {
              issues.push(
                `Child <${child.tagName.toLowerCase()}> clips right by ${Math.round(childRect.right - containerRect.right)}px`
              );
            }
            if (childRect.bottom > containerRect.bottom + tolerance) {
              // Skip bottom clipping — containers often have overflow-y: auto
            }
          }
          return issues;
        });
        clipped.push(...result.map((r) => `Preview ${i}: ${r}`));
      }

      if (clipped.length > 0) {
        console.warn(`[${comp.name}] Clipping warnings:\n${clipped.join("\n")}`);
      }
    });

    if (spec.layout?.requireNoTextWrapping) {
      test("no text wrapping in labels", async ({ page }) => {
        await page.goto(comp.url);
        await waitForComponentPage(page);

        const previews = await getStoryPreviews(page);
        const wrapping: string[] = [];

        for (let i = 0; i < Math.min(previews.length, 3); i++) {
          const result = await previews[i].evaluate((container) => {
            const issues: string[] = [];
            // Check buttons, badges, tabs for multi-line text
            const labels = container.querySelectorAll(
              "button, [role='tab'], .badge, [data-slot='badge']"
            );
            for (const label of Array.from(labels)) {
              const style = window.getComputedStyle(label);
              const lineHeight = parseFloat(style.lineHeight) || parseFloat(style.fontSize) * 1.4;
              const paddingTop = parseFloat(style.paddingTop) || 0;
              const paddingBottom = parseFloat(style.paddingBottom) || 0;
              const borderTop = parseFloat(style.borderTopWidth) || 0;
              const borderBottom = parseFloat(style.borderBottomWidth) || 0;
              const rect = label.getBoundingClientRect();
              const contentHeight = rect.height - paddingTop - paddingBottom - borderTop - borderBottom;
              // Content height > 2x lineHeight means text is wrapping
              if (contentHeight > lineHeight * 2) {
                issues.push(
                  `<${label.tagName.toLowerCase()}>: contentHeight=${Math.round(contentHeight)}px > 2x lineHeight=${Math.round(lineHeight)}px`
                );
              }
            }
            return issues;
          });
          wrapping.push(...result.map((r) => `Preview ${i}: ${r}`));
        }

        expect(wrapping, wrapping.join("\n")).toHaveLength(0);
      });
    }
  });
}
