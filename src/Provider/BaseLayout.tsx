"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import Navbar from "@components/Essentials/Navbar";
import { SSidebar } from "@components/Essentials/SSidebar";

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden w-full">
        {/* Sidebar */}
        <aside className="w-64 h-full flex-shrink-0">
          <SSidebar />
        </aside>
        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 h-full">
          <div className="flex-shrink-0 h-16">
            <Navbar />
          </div>
          <main className="flex-1 pt-0 px-6 pb-6 overflow-y-auto bg-white ">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
