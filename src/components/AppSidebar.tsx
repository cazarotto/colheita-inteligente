import {
  LayoutDashboard, Wheat, Map, Tractor, CalendarCheck, Droplets,
  DollarSign, Package, ShoppingCart, Users, Wrench, ChevronRight,
  Leaf, Brain, FileBarChart, Factory, ShoppingBag, BookOpen, BarChart3,
  FileText, StickyNote, TrendingUp, Clock, Settings,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  SidebarHeader, SidebarFooter, useSidebar,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { useState } from "react";

const mainItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Inteligência", url: "/inteligencia", icon: Brain },
  { title: "Relatório IA", url: "/relatorio-ia", icon: FileBarChart },
];

const producaoItems = [
  { title: "Safras", url: "/safras", icon: Wheat },
  { title: "Talhões", url: "/talhoes", icon: Map },
  { title: "Operações", url: "/operacoes", icon: Tractor },
  { title: "Pulverizações", url: "/pulverizacoes", icon: Droplets },
  { title: "Planejamento", url: "/planejamento", icon: CalendarCheck },
  { title: "Produção", url: "/producao", icon: Factory },
];

const financeItems = [
  { title: "Contas a Pagar", url: "/financeiro/pagar", icon: DollarSign },
  { title: "Contas a Receber", url: "/financeiro/receber", icon: TrendingUp },
];

const commercialItems = [
  { title: "Vendas", url: "/comercial/vendas", icon: ShoppingCart },
  { title: "Compras", url: "/comercial/compras", icon: ShoppingBag },
];

const estoqueItems = [
  { title: "Estoque", url: "/estoque", icon: Package },
  { title: "Catálogo", url: "/estoque/catalogo", icon: BookOpen },
  { title: "Movimentações", url: "/estoque/movimentacoes", icon: BarChart3 },
];

const registerItems = [
  { title: "Operadores", url: "/cadastros/operadores", icon: Users },
  { title: "Máquinas", url: "/cadastros/maquinas", icon: Wrench },
];

const otherItems = [
  { title: "Documentos", url: "/documentos", icon: FileText },
  { title: "Anotações", url: "/anotacoes", icon: StickyNote },
];

