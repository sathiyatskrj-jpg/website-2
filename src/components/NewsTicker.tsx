"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

export function NewsTicker() {
  const [isHovered, setIsHovered] = useState(false);
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    setDateTime(new Date().toLocaleDateString('en-IN', {
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    }));
  }, []);

  const newsItems = [
    { title: "Registration for 45th State Chess Championship is now open.", link: "/tournaments" },
    { title: "AICF Guidelines updated for new Arbiters Exam 2024.", link: "/news/aicf-guidelines" },
    { title: "Circular regarding District Association affiliations.", link: "/downloads" },
    { title: "Notice: Change of venue for upcoming Under-19 tournament.", link: "/tournaments" },
  ];

  return (
    <div className="bg-background border-b border-border shadow-sm flex items-center text-sm">
      <div className="bg-primary text-primary-foreground px-4 md:px-6 py-2 font-bold uppercase tracking-wider shrink-0 flex items-center relative z-10 shadow-md h-full">
        WHAT&apos;S NEW
        <div className="absolute top-0 right-[-10px] w-0 h-0 border-y-[18px] border-y-transparent border-l-[10px] border-l-primary z-10 hidden md:block"></div>
      </div>
      
      <div 
        className="flex-1 overflow-hidden whitespace-nowrap px-4 py-2 relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div 
          className="inline-flex items-center gap-12"
          style={{
            animation: `ticker 30s linear infinite`,
            animationPlayState: isHovered ? 'paused' : 'running'
          }}
        >
          {newsItems.concat(newsItems).map((item, idx) => (
            <Link 
              key={idx} 
              href={item.link}
              className="font-medium text-foreground hover:text-primary transition-colors inline-flex items-center"
            >
              <ChevronRight className="h-4 w-4 text-secondary mr-1 inline-block" />
              {item.title}
              <span className="ml-2 text-xs text-muted-foreground font-normal bg-muted px-2 py-0.5 rounded-sm border border-border">New</span>
            </Link>
          ))}
        </div>
      </div>
      
      <div className="hidden lg:block shrink-0 px-6 py-2 bg-muted text-muted-foreground text-xs font-semibold border-l border-border h-full flex items-center">
        {dateTime}
      </div>
    </div>
  );
}
