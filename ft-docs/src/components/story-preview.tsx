"use client";

import * as React from "react";
import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Copy, Check, Terminal, Play, Eye } from "lucide-react";
import type { StoryDefinition, StoryMeta } from "@/lib/story-loader";
import { formatStoryName } from "@/lib/story-loader";

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

  // Merge default args with story args
  const mergedArgs = useMemo(() => {
    return {
      ...meta.args,
      ...story.args,
    };
  }, [meta.args, story.args]);

  // Generate the code representation
  const codeString = useMemo(() => {
    if (story.component) {
      // Function component - show the function source if available
      return `// Function Story: ${story.name}\n${story.component.toString()}`;
    }

    if (story.render) {
      return `// Render Function\nrender: (args) => ${story.render.toString()}`;
    }

    // Args-based story - generate JSX
    const Component = meta.component;
    const componentName = Component?.displayName || Component?.name || "Component";
    const propsString = Object.entries(mergedArgs)
      .map(([key, value]) => {
        if (typeof value === "string") {
          return `${key}="${value}"`;
        }
        if (typeof value === "boolean" && value) {
          return key;
        }
        if (typeof value === "boolean" && !value) {
          return null;
        }
        return `${key}={${JSON.stringify(value)}}`;
      })
      .filter(Boolean)
      .join("\n  ");

    const hasChildren = "children" in mergedArgs;
    if (hasChildren) {
      const { children, ...rest } = mergedArgs;
      const restProps = Object.entries(rest)
        .map(([key, value]) => {
          if (typeof value === "string") return `${key}="${value}"`;
          if (typeof value === "boolean" && value) return key;
          if (typeof value === "boolean" && !value) return null;
          return `${key}={${JSON.stringify(value)}}`;
        })
        .filter(Boolean)
        .join(" ");
      return `<${componentName}${restProps ? " " + restProps : ""}>${children}</${componentName}>`;
    }

    return `<${componentName}\n  ${propsString}\n/>`;
  }, [story, meta, mergedArgs]);

  const onCopy = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Render the actual story
  const renderStory = () => {
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
  };

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
            <div className="w-full flex justify-center">{renderStory()}</div>
          </div>
        )}

        {view === "code" && (
          <div className="relative bg-muted/50 p-4 overflow-x-auto">
            <pre className="font-mono text-sm whitespace-pre-wrap">
              <code>{codeString}</code>
            </pre>
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
  const [activeStory, setActiveStory] = useState(stories[0]?.name || "");

  const currentStory = stories.find((s) => s.name === activeStory);

  if (!currentStory) return null;

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

