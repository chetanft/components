import { SiteHeader } from "@/components/site-header"
import { SiteSidebar } from "@/components/site-sidebar"

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="relative flex min-h-screen flex-col bg-background">
            <SiteHeader />
            <div className="flex-1 bg-background">
                <div className="container max-w-screen-2xl mx-auto">
                    <div className="flex gap-8 py-8">
                        {/* Sidebar */}
                        <aside className="sticky top-20 h-[calc(100vh-6rem)] w-64 shrink-0 overflow-y-auto border-r pr-8">
                            <SiteSidebar />
                        </aside>

                        {/* Main Content */}
                        <main className="flex-1 min-w-0 max-w-4xl">
                            {children}
                        </main>
                    </div>
                </div>
            </div>
        </div>
    )
}
