"use client";

import { useRouter } from "next/navigation"
import { Button, PageHeader, FormulaBuilderBlock } from "@chetanft/design_system"
import { SiteHeader } from "@/components/site-header"

export default function FormulaBuilder01Page() {
  const router = useRouter()

  return (
    <div
      className="relative flex min-h-screen flex-col"
      style={{ backgroundColor: "var(--bg-secondary)" }}
    >
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto w-full max-w-6xl px-4 py-6 md:py-10">
          <div
            className="mb-6 rounded-2xl border"
            style={{
              backgroundColor: "var(--bg-primary)",
              borderColor: "var(--border-secondary)",
            }}
          >
            <PageHeader className="!bg-transparent !px-6">
              <PageHeader.Top>
                <PageHeader.Left>
                  <PageHeader.BackButton onClick={() => router.push("/blocks")} />
                  <PageHeader.TitleGroup>
                    <PageHeader.Title>Formula Builder</PageHeader.Title>
                    <PageHeader.Subtitle>
                      An interactive formula builder with rule-based dropdown menus for variables, functions, and operators.
                    </PageHeader.Subtitle>
                  </PageHeader.TitleGroup>
                </PageHeader.Left>
              </PageHeader.Top>
            </PageHeader>
            <p
              className="px-6 pb-6 text-sm md:text-base"
              style={{ color: "var(--secondary)" }}
            >
              Every surface below inherits FT Design System tokens for backgrounds, borders, and
              typography so it drops directly into product surfaces.
            </p>
          </div>

          <div
            className="rounded-2xl border"
            style={{
              backgroundColor: "var(--bg-primary)",
              borderColor: "var(--border-secondary)",
            }}
          >
            <div
              className="flex items-center justify-between border-b px-6 py-4"
              style={{ borderColor: "var(--border-secondary)" }}
            >
              <h2
                className="text-base font-semibold"
                style={{ color: "var(--primary)" }}
              >
                Preview
              </h2>
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  icon="copy"
                  iconPosition="only"
                  aria-label="Copy JSX"
                  className="rounded-full"
                />
                <Button
                  variant="secondary"
                  size="sm"
                  icon="link"
                  iconPosition="only"
                  aria-label="Open block preview"
                  className="rounded-full"
                />
              </div>
            </div>
            <div className="p-6">
              <FormulaBuilderBlock />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
