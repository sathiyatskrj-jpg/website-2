import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
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

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
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
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                <Icon className="w-4 h-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border space-y-1">
          <Link
             href="/admin/settings"
             className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
             <Settings className="w-4 h-4" />
             Settings
          </Link>
          <form action="/auth/signout" method="post">
            <button
              type="submit"
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header (Hidden on MD+) */}
        <header className="h-16 bg-white dark:bg-neutral-950 border-b border-border flex items-center justify-between px-4 md:hidden">
           <span className="font-bold">ANCA Admin</span>
           {/* Mobile Menu Button would go here */}
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
