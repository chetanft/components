"use client"

import { useState, useMemo, useCallback, useEffect } from "react"
import type { StoryMeta, StoryDefinition } from "@/lib/story-loader"
import type { ExplorerConfig } from "@/types/explorer"
import { StoryPreview } from "@/components/story-preview"
import { ExplorerPositionedPreview } from "@/components/explorer-positioned-preview"
import { PlaygroundControl } from "@/components/playground-control"
import { buildControls } from "@/lib/playground-controls"
import { GlassPreviewBackdrop } from "@/components/glass-preview-backdrop"

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
    <StoryPreview
      meta={meta}
      story={storyForPreview}
      componentName={componentName}
      overrideArgs={mergedControlValues}
      chromeless
    />
  )

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
                  <button
                    key={chip.label}
                    onClick={() => setGlassMode(chip.value)}
                    className={`px-3 py-1.5 text-sm-rem rounded-md border transition-colors ${
                      isActive
                        ? "bg-[var(--bg-secondary)] text-[var(--primary)] border-[var(--border-primary)]"
                        : "bg-[var(--bg-primary)] text-[var(--secondary)] border-[var(--border-primary)] hover:bg-[var(--bg-secondary)]"
                    }`}
                  >
                    {chip.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
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
        style={{ borderColor: "var(--border-primary)" }}
      >
        <div className="flex items-center justify-between border-b px-4 py-3" style={{ borderColor: "var(--border-primary)" }}>
          <h3
            className="text-base-rem font-semibold"
            style={{ color: "var(--primary)" }}
          >
            Controls
          </h3>
          <button
            type="button"
            onClick={handleReset}
            className="rounded-md border px-3 py-1 text-sm-rem transition-colors hover:bg-[var(--bg-secondary)]"
            style={{
              borderColor: "var(--border-primary)",
              color: "var(--secondary)",
            }}
          >
            Reset
          </button>
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
