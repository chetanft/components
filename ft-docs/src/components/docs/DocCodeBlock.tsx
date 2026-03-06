"use client"

import { CodeBlock } from "@/components/code-block"

interface DocCodeBlockProps {
  code: string
  lang?: string
  filename?: string
  className?: string
}

export function DocCodeBlock({ code, lang = "bash", filename, className }: DocCodeBlockProps) {
  return <CodeBlock code={code} lang={lang} filename={filename} className={className} />
}
