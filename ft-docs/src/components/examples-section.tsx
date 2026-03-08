"use client";

import * as React from "react";
import { useState, useMemo, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import type { StoryDefinition, StoryMeta } from "@/lib/story-loader";
import { formatStoryName } from "@/lib/story-loader";
import { StoryPreview } from "@/components/story-preview";
import { normalizeStories } from "@/lib/variant-grouping";
import { VariantExplorerV2 } from "@/components/variant-explorer-v2";
import { docsConfig } from "@/config/docs";
import { ComponentUsageOverlay } from "@/components/component-usage-overlay";
import { Button } from "@/registry";

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
/** Flatten all component items from sidebar nav into an ordered list */
const allComponentItems = docsConfig.sidebarNav
  .flatMap((section) => section.items)
  .filter((item) => item.href.startsWith("/docs/components/"));

export function ExamplesSection({
  stories,
  meta,
  componentName,
}: ExamplesSectionProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [explorerOpen, setExplorerOpen] = useState(() => searchParams.get("explorer") === "true");
  const [explorerVisible, setExplorerVisible] = useState(false);
  const [usageOpen, setUsageOpen] = useState(false);
  const [usageVisible, setUsageVisible] = useState(false);

  // Explorer animation: mount → slide up, close → slide down → unmount
  useEffect(() => {
    if (explorerOpen) {
      // Trigger slide-up on next frame after mount
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setExplorerVisible(true));
      });
    }
  }, [explorerOpen]);

  const closeExplorer = useCallback(() => {
    setExplorerVisible(false);
    setTimeout(() => setExplorerOpen(false), 300);
  }, []);

  // Usage animation
  useEffect(() => {
    if (usageOpen) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setUsageVisible(true));
      });
    }
  }, [usageOpen]);

  const closeUsage = useCallback(() => {
    setUsageVisible(false);
    setTimeout(() => setUsageOpen(false), 300);
  }, []);
  const [showAllStories, setShowAllStories] = useState(false);
  const filteredStories = stories;

  // Prev/next component navigation for explorer
  const currentIndex = allComponentItems.findIndex((item) => {
    const slug = item.href.replace("/docs/components/", "");
    const name = slug
      .split("-")
      .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
      .join("");
    return name === componentName;
  });
  const prevComponent = currentIndex > 0 ? allComponentItems[currentIndex - 1] : null;
  const nextComponent = currentIndex < allComponentItems.length - 1 ? allComponentItems[currentIndex + 1] : null;

  function navigateExplorer(href: string) {
    router.push(href + "?explorer=true");
  }

  // Normalize and deduplicate stories, then split into canonical vs docs-only
  const normalizedStories = useMemo(() => {
    return normalizeStories(filteredStories, componentName);
  }, [filteredStories, componentName]);

  // Split into canonical (variant) stories vs docs-only (examples/demos)
  const { canonicalStories, docsStories } = useMemo(() => {
    const canonical: typeof normalizedStories = [];
    const docs: typeof normalizedStories = [];
    for (const s of normalizedStories) {
      const name = s.story.name;
      // Filter out ExplorerBase entirely — it's an internal explorer entrypoint
      if (name === "ExplorerBase") continue;
      // Docs-prefixed stories go to examples section
      if (/^Docs[A-Z]/.test(name)) {
        docs.push(s);
      } else {
        canonical.push(s);
      }
    }
    return { canonicalStories: canonical, docsStories: docs };
  }, [normalizedStories]);

  // For List view: limit canonical to 5 initially unless expanded
  const listViewCanonical = useMemo(() => {
    if (!showAllStories && canonicalStories.length > 5) {
      return canonicalStories.slice(0, 5);
    }
    return canonicalStories;
  }, [canonicalStories, showAllStories]);

  const totalCanonical = canonicalStories.length;
  const totalStories = canonicalStories.length + docsStories.length;

  return (
    <div className="space-y-8 w-full flex flex-col">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-section font-semibold">Examples</h2>

        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" icon="document" onClick={() => setUsageOpen(true)}>
            Usage
          </Button>
          <Button variant="secondary" size="sm" onClick={() => setExplorerOpen(true)}>
            Explorer
          </Button>
        </div>
      </div>

      {/* Canonical variant stories */}
      <div className="space-y-10">
        {listViewCanonical.map((normStory) => {
          const story = normStory.story;
          return (
            <div key={normStory.id} className="space-y-3">
              <h3 className="text-subsection font-semibold flex items-center gap-2">
                {formatStoryName(story.name)}
                {story.component && (
                  <span
                    className="px-1.5 py-0.5 text-xs-rem rounded"
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

      {/* Show more/less button for canonical stories */}
      {totalCanonical > 5 && (
        <div className="flex justify-center">
          <Button
            variant="text"
            size="sm"
            icon={showAllStories ? "chevron-up" : "chevron-down"}
            iconPosition="leading"
            onClick={() => setShowAllStories(!showAllStories)}
          >
            {showAllStories ? "Show less" : `Show ${totalCanonical - 5} more variants`}
          </Button>
        </div>
      )}

      {/* Docs-only examples section */}
      {docsStories.length > 0 && (
        <div className="space-y-6 pt-4 border-t border-[var(--border-primary)]">
          <h2 className="text-section font-semibold text-[var(--secondary)]">
            Usage Examples
            <span
              className="ml-2 px-1.5 py-0.5 text-xs-rem rounded font-normal"
              style={{
                backgroundColor: "var(--bg-secondary)",
                color: "var(--tertiary)",
              }}
            >
              {docsStories.length}
            </span>
          </h2>
          <div className="space-y-8">
            {docsStories.map((normStory) => {
              const story = normStory.story;
              // Strip "Docs" prefix for display
              const displayName = story.name.replace(/^Docs/, "");
              return (
                <div key={normStory.id} className="space-y-3">
                  <h3 className="text-subsection font-semibold flex items-center gap-2">
                    {formatStoryName(displayName)}
                    <span
                      className="px-1.5 py-0.5 text-xs-rem rounded"
                      style={{
                        backgroundColor: "var(--bg-secondary)",
                        color: "var(--tertiary)",
                      }}
                    >
                      example
                    </span>
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
        </div>
      )}

      {usageOpen && (
        <ComponentUsageOverlay
          componentName={componentName}
          meta={meta}
          stories={filteredStories}
          onClose={closeUsage}
          visible={usageVisible}
        />
      )}

      {explorerOpen && (
        <div className={cn(
          "fixed inset-0 z-[70] bg-[var(--bg-primary)] flex flex-col overflow-hidden transition-transform duration-300 ease-out",
          explorerVisible ? "translate-y-0" : "translate-y-full"
        )}>
          {/* Explorer header — fixed height */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-primary)] shrink-0">
            <div className="flex items-center gap-3">
              <Button
                variant="secondary"
                size="sm"
                icon="arrow-left"
                iconPosition="only"
                onClick={() => {
                  closeExplorer();
                  // Clean explorer param from URL
                  const url = new URL(window.location.href);
                  url.searchParams.delete("explorer");
                  router.replace(url.pathname + url.search, { scroll: false });
                }}
                aria-label="Back to list view"
              />
              <h2 className="text-section font-semibold text-[var(--primary)]">{componentName}</h2>
            </div>

            {/* Prev / Next navigation */}
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                icon="chevron-left"
                iconPosition={prevComponent?.title ? "leading" : "only"}
                onClick={() => prevComponent && navigateExplorer(prevComponent.href)}
                disabled={!prevComponent}
                aria-label="Previous component"
              >
                {prevComponent && <span className="hidden sm:inline">{prevComponent.title}</span>}
              </Button>
              <Button
                variant="secondary"
                size="sm"
                icon="chevron-right"
                iconPosition={nextComponent?.title ? "trailing" : "only"}
                onClick={() => nextComponent && navigateExplorer(nextComponent.href)}
                disabled={!nextComponent}
                aria-label="Next component"
              >
                {nextComponent && <span className="hidden sm:inline">{nextComponent.title}</span>}
              </Button>
            </div>
          </div>

          {/* Explorer body — fills remaining viewport, scrolls internally */}
          <div className="flex-1 overflow-auto px-4 py-6 min-h-0">
            <VariantExplorerV2
              stories={filteredStories}
              meta={meta}
              componentName={componentName}
            />
          </div>
        </div>
      )}
    </div>
  );
}
