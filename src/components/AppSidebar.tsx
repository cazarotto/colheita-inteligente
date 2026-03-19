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
  ChevronDown,
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
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

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

  return (
    <Collapsible defaultOpen={hasActive || true}>
      <SidebarGroup>
        <CollapsibleTrigger className="w-full">
          <SidebarGroupLabel className="flex items-center justify-between cursor-pointer">
            {!collapsed && <span>{label}</span>}
            {!collapsed && <ChevronDown className="h-3 w-3" strokeWidth={2.5} />}
          </SidebarGroupLabel>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <NavLink
                      to={item.url}
                      end
                      className="hover:bg-accent"
                      activeClassName="bg-accent text-accent-foreground font-medium"
                    >
                      <item.icon className="mr-2 h-4 w-4 shrink-0" strokeWidth={2.5} />
                      {!collapsed && <span className="text-sm">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
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
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader className="p-4">
        {!collapsed ? (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
              <Wheat className="h-4 w-4 text-primary-foreground" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-sm font-semibold tracking-tight">SafraOS</h1>
              <p className="text-[11px] text-muted-foreground">Fazenda Santa Fé</p>
            </div>
          </div>
        ) : (
          <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center mx-auto">
            <Wheat className="h-4 w-4 text-primary-foreground" strokeWidth={2.5} />
          </div>
        )}
      </SidebarHeader>
      <SidebarContent>
        <SidebarNavGroup label="Principal" items={mainItems} collapsed={collapsed} />
        <SidebarNavGroup label="Financeiro" items={financeItems} collapsed={collapsed} />
        <SidebarNavGroup label="Comercial" items={commercialItems} collapsed={collapsed} />
        <SidebarNavGroup label="Cadastros" items={registerItems} collapsed={collapsed} />
      </SidebarContent>
    </Sidebar>
  );
}
