import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Plus, StickyNote, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const anotacoes = [
  {
    id: "1",
    titulo: "Observação Talhão T-01",
    conteudo: "Solo apresentou compactação na parte leste do talhão. Considerar subsolagem antes do próximo plantio. Verificar com técnico.",
    data: "19/03/2026",
    cor: "border-primary/30",
    categoria: "Campo",
  },
  {
    id: "2",
    titulo: "Reunião com Cargill",
    conteudo: "Negociação de preço para lote de 3.000 ton de soja. Proposta de R$ 138/sc com entrega para maio. Aguardando confirmação.",
    data: "18/03/2026",
    cor: "border-status-colheita/30",
    categoria: "Comercial",
  },
  {
    id: "3",
    titulo: "Manutenção programada S790",
    conteudo: "Agendar troca de filtros e revisão do sistema hidráulico da colhedora S790 antes do início da colheita de soja.",
    data: "17/03/2026",
    cor: "border-status-plantio/30",
    categoria: "Manutenção",
  },
  {
    id: "4",
    titulo: "Ajuste de dosagem - Pulverização",
    conteudo: "Carlos recomendou aumento de 10% na dosagem do Fox Xpro para T-05 Chapada devido à maior pressão de ferrugem nesta área.",
    data: "16/03/2026",
    cor: "border-primary/30",
    categoria: "Técnico",
  },
  {
    id: "5",
    titulo: "Contratação de temporário",
    conteudo: "Verificar necessidade de contratar 1 operador temporário para período de colheita do milho. Previsão: abril/maio.",
    data: "15/03/2026",
    cor: "border-status-pendente/30",
    categoria: "RH",
  },
];

export default function AnotacoesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Anotações"
        description="Notas e lembretes rápidos"
        actions={
          <Button size="sm" className="gap-1.5">
            <Plus className="h-4 w-4" strokeWidth={2.5} />
            Nova Anotação
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {anotacoes.map((nota) => (
          <div key={nota.id} className={cn("premium-card p-4 border-l-4 group cursor-pointer", nota.cor)}>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">{nota.categoria}</span>
                <h4 className="text-sm font-semibold mt-0.5">{nota.titulo}</h4>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground shrink-0">
                <Clock className="h-3 w-3" strokeWidth={2} />
                <span className="text-[11px] font-mono-data">{nota.data}</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">{nota.conteudo}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
