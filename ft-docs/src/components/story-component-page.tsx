"use client";

import * as React from "react";
import { useState, useEffect, useMemo } from "react";
import { loadStoryModule, formatStoryName, getAvailableStoryComponents } from "@/lib/story-loader";
import { PropsTable } from "@/components/props-table";
import type { LoadedStoryModule } from "@/lib/story-loader";
import { cn } from "@/lib/utils";
import { Copy, Check } from "lucide-react";
import { ExamplesSection } from "@/components/examples-section";

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
    <div className="flex flex-col space-y-12 w-full">
      {/* Header */}
      <div className="flex flex-col space-y-4 w-full">
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
              backgroundColor: 'var(--color-border-secondary)',
              color: 'var(--color-primary)',
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
      <ExamplesSection
        stories={storyModule.stories}
        meta={storyModule.meta}
        componentName={componentName}
      />

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
