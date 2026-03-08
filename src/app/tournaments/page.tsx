import Link from "next/link";
import { Download, Users, MapPin, IndianRupee, Trophy, Calendar, ChevronRight } from "lucide-react";

const tournaments = [
  {
    id: "1",
    name: "3rd A&N State Chess Championship 2026",
    date: "15–18 May 2026",
    venue: "Port Blair Stadium Hall",
    prizeFund: "1,50,000",
    entryFee: "1,000",
    status: "Upcoming",
    categories: "Open, Under-19",
    organizer: "ANCA",
  },
  {
    id: "2",
    name: "Nicobar District Rapid Tournament 2026",
    date: "02 June 2026",
    venue: "Car Nicobar Community Hall",
    prizeFund: "25,000",
    entryFee: "300",
    status: "Upcoming",
    categories: "Open",
    organizer: "Nicobar DCA",
  },
  {
    id: "3",
    name: "Island Summer Rapid & Blitz 2026",
    date: "20 April 2026",
    venue: "ANCA Headquarters",
    prizeFund: "50,000",
    entryFee: "500",
    status: "Completed",
    categories: "Rapid & Blitz Open",
    organizer: "ANCA",
  },
];

const STATUS_STYLES: Record<string, string> = {
  Upcoming: "bg-green-100 text-green-800 border border-green-200",
  Ongoing: "bg-blue-100 text-blue-800 border border-blue-200",
  Completed: "bg-gray-100 text-gray-600 border border-gray-200",
};

export default function TournamentsPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Page Banner */}
      <section className="bg-primary text-primary-foreground py-8 border-b-4 border-secondary">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-primary-foreground/70 mb-3">
            <Link href="/">Home</Link>
            <ChevronRight className="h-4 w-4" /><span>Tournaments</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black font-poppins uppercase tracking-wide flex items-center gap-3">
            <Trophy className="h-8 w-8 text-secondary" /> Tournament Calendar
          </h1>
          <p className="text-primary-foreground/80 mt-2">Upcoming &amp; completed chess events organized by ANCA</p>
        </div>
      </section>

      {/* Status Filter Bar */}
      <div className="bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-3 flex flex-wrap gap-2">
          {["All", "Upcoming", "Ongoing", "Completed"].map((f) => (
            <button key={f} className={`text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-sm border transition-all ${f === "All" ? "bg-primary text-primary-foreground border-primary" : "text-muted-foreground border-border hover:border-primary hover:text-primary"}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Tournament Table */}
      <section className="py-10 container mx-auto px-4">
        <div className="bg-card border border-border shadow-sm rounded-md overflow-hidden">
          {/* Table Header */}
          <div className="hidden md:grid grid-cols-12 bg-primary text-primary-foreground text-xs uppercase tracking-widest font-bold py-3 px-6 gap-4">
            <div className="col-span-5">Tournament Name</div>
            <div className="col-span-2">Dates</div>
            <div className="col-span-2">Venue / Organizer</div>
            <div className="col-span-1">Status</div>
            <div className="col-span-2 text-right">Action</div>
          </div>

          {/* Tournament Rows */}
          {tournaments.map((t, idx) => (
            <div key={t.id} className={`grid md:grid-cols-12 gap-4 px-6 py-5 border-b border-border last:border-0 hover:bg-muted/50 transition-colors ${idx % 2 === 0 ? "bg-background" : "bg-muted/20"}`}>
              <div className="md:col-span-5">
                <div className="flex items-center gap-2 mb-1 md:hidden">
                  <span className={`px-2 py-0.5 text-xs font-bold rounded-sm uppercase ${STATUS_STYLES[t.status]}`}>{t.status}</span>
                </div>
                <h2 className="font-bold text-foreground text-sm md:text-base">{t.name}</h2>
                <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Users className="h-3 w-3" />{t.categories}</span>
                  <span className="flex items-center gap-1"><IndianRupee className="h-3 w-3" />Prize: ₹{t.prizeFund}</span>
                </div>
              </div>
              <div className="md:col-span-2 flex items-center">
                <div className="flex items-start gap-1 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 shrink-0 mt-0.5 text-secondary" />
                  <span>{t.date}</span>
                </div>
              </div>
              <div className="md:col-span-2 flex items-center">
                <div className="text-sm text-muted-foreground">
                  <div className="flex items-center gap-1"><MapPin className="h-4 w-4 text-secondary" />{t.venue}</div>
                  <div className="text-xs mt-1 pl-5">{t.organizer}</div>
                </div>
              </div>
              <div className="md:col-span-1 hidden md:flex items-center">
                <span className={`px-2 py-0.5 text-xs font-bold rounded-sm uppercase ${STATUS_STYLES[t.status]}`}>{t.status}</span>
              </div>
              <div className="md:col-span-2 flex items-center justify-end gap-2">
                {t.status !== "Completed" ? (
                  <>
                    <Link href={`/tournaments/${t.id}/register`} className="text-xs bg-secondary text-secondary-foreground px-3 py-2 rounded font-bold uppercase tracking-wider hover:bg-secondary/90 transition-colors">
                      Register
                    </Link>
                    <button className="text-xs border border-border text-muted-foreground px-3 py-2 rounded hover:border-primary hover:text-primary flex items-center gap-1 transition-colors">
                      <Download className="h-3 w-3" /> Brochure
                    </button>
                  </>
                ) : (
                  <button className="text-xs bg-muted border border-border text-muted-foreground px-3 py-2 rounded font-bold uppercase tracking-wider hover:bg-primary hover:text-white transition-colors">
                    Results
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Important Notice */}
        <div className="mt-8 bg-muted border border-border rounded-md p-5">
          <p className="text-sm text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Important:</strong> Players are advised to register well before the deadline. Entry fees are non-refundable. All participants must carry a valid photo ID proof. For queries, contact the ANCA Secretariat at <a href="mailto:info@ancachess.in" className="text-primary hover:underline">info@ancachess.in</a>.
          </p>
        </div>
      </section>
    </div>
  );
}
