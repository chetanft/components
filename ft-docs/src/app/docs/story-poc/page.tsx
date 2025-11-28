"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { loadStoryModule, getAvailableStoryComponents, formatStoryName } from "@/lib/story-loader";
import { StoryPreviewGrid, StoryTabs } from "@/components/story-preview";
import type { LoadedStoryModule } from "@/lib/story-loader";

/**
 * Story POC Page
 * 
 * This page demonstrates loading and rendering Storybook stories
 * directly without any parsing or conversion.
 */
export default function StoryPocPage() {
  const [selectedComponent, setSelectedComponent] = useState("Button");
  const [storyModule, setStoryModule] = useState<LoadedStoryModule | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "tabs">("grid");

  const availableComponents = getAvailableStoryComponents();

  // Load story module when component changes
  useEffect(() => {
    async function loadStory() {
      setLoading(true);
      setError(null);
      
      try {
        const loadedModule = await loadStoryModule(selectedComponent);
        if (loadedModule) {
            setStoryModule(loadedModule);
        } else {
            setError(`No stories found for ${selectedComponent}`);
        }
      } catch (err) {
        setError(`Failed to load stories: ${err}`);
      } finally {
        setLoading(false);
      }
    }

    loadStory();
  }, [selectedComponent]);

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">📚 Story POC - Direct Rendering</h1>
        <p className="text-muted-foreground">
          This page loads Storybook stories directly as ES modules and renders them
          without any parsing or conversion. Zero regex, zero transformation errors.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 mb-8 p-4 bg-muted/30 rounded-lg border">
        {/* Component selector */}
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium mb-2">Select Component</label>
          <select
            value={selectedComponent}
            onChange={(e) => setSelectedComponent(e.target.value)}
            className="w-full px-3 py-2 border rounded-md bg-background"
          >
            {availableComponents.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        {/* View mode */}
        <div>
          <label className="block text-sm font-medium mb-2">View Mode</label>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === "grid"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80"
              }`}
            >
              Grid View
            </button>
            <button
              onClick={() => setViewMode("tabs")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === "tabs"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80"
              }`}
            >
              Tab View
            </button>
          </div>
        </div>
      </div>

      {/* Story meta info */}
      {storyModule && (
        <div className="mb-6 p-4 bg-background border rounded-lg">
          <h2 className="text-xl font-semibold mb-2">{storyModule.meta.title}</h2>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span>
              <strong>Stories:</strong> {storyModule.stories.length}
            </span>
            {storyModule.meta.tags && (
              <span>
                <strong>Tags:</strong> {storyModule.meta.tags.join(", ")}
              </span>
            )}
          </div>
          {/* Story list */}
          <div className="mt-3 flex flex-wrap gap-2">
            {storyModule.stories.map((story) => (
              <span
                key={story.name}
                className="px-2 py-1 text-xs bg-muted rounded-md"
              >
                {formatStoryName(story.name)}
                {story.component && " (fn)"}
                {story.render && " (render)"}
                {story.args && !story.render && " (args)"}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-muted-foreground">Loading stories...</p>
          </div>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="bg-destructive/10 text-destructive p-4 rounded-lg">
          <p className="font-medium">Error</p>
          <p>{error}</p>
        </div>
      )}

      {/* Stories */}
      {!loading && !error && storyModule && (
        <div>
          {viewMode === "grid" ? (
            <StoryPreviewGrid stories={storyModule.stories} meta={storyModule.meta} />
          ) : (
            <StoryTabs stories={storyModule.stories} meta={storyModule.meta} />
          )}
        </div>
      )}

      {/* Benefits callout */}
      <div className="mt-12 p-6 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border border-primary/20">
        <h3 className="text-lg font-semibold mb-3">✅ What This POC Proves</h3>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">✓</span>
            <span>Stories load as native ES modules - no regex parsing needed</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">✓</span>
            <span>Function stories (`Sizes`, `InteractiveDemo`) work with hooks</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">✓</span>
            <span>Args-based stories render with their component + args</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">✓</span>
            <span>Render function stories work correctly</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">✓</span>
            <span>No TypeScript transpilation errors</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">✓</span>
            <span>Story metadata (title, tags, argTypes) available</span>
          </li>
        </ul>
      </div>

      {/* Next steps */}
      <div className="mt-6 p-6 bg-muted/30 rounded-lg border">
        <h3 className="text-lg font-semibold mb-3">🚀 Next Steps</h3>
        <ol className="space-y-2 text-sm list-decimal list-inside">
          <li>Add raw source code display using `?raw` imports</li>
          <li>Create props table from `meta.argTypes`</li>
          <li>Replace current `/docs/[component]` pages with this approach</li>
          <li>Remove the 1500+ lines of parsing code in `component-metadata.ts`</li>
          <li>Add search/filter for stories</li>
        </ol>
      </div>
    </div>
  );
}
