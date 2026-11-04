import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, MessageCircle, ArrowRight, Search } from 'lucide-react';
import { CONTACT, waLink } from '../lib/contact';
import { createQuickQuoteUrl } from '../lib/whatsapp';

const NAV_ITEMS = [
  { label: 'Tours & Visas', href: '#services' },
  { label: 'Flights', href: '#flights' },
  { label: 'Destinations', href: '#destinations' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('destinations');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const scrollPosition = window.scrollY + 220;
      for (const item of [...NAV_ITEMS].reverse()) {
        const el = document.querySelector(item.href);
        if (el && el instanceof HTMLElement) {
          if (el.offsetTop <= scrollPosition) {
            setActiveSection(item.href.replace('#', ''));
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      const destEl = document.querySelector('#destinations');
      destEl?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    window.open(
      waLink(`Hi Aeroviz, I'm looking for information about: ${searchQuery.trim()}`),
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/80 backdrop-blur-2xl border-b border-white/15 py-3.5 shadow-2xl'
          : 'bg-gradient-to-b from-black/55 via-black/25 to-transparent py-6 sm:py-8'
      }`}
    >
      <nav
        aria-label="Main Navigation"
        className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 flex items-center justify-between gap-6"
      >
        {/* Left Brand Mark: AEROVIZ */}
        <a
          href="#"
          className="focus-visible:outline-pink rounded-lg py-1 flex items-center select-none group shrink-0"
          aria-label="Aeroviz Home"
        >
          <span className="font-heading font-black text-xl sm:text-2xl lg:text-[26px] tracking-[0.06em] text-white uppercase drop-shadow-md group-hover:text-pink-200 transition-colors">
            AEROVIZ
          </span>
        </a>

        {/* Center Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-7 xl:gap-10">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.replace('#', '');
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setActiveSection(item.href.replace('#', ''))}
                className={`relative py-1 text-[15px] tracking-wide transition-all duration-200 ${
                  isActive
                    ? 'text-white font-bold drop-shadow'
                    : 'text-white/80 hover:text-white font-normal'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="navUnderline"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.9)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* Right Search Bar (sits over the Hero's right frosted glass column) */}
        <div className="hidden md:flex items-center gap-5 shrink-0">
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center gap-2.5 border-b border-white/50 focus-within:border-white pb-1.5 transition-colors"
          >
            <button
              type="submit"
              aria-label="Search visas or destinations"
              className="text-white/90 hover:text-white transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Let's find your trip..."
              className="bg-transparent text-white placeholder:text-white/75 text-sm font-normal focus:outline-none w-36 xl:w-44"
            />
          </form>
        </div>

        {/* Mobile Header Controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-white hover:bg-white/15 transition-colors focus-visible:outline-pink"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="lg:hidden fixed inset-x-4 top-20 z-50 bg-slate-950/95 border border-white/15 rounded-3xl p-6 shadow-2xl backdrop-blur-2xl text-white"
          >
            <div className="flex flex-col gap-2">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-2xl text-lg font-heading font-semibold text-white hover:bg-white/10 transition-colors flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <ArrowRight className="w-4 h-4 text-pink" />
                </a>
              ))}

              <div className="my-2 border-t border-white/15 pt-4 flex flex-col gap-3">
                <a
                  href={createQuickQuoteUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-pink w-full py-3.5 rounded-2xl text-center font-semibold text-base flex items-center justify-center gap-2 shadow-pinkGlow"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Get a quote on WhatsApp</span>
                </a>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  {CONTACT.phones.map((phone, idx) => (
                    <a
                      key={idx}
                      href={`tel:${phone.tel}`}
                      className="bg-white/10 text-white border border-white/15 hover:bg-white/20 py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 font-medium transition-all"
                    >
                      <Phone className="w-3.5 h-3.5 text-pink" />
                      <span>{phone.display}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
