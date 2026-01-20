"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function ThemeTestPage() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [htmlClasses, setHtmlClasses] = useState("")
  const [computedVars, setComputedVars] = useState<Record<string, string>>({})

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const updateInfo = () => {
      setHtmlClasses(document.documentElement.className)
      
      const styles = getComputedStyle(document.documentElement)
      setComputedVars({
        '--docs-background': styles.getPropertyValue('--docs-background').trim(),
        '--docs-foreground': styles.getPropertyValue('--docs-foreground').trim(),
        '--primary': styles.getPropertyValue('--primary').trim(),
        '--bg-primary': styles.getPropertyValue('--bg-primary').trim(),
        '--bg-secondary': styles.getPropertyValue('--bg-secondary').trim(),
      })
    }

    updateInfo()
    const interval = setInterval(updateInfo, 500)
    return () => clearInterval(interval)
  }, [mounted])

  if (!mounted) {
    return <div className="p-8">Loading...</div>
  }

  return (
    <div className="min-h-screen p-8 bg-background text-foreground">
      <h1 className="text-3xl font-bold mb-6">Theme System Test</h1>

      <div className="space-y-6">
        {/* Theme Controls */}
        <div className="p-6 rounded-lg border border-border bg-card">
          <h2 className="text-xl font-semibold mb-4">Theme Controls</h2>
          <div className="flex gap-3">
            <button
              onClick={() => setTheme('light')}
              className="px-4 py-2 rounded border"
              style={{
                backgroundColor: theme === 'light' ? 'var(--primary)' : 'transparent',
                color: theme === 'light' ? 'var(--bg-primary)' : 'var(--primary)',
                borderColor: 'var(--border-primary)'
              }}
            >
              Light
            </button>
            <button
              onClick={() => setTheme('dark')}
              className="px-4 py-2 rounded border"
              style={{
                backgroundColor: theme === 'dark' ? 'var(--primary)' : 'transparent',
                color: theme === 'dark' ? 'var(--bg-primary)' : 'var(--primary)',
                borderColor: 'var(--border-primary)'
              }}
            >
              Dark
            </button>
            <button
              onClick={() => setTheme('night')}
              className="px-4 py-2 rounded border"
              style={{
                backgroundColor: theme === 'night' ? 'var(--primary)' : 'transparent',
                color: theme === 'night' ? 'var(--bg-primary)' : 'var(--primary)',
                borderColor: 'var(--border-primary)'
              }}
            >
              Night
            </button>
          </div>
        </div>

        {/* Debug Info */}
        <div className="p-6 rounded-lg border border-border bg-card">
          <h2 className="text-xl font-semibold mb-4">Debug Info</h2>
          <div className="space-y-2 font-mono text-sm">
            <div>
              <strong>Current theme:</strong> {theme || 'undefined'}
            </div>
            <div>
              <strong>HTML classes:</strong> {htmlClasses || 'none'}
            </div>
            <div>
              <strong>localStorage:</strong> {typeof window !== 'undefined' ? localStorage.getItem('theme') : 'N/A'}
            </div>
          </div>
        </div>

        {/* CSS Variables */}
        <div className="p-6 rounded-lg border border-border bg-card">
          <h2 className="text-xl font-semibold mb-4">CSS Variables</h2>
          <div className="space-y-2 font-mono text-sm">
            {Object.entries(computedVars).map(([key, value]) => (
              <div key={key} className="flex gap-4">
                <span className="text-muted-foreground">{key}:</span>
                <span>{value || '(empty)'}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Color Swatches */}
        <div className="p-6 rounded-lg border border-border bg-card">
          <h2 className="text-xl font-semibold mb-4">Color Swatches</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div 
                className="h-20 rounded border border-border mb-2"
                style={{ backgroundColor: 'var(--docs-background)' }}
              />
              <div className="text-sm">--docs-background</div>
            </div>
            <div>
              <div 
                className="h-20 rounded border border-border mb-2"
                style={{ backgroundColor: 'var(--docs-card)' }}
              />
              <div className="text-sm">--docs-card</div>
            </div>
            <div>
              <div 
                className="h-20 rounded border border-border mb-2"
                style={{ backgroundColor: 'var(--primary)' }}
              />
              <div className="text-sm">--primary</div>
            </div>
            <div>
              <div 
                className="h-20 rounded border border-border mb-2"
                style={{ backgroundColor: 'var(--bg-primary)' }}
              />
              <div className="text-sm">--bg-primary</div>
            </div>
          </div>
        </div>

        {/* Tailwind Classes Test */}
        <div className="p-6 rounded-lg border border-border bg-card">
          <h2 className="text-xl font-semibold mb-4">Tailwind Classes Test</h2>
          <div className="space-y-3">
            <div className="p-4 bg-background text-foreground border border-border rounded">
              bg-background / text-foreground
            </div>
            <div className="p-4 bg-card text-card-foreground border border-border rounded">
              bg-card / text-card-foreground
            </div>
            <div className="p-4 bg-muted text-muted-foreground border border-border rounded">
              bg-muted / text-muted-foreground
            </div>
            <div className="p-4 bg-accent text-accent-foreground border border-border rounded">
              bg-accent / text-accent-foreground
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
