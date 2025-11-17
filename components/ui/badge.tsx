import * as React from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant = "default" | "warning" | "success" | "critical" | "muted";

const variantMap: Record<BadgeVariant, string> = {
  default: "bg-slate-900/10 text-slate-900",
  warning: "bg-amber-100 text-amber-900",
  success: "bg-emerald-100 text-emerald-900",
  critical: "bg-rose-100 text-rose-900",
  muted: "bg-slate-100 text-slate-500",
};

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide",
        variantMap[variant],
        className,
      )}
      {...props}
    />
  ),
);
Badge.displayName = "Badge";

export { Badge };
