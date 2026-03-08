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
            <div className="flex flex-wrap gap-2">
              {GLASS_CHIPS.map((chip) => {
                const isActive = glassMode === chip.value;
                return (
                  <Button
                    key={chip.label}
                    onClick={() => setGlassMode(chip.value)}
                    variant={isActive ? "secondary" : "text"}
                    size="sm"
                    className="!px-3 !py-1.5"
                  >
                    {chip.label}
                  </Button>
                );
              })}
            </div>
          </div>
        )}
        <div className="mb-4">
          <h3
            className="text-base-rem font-semibold pb-2"
            style={{ color: "var(--primary)" }}
          >
            Inspector
          </h3>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Off", value: "off" as ExplorerInspectorMode },
              { label: "Box Model", value: "box-model" as ExplorerInspectorMode },
              { label: "Token Spacing", value: "token-spacing" as ExplorerInspectorMode },
              { label: "Both", value: "both" as ExplorerInspectorMode },
            ].map((chip) => {
              const isActive = inspectorMode === chip.value;
              return (
                <Button
                  key={chip.value}
                  onClick={() => setInspectorMode(chip.value)}
                  variant={isActive ? "secondary" : "text"}
                  size="sm"
                  className="!px-3 !py-1.5"
                >
                  {chip.label}
                </Button>
              );
            })}
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {[1, 1.25, 1.5].map((scale) => {
              const isActive = Math.abs(inspectorScale - scale) < 0.001
              return (
                <Button
                  key={scale}
                  onClick={() => setInspectorScale(scale)}
                  variant={isActive ? "secondary" : "text"}
                  size="sm"
                  className="!px-3 !py-1.5"
                >
                  {scale}x
                </Button>
              )
            })}
            <Button
              onClick={() => setInspectorHighContrast((prev) => !prev)}
              variant={inspectorHighContrast ? "secondary" : "text"}
              size="sm"
              className="!px-3 !py-1.5"
            >
              High Contrast
            </Button>
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
            className="!px-3 !py-1"
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
