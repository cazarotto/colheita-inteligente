import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: ReactNode;
  trend?: { value: string; positive: boolean };
  className?: string;
  variant?: "default" | "highlight";
}

export function KPICard({ title, value, subtitle, icon, trend, className, variant = "default" }: KPICardProps) {
  return (
    <div
      className={cn(
        "premium-card p-4 md:p-5 group relative overflow-hidden",
        variant === "highlight" && "gradient-primary text-primary-foreground border-0 shadow-lg",
        className
      )}
    >
      {/* Hover accent glow */}
      {variant !== "highlight" && (
        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-3xl -translate-y-8 translate-x-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      )}

      <div className="flex items-start justify-between mb-2.5 relative">
        <p className={cn(
          "text-[10px] font-bold uppercase tracking-[0.12em] leading-tight",
          variant === "highlight" ? "text-primary-foreground/70" : "text-muted-foreground"
        )}>
          {title}
        </p>
        <div className={cn(
          "h-9 w-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110",
          variant === "highlight" ? "bg-white/15" : "bg-accent"
        )}>
          {icon}
        </div>
      </div>
      <p className={cn(
        "text-kpi leading-none relative",
        variant === "highlight" ? "text-primary-foreground" : "text-foreground"
      )}>
        {value}
      </p>
      <div className="flex items-center gap-2 mt-2.5 relative">
        {subtitle && (
          <p className={cn(
            "text-[11px] font-medium",
            variant === "highlight" ? "text-primary-foreground/60" : "text-muted-foreground"
          )}>
            {subtitle}
          </p>
        )}
        {trend && (
          <span className={cn(
            "text-[10px] font-extrabold px-1.5 py-0.5 rounded-md",
            trend.positive
              ? "bg-status-concluido/15 text-status-concluido"
              : "bg-financial-pagar/15 text-financial-pagar"
          )}>
            {trend.positive ? "↑" : "↓"} {trend.value}
          </span>
        )}
      </div>
    </div>
  );
}
