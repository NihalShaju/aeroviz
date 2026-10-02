import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight, Search, Globe, Plane, CheckCircle2, Sparkles, Filter } from 'lucide-react';
import { MOST_TRAVELED_COUNTRIES, ALL_COUNTRIES } from '../lib/countries';
import { waLink } from '../lib/contact';

export const Destinations: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [showAllDirectory, setShowAllDirectory] = useState(false);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const filteredCountries = ALL_COUNTRIES.filter((country) => {
    const matchesSearch = country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          country.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (country.airportCode && country.airportCode.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesRegion = selectedRegion === 'All' || country.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  const REGIONS = ['All', 'Middle East', 'Asia', 'Europe', 'Americas', 'Africa', 'Oceania'];

  return (
    <section id="destinations" className="py-20 lg:py-28 relative z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Navigation Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full    bg-pink/10 border border-pink/20 text-pink-700 font-semibold text-xs mb-3 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-pink" />
              <span>Worldwide Travel Network</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold  text-slate-900 tracking-tight leading-tight">
              Most Traveled Countries & <br />
              <span className="text-pink">Global Destination Hubs</span>
            </h2>
            <p className="text-base sm:text-lg  text-slate-600 mt-3">
              Aeroviz books flight tickets and arranges visas to every country on Earth. Explore our most popular destination routes below or search any country in the world directory.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start lg:self-end">
            <button
              type="button"
              onClick={() => setShowAllDirectory(!showAllDirectory)}
              className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 border shadow-sm ${
                showAllDirectory 
                  ? 'bg-pink text-white border-pink shadow-pinkGlow' 
                  : '  :bg-white/20  bg-slate-100 text-slate-800 hover:bg-slate-200 border-slate-300'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>{showAllDirectory ? 'Hide Full Directory' : 'Browse All 195+ Countries'}</span>
            </button>

            <div className="hidden sm:flex items-center gap-2">
              <button
                type="button"
                onClick={() => scroll('left')}
                className="w-11 h-11 rounded-full glass flex items-center justify-center  text-slate-800 hover:text-pink hover:border-pink/40 transition-colors focus-visible:outline-pink"
                aria-label="Scroll destinations left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => scroll('right')}
                className="w-11 h-11 rounded-full glass flex items-center justify-center  text-slate-800 hover:text-pink hover:border-pink/40 transition-colors focus-visible:outline-pink"
                aria-label="Scroll destinations right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* ─── Most Traveled Country Tiles (Carousel Strip) ───────────────────── */}
        <div
          ref={scrollContainerRef}
          className="flex gap-5 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory scrollbar-none no-scrollbar cursor-grab active:cursor-grabbing select-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {MOST_TRAVELED_COUNTRIES.map((dest) => (
            <motion.div
              key={dest.name}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="snap-start shrink-0 w-[280px] sm:w-[320px] glass glass--tile p-6 flex flex-col justify-between relative overflow-hidden group shadow-xl   bg-white border-slate-200/80 hover:border-pink/50 transition-all"
            >
              {/* Top Row: Flag & Region Pill */}
              <div className="flex items-start justify-between mb-4 relative z-10">
                <div className="flex items-center gap-3">
                  <span className="text-3xl filter drop-shadow-sm">{dest.flag}</span>
                  <div>
                    <h3 className="text-xl font-heading font-bold  text-slate-900 group-hover:text-pink transition-colors">
                      {dest.name}
                    </h3>
                    <span className="text-[11px] font-medium  text-slate-500 block">
                      {dest.region}
                    </span>
                  </div>
                </div>

                {dest.highlight && (
                  <span className="text-[10px] font-bold text-pink bg-pink/20 border border-pink/30 px-2.5 py-0.5 rounded-full">
                    {dest.highlight}
                  </span>
                )}
              </div>

              {/* Center Box: Airport Codes & Popularity Tag */}
              <div className="my-3 p-3.5 rounded-2xl   bg-slate-100 border border-slate-200 relative z-10">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className=" text-slate-500 font-mono">Major Airport(s)</span>
                  <span className="font-heading font-extrabold text-pink text-sm tabular-nums">
                    {dest.airportCode}
                  </span>
                </div>
                <div className="text-xs  text-slate-800 font-medium">
                  {dest.popularAirport}
                </div>
              </div>

              {/* Note / Tag */}
              <div className="py-2 relative z-10">
                {dest.tag && (
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600  bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/30 mb-2">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>{dest.tag}</span>
                  </div>
                )}
                <p className="text-xs  text-slate-600 leading-relaxed line-clamp-2">
                  {dest.travelNote}
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t  border-slate-200 relative z-10">
                <a
                  href={waLink(`Hi Aeroviz, I want to inquire about flights & visas for ${dest.name} (${dest.airportCode}). Please check live fare options.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pink w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm group-hover:shadow-pinkGlow"
                >
                  <Plane className="w-3.5 h-3.5 rotate-45" />
                  <span>Book Flight to {dest.name}</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ─── Expandable Full Country Directory (All 195+ Countries) ─────────── */}
        <AnimatePresence>
          {showAllDirectory && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-12 glass glass--panel p-6 sm:p-8   bg-white border border-slate-200 shadow-2xl backdrop-blur-2xl"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b  border-slate-200">
                <div>
                  <h3 className="text-xl sm:text-2xl font-heading font-bold  text-slate-900 flex items-center gap-2">
                    <Globe className="w-6 h-6 text-pink" />
                    <span>Choose Any Country in the World</span>
                  </h3>
                  <p className="text-xs sm:text-sm  text-slate-600 mt-0.5">
                    Aeroviz arranges worldwide flight tickets and travel services to every country.
                  </p>
                </div>

                {/* Country Search Bar */}
                <div className="relative w-full md:w-80">
                  <Search className="w-4 h-4 text-pink absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search country or airport code..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl    :text-white/40 bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm font-medium focus:border-pink focus:outline-none transition-all"
                  />
                </div>
              </div>

              {/* Region Filter Buttons */}
              <div className="flex items-center gap-2 overflow-x-auto py-4 no-scrollbar">
                <span className="text-xs font-semibold  text-slate-500 flex items-center gap-1.5 shrink-0 pr-1">
                  <Filter className="w-3.5 h-3.5" />
                  Region:
                </span>
                {REGIONS.map((region) => (
                  <button
                    key={region}
                    type="button"
                    onClick={() => setSelectedRegion(region)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${
                      selectedRegion === region
                        ? 'bg-pink text-white shadow-pinkGlow'
                        : '  :bg-white/15 :text-white bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
                    }`}
                  >
                    {region}
                  </button>
                ))}
              </div>

              {/* Country Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 max-h-[440px] overflow-y-auto pr-1 pt-2">
                {filteredCountries.map((c) => (
                  <a
                    key={c.code}
                    href={waLink(`Hi Aeroviz, I want to book a flight ticket or inquire about a visa for ${c.name} (${c.code}). Please share fare options.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl  :bg-white/[0.12]  bg-slate-50 hover:bg-pink-50/50 border border-slate-200 hover:border-pink/50 transition-all flex flex-col justify-between group"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-2xl">{c.flag}</span>
                      {c.airportCode && (
                        <span className="text-[10px] font-mono font-bold text-pink bg-pink/20 px-1.5 py-0.5 rounded">
                          {c.airportCode}
                        </span>
                      )}
                    </div>
                    <div>
                      <h4 className="text-xs font-heading font-bold  text-slate-800 group-hover:text-pink transition-colors truncate">
                        {c.name}
                      </h4>
                      <span className="text-[10px]  text-slate-500 block">{c.region}</span>
                    </div>
                    <div className="mt-2 pt-1.5 border-t  border-slate-200 flex items-center justify-between text-[10px] font-bold text-pink">
                      <span>Book Flight</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </a>
                ))}
              </div>

              {filteredCountries.length === 0 && (
                <div className="text-center py-10 text-sm  text-slate-500">
                  No countries matching "{searchQuery}". Send us a message on WhatsApp and we will find your destination immediately!
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
