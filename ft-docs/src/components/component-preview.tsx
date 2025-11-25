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

        // Skip array formatting - it causes parsing issues with react-live
        // Arrays are already formatted as single lines from component-metadata.ts

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
        let trimmed = code.trim()

        // Strip import statements (components are available via registry scope)
        trimmed = trimmed.replace(/^import\s+.*?from\s+["'][^"']+["'];?\s*\n?/gm, '')

        // Check if code is already a function/component/IIFE - use as-is BEFORE const extraction
        // This prevents const extraction from breaking IIFE patterns
        if (trimmed.startsWith('function') || (trimmed.startsWith('const') && !trimmed.includes('<')) || trimmed.startsWith('()') || trimmed.startsWith('() =>') || trimmed.startsWith('(() =>')) {
            return trimmed
        }

        // Extract const declarations and move them before return statement
        const constDeclarations: string[] = []
        const lines = trimmed.split('\n')
        const jsxLines: string[] = []
        let i = 0

        while (i < lines.length) {
            const line = lines[i]
            const trimmedLine = line.trim()

            if (trimmedLine.startsWith('const ')) {
                // Found a const declaration - extract it completely
                let braceDepth = 0
                let bracketDepth = 0
                let inString = false
                let stringChar = ''
                let constLines: string[] = []
                let foundStart = false
                let startIdx = i

                // Process lines until we find the end of the const declaration
                for (let j = i; j < lines.length; j++) {
                    const currentLine = lines[j]
                    const currentTrimmed = currentLine.trim()
                    constLines.push(currentLine)

                    // Track braces/brackets to find end
                    for (let k = 0; k < currentLine.length; k++) {
                        const char = currentLine[k]
                        const prevChar = k > 0 ? currentLine[k - 1] : ''

                        if ((char === '"' || char === "'" || char === '`') && prevChar !== '\\') {
                            if (!inString) {
                                inString = true
                                stringChar = char
                            } else if (char === stringChar) {
                                inString = false
                                stringChar = ''
                            }
                        }

                        if (!inString) {
                            if (char === '{') {
                                braceDepth++
                                foundStart = true
                            }
                            if (char === '}') braceDepth--
                            if (char === '[') bracketDepth++
                            if (char === ']') bracketDepth--
                        }
                    }

                    // Check if const declaration is complete
                    const endsWithSemicolon = currentTrimmed.endsWith(';')
                    // Look ahead for JSX (skip blank lines)
                    let nextNonEmptyIdx = j + 1
                    while (nextNonEmptyIdx < lines.length && lines[nextNonEmptyIdx].trim() === '') {
                        nextNonEmptyIdx++
                    }
                    const nextLineIsJSX = nextNonEmptyIdx < lines.length && lines[nextNonEmptyIdx].trim().startsWith('<')

                    if (foundStart && braceDepth === 0 && bracketDepth === 0 && (endsWithSemicolon || nextLineIsJSX)) {
                        // Complete const declaration found
                        let declaration = constLines.join('\n').trim()
                        // Remove trailing blank lines
                        while (declaration.endsWith('\n') || declaration.split('\n').pop()?.trim() === '') {
                            declaration = declaration.trimEnd()
                        }
                        if (!declaration.endsWith(';')) {
                            declaration += ';'
                        }
                        constDeclarations.push(declaration)
                        i = nextNonEmptyIdx // Skip to JSX
                        break
                    }
                }

                // If we didn't find the end, skip this const (malformed)
                if (i === startIdx) {
                    i++
                }
            } else if (trimmedLine.startsWith('<')) {
                // JSX starts here - add all remaining lines
                jsxLines.push(...lines.slice(i))
                break
            } else {
                // Skip blank lines between const and JSX
                i++
            }
        }

        trimmed = jsxLines.join('\n').trim()

        // Transform string prop references to variable references for react-live
        // Handle both double and single quotes: options="sampleOptions" or options='sampleOptions' -> options={sampleOptions}
        trimmed = trimmed.replace(/options=["']sampleOptions["']/g, 'options={sampleOptions}')
        // Handle buttons prop: buttons="sampleButtons" -> buttons={sampleButtons}
        trimmed = trimmed.replace(/buttons=["']sampleButtons["']/g, 'buttons={sampleButtons}')
        // Handle baseOptions references - transform to baseOptions (for RadioSelector)
        trimmed = trimmed.replace(/options=["']baseOptions["']/g, 'options={baseOptions}')
        // Handle variable references without quotes
        trimmed = trimmed.replace(/options=\{baseOptions\}/g, 'options={baseOptions}')
        trimmed = trimmed.replace(/options=\{sampleOptions\}/g, 'options={sampleOptions}')

        // Pattern check already done above before const extraction
        // This check is now redundant but kept for safety

        // Format the JSX code (this might reformat, so we need to re-apply transformation after)
        let formattedJSX = formatJSX(trimmed.trim())

        // Re-apply transformation after formatting in case formatJSX changed it
        formattedJSX = formattedJSX.replace(/options=["']sampleOptions["']/g, 'options={sampleOptions}')
        formattedJSX = formattedJSX.replace(/buttons=["']sampleButtons["']/g, 'buttons={sampleButtons}')
        formattedJSX = formattedJSX.replace(/options=["']baseOptions["']/g, 'options={sampleOptions}')

        // react-live needs executable code that returns JSX
        // Use function declaration format with proper indentation
        // Include const declarations before return if they exist
        const constsBlock = constDeclarations.length > 0
            ? constDeclarations.map(c => {
                // Indent each line of the const declaration with 2 spaces
                return c.split('\n').map(line => `  ${line}`).join('\n')
            }).join('\n') + '\n'
            : ''

        return `function Preview() {\n${constsBlock}  return (\n    ${formattedJSX}\n  )\n}`
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
