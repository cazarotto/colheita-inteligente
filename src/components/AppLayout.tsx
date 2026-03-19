import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { Outlet, useLocation } from "react-router-dom";
import { Leaf, Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const pageTitles: Record<string, string> = {
  "/dashboard": "Painel",
  "/inteligencia": "Inteligência",
  "/relatorio-ia": "Relatório IA",
  "/safras": "Safras",
  "/talhoes": "Talhões",
  "/operacoes": "Operações",
  "/planejamento": "Planejamento",
  "/pulverizacoes": "Pulverizações",
  "/producao": "Produção",
  "/financeiro/pagar": "Contas a Pagar",
  "/financeiro/receber": "Contas a Receber",
  "/estoque": "Estoque",
  "/estoque/catalogo": "Catálogo",
  "/estoque/movimentacoes": "Movimentações",
  "/comercial/vendas": "Vendas",
  "/comercial/compras": "Compras",
  "/cadastros/operadores": "Operadores",
  "/cadastros/maquinas": "Máquinas",
  "/documentos": "Documentos",
  "/anotacoes": "Anotações",
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
          <header className="h-14 items-center border-b border-border/50 px-5 bg-card/70 backdrop-blur-xl shrink-0 hidden md:flex justify-between sticky top-0 z-30">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="text-muted-foreground hover:text-foreground transition-colors duration-200" />
              <div className="h-4 w-px bg-border/60" />
              <span className="text-sm font-bold text-foreground">{title}</span>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground h-9 w-9 transition-colors duration-200">
                <Search className="h-4 w-4" strokeWidth={2} />
              </Button>
              <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground h-9 w-9 transition-colors duration-200">
                <Bell className="h-4 w-4" strokeWidth={2} />
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary ring-2 ring-card shadow-[0_0_6px_hsl(142,72%,48%/0.5)]" />
              </Button>
            </div>
          </header>

          {/* Mobile header */}
          <header className="h-[56px] flex items-center border-b border-border/40 px-4 bg-card/80 backdrop-blur-xl shrink-0 md:hidden sticky top-0 z-30 justify-between">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center shadow-md">
                <Leaf className="h-4 w-4 text-primary-foreground" strokeWidth={2.5} />
              </div>
              <div>
                <span className="text-[14px] font-extrabold block leading-tight text-foreground">{title}</span>
                <span className="text-[10px] text-muted-foreground/60 leading-none font-medium">SafraOS</span>
              </div>
            </div>
            <div className="flex items-center gap-0.5">
              <Button variant="ghost" size="icon" className="relative text-muted-foreground h-9 w-9">
                <Bell className="h-4 w-4" strokeWidth={2} />
                <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_6px_hsl(142,72%,48%/0.5)]" />
              </Button>
            </div>
          </header>

          <main className="flex-1 p-4 md:p-6 pb-24 md:pb-6 overflow-auto">
            <div className="animate-fade-in-up max-w-[1400px] mx-auto">
              <Outlet />
            </div>
          </main>
        </div>
        <MobileBottomNav />
      </div>
    </SidebarProvider>
  );
}
