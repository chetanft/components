"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState, useMemo, useRef, useEffect } from "react"
import { Search, Sun, Moon, MoonStar } from "lucide-react"
import { useTheme } from "next-themes"
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
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    const [currentTheme, setCurrentTheme] = useState<'light' | 'dark' | 'night'>('light')

    // Theme cycling logic
    const themes = ['light', 'dark', 'night'] as const
    
    useEffect(() => {
        setMounted(true)
        // Get current theme from html class or theme state
        if (typeof document !== 'undefined') {
            const html = document.documentElement
            if (html.classList.contains('dark')) {
                setCurrentTheme('dark')
            } else if (html.classList.contains('night')) {
                setCurrentTheme('night')
            } else {
                setCurrentTheme('light')
            }
        }
    }, [])

    // Watch for theme changes and ensure class is applied
    useEffect(() => {
        if (!mounted || !theme) return
        
        const html = document.documentElement
        
        // Ensure the correct class is applied
        html.classList.remove('light', 'dark', 'night')
        if (theme === 'dark' || theme === 'night' || theme === 'light') {
            html.classList.add(theme)
            setCurrentTheme(theme as typeof themes[number])
        } else {
            html.classList.add('light')
            setCurrentTheme('light')
        }
        
        const observer = new MutationObserver(() => {
            if (html.classList.contains('dark')) {
                setCurrentTheme('dark')
            } else if (html.classList.contains('night')) {
                setCurrentTheme('night')
            } else {
                setCurrentTheme('light')
            }
        })
        
        observer.observe(html, { attributes: true, attributeFilter: ['class'] })
        
        return () => observer.disconnect()
    }, [mounted, theme])

    // Update currentTheme when theme prop changes
    useEffect(() => {
        if (theme && themes.includes(theme as typeof themes[number])) {
            setCurrentTheme(theme as typeof themes[number])
        }
    }, [theme])

    const currentThemeIndex = themes.indexOf(currentTheme)
    const nextTheme = themes[(currentThemeIndex + 1) % themes.length]
    
    const handleThemeToggle = () => {
        // Set theme via next-themes
        setTheme(nextTheme)
        
        // Also manually ensure the class is applied immediately (fallback)
        if (typeof document !== 'undefined') {
            const html = document.documentElement
            html.classList.remove('light', 'dark', 'night')
            html.classList.add(nextTheme)
            setCurrentTheme(nextTheme)
        }
    }
    
    const getThemeIcon = () => {
        if (!mounted) return Sun
        if (currentTheme === 'dark') return Moon
        if (currentTheme === 'night') return MoonStar
        return Sun
    }
    
    const getThemeLabel = () => {
        if (!mounted) return 'Switch to dark mode'
        if (currentTheme === 'light') return 'Switch to dark mode'
        if (currentTheme === 'dark') return 'Switch to night mode'
        return 'Switch to light mode'
    }

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
            <div className="container flex h-14 max-w-screen-2xl items-center justify-between gap-0 px-5">
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
                <div className="flex flex-1 items-center justify-end ml-auto gap-2">
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
                    <button
                        onClick={handleThemeToggle}
                        disabled={!mounted}
                        className={cn(
                            "inline-flex items-center justify-center rounded-md p-2 h-9 w-9",
                            "text-foreground/60 hover:text-foreground hover:bg-accent",
                            "transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                            "disabled:opacity-50 disabled:cursor-not-allowed"
                        )}
                        aria-label={getThemeLabel()}
                        title={getThemeLabel()}
                    >
                        {(() => {
                            const Icon = getThemeIcon()
                            return <Icon className="h-4 w-4" />
                        })()}
                    </button>
                </div>
            </div>
        </header>
    )
}
