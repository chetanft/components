"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { loadStoryModule, formatStoryName } from "@/lib/story-loader";
import { PropsTable } from "@/components/props-table";
import type { LoadedStoryModule } from "@/lib/story-loader";
import { cn } from "@/lib/utils";
import { ExamplesSection } from "@/components/examples-section";
import { DocPager } from "@/components/doc-pager";
import { CodeBlock } from "@/components/code-block";
import { useToc, type TocItem } from "@/components/toc-context";
import { buildMachineSpec } from "@/lib/machine-spec";
import { Badge } from "@/registry";
import { useViewMode } from "@/components/view-mode-context";

/**
 * Curated, user-facing descriptions (shadcn-style).
 * Short, functional — what it does, not how it's built.
 */
const componentDescriptions: Record<string, string> = {
  // Atoms
  Avatar: "An image element with a fallback for representing the user.",
  Badge: "Displays a badge or a component that looks like a badge.",
  Button: "Displays a button or a component that looks like a button.",
  Checkbox: "A control that allows the user to toggle between checked and not checked.",
  Chicklet: "A compact, dismissible tag for filters and selections.",
  Divider: "Visually separates content into distinct sections.",
  FigmaBadge: "A Figma-specific badge variant for design system documentation.",
  Icons: "A set of icons for use across the interface.",
  Illustration: "Decorative illustrations for empty states and onboarding.",
  Input: "Displays a form input field or a component that looks like an input.",
  Label: "Renders an accessible label associated with a form control.",
  Logo: "Displays brand logos in various formats and sizes.",
  ReadOnly: "Displays a value in a non-editable format matching input styling.",
  Skeleton: "A placeholder that mimics content layout while loading.",
  Spacer: "Adds consistent spacing between elements using design tokens.",
  Spin: "A loading spinner for indicating an ongoing operation.",
  Statistic: "Displays a numeric value with a label, used for KPIs and metrics.",
  SubText: "Helper or hint text that appears below form fields.",
  Switch: "A control that allows the user to toggle between on and off.",
  Text: "Renders styled text with configurable size and color.",
  Textarea: "Displays a multi-line text input field.",
  Toggle: "A two-state button that can be on or off.",
  Typography: "A text component for headings, paragraphs, and inline text.",
  // Molecules
  Affix: "Wraps content that sticks to the viewport on scroll.",
  Alert: "Displays a callout for important contextual messages.",
  Anchor: "A navigation link with active state tracking.",
  BackTop: "A button that scrolls the page back to the top.",
  Breadcrumb: "Displays the path to the current page using a hierarchy of links.",
  ButtonGroup: "Groups related buttons together with connected borders.",
  Calendar: "A date grid for displaying or selecting dates.",
  Carousel: "A slideshow component for cycling through content.",
  Cascader: "A dropdown for selecting from cascading, hierarchical categories.",
  ColorPicker: "A control for selecting a color from a palette or custom input.",
  Content: "A layout wrapper for structuring page content areas.",
  DatePicker: "A date and time selection input with calendar popup.",
  Descriptions: "Displays a list of key-value pairs for read-only data.",
  Dropdown: "Displays a menu of options triggered by a button.",
  DropdownMenu: "A context menu with keyboard navigation and submenus.",
  Empty: "A placeholder shown when a list or table has no data.",
  FileValidationCard: "Displays file validation status with error details.",
  FilterDropdown: "A dropdown with multi-select, search, and apply controls for filtering data.",
  FilterSearch: "A search input specifically designed for filter interfaces.",
  FloatButton: "A floating action button fixed to the viewport corner.",
  Graphs: "Chart and graph components for data visualization.",
  HoverCard: "A card popup shown on hover for previewing content.",
  Image: "An enhanced image with loading, fallback, and preview states.",
  InputNumber: "A numeric input with increment and decrement controls.",
  List: "A structured list for displaying items with consistent layout.",
  Loader: "A full-page or section-level loading overlay.",
  Mentions: "A text input with @-mention autocomplete for tagging users.",
  Message: "A lightweight, auto-dismissing feedback notification.",
  Notification: "A toast notification with title, description, and actions.",
  PageHeaderFilters: "A filter bar with search, filters, and view controls below a page header.",
  Pagination: "Navigation for moving between pages of content.",
  Popconfirm: "A compact confirmation popup attached to a trigger element.",
  ProgressBar: "A visual indicator of completion progress.",
  ProgressList: "A list of tasks or steps with individual progress indicators.",
  RadioSelector: "Card-style radio selection with rich visual options.",
  Rate: "A star rating input for collecting user feedback.",
  SegmentedTabs: "A pill-shaped toggle for switching between views or filters.",
  SimpleColumnLayout: "A responsive column layout for arranging content side by side.",
  Slider: "A range input for selecting a numeric value by dragging.",
  StackedBarChart: "A stacked bar chart for comparing composition across categories.",
  Steps: "A progress indicator for multi-step workflows.",
  Tabs: "A set of layered sections of content, known as tab panels.",
  ThemeSwitch: "A toggle for switching between light and dark themes.",
  Timeline: "Displays a chronological sequence of events.",
  TimePicker: "A time selection input with hour and minute pickers.",
  ToggleGroup: "A group of toggle buttons where one or multiple can be active.",
  Tooltip: "A popup that displays information on hover or focus.",
  Tour: "A guided walkthrough highlighting UI elements step by step.",
  Transfer: "A dual-list selector for moving items between two panels.",
  Tree: "A hierarchical tree view with expand and collapse controls.",
  TreeSelect: "A dropdown that displays options in a tree hierarchy.",
  UploadButton: "A button that triggers a file upload dialog.",
  UploadItem: "Displays an uploaded file with name, progress, and actions.",
  UploadThumbnail: "A thumbnail preview for uploaded image files.",
  Watermark: "An overlay pattern on content for security or branding.",
  // Organisms
  AppHeader: "The top-level application header with logo, navigation, and user menu.",
  Card: "A container for grouping related content with a bordered surface.",
  Collapsible: "An expandable section with animated content reveal.",
  DataEntryTable: "An editable table designed for inline bulk data entry.",
  DisplayBlock: "A titled content section for structured page layouts.",
  Drawer: "A panel that slides in from the edge of the screen.",
  FileCard: "Displays file information with preview, metadata, and actions.",
  FileThumbnail: "A thumbnail preview component for various file types.",
  FileTypeIcon: "An icon that represents a file type.",
  Footer: "A page footer with links, copyright, and secondary navigation.",
  Form: "A container for form fields with validation and submission handling.",
  Grid: "A responsive grid layout for arranging items in rows and columns.",
  Modal: "A window overlaid on the primary content, rendering the content underneath inert.",
  NavigationLauncher: "A sidebar navigation component for app-wide page navigation.",
  NavigationPopover: "A popover-based mega-menu for complex navigation.",
  PageHeader: "A page-level header with title, breadcrumbs, and actions.",
  QuickFilters: "A row of filter chips for rapid data filtering.",
  Result: "A full-page result display for success, error, or empty states.",
  Table: "Displays tabular data with sorting, filtering, and row selection.",
  Upload: "A file upload area with drag-and-drop support.",
  UploadZone: "A drag-and-drop file upload area with visual drop target.",
  UserProfile: "Displays user information with avatar, name, and details.",
  UserProfileDropdown: "A header dropdown with user info, settings, and logout.",
  RadioGroup: "A set of radio buttons where only one can be selected at a time.",
};

