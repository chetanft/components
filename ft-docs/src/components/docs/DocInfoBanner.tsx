import { Alert } from "@/registry"

type BannerVariant = "recommendation" | "warning" | "info" | "success"

interface DocInfoBannerProps {
  variant: BannerVariant
  children: unknown
}

const variantMap: Record<BannerVariant, "info" | "warning" | "success"> = {
  recommendation: "info",
  warning: "warning",
  info: "info",
  success: "success",
}

export function DocInfoBanner({ variant, children }: DocInfoBannerProps) {
  return (
    <Alert variant={variantMap[variant]} className="text-sm-rem">
      {children as any}
    </Alert>
  )
}
