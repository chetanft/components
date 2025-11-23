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

    // Format JSX code with proper indentation
    const formatJSX = React.useCallback((jsxCode: string): string => {
        let formatted = jsxCode.trim()
        
        // Format arrays in props - find prop={[...]} and format array items
        // Use manual parsing to handle nested structures
        let searchPos = 0
        while (true) {
            const arrayStart = formatted.indexOf('={[', searchPos)
            if (arrayStart === -1) break
            
            // Find prop name - look backwards from ={[
            let propEnd = arrayStart
            let propStart = propEnd
            // Find the = before {[
            while (propStart > 0 && formatted[propStart] !== '=') {
                propStart--
            }
            if (propStart === 0) {
                searchPos = arrayStart + 3
                continue
            }
            // Extract prop name (word characters before =)
            const propMatch = formatted.substring(0, propStart).match(/(\w+)\s*$/)
            if (!propMatch) {
                searchPos = arrayStart + 3
                continue
            }
            const propName = propMatch[1]
            
            // Parse array content manually to handle nested structures
            let bracketDepth = 1 // Start inside [
            let braceDepth = 1 // Start inside {
            let inString = false
            let stringChar = ''
            let i = arrayStart + 3
            const items: string[] = []
            let currentItem = ''
            
            while (i < formatted.length) {
                const char = formatted[i]
                const prevChar = i > 0 ? formatted[i - 1] : ''
                
                // Track strings
                if ((char === '"' || char === "'") && prevChar !== '\\') {
                    if (!inString) {
                        inString = true
                        stringChar = char
                    } else if (char === stringChar) {
                        inString = false
                        stringChar = ''
                    }
                }
                
                if (!inString) {
                    if (char === '[') bracketDepth++
                    if (char === ']') bracketDepth--
                    if (char === '{') braceDepth++
                    if (char === '}') braceDepth--
                    
                    // Check if we've reached the end: ]}
                    if (bracketDepth === 0 && braceDepth === 0) {
                        // We've hit ]}, process the last item if exists
                        const lastItem = currentItem.trim()
                        if (lastItem) items.push(lastItem)
                        i++ // Skip past the }
                        break
                    }
                    
                    currentItem += char
                    
                    // When we're at the array level (bracketDepth=1) and object level (braceDepth=1)
                    // and hit a comma, we have an item boundary
                    if (bracketDepth === 1 && braceDepth === 1 && char === ',') {
                        const item = currentItem.slice(0, -1).trim() // Remove comma
                        if (item) items.push(item)
                        currentItem = ''
                    }
                } else {
                    currentItem += char
                }
                
                i++
            }
            
            // Format if multiple items
            if (items.length > 1) {
                const formattedItems = items.map((item, idx) => {
                    return `    ${item}${idx < items.length - 1 ? ',' : ''}`
                }).join('\n')
                const replacement = `${propName}={[\n${formattedItems}\n  ]}`
                formatted = formatted.substring(0, propStart) + replacement + formatted.substring(i)
                searchPos = propStart + replacement.length
            } else {
                searchPos = arrayStart + 3
            }
        }
        
        // Format component props - break into multiple lines if many props
        formatted = formatted.replace(/<(\w+)([^>]+)\/>/g, (match, tagName, props) => {
            // Extract individual props (handling quoted strings and expressions)
            const propRegex = /(\w+)=(?:"[^"]*"|'[^']*'|\{[^}]+\}|\w+)/g
            const propMatches: string[] = []
            let lastIndex = 0
            
            let m
            while ((m = propRegex.exec(props)) !== null) {
                propMatches.push(m[0])
                lastIndex = propRegex.lastIndex
            }
            
            // If we have 4+ props, format them on separate lines
            if (propMatches.length >= 4) {
                const formattedProps = propMatches.map(prop => `\n    ${prop}`).join('')
                return `<${tagName}${formattedProps}\n  />`
            }
            
            return match
        })
        
        return formatted
    }, [])

    // react-live expects code that returns a React element
    // Wrap raw JSX in a function component that react-live can execute
    const wrappedCode = React.useMemo(() => {
        const trimmed = code.trim()
        
        // If code already looks like a function/component, use as-is
        if (trimmed.startsWith('function') || trimmed.startsWith('const') || trimmed.startsWith('()') || trimmed.startsWith('() =>')) {
            return code
        }
        
        // Format the JSX code
        const formattedJSX = formatJSX(trimmed)
        
        // react-live needs executable code that returns JSX
        // Use function declaration format with proper indentation
        return `function Preview() {\n  return (\n    ${formattedJSX}\n  )\n}`
    }, [code, formatJSX])


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
