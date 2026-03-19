import { PageHeader } from "@/components/PageHeader";
import { KPICard } from "@/components/KPICard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/StatusBadge";
import { Map, DollarSign, Tractor, Wheat } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const chartData = [
  { mes: "Set", custo: 180000, receita: 0 },
  { mes: "Out", custo: 250000, receita: 0 },
  { mes: "Nov", custo: 120000, receita: 0 },
  { mes: "Dez", custo: 90000, receita: 0 },
  { mes: "Jan", custo: 60000, receita: 0 },
  { mes: "Fev", custo: 45000, receita: 320000 },
  { mes: "Mar", custo: 30000, receita: 580000 },
  { mes: "Abr", custo: 20000, receita: 340000 },
];

const produtividadeData = [
  { safra: "20/21", valor: 58 },
  { safra: "21/22", valor: 62 },
  { safra: "22/23", valor: 55 },
  { safra: "23/24", valor: 64 },
  { safra: "24/25", valor: 68 },
];

const recentOps = [
  { id: 1, talhao: "T-01 Cerrado", operacao: "Plantio Soja", status: "em_andamento" as const, data: "15/03/2026" },
  { id: 2, talhao: "T-03 Barreiro", operacao: "Pulverização", status: "concluido" as const, data: "14/03/2026" },
  { id: 3, talhao: "T-05 Chapada", operacao: "Adubação", status: "pendente" as const, data: "16/03/2026" },
  { id: 4, talhao: "T-02 Vargem", operacao: "Colheita Milho", status: "colheita" as const, data: "13/03/2026" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Fazenda Santa Fé" description="Safra 2025/26 · Visão geral" />

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <KPICard
          title="Área Total"
          value="1.450"
          subtitle="hectares plantados"
          icon={<Map className="h-4 w-4 text-accent-foreground" strokeWidth={2.5} />}
        />
        <KPICard
          title="Custo/ha"
          value="R$ 3.820"
          subtitle="média ponderada"
          icon={<DollarSign className="h-4 w-4 text-accent-foreground" strokeWidth={2.5} />}
        />
        <KPICard
          title="Máquinas Ativas"
          value="12"
          subtitle="de 18 disponíveis"
          icon={<Tractor className="h-4 w-4 text-accent-foreground" strokeWidth={2.5} />}
        />
        <KPICard
          title="Produtividade"
          value="68,2"
          subtitle="sc/ha (estimativa)"
          icon={<Wheat className="h-4 w-4 text-accent-foreground" strokeWidth={2.5} />}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Fluxo Financeiro da Safra</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 12%, 90%)" />
                  <XAxis dataKey="mes" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                  <Tooltip
                    formatter={(value: number) =>
                      `R$ ${value.toLocaleString("pt-BR")}`
                    }
                  />
                  <Bar dataKey="custo" fill="hsl(0, 84%, 60%)" radius={[3, 3, 0, 0]} name="Custo" />
                  <Bar dataKey="receita" fill="hsl(142, 76%, 36%)" radius={[3, 3, 0, 0]} name="Receita" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Produtividade Histórica (sc/ha)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={produtividadeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 12%, 90%)" />
                  <XAxis dataKey="safra" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} domain={[50, 75]} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="valor"
                    stroke="hsl(142, 76%, 36%)"
                    strokeWidth={2.5}
                    dot={{ r: 4, fill: "hsl(142, 76%, 36%)" }}
                    name="sc/ha"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Operations */}
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Operações Recentes</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {recentOps.map((op) => (
              <div key={op.id} className="flex items-center justify-between px-4 py-3 text-sm">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                  <span className="font-medium">{op.talhao}</span>
                  <span className="text-muted-foreground">{op.operacao}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground hidden sm:inline font-mono-data">{op.data}</span>
                  <StatusBadge status={op.status} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
