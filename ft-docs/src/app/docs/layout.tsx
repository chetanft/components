"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/site-header"
import { SiteSidebar } from "@/components/site-sidebar"
import { TocProvider } from "@/components/toc-context"
import { TableOfContents } from "@/components/toc"
import { Button } from "@/registry";
import { Icon } from "@/registry";
import { cn } from "@/lib/utils";
import { useViewMode } from "@/components/view-mode-context";

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
    const { viewMode } = useViewMode();
    const pathname = usePathname();

    // Only apply machine mode on pages that have the toggle
    const isMachine = viewMode === "machine" && (
        pathname.startsWith("/docs/components/") ||
        pathname === "/docs/ai-prompts" ||
        pathname === "/docs/npm-package" ||
        pathname === "/docs/global-css"
    );

    // Hydrate persisted collapsed state after mount to avoid SSR/client mismatch
    useEffect(() => {
        if (typeof window !== "undefined") {
            const stored = localStorage.getItem("ftds_docs_sidebar_collapsed");
            if (stored !== null) {
                setSidebarCollapsed(stored === "true");
            }
        }
    }, []);

    // Update localStorage when collapsed state changes
    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("ftds_docs_sidebar_collapsed", String(sidebarCollapsed));
        }
    }, [sidebarCollapsed]);

    const toggleSidebar = () => {
        setSidebarCollapsed((prev) => !prev);
    };

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
                                    className={cn(
                                        "sticky top-20 h-[calc(100vh-6rem)] shrink-0 overflow-y-auto border-r transition-all duration-300",
                                        sidebarCollapsed ? "w-12 px-2" : "w-64 pr-10"
                                    )}
                                    style={{
                                        borderColor: "var(--border-primary)",
                                    }}
                                >
                                    {/* Collapse Toggle Button */}
                                    <div className="mb-4 flex justify-end">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={toggleSidebar}
                                            aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                                            title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                                            className="h-8 w-8 p-0 hover:shadow-none"
                                        >
                                            <Icon
                                                name={sidebarCollapsed ? "chevron-right" : "chevron-left"}
                                                size={16}
                                            />
                                        </Button>
                                    </div>

                                    <SiteSidebar collapsed={sidebarCollapsed} />
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
