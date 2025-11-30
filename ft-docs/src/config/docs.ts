import { MainNavItem, SidebarNavItem } from "@/types/nav"

interface DocsConfig {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "Components",
      href: "/docs/components/button",
    },
    {
      title: "Colors",
      href: "/colors",
    },
    {
      title: "Charts",
      href: "/charts",
    },
    {
      title: "Icons",
      href: "/icons",
    },
    {
      title: "Blocks",
      href: "/blocks",
    },
    {
      title: "GitHub",
      href: "https://github.com/chetanft/components",
      external: true,
    },
  ],
  sidebarNav: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Introduction",
          href: "/docs",
          items: [],
        },
        {
          title: "AI Prompts",
          href: "/docs/ai-prompts",
          items: [],
        },
        {
          title: "Storybook",
          href: "/docs/storybook",
          items: [],
        },
        {
          title: "NPM Package",
          href: "/docs/npm-package",
          items: [],
        },
        {
          title: "Global CSS",
          href: "/docs/global-css",
          items: [],
        },
      ],
    },
    {
      title: "Atoms",
      items: [
        {
          title: "Avatar",
          href: "/docs/components/avatar",
          items: [],
        },
        {
          title: "Badge",
          href: "/docs/components/badge",
          items: [],
        },
        {
          title: "Button",
          href: "/docs/components/button",
          items: [],
        },
        {
          title: "Checkbox",
          href: "/docs/components/checkbox",
          items: [],
        },
        {
          title: "Divider",
          href: "/docs/components/divider",
          items: [],
        },
        {
          title: "Illustration",
          href: "/docs/components/illustration",
          items: [],
        },
        {
          title: "Input",
          href: "/docs/components/input",
          items: [],
        },
        {
          title: "Label",
          href: "/docs/components/label",
          items: [],
        },
        {
          title: "Logo",
          href: "/docs/components/logo",
          items: [],
        },
        {
          title: "RadioGroup",
          href: "/docs/components/radio-group",
          items: [],
        },
        {
          title: "ReadOnly",
          href: "/docs/components/read-only",
          items: [],
        },
        {
          title: "Skeleton",
          href: "/docs/components/skeleton",
          items: [],
        },
        {
          title: "Spacer",
          href: "/docs/components/spacer",
          items: [],
        },
        {
          title: "Spin",
          href: "/docs/components/spin",
          items: [],
          badge: "New",
        },
        {
          title: "Statistic",
          href: "/docs/components/statistic",
          items: [],
        },
        {
          title: "SubText",
          href: "/docs/components/sub-text",
          items: [],
        },
        {
          title: "Switch",
          href: "/docs/components/switch",
          items: [],
        },
        {
          title: "Text",
          href: "/docs/components/text",
          items: [],
        },
        {
          title: "Textarea",
          href: "/docs/components/textarea",
          items: [],
        },
        {
          title: "Typography",
          href: "/docs/components/typography",
          items: [],
        }
      ],
    },
    {
      title: "Molecules",
      items: [
        {
          title: "Alert",
          href: "/docs/components/alert",
          items: [],
        },
        {
          title: "Anchor",
          href: "/docs/components/anchor",
          items: [],
          badge: "New",
        },
        {
          title: "Affix",
          href: "/docs/components/affix",
          items: [],
          badge: "New",
        },
        {
          title: "BackTop",
          href: "/docs/components/back-top",
          items: [],
          badge: "New",
        },
        {
          title: "Breadcrumb",
          href: "/docs/components/breadcrumb",
          items: [],
        },
        {
          title: "ButtonGroup",
          href: "/docs/components/button-group",
          items: [],
        },
        {
          title: "Calendar",
          href: "/docs/components/calendar",
          items: [],
          badge: "New",
        },
        {
          title: "Carousel",
          href: "/docs/components/carousel",
          items: [],
          badge: "New",
        },
        {
          title: "Cascader",
          href: "/docs/components/cascader",
          items: [],
          badge: "New",
        },
        {
          title: "Chicklet",
          href: "/docs/components/chicklet",
          items: [],
        },
        {
          title: "ColorPicker",
          href: "/docs/components/color-picker",
          items: [],
          badge: "New",
        },
        {
          title: "DatePicker",
          href: "/docs/components/date-picker",
          items: [],
        },
        {
          title: "Descriptions",
          href: "/docs/components/descriptions",
          items: [],
        },
        {
          title: "Dropdown",
          href: "/docs/components/dropdown",
          items: [],
        },
        {
          title: "DropdownMenu",
          href: "/docs/components/dropdown-menu",
          items: [],
          badge: "New",
        },
        {
          title: "Empty",
          href: "/docs/components/empty",
          items: [],
          badge: "New",
        },
        {
          title: "FileValidationCard",
          href: "/docs/components/file-validation-card",
          items: [],
        },
        {
          title: "FloatButton",
          href: "/docs/components/float-button",
          items: [],
          badge: "New",
        },
        {
          title: "Image",
          href: "/docs/components/image",
          items: [],
          badge: "New",
        },
        {
          title: "HoverCard",
          href: "/docs/components/hover-card",
          items: [],
        },
        {
          title: "InputNumber",
          href: "/docs/components/input-number",
          items: [],
          badge: "New",
        },
        {
          title: "Mentions",
          href: "/docs/components/mentions",
          items: [],
          badge: "New",
        },
        {
          title: "Notification",
          href: "/docs/components/notification",
          items: [],
        },
        {
          title: "Pagination",
          href: "/docs/components/pagination",
          items: [],
        },
        {
          title: "Popconfirm",
          href: "/docs/components/popconfirm",
          items: [],
        },
        {
          title: "ProgressBar",
          href: "/docs/components/progress-bar",
          items: [],
        },
        {
          title: "Loader",
          href: "/docs/components/loader",
          items: [],
        },
        {
          title: "List",
          href: "/docs/components/list",
          items: [],
        },
        {
          title: "ProgressList",
          href: "/docs/components/progress-list",
          items: [],
        },
        {
          title: "RadioSelector",
          href: "/docs/components/radio-selector",
          items: [],
        },
        {
          title: "Rate",
          href: "/docs/components/rate",
          items: [],
          badge: "New",
        },
        {
          title: "SegmentedTabs",
          href: "/docs/components/segmented-tabs",
          items: [],
        },
        {
          title: "SimpleColumnLayout",
          href: "/docs/components/simple-column-layout",
          items: [],
        },
        {
          title: "Slider",
          href: "/docs/components/slider",
          items: [],
          badge: "New",
        },
        {
          title: "Steps",
          href: "/docs/components/steps",
          items: [],
        },
        {
          title: "Timeline",
          href: "/docs/components/timeline",
          items: [],
          badge: "New",
        },
        {
          title: "TimePicker",
          href: "/docs/components/time-picker",
          items: [],
          badge: "New",
        },
        {
          title: "Tooltip",
          href: "/docs/components/tooltip",
          items: [],
        },
        {
          title: "Toggle",
          href: "/docs/components/toggle",
          items: [],
        },
        {
          title: "ToggleGroup",
          href: "/docs/components/toggle-group",
          items: [],
        },
        {
          title: "Tour",
          href: "/docs/components/tour",
          items: [],
          badge: "New",
        },
        {
          title: "Transfer",
          href: "/docs/components/transfer",
          items: [],
          badge: "New",
        },
        {
          title: "Tree",
          href: "/docs/components/tree",
          items: [],
          badge: "New",
        },
        {
          title: "TreeSelect",
          href: "/docs/components/tree-select",
          items: [],
          badge: "New",
        },
        {
          title: "UploadButton",
          href: "/docs/components/upload-button",
          items: [],
        },
        {
          title: "UploadItem",
          href: "/docs/components/upload-item",
          items: [],
        },
        {
          title: "UploadThumbnail",
          href: "/docs/components/upload-thumbnail",
          items: [],
        },
        {
          title: "Watermark",
          href: "/docs/components/watermark",
          items: [],
          badge: "New",
        },
      ],
    },
    {
      title: "Organisms",
      items: [
        {
          title: "AppHeader",
          href: "/docs/components/app-header",
          items: [],
        },
        {
          title: "Card",
          href: "/docs/components/card",
          items: [],
        },
        {
          title: "Collapsible",
          href: "/docs/components/collapsible",
          items: [],
        },
        {
          title: "Drawer",
          href: "/docs/components/drawer",
          items: [],
        },
        {
          title: "FileCard",
          href: "/docs/components/file-card",
          items: [],
        },
        {
          title: "FileThumbnail",
          href: "/docs/components/file-thumbnail",
          items: [],
        },
        {
          title: "FileTypeIcon",
          href: "/docs/components/file-type-icon",
          items: [],
        },
        {
          title: "Footer",
          href: "/docs/components/footer",
          items: [],
        },
        {
          title: "Form",
          href: "/docs/components/form",
          items: [],
          badge: "New",
        },
        {
          title: "Grid",
          href: "/docs/components/grid",
          items: [],
          badge: "New",
        },
        {
          title: "Modal",
          href: "/docs/components/modal",
          items: [],
        },
        {
          title: "PageHeader",
          href: "/docs/components/page-header",
          items: [],
          badge: "New",
        },
        {
          title: "NavigationLauncher",
          href: "/docs/components/navigation-launcher",
          items: [],
        },
        {
          title: "NavigationPopover",
          href: "/docs/components/navigation-popover",
          items: [],
        },
        {
          title: "QuickFilters",
          href: "/docs/components/quick-filters",
          items: [],
        },
        {
          title: "Result",
          href: "/docs/components/result",
          items: [],
          badge: "New",
        },
        {
          title: "Table",
          href: "/docs/components/table",
          items: [],
        },
        {
          title: "Tabs",
          href: "/docs/components/tabs",
          items: [],
        },
        {
          title: "Upload",
          href: "/docs/components/upload",
          items: [],
        },
        {
          title: "UploadZone",
          href: "/docs/components/upload-zone",
          items: [],
        },
        {
          title: "UserProfile",
          href: "/docs/components/user-profile",
          items: [],
        },
        {
          title: "UserProfileDropdown",
          href: "/docs/components/user-profile-dropdown",
          items: [],
        }
      ],
    },
    {
      title: "Design System",
      items: [
        {
          title: "ColorSystem",
          href: "/docs/components/color-system",
          items: [],
        },
        {
          title: "ThemeSystem",
          href: "/docs/components/theme-system",
          items: [],
        }
      ],
    },
  ],
}
