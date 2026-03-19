import { useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Wheat, Tractor, DollarSign, Menu } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Map, CalendarCheck, SprayCan, Package, ShoppingCart, Users, Wrench,
} from "lucide-react";

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
  { label: "Pulverizações", icon: Spray, path: "/pulverizacoes" },
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
    if (path === "/financeiro/pagar") {
      return location.pathname.startsWith("/financeiro");
    }
    return location.pathname === path;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t md:hidden">
      <div className="flex items-center justify-around h-16 px-1">
        {tabs.map((tab) => {
          if (tab.path === "__more__") {
            return (
              <Sheet key="more" open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <button className="flex flex-col items-center gap-0.5 px-2 py-1 text-muted-foreground">
                    <Menu className="h-5 w-5" strokeWidth={2.5} />
                    <span className="text-[10px]">Mais</span>
                  </button>
                </SheetTrigger>
                <SheetContent side="bottom" className="rounded-t-xl pb-8">
                  <div className="grid grid-cols-3 gap-4 pt-4">
                    {moreItems.map((item) => (
                      <button
                        key={item.path}
                        onClick={() => {
                          navigate(item.path);
                          setOpen(false);
                        }}
                        className={`flex flex-col items-center gap-1.5 p-3 rounded-lg transition-colors ${
                          location.pathname === item.path
                            ? "bg-accent text-accent-foreground"
                            : "text-muted-foreground hover:bg-secondary"
                        }`}
                      >
                        <item.icon className="h-5 w-5" strokeWidth={2.5} />
                        <span className="text-xs">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            );
          }
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center gap-0.5 px-2 py-1 transition-colors ${
                isActive(tab.path) ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <tab.icon className="h-5 w-5" strokeWidth={2.5} />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
