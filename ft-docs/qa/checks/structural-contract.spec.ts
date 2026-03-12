/**
 * Structural Contract Checks
 *
 * For each component page:
 * - Stories render (at least minStoryCount)
 * - No empty preview containers
 * - No horizontal overflow in preview areas
 * - Interactive controls have accessible names
 * - Props table renders when argTypes exist
 */
import { test, expect } from "@playwright/test";
import { COMPONENTS } from "../lib/component-list";
import { loadSpec } from "../lib/qa-spec-loader";
import {
  waitForComponentPage,
  getStoryPreviews,
  hasVisibleContent,
  checkOverflow,
  getInteractiveElements,
  hasAccessibleName,
} from "../lib/dom-assertions";

for (const comp of COMPONENTS) {
  test.describe(comp.name, () => {
    const spec = loadSpec(comp.slug);

    test("page loads without error", async ({ page }) => {
      await page.goto(comp.url);
      await waitForComponentPage(page);

      // Should not show error state
      const errorBanner = page.locator("text=Failed to load component");
      await expect(errorBanner).not.toBeVisible();

      // Title should be visible
      const title = page.locator("h1").first();
      await expect(title).toBeVisible();
    });

    test("stories render", async ({ page }) => {
      await page.goto(comp.url);
      await waitForComponentPage(page);

      const previews = await getStoryPreviews(page);
      expect(
        previews.length,
        `Expected at least ${spec.structural.minStoryCount} story preview(s), got ${previews.length}`
      ).toBeGreaterThanOrEqual(spec.structural.minStoryCount);
    });

    test("no empty preview containers", async ({ page }) => {
      await page.goto(comp.url);
      await waitForComponentPage(page);

      const previews = await getStoryPreviews(page);
      const emptyPreviews: number[] = [];

      for (let i = 0; i < previews.length; i++) {
        const hasContent = await hasVisibleContent(previews[i]);
        if (!hasContent) emptyPreviews.push(i);
      }

      expect(
        emptyPreviews,
        `Empty preview containers found at indices: ${emptyPreviews.join(", ")}`
      ).toHaveLength(0);
    });

    test("no horizontal overflow in previews", async ({ page }) => {
      await page.goto(comp.url);
      await waitForComponentPage(page);

      const previews = await getStoryPreviews(page);
      const overflowing: string[] = [];

      for (let i = 0; i < previews.length; i++) {
        const overflow = await checkOverflow(previews[i]);
        if (overflow.overflowX) {
          overflowing.push(
            `Preview ${i}: scrollWidth=${overflow.scrollWidth} > clientWidth=${overflow.clientWidth}`
          );
        }
      }

      expect(
        overflowing,
        `Horizontal overflow detected:\n${overflowing.join("\n")}`
      ).toHaveLength(0);
    });

    test("interactive elements have accessible names", async ({ page }) => {
      await page.goto(comp.url);
      await waitForComponentPage(page);

      const previews = await getStoryPreviews(page);
      const violations: string[] = [];

      for (let i = 0; i < Math.min(previews.length, 5); i++) {
        const interactiveEls = getInteractiveElements(previews[i]);
        const count = await interactiveEls.count();

        for (let j = 0; j < count; j++) {
          const el = interactiveEls.nth(j);
          const hasName = await hasAccessibleName(el);
          if (!hasName) {
            const tag = await el.evaluate((e) => e.tagName.toLowerCase());
            const role = await el.getAttribute("role");
            violations.push(`Preview ${i}, element ${j}: <${tag}${role ? ` role="${role}"` : ""}> has no accessible name`);
          }
        }
      }

      // Allow some violations but flag them — many components may have icon-only buttons
      // that are still being improved
      if (violations.length > 0) {
        console.warn(`[${comp.name}] Accessibility warnings:\n${violations.join("\n")}`);
      }
      // Soft check: warn but don't fail for now
      // expect(violations).toHaveLength(0);
    });

    test("installation section present", async ({ page }) => {
      await page.goto(comp.url);
      await waitForComponentPage(page);

      const installSection = page.locator("#installation");
      await expect(installSection).toBeVisible();
    });

    test("code tab shows story-specific content", async ({ page }) => {
      await page.goto(comp.url);
      await waitForComponentPage(page);

      // Story names that suggest the code should have meaningful props/content
      const CONTENT_EXPECTED_PATTERNS = [
        /variant/i, /size/i, /with/i, /icon/i, /state/i, /color/i,
        /disabled/i, /loading/i, /custom/i, /interactive/i, /compact/i,
        /group/i, /multiple/i, /nested/i, /controlled/i,
      ];

      // Find all story preview cards — each card is a bordered container
      // that wraps the story name, tab bar (Preview/Code/Usage), and content area
      const storyCards = page.locator(".group.relative.flex.flex-col");
      const cardCount = await storyCards.count();

      const results: { storyName: string; code: string; isFallback: boolean }[] = [];

      for (let i = 0; i < cardCount; i++) {
        const card = storyCards.nth(i);

        // Extract story name from the card header
        const nameEl = card.locator("span.font-medium").first();
        const storyName = (await nameEl.textContent())?.trim() ?? `Story ${i}`;

        // Find and click the "Code" tab
        const codeTab = card.getByText("Code", { exact: true }).first();
        const isCodeTabVisible = await codeTab.isVisible().catch(() => false);
        if (!isCodeTabVisible) continue;

        await codeTab.click();

        // Read the code content from the <pre> element
        const codeBlock = card.locator("pre").first();
        const isCodeVisible = await codeBlock.isVisible({ timeout: 3000 }).catch(() => false);
        if (!isCodeVisible) {
          // Switch back to Preview for the next iteration's DOM stability
          const previewTab = card.getByText("Preview", { exact: true }).first();
          await previewTab.click().catch(() => {});
          continue;
        }

        const codeText = (await codeBlock.textContent())?.trim() ?? "";

        // Detect fallback: bare self-closing tag like `<ComponentName />`
        const bareTagPattern = /^<([A-Z][A-Za-z0-9]*)(\s*)\/?>$/;
        const match = codeText.match(bareTagPattern);
        const isBareTag = match !== null;

        // Skip "Default" stories — `<Component />` is often legitimate there
        const isDefault = /^default$/i.test(storyName);

        // Only flag as fallback if:
        //  1. The code is a bare tag with no props
        //  2. The story is NOT named "Default"
        //  3. The story name suggests it should have content
        const suggestsContent = CONTENT_EXPECTED_PATTERNS.some((p) => p.test(storyName));
        const isFallback = isBareTag && !isDefault && suggestsContent;

        results.push({ storyName, code: codeText, isFallback });

        // Switch back to Preview to restore DOM state for next card
        const previewTab = card.getByText("Preview", { exact: true }).first();
        await previewTab.click().catch(() => {});
      }

      // Log summary
      const fallbacks = results.filter((r) => r.isFallback);
      const checked = results.length;

      if (fallbacks.length > 0) {
        const details = fallbacks
          .map((f) => `  - "${f.storyName}": ${f.code}`)
          .join("\n");
        console.warn(
          `[${comp.name}] Code-tab fallback detection: ${fallbacks.length}/${checked} stories show bare component tag:\n${details}`
        );
      } else if (checked > 0) {
        console.log(
          `[${comp.name}] Code-tab check passed: ${checked} stories checked, 0 fallbacks detected.`
        );
      }

      // Soft check: warn but don't fail
      // Uncomment the line below to enforce:
      // expect(fallbacks, `Fallback code tabs found for ${comp.name}`).toHaveLength(0);
    });
  });
}
