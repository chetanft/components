"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { docsConfig } from "@/config/docs"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/registry"

export function SiteSidebar({ className, collapsed }: { className?: string; collapsed?: boolean }) {
    const pathname = usePathname()

    if (collapsed) {
        return <div className={cn("h-full", className)} />;
    }

    return (
        <>
            {docsConfig.sidebarNav.map((item, index) => (
                <div key={index} className="pb-4">
                    <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
                        {item.title}
                    </h4>
                    {item.items?.length && (
                        <div className="grid grid-flow-row auto-rows-max text-sm">
                            {item.items.map((navItem) => {
                                const isActive = pathname === navItem.href;
                                return (
                                    <Link
                                        key={navItem.href}
                                        href={navItem.href}
                                        className={cn(
                                            "group flex w-full items-center justify-between rounded-md border border-transparent px-2 py-1 transition-colors hover:underline",
                                            isActive
                                                ? "font-medium"
                                                : "",
                                            isActive
                                                ? "text-[var(--primary)]"
                                                : "text-[var(--secondary)]"
                                        )}
                                        style={{
                                            backgroundColor: isActive ? "var(--bg-secondary)" : "transparent",
                                        }}
                                    >
                                        <span>{navItem.title}</span>
                                        {navItem.badge && (
                                            <span
                                                className={cn(
                                                    "ml-1.5 px-1 py-0.5 font-medium rounded-full border leading-tight whitespace-nowrap"
                                                )}
                                                style={{
                                                    fontSize: "var(--font-size-xs)",
                                                    backgroundColor: "var(--warning-100)",
                                                    color: "var(--warning-500)",
                                                    borderColor: "var(--warning-500)",
                                                }}
                                            >
                                                {navItem.badge}
                                            </span>
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </div>
            ))}
        </>
    )
}
