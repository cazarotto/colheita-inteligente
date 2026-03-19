import { useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Wheat, Tractor, DollarSign, Menu } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {
  Map, CalendarCheck, SprayCan, Package, ShoppingCart, Users, Wrench,
} from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { label: "Painel", icon: LayoutDashboard, path: "/dashboard" },
  { label: "Safras", icon: Wheat, path: "/safras" },
  { label: "Operações", icon: Tractor, path: "/operacoes" },
  { label: "Financeiro", icon: DollarSign, path: "/financeiro/pagar" },
  { label: "Mais", icon: Menu, path: "__more__" },
];

const moreItems = [
  { label: "Talhões", icon: Map, path: "/talhoes" },
  { label: "Planejamento", icon: CalendarCheck, path: "/planejamento" },
  { label: "Pulverizações", icon: SprayCan, path: "/pulverizacoes" },
  { label: "Estoque", icon: Package, path: "/estoque" },
  { label: "Contas a Receber", icon: DollarSign, path: "/financeiro/receber" },
  { label: "Vendas", icon: ShoppingCart, path: "/comercial/vendas" },
  { label: "Operadores", icon: Users, path: "/cadastros/operadores" },
  { label: "Máquinas", icon: Wrench, path: "/cadastros/maquinas" },
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
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-t md:hidden safe-area-bottom">
      <div className="flex items-center justify-around h-[68px] px-1">
        {tabs.map((tab) => {
          if (tab.path === "__more__") {
            return (
              <Sheet key="more" open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <button className="flex flex-col items-center gap-1 px-3 py-1.5 text-muted-foreground active:scale-95 transition-transform">
                    <div className="h-6 w-6 flex items-center justify-center">
                      <Menu className="h-5 w-5" strokeWidth={2} />
                    </div>
                    <span className="text-[10px] font-medium">Mais</span>
                  </button>
                </SheetTrigger>
                <SheetContent side="bottom" className="rounded-t-2xl pb-10 px-4">
                  <SheetHeader className="pb-2">
                    <SheetTitle className="text-base font-semibold">Navegação</SheetTitle>
                  </SheetHeader>
                  <div className="grid grid-cols-3 gap-2">
                    {moreItems.map((item) => {
                      const active = location.pathname === item.path;
                      return (
                        <button
                          key={item.path}
                          onClick={() => { navigate(item.path); setOpen(false); }}
                          className={cn(
                            "flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-150 active:scale-95",
                            active
                              ? "bg-accent text-accent-foreground shadow-sm"
                              : "text-muted-foreground hover:bg-secondary active:bg-secondary"
                          )}
                        >
                          <item.icon className={cn("h-5 w-5", active && "text-primary")} strokeWidth={active ? 2.5 : 2} />
                          <span className="text-[11px] font-medium leading-tight text-center">{item.label}</span>
                        </button>
                      );
                    })}
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
                "flex flex-col items-center gap-1 px-3 py-1.5 transition-all duration-150 active:scale-95",
                active ? "text-primary" : "text-muted-foreground"
              )}
            >
              <div className={cn(
                "h-6 w-6 flex items-center justify-center rounded-lg transition-colors",
                active && "bg-accent"
              )}>
                <tab.icon className="h-[18px] w-[18px]" strokeWidth={active ? 2.5 : 2} />
              </div>
              <span className={cn("text-[10px] font-medium", active && "font-semibold")}>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
