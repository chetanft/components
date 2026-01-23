"use client";

import * as React from "react";
import { useState, useEffect, useMemo, useRef } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { StoryDefinition, StoryMeta } from "@/lib/story-loader";
import { formatStoryName } from "@/lib/story-loader";
import { StoryPreview } from "@/components/story-preview";
import { groupStories, type NormalizedStory } from "@/lib/variant-grouping";
import { Collapsible, CollapsibleTrigger, CollapsibleContent, CollapsibleHeader, CollapsibleTitle, CollapsibleIcon } from "@/registry";
import { Input } from "@/registry";
import { Search } from "lucide-react";

interface VariantExplorerProps {
  normalizedStories: NormalizedStory[]; // Already filtered + deduplicated + normalized
  meta: StoryMeta;
  componentName: string;
  filter: "all" | "args" | "function"; // For display context
}

/**
 * Variant Explorer Component
 * 
 * Two-pane layout:
 * - Left: Grouped variant navigator with search
 * - Right: Selected variant preview with Preview/Code tabs
 */
export function VariantExplorer({
  normalizedStories: propsNormalizedStories,
  meta,
  componentName,
  filter,
}: VariantExplorerProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Use normalized stories from props (already normalized in ExamplesSection)
  const normalizedStories = propsNormalizedStories;

  // Group stories by category
  const groupedStories = useMemo(() => {
    return groupStories(normalizedStories);
  }, [normalizedStories]);

  // Initialize selected story from URL or localStorage
  const getInitialStoryId = (): string | null => {
    const urlStory = searchParams.get("story");
    if (urlStory) return urlStory;

    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("ftds_docs_examples_story");
      if (stored) return stored;
    }

    // Default to first story
    return normalizedStories[0]?.id || null;
  };

  const [selectedStoryId, setSelectedStoryId] = useState<string | null>(getInitialStoryId);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(Object.keys(groupedStories)));
  const [previewTab, setPreviewTab] = useState<"preview" | "code">(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("ftds_docs_examples_tab");
      if (stored === "preview" || stored === "code") {
        return stored;
      }
    }
    return "preview";
  });

  // Sync selected story with URL
  useEffect(() => {
    const urlStory = searchParams.get("story");
    if (urlStory && urlStory !== selectedStoryId) {
      setSelectedStoryId(urlStory);
    }
  }, [searchParams, selectedStoryId]);

  // Update URL when story changes
  const handleStorySelect = (storyId: string) => {
    setSelectedStoryId(storyId);

    // Update localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("ftds_docs_examples_story", storyId);
    }

    // Update URL
    const params = new URLSearchParams(searchParams.toString());
    params.set("story", storyId);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // Handle tab change
  const handleTabChange = (tab: "preview" | "code") => {
    setPreviewTab(tab);
    if (typeof window !== "undefined") {
      localStorage.setItem("ftds_docs_examples_tab", tab);
    }
  };

  // Toggle group expansion
  const toggleGroup = (groupKey: string) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(groupKey)) {
        next.delete(groupKey);
      } else {
        next.add(groupKey);
      }
      return next;
    });
  };

  // Filter stories by search query
  const filteredGroupedStories = useMemo(() => {
    if (!searchQuery.trim()) {
      return groupedStories;
    }

    const query = searchQuery.toLowerCase();
    const filtered: typeof groupedStories = {};

    for (const [groupKey, group] of Object.entries(groupedStories)) {
      const matchingItems = group.items.filter((item) => {
        const name = formatStoryName(item.name).toLowerCase();
        return name.includes(query);
      });

      if (matchingItems.length > 0) {
        filtered[groupKey] = {
          ...group,
          items: matchingItems,
        };
      }
    }

    return filtered;
  }, [groupedStories, searchQuery]);

  // Find selected story
  const selectedStory = useMemo(() => {
    if (!selectedStoryId) return null;
    return normalizedStories.find((n) => n.id === selectedStoryId)?.story || null;
  }, [normalizedStories, selectedStoryId]);

  // Keyboard navigation refs
  const listRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  // Keyboard navigation handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!listRef.current?.contains(document.activeElement)) return;

      const allItems = Array.from(itemRefs.current.values());
      const currentIndex = allItems.findIndex((el) => el === document.activeElement);

      if (e.key === "ArrowDown") {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % allItems.length;
        allItems[nextIndex]?.focus();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const prevIndex = currentIndex === 0 ? allItems.length - 1 : currentIndex - 1;
        allItems[prevIndex]?.focus();
      } else if (e.key === "Enter" && document.activeElement instanceof HTMLButtonElement) {
        e.preventDefault();
        const storyId = document.activeElement.dataset.storyId;
        if (storyId) {
          handleStorySelect(storyId);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div
      className="grid gap-6"
      style={{
        gridTemplateColumns: "320px 1fr",
        minHeight: "600px",
      }}
    >
      {/* Left Pane: Variant Navigator */}
      <div
        className="border-r overflow-y-auto"
        style={{
          borderColor: "var(--border-primary)",
          paddingRight: "var(--spacing-x4)",
        }}
        ref={listRef}
      >
        {/* Search Input */}
        <div className="mb-4 flex flex-col w-full">
          <Input
            type="text"
            placeholder="Search variants..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leadingIcon={<Search className="h-4 w-4" style={{ color: "var(--secondary)" }} />}
            aria-label="Search variants"
          />
        </div>

        {/* Grouped Variant List */}
        <div className="space-y-2" role="listbox" aria-label="Variant list">
          {Object.entries(filteredGroupedStories).map(([groupKey, group]) => {
            const isExpanded = expandedGroups.has(groupKey);

            return (
              <Collapsible
                key={groupKey}
                isExpanded={isExpanded}
                onToggle={() => toggleGroup(groupKey)}
                type="Secondary"
                bg="Primary"
              >
                <CollapsibleTrigger>
                  <CollapsibleHeader>
                    <CollapsibleTitle className="flex flex-1 text-sm font-medium" style={{ color: "var(--primary)" }}>
                      {group.label}
                    </CollapsibleTitle>
                    <CollapsibleIcon />
                  </CollapsibleHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="pl-0 space-y-1 mt-1">
                    {group.items.map((item) => {
                      const isSelected = item.id === selectedStoryId;
                      return (
                        <button
                          key={item.id}
                          data-story-id={item.id}
                          ref={(el) => {
                            if (el) {
                              itemRefs.current.set(item.id, el);
                            } else {
                              itemRefs.current.delete(item.id);
                            }
                          }}
                          onClick={() => handleStorySelect(item.id)}
                          className={cn(
                            "w-full text-left px-3 py-2 text-sm rounded-md transition-colors",
                            isSelected
                              ? "bg-[var(--primary)] text-[var(--bg-primary)]"
                              : "text-[var(--secondary)] hover:bg-[var(--bg-secondary)]"
                          )}
                          role="option"
                          aria-selected={isSelected}
                          tabIndex={isSelected ? 0 : -1}
                        >
                          {formatStoryName(item.story.name)}
                        </button>
                      );
                    })}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            );
          })}
        </div>
      </div>

      {/* Right Pane: Variant Preview */}
      <div className="min-w-0">
        {selectedStory ? (
          <div className="space-y-4 flex flex-col h-full">
            <div>
              <h3 className="text-lg font-medium">
                {formatStoryName(selectedStory.name)}
              </h3>
            </div>
            <StoryPreview
              story={selectedStory}
              meta={meta}
              showName={false}
              componentName={componentName}
              defaultView={previewTab}
              onViewChange={handleTabChange}
            />
          </div>
        ) : (
          <div
            className="flex items-center justify-center h-full text-sm"
            style={{ color: "var(--secondary)" }}
          >
            Select a variant to preview
          </div>
        )}
      </div>
    </div>
  );
}
