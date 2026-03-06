"use client";

import Link from "next/link";
import { Download, Users, MapPin, IndianRupee, Trophy, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function TournamentsPage() {
  const tournaments = [
    {
      id: "1",
      name: "3rd A&N State Chess Championship 2026",
      date: "15-18 May 2026",
      venue: "Port Blair Stadium Hall",
      prizeFund: "1,50,000",
      entryFee: "1000",
      status: "Upcoming",
      categories: "Open, U-19",
    },
    {
      id: "2",
      name: "Nicobar District Rapid Tournament",
      date: "02 Jun 2026",
      venue: "Car Nicobar Hall",
      prizeFund: "25,000",
      entryFee: "300",
      status: "Upcoming",
      categories: "Open",
    },
    {
      id: "3",
      name: "Island Summer Rapid & Blitz 2026",
      date: "20 Apr 2026",
      venue: "ANCA Headquarters",
      prizeFund: "50,000",
      entryFee: "500",
      status: "Completed",
      categories: "Rapid & Blitz Open",
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <section className="bg-primary text-primary-foreground py-16 bg-chess-pattern relative">
        <div className="absolute inset-0 bg-primary/95"></div>
        <div className="container relative mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <Trophy className="h-12 w-12 text-secondary mx-auto mb-4" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-black font-poppins mb-4"
          >
            Tournaments
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-primary-foreground/80 max-w-2xl mx-auto"
          >
            Register for upcoming chess championships, view tournament brochures, and check details of ongoing state and district level events.
          </motion.p>
        </div>
      </section>

      {/* Filters (Mock UI) */}
      <section className="bg-card border-b border-border sticky top-16 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex flex-wrap gap-4">
          <button className="px-5 py-2 rounded-full bg-primary text-primary-foreground font-medium text-sm transition-colors">All Tournaments</button>
          <button className="px-5 py-2 rounded-full bg-muted text-muted-foreground font-medium text-sm hover:bg-secondary/10 hover:text-secondary transition-colors">Upcoming</button>
          <button className="px-5 py-2 rounded-full bg-muted text-muted-foreground font-medium text-sm hover:bg-secondary/10 hover:text-secondary transition-colors">Ongoing</button>
          <button className="px-5 py-2 rounded-full bg-muted text-muted-foreground font-medium text-sm hover:bg-secondary/10 hover:text-secondary transition-colors">Completed</button>
        </div>
      </section>

      {/* Tournament List */}
      <section className="py-12 bg-background flex-1">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.15 } },
              hidden: {}
            }}
            className="space-y-6 max-w-5xl mx-auto"
          >
            {tournaments.map((tournament) => (
              <motion.div 
                key={tournament.id} 
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="bg-card border border-border rounded-xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col md:flex-row"
              >
                {/* Left details */}
                <div className="p-6 md:p-8 flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wide
                      ${tournament.status === 'Upcoming' ? 'bg-secondary/20 text-secondary-foreground' : 'bg-muted text-muted-foreground'}`}>
                        {tournament.status}
                    </span>
                    <span className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                      <Users className="h-4 w-4" /> {tournament.categories}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold font-poppins mb-4 text-foreground group-hover:text-primary transition-colors">{tournament.name}</h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-muted-foreground mb-6">
                    <div className="flex items-start gap-2">
                       <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-secondary" />
                       <span><strong>Date:</strong> {tournament.date}</span>
                    </div>
                    <div className="flex items-start gap-2">
                       <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-secondary" />
                       <span><strong>Venue:</strong> {tournament.venue}</span>
                    </div>
                    <div className="flex items-start gap-2">
                       <IndianRupee className="h-4 w-4 shrink-0 mt-0.5 text-secondary" />
                       <span><strong>Prize:</strong> ₹{tournament.prizeFund}</span>
                    </div>
                    <div className="flex items-start gap-2">
                       <IndianRupee className="h-4 w-4 shrink-0 mt-0.5 text-secondary" />
                       <span><strong>Entry Fee:</strong> ₹{tournament.entryFee}</span>
                    </div>
                  </div>
                </div>

                {/* Right actions */}
                <div className="bg-muted p-6 md:p-8 flex flex-col justify-center gap-4 md:w-64 border-t md:border-t-0 md:border-l border-border relative overflow-hidden group">
                  {/* Subtle background glow on hover */}
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  {tournament.status === 'Upcoming' ? (
                    <div className="relative z-10 space-y-4 w-full">
                      <Link href={`/tournaments/${tournament.id}/register`} className="w-full block py-3 bg-secondary text-secondary-foreground font-bold rounded-lg hover:bg-secondary/90 hover:scale-[1.02] transition-all text-center shadow-sm">
                        Register Offline/Online
                      </Link>
                      <button className="w-full py-3 bg-background border border-border hover:border-primary text-foreground font-medium rounded-lg transition-colors flex items-center justify-center gap-2 hover:bg-muted/50">
                        <Download className="h-4 w-4" /> Brochure
                      </button>
                    </div>
                  ) : (
                    <div className="relative z-10 space-y-4 w-full">
                      <button className="w-full py-3 bg-background border border-border text-muted-foreground font-medium rounded-lg cursor-not-allowed">
                        Registration Closed
                      </button>
                      <button className="w-full py-3 bg-secondary/10 text-secondary font-medium rounded-lg transition-colors hover:bg-secondary/20 hover:scale-[1.02]">
                        View Results
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
