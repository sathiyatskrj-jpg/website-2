export default function GalleryPage() {
  const images = [
    "https://images.unsplash.com/photo-1529699211952-734e80c4d44b?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1580541832626-2a7131ee809f?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1560174038-da43ac74f01b?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1610817088194-e9ed9591e3e7?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1528819622765-d6bcf132f793?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1534067341014-2c0615962f3c?auto=format&fit=crop&q=80",
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-primary text-primary-foreground py-16 bg-chess-pattern relative">
        <div className="absolute inset-0 bg-primary/95"></div>
        <div className="container relative mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-black font-poppins mb-4">Photo Gallery</h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Memories from our state championships, award ceremonies, and coaching camps.
          </p>
        </div>
      </section>

      <section className="py-12 bg-background flex-1">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {images.map((src, i) => (
              <div key={i} className="group relative aspect-video bg-muted rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`Gallery Image ${i+1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white font-medium border border-white/50 px-4 py-2 rounded-lg backdrop-blur-sm">View</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
