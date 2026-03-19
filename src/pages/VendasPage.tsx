import { PageHeader } from "@/components/PageHeader";
import { DataTable } from "@/components/DataTable";
import { StatusBadge } from "@/components/StatusBadge";
import { KPICard } from "@/components/KPICard";
import { Button } from "@/components/ui/button";
import { Plus, ShoppingCart, TrendingUp } from "lucide-react";

const vendas = [
  { id: "1", produto: "Soja Grão", comprador: "Cargill", quantidade: "2.500 ton", preco: "R$ 135,00/sc", total: "R$ 580.000,00", data: "01/03/2026", status: "concluido" as const },
  { id: "2", produto: "Milho Grão", comprador: "ADM", quantidade: "1.800 ton", preco: "R$ 72,00/sc", total: "R$ 340.000,00", data: "05/03/2026", status: "em_andamento" as const },
  { id: "3", produto: "Soja Grão", comprador: "Bunge", quantidade: "3.000 ton", preco: "R$ 138,00/sc", total: "R$ 710.000,00", data: "10/03/2026", status: "pendente" as const },
];

export default function VendasPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Vendas"
        description="Comercialização da produção"
        actions={
          <Button size="sm" className="gap-1.5">
            <Plus className="h-4 w-4" strokeWidth={2.5} />
            Nova Venda
          </Button>
        }
      />

      <div className="grid grid-cols-2 gap-3 md:gap-4">
        <KPICard title="Vendas (safra)" value="R$ 1,63M" subtitle="3 contratos" trend={{ value: "22%", positive: true }} icon={<ShoppingCart className="h-4 w-4 text-primary" strokeWidth={2.5} />} />
        <KPICard title="Preço Médio Soja" value="R$ 136,50" subtitle="por saca (60 kg)" trend={{ value: "4,2%", positive: true }} icon={<TrendingUp className="h-4 w-4 text-primary" strokeWidth={2.5} />} />
      </div>

      <DataTable
        columns={[
          { header: "Produto", accessor: (r) => <span className="font-semibold">{r.produto}</span> },
          { header: "Comprador", accessor: (r) => <span className="text-muted-foreground">{r.comprador}</span> },
          { header: "Qtd.", accessor: (r) => <span className="font-mono-data">{r.quantidade}</span>, className: "hidden sm:table-cell" },
          { header: "Preço", accessor: (r) => <span className="font-mono-data text-muted-foreground">{r.preco}</span>, className: "hidden md:table-cell" },
          { header: "Total", accessor: (r) => <span className="font-mono-data font-semibold">{r.total}</span> },
          { header: "Status", accessor: (r) => <StatusBadge status={r.status} /> },
        ]}
        data={vendas}
        mobileCard={{
          title: (r) => `${r.produto} — ${r.comprador}`,
          subtitle: (r) => `${r.quantidade} · ${r.preco}`,
          badge: (r) => <StatusBadge status={r.status} />,
          fields: [
            { label: "Total", accessor: (r) => <span className="font-mono-data font-semibold">{r.total}</span> },
          ],
        }}
      />
    </div>
  );
}
