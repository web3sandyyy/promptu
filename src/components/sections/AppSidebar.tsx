import { Link, useLocation } from "react-router-dom";
import { Terminal } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { CATEGORIES, CATEGORY_ICONS, NAV_ITEMS, NAV_ICONS } from "@/constants";

export function AppSidebar() {
  const location = useLocation();

  // Helper to check if a category route is active
  const isCategoryActive = (categoryName: string) => {
    return location.pathname === `/library/${categoryName}`;
  };

  const isAllPromptsActive = location.pathname === "/library";

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader>
        <div className="flex items-center gap-2 ">
          <Terminal className="size-4 text-white group-data-[collapsible=icon]:mx-auto" />
          <div className="group-data-[collapsible=icon]:hidden">
            <h1 className="header-font text-2xl text-white tracking-wider">PROMPTU</h1>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="divide-y">
        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="text-xs text-muted-foreground uppercase tracking-wider">
            &gt; Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-0">
              {NAV_ITEMS.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild isActive={location.pathname === item.path}>
                    <Link
                      to={item.path}
                      className="group-data-[collapsible=icon]:mx-auto data-[active=true]:text-white"
                    >
                      {NAV_ICONS[item.icon]}
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="text-xs text-muted-foreground uppercase tracking-wider">
            &gt; Categories
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-0">
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isAllPromptsActive}>
                  <Link
                    to="/library"
                    className="group-data-[collapsible=icon]:mx-auto data-[active=true]:text-white"
                  >
                    {NAV_ICONS.terminal}
                    <span>ALL_PROMPTS</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {CATEGORIES.map((category) => (
                <SidebarMenuItem key={category.id}>
                  <SidebarMenuButton asChild isActive={isCategoryActive(category.name)}>
                    <Link
                      to={`/library/${category.name}`}
                      className="group-data-[collapsible=icon]:mx-auto data-[active=true]:text-white"
                    >
                      {CATEGORY_ICONS[category.title]}
                      <span className="truncate">
                        {category.title.replace(/ & /g, "_").replace(/ /g, "_").toUpperCase()}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="p-3 border-t border-sidebar-border">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-[#4ade80]" />
              <span className="text-muted-foreground group-data-[collapsible=icon]:hidden">
                ONLINE
              </span>
            </div>
            <span className="text-muted-foreground group-data-[collapsible=icon]:hidden">
              {new Date().toLocaleTimeString("en-US", { hour12: false })}
            </span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
