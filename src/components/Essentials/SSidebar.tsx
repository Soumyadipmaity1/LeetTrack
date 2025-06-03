import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

const elements = [
  {
    title: "Dashboard",
    url: "dashboard",
  },
  {
    title: "Calendar",
    url: "calendar",
  },
  {
    title: "Settings",
    url: "settings",
  },
];

export function SSidebar() {
  return (
    <Sidebar className="pt-10 bg-gray-800">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel></SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {elements.map((ele) => (
                <SidebarMenuItem key={ele.title}>
                  <SidebarMenuButton asChild>
                    <Link href={ele.url} prefetch={true}>
                      <span>{ele.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
