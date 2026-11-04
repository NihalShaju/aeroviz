import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, ShieldCheck, Clock, FileCheck, Compass } from 'lucide-react';
import { EnquiryWidget } from './EnquiryWidget';
import { CONTACT, waLink } from '../lib/contact';
import { GlowCursorButton } from './GlowCursorButton';

const HERO_HIGHLIGHTS = [
  {
    num: '01',
    title: 'UAE Tourist & Residence Visas',
    desc: '30 & 60-day single or multiple-entry visas, family sponsorship & 2-year residence permits.',
    href: '#services',
  },
  {
    num: '02',
    title: 'Same-Day Visa Change',
    desc: 'Seamless airport-to-airport (A2A) flights and Oman border bus runs arranged end-to-end.',
    href: '#services',
  },
  {
    num: '03',
    title: 'Worldwide Flight Desk',
    desc: 'Direct & best-value flight tickets to every country worldwide, synced with your visa.',
    href: '#flights',
  },
];

export const Hero: React.FC = () => {
  const primaryPhone = CONTACT.phones[0];

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 pb-12 lg:pt-32 lg:pb-14 overflow-hidden flex flex-col justify-between text-white"
    >
      {/* Main Content Container (uses the single continuous background video from App.tsx) */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 w-full flex-1 flex flex-col justify-between relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center my-auto py-6 lg:py-10">
          {/* ========================================================
              LEFT COLUMN (7 cols): Monumental Editorial Typography
              ======================================================== */}
          <div className="lg:col-span-7 flex flex-col justify-center lg:pr-6">
            {/* Eyebrow Line */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-3 text-xs sm:text-sm uppercase tracking-[0.25em] text-white/90 font-semibold mb-5"
            >
              <span className="w-10 h-[2px] bg-pink inline-block rounded-full" />
              <span>UAE Visas &amp; Worldwide Flight Desk</span>
            </motion.div>

            {/* Monumental H1 Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-heading font-black text-white tracking-[-0.02em] leading-[1.06] mb-6 drop-shadow-xl"
            >
              <span className="block text-4xl sm:text-6xl xl:text-[68px] font-extrabold text-white tracking-tight leading-[1.06]">
                Your visa and your flight,{' '}
                <span className="text-pink-300">handled by one team.</span>
              </span>
            </motion.h1>

            {/* Subline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base sm:text-lg text-white/85 leading-[1.7] max-w-[58ch] mb-8 font-normal drop-shadow"
            >
              Aeroviz specializes in UAE tourist visas, same-day visa changes by flight and bus, family and residence permits, luxury farm stays, desert safaris, and flight tickets to{' '}
              <strong className="text-white font-semibold">every country</strong> worldwide.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 mb-8"
            >
              <GlowCursorButton
                href={waLink('Hi Aeroviz, I want to start my visa / travel booking.')}
                target="_blank"
                rel="noopener noreferrer"
                size="md"
                variant="pink"
                icon={<MessageCircle className="w-5 h-5" />}
                showArrow={true}
              >
                Start on WhatsApp
              </GlowCursorButton>

              <a
                href={`tel:${primaryPhone.tel}`}
                className="px-6 py-3.5 rounded-full text-base font-bold flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white border border-white/30 backdrop-blur-md transition-all shadow-lg"
              >
                <Phone className="w-5 h-5 text-pink-300" />
                <span className="tabular-nums">Call {primaryPhone.display}</span>
              </a>
            </motion.div>

            {/* Reassurance Chips (Translucent Frosted Glass over Video) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-2.5 text-xs sm:text-[13px] text-white/95 font-medium"
            >
              <div className="px-3.5 py-1.5 rounded-full flex items-center gap-2 bg-black/35 border border-white/20 backdrop-blur-md">
                <FileCheck className="w-3.5 h-3.5 text-pink-300 shrink-0" />
                <span>Passport copy &amp; photo to start</span>
              </div>
              <div className="px-3.5 py-1.5 rounded-full flex items-center gap-2 bg-black/35 border border-white/20 backdrop-blur-md">
                <ShieldCheck className="w-3.5 h-3.5 text-pink-300 shrink-0" />
                <span>Clear fees before you pay</span>
              </div>
              <div className="px-3.5 py-1.5 rounded-full flex items-center gap-2 bg-black/35 border border-white/20 backdrop-blur-md">
                <Clock className="w-3.5 h-3.5 text-pink-300 shrink-0" />
                <span>Live WhatsApp updates</span>
              </div>
            </motion.div>
          </div>

          {/* ========================================================
              RIGHT COLUMN (5 cols): Instant Quote & Visa Desk
              ======================================================== */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="lg:col-span-5 lg:pl-4 flex flex-col justify-center"
          >
            <div className="flex items-center justify-between mb-3 px-1">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/90">
                <Compass className="w-4 h-4 text-pink-300" />
                <span>Instant Quote &amp; Visa Desk</span>
              </div>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-300 bg-emerald-950/60 border border-emerald-400/30 px-2.5 py-0.5 rounded-full backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                DXB Desk Online
              </span>
            </div>
            <div className="[&>div]:mt-0">
              <EnquiryWidget />
            </div>
          </motion.div>
        </div>

        {/* ========================================================
            BOTTOM STRIP: 01 / 02 / 03 Editorial Feature Columns
            ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10 pt-6 border-t border-white/20"
        >
          {HERO_HIGHLIGHTS.map((item, idx) => (
            <a
              key={item.num}
              href={item.href}
              className="group relative pt-3 flex items-start gap-4 transition-opacity hover:opacity-100 opacity-90"
            >
              {/* Top accent indicator on hover / first item */}
              <span
                className={`absolute -top-[1px] left-0 h-[2px] transition-all duration-300 ${
                  idx === 0
                    ? 'w-16 bg-white group-hover:w-24'
                    : 'w-0 bg-white group-hover:w-16'
                }`}
              />
              <span className="font-heading font-black text-2xl sm:text-3xl text-white/50 group-hover:text-white transition-colors leading-none">
                {item.num}
              </span>
              <div>
                <h2 className="font-heading font-bold text-base sm:text-lg text-white group-hover:text-pink-200 transition-colors mb-1">
                  {item.title}
                </h2>
                <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
