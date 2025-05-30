import{
  Sidebar,
  SidebarContent,
  SidebarMenuItem,
  SidebarFooter,
  SidebarMenu,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenuButton,
  SidebarGroupLabel,
}from "@/components/ui/sidebar"

const elements = [

  {
    title: "Dashboard",
    url: "#",
    
  },
  {
    title: "Calendar",
    url: "#",
    
  },
  {
    title: "Settings",
    url: "#",
   
  },

]




export function SSidebar() {
  return (
    <Sidebar className="pt-10 bg-gray-800">
      <SidebarContent>

      <SidebarGroup>
          
          <SidebarGroupLabel></SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
             {elements.map((ele)=>(
              <SidebarMenuItem key={ele.title}>
                <SidebarMenuButton asChild>
                <a href={ele.url}>
                
                <span>{ele.title}</span>
                </a>
                </SidebarMenuButton>

              </SidebarMenuItem>
             ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        </SidebarContent>
    </Sidebar>
  )
}

