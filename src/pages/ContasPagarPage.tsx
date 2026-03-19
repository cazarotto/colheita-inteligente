import { PageHeader } from "@/components/PageHeader";
import { DataTable } from "@/components/DataTable";
import { StatusBadge } from "@/components/StatusBadge";
import { KPICard } from "@/components/KPICard";
import { DollarSign, AlertTriangle, CheckCircle } from "lucide-react";

const contasPagar = [
  { id: "1", descricao: "Sementes TMG 2381", fornecedor: "Agrocampo Ltda", valor: "R$ 245.000,00", vencimento: "20/03/2026", status: "aberto" as const },
  { id: "2", descricao: "Fertilizante MAP", fornecedor: "Heringer SA", valor: "R$ 180.500,00", vencimento: "15/03/2026", status: "vencido" as const },
  { id: "3", descricao: "Defensivo Roundup WG", fornecedor: "Bayer CropScience", valor: "R$ 92.300,00", vencimento: "25/03/2026", status: "aberto" as const },
  { id: "4", descricao: "Diesel S10", fornecedor: "BR Distribuidora", valor: "R$ 67.800,00", vencimento: "10/03/2026", status: "pago" as const },
  { id: "5", descricao: "Manutenção Colhedora", fornecedor: "JD Service", valor: "R$ 34.200,00", vencimento: "12/03/2026", status: "pago" as const },
];

export default function ContasPagarPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Contas a Pagar" description="Gestão de pagamentos e obrigações financeiras" />

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        <KPICard
          title="Total em Aberto"
          value="R$ 517,8k"
          subtitle="2 títulos pendentes"
          icon={<DollarSign className="h-4 w-4 text-primary" strokeWidth={2.5} />}
        />
        <KPICard
          title="Vencidos"
          value="R$ 180,5k"
          subtitle="1 conta vencida"
          icon={<AlertTriangle className="h-4 w-4 text-financial-pagar" strokeWidth={2.5} />}
          className="border-financial-pagar/20"
        />
        <KPICard
          title="Pagos no Mês"
          value="R$ 102k"
          trend={{ value: "12%", positive: true }}
          icon={<CheckCircle className="h-4 w-4 text-primary" strokeWidth={2.5} />}
          className="col-span-2 lg:col-span-1"
        />
      </div>

      <DataTable
        columns={[
          { header: "Descrição", accessor: (r) => <span className="font-semibold">{r.descricao}</span> },
          { header: "Fornecedor", accessor: (r) => <span className="text-muted-foreground">{r.fornecedor}</span>, className: "hidden md:table-cell" },
          { header: "Valor", accessor: (r) => <span className="font-mono-data font-semibold">{r.valor}</span> },
          { header: "Vencimento", accessor: (r) => <span className="font-mono-data text-muted-foreground">{r.vencimento}</span>, className: "hidden sm:table-cell" },
          { header: "Status", accessor: (r) => <StatusBadge status={r.status} /> },
        ]}
        data={contasPagar}
        mobileCard={{
          title: (r) => r.descricao,
          subtitle: (r) => r.fornecedor,
          badge: (r) => <StatusBadge status={r.status} />,
          fields: [
            { label: "Valor", accessor: (r) => <span className="font-mono-data font-semibold">{r.valor}</span> },
            { label: "Venc.", accessor: (r) => <span className="font-mono-data">{r.vencimento}</span> },
          ],
        }}
      />
    </div>
  );
}
