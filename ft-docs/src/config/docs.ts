import { MainNavItem, SidebarNavItem } from "@/types/nav"
import { BookOpen, Package, Blocks, Palette, BookMarked, Github, Star, BarChart } from "lucide-react"

interface DocsConfig {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
      icon: BookOpen,
    },
    {
      title: "Components",
      href: "/docs/components/button",
      icon: Package,
    },
    {
      title: "Blocks",
      href: "/blocks",
      icon: Blocks,
    },
    {
      title: "Colors",
      href: "/colors",
      icon: Palette,
    },
    {
      title: "Icons",
      href: "/icons",
      icon: Star,
    },
    {
      title: "Charts",
      href: "/charts",
      icon: BarChart,
    },
    {
      title: "Storybook",
      href: "http://localhost:6006",
      external: true,
      icon: BookMarked,
    },
    {
      title: "GitHub",
      href: "https://github.com/chetanft/components",
      external: true,
      icon: Github,
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
          title: "Icon",
          href: "/docs/components/icon",
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
          title: "Logos",
          href: "/docs/components/logos",
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
          badge: "Figma not available",
        },
        {
          title: "Spacer",
          href: "/docs/components/spacer",
          items: [],
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
          badge: "Figma not available",
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
          badge: "Figma not available",
        },
        {
          title: "Breadcrumb",
          href: "/docs/components/breadcrumb",
          items: [],
          badge: "Figma not available",
        },
        {
          title: "ButtonGroup",
          href: "/docs/components/button-group",
          items: [],
        },
        {
          title: "Chicklet",
          href: "/docs/components/chicklet",
          items: [],
        },
        {
          title: "DatePicker",
          href: "/docs/components/date-picker",
          items: [],
        },
        {
          title: "Dropdown",
          href: "/docs/components/dropdown",
          items: [],
        },
        {
          title: "FileValidationCard",
          href: "/docs/components/file-validation-card",
          items: [],
        },
        {
          title: "ProgressBar",
          href: "/docs/components/progress-bar",
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
          title: "StackedBarChart",
          href: "/docs/components/stacked-bar-chart",
          items: [],
        },
        {
          title: "Steps",
          href: "/docs/components/steps",
          items: [],
        },
        {
          title: "Tooltip",
          href: "/docs/components/tooltip",
          items: [],
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
          title: "Notification",
          href: "/docs/components/notification",
          items: [],
          badge: "Figma not available",
        },
        {
          title: "Pagination",
          href: "/docs/components/pagination",
          items: [],
          badge: "Figma not available",
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
          title: "FileCard",
          href: "/docs/components/file-card",
          items: [],
        },
        {
          title: "Drawer",
          href: "/docs/components/drawer",
          items: [],
          badge: "Figma not available",
        },
        {
          title: "FileThumbnail",
          href: "/docs/components/file-thumbnail",
          items: [],
        },
        {
          title: "Footer",
          href: "/docs/components/footer",
          items: [],
        },
        {
          title: "Modal",
          href: "/docs/components/modal",
          items: [],
          badge: "Figma not available",
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
  ],
}
