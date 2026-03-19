import { PageHeader } from "@/components/PageHeader";
import { DataTable } from "@/components/DataTable";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const operacoes = [
  { id: "1", tipo: "Plantio Soja", talhao: "T-01 Cerrado", operador: "João Silva", maquina: "John Deere 8R", data: "15/03/2026", status: "em_andamento" as const },
  { id: "2", tipo: "Pulverização", talhao: "T-03 Barreiro", operador: "Carlos Mendes", maquina: "Uniport 3030", data: "14/03/2026", status: "concluido" as const },
  { id: "3", tipo: "Adubação", talhao: "T-05 Chapada", operador: "Pedro Santos", maquina: "MF 8737", data: "16/03/2026", status: "pendente" as const },
  { id: "4", tipo: "Colheita Milho", talhao: "T-02 Vargem", operador: "José Almeida", maquina: "S790", data: "13/03/2026", status: "colheita" as const },
  { id: "5", tipo: "Dessecação", talhao: "T-04 Morro Alto", operador: "Marcos Lima", maquina: "Uniport 3030", data: "12/03/2026", status: "concluido" as const },
  { id: "6", tipo: "Plantio Milho", talhao: "T-06 Brejo", operador: "João Silva", maquina: "John Deere 8R", data: "17/03/2026", status: "pendente" as const },
];

export default function OperacoesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Operações"
        description="Acompanhamento de operações de campo"
        actions={
          <Button size="sm" className="gap-1.5">
            <Plus className="h-4 w-4" strokeWidth={2.5} />
            Nova Operação
          </Button>
        }
      />
      <DataTable
        columns={[
          { header: "Operação", accessor: (r) => <span className="font-medium">{r.tipo}</span> },
          { header: "Talhão", accessor: (r) => <span className="font-mono-data text-muted-foreground">{r.talhao}</span> },
          { header: "Operador", accessor: "operador", className: "hidden md:table-cell" },
          { header: "Máquina", accessor: (r) => <span className="text-muted-foreground">{r.maquina}</span>, className: "hidden lg:table-cell" },
          { header: "Data", accessor: (r) => <span className="font-mono-data">{r.data}</span>, className: "hidden sm:table-cell" },
          { header: "Status", accessor: (r) => <StatusBadge status={r.status} /> },
        ]}
        data={operacoes}
      />
    </div>
  );
}
