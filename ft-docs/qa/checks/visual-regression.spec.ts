/**
 * Visual Regression Checks
 *
 * Screenshots each story preview and compares against baselines.
 * Run with --update-snapshots to generate new baselines.
 */
import { test, expect } from "@playwright/test";
import { COMPONENTS } from "../lib/component-list";
import {
  waitForComponentPage,
  getStoryPreviews,
} from "../lib/dom-assertions";

// Only run visual regression if explicitly enabled (it's slow)
const VISUAL_ENABLED = process.env.QA_VISUAL === "true";

for (const comp of COMPONENTS) {
  test.describe(comp.name, () => {
    test.skip(!VISUAL_ENABLED, "Visual regression disabled (set QA_VISUAL=true)");

    test("story previews match baselines", async ({ page }) => {
      await page.goto(comp.url);
      await waitForComponentPage(page);

      const previews = await getStoryPreviews(page);

      for (let i = 0; i < Math.min(previews.length, 5); i++) {
        // Scroll into view
        await previews[i].scrollIntoViewIfNeeded();
        // Wait for any animations to settle
        await page.waitForTimeout(500);

        await expect(previews[i]).toHaveScreenshot(
          `${comp.slug}-story-${i}.png`,
          {
            maxDiffPixelRatio: 0.01,
            animations: "disabled",
          }
        );
      }
    });

    test("full page screenshot", async ({ page }) => {
      await page.goto(comp.url);
      await waitForComponentPage(page);

      await expect(page).toHaveScreenshot(`${comp.slug}-full.png`, {
        fullPage: true,
        maxDiffPixelRatio: 0.02,
        animations: "disabled",
      });
    });
  });
}
