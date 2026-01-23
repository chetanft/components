"use client";

import * as React from "react";
import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import type { StoryDefinition, StoryMeta } from "@/lib/story-loader";
import { formatStoryName } from "@/lib/story-loader";
import { StoryPreview } from "@/components/story-preview";
import { normalizeStories } from "@/lib/variant-grouping";
import { SegmentedTabs, SegmentedTabItem } from "@/registry";
import { VariantExplorer } from "@/components/variant-explorer";

interface ExamplesSectionProps {
  stories: StoryDefinition[];
  meta: StoryMeta;
  componentName: string;
}

/**
 * Examples Section Component
 * 
 * Manages filter state (All/Args/Interactive), view state (List/Explorer),
 * and renders the appropriate view based on user selection.
 */
export function ExamplesSection({
  stories,
  meta,
  componentName,
}: ExamplesSectionProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Initialize view from URL or localStorage
  const getInitialView = (): "list" | "explorer" => {
    const urlView = searchParams.get("view");
    if (urlView === "explorer") return "explorer";
    if (urlView === "list") return "list";
    
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("ftds_docs_examples_view");
      if (stored === "explorer" || stored === "list") {
        return stored;
      }
    }
    return "list"; // Default
  };

  const [storyFilter, setStoryFilter] = useState<"all" | "args" | "function">("all");
  const [view, setView] = useState<"list" | "explorer">(getInitialView);
  const [showAllStories, setShowAllStories] = useState(false);

  // Sync view with URL and localStorage
  useEffect(() => {
    const urlView = searchParams.get("view");
    if (urlView === "explorer" || urlView === "list") {
      setView(urlView);
    }
  }, [searchParams]);

  // Update URL when view changes
  const handleViewChange = (newView: "list" | "explorer") => {
    setView(newView);
    
    // Update localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("ftds_docs_examples_view", newView);
    }

    // Update URL
    const params = new URLSearchParams(searchParams.toString());
    if (newView === "explorer") {
      params.set("view", "explorer");
    } else {
      params.delete("view");
    }
    
    const newUrl = params.toString() 
      ? `${pathname}?${params.toString()}`
      : pathname;
    router.replace(newUrl, { scroll: false });
  };

  // Filter stories based on type
  const filteredStories = useMemo(() => {
    let filtered = stories;

    if (storyFilter === "args") {
      filtered = filtered.filter((s) => s.args && !s.component && !s.render);
    } else if (storyFilter === "function") {
      filtered = filtered.filter((s) => s.component || s.render);
    }

    return filtered;
  }, [stories, storyFilter]);

  // Normalize and deduplicate stories
  const normalizedStories = useMemo(() => {
    return normalizeStories(filteredStories, componentName);
  }, [filteredStories, componentName]);

  // For List view: limit to 5 initially unless showAllStories is true
  const listViewStories = useMemo(() => {
    if (!showAllStories && normalizedStories.length > 5) {
      return normalizedStories.slice(0, 5);
    }
    return normalizedStories;
  }, [normalizedStories, showAllStories]);

  const totalStories = normalizedStories.length;

  return (
    <div className="space-y-6 w-full flex flex-col">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold tracking-tight">Examples</h2>

        <div className="flex items-center gap-4">
          {/* Filter buttons */}
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {(["all", "args", "function"] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setStoryFilter(filter)}
                  className={cn(
                    "px-3 py-1 text-xs font-medium rounded-md transition-colors",
                    storyFilter === filter
                      ? "bg-[var(--primary)] text-[var(--bg-primary)]"
                      : "bg-[var(--bg-secondary)] text-[var(--secondary)] hover:bg-[var(--color-divider)]"
                  )}
                >
                  {filter === "all" ? "All" : filter === "args" ? "Args" : "Interactive"}
                </button>
              ))}
            </div>
          </div>

          {/* View toggle */}
          <SegmentedTabs
            value={view}
            onChange={(value) => handleViewChange(value as "list" | "explorer")}
            variant="default"
          >
            <SegmentedTabItem value="list" label="List" />
            <SegmentedTabItem value="explorer" label="Explorer" />
          </SegmentedTabs>
        </div>
      </div>

      {/* Render appropriate view */}
      {view === "list" ? (
        <>
          {/* Stories grid */}
          <div className="space-y-8">
            {listViewStories.map((normStory) => {
              const story = normStory.story;
              return (
                <div key={normStory.id} className="space-y-3">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    {formatStoryName(story.name)}
                    {story.component && (
                      <span
                        className="px-1.5 py-0.5 text-xs rounded"
                        style={{
                          backgroundColor: "var(--info-light)",
                          color: "var(--info-dark)",
                        }}
                      >
                        interactive
                      </span>
                    )}
                  </h3>
                  <StoryPreview
                    story={story}
                    meta={meta}
                    showName={false}
                    componentName={componentName}
                  />
                </div>
              );
            })}
          </div>

          {/* Show more/less button */}
          {totalStories > 5 && (
            <button
              onClick={() => setShowAllStories(!showAllStories)}
              className="flex items-center gap-2 mx-auto px-4 py-2 text-sm font-medium transition-colors"
              style={{
                color: "var(--secondary)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--primary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--secondary)";
              }}
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
        </>
      ) : (
        <VariantExplorer
          normalizedStories={normalizedStories}
          meta={meta}
          componentName={componentName}
          filter={storyFilter}
        />
      )}
    </div>
  );
}
