"use client"

import * as React from "react"
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live"
import { registry } from "@/registry"
import { cn } from "@/lib/utils"
import { Copy, Check, Terminal } from "lucide-react"

interface ComponentPreviewProps {
    code: string
    className?: string
}

export function ComponentPreview({ code, className }: ComponentPreviewProps) {
    const [copied, setCopied] = React.useState(false)
    const [view, setView] = React.useState<"preview" | "code">("preview")

    const onCopy = () => {
        navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    // react-live expects code that returns a React element
    // Wrap raw JSX in a function component that react-live can execute
    const wrappedCode = React.useMemo(() => {
        const trimmed = code.trim()
        
        // If code already looks like a function/component, use as-is
        if (trimmed.startsWith('function') || trimmed.startsWith('const') || trimmed.startsWith('()') || trimmed.startsWith('() =>')) {
            return code
        }
        
        // react-live needs executable code that returns JSX
        // Use function declaration format - more reliable than arrow functions
        // Single line return to avoid parsing issues
        return `function Preview() { return ${trimmed} }`
    }, [code])


    return (
        <div className={cn("group relative my-4 flex flex-col space-y-2", className)}>
            <LiveProvider 
                code={wrappedCode} 
                scope={registry}
            >
                <div className="relative rounded-lg border bg-background shadow-sm overflow-hidden">
                    <div className="flex items-center justify-between border-b p-2">
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setView("preview")}
                                className={cn(
                                    "inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
                                    view === "preview" ? "bg-muted text-foreground shadow-sm" : "text-muted-foreground hover:bg-muted/50"
                                )}
                            >
                                Preview
                            </button>
                            <button
                                onClick={() => setView("code")}
                                className={cn(
                                    "inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
                                    view === "code" ? "bg-muted text-foreground shadow-sm" : "text-muted-foreground hover:bg-muted/50"
                                )}
                            >
                                <Terminal className="mr-2 h-4 w-4" />
                                Code
                            </button>
                        </div>
                        <button
                            onClick={onCopy}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-md border bg-background text-sm font-medium transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                        >
                            {copied ? (
                                <Check className="h-4 w-4" />
                            ) : (
                                <Copy className="h-4 w-4" />
                            )}
                            <span className="sr-only">Copy code</span>
                        </button>
                    </div>

                    {view === "preview" && (
                        <div className="p-10 min-h-[350px] flex items-center justify-center bg-background">
                            <div className="w-full overflow-x-auto">
                                <LivePreview className="w-full flex justify-center min-w-0" />
                            </div>
                        </div>
                    )}

                    {view === "code" && (
                        <div className="relative bg-muted/50 p-4">
                            <LiveEditor
                                className="font-mono text-sm"
                                disabled
                                style={{
                                    backgroundColor: "transparent",
                                    padding: 0,
                                }}
                            />
                        </div>
                    )}

                    <LiveError className="rounded-b-md bg-destructive/10 p-4 text-sm text-destructive" />
                </div>
            </LiveProvider>
        </div>
    )
}
