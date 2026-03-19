import { PageHeader } from "@/components/PageHeader";
import { KPICard } from "@/components/KPICard";
import { Button } from "@/components/ui/button";
import { FileBarChart, Download, Wheat, DollarSign, TrendingUp, BarChart3 } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";

const custoData = [
  { item: "Sementes", valor: 380000 },
  { item: "Fertilizantes", valor: 520000 },
  { item: "Defensivos", valor: 290000 },
  { item: "Combustível", valor: 180000 },
  { item: "Mão de Obra", valor: 340000 },
  { item: "Manutenção", valor: 150000 },
];

const pieData = [
  { name: "Soja", value: 65, color: "hsl(142, 72%, 29%)" },
  { name: "Milho", value: 25, color: "hsl(38, 92%, 50%)" },
  { name: "Algodão", value: 10, color: "hsl(217, 91%, 60%)" },
];

export default function RelatorioIAPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Relatório IA"
        description="Análises inteligentes geradas automaticamente"
        actions={
          <Button size="sm" variant="outline" className="gap-1.5">
            <Download className="h-4 w-4" strokeWidth={2.5} />
            Exportar PDF
          </Button>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <KPICard
          title="Custo Total Safra"
          value="R$ 1,86M"
          trend={{ value: "4%", positive: false }}
          icon={<DollarSign className="h-4 w-4 text-primary" strokeWidth={2.5} />}
        />
        <KPICard
          title="Receita Estimada"
          value="R$ 2,94M"
          trend={{ value: "12%", positive: true }}
          icon={<TrendingUp className="h-4 w-4 text-primary" strokeWidth={2.5} />}
        />
        <KPICard
          title="Margem Bruta"
          value="58%"
          trend={{ value: "3pp", positive: true }}
          icon={<BarChart3 className="h-4 w-4 text-primary" strokeWidth={2.5} />}
          className="hidden sm:block"
        />
        <KPICard
          title="ROI Safra"
          value="1,58x"
          subtitle="retorno sobre investimento"
          icon={<Wheat className="h-4 w-4 text-primary" strokeWidth={2.5} />}
          className="hidden sm:block"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="premium-card p-4 md:p-5">
          <h3 className="text-sm font-semibold mb-1">Composição de Custos</h3>
          <p className="text-xs text-muted-foreground mb-4">Distribuição por categoria (R$)</p>
          <div className="h-[220px] md:h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={custoData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(150, 10%, 90%)" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: 'hsl(160, 8%, 45%)' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                <YAxis type="category" dataKey="item" tick={{ fontSize: 11, fill: 'hsl(160, 8%, 45%)' }} axisLine={false} tickLine={false} width={85} />
                <Tooltip formatter={(v: number) => `R$ ${v.toLocaleString("pt-BR")}`} />
                <Bar dataKey="valor" fill="hsl(142, 72%, 29%)" radius={[0, 4, 4, 0]} maxBarSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="premium-card p-4 md:p-5">
          <h3 className="text-sm font-semibold mb-1">Distribuição de Área</h3>
          <p className="text-xs text-muted-foreground mb-4">Participação por cultura (%)</p>
          <div className="h-[220px] md:h-[260px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={3} dataKey="value" stroke="none">
                  {pieData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: number) => `${v}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-2">
            {pieData.map((d) => (
              <div key={d.name} className="flex items-center gap-1.5 text-xs">
                <div className="h-2.5 w-2.5 rounded-full" style={{ background: d.color }} />
                <span className="text-muted-foreground">{d.name}</span>
                <span className="font-semibold font-mono-data">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Summary */}
      <div className="premium-card p-4 md:p-5 border-primary/20">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center">
            <FileBarChart className="h-4 w-4 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <h3 className="text-sm font-semibold">Resumo Gerado por IA</h3>
        </div>
        <div className="text-sm text-muted-foreground leading-relaxed space-y-2">
          <p>A Safra 2025/26 apresenta indicadores positivos. A <strong className="text-foreground">produtividade estimada de 68,2 sc/ha</strong> está 6,5% acima da safra anterior, impulsionada pelo manejo adequado nos talhões T-01 e T-05.</p>
          <p>O <strong className="text-foreground">custo por hectare de R$ 3.820</strong> está dentro do orçamento, com fertilizantes representando a maior fatia (28%). Recomenda-se negociação antecipada de insumos para a próxima safra.</p>
          <p>O <strong className="text-foreground">ROI de 1,58x</strong> indica retorno saudável, acima da média regional de 1,42x para a mesma cultura e região.</p>
        </div>
      </div>
    </div>
  );
}
