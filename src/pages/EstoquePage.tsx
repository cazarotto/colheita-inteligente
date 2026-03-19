import { PageHeader } from "@/components/PageHeader";
import { DataTable } from "@/components/DataTable";
import { KPICard } from "@/components/KPICard";
import { Button } from "@/components/ui/button";
import { Package, Plus, AlertTriangle } from "lucide-react";

const estoque = [
  { id: "1", item: "Semente TMG 2381", categoria: "Sementes", quantidade: "4.500 kg", minimo: "2.000 kg", localizacao: "Armazém A", alerta: false },
  { id: "2", item: "MAP 10-46-00", categoria: "Fertilizantes", quantidade: "12.000 kg", minimo: "5.000 kg", localizacao: "Armazém B", alerta: false },
  { id: "3", item: "KCL 60%", categoria: "Fertilizantes", quantidade: "3.200 kg", minimo: "4.000 kg", localizacao: "Armazém B", alerta: true },
  { id: "4", item: "Roundup WG", categoria: "Defensivos", quantidade: "800 L", minimo: "500 L", localizacao: "Depósito", alerta: false },
  { id: "5", item: "Engeo Pleno S", categoria: "Defensivos", quantidade: "120 L", minimo: "200 L", localizacao: "Depósito", alerta: true },
  { id: "6", item: "Diesel S10", categoria: "Combustíveis", quantidade: "8.500 L", minimo: "3.000 L", localizacao: "Tanque", alerta: false },
];

export default function EstoquePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Estoque"
        description="Controle de insumos e materiais"
        actions={
          <Button size="sm">
            <Plus className="h-4 w-4 mr-1" strokeWidth={2.5} />
            Novo Item
          </Button>
        }
      />

      <div className="grid grid-cols-2 gap-3 md:gap-4">
        <KPICard
          title="Total de Itens"
          value="6"
          icon={<Package className="h-4 w-4 text-accent-foreground" strokeWidth={2.5} />}
        />
        <KPICard
          title="Abaixo do Mínimo"
          value="2"
          subtitle="reposição necessária"
          icon={<AlertTriangle className="h-4 w-4 text-financial-pagar" strokeWidth={2.5} />}
        />
      </div>

      <DataTable
        columns={[
          { header: "Item", accessor: (r) => (
            <div className="flex items-center gap-2">
              <span className="font-medium">{r.item}</span>
              {r.alerta && <AlertTriangle className="h-3.5 w-3.5 text-financial-pagar" strokeWidth={2.5} />}
            </div>
          )},
          { header: "Categoria", accessor: "categoria", className: "hidden md:table-cell" },
          { header: "Quantidade", accessor: (r) => <span className="font-mono-data">{r.quantidade}</span> },
          { header: "Mínimo", accessor: (r) => <span className="font-mono-data text-muted-foreground">{r.minimo}</span>, className: "hidden sm:table-cell" },
          { header: "Local", accessor: "localizacao", className: "hidden lg:table-cell" },
        ]}
        data={estoque}
      />
    </div>
  );
}
