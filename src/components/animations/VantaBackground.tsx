"use client";

import React, { useState, useEffect, useRef } from "react";
// @ts-ignore - module installed via CI
import * as THREE from "three";

// @ts-ignore - Vanta doesn't have official types
import WAVES from "vanta/dist/vanta.waves.min";
import NET from "vanta/dist/vanta.net.min";

interface VantaBackgroundProps {
  effect?: "waves" | "net";
  color?: number;
  backgroundColor?: number;
  children: React.ReactNode;
  className?: string;
}

export default function VantaBackground({
  effect = "net",
  color = 0x3b82f6,
  backgroundColor = 0x0a0a0a,
  children,
  className = "",
}: VantaBackgroundProps) {
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const vantaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!vantaEffect && vantaRef.current) {
      if (typeof window !== "undefined") {
        try {
           const VantaEffect = effect === "waves" ? WAVES : NET;
           setVantaEffect(
            VantaEffect({
              el: vantaRef.current,
              THREE,
              mouseControls: true,
              touchControls: true,
              gyroControls: false,
              minHeight: 200.0,
              minWidth: 200.0,
              scale: 1.0,
              scaleMobile: 1.0,
              color: color,
              backgroundColor: backgroundColor,
              points: 12.0,
              maxDistance: 22.0,
              spacing: 18.0,
              showDots: true,
            })
          );
        } catch (e) {
           console.error("Vanta initialization failed:", e);
        }
      }
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect, effect, color, backgroundColor]);

  return (
    <div ref={vantaRef} className={`relative w-full overflow-hidden ${className}`}>
      <div className="relative z-10 w-full h-full pointer-events-none">
         {/* Allow children to capture pointers if they explicitly ask via pointer-events-auto */}
         <div className="pointer-events-auto contents">
            {children}
         </div>
      </div>
    </div>
  );
}
