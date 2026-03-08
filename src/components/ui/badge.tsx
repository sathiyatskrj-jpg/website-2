import * as React from "react"
import { cn } from "@/components/ui/button"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const base = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
  
  let variantStyles = "border-transparent bg-primary text-primary-foreground hover:bg-primary/80"
  if (variant === "secondary") variantStyles = "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
  if (variant === "destructive") variantStyles = "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80"
  if (variant === "outline") variantStyles = "text-foreground"

  return (
    <div className={cn(base, variantStyles, className)} {...props} />
  )
}

export { Badge }
