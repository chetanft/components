"use client";

import * as React from "react";
import { useState, useMemo, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Copy, Check, Terminal, Eye, ExternalLink } from "lucide-react";
import type { StoryDefinition, StoryMeta } from "@/lib/story-loader";
import { formatStoryName } from "@/lib/story-loader";
import { Highlight, themes } from "prism-react-renderer";
import { extractStorySource } from "@/lib/story-source";
import { getStorySource } from "@/app/actions/get-story-source";
import { UserProfile } from "@/registry";
import { useTheme } from "next-themes";

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
}: StoryPreviewProps) {
  const { theme, resolvedTheme } = useTheme();
  const [view, setView] = useState<"preview" | "code">(defaultView || "preview");
  const [copied, setCopied] = useState(false);
  const [storySource, setStorySource] = useState<string | null>(null);
  const resolvedComponentName = componentName || meta.component?.displayName || meta.component?.name;

  // Sync with defaultView prop changes
  useEffect(() => {
    if (defaultView) {
      setView(defaultView);
    }
  }, [defaultView]);

  // Handle view change
  const handleViewChange = (newView: "preview" | "code") => {
    setView(newView);
    onViewChange?.(newView);
  };

  const currentTheme = resolvedTheme || theme || "light";
  const isDark = currentTheme === "dark" || currentTheme === "night";

  // Use a prism theme that matches the mode
  // Using nightOwl for dark/night and github for light
  const prismTheme = isDark ? themes.nightOwl : themes.github;

  // Merge default args with story args
  const mergedArgs = useMemo(() => {
    return {
      ...meta.args,
      ...story.args,
    };
  }, [meta.args, story.args]);

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

  const onCopy = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
        content = story.render(mergedArgs);
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

  return (
    <div className={cn("group relative flex flex-col space-y-2 h-full", className)}>
      <div className="relative rounded-lg border bg-background shadow-sm overflow-hidden h-full">
        {/* Header */}
        <div className="flex items-center justify-between border-b p-2">
          <div className="flex items-start justify-start gap-2 w-fit">
            {showName && (
              <span className="text-sm font-medium text-foreground px-2">
                {formatStoryName(story.name)}
              </span>
            )}
            <div className="flex items-center gap-1">
              <button
                onClick={() => handleViewChange("preview")}
                className={cn(
                  "inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                  view === "preview"
                    ? "bg-muted text-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted/50"
                )}
              >
                <Eye className="mr-1.5 h-3.5 w-3.5" />
                Preview
              </button>
              <button
                onClick={() => handleViewChange("code")}
                className={cn(
                  "inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                  view === "code"
                    ? "bg-muted text-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted/50"
                )}
              >
                <Terminal className="mr-1.5 h-3.5 w-3.5" />
                Code
              </button>
            </div>
          </div>
          <button
            onClick={onCopy}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border bg-background text-sm font-medium transition-colors hover:bg-muted"
            title="Copy code"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>

        {/* Content */}
        {view === "preview" && (
          <div className="p-8 h-full bg-background overflow-x-auto flex items-start justify-start">
            <div className="min-w-max mx-auto">
              {renderedStory}
            </div>
          </div>
        )}

        {view === "code" && (
          <div className="relative overflow-x-auto bg-[var(--bg-secondary)]">
            <Highlight theme={prismTheme} code={codeString} language="tsx">
              {({ className, style, tokens, getLineProps, getTokenProps }) => {
                const isSingleLine = tokens.length === 1;
                return (
                  <pre
                    className={cn(className, "p-4 text-sm font-mono overflow-x-auto")}
                    style={{ 
                      ...style, 
                      margin: 0, 
                      borderRadius: 0,
                      backgroundColor: "transparent" // Let the container handle the background
                    }}
                  >
                    {tokens.map((line, i) => (
                      <div key={i} {...getLineProps({ line })}>
                        {!isSingleLine && (
                          <span className="select-none opacity-50 w-8 inline-block text-right mr-4 text-xs">
                            {i + 1}
                          </span>
                        )}
                        {line.map((token, key) => (
                          <span key={key} {...getTokenProps({ token })} />
                        ))}
                      </div>
                    ))}
                  </pre>
                );
              }}
            </Highlight>
          </div>
        )}
      </div>
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

  // Find current story, fallback to first story if not found
  const currentStory = stories.find((s) => s.name === activeStory) || stories[0];

  // Render empty state if no stories, but AFTER all hooks are called
  if (!currentStory || stories.length === 0) {
    return <div className={cn("space-y-4", className)}>No stories available.</div>;
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Tab selector */}
      <div className="flex flex-wrap gap-2 border-b pb-2">
        {stories.map((story) => (
          <button
            key={story.name}
            onClick={() => setActiveStory(story.name)}
            className={cn(
              "px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
              activeStory === story.name
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted"
            )}
          >
            {formatStoryName(story.name)}
          </button>
        ))}
      </div>

      {/* Active story preview */}
      <StoryPreview story={currentStory} meta={meta} showName={false} />
    </div>
  );
}
