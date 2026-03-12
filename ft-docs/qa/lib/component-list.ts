/**
 * Component list derived from the story manifest.
 * Single source of truth for which components the QA pipeline checks.
 */

// Mirror of storyPathMap keys — kept as a static list so QA tests
// don't need to resolve ES module dynamic imports at test time.
// Regenerate with: node -e "require('./src/lib/story-manifest').storyPathMap" | ...
// Or maintain manually when components are added/removed.

const COMPONENT_NAMES = [
  "Affix", "Alert", "Anchor", "AppHeader", "Avatar", "BackTop", "Badge",
  "Breadcrumb", "Button", "ButtonGroup", "Calendar", "Card", "Carousel",
  "Cascader", "Checkbox", "Chicklet", "Collapsible", "ColorPicker",
  "DataEntryTable", "DatePicker", "Descriptions", "Divider", "Drawer",
  "Dropdown", "DropdownMenu", "Empty", "FileCard", "FileThumbnail",
  "FileTypeIcon", "FileValidationCard", "FloatButton", "Footer", "Form",
  "Grid", "HoverCard", "Illustration", "Image", "Input", "InputNumber",
  "Label", "List", "Loader", "Logo", "Mentions", "Modal",
  "NavigationLauncher", "NavigationPopover", "Notification", "PageHeader",
  "Pagination", "Popconfirm", "ProgressBar", "ProgressList", "QuickFilters",
  "RadioGroup", "RadioSelector", "Rate", "ReadOnly", "Result",
  "SegmentedTabs", "SimpleColumnLayout", "Skeleton", "Slider", "Spacer",
  "Spin", "Statistic", "Steps", "SubText", "Switch", "Table", "Tabs",
  "Text", "Textarea", "Timeline", "TimePicker", "Toggle", "ToggleGroup",
  "Tooltip", "Tour", "Transfer", "Tree", "TreeSelect", "Typography",
  "Upload", "UploadButton", "UploadItem", "UploadThumbnail", "UploadZone",
  "UserProfile", "UserProfileDropdown", "Watermark",
];

// Non-component entries in the manifest (design system references, not components)
const SKIP_LIST = new Set(["ColorSystem", "ThemeSystem"]);

export interface ComponentEntry {
  name: string;
  slug: string;
  url: string;
}

/** Convert PascalCase to kebab-case slug */
function toSlug(name: string): string {
  return name
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .toLowerCase();
}

export const COMPONENTS: ComponentEntry[] = COMPONENT_NAMES
  .filter((name) => !SKIP_LIST.has(name))
  .map((name) => ({
    name,
    slug: toSlug(name),
    url: `/docs/components/${toSlug(name)}`,
  }));
