import Link from 'next/link';
import { Calendar, FileText, Download } from 'lucide-react';

export default function NewsPage() {
  const news = [
    { title: "State Level Selection Chess Tournament Announcement", date: "12 Oct 2026", type: "Tournament", hasAttachment: true },
    { title: "AICF New Guidelines for State Associations", date: "05 Oct 2026", type: "Circular", hasAttachment: true },
    { title: "Results: Andaman District Championship 2026", date: "28 Sep 2026", type: "Results", hasAttachment: false },
    { title: "Arbiter Training Seminar 2026", date: "15 Sep 2026", type: "Seminar", hasAttachment: true },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-primary text-primary-foreground py-16 bg-chess-pattern relative">
        <div className="absolute inset-0 bg-primary/95"></div>
        <div className="container relative mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-black font-poppins mb-4">News & Announcements</h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Stay updated with the latest circulars, tournament announcements, and chess news from the islands.
          </p>
        </div>
      </section>

      <section className="py-12 bg-background flex-1">
        <div className="container mx-auto px-4 max-w-4xl space-y-4">
          {news.map((item, i) => (
            <div key={i} className="bg-card border border-border p-6 rounded-xl hover:shadow-md transition-shadow flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 text-xs font-bold rounded bg-secondary/20 text-secondary-foreground uppercase tracking-wider">{item.type}</span>
                  <span className="text-sm text-muted-foreground flex items-center gap-1"><Calendar className="h-3 w-3" /> {item.date}</span>
                </div>
                <h3 className="text-xl font-bold font-poppins text-foreground">{item.title}</h3>
              </div>
              <div className="flex gap-3 w-full sm:w-auto mt-4 sm:mt-0">
                {item.hasAttachment && (
                  <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors">
                    <Download className="h-4 w-4" /> PDF
                  </button>
                )}
                <Link href={`/news/${i}`} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm font-bold hover:bg-secondary/90 transition-colors">
                  <FileText className="h-4 w-4" /> Read
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
