import { Archive, BarChart3, Bot, Cpu, Layers, Radio, Settings, Shield } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Wardrobe Archives", url: "/", icon: Archive },
  { title: "Outfit Simulation", url: "/", icon: Layers },
  { title: "Impact Analysis", url: "/", icon: BarChart3 },
  { title: "AI Stylist", url: "/", icon: Bot },
  { title: "Carbon Radar", url: "/", icon: Radio },
];

const systemItems = [
  { title: "System Status", url: "/", icon: Cpu },
  { title: "Security", url: "/", icon: Shield },
  { title: "Settings", url: "/", icon: Settings },
];

export function DashboardSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarContent className="py-4">
        {/* Logo */}
        {!collapsed && (
          <div className="px-4 mb-6">
            <h1 className="text-sm font-display tracking-[0.2em] neon-text-blue">ECO-SCAN</h1>
            <p className="text-[10px] text-muted-foreground font-mono mt-1">
              v3.2.1 // ACTIVE
            </p>
          </div>
        )}

        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] font-display tracking-widest text-muted-foreground">
            Operations
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item, i) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className="hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
                      activeClassName={i === 0 ? "bg-muted text-primary font-medium neon-border" : ""}
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span className="text-xs">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] font-display tracking-widest text-muted-foreground">
            System
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {systemItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className="hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
                      activeClassName=""
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span className="text-xs">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Status indicator */}
        {!collapsed && (
          <div className="mt-auto px-4 pt-6">
            <div className="glass-panel p-3 space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                <span className="text-[10px] font-mono text-muted-foreground">ENGINE ONLINE</span>
              </div>
              <div className="h-1 bg-muted rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-primary rounded-full" />
              </div>
              <p className="text-[9px] text-muted-foreground">Neural capacity: 74%</p>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
