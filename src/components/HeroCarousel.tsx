"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SplitTextReveal } from "@/components/animations/AnimationUtils";

const slides = [
  {
    id: 1,
    gradient: "from-[#0f172a] via-[#1e3a5f] to-[#0f172a]",
    accent: "text-amber-400",
    title: "45th State Chess Championship",
    subtitle: "Open & Under-19 categories. Prize fund ₹1,50,000. Registration now open.",
    link: "/tournaments",
    buttonText: "Register Now",
    tag: "Upcoming",
  },
  {
    id: 2,
    gradient: "from-[#1a0f2e] via-[#3b1f5e] to-[#1a0f2e]",
    accent: "text-orange-400",
    title: "Arbiters & Coaches Training Camp",
    subtitle: "Join the upcoming AICF-certified seminar. Seats are limited.",
    link: "/news",
    buttonText: "Read Circular",
    tag: "Notice",
  },
  {
    id: 3,
    gradient: "from-[#0a1628] via-[#143d6b] to-[#0a1628]",
    accent: "text-emerald-400",
    title: "Recognised by All India Chess Federation",
    subtitle: "The official governing body for chess in Andaman & Nicobar Islands.",
    link: "/about",
    buttonText: "About Us",
    tag: "Official",
  },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
  }),
};

export function HeroCarousel() {
  const [[current, direction], setCurrent] = useState([0, 0]);

  const paginate = useCallback((newDir: number) => {
    setCurrent(([prev]) => {
      const next = (prev + newDir + slides.length) % slides.length;
      return [next, newDir];
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => paginate(1), 6000);
    return () => clearInterval(timer);
  }, [paginate]);

  const slide = slides[current];

  return (
    <div className="relative w-full h-[320px] md:h-[460px] lg:h-[560px] overflow-hidden group">
      {/* Chess piece background pattern */}
      <div className="absolute inset-0 bg-[#0f172a]">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }} />
      </div>

      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={current}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={`absolute inset-0 bg-gradient-to-br ${slide.gradient} flex items-center`}
        >
          <div className="container mx-auto px-6 md:px-16">
            {/* Tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
            >
              <span className={`inline-block text-xs font-black uppercase tracking-[0.3em] border ${slide.accent} border-current px-3 py-1 rounded-sm mb-4 md:mb-6`}>
                ♟ {slide.tag}
              </span>
            </motion.div>

            {/* Title  */}
            <div className="text-white text-3xl md:text-5xl lg:text-6xl font-black font-poppins mb-4 md:mb-6 leading-tight max-w-3xl">
              <SplitTextReveal text={slide.title} delay={0.2} stagger={0.035} />
            </div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="text-white/70 text-base md:text-xl mb-8 md:mb-10 max-w-2xl"
            >
              {slide.subtitle}
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.4 }}
            >
              <Link
                href={slide.link}
                className={`inline-block border-2 border-white text-white hover:bg-white hover:text-primary font-bold uppercase tracking-widest px-7 md:px-10 py-3 text-sm transition-all duration-300`}
              >
                {slide.buttonText} →
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <button
        onClick={() => paginate(-1)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/30 backdrop-blur-sm text-white p-2 md:p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 border border-white/20"
        aria-label="Previous"
      >
        <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
      </button>
      <button
        onClick={() => paginate(1)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/30 backdrop-blur-sm text-white p-2 md:p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 border border-white/20"
        aria-label="Next"
      >
        <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
      </button>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10 z-20">
        <motion.div
          className="h-full bg-amber-400"
          key={current}
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 6, ease: "linear" }}
        />
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent([idx, idx > current ? 1 : -1])}
            className={`h-1.5 transition-all duration-300 rounded-full ${idx === current ? "w-8 bg-amber-400" : "w-2 bg-white/40 hover:bg-white/70"}`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
