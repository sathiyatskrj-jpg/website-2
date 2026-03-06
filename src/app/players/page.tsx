import { Search, Trophy, Medal } from "lucide-react";

export default function PlayersPage() {
  const players = [
    { id: 1, name: "Viswanathan Anand", title: "GM", rating: 2750, aicfId: "12345", profile: "https://ui-avatars.com/api/?name=VA&background=random" },
    { id: 2, name: "Rameshbabu Praggnanandhaa", title: "GM", rating: 2747, aicfId: "54321", profile: "https://ui-avatars.com/api/?name=RP&background=random" },
    { id: 3, name: "Harika Dronavalli", title: "GM", rating: 2500, aicfId: "98765", profile: "https://ui-avatars.com/api/?name=HD&background=random" },
    { id: 4, name: "Nihal Sarin", title: "GM", rating: 2680, aicfId: "45678", profile: "https://ui-avatars.com/api/?name=NS&background=random" },
    // Mock Andaman players
    { id: 5, name: "Andaman Challenger", title: "FM", rating: 2200, aicfId: "AN-001", profile: "https://ui-avatars.com/api/?name=AC&background=random" },
    { id: 6, name: "Island Master", title: "CM", rating: 2050, aicfId: "AN-002", profile: "https://ui-avatars.com/api/?name=IM&background=random" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-primary text-primary-foreground py-16 bg-chess-pattern relative">
        <div className="absolute inset-0 bg-primary/95"></div>
        <div className="container relative mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-black font-poppins mb-4">Player Directory</h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Search and view profiles, FIDE ratings, and achievements of registered chess players in the Andaman & Nicobar Islands.
          </p>
        </div>
      </section>

      <section className="py-12 bg-background flex-1">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Search Bar */}
          <div className="bg-card border border-border rounded-xl p-4 flex flex-col sm:flex-row items-center gap-3 mb-8 shadow-sm">
            <Search className="text-muted-foreground h-5 w-5 ml-2 hidden sm:block" />
            <input 
              type="text" 
              placeholder="Search by Name, AICF ID, or Title..." 
              className="flex-1 w-full bg-transparent border border-border sm:border-none rounded-lg px-4 py-3 outline-none text-foreground placeholder:text-muted-foreground font-medium focus:ring-2 focus:ring-primary sm:focus:ring-0"
            />
            <button className="w-full sm:w-auto bg-secondary text-secondary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-secondary/90 transition-colors">
              Search
            </button>
          </div>

          {/* Players Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {players.map(player => (
              <div key={player.id} className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all group">
                <div className="flex items-start gap-4 mb-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={player.profile} alt={player.name} className="h-16 w-16 rounded-full border-2 border-primary/10 group-hover:border-secondary transition-colors" />
                  <div>
                    <h3 className="font-bold font-poppins text-lg text-foreground line-clamp-1">{player.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-bold bg-primary/10 text-primary px-2 py-0.5 rounded uppercase">{player.title}</span>
                      <span className="text-sm font-medium text-muted-foreground">AICF: {player.aicfId}</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-border">
                  <div className="bg-muted rounded-lg p-3 text-center">
                    <p className="text-xs text-muted-foreground font-medium uppercase mb-1 flex items-center justify-center gap-1"><Trophy className="h-3 w-3" /> FIDE</p>
                    <p className="font-bold font-poppins text-foreground">{player.rating}</p>
                  </div>
                  <div className="bg-muted rounded-lg p-3 text-center">
                    <p className="text-xs text-muted-foreground font-medium uppercase mb-1 flex items-center justify-center gap-1"><Medal className="h-3 w-3" /> State Rank</p>
                    <p className="font-bold font-poppins text-foreground">#{player.id}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
