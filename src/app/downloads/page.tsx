import { Download, FileText } from "lucide-react";

export default function DownloadsPage() {
  const documents = [
    { name: "ANCA New Member Registration Form", category: "Forms" },
    { name: "State Championship 2026 Brochure", category: "Brochures" },
    { name: "FIDE Rules of Chess 2026", category: "Regulations" },
    { name: "AICF Transfer Policy Guidelines", category: "Regulations" },
    { name: "Arbiter Exam Syllabus", category: "Education" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-primary text-primary-foreground py-16 bg-chess-pattern relative">
        <div className="absolute inset-0 bg-primary/95"></div>
        <div className="container relative mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-black font-poppins mb-4">Downloads</h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Access important forms, brochures, and regulatory documents below.
          </p>
        </div>
      </section>

      <section className="py-12 bg-background flex-1">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
            <div className="divide-y divide-border">
              {documents.map((doc, i) => (
                <div key={i} className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between hover:bg-muted/50 transition-colors gap-4">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">{doc.name}</h3>
                      <p className="text-sm font-medium text-muted-foreground uppercase mt-1 tracking-wider">{doc.category}</p>
                    </div>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 border border-border hover:bg-muted bg-background rounded-lg font-medium text-sm w-full sm:w-auto justify-center transition-colors">
                    <Download className="h-4 w-4" /> Download PDF
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
