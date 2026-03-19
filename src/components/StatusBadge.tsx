import { cn } from "@/lib/utils";

type Status = "plantio" | "colheita" | "concluido" | "pendente" | "em_andamento" | "pago" | "vencido" | "aberto";

const statusConfig: Record<Status, { label: string; dot: string; bg: string; text: string }> = {
  plantio: { label: "Plantio", dot: "bg-status-plantio", bg: "bg-status-plantio/10", text: "text-status-plantio" },
  colheita: { label: "Colheita", dot: "bg-status-colheita", bg: "bg-status-colheita/10", text: "text-status-colheita" },
  concluido: { label: "Concluído", dot: "bg-status-concluido", bg: "bg-status-concluido/10", text: "text-status-concluido" },
  pendente: { label: "Pendente", dot: "bg-status-pendente", bg: "bg-status-pendente/10", text: "text-status-pendente" },
  em_andamento: { label: "Em Andamento", dot: "bg-status-plantio", bg: "bg-status-plantio/10", text: "text-status-plantio" },
  pago: { label: "Pago", dot: "bg-status-concluido", bg: "bg-status-concluido/10", text: "text-status-concluido" },
  vencido: { label: "Vencido", dot: "bg-financial-pagar", bg: "bg-financial-pagar/10", text: "text-financial-pagar" },
  aberto: { label: "Aberto", dot: "bg-status-colheita", bg: "bg-status-colheita/10", text: "text-status-colheita" },
};

export function StatusBadge({ status }: { status: Status }) {
  const config = statusConfig[status];
  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider whitespace-nowrap transition-colors duration-200",
      config.bg, config.text
    )}>
      <span className={cn("h-1.5 w-1.5 rounded-full shrink-0 shadow-[0_0_4px_currentColor/0.3]", config.dot)} />
      {config.label}
    </span>
  );
}
