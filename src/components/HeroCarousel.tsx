"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    image: "bg-primary",
    title: "45th Andaman State Chess Championship",
    subtitle: "Empowering minds and nurturing the next generation of Grandmasters in the Islands.",
    link: "/tournaments",
    buttonText: "Register Now"
  },
  {
    id: 2,
    image: "bg-secondary",
    title: "Arbiters & Coaches Training Camp",
    subtitle: "Join the upcoming certification seminar starting next month.",
    link: "/news",
    buttonText: "Read Circular"
  },
  {
    id: 3,
    image: "bg-slate-800",
    title: "Recognised by All India Chess Federation",
    subtitle: "The official governing body for chess in Andaman & Nicobar Islands.",
    link: "/about",
    buttonText: "About Us"
  }
];

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-full h-[300px] md:h-[450px] lg:h-[550px] bg-muted overflow-hidden group">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${slide.image} flex items-center ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7)), url('/placeholder-chess.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="container mx-auto px-6 md:px-12">
            <div className="max-w-2xl text-white transform transition-transform duration-700 translate-y-0 opacity-100">
              <h2 className="text-2xl md:text-5xl font-black font-poppins mb-4 uppercase tracking-wide leading-tight drop-shadow-lg text-white">
                {slide.title}
              </h2>
              <p className="text-lg md:text-xl font-medium mb-8 text-white/90 drop-shadow-sm">
                {slide.subtitle}
              </p>
              <Link
                href={slide.link}
                className="inline-block bg-secondary text-secondary-foreground hover:bg-white hover:text-primary transition-colors font-bold uppercase tracking-wider px-6 md:px-8 py-3 rounded-sm shadow-lg"
              >
                {slide.buttonText}
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Controls */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/60 text-white p-2 md:p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="h-6 w-6 md:h-8 md:w-8" />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/60 text-white p-2 md:p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Next Slide"
      >
        <ChevronRight className="h-6 w-6 md:h-8 md:w-8" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2 transition-all ${index === current ? "w-8 bg-secondary" : "w-2 bg-white/50 hover:bg-white/80"} rounded-full`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
