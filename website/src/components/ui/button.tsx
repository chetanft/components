import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none",
  {
    variants: {
      variant: {
        primary: "bg-[var(--primary)] text-[var(--primary-foreground)] border border-[var(--primary)] rounded-md shadow-sm hover:bg-[var(--primary-hover)] hover:shadow-md hover:-translate-y-px active:translate-y-px",
        secondary: "bg-[var(--secondary)] text-[var(--secondary-foreground)] border border-[var(--border)] rounded-md hover:bg-[var(--secondary-hover)] hover:border-[var(--muted-foreground)]",
        destructive: "bg-red-500 text-white border border-red-500 rounded-md hover:bg-red-600",
        text: "hover:bg-[var(--muted)] text-[var(--foreground)] rounded-md",
        ghost: "hover:bg-[var(--muted)] text-[var(--foreground)] rounded-md",
        link: "text-[var(--foreground)] hover:text-[var(--primary-hover)] underline-offset-4 hover:underline bg-transparent",
      },
      size: {
        sm: "h-8 px-3 py-1 text-sm rounded-md",
        default: "h-10 px-4 py-2 text-sm",
        lg: "h-12 px-6 py-3 text-base rounded-md",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
