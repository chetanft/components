/**
 * AI Review Checks (Phase 2)
 *
 * Takes screenshots of each component page and sends them to an AI reviewer
 * for second-pass design quality assessment.
 *
 * Disabled by default — enable with QA_AI_REVIEW=true
 */
import { test, expect } from "@playwright/test";
import { COMPONENTS } from "../lib/component-list";
import { waitForComponentPage } from "../lib/dom-assertions";
import * as fs from "fs";
import * as path from "path";

const AI_REVIEW_ENABLED = process.env.QA_AI_REVIEW === "true";
const SCREENSHOTS_DIR = path.resolve(__dirname, "../reports/ai-review-screenshots");

for (const comp of COMPONENTS) {
  test.describe(comp.name, () => {
    test.skip(!AI_REVIEW_ENABLED, "AI review disabled (set QA_AI_REVIEW=true)");

    test("capture screenshot for AI review", async ({ page }) => {
      await page.goto(comp.url);
      await waitForComponentPage(page);

      // Ensure screenshots directory exists
      fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });

      // Full page screenshot
      const screenshotPath = path.join(SCREENSHOTS_DIR, `${comp.slug}.png`);
      await page.screenshot({
        path: screenshotPath,
        fullPage: true,
        animations: "disabled",
      });

      // Verify screenshot was saved
      expect(fs.existsSync(screenshotPath)).toBe(true);

      // TODO: Phase 2 — Send screenshot + metadata to AI reviewer
      // const metadata = {
      //   component: comp.name,
      //   url: comp.url,
      //   screenshotPath,
      //   timestamp: new Date().toISOString(),
      // };
      // const review = await aiReview(screenshotPath, metadata);
      // expect(review.status).not.toBe("broken");
    });
  });
}
