import { PageHeader } from "@/components/PageHeader";
import { DataTable } from "@/components/DataTable";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

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

      <DataTable
        columns={[
          { header: "Máquina", accessor: (r) => (
            <div>
              <span className="font-semibold block">{r.nome}</span>
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
        mobileCard={{
          title: (r) => r.nome,
          subtitle: (r) => `${r.tipo} · ${r.ano}`,
          badge: (r) => <StatusBadge status={r.status} />,
          fields: [
            { label: "Horas", accessor: (r) => <span className="font-mono-data">{r.horasMotor}</span> },
            { label: "Operador", accessor: "operador" },
          ],
        }}
      />
    </div>
  );
}
