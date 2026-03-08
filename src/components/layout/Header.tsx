"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { Search, Menu, Crown, ExternalLink, ChevronDown, Award, Users, MapPin, Calendar, FileText, Download, Trophy } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  const [fontSize, setFontSize] = useState<number>(100);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`;
  }, [fontSize]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target as Node)) {
        setActiveMegaMenu(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const changeFontSize = (delta: number) => {
    setFontSize((prev) => {
      const newSize = prev + delta;
      if (newSize >= 80 && newSize <= 120) return newSize;
      return prev;
    });
  };

  const navLinks = [
    { label: "Home", href: "/", mega: null },
    { 
      label: "About Us", href: "/about", 
      mega: [
        { title: "Organization", items: [
          { name: "About ANCA", href: "/about", icon: Crown },
          { name: "Executive Committee", href: "/committee", icon: Users },
          { name: "District Units", href: "/districts", icon: MapPin },
        ]},
        { title: "Resources", items: [
          { name: "Constitution", href: "/downloads", icon: FileText },
          { name: "Annual Reports", href: "/downloads", icon: Download },
        ]}
      ]
    },
    { 
      label: "Tournaments", href: "/tournaments", 
      mega: [
        { title: "Events", items: [
          { name: "Tournament Calendar", href: "/tournaments", icon: Calendar },
          { name: "Live Results", href: "/tournaments/live", icon: Trophy },
          { name: "Past Archives", href: "/tournaments/archive", icon: FileText },
        ]},
        { title: "Registration", items: [
          { name: "Player Registration", href: "/players/register", icon: Users },
          { name: "Organize an Event", href: "/contact", icon: MapPin },
        ]}
      ]
    },
    { label: "Players", href: "/players", mega: null },
    { label: "Arbiters & Coaches", href: "/arbiters-coaches", mega: null },
    { label: "News & Media", href: "/news", mega: null },
    { label: "Downloads", href: "/downloads", mega: null },
    { label: "Contact Us", href: "/contact", mega: null },
  ];

  return (
    <header className="flex flex-col w-full z-50 bg-background shadow-md relative" ref={megaMenuRef}>
      {/* Tier 1: Accessibility & Gov Links Bar */}
      <div className="bg-primary text-primary-foreground text-xs font-medium border-b border-primary-foreground/10 py-1.5 hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <a href="#main-content" className="hover:underline focus:bg-white focus:text-primary px-2 transition-all">
              Skip to Main Content
            </a>
            <span className="opacity-50">|</span>
            <a href="/accessibility" className="hover:underline flex items-center gap-1">
              Screen Reader Access
            </a>
            <span className="opacity-50">|</span>
            <div className="flex items-center gap-2">
                <span className="px-1">Contrast:</span>
                <ThemeToggle />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 bg-primary-foreground/10 px-2 rounded">
              <button onClick={() => changeFontSize(-10)} className="px-1 hover:text-secondary group" aria-label="Decrease Font Size">A-</button>
              <button onClick={() => setFontSize(100)} className="px-1 hover:text-secondary font-bold" aria-label="Normal Font Size">A</button>
              <button onClick={() => changeFontSize(10)} className="px-1 hover:text-secondary" aria-label="Increase Font Size">A+</button>
            </div>
            <span className="opacity-50">|</span>
            <div className="flex items-center gap-2">
              <span className="hover:underline cursor-pointer">English</span>
              <span>/</span>
              <span className="hover:underline cursor-pointer">हिन्दी</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tier 2: Professional Dual-Header */}
      <div className="bg-background py-4 border-b border-border">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-4 group w-full md:w-auto">
            <div className="bg-primary/10 p-2 md:p-3 rounded-full shrink-0 group-hover:bg-primary/20 transition-colors">
              <Crown className="h-8 w-8 md:h-12 md:w-12 text-primary group-hover:text-secondary transition-colors" />
            </div>
            <div className="flex flex-col">
              <h1 className="font-poppins font-black text-lg md:text-2xl text-foreground leading-tight tracking-tight uppercase">
                Andaman & Nicobar <span className="block text-primary">Chess Association</span>
              </h1>
              <p className="text-muted-foreground text-[10px] md:text-xs font-medium uppercase tracking-widest hidden sm:block">
                Recognised by Govt. of A&N Islands · Affiliated to AICF
              </p>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            <div className="flex items-center gap-3 border-r border-border pr-6">
                <div className="h-10 w-10 bg-muted rounded-full flex items-center justify-center border border-border">
                    <span className="font-black text-[10px] text-muted-foreground">AICF</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-xs font-bold uppercase text-foreground">All India</span>
                    <span className="text-[10px] text-muted-foreground uppercase">Chess Federation</span>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-muted rounded-full flex items-center justify-center border border-border">
                    <span className="font-black text-[10px] text-muted-foreground">FIDE</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-xs font-bold uppercase text-foreground">World Chess</span>
                    <span className="text-[10px] text-muted-foreground uppercase">Federation</span>
                </div>
            </div>
          </div>

          <button 
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Tier 3: Main Navigation with Mega Menu */}
      <div className="bg-primary border-b border-primary-foreground/20 hidden md:block">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-center relative">
            {navLinks.map((link) => (
              <div 
                key={link.label}
                className="group inline-block"
                onMouseEnter={() => link.mega && setActiveMegaMenu(link.label)}
                onMouseLeave={() => link.mega && setActiveMegaMenu(null)}
              >
                <Link 
                  href={link.href}
                  className="px-4 lg:px-6 py-4 flex items-center gap-1 text-sm font-medium text-primary-foreground/90 hover:text-white hover:bg-black/20 hover:font-bold transition-all border-l border-primary-foreground/10 first:border-l-0"
                >
                  {link.label}
                  {link.mega && <ChevronDown className="h-4 w-4 opacity-70 group-hover:opacity-100 transition-opacity" />}
                </Link>

                {/* Mega Menu Dropdown */}
                {link.mega && activeMegaMenu === link.label && (
                  <div className="absolute top-full left-0 w-full bg-card border border-border shadow-xl grid flex gap-8 p-6 z-50 animate-in fade-in slide-in-from-top-2 justify-center">
                    {link.mega.map((section) => (
                      <div key={section.title} className="min-w-[200px]">
                        <h4 className="font-bold text-primary font-poppins mb-3 border-b border-border pb-1">{section.title}</h4>
                        <ul className="space-y-2">
                          {section.items.map((item) => {
                            const Icon = item.icon;
                            return (
                              <li key={item.name}>
                                <Link href={item.href} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-muted rounded-md">
                                  <Icon className="h-4 w-4 text-secondary shrink-0" />
                                  <span>{item.name}</span>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="ml-auto pl-4 border-l border-primary-foreground/10 flex items-center">
              <button aria-label="Search" className="text-primary-foreground/80 hover:text-white p-2">
                <Search className="h-4 w-4" />
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background absolute top-full left-0 w-full z-50 shadow-lg">
          <nav className="flex flex-col max-h-[70vh] overflow-y-auto">
            {navLinks.map((link) => (
              <div key={link.label} className="border-b border-border">
                <Link 
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-3 text-sm font-medium hover:bg-muted flex justify-between items-center"
                >
                  {link.label}
                  {link.mega && <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                </Link>
                {link.mega && (
                  <div className="bg-muted px-4 py-2 space-y-4">
                     {link.mega.map((section) => (
                       <div key={section.title}>
                          <p className="text-xs font-bold text-primary uppercase mb-1">{section.title}</p>
                          <ul className="space-y-1">
                             {section.items.map(item => (
                               <li key={item.name}>
                                  <Link href={item.href} onClick={() => setIsMobileMenuOpen(false)} className="text-sm text-foreground hover:text-primary block py-1">
                                    - {item.name}
                                  </Link>
                               </li>
                             ))}
                          </ul>
                       </div>
                     ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
