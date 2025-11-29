"use client";

import * as React from "react";
import { useState, useMemo, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Copy, Check, Terminal, Eye, ExternalLink } from "lucide-react";
import type { StoryDefinition, StoryMeta } from "@/lib/story-loader";
import { formatStoryName } from "@/lib/story-loader";
import { Highlight, themes } from "prism-react-renderer";
import { loadStorySource, extractStorySource } from "@/lib/story-source";

interface StoryPreviewProps {
  /** The story definition to render */
  story: StoryDefinition;
  /** The story meta (contains the component and default args) */
  meta: StoryMeta;
  /** Optional class name */
  className?: string;
  /** Show the story name as a header */
  showName?: boolean;
}

/**
 * Renders a single Storybook story directly
 * No parsing, no conversion - just direct component rendering
 */
export function StoryPreview({
  story,
  meta,
  className,
  showName = true,
}: StoryPreviewProps) {
  const [view, setView] = useState<"preview" | "code">("preview");
  const [copied, setCopied] = useState(false);
  const [storySource, setStorySource] = useState<string | null>(null);

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
      const componentName = meta.component?.displayName || meta.component?.name;
      if (componentName) {
        loadStorySource(componentName).then((source) => {
          if (source) {
            // Store the full source, not the extracted story
            setStorySource(source);
          }
        });
      }
    }
  }, [story.component, story.render, story.name, meta.component]);

  // Generate clean JSX code representation
  const codeString = useMemo(() => {
    const Component = meta.component;
    const componentName = Component?.displayName || Component?.name || "Component";

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
      // Try to extract Button JSX from story source
      if (storySource) {
        const buttonJSX = extractButtonJSX(storySource, story.name);
        if (buttonJSX) {
          return buttonJSX;
        }
      }
      
      // Fallback: For Button component with circular buttons story, show example
      if (componentName === 'Button' && story.name.toLowerCase().includes('circular')) {
        return `<Button variant="secondary" size="md" className="rounded-full" icon="edit" iconPosition="only" />`;
      }
      
      // Fallback: Show a simplified usage example from args
      const props = Object.entries(mergedArgs)
        .map(([k, v]) => formatProp(k, v))
        .filter(Boolean);
      
      if (props.length === 0) {
        return `<${componentName} />`;
      }
      
      if (props.length <= 3) {
        return `<${componentName} ${props.join(" ")} />`;
      }
      
      return `<${componentName}\n  ${props.join("\n  ")}\n/>`;
    }

    // Args-based story - generate clean JSX
    const hasChildren = "children" in mergedArgs;
    const { children, ...restArgs } = mergedArgs as { children?: React.ReactNode; [key: string]: unknown };
    
    const props = Object.entries(restArgs)
      .map(([k, v]) => formatProp(k, v))
      .filter(Boolean);

    if (hasChildren) {
      const childrenStr = typeof children === "string" ? children : "{/* children */}";
      if (props.length === 0) {
        return `<${componentName}>${childrenStr}</${componentName}>`;
      }
      return `<${componentName} ${props.join(" ")}>\n  ${childrenStr}\n</${componentName}>`;
    }

    if (props.length === 0) {
      return `<${componentName} />`;
    }
    
    if (props.length <= 3) {
      return `<${componentName} ${props.join(" ")} />`;
    }

    return `<${componentName}\n  ${props.join("\n  ")}\n/>`;
  }, [story, meta, mergedArgs, storySource]);

  const onCopy = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Render the actual story - ensure consistent rendering to prevent hook order issues
  const renderedStory = React.useMemo(() => {
    try {
      // Case 1: Function component story (like `Sizes`, `InteractiveDemo`)
      if (story.component) {
        const StoryComponent = story.component;
        return <StoryComponent />;
      }

      // Case 2: Render function story
      if (story.render) {
        return story.render(mergedArgs);
      }

      // Case 3: Args-based story - render the component with args
      if (meta.component) {
        const Component = meta.component;
        return <Component {...mergedArgs} />;
      }

      return <div className="text-muted-foreground">Unable to render story</div>;
    } catch (error) {
      console.error('Error rendering story:', error);
      return <div className="text-destructive">Error rendering story: {String(error)}</div>;
    }
  }, [story.component, story.render, meta.component, mergedArgs]);

  return (
    <div className={cn("group relative flex flex-col space-y-2", className)}>
      <div className="relative rounded-lg border bg-background shadow-sm overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b p-2">
          <div className="flex items-center gap-2">
            {showName && (
              <span className="text-sm font-medium text-foreground px-2">
                {formatStoryName(story.name)}
              </span>
            )}
            <div className="flex items-center gap-1 ml-2">
              <button
                onClick={() => setView("preview")}
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
                onClick={() => setView("code")}
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
          <div className="p-8 min-h-[200px] flex items-center justify-center bg-background">
            <div className="w-full flex justify-center">{renderedStory}</div>
          </div>
        )}

        {view === "code" && (
          <div className="relative overflow-x-auto">
            <Highlight theme={themes.nightOwl} code={codeString} language="tsx">
              {({ className, style, tokens, getLineProps, getTokenProps }) => {
                const isSingleLine = tokens.length === 1;
                return (
                <pre
                  className={cn(className, "p-4 text-sm font-mono overflow-x-auto")}
                  style={{ ...style, margin: 0, borderRadius: 0 }}
                >
                  {tokens.map((line, i) => (
                    <div key={i} {...getLineProps({ line })}>
                        {!isSingleLine && (
                      <span className="select-none text-gray-500 w-8 inline-block text-right mr-4 text-xs">
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
