import { useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Wheat, Tractor, DollarSign, Menu } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {
  Map, CalendarCheck, SprayCan, Package, ShoppingCart, Users, Wrench,
  Brain, FileBarChart, Factory, ShoppingBag, BookOpen, BarChart3, FileText, StickyNote, TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { label: "Painel", icon: LayoutDashboard, path: "/dashboard" },
  { label: "Safras", icon: Wheat, path: "/safras" },
  { label: "Operações", icon: Tractor, path: "/operacoes" },
  { label: "Financeiro", icon: DollarSign, path: "/financeiro/pagar" },
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
      { label: "Planejamento", icon: CalendarCheck, path: "/planejamento" },
      { label: "Pulverizações", icon: SprayCan, path: "/pulverizacoes" },
      { label: "Produção", icon: Factory, path: "/producao" },
    ],
  },
  {
    label: "Comercial & Estoque",
    items: [
      { label: "Receber", icon: TrendingUp, path: "/financeiro/receber" },
      { label: "Vendas", icon: ShoppingCart, path: "/comercial/vendas" },
      { label: "Compras", icon: ShoppingBag, path: "/comercial/compras" },
      { label: "Estoque", icon: Package, path: "/estoque" },
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
    if (path === "/financeiro/pagar") return location.pathname.startsWith("/financeiro");
    return location.pathname === path;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-xl border-t md:hidden">
      <div className="flex items-center justify-around h-[64px] px-1 pb-[env(safe-area-inset-bottom)]">
        {tabs.map((tab) => {
          if (tab.path === "__more__") {
            return (
              <Sheet key="more" open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <button className="flex flex-col items-center gap-1 px-3 py-1.5 text-muted-foreground active:scale-90 transition-transform">
                    <div className="h-6 w-6 flex items-center justify-center">
                      <Menu className="h-5 w-5" strokeWidth={2} />
                    </div>
                    <span className="text-[10px] font-medium">Mais</span>
                  </button>
                </SheetTrigger>
                <SheetContent side="bottom" className="rounded-t-2xl max-h-[85vh] overflow-y-auto pb-10 px-5">
                  <SheetHeader className="pb-1">
                    <SheetTitle className="text-base font-bold">Navegação</SheetTitle>
                  </SheetHeader>
                  <div className="space-y-5 pt-2">
                    {moreGroups.map((group) => (
                      <div key={group.label}>
                        <p className="text-[10px] uppercase tracking-[0.12em] font-bold text-muted-foreground mb-2 px-1">{group.label}</p>
                        <div className="grid grid-cols-3 gap-2">
                          {group.items.map((item) => {
                            const active = location.pathname === item.path;
                            return (
                              <button
                                key={item.path}
                                onClick={() => { navigate(item.path); setOpen(false); }}
                                className={cn(
                                  "flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-150 active:scale-95",
                                  active
                                    ? "bg-accent text-accent-foreground shadow-sm"
                                    : "text-muted-foreground hover:bg-secondary active:bg-secondary"
                                )}
                              >
                                <item.icon className={cn("h-5 w-5", active && "text-primary")} strokeWidth={active ? 2.5 : 1.8} />
                                <span className="text-[11px] font-medium leading-tight text-center">{item.label}</span>
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
                "flex flex-col items-center gap-1 px-3 py-1.5 transition-all duration-150 active:scale-90",
                active ? "text-primary" : "text-muted-foreground"
              )}
            >
              <div className={cn(
                "h-7 w-7 flex items-center justify-center rounded-lg transition-colors",
                active && "bg-accent"
              )}>
                <tab.icon className="h-[18px] w-[18px]" strokeWidth={active ? 2.5 : 1.8} />
              </div>
              <span className={cn("text-[10px]", active ? "font-bold" : "font-medium")}>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
