"use client";

import { usePathname } from "next/navigation";
import { SegmentedTabs, SegmentedTabItem } from "@/registry";
import { useViewMode } from "@/components/view-mode-context";

/** Paths where the Human/Machine toggle should appear */
const TOGGLE_PATHS = [
  "/docs/components/",
  "/docs/ai-prompts",
  "/docs/npm-package",
  "/docs/global-css",
  "/colors",
  "/charts",
  "/icons",
];

export function FloatingViewToggle() {
  const { viewMode, setViewMode } = useViewMode();
  const pathname = usePathname();

  const show = TOGGLE_PATHS.some((p) => pathname.startsWith(p));
  if (!show) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 shadow-lg rounded-lg">
      <SegmentedTabs
        value={viewMode}
        onChange={(val) => setViewMode(val as "human" | "machine")}
        className="w-fit"
      >
        <SegmentedTabItem value="human" label="Human" />
        <SegmentedTabItem value="machine" label="Machine" />
      </SegmentedTabs>
    </div>
  );
}
