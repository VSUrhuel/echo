import type React from "react";
import { AdminSidebar } from "@/components/NavBar/admin-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full">
                <AdminSidebar />
                <SidebarInset className="flex-1">{children}</SidebarInset>
            </div>
        </SidebarProvider>
    );
}
