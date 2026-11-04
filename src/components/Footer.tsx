import React from 'react';
import { MessageCircle } from 'lucide-react';
import { Wordmark } from './Wordmark';
import { CONTACT, waLink } from '../lib/contact';

const INSTAGRAM_SVG = (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950/75 backdrop-blur-2xl text-white/90 pt-16 pb-24 md:pb-16 border-t border-white/15 relative z-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/15">

          {/* ── Brand Col (3 cols) ── */}
          <div className="lg:col-span-3 space-y-4">
            <a href="#" className="inline-block" aria-label="Aeroviz Home">
              <Wordmark size="lg" />
            </a>
            <p className="text-sm text-white/75 max-w-sm leading-relaxed">
              UAE-based travel partner and visa specialist. We arrange tourist visas, residence services, flights to every country, tours, desert safaris and much more.
            </p>
            <div className="pt-2 flex flex-col gap-2">
              {/* Instagram */}
              <a
                href={CONTACT.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#833ab4]/30 via-[#fd1d1d]/30 to-[#fcb045]/30 border border-white/20 text-white hover:border-pink/50 hover:text-pink-300 transition-all w-fit text-xs font-semibold"
              >
                {INSTAGRAM_SVG}
                <span>@aeroviztourism</span>
              </a>
              {/* WhatsApp buttons */}
              <div className="flex flex-col gap-1.5">
                {CONTACT.phones.map((p, i) => (
                  <a
                    key={i}
                    href={waLink('Hi Aeroviz, I need assistance.', p.wa)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-400/35 text-emerald-300 hover:border-emerald-400/60 hover:text-emerald-200 transition-all w-fit text-xs font-semibold"
                    aria-label={`WhatsApp Desk ${i + 1}: ${p.display}`}
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp Desk {i + 1}: {p.display}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── Visa Services Col (3 cols) ── */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-heading font-bold text-white uppercase tracking-wider mb-4">
              Visa &amp; Immigration
            </h4>
            <ul className="space-y-2 text-sm text-white/75">
              <li><a href="#services" className="hover:text-pink-300 transition-colors">1. Tourist Visa (30/60 Days)</a></li>
              <li><a href="#services" className="hover:text-pink-300 transition-colors">2. Visa Change by Flight &amp; Bus</a></li>
              <li><a href="#services" className="hover:text-pink-300 transition-colors">3. Single / Multiple Entry Visa</a></li>
              <li><a href="#services" className="hover:text-pink-300 transition-colors">4. Family Visa Sponsorship</a></li>
              <li><a href="#services" className="hover:text-pink-300 transition-colors">5. 2-Year Residence Visa</a></li>
            </ul>
          </div>

          {/* ── Travel & Experiences Col (3 cols) ── */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-heading font-bold text-white uppercase tracking-wider mb-4">
              Flights &amp; Experiences
            </h4>
            <ul className="space-y-2 text-sm text-white/75">
              <li><a href="#flights" className="hover:text-white transition-colors font-semibold text-pink-300">7. Flight Tickets to Every Country</a></li>
              <li><a href="#services" className="hover:text-pink-300 transition-colors">6. Holiday Tour Packages</a></li>
              <li><a href="#services" className="hover:text-pink-300 transition-colors font-semibold text-white">8. Farm Stay Retreats</a></li>
              <li><a href="#services" className="hover:text-pink-300 transition-colors">9. Desert Safari Adventure</a></li>
              <li><a href="#services" className="hover:text-pink-300 transition-colors">10. City Sightseeing Tours</a></li>
              <li><a href="#services" className="hover:text-pink-300 transition-colors">11. Luxury Yacht Services</a></li>
              <li><a href="#services" className="hover:text-pink-300 transition-colors">12. Hajj &amp; Umrah Services</a></li>
            </ul>
          </div>

          {/* ── Quick Links + Contact Col (3 cols) ── */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-heading font-bold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-white/75 mb-4">
              <li><a href="#services" className="hover:text-pink-300 transition-colors">Services</a></li>
              <li><a href="#flights" className="hover:text-pink-300 transition-colors">Flights</a></li>
              <li><a href="#how-it-works" className="hover:text-pink-300 transition-colors">How it works</a></li>
              <li><a href="#destinations" className="hover:text-pink-300 transition-colors">Destinations</a></li>
              <li><a href="#faq" className="hover:text-pink-300 transition-colors">FAQ</a></li>
              <li><a href="#contact" className="hover:text-pink-300 transition-colors">Contact</a></li>
            </ul>

            <h4 className="text-sm font-heading font-bold text-white uppercase tracking-wider mb-2">
              Dubai Office
            </h4>
            <p className="text-xs text-white/75 leading-relaxed mb-3">
              {CONTACT.address}
            </p>

            <div className="space-y-1.5 text-xs text-white/80">
              <div>
                <span className="text-white/55 block text-[10px]">Email:</span>
                <a href={`mailto:${CONTACT.email}`} className="text-pink-300 hover:underline font-medium">
                  {CONTACT.email}
                </a>
              </div>
              <div>
                <span className="text-white/55 block text-[10px]">Website:</span>
                <a href={CONTACT.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-white/90 hover:text-pink-300 transition-colors font-medium">
                  {CONTACT.website}
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Legal bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p className="text-center md:text-start max-w-2xl leading-relaxed">
            {CONTACT.companyName} is a licensed UAE travel and tourism company.{' '}
            <span className="font-mono text-white/80">Al Quasis 2, Dubai, UAE.</span>
          </p>
          <p className="text-center md:text-end whitespace-nowrap">
            © 2026 {CONTACT.companyName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
