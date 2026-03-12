"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { highlightCode } from "@/lib/highlight"
import { useTheme } from "next-themes"
import { Icon, Button } from "@/registry"

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
    <div className={cn("relative group rounded-lg border border-border overflow-hidden", className)}>
      {/* Filename header */}
      {filename && (
        <div className="flex items-center border-b border-border px-4 py-2 bg-muted/50">
          <span className="text-xs font-medium text-muted-foreground">{filename}</span>
        </div>
      )}

      {/* Copy button */}
      <Button
        onClick={onCopy}
        variant="secondary"
        size="sm"
        className="absolute right-3 top-3 z-10 opacity-0 group-hover:opacity-100"
        style={{ width: 32, height: 32, padding: 0 }}
        title="Copy code"
      >
        {copied ? <Icon name="check" size={14} /> : <Icon name="copy" size={14} />}
      </Button>

      {/* Code content */}
      {html ? (
        <div
          className={cn(
            "overflow-x-auto text-sm-rem [&_pre]:p-4 [&_pre]:m-0 [&_code]:font-mono",
            "[&_.shiki]:!bg-[var(--docs-code-bg)]"
          )}
          data-theme={isDark ? "dark" : "light"}
          dangerouslySetInnerHTML={{ __html: html }}
          style={isDark ? { colorScheme: "dark" } : undefined}
        />
      ) : (
        <pre className="p-4 text-sm-rem font-mono overflow-x-auto" style={{ backgroundColor: 'var(--docs-code-bg)' }}>
          <code>{code}</code>
        </pre>
      )}
    </div>
  )
}
