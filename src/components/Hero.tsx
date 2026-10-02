import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, ShieldCheck, Clock, FileCheck } from 'lucide-react';
import { EnquiryWidget } from './EnquiryWidget';
import { FloatingTiles } from './FloatingTiles';
import { CONTACT, waLink } from '../lib/contact';

export const Hero: React.FC = () => {
  const primaryPhone = CONTACT.phones[0];

  return (
    <section 
      id="hero" 
      className="relative min-h-[calc(100vh-4rem)] pt-6 pb-16 lg:py-16 overflow-hidden flex items-center  bg-white transition-colors"
    >
      {/* ========================================================
          Effect 1: Atmospheric Mesh Background
          ======================================================== */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 select-none" aria-hidden="true">
        {/* Pink Glowing Orb */}
        <motion.div
          animate={{
            x: [0, 50, -40, 0],
            y: [0, -40, 50, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-[10%] right-[5%] w-[540px] h-[540px] rounded-full  bg-pink/15 blur-[120px]"
        />

        {/* Deep Ocean Blue / Cyan Highlight Orb */}
        <motion.div
          animate={{
            x: [0, -60, 40, 0],
            y: [0, 40, -40, 0],
          }}
          transition={{
            duration: 26,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-[-5%] left-[-5%] w-[580px] h-[580px] rounded-full  bg-sky-200/40 blur-[130px]"
        />

        {/* Soft Violet / Sky Glow */}
        <motion.div
          animate={{
            x: [0, 40, -50, 0],
            y: [0, -30, 30, 0],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-[-10%] left-[25%] w-[620px] h-[620px] rounded-full  bg-pink-100/30 blur-[140px]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* ========================================================
              LEFT COLUMN (55% / 7 cols)
              ======================================================== */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Tagline Pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full    bg-pink-50 border border-pink-200 text-pink-700 font-semibold text-xs mb-4 shadow-sm w-fit backdrop-blur-md"
            >
              <span className="w-2 h-2 rounded-full bg-pink animate-pulse" />
              <span>UAE Visas & Worldwide Flight Desk</span>
            </motion.div>

            {/* H1 Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-3xl sm:text-5xl lg:text-[54px] xl:text-[60px] font-heading font-extrabold  text-slate-900 tracking-[-0.035em] leading-[1.08] sm:leading-[1.04] text-balance mb-6"
            >
              Your visa and your flight, <br className="hidden sm:inline" />
              <span className="text-pink">handled by one team.</span>
            </motion.h1>

            {/* Subline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base sm:text-lg lg:text-xl  text-slate-600 leading-[1.65] max-w-[65ch] mb-8 font-normal"
            >
              Aeroviz specializes in UAE tourist visas, visa changes by flight and bus, Saudi visas, family and residence permits, and booking flight tickets to <strong className=" text-slate-900 font-semibold">every country</strong> worldwide. Message us on WhatsApp for fast clearance & best fares.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 mb-8"
            >
              <a
                href={waLink("Hi Aeroviz, I want to start my visa / travel booking.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pink px-7 py-3.5 rounded-full text-base font-bold flex items-center gap-2.5 shadow-pinkGlow"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Start on WhatsApp</span>
              </a>

              <a
                href={`tel:${primaryPhone.tel}`}
                className="    bg-slate-100 text-slate-800 border border-slate-300 hover:bg-slate-200 px-6 py-3.5 rounded-full text-base font-bold flex items-center gap-2 shadow-sm transition-all"
              >
                <Phone className="w-5 h-5 text-pink" />
                <span className="tabular-nums">Call {primaryPhone.display}</span>
              </a>
            </motion.div>

            {/* Reassurance Chips */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-[13px]  text-slate-700 font-medium"
            >
              <div className="glass glass--chip px-3 py-1.5 flex items-center gap-1.5 shadow-md   bg-white/90 border border-slate-200">
                <FileCheck className="w-3.5 h-3.5 text-pink shrink-0" />
                <span>Passport copy and photo is all we start with</span>
              </div>
              <div className="glass glass--chip px-3 py-1.5 flex items-center gap-1.5 shadow-md   bg-white/90 border border-slate-200">
                <ShieldCheck className="w-3.5 h-3.5 text-pink shrink-0" />
                <span>Clear fees before you pay</span>
              </div>
              <div className="glass glass--chip px-3 py-1.5 flex items-center gap-1.5 shadow-md   bg-white/90 border border-slate-200">
                <Clock className="w-3.5 h-3.5 text-pink shrink-0" />
                <span>Updates on WhatsApp</span>
              </div>
            </motion.div>

            {/* Enquiry Widget */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <EnquiryWidget />
            </motion.div>
          </div>

          {/* ========================================================
              RIGHT COLUMN (45% / 5 cols): Floating Glass Tile Cluster
              ======================================================== */}
          <div className="lg:col-span-5 flex items-center justify-center lg:justify-end">
            <FloatingTiles />
          </div>
        </div>
      </div>
    </section>
  );
};
