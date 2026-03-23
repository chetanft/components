"use client";

import * as React from "react";
import { useState, useMemo, useEffect } from "react";
import { cn } from "@/lib/utils";
import type { StoryDefinition, StoryMeta } from "@/lib/story-loader";
import { formatStoryName } from "@/lib/story-loader";
import { CodeBlock } from "@/components/code-block";
import { extractStorySource } from "@/lib/story-source";
import { getStorySource } from "@/app/actions/get-story-source";
import { UserProfile, Badge, Icon, Button, Tabs, TabItem } from "@/registry";
import { getComponentGuideline } from "@/data/designer-guidelines";
import { useGlass } from "@/components/glass-provider";

interface StoryPreviewProps {
  /** The story definition to render */
  story: StoryDefinition;
  /** The story meta (contains the component and default args) */
  meta: StoryMeta;
  /** Optional component name override */
  componentName?: string;
  /** Optional class name */
  className?: string;
  /** Show the story name as a header */
  showName?: boolean;
  /** Optional default view (preview/code) */
  defaultView?: "preview" | "code";
  /** Optional callback when view changes */
  onViewChange?: (view: "preview" | "code") => void;
  /** Render without preview/code chrome */
  chromeless?: boolean;
  /** Optional arg overrides (playground controls) */
  overrideArgs?: Record<string, unknown>;
}

/**
 * Renders a single Storybook story directly
 * No parsing, no conversion - just direct component rendering
 */
