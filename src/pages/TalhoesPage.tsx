import { PageHeader } from "@/components/PageHeader";
import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const talhoes = [
  { id: "1", codigo: "T-01", nome: "Cerrado", area: "320 ha", cultura: "Soja", solo: "Latossolo Vermelho", cor: "bg-primary" },
  { id: "2", codigo: "T-02", nome: "Vargem", area: "180 ha", cultura: "Milho Safrinha", solo: "Cambissolo", cor: "bg-status-colheita" },
  { id: "3", codigo: "T-03", nome: "Barreiro", area: "250 ha", cultura: "Soja", solo: "Latossolo Amarelo", cor: "bg-primary" },
  { id: "4", codigo: "T-04", nome: "Morro Alto", area: "200 ha", cultura: "Algodão", solo: "Latossolo Vermelho", cor: "bg-status-plantio" },
  { id: "5", codigo: "T-05", nome: "Chapada", area: "280 ha", cultura: "Soja", solo: "Neossolo", cor: "bg-primary" },
  { id: "6", codigo: "T-06", nome: "Brejo", area: "220 ha", cultura: "Milho", solo: "Gleissolo", cor: "bg-status-colheita" },
];

export default function TalhoesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Talhões"
        description="Áreas de produção da fazenda"
        actions={
          <Button size="sm" className="gap-1.5">
            <Plus className="h-4 w-4" strokeWidth={2.5} />
            Novo Talhão
          </Button>
        }
      />

      <DataTable
        columns={[
          { header: "Código", accessor: (r) => (
            <div className="flex items-center gap-2">
              <div className={cn("h-2.5 w-2.5 rounded-full shrink-0", r.cor)} />
              <span className="font-semibold font-mono-data">{r.codigo}</span>
            </div>
          )},
          { header: "Nome", accessor: (r) => <span className="font-medium">{r.nome}</span> },
          { header: "Área", accessor: (r) => <span className="font-mono-data">{r.area}</span> },
          { header: "Cultura Atual", accessor: "cultura", className: "hidden sm:table-cell" },
          { header: "Tipo de Solo", accessor: (r) => <span className="text-muted-foreground">{r.solo}</span>, className: "hidden md:table-cell" },
        ]}
        data={talhoes}
        mobileCard={{
          title: (r) => `${r.codigo} — ${r.nome}`,
          subtitle: (r) => r.solo,
          icon: (r) => <div className={cn("h-3 w-3 rounded-full mt-1", r.cor)} />,
          fields: [
            { label: "Área", accessor: (r) => <span className="font-mono-data font-semibold">{r.area}</span> },
            { label: "Cultura", accessor: "cultura" },
          ],
        }}
      />
    </div>
  );
}
