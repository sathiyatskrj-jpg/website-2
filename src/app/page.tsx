"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Calendar, Trophy, Users, ChevronRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-primary text-primary-foreground py-24 lg:py-32 overflow-hidden bg-chess-pattern">
        <div className="absolute inset-0 bg-primary/90 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/95" />
        
        <div className="container relative mx-auto px-4 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-black font-poppins tracking-tight mb-6 text-white drop-shadow-md">
              Andaman & Nicobar <br className="hidden md:block" />
              <span className="text-secondary">Chess Association</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-primary-foreground/90 font-medium mb-10">
              Empowering minds, organizing state-level championships, and nurturing the next generation of Grandmasters in the Islands.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/tournaments" className="w-full sm:w-auto px-8 py-3 bg-secondary text-secondary-foreground font-semibold rounded-lg shadow-lg hover:bg-secondary/90 transition-all flex items-center justify-center gap-2">
                Upcoming Tournaments <ArrowRight className="h-5 w-5" />
              </Link>
              <Link href="/about" className="w-full sm:w-auto px-8 py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-all backdrop-blur-sm border border-white/20">
                Explore ANCA
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-16 w-full max-w-4xl"
          >
            {[
              { label: "Active Players", value: "500+", icon: Users },
              { label: "Tournaments", value: "50+", icon: Trophy },
              { label: "Districts", value: "3", icon: Calendar },
              { label: "State Arbiters", value: "15+", icon: Users },
            ].map((stat, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 text-center">
                <stat.icon className="h-8 w-8 mx-auto text-secondary mb-3" />
                <h3 className="text-3xl font-bold font-poppins mb-1">{stat.value}</h3>
                <p className="text-sm font-medium text-primary-foreground/70 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main Content Sections */}
      <section className="py-20 bg-background text-foreground">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold font-poppins text-primary">Latest News & Circulars</h2>
              <div className="h-1 w-20 bg-secondary mt-2 rounded"></div>
            </div>
            <Link href="/news" className="text-primary font-medium flex items-center hover:underline">
              View All <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-muted bg-chess-pattern relative">
                   <div className="absolute inset-0 bg-primary/10" />
                </div>
                <div className="p-6">
                  <div className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                    <Calendar className="h-4 w-4" /> 12 Oct {new Date().getFullYear()}
                  </div>
                  <h3 className="font-bold text-lg mb-3 line-clamp-2">State Level Selection Chess Tournament Announcement</h3>
                  <Link href={`/news/${i}`} className="text-secondary font-medium hover:underline inline-flex items-center">
                    Read More <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Quick Links / CTA */}
      <section className="py-16 bg-muted border-y border-border">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold font-poppins mb-8">Quick Resources</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {['Download Brochure', 'Registration Form', 'FIDE Regulations', 'AICF Guidelines'].map((link, i) => (
              <Link key={i} href="/downloads" className="px-6 py-3 bg-background border border-border rounded-lg shadow-sm hover:border-primary hover:text-primary transition-colors font-medium">
                {link}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
