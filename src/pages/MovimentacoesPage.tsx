import { PageHeader } from "@/components/PageHeader";
import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { BarChart3, ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const movimentacoes = [
  { id: "1", item: "Semente TMG 2381", tipo: "saida" as const, quantidade: "500 kg", origem: "Armazém A → T-01", responsavel: "João Silva", data: "15/03/2026" },
  { id: "2", item: "MAP 10-46-00", tipo: "saida" as const, quantidade: "2.000 kg", origem: "Armazém B → T-05", responsavel: "Pedro Santos", data: "14/03/2026" },
  { id: "3", item: "Roundup WG", tipo: "saida" as const, quantidade: "200 L", origem: "Depósito → T-03", responsavel: "Carlos Mendes", data: "14/03/2026" },
  { id: "4", item: "Diesel S10", tipo: "entrada" as const, quantidade: "5.000 L", origem: "BR Distribuidora → Tanque", responsavel: "José Almeida", data: "13/03/2026" },
  { id: "5", item: "KCL 60%", tipo: "entrada" as const, quantidade: "4.000 kg", origem: "Mosaic → Armazém B", responsavel: "Pedro Santos", data: "12/03/2026" },
];

function TipoIcon({ tipo }: { tipo: "entrada" | "saida" }) {
  return tipo === "entrada" ? (
    <div className="h-8 w-8 rounded-lg bg-status-concluido/10 flex items-center justify-center">
      <ArrowDownCircle className="h-4 w-4 text-status-concluido" strokeWidth={2} />
    </div>
  ) : (
    <div className="h-8 w-8 rounded-lg bg-financial-pagar/10 flex items-center justify-center">
      <ArrowUpCircle className="h-4 w-4 text-financial-pagar" strokeWidth={2} />
    </div>
  );
}

export default function MovimentacoesPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Movimentações" description="Entradas e saídas de estoque" />

      <div className="flex items-center gap-4 p-4 premium-card">
        <div className="h-10 w-10 rounded-xl bg-accent flex items-center justify-center">
          <BarChart3 className="h-5 w-5 text-primary" strokeWidth={2} />
        </div>
        <div>
          <p className="text-sm font-semibold">5 movimentações recentes</p>
          <p className="text-xs text-muted-foreground">2 entradas · 3 saídas</p>
        </div>
      </div>

      <DataTable
        columns={[
          { header: "Tipo", accessor: (r) => <TipoIcon tipo={r.tipo} /> },
          { header: "Item", accessor: (r) => <span className="font-semibold">{r.item}</span> },
          { header: "Qtd.", accessor: (r) => <span className={cn("font-mono-data font-medium", r.tipo === "entrada" ? "text-status-concluido" : "text-financial-pagar")}>{r.tipo === "entrada" ? "+" : "-"}{r.quantidade}</span> },
          { header: "Origem/Destino", accessor: (r) => <span className="text-muted-foreground text-xs">{r.origem}</span>, className: "hidden md:table-cell" },
          { header: "Data", accessor: (r) => <span className="font-mono-data text-muted-foreground">{r.data}</span>, className: "hidden sm:table-cell" },
        ]}
        data={movimentacoes}
        mobileCard={{
          title: (r) => r.item,
          subtitle: (r) => r.origem,
          icon: (r) => <TipoIcon tipo={r.tipo} />,
          badge: (r) => (
            <span className={cn("font-mono-data font-semibold text-sm", r.tipo === "entrada" ? "text-status-concluido" : "text-financial-pagar")}>
              {r.tipo === "entrada" ? "+" : "-"}{r.quantidade}
            </span>
          ),
          fields: [
            { label: "Data", accessor: (r) => <span className="font-mono-data">{r.data}</span> },
          ],
        }}
      />
    </div>
  );
}
