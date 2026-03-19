import { PageHeader } from "@/components/PageHeader";
import { DataTable } from "@/components/DataTable";
import { StatusBadge } from "@/components/StatusBadge";
import { KPICard } from "@/components/KPICard";
import { DollarSign, TrendingUp } from "lucide-react";

const contasReceber = [
  { id: "1", descricao: "Venda Soja - Lote 01", cliente: "Cargill", valor: "R$ 580.000,00", vencimento: "30/03/2026", status: "aberto" as const },
  { id: "2", descricao: "Venda Milho - Lote 03", cliente: "ADM", valor: "R$ 340.000,00", vencimento: "15/04/2026", status: "aberto" as const },
  { id: "3", descricao: "Venda Soja - Lote 02", cliente: "Bunge", valor: "R$ 420.000,00", vencimento: "10/03/2026", status: "pago" as const },
];

export default function ContasReceberPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Contas a Receber" description="Gestão de recebíveis e vendas futuras" />

      <div className="grid grid-cols-2 gap-3 md:gap-4">
        <KPICard
          title="A Receber"
          value="R$ 920.000"
          subtitle="2 títulos em aberto"
          trend={{ value: "18%", positive: true }}
          icon={<TrendingUp className="h-4 w-4 text-primary" strokeWidth={2.5} />}
          variant="highlight"
        />
        <KPICard
          title="Recebido (mês)"
          value="R$ 420.000"
          subtitle="1 título quitado"
          icon={<DollarSign className="h-4 w-4 text-primary" strokeWidth={2.5} />}
        />
      </div>

      <DataTable
        columns={[
          { header: "Descrição", accessor: (r) => <span className="font-medium">{r.descricao}</span> },
          { header: "Cliente", accessor: (r) => <span className="text-muted-foreground">{r.cliente}</span>, className: "hidden md:table-cell" },
          { header: "Valor", accessor: (r) => <span className="font-mono-data font-semibold text-financial-receber">{r.valor}</span> },
          { header: "Vencimento", accessor: (r) => <span className="font-mono-data text-muted-foreground">{r.vencimento}</span>, className: "hidden sm:table-cell" },
          { header: "Status", accessor: (r) => <StatusBadge status={r.status} /> },
        ]}
        data={contasReceber}
      />
    </div>
  );
}
