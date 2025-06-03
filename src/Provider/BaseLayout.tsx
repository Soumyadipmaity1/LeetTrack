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

    <div className="flex h-screen w-full">

      <div className="flex h-screen w-screen">

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
      </div>
    </SidebarProvider>
  );
}
