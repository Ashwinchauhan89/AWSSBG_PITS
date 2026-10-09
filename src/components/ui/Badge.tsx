import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "orange" | "blue" | "green" | "purple" | "slate" | "outline";
  size?: "sm" | "md";
}

export function Badge({
  className,
  variant = "orange",
  size = "md",
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    orange:
      "bg-amber-500/10 text-amber-400 border-amber-500/30",
    blue:
      "bg-sky-500/10 text-sky-400 border-sky-500/30",
    green:
      "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    purple:
      "bg-purple-500/10 text-purple-400 border-purple-500/30",
    slate:
      "bg-slate-800 text-slate-300 border-slate-700",
    outline:
      "bg-transparent text-slate-300 border-slate-600",
  };

  const sizeStyles = {
    sm: "text-[11px] px-2 py-0.5 font-medium",
    md: "text-xs px-2.5 py-1 font-medium",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border tracking-wide",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
