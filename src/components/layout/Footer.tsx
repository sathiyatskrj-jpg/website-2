import Link from 'next/link';
import { Crown, Mail, MapPin, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#111827] text-white">
      {/* Upper Footer: Main Links & Contact */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          
          <div className="md:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-4">
              <div className="bg-white p-2 rounded shrink-0">
                <Crown className="h-8 w-8 text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="font-poppins font-bold text-lg leading-tight uppercase">Andaman & Nicobar</span>
                <span className="font-poppins text-sm leading-tight text-secondary">Chess Association</span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm mt-4 text-justify">
              The official portal of the Andaman and Nicobar Chess Association. Empowering chess players and organizing premier tournaments across the islands under the guidance of AICF.
            </p>
          </div>
          
          <div className="md:col-span-2">
            <h3 className="font-poppins font-bold uppercase tracking-wider mb-4 border-b border-gray-700 pb-2 text-sm text-gray-300">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400 font-medium">
              <li><Link href="/about" className="hover:text-secondary hover:translate-x-1 transition-all flex items-center">&rsaquo; About Us</Link></li>
              <li><Link href="/tournaments" className="hover:text-secondary hover:translate-x-1 transition-all flex items-center">&rsaquo; Tournaments</Link></li>
              <li><Link href="/players" className="hover:text-secondary hover:translate-x-1 transition-all flex items-center">&rsaquo; Players Directory</Link></li>
              <li><Link href="/news" className="hover:text-secondary hover:translate-x-1 transition-all flex items-center">&rsaquo; Latest News</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="font-poppins font-bold uppercase tracking-wider mb-4 border-b border-gray-700 pb-2 text-sm text-gray-300">Important Policies</h3>
            <ul className="space-y-2 text-sm text-gray-400 font-medium">
              <li><Link href="/privacy-policy" className="hover:text-secondary hover:translate-x-1 transition-all flex items-center">&rsaquo; Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-secondary hover:translate-x-1 transition-all flex items-center">&rsaquo; Terms & Conditions</Link></li>
              <li><Link href="/disclaimer" className="hover:text-secondary hover:translate-x-1 transition-all flex items-center">&rsaquo; Disclaimer</Link></li>
              <li><Link href="/accessibility" className="hover:text-secondary hover:translate-x-1 transition-all flex items-center">&rsaquo; Accessibility Statement</Link></li>
              <li><Link href="/sitemap" className="hover:text-secondary hover:translate-x-1 transition-all flex items-center">&rsaquo; Sitemap</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="font-poppins font-bold uppercase tracking-wider mb-4 border-b border-gray-700 pb-2 text-sm text-gray-300">Contact Us</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex gap-3">
                <MapPin className="h-5 w-5 shrink-0 mt-0.5 text-secondary" />
                <span className="leading-snug">O/o The Secretary, ANCA<br/>Port Blair, Andaman & Nicobar Islands, India - 744101</span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone className="h-4 w-4 shrink-0 text-secondary" />
                <span>+91 XXXXX XXXXX</span>
              </li>
              <li className="flex gap-3 items-center">
                <Mail className="h-4 w-4 shrink-0 text-secondary" />
                <a href="mailto:info@ancachess.in" className="hover:text-white">info@ancachess.in</a>
              </li>
            </ul>
          </div>

        </div>
      </div>
      
      {/* Lower Footer: Copyright & Dev Info */}
      <div className="bg-[#0f1522] border-t border-gray-800 text-xs text-gray-500 py-6">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <div>
            <p>Website Content Managed by <strong>Andaman & Nicobar Chess Association</strong></p>
            <p className="mt-1">Designed, Developed and Hosted by ANCA Web Developers © {new Date().getFullYear()}</p>
          </div>
          <div className="flex gap-4 opacity-50">
             <span>Last Updated: {new Date().toLocaleDateString('en-IN', {day: '2-digit', month: 'short', year: 'numeric'})}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
