import { UserPlus, Star } from "lucide-react";

export default function ArbitersCoachesPage() {
  const arbiters = [
    { name: "John Doe", title: "FIDE Arbiter", rating: 1900, license: "FA-91823", phone: "+91 99999 00001" },
    { name: "Jane Smith", title: "Senior National Arbiter", rating: 1750, license: "SNA-1122", phone: "+91 99999 00002" },
  ];
  const coaches = [
    { name: "Master Wayne", title: "FIDE Instructor", rating: 2100, exp: "10 Years", phone: "+91 99999 00003" },
    { name: "Bruce Banner", title: "National Instructor", rating: 2050, exp: "8 Years", phone: "+91 99999 00004" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-primary text-primary-foreground py-16 bg-chess-pattern relative">
        <div className="absolute inset-0 bg-primary/95"></div>
        <div className="container relative mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-black font-poppins mb-4">Arbiters & Coaches</h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Certified professionals dedicated to fair play and nurturing the next generation of chess talent.
          </p>
        </div>
      </section>

      <section className="py-12 bg-background flex-1">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="mb-12">
            <h2 className="text-2xl font-bold font-poppins mb-6 flex items-center gap-2"><UserPlus className="text-secondary" /> Registered Arbiters</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {arbiters.map((a, i) => (
                <div key={i} className="bg-card border border-border p-6 rounded-xl flex items-start justify-between shadow-sm">
                  <div>
                    <h3 className="font-bold text-lg">{a.name}</h3>
                    <p className="text-sm font-medium text-secondary mb-2">{a.title}</p>
                    <p className="text-sm text-muted-foreground">License: {a.license}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold bg-muted px-2 py-1 rounded">Rating: {a.rating}</p>
                    <p className="text-sm mt-3 text-muted-foreground">{a.phone}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold font-poppins mb-6 flex items-center gap-2"><Star className="text-secondary" /> Certified Coaches</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {coaches.map((c, i) => (
                <div key={i} className="bg-card border border-border p-6 rounded-xl flex items-start justify-between shadow-sm">
                  <div>
                    <h3 className="font-bold text-lg">{c.name}</h3>
                    <p className="text-sm font-medium text-secondary mb-2">{c.title}</p>
                    <p className="text-sm text-muted-foreground">Experience: {c.exp}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold bg-muted px-2 py-1 rounded">Rating: {c.rating}</p>
                    <p className="text-sm mt-3 text-muted-foreground">{c.phone}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
