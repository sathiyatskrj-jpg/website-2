"use client";

import React, { useRef, useEffect, useState } from 'react';
// @ts-ignore - module installed via CI
import * as animejs from 'animejs';

interface AnimeTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  staggerDelay?: number;
}

export function AnimeTextReveal({
  text,
  className = "",
  delay = 0,
  duration = 800,
  staggerDelay = 30
}: AnimeTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const [isInView, setIsInView] = useState(false);

  // Use native IntersectionObserver — avoids framer-motion server-side crash
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "-10% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Split text into words and letters for animation
  const words = text.split(" ").map(word => ({
    word,
    letters: word.split("")
  }));

  useEffect(() => {
    if (isInView && !hasAnimated.current && containerRef.current) {
      hasAnimated.current = true;
      
      const targets = containerRef.current.querySelectorAll('.anime-letter');
      
      const defaultAnime = (animejs as any).default || animejs;
      
      defaultAnime({
        targets,
        translateY: [40, 0],
        translateZ: 0,
        opacity: [0, 1],
        easing: "easeOutExpo",
        duration: duration,
        delay: defaultAnime.stagger(staggerDelay, { start: delay })
      });
    }
  }, [isInView, delay, duration, staggerDelay]);

  return (
    <div ref={containerRef} className={`overflow-hidden flex flex-wrap gap-[0.25em] ${className}`}>
      {words.map((wordObj, wordIndex) => (
        <span key={`word-${wordIndex}`} className="inline-flex overflow-hidden">
          {wordObj.letters.map((letter, letterIndex) => (
            <span
              key={`letter-${wordIndex}-${letterIndex}`}
              className="anime-letter inline-block opacity-0"
              style={{ transformOrigin: "0 100%" }}
            >
              {letter}
            </span>
          ))}
        </span>
      ))}
    </div>
  );
}
