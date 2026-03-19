import { PageHeader } from "@/components/PageHeader";
import { DataTable } from "@/components/DataTable";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Plus, SprayCan } from "lucide-react";

const pulverizacoes = [
  { id: "1", talhao: "T-01 Cerrado", produto: "Roundup WG", dosagem: "2,5 L/ha", volume: "150 L/ha", operador: "Carlos Mendes", data: "14/03/2026", status: "concluido" as const },
  { id: "2", talhao: "T-03 Barreiro", produto: "Engeo Pleno S", dosagem: "200 mL/ha", volume: "150 L/ha", operador: "Carlos Mendes", data: "15/03/2026", status: "concluido" as const },
  { id: "3", talhao: "T-05 Chapada", produto: "Fox Xpro", dosagem: "400 mL/ha", volume: "200 L/ha", operador: "Marcos Lima", data: "18/03/2026", status: "pendente" as const },
  { id: "4", talhao: "T-02 Vargem", produto: "Priori Xtra", dosagem: "300 mL/ha", volume: "150 L/ha", operador: "Carlos Mendes", data: "20/03/2026", status: "pendente" as const },
];

export default function PulverizacoesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Pulverizações"
        description="Registro e acompanhamento de aplicações"
        actions={
          <Button size="sm" className="gap-1.5">
            <Plus className="h-4 w-4" strokeWidth={2.5} />
            Nova Pulverização
          </Button>
        }
      />

      <div className="flex items-center gap-4 p-4 premium-card">
        <div className="h-10 w-10 rounded-xl bg-accent flex items-center justify-center">
          <SprayCan className="h-5 w-5 text-primary" strokeWidth={2} />
        </div>
        <div>
          <p className="text-sm font-semibold">4 aplicações registradas</p>
          <p className="text-xs text-muted-foreground">2 concluídas · 2 pendentes</p>
        </div>
      </div>

      <DataTable
        columns={[
          { header: "Talhão", accessor: (r) => <span className="font-medium">{r.talhao}</span> },
          { header: "Produto", accessor: "produto" },
          { header: "Dosagem", accessor: (r) => <span className="font-mono-data">{r.dosagem}</span>, className: "hidden sm:table-cell" },
          { header: "Volume", accessor: (r) => <span className="font-mono-data text-muted-foreground">{r.volume}</span>, className: "hidden md:table-cell" },
          { header: "Data", accessor: (r) => <span className="font-mono-data">{r.data}</span>, className: "hidden sm:table-cell" },
          { header: "Status", accessor: (r) => <StatusBadge status={r.status} /> },
        ]}
        data={pulverizacoes}
      />
    </div>
  );
}
