"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { docsConfig } from "@/config/docs"
import { cn } from "@/lib/utils"

export function SiteSidebar({ className }: { className?: string }) {
    const pathname = usePathname()

    return (
        <div className={cn("pb-12", className)}>
            {docsConfig.sidebarNav.map((item, index) => (
                <div key={index} className="pb-4">
                    <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
                        {item.title}
                    </h4>
                    {item.items?.length && (
                        <div className="grid grid-flow-row auto-rows-max text-sm">
                            {item.items.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "group flex w-full items-center justify-between rounded-md border border-transparent px-2 py-1 hover:underline",
                                        pathname === item.href
                                            ? "font-medium text-foreground"
                                            : "text-muted-foreground"
                                    )}
                                >
                                    <span>{item.title}</span>
                                    {item.badge && (
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
                                            {item.badge}
                                        </span>
                                    )}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}
