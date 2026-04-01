// AUTO-GENERATED — DO NOT EDIT
// Source: scripts/lib/generate-component-machine-metadata.cjs

export interface ComponentMachineMetadata {
  componentName: string;
  slug: string;
  sourcePath: string;
  description: string;
  tags: string[];
  propNames: string[];
  sizeOptions: string[];
  variantOptions: string[];
  storyCount: number;
}

export const COMPONENT_MACHINE_METADATA: Record<string, ComponentMachineMetadata> = {
  "Affix": {
    "componentName": "Affix",
    "slug": "affix",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/Affix/Affix.stories.tsx",
    "description": "Glass style variant",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "glass"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 2
  },
  "Alert": {
    "componentName": "Alert",
    "slug": "alert",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/Alert/Alert.stories.tsx",
    "description": "A composable alert component for displaying contextual feedback messages. Supports info, success, warning, and danger variants with optional actions and close buttons.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "variant",
      "radius"
    ],
    "sizeOptions": [],
    "variantOptions": [
      "info",
      "success",
      "warning",
      "danger"
    ],
    "storyCount": 5
  },
  "Anchor": {
    "componentName": "Anchor",
    "slug": "anchor",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/Anchor/Anchor.stories.tsx",
    "description": "Glass style variant",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "glass"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 3
  },
  "AppHeader": {
    "componentName": "AppHeader",
    "slug": "app-header",
    "sourcePath": "/Users/user/Documents/components/src/stories/AppHeader.stories.tsx",
    "description": "Application header component with FreightTiger logo on the left, notifications, and user profile.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "user",
      "showThemeIcon",
      "glass",
      "showGlassToggle",
      "showExpandButton",
      "isExpanded",
      "onExpandToggle"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 4
  },
  "Avatar": {
    "componentName": "Avatar",
    "slug": "avatar",
    "sourcePath": "/Users/user/Documents/components/src/components/atoms/Avatar/Avatar.stories.tsx",
    "description": "",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "size",
      "shape"
    ],
    "sizeOptions": [
      "xxs",
      "xs",
      "sm",
      "md",
      "lg",
      "xl",
      "xxl"
    ],
    "variantOptions": [],
    "storyCount": 4
  },
  "BackTop": {
    "componentName": "BackTop",
    "slug": "back-top",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/BackTop/BackTop.stories.tsx",
    "description": "Scroll height threshold before the button appears.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "visibilityHeight",
      "glass",
      "onClick"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 2
  },
  "Badge": {
    "componentName": "Badge",
    "slug": "badge",
    "sourcePath": "/Users/user/Documents/components/src/components/atoms/Badge/Badge.stories.tsx",
    "description": "A badge component for status indicators, labels, and counts. Supports composable sub-components for flexible content.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "variant",
      "size"
    ],
    "sizeOptions": [
      "xs",
      "sm",
      "md",
      "lg"
    ],
    "variantOptions": [
      "default",
      "error",
      "success",
      "warning",
      "neutral",
      "info",
      "danger",
      "normal"
    ],
    "storyCount": 3
  },
  "Breadcrumb": {
    "componentName": "Breadcrumb",
    "slug": "breadcrumb",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/Breadcrumb/Breadcrumb.stories.tsx",
    "description": "A breadcrumb navigation component for showing the current page location within a hierarchy.",
    "tags": [
      "autodocs"
    ],
    "propNames": [],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 3
  },
  "Button": {
    "componentName": "Button",
    "slug": "button",
    "sourcePath": "/Users/user/Documents/components/src/components/atoms/Button/Button.stories.tsx",
    "description": "",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "variant",
      "size",
      "icon",
      "iconPosition",
      "disabled",
      "loading",
      "shape",
      "glass"
    ],
    "sizeOptions": [
      "xs",
      "sm",
      "md",
      "lg",
      "xl",
      "xxl"
    ],
    "variantOptions": [
      "primary",
      "secondary",
      "destructive",
      "text",
      "link"
    ],
    "storyCount": 7
  },
  "ButtonGroup": {
    "componentName": "ButtonGroup",
    "slug": "button-group",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/ButtonGroup/ButtonGroup.stories.tsx",
    "description": "Button group component for grouping related actions together.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "glass"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 3
  },
  "Calendar": {
    "componentName": "Calendar",
    "slug": "calendar",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/Calendar/Calendar.stories.tsx",
    "description": "A standalone calendar component for date display and selection. Built using FT Design System tokens.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "mode",
      "fullscreen",
      "glass"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 10
  },
  "Card": {
    "componentName": "Card",
    "slug": "card",
    "sourcePath": "/Users/user/Documents/components/src/stories/Card.stories.tsx",
    "description": "A flexible card container for grouping related content and actions. Use composable sub-components (CardHeader, CardTitle, CardBody, CardFooter) for flexible layouts.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "extra",
      "bordered",
      "hoverable",
      "loading",
      "size",
      "actions",
      "cover",
      "contentVariant",
      "eyebrowLeft",
      "eyebrowRight",
      "headerTitle",
      "headerSubText",
      "showArrowIcon",
      "bodySections",
      "footerText",
      "footerButton",
      "showFooter",
      "showEyebrow",
      "graphic",
      "glass"
    ],
    "sizeOptions": [
      "sm",
      "md"
    ],
    "variantOptions": [],
    "storyCount": 2
  },
  "Carousel": {
    "componentName": "Carousel",
    "slug": "carousel",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/Carousel/Carousel.stories.tsx",
    "description": "A carousel/slider component for cycling through content. Built using FT Design System tokens.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "effect",
      "dotPosition",
      "autoplay",
      "dots",
      "arrows",
      "infinite"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 6
  },
  "Cascader": {
    "componentName": "Cascader",
    "slug": "cascader",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/Cascader/Cascader.stories.tsx",
    "description": "A cascading selector component for selecting from hierarchical data.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "size",
      "expandTrigger",
      "showSearch",
      "allowClear",
      "changeOnSelect",
      "disabled",
      "label",
      "error",
      "helperText"
    ],
    "sizeOptions": [
      "xxs",
      "xs",
      "sm",
      "md",
      "lg",
      "xl",
      "xxl"
    ],
    "variantOptions": [],
    "storyCount": 2
  },
  "Checkbox": {
    "componentName": "Checkbox",
    "slug": "checkbox",
    "sourcePath": "/Users/user/Documents/components/src/components/atoms/Checkbox/Checkbox.stories.tsx",
    "description": "A flexible checkbox component with support for labels, descriptions, error states, and indeterminate state.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "size",
      "disabled",
      "indeterminate"
    ],
    "sizeOptions": [
      "sm",
      "md"
    ],
    "variantOptions": [],
    "storyCount": 6
  },
  "Chicklet": {
    "componentName": "Chicklet",
    "slug": "chicklet",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/Chicklet/Chicklet.stories.tsx",
    "description": "A compact label element (chicklet/chip) used for tags, filters, and selections. Supports rounded and rectangular variants.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "variant",
      "glass"
    ],
    "sizeOptions": [],
    "variantOptions": [
      "rectangular",
      "rounded"
    ],
    "storyCount": 8
  },
  "Chip": {
    "componentName": "Chip",
    "slug": "chip",
    "sourcePath": "/Users/user/Documents/components/src/components/atoms/Chip/Chip.stories.tsx",
    "description": "A selectable chip component for filters, categories, and multi-option selection. Supports single and group selection modes.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "label",
      "selected",
      "variant",
      "size",
      "icon",
      "disabled",
      "onRemove",
      "glass",
      "className"
    ],
    "sizeOptions": [
      "sm",
      "md",
      "lg"
    ],
    "variantOptions": [
      "outlined",
      "filled"
    ],
    "storyCount": 12
  },
  "Collapsible": {
    "componentName": "Collapsible",
    "slug": "collapsible",
    "sourcePath": "/Users/user/Documents/components/src/components/organisms/Collapsible/Collapsible.stories.tsx",
    "description": "A collapsible component that can expand and collapse content. Supports different types and backgrounds.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "type",
      "bg"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 3
  },
  "ColorPicker": {
    "componentName": "ColorPicker",
    "slug": "color-picker",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/ColorPicker/ColorPicker.stories.tsx",
    "description": "Color picker component for selecting colors with preset palettes. Text display is always enabled.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "value",
      "defaultValue",
      "defaultFormat",
      "disabled",
      "size",
      "presets",
      "glass",
      "onChange"
    ],
    "sizeOptions": [
      "sm",
      "md",
      "lg"
    ],
    "variantOptions": [],
    "storyCount": 3
  },
  "ColorSystem": {
    "componentName": "ColorSystem",
    "slug": "color-system",
    "sourcePath": "/Users/user/Documents/components/src/stories/ColorSystem.stories.tsx",
    "description": "Complete color system showing primary, secondary, and semantic colors organized by theme mode.",
    "tags": [],
    "propNames": [],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 2
  },
  "DataEntryTable": {
    "componentName": "DataEntryTable",
    "slug": "data-entry-table",
    "sourcePath": "/Users/user/Documents/components/src/stories/DataEntryTable.stories.tsx",
    "description": "Composable data entry table for editable rows with selectable mode and mixed cell types.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "selectable",
      "resizable",
      "showContextMenu",
      "selectedRows",
      "cellErrors",
      "glass",
      "onCellChange",
      "onRowAdd",
      "onRowDelete",
      "onSelectionChange"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 2
  },
  "DatePicker": {
    "componentName": "DatePicker",
    "slug": "date-picker",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/DatePicker/DatePicker.stories.tsx",
    "description": "Date picker component for selecting single dates or date ranges. Supports both composable API (recommended) and declarative API (deprecated).",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "size",
      "disabled"
    ],
    "sizeOptions": [
      "xs",
      "sm",
      "md",
      "lg",
      "xl",
      "xxl"
    ],
    "variantOptions": [],
    "storyCount": 2
  },
  "Descriptions": {
    "componentName": "Descriptions",
    "slug": "descriptions",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/Descriptions/Descriptions.stories.tsx",
    "description": "A composable description list component for displaying key-value pairs. Supports bordered and vertical layouts with sub-components for title, extra actions, items, labels, and values.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "bordered",
      "column",
      "layout",
      "size",
      "glass"
    ],
    "sizeOptions": [
      "sm",
      "md",
      "lg"
    ],
    "variantOptions": [],
    "storyCount": 4
  },
  "Divider": {
    "componentName": "Divider",
    "slug": "divider",
    "sourcePath": "/Users/user/Documents/components/src/components/atoms/Divider/Divider.stories.tsx",
    "description": "",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "type",
      "direction",
      "dashed"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 3
  },
  "Drawer": {
    "componentName": "Drawer",
    "slug": "drawer",
    "sourcePath": "/Users/user/Documents/components/src/components/organisms/Drawer/Drawer.stories.tsx",
    "description": "A panel that slides in from the edge of the screen. Built using FT Design System tokens with support for multiple placements and customizable dimensions.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "open"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 2
  },
  "Dropdown": {
    "componentName": "Dropdown",
    "slug": "dropdown",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/Dropdown/Dropdown.stories.tsx",
    "description": "Dropdown component for selecting from a list of options with support for search and segments.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "type",
      "state",
      "size"
    ],
    "sizeOptions": [
      "xs",
      "sm",
      "md",
      "lg",
      "xl",
      "xxl"
    ],
    "variantOptions": [],
    "storyCount": 3
  },
  "DropdownMenu": {
    "componentName": "DropdownMenu",
    "slug": "dropdown-menu",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/DropdownMenu/DropdownMenu.stories.tsx",
    "description": "A dropdown menu component for displaying lists of actions or options. Supports search, grouping, and custom item prefixes.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "property",
      "showScrollBar"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 5
  },
  "Empty": {
    "componentName": "Empty",
    "slug": "empty",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/Empty/Empty.stories.tsx",
    "description": "No data available at the moment",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "image",
      "description"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 3
  },
  "FileCard": {
    "componentName": "FileCard",
    "slug": "file-card",
    "sourcePath": "/Users/user/Documents/components/src/stories/FileCard.stories.tsx",
    "description": "File management card component for displaying file information and processing states.",
    "tags": [],
    "propNames": [
      "fileName",
      "fileType",
      "status",
      "variant"
    ],
    "sizeOptions": [],
    "variantOptions": [
      "compact",
      "expanded",
      "with-progress",
      "with-stats"
    ],
    "storyCount": 7
  },
  "FileThumbnail": {
    "componentName": "FileThumbnail",
    "slug": "file-thumbnail",
    "sourcePath": "/Users/user/Documents/components/src/stories/FileThumbnail.stories.tsx",
    "description": "Compact file thumbnail component for displaying file previews or file type icons.",
    "tags": [],
    "propNames": [
      "fileName",
      "imageUrl",
      "showFileName",
      "glass"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 6
  },
  "FileTypeIcon": {
    "componentName": "FileTypeIcon",
    "slug": "file-type-icon",
    "sourcePath": "/Users/user/Documents/components/src/stories/FileTypeIcon.stories.tsx",
    "description": "File type icon component for displaying file format indicators (XLS, XLSX, CSV, PDF, DOC, DOCX, PNG, JPEG, JPG) with proper gradients, colors, and error states.",
    "tags": [],
    "propNames": [
      "fileType",
      "variant",
      "size"
    ],
    "sizeOptions": [
      "xxs",
      "xs",
      "sm",
      "md",
      "lg",
      "xl",
      "xxl"
    ],
    "variantOptions": [
      "default",
      "error"
    ],
    "storyCount": 3
  },
  "FileValidationCard": {
    "componentName": "FileValidationCard",
    "slug": "file-validation-card",
    "sourcePath": "/Users/user/Documents/components/src/stories/FileValidationCard.stories.tsx",
    "description": "A card component displaying file validation status and statistics.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "validationStatus",
      "fileType",
      "glass"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 5
  },
  "FloatButton": {
    "componentName": "FloatButton",
    "slug": "float-button",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/FloatButton/FloatButton.stories.tsx",
    "description": "Visual style of the float button.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "type",
      "shape",
      "href",
      "target",
      "badge",
      "glass",
      "icon",
      "description",
      "tooltip",
      "onClick"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 3
  },
  "Footer": {
    "componentName": "Footer",
    "slug": "footer",
    "sourcePath": "/Users/user/Documents/components/src/stories/Footer.stories.tsx",
    "description": "",
    "tags": [
      "autodocs"
    ],
    "propNames": [],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 8
  },
  "Form": {
    "componentName": "Form",
    "slug": "form",
    "sourcePath": "/Users/user/Documents/components/src/components/organisms/Form/Form.stories.tsx",
    "description": "A form component with validation, layout options, and field management. Built using FT Design System tokens.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "layout",
      "disabled",
      "size"
    ],
    "sizeOptions": [
      "sm",
      "md",
      "lg"
    ],
    "variantOptions": [],
    "storyCount": 2
  },
  "Grid": {
    "componentName": "Grid",
    "slug": "grid",
    "sourcePath": "/Users/user/Documents/components/src/components/organisms/Grid/Grid.stories.tsx",
    "description": "🆕 NEW: 24-column Grid system (Row/Col) built with FT Design System tokens.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "gutter",
      "align",
      "justify",
      "wrap"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 2
  },
  "HoverCard": {
    "componentName": "HoverCard",
    "slug": "hover-card",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/HoverCard/HoverCard.stories.tsx",
    "description": "A hover-triggered card component for displaying supplementary content. Supports composable API with HoverCardTrigger and HoverCardContent sub-components.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "openDelay",
      "closeDelay",
      "width",
      "placement"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 3
  },
  "Illustration": {
    "componentName": "Illustration",
    "slug": "illustration",
    "sourcePath": "/Users/user/Documents/components/src/components/atoms/Illustration/Illustration.stories.tsx",
    "description": "Illustration component for displaying images with various sizes and styling options.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "variant",
      "size",
      "rounded",
      "background"
    ],
    "sizeOptions": [
      "sm",
      "md",
      "lg",
      "xl"
    ],
    "variantOptions": [
      "overview",
      "insights",
      "workspace",
      "reports"
    ],
    "storyCount": 3
  },
  "Image": {
    "componentName": "Image",
    "slug": "image",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/Image/Image.stories.tsx",
    "description": "An enhanced image component with preview, fallback, and loading states. Built using FT Design System tokens.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "preview",
      "width",
      "height"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 6
  },
  "Input": {
    "componentName": "Input",
    "slug": "input",
    "sourcePath": "/Users/user/Documents/components/src/stories/Input.stories.tsx",
    "description": "Composable input component with support for labels, helper text, error/warning/success states, and icons. Use InputLabel, InputField, InputHelper, InputError, InputWarning, InputSuccess sub-components for flexible composition.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "label",
      "labelMandatory",
      "labelOptional",
      "labelSuffixIcon",
      "labelIcon",
      "error",
      "warning",
      "success",
      "helperText",
      "leadingIcon",
      "trailingIcon",
      "leadingIconSize",
      "trailingIconSize",
      "size",
      "variant",
      "glass",
      "disabled"
    ],
    "sizeOptions": [
      "xxs",
      "xs",
      "sm",
      "md",
      "lg",
      "xl",
      "xxl"
    ],
    "variantOptions": [
      "default",
      "filled",
      "outlined"
    ],
    "storyCount": 9
  },
  "InputNumber": {
    "componentName": "InputNumber",
    "slug": "input-number",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/InputNumber/InputNumber.stories.tsx",
    "description": "🆕 NEW: Numeric input with increment/decrement controls built with FT Design System tokens.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "size",
      "controlsPosition",
      "disabled",
      "controls"
    ],
    "sizeOptions": [
      "xs",
      "sm",
      "md",
      "lg",
      "xl"
    ],
    "variantOptions": [],
    "storyCount": 8
  },
  "Label": {
    "componentName": "Label",
    "slug": "label",
    "sourcePath": "/Users/user/Documents/components/src/stories/Label.stories.tsx",
    "description": "Form label component with support for mandatory indicators, optional text, and suffix icons. Based on Figma design specifications.",
    "tags": [],
    "propNames": [
      "mandatory",
      "optional",
      "suffixIcon",
      "icon",
      "as",
      "htmlFor"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 3
  },
  "List": {
    "componentName": "List",
    "slug": "list",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/List/List.stories.tsx",
    "description": "A composable list component for displaying collections of items with optional headers, footers, icons, and actions. Supports bordered and grid layouts.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "bordered",
      "split",
      "loading",
      "size",
      "glass"
    ],
    "sizeOptions": [
      "sm",
      "md",
      "lg"
    ],
    "variantOptions": [],
    "storyCount": 6
  },
  "Loader": {
    "componentName": "Loader",
    "slug": "loader",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/Loader/Loader.stories.tsx",
    "description": "Progress value from 0 to 100.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "value",
      "logoSize",
      "showLogo",
      "logo",
      "showProgressBar",
      "progressHeight"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 9
  },
  "Logo": {
    "componentName": "Logo",
    "slug": "logo",
    "sourcePath": "/Users/user/Documents/components/src/components/atoms/Logos/Logo.stories.tsx",
    "description": "Logo component for displaying company logos.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "name",
      "width",
      "height"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 25
  },
  "Mentions": {
    "componentName": "Mentions",
    "slug": "mentions",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/Mentions/Mentions.stories.tsx",
    "description": "A textarea component with mention/autocomplete functionality. Supports both composable API (recommended) and declarative API (deprecated).",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "prefix",
      "split",
      "status",
      "autoSize",
      "filterOption",
      "onChange",
      "onSelect",
      "onSearch"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 3
  },
  "Modal": {
    "componentName": "Modal",
    "slug": "modal",
    "sourcePath": "/Users/user/Documents/components/src/components/organisms/Modal/Modal.stories.tsx",
    "description": "A modal component for displaying content in an overlay. Supports open/close, ESC key, and outside click.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "open"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 7
  },
  "NavigationLauncher": {
    "componentName": "NavigationLauncher",
    "slug": "navigation-launcher",
    "sourcePath": "/Users/user/Documents/components/src/stories/NavigationLauncher.stories.tsx",
    "description": "Whether to render inside a portal.",
    "tags": [],
    "propNames": [
      "usePortal",
      "hideDefaultTrigger",
      "alignment",
      "showBackdrop",
      "portalClassName",
      "trigger"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 3
  },
  "NavigationPopover": {
    "componentName": "NavigationPopover",
    "slug": "navigation-popover",
    "sourcePath": "/Users/user/Documents/components/src/stories/NavigationPopover.stories.tsx",
    "description": "Highly configurable navigation popover that can mix hero illustrations, metric summaries, and deep sub-menus—similar to launchers in modern design systems.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "initialSectionId",
      "onClose",
      "onSectionChange"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 2
  },
  "Notification": {
    "componentName": "Notification",
    "slug": "notification",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/Notification/Notification.stories.tsx",
    "description": "NotificationProvider renders toast-style alerts and exposes hooks for adding contextual notifications.",
    "tags": [
      "autodocs"
    ],
    "propNames": [],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 3
  },
  "PageHeader": {
    "componentName": "PageHeader",
    "slug": "page-header",
    "sourcePath": "/Users/user/Documents/components/src/components/organisms/PageHeader/PageHeader.stories.tsx",
    "description": "Composable page header with support for back button, title, subtitle, actions, tabs, segmented tabs, and filters. Use sub-components like PageHeader.Top, PageHeader.Left, PageHeader.Right, PageHeader.Bottom for flexible layout composition.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "glass"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 3
  },
  "Pagination": {
    "componentName": "Pagination",
    "slug": "pagination",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/Pagination/Pagination.stories.tsx",
    "description": "A pagination component for navigating through pages. Uses composable sub-components: PaginationList, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis, PaginationSizeChanger, PaginationQuickJumper.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "current",
      "total",
      "pageSize",
      "variant"
    ],
    "sizeOptions": [],
    "variantOptions": [
      "default",
      "compact"
    ],
    "storyCount": 6
  },
  "Popconfirm": {
    "componentName": "Popconfirm",
    "slug": "popconfirm",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/Popconfirm/Popconfirm.stories.tsx",
    "description": "A confirmation popover component that requires user confirmation before proceeding with an action. Supports composable API with PopconfirmTrigger, PopconfirmContent, PopconfirmTitle, PopconfirmDescription, PopconfirmActions, and PopconfirmIcon sub-components.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "onConfirm",
      "onCancel"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 3
  },
  "ProgressBar": {
    "componentName": "ProgressBar",
    "slug": "progress-bar",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/ProgressBar/ProgressBar.stories.tsx",
    "description": "Progress indicator with line, circle, and dashboard types. Built with FT Design System tokens.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "type",
      "variant",
      "size",
      "value"
    ],
    "sizeOptions": [
      "sm",
      "md",
      "lg"
    ],
    "variantOptions": [
      "primary",
      "success",
      "warning",
      "danger",
      "active"
    ],
    "storyCount": 4
  },
  "ProgressList": {
    "componentName": "ProgressList",
    "slug": "progress-list",
    "sourcePath": "/Users/user/Documents/components/src/stories/ProgressList.stories.tsx",
    "description": "A progress list component for displaying timeline-style progress tracking.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "showTime",
      "glass"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 4
  },
  "QuickFilters": {
    "componentName": "QuickFilters",
    "slug": "quick-filters",
    "sourcePath": "/Users/user/Documents/components/src/components/organisms/QuickFilters/QuickFilters.stories.tsx",
    "description": "A flexible filter component that displays quick filter chips with optional counts, types, and multi-option support. Supports both composable API (recommended) and declarative API (deprecated).",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "scrollable",
      "glass",
      "chipClassName",
      "labelClassName",
      "countClassName",
      "onFilterClick",
      "onFilterRemove"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 1
  },
  "RadioGroup": {
    "componentName": "RadioGroup",
    "slug": "radio-group",
    "sourcePath": "/Users/user/Documents/components/src/components/atoms/RadioGroup/RadioGroup.stories.tsx",
    "description": "A radio button group component with support for horizontal and vertical layouts.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "size",
      "orientation"
    ],
    "sizeOptions": [
      "sm",
      "md"
    ],
    "variantOptions": [],
    "storyCount": 3
  },
  "RadioSelector": {
    "componentName": "RadioSelector",
    "slug": "radio-selector",
    "sourcePath": "/Users/user/Documents/components/src/stories/RadioSelector.stories.tsx",
    "description": "Radio selector component with card-style options featuring headers and descriptions.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "glass"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 5
  },
  "Rate": {
    "componentName": "Rate",
    "slug": "rate",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/Rate/Rate.stories.tsx",
    "description": "🆕 NEW: Star rating component built with FT Design System tokens.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "count",
      "size",
      "allowHalf",
      "allowClear",
      "disabled",
      "readOnly"
    ],
    "sizeOptions": [
      "sm",
      "md",
      "lg",
      "xl"
    ],
    "variantOptions": [],
    "storyCount": 7
  },
  "ReadOnly": {
    "componentName": "ReadOnly",
    "slug": "read-only",
    "sourcePath": "/Users/user/Documents/components/src/stories/ReadOnly.stories.tsx",
    "description": "A read-only field display component for showing label-value pairs in different layouts. Based on Figma design specifications.",
    "tags": [],
    "propNames": [
      "label",
      "value",
      "type",
      "labelIcon"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 4
  },
  "Result": {
    "componentName": "Result",
    "slug": "result",
    "sourcePath": "/Users/user/Documents/components/src/components/organisms/Result/Result.stories.tsx",
    "description": "Result page component built with FT Design System tokens. Use composable sub-components (ResultIcon, ResultTitle, ResultSubtitle, ResultExtra) for the recommended API.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "status",
      "glass"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 3
  },
  "SegmentedTabs": {
    "componentName": "SegmentedTabs",
    "slug": "segmented-tabs",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/SegmentedTabs/SegmentedTabs.stories.tsx",
    "description": "Segmented tabs component for switching between related options using composable API.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "variant"
    ],
    "sizeOptions": [],
    "variantOptions": [
      "default",
      "icon-only"
    ],
    "storyCount": 3
  },
  "SimpleColumnLayout": {
    "componentName": "SimpleColumnLayout",
    "slug": "simple-column-layout",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/SimpleColumnLayout/SimpleColumnLayout.stories.tsx",
    "description": "Simple two-column layout component for displaying label-value pairs.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "glass"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 1
  },
  "Skeleton": {
    "componentName": "Skeleton",
    "slug": "skeleton",
    "sourcePath": "/Users/user/Documents/components/src/components/atoms/Skeleton/Skeleton.stories.tsx",
    "description": "Skeleton provides a loading placeholder for text and UI blocks using FT Design System tokens.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "variant",
      "animation"
    ],
    "sizeOptions": [],
    "variantOptions": [
      "text",
      "circular",
      "rectangular"
    ],
    "storyCount": 2
  },
  "Slider": {
    "componentName": "Slider",
    "slug": "slider",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/Slider/Slider.stories.tsx",
    "description": "Range slider component built with FT Design System tokens. Supports single value and range modes, vertical/horizontal orientation, labels, tooltips, and custom colors.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "min",
      "max",
      "step",
      "range",
      "vertical",
      "disabled",
      "tooltip"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 6
  },
  "Spacer": {
    "componentName": "Spacer",
    "slug": "spacer",
    "sourcePath": "/Users/user/Documents/components/src/components/atoms/Spacer/Spacer.stories.tsx",
    "description": "A spacing component for creating consistent vertical or horizontal spacing between elements.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "size",
      "horizontal"
    ],
    "sizeOptions": [
      "x1",
      "x2",
      "x3",
      "x4",
      "x5",
      "x6",
      "x7",
      "x8",
      "x9",
      "x10",
      "x11",
      "x12"
    ],
    "variantOptions": [],
    "storyCount": 2
  },
  "Spin": {
    "componentName": "Spin",
    "slug": "spin",
    "sourcePath": "/Users/user/Documents/components/src/components/atoms/Spin/Spin.stories.tsx",
    "description": "Spinner",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "size",
      "spinning",
      "tip",
      "delay"
    ],
    "sizeOptions": [
      "sm",
      "md",
      "lg",
      "xl"
    ],
    "variantOptions": [],
    "storyCount": 3
  },
  "Statistic": {
    "componentName": "Statistic",
    "slug": "statistic",
    "sourcePath": "/Users/user/Documents/components/src/components/atoms/Statistic/Statistic.stories.tsx",
    "description": "A statistic component for displaying numerical values with labels. Supports different label placements.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "labelPlacement",
      "className"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 3
  },
  "Steps": {
    "componentName": "Steps",
    "slug": "steps",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/Steps/Steps.stories.tsx",
    "description": "Step indicator component supporting horizontal and vertical directions, default and dot styles. Use composable sub-components (StepsList, StepItem, StepIcon, StepContent, StepTitle, StepDescription) for flexible composition.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "direction",
      "type"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 3
  },
  "SubText": {
    "componentName": "SubText",
    "slug": "sub-text",
    "sourcePath": "/Users/user/Documents/components/src/components/atoms/SubText/SubText.stories.tsx",
    "description": "A sub-text component for displaying secondary information. Can optionally include a check icon.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "icon",
      "className"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 3
  },
  "Switch": {
    "componentName": "Switch",
    "slug": "switch",
    "sourcePath": "/Users/user/Documents/components/src/components/atoms/Switch/Switch.stories.tsx",
    "description": "A toggle switch component with exact Figma specifications. Supports different sizes and states.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "size",
      "disabled"
    ],
    "sizeOptions": [
      "sm",
      "md"
    ],
    "variantOptions": [],
    "storyCount": 3
  },
  "Table": {
    "componentName": "Table",
    "slug": "table",
    "sourcePath": "/Users/user/Documents/components/src/stories/Table.stories.tsx",
    "description": "Composable table examples with sortable headers, caption/footer patterns, and common states.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "variant",
      "layout",
      "selectable",
      "striped",
      "reorderable",
      "loading",
      "emptyMessage",
      "caption",
      "rowActionsLabel",
      "sortColumn",
      "sortDirection",
      "selectedRows",
      "glass",
      "onSelectionChange",
      "onSort",
      "rowAccessory",
      "rowActions",
      "onColumnReorder",
      "headerLeft",
      "headerRight"
    ],
    "sizeOptions": [],
    "variantOptions": [
      "primary",
      "secondary"
    ],
    "storyCount": 4
  },
  "Tabs": {
    "componentName": "Tabs",
    "slug": "tabs",
    "sourcePath": "/Users/user/Documents/components/src/components/organisms/Tabs/Tabs.stories.tsx",
    "description": "A tabs component for organizing content into switchable panels. Supports primary, secondary, and tertiary styles with badges and overflow handling.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "type",
      "overflowBehavior"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 3
  },
  "Text": {
    "componentName": "Text",
    "slug": "text",
    "sourcePath": "/Users/user/Documents/components/src/components/atoms/Text/Text.stories.tsx",
    "description": "A flexible text component with configurable icons and sub-text. Supports various sizes and icon positions.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "size",
      "subText",
      "leadingIcon",
      "trailingIcon",
      "className"
    ],
    "sizeOptions": [
      "sm",
      "md",
      "lg",
      "xl",
      "xx"
    ],
    "variantOptions": [],
    "storyCount": 3
  },
  "Textarea": {
    "componentName": "Textarea",
    "slug": "textarea",
    "sourcePath": "/Users/user/Documents/components/src/components/atoms/Textarea/Textarea.stories.tsx",
    "description": "A textarea component using composable API with TextareaLabel, TextareaField, TextareaHelper, and TextareaError sub-components.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "size",
      "disabled"
    ],
    "sizeOptions": [
      "xxs",
      "xs",
      "sm",
      "md",
      "lg",
      "xl",
      "xxl"
    ],
    "variantOptions": [],
    "storyCount": 3
  },
  "ThemeSystem": {
    "componentName": "ThemeSystem",
    "slug": "theme-system",
    "sourcePath": "/Users/user/Documents/components/src/stories/ThemeSystem.stories.tsx",
    "description": "Complete theme system supporting Light, Dark, Night, and Origin UI modes with automatic component adaptation.",
    "tags": [],
    "propNames": [],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 7
  },
  "Timeline": {
    "componentName": "Timeline",
    "slug": "timeline",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/Timeline/Timeline.stories.tsx",
    "description": "A timeline component for displaying a list of events in chronological order. Built using FT Design System tokens.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "mode",
      "pending",
      "reverse"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 3
  },
  "TimePicker": {
    "componentName": "TimePicker",
    "slug": "time-picker",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/TimePicker/TimePicker.stories.tsx",
    "description": "A time picker component for selecting hours, minutes, and seconds. Built using FT Design System tokens.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "size",
      "use12Hours",
      "showSecond",
      "disabled",
      "allowClear"
    ],
    "sizeOptions": [
      "xxs",
      "xs",
      "sm",
      "md",
      "lg",
      "xl",
      "xxl"
    ],
    "variantOptions": [],
    "storyCount": 7
  },
  "Toggle": {
    "componentName": "Toggle",
    "slug": "toggle",
    "sourcePath": "/Users/user/Documents/components/src/components/atoms/Toggle/Toggle.stories.tsx",
    "description": "A toggle button that can be pressed or unpressed. Supports text, icons, and outline variants.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "variant"
    ],
    "sizeOptions": [],
    "variantOptions": [
      "default",
      "outline"
    ],
    "storyCount": 3
  },
  "ToggleGroup": {
    "componentName": "ToggleGroup",
    "slug": "toggle-group",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/ToggleGroup/ToggleGroup.stories.tsx",
    "description": "Selection mode: single or multiple toggles.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "type",
      "value",
      "defaultValue",
      "disabled",
      "size",
      "variant",
      "onValueChange"
    ],
    "sizeOptions": [
      "sm",
      "md",
      "lg"
    ],
    "variantOptions": [
      "default",
      "outline"
    ],
    "storyCount": 3
  },
  "Tooltip": {
    "componentName": "Tooltip",
    "slug": "tooltip",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/Tooltip/Tooltip.stories.tsx",
    "description": "A tooltip component for displaying contextual information on hover or focus. Supports titles, descriptions, arrows, and action buttons.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "placement",
      "color"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 5
  },
  "Tour": {
    "componentName": "Tour",
    "slug": "tour",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/Tour/Tour.stories.tsx",
    "description": "A tour component for guiding users through features using a composable API.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "open",
      "current",
      "defaultCurrent",
      "mask",
      "zIndex",
      "onClose",
      "onChange",
      "onFinish"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 1
  },
  "Transfer": {
    "componentName": "Transfer",
    "slug": "transfer",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/Transfer/Transfer.stories.tsx",
    "description": "A transfer component for moving items between two lists using a composable API.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "titles",
      "operations",
      "targetKeys",
      "selectedKeys",
      "searchPlaceholder",
      "oneWay",
      "pagination",
      "disabled",
      "onChange",
      "onSelectChange",
      "render",
      "footer"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 2
  },
  "Tree": {
    "componentName": "Tree",
    "slug": "tree",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/Tree/Tree.stories.tsx",
    "description": "A tree component for displaying hierarchical data with expand/collapse, selection, and checkbox support. Built using FT Design System tokens.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "checkable",
      "selectable",
      "showLine",
      "showIcon",
      "defaultExpandAll",
      "multiple",
      "disabled"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 5
  },
  "TreeSelect": {
    "componentName": "TreeSelect",
    "slug": "tree-select",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/TreeSelect/TreeSelect.stories.tsx",
    "description": "TreeSelect lets users select options from hierarchical data structures with optional search and multi-select.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "multiple",
      "treeCheckable",
      "showSearch"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 5
  },
  "Typography": {
    "componentName": "Typography",
    "slug": "typography",
    "sourcePath": "/Users/user/Documents/components/src/components/atoms/Typography/Typography.stories.tsx",
    "description": "Reusable text component with exact Figma specifications. Perfect for AI tools, development, and design documentation. Use this for all text rendering needs.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "variant",
      "color"
    ],
    "sizeOptions": [],
    "variantOptions": [
      "title-primary",
      "title-secondary",
      "display-primary",
      "button",
      "body-primary-semibold",
      "body-primary-medium",
      "body-primary-italic",
      "body-primary-regular",
      "body-secondary-semibold",
      "body-secondary-medium",
      "body-secondary-regular"
    ],
    "storyCount": 3
  },
  "Upload": {
    "componentName": "Upload",
    "slug": "upload",
    "sourcePath": "/Users/user/Documents/components/src/stories/Upload.stories.tsx",
    "description": "A comprehensive upload component supporting drag-and-drop, button, and thumbnail upload types with progress tracking and validation.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "type",
      "maxFiles",
      "maxFileSize",
      "multiple",
      "autoUpload",
      "glass"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 6
  },
  "UploadButton": {
    "componentName": "UploadButton",
    "slug": "upload-button",
    "sourcePath": "/Users/user/Documents/components/src/stories/UploadButton.stories.tsx",
    "description": "A button component for file uploads with different states.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "state",
      "disabled",
      "multiple",
      "glass"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 4
  },
  "UploadItem": {
    "componentName": "UploadItem",
    "slug": "upload-item",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/UploadItem/UploadItem.stories.tsx",
    "description": "Upload item component for displaying file upload status with progress tracking.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "type",
      "state",
      "glass"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 8
  },
  "UploadThumbnail": {
    "componentName": "UploadThumbnail",
    "slug": "upload-thumbnail",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/UploadThumbnail/UploadThumbnail.stories.tsx",
    "description": "Upload thumbnail component for image uploads with preview support.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "state",
      "showFileName",
      "disabled",
      "glass"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 5
  },
  "UploadZone": {
    "componentName": "UploadZone",
    "slug": "upload-zone",
    "sourcePath": "/Users/user/Documents/components/src/stories/UploadZone.stories.tsx",
    "description": "Drag and drop upload zone component for file selection and upload. Supports file validation, multiple file selection, and interactive states with customizable file type restrictions.",
    "tags": [],
    "propNames": [
      "acceptedFileTypes",
      "maxFileSize",
      "disabled",
      "multiple",
      "glass"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 5
  },
  "UserProfile": {
    "componentName": "UserProfile",
    "slug": "user-profile",
    "sourcePath": "/Users/user/Documents/components/src/stories/UserProfile.stories.tsx",
    "description": "A user profile trigger component that pairs with the ",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "userName",
      "userRole",
      "userLocation",
      "userBadge",
      "companyName",
      "onClick",
      "glass"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 5
  },
  "UserProfileDropdown": {
    "componentName": "UserProfileDropdown",
    "slug": "user-profile-dropdown",
    "sourcePath": "/Users/user/Documents/components/src/stories/UserProfileDropdown.stories.tsx",
    "description": "Expanded dropdown panel paired with ",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "userName",
      "userRole",
      "userLocation",
      "userBadge",
      "isOpen",
      "onMenuItemClick"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 3
  },
  "Watermark": {
    "componentName": "Watermark",
    "slug": "watermark",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/Watermark/Watermark.stories.tsx",
    "description": "Glass style variant",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "glass"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 3
  }
};

