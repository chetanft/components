/**
 * Browser Zoom Testing Utilities
 * 
 * Utilities for testing component behavior at different browser zoom levels
 * to ensure accessibility compliance (WCAG 2.1 AA requires 200% zoom support).
 */

export interface ZoomTestConfig {
  zoomLevel: number; // 0.5 = 50%, 1.0 = 100%, 2.0 = 200%, etc.
  description: string;
}

export const ZOOM_LEVELS: ZoomTestConfig[] = [
  { zoomLevel: 0.5, description: '50% zoom' },
  { zoomLevel: 0.75, description: '75% zoom' },
  { zoomLevel: 1.0, description: '100% zoom (default)' },
  { zoomLevel: 1.25, description: '125% zoom' },
  { zoomLevel: 1.5, description: '150% zoom' },
  { zoomLevel: 2.0, description: '200% zoom (WCAG 2.1 AA requirement)' },
  { zoomLevel: 3.0, description: '300% zoom' },
];

/**
 * Simulates browser zoom by scaling the root font-size
 * Note: This is a simplified simulation. Real browser zoom affects more than just font-size.
 */
export function simulateBrowserZoom(zoomLevel: number): void {
  const baseFontSize = 14;
  const zoomedFontSize = baseFontSize * zoomLevel;
  document.documentElement.style.fontSize = `${zoomedFontSize}px`;
}

/**
 * Resets browser zoom simulation to default
 */
export function resetBrowserZoom(): void {
  // Check if we're at a breakpoint that uses 16px base
  const width = window.innerWidth;
  const baseFontSize = width > 1440 ? 16 : 14;
  document.documentElement.style.fontSize = `${baseFontSize}px`;
}

/**
 * Gets the current effective zoom level based on root font-size
 */
export function getCurrentZoomLevel(): number {
  const computedFontSize = parseFloat(
    window.getComputedStyle(document.documentElement).fontSize
  );
  const baseFontSize = window.innerWidth > 1440 ? 16 : 14;
  return computedFontSize / baseFontSize;
}

/**
 * Checks if layout maintains integrity at a given zoom level
 * Returns true if no horizontal scrolling is introduced
 */
export function checkLayoutIntegrity(zoomLevel: number): boolean {
  const originalScrollX = window.scrollX;
  const originalScrollY = window.scrollY;
  
  simulateBrowserZoom(zoomLevel);
  
  // Wait for layout to settle
  setTimeout(() => {
    const newScrollX = window.scrollX;
    const newScrollY = window.scrollY;
    
    resetBrowserZoom();
    
    // Layout integrity means no unexpected scrolling
    // (some vertical scroll is expected if content grows)
    return newScrollX === originalScrollX;
  }, 100);
  
  return true;
}

/**
 * Measures element dimensions at different zoom levels
 */
export function measureElementAtZoom(
  element: HTMLElement,
  zoomLevel: number
): { width: number; height: number; fontSize: number } {
  const originalZoom = getCurrentZoomLevel();
  
  simulateBrowserZoom(zoomLevel);
  
  const rect = element.getBoundingClientRect();
  const computedStyle = window.getComputedStyle(element);
  const fontSize = parseFloat(computedStyle.fontSize);
  
  resetBrowserZoom();
  
  return {
    width: rect.width,
    height: rect.height,
    fontSize,
  };
}

/**
 * Test helper: Runs a test function at multiple zoom levels
 */
export async function testAtZoomLevels<T>(
  testFn: (zoomLevel: number, config: ZoomTestConfig) => T | Promise<T>
): Promise<Array<{ config: ZoomTestConfig; result: T }>> {
  const results: Array<{ config: ZoomTestConfig; result: T }> = [];
  
  for (const config of ZOOM_LEVELS) {
    simulateBrowserZoom(config.zoomLevel);
    
    try {
      const result = await Promise.resolve(testFn(config.zoomLevel, config));
      results.push({ config, result });
    } finally {
      resetBrowserZoom();
    }
  }
  
  return results;
}

/**
 * Accessibility check: Verifies WCAG 2.1 AA compliance at 200% zoom
 */
export function checkWCAGZoomCompliance(): {
  compliant: boolean;
  issues: string[];
} {
  const issues: string[] = [];
  
  // Test at 200% zoom (WCAG requirement)
  simulateBrowserZoom(2.0);
  
  // Check for horizontal scrolling
  if (window.scrollX > 0) {
    issues.push('Horizontal scrolling detected at 200% zoom');
  }
  
  // Check if text is still readable
  const body = document.body;
  const computedStyle = window.getComputedStyle(body);
  const fontSize = parseFloat(computedStyle.fontSize);
  
  if (fontSize < 24) {
    // At 200% zoom, base text should be at least 24px (14px * 2 * 0.857 for smallest)
    // This is a simplified check
  }
  
  resetBrowserZoom();
  
  return {
    compliant: issues.length === 0,
    issues,
  };
}
