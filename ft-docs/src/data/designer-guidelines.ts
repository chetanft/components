/**
 * Designer Guidelines Data
 *
 * Per-component usage guidance for designers and AI tools.
 * Used by the Usage tab in StoryPreview and the Usage overlay.
 */

export interface VariantGuideline {
  name: string;
  description: string;
  useCase: string;
}

export interface DosAndDonts {
  do: string;
  dont: string;
}

export interface ComponentGuideline {
  description: string;
  category: "atom" | "molecule" | "organism";
  whenToUse: string[];
  whenNotToUse: string[];
  variants?: VariantGuideline[];
  designDosAndDonts: DosAndDonts[];
  figmaLinks: string[];
  relatedComponents: string[];
}

const FIGMA_BASE = "https://www.figma.com/design/HMS1wPnsS1fuPyN1xSEVAH/Components?node-id=";

export const designerGuidelines: Record<string, ComponentGuideline> = {
  Button: {
    description:
      "Interactive element that triggers an action. The primary way users take actions in the UI.",
    category: "atom",
    whenToUse: [
      "Primary actions like form submissions or CTAs",
      "Secondary actions like cancel or back",
      "Destructive actions like delete (with destructive variant)",
      "Inline text actions (text or link variant)",
    ],
    whenNotToUse: [
      "Navigation to another page — use Link or anchor instead",
      "Toggle between states — use Switch or Toggle",
      "Selecting from options — use Select or RadioGroup",
    ],
    variants: [
      { name: "primary", description: "Solid fill, high contrast", useCase: "Main action in a section" },
      { name: "secondary", description: "Outlined, medium emphasis", useCase: "Supporting actions" },
      { name: "destructive", description: "Red-themed, signals danger", useCase: "Delete, remove, or irreversible actions" },
      { name: "text", description: "No border or background", useCase: "Tertiary actions, inline use" },
      { name: "link", description: "Styled as a link", useCase: "Navigation-like actions within content" },
      { name: "ghost", description: "Transparent background, border on hover", useCase: "Toolbar actions, icon buttons" },
      { name: "dashed", description: "Dashed border", useCase: "Add/create actions, empty states" },
    ],
    designDosAndDonts: [
      { do: "Use one primary button per section", dont: "Place multiple primary buttons in the same view" },
      { do: "Use size prop (xs/sm/md/lg) for sizing", dont: "Override dimensions with custom CSS" },
      { do: "Include an icon for icon-only buttons (iconPosition='only')", dont: "Use icon-only buttons without a tooltip" },
      { do: "Use loading state during async operations", dont: "Disable the button without explanation" },
    ],
    figmaLinks: [`${FIGMA_BASE}593-2130`],
    relatedComponents: ["ButtonGroup", "Toggle", "Link"],
  },

  Input: {
    description:
      "Single-line text input field for user data entry. Supports labels, placeholders, error states, and helper text.",
    category: "atom",
    whenToUse: [
      "Single-line text entry (name, email, search)",
      "Numeric input with validation",
      "Fields that need prefix/suffix icons",
    ],
    whenNotToUse: [
      "Multi-line text — use Textarea",
      "Selecting from predefined options — use Select or Dropdown",
      "Date entry — use DatePicker",
    ],
    variants: [
      { name: "default", description: "Standard text input", useCase: "Most form fields" },
      { name: "with error", description: "Red border with error message", useCase: "Validation failures" },
      { name: "disabled", description: "Greyed out, non-interactive", useCase: "Read-only contexts" },
      { name: "with prefix/suffix", description: "Icons or text before/after input", useCase: "Currency, search, URLs" },
    ],
    designDosAndDonts: [
      { do: "Always include a label", dont: "Use placeholder as the only label" },
      { do: "Show validation errors inline below the field", dont: "Use alerts or toasts for field-level errors" },
      { do: "Use helper text for format hints", dont: "Overload helper text with long instructions" },
    ],
    figmaLinks: [`${FIGMA_BASE}551-1975`, `${FIGMA_BASE}786-1725`],
    relatedComponents: ["Textarea", "InputNumber", "Select", "Label"],
  },

  Badge: {
    description:
      "Small status indicator used to highlight counts, labels, or status values.",
    category: "atom",
    whenToUse: [
      "Showing status (success, warning, danger)",
      "Notification counts",
      "Category or type labels",
    ],
    whenNotToUse: [
      "Long-form status messages — use Alert",
      "Interactive selections — use Chicklet or Toggle",
      "Progress indication — use ProgressBar",
    ],
    variants: [
      { name: "primary", description: "Brand-colored badge", useCase: "Default emphasis" },
      { name: "secondary", description: "Muted background", useCase: "Low-emphasis labels" },
      { name: "danger", description: "Red for errors or critical", useCase: "Error counts, critical status" },
      { name: "success", description: "Green for positive", useCase: "Completed, active, approved" },
      { name: "warning", description: "Orange for caution", useCase: "Pending, needs attention" },
      { name: "neutral", description: "Grey, minimal emphasis", useCase: "Informational, metadata" },
    ],
    designDosAndDonts: [
      { do: "Use 'danger' variant for errors", dont: "Use 'error' as a variant name (it's 'danger')" },
      { do: "Keep badge text short (1-3 words)", dont: "Put sentences inside badges" },
      { do: "Use consistent variants for the same meaning across the app", dont: "Mix danger/warning for the same concept" },
    ],
    figmaLinks: [`${FIGMA_BASE}53-1184`],
    relatedComponents: ["Alert", "Chicklet", "Statistic"],
  },

  Select: {
    description:
      "Dropdown selection control for choosing one option from a list.",
    category: "atom",
    whenToUse: [
      "Choosing from 5+ predefined options",
      "When space is limited (vs RadioGroup)",
      "Filterable option lists",
    ],
    whenNotToUse: [
      "2-4 options that fit inline — use RadioGroup",
      "Boolean choice — use Switch or Checkbox",
      "Free text entry — use Input",
    ],
    variants: [
      { name: "default", description: "Standard single-select", useCase: "Most selection needs" },
      { name: "multi", description: "Multiple selections allowed", useCase: "Tags, categories" },
      { name: "searchable", description: "Type to filter options", useCase: "Long option lists" },
    ],
    designDosAndDonts: [
      { do: "Provide a meaningful placeholder", dont: "Use 'Select...' as the only context" },
      { do: "Sort options logically (alphabetical or by frequency)", dont: "Use random ordering" },
      { do: "Show a clear empty state when no options match the search", dont: "Leave the dropdown blank with no feedback" },
    ],
    figmaLinks: [],
    relatedComponents: ["Dropdown", "RadioGroup", "Cascader", "TreeSelect"],
  },

  Dropdown: {
    description:
      "Container component that shows a floating panel of options triggered by a button or input.",
    category: "molecule",
    whenToUse: [
      "Action menus (right-click, more options)",
      "Selection from a structured list with labels",
      "Grouped option categories",
    ],
    whenNotToUse: [
      "Simple single-value selection — use Select",
      "Navigation menus — use NavigationMenu",
      "Form field selection — use Select with form integration",
    ],
    variants: [
      { name: "default", description: "Standard dropdown with items", useCase: "Action menus" },
      { name: "with sections", description: "Grouped items with dividers", useCase: "Categorized actions" },
    ],
    designDosAndDonts: [
      { do: "Group related actions with dividers", dont: "Put more than 10 items without grouping" },
      { do: "Use icons consistently (all items or none)", dont: "Mix icon and non-icon items randomly" },
      { do: "Include keyboard navigation support", dont: "Use dropdowns for form field selection — use Select instead" },
    ],
    figmaLinks: [`${FIGMA_BASE}501-737`],
    relatedComponents: ["DropdownMenu", "Select", "Popconfirm"],
  },

  Modal: {
    description:
      "Overlay dialog that requires user attention. Blocks interaction with the page behind it.",
    category: "organism",
    whenToUse: [
      "Confirmations for destructive actions",
      "Short forms that don't need a full page",
      "Critical information that requires acknowledgment",
    ],
    whenNotToUse: [
      "Long, complex forms — use a dedicated page",
      "Non-blocking information — use Notification or Message",
      "Side-panel content — use Drawer",
    ],
    variants: [
      { name: "default", description: "Standard dialog with header/body/footer", useCase: "Most modal use cases" },
      { name: "confirm", description: "Simple yes/no confirmation", useCase: "Delete confirmations" },
    ],
    designDosAndDonts: [
      { do: "Keep modal content focused on one task", dont: "Nest modals inside modals" },
      { do: "Provide clear close/cancel affordance", dont: "Force users to complete the modal to dismiss" },
      { do: "Use descriptive action button labels", dont: "Use 'OK' / 'Cancel' for destructive actions" },
    ],
    figmaLinks: [],
    relatedComponents: ["Drawer", "Popconfirm", "Notification"],
  },

  Table: {
    description:
      "Data display component for tabular information. Tables are decision-support tools, not data dumps. Design columns around user questions ('Is this late?'), not database fields. Follow a strict zone architecture: Selector → Identity → Status & Signals → Actions (left to right).",
    category: "organism",
    whenToUse: [
      "Displaying structured data where users need to compare values vertically across rows",
      "Decision queues — operations teams scanning 50–200 rows to find items needing action",
      "Read-only monitoring views (trip lists, order tracking, shipment visibility)",
      "Data that benefits from sorting, filtering, and milestone-based tab navigation",
      "Audit/reconciliation views where individual numeric columns must remain separate",
    ],
    whenNotToUse: [
      "Simple key-value pairs — use Descriptions",
      "Card-based browsing — use Grid with Cards",
      "When rows contain multi-line paragraphs that can't be scanned vertically in <2 seconds — that's a card layout, not a table",
      "Data entry mixed with monitoring — separate read-only tables from data-entry tables completely",
      "Timeline/sequential data — use Timeline or List",
    ],
    variants: [
      { name: "default", description: "Standard density read-only table with double-row cells (primary data top, supporting context below)", useCase: "Most data displays — aim for 8+ visible rows on screen" },
      { name: "compact", description: "Reduced row height with density toggle", useCase: "Power users who prefer scanning speed over readability — beware secondary text becoming illegible" },
      { name: "data-entry", description: "Table with inline-editable cells, validation feedback, and clear edit affordances", useCase: "Allocation, indent forms — never mix with read-only monitoring tables" },
      { name: "striped", description: "Alternating row backgrounds", useCase: "Financial/reconciliation tables where individual columns must stay separate for auditing" },
    ],
    designDosAndDonts: [
      { do: "Map columns to user questions ('Can I track this?', 'Is this late?'), not database fields", dont: "Mirror your database schema 1:1 as columns — users shouldn't do the JOIN in their heads" },
      { do: "Use double-row cells to pair related data (city + client name, status + ETA) — reduces column count while preserving scannability", dont: "Give every data point its own column — this creates 7+ wide columns with 3+ line rows showing only 5 rows on screen" },
      { do: "Follow zone structure: Zone 1 (Selector) → Zone 2 (Identity ~40%) → Zone 3 (Status & Signals ~40%) → Zone 4 (Actions)", dont: "Let column order be arbitrary or let status columns appear in the identity zone" },
      { do: "Show calculated insights (SLA: 'Delayed by 12h 30m') not raw data (two separate timestamp columns)", dont: "Show raw timestamps and expect users to mentally calculate delay — that's display thinking, not decision support" },
      { do: "Visually separate 'needs attention' rows from 'fine' rows at scanning speed using color-coded severity", dont: "Give delayed and on-time shipments the same row height, font size, and density — when everything is emphasised, nothing is" },
      { do: "Use 'title' for column headers (not 'header') and include 'id' in every row", dont: "Use 'header' prop or omit row IDs — selection/sorting will break" },
      { do: "Compose with TableHeader/TableBody/TableRow/TableHead/TableCell", dont: "Pass flat data without composition" },
      { do: "Invest 80% of effort on smart defaults (per role), 20% on configuration — most users (~80%) never customise", dont: "Ship a configuration system with no defaults — that just moves complexity to the settings screen" },
      { do: "Allow custom views with saved column selections within zones, enforcing zone structure", dont: "Allow per-client column reordering across zones — hold the line on zone architecture" },
    ],
    figmaLinks: [],
    relatedComponents: ["DataEntryTable", "Pagination", "Descriptions", "Badge", "Tabs"],
  },

  Tabs: {
    description:
      "Navigation component for switching between related content sections within the same context.",
    category: "organism",
    whenToUse: [
      "Content that can be logically divided into sections",
      "When users need to switch between related views",
      "Dashboard panels or settings sections",
    ],
    whenNotToUse: [
      "Top-level page navigation — use NavigationMenu",
      "Step-by-step flows — use Steps",
      "Filtering data — use SegmentedTabs or QuickFilters",
    ],
    variants: [
      { name: "default", description: "Underline-style tabs", useCase: "Most tabbed interfaces" },
      { name: "with badges", description: "Tabs with count badges", useCase: "Notification counts per section" },
      { name: "with icons", description: "Tabs with leading icons", useCase: "Visual category distinction" },
    ],
    designDosAndDonts: [
      { do: "Keep tab labels short (1-2 words)", dont: "Use long sentences as tab labels" },
      { do: "Show the most important tab first", dont: "Have more than 7 tabs (use dropdown overflow)" },
      { do: "Preserve tab content state when switching between tabs", dont: "Reset form data or scroll position on tab change" },
    ],
    figmaLinks: [`${FIGMA_BASE}562-8084`, `${FIGMA_BASE}356-967`],
    relatedComponents: ["SegmentedTabs", "Steps", "NavigationMenu"],
  },

  Card: {
    description:
      "Container component that groups related content and actions with a bordered surface.",
    category: "organism",
    whenToUse: [
      "Grouping related information visually",
      "Content that has a clear header, body, and optional actions",
      "Grid layouts with browsable items",
    ],
    whenNotToUse: [
      "Full-width content sections — use simple dividers",
      "Interactive data — use Table",
      "Side content — use Drawer or DisplayBlock",
    ],
    variants: [
      { name: "default", description: "Standard bordered card with padding", useCase: "Content grouping, dashboard widgets" },
      { name: "interactive", description: "Card with hover state and click handler", useCase: "Clickable items in grids, selection cards" },
      { name: "glass", description: "Glassmorphism effect with backdrop blur", useCase: "Overlaid content, visual emphasis" },
    ],
    designDosAndDonts: [
      { do: "Use consistent card sizes in grids", dont: "Mix wildly different card heights in the same row" },
      { do: "Keep card content scannable", dont: "Put entire forms inside cards" },
      { do: "Use card header for title and actions, body for content", dont: "Nest cards more than one level deep" },
    ],
    figmaLinks: [],
    relatedComponents: ["DisplayBlock", "Collapsible", "CardElements"],
  },

  Alert: {
    description:
      "Contextual feedback message for important information, warnings, errors, or success states.",
    category: "molecule",
    whenToUse: [
      "Important status messages within a page",
      "Validation summaries at form level",
      "Informational banners that persist",
    ],
    whenNotToUse: [
      "Transient success/error feedback — use Message or Notification",
      "Field-level validation — use Input error state",
      "Small status indicators — use Badge",
    ],
    variants: [
      { name: "info", description: "Blue, neutral information", useCase: "Helpful tips, general notices" },
      { name: "success", description: "Green, positive outcome", useCase: "Successful operations, confirmations" },
      { name: "warning", description: "Orange, caution", useCase: "Potential issues, degraded states" },
      { name: "error", description: "Red, critical failure", useCase: "Errors, validation failures, blocking issues" },
    ],
    designDosAndDonts: [
      { do: "Use appropriate severity (info, success, warning, error)", dont: "Use error alerts for informational content" },
      { do: "Include actionable guidance in the message", dont: "Show vague error messages like 'Something went wrong'" },
      { do: "Place alerts near the relevant content they describe", dont: "Stack multiple alerts at the top of the page" },
    ],
    figmaLinks: [],
    relatedComponents: ["Message", "Notification", "Badge"],
  },

  Checkbox: {
    description:
      "Binary selection control for toggling an option on or off, or selecting multiple items from a list.",
    category: "atom",
    whenToUse: [
      "Multiple selections from a list",
      "Terms and conditions agreements",
      "Toggling a setting on/off with a label",
    ],
    whenNotToUse: [
      "Single selection from options — use RadioGroup",
      "On/off toggle with immediate effect — use Switch",
      "Selecting from many options — use Select with multi",
    ],
    variants: [
      { name: "default", description: "Standard checkbox", useCase: "List selections" },
      { name: "indeterminate", description: "Partially selected state", useCase: "Select-all with partial selections" },
    ],
    designDosAndDonts: [
      { do: "Always include a visible label", dont: "Use standalone checkboxes without text" },
      { do: "Use vertical lists for 3+ options", dont: "Arrange many checkboxes horizontally" },
      { do: "Use indeterminate state for parent checkboxes with partial child selections", dont: "Use checkboxes for mutually exclusive options — use RadioGroup" },
    ],
    figmaLinks: [`${FIGMA_BASE}129-297`],
    relatedComponents: ["RadioGroup", "Switch", "Toggle"],
  },

  RadioGroup: {
    description:
      "Single-selection control where users pick exactly one option from a visible set.",
    category: "atom",
    whenToUse: [
      "Choosing one option from 2-5 visible choices",
      "When all options should be visible simultaneously",
      "When the selected option affects adjacent content",
    ],
    whenNotToUse: [
      "More than 5 options — use Select",
      "Multiple selections — use Checkbox group",
      "Card-style rich options — use RadioSelector",
    ],
    designDosAndDonts: [
      { do: "Always have one option pre-selected", dont: "Start with no selection unless explicitly required" },
      { do: "Order options logically", dont: "Use radio buttons for on/off toggles" },
      { do: "Use clear, concise labels that differentiate each option", dont: "Use more than 5 visible radio options — switch to Select" },
    ],
    figmaLinks: [`${FIGMA_BASE}129-322`],
    relatedComponents: ["Select", "Checkbox", "RadioSelector", "ToggleGroup"],
  },

  Switch: {
    description:
      "Toggle control for binary on/off states with immediate effect.",
    category: "atom",
    whenToUse: [
      "Settings that take effect immediately",
      "Binary toggles (on/off, enabled/disabled)",
      "Feature flags or preferences",
    ],
    whenNotToUse: [
      "Form selections that submit later — use Checkbox",
      "Choosing between multiple options — use RadioGroup",
      "Actions — use Button",
    ],
    designDosAndDonts: [
      { do: "Use for settings that apply instantly", dont: "Use in forms that require a submit action" },
      { do: "Label clearly what the on-state means", dont: "Use negative labels (e.g., 'Disable notifications')" },
      { do: "Place the label to the right of the switch", dont: "Use a switch when the outcome of toggling isn't immediately obvious" },
    ],
    figmaLinks: [`${FIGMA_BASE}298-1021`],
    relatedComponents: ["Checkbox", "Toggle", "RadioGroup"],
  },

  DatePicker: {
    description:
      "Date and optional time selection input with calendar popup.",
    category: "molecule",
    whenToUse: [
      "Selecting a specific date or date range",
      "Date+time selection for scheduling",
      "Filtering data by date",
    ],
    whenNotToUse: [
      "Selecting a year/month only — use Select",
      "Relative time (e.g., 'last 7 days') — use predefined filter chips",
    ],
    variants: [
      { name: "date", description: "Date-only picker", useCase: "Birth dates, due dates" },
      { name: "datetime", description: "Date and time", useCase: "Meeting scheduling" },
      { name: "range", description: "Start and end date", useCase: "Date range filters" },
    ],
    designDosAndDonts: [
      { do: "Show the expected format as placeholder", dont: "Let users guess the date format" },
      { do: "Provide sensible min/max date bounds", dont: "Allow selecting dates that are logically invalid" },
      { do: "Pre-fill with smart defaults (today, common ranges)", dont: "Open the calendar on a month far from the likely selection" },
    ],
    figmaLinks: [`${FIGMA_BASE}800-2791`],
    relatedComponents: ["TimePicker", "Calendar", "FilterDateRange"],
  },

  Steps: {
    description:
      "Progress indicator for multi-step workflows showing the current position and remaining steps.",
    category: "molecule",
    whenToUse: [
      "Multi-step wizards or forms",
      "Onboarding flows",
      "Checkout or approval processes",
    ],
    whenNotToUse: [
      "Tab-like navigation without progression — use Tabs",
      "Simple progress indication — use ProgressBar",
      "Timeline of events — use Timeline",
    ],
    variants: [
      { name: "horizontal", description: "Steps laid out horizontally", useCase: "Desktop wizards" },
      { name: "vertical", description: "Steps stacked vertically", useCase: "Mobile or side-panel flows" },
    ],
    designDosAndDonts: [
      { do: "Keep step labels short", dont: "Use more than 7 steps" },
      { do: "Show progress clearly (completed, active, pending)", dont: "Allow jumping ahead without validation" },
      { do: "Allow navigating back to completed steps", dont: "Lose user input when navigating between steps" },
    ],
    figmaLinks: [`${FIGMA_BASE}688-1245`, `${FIGMA_BASE}688-1218`],
    relatedComponents: ["Tabs", "ProgressBar", "Timeline"],
  },

  Form: {
    description:
      "Container for form fields with built-in validation, layout, and submission handling.",
    category: "organism",
    whenToUse: [
      "Data entry with validation requirements",
      "Any multi-field submission workflow",
      "Settings panels with save action",
    ],
    whenNotToUse: [
      "Single-field interactions — just use Input directly",
      "Read-only data display — use Descriptions or Table",
    ],
    designDosAndDonts: [
      { do: "Group related fields with clear section headers", dont: "Mix unrelated fields without visual separation" },
      { do: "Put the primary action button at the bottom", dont: "Hide submit buttons or place them at the top" },
      { do: "Show validation on blur or submit, not on every keystroke", dont: "Show errors before the user interacts" },
    ],
    figmaLinks: [],
    relatedComponents: ["Input", "Select", "Checkbox", "RadioGroup", "DatePicker"],
  },

  Drawer: {
    description:
      "Side panel overlay that slides in from the edge of the screen for secondary content.",
    category: "organism",
    whenToUse: [
      "Detail views without leaving the current page",
      "Configuration panels",
      "Mobile navigation menus",
    ],
    whenNotToUse: [
      "Confirmations — use Modal",
      "Quick messages — use Notification",
      "Primary content — use a dedicated page",
    ],
    designDosAndDonts: [
      { do: "Include a clear close button", dont: "Use drawers for critical actions that need full focus" },
      { do: "Keep drawer width appropriate (360-600px)", dont: "Make drawers wider than 50% of viewport" },
      { do: "Use a backdrop overlay to indicate context switch", dont: "Open a drawer from within another drawer" },
    ],
    figmaLinks: [],
    relatedComponents: ["Modal", "Collapsible", "NavigationMenu"],
  },

  Pagination: {
    description:
      "Navigation control for moving between pages of content.",
    category: "molecule",
    whenToUse: [
      "Tables or lists with many items",
      "Search results",
      "Any paginated data view",
    ],
    whenNotToUse: [
      "Infinite scroll content — use scroll-based loading",
      "Few items that fit on one page",
      "Step-by-step flows — use Steps",
    ],
    variants: [
      { name: "default", description: "Full pagination with page numbers", useCase: "Tables, data grids" },
      { name: "compact", description: "Simplified prev/next only", useCase: "Mobile, small spaces" },
    ],
    designDosAndDonts: [
      { do: "Show total items/pages count", dont: "Use pagination for fewer than 20 items" },
      { do: "Allow page size selection for data-heavy views", dont: "Default to very small page sizes (e.g., 5)" },
      { do: "Preserve selected page across filter changes when possible", dont: "Hide pagination when there's only one page — show it disabled for consistency" },
    ],
    figmaLinks: [],
    relatedComponents: ["Table", "List"],
  },

  Tooltip: {
    description:
      "Small contextual popup that appears on hover to provide additional information.",
    category: "molecule",
    whenToUse: [
      "Explaining icon-only buttons",
      "Showing full text for truncated labels",
      "Providing additional context without cluttering the UI",
    ],
    whenNotToUse: [
      "Interactive content — use Popconfirm or HoverCard",
      "Critical information — use inline text or Alert",
      "Mobile (no hover) — use a different pattern",
    ],
    designDosAndDonts: [
      { do: "Keep tooltip text short (1-2 lines)", dont: "Put interactive elements inside tooltips" },
      { do: "Use for supplementary information only", dont: "Hide essential information in tooltips" },
      { do: "Add a small delay (200-300ms) before showing to avoid flicker", dont: "Trigger tooltips on click — that's a Popover pattern" },
    ],
    figmaLinks: [],
    relatedComponents: ["Popconfirm", "HoverCard"],
  },

  Breadcrumb: {
    description:
      "Horizontal navigation trail showing the user's current location within a hierarchy.",
    category: "molecule",
    whenToUse: [
      "Pages with hierarchical navigation",
      "Multi-level content structures",
      "When users need to navigate up the hierarchy",
    ],
    whenNotToUse: [
      "Flat site structures — unnecessary",
      "Step-by-step flows — use Steps",
      "Tabs or lateral navigation — use Tabs",
    ],
    variants: [
      { name: "default", description: "Standard breadcrumb with separator chevrons", useCase: "Most page hierarchies" },
      { name: "with icons", description: "Breadcrumb items with leading icons", useCase: "When items need visual differentiation" },
    ],
    designDosAndDonts: [
      { do: "Show the current page as the last non-linked item", dont: "Make the current page a clickable link" },
      { do: "Truncate long paths with ellipsis", dont: "Show more than 5 breadcrumb levels" },
      { do: "Place breadcrumbs at the top of the page content area", dont: "Use breadcrumbs as the only navigation — pair with sidebar nav" },
    ],
    figmaLinks: [],
    relatedComponents: ["NavigationMenu", "Steps", "PageHeader"],
  },

  Avatar: {
    description:
      "Visual representation of a user or entity, showing an image, initials, or placeholder icon.",
    category: "atom",
    whenToUse: [
      "User profile displays",
      "Comment/message attribution",
      "Team member lists",
    ],
    whenNotToUse: [
      "Non-person entities — use Icon or Logo",
      "Decorative images — use Image",
      "Large profile pictures — use Image with custom styling",
    ],
    variants: [
      { name: "image", description: "Shows user photo", useCase: "When profile image is available" },
      { name: "initials", description: "Shows first letter(s) of name", useCase: "Fallback when no image available" },
      { name: "icon", description: "Shows a generic user icon", useCase: "Anonymous or system users" },
    ],
    designDosAndDonts: [
      { do: "Provide fallback initials or icon when image fails", dont: "Show broken image placeholders" },
      { do: "Use consistent sizes within the same context", dont: "Mix avatar sizes in the same list" },
      { do: "Use avatar groups with overlap for team displays", dont: "Show more than 5 avatars in a group without a +N counter" },
    ],
    figmaLinks: [],
    relatedComponents: ["UserProfile", "UserProfileDropdown"],
  },

  Label: {
    description:
      "Text label for form fields with optional required indicator and tooltip.",
    category: "atom",
    whenToUse: [
      "Labeling form inputs",
      "Section headers for form groups",
      "Annotating read-only values",
    ],
    whenNotToUse: [
      "General text content — use Text",
      "Headings — use Typography",
    ],
    designDosAndDonts: [
      { do: "Associate labels with their input via htmlFor", dont: "Use labels as standalone text elements" },
      { do: "Mark required fields with the required indicator", dont: "Mark optional fields (mark required instead)" },
      { do: "Place labels above or to the left of their field consistently", dont: "Use different label placements within the same form" },
    ],
    figmaLinks: [`${FIGMA_BASE}756-2194`],
    relatedComponents: ["Input", "SubText", "Text"],
  },

  Upload: {
    description:
      "File upload component with drag-and-drop support and file list management.",
    category: "organism",
    whenToUse: [
      "File upload workflows",
      "Document attachment features",
      "Image/media upload interfaces",
    ],
    whenNotToUse: [
      "Simple file input — use native input",
      "Large file management systems — use dedicated file manager UI",
    ],
    designDosAndDonts: [
      { do: "Show accepted file types and size limits", dont: "Allow upload without telling users the constraints" },
      { do: "Show upload progress for each file", dont: "Block the entire UI during upload" },
      { do: "Allow removing files from the upload queue before submission", dont: "Auto-submit files immediately on selection without preview" },
    ],
    figmaLinks: [`${FIGMA_BASE}1113-3060`],
    relatedComponents: ["UploadButton", "UploadItem", "UploadZone", "UploadThumbnail", "FileCard"],
  },

  PageHeader: {
    description:
      "Page-level header with title, breadcrumbs, actions, and optional description.",
    category: "organism",
    whenToUse: [
      "Top of content pages",
      "Sections that need title + actions",
      "Pages with breadcrumb navigation",
    ],
    whenNotToUse: [
      "App-level header — use AppHeader",
      "Section headers within a page — use Typography",
    ],
    designDosAndDonts: [
      { do: "Include breadcrumbs for deep pages", dont: "Put too many action buttons in the header" },
      { do: "Keep descriptions concise (1 line)", dont: "Use the page header for content" },
      { do: "Place primary action on the right, secondary actions in a dropdown", dont: "Duplicate actions that already exist in the page body" },
    ],
    figmaLinks: [],
    relatedComponents: ["AppHeader", "Breadcrumb"],
  },

  NavigationMenu: {
    description:
      "Primary navigation component for app-wide page navigation, typically in a sidebar.",
    category: "organism",
    whenToUse: [
      "Main sidebar navigation",
      "Multi-level page hierarchy",
      "Persistent navigation that shows current location",
    ],
    whenNotToUse: [
      "In-page content switching — use Tabs",
      "Step-based flows — use Steps",
      "Action menus — use Dropdown",
    ],
    designDosAndDonts: [
      { do: "Highlight the active page clearly", dont: "Expand all nested levels by default" },
      { do: "Use icons consistently for top-level items", dont: "Have more than 3 levels of nesting" },
      { do: "Keep the nav collapsed to top-level by default, expand active section", dont: "Put actions (buttons, toggles) inside navigation items" },
    ],
    figmaLinks: [`${FIGMA_BASE}559-7461`],
    relatedComponents: ["Tabs", "Breadcrumb", "AppHeader"],
  },

  // ── Additional Atoms ────────────────────────────────────

  Toggle: {
    description: "Binary toggle button that switches between two states, often used in toolbars.",
    category: "atom",
    whenToUse: [
      "Toolbar actions that toggle a mode (bold, italic, grid view)",
      "Binary state switches in compact UIs",
      "View mode toggles (list/grid)",
    ],
    whenNotToUse: [
      "Form settings that save later — use Checkbox",
      "Instant on/off settings — use Switch",
      "Choosing between 3+ options — use SegmentedTabs",
    ],
    variants: [
      { name: "default", description: "Standard toggle button", useCase: "Toolbar toggles" },
      { name: "with icon", description: "Toggle with icon indicator", useCase: "Icon toolbars, compact UIs" },
    ],
    designDosAndDonts: [
      { do: "Use pressed/active styling that's clearly distinct from unpressed", dont: "Use subtle differences that make state hard to determine" },
      { do: "Group related toggles together with ToggleGroup", dont: "Scatter toggles across the UI without grouping" },
      { do: "Include a tooltip explaining what the toggle does", dont: "Use toggles for navigation — use Tabs or links" },
    ],
    figmaLinks: [],
    relatedComponents: ["Switch", "Checkbox", "ToggleGroup", "SegmentedTabs"],
  },

  Divider: {
    description: "Visual separator between content sections — horizontal or vertical line.",
    category: "atom",
    whenToUse: [
      "Separating content sections within a page",
      "Dividing items in lists or menus",
      "Creating visual hierarchy between groups",
    ],
    whenNotToUse: [
      "Between every item in a dense list — use spacing instead",
      "Between cards in a grid — card borders serve as dividers",
      "As decoration — only use when it aids comprehension",
    ],
    designDosAndDonts: [
      { do: "Use sparingly — whitespace often works better", dont: "Add dividers between every element" },
      { do: "Use horizontal dividers between stacked sections", dont: "Use vertical dividers in narrow containers" },
      { do: "Match divider color to border tokens (--border-primary)", dont: "Use high-contrast dividers that dominate the layout" },
    ],
    figmaLinks: [],
    relatedComponents: ["Spacer"],
  },

  Skeleton: {
    description: "Placeholder animation shown while content is loading, mimicking the shape of expected content.",
    category: "atom",
    whenToUse: [
      "Initial page load while data is being fetched",
      "Component-level loading states",
      "When the layout shape is predictable before data arrives",
    ],
    whenNotToUse: [
      "Short operations (<300ms) — show nothing or a spinner",
      "Error states — use Alert or empty state",
      "Background refetches — use subtle loading indicators instead",
    ],
    variants: [
      { name: "text", description: "Rectangular block mimicking text lines", useCase: "Paragraphs, labels" },
      { name: "circle", description: "Circular placeholder", useCase: "Avatars, icons" },
      { name: "rectangular", description: "Rounded rectangle", useCase: "Cards, images, buttons" },
    ],
    designDosAndDonts: [
      { do: "Match skeleton shapes to the actual content layout", dont: "Show a generic spinner when the content layout is known" },
      { do: "Animate with a subtle shimmer effect", dont: "Use skeleton for more than 3 seconds — show an error or empty state" },
      { do: "Show skeletons at the component level, not full-page grey", dont: "Reflow the layout when real content replaces skeletons" },
    ],
    figmaLinks: [],
    relatedComponents: ["Spin", "Loader"],
  },

  Spin: {
    description: "Circular loading spinner for indicating an ongoing operation.",
    category: "atom",
    whenToUse: [
      "Button loading states",
      "Inline loading indicators within components",
      "Short operations where layout shape isn't predictable",
    ],
    whenNotToUse: [
      "Full page loading — use Skeleton",
      "Long operations — use ProgressBar with percentage",
      "Background operations — use subtle indicators",
    ],
    variants: [
      { name: "default", description: "Standard circular spinner", useCase: "General loading" },
      { name: "small", description: "Compact spinner for inline use", useCase: "Inside buttons, form fields" },
    ],
    designDosAndDonts: [
      { do: "Use appropriate size — match the context (button, section, page)", dont: "Show a tiny spinner for a full-page load" },
      { do: "Add descriptive text below for operations >2 seconds", dont: "Use a spinner when you can show a skeleton instead" },
      { do: "Center the spinner within its container", dont: "Let the spinner shift layout when it appears/disappears" },
    ],
    figmaLinks: [],
    relatedComponents: ["Skeleton", "Loader", "ProgressBar"],
  },

  Statistic: {
    description: "Display component for key metrics — a large number with label, optional trend indicator.",
    category: "atom",
    whenToUse: [
      "Dashboard KPI cards",
      "Summary statistics at the top of data views",
      "Highlighting key numbers in reports",
    ],
    whenNotToUse: [
      "Inline numbers within text — just use styled text",
      "Detailed data comparison — use Table",
      "Time-series data — use a chart",
    ],
    variants: [
      { name: "default", description: "Number with label", useCase: "Simple KPI display" },
      { name: "with trend", description: "Number with up/down indicator and percentage", useCase: "Metrics with comparison to previous period" },
      { name: "with icon", description: "Number with decorative icon", useCase: "Dashboard widgets" },
    ],
    designDosAndDonts: [
      { do: "Use large font for the number, smaller for the label", dont: "Make the label the same size as the number" },
      { do: "Use color for trend direction (green up, red down)", dont: "Use red/green without an icon — not accessible for color-blind users" },
      { do: "Format large numbers (1.2M, 45.3K)", dont: "Show raw unformatted numbers like 1234567" },
    ],
    figmaLinks: [],
    relatedComponents: ["Badge", "Card"],
  },

  Textarea: {
    description: "Multi-line text input for longer form content like descriptions, comments, or notes.",
    category: "atom",
    whenToUse: [
      "Multi-line text entry (descriptions, comments, notes)",
      "Fields where users may write paragraphs",
      "Content that needs more than one line of input",
    ],
    whenNotToUse: [
      "Single-line input — use Input",
      "Rich text with formatting — use a rich text editor",
      "Code input — use a code editor component",
    ],
    variants: [
      { name: "default", description: "Standard multi-line input", useCase: "Comments, descriptions" },
      { name: "auto-resize", description: "Grows vertically with content", useCase: "Chat inputs, dynamic forms" },
    ],
    designDosAndDonts: [
      { do: "Set a reasonable default height (3-5 rows)", dont: "Start with a single-line textarea that looks like an Input" },
      { do: "Show character count if there's a limit", dont: "Silently truncate text at the limit" },
      { do: "Allow manual resize (vertical only) for flexibility", dont: "Allow horizontal resize — it breaks layout" },
    ],
    figmaLinks: [],
    relatedComponents: ["Input", "Label", "SubText"],
  },

  Text: {
    description: "Base text component for rendering styled text with semantic HTML elements.",
    category: "atom",
    whenToUse: [
      "Body text, paragraphs, and inline text",
      "When you need to apply text styles consistently",
      "Semantic text that maps to p, span, or other text elements",
    ],
    whenNotToUse: [
      "Headings — use Typography",
      "Form labels — use Label",
      "Status text — use Badge",
    ],
    designDosAndDonts: [
      { do: "Use text-sm-rem for body text, text-xs-rem for captions", dont: "Use arbitrary pixel font sizes" },
      { do: "Use color tokens (--primary, --secondary, --tertiary) for text hierarchy", dont: "Use raw hex colors for text" },
      { do: "Keep line lengths readable (50-75 characters)", dont: "Let text span the full width of a widescreen monitor" },
    ],
    figmaLinks: [],
    relatedComponents: ["Typography", "Label", "SubText"],
  },

  SubText: {
    description: "Helper/hint text that appears below form fields or as secondary descriptions.",
    category: "atom",
    whenToUse: [
      "Helper text below form inputs",
      "Error messages for form validation",
      "Secondary descriptions or hints",
    ],
    whenNotToUse: [
      "Primary content — use Text",
      "Important warnings — use Alert",
      "Labels — use Label",
    ],
    designDosAndDonts: [
      { do: "Use text-xs-rem with tertiary color for hints", dont: "Make helper text the same size as the input label" },
      { do: "Switch to error color (--critical) for validation errors", dont: "Show both hint and error simultaneously — replace the hint" },
      { do: "Keep helper text to one line", dont: "Write multi-paragraph helper text" },
    ],
    figmaLinks: [],
    relatedComponents: ["Label", "Input", "Text"],
  },

  Icons: {
    description: "Icon system with 175+ icons rendered as SVG components. Use kebab-case names from the icon map.",
    category: "atom",
    whenToUse: [
      "Button icons (leading or icon-only)",
      "Navigation items, menu items, actions",
      "Status indicators alongside text",
    ],
    whenNotToUse: [
      "Decorative illustrations — use Illustration",
      "Brand logos — use Logos",
      "Complex graphics — use SVG directly",
    ],
    designDosAndDonts: [
      { do: "Use the Icon component with name prop for consistent sizing", dont: "Import raw SVGs — use the icon map" },
      { do: "Pair icons with text labels for accessibility", dont: "Use icons alone without aria-label or tooltip" },
      { do: "Use consistent icon sizes within a context (16px for sm, 20px for md, 24px for lg)", dont: "Mix arbitrary icon sizes in the same row" },
    ],
    figmaLinks: [],
    relatedComponents: ["Button", "Badge", "NavigationMenu"],
  },

  Illustration: {
    description: "Decorative illustrations for empty states, onboarding, and marketing sections.",
    category: "atom",
    whenToUse: [
      "Empty states (no data, no results, first-time use)",
      "Onboarding and welcome screens",
      "Error pages (404, 500)",
    ],
    whenNotToUse: [
      "Functional icons — use Icons",
      "User photos — use Avatar or Image",
      "Data visualization — use charts",
    ],
    designDosAndDonts: [
      { do: "Use illustrations that match the product's visual language", dont: "Mix illustration styles from different sources" },
      { do: "Keep illustrations at a reasonable size (200-400px max)", dont: "Let illustrations dominate the page over the message" },
      { do: "Pair with a clear heading and action button", dont: "Use illustrations without context or explanation" },
    ],
    figmaLinks: [],
    relatedComponents: ["Empty", "Result", "Icons"],
  },

  ReadOnly: {
    description: "Display component that renders a value in a read-only format matching Input styling.",
    category: "atom",
    whenToUse: [
      "Displaying form values that can't be edited",
      "Review/summary screens showing submitted data",
      "Mixed forms where some fields are editable and others aren't",
    ],
    whenNotToUse: [
      "Editable fields — use Input",
      "Key-value displays — use Descriptions",
      "Plain text — use Text",
    ],
    designDosAndDonts: [
      { do: "Match the visual style of adjacent editable fields for consistency", dont: "Style read-only fields identically to editable ones — users will try to click" },
      { do: "Use a muted background or remove the border to signal non-editable", dont: "Use disabled Input as a replacement — disabled has different semantics" },
      { do: "Keep the same label/layout as the editable version", dont: "Change field order between edit and read-only modes" },
    ],
    figmaLinks: [],
    relatedComponents: ["Input", "Descriptions", "Label"],
  },

  Spacer: {
    description: "Layout utility for adding consistent spacing between elements using design tokens.",
    category: "atom",
    whenToUse: [
      "Adding vertical space between sections",
      "When Tailwind margin/padding classes don't cover the exact spacing needed",
      "Separating form groups without a visual divider",
    ],
    whenNotToUse: [
      "Most cases — prefer Tailwind spacing utilities (gap, space-y, p-, m-)",
      "When a visual separator is needed — use Divider",
    ],
    designDosAndDonts: [
      { do: "Use spacing tokens (x1=4px, x2=8px, x3=12px, x4=16px)", dont: "Use arbitrary pixel values" },
      { do: "Prefer Tailwind utilities over Spacer when possible", dont: "Nest Spacers — just use a larger spacing value" },
      { do: "Use consistent spacing within the same context", dont: "Mix different spacings between similar items" },
    ],
    figmaLinks: [],
    relatedComponents: ["Divider"],
  },

  // ── Additional Molecules ────────────────────────────────

  SegmentedTabs: {
    description: "Pill-shaped tab switcher for toggling between 2-5 mutually exclusive views or filters.",
    category: "molecule",
    whenToUse: [
      "View mode toggles (list/grid, human/machine, map/table)",
      "Filter switches with 2-5 options",
      "When all options should be visible simultaneously",
    ],
    whenNotToUse: [
      "Content navigation — use Tabs",
      "More than 5 options — use Select or Dropdown",
      "Non-mutually-exclusive selections — use Checkbox or ToggleGroup",
    ],
    variants: [
      { name: "default", description: "Full-width with text labels", useCase: "View mode toggles, filter switches" },
      { name: "icon-only", description: "Compact with icons only", useCase: "Toolbar switches, tight spaces" },
    ],
    designDosAndDonts: [
      { do: "Use for 2-5 options max", dont: "Use for navigation between different pages" },
      { do: "Keep labels short (1-2 words)", dont: "Mix text and icon-only items in the same group" },
      { do: "Use w-fit when placing inline (component defaults to w-full)", dont: "Use in forms that require submit — changes should be instant" },
    ],
    figmaLinks: [`${FIGMA_BASE}356-967`],
    relatedComponents: ["Tabs", "ToggleGroup", "RadioGroup"],
  },

  ToggleGroup: {
    description: "Group of toggle buttons where one or multiple can be active. Used for multi-select toolbars.",
    category: "molecule",
    whenToUse: [
      "Toolbar option groups (text alignment, formatting options)",
      "Multi-select filters where options are shown as buttons",
      "Compact selection UI with visual buttons",
    ],
    whenNotToUse: [
      "Single selection from options — use RadioGroup or SegmentedTabs",
      "Form fields — use Checkbox group",
      "Navigation — use Tabs",
    ],
    designDosAndDonts: [
      { do: "Use icons with tooltips for compact toolbar groups", dont: "Use only text in toggle groups — they look like buttons" },
      { do: "Limit to 6 items max in a group", dont: "Mix single-select and multi-select in the same group" },
      { do: "Show clear active state styling", dont: "Use subtle differences between active and inactive states" },
    ],
    figmaLinks: [],
    relatedComponents: ["Toggle", "SegmentedTabs", "Checkbox"],
  },

  ButtonGroup: {
    description: "Groups related buttons together with connected borders, used for split actions or related operations.",
    category: "molecule",
    whenToUse: [
      "Split buttons (primary action + dropdown for alternatives)",
      "Related action groups (zoom in/out, undo/redo)",
      "Compact toolbar sections",
    ],
    whenNotToUse: [
      "Unrelated actions — use separate Buttons",
      "Toggle selection — use ToggleGroup or SegmentedTabs",
      "Navigation — use Tabs or Breadcrumb",
    ],
    designDosAndDonts: [
      { do: "Limit to 2-4 buttons per group", dont: "Group more than 4 buttons — it becomes a toolbar" },
      { do: "Use the same variant and size for all buttons in a group", dont: "Mix primary and secondary variants within the same group" },
      { do: "Use dividers between grouped buttons", dont: "Add spacing between buttons in a group — they should be connected" },
    ],
    figmaLinks: [],
    relatedComponents: ["Button", "Dropdown", "ToggleGroup"],
  },

  Calendar: {
    description: "Standalone calendar grid for date display or selection, used within DatePicker or independently.",
    category: "molecule",
    whenToUse: [
      "Standalone date selection without an input field",
      "Scheduling interfaces showing availability",
      "Date range visualization",
    ],
    whenNotToUse: [
      "Date input in forms — use DatePicker (includes the input)",
      "Relative date selection — use predefined filter chips",
      "Time-only selection — use TimePicker",
    ],
    designDosAndDonts: [
      { do: "Highlight today's date and the selected date clearly", dont: "Show months far from the likely selection" },
      { do: "Disable dates outside valid ranges", dont: "Allow selecting invalid dates and show an error after" },
      { do: "Use consistent week start (Monday for logistics)", dont: "Change the calendar layout between different views" },
    ],
    figmaLinks: [],
    relatedComponents: ["DatePicker", "TimePicker"],
  },

  TimePicker: {
    description: "Time selection input with hour/minute pickers.",
    category: "molecule",
    whenToUse: [
      "Scheduling specific times",
      "Time-based filters",
      "Paired with DatePicker for datetime selection",
    ],
    whenNotToUse: [
      "Date selection — use DatePicker",
      "Duration input — use InputNumber with units",
      "Relative time — use predefined options",
    ],
    designDosAndDonts: [
      { do: "Use 24-hour format for logistics/operations tools", dont: "Mix 12-hour and 24-hour formats in the same app" },
      { do: "Allow keyboard input for fast time entry", dont: "Force users to scroll through time options" },
      { do: "Show the timezone when relevant", dont: "Assume timezone without displaying it" },
    ],
    figmaLinks: [],
    relatedComponents: ["DatePicker", "Calendar", "Input"],
  },

  Carousel: {
    description: "Horizontal scrollable container that cycles through content slides.",
    category: "molecule",
    whenToUse: [
      "Image galleries or product showcases",
      "Onboarding or feature highlights",
      "Testimonials or review displays",
    ],
    whenNotToUse: [
      "Critical content that all users must see — use a static layout",
      "Navigation — use Tabs",
      "Data comparison — use Table or side-by-side layout",
    ],
    designDosAndDonts: [
      { do: "Show navigation dots or arrows for user control", dont: "Auto-advance without pause controls" },
      { do: "Show partial next slide to hint at more content", dont: "Hide that there are more slides" },
      { do: "Keep slide count reasonable (3-8)", dont: "Use a carousel for content that should be in a list or grid" },
    ],
    figmaLinks: [],
    relatedComponents: ["Tabs", "Image"],
  },

  ColorPicker: {
    description: "Color selection input with palette, custom hex input, and optional opacity.",
    category: "molecule",
    whenToUse: [
      "Theme customization settings",
      "Branding configuration",
      "Any UI where users choose a color",
    ],
    whenNotToUse: [
      "Predefined color options — use Select or RadioGroup with color swatches",
      "Status colors — use Badge variants instead",
    ],
    designDosAndDonts: [
      { do: "Show a preview swatch of the selected color", dont: "Only show the hex value without visual feedback" },
      { do: "Include preset palette options for common choices", dont: "Force users to enter hex codes for basic colors" },
      { do: "Validate hex input in real-time", dont: "Allow invalid color values to be submitted" },
    ],
    figmaLinks: [],
    relatedComponents: ["Input", "Select"],
  },

  Descriptions: {
    description: "Key-value pair display for structured read-only data, commonly used in detail pages.",
    category: "molecule",
    whenToUse: [
      "Detail/summary pages showing entity attributes",
      "Read-only form displays (order details, profile info)",
      "Structured metadata display",
    ],
    whenNotToUse: [
      "Editable data — use Form",
      "Tabular comparison — use Table",
      "Simple text content — use Text",
    ],
    variants: [
      { name: "horizontal", description: "Label and value side by side", useCase: "Wide layouts, detail pages" },
      { name: "vertical", description: "Label stacked above value", useCase: "Narrow layouts, mobile" },
    ],
    designDosAndDonts: [
      { do: "Align labels consistently (left-aligned, fixed width)", dont: "Use variable-width labels — values won't line up" },
      { do: "Group related fields with section headers", dont: "List 20+ fields without any grouping" },
      { do: "Use consistent formatting for values (dates, numbers, currencies)", dont: "Mix date formats or number formats within the same view" },
    ],
    figmaLinks: [],
    relatedComponents: ["Table", "ReadOnly", "Form"],
  },

  DropdownMenu: {
    description: "Context menu with keyboard navigation, submenus, checkboxes, and radio items.",
    category: "molecule",
    whenToUse: [
      "Right-click context menus",
      "Action menus with complex structure (submenus, checks)",
      "Kebab/three-dot menus on rows or cards",
    ],
    whenNotToUse: [
      "Simple option selection — use Dropdown or Select",
      "Navigation — use NavigationMenu",
      "Form inputs — use Select",
    ],
    designDosAndDonts: [
      { do: "Include keyboard shortcuts next to menu items when available", dont: "Nest more than 2 levels of submenus" },
      { do: "Use separators to group related items", dont: "Mix destructive actions with normal actions without separation" },
      { do: "Place destructive items at the bottom with danger styling", dont: "Put delete/remove actions at the top of the menu" },
    ],
    figmaLinks: [],
    relatedComponents: ["Dropdown", "Select", "Popconfirm"],
  },

  Empty: {
    description: "Placeholder component shown when there's no data to display.",
    category: "molecule",
    whenToUse: [
      "Empty tables, lists, or search results",
      "First-time use before any data exists",
      "Filtered views with no matching results",
    ],
    whenNotToUse: [
      "Loading states — use Skeleton",
      "Error states — use Alert or Result",
      "Permission denied — use Result with appropriate status",
    ],
    designDosAndDonts: [
      { do: "Include a clear action to resolve the empty state (create, import, adjust filters)", dont: "Show just 'No data' with no next step" },
      { do: "Differentiate between 'no data yet' and 'no matching results'", dont: "Use the same empty state message for every context" },
      { do: "Use an illustration to make the empty state friendly", dont: "Leave a completely blank area — users will think it's broken" },
    ],
    figmaLinks: [],
    relatedComponents: ["Result", "Illustration", "Skeleton"],
  },

  FilterDropdown: {
    description: "Specialized dropdown for filtering data with multi-select, search, and apply/clear controls.",
    category: "molecule",
    whenToUse: [
      "Table column filters",
      "Multi-select filter criteria",
      "Filter panels with search within options",
    ],
    whenNotToUse: [
      "Simple single selection — use Select",
      "Quick preset filters — use QuickFilters",
      "Date range filtering — use DatePicker with range mode",
    ],
    designDosAndDonts: [
      { do: "Show selected filter count on the trigger button", dont: "Hide active filter state — users must know what's filtered" },
      { do: "Include 'Clear all' and 'Apply' buttons", dont: "Apply filters on every checkbox click — use explicit apply" },
      { do: "Show search within filter options for lists >10 items", dont: "Load all filter options eagerly for very large datasets" },
    ],
    figmaLinks: [],
    relatedComponents: ["QuickFilters", "Select", "Dropdown"],
  },

  FloatButton: {
    description: "Floating action button fixed to the viewport, typically in the bottom-right corner.",
    category: "molecule",
    whenToUse: [
      "Primary action that should always be accessible (e.g., create new)",
      "Help/support chat trigger",
      "Scroll-to-top button",
    ],
    whenNotToUse: [
      "Multiple primary actions — use a toolbar",
      "Actions related to specific content — use inline buttons",
      "Desktop-focused apps — use toolbar or page header actions",
    ],
    designDosAndDonts: [
      { do: "Use for a single primary action per page", dont: "Stack multiple floating buttons" },
      { do: "Use a recognizable icon (plus, chat, arrow-up)", dont: "Use text-only floating buttons — they're too large" },
      { do: "Position in the bottom-right corner consistently", dont: "Move the float button position between pages" },
    ],
    figmaLinks: [],
    relatedComponents: ["Button", "Tooltip"],
  },

  HoverCard: {
    description: "Rich content popup shown on hover, providing a preview without navigating away.",
    category: "molecule",
    whenToUse: [
      "User profile previews on hover over usernames",
      "Link previews showing destination content",
      "Additional context that's useful but not essential",
    ],
    whenNotToUse: [
      "Short text hints — use Tooltip",
      "Interactive content with forms — use Popconfirm or Modal",
      "Critical information — show it inline",
    ],
    designDosAndDonts: [
      { do: "Keep hover card content scannable (avatar, name, key details)", dont: "Put full forms or complex interactions inside hover cards" },
      { do: "Add a delay before showing (300ms) to avoid flicker", dont: "Show hover cards on mobile — use tap-to-expand instead" },
      { do: "Include a link to the full detail page", dont: "Make hover cards the only way to access the information" },
    ],
    figmaLinks: [],
    relatedComponents: ["Tooltip", "Popconfirm", "UserProfile"],
  },

  Image: {
    description: "Enhanced image component with loading states, fallbacks, and preview capabilities.",
    category: "molecule",
    whenToUse: [
      "Content images that need loading/error states",
      "Image galleries with preview/zoom",
      "User-uploaded content display",
    ],
    whenNotToUse: [
      "User avatars — use Avatar",
      "Brand logos — use Logos",
      "Decorative icons — use Icons or Illustration",
    ],
    designDosAndDonts: [
      { do: "Always provide alt text for accessibility", dont: "Use images without alt attributes" },
      { do: "Show a skeleton or placeholder while loading", dont: "Let layout shift when images load" },
      { do: "Set explicit width/height or aspect ratio to prevent CLS", dont: "Leave images unsized causing layout jumps" },
    ],
    figmaLinks: [],
    relatedComponents: ["Avatar", "Illustration", "Upload"],
  },

  InputNumber: {
    description: "Numeric input with increment/decrement controls and optional min/max bounds.",
    category: "molecule",
    whenToUse: [
      "Quantity inputs (order amounts, item counts)",
      "Numeric settings (page size, timeout values)",
      "Any field requiring only numeric input",
    ],
    whenNotToUse: [
      "Free text with numbers — use Input",
      "Large range selection — use Slider",
      "Currency with formatting — use Input with currency mask",
    ],
    designDosAndDonts: [
      { do: "Set sensible min/max/step values", dont: "Allow negative numbers when they don't make sense" },
      { do: "Show increment/decrement buttons for discoverability", dont: "Rely only on keyboard arrows for changing values" },
      { do: "Format displayed numbers with locale-appropriate separators", dont: "Show raw unformatted numbers for large values" },
    ],
    figmaLinks: [],
    relatedComponents: ["Input", "Slider", "Select"],
  },

  List: {
    description: "Structured list component for displaying items with consistent layout and optional actions.",
    category: "molecule",
    whenToUse: [
      "Sequential items with simple structure",
      "Feed/timeline-style content",
      "Settings or preference lists",
    ],
    whenNotToUse: [
      "Data with multiple columns — use Table",
      "Card-based browsing — use Grid with Cards",
      "Hierarchical data — use Tree",
    ],
    designDosAndDonts: [
      { do: "Use consistent item structure (avatar, title, description, action)", dont: "Mix vastly different item layouts in the same list" },
      { do: "Add dividers between items for readability", dont: "Use both borders and large gaps — pick one" },
      { do: "Virtualize long lists (100+ items) for performance", dont: "Render 1000+ items in the DOM at once" },
    ],
    figmaLinks: [],
    relatedComponents: ["Table", "Card", "Tree"],
  },

  Loader: {
    description: "Full-page or section-level loading overlay with spinner and optional message.",
    category: "molecule",
    whenToUse: [
      "Page-level loading during navigation or data fetch",
      "Section loading within a layout",
      "Overlay loading during form submission",
    ],
    whenNotToUse: [
      "Component-level loading — use Spin",
      "Content placeholder — use Skeleton",
      "Background operations — use progress indicators",
    ],
    designDosAndDonts: [
      { do: "Show a message for operations longer than 2 seconds", dont: "Block the entire page when only a section is loading" },
      { do: "Use a semi-transparent overlay to maintain context", dont: "Flash a loader for operations under 300ms" },
      { do: "Allow cancellation for long operations when possible", dont: "Show a loader indefinitely — add a timeout with error state" },
    ],
    figmaLinks: [],
    relatedComponents: ["Spin", "Skeleton", "ProgressBar"],
  },

  Message: {
    description: "Lightweight, transient feedback notification that appears at the top of the viewport.",
    category: "molecule",
    whenToUse: [
      "Success confirmations for completed actions",
      "Brief error messages for failed operations",
      "Informational notices that auto-dismiss",
    ],
    whenNotToUse: [
      "Persistent information — use Alert",
      "Complex messages with actions — use Notification",
      "Field-level validation — use Input error state",
    ],
    variants: [
      { name: "success", description: "Green checkmark, positive feedback", useCase: "Save completed, item created" },
      { name: "error", description: "Red icon, operation failed", useCase: "API errors, validation failures" },
      { name: "warning", description: "Orange icon, caution notice", useCase: "Partial success, degraded state" },
      { name: "info", description: "Blue icon, neutral info", useCase: "General notices" },
    ],
    designDosAndDonts: [
      { do: "Auto-dismiss after 3-5 seconds", dont: "Keep messages visible indefinitely" },
      { do: "Stack multiple messages vertically if they overlap", dont: "Show more than 3 messages simultaneously" },
      { do: "Use for simple feedback that needs no action", dont: "Put action buttons in messages — use Notification instead" },
    ],
    figmaLinks: [],
    relatedComponents: ["Notification", "Alert"],
  },

  Notification: {
    description: "Rich toast notification with title, description, and optional action buttons.",
    category: "molecule",
    whenToUse: [
      "System notifications (new messages, updates)",
      "Action confirmations that include an undo option",
      "Async operation results that arrive later",
    ],
    whenNotToUse: [
      "Simple success/error feedback — use Message",
      "Inline page content — use Alert",
      "Blocking confirmations — use Modal",
    ],
    variants: [
      { name: "success", description: "Positive outcome notification", useCase: "Completed operations" },
      { name: "error", description: "Error notification with details", useCase: "Failed operations" },
      { name: "info", description: "Informational notification", useCase: "System updates, new features" },
    ],
    designDosAndDonts: [
      { do: "Include a dismiss button on every notification", dont: "Force users to wait for auto-dismiss" },
      { do: "Position in the top-right corner consistently", dont: "Mix notification positions across the app" },
      { do: "Include a relevant action button when appropriate (Undo, View, Retry)", dont: "Show more than 5 notifications at once — queue them" },
    ],
    figmaLinks: [],
    relatedComponents: ["Message", "Alert"],
  },

  ProgressBar: {
    description: "Visual indicator of completion progress, either determinate (percentage) or indeterminate.",
    category: "molecule",
    whenToUse: [
      "File upload progress",
      "Multi-step process completion",
      "Loading progress when percentage is known",
    ],
    whenNotToUse: [
      "Unknown progress duration — use Spin or indeterminate",
      "Step-based progress — use Steps",
      "Metric display — use Statistic",
    ],
    variants: [
      { name: "default", description: "Horizontal bar with fill", useCase: "Upload progress, task completion" },
      { name: "indeterminate", description: "Animated bar with no fixed percentage", useCase: "Unknown duration operations" },
      { name: "circular", description: "Ring/circle progress indicator", useCase: "Dashboard widgets, compact spaces" },
    ],
    designDosAndDonts: [
      { do: "Show percentage text alongside the bar", dont: "Use a progress bar without any indication of the value" },
      { do: "Use color to indicate health (green normal, red behind schedule)", dont: "Animate the bar erratically — smooth transitions only" },
      { do: "Update in real-time during active operations", dont: "Let the progress bar freeze — show indeterminate if updates stall" },
    ],
    figmaLinks: [],
    relatedComponents: ["Steps", "Spin", "Statistic"],
  },

  Rate: {
    description: "Star rating input for user feedback and reviews.",
    category: "molecule",
    whenToUse: [
      "User ratings and reviews",
      "Satisfaction surveys",
      "Quality scoring inputs",
    ],
    whenNotToUse: [
      "Numeric scoring — use InputNumber or Slider",
      "Binary feedback — use a thumbs up/down pattern",
      "Non-interactive display of scores — use Statistic",
    ],
    designDosAndDonts: [
      { do: "Use 5 stars as the standard scale", dont: "Use more than 10 rating points — it creates decision fatigue" },
      { do: "Allow half-star ratings for more granularity", dont: "Change the scale between different contexts in the app" },
      { do: "Show a text label for the selected rating (Excellent, Good, etc.)", dont: "Rely only on stars without textual context" },
    ],
    figmaLinks: [],
    relatedComponents: ["Statistic", "InputNumber"],
  },

  Slider: {
    description: "Range input for selecting a numeric value or range by dragging a handle along a track.",
    category: "molecule",
    whenToUse: [
      "Selecting from a continuous range (price, distance, weight)",
      "Adjusting settings with immediate visual feedback",
      "Range selection (min-max filters)",
    ],
    whenNotToUse: [
      "Precise numeric input — use InputNumber",
      "Small discrete options — use Select or RadioGroup",
      "Boolean toggle — use Switch",
    ],
    designDosAndDonts: [
      { do: "Show the current value in a label or tooltip", dont: "Hide the selected value — users need feedback" },
      { do: "Use step values appropriate to the domain", dont: "Use continuous values when only specific increments matter" },
      { do: "Pair with InputNumber for precise control", dont: "Use slider as the only input for exact values" },
    ],
    figmaLinks: [],
    relatedComponents: ["InputNumber", "ProgressBar"],
  },

  Tour: {
    description: "Guided walkthrough that highlights UI elements with step-by-step instructions.",
    category: "molecule",
    whenToUse: [
      "First-time user onboarding",
      "New feature announcements",
      "Complex workflow introduction",
    ],
    whenNotToUse: [
      "Static help content — use documentation or tooltips",
      "Error guidance — use Alert or inline messages",
      "Simple UI — if the interface is intuitive, don't add a tour",
    ],
    designDosAndDonts: [
      { do: "Keep steps short (3-7 steps max)", dont: "Create tours with 15+ steps — users will abandon them" },
      { do: "Allow skipping or dismissing at any point", dont: "Force users to complete the entire tour" },
      { do: "Highlight one element per step with clear description", dont: "Show multiple things in a single step" },
    ],
    figmaLinks: [],
    relatedComponents: ["Tooltip", "Steps", "Modal"],
  },

  Transfer: {
    description: "Dual-list selector for moving items between two lists (available/selected).",
    category: "molecule",
    whenToUse: [
      "Assigning items from a pool to a selection",
      "Permission/role assignment",
      "Configuring which columns to show/hide",
    ],
    whenNotToUse: [
      "Simple multi-select — use Select with multi mode",
      "Few options (under 10) — use Checkbox group",
      "Ordered lists — use drag-and-drop sortable list",
    ],
    designDosAndDonts: [
      { do: "Include search in both panels for large lists", dont: "Show transfer for fewer than 10 items — use checkboxes" },
      { do: "Show item count in each panel header", dont: "Remove items from source on transfer — keep them visible with 'selected' state" },
      { do: "Support bulk transfer (select all, move all)", dont: "Force one-at-a-time transfer for large lists" },
    ],
    figmaLinks: [],
    relatedComponents: ["Select", "Checkbox", "Table"],
  },

  Tree: {
    description: "Hierarchical tree view for displaying nested data with expand/collapse controls.",
    category: "molecule",
    whenToUse: [
      "File/folder structures",
      "Organizational hierarchies",
      "Nested category navigation",
    ],
    whenNotToUse: [
      "Flat lists — use List",
      "Breadcrumb-style hierarchy — use Breadcrumb",
      "Table with grouping — use Table with expandable rows",
    ],
    designDosAndDonts: [
      { do: "Show expand/collapse icons clearly", dont: "Expand all nodes by default — start collapsed" },
      { do: "Indent child nodes consistently (16-24px per level)", dont: "Nest more than 5 levels deep" },
      { do: "Use lazy loading for large trees", dont: "Load thousands of nodes at once" },
    ],
    figmaLinks: [],
    relatedComponents: ["TreeSelect", "List", "NavigationMenu"],
  },

  TreeSelect: {
    description: "Dropdown select that displays options in a tree hierarchy.",
    category: "molecule",
    whenToUse: [
      "Selecting from hierarchical options (department > team > person)",
      "Category selection with parent/child relationships",
      "Location pickers (country > state > city)",
    ],
    whenNotToUse: [
      "Flat option lists — use Select",
      "Independent multi-selections — use Checkbox group",
      "Browsing hierarchies — use Tree component",
    ],
    designDosAndDonts: [
      { do: "Allow searching within the tree", dont: "Show deeply nested trees without search" },
      { do: "Show the full path of selected item (e.g., 'Engineering > Frontend')", dont: "Show only the leaf node name without context" },
      { do: "Support selecting parent nodes to select all children", dont: "Force users to select each child individually" },
    ],
    figmaLinks: [],
    relatedComponents: ["Select", "Tree", "Cascader"],
  },

  Cascader: {
    description: "Multi-level dropdown for selecting from cascading categories.",
    category: "molecule",
    whenToUse: [
      "Multi-level category selection (region > city > area)",
      "Product categorization",
      "Hierarchical data where each level narrows the next",
    ],
    whenNotToUse: [
      "Independent selections — use multiple Selects",
      "Tree browsing — use Tree or TreeSelect",
      "Two-level selection — a simple Select group may suffice",
    ],
    designDosAndDonts: [
      { do: "Show the full selected path as the display value", dont: "Show only the last selection without parent context" },
      { do: "Support search across all levels", dont: "Require exact navigation through every level" },
      { do: "Load children lazily for large datasets", dont: "Pre-load all cascading options at once" },
    ],
    figmaLinks: [],
    relatedComponents: ["TreeSelect", "Select", "Breadcrumb"],
  },

  Popconfirm: {
    description: "Lightweight confirmation popup attached to a trigger element, for quick yes/no decisions.",
    category: "molecule",
    whenToUse: [
      "Quick confirmations for non-critical destructive actions",
      "Inline confirm/cancel that doesn't warrant a full Modal",
      "Actions where context is important (confirming which item)",
    ],
    whenNotToUse: [
      "Critical or irreversible actions — use Modal with detailed message",
      "Non-destructive actions — don't confirm at all",
      "Complex confirmation with form fields — use Modal",
    ],
    designDosAndDonts: [
      { do: "Use a clear question ('Delete this trip?')", dont: "Use generic text like 'Are you sure?'" },
      { do: "Use destructive button variant for the confirm action", dont: "Make the destructive action the default/primary button" },
      { do: "Position near the trigger element for context", dont: "Use popconfirm for actions affecting multiple items — use Modal" },
    ],
    figmaLinks: [],
    relatedComponents: ["Modal", "Dropdown", "Button"],
  },

  Mentions: {
    description: "Text input with @-mention autocomplete for referencing users or entities.",
    category: "molecule",
    whenToUse: [
      "Comment fields where users tag other users",
      "Chat or messaging inputs",
      "Any text field needing entity references",
    ],
    whenNotToUse: [
      "Selecting a single user — use Select with user search",
      "Non-interactive user display — use Badge or Avatar",
    ],
    designDosAndDonts: [
      { do: "Trigger the suggestion popup on @ character", dont: "Require users to click a button to mention someone" },
      { do: "Show avatar and name in suggestions for easy identification", dont: "Show only usernames without visual differentiation" },
      { do: "Highlight mentioned users visually in the text", dont: "Render mentions as plain text after submission" },
    ],
    figmaLinks: [],
    relatedComponents: ["Input", "Textarea", "Avatar"],
  },

  Watermark: {
    description: "Overlay watermark pattern on content for security or branding purposes.",
    category: "molecule",
    whenToUse: [
      "Confidential documents or previews",
      "Draft/preview states of content",
      "User-specific watermarks for leak tracking",
    ],
    whenNotToUse: [
      "Decorative backgrounds — use CSS patterns",
      "Branding in headers — use Logo",
    ],
    designDosAndDonts: [
      { do: "Use semi-transparent text at a diagonal angle", dont: "Make watermarks opaque enough to obstruct content" },
      { do: "Include user-identifying information when needed for security", dont: "Use watermarks on every page — reserve for sensitive content" },
      { do: "Make watermarks resistant to easy removal (CSS-based)", dont: "Rely solely on watermarks for content protection" },
    ],
    figmaLinks: [],
    relatedComponents: [],
  },

  RadioSelector: {
    description: "Card-style radio selection where each option is a rich, visual card rather than a simple radio button.",
    category: "molecule",
    whenToUse: [
      "Selecting from options that need visual representation",
      "Plan/tier selection",
      "Configuration choices with descriptions",
    ],
    whenNotToUse: [
      "Simple text options — use RadioGroup",
      "More than 6 options — use Select",
      "Multi-selection — use Checkbox cards",
    ],
    designDosAndDonts: [
      { do: "Include a title, description, and optional icon per card", dont: "Make cards too similar — each should be visually distinct" },
      { do: "Show clear selected state (border color, check icon)", dont: "Use only subtle background change for selection state" },
      { do: "Use consistent card sizes for all options", dont: "Mix card sizes based on content length" },
    ],
    figmaLinks: [],
    relatedComponents: ["RadioGroup", "Card", "ToggleGroup"],
  },

  // ── Additional Organisms ────────────────────────────────

  AppHeader: {
    description: "Top-level application header with logo, navigation, search, and user profile.",
    category: "organism",
    whenToUse: [
      "Main application shell header",
      "Consistent top bar across all pages",
    ],
    whenNotToUse: [
      "Page-level headers — use PageHeader",
      "Section headers — use Typography",
    ],
    designDosAndDonts: [
      { do: "Keep height fixed (48-64px) across the app", dont: "Change header height between pages" },
      { do: "Include logo, primary nav, and user profile dropdown", dont: "Overload the header with too many actions" },
      { do: "Make the header sticky at the top of viewport", dont: "Let the header scroll away on long pages" },
    ],
    figmaLinks: [],
    relatedComponents: ["NavigationMenu", "PageHeader", "UserProfileDropdown"],
  },

  Collapsible: {
    description: "Expandable/collapsible section with a trigger and animated content reveal.",
    category: "organism",
    whenToUse: [
      "FAQ or accordion-style content",
      "Optional/advanced settings sections",
      "Progressive disclosure of complex information",
    ],
    whenNotToUse: [
      "Tab-style content switching — use Tabs",
      "Content that should always be visible — show it directly",
      "Navigation — use NavigationMenu with collapsible sections",
    ],
    designDosAndDonts: [
      { do: "Show a clear expand/collapse indicator (chevron icon)", dont: "Make the trigger area too small to click" },
      { do: "Animate the expand/collapse smoothly", dont: "Allow multiple collapsibles to be open when they should be exclusive (use accordion)" },
      { do: "Start with the most important section expanded", dont: "Start with all sections collapsed — users won't know what's inside" },
    ],
    figmaLinks: [],
    relatedComponents: ["Tabs", "Card", "Drawer"],
  },

  DataEntryTable: {
    description: "Editable table designed for bulk data entry with inline editing, validation, and row management.",
    category: "organism",
    whenToUse: [
      "Bulk data entry (indent creation, allocation)",
      "Spreadsheet-like editing interfaces",
      "Editable row data with inline validation",
    ],
    whenNotToUse: [
      "Read-only data display — use Table",
      "Single record editing — use Form",
      "Complex forms per row — use repeatable Form sections",
    ],
    designDosAndDonts: [
      { do: "Show clear edit affordances (input borders, hover states)", dont: "Make cells look identical to read-only Table — users must know what's editable" },
      { do: "Validate inline on cell blur, not on every keystroke", dont: "Block the entire table on a single cell error" },
      { do: "Support tab navigation between editable cells", dont: "Require click-to-focus on every cell" },
    ],
    figmaLinks: [],
    relatedComponents: ["Table", "Form", "Input"],
  },

  DisplayBlock: {
    description: "Content display section with a title bar and content area, used for structured page sections.",
    category: "organism",
    whenToUse: [
      "Dashboard widgets with title and content",
      "Structured page sections",
      "Content grouping with header actions",
    ],
    whenNotToUse: [
      "Simple content grouping — use Card",
      "Collapsible sections — use Collapsible",
      "Full-page sections — use standard HTML sections",
    ],
    designDosAndDonts: [
      { do: "Use consistent title bar styling across the page", dont: "Mix DisplayBlock with plain Cards randomly" },
      { do: "Include relevant actions in the title bar (expand, settings)", dont: "Overload the title bar with too many controls" },
      { do: "Use for content that benefits from a clear labeled container", dont: "Wrap everything in DisplayBlocks — use them selectively" },
    ],
    figmaLinks: [],
    relatedComponents: ["Card", "Collapsible", "PageHeader"],
  },

  Grid: {
    description: "Responsive grid layout component for arranging items in rows and columns.",
    category: "organism",
    whenToUse: [
      "Card-based layouts (dashboards, product listings)",
      "Multi-column content arrangements",
      "Responsive layouts that reflow across breakpoints",
    ],
    whenNotToUse: [
      "Simple stacked layout — use flex with gap",
      "Tabular data — use Table",
      "Single-column content — use standard layout",
    ],
    designDosAndDonts: [
      { do: "Use consistent column counts per breakpoint (1-2 mobile, 3-4 desktop)", dont: "Mix different column counts arbitrarily" },
      { do: "Ensure cards within a row have equal height", dont: "Allow grid items to have wildly different heights" },
      { do: "Use gap tokens for consistent spacing", dont: "Use custom padding/margins between grid items" },
    ],
    figmaLinks: [],
    relatedComponents: ["Card", "DisplayBlock"],
  },

  QuickFilters: {
    description: "Horizontal row of filter chips for rapid data filtering with preset values.",
    category: "organism",
    whenToUse: [
      "Common filter presets above a Table or List",
      "Quick status filters (All, Active, Delayed, Completed)",
      "Milestone-based navigation tabs for tables",
    ],
    whenNotToUse: [
      "Complex multi-criteria filters — use FilterDropdown",
      "View switching — use Tabs or SegmentedTabs",
      "Search — use Input with search variant",
    ],
    designDosAndDonts: [
      { do: "Show counts alongside filter labels when possible", dont: "Show more than 8 quick filters — use dropdown overflow" },
      { do: "Highlight the active filter clearly", dont: "Allow no filter to be selected — always have an 'All' option" },
      { do: "Place directly above the data they filter", dont: "Separate filters from the data with other content" },
    ],
    figmaLinks: [],
    relatedComponents: ["FilterDropdown", "Tabs", "Badge"],
  },

  Result: {
    description: "Full-page or section result display for success, error, or info states with illustration and actions.",
    category: "organism",
    whenToUse: [
      "Submission success pages",
      "Error pages (403, 404, 500)",
      "Empty states with explanation and next action",
    ],
    whenNotToUse: [
      "Inline feedback — use Alert or Message",
      "Loading states — use Skeleton or Loader",
      "Transient notifications — use Notification",
    ],
    variants: [
      { name: "success", description: "Green checkmark with success message", useCase: "Form submitted, order placed" },
      { name: "error", description: "Red icon with error details", useCase: "Server error, permission denied" },
      { name: "info", description: "Blue icon with information", useCase: "Feature unavailable, maintenance" },
      { name: "404", description: "Not found state", useCase: "Page not found" },
    ],
    designDosAndDonts: [
      { do: "Include a clear action button (Go Home, Try Again, Contact Support)", dont: "Leave users on a dead-end page with no action" },
      { do: "Use an illustration appropriate to the context", dont: "Use the same generic illustration for every result type" },
      { do: "Provide a concise explanation of what happened", dont: "Show technical error messages to end users" },
    ],
    figmaLinks: [],
    relatedComponents: ["Alert", "Empty", "Illustration"],
  },

  UserProfile: {
    description: "User profile display component showing avatar, name, role, and key details.",
    category: "organism",
    whenToUse: [
      "Profile pages and sections",
      "User detail panels",
      "Account settings headers",
    ],
    whenNotToUse: [
      "Compact user display — use Avatar with name",
      "User selection — use Select or Mentions",
      "User lists — use List with Avatar items",
    ],
    designDosAndDonts: [
      { do: "Show the most important info first (name, role, contact)", dont: "Display every user field — prioritize by context" },
      { do: "Use a large avatar as the visual anchor", dont: "Use the same compact avatar size as inline mentions" },
      { do: "Include edit/settings action when the user views their own profile", dont: "Show edit actions on other users' profiles without permission" },
    ],
    figmaLinks: [],
    relatedComponents: ["Avatar", "UserProfileDropdown", "Descriptions"],
  },

  UserProfileDropdown: {
    description: "Header dropdown showing current user info with navigation to profile, settings, and logout.",
    category: "organism",
    whenToUse: [
      "App header user menu",
      "Quick access to profile, settings, and logout",
    ],
    whenNotToUse: [
      "Full profile display — use UserProfile",
      "User selection — use Select or Mentions",
    ],
    designDosAndDonts: [
      { do: "Show user name and avatar as the trigger", dont: "Use only a generic icon without the user's identity" },
      { do: "Include logout as the last item, separated by a divider", dont: "Place logout next to other navigation items without separation" },
      { do: "Show the user's role or organization for multi-tenant apps", dont: "Overload the dropdown with too many options — keep it focused" },
    ],
    figmaLinks: [],
    relatedComponents: ["UserProfile", "Avatar", "Dropdown"],
  },

  FileCard: {
    description: "Card component displaying file information with preview, metadata, and actions.",
    category: "organism",
    whenToUse: [
      "Uploaded file displays",
      "Document libraries and file listings",
      "Attachment previews in forms",
    ],
    whenNotToUse: [
      "Simple file name display — use text with icon",
      "Upload interface — use Upload or UploadZone",
      "Image galleries — use Image grid",
    ],
    designDosAndDonts: [
      { do: "Show file type icon, name, size, and upload date", dont: "Show only the filename without metadata" },
      { do: "Include actions (download, preview, delete) on hover or in a menu", dont: "Show all actions permanently — it clutters the display" },
      { do: "Show a thumbnail preview for image/PDF files", dont: "Attempt to preview unsupported file types" },
    ],
    figmaLinks: [],
    relatedComponents: ["Upload", "UploadItem", "FileThumbnail", "FileTypeIcon"],
  },

  UploadZone: {
    description: "Drag-and-drop file upload area with visual drop target and file type hints.",
    category: "organism",
    whenToUse: [
      "Primary file upload interfaces",
      "Bulk file upload with drag-and-drop",
      "When the upload is the main action on the page/section",
    ],
    whenNotToUse: [
      "Simple single file upload — use UploadButton",
      "Inline file attachment — use Upload",
      "When drag-and-drop isn't feasible (mobile) — use UploadButton",
    ],
    designDosAndDonts: [
      { do: "Show a clear dashed border and drop icon", dont: "Make the drop zone invisible — users need a visual target" },
      { do: "Highlight the zone visually when files are dragged over", dont: "Show no feedback during drag" },
      { do: "List accepted file types and max size clearly", dont: "Let users drop unsupported files and fail silently" },
    ],
    figmaLinks: [],
    relatedComponents: ["Upload", "UploadButton", "FileCard"],
  },

  StackedBarChart: {
    description: "Stacked horizontal or vertical bar chart for comparing composition across categories.",
    category: "molecule",
    whenToUse: [
      "Showing part-to-whole relationships across categories",
      "Comparing composition of multiple items",
      "Status distribution visualization (on-time, delayed, completed)",
    ],
    whenNotToUse: [
      "Trend over time — use line chart",
      "Single value — use Statistic or ProgressBar",
      "Exact value comparison — use Table",
    ],
    designDosAndDonts: [
      { do: "Use consistent colors for the same category across charts", dont: "Use more than 5-6 segments — group small values into 'Other'" },
      { do: "Include a legend and show values on hover", dont: "Rely only on color to differentiate segments — add labels" },
      { do: "Sort stacks by a meaningful order (largest first, or logical order)", dont: "Use random ordering of stack segments" },
    ],
    figmaLinks: [],
    relatedComponents: ["Statistic", "ProgressBar", "Table"],
  },

  PageHeaderFilters: {
    description: "Filter row that sits below a PageHeader, combining search, filters, and view controls.",
    category: "molecule",
    whenToUse: [
      "Table pages with header-level filters",
      "List views with search + filter combinations",
      "Dashboard pages with view controls",
    ],
    whenNotToUse: [
      "In-table column filters — use FilterDropdown per column",
      "Simple search — use Input with search icon",
      "Quick preset filters — use QuickFilters",
    ],
    designDosAndDonts: [
      { do: "Show the most-used filters visible, rest in 'More Filters'", dont: "Show all filters expanded by default — it pushes content down" },
      { do: "Show active filter count on the 'More Filters' button", dont: "Hide that filters are active — always show a clear indicator" },
      { do: "Include 'Clear All' when any filters are active", dont: "Make users clear each filter individually" },
    ],
    figmaLinks: [],
    relatedComponents: ["PageHeader", "FilterDropdown", "QuickFilters", "Input"],
  },

  SimpleColumnLayout: {
    description: "Simple responsive column layout utility for arranging content in 1-4 columns.",
    category: "molecule",
    whenToUse: [
      "Form layouts with side-by-side fields",
      "Detail pages with multiple content columns",
      "Dashboard sections with columnar arrangement",
    ],
    whenNotToUse: [
      "Complex grid layouts — use Grid",
      "Card grids — use Grid with Cards",
      "Single column content — use standard layout",
    ],
    designDosAndDonts: [
      { do: "Use 2 columns for desktop forms, 1 for mobile", dont: "Use more than 3 columns for form fields" },
      { do: "Ensure columns collapse gracefully on narrow screens", dont: "Use fixed column widths that break on small viewports" },
      { do: "Align field labels and inputs consistently across columns", dont: "Mix left-aligned and top-aligned labels within the same column layout" },
    ],
    figmaLinks: [],
    relatedComponents: ["Grid", "Form"],
  },

  ThemeSwitch: {
    description: "Toggle for switching between light and dark mode themes.",
    category: "molecule",
    whenToUse: [
      "Settings or header for theme preference",
      "When the app supports light/dark modes",
    ],
    whenNotToUse: [
      "When theme is fixed — don't show the option",
      "For other toggles — use Switch or SegmentedTabs",
    ],
    designDosAndDonts: [
      { do: "Use sun/moon icons for clear light/dark indication", dont: "Use text-only toggle for theme switching" },
      { do: "Persist the theme choice across sessions", dont: "Reset to default theme on every page load" },
      { do: "Apply theme change instantly without page reload", dont: "Flash or flicker during theme transitions" },
    ],
    figmaLinks: [],
    relatedComponents: ["Switch", "SegmentedTabs"],
  },

  NavigationPopover: {
    description: "Popover-based navigation for mega-menus or complex navigation structures.",
    category: "organism",
    whenToUse: [
      "Mega-menus with categorized navigation",
      "Module switchers with previews",
      "Complex navigation that doesn't fit in a simple dropdown",
    ],
    whenNotToUse: [
      "Simple page navigation — use NavigationMenu",
      "Action menus — use Dropdown or DropdownMenu",
      "Modal-style content — use Modal",
    ],
    designDosAndDonts: [
      { do: "Organize navigation items in clear categories", dont: "Show a flat list of 50+ items" },
      { do: "Include descriptions for navigation items when helpful", dont: "Use only icons without labels in a navigation popover" },
      { do: "Dismiss on outside click and Escape key", dont: "Make the popover persistent — it should be transient" },
    ],
    figmaLinks: [],
    relatedComponents: ["NavigationMenu", "Dropdown", "HoverCard"],
  },

  Footer: {
    description: "Page or application footer with links, copyright, and optional secondary navigation.",
    category: "organism",
    whenToUse: [
      "Marketing/public pages",
      "Full-page layouts that need footer content",
    ],
    whenNotToUse: [
      "Dashboard applications — typically don't need a footer",
      "Modal or drawer content",
    ],
    designDosAndDonts: [
      { do: "Keep footer content minimal — links, copyright, version", dont: "Put critical actions or navigation in the footer" },
      { do: "Use a muted background to visually separate from content", dont: "Make the footer compete visually with the main content" },
      { do: "Include app version number for support/debugging", dont: "Duplicate primary navigation in the footer" },
    ],
    figmaLinks: [],
    relatedComponents: ["AppHeader", "NavigationMenu"],
  },
};

/**
 * Get guidelines for a specific component.
 * Returns undefined if no guidelines exist.
 */
export function getComponentGuideline(
  componentName: string
): ComponentGuideline | undefined {
  return designerGuidelines[componentName];
}

/**
 * Get all component names that have guidelines.
 */
export function getComponentsWithGuidelines(): string[] {
  return Object.keys(designerGuidelines);
}
