import { PageHeader } from "@/components/PageHeader";
import { DataTable } from "@/components/DataTable";
import { StatusBadge } from "@/components/StatusBadge";
import { KPICard } from "@/components/KPICard";
import { Button } from "@/components/ui/button";
import { Plus, ShoppingBag, DollarSign } from "lucide-react";

const compras = [
  { id: "1", item: "Semente TMG 2381", fornecedor: "Agrocampo Ltda", quantidade: "5.000 kg", valor: "R$ 245.000,00", data: "05/02/2026", status: "concluido" as const },
  { id: "2", item: "MAP 10-46-00", fornecedor: "Heringer SA", quantidade: "15.000 kg", valor: "R$ 180.500,00", data: "12/02/2026", status: "concluido" as const },
  { id: "3", item: "Roundup WG", fornecedor: "Bayer CropScience", quantidade: "1.200 L", valor: "R$ 92.300,00", data: "20/02/2026", status: "em_andamento" as const },
  { id: "4", item: "KCL 60%", fornecedor: "Mosaic", quantidade: "8.000 kg", valor: "R$ 64.000,00", data: "15/03/2026", status: "pendente" as const },
];

export default function ComprasPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Compras"
        description="Gestão de compras e pedidos de insumos"
        actions={
          <Button size="sm" className="gap-1.5">
            <Plus className="h-4 w-4" strokeWidth={2.5} />
            Nova Compra
          </Button>
        }
      />

      <div className="grid grid-cols-2 gap-3 md:gap-4">
        <KPICard title="Total Compras" value="R$ 581.800" subtitle="safra 2025/26" icon={<ShoppingBag className="h-4 w-4 text-primary" strokeWidth={2.5} />} />
        <KPICard title="Pendentes" value="R$ 64.000" subtitle="1 pedido" icon={<DollarSign className="h-4 w-4 text-status-colheita" strokeWidth={2.5} />} />
      </div>

      <DataTable
        columns={[
          { header: "Item", accessor: (r) => <span className="font-semibold">{r.item}</span> },
          { header: "Fornecedor", accessor: (r) => <span className="text-muted-foreground">{r.fornecedor}</span>, className: "hidden md:table-cell" },
          { header: "Qtd.", accessor: (r) => <span className="font-mono-data">{r.quantidade}</span>, className: "hidden sm:table-cell" },
          { header: "Valor", accessor: (r) => <span className="font-mono-data font-semibold">{r.valor}</span> },
          { header: "Status", accessor: (r) => <StatusBadge status={r.status} /> },
        ]}
        data={compras}
        mobileCard={{
          title: (r) => r.item,
          subtitle: (r) => r.fornecedor,
          badge: (r) => <StatusBadge status={r.status} />,
          fields: [
            { label: "Qtd", accessor: "quantidade" },
            { label: "Valor", accessor: (r) => <span className="font-mono-data font-semibold">{r.valor}</span> },
          ],
        }}
      />
    </div>
  );
}
