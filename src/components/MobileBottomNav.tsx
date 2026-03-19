import { useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Tractor, CalendarCheck, Package, Menu } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {
  Map, Droplets, DollarSign, Wheat, ShoppingCart, Users, Wrench,
  Brain, FileBarChart, Factory, ShoppingBag, BookOpen, BarChart3, FileText, StickyNote, TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { label: "Painel", icon: LayoutDashboard, path: "/dashboard" },
  { label: "Operações", icon: Tractor, path: "/operacoes" },
  { label: "Planejamento", icon: CalendarCheck, path: "/planejamento" },
  { label: "Estoque", icon: Package, path: "/estoque" },
  { label: "Mais", icon: Menu, path: "__more__" },
];

const moreGroups = [
  {
    label: "Principal",
    items: [
      { label: "Inteligência", icon: Brain, path: "/inteligencia" },
      { label: "Relatório IA", icon: FileBarChart, path: "/relatorio-ia" },
    ],
  },
  {
    label: "Produção",
    items: [
      { label: "Talhões", icon: Map, path: "/talhoes" },
      { label: "Safras", icon: Wheat, path: "/safras" },
      { label: "Pulverizações", icon: Droplets, path: "/pulverizacoes" },
      { label: "Produção", icon: Factory, path: "/producao" },
    ],
  },
  {
    label: "Financeiro & Comercial",
    items: [
      { label: "Contas a Pagar", icon: DollarSign, path: "/financeiro/pagar" },
      { label: "Contas a Receber", icon: TrendingUp, path: "/financeiro/receber" },
      { label: "Vendas", icon: ShoppingCart, path: "/comercial/vendas" },
      { label: "Compras", icon: ShoppingBag, path: "/comercial/compras" },
      { label: "Catálogo", icon: BookOpen, path: "/estoque/catalogo" },
      { label: "Movimentações", icon: BarChart3, path: "/estoque/movimentacoes" },
    ],
  },
  {
    label: "Cadastros & Outros",
    items: [
      { label: "Operadores", icon: Users, path: "/cadastros/operadores" },
      { label: "Máquinas", icon: Wrench, path: "/cadastros/maquinas" },
      { label: "Documentos", icon: FileText, path: "/documentos" },
      { label: "Anotações", icon: StickyNote, path: "/anotacoes" },
    ],
  },
];

export function MobileBottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + "/");
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      {/* Glass background with stronger blur */}
      <div className="absolute inset-0 bg-card/92 backdrop-blur-2xl border-t border-border/50" />

      <div className="relative flex items-center justify-around h-[72px] px-1 pb-safe">
        {tabs.map((tab) => {
          if (tab.path === "__more__") {
            return (
              <Sheet key="more" open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <button className="flex flex-col items-center gap-1 min-w-[64px] py-2 text-muted-foreground active:scale-90 transition-all duration-200">
                    <div className="h-7 w-7 flex items-center justify-center">
                      <Menu className="h-[20px] w-[20px]" strokeWidth={1.8} />
                    </div>
                    <span className="text-[10px] font-semibold">Mais</span>
                  </button>
                </SheetTrigger>
                <SheetContent side="bottom" className="rounded-t-3xl max-h-[80vh] overflow-y-auto pb-10 px-5">
                  <SheetHeader className="pb-3">
                    <SheetTitle className="text-base font-extrabold">Navegação</SheetTitle>
                  </SheetHeader>
                  <div className="space-y-5 pt-1">
                    {moreGroups.map((group) => (
                      <div key={group.label}>
                        <p className="text-[10px] uppercase tracking-[0.14em] font-bold text-muted-foreground/60 mb-2.5 px-1">{group.label}</p>
                        <div className="grid grid-cols-3 gap-2">
                          {group.items.map((item) => {
                            const active = location.pathname === item.path;
                            return (
                              <button
                                key={item.path}
                                onClick={() => { navigate(item.path); setOpen(false); }}
                                className={cn(
                                  "flex flex-col items-center gap-2 p-3.5 rounded-xl transition-all duration-200 active:scale-95",
                                  active
                                    ? "bg-accent text-accent-foreground shadow-sm border border-primary/20"
                                    : "text-muted-foreground hover:bg-secondary"
                                )}
                              >
                                <item.icon className={cn("h-5 w-5", active && "text-primary")} strokeWidth={active ? 2.5 : 1.7} />
                                <span className={cn("text-[11px] leading-tight text-center", active ? "font-bold" : "font-medium")}>{item.label}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            );
          }
          const active = isActive(tab.path);
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={cn(
                "flex flex-col items-center gap-1 min-w-[64px] py-2 transition-all duration-200 active:scale-90 relative",
                active ? "text-primary" : "text-muted-foreground"
              )}
            >
              {/* Active indicator */}
              {active && (
                <div className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-10 h-[3px] rounded-b-full gradient-primary shadow-[0_2px_8px_hsl(142,72%,48%/0.4)]" />
              )}
              <div className={cn(
                "h-7 w-7 flex items-center justify-center rounded-xl transition-all duration-300",
                active && "bg-accent scale-110"
              )}>
                <tab.icon className="h-[20px] w-[20px]" strokeWidth={active ? 2.5 : 1.7} />
              </div>
              <span className={cn("text-[10px]", active ? "font-extrabold" : "font-medium")}>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
