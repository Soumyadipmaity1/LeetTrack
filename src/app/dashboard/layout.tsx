import { SidebarProvider } from "@/components/ui/sidebar";
import { SSidebar } from "@components/Essentials/SSidebar";
import Navbar from "@components/Essentials/Navbar";

export default function AdminLayout({children}:{children: React.ReactNode}){
  return(
    <SidebarProvider>
      <div className="flex h-screen">
        <div className="w-64">
        <SSidebar />
        </div>
      
      
      <div className="flex-1 flex flex-col">
      <Navbar />
      
      <main className="flex-1 p-6 overflow-y-auto bg-white">
        
        {children}
      </main>
      </div>
      </div>
    </SidebarProvider>
  )
}