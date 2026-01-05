import type React from "react";
import { AdminSidebar } from "@/components/NavBar/admin-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import {Toaster} from "sonner"
export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
        <SidebarProvider>
            <div className="flex min-h-screen w-full">
                <AdminSidebar />
                <SidebarInset className="flex-1">{children}</SidebarInset>
            </div>
        </SidebarProvider>
        <Toaster richColors position="bottom-right" />
        </div>
    );
}
