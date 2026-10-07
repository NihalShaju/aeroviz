import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, MessageCircle, ArrowRight } from 'lucide-react';
import { Wordmark } from './Wordmark';
import { CONTACT } from '../lib/contact';
import { createQuickQuoteUrl } from '../lib/whatsapp';
import { GlowCursorButton } from './GlowCursorButton';

const NAV_ITEMS = [
  { label: 'Services', href: '#services' },
  { label: 'Flights', href: '#flights' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Destinations', href: '#destinations' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('services');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const scrollPosition = window.scrollY + 200;
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

  return (
    <header className="sticky top-0 z-50 px-4 sm:px-6 pt-3.5 pb-2 transition-all duration-300">
      <nav 
        aria-label="Main Navigation"
        className={`max-w-6xl mx-auto glass rounded-full px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 border-slate-200 shadow-2xl backdrop-blur-2xl' 
            : 'bg-white/80 border-slate-200 shadow-sm'
        }`}
      >
        {/* Wordmark */}
        <a 
          href="#" 
          className="focus-visible:outline-pink rounded-xl p-1 -ms-1 transition-transform hover:scale-[1.02]"
          aria-label="Aeroviz Home"
        >
          <Wordmark size="md" />
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.replace('#', '');
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setActiveSection(item.href.replace('#', ''))}
                className={`relative px-3.5 py-1.5 text-[15px] font-medium transition-colors rounded-full ${
                  isActive 
                    ? 'text-slate-900 font-semibold' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="navUnderline"
                    className="absolute bottom-0 left-3 right-3 h-[2px] bg-pink rounded-full shadow-[0_0_8px_rgba(224,47,120,0.8)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* Desktop Quote Button */}
        <div className="hidden lg:flex items-center gap-3">
          <GlowCursorButton
            href={createQuickQuoteUrl()}
            target="_blank"
            rel="noopener noreferrer"
            size="sm"
            variant="pink"
            showArrow={true}
          >
            Get a quote
          </GlowCursorButton>
        </div>

        {/* Mobile Header Controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <GlowCursorButton
            href={createQuickQuoteUrl()}
            target="_blank"
            rel="noopener noreferrer"
            size="sm"
            variant="pink"
            showArrow={false}
            className="sm:hidden px-3.5 py-1.5 text-xs"
          >
            Quote
          </GlowCursorButton>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-2xl text-slate-800 hover:bg-slate-200/60 transition-colors focus-visible:outline-pink"
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
            className="lg:hidden fixed inset-x-4 top-20 z-50 bg-white/96 border border-slate-200 rounded-3xl p-6 shadow-2xl backdrop-blur-2xl"
          >
            <div className="flex flex-col gap-3">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-2xl text-lg font-heading font-semibold text-slate-900 hover:bg-slate-100 transition-colors flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <ArrowRight className="w-4 h-4 text-pink" />
                </a>
              ))}

              <div className="my-2 border-t border-slate-200 pt-4 flex flex-col gap-3">
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
                      className="bg-slate-100 text-slate-800 border border-slate-200 hover:bg-slate-200 py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 font-medium transition-all"
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
