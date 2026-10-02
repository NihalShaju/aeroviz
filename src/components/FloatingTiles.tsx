import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { CheckCircle2, RefreshCw, MessageCircle, FileText } from 'lucide-react';

export const FloatingTiles: React.FC = () => {
  const [isTouch, setIsTouch] = useState(false);

  // Motion values for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Near layer spring (-28px to +28px)
  const springNearX = useSpring(mouseX, { stiffness: 45, damping: 15 });
  const springNearY = useSpring(mouseY, { stiffness: 45, damping: 15 });

  // Mid layer spring (-16px to +16px)
  const springMidX = useSpring(mouseX, { stiffness: 35, damping: 18 });
  const springMidY = useSpring(mouseY, { stiffness: 35, damping: 18 });

  // Far layer spring (-8px to +8px)
  const springFarX = useSpring(mouseX, { stiffness: 25, damping: 20 });
  const springFarY = useSpring(mouseY, { stiffness: 25, damping: 20 });

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      // Normalized between -1 and 1
      const normX = (e.clientX / innerWidth) * 2 - 1;
      const normY = (e.clientY / innerHeight) * 2 - 1;

      mouseX.set(normX * 24);
      mouseY.set(normY * 24);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div 
      aria-hidden="true" 
      className="relative w-full max-w-[100vw] overflow-hidden sm:overflow-visible h-[480px] sm:h-[600px] lg:h-[650px] flex items-center justify-center select-none pointer-events-none"
    >
      {/* ========================================================
          FAR LAYER: Route Chip & Chat Bubble
          ======================================================== */}
      
      {/* 1. Far Layer: Route Chip */}
      <motion.div
        className="glass glass--chip absolute top-4 left-4 sm:left-10 px-4 py-2 flex items-center gap-2 text-xs font-semibold  text-slate-800 shadow-lg  border-slate-200  bg-white/90"
        style={!isTouch ? { x: springFarX, y: springFarY, filter: 'blur(0.5px)', opacity: 0.9 } : { opacity: 0.9 }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
      >
        <span className="w-2 h-2 rounded-full bg-pink animate-ping" />
        <span className="tracking-wider  text-pink-700">DXB · IST · BKK · LHR</span>
      </motion.div>

      {/* 2. Far Layer: Chat Bubble */}
      <motion.div
        className="glass glass--chip absolute top-14 right-2 sm:right-8 px-4 py-2.5 flex items-center gap-2 text-xs font-medium  text-slate-800 shadow-lg  border-slate-200  bg-white/90"
        style={!isTouch ? { x: springFarX, y: springFarY, filter: 'blur(0.5px)', opacity: 0.9 } : { opacity: 0.9 }}
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 8.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      >
        <MessageCircle className="w-3.5 h-3.5 text-pink shrink-0" />
        <span>Message us on WhatsApp</span>
      </motion.div>

      {/* ========================================================
          MID LAYER: Multi-entry Badge & Passport Stamp
          ======================================================== */}

      {/* 3. Mid Layer: Multi-entry Badge */}
      <motion.div
        className="glass glass--tile absolute bottom-10 left-2 sm:left-8 p-4 sm:p-5 flex items-center gap-3 shadow-2xl  border-slate-200  bg-white/95"
        style={!isTouch ? { x: springMidX, y: springMidY } : {}}
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 6.8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      >
        <div className="w-11 h-11 rounded-2xl bg-pink/20 flex items-center justify-center border border-pink/40 text-pink shrink-0 shadow-pinkGlow">
          <RefreshCw className="w-5 h-5 animate-[spin_10s_linear_infinite]" />
        </div>
        <div>
          <p className="text-xs  text-slate-500 font-medium">Visa Facility</p>
          <p className="text-sm font-heading font-bold  text-slate-900">Multiple entries</p>
          <span className="inline-block text-[10px] text-pink font-bold bg-pink/20 border border-pink/30 px-2 py-0.5 rounded-full mt-0.5">
            30, 60 & 90 Days
          </span>
        </div>
      </motion.div>

      {/* 4. Mid Layer: Circular Pink Passport Stamp (Thumps in once on load) */}
      <motion.div
        className="absolute top-24 right-4 sm:right-12 z-10"
        style={!isTouch ? { x: springMidX, y: springMidY } : {}}
        initial={{ scale: 2.4, opacity: 0, rotate: -25 }}
        animate={{ 
          scale: 1, 
          opacity: 0.95, 
          rotate: -8,
        }}
        transition={{ 
          duration: 0.6, 
          delay: 0.9, 
          type: 'spring', 
          stiffness: 260, 
          damping: 18 
        }}
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 7.2, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
          className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-2 border-dashed border-pink p-1 flex flex-col items-center justify-center text-pink  bg-white backdrop-blur-md shadow-pinkGlow"
        >
          <div className="w-full h-full rounded-full border border-pink/50 flex flex-col items-center justify-center p-2 text-center">
            <span className="text-[9px] font-bold uppercase tracking-widest text-pink">UNITED ARAB EMIRATES</span>
            <span className="text-[8px] font-mono tracking-wider  text-slate-700">★ DUBAI IMMIGRATION ★</span>
            <span className="text-xs font-heading font-bold my-0.5 text-pink">ENTRY PERMIT</span>
            <span className="text-[9px] font-mono font-bold text-emerald-500">VALIDATED</span>
            <span className="text-[7px]  text-pink-600 tracking-tight">AEROVIZ VERIFIED</span>
          </div>
        </motion.div>
      </motion.div>

      {/* ========================================================
          NEAR LAYER: Visa Status Card & Boarding Pass Tile
          ======================================================== */}

      {/* 5. Near Layer: Visa Status Card (Large) */}
      <motion.div
        className="glass glass--tile absolute top-16 sm:top-14 left-1 sm:left-4 p-5 sm:p-6 w-[280px] sm:w-[320px] shadow-2xl z-20  border-slate-200  bg-white/95 backdrop-blur-2xl"
        style={!isTouch ? { x: springNearX, y: springNearY } : {}}
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl   bg-pink-50 border border-pink-200 flex items-center justify-center text-pink">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] font-medium  text-slate-500 leading-tight">UAE e-Visa</p>
              <h4 className="text-sm font-heading font-bold  text-slate-900">Tourist Visa</h4>
            </div>
          </div>
          <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600   bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-500/30">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Approved
          </span>
        </div>

        {/* Status progress bar: green to pink */}
        <div className="space-y-1.5 mb-3">
          <div className="flex justify-between text-[11px] font-semibold">
            <span className=" text-slate-500">Application Progress</span>
            <span className=" text-slate-900">100% Ready</span>
          </div>
          <div className="w-full h-2 rounded-full  bg-slate-200 overflow-hidden">
            <motion.div 
              className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-teal-400 to-pink"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.2, delay: 0.8, ease: 'easeOut' }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-2 border-t  border-slate-200 text-[11px]">
          <div>
            <span className=" text-slate-500 block text-[10px]">Processing</span>
            <span className="font-semibold  text-slate-900">Priority Fast-track</span>
          </div>
          <div className="text-end">
            <span className=" text-slate-500 block text-[10px]">Validity</span>
            <span className="font-semibold text-pink">30 / 60 Days</span>
          </div>
        </div>
      </motion.div>

      {/* 6. Near Layer: Boarding Pass Tile (Medium) */}
      <motion.div
        className="glass glass--tile absolute bottom-14 sm:bottom-10 right-1 sm:right-4 p-5 sm:p-6 w-[260px] sm:w-[290px] shadow-2xl z-20  border-slate-200  bg-white/95 backdrop-blur-2xl"
        style={!isTouch ? { x: springNearX, y: springNearY } : {}}
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center justify-between pb-3 border-b border-dashed  border-slate-200">
          <div>
            <span className="text-[10px]  text-slate-500 font-mono block">ORIGIN</span>
            <span className="text-xl font-heading font-extrabold  text-slate-900">DXB</span>
            <span className="text-[10px]  text-pink-600 block font-medium">Dubai</span>
          </div>
          
          <div className="flex flex-col items-center px-2">
            <div className="w-14 h-[1px] bg-pink relative flex items-center justify-center">
              <svg 
                viewBox="0 0 24 24" 
                className="w-3.5 h-3.5 text-pink absolute"
                fill="currentColor"
              >
                <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
              </svg>
            </div>
            <span className="text-[9px] text-pink font-semibold mt-1">Direct flight</span>
          </div>

          <div className="text-end">
            <span className="text-[10px]  text-slate-500 font-mono block">DEST</span>
            <span className="text-xl font-heading font-extrabold  text-slate-900">LHR</span>
            <span className="text-[10px]  text-pink-600 block font-medium">London</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 py-2.5 text-[11px]">
          <div>
            <span className=" text-slate-500 text-[10px] block">Seat</span>
            <span className="font-bold  text-slate-900">12A</span>
          </div>
          <div>
            <span className=" text-slate-500 text-[10px] block">Gate</span>
            <span className="font-bold  text-slate-900">B04</span>
          </div>
          <div className="text-end">
            <span className=" text-slate-500 text-[10px] block">Class</span>
            <span className="font-bold text-pink">Economy</span>
          </div>
        </div>

        {/* Barcode made of dark/light CSS stripes */}
        <div className="pt-2 border-t  border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-[2px] h-6 w-full opacity-80">
            {[2, 1, 3, 1, 2, 4, 1, 2, 1, 3, 2, 1, 4, 2, 1, 3, 1, 2, 3, 1, 2, 4, 1, 2, 3, 1, 2].map((w, i) => (
              <span 
                key={i} 
                className=" bg-slate-800 h-full inline-block rounded-[0.5px]" 
                style={{ width: `${w * 2}px` }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