function SidebarNavGroup({
  label, items, collapsed, defaultOpen: defaultOpenProp,
}: {
  label: string;
  items: { title: string; url: string; icon: React.ElementType }[];
  collapsed: boolean;
  defaultOpen?: boolean;
}) {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const hasActive = items.some((i) => isActive(i.url));
  const [open, setOpen] = useState(defaultOpenProp ?? hasActive ?? true);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <SidebarGroup className="py-0.5">
        {!collapsed && (
          <CollapsibleTrigger className="w-full group/label">
            <SidebarGroupLabel className="flex items-center justify-between cursor-pointer text-[10px] uppercase tracking-[0.14em] font-bold text-sidebar-muted/40 hover:text-sidebar-muted/70 transition-colors duration-200 px-4 py-2 mb-0.5">
              <span>{label}</span>
              <ChevronRight
                className={cn("h-3 w-3 transition-transform duration-200", open && "rotate-90")}
                strokeWidth={2.5}
              />
            </SidebarGroupLabel>
          </CollapsibleTrigger>
        )}
        <CollapsibleContent>
          <SidebarGroupContent>
            <SidebarMenu className="px-2.5 space-y-0.5">
              {items.map((item) => {
                const active = isActive(item.url);
                return (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton asChild isActive={active} className="h-9">
                      <NavLink
                        to={item.url}
                        end
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-medium transition-all duration-200 relative",
                          active
                            ? "bg-sidebar-primary/15 text-sidebar-primary sidebar-active-glow font-semibold"
                            : "text-sidebar-foreground hover:text-sidebar-accent-foreground hover:bg-sidebar-accent/50"
                        )}
                        activeClassName=""
                      >
                        <item.icon
                          className={cn(
                            "h-[17px] w-[17px] shrink-0 transition-all duration-200",
                            active ? "text-sidebar-primary drop-shadow-[0_0_6px_hsl(142,72%,48%/0.4)]" : "text-sidebar-muted"
                          )}
                          strokeWidth={active ? 2.5 : 1.7}
                        />
                        {!collapsed && <span>{item.title}</span>}
                        {active && !collapsed && (
                          <div className="ml-auto h-1.5 w-1.5 rounded-full bg-sidebar-primary breathe" />
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  );
}

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      <SidebarHeader className="p-4 pb-3">
        {!collapsed ? (
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center shadow-lg pulse-glow">
              <Leaf className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-[15px] font-extrabold tracking-tight text-sidebar-accent-foreground">SafraOS</h1>
              <p className="text-[10px] text-sidebar-muted/60 font-medium tracking-wide">Gestão Agrícola Inteligente</p>
            </div>
          </div>
        ) : (
          <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center mx-auto shadow-lg">
            <Leaf className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
          </div>
        )}
      </SidebarHeader>

      {/* Safra Ativa Card */}
      {!collapsed && (
        <div className="mx-3 mt-1 mb-3 p-3.5 rounded-xl bg-sidebar-accent border border-sidebar-border/60 relative overflow-hidden">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-sidebar-primary/5 to-transparent pointer-events-none" />
          <div className="relative">
            <div className="flex items-center gap-1.5 mb-2">
              <div className="h-2 w-2 rounded-full bg-sidebar-primary animate-pulse shadow-[0_0_8px_hsl(142,72%,48%/0.5)]" />
              <span className="text-[9px] uppercase tracking-[0.16em] font-extrabold text-sidebar-primary">Safra Ativa</span>
            </div>
            <p className="text-[13px] font-bold text-sidebar-accent-foreground leading-tight">Soja Temporada 2026</p>
            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center gap-1 text-[10px] text-sidebar-muted">
                <Clock className="h-3 w-3" strokeWidth={2} />
                <span>1d atrás</span>
              </div>
              <div className="h-3 w-px bg-sidebar-border" />
              <span className="text-[10px] text-sidebar-primary font-bold">Em Andamento</span>
            </div>
            <div className="mt-3 h-1.5 rounded-full bg-sidebar-border/60 overflow-hidden">
              <div className="h-full w-[35%] rounded-full gradient-primary shadow-[0_0_8px_hsl(142,72%,48%/0.3)] transition-all duration-1000" />
            </div>
          </div>
        </div>
      )}

      <SidebarContent className="py-1">
        <SidebarNavGroup label="Principal" items={mainItems} collapsed={collapsed} defaultOpen={true} />
        <SidebarNavGroup label="Produção" items={producaoItems} collapsed={collapsed} defaultOpen={true} />
        <SidebarNavGroup label="Financeiro" items={financeItems} collapsed={collapsed} defaultOpen={true} />
        <SidebarNavGroup label="Comercial" items={commercialItems} collapsed={collapsed} />
        <SidebarNavGroup label="Estoque" items={estoqueItems} collapsed={collapsed} />
        <SidebarNavGroup label="Cadastros" items={registerItems} collapsed={collapsed} />
        <SidebarNavGroup label="Outros" items={otherItems} collapsed={collapsed} />
      </SidebarContent>

      {!collapsed && (
        <SidebarFooter className="p-3 border-t border-sidebar-border/40">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full gradient-primary flex items-center justify-center text-[11px] font-extrabold text-primary-foreground shadow-md">
              AF
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-bold text-sidebar-accent-foreground truncate">Anderson Ferreira</p>
              <p className="text-[10px] text-sidebar-muted/60 truncate">Administrador</p>
            </div>
            <button className="h-8 w-8 rounded-lg flex items-center justify-center text-sidebar-muted/50 hover:text-sidebar-accent-foreground hover:bg-sidebar-accent transition-all duration-200">
              <Settings className="h-4 w-4" strokeWidth={1.8} />
            </button>
          </div>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
