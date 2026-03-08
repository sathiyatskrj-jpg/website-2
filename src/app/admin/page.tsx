"use client";

import { useEffect, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Trophy, FileText, Download } from "lucide-react";

export default function AdminDashboard() {
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = getSupabaseBrowserClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email ?? null);
      }
    };
    fetchUser();
  }, []);

  // We could fetch real counts here later
  const stats = [
    { name: "Total Players", value: "245", icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
    { name: "Active Tournaments", value: "3", icon: Trophy, color: "text-amber-500", bg: "bg-amber-500/10" },
    { name: "News Articles", value: "12", icon: FileText, color: "text-green-500", bg: "bg-green-500/10" },
    { name: "Downloads", value: "8", icon: Download, color: "text-purple-500", bg: "bg-purple-500/10" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back{userEmail ? `, ${userEmail}` : ""}. Here is what's happening today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.name} className="border-border/50 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.name}
                </CardTitle>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${stat.bg}`}>
                  <Icon className={`w-4 h-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-border/50 shadow-sm">
           <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
           </CardHeader>
           <CardContent>
              <p className="text-sm text-muted-foreground">No recent activity to display yet.</p>
           </CardContent>
        </Card>
        <Card className="border-border/50 shadow-sm">
           <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
           </CardHeader>
           <CardContent className="space-y-2">
              <button className="w-full text-left px-4 py-2 text-sm rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                 + Add New Player
              </button>
              <button className="w-full text-left px-4 py-2 text-sm rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                 + Create Tournament
              </button>
              <button className="w-full text-left px-4 py-2 text-sm rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                 + Publish News Article
              </button>
           </CardContent>
        </Card>
      </div>
    </div>
  );
}