export function StoryPreview({
  story,
  meta,
  componentName,
  className,
  showName = true,
  defaultView,
  onViewChange,
  chromeless = false,
  overrideArgs,
}: StoryPreviewProps) {
  const [view, setView] = useState<"preview" | "code" | "usage">(defaultView || "preview");
  const [storySource, setStorySource] = useState<string | null>(null);
  const { glassMode } = useGlass();
  const resolvedComponentName = componentName || meta.component?.displayName || meta.component?.name;
  const guideline = resolvedComponentName ? getComponentGuideline(resolvedComponentName) : undefined;

  // Sync with defaultView prop changes
  useEffect(() => {
    if (defaultView) {
      setView(defaultView);
    }
  }, [defaultView]);

  // Handle view change
  const handleViewChange = (newView: "preview" | "code" | "usage") => {
    setView(newView);
    if (newView === "preview" || newView === "code") {
      onViewChange?.(newView);
    }
  };

  // Merge default args with story args and optional overrides
  const mergedArgs = useMemo(() => {
    return {
      ...meta.args,
      ...story.args,
      ...overrideArgs,
    };
  }, [meta.args, story.args, overrideArgs]);

  // Load story source for function-based stories
  useEffect(() => {
    if (story.component || story.render) {
      if (resolvedComponentName) {
        getStorySource(resolvedComponentName).then((source) => {
          if (source) {
            // Store the full source
            setStorySource(source);
          }
        });
      }
    }
  }, [story.component, story.render, story.name, resolvedComponentName]);

  // Generate clean JSX code representation
  const codeString = useMemo(() => {
    const Component = meta.component;
    const displayName = Component?.displayName || Component?.name || resolvedComponentName || "Component";

    // Helper to format prop value
    const formatProp = (key: string, value: unknown): string | null => {
      if (value === undefined || value === null) return null;
      if (typeof value === "string") return `${key}="${value}"`;
      if (typeof value === "boolean") return value ? key : null;
      if (typeof value === "number") return `${key}={${value}}`;
      if (typeof value === "function") return `${key}={/* function */}`;
      if (React.isValidElement(value)) return `${key}={/* React Element */}`;
      return `${key}={${JSON.stringify(value, null, 2)}}`;
    };

    // Helper to extract Button JSX lines from source code
    const extractButtonJSX = (fullSource: string | undefined, storyName: string): string | null => {
      if (!fullSource || typeof fullSource !== 'string') {
        return null;
      }
      // Find Button components with rounded-full className
      // Search the entire source file - Button components are unique enough
      // Pattern matches: <Button ... className="rounded-full" ... />
      // Handles both single-line and multi-line formats
      const buttonPattern = /<Button[\s\S]*?className\s*=\s*["']rounded-full["'][\s\S]*?\/>/g;
      const matches = fullSource.match(buttonPattern);

      if (matches && matches.length > 0) {
        // Clean up and format the first match
        let cleaned = matches[0]
          .replace(/\n\s+/g, ' ')  // Replace newlines and indentation with single space
          .replace(/\s{2,}/g, ' ') // Replace multiple spaces with single space
          .replace(/\s*\/>/g, ' />') // Ensure space before />
          .trim();

        // Format props nicely if it's a long line
        if (cleaned.length > 80) {
          // Try to break it into multiple lines
          const propsMatch = cleaned.match(/<Button\s+(.+?)\s*\/>/);
          if (propsMatch) {
            const props = propsMatch[1].split(/\s+(?=\w+=)/); // Split on prop boundaries
            return `<Button\n  ${props.join('\n  ')}\n/>`;
          }
        }

        return cleaned;
      }

      return null;
    };

    // For function stories, try to extract actual JSX from source
    if (story.component || story.render) {
      // Check if story has explicit source code in parameters
      if ((story.story as any)?.parameters?.docs?.source?.code) {
        return (story.story as any).parameters.docs.source.code;
      }

      // Try to extract Button JSX from story source
      if (storySource) {
        // Try generic extraction first
        const extractedSource = extractStorySource(storySource, story.name);
        if (extractedSource) {
          return extractedSource;
        }

        const buttonJSX = extractButtonJSX(storySource, story.name);
        if (buttonJSX) {
          return buttonJSX;
        }

        // Try to extract Pagination JSX from story source
      if (displayName === 'Pagination' && storySource && typeof storySource === 'string') {
          const paginationPattern = /<Pagination[\s\S]*?\/>/g;
          const matches = storySource.match(paginationPattern);
          if (matches && matches.length > 0) {
            // Find the match that's inside the CompactVariant function
            const storyFunctionPattern = new RegExp(
              `(?:export\\s+function\\s+${story.name}[\\s\\S]*?)(<Pagination[\\s\\S]*?\\/>)`,
              'i'
            );
            const storyMatch = storySource.match(storyFunctionPattern);
            if (storyMatch && storyMatch[1]) {
              // Clean up the extracted JSX
              let cleaned = storyMatch[1]
                .replace(/\n\s+/g, '\n  ')  // Preserve indentation
                .replace(/\s{2,}/g, ' ') // Replace multiple spaces with single space
                .trim();

              // Format multi-line if needed
              if (cleaned.includes('\n') || cleaned.length > 80) {
                // Already formatted or needs formatting
                return cleaned;
              }

              return cleaned;
            }
          }
        }
      }

      // Fallback: For Button component with circular buttons story, show example
      if (displayName === 'Button' && story.name.toLowerCase().includes('circular')) {
        return `<Button variant="secondary" size="md" className="rounded-full" icon="edit" iconPosition="only" />`;
      }

      // Fallback: For Pagination compact variant, show example
      if (displayName === 'Pagination' && story.name.toLowerCase().includes('compact')) {
        return `<Pagination
  current={1}
  total={100}
  pageSize={10}
  variant="compact"
  onChange={(page) => handlePageChange(page)}
/>`;
      }

      // Fallback: Show a simplified usage example from args
      const props = Object.entries(mergedArgs)
        .map(([k, v]) => formatProp(k, v))
        .filter(Boolean);

      if (props.length === 0) {
        return `<${displayName} />`;
      }

      if (props.length <= 3) {
        return `<${displayName} ${props.join(" ")} />`;
      }

      return `<${displayName}\n  ${props.join("\n  ")}\n/>`;
    }

    // Args-based story - generate clean JSX
    const hasChildren = "children" in mergedArgs;
    const { children, ...restArgs } = mergedArgs as { children?: React.ReactNode;[key: string]: unknown };

    const props = Object.entries(restArgs)
      .map(([k, v]) => formatProp(k, v))
      .filter(Boolean);

    if (hasChildren) {
      const childrenStr = typeof children === "string" ? children : "{/* children */}";
      if (props.length === 0) {
        return `<${displayName}>${childrenStr}</${displayName}>`;
      }
      return `<${displayName} ${props.join(" ")}>\n  ${childrenStr}\n</${displayName}>`;
    }

    if (props.length === 0) {
      return `<${displayName} />`;
    }

    if (props.length <= 3) {
      return `<${displayName} ${props.join(" ")} />`;
    }

    return `<${displayName}\n  ${props.join("\n  ")}\n/>`;
  }, [story, meta, mergedArgs, storySource, resolvedComponentName]);

  // Render the actual story - ensure consistent rendering to prevent hook order issues
  const renderedStory = React.useMemo(() => {
    try {
      let content: React.ReactNode;

      // Case 1: Function component story (like `Sizes`, `InteractiveDemo`)
      if (story.component) {
        const StoryComponent = story.component;
        content = <StoryComponent />;
      }
      // Case 2: Render function story
      else if (story.render) {
        const StoryRender = story.render as React.ComponentType<any>;
        content = <StoryRender {...mergedArgs} />;
      }
      // Case 3: Args-based story - render the component with args
      else if (meta.component) {
        const Component = meta.component;
        content = <Component {...mergedArgs} />;
      }
      else {
        return <div className="text-muted-foreground">Unable to render story</div>;
      }

      // Special handling for UserProfileDropdown - needs positioning context
      if (resolvedComponentName === 'UserProfileDropdown') {
        const { userName, userRole, userLocation, userBadge, userAvatar } = mergedArgs as any;
        return (
          <div style={{
            padding: 'calc(var(--spacing-x10) * 1.25)',
            backgroundColor: 'var(--bg-secondary)',
            minHeight: 'calc(var(--spacing-x10) * 15.625)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start'
          }}>
            <div style={{ position: 'relative', display: 'inline-flex', width: 'fit-content' }}>
              <UserProfile
                userName={userName}
                userRole={userRole}
                userLocation={userLocation}
                userBadge={userBadge}
                userAvatar={userAvatar}
              />
              {content}
            </div>
          </div>
        );
      }

      return content;
    } catch (error) {
      console.error('Error rendering story:', error);
      return <div className="text-destructive">Error rendering story: {String(error)}</div>;
    }
  }, [story.component, story.render, meta.component, mergedArgs, resolvedComponentName]);

  if (chromeless) {
    return <div className={cn(className)}>{renderedStory}</div>;
  }

  return (
    <div className={cn("group relative flex flex-col space-y-2 h-full", className)}>
      <div className="relative rounded-lg border border-border bg-background shadow-sm overflow-hidden h-full">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border p-2">
          <div className="flex items-start justify-start gap-2 w-fit">
            {showName && (
              <span className="text-sm-rem font-medium text-foreground px-2">
                {formatStoryName(story.name)}
              </span>
            )}
            <Tabs
              type="secondary"
              activeTab={view === "preview" ? 0 : view === "code" ? 1 : 2}
              onTabChange={(i) => handleViewChange((["preview", "code", "usage"] as const)[i])}
              glass={glassMode || undefined}
            >
              <div className="flex items-center gap-1">
                <TabItem label="Preview" active={view === "preview"} onSelect={() => handleViewChange("preview")} type="secondary" />
                <TabItem label="Code" active={view === "code"} onSelect={() => handleViewChange("code")} type="secondary" />
                {guideline && (
                  <TabItem label="Usage" active={view === "usage"} onSelect={() => handleViewChange("usage")} type="secondary" />
                )}
              </div>
            </Tabs>
          </div>
        </div>

        {/* Content */}
        {view === "preview" && (
          <div
            className="p-10 min-h-[350px] bg-background overflow-hidden flex items-center justify-center"
          >
            <div className="w-full overflow-hidden flex justify-center gap-0">
              {renderedStory}
            </div>
          </div>
        )}

        {view === "code" && (
          <CodeBlock code={codeString} lang="tsx" className="border-0 rounded-none" />
        )}

        {view === "usage" && guideline && (
          <VariantUsagePanel
            storyName={story.name}
            guideline={guideline}
          />
        )}
      </div>
    </div>
  );
}

/**
 * Inline usage panel shown in the "Usage" tab of a variant preview.
 * Shows the variant match from guidelines if available, plus quick do/don't tips.
 */
function VariantUsagePanel({
  storyName,
  guideline,
}: {
  storyName: string;
  guideline: import("@/data/designer-guidelines").ComponentGuideline;
}) {
  const nameLower = storyName.toLowerCase();

  // Try to match this story to a specific variant guideline
  const matchedVariant = guideline.variants?.find((v) => {
    const vLower = v.name.toLowerCase();
    return nameLower.includes(vLower) || nameLower === vLower;
  });

  // Pick a relevant do/don't (rotate based on story name hash)
  const hashCode = storyName.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const doPair = guideline.designDosAndDonts[hashCode % guideline.designDosAndDonts.length];

  return (
    <div className="p-5 space-y-4 text-sm-rem" style={{ backgroundColor: "var(--bg-secondary)" }}>
      {matchedVariant ? (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="default" size="sm">{matchedVariant.name}</Badge>
            <span style={{ color: "var(--secondary)" }}>{matchedVariant.description}</span>
          </div>
          <p style={{ color: "var(--tertiary)" }}>
            <strong style={{ color: "var(--secondary)" }}>Use case:</strong> {matchedVariant.useCase}
          </p>
        </div>
      ) : (
        <p style={{ color: "var(--secondary)" }}>{guideline.description}</p>
      )}

      {/* When to use / not to use */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <p className="font-medium" style={{ color: "var(--positive-dark)" }}>When to use</p>
          <ul className="space-y-1" style={{ color: "var(--secondary)" }}>
            {guideline.whenToUse.slice(0, 2).map((item, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span style={{ color: "var(--positive)" }}>+</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-1.5">
          <p className="font-medium" style={{ color: "var(--critical)" }}>When not to use</p>
          <ul className="space-y-1" style={{ color: "var(--secondary)" }}>
            {guideline.whenNotToUse.slice(0, 2).map((item, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span style={{ color: "var(--critical)" }}>−</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Quick do/don't */}
      {doPair && (
        <div className="flex gap-3 pt-2 border-t" style={{ borderColor: "var(--docs-border)" }}>
          <div className="flex-1 flex items-start gap-2">
            <span className="mt-0.5 shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: "var(--positive-light)", color: "var(--positive-dark)" }}>✓</span>
            <span style={{ color: "var(--secondary)" }}>{doPair.do}</span>
          </div>
          <div className="flex-1 flex items-start gap-2">
            <span className="mt-0.5 shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: "var(--critical-light)", color: "var(--critical)" }}>✗</span>
            <span style={{ color: "var(--secondary)" }}>{doPair.dont}</span>
          </div>
        </div>
      )}
    </div>
  );
}

interface StoryPreviewGridProps {
  /** All stories to render */
  stories: StoryDefinition[];
  /** The story meta */
  meta: StoryMeta;
  /** Optional class name */
  className?: string;
}

/**
 * Renders multiple stories in a grid/list layout
 */
export function StoryPreviewGrid({
  stories,
  meta,
  className,
}: StoryPreviewGridProps) {
  return (
    <div className={cn("space-y-6", className)}>
      {stories.map((story) => (
        <StoryPreview
          key={story.name}
          story={story}
          meta={meta}
          showName={true}
        />
      ))}
    </div>
  );
}

interface StoryTabsProps {
  /** All stories to render */
  stories: StoryDefinition[];
  /** The story meta */
  meta: StoryMeta;
  /** Optional class name */
  className?: string;
}

/**
 * Renders stories with a tab selector
 */
export function StoryTabs({ stories, meta, className }: StoryTabsProps) {
  // Always call hooks first, before any conditional returns
  const [activeStory, setActiveStory] = useState(stories[0]?.name || "");
  const { glassMode } = useGlass();

  // Find current story, fallback to first story if not found
  const currentStory = stories.find((s) => s.name === activeStory) || stories[0];

  // Render empty state if no stories, but AFTER all hooks are called
  if (!currentStory || stories.length === 0) {
    return <div className={cn("space-y-4", className)}>No stories available.</div>;
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Tab selector */}
      <Tabs
        type="primary"
        activeTab={stories.findIndex((s) => s.name === activeStory)}
        onTabChange={(i) => setActiveStory(stories[i].name)}
        glass={glassMode || undefined}
      >
        <div className="flex flex-wrap">
          {stories.map((story) => (
            <TabItem
              key={story.name}
              label={formatStoryName(story.name)}
              active={activeStory === story.name}
              onSelect={() => setActiveStory(story.name)}
              type="primary"
            />
          ))}
        </div>
      </Tabs>

      {/* Active story preview */}
      <StoryPreview story={currentStory} meta={meta} showName={false} />
    </div>
  );
}
