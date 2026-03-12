"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
// Decorative icons — no FT equivalent, Lucide is intentional
import { Sun, Moon, MoonStar, Layers, Sparkles, Diamond } from "lucide-react"
import { CommandDialog } from "@/components/command-dialog"
import { useGlass, type GlassMode } from "@/components/glass-provider"
import { useTheme } from "next-themes"
import { docsConfig } from "@/config/docs"
import { cn } from "@/lib/utils"
import { Icon } from "../../../src/components/atoms/Icons"
import { Button } from "../../../src/components/atoms/Button"
import { Dropdown } from "../../../src/components/molecules/Dropdown"
import { DropdownTrigger } from "../../../src/components/molecules/Dropdown/DropdownTrigger"
import { DropdownContent } from "../../../src/components/molecules/Dropdown/DropdownContent"
import { DropdownMenu, DropdownMenuItem } from "../../../src/components/molecules/DropdownMenu"
import { DropdownMenuList } from "../../../src/components/molecules/DropdownMenu/DropdownMenuList"

// Map GlassMode values to string keys for the Dropdown
const glassModeToString = (mode: GlassMode): string => {
    if (mode === false) return 'normal'
    if (mode === true) return 'glass'
    return 'prominent'
}

const stringToGlassMode = (str: string | number): GlassMode => {
    if (str === 'normal') return false
    if (str === 'glass') return true
    return 'prominent'
}

const glassOptions = [
    { value: 'normal', label: 'Normal', LucideIcon: Layers },
    { value: 'glass', label: 'Glass', LucideIcon: Sparkles },
    { value: 'prominent', label: 'Prominent', LucideIcon: Diamond },
]

export function SiteHeader() {
    const pathname = usePathname()
    const [cmdkOpen, setCmdkOpen] = useState(false)
    const { theme, setTheme } = useTheme()
    const { glassMode, setGlassMode } = useGlass()
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

    const glassValue = glassModeToString(glassMode)

    const handleGlassChange = (val: string | number) => {
        setGlassMode(stringToGlassMode(val))
    }

    const currentGlassOption = glassOptions.find(o => o.value === glassValue) ?? glassOptions[0]

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

    const ThemeIcon = getThemeIcon()

    return (
        <header className="sticky top-0 z-50 w-full bg-[var(--bg-primary)] border-b border-border">
            <div className="container flex h-14 items-center justify-between gap-0 px-5 w-full" style={{ width: '100%', maxWidth: '100%' }}>
                <div className="mr-4 hidden md:flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <span className="hidden font-bold sm:inline-block">
                            FT Design System
                        </span>
                    </Link>
                    <nav className="flex items-center gap-6 text-sm-rem">
                        {docsConfig.mainNav.map((item) => {
                            const NavIcon = item.icon
                            const active = !item.external && isActive(item.href)
                            const content = (
                                <>
                                    {NavIcon && <NavIcon className="h-4 w-4 mr-2" />}
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
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setCmdkOpen(true)}
                        className="inline-flex items-center gap-2 rounded-md border border-input bg-background px-3 h-9 text-sm-rem text-muted-foreground shadow-sm hover:bg-muted hover:text-foreground w-full max-w-[240px]"
                    >
                        <Icon name="search" size={16} className="shrink-0" />
                        <span className="flex-1 text-left hidden sm:inline">Search...</span>
                        <kbd className="pointer-events-none hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                            <span className="text-xs">⌘</span>K
                        </kbd>
                    </Button>
                    <CommandDialog open={cmdkOpen} onOpenChange={setCmdkOpen} />
                    <Dropdown
                        value={glassValue}
                        onChange={handleGlassChange}
                        size="sm"
                        className="shrink-0"
                    >
                        <DropdownTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                disabled={!mounted}
                                className={cn(
                                    "w-auto border-0 bg-transparent",
                                    "gap-1.5 px-2.5",
                                    "text-foreground/60 hover:text-foreground hover:bg-accent",
                                    "focus-visible:ring-1 focus-visible:ring-ring",
                                    glassMode && "text-foreground bg-accent/50"
                                )}
                                aria-label="Select style"
                            >
                                {(() => {
                                    const GlassIcon = currentGlassOption.LucideIcon
                                    return <GlassIcon className="h-4 w-4" />
                                })()}
                                <span className="hidden sm:inline">{currentGlassOption.label}</span>
                                <Icon name="chevron-down" size={12} />
                            </Button>
                        </DropdownTrigger>
                        <DropdownContent>
                            <DropdownMenu>
                                <DropdownMenuList>
                                    {glassOptions.map((option) => {
                                        const GlassIcon = option.LucideIcon
                                        return (
                                            <DropdownMenuItem
                                                key={option.value}
                                                value={option.value}
                                                label={option.label}
                                                icon={<GlassIcon className="h-4 w-4" />}
                                                prefix="icon"
                                                state={option.value === glassValue ? 'selected' : 'default'}
                                                onClick={() => handleGlassChange(option.value)}
                                            />
                                        )
                                    })}
                                </DropdownMenuList>
                            </DropdownMenu>
                        </DropdownContent>
                    </Dropdown>
                    <Button
                        variant="ghost"
                        size="sm"
                        iconPosition="only"
                        icon={<ThemeIcon className="h-4 w-4" />}
                        onClick={handleThemeToggle}
                        disabled={!mounted}
                        aria-label={getThemeLabel()}
                        title={getThemeLabel()}
                        className="shrink-0"
                    />
                </div>
            </div>
        </header>
    )
}
