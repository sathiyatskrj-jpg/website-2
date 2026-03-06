import { LayoutDashboard, Users, Trophy, FileText, Image as ImageIcon, LogOut } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-muted">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-card border-r border-border flex flex-col">
        <div className="p-6 border-b border-border">
          <h2 className="text-xl font-black font-poppins text-primary">ANCA Admin</h2>
          <p className="text-xs text-muted-foreground mt-1">v1.0.0 Dashboard</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <button className="w-full flex items-center gap-3 px-3 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm">
            <LayoutDashboard className="h-4 w-4" /> Overview
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg font-medium text-sm transition-colors">
            <Trophy className="h-4 w-4" /> Tournaments
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg font-medium text-sm transition-colors">
            <Users className="h-4 w-4" /> Registrations
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg font-medium text-sm transition-colors">
            <FileText className="h-4 w-4" /> News & Circulars
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg font-medium text-sm transition-colors">
            <ImageIcon className="h-4 w-4" /> Gallery Media
          </button>
        </nav>
        <div className="p-4 border-t border-border">
          <button className="w-full flex items-center gap-3 px-3 py-2 text-destructive hover:bg-destructive/10 rounded-lg font-medium text-sm transition-colors">
            <LogOut className="h-4 w-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8">
        <h1 className="text-3xl font-bold font-poppins mb-8">Dashboard Overview</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-card border border-border p-6 rounded-xl shadow-sm">
            <p className="text-sm font-medium text-muted-foreground mb-1">Total Players</p>
            <h3 className="text-3xl font-bold">524</h3>
          </div>
          <div className="bg-card border border-border p-6 rounded-xl shadow-sm">
            <p className="text-sm font-medium text-muted-foreground mb-1">Active Tournaments</p>
            <h3 className="text-3xl font-bold">2</h3>
          </div>
          <div className="bg-card border border-border p-6 rounded-xl shadow-sm">
            <p className="text-sm font-medium text-muted-foreground mb-1">Pending Registrations</p>
            <h3 className="text-3xl font-bold text-secondary">18</h3>
          </div>
          <div className="bg-card border border-border p-6 rounded-xl shadow-sm">
            <p className="text-sm font-medium text-muted-foreground mb-1">Total Revenue</p>
            <h3 className="text-3xl font-bold text-green-600">₹45k</h3>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-border flex justify-between items-center">
            <h3 className="font-bold text-lg">Recent Registrations</h3>
            <button className="text-primary text-sm font-medium hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b border-border">
                <tr>
                  <th className="px-6 py-3 font-medium">Player Name</th>
                  <th className="px-6 py-3 font-medium">Tournament</th>
                  <th className="px-6 py-3 font-medium">Amount</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border last:border-0 hover:bg-muted/30">
                  <td className="px-6 py-4 font-medium">Rahul Kumar</td>
                  <td className="px-6 py-4 text-muted-foreground">State Championship 2026</td>
                  <td className="px-6 py-4">₹1000</td>
                  <td className="px-6 py-4"><span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold w-max">PAID</span></td>
                  <td className="px-6 py-4">
                    <button className="text-primary hover:underline font-medium">Approve</button>
                  </td>
                </tr>
                <tr className="border-b border-border last:border-0 hover:bg-muted/30">
                  <td className="px-6 py-4 font-medium">Priya Sharma</td>
                  <td className="px-6 py-4 text-muted-foreground">State Championship 2026</td>
                  <td className="px-6 py-4">₹1000</td>
                  <td className="px-6 py-4"><span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-bold w-max">PENDING</span></td>
                  <td className="px-6 py-4">
                    <button className="text-primary hover:underline font-medium">Review</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
