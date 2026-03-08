"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/site-header"
import { SiteSidebar } from "@/components/site-sidebar"
import { TocProvider } from "@/components/toc-context"
import { TableOfContents } from "@/components/toc"
import { cn } from "@/lib/utils";
import { useViewMode } from "@/components/view-mode-context";

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { viewMode } = useViewMode();
    const pathname = usePathname();

    const isMachine = viewMode === "machine" && pathname.startsWith("/docs");

    return (
        <div className="relative flex min-h-screen flex-col bg-background">
            {!isMachine && <SiteHeader />}
            <TocProvider>
                <div className="flex-1 bg-background flex w-full">
                    <div className={cn(
                        "mx-auto flex w-full",
                        isMachine ? "max-w-[860px] px-6" : "container max-w-[1400px]"
                    )}>
                        <div className={cn(
                            "flex w-full",
                            isMachine ? "py-10" : "flex gap-10 py-10"
                        )}>
                            {/* Left Sidebar */}
                            {!isMachine && (
                                <aside
                                    className="sticky top-20 h-[calc(100vh-6rem)] shrink-0 overflow-y-auto border-r w-64 pr-10"
                                    style={{
                                        borderColor: "var(--border-primary)",
                                    }}
                                >
                                    <SiteSidebar collapsed={false} />
                                </aside>
                            )}

                            {/* Main Content */}
                            <main className="flex flex-col flex-1 min-w-0 w-full max-w-[860px]">
                                {children}
                            </main>

                            {/* Right Sidebar — TOC */}
                            {!isMachine && (
                                <aside className="hidden xl:block sticky top-20 h-[calc(100vh-6rem)] w-56 shrink-0 overflow-y-auto pl-6">
                                    <TableOfContents />
                                </aside>
                            )}
                        </div>
                    </div>
                </div>
            </TocProvider>
        </div>
    )
}
