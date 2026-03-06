import Link from 'next/link';
import { Crown, Mail, MapPin, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground border-t border-border/10">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Crown className="h-8 w-8 text-secondary" />
              <span className="font-poppins font-bold text-xl">ANCA</span>
            </Link>
            <p className="text-primary-foreground/80 text-sm">
              The official portal of the Andaman and Nicobar Chess Association. Empowering chess players and organizing premier tournaments across the islands.
            </p>
          </div>
          
          <div>
            <h3 className="font-poppins font-semibold mb-4 text-secondary">Quick Links</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><Link href="/about" className="hover:text-secondary transition-colors">About Us</Link></li>
              <li><Link href="/tournaments" className="hover:text-secondary transition-colors">Tournaments</Link></li>
              <li><Link href="/players" className="hover:text-secondary transition-colors">Players Directory</Link></li>
              <li><Link href="/arbiters-coaches" className="hover:text-secondary transition-colors">Arbiters & Coaches</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-poppins font-semibold mb-4 text-secondary">Resources</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><Link href="/news" className="hover:text-secondary transition-colors">Latest News</Link></li>
              <li><Link href="/gallery" className="hover:text-secondary transition-colors">Gallery</Link></li>
              <li><Link href="/downloads" className="hover:text-secondary transition-colors">Downloads</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-poppins font-semibold mb-4 text-secondary">Contact</h3>
            <ul className="space-y-4 text-sm text-primary-foreground/80">
              <li className="flex gap-2">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-secondary" />
                <span>Port Blair, Andaman and Nicobar Islands, India</span>
              </li>
              <li className="flex gap-2 items-center">
                <Phone className="h-4 w-4 text-secondary" />
                <span>+91 XXXXX XXXXX</span>
              </li>
              <li className="flex gap-2 items-center">
                <Mail className="h-4 w-4 text-secondary" />
                <span>info@ancachess.in</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-primary-foreground/10 text-center text-sm text-primary-foreground/60">
          <p>© {new Date().getFullYear()} Andaman and Nicobar Chess Association. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
