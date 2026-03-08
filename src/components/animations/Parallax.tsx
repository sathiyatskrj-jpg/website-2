"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Wraps children in a parallax container that moves slower than the scroll rate,
 * creating a depth effect. Inspired by bedimcode/parallax-scrolling-website.
 */
interface ParallaxProps {
  children: React.ReactNode;
  className?: string;
  /** Speed factor. 0 = no parallax, 1 = full, negative = opposite direction */
  speed?: number;
}

export function ParallaxSection({ children, className = "", speed = 0.3 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`${-speed * 100}px`, `${speed * 100}px`]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

/**
 * Creates a subtle parallax background layer effect.
 * The background image moves at a slower rate than the foreground.
 */
interface ParallaxHeroProps {
  children: React.ReactNode;
  className?: string;
  bgClassName?: string;
  speed?: number;
}

export function ParallaxHeroLayer({
  children,
  className = "",
  bgClassName = "",
  speed = 0.15,
}: ParallaxHeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 50}%`]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* Parallax background */}
      <motion.div
        className={`absolute inset-0 ${bgClassName}`}
        style={{ y: bgY }}
      />
      {/* Foreground content fades out as you scroll */}
      <motion.div
        className="relative z-10"
        style={{ y: textY, opacity }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/**
 * Parallax image panel — creates depth on an <img> or background image.
 */
interface ParallaxImageProps {
  src?: string;
  alt?: string;
  className?: string;
  speed?: number;
}

export function ParallaxImage({ src, alt = "", className = "", speed = 0.2 }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div className="absolute inset-0 scale-110" style={{ y }}>
        {src && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={alt} className="w-full h-full object-cover" />
        )}
      </motion.div>
    </div>
  );
}
