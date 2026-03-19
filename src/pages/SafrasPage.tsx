import { PageHeader } from "@/components/PageHeader";
import { DataTable } from "@/components/DataTable";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Plus, Wheat } from "lucide-react";

const safras = [
  { id: "1", nome: "Safra 2025/26", periodo: "Set/2025 – Ago/2026", cultura: "Soja / Milho Safrinha", area: "1.450 ha", status: "em_andamento" as const },
  { id: "2", nome: "Safra 2024/25", periodo: "Set/2024 – Ago/2025", cultura: "Soja / Milho Safrinha", area: "1.380 ha", status: "concluido" as const },
  { id: "3", nome: "Safra 2023/24", periodo: "Set/2023 – Ago/2024", cultura: "Soja / Algodão", area: "1.320 ha", status: "concluido" as const },
];

export default function SafrasPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Safras"
        description="Gerenciamento de safras e ciclos produtivos"
        actions={
          <Button size="sm" className="gap-1.5">
            <Plus className="h-4 w-4" strokeWidth={2.5} />
            Nova Safra
          </Button>
        }
      />

      {/* Quick stat */}
      <div className="flex items-center gap-4 p-4 premium-card">
        <div className="h-10 w-10 rounded-xl bg-accent flex items-center justify-center">
          <Wheat className="h-5 w-5 text-primary" strokeWidth={2} />
        </div>
        <div>
          <p className="text-sm font-semibold">3 safras cadastradas</p>
          <p className="text-xs text-muted-foreground">1 em andamento · 2 concluídas</p>
        </div>
      </div>

      <DataTable
        columns={[
          { header: "Nome", accessor: (r) => <span className="font-medium">{r.nome}</span> },
          { header: "Período", accessor: (r) => <span className="font-mono-data text-muted-foreground">{r.periodo}</span>, className: "hidden sm:table-cell" },
          { header: "Cultura", accessor: "cultura", className: "hidden md:table-cell" },
          { header: "Área", accessor: (r) => <span className="font-mono-data font-medium">{r.area}</span> },
          { header: "Status", accessor: (r) => <StatusBadge status={r.status} /> },
        ]}
        data={safras}
      />
    </div>
  );
}
