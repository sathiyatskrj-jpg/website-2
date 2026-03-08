import { NewsTicker } from "@/components/NewsTicker";
import { HeroCarousel } from "@/components/HeroCarousel";
import Link from "next/link";
import { ArrowRight, Trophy, Users, FileText, Download, Building, CalendarDays } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-muted/20">
      <NewsTicker />
      <HeroCarousel />
      
      {/* Information Cards Strip */}
      <section className="bg-primary text-primary-foreground py-6 border-b-4 border-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            <div className="flex items-center gap-4">
              <div className="bg-white/10 p-3 rounded shrink-0"><Users className="h-6 w-6 text-secondary" /></div>
              <div>
                <div className="text-2xl font-bold">1200+</div>
                <div className="text-xs font-medium uppercase opacity-80">Registered Players</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-white/10 p-3 rounded shrink-0"><Trophy className="h-6 w-6 text-secondary" /></div>
              <div>
                <div className="text-2xl font-bold">50+</div>
                <div className="text-xs font-medium uppercase opacity-80">Yearly Events</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-white/10 p-3 rounded shrink-0"><Building className="h-6 w-6 text-secondary" /></div>
              <div>
                <div className="text-2xl font-bold">3</div>
                <div className="text-xs font-medium uppercase opacity-80">District Associations</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-white/10 p-3 rounded shrink-0"><FileText className="h-6 w-6 text-secondary" /></div>
              <div>
                <div className="text-2xl font-bold">25+</div>
                <div className="text-xs font-medium uppercase opacity-80">Certified Arbiters</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-12 container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: About & President Message */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            <div className="bg-card border border-border rounded-md shadow-sm p-6 md:p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
              <h2 className="text-2xl font-poppins font-bold text-foreground mb-4">About the Association</h2>
              <div className="h-0.5 w-16 bg-secondary mb-6"></div>
              <p className="text-muted-foreground leading-relaxed mb-4 text-justify">
                The Andaman & Nicobar Chess Association (ANCA) is the official governing body for the game of chess in the Andaman & Nicobar Islands, recognised by the All India Chess Federation (AICF). Our primary mission is to foster, promote, organize, and develop chess across all districts of the region.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6 text-justify">
                We conduct district, state, and national level championships, training camps, and arbiter clinics to elevate the standard of chess. ANCA provides a structured platform for talented individuals to represent the state at national forums.
              </p>
              <Link href="/about" className="inline-flex items-center text-primary font-bold hover:text-secondary uppercase tracking-widest text-sm transition-colors">
                Read Full Profile <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            {/* Upcoming Events Module */}
            <div className="bg-card border border-border rounded-md shadow-sm p-6 relative">
              <div className="absolute top-0 right-0 w-1 h-full bg-secondary"></div>
              <div className="flex justify-between items-end border-b border-border pb-4 mb-6">
                <h3 className="text-xl font-poppins font-bold text-primary flex items-center">
                  <CalendarDays className="mr-2 h-6 w-6 text-secondary" /> Upcoming Events
                </h3>
                <Link href="/tournaments" className="text-sm font-semibold text-muted-foreground hover:text-primary">View Calendar &raquo;</Link>
              </div>
              
              <div className="space-y-4">
                {[
                  { date: "15 Oct", month: "2024", title: "State Level Selection Chess Tournament", location: "Port Blair" },
                  { date: "02 Nov", month: "2024", title: "Under-19 District Championship", location: "South Andaman" },
                  { date: "10 Dec", month: "2024", title: "ANCA Rapid Rating Tournament", location: "Online / OTB" }
                ].map((event, idx) => (
                  <div key={idx} className="flex gap-4 p-3 hover:bg-muted/50 transition-colors border-b border-border last:border-0 rounded-sm">
                    <div className="bg-primary text-primary-foreground rounded p-2 text-center min-w-[70px] flex flex-col justify-center">
                      <span className="font-bold text-lg leading-none">{event.date.split(" ")[0]}</span>
                      <span className="text-[10px] uppercase tracking-wider">{event.date.split(" ")[1]}</span>
                    </div>
                    <div className="flex flex-col justify-center flex-1">
                      <h4 className="font-semibold text-foreground">{event.title}</h4>
                      <p className="text-sm text-muted-foreground">{event.location}</p>
                    </div>
                    <div className="hidden sm:flex items-center">
                       <Link href="/tournaments" className="text-xs bg-muted border border-border hover:border-primary text-foreground px-3 py-1.5 rounded font-medium transition-colors">Details</Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Quick Links & Media */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Quick Access Block */}
            <div className="bg-primary text-primary-foreground rounded-md shadow-md p-6">
              <h3 className="text-lg font-poppins font-bold mb-4 border-b border-primary-foreground/20 pb-2">Quick Access</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/players" className="flex items-center gap-3 hover:bg-black/20 p-2 rounded transition-colors group">
                    <Users className="h-5 w-5 text-secondary" />
                    <span className="font-medium group-hover:translate-x-1 transition-transform">Player Registration / Search</span>
                  </Link>
                </li>
                <li>
                  <Link href="/tournaments" className="flex items-center gap-3 hover:bg-black/20 p-2 rounded transition-colors group">
                    <Trophy className="h-5 w-5 text-secondary" />
                    <span className="font-medium group-hover:translate-x-1 transition-transform">Tournament Entries</span>
                  </Link>
                </li>
                <li>
                  <Link href="/downloads" className="flex items-center gap-3 hover:bg-black/20 p-2 rounded transition-colors group">
                    <Download className="h-5 w-5 text-secondary" />
                    <span className="font-medium group-hover:translate-x-1 transition-transform">Forms & Circulars</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Official Instructions Block */}
            <div className="bg-card border border-border shadow-sm rounded-md p-6">
              <h3 className="text-lg font-poppins font-bold text-primary mb-4 border-b border-border pb-2">Latest Guidelines</h3>
              <ul className="space-y-4 text-sm mt-4">
                <li className="flex gap-2">
                   <div className="mt-1 shrink-0"><FileText className="h-4 w-4 text-secondary" /></div>
                   <Link href="#" className="hover:text-primary hover:underline text-muted-foreground leading-snug">Revised rules for State Arbitration Certification 2024</Link>
                </li>
                <li className="flex gap-2">
                   <div className="mt-1 shrink-0"><FileText className="h-4 w-4 text-secondary" /></div>
                   <Link href="#" className="hover:text-primary hover:underline text-muted-foreground leading-snug">Dress Code policy for National Level Participants</Link>
                </li>
                <li className="flex gap-2">
                   <div className="mt-1 shrink-0"><FileText className="h-4 w-4 text-secondary" /></div>
                   <Link href="#" className="hover:text-primary hover:underline text-muted-foreground leading-snug">Player Transfer Rules between District Associations</Link>
                </li>
              </ul>
              <Link href="/downloads" className="block text-center mt-6 text-sm font-bold text-primary hover:text-secondary uppercase tracking-wider">
                View All Files
              </Link>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
}
