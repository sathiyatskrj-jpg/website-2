"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Search, Menu, Crown, ExternalLink } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  const [fontSize, setFontSize] = useState<number>(100);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Accessibility logic
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`;
  }, [fontSize]);

  const changeFontSize = (delta: number) => {
    setFontSize((prev) => {
      const newSize = prev + delta;
      if (newSize >= 80 && newSize <= 120) return newSize;
      return prev;
    });
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Tournaments", href: "/tournaments" },
    { label: "Players", href: "/players" },
    { label: "Arbiters & Coaches", href: "/arbiters-coaches" },
    { label: "News & Media", href: "/news" },
    { label: "Rules & Downloads", href: "/downloads" },
    { label: "Contact Us", href: "/contact" },
  ];

  return (
    <header className="flex flex-col w-full z-50 bg-background shadow-md">
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
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 bg-primary-foreground/10 px-2 rounded">
              <button 
                onClick={() => changeFontSize(-10)} 
                className="px-1 hover:text-secondary group"
                aria-label="Decrease Font Size"
              >
                A-
              </button>
              <button 
                onClick={() => setFontSize(100)} 
                className="px-1 hover:text-secondary font-bold"
                aria-label="Normal Font Size"
              >
                A
              </button>
              <button 
                onClick={() => changeFontSize(10)} 
                className="px-1 hover:text-secondary"
                aria-label="Increase Font Size"
              >
                A+
              </button>
            </div>
            <span className="opacity-50">|</span>
            <div className="flex items-center gap-2">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      {/* Tier 2: Main Branding Headers */}
      <div className="bg-background py-4 border-b border-border">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-4 group w-full md:w-auto">
            <div className="bg-primary/10 p-2 md:p-3 rounded-full shrink-0 group-hover:bg-primary/20 transition-colors">
              <Crown className="h-8 w-8 md:h-12 md:w-12 text-primary group-hover:text-secondary transition-colors" />
            </div>
            <div className="flex flex-col">
              <h1 className="font-poppins font-black text-lg md:text-2xl text-foreground leading-tight tracking-tight">
                ANDAMAN & NICOBAR
                <span className="block text-primary">CHESS ASSOCIATION</span>
              </h1>
              <p className="text-muted-foreground text-[10px] md:text-xs font-medium uppercase tracking-widest hidden sm:block">
                Recognised by the All India Chess Federation
              </p>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            <div className="text-right">
              <p className="text-xs text-muted-foreground font-semibold uppercase">Official Federation Portal</p>
              <p className="text-sm font-bold text-foreground">Government of India</p>
            </div>
            <div className="h-10 w-px bg-border"></div>
            <div className="bg-muted p-2 rounded-md">
              <ExternalLink className="h-8 w-8 text-primary opacity-50" />
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

      {/* Tier 3: Main Navigation */}
      <div className="bg-primary border-b border-primary-foreground/20 hidden md:block">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-center">
            {navLinks.map((link) => (
              <Link 
                key={link.label} 
                href={link.href}
                className="px-4 lg:px-6 py-3.5 text-sm font-medium text-primary-foreground/90 hover:text-white hover:bg-black/20 hover:font-bold transition-all border-l border-primary-foreground/10 first:border-l-0 last:border-r border-r-primary-foreground/10"
              >
                {link.label}
              </Link>
            ))}
            <div className="ml-auto pl-4 flex items-center">
              <button aria-label="Search" className="text-primary-foreground/80 hover:text-white p-2">
                <Search className="h-4 w-4" />
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="flex flex-col">
            {navLinks.map((link) => (
              <Link 
                key={link.label} 
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3 border-b border-border text-sm font-medium hover:bg-muted"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