export const COMPONENT_MACHINE_METADATA_BY_SLUG: Record<string, ComponentMachineMetadata> = {
  "affix": {
    "componentName": "Affix",
    "slug": "affix",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/Affix/Affix.stories.tsx",
    "description": "Glass style variant",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "glass"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 2
  },
  "alert": {
    "componentName": "Alert",
    "slug": "alert",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/Alert/Alert.stories.tsx",
    "description": "A composable alert component for displaying contextual feedback messages. Supports info, success, warning, and danger variants with optional actions and close buttons.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "variant",
      "radius"
    ],
    "sizeOptions": [],
    "variantOptions": [
      "info",
      "success",
      "warning",
      "danger"
    ],
    "storyCount": 5
  },
  "anchor": {
    "componentName": "Anchor",
    "slug": "anchor",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/Anchor/Anchor.stories.tsx",
    "description": "Glass style variant",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "glass"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 3
  },
  "app-header": {
    "componentName": "AppHeader",
    "slug": "app-header",
    "sourcePath": "/Users/user/Documents/components/src/stories/AppHeader.stories.tsx",
    "description": "Application header component with FreightTiger logo on the left, notifications, and user profile.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "user",
      "showThemeIcon",
      "glass",
      "showGlassToggle",
      "showExpandButton",
      "isExpanded",
      "onExpandToggle"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 4
  },
  "avatar": {
    "componentName": "Avatar",
    "slug": "avatar",
    "sourcePath": "/Users/user/Documents/components/src/components/atoms/Avatar/Avatar.stories.tsx",
    "description": "",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "size",
      "shape"
    ],
    "sizeOptions": [
      "xxs",
      "xs",
      "sm",
      "md",
      "lg",
      "xl",
      "xxl"
    ],
    "variantOptions": [],
    "storyCount": 4
  },
  "back-top": {
    "componentName": "BackTop",
    "slug": "back-top",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/BackTop/BackTop.stories.tsx",
    "description": "Scroll height threshold before the button appears.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "visibilityHeight",
      "glass",
      "onClick"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 2
  },
  "badge": {
    "componentName": "Badge",
    "slug": "badge",
    "sourcePath": "/Users/user/Documents/components/src/components/atoms/Badge/Badge.stories.tsx",
    "description": "A badge component for status indicators, labels, and counts. Supports composable sub-components for flexible content.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "variant",
      "size"
    ],
    "sizeOptions": [
      "xs",
      "sm",
      "md",
      "lg"
    ],
    "variantOptions": [
      "default",
      "error",
      "success",
      "warning",
      "neutral",
      "info",
      "danger",
      "normal"
    ],
    "storyCount": 3
  },
  "breadcrumb": {
    "componentName": "Breadcrumb",
    "slug": "breadcrumb",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/Breadcrumb/Breadcrumb.stories.tsx",
    "description": "A breadcrumb navigation component for showing the current page location within a hierarchy.",
    "tags": [
      "autodocs"
    ],
    "propNames": [],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 3
  },
  "button": {
    "componentName": "Button",
    "slug": "button",
    "sourcePath": "/Users/user/Documents/components/src/components/atoms/Button/Button.stories.tsx",
    "description": "",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "variant",
      "size",
      "icon",
      "iconPosition",
      "disabled",
      "loading",
      "shape",
      "glass"
    ],
    "sizeOptions": [
      "xs",
      "sm",
      "md",
      "lg",
      "xl",
      "xxl"
    ],
    "variantOptions": [
      "primary",
      "secondary",
      "destructive",
      "text",
      "link"
    ],
    "storyCount": 7
  },
  "button-group": {
    "componentName": "ButtonGroup",
    "slug": "button-group",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/ButtonGroup/ButtonGroup.stories.tsx",
    "description": "Button group component for grouping related actions together.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "glass"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 3
  },
  "calendar": {
    "componentName": "Calendar",
    "slug": "calendar",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/Calendar/Calendar.stories.tsx",
    "description": "A standalone calendar component for date display and selection. Built using FT Design System tokens.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "mode",
      "fullscreen",
      "glass"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 10
  },
  "card": {
    "componentName": "Card",
    "slug": "card",
    "sourcePath": "/Users/user/Documents/components/src/stories/Card.stories.tsx",
    "description": "A flexible card container for grouping related content and actions. Use composable sub-components (CardHeader, CardTitle, CardBody, CardFooter) for flexible layouts.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "extra",
      "bordered",
      "hoverable",
      "loading",
      "size",
      "actions",
      "cover",
      "contentVariant",
      "eyebrowLeft",
      "eyebrowRight",
      "headerTitle",
      "headerSubText",
      "showArrowIcon",
      "bodySections",
      "footerText",
      "footerButton",
      "showFooter",
      "showEyebrow",
      "graphic",
      "glass"
    ],
    "sizeOptions": [
      "sm",
      "md"
    ],
    "variantOptions": [],
    "storyCount": 2
  },
  "carousel": {
    "componentName": "Carousel",
    "slug": "carousel",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/Carousel/Carousel.stories.tsx",
    "description": "A carousel/slider component for cycling through content. Built using FT Design System tokens.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "effect",
      "dotPosition",
      "autoplay",
      "dots",
      "arrows",
      "infinite"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 6
  },
  "cascader": {
    "componentName": "Cascader",
    "slug": "cascader",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/Cascader/Cascader.stories.tsx",
    "description": "A cascading selector component for selecting from hierarchical data.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "size",
      "expandTrigger",
      "showSearch",
      "allowClear",
      "changeOnSelect",
      "disabled",
      "label",
      "error",
      "helperText"
    ],
    "sizeOptions": [
      "xxs",
      "xs",
      "sm",
      "md",
      "lg",
      "xl",
      "xxl"
    ],
    "variantOptions": [],
    "storyCount": 2
  },
  "checkbox": {
    "componentName": "Checkbox",
    "slug": "checkbox",
    "sourcePath": "/Users/user/Documents/components/src/components/atoms/Checkbox/Checkbox.stories.tsx",
    "description": "A flexible checkbox component with support for labels, descriptions, error states, and indeterminate state.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "size",
      "disabled",
      "indeterminate"
    ],
    "sizeOptions": [
      "sm",
      "md"
    ],
    "variantOptions": [],
    "storyCount": 6
  },
  "chicklet": {
    "componentName": "Chicklet",
    "slug": "chicklet",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/Chicklet/Chicklet.stories.tsx",
    "description": "A compact label element (chicklet/chip) used for tags, filters, and selections. Supports rounded and rectangular variants.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "variant",
      "glass"
    ],
    "sizeOptions": [],
    "variantOptions": [
      "rectangular",
      "rounded"
    ],
    "storyCount": 8
  },
  "chip": {
    "componentName": "Chip",
    "slug": "chip",
    "sourcePath": "/Users/user/Documents/components/src/components/atoms/Chip/Chip.stories.tsx",
    "description": "A selectable chip component for filters, categories, and multi-option selection. Supports single and group selection modes.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "label",
      "selected",
      "variant",
      "size",
      "icon",
      "disabled",
      "onRemove",
      "glass",
      "className"
    ],
    "sizeOptions": [
      "sm",
      "md",
      "lg"
    ],
    "variantOptions": [
      "outlined",
      "filled"
    ],
    "storyCount": 12
  },
  "collapsible": {
    "componentName": "Collapsible",
    "slug": "collapsible",
    "sourcePath": "/Users/user/Documents/components/src/components/organisms/Collapsible/Collapsible.stories.tsx",
    "description": "A collapsible component that can expand and collapse content. Supports different types and backgrounds.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "type",
      "bg"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 3
  },
  "color-picker": {
    "componentName": "ColorPicker",
    "slug": "color-picker",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/ColorPicker/ColorPicker.stories.tsx",
    "description": "Color picker component for selecting colors with preset palettes. Text display is always enabled.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "value",
      "defaultValue",
      "defaultFormat",
      "disabled",
      "size",
      "presets",
      "glass",
      "onChange"
    ],
    "sizeOptions": [
      "sm",
      "md",
      "lg"
    ],
    "variantOptions": [],
    "storyCount": 3
  },
  "color-system": {
    "componentName": "ColorSystem",
    "slug": "color-system",
    "sourcePath": "/Users/user/Documents/components/src/stories/ColorSystem.stories.tsx",
    "description": "Complete color system showing primary, secondary, and semantic colors organized by theme mode.",
    "tags": [],
    "propNames": [],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 2
  },
  "data-entry-table": {
    "componentName": "DataEntryTable",
    "slug": "data-entry-table",
    "sourcePath": "/Users/user/Documents/components/src/stories/DataEntryTable.stories.tsx",
    "description": "Composable data entry table for editable rows with selectable mode and mixed cell types.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "selectable",
      "resizable",
      "showContextMenu",
      "selectedRows",
      "cellErrors",
      "glass",
      "onCellChange",
      "onRowAdd",
      "onRowDelete",
      "onSelectionChange"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 2
  },
  "date-picker": {
    "componentName": "DatePicker",
    "slug": "date-picker",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/DatePicker/DatePicker.stories.tsx",
    "description": "Date picker component for selecting single dates or date ranges. Supports both composable API (recommended) and declarative API (deprecated).",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "size",
      "disabled"
    ],
    "sizeOptions": [
      "xs",
      "sm",
      "md",
      "lg",
      "xl",
      "xxl"
    ],
    "variantOptions": [],
    "storyCount": 2
  },
  "descriptions": {
    "componentName": "Descriptions",
    "slug": "descriptions",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/Descriptions/Descriptions.stories.tsx",
    "description": "A composable description list component for displaying key-value pairs. Supports bordered and vertical layouts with sub-components for title, extra actions, items, labels, and values.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "bordered",
      "column",
      "layout",
      "size",
      "glass"
    ],
    "sizeOptions": [
      "sm",
      "md",
      "lg"
    ],
    "variantOptions": [],
    "storyCount": 4
  },
  "divider": {
    "componentName": "Divider",
    "slug": "divider",
    "sourcePath": "/Users/user/Documents/components/src/components/atoms/Divider/Divider.stories.tsx",
    "description": "",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "type",
      "direction",
      "dashed"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 3
  },
  "drawer": {
    "componentName": "Drawer",
    "slug": "drawer",
    "sourcePath": "/Users/user/Documents/components/src/components/organisms/Drawer/Drawer.stories.tsx",
    "description": "A panel that slides in from the edge of the screen. Built using FT Design System tokens with support for multiple placements and customizable dimensions.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "open"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 2
  },
  "dropdown": {
    "componentName": "Dropdown",
    "slug": "dropdown",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/Dropdown/Dropdown.stories.tsx",
    "description": "Dropdown component for selecting from a list of options with support for search and segments.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "type",
      "state",
      "size"
    ],
    "sizeOptions": [
      "xs",
      "sm",
      "md",
      "lg",
      "xl",
      "xxl"
    ],
    "variantOptions": [],
    "storyCount": 3
  },
  "dropdown-menu": {
    "componentName": "DropdownMenu",
    "slug": "dropdown-menu",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/DropdownMenu/DropdownMenu.stories.tsx",
    "description": "A dropdown menu component for displaying lists of actions or options. Supports search, grouping, and custom item prefixes.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "property",
      "showScrollBar"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 5
  },
  "empty": {
    "componentName": "Empty",
    "slug": "empty",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/Empty/Empty.stories.tsx",
    "description": "No data available at the moment",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "image",
      "description"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 3
  },
  "file-card": {
    "componentName": "FileCard",
    "slug": "file-card",
    "sourcePath": "/Users/user/Documents/components/src/stories/FileCard.stories.tsx",
    "description": "File management card component for displaying file information and processing states.",
    "tags": [],
    "propNames": [
      "fileName",
      "fileType",
      "status",
      "variant"
    ],
    "sizeOptions": [],
    "variantOptions": [
      "compact",
      "expanded",
      "with-progress",
      "with-stats"
    ],
    "storyCount": 7
  },
  "file-thumbnail": {
    "componentName": "FileThumbnail",
    "slug": "file-thumbnail",
    "sourcePath": "/Users/user/Documents/components/src/stories/FileThumbnail.stories.tsx",
    "description": "Compact file thumbnail component for displaying file previews or file type icons.",
    "tags": [],
    "propNames": [
      "fileName",
      "imageUrl",
      "showFileName",
      "glass"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 6
  },
  "file-type-icon": {
    "componentName": "FileTypeIcon",
    "slug": "file-type-icon",
    "sourcePath": "/Users/user/Documents/components/src/stories/FileTypeIcon.stories.tsx",
    "description": "File type icon component for displaying file format indicators (XLS, XLSX, CSV, PDF, DOC, DOCX, PNG, JPEG, JPG) with proper gradients, colors, and error states.",
    "tags": [],
    "propNames": [
      "fileType",
      "variant",
      "size"
    ],
    "sizeOptions": [
      "xxs",
      "xs",
      "sm",
      "md",
      "lg",
      "xl",
      "xxl"
    ],
    "variantOptions": [
      "default",
      "error"
    ],
    "storyCount": 3
  },
  "file-validation-card": {
    "componentName": "FileValidationCard",
    "slug": "file-validation-card",
    "sourcePath": "/Users/user/Documents/components/src/stories/FileValidationCard.stories.tsx",
    "description": "A card component displaying file validation status and statistics.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "validationStatus",
      "fileType",
      "glass"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 5
  },
  "float-button": {
    "componentName": "FloatButton",
    "slug": "float-button",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/FloatButton/FloatButton.stories.tsx",
    "description": "Visual style of the float button.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "type",
      "shape",
      "href",
      "target",
      "badge",
      "glass",
      "icon",
      "description",
      "tooltip",
      "onClick"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 3
  },
  "footer": {
    "componentName": "Footer",
    "slug": "footer",
    "sourcePath": "/Users/user/Documents/components/src/stories/Footer.stories.tsx",
    "description": "",
    "tags": [
      "autodocs"
    ],
    "propNames": [],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 8
  },
  "form": {
    "componentName": "Form",
    "slug": "form",
    "sourcePath": "/Users/user/Documents/components/src/components/organisms/Form/Form.stories.tsx",
    "description": "A form component with validation, layout options, and field management. Built using FT Design System tokens.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "layout",
      "disabled",
      "size"
    ],
    "sizeOptions": [
      "sm",
      "md",
      "lg"
    ],
    "variantOptions": [],
    "storyCount": 2
  },
  "grid": {
    "componentName": "Grid",
    "slug": "grid",
    "sourcePath": "/Users/user/Documents/components/src/components/organisms/Grid/Grid.stories.tsx",
    "description": "🆕 NEW: 24-column Grid system (Row/Col) built with FT Design System tokens.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "gutter",
      "align",
      "justify",
      "wrap"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 2
  },
  "hover-card": {
    "componentName": "HoverCard",
    "slug": "hover-card",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/HoverCard/HoverCard.stories.tsx",
    "description": "A hover-triggered card component for displaying supplementary content. Supports composable API with HoverCardTrigger and HoverCardContent sub-components.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "openDelay",
      "closeDelay",
      "width",
      "placement"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 3
  },
  "illustration": {
    "componentName": "Illustration",
    "slug": "illustration",
    "sourcePath": "/Users/user/Documents/components/src/components/atoms/Illustration/Illustration.stories.tsx",
    "description": "Illustration component for displaying images with various sizes and styling options.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "variant",
      "size",
      "rounded",
      "background"
    ],
    "sizeOptions": [
      "sm",
      "md",
      "lg",
      "xl"
    ],
    "variantOptions": [
      "overview",
      "insights",
      "workspace",
      "reports"
    ],
    "storyCount": 3
  },
  "image": {
    "componentName": "Image",
    "slug": "image",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/Image/Image.stories.tsx",
    "description": "An enhanced image component with preview, fallback, and loading states. Built using FT Design System tokens.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "preview",
      "width",
      "height"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 6
  },
  "input": {
    "componentName": "Input",
    "slug": "input",
    "sourcePath": "/Users/user/Documents/components/src/stories/Input.stories.tsx",
    "description": "Composable input component with support for labels, helper text, error/warning/success states, and icons. Use InputLabel, InputField, InputHelper, InputError, InputWarning, InputSuccess sub-components for flexible composition.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "label",
      "labelMandatory",
      "labelOptional",
      "labelSuffixIcon",
      "labelIcon",
      "error",
      "warning",
      "success",
      "helperText",
      "leadingIcon",
      "trailingIcon",
      "leadingIconSize",
      "trailingIconSize",
      "size",
      "variant",
      "glass",
      "disabled"
    ],
    "sizeOptions": [
      "xxs",
      "xs",
      "sm",
      "md",
      "lg",
      "xl",
      "xxl"
    ],
    "variantOptions": [
      "default",
      "filled",
      "outlined"
    ],
    "storyCount": 9
  },
  "input-number": {
    "componentName": "InputNumber",
    "slug": "input-number",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/InputNumber/InputNumber.stories.tsx",
    "description": "🆕 NEW: Numeric input with increment/decrement controls built with FT Design System tokens.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "size",
      "controlsPosition",
      "disabled",
      "controls"
    ],
    "sizeOptions": [
      "xs",
      "sm",
      "md",
      "lg",
      "xl"
    ],
    "variantOptions": [],
    "storyCount": 8
  },
  "label": {
    "componentName": "Label",
    "slug": "label",
    "sourcePath": "/Users/user/Documents/components/src/stories/Label.stories.tsx",
    "description": "Form label component with support for mandatory indicators, optional text, and suffix icons. Based on Figma design specifications.",
    "tags": [],
    "propNames": [
      "mandatory",
      "optional",
      "suffixIcon",
      "icon",
      "as",
      "htmlFor"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 3
  },
  "list": {
    "componentName": "List",
    "slug": "list",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/List/List.stories.tsx",
    "description": "A composable list component for displaying collections of items with optional headers, footers, icons, and actions. Supports bordered and grid layouts.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "bordered",
      "split",
      "loading",
      "size",
      "glass"
    ],
    "sizeOptions": [
      "sm",
      "md",
      "lg"
    ],
    "variantOptions": [],
    "storyCount": 6
  },
  "loader": {
    "componentName": "Loader",
    "slug": "loader",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/Loader/Loader.stories.tsx",
    "description": "Progress value from 0 to 100.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "value",
      "logoSize",
      "showLogo",
      "logo",
      "showProgressBar",
      "progressHeight"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 9
  },
  "logo": {
    "componentName": "Logo",
    "slug": "logo",
    "sourcePath": "/Users/user/Documents/components/src/components/atoms/Logos/Logo.stories.tsx",
    "description": "Logo component for displaying company logos.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "name",
      "width",
      "height"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 25
  },
  "mentions": {
    "componentName": "Mentions",
    "slug": "mentions",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/Mentions/Mentions.stories.tsx",
    "description": "A textarea component with mention/autocomplete functionality. Supports both composable API (recommended) and declarative API (deprecated).",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "prefix",
      "split",
      "status",
      "autoSize",
      "filterOption",
      "onChange",
      "onSelect",
      "onSearch"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 3
  },
  "modal": {
    "componentName": "Modal",
    "slug": "modal",
    "sourcePath": "/Users/user/Documents/components/src/components/organisms/Modal/Modal.stories.tsx",
    "description": "A modal component for displaying content in an overlay. Supports open/close, ESC key, and outside click.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "open"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 7
  },
  "navigation-launcher": {
    "componentName": "NavigationLauncher",
    "slug": "navigation-launcher",
    "sourcePath": "/Users/user/Documents/components/src/stories/NavigationLauncher.stories.tsx",
    "description": "Whether to render inside a portal.",
    "tags": [],
    "propNames": [
      "usePortal",
      "hideDefaultTrigger",
      "alignment",
      "showBackdrop",
      "portalClassName",
      "trigger"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 3
  },
  "navigation-popover": {
    "componentName": "NavigationPopover",
    "slug": "navigation-popover",
    "sourcePath": "/Users/user/Documents/components/src/stories/NavigationPopover.stories.tsx",
    "description": "Highly configurable navigation popover that can mix hero illustrations, metric summaries, and deep sub-menus—similar to launchers in modern design systems.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "initialSectionId",
      "onClose",
      "onSectionChange"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 2
  },
  "notification": {
    "componentName": "Notification",
    "slug": "notification",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/Notification/Notification.stories.tsx",
    "description": "NotificationProvider renders toast-style alerts and exposes hooks for adding contextual notifications.",
    "tags": [
      "autodocs"
    ],
    "propNames": [],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 3
  },
  "page-header": {
    "componentName": "PageHeader",
    "slug": "page-header",
    "sourcePath": "/Users/user/Documents/components/src/components/organisms/PageHeader/PageHeader.stories.tsx",
    "description": "Composable page header with support for back button, title, subtitle, actions, tabs, segmented tabs, and filters. Use sub-components like PageHeader.Top, PageHeader.Left, PageHeader.Right, PageHeader.Bottom for flexible layout composition.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "glass"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 3
  },
  "pagination": {
    "componentName": "Pagination",
    "slug": "pagination",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/Pagination/Pagination.stories.tsx",
    "description": "A pagination component for navigating through pages. Uses composable sub-components: PaginationList, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis, PaginationSizeChanger, PaginationQuickJumper.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "current",
      "total",
      "pageSize",
      "variant"
    ],
    "sizeOptions": [],
    "variantOptions": [
      "default",
      "compact"
    ],
    "storyCount": 6
  },
  "popconfirm": {
    "componentName": "Popconfirm",
    "slug": "popconfirm",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/Popconfirm/Popconfirm.stories.tsx",
    "description": "A confirmation popover component that requires user confirmation before proceeding with an action. Supports composable API with PopconfirmTrigger, PopconfirmContent, PopconfirmTitle, PopconfirmDescription, PopconfirmActions, and PopconfirmIcon sub-components.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "onConfirm",
      "onCancel"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 3
  },
  "progress-bar": {
    "componentName": "ProgressBar",
    "slug": "progress-bar",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/ProgressBar/ProgressBar.stories.tsx",
    "description": "Progress indicator with line, circle, and dashboard types. Built with FT Design System tokens.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "type",
      "variant",
      "size",
      "value"
    ],
    "sizeOptions": [
      "sm",
      "md",
      "lg"
    ],
    "variantOptions": [
      "primary",
      "success",
      "warning",
      "danger",
      "active"
    ],
    "storyCount": 4
  },
  "progress-list": {
    "componentName": "ProgressList",
    "slug": "progress-list",
    "sourcePath": "/Users/user/Documents/components/src/stories/ProgressList.stories.tsx",
    "description": "A progress list component for displaying timeline-style progress tracking.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "showTime",
      "glass"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 4
  },
  "quick-filters": {
    "componentName": "QuickFilters",
    "slug": "quick-filters",
    "sourcePath": "/Users/user/Documents/components/src/components/organisms/QuickFilters/QuickFilters.stories.tsx",
    "description": "A flexible filter component that displays quick filter chips with optional counts, types, and multi-option support. Supports both composable API (recommended) and declarative API (deprecated).",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "scrollable",
      "glass",
      "chipClassName",
      "labelClassName",
      "countClassName",
      "onFilterClick",
      "onFilterRemove"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 1
  },
  "radio-group": {
    "componentName": "RadioGroup",
    "slug": "radio-group",
    "sourcePath": "/Users/user/Documents/components/src/components/atoms/RadioGroup/RadioGroup.stories.tsx",
    "description": "A radio button group component with support for horizontal and vertical layouts.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "size",
      "orientation"
    ],
    "sizeOptions": [
      "sm",
      "md"
    ],
    "variantOptions": [],
    "storyCount": 3
  },
  "radio-selector": {
    "componentName": "RadioSelector",
    "slug": "radio-selector",
    "sourcePath": "/Users/user/Documents/components/src/stories/RadioSelector.stories.tsx",
    "description": "Radio selector component with card-style options featuring headers and descriptions.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "glass"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 5
  },
  "rate": {
    "componentName": "Rate",
    "slug": "rate",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/Rate/Rate.stories.tsx",
    "description": "🆕 NEW: Star rating component built with FT Design System tokens.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "count",
      "size",
      "allowHalf",
      "allowClear",
      "disabled",
      "readOnly"
    ],
    "sizeOptions": [
      "sm",
      "md",
      "lg",
      "xl"
    ],
    "variantOptions": [],
    "storyCount": 7
  },
  "read-only": {
    "componentName": "ReadOnly",
    "slug": "read-only",
    "sourcePath": "/Users/user/Documents/components/src/stories/ReadOnly.stories.tsx",
    "description": "A read-only field display component for showing label-value pairs in different layouts. Based on Figma design specifications.",
    "tags": [],
    "propNames": [
      "label",
      "value",
      "type",
      "labelIcon"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 4
  },
  "result": {
    "componentName": "Result",
    "slug": "result",
    "sourcePath": "/Users/user/Documents/components/src/components/organisms/Result/Result.stories.tsx",
    "description": "Result page component built with FT Design System tokens. Use composable sub-components (ResultIcon, ResultTitle, ResultSubtitle, ResultExtra) for the recommended API.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "status",
      "glass"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 3
  },
  "segmented-tabs": {
    "componentName": "SegmentedTabs",
    "slug": "segmented-tabs",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/SegmentedTabs/SegmentedTabs.stories.tsx",
    "description": "Segmented tabs component for switching between related options using composable API.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "variant"
    ],
    "sizeOptions": [],
    "variantOptions": [
      "default",
      "icon-only"
    ],
    "storyCount": 3
  },
  "simple-column-layout": {
    "componentName": "SimpleColumnLayout",
    "slug": "simple-column-layout",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/SimpleColumnLayout/SimpleColumnLayout.stories.tsx",
    "description": "Simple two-column layout component for displaying label-value pairs.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "glass"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 1
  },
  "skeleton": {
    "componentName": "Skeleton",
    "slug": "skeleton",
    "sourcePath": "/Users/user/Documents/components/src/components/atoms/Skeleton/Skeleton.stories.tsx",
    "description": "Skeleton provides a loading placeholder for text and UI blocks using FT Design System tokens.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "variant",
      "animation"
    ],
    "sizeOptions": [],
    "variantOptions": [
      "text",
      "circular",
      "rectangular"
    ],
    "storyCount": 2
  },
  "slider": {
    "componentName": "Slider",
    "slug": "slider",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/Slider/Slider.stories.tsx",
    "description": "Range slider component built with FT Design System tokens. Supports single value and range modes, vertical/horizontal orientation, labels, tooltips, and custom colors.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "min",
      "max",
      "step",
      "range",
      "vertical",
      "disabled",
      "tooltip"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 6
  },
  "spacer": {
    "componentName": "Spacer",
    "slug": "spacer",
    "sourcePath": "/Users/user/Documents/components/src/components/atoms/Spacer/Spacer.stories.tsx",
    "description": "A spacing component for creating consistent vertical or horizontal spacing between elements.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "size",
      "horizontal"
    ],
    "sizeOptions": [
      "x1",
      "x2",
      "x3",
      "x4",
      "x5",
      "x6",
      "x7",
      "x8",
      "x9",
      "x10",
      "x11",
      "x12"
    ],
    "variantOptions": [],
    "storyCount": 2
  },
  "spin": {
    "componentName": "Spin",
    "slug": "spin",
    "sourcePath": "/Users/user/Documents/components/src/components/atoms/Spin/Spin.stories.tsx",
    "description": "Spinner",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "size",
      "spinning",
      "tip",
      "delay"
    ],
    "sizeOptions": [
      "sm",
      "md",
      "lg",
      "xl"
    ],
    "variantOptions": [],
    "storyCount": 3
  },
  "statistic": {
    "componentName": "Statistic",
    "slug": "statistic",
    "sourcePath": "/Users/user/Documents/components/src/components/atoms/Statistic/Statistic.stories.tsx",
    "description": "A statistic component for displaying numerical values with labels. Supports different label placements.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "labelPlacement",
      "className"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 3
  },
  "steps": {
    "componentName": "Steps",
    "slug": "steps",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/Steps/Steps.stories.tsx",
    "description": "Step indicator component supporting horizontal and vertical directions, default and dot styles. Use composable sub-components (StepsList, StepItem, StepIcon, StepContent, StepTitle, StepDescription) for flexible composition.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "direction",
      "type"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 3
  },
  "sub-text": {
    "componentName": "SubText",
    "slug": "sub-text",
    "sourcePath": "/Users/user/Documents/components/src/components/atoms/SubText/SubText.stories.tsx",
    "description": "A sub-text component for displaying secondary information. Can optionally include a check icon.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "icon",
      "className"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 3
  },
  "switch": {
    "componentName": "Switch",
    "slug": "switch",
    "sourcePath": "/Users/user/Documents/components/src/components/atoms/Switch/Switch.stories.tsx",
    "description": "A toggle switch component with exact Figma specifications. Supports different sizes and states.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "size",
      "disabled"
    ],
    "sizeOptions": [
      "sm",
      "md"
    ],
    "variantOptions": [],
    "storyCount": 3
  },
  "table": {
    "componentName": "Table",
    "slug": "table",
    "sourcePath": "/Users/user/Documents/components/src/stories/Table.stories.tsx",
    "description": "Composable table examples with sortable headers, caption/footer patterns, and common states.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "variant",
      "layout",
      "selectable",
      "striped",
      "reorderable",
      "loading",
      "emptyMessage",
      "caption",
      "rowActionsLabel",
      "sortColumn",
      "sortDirection",
      "selectedRows",
      "glass",
      "onSelectionChange",
      "onSort",
      "rowAccessory",
      "rowActions",
      "onColumnReorder",
      "headerLeft",
      "headerRight"
    ],
    "sizeOptions": [],
    "variantOptions": [
      "primary",
      "secondary"
    ],
    "storyCount": 4
  },
  "tabs": {
    "componentName": "Tabs",
    "slug": "tabs",
    "sourcePath": "/Users/user/Documents/components/src/components/organisms/Tabs/Tabs.stories.tsx",
    "description": "A tabs component for organizing content into switchable panels. Supports primary, secondary, and tertiary styles with badges and overflow handling.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "type",
      "overflowBehavior"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 3
  },
  "text": {
    "componentName": "Text",
    "slug": "text",
    "sourcePath": "/Users/user/Documents/components/src/components/atoms/Text/Text.stories.tsx",
    "description": "A flexible text component with configurable icons and sub-text. Supports various sizes and icon positions.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "size",
      "subText",
      "leadingIcon",
      "trailingIcon",
      "className"
    ],
    "sizeOptions": [
      "sm",
      "md",
      "lg",
      "xl",
      "xx"
    ],
    "variantOptions": [],
    "storyCount": 3
  },
  "textarea": {
    "componentName": "Textarea",
    "slug": "textarea",
    "sourcePath": "/Users/user/Documents/components/src/components/atoms/Textarea/Textarea.stories.tsx",
    "description": "A textarea component using composable API with TextareaLabel, TextareaField, TextareaHelper, and TextareaError sub-components.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "size",
      "disabled"
    ],
    "sizeOptions": [
      "xxs",
      "xs",
      "sm",
      "md",
      "lg",
      "xl",
      "xxl"
    ],
    "variantOptions": [],
    "storyCount": 3
  },
  "theme-system": {
    "componentName": "ThemeSystem",
    "slug": "theme-system",
    "sourcePath": "/Users/user/Documents/components/src/stories/ThemeSystem.stories.tsx",
    "description": "Complete theme system supporting Light, Dark, Night, and Origin UI modes with automatic component adaptation.",
    "tags": [],
    "propNames": [],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 7
  },
  "timeline": {
    "componentName": "Timeline",
    "slug": "timeline",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/Timeline/Timeline.stories.tsx",
    "description": "A timeline component for displaying a list of events in chronological order. Built using FT Design System tokens.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "mode",
      "pending",
      "reverse"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 3
  },
  "time-picker": {
    "componentName": "TimePicker",
    "slug": "time-picker",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/TimePicker/TimePicker.stories.tsx",
    "description": "A time picker component for selecting hours, minutes, and seconds. Built using FT Design System tokens.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "size",
      "use12Hours",
      "showSecond",
      "disabled",
      "allowClear"
    ],
    "sizeOptions": [
      "xxs",
      "xs",
      "sm",
      "md",
      "lg",
      "xl",
      "xxl"
    ],
    "variantOptions": [],
    "storyCount": 7
  },
  "toggle": {
    "componentName": "Toggle",
    "slug": "toggle",
    "sourcePath": "/Users/user/Documents/components/src/components/atoms/Toggle/Toggle.stories.tsx",
    "description": "A toggle button that can be pressed or unpressed. Supports text, icons, and outline variants.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "variant"
    ],
    "sizeOptions": [],
    "variantOptions": [
      "default",
      "outline"
    ],
    "storyCount": 3
  },
  "toggle-group": {
    "componentName": "ToggleGroup",
    "slug": "toggle-group",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/ToggleGroup/ToggleGroup.stories.tsx",
    "description": "Selection mode: single or multiple toggles.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "type",
      "value",
      "defaultValue",
      "disabled",
      "size",
      "variant",
      "onValueChange"
    ],
    "sizeOptions": [
      "sm",
      "md",
      "lg"
    ],
    "variantOptions": [
      "default",
      "outline"
    ],
    "storyCount": 3
  },
  "tooltip": {
    "componentName": "Tooltip",
    "slug": "tooltip",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/Tooltip/Tooltip.stories.tsx",
    "description": "A tooltip component for displaying contextual information on hover or focus. Supports titles, descriptions, arrows, and action buttons.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "placement",
      "color"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 5
  },
  "tour": {
    "componentName": "Tour",
    "slug": "tour",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/Tour/Tour.stories.tsx",
    "description": "A tour component for guiding users through features using a composable API.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "open",
      "current",
      "defaultCurrent",
      "mask",
      "zIndex",
      "onClose",
      "onChange",
      "onFinish"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 1
  },
  "transfer": {
    "componentName": "Transfer",
    "slug": "transfer",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/Transfer/Transfer.stories.tsx",
    "description": "A transfer component for moving items between two lists using a composable API.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "titles",
      "operations",
      "targetKeys",
      "selectedKeys",
      "searchPlaceholder",
      "oneWay",
      "pagination",
      "disabled",
      "onChange",
      "onSelectChange",
      "render",
      "footer"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 2
  },
  "tree": {
    "componentName": "Tree",
    "slug": "tree",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/Tree/Tree.stories.tsx",
    "description": "A tree component for displaying hierarchical data with expand/collapse, selection, and checkbox support. Built using FT Design System tokens.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "checkable",
      "selectable",
      "showLine",
      "showIcon",
      "defaultExpandAll",
      "multiple",
      "disabled"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 5
  },
  "tree-select": {
    "componentName": "TreeSelect",
    "slug": "tree-select",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/TreeSelect/TreeSelect.stories.tsx",
    "description": "TreeSelect lets users select options from hierarchical data structures with optional search and multi-select.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "multiple",
      "treeCheckable",
      "showSearch"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 5
  },
  "typography": {
    "componentName": "Typography",
    "slug": "typography",
    "sourcePath": "/Users/user/Documents/components/src/components/atoms/Typography/Typography.stories.tsx",
    "description": "Reusable text component with exact Figma specifications. Perfect for AI tools, development, and design documentation. Use this for all text rendering needs.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "variant",
      "color"
    ],
    "sizeOptions": [],
    "variantOptions": [
      "title-primary",
      "title-secondary",
      "display-primary",
      "button",
      "body-primary-semibold",
      "body-primary-medium",
      "body-primary-italic",
      "body-primary-regular",
      "body-secondary-semibold",
      "body-secondary-medium",
      "body-secondary-regular"
    ],
    "storyCount": 3
  },
  "upload": {
    "componentName": "Upload",
    "slug": "upload",
    "sourcePath": "/Users/user/Documents/components/src/stories/Upload.stories.tsx",
    "description": "A comprehensive upload component supporting drag-and-drop, button, and thumbnail upload types with progress tracking and validation.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "type",
      "maxFiles",
      "maxFileSize",
      "multiple",
      "autoUpload",
      "glass"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 6
  },
  "upload-button": {
    "componentName": "UploadButton",
    "slug": "upload-button",
    "sourcePath": "/Users/user/Documents/components/src/stories/UploadButton.stories.tsx",
    "description": "A button component for file uploads with different states.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "state",
      "disabled",
      "multiple",
      "glass"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 4
  },
  "upload-item": {
    "componentName": "UploadItem",
    "slug": "upload-item",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/UploadItem/UploadItem.stories.tsx",
    "description": "Upload item component for displaying file upload status with progress tracking.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "type",
      "state",
      "glass"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 8
  },
  "upload-thumbnail": {
    "componentName": "UploadThumbnail",
    "slug": "upload-thumbnail",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/UploadThumbnail/UploadThumbnail.stories.tsx",
    "description": "Upload thumbnail component for image uploads with preview support.",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "state",
      "showFileName",
      "disabled",
      "glass"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 5
  },
  "upload-zone": {
    "componentName": "UploadZone",
    "slug": "upload-zone",
    "sourcePath": "/Users/user/Documents/components/src/stories/UploadZone.stories.tsx",
    "description": "Drag and drop upload zone component for file selection and upload. Supports file validation, multiple file selection, and interactive states with customizable file type restrictions.",
    "tags": [],
    "propNames": [
      "acceptedFileTypes",
      "maxFileSize",
      "disabled",
      "multiple",
      "glass"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 5
  },
  "user-profile": {
    "componentName": "UserProfile",
    "slug": "user-profile",
    "sourcePath": "/Users/user/Documents/components/src/stories/UserProfile.stories.tsx",
    "description": "A user profile trigger component that pairs with the ",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "userName",
      "userRole",
      "userLocation",
      "userBadge",
      "companyName",
      "onClick",
      "glass"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 5
  },
  "user-profile-dropdown": {
    "componentName": "UserProfileDropdown",
    "slug": "user-profile-dropdown",
    "sourcePath": "/Users/user/Documents/components/src/stories/UserProfileDropdown.stories.tsx",
    "description": "Expanded dropdown panel paired with ",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "userName",
      "userRole",
      "userLocation",
      "userBadge",
      "isOpen",
      "onMenuItemClick"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 3
  },
  "watermark": {
    "componentName": "Watermark",
    "slug": "watermark",
    "sourcePath": "/Users/user/Documents/components/src/components/molecules/Watermark/Watermark.stories.tsx",
    "description": "Glass style variant",
    "tags": [
      "autodocs"
    ],
    "propNames": [
      "glass"
    ],
    "sizeOptions": [],
    "variantOptions": [],
    "storyCount": 3
  }
};
