/**
 * Reusable DOM assertion helpers for Playwright QA checks.
 */
import type { Page, Locator } from "@playwright/test";

/** Wait for a component page to fully hydrate */
export async function waitForComponentPage(page: Page): Promise<void> {
  // Wait for the page title (h1) to appear
  await page.locator("h1").first().waitFor({ state: "visible", timeout: 15_000 });

  // Wait for at least one story preview to render, or the error state
  await Promise.race([
    page.locator("[data-qa='story-preview']").first().waitFor({ state: "visible", timeout: 20_000 }),
    // Fallback: the page may show stories without data-qa attrs — look for preview containers
    page.locator(".min-h-\\[350px\\]").first().waitFor({ state: "visible", timeout: 20_000 }),
    // Or the page might have an error
    page.locator("text=Failed to load component").waitFor({ state: "visible", timeout: 20_000 }),
  ]).catch(() => {
    // If none appear, page may be in loading state still — continue with what we have
  });

  // Wait for network to settle
  await page.waitForLoadState("networkidle").catch(() => {});
}

/** Get all story preview containers on the page */
export async function getStoryPreviews(page: Page): Promise<Locator[]> {
  // Story previews are rendered inside cards with preview area
  const previews = page.locator(".min-h-\\[350px\\]");
  const count = await previews.count();
  const result: Locator[] = [];
  for (let i = 0; i < count; i++) {
    result.push(previews.nth(i));
  }
  return result;
}

/** Check if an element overflows its container */
export async function checkOverflow(
  locator: Locator
): Promise<{ overflowX: boolean; overflowY: boolean; scrollWidth: number; clientWidth: number; scrollHeight: number; clientHeight: number }> {
  return locator.evaluate((el) => ({
    overflowX: el.scrollWidth > el.clientWidth + 2,
    overflowY: el.scrollHeight > el.clientHeight + 2,
    scrollWidth: el.scrollWidth,
    clientWidth: el.clientWidth,
    scrollHeight: el.scrollHeight,
    clientHeight: el.clientHeight,
  }));
}

/** Check if a preview container has visible content */
export async function hasVisibleContent(locator: Locator): Promise<boolean> {
  return locator.evaluate((el) => {
    // Check if there's any visible child content
    if (el.childElementCount === 0) return false;
    const text = el.textContent?.trim() || "";
    const hasSVG = el.querySelector("svg") !== null;
    const hasImg = el.querySelector("img") !== null;
    const hasCanvas = el.querySelector("canvas") !== null;
    const hasInput = el.querySelector("input, textarea, select") !== null;
    // Range inputs (Slider), role-based widgets, and elements with backgrounds
    const hasWidget = el.querySelector('[role="slider"], [role="progressbar"], [role="separator"], [type="range"]') !== null;
    // Watermark/skeleton use pseudo-elements or background patterns
    const hasVisualChild = Array.from(el.querySelectorAll("*")).some((child) => {
      const style = window.getComputedStyle(child);
      return style.backgroundImage !== "none" || style.opacity !== "0";
    });
    return text.length > 0 || hasSVG || hasImg || hasCanvas || hasInput || hasWidget || (el.childElementCount > 0 && hasVisualChild);
  });
}

/** Get all interactive elements inside a container */
export function getInteractiveElements(container: Locator): Locator {
  return container.locator(
    'button, input, select, textarea, [role="checkbox"], [role="switch"], [role="tab"], [role="radio"], a[href]'
  );
}

/** Check that an interactive element has an accessible name */
export async function hasAccessibleName(locator: Locator): Promise<boolean> {
  return locator.evaluate((el) => {
    const text = el.textContent?.trim() || "";
    const ariaLabel = el.getAttribute("aria-label") || "";
    const ariaLabelledBy = el.getAttribute("aria-labelledby") || "";
    const title = el.getAttribute("title") || "";
    const placeholder = (el as HTMLInputElement).placeholder || "";
    return (
      text.length > 0 ||
      ariaLabel.length > 0 ||
      ariaLabelledBy.length > 0 ||
      title.length > 0 ||
      placeholder.length > 0
    );
  });
}
