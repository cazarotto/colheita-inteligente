import {
  LayoutDashboard,
  Wheat,
  Map,
  Tractor,
  CalendarCheck,
  SprayCan,
  DollarSign,
  Package,
  ShoppingCart,
  Users,
  Wrench,
  ChevronRight,
  Leaf,
  Brain,
  FileBarChart,
  Factory,
  ShoppingBag,
  BookOpen,
  BarChart3,
  FileText,
  StickyNote,
  TrendingUp,
  Clock,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
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
  { title: "Pulverizações", url: "/pulverizacoes", icon: SprayCan },
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
  label,
  items,
  collapsed,
  defaultOpen: defaultOpenProp,
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
          <CollapsibleTrigger className="w-full group">
            <SidebarGroupLabel className="flex items-center justify-between cursor-pointer text-[10px] uppercase tracking-[0.12em] font-bold text-sidebar-muted/60 hover:text-sidebar-muted transition-colors px-3 py-2 mb-0.5">
              <span>{label}</span>
              <ChevronRight
                className={cn(
                  "h-3 w-3 transition-transform duration-200",
                  open && "rotate-90"
                )}
                strokeWidth={2.5}
              />
            </SidebarGroupLabel>
          </CollapsibleTrigger>
        )}
        <CollapsibleContent>
          <SidebarGroupContent>
            <SidebarMenu className="px-2 space-y-0.5">
              {items.map((item) => {
                const active = isActive(item.url);
                return (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton asChild isActive={active} className="h-9">
                      <NavLink
                        to={item.url}
                        end
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-medium transition-all duration-150",
                          active
                            ? "bg-sidebar-primary/15 text-sidebar-primary"
                            : "text-sidebar-foreground hover:text-sidebar-accent-foreground hover:bg-sidebar-accent/50"
                        )}
                        activeClassName=""
                      >
                        <item.icon
                          className={cn("h-[18px] w-[18px] shrink-0", active && "text-sidebar-primary")}
                          strokeWidth={active ? 2.5 : 1.8}
                        />
                        {!collapsed && <span>{item.title}</span>}
                        {active && !collapsed && (
                          <div className="ml-auto h-1.5 w-1.5 rounded-full bg-sidebar-primary" />
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
      <SidebarHeader className="p-4 pb-2">
        {!collapsed ? (
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl gradient-primary flex items-center justify-center shadow-sm pulse-glow">
              <Leaf className="h-[18px] w-[18px] text-primary-foreground" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-tight text-sidebar-accent-foreground">SafraOS</h1>
              <p className="text-[11px] text-sidebar-muted font-medium">Gestão Agrícola</p>
            </div>
          </div>
        ) : (
          <div className="h-9 w-9 rounded-xl gradient-primary flex items-center justify-center mx-auto shadow-sm">
            <Leaf className="h-[18px] w-[18px] text-primary-foreground" strokeWidth={2.5} />
          </div>
        )}
      </SidebarHeader>

      {/* Safra Ativa Card */}
      {!collapsed && (
        <div className="mx-3 mt-2 mb-1 p-3 rounded-xl bg-sidebar-accent/80 border border-sidebar-border">
          <div className="flex items-center gap-1.5 mb-1">
            <div className="h-2 w-2 rounded-full bg-sidebar-primary animate-pulse" />
            <span className="text-[10px] uppercase tracking-wider font-bold text-sidebar-primary">Safra Ativa</span>
          </div>
          <p className="text-xs font-semibold text-sidebar-accent-foreground leading-tight">Soja Temporada 2026</p>
          <div className="flex items-center gap-2 mt-1.5">
            <div className="flex items-center gap-1 text-[10px] text-sidebar-muted">
              <Clock className="h-3 w-3" strokeWidth={2} />
              <span>1d</span>
            </div>
            <span className="text-[10px] text-sidebar-muted">Em Andamento</span>
          </div>
        </div>
      )}

      <SidebarContent className="py-2">
        <SidebarNavGroup label="Principal" items={mainItems} collapsed={collapsed} defaultOpen={true} />
        <SidebarNavGroup label="Produção" items={producaoItems} collapsed={collapsed} defaultOpen={true} />
        <SidebarNavGroup label="Financeiro" items={financeItems} collapsed={collapsed} defaultOpen={true} />
        <SidebarNavGroup label="Comercial" items={commercialItems} collapsed={collapsed} />
        <SidebarNavGroup label="Estoque" items={estoqueItems} collapsed={collapsed} />
        <SidebarNavGroup label="Cadastros" items={registerItems} collapsed={collapsed} />
        <SidebarNavGroup label="Outros" items={otherItems} collapsed={collapsed} />
      </SidebarContent>
      {!collapsed && (
        <SidebarFooter className="p-3 border-t border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full gradient-primary flex items-center justify-center text-[11px] font-bold text-primary-foreground">
              AF
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-sidebar-accent-foreground truncate">Anderson Ferreira</p>
              <p className="text-[10px] text-sidebar-muted truncate">Administrador</p>
            </div>
          </div>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
