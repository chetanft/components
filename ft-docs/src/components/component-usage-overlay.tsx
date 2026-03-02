"use client";

import * as React from "react";
import type { StoryMeta, StoryDefinition } from "@/lib/story-loader";
import {
  getComponentGuideline,
  type ComponentGuideline,
} from "@/data/designer-guidelines";
import { Button, Badge } from "@/registry";

interface ComponentUsageOverlayProps {
  componentName: string;
  meta: StoryMeta;
  stories: StoryDefinition[];
  onClose: () => void;
}

export function ComponentUsageOverlay({
  componentName,
  meta,
  onClose,
}: ComponentUsageOverlayProps) {
  const guideline = getComponentGuideline(componentName);

  const description =
    guideline?.description ||
    meta.parameters?.docs?.description?.component ||
    `${componentName} component`;

  return (
    <div className="fixed inset-0 z-[70] bg-[var(--bg-primary)] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-primary)] shrink-0">
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            icon="chevron-left"
            iconPosition="only"
            onClick={onClose}
            aria-label="Back to examples"
          />
          <h2 className="text-section font-semibold text-[var(--primary)]">
            {componentName} — Usage Guidelines
          </h2>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-auto px-6 py-6 min-h-0">
        <UsageContent
          componentName={componentName}
          description={description}
          guideline={guideline}
        />
      </div>
    </div>
  );
}

function UsageContent({
  componentName,
  description,
  guideline,
}: {
  componentName: string;
  description: string;
  guideline: ComponentGuideline | undefined;
}) {
  if (!guideline) {
    return (
      <div className="max-w-3xl space-y-6">
        <div>
          <h3 className="text-xl-rem font-semibold text-[var(--primary)] mb-2">
            {componentName}
          </h3>
          <p className="text-md-rem" style={{ color: "var(--secondary)" }}>
            {description}
          </p>
        </div>
        <div
          className="rounded-lg border p-4"
          style={{
            borderColor: "var(--border-primary)",
            backgroundColor: "var(--bg-secondary)",
          }}
        >
          <p className="text-sm-rem" style={{ color: "var(--tertiary)" }}>
            Designer usage guidelines are not yet available for this component.
            Check back later or contribute guidelines.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-8">
      {/* Description */}
      <div>
        <h3 className="text-xl-rem font-semibold text-[var(--primary)] mb-2">
          {componentName}
        </h3>
        <p className="text-md-rem" style={{ color: "var(--secondary)" }}>
          {guideline.description}
        </p>
        <Badge variant="neutral" size="sm" className="mt-2">{guideline.category}</Badge>
      </div>

      {/* When to use / When not to use */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          className="rounded-lg border p-4 space-y-3"
          style={{
            borderColor: "var(--positive, #22c55e)",
            backgroundColor: "var(--positive-light, #f0fdf4)",
          }}
        >
          <h4
            className="font-semibold text-sm-rem"
            style={{ color: "var(--positive-dark, #16a34a)" }}
          >
            When to use
          </h4>
          <ul className="space-y-2">
            {guideline.whenToUse.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm-rem"
                style={{ color: "var(--primary)" }}
              >
                <span
                  className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: "var(--positive, #22c55e)" }}
                />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div
          className="rounded-lg border p-4 space-y-3"
          style={{
            borderColor: "var(--critical, #ef4444)",
            backgroundColor: "var(--critical-light, #fef2f2)",
          }}
        >
          <h4
            className="font-semibold text-sm-rem"
            style={{ color: "var(--critical, #ef4444)" }}
          >
            When not to use
          </h4>
          <ul className="space-y-2">
            {guideline.whenNotToUse.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm-rem"
                style={{ color: "var(--primary)" }}
              >
                <span
                  className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: "var(--critical, #ef4444)" }}
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Variants */}
      {guideline.variants && guideline.variants.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-lg-rem font-semibold text-[var(--primary)]">
            Variants
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {guideline.variants.map((v) => (
              <div
                key={v.name}
                className="rounded-lg border p-3 space-y-1"
                style={{
                  borderColor: "var(--border-primary)",
                  backgroundColor: "var(--bg-primary)",
                }}
              >
                <div className="flex items-center gap-2">
                  <Badge variant="neutral" size="xs">{v.name}</Badge>
                </div>
                <p
                  className="text-sm-rem"
                  style={{ color: "var(--secondary)" }}
                >
                  {v.description}
                </p>
                <p className="text-xs" style={{ color: "var(--tertiary)" }}>
                  {v.useCase}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Do's and Don'ts */}
      <div className="space-y-3">
        <h4 className="text-lg-rem font-semibold text-[var(--primary)]">
          Do&apos;s &amp; Don&apos;ts
        </h4>
        <div className="space-y-3">
          {guideline.designDosAndDonts.map((pair, i) => (
            <div
              key={i}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              <div
                className="flex items-start gap-2 rounded-lg border p-3"
                style={{
                  borderColor: "var(--positive, #22c55e)",
                  backgroundColor: "var(--positive-light, #f0fdf4)",
                }}
              >
                <span
                  className="mt-0.5 shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    backgroundColor: "var(--positive, #22c55e)",
                    color: "white",
                  }}
                >
                  ✓
                </span>
                <span
                  className="text-sm-rem"
                  style={{ color: "var(--primary)" }}
                >
                  {pair.do}
                </span>
              </div>
              <div
                className="flex items-start gap-2 rounded-lg border p-3"
                style={{
                  borderColor: "var(--critical, #ef4444)",
                  backgroundColor: "var(--critical-light, #fef2f2)",
                }}
              >
                <span
                  className="mt-0.5 shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    backgroundColor: "var(--critical, #ef4444)",
                    color: "white",
                  }}
                >
                  ✗
                </span>
                <span
                  className="text-sm-rem"
                  style={{ color: "var(--primary)" }}
                >
                  {pair.dont}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Figma Links */}
      {guideline.figmaLinks.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-lg-rem font-semibold text-[var(--primary)]">
            Figma
          </h4>
          <div className="flex flex-wrap gap-2">
            {guideline.figmaLinks.map((link, i) => (
              <a key={i} href={link} target="_blank" rel="noopener noreferrer">
                <Button variant="secondary" size="sm" icon="link">
                  Open in Figma{guideline.figmaLinks.length > 1 ? ` (${i + 1})` : ""}
                </Button>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Related Components */}
      {guideline.relatedComponents.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-lg-rem font-semibold text-[var(--primary)]">
            Related Components
          </h4>
          <div className="flex flex-wrap gap-2">
            {guideline.relatedComponents.map((name) => (
              <Badge key={name} variant="neutral" size="sm">{name}</Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
