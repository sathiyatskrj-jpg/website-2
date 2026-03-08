"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { NewsTicker } from "@/components/NewsTicker";
// HeroCarousel uses @react-three/fiber + vanta.js which crash during SSR prerender
const HeroCarousel = dynamic(
  () => import("@/components/HeroCarousel").then((m) => ({ default: m.HeroCarousel })),
  { ssr: false, loading: () => <div className="w-full h-[380px] md:h-[500px] lg:h-[620px] bg-[#0f172a]" /> }
);
import { ScrollReveal } from "@/components/animations/AnimationUtils";
import { HoverCard } from "@/components/animations/MicroAnimations";
import { GSAPReveal, GSAPStagger, GSAPCounter } from "@/components/animations/GSAPAnimations";
import { ChessPuzzleDisplay } from "@/components/games/MiniChessBoard";
import { AnimeTextReveal } from "@/components/animations/AnimeTextReveal";
import {
  Trophy, Users, Calendar, Download, FileText,
  ChevronRight, Star, Mail, MapPin
} from "lucide-react";

// (Skipping unchanging top constants ... keeping original constants intact)

const stats = [
  { label: "Registered Players", value: 1200, suffix: "+", icon: Users },
  { label: "Annual Events", value: 50, suffix: "+", icon: Trophy },
  { label: "Years of Excellence", value: 19, suffix: "", icon: Star },
  { label: "District Units", value: 3, suffix: "", icon: MapPin },
];

const newsItems = [
  { date: "08 Mar 2026", tag: "Tournament", title: "State Chess Championship 2026 registrations open — deadline 30 April", tagColor: "bg-blue-100 text-blue-800" },
  { date: "05 Mar 2026", tag: "Circular", title: "AICF revised rating rules effective from April 2026 season", tagColor: "bg-orange-100 text-orange-800" },
  { date: "28 Feb 2026", tag: "Results", title: "Andaman District Championship 2026 final standings published", tagColor: "bg-green-100 text-green-800" },
  { date: "15 Feb 2026", tag: "Seminar", title: "Arbiter Training Seminar — seats filling fast, register immediately", tagColor: "bg-purple-100 text-purple-800" },
];

const upcomingEvents = [
  { name: "45th State Chess Championship", date: "15 May 2026", venue: "Port Blair", status: "Registrations Open" },
  { name: "Nicobar District Rapid", date: "02 Jun 2026", venue: "Car Nicobar", status: "Upcoming" },
  { name: "Junior Selection Trial", date: "20 Jun 2026", venue: "ANCA HQ", status: "Announced" },
];

