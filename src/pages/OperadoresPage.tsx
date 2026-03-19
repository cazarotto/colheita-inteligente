import { PageHeader } from "@/components/PageHeader";
import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Plus, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const operadores = [
  { id: "1", nome: "João Silva", funcao: "Operador de Máquinas", contato: "(34) 99123-4567", status: "Ativo", admissao: "15/01/2020", iniciais: "JS" },
  { id: "2", nome: "Carlos Mendes", funcao: "Operador de Pulverização", contato: "(34) 99234-5678", status: "Ativo", admissao: "03/06/2019", iniciais: "CM" },
  { id: "3", nome: "Pedro Santos", funcao: "Operador de Máquinas", contato: "(34) 99345-6789", status: "Ativo", admissao: "20/08/2021", iniciais: "PS" },
  { id: "4", nome: "José Almeida", funcao: "Operador de Colhedora", contato: "(34) 99456-7890", status: "Ativo", admissao: "10/03/2018", iniciais: "JA" },
  { id: "5", nome: "Marcos Lima", funcao: "Operador de Pulverização", contato: "(34) 99567-8901", status: "Férias", admissao: "25/11/2022", iniciais: "ML" },
];

export default function OperadoresPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Operadores"
        description="Cadastro de operadores e colaboradores"
        actions={
          <Button size="sm" className="gap-1.5">
            <Plus className="h-4 w-4" strokeWidth={2.5} />
            Novo Operador
          </Button>
        }
      />

      <div className="flex items-center gap-4 p-4 premium-card">
        <div className="h-10 w-10 rounded-xl bg-accent flex items-center justify-center">
          <Users className="h-5 w-5 text-primary" strokeWidth={2} />
        </div>
        <div>
          <p className="text-sm font-semibold">5 operadores cadastrados</p>
          <p className="text-xs text-muted-foreground">4 ativos · 1 em férias</p>
        </div>
      </div>

      <DataTable
        columns={[
          { header: "Operador", accessor: (r) => (
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center shrink-0">
                <span className="text-[11px] font-bold text-accent-foreground">{r.iniciais}</span>
              </div>
              <div>
                <span className="font-medium block">{r.nome}</span>
                <span className="text-[11px] text-muted-foreground md:hidden">{r.funcao}</span>
              </div>
            </div>
          )},
          { header: "Função", accessor: (r) => <span className="text-muted-foreground">{r.funcao}</span>, className: "hidden md:table-cell" },
          { header: "Contato", accessor: (r) => <span className="font-mono-data text-sm">{r.contato}</span>, className: "hidden md:table-cell" },
          { header: "Admissão", accessor: (r) => <span className="font-mono-data text-muted-foreground">{r.admissao}</span>, className: "hidden lg:table-cell" },
          { header: "Status", accessor: (r) => (
            <span className={cn(
              "px-2.5 py-1 rounded-full text-[11px] font-semibold",
              r.status === "Ativo" ? "bg-status-concluido/10 text-status-concluido" : "bg-status-colheita/10 text-status-colheita"
            )}>
              {r.status}
            </span>
          )},
        ]}
        data={operadores}
      />
    </div>
  );
}
