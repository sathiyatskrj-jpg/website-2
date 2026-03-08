"use client";

import React, { useRef, useState, useEffect } from "react";

/**
 * Magnetic hover button — the element's position subtly follows the cursor.
 * Replaces framer-motion motion.div with native style updates.
 */
interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export function Magnetic({ children, className = "", strength = 0.4 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current!.getBoundingClientRect();
    setPos({
      x: (clientX - left - width / 2) * strength,
      y: (clientY - top - height / 2) * strength,
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      className={className}
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        transition: "transform 0.2s cubic-bezier(0.25,0.46,0.45,0.94)",
      }}
    >
      {children}
    </div>
  );
}

/**
 * Animated underline link — reveals a sliding underline on hover.
 */
interface AnimatedLinkProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
}

export function AnimatedLink({ children, className = "" }: AnimatedLinkProps) {
  return (
    <span className={`relative inline-block group ${className}`}>
      {children}
      <span className="absolute inset-x-0 bottom-0 h-0.5 bg-current transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
    </span>
  );
}

/**
 * Hover reveal card — scaling + shadow effect on hover using CSS transitions.
 */
interface HoverCardProps {
  children: React.ReactNode;
  className?: string;
}

export function HoverCard({ children, className = "" }: HoverCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "-5%" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.5s ease, transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.transform = "translateY(-6px) scale(1.02)";
        el.style.boxShadow = "0 20px 40px -12px rgba(0,0,0,0.15)";
        el.style.transition = "transform 0.2s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s ease";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.transform = "translateY(0) scale(1)";
        el.style.boxShadow = "";
        el.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";
      }}
    >
      {children}
    </div>
  );
}

/**
 * Ripple click effect on buttons — CSS-based burst animation.
 */
export function RippleButton({
  children,
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setRipples((prev) => [...prev, { x: e.clientX - left, y: e.clientY - top, id }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 700);
    onClick?.();
  };

  return (
    <button className={`relative overflow-hidden ${className}`} onClick={handleClick}>
      {children}
      {ripples.map((r) => (
        <span
          key={r.id}
          className="absolute rounded-full bg-white/30 pointer-events-none animate-ripple"
          style={{ left: r.x, top: r.y, transform: "translate(-50%,-50%)" }}
        />
      ))}
    </button>
  );
}
