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
    <Sidebar className="h-screen flex flex-col justify-between pt-10 [&>div]:bg-[#bcb4cc] text-black">
      <SidebarContent className="flex-1 flex flex-col px-6 pt-1">
        <SidebarGroup>
          <SidebarGroupLabel className="mb-4 text-lg font-bold"/>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-4 text-2xl font-bold">
              {elements.map((ele) => (
                <SidebarMenuItem key={ele.title}>
                  <SidebarMenuButton asChild>
                    <Link href={ele.url} prefetch>
                      <span className="text-base">{ele.title}</span>
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
