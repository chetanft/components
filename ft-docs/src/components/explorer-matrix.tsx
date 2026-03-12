"use client"

import { useState, useMemo, useEffect } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import type { StoryMeta, StoryDefinition } from "@/lib/story-loader"
import { formatStoryName } from "@/lib/story-loader"
import type { ExplorerConfig, ExplorerScenario } from "@/types/explorer"
import type { ExplorerInspectorMode } from "@/types/explorer"
import { StoryPreview } from "@/components/story-preview"
import { cn } from "@/lib/utils"
import { ExplorerInspector } from "@/components/explorer-inspector"
import {
  CenterDialogPreview,
  RightPanelPreview,
  TopOverlayPreview,
} from "@/components/explorer-preview-wrappers"
import { GlassPreviewBackdrop } from "@/components/glass-preview-backdrop"
import { Chip, ChipGroup } from "@/registry"

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
  const initialInspector = (searchParams.get("inspector") as ExplorerInspectorMode | null)
    ?? config.inspector?.defaultMode
    ?? "off";
  const [inspectorMode, setInspectorMode] = useState<ExplorerInspectorMode>(initialInspector);
  const initialScale = Number.parseFloat(searchParams.get("inspectorScale") || "1")
  const [inspectorScale, setInspectorScale] = useState<number>(
    Number.isFinite(initialScale) && initialScale > 0 ? initialScale : 1
  )
  const [inspectorHighContrast, setInspectorHighContrast] = useState<boolean>(
    searchParams.get("inspectorContrast") === "high"
  )

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
    // First pass: collect story-level defaults
    selectedScenarios.forEach((entry) => {
      if (entry.scenario?.story) {
        const selectedStory = stories.find((s) => s.name === entry.scenario?.story);
        if (selectedStory?.args) {
          Object.assign(merged, selectedStory.args);
        }
      }
    });
    // Second pass: apply scenario-specific args (these take priority over story defaults)
    selectedScenarios.forEach((entry) => {
      if (entry.scenario?.args) {
        Object.assign(merged, entry.scenario.args);
      }
    });
    if (glassMode !== false) {
      merged.glass = glassMode;
    }
    return merged;
  }, [selectedScenarios, stories, glassMode]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("mode", "matrix")
    rows.forEach((row) => {
      const selected = selectedByRow[row.id];
      if (selected) {
        params.set(`sel_${row.id}`, selected);
      }
    });
    if (inspectorMode && inspectorMode !== "off") {
      params.set("inspector", inspectorMode);
    } else {
      params.delete("inspector");
    }
    if (Math.abs(inspectorScale - 1) > 0.001) {
      params.set("inspectorScale", String(inspectorScale))
    } else {
      params.delete("inspectorScale")
    }
    if (inspectorHighContrast) {
      params.set("inspectorContrast", "high")
    } else {
      params.delete("inspectorContrast")
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }, [selectedByRow, rows, inspectorMode, inspectorScale, inspectorHighContrast, pathname, router, searchParams])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) return

      if (event.key === "0") setInspectorMode("off")
      if (event.key === "1") setInspectorMode("box-model")
      if (event.key === "2") setInspectorMode("token-spacing")
      if (event.key === "3") setInspectorMode("both")
      if (event.key === "=" || event.key === "+") setInspectorScale((prev) => Math.min(1.5, +(prev + 0.25).toFixed(2)))
      if (event.key === "-") setInspectorScale((prev) => Math.max(0.75, +(prev - 0.25).toFixed(2)))
      if (event.key.toLowerCase() === "c") setInspectorHighContrast((prev) => !prev)
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

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
    <ExplorerInspector
      mode={inspectorMode}
      config={config.inspector}
      scale={inspectorScale}
      highContrast={inspectorHighContrast}
    >
      <StoryPreview story={baseStory} meta={meta} chromeless overrideArgs={overrideArgs} />
    </ExplorerInspector>
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
            <ChipGroup value={selectedByRow[row.id]} onChange={(v) => handleScenarioClick(row.id, v)}>
              {row.scenarios?.map((scenario) => (
                <Chip
                  key={scenario.id}
                  value={scenario.id}
                  label={scenario.label ?? formatStoryName(scenario.id)}
                />
              ))}
            </ChipGroup>
          </div>
        ))}
        {config.supportsGlass && (
          <div>
            <h3 className="block w-full text-left text-lg-rem font-semibold pb-3 text-[var(--primary)]">
              Surface
            </h3>
            <ChipGroup value={String(glassMode)} onChange={(v) => setGlassMode(v === "false" ? false : v === "true" ? true : v as "subtle" | "prominent")}>
              {GLASS_CHIPS.map((chip) => (
                <Chip key={chip.label} value={String(chip.value)} label={chip.label} />
              ))}
            </ChipGroup>
          </div>
        )}
        <div>
          <h3 className="block w-full text-left text-lg-rem font-semibold pb-3 text-[var(--primary)]">
            Inspector
          </h3>
          <ChipGroup value={inspectorMode} onChange={(v) => setInspectorMode(v as ExplorerInspectorMode)}>
            <Chip value="off" label="Off" />
            <Chip value="box-model" label="Box Model" />
            <Chip value="token-spacing" label="Token Spacing" />
            <Chip value="both" label="Both" />
          </ChipGroup>
          <div className="mt-2 flex flex-wrap gap-2">
            <ChipGroup value={String(inspectorScale)} onChange={(v) => setInspectorScale(Number(v))}>
              <Chip value="1" label="1x" />
              <Chip value="1.25" label="1.25x" />
              <Chip value="1.5" label="1.5x" />
            </ChipGroup>
            <ChipGroup value={inspectorHighContrast ? "on" : "off"} onChange={(v) => setInspectorHighContrast(v === "on")}>
              <Chip value="off" label="Normal" />
              <Chip value="on" label="High Contrast" />
            </ChipGroup>
          </div>
        </div>
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
              <div className="flex w-full max-w-[1200px] items-center justify-center rounded-lg border border-border bg-[var(--bg-primary)] p-4">
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
