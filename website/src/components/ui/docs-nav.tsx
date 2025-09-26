"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const docsConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
    },
  ],
  sidebarNav: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Introduction",
          href: "/docs",
        },
        {
          title: "Installation",
          href: "/docs/installation",
        },
      ],
    },
    {
      title: "Components",
      items: [
        {
          title: "Button",
          href: "/docs/components/button",
        },
        {
          title: "Input",
          href: "/docs/components/input",
        },
        {
          title: "Badge",
          href: "/docs/components/badge",
        },
        {
          title: "Checkbox",
          href: "/docs/components/checkbox",
        },
        {
          title: "Label",
          href: "/docs/components/label",
        },
        {
          title: "Switch",
          href: "/docs/components/switch",
        },
        {
          title: "Card",
          href: "/docs/components/card",
        },
        {
          title: "Table",
          href: "/docs/components/table",
        },
        {
          title: "Tabs",
          href: "/docs/components/tabs",
        },
        {
          title: "Dropdown Menu",
          href: "/docs/components/dropdown-menu",
        },
      ],
    },
  ],
}

export function DocsNav() {
  const pathname = usePathname()

  return (
    <div className="w-full">
      {docsConfig.sidebarNav?.map((item, index) => (
        <div key={index} className={cn("pb-4")}>
          <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
            {item.title}
          </h4>
          {item?.items?.length && (
            <DocsSidebarNavItems items={item.items} pathname={pathname} />
          )}
        </div>
      ))}
    </div>
  )
}

interface DocsSidebarNavItemsProps {
  items: Array<{
    title: string
    href: string
    disabled?: boolean
  }>
  pathname: string | null
}

export function DocsSidebarNavItems({
  items,
  pathname,
}: DocsSidebarNavItemsProps) {
  return items?.length ? (
    <div className="grid grid-flow-row auto-rows-max text-sm">
      {items.map((item, index) =>
        item.href && !item.disabled ? (
          <Link
            key={index}
            href={item.href}
            className={cn(
              "group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline",
              pathname === item.href
                ? "font-medium text-foreground"
                : "text-muted-foreground"
            )}
            target={item.href.startsWith("http") ? "_blank" : undefined}
            rel={item.href.startsWith("http") ? "noreferrer" : undefined}
          >
            {item.title}
          </Link>
        ) : (
          <span
            key={index}
            className={cn(
              "flex w-full cursor-not-allowed items-center rounded-md p-2 text-muted-foreground hover:underline",
              item.disabled && "cursor-not-allowed opacity-60"
            )}
          >
            {item.title}
          </span>
        )
      )}
    </div>
  ) : null
}
