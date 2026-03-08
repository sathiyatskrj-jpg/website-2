"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  Trophy,
  FileText,
  Download,
  Image as ImageIcon,
  LogOut,
  Settings,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Basic auth guard: Only check if not on login page
    if (pathname === "/admin/login") {
      setLoading(false);
      return;
    }

    const checkUser = async () => {
      const supabase = getSupabaseBrowserClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/admin/login");
      } else {
        setUserEmail(user.email ?? null);
        setLoading(false);
      }
    };
    checkUser();
  }, [router, pathname]);

  const handleSignOut = async () => {
    const supabase = getSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.push("/");
  };

  // If loading or on login page, just render children without sidebar
  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Players", href: "/admin/players", icon: Users },
    { name: "Tournaments", href: "/admin/tournaments", icon: Trophy },
    { name: "News & Events", href: "/admin/news", icon: FileText },
    { name: "Downloads", href: "/admin/downloads", icon: Download },
    { name: "Gallery", href: "/admin/gallery", icon: ImageIcon },
  ];

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white dark:bg-neutral-950 border-r border-border hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-border">
          <Link href="/admin" className="font-bold text-lg tracking-tight flex items-center gap-2">
             <div className="w-8 h-8 bg-primary text-primary-foreground rounded-md flex justify-center items-center">
                A
             </div>
             ANCA Portal
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  isActive 
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground hover:text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800"
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border space-y-1">
           {userEmail && (
             <div className="px-3 py-2 border-b border-border mb-2 text-xs text-muted-foreground truncate">
               {userEmail}
             </div>
           )}
          <Link
             href="/admin/settings"
             className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
             <Settings className="w-4 h-4" />
             Settings
          </Link>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors text-left"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header (Hidden on MD+) */}
        <header className="h-16 bg-white dark:bg-neutral-950 border-b border-border flex items-center justify-between px-4 md:hidden">
           <span className="font-bold">ANCA Admin</span>
           <button onClick={handleSignOut} className="text-red-500"><LogOut className="w-5 h-5"/></button>
        </header>
        
        {/* Page Content */}
        <div className="flex-1 overflow-auto p-4 md:p-8">
           <div className="max-w-6xl mx-auto">
              {children}
           </div>
        </div>
      </main>
    </div>
  );
}
