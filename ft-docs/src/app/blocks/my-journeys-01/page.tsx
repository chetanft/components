"use client";

import { JourneysBlock } from "@chetanft/design_system"
import { SiteHeader } from "@/components/site-header"

export default function MyJourneys01Page() {

  return (
    <div
      className="relative flex min-h-screen flex-col"
      style={{ backgroundColor: "var(--bg-secondary)" }}
    >
      <SiteHeader />
      <main className="flex-1 w-full">
        <div className="w-full" style={{ backgroundColor: "var(--bg-secondary)" }}>
          <JourneysBlock />
        </div>
      </main>
    </div>
  )
}
