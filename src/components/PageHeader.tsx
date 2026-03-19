import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
}

export function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between mb-5 md:mb-7">
      <div>
        <h1 className="text-xl font-extrabold tracking-tight md:text-2xl text-foreground leading-tight">{title}</h1>
        {description && (
          <p className="text-[13px] text-muted-foreground mt-1 leading-relaxed font-medium">{description}</p>
        )}
      </div>
      {actions && <div className="flex gap-2 mt-3 sm:mt-0 shrink-0">{actions}</div>}
    </div>
  );
}
