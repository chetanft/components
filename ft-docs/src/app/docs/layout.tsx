"use client";

import { useState, useEffect } from "react";
import { SiteHeader } from "@/components/site-header"
import { SiteSidebar } from "@/components/site-sidebar"
import { Button } from "@/registry";
import { Icon } from "@/registry";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/registry";
import { cn } from "@/lib/utils";

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    // Initialize sidebar collapsed state from localStorage
    const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(() => {
        if (typeof window !== "undefined") {
            const stored = localStorage.getItem("ftds_docs_sidebar_collapsed");
            return stored === "true";
        }
        return false;
    });

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
            <SiteHeader />
            <div className="flex-1 bg-background flex w-full">
                <div className="container max-w-screen-2xl mx-auto flex w-full">
                    <div className="flex gap-8 py-8 w-full">
                        {/* Sidebar */}
                        <aside
                            className={cn(
                                "sticky top-20 h-[calc(100vh-6rem)] shrink-0 overflow-y-auto border-r transition-all duration-300",
                                sidebarCollapsed ? "w-12 px-2" : "w-64 pr-8"
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

                        {/* Main Content */}
                        <main className="flex flex-col flex-1 min-w-0 w-full mr-5">
                            {children}
                        </main>
                    </div>
                </div>
            </div>
        </div>
    )
}
