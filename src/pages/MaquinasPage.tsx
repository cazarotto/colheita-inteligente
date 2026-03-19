import { PageHeader } from "@/components/PageHeader";
import { DataTable } from "@/components/DataTable";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Plus, Wrench } from "lucide-react";

const maquinas = [
  { id: "1", nome: "John Deere 8R 370", tipo: "Trator", ano: "2023", horasMotor: "1.245 h", status: "em_andamento" as const, operador: "João Silva" },
  { id: "2", nome: "Massey Ferguson 8737", tipo: "Trator", ano: "2022", horasMotor: "2.100 h", status: "em_andamento" as const, operador: "Pedro Santos" },
  { id: "3", nome: "Jacto Uniport 3030", tipo: "Pulverizador", ano: "2024", horasMotor: "680 h", status: "concluido" as const, operador: "Carlos Mendes" },
  { id: "4", nome: "John Deere S790", tipo: "Colhedora", ano: "2023", horasMotor: "950 h", status: "pendente" as const, operador: "—" },
  { id: "5", nome: "Case IH Axial 8250", tipo: "Colhedora", ano: "2021", horasMotor: "3.400 h", status: "pendente" as const, operador: "—" },
];

export default function MaquinasPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Máquinas"
        description="Cadastro e controle de máquinas e equipamentos"
        actions={
          <Button size="sm" className="gap-1.5">
            <Plus className="h-4 w-4" strokeWidth={2.5} />
            Nova Máquina
          </Button>
        }
      />

      <div className="flex items-center gap-4 p-4 premium-card">
        <div className="h-10 w-10 rounded-xl bg-accent flex items-center justify-center">
          <Wrench className="h-5 w-5 text-primary" strokeWidth={2} />
        </div>
        <div>
          <p className="text-sm font-semibold">5 máquinas cadastradas</p>
          <p className="text-xs text-muted-foreground">2 em operação · 1 disponível · 2 paradas</p>
        </div>
      </div>

      <DataTable
        columns={[
          { header: "Máquina", accessor: (r) => (
            <div>
              <span className="font-medium block">{r.nome}</span>
              <span className="text-[11px] text-muted-foreground md:hidden">{r.tipo}</span>
            </div>
          )},
          { header: "Tipo", accessor: (r) => <span className="text-muted-foreground">{r.tipo}</span>, className: "hidden md:table-cell" },
          { header: "Ano", accessor: (r) => <span className="font-mono-data">{r.ano}</span>, className: "hidden sm:table-cell" },
          { header: "Horas Motor", accessor: (r) => <span className="font-mono-data">{r.horasMotor}</span>, className: "hidden md:table-cell" },
          { header: "Operador", accessor: (r) => <span className="text-muted-foreground">{r.operador}</span>, className: "hidden lg:table-cell" },
          { header: "Status", accessor: (r) => <StatusBadge status={r.status} /> },
        ]}
        data={maquinas}
      />
    </div>
  );
}
