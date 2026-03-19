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
  { title: "Painel", url: "/dashboard", icon: LayoutDashboard },
  { title: "Safras", url: "/safras", icon: Wheat },
  { title: "Talhões", url: "/talhoes", icon: Map },
  { title: "Operações", url: "/operacoes", icon: Tractor },
  { title: "Planejamento", url: "/planejamento", icon: CalendarCheck },
  { title: "Pulverizações", url: "/pulverizacoes", icon: SprayCan },
  { title: "Estoque", url: "/estoque", icon: Package },
];

const financeItems = [
  { title: "Contas a Pagar", url: "/financeiro/pagar", icon: DollarSign },
  { title: "Contas a Receber", url: "/financeiro/receber", icon: DollarSign },
];

const commercialItems = [
  { title: "Vendas", url: "/comercial/vendas", icon: ShoppingCart },
];

const registerItems = [
  { title: "Operadores", url: "/cadastros/operadores", icon: Users },
  { title: "Máquinas", url: "/cadastros/maquinas", icon: Wrench },
];

function SidebarNavGroup({
  label,
  items,
  collapsed,
}: {
  label: string;
  items: { title: string; url: string; icon: React.ElementType }[];
  collapsed: boolean;
}) {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const hasActive = items.some((i) => isActive(i.url));
  const [open, setOpen] = useState(true);

  return (
    <Collapsible open={open} onOpenChange={setOpen} defaultOpen={hasActive || true}>
      <SidebarGroup className="py-1">
        {!collapsed && (
          <CollapsibleTrigger className="w-full group">
            <SidebarGroupLabel className="flex items-center justify-between cursor-pointer text-[10px] uppercase tracking-[0.1em] font-semibold text-sidebar-muted hover:text-sidebar-foreground transition-colors px-3 py-2">
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
                            ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                            : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                        )}
                        activeClassName=""
                      >
                        <item.icon
                          className={cn("h-4 w-4 shrink-0", active && "text-sidebar-primary")}
                          strokeWidth={active ? 2.5 : 2}
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
      <SidebarHeader className="p-4 pb-6">
        {!collapsed ? (
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl gradient-primary flex items-center justify-center shadow-sm pulse-glow">
              <Leaf className="h-[18px] w-[18px] text-primary-foreground" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-tight text-sidebar-accent-foreground">SafraOS</h1>
              <p className="text-[11px] text-sidebar-muted font-medium">Fazenda Santa Fé</p>
            </div>
          </div>
        ) : (
          <div className="h-9 w-9 rounded-xl gradient-primary flex items-center justify-center mx-auto shadow-sm">
            <Leaf className="h-[18px] w-[18px] text-primary-foreground" strokeWidth={2.5} />
          </div>
        )}
      </SidebarHeader>
      <SidebarContent className="py-1">
        <SidebarNavGroup label="Principal" items={mainItems} collapsed={collapsed} />
        <SidebarNavGroup label="Financeiro" items={financeItems} collapsed={collapsed} />
        <SidebarNavGroup label="Comercial" items={commercialItems} collapsed={collapsed} />
        <SidebarNavGroup label="Cadastros" items={registerItems} collapsed={collapsed} />
      </SidebarContent>
      {!collapsed && (
        <SidebarFooter className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-sidebar-accent flex items-center justify-center text-xs font-bold text-sidebar-primary">
              AF
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-sidebar-accent-foreground truncate">Anderson Ferreira</p>
              <p className="text-[10px] text-sidebar-muted truncate">Administrador</p>
            </div>
          </div>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