const quickLinks = [
  { label: "Player Registration Form", href: "/players/register", icon: FileText },
  { label: "Tournament Calendar", href: "/tournaments", icon: Calendar },
  { label: "Download Constitution", href: "/downloads", icon: Download },
  { label: "Rating List", href: "/players", icon: Trophy },
  { label: "Contact Secretariat", href: "/contact", icon: Mail },
  { label: "News & Circulars", href: "/news", icon: FileText },
];

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* News Ticker */}
      <NewsTicker />

      {/* Hero Carousel — Canvas BG + Typed.js headline */}
      <HeroCarousel />

      {/* GSAP Counter Stats Strip */}
      <section className="bg-primary text-primary-foreground border-b-4 border-secondary">
        <div className="container mx-auto px-4 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-primary-foreground/20">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <GSAPReveal key={stat.label} delay={i * 0.12} from="bottom" className="px-4 py-2 flex items-center gap-3">
                  <Icon className="h-8 w-8 text-secondary hidden lg:block shrink-0" />
                  <div>
                    <div className="text-2xl md:text-3xl font-black font-poppins">
                      <GSAPCounter to={stat.value} suffix={stat.suffix} duration={2.5} />
                    </div>
                    <div className="text-xs uppercase tracking-widest text-primary-foreground/70 font-medium">{stat.label}</div>
                  </div>
                </GSAPReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-10 container mx-auto px-4">
        <div className="grid lg:grid-cols-12 gap-8">

          {/* Left Column */}
          <div className="lg:col-span-8 flex flex-col gap-8">

            {/* Latest Announcements with GSAP stagger */}
            <div>
              <GSAPReveal from="left" className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-5 w-1 bg-secondary rounded-full"></div>
                  <AnimeTextReveal text="Latest Announcements" className="text-xl font-poppins font-bold text-primary uppercase tracking-wider" />
                </div>
                <Link href="/news" className="text-sm text-primary font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                  View All <ChevronRight className="h-4 w-4" />
                </Link>
              </GSAPReveal>

              <div className="bg-card border border-border rounded-md shadow-sm overflow-hidden">
                <GSAPStagger stagger={0.1} from="bottom" className="divide-y divide-border">
                  {newsItems.map((item) => (
                    <div className="px-5 py-4 hover:bg-muted/50 transition-colors flex items-start gap-4" key={item.title}>
                      <div className="bg-primary text-primary-foreground rounded py-1 px-2 text-center shrink-0 hidden sm:block">
                        <span className="text-lg font-bold leading-none block">{item.date.split(" ")[0]}</span>
                        <span className="text-[10px] uppercase block">{item.date.split(" ")[1]}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm ${item.tagColor}`}>
                          {item.tag}
                        </span>
                        <p className="font-medium text-foreground text-sm mt-1.5 leading-snug line-clamp-2">{item.title}</p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 mt-1 hidden sm:block" />
                    </div>
                  ))}
                </GSAPStagger>
              </div>
            </div>

            {/* Upcoming Events */}
            <div>
              <GSAPReveal from="left" className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-5 w-1 bg-secondary rounded-full"></div>
                  <AnimeTextReveal text="Upcoming Tournaments" className="text-xl font-poppins font-bold text-primary uppercase tracking-wider" />
                </div>
                <Link href="/tournaments" className="text-sm text-primary font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                  Full Calendar <ChevronRight className="h-4 w-4" />
                </Link>
              </GSAPReveal>

              <GSAPStagger stagger={0.12} from="scale" className="grid sm:grid-cols-3 gap-4">
                {upcomingEvents.map((event) => (
                  <HoverCard key={event.name} className="bg-card border border-border rounded-md p-5 shadow-sm">
                    <Trophy className="h-8 w-8 text-secondary mb-3" />
                    <h3 className="font-bold text-foreground text-sm mb-1 line-clamp-2">{event.name}</h3>
                    <p className="text-xs text-muted-foreground">{event.date} · {event.venue}</p>
                    <p className="mt-2 text-xs font-bold text-green-700 bg-green-50 inline-block px-2 py-0.5 rounded-sm">{event.status}</p>
                  </HoverCard>
                ))}
              </GSAPStagger>
            </div>

            {/* About Banner */}
            <GSAPReveal from="bottom" delay={0.1}>
              <div className="bg-primary rounded-md p-6 md:p-8 text-primary-foreground relative overflow-hidden shadow-lg">
                <div className="absolute right-0 top-0 text-[160px] leading-none font-black opacity-5 select-none pointer-events-none font-poppins">♛</div>
                <AnimeTextReveal text="About ANCA" className="text-2xl font-bold font-poppins mb-2" delay={400} />
                <p className="text-primary-foreground/80 text-sm leading-relaxed mb-4 max-w-2xl">
                  The Andaman &amp; Nicobar Chess Association (ANCA) is the official governing body affiliated to AICF and FIDE,
                  promoting chess across all islands since 2005 through tournaments, training, and talent development.
                </p>
                <Link href="/about" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest border border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground px-5 py-2 rounded transition-colors">
                  Read More <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </GSAPReveal>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-6">

            {/* Quick Links */}
            <GSAPReveal delay={0.2} from="right">
              <div className="bg-card border border-border rounded-md shadow-sm p-5">
                <h3 className="font-poppins font-bold text-primary text-sm uppercase tracking-wider border-b border-border pb-2 mb-4">Quick Links</h3>
                <ul className="space-y-1">
                  {quickLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="flex items-center gap-2 text-sm py-2 px-2 hover:bg-muted rounded transition-colors text-muted-foreground hover:text-primary group"
                        >
                          <Icon className="h-4 w-4 shrink-0 text-secondary group-hover:text-primary transition-colors" />
                          <span className="flex-1">{link.label}</span>
                          <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </GSAPReveal>

            {/* President's Message */}
            <GSAPReveal delay={0.3} from="right">
              <div className="bg-card border border-border rounded-md shadow-sm p-5">
                <h3 className="font-poppins font-bold text-primary text-sm uppercase tracking-wider border-b border-border pb-2 mb-4">President&apos;s Message</h3>
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground font-black text-xl flex items-center justify-center shrink-0">P</div>
                  <div>
                    <div className="font-bold text-foreground text-sm">President, ANCA</div>
                    <div className="text-xs text-muted-foreground">Andaman &amp; Nicobar Islands</div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed italic">
                  &ldquo;Chess is not just a game — it is a discipline that builds the mind of our future generations. Our commitment remains unwavering.&rdquo;
                </p>
              </div>
            </GSAPReveal>

            {/* Contact sidebar */}
            <GSAPReveal delay={0.4} from="right">
              <div className="bg-primary text-primary-foreground rounded-md p-5 shadow-md">
                <h3 className="font-poppins font-bold text-sm uppercase tracking-wider border-b border-primary-foreground/20 pb-2 mb-4">Contact Us</h3>
                <ul className="space-y-3 text-sm text-primary-foreground/80">
                  <li className="flex items-center gap-2.5"><MapPin className="h-4 w-4 text-secondary shrink-0" />O/o ANCA, Port Blair - 744101</li>
                  <li className="flex items-center gap-2.5"><Mail className="h-4 w-4 text-secondary shrink-0" />info@ancachess.in</li>
                  <li className="flex items-center gap-2.5"><Calendar className="h-4 w-4 text-secondary shrink-0" />Mon–Fri: 10AM – 5PM</li>
                </ul>
                <Link href="/contact" className="mt-4 block text-center text-xs font-bold uppercase tracking-widest border border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground px-4 py-2 rounded transition-colors">
                  Send a Message
                </Link>
              </div>
            </GSAPReveal>

            {/* GSAP Scroll marquee of associations */}
            <ScrollReveal delay={0.5}>
              <div className="bg-card border border-border rounded-md shadow-sm p-5">
                <h3 className="font-poppins font-bold text-primary text-sm uppercase tracking-wider border-b border-border pb-2 mb-4">Affiliated Bodies</h3>
                <div className="flex gap-4 flex-wrap">
                  {["AICF", "FIDE", "SAI", "MYAS"].map((org) => (
                    <span key={org} className="px-3 py-1.5 border border-border text-xs font-bold text-muted-foreground rounded-sm hover:border-primary hover:text-primary transition-colors">
                      {org}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Interactive Mini Chess Game */}
            <GSAPReveal delay={0.6} from="fade">
              <ChessPuzzleDisplay
                title="Play Mini Chess"
                description="Click a piece to select it, then click to move. White moves first!"
              />
            </GSAPReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
