"use client";

import { useEffect, useRef } from "react";

/**
 * Typewriter text effect using typed.js.
 * Inspired by mattboldt/typed.js
 */
interface TypewriterProps {
  strings: string[];
  className?: string;
  typeSpeed?: number;
  backSpeed?: number;
  backDelay?: number;
  startDelay?: number;
  loop?: boolean;
  /** If false, types strings one after another without backspacing */
  showCursor?: boolean;
  cursorChar?: string;
}

export function Typewriter({
  strings,
  className = "",
  typeSpeed = 50,
  backSpeed = 30,
  backDelay = 1500,
  startDelay = 500,
  loop = true,
  showCursor = true,
  cursorChar = "|",
}: TypewriterProps) {
  const elRef = useRef<HTMLSpanElement>(null);
  const typedRef = useRef<import("typed.js").default | null>(null);

  useEffect(() => {
    if (!elRef.current) return;

    const init = async () => {
      const TypedModule = await import("typed.js");
      const Typed = TypedModule.default;
      typedRef.current = new Typed(elRef.current!, {
        strings,
        typeSpeed,
        backSpeed,
        backDelay,
        startDelay,
        loop,
        showCursor,
        cursorChar,
        smartBackspace: true,
      });
    };

    init();
    return () => { typedRef.current?.destroy(); };
  }, [strings, typeSpeed, backSpeed, backDelay, startDelay, loop, showCursor, cursorChar]);

  return <span ref={elRef} className={className} />;
}

/**
 * Static typewriter — types a single string once, then stops.
 * Useful for headings and banners.
 */
interface StaticTypewriterProps {
  text: string;
  className?: string;
  typeSpeed?: number;
  startDelay?: number;
  onComplete?: () => void;
}

export function StaticTypewriter({
  text,
  className = "",
  typeSpeed = 40,
  startDelay = 300,
  onComplete,
}: StaticTypewriterProps) {
  const elRef = useRef<HTMLSpanElement>(null);
  const typedRef = useRef<import("typed.js").default | null>(null);

  useEffect(() => {
    if (!elRef.current) return;

    const init = async () => {
      const { default: Typed } = await import("typed.js");
      typedRef.current = new Typed(elRef.current!, {
        strings: [text],
        typeSpeed,
        startDelay,
        loop: false,
        showCursor: true,
        cursorChar: "_",
        onComplete: () => {
          // hide cursor after done
          const cursor = elRef.current?.parentElement?.querySelector(".typed-cursor");
          if (cursor) {
            (cursor as HTMLElement).style.animation = "none";
            (cursor as HTMLElement).style.opacity = "0";
          }
          onComplete?.();
        },
      });
    };

    init();
    return () => { typedRef.current?.destroy(); };
  }, [text, typeSpeed, startDelay, onComplete]);

  return <span ref={elRef} className={className} />;
}

/**
 * Multi-line typewriter for a hero section with rotating subtitles.
 */
interface HeroTypewriterProps {
  prefix?: string;
  rotatingWords: string[];
  className?: string;
  prefixClassName?: string;
  wordClassName?: string;
}

export function HeroTypewriter({
  prefix = "",
  rotatingWords,
  className = "",
  prefixClassName = "",
  wordClassName = "",
}: HeroTypewriterProps) {
  const wordRef = useRef<HTMLSpanElement>(null);
  const typedRef = useRef<import("typed.js").default | null>(null);

  useEffect(() => {
    if (!wordRef.current) return;

    const init = async () => {
      const { default: Typed } = await import("typed.js");
      typedRef.current = new Typed(wordRef.current!, {
        strings: rotatingWords,
        typeSpeed: 60,
        backSpeed: 40,
        backDelay: 2000,
        startDelay: 800,
        loop: true,
        showCursor: true,
        cursorChar: "|",
      });
    };

    init();
    return () => { typedRef.current?.destroy(); };
  }, [rotatingWords]);

  return (
    <span className={className}>
      {prefix && <span className={prefixClassName}>{prefix} </span>}
      <span ref={wordRef} className={wordClassName} />
    </span>
  );
}
