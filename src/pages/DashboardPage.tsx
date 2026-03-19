import { PageHeader } from "@/components/PageHeader";
import { KPICard } from "@/components/KPICard";
import { StatusBadge } from "@/components/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Map, DollarSign, Tractor, Wheat, Cloud, Droplets, Thermometer, Wind, ArrowRight, CalendarCheck } from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { cn } from "@/lib/utils";

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
  { safra: "20/21", soja: 58, milho: 120 },
  { safra: "21/22", soja: 62, milho: 135 },
  { safra: "22/23", soja: 55, milho: 118 },
  { safra: "23/24", soja: 64, milho: 142 },
  { safra: "24/25", soja: 68, milho: 148 },
];

const recentOps = [
  { id: 1, talhao: "T-01 Cerrado", operacao: "Plantio Soja", status: "em_andamento" as const, data: "15/03", progresso: 72 },
  { id: 2, talhao: "T-03 Barreiro", operacao: "Pulverização Fungicida", status: "concluido" as const, data: "14/03", progresso: 100 },
  { id: 3, talhao: "T-05 Chapada", operacao: "Adubação de Cobertura", status: "pendente" as const, data: "16/03", progresso: 0 },
  { id: 4, talhao: "T-02 Vargem", operacao: "Colheita Milho 2ª Safra", status: "colheita" as const, data: "13/03", progresso: 45 },
  { id: 5, talhao: "T-06 Brejo", operacao: "Dessecação Pré-Plantio", status: "pendente" as const, data: "17/03", progresso: 0 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null;
  return (
    <div className="glass-card p-3 !bg-card shadow-lg border text-xs">
      <p className="font-semibold mb-1.5">{label}</p>
      {payload.map((p: any) => (
        <div key={p.name} className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full" style={{ background: p.color }} />
          <span className="text-muted-foreground">{p.name}:</span>
          <span className="font-mono-data font-medium">
            R$ {(p.value / 1000).toFixed(0)}k
          </span>
        </div>
      ))}
    </div>
  );
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Fazenda Santa Fé" description="Safra 2025/26 · Visão geral da operação" />

      {/* Weather Banner */}
      <div className="premium-card overflow-hidden">
        <div className="gradient-primary p-4 md:p-5">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Cloud className="h-4 w-4 text-primary-foreground/70" strokeWidth={2} />
                <span className="text-xs font-medium text-primary-foreground/70 uppercase tracking-wide">
                  Clima Hoje · Uberlândia, MG
                </span>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-primary-foreground font-mono-data">28°C</span>
                <span className="text-sm text-primary-foreground/60">Parcialmente nublado</span>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-6 text-primary-foreground/80">
              <div className="flex items-center gap-1.5">
                <Droplets className="h-4 w-4" strokeWidth={2} />
                <div>
                  <p className="text-[10px] uppercase tracking-wide opacity-60">Umidade</p>
                  <p className="text-sm font-semibold font-mono-data">65%</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <Wind className="h-4 w-4" strokeWidth={2} />
                <div>
                  <p className="text-[10px] uppercase tracking-wide opacity-60">Vento</p>
                  <p className="text-sm font-semibold font-mono-data">12 km/h</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <Droplets className="h-4 w-4" strokeWidth={2} />
                <div>
                  <p className="text-[10px] uppercase tracking-wide opacity-60">Chuva (7d)</p>
                  <p className="text-sm font-semibold font-mono-data">45 mm</p>
                </div>
              </div>
            </div>
          </div>
          {/* Mobile weather stats */}
          <div className="flex sm:hidden items-center gap-4 mt-3 text-primary-foreground/80">
            <div className="flex items-center gap-1">
              <Droplets className="h-3.5 w-3.5" strokeWidth={2} />
              <span className="text-xs font-mono-data">65%</span>
            </div>
            <div className="flex items-center gap-1">
              <Wind className="h-3.5 w-3.5" strokeWidth={2} />
              <span className="text-xs font-mono-data">12 km/h</span>
            </div>
            <div className="flex items-center gap-1">
              <Droplets className="h-3.5 w-3.5" strokeWidth={2} />
              <span className="text-xs font-mono-data">45 mm</span>
            </div>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <KPICard
          title="Área Plantada"
          value="1.450 ha"
          subtitle="6 talhões ativos"
          trend={{ value: "5%", positive: true }}
          icon={<Map className="h-4 w-4 text-primary" strokeWidth={2.5} />}
          className="animate-slide-up stagger-1"
        />
        <KPICard
          title="Custo/ha"
          value="R$ 3.820"
          subtitle="média ponderada"
          trend={{ value: "2,3%", positive: false }}
          icon={<DollarSign className="h-4 w-4 text-primary" strokeWidth={2.5} />}
          className="animate-slide-up stagger-2"
        />
        <KPICard
          title="Máquinas Ativas"
          value="12/18"
          subtitle="66% em operação"
          icon={<Tractor className="h-4 w-4 text-primary" strokeWidth={2.5} />}
          className="animate-slide-up stagger-3"
        />
        <KPICard
          title="Produtividade"
          value="68,2 sc/ha"
          subtitle="estimativa safra atual"
          trend={{ value: "6,5%", positive: true }}
          icon={<Wheat className="h-4 w-4 text-primary" strokeWidth={2.5} />}
          className="animate-slide-up stagger-4"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="premium-card p-4 md:p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold">Fluxo Financeiro</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Custo vs. Receita por mês</p>
            </div>
            <div className="flex items-center gap-3 text-[11px]">
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-financial-pagar" />
                <span className="text-muted-foreground">Custo</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-muted-foreground">Receita</span>
              </div>
            </div>
          </div>
          <div className="h-[220px] md:h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} barGap={2}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(150, 10%, 90%)" vertical={false} />
                <XAxis dataKey="mes" tick={{ fontSize: 11, fill: 'hsl(160, 8%, 45%)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: 'hsl(160, 8%, 45%)' }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} axisLine={false} tickLine={false} width={40} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="custo" fill="hsl(0, 72%, 51%)" radius={[4, 4, 0, 0]} name="Custo" maxBarSize={32} />
                <Bar dataKey="receita" fill="hsl(142, 72%, 29%)" radius={[4, 4, 0, 0]} name="Receita" maxBarSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="premium-card p-4 md:p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold">Produtividade Histórica</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Evolução sc/ha por safra</p>
            </div>
            <div className="flex items-center gap-3 text-[11px]">
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-muted-foreground">Soja</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-status-colheita" />
                <span className="text-muted-foreground">Milho</span>
              </div>
            </div>
          </div>
          <div className="h-[220px] md:h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={produtividadeData}>
                <defs>
                  <linearGradient id="gradSoja" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(142, 72%, 29%)" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="hsl(142, 72%, 29%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradMilho" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(38, 92%, 50%)" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="hsl(38, 92%, 50%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(150, 10%, 90%)" vertical={false} />
                <XAxis dataKey="safra" tick={{ fontSize: 11, fill: 'hsl(160, 8%, 45%)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: 'hsl(160, 8%, 45%)' }} axisLine={false} tickLine={false} width={35} />
                <Tooltip />
                <Area type="monotone" dataKey="soja" stroke="hsl(142, 72%, 29%)" strokeWidth={2.5} fill="url(#gradSoja)" name="Soja (sc/ha)" dot={{ r: 3, fill: "hsl(142, 72%, 29%)", strokeWidth: 0 }} />
                <Area type="monotone" dataKey="milho" stroke="hsl(38, 92%, 50%)" strokeWidth={2} fill="url(#gradMilho)" name="Milho (sc/ha)" dot={{ r: 3, fill: "hsl(38, 92%, 50%)", strokeWidth: 0 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Operations */}
      <div className="premium-card overflow-hidden">
        <div className="flex items-center justify-between p-4 md:p-5 pb-0">
          <div>
            <h3 className="text-sm font-semibold">Operações em Andamento</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Últimas atividades de campo</p>
          </div>
          <button className="flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors">
            Ver todas <ArrowRight className="h-3 w-3" />
          </button>
        </div>
        <div className="p-4 md:p-5 pt-3">
          <div className="space-y-2">
            {recentOps.map((op) => (
              <div
                key={op.id}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/40 transition-colors cursor-pointer group"
              >
                <div className={cn(
                  "h-9 w-9 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold",
                  op.status === "em_andamento" ? "bg-status-plantio/10 text-status-plantio" :
                  op.status === "concluido" ? "bg-status-concluido/10 text-status-concluido" :
                  op.status === "colheita" ? "bg-status-colheita/10 text-status-colheita" :
                  "bg-muted text-muted-foreground"
                )}>
                  <CalendarCheck className="h-4 w-4" strokeWidth={2} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium truncate">{op.operacao}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{op.talhao}</span>
                </div>
                {/* Progress bar */}
                {op.progresso > 0 && op.progresso < 100 && (
                  <div className="hidden sm:flex items-center gap-2 w-24">
                    <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full gradient-primary transition-all duration-500"
                        style={{ width: `${op.progresso}%` }}
                      />
                    </div>
                    <span className="text-[11px] font-mono-data text-muted-foreground w-8">
                      {op.progresso}%
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-muted-foreground font-mono-data hidden md:inline">{op.data}</span>
                  <StatusBadge status={op.status} />
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground/0 group-hover:text-muted-foreground transition-colors shrink-0 hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
