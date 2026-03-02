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
          icon: "home",
        },
        {
          title: "AI Prompts",
          href: "/docs/ai-prompts",
          items: [],
          icon: "light-bulb",
        },
        {
          title: "For Designers",
          href: "/docs/for-designers",
          items: [],
          icon: "image",
        },
        {
          title: "For Developers",
          href: "/docs/for-developers",
          items: [],
          icon: "settings",
        },
        // {
        //   title: "Accessibility",
        //   href: "/docs/accessibility",
        //   items: [],
        // },
        // {
        //   title: "Migration Guides",
        //   href: "/docs/migrations",
        //   items: [],
        // },
        {
          title: "Storybook",
          href: "/docs/storybook",
          items: [],
          icon: "document",
        },
        {
          title: "NPM Package",
          href: "/docs/npm-package",
          items: [],
          icon: "download",
        },
        {
          title: "Global CSS",
          href: "/docs/global-css",
          items: [],
          icon: "settings",
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
          icon: "user",
        },
        {
          title: "Badge",
          href: "/docs/components/badge",
          items: [],
          icon: "star",
        },
        {
          title: "Button",
          href: "/docs/components/button",
          items: [],
          icon: "hand",
        },
        {
          title: "Checkbox",
          href: "/docs/components/checkbox",
          items: [],
          icon: "check",
        },
        {
          title: "Divider",
          href: "/docs/components/divider",
          items: [],
          icon: "filter",
        },
        {
          title: "Illustration",
          href: "/docs/components/illustration",
          items: [],
          icon: "image",
        },
        {
          title: "Input",
          href: "/docs/components/input",
          items: [],
          icon: "edit",
        },
        {
          title: "Label",
          href: "/docs/components/label",
          items: [],
          icon: "document",
        },
        {
          title: "Logo",
          href: "/docs/components/logo",
          items: [],
          icon: "image",
        },
        {
          title: "Radio Group",
          href: "/docs/components/radio-group",
          items: [],
          icon: "check",
        },
        {
          title: "Read Only",
          href: "/docs/components/read-only",
          items: [],
          icon: "eye-invisible",
        },
        {
          title: "Skeleton",
          href: "/docs/components/skeleton",
          items: [],
          icon: "loading",
        },
        {
          title: "Spacer",
          href: "/docs/components/spacer",
          items: [],
          icon: "expand",
        },
        {
          title: "Spin",
          href: "/docs/components/spin",
          items: [],
          icon: "loading",
        },
        {
          title: "Statistic",
          href: "/docs/components/statistic",
          items: [],
          icon: "data-stack",
        },
        {
          title: "Sub Text",
          href: "/docs/components/sub-text",
          items: [],
          icon: "document",
        },
        {
          title: "Switch",
          href: "/docs/components/switch",
          items: [],
          icon: "settings",
        },
        {
          title: "Text",
          href: "/docs/components/text",
          items: [],
          icon: "document",
        },
        {
          title: "Textarea",
          href: "/docs/components/textarea",
          items: [],
          icon: "edit",
        },
        {
          title: "Typography",
          href: "/docs/components/typography",
          items: [],
          icon: "document",
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
          icon: "alert-critical",
        },
        {
          title: "Anchor",
          href: "/docs/components/anchor",
          items: [],
        },
        {
          title: "Affix",
          href: "/docs/components/affix",
          items: [],
        },
        {
          title: "Back Top",
          href: "/docs/components/back-top",
          items: [],
        },
        {
          title: "Breadcrumb",
          href: "/docs/components/breadcrumb",
          items: [],
        },
        {
          title: "Button Group",
          href: "/docs/components/button-group",
          items: [],
        },
        {
          title: "Calendar",
          href: "/docs/components/calendar",
          items: [],
        },
        {
          title: "Carousel",
          href: "/docs/components/carousel",
          items: [],
        },
        {
          title: "Cascader",
          href: "/docs/components/cascader",
          items: [],
        },
        {
          title: "Chicklet",
          href: "/docs/components/chicklet",
          items: [],
        },
        {
          title: "Color Picker",
          href: "/docs/components/color-picker",
          items: [],
        },
        {
          title: "Date Picker",
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
          title: "Dropdown Menu",
          href: "/docs/components/dropdown-menu",
          items: [],
        },
        {
          title: "Empty",
          href: "/docs/components/empty",
          items: [],
        },
        {
          title: "File Validation Card",
          href: "/docs/components/file-validation-card",
          items: [],
        },
        {
          title: "Float Button",
          href: "/docs/components/float-button",
          items: [],
        },
        {
          title: "Image",
          href: "/docs/components/image",
          items: [],
        },
        {
          title: "Hover Card",
          href: "/docs/components/hover-card",
          items: [],
        },
        {
          title: "Input Number",
          href: "/docs/components/input-number",
          items: [],
        },
        {
          title: "Mentions",
          href: "/docs/components/mentions",
          items: [],
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
          title: "Progress Bar",
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
          title: "Progress List",
          href: "/docs/components/progress-list",
          items: [],
        },
        {
          title: "Radio Selector",
          href: "/docs/components/radio-selector",
          items: [],
        },
        {
          title: "Rate",
          href: "/docs/components/rate",
          items: [],
        },
        {
          title: "Segmented Tabs",
          href: "/docs/components/segmented-tabs",
          items: [],
        },
        {
          title: "Simple Column Layout",
          href: "/docs/components/simple-column-layout",
          items: [],
        },
        {
          title: "Slider",
          href: "/docs/components/slider",
          items: [],
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
        },
        {
          title: "Time Picker",
          href: "/docs/components/time-picker",
          items: [],
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
          title: "Toggle Group",
          href: "/docs/components/toggle-group",
          items: [],
        },
        {
          title: "Tour",
          href: "/docs/components/tour",
          items: [],
        },
        {
          title: "Transfer",
          href: "/docs/components/transfer",
          items: [],
        },
        {
          title: "Tree",
          href: "/docs/components/tree",
          items: [],
        },
        {
          title: "Tree Select",
          href: "/docs/components/tree-select",
          items: [],
        },
        {
          title: "Upload Button",
          href: "/docs/components/upload-button",
          items: [],
        },
        {
          title: "Upload Item",
          href: "/docs/components/upload-item",
          items: [],
        },
        {
          title: "Upload Thumbnail",
          href: "/docs/components/upload-thumbnail",
          items: [],
        },
        {
          title: "Watermark",
          href: "/docs/components/watermark",
          items: [],
        },
      ],
    },
    {
      title: "Organisms",
      items: [
        {
          title: "App Header",
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
          title: "Data Entry Table",
          href: "/docs/components/data-entry-table",
          items: [],
        },
        {
          title: "Drawer",
          href: "/docs/components/drawer",
          items: [],
        },
        {
          title: "File Card",
          href: "/docs/components/file-card",
          items: [],
        },
        {
          title: "File Thumbnail",
          href: "/docs/components/file-thumbnail",
          items: [],
        },
        {
          title: "File Type Icon",
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
        },
        {
          title: "Grid",
          href: "/docs/components/grid",
          items: [],
        },
        {
          title: "Modal",
          href: "/docs/components/modal",
          items: [],
        },
        {
          title: "Page Header",
          href: "/docs/components/page-header",
          items: [],
        },
        {
          title: "Navigation Launcher",
          href: "/docs/components/navigation-launcher",
          items: [],
        },
        {
          title: "Navigation Popover",
          href: "/docs/components/navigation-popover",
          items: [],
        },
        {
          title: "Quick Filters",
          href: "/docs/components/quick-filters",
          items: [],
        },
        {
          title: "Result",
          href: "/docs/components/result",
          items: [],
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
          title: "Upload Zone",
          href: "/docs/components/upload-zone",
          items: [],
        },
        {
          title: "User Profile",
          href: "/docs/components/user-profile",
          items: [],
        },
        {
          title: "User Profile Dropdown",
          href: "/docs/components/user-profile-dropdown",
          items: [],
        }
      ],
    },
  ],
}
