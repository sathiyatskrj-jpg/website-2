"use client";

import dynamic from "next/dynamic";

/**
 * Client-side wrappers for components that require `ssr: false`.
 * These must be defined in a "use client" file to be used within a Server Component Layout.
 */

export const PageTransition = dynamic(
  () => import("@/components/animations/PageTransition").then((m) => ({ default: m.PageTransition })),
  { ssr: false }
);

export const ScrollAnimationWebGL = dynamic(
  () => import("@/components/animations/ScrollAnimationWebGL").then((m) => ({ default: m.ScrollAnimationWebGL })),
  { ssr: false }
);
