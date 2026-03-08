"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { docsConfig } from "@/config/docs"
import { cn } from "@/lib/utils"
import { Badge } from "@/registry"

export function SiteSidebar({ className, collapsed }: { className?: string; collapsed?: boolean }) {
    const pathname = usePathname()

    if (collapsed) {
        return <div className={cn("h-full", className)} />;
    }

    return (
        <>
            {docsConfig.sidebarNav.map((item, index) => (
                <div key={index} className="pb-6">
                    <h4 className="mb-2 rounded-md px-2 py-1 text-sm-rem font-semibold">
                        {item.title}
                    </h4>
                    {item.items?.length && (
                        <div className="grid grid-flow-row auto-rows-max text-sm-rem">
                            {item.items.map((navItem) => {
                                const isActive = pathname.toLowerCase() === navItem.href.toLowerCase();
                                return (
                                    <Link
                                        key={navItem.href}
                                        href={navItem.href}
                                        className={cn(
                                            "group flex w-full items-center justify-between rounded-md border border-transparent px-2 py-1.5 transition-colors hover:underline",
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
                                            <Badge
                                                variant="warning"
                                                size="xs"
                                                className="ml-1.5"
                                            >
                                                {navItem.badge}
                                            </Badge>
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
