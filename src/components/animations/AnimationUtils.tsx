"use client";

import React, { useEffect, useRef, useState } from "react";

// Utility hook: fires once when element enters viewport
function useIntersection(margin = "-5%") {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: margin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [margin]);

  return { ref, inView };
}

/**
 * Splits text into words and animates them in one-by-one on scroll.
 */
interface SplitTextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  splitBy?: "words" | "chars";
  stagger?: number;
}

export function SplitTextReveal({
  text,
  className = "",
  delay = 0,
  splitBy = "words",
  stagger = 0.04,
}: SplitTextRevealProps) {
  const { ref, inView } = useIntersection("-10%");
  const tokens = splitBy === "chars" ? text.split("") : text.split(" ");

  return (
    <span ref={ref as React.RefObject<HTMLSpanElement>} className={`inline-flex flex-wrap gap-x-[0.25em] ${className}`}>
      {tokens.map((token, i) => (
        <span key={i} className="overflow-hidden inline-block" aria-hidden={i > 0}>
          <span
            className="inline-block"
            style={{
              transform: inView ? "translateY(0)" : "translateY(110%)",
              opacity: inView ? 1 : 0,
              transition: `transform 0.6s cubic-bezier(0.22,1,0.36,1), opacity 0.6s ease`,
              transitionDelay: `${delay + i * stagger}s`,
            }}
          >
            {token}{splitBy === "words" ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </span>
  );
}

/**
 * Reveals children with a fade + slide animation when they enter the viewport.
 */
interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "fade";
  duration?: number;
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 0.7,
}: ScrollRevealProps) {
  const { ref, inView } = useIntersection("-5%");

  const hiddenTransform =
    direction === "up" ? "translateY(40px)" :
    direction === "left" ? "translateX(-50px)" :
    direction === "right" ? "translateX(50px)" : "none";

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : hiddenTransform,
        transition: `opacity ${duration}s ease, transform ${duration}s cubic-bezier(0.25,0.46,0.45,0.94)`,
        transitionDelay: `${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/**
 * Stagger-animates a list of child elements.
 */
interface StaggerListProps {
  children: React.ReactNode[];
  className?: string;
  stagger?: number;
  delay?: number;
}

export function StaggerList({
  children,
  className = "",
  stagger = 0.1,
  delay = 0,
}: StaggerListProps) {
  const { ref, inView } = useIntersection("-5%");

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={className}>
      {children.map((child, i) => (
        <div
          key={i}
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "none" : "translateY(30px)",
            transition: "opacity 0.5s ease, transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)",
            transitionDelay: `${delay + i * stagger}s`,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}

/**
 * Animates a number counting up from 0 to target value on scroll.
 */
interface CountUpProps {
  to: number;
  suffix?: string;
  className?: string;
  duration?: number;
}

export function CountUp({ to, suffix = "", className = "", duration = 2 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || hasAnimated.current || !ref.current) return;
    hasAnimated.current = true;
    const start = Date.now();

    const frame = () => {
      const progress = Math.min((Date.now() - start) / (duration * 1000), 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.round(eased * to);
      if (ref.current) ref.current.textContent = current.toLocaleString("en-IN") + suffix;
      if (progress < 1) requestAnimationFrame(frame);
    };

    requestAnimationFrame(frame);
  }, [inView, to, duration, suffix]);

  return <span ref={ref} className={className}>0{suffix}</span>;
}
