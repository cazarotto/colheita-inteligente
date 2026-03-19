import { PageHeader } from "@/components/PageHeader";
import { KPICard } from "@/components/KPICard";
import { StatusBadge } from "@/components/StatusBadge";
import { Map, DollarSign, Tractor, Wheat, Droplets, Wind, ArrowRight, CalendarCheck, Sun } from "lucide-react";
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
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null;
  return (
    <div className="glass-card p-3 shadow-lg border text-xs">
      <p className="font-extrabold mb-1.5 text-foreground">{label}</p>
      {payload.map((p: any) => (
        <div key={p.name} className="flex items-center gap-2 py-0.5">
          <div className="h-2 w-2 rounded-full shrink-0" style={{ background: p.color }} />
          <span className="text-muted-foreground font-medium">{p.name}:</span>
          <span className="font-mono-data font-bold text-foreground">
            R$ {(p.value / 1000).toFixed(0)}k
          </span>
        </div>
      ))}
    </div>
  );
};

export default function DashboardPage() {
  return (
    <div className="space-y-5 md:space-y-6">
      <PageHeader title="Fazenda Santa Fé" description="Safra 2025/26 · Visão geral da operação" />

      {/* Weather Banner */}
      <div className="premium-card overflow-hidden animate-slide-up">
        <div className="gradient-primary p-4 md:p-5 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full bg-white/[0.04]" />
          <div className="absolute -bottom-14 -right-6 w-28 h-28 rounded-full bg-white/[0.03]" />

          <div className="flex items-start justify-between relative">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Sun className="h-4 w-4 text-primary-foreground/70" strokeWidth={2} />
                <span className="text-[10px] font-extrabold text-primary-foreground/60 uppercase tracking-[0.14em]">
                  Clima Hoje · Uberlândia, MG
                </span>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="text-4xl md:text-5xl font-extrabold text-primary-foreground font-mono-data">28°</span>
                <span className="text-sm text-primary-foreground/50 font-semibold">Parcialmente nublado</span>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-6 text-primary-foreground/70">
              <div className="flex items-center gap-2">
                <Droplets className="h-4 w-4 opacity-60" strokeWidth={2} />
                <div>
                  <p className="text-[9px] uppercase tracking-wider opacity-40 font-bold">Umidade</p>
                  <p className="text-sm font-extrabold font-mono-data">65%</p>
                </div>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="flex items-center gap-2">
                <Wind className="h-4 w-4 opacity-60" strokeWidth={2} />
                <div>
                  <p className="text-[9px] uppercase tracking-wider opacity-40 font-bold">Vento</p>
                  <p className="text-sm font-extrabold font-mono-data">12 km/h</p>
                </div>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="flex items-center gap-2">
                <Droplets className="h-4 w-4 opacity-60" strokeWidth={2} />
                <div>
                  <p className="text-[9px] uppercase tracking-wider opacity-40 font-bold">Chuva 7d</p>
                  <p className="text-sm font-extrabold font-mono-data">45 mm</p>
                </div>
              </div>
            </div>
          </div>
          {/* Mobile weather stats */}
          <div className="flex sm:hidden items-center gap-5 mt-3 text-primary-foreground/70">
            <div className="flex items-center gap-1.5">
              <Droplets className="h-3.5 w-3.5 opacity-50" strokeWidth={2} />
              <span className="text-xs font-mono-data font-bold">65%</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Wind className="h-3.5 w-3.5 opacity-50" strokeWidth={2} />
              <span className="text-xs font-mono-data font-bold">12 km/h</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Droplets className="h-3.5 w-3.5 opacity-50" strokeWidth={2} />
              <span className="text-xs font-mono-data font-bold">45 mm</span>
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
          title="Máquinas"
          value="12/18"
          subtitle="em operação"
          icon={<Tractor className="h-4 w-4 text-primary" strokeWidth={2.5} />}
          className="animate-slide-up stagger-3"
        />
        <KPICard
          title="Produtividade"
          value="68,2 sc"
          subtitle="estimativa/ha"
          trend={{ value: "6,5%", positive: true }}
          icon={<Wheat className="h-4 w-4 text-primary" strokeWidth={2.5} />}
          className="animate-slide-up stagger-4"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="premium-card p-4 md:p-5 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-extrabold text-foreground">Fluxo Financeiro</h3>
              <p className="text-[11px] text-muted-foreground mt-0.5 font-medium">Custo vs. Receita por mês</p>
            </div>
            <div className="flex items-center gap-4 text-[11px]">
              <div className="flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-sm bg-financial-pagar" />
                <span className="text-muted-foreground font-semibold">Custo</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-sm bg-primary" />
                <span className="text-muted-foreground font-semibold">Receita</span>
              </div>
            </div>
          </div>
          <div className="h-[200px] md:h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} barGap={2}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(150, 10%, 90%)" vertical={false} />
                <XAxis dataKey="mes" tick={{ fontSize: 11, fill: 'hsl(160, 10%, 38%)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: 'hsl(160, 10%, 38%)' }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} axisLine={false} tickLine={false} width={38} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="custo" fill="hsl(0, 72%, 51%)" radius={[4, 4, 0, 0]} name="Custo" maxBarSize={28} />
                <Bar dataKey="receita" fill="hsl(142, 72%, 29%)" radius={[4, 4, 0, 0]} name="Receita" maxBarSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="premium-card p-4 md:p-5 animate-fade-in-up" style={{ animationDelay: '280ms' }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-extrabold text-foreground">Produtividade Histórica</h3>
              <p className="text-[11px] text-muted-foreground mt-0.5 font-medium">Evolução sc/ha por safra</p>
            </div>
            <div className="flex items-center gap-4 text-[11px]">
              <div className="flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-sm bg-primary" />
                <span className="text-muted-foreground font-semibold">Soja</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-sm bg-status-colheita" />
                <span className="text-muted-foreground font-semibold">Milho</span>
              </div>
            </div>
          </div>
          <div className="h-[200px] md:h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={produtividadeData}>
                <defs>
                  <linearGradient id="gradSoja" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(142, 72%, 29%)" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="hsl(142, 72%, 29%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradMilho" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(38, 92%, 50%)" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="hsl(38, 92%, 50%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(150, 10%, 90%)" vertical={false} />
                <XAxis dataKey="safra" tick={{ fontSize: 11, fill: 'hsl(160, 10%, 38%)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: 'hsl(160, 10%, 38%)' }} axisLine={false} tickLine={false} width={32} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="soja" stroke="hsl(142, 72%, 29%)" strokeWidth={2.5} fill="url(#gradSoja)" name="Soja (sc/ha)" dot={{ r: 3, fill: "hsl(142, 72%, 29%)", strokeWidth: 0 }} />
                <Area type="monotone" dataKey="milho" stroke="hsl(38, 92%, 50%)" strokeWidth={2} fill="url(#gradMilho)" name="Milho (sc/ha)" dot={{ r: 3, fill: "hsl(38, 92%, 50%)", strokeWidth: 0 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Operations */}
      <div className="premium-card overflow-hidden animate-fade-in-up" style={{ animationDelay: '350ms' }}>
        <div className="flex items-center justify-between p-4 md:p-5 pb-0">
          <div>
            <h3 className="text-sm font-extrabold text-foreground">Operações em Andamento</h3>
            <p className="text-[11px] text-muted-foreground mt-0.5 font-medium">Últimas atividades de campo</p>
          </div>
          <button className="flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary/80 transition-colors duration-200">
            Ver todas <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className="p-4 md:p-5 pt-3 space-y-0.5">
          {recentOps.map((op, idx) => (
            <div
              key={op.id}
              className="flex items-center gap-3 md:gap-4 p-3 rounded-xl hover:bg-accent/20 transition-all duration-200 cursor-pointer group"
            >
              <div className={cn(
                "h-10 w-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105",
                op.status === "em_andamento" ? "bg-status-plantio/10 text-status-plantio" :
                op.status === "concluido" ? "bg-status-concluido/10 text-status-concluido" :
                op.status === "colheita" ? "bg-status-colheita/10 text-status-colheita" :
                "bg-muted text-muted-foreground"
              )}>
                <CalendarCheck className="h-4 w-4" strokeWidth={2} />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-sm font-bold truncate block text-foreground">{op.operacao}</span>
                <span className="text-xs text-muted-foreground font-medium">{op.talhao}</span>
              </div>
              {op.progresso > 0 && op.progresso < 100 && (
                <div className="hidden sm:flex items-center gap-2 w-28">
                  <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full gradient-primary transition-all duration-700 ease-out"
                      style={{ width: `${op.progresso}%` }}
                    />
                  </div>
                  <span className="text-[11px] font-mono-data text-muted-foreground w-8 text-right font-bold">
                    {op.progresso}%
                  </span>
                </div>
              )}
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-[11px] text-muted-foreground font-mono-data hidden md:inline font-semibold">{op.data}</span>
                <StatusBadge status={op.status} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
