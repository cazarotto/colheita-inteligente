import { PageHeader } from "@/components/PageHeader";
import { KPICard } from "@/components/KPICard";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, TrendingUp, AlertTriangle, Lightbulb, Wheat, Bug, CloudRain } from "lucide-react";

const insights = [
  {
    id: 1,
    tipo: "Produtividade",
    icon: TrendingUp,
    titulo: "Aumento de produtividade no T-01",
    descricao: "A produtividade do Talhão 01 (Cerrado) aumentou 12% em relação à safra anterior. Recomendamos manter o manejo atual.",
    prioridade: "info" as const,
    data: "19/03/2026",
  },
  {
    id: 2,
    tipo: "Alerta Fitossanitário",
    icon: Bug,
    titulo: "Risco de ferrugem asiática no T-03",
    descricao: "Condições climáticas favoráveis para aparecimento de ferrugem. Considere aplicação preventiva de fungicida nos próximos 5 dias.",
    prioridade: "alerta" as const,
    data: "19/03/2026",
  },
  {
    id: 3,
    tipo: "Clima",
    icon: CloudRain,
    titulo: "Previsão de chuva intensa em 48h",
    descricao: "Previsão de 80mm acumulados nos próximos 2 dias. Avalie antecipação da colheita do Milho no T-02 para evitar perdas.",
    prioridade: "alerta" as const,
    data: "19/03/2026",
  },
  {
    id: 4,
    tipo: "Financeiro",
    icon: TrendingUp,
    titulo: "Margem de lucro acima da meta",
    descricao: "A margem de lucro da Soja está 8% acima da meta estipulada. Custo/ha efetivo abaixo do orçado.",
    prioridade: "info" as const,
    data: "18/03/2026",
  },
];

export default function InteligenciaPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Inteligência" description="Insights e análises baseadas em dados da sua fazenda" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <KPICard
          title="Insights Ativos"
          value="4"
          subtitle="2 alertas críticos"
          icon={<Lightbulb className="h-4 w-4 text-primary" strokeWidth={2.5} />}
        />
        <KPICard
          title="Score Safra"
          value="87/100"
          subtitle="acima da média"
          trend={{ value: "5pts", positive: true }}
          icon={<Brain className="h-4 w-4 text-primary" strokeWidth={2.5} />}
        />
        <KPICard
          title="Risco Climático"
          value="Médio"
          subtitle="chuva prevista"
          icon={<CloudRain className="h-4 w-4 text-status-colheita" strokeWidth={2.5} />}
          className="hidden sm:block"
        />
        <KPICard
          title="Eficiência Operac."
          value="92%"
          subtitle="últimos 30 dias"
          trend={{ value: "3%", positive: true }}
          icon={<TrendingUp className="h-4 w-4 text-primary" strokeWidth={2.5} />}
          className="hidden sm:block"
        />
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold">Insights Recentes</h3>
        {insights.map((insight) => (
          <div key={insight.id} className="premium-card p-4 md:p-5">
            <div className="flex items-start gap-3 md:gap-4">
              <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${
                insight.prioridade === "alerta" ? "bg-status-colheita/10" : "bg-accent"
              }`}>
                <insight.icon className={`h-5 w-5 ${
                  insight.prioridade === "alerta" ? "text-status-colheita" : "text-primary"
                }`} strokeWidth={2} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className={`text-[10px] uppercase tracking-wider font-bold ${
                      insight.prioridade === "alerta" ? "text-status-colheita" : "text-primary"
                    }`}>{insight.tipo}</span>
                    <h4 className="text-sm font-semibold mt-0.5">{insight.titulo}</h4>
                  </div>
                  <span className="text-[11px] text-muted-foreground font-mono-data shrink-0 hidden sm:inline">{insight.data}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{insight.descricao}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
