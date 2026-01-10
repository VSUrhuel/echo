"use client";

import { SiteHeader } from "@/components/NavBar/site-header";
import { Footer } from "@/components/NavBar/footer";
import { Home as HomeIcon, Info, LogIn, LayoutDashboard } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { createClient } from "@/utils/supabase/client";

// Define mobile icon map
const mobileIconMap = {
  home: HomeIcon,
  login: LogIn,
  info: Info,
  dashboard: LayoutDashboard,
};

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();

  useEffect(() => {
    // Check initial session
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setIsAuthenticated(!!session);
      } catch (error) {
        console.error("Error checking session:", error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      const authenticated = !!session;
      setIsAuthenticated(authenticated);

      if (authenticated && (pathname === "/" || pathname === "/login")) {
        router.push("/admin-dashboard");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [pathname, router, supabase]);

  // Dynamic navigation links based on authentication status
  const navLinks = [
    {
      label: "Home",
      icon: "home",
      href: isAuthenticated ? "/admin" : "/",
    },
    {
      label: "About",
      icon: "info",
      href: "/coming-soon",
    },
    {
      label: isAuthenticated ? "Dashboard" : "",
      icon: isAuthenticated ? "dashboard" : "",
      href: isAuthenticated ? "/admin" : "/",
    },
  ];

  // Always show loading screen while loading
  if (loading) {
    return <LoadingScreen message="Getting things ready..." />;
  }

  // Only render children when not loading
  const isLoginPage = pathname === "/login";
  return (
  <div className="flex min-h-screen w-full">
      <div className="flex-1 flex flex-col min-w-0">
        {/* Hide Header on Login Page */}
        {!isLoginPage && <SiteHeader />}
        
        <main className="flex-1">{children}</main>
        
        {/* Hide Bottom Nav on Login Page */}
        {!isLoginPage && <Footer />}
      </div>
    </div>
  );
}