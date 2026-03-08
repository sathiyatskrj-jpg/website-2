import Link from 'next/link';
import { Calendar, FileText, Download, ChevronRight, Newspaper } from 'lucide-react';

const news = [
  { id: 1, title: "State Level Selection Chess Tournament Announcement – May 2026", date: "12 Mar 2026", type: "Tournament", typeColor: "bg-blue-100 text-blue-800 border border-blue-200", hasAttachment: true },
  { id: 2, title: "AICF New Guidelines for State Associations – Rating Rules", date: "05 Mar 2026", type: "Circular", typeColor: "bg-orange-100 text-orange-800 border border-orange-200", hasAttachment: true },
  { id: 3, title: "Results: Andaman District Championship 2026 – Final Standings", date: "28 Feb 2026", type: "Results", typeColor: "bg-green-100 text-green-800 border border-green-200", hasAttachment: false },
  { id: 4, title: "Arbiter Training Seminar – Registration Now Open", date: "15 Feb 2026", type: "Seminar", typeColor: "bg-purple-100 text-purple-800 border border-purple-200", hasAttachment: true },
  { id: 5, title: "Notice: Revised Dress Code for National Level Participants", date: "01 Feb 2026", type: "Notice", typeColor: "bg-red-100 text-red-800 border border-red-200", hasAttachment: true },
];

export default function NewsPage() {
  return (
    <div className="flex flex-col w-full">
      <section className="bg-primary text-primary-foreground py-8 border-b-4 border-secondary">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-primary-foreground/70 mb-3">
            <Link href="/">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span>News &amp; Announcements</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black font-poppins uppercase tracking-wide flex items-center gap-3">
            <Newspaper className="h-8 w-8 text-secondary" /> News &amp; Announcements
          </h1>
          <p className="text-primary-foreground/80 mt-2">Latest circulars, tournament notices, and news from ANCA</p>
        </div>
      </section>

      <section className="py-10 container mx-auto px-4">
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <div className="bg-card border border-border shadow-sm rounded-md overflow-hidden">
              <div className="bg-primary text-primary-foreground text-xs uppercase tracking-widest font-bold py-3 px-6 flex justify-between items-center">
                <span>Latest Announcements</span>
                <span className="text-primary-foreground/70">{news.length} Items</span>
              </div>

              {news.map((item, i) => (
                <div key={item.id} className={`px-6 py-4 border-b border-border last:border-0 hover:bg-muted/50 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${i % 2 === 0 ? '' : 'bg-muted/20'}`}>
                  <div className="flex items-start gap-4 flex-1">
                    <div className="bg-primary text-primary-foreground rounded p-2 text-center min-w-[48px] shrink-0 hidden sm:flex flex-col justify-center">
                      <span className="text-lg font-bold leading-none">{item.date.split(' ')[0]}</span>
                      <span className="text-[10px] uppercase">{item.date.split(' ')[1]}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className={`px-2 py-0.5 text-[10px] font-bold rounded-sm uppercase tracking-wider ${item.typeColor}`}>{item.type}</span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1"><Calendar className="h-3 w-3" /> {item.date}</span>
                      </div>
                      <h3 className="font-semibold text-foreground text-sm leading-snug">{item.title}</h3>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    {item.hasAttachment && (
                      <button className="flex items-center gap-1 px-3 py-1.5 border border-border rounded text-xs font-medium hover:bg-muted hover:border-primary transition-colors">
                        <Download className="h-3 w-3" /> PDF
                      </button>
                    )}
                    <Link href={`/news/${item.id}`} className="flex items-center gap-1 px-3 py-1.5 bg-primary text-primary-foreground rounded text-xs font-bold hover:bg-primary/90 transition-colors">
                      <FileText className="h-3 w-3" /> Read
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Category Filter */}
            <div className="bg-card border border-border rounded-md shadow-sm p-5">
              <h3 className="font-poppins font-bold text-primary text-sm uppercase tracking-wider border-b border-border pb-2 mb-4">Browse by Category</h3>
              <ul className="space-y-2 text-sm">
                {[{ label: "All Announcements", count: 5 }, { label: "Circular", count: 1 }, { label: "Tournament", count: 1 }, { label: "Seminar", count: 1 }, { label: "Notice", count: 1 }, { label: "Results", count: 1 }].map(c => (
                  <li key={c.label}>
                    <button className="w-full flex justify-between items-center py-1.5 px-2 hover:bg-muted rounded text-muted-foreground hover:text-primary transition-colors font-medium">
                      <span>&rsaquo; {c.label}</span>
                      <span className="text-xs bg-muted border border-border px-1.5 py-0.5 rounded">{c.count}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Archive */}
            <div className="bg-card border border-border rounded-md shadow-sm p-5">
              <h3 className="font-poppins font-bold text-primary text-sm uppercase tracking-wider border-b border-border pb-2 mb-4">Archive</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {["March 2026", "February 2026", "January 2026", "December 2025"].map(m => (
                  <li key={m}><button className="hover:text-primary hover:underline transition-colors">&rsaquo; {m}</button></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
