import { ReactNode } from "react"

type BannerVariant = "recommendation" | "warning" | "info" | "success"

interface DocInfoBannerProps {
  variant: BannerVariant
  children: ReactNode
}

const variantStyles: Record<BannerVariant, string> = {
  recommendation: "border-blue-300 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-200",
  warning: "border-amber-300 bg-amber-50 text-amber-900 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-200",
  info: "border-border bg-muted text-foreground",
  success: "border-green-300 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-950 dark:text-green-200",
}

export function DocInfoBanner({ variant, children }: DocInfoBannerProps) {
  return (
    <div className={`rounded-lg border p-4 text-sm-rem ${variantStyles[variant]}`}>
      {children}
    </div>
  )
}
