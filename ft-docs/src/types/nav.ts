import { LucideIcon } from "lucide-react"

export interface MainNavItem {
  title: string
  href: string
  external?: boolean
  icon?: LucideIcon
}

export interface SidebarNavItem {
  title: string
  items: {
    title: string
    href: string
    items?: any[]
    badge?: string
  }[]
}

