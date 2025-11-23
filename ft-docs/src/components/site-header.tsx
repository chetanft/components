import Link from "next/link"
import { docsConfig } from "@/config/docs"
import { cn } from "@/lib/utils"

export function SiteHeader() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 max-w-screen-2xl items-center px-4 md:px-6 lg:px-8">
                <div className="mr-4 hidden md:flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <span className="hidden font-bold sm:inline-block">
                            FT Design System
                        </span>
                    </Link>
                    <nav className="flex items-center gap-6 text-sm">
                        {docsConfig.mainNav.map((item) => {
                            const Icon = item.icon
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
                                        "inline-flex items-center transition-colors hover:text-foreground/80",
                                        "text-foreground/60"
                                    )}
                                >
                                    {content}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="w-full flex-1 md:w-auto md:flex-none">
                        {/* Search component placeholder */}
                    </div>
                    <nav className="flex items-center">
                        {/* GitHub link removed */}
                    </nav>
                </div>
            </div>
        </header>
    )
}
