import Link from "next/link";
import { Search, Trophy, Medal, Users, ChevronRight } from "lucide-react";

const players = [
  { id: 1, name: "A. Rajesh Kumar", title: "FM", rating: 2245, aicfId: "AN-001", district: "South Andaman", rank: 1 },
  { id: 2, name: "K. Priya Devi", title: "WCM", rating: 1908, aicfId: "AN-002", district: "South Andaman", rank: 2 },
  { id: 3, name: "M. Rajan", title: "CM", rating: 2055, aicfId: "AN-003", district: "North Andaman", rank: 3 },
  { id: 4, name: "S. Island Champ", title: "", rating: 1780, aicfId: "AN-004", district: "Nicobar", rank: 4 },
  { id: 5, name: "D. Port Blair", title: "", rating: 1650, aicfId: "AN-005", district: "South Andaman", rank: 5 },
  { id: 6, name: "P. Nicobar Star", title: "", rating: 1540, aicfId: "AN-006", district: "Nicobar", rank: 6 },
];

const TITLE_COLORS: Record<string, string> = {
  GM: "bg-yellow-100 text-yellow-800 border border-yellow-200",
  FM: "bg-blue-100 text-blue-800 border border-blue-200",
  CM: "bg-purple-100 text-purple-800 border border-purple-200",
  WCM: "bg-pink-100 text-pink-800 border border-pink-200",
  "": "bg-gray-100 text-gray-600 border border-gray-200",
};

export default function PlayersPage() {
  return (
    <div className="flex flex-col w-full">
      <section className="bg-primary text-primary-foreground py-8 border-b-4 border-secondary">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-primary-foreground/70 mb-3">
            <Link href="/">Home</Link><ChevronRight className="h-4 w-4" /><span>Player Directory</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black font-poppins uppercase tracking-wide flex items-center gap-3">
            <Users className="h-8 w-8 text-secondary" /> Player Directory
          </h1>
          <p className="text-primary-foreground/80 mt-2">Search FIDE-rated and AICF-registered players from A&N Islands</p>
        </div>
      </section>

      {/* Search Inputs */}
      <div className="bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input type="text" placeholder="Search by name or AICF ID..." className="w-full pl-10 pr-4 py-2 border border-border rounded bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <select className="border border-border rounded py-2 px-3 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary">
              <option>All Districts</option>
              <option>South Andaman</option>
              <option>North &amp; Middle Andaman</option>
              <option>Nicobar</option>
            </select>
            <select className="border border-border rounded py-2 px-3 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary">
              <option>All Titles</option>
              <option>GM</option><option>IM</option><option>FM</option><option>CM</option><option>WGM</option><option>WIM</option><option>WFM</option><option>WCM</option>
            </select>
            <button className="bg-primary text-primary-foreground px-6 py-2 rounded text-sm font-bold uppercase tracking-wider hover:bg-primary/90 transition-colors">Search</button>
          </div>
        </div>
      </div>

      <section className="py-10 container mx-auto px-4">
        <div className="bg-card border border-border shadow-sm rounded-md overflow-hidden">
          {/* Table Header */}
          <div className="hidden md:grid grid-cols-12 bg-primary text-primary-foreground text-xs uppercase tracking-widest font-bold py-3 px-6">
            <div className="col-span-1">#</div>
            <div className="col-span-4">Player Name</div>
            <div className="col-span-1 text-center">Title</div>
            <div className="col-span-2 text-center">FIDE Rating</div>
            <div className="col-span-2">AICF ID</div>
            <div className="col-span-2">District</div>
          </div>

          {players.map((p, idx) => (
            <div key={p.id} className={`grid md:grid-cols-12 gap-4 px-6 py-4 border-b border-border last:border-0 hover:bg-muted/50 transition-colors items-center ${idx % 2 === 0 ? "" : "bg-muted/20"}`}>
              {/* Mobile view combines */}
              <div className="md:hidden flex items-center justify-between">
                <div>
                  <div className="font-bold text-foreground">{p.name}</div>
                  <div className="text-xs text-muted-foreground">{p.aicfId} · {p.district}</div>
                </div>
                <div className="flex items-center gap-2">
                  {p.title && <span className={`px-2 py-0.5 text-xs font-bold rounded-sm uppercase ${TITLE_COLORS[p.title]}`}>{p.title}</span>}
                  <span className="font-bold text-foreground">{p.rating}</span>
                </div>
              </div>

              {/* Desktop */}
              <div className="hidden md:block md:col-span-1 text-muted-foreground font-semibold text-sm">{p.rank}</div>
              <div className="hidden md:block md:col-span-4">
                <Link href={`/players/${p.id}`} className="font-bold text-foreground hover:text-primary transition-colors">{p.name}</Link>
              </div>
              <div className="hidden md:flex md:col-span-1 justify-center">
                {p.title ? (
                  <span className={`px-2 py-0.5 text-xs font-bold rounded-sm uppercase ${TITLE_COLORS[p.title]}`}>{p.title}</span>
                ) : <span className="text-muted-foreground text-xs">—</span>}
              </div>
              <div className="hidden md:flex md:col-span-2 items-center justify-center gap-1">
                <Trophy className="h-4 w-4 text-secondary" />
                <span className="font-bold text-foreground">{p.rating}</span>
              </div>
              <div className="hidden md:block md:col-span-2 text-sm text-muted-foreground">{p.aicfId}</div>
              <div className="hidden md:block md:col-span-2 text-sm text-muted-foreground">{p.district}</div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-between items-center text-sm text-muted-foreground">
          <span>Showing 6 of 1,200+ registered players</span>
          <div className="flex gap-2">
            <button className="border border-border px-4 py-1.5 rounded text-xs hover:border-primary hover:text-primary">← Previous</button>
            <button className="border border-primary bg-primary text-primary-foreground px-4 py-1.5 rounded text-xs">Next →</button>
          </div>
        </div>
      </section>
    </div>
  );
}
