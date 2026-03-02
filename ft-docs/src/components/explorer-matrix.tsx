"use client"

import { useState, useMemo, useEffect } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import type { StoryMeta, StoryDefinition } from "@/lib/story-loader"
import { formatStoryName } from "@/lib/story-loader"
import type { ExplorerConfig, ExplorerScenario } from "@/types/explorer"
import { StoryPreview } from "@/components/story-preview"
import { cn } from "@/lib/utils"
import {
  CenterDialogPreview,
  RightPanelPreview,
  TopOverlayPreview,
} from "@/components/explorer-preview-wrappers"
import { GlassPreviewBackdrop } from "@/components/glass-preview-backdrop"

type GlassChipValue = false | true | "subtle" | "prominent"

const GLASS_CHIPS: { label: string; value: GlassChipValue }[] = [
  { label: "Normal", value: false },
  { label: "Subtle", value: "subtle" },
  { label: "Glass", value: true },
  { label: "Prominent", value: "prominent" },
]

interface ExplorerMatrixProps {
  meta: StoryMeta
  stories: StoryDefinition[]
  componentName: string
  config: ExplorerConfig
}

export function ExplorerMatrix({
  meta,
  stories,
  componentName,
  config,
}: ExplorerMatrixProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const rows = useMemo(() => {
    if (config.rows && config.rows.length > 0) {
      return config.rows;
    }

    return [
      {
        id: "all-variants",
        label: "All Variants",
        scenarios: stories.map((story): ExplorerScenario => ({
          id: story.name,
          label: formatStoryName(story.name),
          story: story.name,
        })),
      },
    ];
  }, [config.rows, stories]);

  const initialSelectedByRow = useMemo(() => {
    const selections: Record<string, string> = {};
    rows.forEach((row, rowIndex) => {
      const paramKey = `sel_${row.id}`;
      const fromUrl = searchParams.get(paramKey);
      if (fromUrl) {
        selections[row.id] = fromUrl;
        return;
      }
      if (rowIndex === 0 && config.defaultScenarioId) {
        selections[row.id] = config.defaultScenarioId;
        return;
      }
      selections[row.id] = row.scenarios?.[0]?.id ?? "";
    });
    return selections;
  }, [rows, searchParams, config.defaultScenarioId]);

  const [selectedByRow, setSelectedByRow] = useState<Record<string, string>>(initialSelectedByRow);
  const [glassMode, setGlassMode] = useState<GlassChipValue>(false);

  const selectedScenarios = useMemo(() => {
    return rows.map((row) => {
      const selectedId = selectedByRow[row.id];
      const scenario = row.scenarios?.find((s) => s.id === selectedId) ?? row.scenarios?.[0];
      return { row, scenario };
    });
  }, [rows, selectedByRow]);

  const baseStory = useMemo(() => {
    if (config.baseStory) {
      return stories.find((s) => s.name === config.baseStory);
    }
    const firstScenarioStory = selectedScenarios.find((entry) => entry.scenario?.story)?.scenario?.story;
    if (firstScenarioStory) {
      return stories.find((s) => s.name === firstScenarioStory);
    }
    return stories[0];
  }, [config.baseStory, selectedScenarios, stories]);

  const overrideArgs = useMemo(() => {
    const merged: Record<string, unknown> = {};
    selectedScenarios.forEach((entry) => {
      if (entry.scenario?.story) {
        const selectedStory = stories.find((s) => s.name === entry.scenario?.story);
        if (selectedStory?.args) {
          Object.assign(merged, selectedStory.args);
        }
      }
      if (entry.scenario?.args) {
        Object.assign(merged, entry.scenario.args);
      }
    });
    if (glassMode !== false) {
      merged.glass = glassMode;
    }
    return merged;
  }, [selectedScenarios, glassMode]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("mode", "matrix")
    rows.forEach((row) => {
      const selected = selectedByRow[row.id];
      if (selected) {
        params.set(`sel_${row.id}`, selected);
      }
    });
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }, [selectedByRow, rows, pathname, router, searchParams])

  function handleScenarioClick(rowId: string, scenarioId: string) {
    setSelectedByRow((prev) => ({ ...prev, [rowId]: scenarioId }));
  }

  if (!rows.length) {
    return (
      <div className="flex items-center justify-center py-12 text-sm-rem text-[var(--secondary)]">
        No matrix rows configured.
      </div>
    )
  }

  const previewContent = baseStory ? (
    <StoryPreview story={baseStory} meta={meta} chromeless overrideArgs={overrideArgs} />
  ) : (
    <div className="flex items-center justify-center h-full text-sm-rem text-[var(--secondary)]">
      Select a scenario to preview
    </div>
  )

  const floatingPlacement = config.positionedPreview?.placement ?? "top-right"
  const floatingWidth = config.positionedPreview?.width ?? 420
  const resolvedBehavior =
    config.behavior ??
    (config.previewMode === "positioned" ? "top-overlay" : "inline")

  const overlayPreview = (() => {
    switch (resolvedBehavior) {
      case "top-overlay":
        return (
          <TopOverlayPreview width={floatingWidth} placement={floatingPlacement}>
            {previewContent}
          </TopOverlayPreview>
        )
      case "right-overlay":
        return <RightPanelPreview width={floatingWidth}>{previewContent}</RightPanelPreview>
      case "center-overlay":
        return <CenterDialogPreview width={floatingWidth}>{previewContent}</CenterDialogPreview>
      default:
        return null
    }
  })()

  return (
    <div className="relative" style={{ minHeight: "calc(100vh - 120px)" }}>
      <div className="w-full max-w-[360px] space-y-8">
        {rows.map((row) => (
          <div key={row.id}>
            <h3 className="block w-full text-left text-lg-rem font-semibold pb-3 text-[var(--primary)]">
              {row.label ?? formatStoryName(row.id)}
            </h3>
            <div className="flex flex-wrap gap-2">
              {row.scenarios?.map((scenario) => {
                const isActive = selectedByRow[row.id] === scenario.id;
                return (
                  <button
                    key={scenario.id}
                    onClick={() => {
                      handleScenarioClick(row.id, scenario.id)
                    }}
                    className={cn(
                      "px-4 py-2 text-sm-rem rounded-md border transition-colors",
                      isActive
                        ? "bg-[var(--bg-secondary)] text-[var(--primary)] border-[var(--border-primary)]"
                        : "bg-[var(--bg-primary)] text-[var(--secondary)] border-[var(--border-primary)] hover:bg-[var(--bg-secondary)]"
                    )}
                  >
                    {scenario.label ?? formatStoryName(scenario.id)}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
        {config.supportsGlass && (
          <div>
            <h3 className="block w-full text-left text-lg-rem font-semibold pb-3 text-[var(--primary)]">
              Surface
            </h3>
            <div className="flex flex-wrap gap-2">
              {GLASS_CHIPS.map((chip) => {
                const isActive = glassMode === chip.value;
                return (
                  <button
                    key={chip.label}
                    onClick={() => setGlassMode(chip.value)}
                    className={cn(
                      "px-4 py-2 text-sm-rem rounded-md border transition-colors",
                      isActive
                        ? "bg-[var(--bg-secondary)] text-[var(--primary)] border-[var(--border-primary)]"
                        : "bg-[var(--bg-primary)] text-[var(--secondary)] border-[var(--border-primary)] hover:bg-[var(--bg-secondary)]"
                    )}
                  >
                    {chip.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Preview section — unified container for backdrop + component */}
      {resolvedBehavior === "top-overlay" || resolvedBehavior === "right-overlay" || resolvedBehavior === "center-overlay" ? (
        overlayPreview
      ) : (
        <div
          className="absolute right-0 bottom-0 overflow-hidden rounded-xl"
          style={{ left: "392px", top: "0px" }}
        >
          {/* Glass backdrop */}
          {config.supportsGlass && glassMode !== false && (
            <div className="absolute inset-0 pointer-events-none">
              <GlassPreviewBackdrop active />
            </div>
          )}
          {/* Component centered in this container */}
          {resolvedBehavior === "layout" ? (
            <div className="relative h-full w-full px-6 py-6" style={{ zIndex: 1 }}>
              <div className="mx-auto flex h-full w-full max-w-[1100px] items-start justify-center">
                {previewContent}
              </div>
            </div>
          ) : resolvedBehavior === "chart" ? (
            <div className="relative flex h-full w-full items-center justify-center px-6 py-6" style={{ zIndex: 1 }}>
              <div className="flex w-full max-w-[1200px] items-center justify-center rounded-lg border border-[var(--border-primary)] bg-[var(--bg-primary)] p-4">
                {previewContent}
              </div>
            </div>
          ) : (
            <div className="relative flex h-full w-full items-center justify-center" style={{ zIndex: 1 }}>
              {previewContent}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
