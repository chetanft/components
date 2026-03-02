"use client"

import { useState, useEffect } from "react"
import { Copy, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { highlightCode } from "@/lib/highlight"
import { useTheme } from "next-themes"

interface CodeBlockProps {
  code: string
  lang?: string
  filename?: string
  className?: string
  showLineNumbers?: boolean
}

export function CodeBlock({
  code,
  lang = "tsx",
  filename,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const [html, setHtml] = useState<string | null>(null)
  const { theme, resolvedTheme } = useTheme()

  const currentTheme = resolvedTheme || theme || "light"
  const isDark = currentTheme === "dark" || currentTheme === "night"

  useEffect(() => {
    highlightCode(code, lang).then(setHtml)
  }, [code, lang])

  const onCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={cn("relative group rounded-lg border overflow-hidden", className)}>
      {/* Filename header */}
      {filename && (
        <div className="flex items-center border-b px-4 py-2 bg-muted/50">
          <span className="text-xs font-medium text-muted-foreground">{filename}</span>
        </div>
      )}

      {/* Copy button */}
      <button
        onClick={onCopy}
        className="absolute right-3 top-3 z-10 inline-flex h-8 w-8 items-center justify-center rounded-md border bg-background text-sm-rem font-medium transition-all opacity-0 group-hover:opacity-100 hover:bg-muted"
        title="Copy code"
      >
        {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      </button>

      {/* Code content */}
      {html ? (
        <div
          className={cn(
            "overflow-x-auto text-sm-rem [&_pre]:p-4 [&_pre]:m-0 [&_code]:font-mono",
            isDark
              ? "[&_.shiki]:!bg-[var(--bg-secondary)]"
              : "[&_.shiki]:!bg-[var(--bg-secondary)]"
          )}
          data-theme={isDark ? "dark" : "light"}
          dangerouslySetInnerHTML={{ __html: html }}
          style={isDark ? { colorScheme: "dark" } : undefined}
        />
      ) : (
        <pre className="p-4 text-sm-rem font-mono overflow-x-auto" style={{ backgroundColor: 'var(--bg-secondary)' }}>
          <code>{code}</code>
        </pre>
      )}
    </div>
  )
}
