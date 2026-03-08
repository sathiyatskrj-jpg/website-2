"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Wraps page content with a smooth fade+slide transition using CSS only.
 * Replaces framer-motion AnimatePresence to avoid SSR/prerender crashes.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionStage, setTransitionStage] = useState<"fadeIn" | "fadeOut">("fadeIn");

  useEffect(() => {
    setTransitionStage("fadeOut");
    const timer = setTimeout(() => {
      setDisplayChildren(children);
      setTransitionStage("fadeIn");
    }, 150);
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div
      className="w-full"
      style={{
        opacity: transitionStage === "fadeIn" ? 1 : 0,
        transform: transitionStage === "fadeIn" ? "translateY(0)" : "translateY(8px)",
        transition: "opacity 0.25s ease, transform 0.25s ease",
      }}
    >
      {displayChildren}
    </div>
  );
}

/**
 * Slide transition style — CSS-based, no framer-motion.
 */
export function SlideTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [stage, setStage] = useState<"in" | "out">("in");

  useEffect(() => {
    setStage("out");
    const timer = setTimeout(() => {
      setDisplayChildren(children);
      setStage("in");
    }, 150);
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div
      className="w-full"
      style={{
        opacity: stage === "in" ? 1 : 0,
        transform: stage === "in" ? "translateX(0)" : "translateX(20px)",
        transition: "opacity 0.25s ease, transform 0.25s ease",
      }}
    >
      {displayChildren}
    </div>
  );
}
