import { PageHeader } from "@/components/PageHeader";
import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const talhoes = [
  { id: "1", codigo: "T-01", nome: "Cerrado", area: "320 ha", cultura: "Soja", solo: "Latossolo Vermelho" },
  { id: "2", codigo: "T-02", nome: "Vargem", area: "180 ha", cultura: "Milho Safrinha", solo: "Cambissolo" },
  { id: "3", codigo: "T-03", nome: "Barreiro", area: "250 ha", cultura: "Soja", solo: "Latossolo Amarelo" },
  { id: "4", codigo: "T-04", nome: "Morro Alto", area: "200 ha", cultura: "Algodão", solo: "Latossolo Vermelho" },
  { id: "5", codigo: "T-05", nome: "Chapada", area: "280 ha", cultura: "Soja", solo: "Neossolo" },
  { id: "6", codigo: "T-06", nome: "Brejo", area: "220 ha", cultura: "Milho", solo: "Gleissolo" },
];

export default function TalhoesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Talhões"
        description="Áreas de produção da fazenda"
        actions={
          <Button size="sm">
            <Plus className="h-4 w-4 mr-1" strokeWidth={2.5} />
            Novo Talhão
          </Button>
        }
      />
      <DataTable
        columns={[
          { header: "Código", accessor: (r) => <span className="font-medium font-mono-data">{r.codigo}</span> },
          { header: "Nome", accessor: "nome" },
          { header: "Área", accessor: (r) => <span className="font-mono-data">{r.area}</span> },
          { header: "Cultura Atual", accessor: "cultura", className: "hidden sm:table-cell" },
          { header: "Tipo de Solo", accessor: "solo", className: "hidden md:table-cell" },
        ]}
        data={talhoes}
      />
    </div>
  );
}
