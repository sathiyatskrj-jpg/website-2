"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Download, Users, MapPin, IndianRupee, Trophy, Calendar, ChevronRight } from "lucide-react";
import { createBrowserClient } from "@/lib/supabase/client";
import { format, isBefore, isAfter, parseISO } from "date-fns";

interface Tournament {
  id: string;
  name: string;
  location: string | null;
  start_date: string | null;
  end_date: string | null;
  category: string | null;
  registration_link: string | null;
  results_link: string | null;
  organizer: string | null;
}

const STATUS_STYLES: Record<string, string> = {
  Upcoming: "bg-green-100 text-green-800 border-green-200",
  Ongoing: "bg-blue-100 text-blue-800 border-blue-200",
  Completed: "bg-gray-100 text-gray-600 border-gray-200",
};

export default function TournamentsPage() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    async function fetchTournaments() {
      const supabase = createBrowserClient();
      const { data } = await supabase
        .from("tournaments")
        .select("*")
        .order("start_date", { ascending: false });

      if (data) {
        setTournaments(data);
      }
      setIsLoading(false);
    }
    fetchTournaments();
  }, []);

  const getStatus = (start: string | null, end: string | null) => {
    if (!start) return "Upcoming";
    const today = new Date();
    const startDate = parseISO(start);
    const endDate = end ? parseISO(end) : startDate;

    if (isBefore(today, startDate)) return "Upcoming";
    if (isAfter(today, endDate)) return "Completed";
    return "Ongoing";
  };

  const filteredTournaments = tournaments.filter(t => {
    if (filter === "All") return true;
    return getStatus(t.start_date, t.end_date) === filter;
  });

  const formatDateRange = (start: string | null, end: string | null) => {
    if (!start) return "TBD";
    const startDate = parseISO(start);
    if (!end || start === end) return format(startDate, "dd MMM yyyy");
    const endDate = parseISO(end);
    if (startDate.getMonth() === endDate.getMonth()) {
      return `${format(startDate, "dd")}–${format(endDate, "dd MMM yyyy")}`;
    }
    return `${format(startDate, "dd MMM")} – ${format(endDate, "dd MMM yyyy")}`;
  };

  return (
    <div className="flex flex-col w-full min-h-screen">
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
      <div className="bg-card border-b border-border shadow-sm sticky top-0 z-30">
        <div className="container mx-auto px-4 py-3 flex flex-wrap gap-2">
          {["All", "Upcoming", "Ongoing", "Completed"].map((f) => (
            <button 
              key={f} 
              onClick={() => setFilter(f)}
              className={`text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-sm border transition-all ${filter === f ? "bg-primary text-primary-foreground border-primary" : "text-muted-foreground border-border hover:border-primary hover:text-primary"}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <section className="py-10 container mx-auto px-4 flex-1">
        <div className="bg-card border border-border shadow-sm rounded-md overflow-hidden min-h-[300px]">
          <div className="hidden md:grid grid-cols-12 bg-primary text-primary-foreground text-xs uppercase tracking-widest font-bold py-3 px-6 gap-4">
            <div className="col-span-5">Tournament Name</div>
            <div className="col-span-2">Dates</div>
            <div className="col-span-2">Venue / Organizer</div>
            <div className="col-span-1">Status</div>
            <div className="col-span-2 text-right">Action</div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-48">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : filteredTournaments.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No tournaments found for the selected filter.
            </div>
          ) : (
            filteredTournaments.map((t, idx) => {
              const status = getStatus(t.start_date, t.end_date);
              const dateDisplay = formatDateRange(t.start_date, t.end_date);
              
              return (
                <div key={t.id} className={`grid md:grid-cols-12 gap-4 px-6 py-5 border-b border-border last:border-0 hover:bg-muted/50 transition-colors ${idx % 2 === 0 ? "bg-background" : "bg-muted/20"}`}>
                  <div className="md:col-span-5 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-1 md:hidden">
                      <span className={`px-2 py-0.5 text-xs font-bold rounded-sm uppercase border ${STATUS_STYLES[status]}`}>{status}</span>
                    </div>
                    <h2 className="font-bold text-foreground text-sm md:text-base">{t.name}</h2>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Users className="h-3 w-3" />{t.category || "Open"}</span>
                      {/* Placeholder for missing DB fields like prize fund */}
                      <span className="flex items-center gap-1"><IndianRupee className="h-3 w-3" />Prize: Variable</span>
                    </div>
                  </div>
                  <div className="md:col-span-2 flex items-center">
                    <div className="flex items-start gap-1 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 shrink-0 mt-0.5 text-secondary" />
                      <span>{dateDisplay}</span>
                    </div>
                  </div>
                  <div className="md:col-span-2 flex items-center">
                    <div className="text-sm text-muted-foreground">
                      <div className="flex items-center gap-1"><MapPin className="h-4 w-4 text-secondary" />{t.location || "TBD"}</div>
                      <div className="text-xs mt-1 pl-5">{t.organizer || "ANCA"}</div>
                    </div>
                  </div>
                  <div className="md:col-span-1 hidden md:flex items-center">
                    <span className={`px-2 py-0.5 text-xs font-bold rounded-sm uppercase border ${STATUS_STYLES[status]}`}>{status}</span>
                  </div>
                  <div className="md:col-span-2 flex items-center justify-end gap-2">
                    {status !== "Completed" ? (
                      <>
                        <a href={t.registration_link || "#"} className={`text-xs px-3 py-2 rounded font-bold uppercase tracking-wider transition-colors ${t.registration_link ? "bg-secondary text-secondary-foreground hover:bg-secondary/90" : "bg-muted text-muted-foreground cursor-not-allowed"}`}>
                          Register
                        </a>
                        <button className="text-xs border border-border text-muted-foreground px-3 py-2 rounded hover:border-primary hover:text-primary flex items-center gap-1 transition-colors">
                          <Download className="h-3 w-3" /> Brochure
                        </button>
                      </>
                    ) : (
                      <a href={t.results_link || "#"} className={`text-xs px-3 py-2 rounded font-bold uppercase tracking-wider transition-colors ${t.results_link ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-muted border border-border text-muted-foreground hover:bg-muted/80"}`}>
                        Results
                      </a>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="mt-8 bg-muted border border-border rounded-md p-5">
          <p className="text-sm text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Important:</strong> Players are advised to register well before the deadline. Entry fees are non-refundable. All participants must carry a valid photo ID proof. For queries, contact the ANCA Secretariat at <a href="mailto:info@ancachess.in" className="text-primary hover:underline">info@ancachess.in</a>.
          </p>
        </div>
      </section>
    </div>
  );
}
