import { PageHeader } from "@/components/PageHeader";
import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Plus, BookOpen } from "lucide-react";

const catalogo = [
  { id: "1", nome: "Semente TMG 2381", categoria: "Sementes", unidade: "kg", precoRef: "R$ 49,00/kg", fabricante: "TMG" },
  { id: "2", nome: "MAP 10-46-00", categoria: "Fertilizantes", unidade: "kg", precoRef: "R$ 12,03/kg", fabricante: "Heringer" },
  { id: "3", nome: "KCL 60%", categoria: "Fertilizantes", unidade: "kg", precoRef: "R$ 8,00/kg", fabricante: "Mosaic" },
  { id: "4", nome: "Roundup WG", categoria: "Defensivos", unidade: "L", precoRef: "R$ 76,92/L", fabricante: "Bayer" },
  { id: "5", nome: "Engeo Pleno S", categoria: "Defensivos", unidade: "L", precoRef: "R$ 185,00/L", fabricante: "Syngenta" },
  { id: "6", nome: "Fox Xpro", categoria: "Defensivos", unidade: "L", precoRef: "R$ 210,00/L", fabricante: "Bayer" },
  { id: "7", nome: "Diesel S10", categoria: "Combustíveis", unidade: "L", precoRef: "R$ 6,25/L", fabricante: "Petrobras" },
];

export default function CatalogoPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Catálogo"
        description="Catálogo de insumos e materiais"
        actions={
          <Button size="sm" className="gap-1.5">
            <Plus className="h-4 w-4" strokeWidth={2.5} />
            Novo Item
          </Button>
        }
      />

      <div className="flex items-center gap-4 p-4 premium-card">
        <div className="h-10 w-10 rounded-xl bg-accent flex items-center justify-center">
          <BookOpen className="h-5 w-5 text-primary" strokeWidth={2} />
        </div>
        <div>
          <p className="text-sm font-semibold">7 itens cadastrados</p>
          <p className="text-xs text-muted-foreground">4 categorias ativas</p>
        </div>
      </div>

      <DataTable
        columns={[
          { header: "Nome", accessor: (r) => <span className="font-semibold">{r.nome}</span> },
          { header: "Categoria", accessor: (r) => <span className="text-muted-foreground">{r.categoria}</span> },
          { header: "Unidade", accessor: (r) => <span className="font-mono-data">{r.unidade}</span>, className: "hidden sm:table-cell" },
          { header: "Preço Ref.", accessor: (r) => <span className="font-mono-data font-medium">{r.precoRef}</span> },
          { header: "Fabricante", accessor: (r) => <span className="text-muted-foreground">{r.fabricante}</span>, className: "hidden md:table-cell" },
        ]}
        data={catalogo}
        mobileCard={{
          title: (r) => r.nome,
          subtitle: (r) => `${r.categoria} · ${r.fabricante}`,
          fields: [
            { label: "Preço", accessor: (r) => <span className="font-mono-data font-semibold">{r.precoRef}</span> },
            { label: "Und", accessor: "unidade" },
          ],
        }}
      />
    </div>
  );
}