interface StoryComponentPageProps {
  componentName: string;
}

/**
 * Full component documentation page using direct story imports
 */
export function StoryComponentPage({ componentName }: StoryComponentPageProps) {
  const [storyModule, setStoryModule] = useState<LoadedStoryModule | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [installTab, setInstallTab] = useState<"npm" | "pnpm" | "yarn">("npm");
  const searchParams = useSearchParams();
  const [isExplorerView, setIsExplorerView] = useState(false);
  const { viewMode } = useViewMode();
  const { setItems: setTocItems } = useToc();

  useEffect(() => {
    const urlView = searchParams.get("view");
    if (urlView === "explorer") {
      setIsExplorerView(true);
      return;
    }
    if (urlView === "list") {
      setIsExplorerView(false);
      return;
    }

    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("ftds_docs_examples_view");
      setIsExplorerView(stored === "explorer");
    } else {
      setIsExplorerView(false);
    }
  }, [searchParams]);

  // Load story module
  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);

      try {
        const loadedModule = await loadStoryModule(componentName);
        if (loadedModule) {
          setStoryModule(loadedModule);
        } else {
          setError(`No stories found for ${componentName}`);
        }
      } catch (err) {
        setError(`Failed to load stories: ${err}`);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [componentName]);

  // Register TOC items
  useEffect(() => {
    if (!storyModule) {
      setTocItems([]);
      return;
    }

    const tocItems: TocItem[] = [
      { id: "installation", title: "Installation", level: 2 },
      { id: "examples", title: "Examples", level: 2 },
    ];

    // Add sub-items for individual stories
    storyModule.stories.slice(0, 8).forEach((story) => {
      tocItems.push({
        id: `story-${story.name}`,
        title: formatStoryName(story.name),
        level: 3,
      });
    });

    if (!isExplorerView && storyModule.meta.argTypes && Object.keys(storyModule.meta.argTypes).length > 0) {
      tocItems.push({ id: "props", title: "Props", level: 2 });
    }

    setTocItems(tocItems);

    return () => setTocItems([]);
  }, [storyModule, setTocItems, isExplorerView]);

  // Generate install commands
  const installCommands = {
    npm: `npm install ft-design-system`,
    pnpm: `pnpm add ft-design-system`,
    yarn: `yarn add ft-design-system`,
  };

  const importStatement = `import { ${componentName} } from 'ft-design-system';`;

  // Format display name: "HoverCard" → "Hover Card"
  const displayName = componentName.replace(/([a-z])([A-Z])/g, "$1 $2");

  // Loading state
  if (loading) {
    return (
      <div className="space-y-12">
        <div className="space-y-4 animate-pulse">
          <div className="h-12 bg-muted rounded w-48" />
          <div className="h-6 bg-muted rounded w-96" />
        </div>
        <div className="space-y-4 animate-pulse">
          <div className="h-8 bg-muted rounded w-32" />
          <div className="h-12 bg-muted rounded" />
        </div>
        <div className="space-y-4 animate-pulse">
          <div className="h-8 bg-muted rounded w-32" />
          <div className="h-64 bg-muted rounded" />
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-page-title font-bold">{displayName}</h1>
        <div className="bg-destructive/10 text-destructive p-6 rounded-lg border border-destructive/20">
          <p className="font-medium">Failed to load component</p>
          <p className="text-sm-rem mt-2">{error}</p>
          <p className="text-sm-rem mt-4 text-muted-foreground">
            This component may not have Storybook stories yet.
          </p>
        </div>
        <DocPager />
      </div>
    );
  }

  if (!storyModule) {
    return (
      <div className="space-y-6">
        <h1 className="text-page-title font-bold">{displayName}</h1>
        <p className="text-muted-foreground">No documentation available for this component.</p>
        <DocPager />
      </div>
    );
  }

  // Extract description — prefer curated overrides, fallback to story meta
  const description =
    componentDescriptions[componentName] ||
    storyModule.meta.parameters?.docs?.description?.component ||
    `${displayName} component`;

  const machineSpec = buildMachineSpec(componentName, storyModule.meta, storyModule.stories);

  // Machine mode: render only raw spec text, nothing else
  if (viewMode === "machine") {
    return (
      <pre
        className="whitespace-pre-wrap font-mono"
        style={{
          fontSize: "var(--font-size-xs-rem)",
          color: "var(--primary)",
          lineHeight: 1.7,
        }}
      >
        {machineSpec}
      </pre>
    );
  }

  return (
    <div className="flex flex-col space-y-10 w-full">
      {/* Header */}
      <div className="flex flex-col space-y-4 w-full">
        <div>
          <h1 className="text-page-title font-bold">{displayName}</h1>
          <p
            className="text-md-rem mt-2.5 text-muted-foreground"
          >
            {description}
          </p>
        </div>

        {/* Story count and tags */}
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="neutral" size="sm">{storyModule.stories.length} stories</Badge>
          {storyModule.meta.tags && storyModule.meta.tags.length > 0 && (
            <div className="flex gap-1.5">
              {storyModule.meta.tags.map((tag) => (
                <Badge key={tag} variant="neutral" size="xs">{tag}</Badge>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Installation */}
          <div className="space-y-4" id="installation">
            <h2 className="text-section font-semibold scroll-mt-20">Installation</h2>

            {/* Package manager tabs */}
            <div className="flex items-center gap-1 border-b border-border">
              {(["npm", "pnpm", "yarn"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setInstallTab(tab)}
                  className={cn(
                    "px-3 py-1.5 text-sm-rem font-medium transition-colors border-b-2 -mb-px",
                    installTab === tab
                      ? "border-foreground text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>

            <CodeBlock code={installCommands[installTab]} lang="bash" />

            {/* Import statement */}
            <CodeBlock code={importStatement} lang="tsx" />
          </div>

          {/* Examples */}
          <div id="examples">
            <h2 className="text-section font-semibold scroll-mt-20 sr-only">Examples</h2>
            <ExamplesSection
              stories={storyModule.stories}
              meta={storyModule.meta}
              componentName={componentName}
            />
          </div>

          {/* Props */}
          {!isExplorerView && storyModule.meta.argTypes && Object.keys(storyModule.meta.argTypes).length > 0 && (
            <div className="space-y-4" id="props">
              <h2 className="text-section font-semibold scroll-mt-20">Props</h2>
              <div className="overflow-hidden rounded-lg border">
                <PropsTable meta={storyModule.meta} />
              </div>
            </div>
          )}

      {/* Prev/Next navigation */}
      {!isExplorerView && <DocPager />}
    </div>
  );
}
