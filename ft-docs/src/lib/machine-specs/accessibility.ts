/**
 * Machine-readable spec builder for the Accessibility page.
 * Shared by the interactive UI toggle and the /machine/docs/accessibility route.
 */

export function buildAccessibilitySpec(): string {
  return [
    "# FT Design System — Accessibility",
    "PURPOSE: accessibility capabilities and expected interaction patterns",
    "COMPLIANCE_TARGET: WCAG AA",
    "KEYBOARD:",
    "- Tab / Shift+Tab navigation",
    "- Enter / Space activation",
    "- Arrow key navigation in composite widgets",
    "- Escape closes overlays",
    "",
    "SCREEN_READER_SUPPORT:",
    "- semantic HTML",
    "- ARIA labels and roles",
    "- live regions for dynamic content",
    "",
    "TOUCH_TARGETS:",
    "- minimum 44x44px targets",
    "- spacing between adjacent interactive controls",
    "",
    "COMPONENT_NOTES:",
    "- Table: aria-sort and row navigation",
    "- Dropdown: aria-expanded and arrow navigation",
    "- Modal: focus trap and focus return",
  ].join("\n");
}
