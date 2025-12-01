"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState, useMemo, useRef, useEffect } from "react"
import { Search } from "lucide-react"
import { docsConfig } from "@/config/docs"
import { cn } from "@/lib/utils"

interface SearchResult {
    title: string
    href: string
    category: string
    type: 'component' | 'page' | 'icon'
}

export function SiteHeader() {
    const pathname = usePathname()
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState("")
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(0)
    const searchRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const isActive = (href: string) => {
        if (pathname === href) return true
        
        // For /docs, match /docs and /docs/* but not /docs/components/* (handled by Components nav)
        if (href === "/docs") {
            return pathname === "/docs" || (pathname.startsWith("/docs/") && !pathname.startsWith("/docs/components/"))
        }
        
        // For /docs/components/button, match any /docs/components/* path
        if (href.startsWith("/docs/components/")) {
            return pathname.startsWith("/docs/components/")
        }
        
        // For other routes, match exact or paths starting with the href
        return pathname.startsWith(`${href}/`)
    }

    // Build searchable items from config
    const searchableItems = useMemo(() => {
        const items: SearchResult[] = []
        
        // Add main navigation items
        docsConfig.mainNav.forEach((item) => {
            if (!item.external) {
                items.push({
                    title: item.title,
                    href: item.href,
                    category: 'Navigation',
                    type: 'page'
                })
            }
        })
        
        // Add all sidebar navigation items (components)
        docsConfig.sidebarNav.forEach((section) => {
            section.items.forEach((item) => {
                items.push({
                    title: item.title,
                    href: item.href,
                    category: section.title,
                    type: 'component'
                })
            })
        })
        
        return items
    }, [])

    // Filter search results
    const searchResults = useMemo(() => {
        if (!searchQuery.trim()) return []
        
        const query = searchQuery.toLowerCase().trim()
        return searchableItems
            .filter(item => 
                item.title.toLowerCase().includes(query) ||
                item.category.toLowerCase().includes(query)
            )
            .slice(0, 8) // Limit to 8 results
    }, [searchQuery, searchableItems])

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isSearchOpen) return
            
            if (e.key === 'ArrowDown') {
                e.preventDefault()
                setSelectedIndex(prev => Math.min(prev + 1, searchResults.length - 1))
            } else if (e.key === 'ArrowUp') {
                e.preventDefault()
                setSelectedIndex(prev => Math.max(prev - 1, 0))
            } else if (e.key === 'Enter' && searchResults[selectedIndex]) {
                e.preventDefault()
                router.push(searchResults[selectedIndex].href)
                setSearchQuery("")
                setIsSearchOpen(false)
            } else if (e.key === 'Escape') {
                setIsSearchOpen(false)
                inputRef.current?.blur()
            }
        }
        
        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [isSearchOpen, searchResults, selectedIndex, router])

    // Close search when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
                setIsSearchOpen(false)
            }
        }
        
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleSearchChange = (value: string) => {
        setSearchQuery(value)
        setSelectedIndex(0)
        setIsSearchOpen(true)
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 max-w-screen-2xl items-center gap-4 px-4 md:px-6 lg:px-8">
                <div className="mr-4 hidden md:flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <span className="hidden font-bold sm:inline-block">
                            FT Design System
                        </span>
                    </Link>
                    <nav className="flex items-center gap-6 text-sm">
                        {docsConfig.mainNav.map((item) => {
                            const Icon = item.icon
                            const active = !item.external && isActive(item.href)
                            const content = (
                                <>
                                    {Icon && <Icon className="h-4 w-4 mr-2" />}
                                    {item.title}
                                </>
                            )
                            
                            if (item.external) {
                                return (
                                    <a
                                        key={item.href}
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={cn(
                                            "inline-flex items-center transition-colors hover:text-foreground/80",
                                            "text-foreground/60"
                                        )}
                                    >
                                        {content}
                                    </a>
                                );
                            }
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "inline-flex items-center transition-colors",
                                        active
                                            ? "font-medium text-foreground"
                                            : "text-foreground/60 hover:text-foreground/80"
                                    )}
                                >
                                    {content}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
                <div className="flex flex-1 items-center justify-end ml-auto">
                    <div ref={searchRef} className="relative w-full max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none z-10" />
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Search components, icons, charts..."
                            value={searchQuery}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            onFocus={() => setIsSearchOpen(true)}
                            className="w-full pl-10 pr-4 py-2 h-9 rounded-md border border-input bg-background text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring placeholder:text-muted-foreground"
                        />
                        {isSearchOpen && searchResults.length > 0 && (
                            <div className="absolute top-full right-0 mt-1 bg-background border border-border rounded-md shadow-lg max-h-96 overflow-y-auto z-[9999] w-full min-w-[300px]">
                                {searchResults.map((result, index) => (
                                    <Link
                                        key={`${result.href}-${index}`}
                                        href={result.href}
                                        onClick={() => {
                                            setSearchQuery("")
                                            setIsSearchOpen(false)
                                        }}
                                        className={cn(
                                            "block px-4 py-2 hover:bg-accent transition-colors",
                                            index === selectedIndex && "bg-accent"
                                        )}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium text-sm">{result.title}</span>
                                            <span className="text-xs text-muted-foreground">{result.category}</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                        {isSearchOpen && searchQuery.trim() && searchResults.length === 0 && (
                            <div className="absolute top-full right-0 mt-1 bg-background border border-border rounded-md shadow-lg p-4 z-[9999] w-full min-w-[300px]">
                                <p className="text-sm text-muted-foreground text-center">No results found</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}
