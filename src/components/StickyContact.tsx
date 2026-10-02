import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle } from 'lucide-react';
import { CONTACT, waLink } from '../lib/contact';

const INSTAGRAM_ICON = (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

export const StickyContact: React.FC = () => {
  const [isDesktopExpanded, setIsDesktopExpanded] = useState(false);
  const primaryPhone = CONTACT.phones[0];

  return (
    <>
      {/* ========================================================
          MOBILE FLOATING ACTION BUTTONS (<768px)
          Floating Instagram + Bottom Bar with Call and WhatsApp
          ======================================================== */}
      {/* Mobile Floating Instagram Pill (Bottom Right above bar) */}
      <div className="md:hidden fixed bottom-20 right-4 z-50">
        <a
          href={CONTACT.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-gradient-to-tr from-[#f09433] via-[#e6683c] via-[#dc2743] via-[#cc2366] to-[#bc1888] text-white shadow-xl hover:scale-105 active:scale-95 transition-all font-heading text-xs font-bold border border-white/20"
          aria-label="Follow Aeroviz on Instagram"
        >
          {INSTAGRAM_ICON}
          <span>Instagram</span>
        </a>
      </div>

      {/* Mobile Bottom Fixed Bar */}
      <div 
        className="md:hidden fixed bottom-0 inset-x-0 z-50 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] glass   border-t border-slate-200 shadow-2xl  bg-white/95 backdrop-blur-2xl"
      >
        <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
          <a
            href={`tel:${primaryPhone.tel}`}
            className="  bg-slate-100 text-slate-800 border border-slate-200 hover:bg-slate-200 py-3 rounded-2xl flex items-center justify-center gap-2 font-bold text-sm shadow-sm transition-all"
          >
            <Phone className="w-4 h-4 text-pink" />
            <span>Call Desk</span>
          </a>

          <a
            href={waLink("Hi Aeroviz, I need assistance with visa / flight bookings.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pink py-3 rounded-2xl flex items-center justify-center gap-2 text-white font-bold text-sm shadow-pinkGlow"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>

      {/* ========================================================
          DESKTOP FLOATING CLUSTER (>=768px, Bottom Right)
          Instagram Floating Button + WhatsApp Support Online FAB
          ======================================================== */}
      <div className="hidden md:flex items-center gap-3 fixed bottom-8 right-8 z-50">
        
        {/* Floating Instagram Button (Near WhatsApp) */}
        <motion.a
          href={CONTACT.instagram}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="group relative flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-tr from-[#f09433] via-[#e6683c] via-[#dc2743] via-[#cc2366] to-[#bc1888] text-white shadow-xl hover:shadow-2xl transition-all font-heading text-xs font-bold border border-white/20"
          aria-label="Visit Aeroviz on Instagram"
        >
          {INSTAGRAM_ICON}
          <span className="hidden xl:inline-block">@aeroviztourism</span>
          <span className="xl:hidden">Instagram</span>
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
        </motion.a>

        {/* Floating WhatsApp Action Button */}
        <div 
          className="relative"
          onMouseEnter={() => setIsDesktopExpanded(true)}
          onMouseLeave={() => setIsDesktopExpanded(false)}
        >
          {/* Expanded WhatsApp Support Online Card */}
          <AnimatePresence>
            {isDesktopExpanded && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-16 right-0 w-72 glass-dark rounded-3xl p-5 shadow-2xl  border-slate-200 mb-2 backdrop-blur-2xl  bg-white"
              >
                <div className="flex items-center justify-between mb-3 pb-2 border-b  border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-bold  text-slate-900">WhatsApp Support Online</span>
                  </div>
                </div>

                <div className="space-y-2.5">
                  {CONTACT.phones.map((phone, idx) => (
                    <a
                      key={idx}
                      href={waLink("Hi Aeroviz, I need assistance.", phone.wa)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl  :bg-white/15  bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-pink/40 flex items-center justify-between transition-colors group"
                    >
                      <div className="flex flex-col">
                        <span className="text-[10px]  text-slate-500 font-medium">Desk {idx + 1}</span>
                        <span className="text-xs font-bold  text-slate-900 group-hover:text-pink transition-colors tabular-nums">
                          {phone.display}
                        </span>
                      </div>
                      <MessageCircle className="w-4 h-4 text-pink shrink-0" />
                    </a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Trigger Button */}
          <a
            href={waLink("Hi Aeroviz, I want to talk with the team.")}
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 rounded-full bg-pink text-white flex items-center justify-center shadow-pinkGlow hover:scale-105 active:scale-95 transition-transform duration-200 focus-visible:outline-pink"
            aria-label="Contact Aeroviz on WhatsApp"
          >
            <MessageCircle className="w-7 h-7" />
          </a>
        </div>
      </div>
    </>
  );
};
