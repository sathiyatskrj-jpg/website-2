"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Floating3DHero from "@/components/animations/Floating3DHero";
import VantaBackground from "@/components/animations/VantaBackground";
import { HeroTypewriter } from "@/components/animations/TypewriterText";

const slides = [
  {
    id: 1,
    bg: "from-[#0f172a]/90 to-[#1e3a5f]/90",
    tag: "Official",
    tagColor: "text-amber-400 border-amber-400",
    prefix: "Andaman's",
    words: ["Chess Authority", "Governing Body", "Premier Federation"],
    subtitle: "Certified by AICF & FIDE. Promoting excellence across all islands since 2005.",
    link: "/about",
    cta: "About ANCA",
  },
  {
    id: 2,
    bg: "from-[#1a0f2e]/90 to-[#3b1f5e]/90",
    tag: "Upcoming",
    tagColor: "text-emerald-400 border-emerald-400",
    prefix: "Register for",
    words: ["State Championship", "Open Category", "Under-19 Trials"],
    subtitle: "Prize fund of ₹1,50,000. Registrations close 30 April 2026.",
    link: "/tournaments",
    cta: "Register Now",
  },
  {
    id: 3,
    bg: "from-[#0a1628]/90 to-[#143d6b]/90",
    tag: "Notice",
    tagColor: "text-orange-400 border-orange-400",
    prefix: "Upcoming",
    words: ["Arbiter Seminar", "Coach Training", "FIDE Rated Events"],
    subtitle: "Stay updated on circulars, ratings, and events from ANCA.",
    link: "/news",
    cta: "Read Updates",
  },
];

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  const paginate = useCallback((dir: number) => {
    setCurrent((prev) => (prev + dir + slides.length) % slides.length);
    setAnimKey((k) => k + 1);
  }, []);

  useEffect(() => {
    const t = setInterval(() => paginate(1), 7000);
    return () => clearInterval(t);
  }, [paginate]);

  const slide = slides[current];

  return (
    <div className="relative w-full h-[380px] md:h-[500px] lg:h-[620px] overflow-hidden group">

      {/* Background layers */}
      <VantaBackground effect="net" color={0x3b82f6} backgroundColor={0x050510} className="absolute inset-0 z-0">
        <Floating3DHero />
      </VantaBackground>

      {/* Slide overlay — CSS fade transition */}
      <div
        key={animKey}
        className={`absolute inset-0 bg-gradient-to-br ${slide.bg} pointer-events-none`}
        style={{
          animation: "hero-fade-in 0.55s cubic-bezier(0.25,0.46,0.45,0.94) forwards",
        }}
      />

      {/* Content */}
      <div
        key={`content-${animKey}`}
        className="relative z-10 h-full flex items-center pointer-events-auto"
        style={{ animation: "hero-slide-up 0.5s ease forwards" }}
      >
        <div className="container mx-auto px-6 md:px-16 mt-8">
          {/* Tag badge */}
          <div style={{ animation: "hero-fade-up 0.4s 0.1s ease both" }}>
            <span className={`inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.3em] border px-3 py-1 mb-5 bg-black/20 backdrop-blur-sm ${slide.tagColor}`}>
              <span className="text-base">♟</span> {slide.tag}
            </span>
          </div>

          {/* Typewriter headline */}
          <div
            className="text-white text-3xl md:text-5xl lg:text-6xl font-black font-poppins mb-5 leading-tight drop-shadow-lg"
            style={{ animation: "hero-fade-up 0.4s 0.2s ease both" }}
          >
            <HeroTypewriter
              prefix={slide.prefix}
              rotatingWords={slide.words}
              prefixClassName="text-white/95 mr-2"
              wordClassName="text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]"
            />
          </div>

          {/* Subtitle */}
          <p
            className="text-white/80 text-base md:text-lg mb-8 max-w-xl font-medium drop-shadow-md"
            style={{ animation: "hero-fade-up 0.5s 0.5s ease both" }}
          >
            {slide.subtitle}
          </p>

          {/* CTA */}
          <div style={{ animation: "hero-fade-up 0.4s 0.65s ease both" }} className="flex items-center gap-4">
            <Link
              href={slide.link}
              className="inline-block border-2 border-amber-400 bg-amber-400/10 backdrop-blur-sm text-amber-400 hover:bg-amber-400 hover:text-[#0f172a] font-bold uppercase tracking-widest px-7 md:px-10 py-3 text-sm transition-all duration-300 shadow-[0_0_15px_rgba(251,191,36,0.3)] hover:shadow-[0_0_30px_rgba(251,191,36,0.6)]"
            >
              {slide.cta} →
            </Link>
          </div>
        </div>
      </div>

      {/* Arrow controls */}
      <button
        onClick={() => paginate(-1)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/25 backdrop-blur-sm text-white p-2 md:p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 border border-white/20"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
      </button>
      <button
        onClick={() => paginate(1)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/25 backdrop-blur-sm text-white p-2 md:p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 border border-white/20"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
      </button>

      {/* Progress bar — CSS animation */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10 z-20">
        <div
          key={`progress-${animKey}`}
          className="h-full bg-amber-400 origin-left"
          style={{ animation: "hero-progress 7s linear forwards" }}
        />
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => { setCurrent(idx); setAnimKey((k) => k + 1); }}
            className={`h-1.5 transition-all duration-300 rounded-full ${idx === current ? "w-8 bg-amber-400" : "w-2 bg-white/40 hover:bg-white/70"}`}
          />
        ))}
      </div>

      {/* Keyframe styles */}
      <style>{`
        @keyframes hero-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes hero-fade-up {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes hero-slide-up {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes hero-progress {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
}
