import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => ReactNode);
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
}

export function DataTable<T extends { id: string | number }>({
  columns,
  data,
  onRowClick,
}: DataTableProps<T>) {
  return (
    <div className="premium-card overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40 border-b">
              {columns.map((col, i) => (
                <TableHead key={i} className={cn(
                  "text-[11px] font-semibold uppercase tracking-[0.06em] text-muted-foreground h-11 first:pl-4 last:pr-4",
                  col.className
                )}>
                  {col.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow
                key={row.id}
                className={cn(
                  "h-[52px] text-sm transition-colors duration-100 border-b border-border/50 last:border-0",
                  onRowClick && "cursor-pointer",
                  "hover:bg-accent/40"
                )}
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((col, colIndex) => (
                  <TableCell key={colIndex} className={cn("first:pl-4 last:pr-4 py-3", col.className)}>
                    {typeof col.accessor === "function"
                      ? col.accessor(row)
                      : (row[col.accessor] as ReactNode)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            {data.length === 0 && (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center py-12 text-muted-foreground">
                  <div className="flex flex-col items-center gap-2">
                    <Package className="h-8 w-8 text-muted-foreground/40" />
                    <p>Nenhum registro encontrado</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

import { Package } from "lucide-react";
