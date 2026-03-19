import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { Outlet, useLocation } from "react-router-dom";
import { Leaf, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

const pageTitles: Record<string, string> = {
  "/dashboard": "Painel",
  "/safras": "Safras",
  "/talhoes": "Talhões",
  "/operacoes": "Operações",
  "/planejamento": "Planejamento",
  "/pulverizacoes": "Pulverizações",
  "/financeiro/pagar": "Contas a Pagar",
  "/financeiro/receber": "Contas a Receber",
  "/estoque": "Estoque",
  "/comercial/vendas": "Vendas",
  "/cadastros/operadores": "Operadores",
  "/cadastros/maquinas": "Máquinas",
};

export function AppLayout() {
  const location = useLocation();
  const title = pageTitles[location.pathname] || "SafraOS";

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <div className="hidden md:block">
          <AppSidebar />
        </div>
        <div className="flex-1 flex flex-col min-w-0">
          {/* Desktop header */}
          <header className="h-14 items-center border-b px-4 bg-card/80 backdrop-blur-sm shrink-0 hidden md:flex justify-between sticky top-0 z-30">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
              <div className="h-5 w-px bg-border" />
              <span className="text-sm font-medium text-foreground">{title}</span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="relative text-muted-foreground">
                <Bell className="h-4 w-4" strokeWidth={2} />
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary" />
              </Button>
            </div>
          </header>

          {/* Mobile header */}
          <header className="h-14 flex items-center border-b px-4 bg-card/80 backdrop-blur-sm shrink-0 md:hidden sticky top-0 z-30 justify-between">
            <div className="flex items-center gap-2.5">
              <div className="h-7 w-7 rounded-lg gradient-primary flex items-center justify-center">
                <Leaf className="h-3.5 w-3.5 text-primary-foreground" strokeWidth={2.5} />
              </div>
              <span className="text-sm font-semibold">{title}</span>
            </div>
            <Button variant="ghost" size="icon" className="relative text-muted-foreground h-8 w-8">
              <Bell className="h-4 w-4" strokeWidth={2} />
              <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
            </Button>
          </header>

          <main className="flex-1 p-4 md:p-6 pb-24 md:pb-6 overflow-auto">
            <div className="animate-fade-in max-w-[1400px] mx-auto">
              <Outlet />
            </div>
          </main>
        </div>
        <MobileBottomNav />
      </div>
    </SidebarProvider>
  );
}
