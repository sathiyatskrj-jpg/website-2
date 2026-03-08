import { Target, Crown, Users, FileText, Building } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const committee = [
    { name: "President (Name TBD)", role: "President", initials: "P" },
    { name: "Vice President (Name TBD)", role: "Vice President", initials: "VP" },
    { name: "Secretary General", role: "Secretary", initials: "SG" },
    { name: "Treasurer", role: "Treasurer", initials: "TR" },
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Government-style Page Banner */}
      <section className="bg-primary text-primary-foreground py-8 border-b-4 border-secondary">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-primary-foreground/70 mb-3">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <span className="text-primary-foreground">About Us</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black font-poppins uppercase tracking-wide">
            About the Association
          </h1>
          <p className="text-primary-foreground/80 mt-2 max-w-2xl">
            History, mission, and governing body of the Andaman &amp; Nicobar Chess Association
          </p>
        </div>
      </section>

      <section className="py-12 container mx-auto px-4">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8 flex flex-col gap-8">

            {/* Introduction */}
            <div className="bg-card border border-border shadow-sm rounded-md p-6 md:p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
              <h2 className="text-2xl font-bold font-poppins text-foreground mb-3">Organisation Profile</h2>
              <div className="h-0.5 w-12 bg-secondary mb-5"></div>
              <p className="text-muted-foreground leading-loose text-justify mb-4">
                The Andaman &amp; Nicobar Chess Association (ANCA) was established with the sole mandate of formalizing, promoting, and administering the game of chess across the Union Territory of Andaman &amp; Nicobar Islands. ANCA is the recognised state/UT chess federation affiliated to the All India Chess Federation (AICF), which is, in turn, affiliated to FIDE — the World Chess Federation.
              </p>
              <p className="text-muted-foreground leading-loose text-justify">
                Over the decades, ANCA has evolved from organizing small local club exhibitions to hosting prestigious state-level championships and sending delegations to the National Championship. Our affiliation enables our players to secure FIDE Ratings and compete on the world stage.
              </p>
            </div>

            {/* Mission & Vision */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-primary text-primary-foreground rounded-md p-6 shadow-md relative overflow-hidden">
                <div className="absolute right-4 top-4 opacity-10"><Target className="h-20 w-20" /></div>
                <div className="bg-secondary p-2 inline-block rounded mb-4">
                  <Target className="h-5 w-5 text-secondary-foreground" />
                </div>
                <h3 className="text-xl font-bold font-poppins mb-3">Mission</h3>
                <p className="text-primary-foreground/80 leading-relaxed text-sm">
                  To identify, nurture, and elevate chess talent across all islands of Andaman &amp; Nicobar — providing regular tournaments, coaching, and a platform for national and international excellence.
                </p>
              </div>
              <div className="bg-card border border-border rounded-md p-6 shadow-sm relative overflow-hidden">
                <div className="absolute right-4 top-4 opacity-5"><Crown className="h-20 w-20 text-primary" /></div>
                <div className="bg-primary/10 text-primary p-2 inline-block rounded mb-4">
                  <Crown className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold font-poppins mb-3">Vision</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  To make Andaman &amp; Nicobar Islands a premier hub for chess in India, fostering a culture of strategic thinking, discipline, and intellectual growth among youth.
                </p>
              </div>
            </div>

            {/* Executive Committee */}
            <div className="bg-card border border-border shadow-sm rounded-md p-6">
              <div className="flex items-center gap-3 border-b border-border pb-4 mb-6">
                <Users className="h-6 w-6 text-secondary" />
                <h2 className="text-xl font-poppins font-bold text-primary">Executive Committee</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {committee.map((member, i) => (
                  <div key={i} className="flex flex-col items-center text-center p-4 hover:bg-muted rounded-md transition-colors">
                    <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground text-xl font-bold flex items-center justify-center mb-3">
                      {member.initials}
                    </div>
                    <h3 className="font-bold text-sm text-foreground">{member.name}</h3>
                    <p className="text-xs text-secondary font-semibold mt-1 uppercase tracking-wide">{member.role}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-card border border-border rounded-md shadow-sm p-6">
              <h3 className="font-poppins font-bold text-primary border-b border-border pb-2 mb-4 text-sm uppercase tracking-wider">At a Glance</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-muted-foreground">Founded</span>
                  <span className="font-bold text-foreground">2005</span>
                </li>
                <li className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-muted-foreground">Affiliation</span>
                  <span className="font-bold text-foreground">AICF / FIDE</span>
                </li>
                <li className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-muted-foreground">District Units</span>
                  <span className="font-bold text-foreground">3</span>
                </li>
                <li className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-muted-foreground">Registered Players</span>
                  <span className="font-bold text-foreground">1200+</span>
                </li>
                <li className="flex justify-between items-center py-2">
                  <span className="text-muted-foreground">Annual Events</span>
                  <span className="font-bold text-foreground">50+</span>
                </li>
              </ul>
            </div>

            <div className="bg-primary rounded-md shadow-md p-6 text-primary-foreground">
              <Building className="h-8 w-8 text-secondary mb-3" />
              <h3 className="font-poppins font-bold mb-2">District Associations</h3>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li className="flex items-center gap-2"><span className="bg-secondary rounded-full p-1 shrink-0 h-2 w-2"></span>South Andaman Chess Association</li>
                <li className="flex items-center gap-2"><span className="bg-secondary rounded-full p-1 shrink-0 h-2 w-2"></span>North &amp; Middle Andaman CA</li>
                <li className="flex items-center gap-2"><span className="bg-secondary rounded-full p-1 shrink-0 h-2 w-2"></span>Nicobar District Chess Association</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-md shadow-sm p-6">
              <h3 className="font-poppins font-bold text-primary border-b border-border pb-2 mb-4 text-sm uppercase tracking-wider">Useful Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/downloads" className="text-primary hover:underline flex items-center gap-2"><FileText className="h-4 w-4" /> Constitution &amp; Rules</Link></li>
                <li><Link href="/arbiters-coaches" className="text-primary hover:underline flex items-center gap-2"><FileText className="h-4 w-4" /> Arbiters &amp; Coaches</Link></li>
                <li><Link href="/contact" className="text-primary hover:underline flex items-center gap-2"><FileText className="h-4 w-4" /> Contact Secretariat</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
