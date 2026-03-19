import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Package } from "lucide-react";

interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => ReactNode);
  className?: string;
  primary?: boolean;
}

interface MobileField<T> {
  label: string;
  accessor: keyof T | ((row: T) => ReactNode);
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
  mobileCard?: {
    title: (row: T) => ReactNode;
    subtitle?: (row: T) => ReactNode;
    badge?: (row: T) => ReactNode;
    fields?: MobileField<T>[];
    icon?: (row: T) => ReactNode;
  };
}

function getValue<T>(row: T, accessor: keyof T | ((row: T) => ReactNode)): ReactNode {
  if (typeof accessor === "function") return accessor(row);
  return row[accessor] as ReactNode;
}

export function DataTable<T extends { id: string | number }>({
  columns,
  data,
  onRowClick,
  mobileCard,
}: DataTableProps<T>) {
  return (
    <>
      {/* Mobile Card View */}
      {mobileCard && (
        <div className="md:hidden space-y-2.5">
          {data.map((row) => (
            <div
              key={row.id}
              className="premium-card p-4 active:scale-[0.99] transition-transform"
              onClick={() => onRowClick?.(row)}
            >
              <div className="flex items-start gap-3">
                {mobileCard.icon && (
                  <div className="mt-0.5 shrink-0">{mobileCard.icon(row)}</div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="font-semibold text-sm text-foreground truncate">{mobileCard.title(row)}</div>
                      {mobileCard.subtitle && (
                        <div className="text-xs text-muted-foreground mt-0.5">{mobileCard.subtitle(row)}</div>
                      )}
                    </div>
                    {mobileCard.badge && (
                      <div className="shrink-0">{mobileCard.badge(row)}</div>
                    )}
                  </div>
                  {mobileCard.fields && mobileCard.fields.length > 0 && (
                    <div className="flex flex-wrap gap-x-5 gap-y-1.5 mt-3 pt-3 border-t border-border/40">
                      {mobileCard.fields.map((field, i) => (
                        <div key={i} className="flex items-baseline gap-1.5">
                          <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                            {field.label}
                          </span>
                          <span className="text-[12px] font-medium text-foreground">
                            {getValue(row, field.accessor)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          {data.length === 0 && (
            <div className="premium-card py-16 flex flex-col items-center gap-3 text-muted-foreground">
              <div className="h-12 w-12 rounded-2xl bg-muted flex items-center justify-center">
                <Package className="h-6 w-6 opacity-40" />
              </div>
              <p className="text-sm font-medium">Nenhum registro encontrado</p>
            </div>
          )}
        </div>
      )}

      {/* Desktop Table View */}
      <div className={cn("premium-card overflow-hidden", mobileCard ? "hidden md:block" : "block")}>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40 border-b">
                {columns.map((col, i) => (
                  <TableHead key={i} className={cn(
                    "text-[11px] font-bold uppercase tracking-[0.08em] text-muted-foreground h-11 first:pl-5 last:pr-5",
                    col.className
                  )}>
                    {col.header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row) => (
                <TableRow
                  key={row.id}
                  className={cn(
                    "h-[52px] text-sm transition-colors duration-100 border-b border-border/30 last:border-0",
                    onRowClick && "cursor-pointer",
                    "hover:bg-accent/20"
                  )}
                  onClick={() => onRowClick?.(row)}
                >
                  {columns.map((col, colIndex) => (
                    <TableCell key={colIndex} className={cn("first:pl-5 last:pr-5 py-3", col.className)}>
                      {getValue(row, col.accessor)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
              {data.length === 0 && (
                <TableRow>
                  <TableCell colSpan={columns.length} className="text-center py-16 text-muted-foreground">
                    <div className="flex flex-col items-center gap-3">
                      <div className="h-12 w-12 rounded-2xl bg-muted flex items-center justify-center">
                        <Package className="h-6 w-6 opacity-40" />
                      </div>
                      <p className="font-medium">Nenhum registro encontrado</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
