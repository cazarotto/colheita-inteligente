import { PageHeader } from "@/components/PageHeader";
import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const operadores = [
  { id: "1", nome: "João Silva", funcao: "Operador de Máquinas", contato: "(34) 99123-4567", status: "Ativo", admissao: "15/01/2020" },
  { id: "2", nome: "Carlos Mendes", funcao: "Operador de Pulverização", contato: "(34) 99234-5678", status: "Ativo", admissao: "03/06/2019" },
  { id: "3", nome: "Pedro Santos", funcao: "Operador de Máquinas", contato: "(34) 99345-6789", status: "Ativo", admissao: "20/08/2021" },
  { id: "4", nome: "José Almeida", funcao: "Operador de Colhedora", contato: "(34) 99456-7890", status: "Ativo", admissao: "10/03/2018" },
  { id: "5", nome: "Marcos Lima", funcao: "Operador de Pulverização", contato: "(34) 99567-8901", status: "Férias", admissao: "25/11/2022" },
];

export default function OperadoresPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Operadores"
        description="Cadastro de operadores e colaboradores"
        actions={
          <Button size="sm">
            <Plus className="h-4 w-4 mr-1" strokeWidth={2.5} />
            Novo Operador
          </Button>
        }
      />
      <DataTable
        columns={[
          { header: "Nome", accessor: (r) => <span className="font-medium">{r.nome}</span> },
          { header: "Função", accessor: "funcao" },
          { header: "Contato", accessor: (r) => <span className="font-mono-data">{r.contato}</span>, className: "hidden md:table-cell" },
          { header: "Admissão", accessor: (r) => <span className="font-mono-data">{r.admissao}</span>, className: "hidden lg:table-cell" },
          { header: "Status", accessor: "status" },
        ]}
        data={operadores}
      />
    </div>
  );
}
