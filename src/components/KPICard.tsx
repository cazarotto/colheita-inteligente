import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
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
        "premium-card p-4 md:p-5 group",
        variant === "highlight" && "gradient-primary text-primary-foreground border-0",
        className
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <p className={cn(
          "text-[11px] font-semibold uppercase tracking-[0.08em]",
          variant === "highlight" ? "text-primary-foreground/70" : "text-muted-foreground"
        )}>
          {title}
        </p>
        <div className={cn(
          "h-8 w-8 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110",
          variant === "highlight" ? "bg-white/15" : "bg-accent"
        )}>
          {icon}
        </div>
      </div>
      <p className={cn(
        "text-kpi leading-none",
        variant === "highlight" ? "text-primary-foreground" : "text-foreground"
      )}>
        {value}
      </p>
      <div className="flex items-center gap-2 mt-1.5">
        {subtitle && (
          <p className={cn(
            "text-xs",
            variant === "highlight" ? "text-primary-foreground/60" : "text-muted-foreground"
          )}>
            {subtitle}
          </p>
        )}
        {trend && (
          <span className={cn(
            "text-[11px] font-semibold px-1.5 py-0.5 rounded-md",
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
