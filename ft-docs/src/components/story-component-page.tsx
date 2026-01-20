"use client";

import * as React from "react";
import { useState, useEffect, useMemo } from "react";
import { loadStoryModule, formatStoryName, getAvailableStoryComponents } from "@/lib/story-loader";
import { StoryPreview } from "@/components/story-preview";
import { PropsTable } from "@/components/props-table";
import type { LoadedStoryModule, StoryDefinition } from "@/lib/story-loader";
import { cn } from "@/lib/utils";
import { Copy, Check, ChevronDown, ChevronUp, Filter } from "lucide-react";
import { getVariantPriority } from "@/config/variant-display-order";

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
  const [copied, setCopied] = useState(false);
  const [showAllStories, setShowAllStories] = useState(false);
  const [storyFilter, setStoryFilter] = useState<"all" | "args" | "function">("all");

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

  // Filter and sort stories based on type and display order
  const filteredStories = useMemo(() => {
    if (!storyModule) return [];
    
    let stories = storyModule.stories;
    
    if (storyFilter === "args") {
      stories = stories.filter(s => s.args && !s.component && !s.render);
    } else if (storyFilter === "function") {
      stories = stories.filter(s => s.component || s.render);
    }
    
    // Sort stories by variant display order
    stories = [...stories].sort((a, b) => {
      const priorityA = getVariantPriority(componentName, a.name);
      const priorityB = getVariantPriority(componentName, b.name);
      return priorityA - priorityB;
    });
    
    // Show max 5 stories initially, unless showAll is true
    if (!showAllStories && stories.length > 5) {
      return stories.slice(0, 5);
    }
    
    return stories;
  }, [storyModule, storyFilter, showAllStories, componentName]);

  const totalStories = useMemo(() => {
    if (!storyModule) return 0;
    if (storyFilter === "args") {
      return storyModule.stories.filter(s => s.args && !s.component && !s.render).length;
    } else if (storyFilter === "function") {
      return storyModule.stories.filter(s => s.component || s.render).length;
    }
    return storyModule.stories.length;
  }, [storyModule, storyFilter]);

  // Generate import statement
  const importStatement = `import { ${componentName} } from 'ft-design-system';`;

  const onCopy = () => {
    navigator.clipboard.writeText(importStatement);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
        <h1 className="text-5xl font-bold tracking-tight">{componentName}</h1>
        <div className="bg-destructive/10 text-destructive p-6 rounded-lg border border-destructive/20">
          <p className="font-medium">Failed to load component</p>
          <p className="text-sm mt-2">{error}</p>
          <p className="text-sm mt-4 text-muted-foreground">
            This component may not have Storybook stories yet.
          </p>
        </div>
      </div>
    );
  }

  if (!storyModule) {
    return (
      <div className="space-y-6">
        <h1 className="text-5xl font-bold tracking-tight">{componentName}</h1>
        <p className="text-muted-foreground">No documentation available for this component.</p>
      </div>
    );
  }

  // Extract description from story meta parameters
  const description =
    storyModule.meta.parameters?.docs?.description?.component ||
    `${componentName} component`;

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-5xl font-bold tracking-tight">{componentName}</h1>
            <p
              className="text-xl text-zinc-600 dark:text-zinc-400 mt-2"
              style={{ color: "var(--color-secondary)" }}
            >
              {description}
            </p>
          </div>
        </div>
        
        {/* Story count and tags */}
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <span className="text-muted-foreground">
            <strong>{storyModule.stories.length}</strong> stories
          </span>
          {storyModule.meta.tags && storyModule.meta.tags.length > 0 && (
            <div className="flex gap-2">
              {storyModule.meta.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 bg-muted text-muted-foreground rounded text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Installation */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Installation</h2>
        <div className="relative group">
          <div 
            className="rounded-lg p-4 font-mono text-sm pr-12"
            style={{
              backgroundColor: 'var(--primary)',
              color: 'var(--bg-primary)',
            }}
          >
            {importStatement}
          </div>
          <button
            onClick={onCopy}
            className="absolute right-3 top-3 p-2 rounded-md transition-colors opacity-0 group-hover:opacity-100"
            style={{
              backgroundColor: 'var(--bg-primary)',
              color: 'var(--primary)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--secondary)';
              e.currentTarget.style.color = 'var(--bg-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-primary)';
              e.currentTarget.style.color = 'var(--primary)';
            }}
            title="Copy import statement"
          >
            {copied ? (
              <Check className="h-4 w-4" style={{ color: 'var(--positive)' }} />
            ) : (
              <Copy className="h-4 w-4" style={{ color: 'inherit' }} />
            )}
          </button>
        </div>
      </div>

      {/* Examples */}
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold tracking-tight">Examples</h2>
          
          {/* Filter buttons */}
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <div className="flex gap-1">
              {(["all", "args", "function"] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setStoryFilter(filter)}
                  className={cn(
                    "px-3 py-1 text-xs font-medium rounded-md transition-colors",
                    storyFilter === filter
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  )}
                >
                  {filter === "all" ? "All" : filter === "args" ? "Args" : "Interactive"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Stories grid */}
        <div className="space-y-8">
          {filteredStories.map((story) => (
            <div key={story.name} className="space-y-3">
              <h3 className="text-lg font-medium flex items-center gap-2">
                {formatStoryName(story.name)}
                {story.component && (
                  <span className="px-1.5 py-0.5 text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded">
                    interactive
                  </span>
                )}
              </h3>
              <StoryPreview
                story={story}
                meta={storyModule.meta}
                showName={false}
                componentName={componentName}
              />
            </div>
          ))}
        </div>

        {/* Show more/less button */}
        {totalStories > 5 && (
          <button
            onClick={() => setShowAllStories(!showAllStories)}
            className="flex items-center gap-2 mx-auto px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {showAllStories ? (
              <>
                <ChevronUp className="h-4 w-4" />
                Show less
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4" />
                Show {totalStories - 5} more stories
              </>
            )}
          </button>
        )}
      </div>

      {/* Props */}
      {storyModule.meta.argTypes && Object.keys(storyModule.meta.argTypes).length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Props</h2>
          <div className="overflow-hidden rounded-lg border">
            <PropsTable meta={storyModule.meta} />
          </div>
        </div>
      )}
    </div>
  );
}
