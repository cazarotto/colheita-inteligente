import { PageHeader } from "@/components/PageHeader";
import { DataTable } from "@/components/DataTable";
import { StatusBadge } from "@/components/StatusBadge";
import { KPICard } from "@/components/KPICard";
import { Button } from "@/components/ui/button";
import { Plus, Factory, Wheat } from "lucide-react";

const producao = [
  { id: "1", cultura: "Soja", talhao: "T-01 Cerrado", area: "320 ha", produtividade: "68 sc/ha", prodTotal: "21.760 sc", status: "em_andamento" as const },
  { id: "2", cultura: "Milho Safrinha", talhao: "T-02 Vargem", area: "180 ha", produtividade: "148 sc/ha", prodTotal: "26.640 sc", status: "colheita" as const },
  { id: "3", cultura: "Soja", talhao: "T-03 Barreiro", area: "250 ha", produtividade: "65 sc/ha", prodTotal: "16.250 sc", status: "em_andamento" as const },
  { id: "4", cultura: "Algodão", talhao: "T-04 Morro Alto", area: "200 ha", produtividade: "280 @/ha", prodTotal: "56.000 @", status: "plantio" as const },
  { id: "5", cultura: "Soja", talhao: "T-05 Chapada", area: "280 ha", produtividade: "70 sc/ha", prodTotal: "19.600 sc", status: "em_andamento" as const },
];

export default function ProducaoPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Produção"
        description="Acompanhamento da produção por talhão"
        actions={
          <Button size="sm" className="gap-1.5">
            <Plus className="h-4 w-4" strokeWidth={2.5} />
            Registrar Produção
          </Button>
        }
      />

      <div className="grid grid-cols-2 gap-3 md:gap-4">
        <KPICard
          title="Produção Total"
          value="84.250 sc"
          subtitle="soja equivalente"
          trend={{ value: "8%", positive: true }}
          icon={<Wheat className="h-4 w-4 text-primary" strokeWidth={2.5} />}
        />
        <KPICard
          title="Área em Produção"
          value="1.230 ha"
          subtitle="de 1.450 ha plantados"
          icon={<Factory className="h-4 w-4 text-primary" strokeWidth={2.5} />}
        />
      </div>

      <DataTable
        columns={[
          { header: "Cultura", accessor: (r) => <span className="font-semibold">{r.cultura}</span> },
          { header: "Talhão", accessor: (r) => <span className="font-mono-data text-muted-foreground">{r.talhao}</span> },
          { header: "Área", accessor: (r) => <span className="font-mono-data">{r.area}</span> },
          { header: "Produtividade", accessor: (r) => <span className="font-mono-data">{r.produtividade}</span>, className: "hidden sm:table-cell" },
          { header: "Produção Total", accessor: (r) => <span className="font-mono-data font-semibold">{r.prodTotal}</span>, className: "hidden md:table-cell" },
          { header: "Status", accessor: (r) => <StatusBadge status={r.status} /> },
        ]}
        data={producao}
        mobileCard={{
          title: (r) => r.cultura,
          subtitle: (r) => r.talhao,
          badge: (r) => <StatusBadge status={r.status} />,
          fields: [
            { label: "Área", accessor: (r) => <span className="font-mono-data">{r.area}</span> },
            { label: "Prod.", accessor: (r) => <span className="font-mono-data">{r.produtividade}</span> },
            { label: "Total", accessor: (r) => <span className="font-mono-data font-semibold">{r.prodTotal}</span> },
          ],
        }}
      />
    </div>
  );
}
