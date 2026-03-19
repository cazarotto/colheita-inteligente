import { cn } from "@/lib/utils";

type Status = "plantio" | "colheita" | "concluido" | "pendente" | "em_andamento" | "pago" | "vencido" | "aberto";

const statusConfig: Record<Status, { label: string; className: string }> = {
  plantio: { label: "Plantio", className: "bg-status-plantio/15 text-status-plantio" },
  colheita: { label: "Colheita", className: "bg-status-colheita/15 text-status-colheita" },
  concluido: { label: "Concluído", className: "bg-status-concluido/15 text-status-concluido" },
  pendente: { label: "Pendente", className: "bg-status-pendente/15 text-status-pendente" },
  em_andamento: { label: "Em Andamento", className: "bg-status-plantio/15 text-status-plantio" },
  pago: { label: "Pago", className: "bg-status-concluido/15 text-status-concluido" },
  vencido: { label: "Vencido", className: "bg-financial-pagar/15 text-financial-pagar" },
  aberto: { label: "Aberto", className: "bg-status-colheita/15 text-status-colheita" },
};

export function StatusBadge({ status }: { status: Status }) {
  const config = statusConfig[status];
  return (
    <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium inline-block", config.className)}>
      {config.label}
    </span>
  );
}
