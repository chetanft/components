"use client"

import { useState, useMemo, useCallback, useEffect } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import type { StoryMeta, StoryDefinition } from "@/lib/story-loader"
import type { ExplorerConfig, ExplorerInspectorMode } from "@/types/explorer"
import { StoryPreview } from "@/components/story-preview"
import { ExplorerPositionedPreview } from "@/components/explorer-positioned-preview"
import { PlaygroundControl } from "@/components/playground-control"
import { buildControls } from "@/lib/playground-controls"
import { GlassPreviewBackdrop } from "@/components/glass-preview-backdrop"
import { ExplorerInspector } from "@/components/explorer-inspector"
import { Button } from "@/registry"
import { Chip, ChipGroup } from "@/registry"

type GlassChipValue = false | true | "subtle" | "prominent"

const GLASS_CHIPS: { label: string; value: GlassChipValue }[] = [
  { label: "Normal", value: false },
  { label: "Subtle", value: "subtle" },
  { label: "Glass", value: true },
  { label: "Prominent", value: "prominent" },
]

interface ExplorerPlaygroundProps {
  meta: StoryMeta
  stories: StoryDefinition[]
  componentName: string
  config: ExplorerConfig
}

export function ExplorerPlayground({
  meta,
  stories,
  componentName,
  config,
}: ExplorerPlaygroundProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const selectedStory = useMemo(() => {
    const playgroundStoryName = config.playground?.story
    if (playgroundStoryName) {
      const match = stories.find((s) => s.name === playgroundStoryName)
      if (match) return match
    }

    // Prefer stories that actually respond to args (render/args based).
    const defaultArgsStory = stories.find(
      (s) => s.name === "Default" && (s.render || (s.args && Object.keys(s.args).length > 0))
    )
    if (defaultArgsStory) return defaultArgsStory

    const argsOrRenderStory = stories.find(
      (s) => s.render || (s.args && Object.keys(s.args).length > 0)
    )
    if (argsOrRenderStory) return argsOrRenderStory

    return stories[0]
  }, [stories, config.playground?.story])

  const [glassMode, setGlassMode] = useState<GlassChipValue>(false);
  const [inspectorMode, setInspectorMode] = useState<ExplorerInspectorMode>(() =>
    (searchParams.get("inspector") as ExplorerInspectorMode | null) ?? config.inspector?.defaultMode ?? "off"
  );
  const [inspectorScale, setInspectorScale] = useState<number>(() => {
    const raw = Number.parseFloat(searchParams.get("inspectorScale") || "1")
    return Number.isFinite(raw) && raw > 0 ? raw : 1
  })
  const [inspectorHighContrast, setInspectorHighContrast] = useState<boolean>(
    searchParams.get("inspectorContrast") === "high"
  )

  const [controlValues, setControlValues] = useState<Record<string, unknown>>(() => ({
    ...(meta.args ?? {}),
    ...(selectedStory?.args ?? {}),
  }))

  useEffect(() => {
    setControlValues({
      ...(meta.args ?? {}),
      ...(selectedStory?.args ?? {}),
    })
  }, [meta.args, selectedStory?.args, componentName])

  const controls = useMemo(
    () => buildControls(meta.argTypes, config.playground),
    [meta.argTypes, config.playground]
  )

  const handleControlChange = useCallback((name: string, value: unknown) => {
    setControlValues((prev) => ({ ...prev, [name]: value }))
  }, [])

  const handleReset = useCallback(() => {
    setControlValues({
      ...(meta.args ?? {}),
      ...(selectedStory?.args ?? {}),
    })
  }, [meta.args, selectedStory?.args])

  if (!selectedStory) return null

  const storyForPreview =
    selectedStory.component && !selectedStory.render && !selectedStory.args
      ? { ...selectedStory, component: undefined }
      : selectedStory

  const mergedControlValues = useMemo(() => {
    if (glassMode !== false) {
      return { ...controlValues, glass: glassMode }
    }
    return controlValues
  }, [controlValues, glassMode])

  const preview = (
    <ExplorerInspector
      mode={inspectorMode}
      config={config.inspector}
      scale={inspectorScale}
      highContrast={inspectorHighContrast}
    >
      <StoryPreview
        meta={meta}
        story={storyForPreview}
        componentName={componentName}
        overrideArgs={mergedControlValues}
        chromeless
      />
    </ExplorerInspector>
  )

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("mode", "playground")
    if (inspectorMode && inspectorMode !== "off") params.set("inspector", inspectorMode)
    else params.delete("inspector")
    if (Math.abs(inspectorScale - 1) > 0.001) params.set("inspectorScale", String(inspectorScale))
    else params.delete("inspectorScale")
    if (inspectorHighContrast) params.set("inspectorContrast", "high")
    else params.delete("inspectorContrast")
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }, [inspectorMode, inspectorScale, inspectorHighContrast, pathname, router, searchParams])

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

  return (
    <div className="grid gap-6" style={{ gridTemplateColumns: "minmax(0, 1fr) 320px", minHeight: "520px" }}>
      <div className="min-w-0">
        {config.supportsGlass && (
          <div className="mb-4">
            <h3
              className="text-base-rem font-semibold pb-2"
              style={{ color: "var(--primary)" }}
            >
              Glass Mode
            </h3>
            <ChipGroup value={String(glassMode)} onChange={(v) => setGlassMode(v === "false" ? false : v === "true" ? true : v as "subtle" | "prominent")}>
              {GLASS_CHIPS.map((chip) => (
                <Chip key={chip.label} value={String(chip.value)} label={chip.label} />
              ))}
            </ChipGroup>
          </div>
        )}
        <div className="mb-4">
          <h3
            className="text-base-rem font-semibold pb-2"
            style={{ color: "var(--primary)" }}
          >
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
        <div className="relative">
          <GlassPreviewBackdrop active={config.supportsGlass === true && glassMode !== false} />
          <div className="relative" style={{ zIndex: 1 }}>
            {config.previewMode === "positioned" ? (
              <ExplorerPositionedPreview
                placement={config.positionedPreview?.placement}
                width={config.positionedPreview?.width}
              >
                {preview}
              </ExplorerPositionedPreview>
            ) : (
              preview
            )}
          </div>
        </div>
      </div>
      {/* Controls panel */}
      <div
        className="border h-fit"
        style={{ borderColor: "var(--docs-border)" }}
      >
        <div className="flex items-center justify-between border-b px-4 py-3" style={{ borderColor: "var(--docs-border)" }}>
          <h3
            className="text-base-rem font-semibold"
            style={{ color: "var(--primary)" }}
          >
            Controls
          </h3>
          <Button
            type="button"
            onClick={handleReset}
            variant="secondary"
            size="sm"
            style={{ padding: '4px 12px' }}
          >
            Reset
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
          {controls.map((control) => (
            <PlaygroundControl
              key={control.name}
              control={control}
              value={controlValues[control.name]}
              onChange={handleControlChange}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
